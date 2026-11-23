// SEO helpers: absolute URLs, "best X" category pages and "X alternatives" pages.
// Category and alternative rankings reuse the quiz engine, so every page agrees with the quiz.
import { browsers, byId, type Browser } from "../data/browsers";
import { rank, defaultState, encode, eligible, type QuizState, type FeatureId, type Result } from "./quiz";

export const SITE_NAME = "browserwall";
export const BUILD = new Date();
export const YEAR = BUILD.getFullYear();
export const UPDATED = BUILD.toLocaleDateString("en-US", { month: "long", year: "numeric" }); // e.g. "November 2026"

export const abs = (site: URL | undefined, path: string) => new URL(path, site ?? "https://browserwall.org").href;
/** Canonical path without ".html" / "index". */
export const cleanPath = (p: string) => (p.replace(/(index)?\.html$/, "").replace(/(.)\/$/, "$1") || "/");
/** Search engines cut titles at ~60 characters. Returns the first candidate that fits with the brand suffix,
 *  then the first that fits on its own, then the shortest candidate (each candidate should be shorter than the last). */
export const TITLE_MAX = 60;
export function seoTitle(...candidates: string[]): string {
  const brand = ` – ${SITE_NAME}`;
  return candidates.find((c) => c.length + brand.length <= TITLE_MAX)?.concat(brand)
    ?? candidates.find((c) => c.length <= TITLE_MAX)
    ?? candidates[candidates.length - 1];
}
export const quizLink = (s: QuizState) => `/quiz#${encode(s)}&r=1`;

const state = (o: Partial<Omit<QuizState, "sliders">> & { sliders?: Partial<QuizState["sliders"]> } = {}): QuizState => {
  const d = defaultState();
  return { ...d, ...o, sliders: { ...d.sliders, ...(o.sliders ?? {}) }, features: o.features ?? {}, avoid: o.avoid ?? [] };
};

// ---------------------------------------------------------------------------- "Best X" categories

export interface Category {
  slug: string; // /best/<slug>
  title: string; // used in <title> and H1, "{year}" is replaced
  short: string; // link text on hub pages
  intro: string;
  how: string; // what we ranked by, shown under the list
  state: QuizState;
  /** Extra hard filter on top of the quiz state (e.g. "no built-in AI at all", stricter than the quiz dealbreaker). */
  filter?: (b: Browser) => boolean;
  /** Browser ids shown first, in this order, regardless of score (e.g. the one browser built for the category). */
  pin?: string[];
  faq?: { q: string; a: (top: Result[]) => string }[];
}

const names = (rs: Result[], n = 3) => rs.slice(0, n).map((r) => r.browser.name).join(", ").replace(/, ([^,]*)$/, " and $1");

