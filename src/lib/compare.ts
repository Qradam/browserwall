// Side-by-side browser comparison: table rows and "choose X if" reasons.
// Pure (type-only imports), so the interactive /compare page can bundle it without pulling in the data files.
import type { Browser } from "../data/browsers";

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
const AI_LEVEL = { 1: "Basic chat / summaries", 2: "Integrated assistant", 3: "AI agent" } as const;

export const osList = (b: Browser) => b.os.map((o) => OS_NAME[o]).join(", ");
export const extOf = (b: Browser) =>
  [b.tags.includes("chrome-extensions") && "Chrome Web Store", b.tags.includes("firefox-addons") && "Firefox add-ons"].filter(Boolean).join(", ") || "Limited or none";
export const aiText = (b: Browser) =>
  b.ai ? `${AI_LEVEL[b.ai.level]}${b.ai.quality ? ` (${b.ai.quality}/5)` : ""}, ${b.ai.canDisable === "fully" ? "can be switched off" : b.ai.canDisable === "partly" ? "partly switchable" : "can't be switched off"}` : "None";

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

export function compareRows(list: Browser[]): CompareRow[] {
  const rows: CompareRow[] = COMPARE_AXES.map((a) => ({
    label: a.label, group: "scores", values: list.map((b) => `${b.scores[a.key]}/5`), best: top(list.map((b) => b.scores[a.key])),
  }));
  const fact = (label: string, values: string[], score?: number[]) => rows.push({ label, group: "facts", values, best: score ? top(score) : [] });
  fact("Runs on", list.map(osList), list.map((b) => b.os.length));
  fact("Engine", list.map((b) => ENGINE_NAME[b.engine] + (b.basedOn ? ` (${b.basedOn})` : "")));
  fact("Extensions", list.map(extOf));
  fact("Price", list.map((b) => (b.price ? b.price.note : "Free")), list.map((b) => (b.price ? 0 : 1)));
  fact("Source code", list.map((b) => (b.openSource ? "Open source" : "Closed source")), list.map((b) => (b.openSource ? 1 : 0)));
  fact("Built-in AI", list.map(aiText));
  fact("Built-in features", list.map((b) => Object.entries(COMPARE_FEATURES).filter(([t]) => b.tags.includes(t)).map(([, f]) => f.label).join(", ") || "–"));
  fact("Status", list.map((b) => ({ active: "Actively developed", maintenance: "Maintenance mode", discontinued: "Discontinued" })[b.status]),
    list.map((b) => ({ active: 2, maintenance: 1, discontinued: 0 })[b.status]));
  return rows;
}

/** Reasons to pick `x` over `y`, most important first. */
export function chooseIf(x: Browser, y: Browser): string[] {
  const out: string[] = [];
  if (x.status === "active" && y.status !== "active") out.push(`you want a browser that's still actively developed (${y.name} is ${y.status === "discontinued" ? "discontinued" : "in maintenance mode"})`);
  for (const a of [...COMPARE_AXES].sort((p, q) => (x.scores[q.key] - y.scores[q.key]) - (x.scores[p.key] - y.scores[p.key])))
    if (x.scores[a.key] >= y.scores[a.key] + 1) out.push(`${a.why} (${a.label.toLowerCase()} ${x.scores[a.key]}/5 vs ${y.scores[a.key]}/5)`);
  const os = x.os.filter((o) => o !== "other" && !y.os.includes(o)).map((o) => OS_NAME[o]);
  if (os.length) out.push(`you're on ${os.join(" or ")} – ${y.name} doesn't run there`);
  if (x.tags.includes("chrome-extensions") && !y.tags.includes("chrome-extensions")) out.push("you rely on Chrome Web Store extensions");
  if (x.tags.includes("firefox-addons") && !y.tags.includes("firefox-addons")) out.push("you want Firefox add-ons, including the full uBlock Origin");
  if (!x.price && y.price) out.push(`you don't want to pay (${y.name}: ${y.price.note})`);
  if (x.openSource && !y.openSource) out.push("you want open-source code anyone can audit");
  if (x.ai && !y.ai) out.push("you want a built-in AI assistant");
  else if (!x.ai && y.ai) out.push("you'd rather have no built-in AI at all");
  else if (x.ai && y.ai && (x.ai.quality ?? 0) >= (y.ai.quality ?? 0) + 1) out.push(`you want a stronger AI assistant (${x.ai.quality}/5 vs ${y.ai.quality ?? "?"}/5)`);
  if (x.ai?.agent && !y.ai?.agent) out.push("you want an AI agent that can click through sites for you");
  const feats = Object.entries(COMPARE_FEATURES).filter(([t]) => x.tags.includes(t) && !y.tags.includes(t)).map(([, f]) => f.want);
  if (feats.length) out.push(`you want ${feats.slice(0, 3).join(", ").replace(/, ([^,]*)$/, " and $1")}`);
  if ((x.usageRank != null || x.tags.includes("mainstream")) && y.usageRank == null && !y.tags.includes("mainstream")) out.push("you prefer a well-known browser with a big user base");
  return out;
}

/** Score axes won by each side: [wins for a, wins for b]. */
export const axisWins = (a: Browser, b: Browser) =>
  [COMPARE_AXES.filter((x) => a.scores[x.key] > b.scores[x.key]).length, COMPARE_AXES.filter((x) => b.scores[x.key] > a.scores[x.key]).length] as const;
