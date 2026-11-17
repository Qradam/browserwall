// Prints GitHub star counts for every repo in the dataset (scrapes the repo page, no API token needed).
import { readFileSync, writeFileSync } from "node:fs";
const browsers = JSON.parse(readFileSync("src/data/browsers.json", "utf8"));
const q = browsers.filter((b) => /github\.com\/[^/]+\/[^/]+/.test(b.repo ?? ""));
const out = {};
await Promise.all(Array.from({ length: 6 }, async () => {
  while (q.length) {
    const b = q.shift();
    try {
      const html = await (await fetch(b.repo, { headers: { "User-Agent": "browser-quiz" } })).text();
      const m = html.match(/"stargazerCount":(\d+)/) ?? html.match(/id="repo-stars-counter-star"[^>]*title="([\d,]+)"/);
      out[b.id] = m ? Number(m[1].replace(/,/g, "")) : null;
    } catch { out[b.id] = null; }
  }
}));
writeFileSync("data/stars.json", JSON.stringify(out, null, 2));
for (const [id, s] of Object.entries(out).sort((a, b) => (b[1] ?? -1) - (a[1] ?? -1))) console.log(`${id} | ${s}`);