export const CATEGORIES: Category[] = [
  { slug: "browsers", short: "Best browsers overall", title: "The best web browsers in {year}",
    intro: "The top browsers to download in {year}. Every desktop browser we track, ranked with balanced priorities: privacy and polish matter most, with a bit of customisation, lightness and minimalism.",
    how: "Privacy and out-of-box experience at \"Somewhat\", everything else at \"A little\", on any OS.", state: state(),
    faq: [{ q: "What is the best web browser in {year}?", a: (t) => `With balanced priorities, our top picks are ${names(t)}. The best one for you depends on your OS, the extensions you need and how much you care about privacy – the free quiz takes about two minutes.` },
      { q: "What are good web browsers for most people?", a: (t) => `Good web browsers are fast enough (all mainstream ones are), get security updates every few weeks, block trackers and don't bury you in extras. ${names(t, 5)} all qualify. Chrome and Edge are fine too, but score lower on privacy because their owners make money from data.` },
      { q: "Where should I download a browser?", a: () => "Only from the browser's official website or your system's app store (Microsoft Store, Mac App Store, your Linux distribution's packages or Flathub). Download sites that bundle browsers with installers often add adware. Every browser on this page links to its official download page." }] },
  { slug: "privacy-browsers", short: "Most private browsers", title: "The most private web browsers in {year}",
    intro: "Browsers that block tracking by default, keep telemetry to a minimum and aren't funded by selling your data. Ranked with privacy as the top priority.",
    how: "Privacy at \"Top priority\", out-of-box experience at \"Somewhat\".", state: state({ sliders: { privacy: 4 } }),
    faq: [{ q: "What is the most private browser?", a: (t) => `${t[0]?.browser.name} and ${t[1]?.browser.name} score highest on privacy in our data: strong anti-tracking defaults and no data-driven business model. Tor Browser goes furthest but is slower and breaks more sites.` }] },
  { slug: "browsers-for-windows", short: "Best browsers for Windows", title: "The best browsers for Windows in {year}",
    intro: "Desktop browsers that run on Windows 10 and 11, ranked with balanced priorities.", how: "Windows only, balanced priorities.", state: state({ os: "windows" }),
    faq: [{ q: "What is the best browser for Windows?", a: (t) => `For most people on Windows: ${names(t)}. Edge comes preinstalled, but you can switch in a minute and import your bookmarks and passwords.` }] },
  { slug: "browsers-for-mac", short: "Best browsers for Mac", title: "The best browsers for Mac in {year}",
    intro: "Browsers for macOS, from Safari to the new wave of Arc-style browsers, ranked with balanced priorities.", how: "macOS only, balanced priorities.", state: state({ os: "macos" }),
    faq: [{ q: "What is the best browser for Mac?", a: (t) => `Our top picks for macOS are ${names(t)}. Safari is the most power-efficient on a MacBook; WebKit browsers like Orion share that efficiency while adding extension support.` }] },
  { slug: "browsers-for-linux", short: "Best browsers for Linux", title: "The best browsers for Linux in {year}",
    intro: "Browsers with real Linux builds, ranked with balanced priorities.", how: "Linux only, balanced priorities.", state: state({ os: "linux" }),
    faq: [{ q: "What is the best browser for Linux?", a: (t) => `Our top picks for Linux are ${names(t)}. Most are packaged for major distributions or available as Flatpak.` }] },
  { slug: "lightweight-browsers", short: "Lightweight browsers", title: "The best lightweight browsers in {year}",
    intro: "Browsers that are easy on RAM and CPU. Mainstream browsers are within benchmark noise of each other on speed, so this is about footprint, not raw speed.",
    how: "Light on resources at \"Top priority\", minimal at \"Somewhat\".", state: state({ sliders: { light: 4, minimal: 2 } }) },
  { slug: "ai-browsers", short: "Best AI browsers", title: "The best AI browsers in {year}",
    intro: "Browsers with a built-in AI assistant, ranked by how capable the AI is (models, page context, agents) and how good the browser is around it.",
    how: "AI assistant as a must-have (graded by AI quality), balanced priorities otherwise.", state: state({ features: { ai: 2 } }),
    faq: [{ q: "Which browser has the best AI?", a: (t) => `In our data, ${names(t)} lead: they combine strong models with deep integration. Many AI browsers send page content to cloud models, so check the privacy score before you switch.` }] },
  { slug: "agentic-ai-browsers", short: "AI agent browsers", title: "The best agentic AI browsers in {year}",
    intro: "Browsers whose AI can act for you – clicking, filling forms and running multi-step tasks in your logged-in tabs.",
    how: "AI agent as a must-have (graded by AI quality; paid-only agents count a little less).", state: state({ features: { "ai-agent": 2 } }) },
  { slug: "browsers-with-vertical-tabs", short: "Browsers with vertical tabs", title: "The best browsers with vertical tabs in {year}",
    intro: "Browsers with built-in vertical tabs in a sidebar – no extension needed.", how: "Vertical tabs as a must-have, balanced priorities.", state: state({ features: { "vertical-tabs": 2 } }) },
  { slug: "customizable-browsers", short: "Most customisable browsers", title: "The most customisable browsers in {year}",
    intro: "Browsers you can reshape: layouts, themes, deep settings and add-ons.", how: "Customisation at \"Top priority\".", state: state({ sliders: { custom: 4 } }) },
  { slug: "minimal-browsers", short: "Minimal browsers", title: "The best minimal browsers in {year}",
    intro: "Clean browsers without a wallet, VPN upsell, news feed or AI sidebar you didn't ask for.", how: "Minimal at \"Top priority\".", state: state({ sliders: { minimal: 4 } }) },
  { slug: "open-source-browsers", short: "Open-source browsers", title: "The best open-source browsers in {year}",
    intro: "Browsers whose source code is public, so anyone can check what they do.", how: "Open source as a must-have, balanced priorities.", state: state({ features: { "open-source": 2 } }) },
  { slug: "chromium-browsers-without-google", short: "De-Googled Chromium browsers", title: "The best Chromium browsers without Google in {year}",
    intro: "Chrome-compatible browsers that keep Chrome Web Store extensions but strip out Google's services and tracking.",
    how: "Chrome Web Store support and \"No Google services\" as must-haves.", state: state({ ext: "chrome", features: { "de-googled": 2 } }) },
  { slug: "firefox-based-browsers", short: "Firefox-based browsers", title: "The best Firefox-based browsers in {year}",
    intro: "Firefox and its forks – everything that runs Firefox add-ons.", how: "Firefox add-ons required, balanced priorities.", state: state({ ext: "firefox" }) },
  { slug: "gaming-browsers", short: "Gaming browsers", title: "The best gaming browsers in {year}",
    intro: "Opera GX is the only browser built for gamers, with RAM, CPU and network limiters and Twitch and Discord in the sidebar. After it, these are the Windows browsers that stay out of your game's way: light on RAM and CPU, without bundled extras.",
    how: "Opera GX first as the only gaming-branded browser, then Windows browsers ranked with light on resources at \"Top priority\" and minimal at \"Somewhat\".",
    state: state({ os: "windows", sliders: { light: 4, minimal: 2 } }), pin: ["opera-gx"],
    faq: [
      { q: "What is the best gaming browser?", a: (t) => `Opera GX is the only browser made for gaming: it can cap its own RAM, CPU and network use while you play, and has Twitch, Discord and game-deal integrations. It's heavy and ad-funded though (lightness ${byId.get("opera-gx")?.scores.lightness}/5, privacy ${byId.get("opera-gx")?.scores.privacy}/5 in our scores). If you just want a browser that leaves resources for your game, ${names(t.slice(1))} use less RAM out of the box.` },
      { q: "Does a browser affect gaming performance?", a: () => "Only through RAM and CPU. A browser with many tabs open in the background can take memory and CPU time from a game, which matters most on PCs with 16 GB of RAM or less. Closing tabs, turning off hardware acceleration for the browser, or using a lighter browser helps more than any \"gaming mode\"." },
      { q: "Is Opera GX safe?", a: () => `Opera GX is a legitimate, regularly updated Chromium browser. It is not malware, but it's made by Opera, which earns money from search deals, ads and partner content, so it scores low on privacy (${byId.get("opera-gx")?.scores.privacy}/5). See our Opera GX alternatives page for options with the same features and better privacy.` },
    ] },
  { slug: "browsers-without-ai", short: "Browsers without AI", title: "The best browsers without AI in {year}",
    intro: "No-AI browsers: no chatbot sidebar, no AI summaries, no agent – not even one you have to switch off. For people who want an anti-AI browser rather than a setting buried in a menu.",
    how: "Only browsers with no built-in AI features, ranked with balanced priorities.",
    state: state({ avoid: ["ai"] }), filter: (b) => !b.ai,
    faq: [
      { q: "Which browsers have no AI?", a: (t) => `In our data, the best browsers with no built-in AI at all are ${names(t, 5)}. Chrome, Edge, Opera and most new browsers now ship an AI assistant.` },
      { q: "Can I turn off AI in Chrome, Edge or Firefox?", a: () => `Partly. ${["firefox", "brave", "safari"].map((id) => byId.get(id)).filter((b) => b?.ai?.canDisable === "fully").map((b) => b!.name).join(", ")} let you fully switch their AI features off; Chrome and Edge keep some AI features you can only partly disable. If you don't want to rely on settings that may change in an update, pick a browser that ships without AI.` },
    ] },
  { slug: "keyboard-browsers", short: "Keyboard-driven browsers", title: "The best keyboard-driven (Vim-style) browsers in {year}",
    intro: "Browsers you can drive entirely from the keyboard, usually with Vim-style bindings.", how: "Keyboard / Vim control as a must-have.", state: state({ features: { "keyboard-driven": 2 } }) },
];
export function categoryResults(c: Category): Result[] {
  const results = rank(c.filter ? browsers.filter(c.filter) : browsers, c.state).results;
  if (!c.pin) return results;
  const pinned = c.pin.map((id) => results.find((r) => r.browser.id === id) ?? rank([byId.get(id)!], c.state).results[0]).filter(Boolean);
  return [...pinned, ...results.filter((r) => !c.pin!.includes(r.browser.id))];
}
export const fillYear = (s: string) => s.replace(/\{year\}/g, String(YEAR));

