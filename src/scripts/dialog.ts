// Browser details dialog. Data comes from <script id="browser-data"> rendered by BrowserDialog.astro.
import type { Browser } from "../data/browsers";

interface Payload {
  browsers: Browser[];
  tags: Record<string, { label: string; icon: string }>;
  engines: Record<string, string>;
  oses: Record<string, string>;
  families: Record<string, { label: string }>;
  axes: { key: keyof Browser["scores"]; label: string; low: string; high: string }[];
}

let data: Payload | null = null;
const load = () => (data ??= JSON.parse(document.getElementById("browser-data")!.textContent!) as Payload);

const esc = (s: unknown) => String(s ?? "").replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const icon = (name: string, size = 14) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const initials = (n: string) => n.replace(/[^A-Za-z0-9 ]/g, "").split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
const host = (u: string) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return u; } };
const compact = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : String(n));
const link = (href: string | null, label: string, ico: string) =>
  href ? `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${icon(ico, 15)}${esc(label)}</a>` : "";

function render(b: Browser, d: Payload) {
  const engine = d.engines[b.engine];
  const based = b.basedOn && b.basedOn.toLowerCase() !== engine.toLowerCase() ? ` · based on ${esc(b.basedOn)}` : "";
  const status = { active: "Active", maintenance: "Maintenance only", discontinued: "Discontinued" }[b.status];
  const parent = b.channelOf ? d.browsers.find((x) => x.id === b.channelOf) : null;
  const scores = d.axes.map((a) => {
    const v = b.scores[a.key] as number;
    const segs = Array.from({ length: 5 }, (_, i) => `<i${i < v ? ' class="on"' : ""}></i>`).join("");
    return `<li><span class="ax">${esc(a.label)}</span><span class="bar" role="img" aria-label="${v} out of 5">${segs}</span><b>${v}</b>
      <span class="scale"><span>${esc(a.low)}</span><span>${esc(a.high)}</span></span></li>`;
  }).join("");
  const facts: [string, string][] = [
    ["Engine", `${esc(engine)} <span class="dim">(${esc(d.families[b.family].label)} family)</span>`],
    ["Runs on", b.os.map((o) => esc(d.oses[o])).join(", ") || "–"],
    ["Status", esc(status)],
    ["Source", b.openSource ? "Open source" : "Closed source"],
  ];
  facts.push(["Price", b.price ? esc(b.price.note) : "Free"]);
  if (b.stars != null) facts.push(["GitHub stars", compact(b.stars)]);
  if (b.lastCommit) facts.push(["Last commit", esc(b.lastCommit)]);
  if (parent) facts.push(["Channel of", `<button type="button" class="linkish" data-open="${esc(parent.id)}">${esc(parent.name)}</button>`]);

  return `
    <header class="bd-head">
      <div class="bd-logo">${b.logo ? `<img src="${esc(b.logo)}" alt="" width="56" height="56">` : `<span class="mono">${esc(initials(b.name))}</span>`}</div>
      <div class="bd-title">
        <h2 id="bd-title">${esc(b.name)}</h2>
        <p>${esc(engine)}${based}</p>
      </div>
      <button type="button" class="bd-close" data-close aria-label="Close">${icon("Cancel01Icon", 18)}</button>
    </header>
    <p class="bd-desc">${esc(b.description)}</p>
    ${b.note ? `<p class="bd-note">${icon("Alert02Icon", 15)}<span>${esc(b.note)}</span></p>` : ""}
    <section aria-labelledby="bd-scores">
      <h3 id="bd-scores">Scores <span class="dim">1–5, editorial</span></h3>
      ${b.scores.lowConfidence ? `<p class="bd-low">${icon("InformationCircleIcon", 14)}Rough estimate: little is known about this one yet.</p>` : ""}
      <ul class="bd-scorelist">${scores}</ul>
      ${b.scoreWhy ? `<p class="bd-why"><b>Why these scores:</b> ${esc(b.scoreWhy)}</p>` : ""}
      ${b.scoreSources.length ? `<p class="bd-src">Sources: ${b.scoreSources.map((u) => `<a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(host(u))}</a>`).join(" · ")}</p>` : ""}
      <p class="bd-foot">There is no speed score on purpose: mainstream browsers are within benchmark noise of each other. Lightness is about RAM and old hardware.</p>
    </section>
    ${b.ai ? aiBlock(b.ai) : ""}
    <dl class="bd-facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
    ${b.tags.length ? `<ul class="bd-tags" aria-label="Tags">${b.tags.filter((t) => t !== "rip").map((t) => `<li>${icon(d.tags[t].icon, 12)}${esc(d.tags[t].label)}</li>`).join("")}</ul>` : ""}
    <nav class="bd-links" aria-label="Links">
      <a href="/browsers/${esc(b.id)}">${icon("InformationCircleIcon", 15)}Full profile</a>
      ${link(b.website, "Website", "ArrowUpRight01Icon")}${link(b.repo, "Source", "GithubIcon")}${link(b.reddit, "Reddit", "RedditIcon")}${link(b.x, "X", "NewTwitterIcon")}
    </nav>`;
}

const AI_LEVEL = { 1: "Basic AI (chat, summaries)", 2: "Integrated AI assistant", 3: "AI agent – can browse for you" } as const;
const AI_OFF = { fully: "can be fully switched off", partly: "can only partly be switched off", no: "can't be switched off" } as const;
function aiBlock(a: NonNullable<Browser["ai"]>) {
  const bits = [esc(a.models), a.quality != null ? `quality ${a.quality}/5` : "", a.agent && a.agentPaid ? "agent needs a paid plan" : "", a.local ? "local model option" : "", esc(AI_OFF[a.canDisable])].filter(Boolean);
  return `<section class="bd-ai" aria-label="Built-in AI"><h3>${icon("SparklesIcon", 14)}${AI_LEVEL[a.level]}</h3>
    <p class="bd-ai-meta">${bits.join(" · ")}</p><p class="bd-ai-note">${esc(a.note)}</p></section>`;
}

/** Open the details dialog for a browser id. Focus returns to the opener on close (native <dialog>). */
export function openBrowser(id: string) {
  const d = load();
  const b = d.browsers.find((x) => x.id === id);
  const dlg = document.getElementById("bd") as HTMLDialogElement | null;
  if (!b || !dlg) return;
  dlg.querySelector(".bd-body")!.innerHTML = render(b, d);
  dlg.dataset.status = b.status;
  if (!dlg.open) dlg.showModal();
  dlg.querySelector<HTMLElement>(".bd-close")?.focus();
}

export function initDialog() {
  const dlg = document.getElementById("bd") as HTMLDialogElement | null;
  if (!dlg || dlg.dataset.ready) return;
  dlg.dataset.ready = "1";
  dlg.addEventListener("click", (e) => {
    const t = e.target as HTMLElement;
    if (t === dlg || t.closest("[data-close]")) dlg.close(); // backdrop click or close button
    const open = t.closest<HTMLElement>("[data-open]");
    if (open) openBrowser(open.dataset.open!);
  });
}
