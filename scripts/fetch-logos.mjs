// Downloads an official logo for every browser into public/logos/<id>.<ext>
// and writes src/data/logos.json { id: { file, source } }.
// Usage: node scripts/fetch-logos.mjs [--force] [id ...]
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

const browsers = JSON.parse(readFileSync("src/data/browsers.json", "utf8"));
const MAP_FILE = "src/data/logos.json";
const logos = existsSync(MAP_FILE) ? JSON.parse(readFileSync(MAP_FILE, "utf8")) : {};
const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((a) => !a.startsWith("--"));
const UA = { "User-Agent": "browser-quiz-logo-fetcher/1.0 (personal project)" };
mkdirSync("public/logos", { recursive: true });

const EXT = { "image/svg+xml": "svg", "image/png": "png", "image/webp": "webp", "image/jpeg": "jpg",
  "image/x-icon": "ico", "image/vnd.microsoft.icon": "ico", "image/gif": "gif", "image/avif": "avif" };
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

async function get(url, ms = 15000) {
  if (/wikipedia\.org|wikimedia\.org/.test(url)) return wikiGet(url, ms);
  const ctl = AbortSignal.timeout(ms);
  return fetch(url, { headers: UA, redirect: "follow", signal: ctl });
}

// Wikimedia APIs: strictly serial, ~1 req/s, back off on 429.
const WIKI_UA = { "User-Agent": "browser-quiz/1.0 (https://github.com/adamko/browser-quiz; logo fetcher) node-fetch", "Api-User-Agent": "browser-quiz/1.0" };
let wikiChain = Promise.resolve();
function wikiGet(url, ms) {
  const run = async () => {
    for (let attempt = 0; attempt < 5; attempt++) {
      await new Promise((r) => setTimeout(r, 1100 * (attempt ? 2 ** attempt : 1)));
      const r = await fetch(url, { headers: WIKI_UA, redirect: "follow", signal: AbortSignal.timeout(ms) });
      if (r.status !== 429) return r;
    }
    return new Response(null, { status: 429 });
  };
  const p = wikiChain.then(run, run);
  wikiChain = p.catch(() => {});
  return p;
}

async function download(url) {
  try {
    const r = await get(url);
    if (!r.ok) return null;
    let type = (r.headers.get("content-type") ?? "").split(";")[0].trim();
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length < 300) return null;
    const head = buf.subarray(0, 200).toString("utf8").trim();
    if (!EXT[type]) {
      if (/^<\?xml|^<svg/i.test(head) && /<svg/i.test(buf.toString("utf8", 0, 2000))) type = "image/svg+xml";
      else if (buf[0] === 0x89 && buf[1] === 0x50) type = "image/png";
      else if (buf[0] === 0 && buf[1] === 0 && buf[2] === 1) type = "image/x-icon";
      else return null;
    }
    if (type === "image/svg+xml" && /<script/i.test(buf.toString("utf8"))) return null;
    return { buf, ext: EXT[type] };
  } catch { return null; }
}

// Wikipedia infobox logo (parsed from rendered HTML, so non-free logos are included).
// Only accepted when the file name says logo/icon and contains the browser's name.
async function wikiCandidates(b) {
  const titles = (b.sources ?? []).filter((s) => /en\.wikipedia\.org\/wiki\//.test(s))
    .map((s) => decodeURIComponent(s.split("/wiki/")[1].split("#")[0]).replace(/_/g, " "));
  if (WIKI_TITLES[b.id]) titles.unshift(WIKI_TITLES[b.id]);
  const nameKey = norm(b.name.split(/\s+/)[0]);
  const out = [];
  for (const title of [...new Set(titles)]) {
    try {
      const r = await get(`https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&redirects=1&page=${encodeURIComponent(title)}`);
      const html = (await r.json()).parse?.text?.["*"] ?? "";
      const box = html.match(/<table[^>]*class="[^"]*infobox[\s\S]*?<\/table>/)?.[0] ?? "";
      for (const m of box.matchAll(/<img[^>]*src="([^"]+)"/g)) {
        const src = (m[1].startsWith("//") ? "https:" + m[1] : m[1]).replace(/&amp;/g, "&").replace(/\/(\d+)px-/, "/256px-");
        const file = norm(decodeURIComponent(src.split("?")[0].split("/").pop()));
        if (/logo|icon/.test(file) && !/screenshot|ooj?sui/.test(file) && file.includes(nameKey)) out.push(src);
      }
    } catch {}
    if (out.length) break;
  }
  return out;
}

// Icons declared by the official website (svg > manifest/touch icons > large png).
async function siteCandidates(b) {
  if (!b.website) return { good: [], fallback: [] };
  try {
    const r = await get(b.website);
    if (!r.ok) return { good: [], fallback: [] };
    const base = r.url;
    const html = (await r.text()).slice(0, 400000);
    const links = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]);
    const attr = (tag, a) => tag.match(new RegExp(`\\b${a}\\s*=\\s*["']([^"']+)["']`, "i"))?.[1];
    const scored = [];
    for (const l of links) {
      const rel = (attr(l, "rel") ?? "").toLowerCase();
      const href = attr(l, "href");
      if (!href || !/icon/.test(rel) || /mask-icon/.test(rel)) continue;
      const url = new URL(href.replace(/&amp;/g, "&"), base).href;
      const size = parseInt((attr(l, "sizes") ?? "").split("x")[0]) || 0;
      let score = size;
      if (/\.svg(\?|$)/i.test(url) || /svg/.test(attr(l, "type") ?? "")) score = 1000;
      else if (/apple-touch/.test(rel)) score = Math.max(size, 180);
      scored.push({ url, score });
    }
    const manifest = links.find((l) => /rel=["']manifest/i.test(l));
    if (manifest) {
      try {
        const murl = new URL(attr(manifest, "href"), base).href;
        const m = await (await get(murl)).json();
        for (const ic of m.icons ?? []) {
          const size = parseInt((ic.sizes ?? "").split("x")[0]) || 0;
          scored.push({ url: new URL(ic.src, murl).href, score: /svg/.test(ic.type ?? ic.src) ? 1000 : size });
        }
      } catch {}
    }
    scored.sort((a, b) => b.score - a.score);
    return {
      good: scored.filter((s) => s.score >= 96).map((s) => s.url),
      fallback: [...scored.filter((s) => s.score < 96).map((s) => s.url), new URL("/favicon.ico", base).href],
    };
  } catch { return { good: [], fallback: [] }; }
}