// ---------------------------------------------------------------------------- "X alternatives"

/** Browsers people actively look for alternatives to (big names, dying or controversial products). */
export const ALTERNATIVE_IDS = [
  "google-chrome", "microsoft-edge", "safari", "firefox", "opera", "opera-gx", "brave", "vivaldi", "arc", "chatgpt-atlas",
  "comet", "dia", "zen-browser", "duckduckgo", "tor-browser", "librewolf", "yandex-browser", "avast-secure-browser",
  "waterfox", "floorp", "orion", "pale-moon", "thorium",
].filter((id) => byId.has(id));

const AXES = ["privacy", "experience", "customisation", "lightness", "minimalism"] as const;
const BETTER: Record<(typeof AXES)[number], string> = {
  privacy: "More private", experience: "More polished", customisation: "More customisable", lightness: "Lighter on RAM", minimalism: "Less bloat",
};
const WORSE: Record<(typeof AXES)[number], string> = {
  privacy: "less private", experience: "less polished", customisation: "less customisable", lightness: "heavier", minimalism: "more built-in extras",
};
const KEEP: FeatureId[] = ["vertical-tabs", "workspaces", "split-view", "keyboard-driven", "ad-blocking", "vpn", "tor"];
const SLIDER_OF = { privacy: "privacy", experience: "polish", customisation: "custom", lightness: "light", minimalism: "minimal" } as const;

