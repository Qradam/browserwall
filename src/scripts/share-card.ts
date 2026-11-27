// Share dialog for the browser personality card (markup in src/components/ShareCard.astro).
import { DESIGNS, renderCard, toBlob, type Design, type Format } from "./card";
import { OS_VARIANTS, findVariant, type DesktopOS } from "../lib/os-marks";
import { personality, shareText, listText, type CardData } from "../lib/personality";
import type { QuizState, Ranking } from "../lib/quiz";
import { isLocale, type Locale } from "../i18n";
import { QUIZ_I18N } from "../i18n/quiz";

export interface ShareSource { state: QuizState; ranking: Ranking; total: number; url: string; lang?: Locale }

interface Prefs { design: Design; format: Format; showOs: boolean; variant: Partial<Record<DesktopOS, string>>; mastodon?: string }
const KEY = "bw-share-card";
const loadPrefs = (): Prefs => {
  const base: Prefs = { design: "wrapped", format: "post", showOs: true, variant: {} };
  try {
    const p = { ...base, ...JSON.parse(localStorage.getItem(KEY) ?? "{}") } as Prefs;
    if (!DESIGNS.some((d) => d.id === p.design)) p.design = base.design;
    if (p.format !== "post" && p.format !== "story") p.format = base.format;
    return p;
  } catch { return base; }
};
const savePrefs = (p: Prefs) => { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* private mode */ } };
const fmt = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));

