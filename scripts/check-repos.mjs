// Checks last commit date + archived flag for every GitHub repo in the dataset.
// Output: data/repo-check.json  (used to correct statuses by hand / in merge)
import { readFileSync, writeFileSync } from "node:fs";

const browsers = JSON.parse(readFileSync("src/data/browsers.json", "utf8"));
const UA = { "User-Agent": "browser-quiz-dataset-check" };
const results = {};

async function check(b) {
  const m = b.repo?.match(/github\.com\/([^/]+)\/([^/#?]+)/);
  if (!m) return;
  const [, owner, repo] = m;
  const base = `https://github.com/${owner}/${repo.replace(/\.git$/, "")}`;
  try {
    const page = await fetch(base, { headers: UA, redirect: "follow" });
    if (!page.ok) return (results[b.id] = { repo: base, error: page.status });
    const html = await page.text();
    const archived = /This repository has been archived/i.test(html);
    const branch = html.match(/"defaultBranch":"([^"]+)"/)?.[1] ?? "HEAD";
    const feed = await fetch(`${base}/commits/${branch}.atom`, { headers: UA });
    const xml = feed.ok ? await feed.text() : "";
    const last = xml.match(/<updated>([^<]+)<\/updated>/g)?.[1]?.replace(/<\/?updated>/g, "") ?? null;
    results[b.id] = { repo: page.url, archived, lastCommit: last?.slice(0, 10) ?? null, status: b.status };
  } catch (e) {
    results[b.id] = { repo: base, error: String(e) };
  }
}

const queue = [...browsers];
await Promise.all(Array.from({ length: 6 }, async () => { while (queue.length) await check(queue.shift()); }));
writeFileSync("data/repo-check.json", JSON.stringify(results, null, 2));

const now = Date.now();
for (const [id, r] of Object.entries(results).sort()) {
  const age = r.lastCommit ? Math.round((now - Date.parse(r.lastCommit)) / 864e5) : null;
  console.log([id, r.status, r.error ?? "", r.archived ? "ARCHIVED" : "", r.lastCommit ?? "", age != null ? age + "d" : ""].join(" | "));
}