/** Browsers built around an assistant or agent (rather than a classic browser that added an AI sidebar). */
export const isAiFirst = (b: Browser) => !!b.ai && b.ai.level >= 2 && !b.tags.includes("mainstream") && /\b(AI|agent|assistant|LLM)/i.test(b.description);

export interface Alternative { result: Result; better: string[]; keeps: string[]; caveats: string[] }

/** Why people leave a browser, derived from its weakest scores, status and notes. */
export function painPoints(b: Browser): string[] {
  const out: string[] = [];
  if (b.status === "discontinued") out.push(`${b.name} has been discontinued, so it no longer gets security updates.`);
  if (b.status === "maintenance") out.push(`${b.name} only gets slow, maintenance-level updates.`);
  if (b.scores.privacy <= 2) out.push(`Privacy: it scores ${b.scores.privacy}/5 – ${b.ai && b.ai.level >= 2 ? "AI features and " : ""}its owner's business model or defaults don't favour you.`);
  if (b.scores.minimalism <= 2) out.push(`Bloat: it bundles extras (${[b.ai && "AI", b.tags.includes("vpn") && "VPN", b.tags.includes("crypto") && "crypto wallet"].filter(Boolean).join(", ") || "sidebars and services"}) many people don't want.`);
  if (b.scores.lightness <= 2) out.push(`Resource use: it's on the heavy side for RAM and CPU.`);
  if (b.scores.experience <= 2) out.push(`Rough edges: it needs setup or breaks more sites than mainstream browsers.`);
  if (b.scores.customisation <= 2) out.push(`Limited customisation: there's not much you can change.`);
  if (b.os.length < 3) out.push(`Platforms: it only runs on ${b.os.map((o) => ({ windows: "Windows", macos: "macOS", linux: "Linux", bsd: "BSD", other: "other systems" })[o]).join(" and ")}.`);
  if (b.note) out.push(b.note);
  return out;
}

/** Alternatives: the quiz engine's slider score (keep what the browser is good at, fix its weak spots), plus
 *  smaller bonuses for sharing its signature features and extension store. Features are bonuses here, not the
 *  coverage-first rule the quiz uses, so e.g. Chrome's AI agent doesn't turn its alternatives into AI-agent browsers. */
