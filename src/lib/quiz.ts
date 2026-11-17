// Browser quiz: pick questions + tradeoff sliders + must-have / dealbreaker picks
// -> hard filters and a weighted match over the editorial scores (data/scores.json) and tags.
// Pure module (no DOM) so the page can re-rank live and it can be sanity-checked from Node.
import type { Browser } from "../data/browsers";

type Axis = "privacy" | "experience" | "customisation" | "lightness" | "minimalism";
const AXES: Axis[] = ["privacy", "experience", "customisation", "lightness", "minimalism"];
const has = (b: Browser, t: string) => b.tags.includes(t);

// ---------------------------------------------------------------------------- questions

export const OS_OPTIONS = [
  { id: "windows", label: "Windows" }, { id: "macos", label: "macOS" }, { id: "linux", label: "Linux" },
] as const;

export const EXT_OPTIONS = [
  { id: "chrome", label: "Chrome Web Store", hint: "uBlock Origin Lite, password managers, most of everything" },
  { id: "firefox", label: "Firefox add-ons", hint: "Full uBlock Origin, Tree Style Tab, Sidebery…" },
  { id: "any", label: "Either is fine", hint: "Just the basics, or none at all" },
] as const;

/** Importance sliders, 0..4: how much each quality matters. They only weight the ranking – they never remove a browser
 *  (that's what must-haves and dealbreakers are for). 0 = "don't care". */
export const IMPORTANCE = ["Don't care", "A little", "Somewhat", "A lot", "Top priority"] as const;
const IMP_W = [0, 0.3, 0.8, 2, 4]; // weight per position (steep, so "top priority" really leads); multiplies score − 3
export const SLIDERS = [
  { id: "privacy", axis: "privacy", title: "Privacy", help: "Blocks tracking by default, no telemetry, and an owner that doesn't make money from your data." },
  { id: "polish", axis: "experience", title: "Works out of the box", help: "Polished and stable, and sites just work without changing settings." },
  { id: "custom", axis: "customisation", title: "Customisation", help: "Reshape the interface: themes, layout, deep settings and add-ons." },
  { id: "light", axis: "lightness", title: "Light on resources", help: "Low RAM and CPU use. Turn this up on an older or low-memory computer." },
  { id: "minimal", axis: "minimalism", title: "Minimal, few extras", help: "No wallet, VPN upsell, news feed or AI sidebar you didn't ask for." },
  { id: "known", axis: null, title: "Well-known", help: "A big user base and a long track record, rather than a small or new project." },
] as const;
export type SliderId = (typeof SLIDERS)[number]["id"];

/** Must-have features: 0 = don't care, 1 = nice to have (bonus), 2 = must have (filter). */
export const FEATURES = [
  { id: "vertical-tabs", group: "Tabs & layout", label: "Vertical tabs", test: (b: Browser) => has(b, "vertical-tabs") },
  { id: "workspaces", group: "Tabs & layout", label: "Workspaces", test: (b: Browser) => has(b, "workspaces") },
  { id: "split-view", group: "Tabs & layout", label: "Split view", test: (b: Browser) => has(b, "split-view") },
  { id: "keyboard-driven", group: "Tabs & layout", label: "Keyboard / Vim control", test: (b: Browser) => has(b, "keyboard-driven") },
  { id: "ad-blocking", group: "Privacy & openness", label: "Built-in ad blocker", test: (b: Browser) => has(b, "ad-blocking") },
  { id: "de-googled", group: "Privacy & openness", label: "No Google services", test: (b: Browser) => has(b, "de-googled") || b.family !== "chromium" },
  { id: "open-source", group: "Privacy & openness", label: "Open source", test: (b: Browser) => b.openSource },
  { id: "vpn", group: "Privacy & openness", label: "Built-in VPN", test: (b: Browser) => has(b, "vpn") },
  { id: "tor", group: "Privacy & openness", label: "Tor network", test: (b: Browser) => has(b, "tor") },
  { id: "ai", group: "AI", label: "AI assistant", test: (b: Browser) => !!b.ai },
  { id: "ai-agent", group: "AI", label: "AI agent that browses for you", test: (b: Browser) => !!b.ai?.agent },
] as const;
export type FeatureId = (typeof FEATURES)[number]["id"];

