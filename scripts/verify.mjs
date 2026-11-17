// Smoke test: node scripts/verify.mjs  (needs `npm run build` first)
// Serves dist/, checks the wall renders, filters work, no console errors or broken logos, takes screenshots.
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const TYPES = { ".txt": "text/plain", ".xml": "application/xml", ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png",
  ".ico": "image/x-icon", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".gif": "image/gif" };
const server = createServer(async (req, res) => {
  // Mirrors Cloudflare Pages: /quiz -> quiz.html, / -> index.html, unknown -> 404.html with status 404.
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  else if (!extname(p)) p += ".html";
  try { const body = await readFile(join("dist", p)); res.writeHead(200, { "content-type": TYPES[extname(p)] ?? "application/octet-stream" }).end(body); }
  catch { res.writeHead(404, { "content-type": "text/html" }).end(await readFile(join("dist", "404.html")).catch(() => "")); }
}).listen(4399);

const fail = [];
const check = (cond, msg) => { console.log(`${cond ? "PASS" : "FAIL"} ${msg}`); if (!cond) fail.push(msg); };
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1360, height: 900 } });
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));

await page.goto("http://localhost:4399/wall", { waitUntil: "networkidle" });
const total = await page.locator("#grid > .card").count();
check(total === 86, `renders all cards (${total})`);
const visible = () => page.locator("#grid > .card:not([hidden])").count();

await page.screenshot({ path: "data/screens/wall.png" });
// Scroll so lazy logos load, then check none are broken.
await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } });
await page.waitForLoadState("networkidle");
const broken = await page.$$eval("#grid img", (imgs) => imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.closest(".card").dataset.id));
check(broken.length === 0, `no broken logos ${broken.join(",")}`);
await page.evaluate(() => window.scrollTo(0, 0));

await page.fill("#q", "pissand");
check((await visible()) === 1, "search 'pissand' -> 1");
await page.fill("#q", "");
await page.click('[data-filter="os"][data-value="macos"]');
const mac = await visible();
await page.click('[data-filter="tag"][data-value="vertical-tabs"]');
const macVt = await visible();
check(macVt > 0 && macVt < mac && mac < total, `macOS (${mac}) + vertical tabs (${macVt}) narrows`);
check(page.url().includes("os=macos") && page.url().includes("tag=vertical-tabs"), "filters in URL");
await page.screenshot({ path: "data/screens/filtered.png" });
await page.click("#reset");
check((await visible()) === total, "reset restores all");
await page.click('[data-toggle="rip"]');
const rip = await visible();
check(rip === 4, `RIP toggle -> ${rip}`);
await page.click('[data-toggle="alive"]');
check((await visible()) === total - rip, "alive excludes RIP (mutually exclusive)");

await page.goto("http://localhost:4399/wall?engine=text", { waitUntil: "networkidle" });
check((await visible()) === 3, "URL state restored (engine=text -> 3)");

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto("http://localhost:4399/wall", { waitUntil: "networkidle" });
const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth > innerWidth);
check(!overflow, "no horizontal overflow on narrow screen");
await mobile.screenshot({ path: "data/screens/narrow.png" });

// Wall order: well-known first, not alphabetical; A-Z toggle works.
await page.goto("http://localhost:4399/wall", { waitUntil: "networkidle" });
const firstIds = await page.$$eval("#grid > .card", (c) => c.slice(0, 4).map((x) => x.dataset.id));
check(firstIds.join() === "google-chrome,microsoft-edge,safari,firefox", `wall starts with mainstream (${firstIds})`);
await page.click('[data-sort="az"]');
const azFirst = await page.$eval("#grid > .card", (c) => c.dataset.id);
check(azFirst !== "google-chrome" && page.url().includes("sort=az"), `A-Z sort (${azFirst})`);
await page.click('[data-sort="usage"]');

// Details dialog opens from a card and from the keyboard.
await page.click('#grid > .card[data-id="firefox"] .desc');
check(await page.locator("#bd[open] h2", { hasText: "Firefox" }).isVisible(), "card click opens details dialog");
check((await page.locator("#bd .bd-scorelist li").count()) === 5, "dialog shows 5 scores");
await page.screenshot({ path: "data/screens/dialog.png" });
await page.keyboard.press("Escape");
check(!(await page.locator("#bd[open]").count()), "Escape closes dialog");
await page.focus('#grid > .card[data-id="brave"] .open');
await page.keyboard.press("Enter");
check(await page.locator("#bd[open] h2", { hasText: "Brave" }).isVisible(), "keyboard opens dialog");
await page.keyboard.press("Escape");