const enc = encodeURIComponent;
/** Compose URLs. None of these can attach an image, so the image is copied to the clipboard first. */
const INTENTS: Record<string, (text: string, url: string) => string> = {
  x: (t, u) => `https://x.com/intent/post?text=${enc(t)}&url=${enc(u)}`,
  bluesky: (t, u) => `https://bsky.app/intent/compose?text=${enc(`${t} ${u}`)}`,
  reddit: (t, u) => `https://www.reddit.com/submit?url=${enc(u)}&title=${enc(t)}`,
  threads: (t, u) => `https://www.threads.net/intent/post?text=${enc(`${t} ${u}`)}`,
  telegram: (t, u) => `https://t.me/share/url?url=${enc(u)}&text=${enc(t)}`,
  whatsapp: (t, u) => `https://wa.me/?text=${enc(`${t} ${u}`)}`,
};
const NAMES: Record<string, string> = { x: "X", bluesky: "Bluesky", reddit: "Reddit", threads: "Threads", telegram: "Telegram", whatsapp: "WhatsApp", mastodon: "Mastodon" };
const HOST = /^(?=.{4,253}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;

export function initShareCard(getSource: () => ShareSource) {
  const $ = <T extends HTMLElement>(s: string) => document.querySelector<T>(s)!;
  const dlg = $<HTMLDialogElement>("#sc");
  const canvas = $<HTMLCanvasElement>("#sc-canvas");
  const preview = $("#sc-preview");
  const status = $("#sc-status");
  const variantSel = $<HTMLSelectElement>("#sc-variant");
  const showOs = $<HTMLInputElement>("#sc-show-os");
  const prefs = loadPrefs();
  let src: ShareSource | null = null;
  let data: CardData | null = null;
  let blob: Promise<Blob> | null = null;
  let token = 0;

  const lang = (): Locale => src?.lang ?? (isLocale(document.documentElement.lang) ? document.documentElement.lang : "en");
  const copy = () => QUIZ_I18N[lang()].shareCard.status;
  const canShareFiles = (f: File) => !!navigator.canShare?.({ files: [f] });
  if ("share" in navigator) dlg.querySelector<HTMLElement>('[data-share="native"]')!.hidden = false;

  function say(msg: string, err = false, link?: { href: string; label: string }) {
    status.classList.toggle("err", err);
    status.textContent = msg;
    if (link) {
      const a = document.createElement("a");
      a.href = link.href; a.target = "_blank"; a.rel = "noopener noreferrer"; a.textContent = link.label;
      status.append(" ", a);
    }
  }

  const os = () => (src?.state.os ?? null) as DesktopOS | null;
  function fillVariants() {
    const o = os();
    const list = o ? OS_VARIANTS[o] : [];
    variantSel.replaceChildren(...list.map((v) => new Option(v.label, v.id)));
    variantSel.value = (o && prefs.variant[o]) || list[0]?.id || "";
    variantSel.disabled = !list.length || !showOs.checked;
    showOs.disabled = !list.length;
    paintMark();
  }
  function paintMark() {
    const m = findVariant(os(), variantSel.value);
    const el = $("#sc-mark");
    if (!m) { el.replaceChildren(); return; }
    el.innerHTML = m.path
      ? `<svg viewBox="0 0 24 24"><path fill="${m.color ?? "#fff"}" d="${m.path.replace(/"/g, "")}"/></svg>`
      : `<b style="color:${m.color ?? "#fff"}">${m.label.slice(0, 2).toUpperCase()}</b>`;
  }

  async function redraw() {
    if (!src) return;
    const mine = ++token;
    const l = lang();
    data = personality(src.state, src.ranking, src.total, { showOs: showOs.checked, osVariant: variantSel.value || null, lang: l });
    $("#sc-emoji").textContent = data.archetype.emoji;
    $("#sc-name").textContent = data.archetype.name;
    $("#sc-roast").textContent = data.archetype.roast;
    preview.dataset.format = prefs.format;
    preview.classList.add("busy");
    await renderCard(canvas, data, prefs.design, prefs.format);
    if (mine !== token) return;
    preview.classList.remove("busy");
    blob = toBlob(canvas);
    const pick = data.top ? `, ${data.top.browser.name} (${data.top.match}%)` : "";
    canvas.setAttribute("aria-label", fmt(copy().ariaLabel, { name: data.archetype.name, pick, roast: data.archetype.roast }));
  }

  const fileName = () => `browserwall-${data?.archetype.id ?? "card"}-${prefs.design}.png`;
  async function file(b?: Blob) { return new File([b ?? (await blob!)], fileName(), { type: "image/png" }); }

  function download(b: Blob, name = fileName()) {
    const url = URL.createObjectURL(b);
    const a = Object.assign(document.createElement("a"), { href: url, download: name });
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }
  async function copyImage(): Promise<boolean> {
    if (!blob || typeof ClipboardItem === "undefined" || !navigator.clipboard?.write) return false;
    try { await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]); return true; } catch { return false; }
  }
  async function copyText(t: string) {
    try { await navigator.clipboard.writeText(t); return true; } catch { return false; }
  }
  function openWindow(url: string, name: string) {
    const w = window.open(url, "_blank");
    if (w) { w.opener = null; return true; }
    say(copy().popupBlocked, true, { href: url, label: fmt(copy().openTarget, { name }) });
    return false;
  }
  /** Story-format blob, for Instagram (rendered off-screen if the preview is in post format). */
  async function storyBlob() {
    if (prefs.format === "story") return blob!;
    const off = document.createElement("canvas");
    await renderCard(off, data!, prefs.design, "story");
    return toBlob(off);
  }

  async function share(target: string) {
    if (!src || !data || !blob) return;
    const s = copy();
    const text = shareText(data), url = src.url;
    if (target === "native") {
      try {
        const f = await file();
        await navigator.share(canShareFiles(f) ? { files: [f], text: `${text} ${url}` } : { text, url });
      } catch (e) { if ((e as Error).name !== "AbortError") say(s.shareFailed, true); }
      return;
    }
    if (target === "instagram") {
      const b = await storyBlob();
      const f = await file(b);
      if (canShareFiles(f)) {
        try { await navigator.share({ files: [f] }); } catch (e) { if ((e as Error).name !== "AbortError") say(s.shareFailed, true); }
      } else {
        download(b, fileName().replace(".png", "-story.png"));
        say(s.storySaved);
      }
      return;
    }
    if (target === "discord") {
      const ok = await copyImage();
      if (ok) say(s.discordCopied);
      else { download(await blob); say(s.discordSaved); }
      return;
    }
    let intent: string;
    if (target === "mastodon") {
      const inst = prompt(s.mastodonPrompt, prefs.mastodon ?? "mastodon.social")?.trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
      if (!inst) return;
      if (!HOST.test(inst)) { say(s.mastodonInvalid, true); return; }
      prefs.mastodon = inst; savePrefs(prefs);
      intent = `https://${inst}/share?text=${enc(`${text} ${url}`)}`;
    } else intent = INTENTS[target](text, url);
    const copied = await copyImage();
    if (openWindow(intent, NAMES[target])) {
      say(copied ? fmt(s.copiedPaste, { name: NAMES[target] }) : fmt(s.openedNoCopy, { name: NAMES[target] }), !copied);
    }
  }

  dlg.addEventListener("change", (e) => {
    const t = e.target as HTMLInputElement;
    if (t.name === "sc-design") prefs.design = t.value as Design;
    else if (t.name === "sc-format") prefs.format = t.value as Format;
    else if (t === showOs) { prefs.showOs = t.checked; variantSel.disabled = !t.checked; }
    else if (t === (variantSel as unknown as HTMLInputElement)) { const o = os(); if (o) prefs.variant[o] = variantSel.value; paintMark(); }
    else return;
    savePrefs(prefs);
    say("");
    redraw();
  });
  dlg.addEventListener("click", async (e) => {
    const el = e.target as HTMLElement;
    if (el === dlg) { dlg.close(); return; } // click on the backdrop
    const btn = el.closest<HTMLButtonElement>("[data-share], [data-act]");
    if (!btn || !blob) return;
    if (btn.dataset.share) return share(btn.dataset.share);
    const s = copy();
    const act = btn.dataset.act;
    if (act === "download") { download(await blob); say(s.saved); }
    else if (act === "copy-image") { const ok = await copyImage(); say(ok ? s.imageCopied : s.imageCopyFailed, !ok); }
    else if (act === "copy-link") { const ok = await copyText(src!.url); say(ok ? s.linkCopied : s.linkCopyFailed, !ok); }
    else if (act === "copy-list") { const ok = await copyText(listText(data!, src!.url)); say(ok ? fmt(s.listCopied, { n: data!.ranked.length }) : s.listCopyFailed, !ok); }
  });
  $("#sc-close").addEventListener("click", () => dlg.close());

  return {
    open() {
      src = getSource();
      dlg.querySelector<HTMLInputElement>(`input[name="sc-design"][value="${prefs.design}"]`)!.checked = true;
      dlg.querySelector<HTMLInputElement>(`input[name="sc-format"][value="${prefs.format}"]`)!.checked = true;
      showOs.checked = prefs.showOs;
      fillVariants();
      say("");
      dlg.showModal();
      redraw();
    },
  };
}
