// "Browser personality" for the shareable result card: turns quiz answers + ranking into an archetype, a secondary
// "rising" archetype and a few stats. Pure module (no DOM), like quiz.ts.
import type { Browser } from "../data/browsers";
import { SLIDERS, FEATURES, AVOID, OS_OPTIONS, EXT_OPTIONS, IMPORTANCE, encode, type QuizState, type Ranking, type Result } from "./quiz";
import { findVariant, type Mark } from "./os-marks";

export interface Archetype {
  id: string;
  name: string;
  emoji: string;
  roast: string;
  /** Card palette: deep background, main accent, second accent. */
  colors: [string, string, string];
}

type Scorer = (s: QuizState, top?: Browser) => number;
const lvl = (v: number, hi: number, mid: number) => (v === 4 ? hi : v === 3 ? mid : 0);
const feat = (s: QuizState, id: keyof QuizState["features"], nice: number, must: number) =>
  s.features[id] === 2 ? must : s.features[id] === 1 ? nice : 0;
const avoids = (s: QuizState, id: QuizState["avoid"][number], pts: number) => (s.avoid.includes(id) ? pts : 0);

/** Highest score wins; list order breaks ties. */
const ARCHETYPES: (Archetype & { score: Scorer })[] = [
  { id: "ghost", name: "The Ghost", emoji: "👻", colors: ["#0b0b1a", "#7c3aed", "#22d3ee"],
    roast: "Your threat model has a threat model. Cookies? Never heard of them.",
    score: (s, t) => lvl(s.sliders.privacy, 6, 3) + feat(s, "tor", 4, 6) + avoids(s, "data", 2) + (t?.scores.privacy === 5 ? 2 : 0) },
  { id: "ai", name: "The AI Maximalist", emoji: "🤖", colors: ["#04111f", "#3b82f6", "#f472b6"],
    roast: "You'd let a chatbot pick your browser. Oh wait, you basically just did.",
    score: (s) => feat(s, "ai", 3, 6) + feat(s, "ai-agent", 4, 8) },
  { id: "ricer", name: "The Ricer", emoji: "🎨", colors: ["#1a0614", "#f43f5e", "#facc15"],
    roast: "Spent 4 hours on a theme. Browsed for 5 minutes. Worth it.",
    score: (s, t) => lvl(s.sliders.custom, 6, 3) + (t?.tags.includes("customizable") ? 1 : 0) },
  { id: "hoarder", name: "The Tab Hoarder", emoji: "🗂️", colors: ["#061a12", "#22c55e", "#a3e635"],
    roast: "347 tabs open. All of them \u201cfor later\u201d. Later never comes.",
    score: (s) => feat(s, "vertical-tabs", 2, 4) + feat(s, "workspaces", 2, 3) + feat(s, "split-view", 1, 2) },
  { id: "vim", name: "The Keyboard Goblin", emoji: "⌨️", colors: ["#0a0f0a", "#4ade80", "#e5e7eb"],
    roast: "Mice are for people with time to waste. :wq",
    score: (s) => feat(s, "keyboard-driven", 3, 7) },
  { id: "monk", name: "The Monk", emoji: "🧘", colors: ["#111111", "#e7e5e4", "#a8a29e"],
    roast: "Your new tab page is a blank void and you've never felt more at peace.",
    score: (s) => lvl(s.sliders.minimal, 6, 3) + avoids(s, "ai", 2) + avoids(s, "crypto", 1) },
  { id: "potato", name: "The Potato Whisperer", emoji: "🥔", colors: ["#1a1206", "#f59e0b", "#fde68a"],
    roast: "Your laptop sounds like a jet engine at idle. Every megabyte counts.",
    score: (s) => lvl(s.sliders.light, 6, 3) },
  { id: "refugee", name: "The Chrome Refugee", emoji: "🏃", colors: ["#140a04", "#fb923c", "#38bdf8"],
    roast: "Breaking up with Google, one setting at a time. It's not you, it's the telemetry.",
    score: (s) => avoids(s, "chromium", 5) + feat(s, "de-googled", 2, 3) },
  { id: "purist", name: "The Source Code Purist", emoji: "🧾", colors: ["#06121a", "#14b8a6", "#c4b5fd"],
    roast: "If you can't read the source, you don't trust it. You have read none of the source.",
    score: (s) => feat(s, "open-source", 2, 4) + avoids(s, "closed", 4) },
  { id: "normie", name: "The Just-Works Enjoyer", emoji: "😌", colors: ["#0a0a14", "#60a5fa", "#fbbf24"],
    roast: "You don't want a hobby. You want a browser. Respect.",
    score: (s) => lvl(s.sliders.polish, 5, 2) + lvl(s.sliders.known, 5, 2) },
];
const BALANCED: Archetype = { id: "balanced", name: "The Perfectly Balanced", emoji: "⚖️", colors: ["#0d0d0d", "#fafafa", "#a1a1a1"],
  roast: "No strong opinions, no dealbreakers. As all things should be." };