// Tier maker: starts empty, tap-to-place, keyboard, family filter, persistence.
await page.goto("http://localhost:4399/tiers", { waitUntil: "networkidle" });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: "networkidle" });
check((await page.locator("#board .item").count()) === 0, "tier maker starts empty (no editorial ranking)");
const poolDefault = await page.locator("#pool .item:not([hidden])").count();
check(poolDefault === total - 8, `pool hides beta/nightly by default (${poolDefault})`);
await page.click('#pool .item[data-id="firefox"]');
await page.click('#board [data-zone="0"]');
check((await page.locator('#board [data-zone="0"] .item[data-id="firefox"]').count()) === 1, "tap item + tap tier places it");
await page.focus('#pool .item[data-id="brave"]');
await page.keyboard.press("2");
check((await page.locator('#board [data-zone="1"] .item[data-id="brave"]').count()) === 1, "keyboard 2 -> tier A");
await page.dragAndDrop('#pool .item[data-id="safari"]', '#board [data-zone="2"]');
check((await page.locator('#board [data-zone="2"] .item[data-id="safari"]').count()) === 1, "drag and drop places item");
await page.click('[data-fam="chromium"]');
const chromiumPool = await page.$$eval("#pool .item:not([hidden])", (els) => els.every((e) => e.dataset.family === "chromium") && els.length);
check(chromiumPool > 10, `Chromium filter narrows pool (${chromiumPool})`);
await page.click("#fill");
check((await page.locator("#board .item").count()) === 1, "'Tiers: only filtered' keeps only Chromium in tiers");
await page.reload({ waitUntil: "networkidle" });
check((await page.locator('#board [data-zone="1"] .item[data-id="brave"]').count()) === 1, "tier list persists after reload");
await page.screenshot({ path: "data/screens/tiers.png", fullPage: true });

// Quiz: picks auto-advance, sliders, tri-state must-haves, dealbreakers, live results.
await page.goto("http://localhost:4399/quiz", { waitUntil: "networkidle" });
await page.click('.step:not([hidden]) label.pick:has(input[value="linux"])');
await page.waitForTimeout(300);
await page.click('.step:not([hidden]) label.pick:has(input[value="firefox"])');
await page.waitForTimeout(300);
check(await page.locator("#sl-privacy").isVisible(), "pick questions advance to sliders");
await page.fill("#sl-custom", "4");
check((await page.textContent("#out-custom")) === "Top priority", "importance slider shows its level");
await page.fill("#sl-light", "0");
check((await page.textContent("#out-light")) === "Don't care", "slider far left = Don't care");
check(/s=\d\d40/.test(page.url()), `slider levels stored in URL (${page.url().split("#")[1]})`);
await page.click("#next");
const leftBefore = await page.textContent('[data-frow="vertical-tabs"] .left');
await page.click('[data-frow="vertical-tabs"] .o2');
check((await page.getAttribute('[data-frow="vertical-tabs"]', "data-state")) === "2", "feature set to must have");
await page.waitForTimeout(450); // counter animates
check((await page.textContent("#live")).startsWith(leftBefore.split(" ")[0] + " "), `'N left' preview matches the real count (${leftBefore})`);
await page.click('[data-frow="workspaces"] .o1');
await page.click("#next");
await page.click('label.chk:has(input[value="ai"])');
await page.click("#next");
const top = await page.$$eval("#top [data-open]", (els) => els.map((e) => e.dataset.open));
check(top.length >= 1 && top.length <= 3, `quiz shows top matches (${top})`);
const allVt = await page.$$eval("#top [data-open], #more [data-open]", (els) => els.map((e) => e.dataset.open));
check(allVt.every((id) => ["zen-browser", "floorp", "firefox"].includes(id)), `must-have vertical tabs + Firefox add-ons + Linux filters (${allVt})`);
check((await page.textContent("#excluded")).includes("not on Linux"), "results explain what was filtered out");
await page.screenshot({ path: "data/screens/quiz.png", fullPage: true });
await page.click('[data-frow="vertical-tabs"] .o0'); // must -> don't care: live update widens results
const widened = await page.locator("#top [data-open], #more [data-open]").count();
check(widened > allVt.length, `tuning in results updates live (${allVt.length} -> ${widened})`);
await page.click("#top [data-open]");
check(await page.locator("#bd[open]").isVisible(), "quiz result opens details");
await page.keyboard.press("Escape");
const shown = await page.$$eval("#top [data-open]", (els) => els.map((e) => e.dataset.open).join());
await page.goto(page.url(), { waitUntil: "networkidle" });
check((await page.$$eval("#top [data-open]", (els) => els.map((e) => e.dataset.open).join())) === shown, "quiz results restore from URL");