export function alternativesFor(src: Browser, n = 9): Alternative[] {
  const sliders = { ...defaultState().sliders };
  for (const k of AXES) sliders[SLIDER_OF[k]] = src.scores[k] >= 4 ? 3 : k === "privacy" || k === "experience" ? 2 : 1;
  if (src.scores.privacy <= 3) sliders.privacy = 3; // people leaving a data-hungry browser usually want more privacy
  sliders.known = 2; // replacements for big names should be established browsers
  sliders.minimal = Math.max(sliders.minimal, 3); // clutter is one of the most common reasons to switch
  const signature = KEEP.filter((f) => src.tags.includes(f));
  const family = new Set([src.id, src.channelOf, ...browsers.filter((b) => b.channelOf === src.id).map((b) => b.id)]);
  // AI-first browsers (built around an assistant or agent, not mainstream) are compared with other AI browsers.
  const aiFirst = isAiFirst(src);
  // ...against AI-first browsers and browsers whose AI can act as an agent (Chrome, Edge), not mere chat sidebars.
  const pool = browsers.filter((b) => !family.has(b.id) && (!aiFirst || isAiFirst(b) || b.ai?.level === 3));
  const base = rank(pool, state({ sliders })).results;
  const ext = (b: Browser) => [b.tags.includes("chrome-extensions"), b.tags.includes("firefox-addons")];
  const [srcChrome, srcFirefox] = ext(src);
  const scored = base.map((result) => {
    const b = result.browser;
    const [c, f] = ext(b);
    let bonus = 2.5 * signature.filter((t) => b.tags.includes(t)).length;
    if ((srcChrome && c) || (srcFirefox && f)) bonus += 2;
    if (src.ai && src.ai.level >= 2 && b.ai) bonus += (aiFirst ? 4 : 1.5) * (b.ai.quality ?? 1) / 5;
    if (aiFirst && src.ai!.agent && b.ai?.agent) bonus += 3;
    if (b.scores.privacy <= 2 && src.scores.privacy <= 2) bonus -= 2; // don't swap one data-hungry browser for another
    if (b.price && !src.price) bonus -= 3; // a free browser's replacement shouldn't be a paid one
    // A replacement should run where the original runs (Safari isn't a Chrome replacement on Windows).
    const mainOs = src.os.filter((o) => o === "windows" || o === "macos" || o === "linux");
    bonus -= 1.5 * mainOs.filter((o) => !b.os.includes(o)).length;
    return { result, total: result.score + bonus };
  }).sort((a, b) => b.total - a.total);
  return scored.slice(0, n).map(({ result }) => {
    const b = result.browser;
    const better = AXES.filter((k) => b.scores[k] >= src.scores[k] + 1).sort((x, y) => (b.scores[y] - src.scores[y]) - (b.scores[x] - src.scores[x]))
      .slice(0, 3).map((k) => `${BETTER[k]} (${b.scores[k]}/5 vs ${src.scores[k]}/5)`);
    if (src.status !== "active" && b.status === "active") better.unshift("Actively developed");
    const keeps = signature.filter((t) => b.tags.includes(t)).map((t) => FEATURE_LABEL[t] ?? t);
    if (srcChrome && b.tags.includes("chrome-extensions")) keeps.push("Chrome extensions");
    if (srcFirefox && b.tags.includes("firefox-addons")) keeps.push("Firefox add-ons");
    if (src.ai && b.ai && b.ai.level >= 2) keeps.push("Built-in AI");
    const caveats = AXES.filter((k) => b.scores[k] <= src.scores[k] - 2).map((k) => WORSE[k]);
    return { result, better, keeps, caveats };
  });
}
const FEATURE_LABEL: Record<string, string> = { "vertical-tabs": "Vertical tabs", workspaces: "Workspaces", "split-view": "Split view", "keyboard-driven": "Keyboard control", "ad-blocking": "Built-in ad blocker", vpn: "Built-in VPN", tor: "Tor" };

export const isQuizEligible = eligible;

// ---------------------------------------------------------------------------- "X vs Y" comparisons (/compare/<a>-vs-<b>)

/** Head-to-head pairs people search for. Order within a pair = order in the URL and the H1. */
const PAIRS: [string, string][] = [
  ["google-chrome", "firefox"], ["google-chrome", "microsoft-edge"], ["brave", "google-chrome"], ["brave", "firefox"],
  ["firefox", "microsoft-edge"], ["safari", "google-chrome"], ["brave", "microsoft-edge"], ["opera", "google-chrome"],
  ["opera", "opera-gx"], ["brave", "opera"], ["brave", "vivaldi"], ["vivaldi", "opera"], ["vivaldi", "firefox"],
  ["safari", "firefox"], ["brave", "safari"], ["opera-gx", "brave"], ["duckduckgo", "brave"], ["duckduckgo", "google-chrome"],
  ["librewolf", "firefox"], ["librewolf", "brave"], ["librewolf", "mullvad-browser"], ["tor-browser", "brave"],
  ["tor-browser", "mullvad-browser"], ["zen-browser", "firefox"], ["zen-browser", "arc"], ["floorp", "zen-browser"],
  ["waterfox", "firefox"], ["arc", "dia"], ["arc", "brave"], ["orion", "safari"], ["chatgpt-atlas", "comet"],
  ["chatgpt-atlas", "google-chrome"], ["comet", "dia"], ["helium", "brave"], ["ungoogled-chromium", "brave"],
  ["thorium", "google-chrome"], ["chromium", "google-chrome"], ["yandex-browser", "google-chrome"],
];
export const compareSlug = (a: string, b: string) => `${a}-vs-${b}`;
export const COMPARISONS = PAIRS.filter(([a, b]) => byId.has(a) && byId.has(b)).map(([a, b]) => ({ slug: compareSlug(a, b), a: byId.get(a)!, b: byId.get(b)! }));
/** The curated comparison page for two browsers, in either order. */
export const comparisonOf = (a: string, b: string) => COMPARISONS.find((c) => (c.a.id === a && c.b.id === b) || (c.a.id === b && c.b.id === a));

