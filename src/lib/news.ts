// News posts (/news/<slug>): browser releases and browserwall site updates.
// Each post is a hand-written page in src/pages/news/<slug>.astro; this registry feeds the index, RSS, sitemap,
// llms.txt and the "In the news" block on browser profiles. Keep it sorted newest first.
import { abs } from "./seo";

export type NewsKind = "release" | "site";
export interface NewsPost {
  slug: string;
  title: string; // H1 and RSS title
  short: string; // link text in lists and the footer
  description: string; // meta description and RSS summary
  date: string; // YYYY-MM-DD, publish date
  updated?: string; // YYYY-MM-DD, last meaningful edit
  kind: NewsKind;
  browsers: string[]; // browser ids the post is about
}

export const NEWS_KINDS: Record<NewsKind, string> = { release: "Release", site: "Site update" };

export const NEWS: NewsPost[] = [
  { slug: "ladybird-alpha", kind: "release", date: "2026-11-24", browsers: ["ladybird"],
    title: "Ladybird alpha is out: the first new browser engine in years you can just install",
    short: "Ladybird alpha is out",
    description: "Ladybird released its first alpha on November 23, 2026 for macOS and Linux. What's in it, what isn't, whether you should use it yet, and what we changed on browserwall." },
  { slug: "helium-0-22", kind: "release", date: "2026-11-24", browsers: ["helium"],
    title: "Helium 0.22.3: pinned tabs shared across windows, Chromium 158 and uBlock Origin 1.77",
    short: "Helium 0.22.3: shared pinned tabs",
    description: "Helium's 0.22 updates rework pinned tabs (shared across windows, hibernated, drag to pin), move to Chromium 158, bump the built-in uBlock Origin to 1.77.0 and tighten canvas fingerprinting noise." },
];

export const news = (slug: string) => NEWS.find((n) => n.slug === slug)!;
export const newsFor = (browserId: string) => NEWS.filter((n) => n.browsers.includes(browserId));

/** "November 24, 2026" */
export const fmtDate = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

export const newsLd = (site: URL | undefined, n: NewsPost) => ({
  "@type": "NewsArticle", headline: n.title, description: n.description, inLanguage: "en",
  datePublished: n.date, dateModified: n.updated ?? n.date,
  image: abs(site, `/og/news/${n.slug}.png`),
  mainEntityOfPage: abs(site, `/news/${n.slug}`), author: { "@id": `${abs(site, "/")}#org` }, publisher: { "@id": `${abs(site, "/")}#org` },
});
