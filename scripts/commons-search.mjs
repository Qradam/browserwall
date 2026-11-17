// Helper: node scripts/commons-search.mjs "query" ["query2" ...] -> lists matching Commons files
const UA = { "User-Agent": "browser-quiz/1.0 (https://github.com/adamko/browser-quiz; logo research) node-fetch" };
for (const q of process.argv.slice(2)) {
  await new Promise((r) => setTimeout(r, 1200));
  const r = await fetch(`https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srnamespace=6&srlimit=8&srsearch=${encodeURIComponent(q)}`, { headers: UA });
  if (!r.ok) { console.log(`## ${q}: HTTP ${r.status}`); continue; }
  const j = await r.json();
  console.log(`## ${q}\n` + (j.query?.search ?? []).map((s) => "  " + s.title).join("\n"));
}
