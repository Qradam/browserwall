// Markdown content negotiation in front of the static assets.
// A page URL requested with "Accept: text/markdown" gets the Markdown copy built by scripts/markdown.mjs;
// everything else is served from dist/ unchanged. Logos and /_astro/ files skip the Worker (wrangler.jsonc).
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isPage = (request.method === "GET" || request.method === "HEAD") && !/\.[a-z0-9]+$/i.test(url.pathname);
    const wantsMarkdown = isPage && /\btext\/markdown\b/i.test(request.headers.get("Accept") ?? "");

    if (wantsMarkdown) {
      const path = url.pathname === "/" ? "/index" : url.pathname.replace(/\/+$/, "");
      const md = await env.ASSETS.fetch(new URL(`${path}.md`, url));
      if (md.ok) {
        const headers = new Headers(md.headers);
        headers.set("Content-Type", "text/markdown; charset=utf-8");
        headers.set("Vary", "Accept");
        headers.delete("X-Robots-Tag"); // this is the canonical URL, only in another format
        return new Response(request.method === "HEAD" ? null : md.body, { status: 200, headers });
      }
    }

    const res = await env.ASSETS.fetch(request);
    if (!isPage || !(res.headers.get("Content-Type") ?? "").startsWith("text/html")) return res;
    // HTML and Markdown share the URL, so caches must key on Accept.
    const out = new Response(res.body, res);
    out.headers.append("Vary", "Accept");
    return out;
  },
};