/** Dealbreakers: always hard filters. */
export const AVOID = [
  { id: "ai", label: "AI you can't switch off", test: (b: Browser) => !!b.ai && b.ai.canDisable !== "fully" },
  { id: "crypto", label: "Crypto / wallet", test: (b: Browser) => has(b, "crypto") },
  { id: "chromium", label: "Chromium-based", test: (b: Browser) => b.family === "chromium" },
  { id: "data", label: "Ad / data-business owner", test: (b: Browser) => b.scores.privacy <= 2 },
  { id: "closed", label: "Closed source", test: (b: Browser) => !b.openSource },
  { id: "slow", label: "Maintenance-only updates", test: (b: Browser) => b.status === "maintenance" },
  { id: "paid", label: "Costs money", test: (b: Browser) => !!b.price },
] as const;
export type AvoidId = (typeof AVOID)[number]["id"];

// ---------------------------------------------------------------------------- state

export interface QuizState {
  os: string | null;
  ext: string | null;
  sliders: Record<SliderId, number>;
  features: Partial<Record<FeatureId, 1 | 2>>;
  avoid: AvoidId[];
}
export const defaultState = (): QuizState => ({
  os: null, ext: null, sliders: { privacy: 2, polish: 2, custom: 1, light: 1, minimal: 2, known: 1 }, features: {}, avoid: [],
});

/** Compact URL form: os=linux&ext=any&s=242121&f=vertical-tabs.2,ai.1&x=crypto,data */
export function encode(s: QuizState) {
  const p = new URLSearchParams();
  if (s.os) p.set("os", s.os);
  if (s.ext) p.set("ext", s.ext);
  p.set("s", SLIDERS.map((x) => s.sliders[x.id]).join(""));
  const f = Object.entries(s.features).map(([k, v]) => `${k}.${v}`);
  if (f.length) p.set("f", f.join(","));
  if (s.avoid.length) p.set("x", s.avoid.join(","));
  return p.toString();
}
export function decode(str: string): QuizState {
  const p = new URLSearchParams(str), s = defaultState();
  if (OS_OPTIONS.some((o) => o.id === p.get("os"))) s.os = p.get("os");
  if (EXT_OPTIONS.some((o) => o.id === p.get("ext"))) s.ext = p.get("ext");
  const digits = p.get("s") ?? "";
  SLIDERS.forEach((x, i) => {
    if (digits[i] === "x") s.sliders[x.id] = 0; // old links: "x" meant don't care
    else if (/^[0-4]$/.test(digits[i] ?? "")) s.sliders[x.id] = +digits[i];
  });
  for (const part of (p.get("f") ?? "").split(",")) {
    const [k, v] = part.split(".");
    if (FEATURES.some((f) => f.id === k) && (v === "1" || v === "2")) s.features[k as FeatureId] = +v as 1 | 2;
  }
  s.avoid = (p.get("x") ?? "").split(",").filter((x): x is AvoidId => AVOID.some((a) => a.id === x));
  return s;
}

// ---------------------------------------------------------------------------- ranking

/** Browsers the quiz may suggest: alive, stable, daily-drivable and without a history of selling data.
 *  Legacy-OS browsers (tag old-hardware: Supermium, r3dfox, Pale Moon) are left out – on a current OS a mainstream
 *  browser is safer and more compatible. They stay on the wall and in the tier maker. */
export const eligible = (b: Browser) =>
  b.status !== "discontinued" && !b.channelOf && !has(b, "meme") && !has(b, "experimental") && !has(b, "text-mode") && !has(b, "old-hardware") &&
  !(has(b, "developer") && !has(b, "mainstream")) && b.scores.privacy > 1;

const AXIS_WHY: Record<Axis, string> = {
  privacy: "Privacy", experience: "Polished out of the box", customisation: "Customisation", lightness: "Light on resources", minimalism: "Clean, few extras",
};

export interface Result {
  browser: Browser;
  score: number;
  match: number; // 0-100, relative to the best possible score for these answers
  reasons: string[];
  wanted: { label: string; ok: boolean; must: boolean; detail?: string }[]; // checklist of picked features
  lead?: string; // set on the 1-2 places reserved for "Top priority" sliders, e.g. "Privacy"
  paid?: string; // price note when the browser costs money on the chosen OS
}
export interface Ranking { results: Result[]; excluded: { why: string; count: number }[] }