/** Which of two browsers the quiz engine prefers with balanced priorities, and with one quality as top priority.
 *  null when the quiz doesn't rank either (e.g. both discontinued). */
export function compareVerdict(a: Browser, b: Browser) {
  const winner = (s: QuizState) => rank([a, b], s).results[0]?.browser ?? null;
  return {
    overall: winner(state()),
    privacy: winner(state({ sliders: { privacy: 4 } })),
    light: winner(state({ sliders: { light: 4, minimal: 2 } })),
    custom: winner(state({ sliders: { custom: 4 } })),
  };
}

// ---------------------------------------------------------------------------- Hand-written guides (/guides/<slug>)

export interface Guide { slug: string; title: string; short: string; description: string }
export const GUIDES: Guide[] = [
  { slug: "browser-extensions", short: "Browser extensions explained", title: "Browser extensions in {year}: which browsers run which",
    description: "Which browsers support Chrome Web Store extensions, Firefox add-ons and Safari extensions, what Manifest V3 changed, and how to pick a browser for the extensions you rely on." },
  { slug: "ublock-origin", short: "uBlock Origin in {year}", title: "uBlock Origin in {year}: Firefox, Chrome and which browsers still run it",
    description: "Chrome and every other Chromium browser dropped the full uBlock Origin in 2026. Here's where it still works (Firefox and its forks), how to install it, and what to use instead." },
  { slug: "incognito-mode", short: "Incognito & private browsing", title: "Incognito mode explained: what private browsing hides",
    description: "What incognito and private browsing actually do in Chrome, Safari, Firefox, Edge and Brave, what they don't hide, keyboard shortcuts, and when you need a private browser instead." },
];
export const guideLd = (site: URL | undefined, g: Guide) => ({
  "@type": "Article", headline: fillYear(g.title), description: g.description, inLanguage: "en",
  datePublished: "2026-11-18", dateModified: BUILD.toISOString().slice(0, 10),
  mainEntityOfPage: abs(site, `/guides/${g.slug}`), author: { "@id": `${abs(site, "/")}#org` }, publisher: { "@id": `${abs(site, "/")}#org` },
});
export const guide = (slug: string) => GUIDES.find((g) => g.slug === slug)!;

// ---------------------------------------------------------------------------- JSON-LD builders

export const breadcrumbLd = (site: URL | undefined, items: { name: string; href: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(site, c.href) })),
});
export const faqLd = (items: { q: string; a: string }[]) => ({
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});
export const itemListLd = (site: URL | undefined, name: string, list: Browser[]) => ({
  "@type": "ItemList", name, numberOfItems: list.length,
  itemListElement: list.map((b, i) => ({ "@type": "ListItem", position: i + 1, name: b.name, url: abs(site, `/browsers/${b.id}`) })),
});
const OS_NAME = { windows: "Windows", macos: "macOS", linux: "Linux", bsd: "BSD", other: "Other" } as const;
export const softwareLd = (site: URL | undefined, b: Browser) => ({
  "@type": "SoftwareApplication", "@id": `${abs(site, `/browsers/${b.id}`)}#app`, name: b.name, description: b.description,
  applicationCategory: "BrowserApplication", operatingSystem: b.os.map((o) => OS_NAME[o]).join(", "),
  ...(b.website ? { sameAs: [b.website, ...(b.repo ? [b.repo] : [])] } : {}),
  ...(b.logo ? { image: abs(site, b.logo) } : {}),
});
export const osNames = (b: Browser) => b.os.map((o) => OS_NAME[o]);
