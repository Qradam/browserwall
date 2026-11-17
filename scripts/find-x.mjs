// Finds official X/Twitter handles by scraping each browser's website and GitHub repo page.
// Writes data/x-found.json { id: [handles] } for comparison with researched links.
import { readFileSync, writeFileSync } from "node:fs";
const browsers = JSON.parse(readFileSync("src/data/browsers.json", "utf8"));
const UA = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140 Safari/537.36" };
const SKIP = /^(share|intent|home|i|search|hashtag|privacy|tos|x|twitter|github|login|signup)$/i;
const found = {};
const q = [...browsers];
await Promise.all(Array.from({ length: 6 }, async () => {
  while (q.length) {
    const b = q.shift();
    const handles = new Set();
    for (const url of [b.website, b.repo].filter(Boolean)) {
      try {
        const html = await (await fetch(url, { headers: UA, signal: AbortSignal.timeout(15000) })).text();
        for (const m of html.matchAll(/https?:\/\/(?:www\.)?(?:twitter|x)\.com\/(?:#!\/)?@?([A-Za-z0-9_]{2,15})(?=["'\/?#<\s])/g))
          if (!SKIP.test(m[1])) handles.add(m[1]);
      } catch {}
    }
    found[b.id] = [...handles];
  }
}));
writeFileSync("data/x-found.json", JSON.stringify(found, null, 2) + "\n");
const social = JSON.parse(readFileSync("data/social.json", "utf8"));
for (const b of browsers) {
  const cur = social[b.id]?.x?.split("/").pop() ?? null;
  const f = found[b.id];
  const match = cur && f.some((h) => h.toLowerCase() === cur.toLowerCase());
  console.log(`${b.id.padEnd(26)} research=${(cur ?? "-").padEnd(18)} site=[${f.join(",")}] ${cur ? (match ? "CONFIRMED" : "unconfirmed") : ""}`);
}
