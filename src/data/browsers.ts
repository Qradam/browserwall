import raw from "./browsers.json";
import logoMap from "./logos.json";

export type Engine = "blink" | "gecko" | "webkit" | "goanna" | "servo" | "ladybird" | "trident" | "presto" | "text" | "other";
export type OS = "windows" | "macos" | "linux" | "bsd" | "other";
export type Status = "active" | "maintenance" | "discontinued";

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
  logo: string | null; // local path in /public, resolved from logos.json
}

const logos = logoMap as Record<string, { file: string }>;
export const browsers: Browser[] = (raw as Omit<Browser, "logo">[] & { logo?: unknown }[]).map((b) => ({
  ...(b as Browser),
  logo: logos[b.id]?.file ?? null,
}));

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
};

export const ENGINES: Record<Engine, string> = {
  blink: "Blink", gecko: "Gecko", webkit: "WebKit", goanna: "Goanna", servo: "Servo",
  ladybird: "LibWeb", trident: "Trident", presto: "Presto", text: "Text", other: "Other",
};

export const OSES: Record<OS, string> = { windows: "Windows", macos: "macOS", linux: "Linux", bsd: "BSD", other: "Other" };