/** Hard filters in order; the first one a browser fails is reported in `excluded`. */
function filters(s: QuizState): { why: string; fails: (b: Browser) => boolean }[] {
  const osLabel = OS_OPTIONS.find((o) => o.id === s.os)?.label;
  const out: { why: string; fails: (b: Browser) => boolean }[] = [];
  if (s.os) out.push({ why: `not on ${osLabel}`, fails: (b) => !b.os.includes(s.os as Browser["os"][number]) });
  if (s.ext === "chrome") out.push({ why: "no Chrome Web Store", fails: (b) => !has(b, "chrome-extensions") });
  if (s.ext === "firefox") out.push({ why: "no Firefox add-ons", fails: (b) => !has(b, "firefox-addons") });
  for (const f of FEATURES) if (s.features[f.id] === 2) out.push({ why: `missing must-have “${f.label}”`, fails: (b) => !f.test(b) });
  for (const a of AVOID) if (s.avoid.includes(a.id)) out.push({ why: `dealbreaker: ${a.label.toLowerCase()}`, fails: a.test });
  return out;
}

/** Axis weights from the importance sliders, plus a small base so overall quality breaks ties. */
export function weights(s: QuizState): Record<Axis, number> {
  const w = { privacy: 0, experience: 0, customisation: 0, lightness: 0, minimalism: 0 } as Record<Axis, number>;
  for (const sl of SLIDERS) if (sl.axis) w[sl.axis] = 0.15 + IMP_W[s.sliders[sl.id]];
  return w;
}


/** How strong a browser's AI is, 0..1: mostly review-based quality (1-5), partly depth (level 1-3), from data/ai.json.
 *  Spread over the full range so a best-in-class assistant clearly beats a basic chat sidebar. */
export const aiStrength = (b: Browser) => (b.ai ? 0.15 + 0.85 * (0.7 * (((b.ai.quality ?? 1) - 1) / 4) + 0.3 * ((b.ai.level - 1) / 2)) : 0);
const agentStrength = (b: Browser) => (b.ai?.agent ? (0.3 + 0.7 * (((b.ai.quality ?? 1) - 1) / 4)) * (b.ai.agentPaid ? 0.85 : 1) : 0);
/** 0..1 value of a wanted feature. AI features are graded so a strong assistant beats a basic chat sidebar. */
const featureValue = (id: FeatureId, b: Browser) => (id === "ai" ? aiStrength(b) : id === "ai-agent" ? agentStrength(b) : FEATURES.find((f) => f.id === id)!.test(b) ? 1 : 0);
const GRADED: FeatureId[] = ["ai", "ai-agent"];
/** Unrequested AI that's on by default and can't be fully turned off counts as clutter. */
const aiClutter = (b: Browser) => !!b.ai && b.ai.onByDefault && b.ai.canDisable !== "fully";

