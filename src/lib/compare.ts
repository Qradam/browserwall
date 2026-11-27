// Side-by-side browser comparison: table rows and "choose X if" reasons.
// Pure (type-only imports), so the interactive /compare page can bundle it without pulling in the data files.
import type { Browser } from "../data/browsers";
import type { Locale } from "../i18n";
import { COMPARE_I18N } from "../i18n/nav-pages";
import { UI } from "../i18n/ui";

type Axis = "privacy" | "experience" | "customisation" | "lightness" | "minimalism";
export const COMPARE_AXES: { key: Axis; label: string; why: string }[] = [
  { key: "privacy", label: "Privacy", why: "you want more privacy out of the box" },
  { key: "experience", label: "Out-of-box experience", why: "you want something polished that just works" },
  { key: "customisation", label: "Customisation", why: "you like to tweak layouts, themes and settings" },
  { key: "lightness", label: "Lightness", why: "you want lower RAM and CPU use" },
  { key: "minimalism", label: "Minimalism", why: "you want fewer bundled extras" },
];
const OS_NAME = { windows: "Windows", macos: "macOS", linux: "Linux", bsd: "BSD", other: "Other" } as const;
const ENGINE_NAME: Record<string, string> = {
  blink: "Blink", gecko: "Gecko", webkit: "WebKit", goanna: "Goanna", servo: "Servo", ladybird: "LibWeb", trident: "Trident", presto: "Presto", text: "Text", other: "Other",
};
/** Built-in features worth comparing, with the phrase used in "choose X if you want …". */
export const COMPARE_FEATURES: Record<string, { label: string; want: string }> = {
  "ad-blocking": { label: "Ad blocker", want: "a built-in ad blocker" },
  "vertical-tabs": { label: "Vertical tabs", want: "vertical tabs without an extension" },
  workspaces: { label: "Workspaces", want: "workspaces to separate projects" },
  "split-view": { label: "Split view", want: "split view for two pages side by side" },
  "keyboard-driven": { label: "Keyboard / Vim control", want: "to drive the browser from the keyboard" },
  vpn: { label: "Built-in VPN", want: "a built-in VPN" },
  tor: { label: "Tor", want: "Tor built in" },
  "de-googled": { label: "No Google services", want: "no Google services at all" },
  "security-hardened": { label: "Hardened", want: "hardened security settings" },
  sync: { label: "Sync", want: "built-in sync across devices" },
  portable: { label: "Portable", want: "a portable build" },
};
const fmt = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
const osName = (o: keyof typeof OS_NAME, lang: Locale) => UI[lang].oses[o as keyof (typeof UI)[Locale]["oses"]] ?? OS_NAME[o];
const engineName = (e: string, lang: Locale) => UI[lang].engines[e as keyof (typeof UI)[Locale]["engines"]] ?? ENGINE_NAME[e] ?? e;

export const osList = (b: Browser, lang: Locale = "en") => b.os.map((o) => osName(o, lang)).join(", ");
export const extOf = (b: Browser, lang: Locale = "en") => {
  const t = COMPARE_I18N[lang].engine;
  return [b.tags.includes("chrome-extensions") && t.extChrome, b.tags.includes("firefox-addons") && t.extFirefox].filter(Boolean).join(", ") || t.extLimited;
};
export const aiText = (b: Browser, lang: Locale = "en") => {
  const t = COMPARE_I18N[lang].engine;
  return b.ai ? `${t.aiLevel[b.ai.level]}${b.ai.quality ? ` (${b.ai.quality}/5)` : ""}, ${t.aiDisable[b.ai.canDisable]}` : t.aiNone;
};

export interface CompareRow {
  label: string;
  values: string[];
  /** Indices of the browsers that do best on this row (empty when it's a tie or not a better/worse row). */
  best: number[];
  group: "scores" | "facts";
}

/** Indices holding the top value, or [] when everyone is equal. */
const top = (vals: number[]) => {
  const max = Math.max(...vals);
  return vals.every((v) => v === max) ? [] : vals.flatMap((v, i) => (v === max ? [i] : []));
};