const NOTHING: Archetype = { id: "impossible", name: "The Impossible Standard", emoji: "💀", colors: ["#140505", "#f87171", "#fafafa"],
  roast: "Not a single browser survived your requirements. You may need to build your own." };

export interface CardData {
  archetype: Archetype;
  rising: Archetype | null;
  top: Result | null;
  runnersUp: Browser[];
  priorities: { label: string; level: string; value: number }[]; // sliders at "Somewhat" or more, strongest first
  must: string[];
  nice: string[];
  avoid: string[];
  os: string | null;
  /** OS / distro to flex on the card (null = hidden). */
  osMark: Mark | null;
  ext: string | null;
  fit: number;
  total: number;
  /** 0-1 rarity of the top pick: niche browsers are rarer than the household names. */
  rarity: { label: string; stars: number };
  /** Stable per-answers number for decorative randomness (receipt barcode, order number). */
  seed: number;
}

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  return h >>> 0;
}

function rarityOf(b: Browser | undefined) {
  if (!b) return { label: "Mythical", stars: 5 };
  if (b.usageRank == null) return { label: "Legendary", stars: 4 };
  if (b.usageRank < 5) return { label: "Common", stars: 1 };
  if (b.usageRank < 12) return { label: "Uncommon", stars: 2 };
  return { label: "Rare", stars: 3 };
}

export interface CardOptions {
  /** Show the OS on the card. */
  showOs?: boolean;
  /** Distro / version id from OS_VARIANTS; falls back to the generic OS mark. */
  osVariant?: string | null;
}

export function personality(state: QuizState, ranking: Ranking, total: number, opts: CardOptions = {}): CardData {
  const top = ranking.results[0] ?? null;
  const scored = ARCHETYPES.map((a) => ({ a, pts: a.score(state, top?.browser) }))
    .filter((x) => x.pts >= 3)
    .sort((x, y) => y.pts - x.pts); // stable sort keeps list order on ties
  const archetype = !top ? NOTHING : scored[0]?.a ?? BALANCED;
  const rising = scored.find((x) => x.a !== archetype)?.a ?? null;
  const strip = ({ score: _s, ...a }: Archetype & { score?: Scorer }): Archetype => a;

  return {
    archetype: strip(archetype),
    rising: rising ? strip(rising) : null,
    top,
    runnersUp: ranking.results.slice(1, 3).map((r) => r.browser),
    priorities: SLIDERS.filter((sl) => state.sliders[sl.id] >= 2)
      .map((sl) => ({ label: sl.title, level: IMPORTANCE[state.sliders[sl.id]], value: state.sliders[sl.id] }))
      .sort((a, b) => b.value - a.value),
    must: FEATURES.filter((f) => state.features[f.id] === 2).map((f) => f.label),
    nice: FEATURES.filter((f) => state.features[f.id] === 1).map((f) => f.label),
    avoid: AVOID.filter((a) => state.avoid.includes(a.id)).map((a) => a.label),
    os: OS_OPTIONS.find((o) => o.id === state.os)?.label ?? null,
    osMark: opts.showOs === false ? null : findVariant(state.os, opts.osVariant ?? null),
    ext: EXT_OPTIONS.find((o) => o.id === state.ext)?.label ?? null,
    fit: ranking.results.length,
    total,
    rarity: rarityOf(top?.browser),
    seed: hash(encode(state)),
  };
}

/** Text for the native share sheet / clipboard. */
export function shareText(d: CardData) {
  const pick = d.top ? `My browser is ${d.top.browser.name} (${d.top.match}% match)${d.osMark ? ` on ${d.osMark.label}` : ""}.` : "No browser could handle me.";
  return `My browser personality: ${d.archetype.name} ${d.archetype.emoji} ${pick} Find yours:`;
}
