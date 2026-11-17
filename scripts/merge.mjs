// Merges data/raw/*.json into src/data/browsers.json, deduping and validating.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";

const ENGINES = new Set(["blink", "gecko", "webkit", "goanna", "servo", "ladybird", "trident", "presto", "text", "other"]);
const OSES = new Set(["windows", "macos", "linux", "bsd", "other"]);
const STATUSES = new Set(["active", "maintenance", "discontinued"]);
const TAGS = new Set(("privacy de-googled ad-blocking security-hardened tor vertical-tabs workspaces split-view " +
  "keyboard-driven power-user customizable minimal lightweight old-hardware performance gaming ai crypto " +
  "developer sync mainstream chrome-extensions firefox-addons independent-engine text-mode retro portable " +
  "regional enterprise experimental meme rip vpn").split(" "));

// Same browser under different ids across files -> canonical id.
const ALIASES = {
  "webpositive": "haiku-webpositive", "mypal-68": "mypal68", "flow": "flow-browser",
};
// Raw-file priority: first file wins; later files only fill null fields. extras.json = hand-verified entries.
const ORDER = ["extras.json", "chromium.json", "gecko.json", "independent.json", "niche.json", "mac.json"];

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const byId = new Map();
const problems = [];

for (const file of ORDER.filter((f) => readdirSync("data/raw").includes(f))) {
  for (const raw of JSON.parse(readFileSync(`data/raw/${file}`, "utf8"))) {
    const e = { ...raw, id: ALIASES[raw.id] ?? raw.id };
    // Dedupe also by normalised name.
    const dup = byId.get(e.id) ?? [...byId.values()].find((x) => norm(x.name) === norm(e.name));
    if (dup) {
      for (const k of Object.keys(e)) if (dup[k] == null || (Array.isArray(dup[k]) && !dup[k].length)) dup[k] = e[k];
      dup.sources = [...new Set([...(dup.sources ?? []), ...(e.sources ?? [])])];
      problems.push(`dedup: ${e.id} (${file}) merged into ${dup.id}`);
      continue;
    }
    byId.set(e.id, e);
  }
}

const overrides = JSON.parse(readFileSync("data/overrides.json", "utf8"));
for (const [id, patch] of Object.entries(overrides)) {
  if (id.startsWith("_")) continue;
  if (!byId.has(id)) { problems.push(`override for unknown id ${id}`); continue; }
  Object.assign(byId.get(id), patch);
}

const curation = JSON.parse(readFileSync("data/curation.json", "utf8"));
const include = new Set(curation.include);
for (const id of include) if (!byId.has(id)) problems.push(`curation: unknown id ${id}`);
const dropped = [...byId.keys()].filter((id) => !include.has(id));
for (const id of dropped) byId.delete(id);
writeFileSync("data/dropped.txt", dropped.sort().join("\n") + "\n");

const out = [];
for (const e of byId.values()) {
  if (!ENGINES.has(e.engine)) problems.push(`${e.id}: bad engine ${e.engine}`), (e.engine = "other");
  e.os = (e.os ?? []).filter((o) => OSES.has(o) || !problems.push(`${e.id}: bad os ${o}`));
  if (!STATUSES.has(e.status)) problems.push(`${e.id}: bad status ${e.status}`), (e.status = "active");
  e.tags = [...new Set((e.tags ?? []).filter((t) => TAGS.has(t) || !problems.push(`${e.id}: bad tag ${t}`)))];
  if (e.status === "discontinued" && !e.tags.includes("rip")) e.tags.push("rip");
  if (e.status !== "discontinued") e.tags = e.tags.filter((t) => t !== "rip");
  out.push({
    id: e.id, name: e.name, engine: e.engine, basedOn: e.basedOn ?? null, os: e.os, status: e.status,
    openSource: !!e.openSource, description: e.description ?? "", tags: e.tags,
    website: e.website ?? null, repo: e.repo ?? null, logo: e.logo ?? null, sources: e.sources ?? [],
  });
}
// Scores: [privacy, experience, customisation, lightness, minimalism], 1-5. See data/SCHEMA.md.
const rawScores = JSON.parse(readFileSync("data/scores.json", "utf8"));
const resolveScore = (id, seen = new Set()) => {
  const v = rawScores[id];
  if (v == null || seen.has(id)) return null;
  seen.add(id);
  let arr, low = false;
  if (Array.isArray(v)) arr = v;
  else if (v.like) {
    const base = resolveScore(v.like, seen);
    if (!base) return null;
    arr = base.arr.map((n, i) => Math.min(5, Math.max(1, n + (v.adjust?.[i] ?? 0)))), (low = base.low);
  } else (arr = v.s), (low = !!v.low);
  return { arr, low };
};
for (const e of out) {
  const s = resolveScore(e.id);
  if (!s || s.arr.length !== 5 || !s.arr.every((n) => Number.isInteger(n) && n >= 1 && n <= 5)) {
    problems.push(`${e.id}: missing or invalid scores`);
    continue;
  }
  const [privacy, experience, customisation, lightness, minimalism] = s.arr;
  e.scores = { privacy, experience, customisation, lightness, minimalism, ...(s.low ? { lowConfidence: true } : {}) };
}
for (const id of Object.keys(rawScores)) if (!id.startsWith("_") && !byId.has(id)) problems.push(`scores: unknown id ${id}`);
out.sort((a, b) => a.name.localeCompare(b.name));
mkdirSync("src/data", { recursive: true });
writeFileSync("src/data/browsers.json", JSON.stringify(out, null, 2) + "\n");
console.log(problems.join("\n"));
console.log(`\n${out.length} browsers, ${out.filter((b) => b.logo).length} with logo URL`);