export function compareRows(list: Browser[], lang: Locale = "en"): CompareRow[] {
  const t = COMPARE_I18N[lang].engine;
  const rows: CompareRow[] = COMPARE_AXES.map((a) => ({
    label: t.axes[a.key].label, group: "scores", values: list.map((b) => `${b.scores[a.key]}/5`), best: top(list.map((b) => b.scores[a.key])),
  }));
  const fact = (label: string, values: string[], score?: number[]) => rows.push({ label, group: "facts", values, best: score ? top(score) : [] });
  fact(t.runsOn, list.map((b) => osList(b, lang)), list.map((b) => b.os.length));
  fact(t.engineLabel, list.map((b) => engineName(b.engine, lang) + (b.basedOn ? ` (${b.basedOn})` : "")));
  fact(t.extensionsLabel, list.map((b) => extOf(b, lang)));
  fact(t.priceLabel, list.map((b) => (b.price ? b.price.note : t.free)), list.map((b) => (b.price ? 0 : 1)));
  fact(t.sourceLabel, list.map((b) => (b.openSource ? t.openSource : t.closedSource)), list.map((b) => (b.openSource ? 1 : 0)));
  fact(t.aiLabel, list.map((b) => aiText(b, lang)));
  const featKeys = Object.keys(COMPARE_FEATURES) as (keyof typeof t.features)[];
  fact(t.featuresLabel, list.map((b) => featKeys.filter((k) => b.tags.includes(k)).map((k) => t.features[k].label).join(", ") || "–"));
  fact(t.statusLabel, list.map((b) => t.status[b.status]), list.map((b) => ({ active: 2, maintenance: 1, discontinued: 0 })[b.status]));
  return rows;
}

/** Reasons to pick `x` over `y`, most important first. */
export function chooseIf(x: Browser, y: Browser, lang: Locale = "en"): string[] {
  const t = COMPARE_I18N[lang].engine;
  const out: string[] = [];
  if (x.status === "active" && y.status !== "active") {
    out.push(fmt(t.whyActive, { other: y.name, status: y.status === "discontinued" ? t.whyStatusDiscontinued : t.whyStatusMaintenance }));
  }
  for (const a of [...COMPARE_AXES].sort((p, q) => (x.scores[q.key] - y.scores[q.key]) - (x.scores[p.key] - y.scores[p.key]))) {
    if (x.scores[a.key] >= y.scores[a.key] + 1) {
      const ax = t.axes[a.key];
      out.push(`${ax.why} (${ax.label.toLowerCase()} ${x.scores[a.key]}/5 vs ${y.scores[a.key]}/5)`);
    }
  }
  const os = x.os.filter((o) => o !== "other" && !y.os.includes(o)).map((o) => osName(o, lang));
  if (os.length) out.push(fmt(t.whyOs, { os: os.join(t.orWord), other: y.name }));
  if (x.tags.includes("chrome-extensions") && !y.tags.includes("chrome-extensions")) out.push(t.whyChromeExt);
  if (x.tags.includes("firefox-addons") && !y.tags.includes("firefox-addons")) out.push(t.whyFirefoxExt);
  if (!x.price && y.price) out.push(fmt(t.whyFree, { other: y.name, price: y.price.note }));
  if (x.openSource && !y.openSource) out.push(t.whyOss);
  if (x.ai && !y.ai) out.push(t.whyHasAi);
  else if (!x.ai && y.ai) out.push(t.whyNoAi);
  else if (x.ai && y.ai && (x.ai.quality ?? 0) >= (y.ai.quality ?? 0) + 1) out.push(fmt(t.whyStrongerAi, { a: x.ai.quality ?? "?", b: y.ai.quality ?? "?" }));
  if (x.ai?.agent && !y.ai?.agent) out.push(t.whyAiAgent);
  const featKeys = Object.keys(COMPARE_FEATURES) as (keyof typeof t.features)[];
  const feats = featKeys.filter((k) => x.tags.includes(k) && !y.tags.includes(k)).map((k) => t.features[k].want);
  if (feats.length) out.push(fmt(t.whyWant, { list: feats.slice(0, 3).join(", ").replace(/, ([^,]*)$/, `${t.andWord}$1`) }));
  if ((x.usageRank != null || x.tags.includes("mainstream")) && y.usageRank == null && !y.tags.includes("mainstream")) out.push(t.whyKnown);
  return out;
}

/** Score axes won by each side: [wins for a, wins for b]. */
export const axisWins = (a: Browser, b: Browser) =>
  [COMPARE_AXES.filter((x) => a.scores[x.key] > b.scores[x.key]).length, COMPARE_AXES.filter((x) => b.scores[x.key] > a.scores[x.key]).length] as const;