// Nice-to-have competes with a top-priority slider: privacy top + Vim nice -> Vim browsers lead.
await page.goto("http://localhost:4399/quiz#os=linux&ext=any&s=421111&f=keyboard-driven.1&r=1", { waitUntil: "networkidle" });
await page.reload({ waitUntil: "networkidle" });
const vimTop = await page.$$eval("#top [data-open], #more [data-open]", (els) => els.map((e) => e.dataset.open));
check(["brave-origin", "librewolf", "mullvad-browser"].includes(vimTop[0]) && (await page.locator("#top .lead").count()) === 2, `top-priority privacy owns places 1-2 (${vimTop.slice(0, 2)})`);
check(["glide-browser", "vieb", "qutebrowser"].includes(vimTop[2]), `then Vim nice-to-have leads (${vimTop.slice(2, 5)})`);

// One nice-to-have: every top match has it when enough browsers do.
await page.goto("http://localhost:4399/quiz#os=windows&ext=any&s=221111&f=vpn.1&r=1", { waitUntil: "networkidle" });
await page.reload({ waitUntil: "networkidle" });
const vpnTop = await page.$$eval("#top .res", (els) => els.map((e) => !!e.querySelector(".wanted .ok")));
check(vpnTop.length === 3 && vpnTop.every(Boolean), `nice-to-have VPN: all top 3 have it (${vpnTop})`);

// Legacy-OS browsers are never suggested, even with "Light on resources" at top priority.
await page.goto("http://localhost:4399/quiz#os=windows&ext=any&s=233411&r=1", { waitUntil: "networkidle" });
await page.reload({ waitUntil: "networkidle" });
const lightIds = await page.$$eval("#top [data-open], #more [data-open]", (els) => els.map((e) => e.dataset.open));
check(!lightIds.some((id) => ["supermium", "r3dfox", "pale-moon"].includes(id)), `no legacy-OS browsers in results (${lightIds.slice(0, 5)})`);

// Paid browsers are labelled where they cost money.
await page.goto("http://localhost:4399/quiz#os=windows&ext=any&s=420111&r=1", { waitUntil: "networkidle" });
await page.reload({ waitUntil: "networkidle" });
const originCard = page.locator('.res[data-open="brave-origin"]');
check((await originCard.count()) === 0 || (await originCard.locator(".paid").count()) === 1, "Brave Origin is labelled paid on Windows");
// AI browsers' alternatives are other AI browsers.
const cometAlts = [...(await (await fetch("http://localhost:4399/alternatives/comet")).text()).matchAll(/<h3><a href="\/browsers\/([^"]+)"/g)].map((m) => m[1]);
check(cometAlts.length > 3 && !cometAlts.some((id) => ["firefox", "librewolf", "brave-origin", "safari"].includes(id)), `Comet alternatives are AI browsers (${cometAlts.slice(0, 5)})`);

// Contact page
await page.goto("http://localhost:4399/contact", { waitUntil: "networkidle" });
check((await page.getAttribute(".addr", "href")).startsWith("mailto:ujhazyadam@gmail.com"), "contact page has mailto link");
check(await page.locator('.topbar nav a[href="/contact"][aria-current="page"]').count() === 1, "contact in nav");
const mobileContact = await browser.newPage({ viewport: { width: 360, height: 740 } });
await mobileContact.goto("http://localhost:4399/contact", { waitUntil: "networkidle" });
check(!(await mobileContact.evaluate(() => document.documentElement.scrollWidth > innerWidth)), "no overflow on 360px (nav + contact)");

