import raw from "./browsers.json";
import logoMap from "./logos.json";
import socialMap from "../../data/social.json";
import notesMap from "../../data/notes.json";
import scoreNotesMap from "../../data/score-notes.json";
import starsMap from "../../data/stars.json";
import repoMap from "../../data/repo-check.json";
import wallOrder from "../../data/wall-order.json";
import aiMap from "../../data/ai.json";
import pricingMap from "../../data/pricing.json";
import channelMap from "../../data/channels.json";

export type Engine = "blink" | "gecko" | "webkit" | "goanna" | "servo" | "ladybird" | "trident" | "presto" | "text" | "other";
export type OS = "windows" | "macos" | "linux" | "bsd" | "other";
export type Status = "active" | "maintenance" | "discontinued";

export interface Scores {
  privacy: number; // 1-5
  experience: number; // 1-5
  customisation: number; // 1-5
  lightness: number; // 1-5, RAM/footprint, not a benchmark
  minimalism: number; // 1-5, 5 = minimal/clean, 1 = bloated with built-in extras
  lowConfidence?: boolean;
}

export interface Browser {
  id: string;
  name: string;
  engine: Engine;
  basedOn: string | null;
  os: OS[];
  status: Status;
  openSource: boolean;
  description: string;
  tags: string[];
  website: string | null;
  repo: string | null;
  scores: Scores;
  logo: string | null; // local path in /public, resolved from logos.json
  reddit: string | null;
  x: string | null;
  family: Family;
  channelOf: string | null; // beta/nightly/dev builds -> id of the main browser
  note: string | null; // factual "good to know", data/notes.json
  stars: number | null; // GitHub stars, data/stars.json
  lastCommit: string | null; // YYYY-MM-DD, data/repo-check.json
  usageRank: number | null; // position in data/wall-order.json (0 = most used), null = not in the well-known list
  scoreWhy: string | null; // summary of online opinion behind the scores, data/score-notes.json
  scoreSources: string[];
  ai: AiInfo | null; // built-in AI, data/ai.json (channels inherit from their parent); null = none
  price: { paid: OS[]; note: string } | null; // data/pricing.json; null = free
}

export interface AiInfo {
  level: 1 | 2 | 3; // 1 basic chat/summaries, 2 integrated assistant, 3 agentic
  agent: boolean; // can act in the browser for you
  agentPaid: boolean; // agent needs a paid tier
  models: string;
  onByDefault: boolean;
  canDisable: "fully" | "partly" | "no";
  local: boolean; // on-device / local model option
  quality: number | null; // 1-5, how capable and well-regarded
  note: string;
  sources: string[];
}

/** Big engine families, used for filters on the tier maker and grouping. */
export type Family = "chromium" | "firefox" | "webkit" | "other" | "terminal";
export const FAMILIES: Record<Family, { label: string; hint: string }> = {
  chromium: { label: "Chromium", hint: "Blink engine: Chrome, Edge, Brave, Opera…" },
  firefox: { label: "Firefox", hint: "Gecko & Goanna: Firefox and its forks" },
  webkit: { label: "WebKit", hint: "Safari and other WebKit browsers" },
  other: { label: "Own engine", hint: "Ladybird, Servo and historic engines" },
  terminal: { label: "Terminal", hint: "Text-mode browsers" },
};
const familyOf = (e: Engine): Family =>
  e === "blink" ? "chromium" : e === "gecko" || e === "goanna" ? "firefox" : e === "webkit" ? "webkit" : e === "text" ? "terminal" : "other";

/** Pre-release / alternate channels of another browser on the wall (data/channels.json). */
const CHANNELS = Object.fromEntries(Object.entries(channelMap).filter(([k]) => !k.startsWith("_"))) as Record<string, string>;
const aiData = aiMap as unknown as Record<string, AiInfo & { level: number }>;
const aiOf = (id: string): AiInfo | null => {
  const a = aiData[id] ?? aiData[CHANNELS[id]];
  return a && a.level > 0 ? (a as AiInfo) : null;
};

const logos = logoMap as Record<string, { file: string }>;
const social = socialMap as Record<string, { reddit: string | null; x: string | null }>;
const notes = notesMap as Record<string, string>;
const scoreNotes = scoreNotesMap as unknown as Record<string, { why: string; sources: string[] }>;
const stars = starsMap as Record<string, number>;
const repos = repoMap as Record<string, { lastCommit?: string }>;
const known = (wallOrder as { order: string[] }).order;
const all: Browser[] = (raw as unknown as Omit<Browser, "logo" | "reddit" | "x" | "family" | "channelOf" | "note" | "stars" | "lastCommit" | "usageRank" | "scoreWhy" | "scoreSources" | "ai" | "price">[]).map((b) => ({
  ...b,
  logo: logos[b.id]?.file ?? null,
  reddit: social[b.id]?.reddit ?? null,
  x: social[b.id]?.x ?? null,
  family: familyOf(b.engine),
  channelOf: CHANNELS[b.id] ?? null,
  note: notes[b.id] ?? null,
  stars: b.repo ? stars[b.id] ?? null : null,
  lastCommit: b.repo ? repos[b.id]?.lastCommit ?? null : null,
  usageRank: known.includes(b.id) ? known.indexOf(b.id) : null,
  scoreWhy: scoreNotes[b.id]?.why ?? null,
  scoreSources: scoreNotes[b.id]?.sources ?? [],
  ai: aiOf(b.id),
  price: (pricingMap as unknown as Record<string, { paid: OS[]; note: string }>)[b.id] ?? null,
}));