export function rank(all: Browser[], s: QuizState): Ranking {
  const w = weights(s);
  const fs = filters(s);
  const { minimal, known: knownImp, custom } = s.sliders;
  const nice = FEATURES.filter((f) => s.features[f.id] === 1);
  // Graded must-haves (AI) still rank by strength among the browsers that pass the filter.
  const gradedMust = FEATURES.filter((f) => s.features[f.id] === 2 && GRADED.includes(f.id));
  const picked = FEATURES.filter((f) => s.features[f.id]);
  // Best achievable score for these answers -> turns raw scores into a 0-100 match.
  const knownPts = 0.8 * IMP_W[knownImp];
  // Best achievable slider score for these answers (turns raw slider points into 0-100).
  const max = AXES.reduce((a, k) => a + w[k] * 2, 0) + knownPts + (custom === 4 ? 0.5 : 0);
  // Wanted features rank first: each one is worth more than the whole slider range, so a browser with more of
  // what you asked for always sits above one with less, and sliders order browsers within the same coverage.
  // AI features count fractionally by how capable the AI is (aiStrength / agentStrength).
  const wanted = [...nice, ...gradedMust];
  const FEATURE_PTS = 2 * max + 1;

  const excluded = new Map<string, number>();
  const results: Result[] = [];
  for (const b of all) {
    if (!eligible(b)) continue;
    const failed = fs.find((f) => f.fails(b));
    if (failed) { excluded.set(failed.why, (excluded.get(failed.why) ?? 0) + 1); continue; }

    const parts: { why: string; pts: number }[] = [];
    for (const k of AXES) parts.push({ why: `${AXIS_WHY[k]} ${b.scores[k]}/5`, pts: w[k] * (b.scores[k] - 3) });
    const coverage = wanted.reduce((a, f) => a + featureValue(f.id, b), 0); // shown in the ✓/✗ checklist
    // Unrequested extras annoy people who care about a clean browser.
    if (minimal >= 3) {
      const clutter = [aiClutter(b) && !s.features.ai && !s.features["ai-agent"], has(b, "crypto"), has(b, "vpn") && !s.features.vpn];
      for (const c of clutter) if (c) parts.push({ why: "", pts: -0.5 * IMP_W[minimal] });
    }
    if (custom === 4 && has(b, "power-user")) parts.push({ why: "Power-user features", pts: 0.5 });
    const known = b.usageRank != null || has(b, "mainstream");
    if (known && knownPts) parts.push({ why: "Well-known", pts: knownPts });
    if (b.scores.lowConfidence) parts.push({ why: "", pts: -(0.5 + 0.5 * IMP_W[knownImp]) }); // guessed scores shouldn't win ties
    // Paying is a real cost: about one score point on a "top priority" slider. Without an OS (guides), full penalty
    // if it costs money on Windows or macOS – where most people are – otherwise half.
    const paidHere = b.price && (s.os ? b.price.paid.includes(s.os as Browser["os"][number]) : true);
    const paidPts = !b.price ? 0 : s.os ? (paidHere ? 4 : 0) : b.price.paid.some((o) => o === "windows" || o === "macos") ? 4 : 2;
    if (paidPts) parts.push({ why: "", pts: -paidPts });

    const sliderScore = parts.reduce((a, p) => a + p.pts, 0);
    const sliderMatch = Math.min(1, Math.max(0, (sliderScore + max) / (2 * max || 1)));
    const score = coverage * FEATURE_PTS + sliderScore;
    results.push({
      browser: b, score,
      // Match: 40% "has what you asked for", 60% sliders (all sliders when nothing was asked for).
      match: Math.round(100 * (wanted.length ? 0.4 * (coverage / wanted.length) + 0.6 * sliderMatch : sliderMatch)),
      reasons: parts.filter((p) => p.why && p.pts >= 0.9).sort((a, c) => c.pts - a.pts).slice(0, 3).map((p) => p.why),
      paid: paidHere ? b.price!.note : undefined,
      wanted: picked.map((f) => ({
        label: f.id === "ai-agent" ? "AI agent" : f.label, ok: f.test(b), must: s.features[f.id] === 2,
        detail: f.id === "ai" && b.ai ? `${b.ai.quality ?? "?"}/5` : f.id === "ai-agent" && b.ai?.agentPaid ? "paid" : undefined,
      })),
    });
  }
  results.sort((a, b) => b.score - a.score || a.browser.name.localeCompare(b.browser.name));

  // "Top priority" sliders own 1st and 2nd place: the two browsers that score best on those qualities lead, even
  // above nice-to-haves (ties go to whoever ranks higher overall, so nice-to-haves still break them).
  // Everyone else keeps the nice-to-have-first order.
  const top = SLIDERS.filter((sl) => s.sliders[sl.id] === 4);
  if (top.length && results.length > 2) {
    const prio = (b: Browser) => top.reduce((a, sl) => a + (sl.axis ? b.scores[sl.axis] : b.usageRank != null || has(b, "mainstream") ? 5 : 1), 0);
    const leaders = [...results].sort((a, b) => prio(b.browser) - prio(a.browser) || b.score - a.score).slice(0, 2);
    const label = top.map((sl) => sl.title).join(" + ");
    for (const r of leaders) r.lead = label;
    results.splice(0, results.length, ...leaders, ...results.filter((r) => !leaders.includes(r)));
  }
  return { results, excluded: [...excluded].map(([why, count]) => ({ why, count })).sort((a, b) => b.count - a.count) };
}