// AI is graded: Chrome (strong AI) beats basic-AI browsers when AI is a must-have.
await page.goto("http://localhost:4399/quiz#os=windows&ext=any&s=022201&f=ai.2&r=1", { waitUntil: "networkidle" });
await page.reload({ waitUntil: "networkidle" });
const aiTop = await page.$$eval("#top [data-open]", (els) => els.map((e) => e.dataset.open));
check(aiTop[0] === "google-chrome", `AI must-have + convenience ranks strongest AI first (${aiTop})`);
await page.click('#top [data-open="google-chrome"]');
check(await page.locator("#bd .bd-ai").isVisible(), "details show built-in AI section");
await page.keyboard.press("Escape");

// Homepage: quiz button, wall preview, FAQ + JSON-LD.
await page.goto("http://localhost:4399/", { waitUntil: "networkidle" });
check((await page.getAttribute(".hero .raised-btn", "href")) === "/quiz", "homepage has quiz button");
check((await page.locator(".mq-card").count()) >= 24, "homepage shows wall preview marquee");
await page.fill("#hero-q", "zen");
check((await page.locator('#hero-results a[href="/browsers/zen-browser"]').count()) === 1, "hero search finds browsers");
const homeLd = await page.$eval('script[type="application/ld+json"]', (e) => JSON.parse(e.textContent)["@graph"].map((x) => x["@type"]));
check(homeLd.includes("FAQPage") && (await page.locator(".ob-faq details").count()) >= 6, `homepage FAQ + FAQPage JSON-LD (${homeLd})`);
check((await page.locator('.topbar nav a[href="/wall"]').count()) === 1, "nav links to /wall");
await page.screenshot({ path: "data/screens/home.png", fullPage: true });

// SEO: crawl files, generated pages, canonical + structured data.
const get = async (p) => { const r = await fetch(`http://localhost:4399${p}`); return { status: r.status, text: await r.text() }; };
const sm = await get("/sitemap.xml");
const locs = [...sm.text.matchAll(/<loc>https:\/\/browserwall\.org([^<]*)<\/loc>/g)].map((m) => m[1]);
check(locs.length > 120, `sitemap lists all pages (${locs.length})`);
const missing = [];
for (const l of locs) if ((await get(l)).status !== 200) missing.push(l);
check(missing.length === 0, `every sitemap URL resolves ${missing.slice(0, 5)}`);
check((await get("/robots.txt")).text.includes("Sitemap: https://browserwall.org/sitemap.xml"), "robots.txt points to sitemap");
check((await get("/llms.txt")).text.includes("https://browserwall.org/quiz"), "llms.txt links the quiz");
check((await get("/llms-full.txt")).text.includes("## Firefox"), "llms-full.txt has browser data");
check((await get("/does-not-exist")).status === 404, "unknown URL -> 404");
for (const p of ["/quiz", "/browsers/firefox", "/best/privacy-browsers", "/alternatives/google-chrome"]) {
  await page.goto(`http://localhost:4399${p}`, { waitUntil: "networkidle" });
  const canon = await page.getAttribute('link[rel="canonical"]', "href");
  const ld = await page.$eval('script[type="application/ld+json"]', (e) => JSON.parse(e.textContent)["@graph"].map((x) => x["@type"]));
  const h1 = await page.locator("h1").count();
  check(canon === `https://browserwall.org${p}` && h1 === 1 && ld.includes("WebSite"), `${p}: canonical, one h1, JSON-LD (${ld.join(",")})`);
}
const rankedLinks = await page.$$eval(".ranked h3 a", (as) => as.map((a) => a.getAttribute("href")));
check(rankedLinks.length >= 5 && rankedLinks.every((h) => h.startsWith("/browsers/")), "alternatives link to browser pages");

await page.goto("http://localhost:4399/wall?q=zen", { waitUntil: "networkidle" });
check((await page.locator('#grid > .card:not([hidden]) a[aria-label$="on Reddit"]').count()) >= 1, "cards show Reddit link");
check(errors.length === 0, `no console errors ${errors.join(" | ")}`);
await browser.close();
server.close();
process.exit(fail.length ? 1 : 0);