// GitHub org avatar – only when the owner name matches the browser (avoids personal photos).
function avatarCandidate(b) {
  const m = b.repo?.match(/github\.com\/([^/]+)\/([^/#?]+)/);
  if (!m) return [];
  const [owner] = [m[1]];
  const n = norm(b.name).slice(0, 5);
  return norm(owner).includes(n) || n.includes(norm(owner).slice(0, 5)) ? [`https://github.com/${owner}.png?size=256`] : [];
}

// Wikimedia Commons file search "<name> logo"/"<name> icon"; file name must contain the browser name.
async function commonsCandidates(b) {
  const out = [];
  const key = norm(b.name.replace(/\b(browser|web browser|secure|private)\b/gi, "")) || norm(b.name);
  for (const q of [`${b.name} logo`, `${b.name} icon`]) {
    try {
      const r = await get(`https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=10&gsrsearch=${encodeURIComponent(q)}&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=256`);
      const j = await r.json();
      const pages = Object.values(j.query?.pages ?? {}).sort((a, b) => a.index - b.index);
      for (const p of pages) {
        const ii = p.imageinfo?.[0];
        if (!ii || !/svg|png/.test(ii.mime)) continue;
        const t = norm(p.title);
        const full = norm(b.name);
        // Strict: the full browser name must appear; short/generic names also need "browser"/"web" in the file name.
        if (!t.includes(full) || !/logo|icon/.test(t) || /screenshot|wordmark|text|font/.test(t)) continue;
        if (full.length < 8 && !/browser|web/.test(t)) continue;
        out.push(ii.mime.includes("svg") ? ii.url : ii.thumburl ?? ii.url);
      }
    } catch {}
    if (out.length) break;
  }
  return out;
}

// data/logo-overrides.json: { id: "https://direct-url" | "commons:File:Name.svg" | "wiki:Article title" | "none" }
const OVERRIDES = existsSync("data/logo-overrides.json") ? JSON.parse(readFileSync("data/logo-overrides.json", "utf8")) : {};
const WIKI_TITLES = Object.fromEntries(Object.entries(OVERRIDES).filter(([, v]) => typeof v === "string" && v.startsWith("wiki:")).map(([k, v]) => [k, v.slice(5)]));
async function overrideCandidates(b) {
  const o = OVERRIDES[b.id];
  if (!o || o === "none" || WIKI_TITLES[b.id]) return [];
  const list = Array.isArray(o) ? o : [o];
  const out = [];
  for (const v of list) {
    if (!v.startsWith("commons:")) { out.push(v); continue; }
    try {
      const r = await get(`https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|mime&iiurlwidth=256&titles=${encodeURIComponent(v.slice(8))}`);
      for (const p of Object.values((await r.json()).query?.pages ?? {})) {
        const ii = p.imageinfo?.[0];
        if (ii) out.push(ii.mime.includes("svg") ? ii.url : ii.thumburl ?? ii.url);
      }
    } catch {}
  }
  return out;
}

async function resolve(b) {
  if (OVERRIDES[b.id] === "none") return null;
  const manual = await overrideCandidates(b);
  const site = await siteCandidates(b);
  const steps = [
    ["manual", manual],
    ["wikipedia", await wikiCandidates(b)],
    ["dataset", b.logo ? [b.logo] : []],
    ["website", site.good],
    ["commons", await commonsCandidates(b)],
    ["github-avatar", avatarCandidate(b)],
    ["favicon", site.fallback],
  ];
  for (const [kind, urls] of steps) {
    for (const url of urls) {
      const d = await download(url);
      if (d) {
        const file = `${b.id}.${d.ext}`;
        writeFileSync(`public/logos/${file}`, d.buf);
        return { file: `/logos/${file}`, source: url, kind };
      }
    }
  }
  return null;
}

const todo = browsers.filter((b) => (only.length ? only.includes(b.id) : force || !logos[b.id]));
let done = 0;
const queue = [...todo];
await Promise.all(Array.from({ length: 6 }, async () => {
  while (queue.length) {
    const b = queue.shift();
    const res = await resolve(b);
    if (res) logos[b.id] = res; else delete logos[b.id];
    console.log(`${++done}/${todo.length} ${b.id}: ${res ? `${res.kind} ${res.file}` : "NONE"}`);
  }
}));
writeFileSync(MAP_FILE, JSON.stringify(Object.fromEntries(Object.entries(logos).sort()), null, 2) + "\n");
const missing = browsers.filter((b) => !logos[b.id]).map((b) => b.id);
console.log(`\n${browsers.length - missing.length}/${browsers.length} logos. Missing: ${missing.join(", ")}`);
