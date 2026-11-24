// After `astro build`: writes a Markdown copy of every HTML page next to it (dist/browsers/x.html -> dist/browsers/x.md).
// AI agents get it from the normal URL with "Accept: text/markdown" (worker/index.js) or at <url>.md.
// Only the page's <main> content is converted; scripts, icons, buttons and hidden UI are dropped.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

const DIST = "dist";
const SITE = (process.env.SITE_URL ?? "https://browserwall.org").replace(/\/$/, "");

const files = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") && files.push(p); } })(DIST);

const td = new TurndownService({ headingStyle: "atx", bulletListMarker: "-", codeBlockStyle: "fenced", emDelimiter: "_" });
td.use(gfm);
td.remove(["script", "style", "noscript", "template", "svg", "button", "form", "input", "select", "textarea", "dialog", "iframe"]);
// Hidden UI, decorative images and screen-reader-only duplicates add nothing for a reader.
td.addRule("hidden", { filter: (n) => n.nodeType === 1 && (n.hasAttribute("hidden") || n.getAttribute("aria-hidden") === "true"), replacement: () => "" });
td.addRule("decorative-img", { filter: (n) => n.nodeName === "IMG" && !n.getAttribute("alt"), replacement: () => "" });
// Link cards wrap block-level spans; keep them on one line.
td.addRule("link", {
  filter: (n) => n.nodeName === "A" && n.getAttribute("href"),
  replacement: (content, n) => {
    const text = content.replace(/\s*\n+\s*/g, " – ").replace(/\s+/g, " ").replace(/^[\s–·]+|[\s–·]+$/g, "");
    const href = n.getAttribute("href");
    return text ? `[${text}](${href})` : "";
  },
});
// Score bars (<span class="ax">Privacy</span> … <b>4/5</b>) -> "- Privacy: 4/5".
td.addRule("scorebar", {
  filter: (n) => n.nodeName === "LI" && /\bscorebars\b/.test(n.parentNode?.getAttribute?.("class") ?? ""),
  replacement: (_c, n) => `- ${n.querySelector(".ax")?.textContent.trim() ?? ""}: ${n.querySelector("b")?.textContent.trim() ?? ""}\n`,
});
// Definition lists (facts) -> "- **Runs on:** Linux, macOS".
td.addRule("dt", { filter: "dt", replacement: (c) => `- **${c.trim()}:** ` });
td.addRule("dd", { filter: "dd", replacement: (c) => `${c.trim()}\n` });
td.addRule("dl-row", { filter: (n) => n.nodeName === "DIV" && n.parentNode?.nodeName === "DL", replacement: (c) => c });
td.addRule("dl", { filter: "dl", replacement: (c) => `\n\n${c.trim()}\n\n` });

const attr = (html, re) => html.match(re)?.[1]?.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'") ?? "";
const yaml = (s) => JSON.stringify(s); // JSON strings are valid YAML scalars

let n = 0;
for (const file of files) {
  const rel = relative(DIST, file).replace(/\\/g, "/");
  if (rel === "404.html") continue;
  const html = readFileSync(file, "utf8");
  if (/<meta name="robots" content="noindex"/.test(html)) continue;
  const main = html.match(/<main[^>]*>([\s\S]*)<\/main>/)?.[1];
  if (!main) continue;
  const title = attr(html, /<title>([^<]*)<\/title>/);
  const description = attr(html, /<meta name="description" content="([^"]*)"/);
  const url = attr(html, /<link rel="canonical" href="([^"]*)"/) || `${SITE}/${rel.replace(/(index)?\.html$/, "")}`;
  // Absolute links so the Markdown still works when an agent reads it out of context.
  const body = td.turndown(main.replace(/(href|src)="\/(?!\/)/g, `$1="${SITE}/`).replace(/<small([^>]*)>/g, "<small$1> – ").replace(/<\/a><a /g, "</a> · <a ").replace(/<\/span>\s*<span/g, "</span> · <span"))
    .replace(/^(\s*)-\s{2,}/gm, "$1- ").replace(/^(\s*\d+\.)\s{2,}/gm, "$1 ").replace(/\n{3,}/g, "\n\n").trim();
  const md = `---\ntitle: ${yaml(title)}\ndescription: ${yaml(description)}\nurl: ${url}\n---\n\n${body}\n`;
  writeFileSync(file.replace(/\.html$/, ".md"), md);
  n++;
}
console.log(`markdown: wrote ${n} .md files`);
