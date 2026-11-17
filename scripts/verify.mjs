// Smoke test: node scripts/verify.mjs  (needs `npm run build` first)
// Serves dist/, checks the wall renders, filters work, no console errors or broken logos, takes screenshots.
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png",
  ".ico": "image/x-icon", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".gif": "image/gif" };
const server = createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  else if (!extname(p)) p += "/index.html";
  try { res.writeHead(200, { "content-type": TYPES[extname(p)] ?? "application/octet-stream" }).end(await readFile(join("dist", p))); }
  catch { res.writeHead(404).end(); }
}).listen(4399);

const fail = [];
const check = (cond, msg) => { console.log(`${cond ? "PASS" : "FAIL"} ${msg}`); if (!cond) fail.push(msg); };
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1360, height: 900 } });
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));

await page.goto("http://localhost:4399/", { waitUntil: "networkidle" });
const total = await page.locator("#grid > .card").count();
check(total === 67, `renders all cards (${total})`);
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

await page.goto("http://localhost:4399/?engine=text", { waitUntil: "networkidle" });
check((await visible()) === 3, "URL state restored (engine=text -> 3)");

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto("http://localhost:4399/", { waitUntil: "networkidle" });
const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth > innerWidth);
check(!overflow, "no horizontal overflow on narrow screen");
await mobile.screenshot({ path: "data/screens/narrow.png" });

check(errors.length === 0, `no console errors ${errors.join(" | ")}`);
await browser.close();
server.close();
process.exit(fail.length ? 1 : 0);
