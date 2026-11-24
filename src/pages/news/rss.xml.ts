// /news/rss.xml – RSS 2.0 feed of news posts.
import type { APIRoute } from "astro";
import { abs, SITE_NAME } from "../../lib/seo";
import { NEWS } from "../../lib/news";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rfc822 = (d: string) => new Date(`${d}T12:00:00Z`).toUTCString();

export const GET: APIRoute = ({ site }) => {
  const self = abs(site, "/news/rss.xml");
  const items = NEWS.map((n) => {
    const url = abs(site, `/news/${n.slug}`);
    return `    <item>
      <title>${esc(n.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(n.date)}</pubDate>
      <description>${esc(n.description)}</description>
    </item>`;
  }).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} news</title>
    <link>${abs(site, "/news")}</link>
    <atom:link href="${self}" rel="self" type="application/rss+xml" />
    <description>Browser releases and browserwall site updates.</description>
    <language>en</language>
    ${NEWS[0] ? `<lastBuildDate>${rfc822(NEWS[0].updated ?? NEWS[0].date)}</lastBuildDate>` : ""}
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
};
