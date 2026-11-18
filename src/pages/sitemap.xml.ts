// /sitemap.xml – every indexable page.
import type { APIRoute } from "astro";
import { browsers } from "../data/browsers";
import { CATEGORIES, ALTERNATIVE_IDS, abs, BUILD } from "../lib/seo";

export const GET: APIRoute = ({ site }) => {
  const day = BUILD.toISOString().slice(0, 10);
  const pages: [string, string][] = [
    ["/", "1.0"], ["/quiz", "1.0"], ["/wall", "0.9"], ["/best", "0.8"], ["/alternatives", "0.8"], ["/tiers", "0.6"], ["/contact", "0.3"], ["/privacy", "0.1"],
    ...CATEGORIES.map((c) => [`/best/${c.slug}`, "0.8"] as [string, string]),
    ...ALTERNATIVE_IDS.map((id) => [`/alternatives/${id}`, "0.8"] as [string, string]),
    ...browsers.map((b) => [`/browsers/${b.id}`, b.status === "discontinued" || b.channelOf ? "0.4" : "0.6"] as [string, string]),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(([p, pr]) => `  <url><loc>${abs(site, p)}</loc><lastmod>${day}</lastmod><priority>${pr}</priority></url>`).join("\n")}
</urlset>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
