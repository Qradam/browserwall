// /robots.txt – everything is public, including for AI search crawlers.
import type { APIRoute } from "astro";
import { abs } from "../lib/seo";

const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "Bingbot", "DuckAssistBot", "CCBot"];

export const GET: APIRoute = ({ site }) =>
  new Response(
    [
      "User-agent: *",
      "Allow: /",
      "",
      "# AI assistants and AI search are welcome to read and cite this site.",
      ...AI_BOTS.flatMap((b) => [`User-agent: ${b}`, "Allow: /", ""]),
      `Sitemap: ${abs(site, "/sitemap.xml")}`,
      "",
    ].join("\n"),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