// Wall order: well-known first (data/wall-order.json – usage, not quality), then A-Z, then channels, then the dead.
for (const id of known) if (!all.some((b) => b.id === id)) throw new Error(`wall-order.json: unknown id ${id}`);
const bucket = (b: Browser) => (b.status === "discontinued" ? 3 : b.channelOf ? 2 : known.includes(b.id) ? 0 : 1);
export const browsers = [...all].sort((a, b) =>
  bucket(a) - bucket(b) || (bucket(a) === 0 ? known.indexOf(a.id) - known.indexOf(b.id) : a.name.localeCompare(b.name)));
export const byId = new Map(browsers.map((b) => [b.id, b]));

/** Score axes in display order, with the rubric shown to users (see data/SCHEMA.md). */
export const AXES = [
  { key: "privacy", label: "Privacy", low: "Data-hungry owner", high: "No tracking, no telemetry" },
  { key: "experience", label: "Out-of-box experience", low: "Rough, needs setup", high: "Polished, just works" },
  { key: "customisation", label: "Customisation", low: "Little to change", high: "Deep UI & extensions" },
  { key: "lightness", label: "Lightness", low: "Heavy on RAM/CPU", high: "Tiny footprint" },
  { key: "minimalism", label: "Minimalism", low: "Bundled extras", high: "Clean, few built-ins" },
] as const;
export type AxisKey = (typeof AXES)[number]["key"];

/** Display metadata for tags: label + Hugeicons name. Order = order of filter chips. */
export const TAGS: Record<string, { label: string; icon: string }> = {
  privacy: { label: "Privacy", icon: "Shield01Icon" },
  "de-googled": { label: "De-Googled", icon: "IncognitoIcon" },
  "ad-blocking": { label: "Ad blocking", icon: "AdvertisimentIcon" },
  "security-hardened": { label: "Hardened", icon: "LockIcon" },
  tor: { label: "Tor", icon: "UserLock01Icon" },
  "vertical-tabs": { label: "Vertical tabs", icon: "SidebarLeftIcon" },
  workspaces: { label: "Workspaces", icon: "Layers01Icon" },
  "split-view": { label: "Split view", icon: "LayoutTwoColumnIcon" },
  "keyboard-driven": { label: "Keyboard-driven", icon: "KeyboardIcon" },
  "power-user": { label: "Power user", icon: "Wrench01Icon" },
  customizable: { label: "Customizable", icon: "PaintBoardIcon" },
  minimal: { label: "Minimal", icon: "Leaf01Icon" },
  lightweight: { label: "Lightweight", icon: "FeatherIcon" },
  "old-hardware": { label: "Old hardware", icon: "CpuIcon" },
  gaming: { label: "Gaming", icon: "GameController01Icon" },
  ai: { label: "AI", icon: "AiBrain01Icon" },
  crypto: { label: "Crypto", icon: "Bitcoin01Icon" },
  developer: { label: "Developer", icon: "CodeIcon" },
  sync: { label: "Sync", icon: "Clock01Icon" },
  mainstream: { label: "Mainstream", icon: "Globe02Icon" },
  "chrome-extensions": { label: "Chrome extensions", icon: "PuzzleIcon" },
  "firefox-addons": { label: "Firefox add-ons", icon: "PuzzleIcon" },
  "independent-engine": { label: "Own engine", icon: "ChipIcon" },
  "text-mode": { label: "Terminal", icon: "TerminalIcon" },
  retro: { label: "Retro", icon: "Archive01Icon" },
  portable: { label: "Portable", icon: "Briefcase01Icon" },
  regional: { label: "Regional", icon: "Globe02Icon" },
  enterprise: { label: "Enterprise", icon: "Building03Icon" },
  experimental: { label: "Experimental", icon: "Rocket01Icon" },
  meme: { label: "Meme", icon: "LaughingIcon" },
  rip: { label: "RIP", icon: "SkullIcon" },
  vpn: { label: "Built-in VPN", icon: "Shield02Icon" },
};

export const ENGINES: Record<Engine, string> = {
  blink: "Blink", gecko: "Gecko", webkit: "WebKit", goanna: "Goanna", servo: "Servo",
  ladybird: "LibWeb", trident: "Trident", presto: "Presto", text: "Text", other: "Other",
};

export const OSES: Record<OS, string> = { windows: "Windows", macos: "macOS", linux: "Linux", bsd: "BSD", other: "Other" };
