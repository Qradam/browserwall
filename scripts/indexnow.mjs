// Submit every URL in dist/sitemap.xml to IndexNow (Bing, Yandex, Naver, Seznam…). Run after a deploy:
//   npm run build && node scripts/indexnow.mjs
// The key file public/<key>.txt must be live on the site first (it proves we own browserwall.org).
import { readFileSync } from "node:fs";

const KEY = "ad7e04d6340d2c41c2ce4ac4efef6ff9";
const HOST = "browserwall.org";
const urls = [...readFileSync("dist/sitemap.xml", "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: submitted ${urls.length} URLs -> HTTP ${res.status} ${res.statusText}`);
if (res.status >= 400) { console.log(await res.text()); process.exit(1); }
