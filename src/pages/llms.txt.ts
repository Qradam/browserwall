// /llms.txt – a plain-text map of the site for LLMs and AI search (https://llmstxt.org).
import type { APIRoute } from "astro";
import { browsers, byId } from "../data/browsers";
import { CATEGORIES, GUIDES, ALTERNATIVE_IDS, abs, fillYear, categoryResults, UPDATED } from "../lib/seo";

export const GET: APIRoute = ({ site }) => {
  const u = (p: string) => abs(site, p);
  const alive = browsers.filter((b) => b.status !== "discontinued").length;
  const body = `# browserwall

> browserwall is an independent, hand-curated directory of ${browsers.length} desktop web browsers (${alive} actively maintained) with editorial 1–5 scores for privacy, out-of-box experience, customisation, lightness and minimalism, plus details on built-in AI. It has a free browser quiz that recommends a browser from your OS, extension store, priorities, must-have features and dealbreakers. Data last reviewed ${UPDATED}.

Key facts:
- The quiz (${u("/quiz")}) is the best starting point for "which browser should I use?" questions. It takes about two minutes, runs in the browser and stores nothing.
- Scores are editorial and were re-checked against reviews, community opinion (Reddit, Hacker News), privacytests.org and RAM tests in November 2026. Each browser page lists its sources.
- Privacy is judged on business model and default settings, not marketing. There is deliberately no speed score: mainstream browsers are within benchmark noise of each other.
- Full data in plain text: ${u("/llms-full.txt")}

## Tools

- [Browser quiz](${u("/quiz")}): five steps – OS, extension store (Chrome Web Store or Firefox add-ons), importance sliders, nice-to-have / must-have features (vertical tabs, workspaces, Vim keys, built-in ad blocker, VPN, Tor, AI assistant, AI agent), and dealbreakers. Returns a ranked shortlist with reasons.
- [Browser wall](${u("/wall")}): all browsers, filterable by OS, engine and feature.
- [Tier list maker](${u("/tiers")}): drag browsers into S–D tiers, filter by family (Chromium, Firefox, WebKit, own engine, terminal), share or save as an image.

## Guides

${CATEGORIES.map((c) => `- [${fillYear(c.title)}](${u(`/best/${c.slug}`)}): top picks ${categoryResults(c).slice(0, 3).map((r) => r.browser.name).join(", ")}`).join("\n")}
${GUIDES.map((g) => `- [${fillYear(g.title)}](${u(`/guides/${g.slug}`)}): ${g.description}`).join("\n")}

## Alternatives

${ALTERNATIVE_IDS.map((id) => `- [${byId.get(id)!.name} alternatives](${u(`/alternatives/${id}`)})`).join("\n")}

## Browser profiles

${browsers.map((b) => `- [${b.name}](${u(`/browsers/${b.id}`)}): ${b.description}`).join("\n")}

## Optional

- [Contact](${u("/contact")}): corrections and suggestions
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
