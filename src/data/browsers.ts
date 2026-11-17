import raw from "./browsers.json";
import logoMap from "./logos.json";
import socialMap from "../../data/social.json";
import tierData from "./tiers.json";

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
}

const logos = logoMap as Record<string, { file: string }>;
const social = socialMap as Record<string, { reddit: string | null; x: string | null }>;
export const browsers: Browser[] = (raw as unknown as Omit<Browser, "logo" | "reddit" | "x">[]).map((b) => ({
  ...b,
  logo: logos[b.id]?.file ?? null,
  reddit: social[b.id]?.reddit ?? null,
  x: social[b.id]?.x ?? null,
}));
export const byId = new Map(browsers.map((b) => [b.id, b]));

export interface Tier { id: string; label: string; title: string; blurb: string; unranked?: boolean; ids: string[]; notes?: Record<string, string> }
export const tiers = (tierData as { tiers: Tier[] }).tiers;
// Every browser must be placed exactly once – fail the build otherwise.
{
  const seen = tiers.flatMap((t) => t.ids);
  const dup = seen.filter((id, i) => seen.indexOf(id) !== i);
  const unknown = seen.filter((id) => !byId.has(id));
  const missing = browsers.filter((b) => !seen.includes(b.id)).map((b) => b.id);
  if (dup.length || unknown.length || missing.length)
    throw new Error(`tiers.json: dup=[${dup}] unknown=[${unknown}] missing=[${missing}]`);
}
export const tierOf = new Map(tiers.flatMap((t) => t.ids.map((id) => [id, t] as const)));

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
  performance: { label: "Performance", icon: "DashboardSpeed01Icon" },
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
