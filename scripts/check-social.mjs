// Verifies Reddit links (real page load via Playwright) and writes data/social.json.
// Inputs: data/raw/social-*.json (research), data/social-overrides.json (manual, wins).
// For browsers without a subreddit it also tries a few likely names and reports hits for manual review.
// Usage: node scripts/check-social.mjs            -> verify + write
//        node scripts/check-social.mjs --probe a b -> just test subreddit names
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { chromium } from "playwright";

const browser = await chromium.launch();
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140 Safari/537.36";
const newPage = async () => (await browser.newContext({ userAgent: UA })).newPage();
let page = await newPage();
const cache = new Map();

/** { ok, name, title } – ok when Reddit renders a subreddit header for that name. */
async function checkSub(name) {
  const key = name.toLowerCase();
  if (cache.has(key)) return cache.get(key);
  let res = { ok: false };
  // Reddit rate-limits after ~25 page loads: on a miss, wait and retry with a fresh context.
  for (let attempt = 0; attempt < 3 && !res.ok; attempt++) {
    if (attempt) { await page.context().close(); page = await newPage(); await page.waitForTimeout(25000 * attempt); }
    try {
      await page.goto(`https://www.reddit.com/r/${name}/`, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForTimeout(2500);
      const hdr = await page.$("shreddit-subreddit-header");
      const prefixed = hdr ? await hdr.getAttribute("prefixed-name") : null;
      const title = await page.title();
      res = { ok: !!prefixed, name: prefixed?.slice(2) ?? null, title: title.slice(0, 60) };
      // A normal Reddit page without a header = sub doesn't exist; don't retry that.
      if (!prefixed && /heart of the internet/i.test(title) && (await page.$("shreddit-app"))) break;
    } catch (e) { res = { ok: false, error: String(e).slice(0, 80) }; }
  }
  cache.set(key, res);
  return res;
}

const args = process.argv.slice(2);
if (args[0] === "--probe") {
  for (const s of args.slice(1)) console.log(s.padEnd(24), JSON.stringify(await checkSub(s)));
  await browser.close();
  process.exit(0);
}

const browsers = JSON.parse(readFileSync("src/data/browsers.json", "utf8"));
const raw = Object.assign({}, ...readdirSync("data/raw").filter((f) => /^social-.*\.json$/.test(f)).map((f) => JSON.parse(readFileSync(`data/raw/${f}`, "utf8"))));
const manual = existsSync("data/social-overrides.json") ? JSON.parse(readFileSync("data/social-overrides.json", "utf8")) : {};
const out = {};
const report = [];
for (const b of browsers) {
  const src = { ...(raw[b.id] ?? {}), ...(manual[b.id] ?? {}) };
  const e = { reddit: src.reddit ?? null, x: src.x ?? null };
  if (e.reddit) {
    const sub = e.reddit.match(/\/r\/([^/?#]+)/)?.[1];
    const res = await checkSub(sub);
    report.push(`${b.id.padEnd(26)} r/${sub.padEnd(22)} ${res.ok ? "OK  " + res.title : "FAIL"}`);
    e.reddit = res.ok ? `https://www.reddit.com/r/${res.name}` : null;
  } else if (!("reddit" in (manual[b.id] ?? {}))) {
    // Suggest candidates (not written automatically – add to social-overrides.json after review).
    const base = b.name.replace(/\s+(browser|web browser)$/i, "").replace(/[^A-Za-z0-9]+/g, "");
    for (const c of [...new Set([base, `${base}Browser`, `${base}_browser`])]) {
      const res = await checkSub(c);
      if (res.ok) report.push(`${b.id.padEnd(26)} CANDIDATE r/${res.name} – ${res.title}`);
    }
  }
  out[b.id] = e;
}
await browser.close();
writeFileSync("data/social.json", JSON.stringify(out, null, 2) + "\n");
console.log(report.join("\n"));
console.log(`\nreddit: ${Object.values(out).filter((e) => e.reddit).length}/${browsers.length}, x: ${Object.values(out).filter((e) => e.x).length}/${browsers.length}`);
