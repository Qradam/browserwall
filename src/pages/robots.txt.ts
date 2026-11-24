// /robots.txt – everything is public, including for AI search crawlers.
import type { APIRoute } from "astro";
import { abs } from "../lib/seo";

const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "Bingbot", "DuckAssistBot", "CCBot"];

export const GET: APIRoute = ({ site }) =>
  new Response(
    [
      "# Everyone, including AI assistants, AI search and AI training, is welcome to read, cite and learn from this site.",
      "# Content signals: https://contentsignals.org",
      "User-agent: *",
      ...AI_BOTS.map((b) => `User-agent: ${b}`),
      "Content-Signal: search=yes, ai-input=yes, ai-train=yes",
      "Allow: /",
      "",
      `Sitemap: ${abs(site, "/sitemap.xml")}`,
      "",
    ].join("\n"),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
