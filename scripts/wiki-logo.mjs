// Helper: node scripts/wiki-logo.mjs "Article title" ... -> prints the first images of each article's infobox
// (parses rendered HTML, so non-free logos that the pageimages API hides are included).
const UA = { "User-Agent": "browser-quiz/1.0 (https://github.com/adamko/browser-quiz; logo research) node-fetch" };

export async function infoboxImages(title) {
  await new Promise((r) => setTimeout(r, 1100));
  const r = await fetch(`https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&redirects=1&page=${encodeURIComponent(title)}`, { headers: UA });
  if (!r.ok) return [];
  const html = (await r.json()).parse?.text?.["*"] ?? "";
  const box = html.match(/<table[^>]*class="[^"]*infobox[\s\S]*?<\/table>/)?.[0] ?? "";
  return [...box.matchAll(/<img[^>]*src="([^"]+)"/g)].map((m) => {
    let src = m[1].startsWith("//") ? "https:" + m[1] : m[1];
    // Thumbnail -> larger 256px thumb (SVG thumbs stay PNG renders, which is fine).
    return src.replace(/\/(\d+)px-/, "/256px-");
  });
}

if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, "/")}`) {
  for (const t of process.argv.slice(2)) console.log(`${t} => ${(await infoboxImages(t)).slice(0, 3).join("  ") || "-"}`);
}
