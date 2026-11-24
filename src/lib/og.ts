// Per-page share images (/og/<page path>.png, 1200×630): which pages get one and what goes on it.
// Rendering lives in og-render.ts; this file stays light because Base.astro and the sitemap import it.
import { browsers, byId, AXES, type Browser } from "../data/browsers";
import { CATEGORIES, GUIDES, ALTERNATIVE_IDS, COMPARISONS, categoryResults, alternativesFor, fillYear, YEAR } from "./seo";
import { NEWS, NEWS_KINDS, fmtDate } from "./news";

export type Card =
  | { kind: "browser"; kicker: string; title: string; subtitle: string; b: Browser }
  | { kind: "compare"; kicker: string; title: string; subtitle: string; a: Browser; b: Browser }
  | { kind: "list"; kicker: string; title: string; subtitle: string; logos: Browser[] };

const pick = (ids: string[]) => ids.map((id) => byId.get(id)).filter((b): b is Browser => b != null);

function build(): Map<string, Card> {
  const m = new Map<string, Card>();
  for (const b of browsers) m.set(`/browsers/${b.id}`, { kind: "browser", kicker: "Browser profile", title: b.name, subtitle: b.description, b });
  for (const c of COMPARISONS) m.set(`/compare/${c.slug}`, { kind: "compare", kicker: `Comparison ${YEAR}`, title: `${c.a.name} vs ${c.b.name}`, subtitle: "Privacy, polish, customisation, lightness and minimalism, side by side.", a: c.a, b: c.b });
  for (const n of NEWS) m.set(`/news/${n.slug}`, { kind: "list", kicker: `${NEWS_KINDS[n.kind]} · ${fmtDate(n.date)}`, title: n.short, subtitle: n.description, logos: pick(n.browsers) });
  for (const c of CATEGORIES) m.set(`/best/${c.slug}`, { kind: "list", kicker: "Ranked list", title: fillYear(c.title), subtitle: fillYear(c.intro), logos: categoryResults(c).slice(0, 6).map((r) => r.browser) });
  for (const id of ALTERNATIVE_IDS) {
    const b = byId.get(id);
    if (b) m.set(`/alternatives/${id}`, { kind: "list", kicker: "Alternatives", title: `The best ${b.name} alternatives`, subtitle: `Browsers like ${b.name}, and what each one does better.`, logos: [b, ...alternativesFor(b, 5).map((a) => a.result.browser)] });
  }
  const guideLogos: Record<string, string[]> = {
    "ublock-origin": ["firefox", "librewolf", "zen-browser", "waterfox", "mullvad-browser", "floorp"],
    "browser-extensions": ["google-chrome", "firefox", "safari", "brave", "microsoft-edge", "vivaldi"],
    "incognito-mode": ["google-chrome", "safari", "firefox", "microsoft-edge", "brave", "tor-browser"],
  };
  for (const g of GUIDES) m.set(`/guides/${g.slug}`, { kind: "list", kicker: "Guide", title: fillYear(g.short), subtitle: g.description, logos: pick(guideLogos[g.slug] ?? []) });
  return m;
}

export const OG_CARDS = build();
export const OG_AXES = AXES;
/** Path of the share image for a page path, or the site-wide default. */
export const ogImageFor = (path: string) => (OG_CARDS.has(path) ? `/og${path}.png` : "/og.png");

const list = (names: string[]) => names.length <= 1 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
/** Alt text that says what the card shows, for when it's displayed on the page. */
export function ogAlt(card: Card): string {
  if (card.kind === "browser") return `${card.b.name} score card: ${AXES.map((ax) => `${ax.label.toLowerCase()} ${card.b.scores[ax.key]}/5`).join(", ")}.`;
  if (card.kind === "compare") return `${card.a.name} vs ${card.b.name} score comparison: ${AXES.map((ax) => `${ax.label.toLowerCase()} ${card.a.scores[ax.key]} vs ${card.b.scores[ax.key]}`).join(", ")} (out of 5).`;
  return card.logos.length ? `${card.title}, with the logos of ${list(card.logos.map((b) => b.name))}.` : card.title;
}
