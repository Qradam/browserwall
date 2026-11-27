// Canvas renderer for the shareable "browser personality" card. Four designs, two formats (4:5 post, 9:16 story).
// Every design lays out a 1080×1350 block; the story format paints the background full-height and centres that block.
import type { CardData } from "../lib/personality";
import type { Mark } from "../lib/os-marks";
import type { Browser } from "../data/browsers";
import { LOCALE_META, formatCount, type Locale } from "../i18n";
import { QUIZ_I18N } from "../i18n/quiz";
import { UI } from "../i18n/ui";

export type Design = "wrapped" | "receipt" | "terminal" | "trading" | "list";
export type Format = "post" | "story";
export const DESIGNS: { id: Design; label: string }[] = [
  { id: "wrapped", label: "Wrapped" }, { id: "receipt", label: "Receipt" }, { id: "terminal", label: "Terminal" }, { id: "trading", label: "Trading" },
  { id: "list", label: "Shortlist" },
];
const W = 1080, BLOCK = 1350;
export const sizeOf = (f: Format) => ({ w: W, h: f === "story" ? 1920 : BLOCK });

const HEAD = '"Inter Variable", Inter, system-ui, sans-serif';
const BODY = '"Geist Variable", Geist, system-ui, sans-serif';
const MONO = '"JetBrains Mono", "Cascadia Code", Consolas, "SF Mono", ui-monospace, monospace';
const EMOJI = '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
const ENGINE: Record<string, string> = { blink: "Blink", gecko: "Gecko", webkit: "WebKit", goanna: "Goanna", servo: "Servo", ladybird: "LibWeb", trident: "Trident", presto: "Presto", text: "Text", other: "Other" };
const fmt = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
const urlText = (lang: Locale) => (lang === "en" ? "browserwall.org/quiz" : `browserwall.org/${lang}/quiz`);
const engineName = (e: string, lang: Locale) => UI[lang].engines[e as keyof (typeof UI)[Locale]["engines"]] ?? ENGINE[e] ?? e;

type Ctx = CanvasRenderingContext2D;

// ---------------------------------------------------------------------------- helpers

const font = (c: Ctx, weight: number | string, size: number, fam = BODY) => { c.font = `${weight} ${size}px ${fam}`; };
const spacing = (c: Ctx, px: number) => { if ("letterSpacing" in c) (c as Ctx & { letterSpacing: string }).letterSpacing = `${px}px`; };

function wrap(c: Ctx, text: string, maxW: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const test = line ? `${line} ${word}` : word;
    if (line && c.measureText(test).width > maxW) { lines.push(line); line = word; } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}
function clampLines(c: Ctx, lines: string[], max: number, maxW: number) {
  if (lines.length <= max) return lines;
  const out = lines.slice(0, max);
  out[max - 1] = ellipsize(c, `${out[max - 1]}…`, maxW);
  return out;
}
function ellipsize(c: Ctx, text: string, maxW: number) {
  if (c.measureText(text).width <= maxW) return text;
  let t = text.replace(/…$/, "");
  while (t.length > 1 && c.measureText(`${t}…`).width > maxW) t = t.slice(0, -1);
  return `${t.trimEnd()}…`;
}
/** Largest size (step 4px) at which `text` fits in maxLines lines of maxW. */
function fit(c: Ctx, text: string, maxW: number, max: number, min: number, weight: number, fam: string, maxLines = 1) {
  for (let size = max; size >= min; size -= 4) {
    font(c, weight, size, fam);
    const lines = wrap(c, text, maxW);
    if (lines.length <= maxLines && lines.every((l) => c.measureText(l).width <= maxW)) return { size, lines };
  }
  font(c, weight, min, fam);
  return { size: min, lines: clampLines(c, wrap(c, text, maxW), maxLines, maxW) };
}
function rrect(c: Ctx, x: number, y: number, w: number, h: number, r: number | number[]) {
  c.beginPath();
  c.roundRect(x, y, w, h, r);
}
function glow(c: Ctx, x: number, y: number, r: number, color: string, alpha: number) {
  const g = c.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, hexA(color, alpha));
  g.addColorStop(1, hexA(color, 0));
  c.fillStyle = g;
  c.fillRect(x - r, y - r, r * 2, r * 2);
}
function hexA(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgb(${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255} / ${a})`;
}
function rng(seed: number) {
  let s = seed || 1;
  return () => { s = (s + 0x6d2b79f5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const initials = (n: string) => n.replace(/[^A-Za-z0-9 ]/g, "").split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
/** "Gecko · based on Firefox"; skips the upstream when it just repeats the engine (Orion: WebKit/WebKit). */
function engineLine(b: Browser, lang: Locale, pre: string, post = "") {
  const eng = engineName(b.engine, lang);
  return b.basedOn && b.basedOn.toLowerCase() !== eng.toLowerCase() ? `${eng}${pre}${b.basedOn}${post}` : eng;
}

/** OS / distro mark from a 24×24 path (lettered disc when there's no path). */
function drawMark(c: Ctx, mark: Mark, x: number, y: number, size: number, fill?: string) {
  const col = fill ?? mark.color ?? "#ffffff";
  c.save();
  if (mark.path) {
    c.translate(x, y);
    c.scale(size / 24, size / 24);
    c.fillStyle = col;
    c.fill(new Path2D(mark.path));
  } else {
    c.beginPath(); c.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
    c.fillStyle = col; c.fill();
    font(c, 800, size * 0.4, HEAD); c.fillStyle = "#fff"; c.textAlign = "center"; c.textBaseline = "middle";
    c.fillText(initials(mark.label), x + size / 2, y + size / 2 + size * 0.03);
  }
  c.restore();
}

// ---------------------------------------------------------------------------- logos

const logoCache = new Map<string, Promise<HTMLImageElement | null>>();
/** Same-origin logos from /public/logos. SVGs without an intrinsic size get one, or Firefox won't draw them on canvas. */
function loadLogo(src: string | null): Promise<HTMLImageElement | null> {
  if (!src) return Promise.resolve(null);
  if (!logoCache.has(src)) logoCache.set(src, (async () => {
    try {
      let url = src;
      if (/\.svg(\?|$)/i.test(src)) {
        const text = await (await fetch(src)).text();
        const sized = text.replace(/<svg\b([^>]*)>/i, (m, attrs: string) => {
          if (!/viewBox=/i.test(attrs)) return m;
          return `<svg width="512" height="512"${attrs.replace(/\s(width|height)="[^"]*"/gi, "")}>`;
        });
        url = URL.createObjectURL(new Blob([sized], { type: "image/svg+xml" }));
      }
      const img = new Image();
      img.src = url;
      await img.decode();
      return img;
    } catch { return null; }
  })());
  return logoCache.get(src)!;
}
function drawLogo(c: Ctx, img: HTMLImageElement | null, b: Browser | undefined, x: number, y: number, size: number, halo = true) {
  if (img && img.naturalWidth) {
    const k = Math.min(size / img.naturalWidth, size / img.naturalHeight);
    const w = img.naturalWidth * k, h = img.naturalHeight * k;
    c.save();
    if (halo) { c.shadowColor = "rgb(0 0 0 / .45)"; c.shadowBlur = size * 0.12; c.shadowOffsetY = size * 0.04; }
    c.drawImage(img, x + (size - w) / 2, y + (size - h) / 2, w, h);
    c.restore();
    return;
  }
  c.save();
  rrect(c, x, y, size, size, size * 0.22);
  c.fillStyle = "#1c1c1c"; c.fill();
  c.strokeStyle = "#333"; c.lineWidth = Math.max(2, size * 0.02); c.stroke();
  font(c, 700, size * 0.36, MONO);
  c.fillStyle = "#bbb"; c.textAlign = "center"; c.textBaseline = "middle";
  c.fillText(b ? initials(b.name) : "?", x + size / 2, y + size / 2);
  c.restore();
}

// ---------------------------------------------------------------------------- designs

interface Env { c: Ctx; d: CardData; logoOf: (b?: Browser | null) => HTMLImageElement | null; H: number }

// 1. Wrapped: loud gradient blobs, huge type.
function wrappedBg({ c, d, H }: Env) {
  const [bg, a1, a2] = d.archetype.colors;
  c.fillStyle = bg; c.fillRect(0, 0, W, H);
  glow(c, W * 0.9, H * 0.08, 820, a1, 0.95);
  glow(c, W * 0.05, H * 0.78, 900, a2, 0.7);
  glow(c, W * 0.55, H * 0.45, 520, a1, 0.3);
  c.save();
  c.strokeStyle = "rgb(255 255 255 / .09)"; c.lineWidth = 3;
  for (let i = 0; i < 5; i++) { c.beginPath(); c.arc(W * 0.92, H * 0.06, 180 + i * 110, 0, Math.PI * 2); c.stroke(); }
  c.restore();
}
function wrapped({ c, d, logoOf }: Env) {
  const lang = d.lang ?? "en";
  const t = QUIZ_I18N[lang].shareCard.canvas;
  const u = urlText(lang);
  const x = 90, maxW = 900, a = d.archetype;
  c.fillStyle = "#fff"; c.textBaseline = "alphabetic"; c.textAlign = "left";
  font(c, 650, 30); spacing(c, 6); c.globalAlpha = 0.85;
  c.fillText(t.wrappedTitle, x, 120);
  spacing(c, 0); c.globalAlpha = 1;

  font(c, 400, 150, EMOJI);
  c.fillText(a.emoji, x - 6, 300);

  const name = fit(c, a.name, maxW, 150, 76, 820, HEAD, 2);
  let y = 330;
  spacing(c, -name.size * 0.03);
  for (const l of name.lines) { y += name.size * 0.92; c.fillText(l, x, y); }
  spacing(c, 0);

  font(c, 450, 38);
  c.globalAlpha = 0.88;
  y += 30;
  for (const l of clampLines(c, wrap(c, a.roast, maxW), name.lines.length > 1 ? 2 : 3, maxW)) { y += 52; c.fillText(l, x, y); }
  c.globalAlpha = 1;

  if (d.rising) {
    y += 46;
    const label = fmt(t.rising, { name: d.rising.name });
    font(c, 600, 28);
    const tw = c.measureText(label).width;
    rrect(c, x, y, tw + 100, 58, 29);
    c.fillStyle = "rgb(255 255 255 / .14)"; c.fill();
    c.fillStyle = "#fff"; c.fillText(label, x + 28, y + 39);
    font(c, 400, 28, EMOJI); c.fillText(d.rising.emoji, x + 40 + tw, y + 40);
  }

  // Top-3 panel, anchored to the bottom.
  const b = d.top?.browser;
  const minis = d.ranked.slice(1, 3);
  const ph = minis.length ? 290 : 200, py = (d.osMark ? 1150 : 1200) - ph;
  rrect(c, x, py, maxW, ph, 40);
  c.fillStyle = "rgb(0 0 0 / .38)"; c.fill();
  c.strokeStyle = "rgb(255 255 255 / .14)"; c.lineWidth = 2; c.stroke();
  drawLogo(c, logoOf(b), b, x + 36, py + 34, 130);
  const tx = x + 200, tw = maxW - 236;
  c.fillStyle = "#fff";
  font(c, 650, 24); spacing(c, 4); c.globalAlpha = 0.7;
  c.fillText(minis.length ? fmt(t.myTop, { n: minis.length + 1 }) : t.myBrowser, tx, py + 62);
  spacing(c, 0); c.globalAlpha = 1;
  const bn = fit(c, b?.name ?? t.nonePick, tw, 60, 34, 780, HEAD, 1);
  c.fillText(bn.lines[0], tx, py + 64 + bn.size);
  font(c, 500, 30); c.globalAlpha = 0.85;
  c.fillText(d.top ? fmt(t.topMatch, { match: d.top.match }) : fmt(t.survivedZero, { total: d.total }), tx, py + 166);
  c.globalAlpha = 1;
  if (minis.length) {
    c.fillStyle = "rgb(255 255 255 / .12)"; c.fillRect(x + 36, py + 192, maxW - 72, 2);
    const colW = (maxW - 72) / minis.length;
    minis.forEach((r, i) => {
      const cx0 = x + 36 + i * colW;
      font(c, 800, 26, HEAD); c.fillStyle = "#fff"; c.globalAlpha = 0.55;
      c.fillText(`#${i + 2}`, cx0, py + 252);
      c.globalAlpha = 1;
      drawLogo(c, logoOf(r.browser), r.browser, cx0 + 48, py + 214, 56, false);
      font(c, 700, 28);
      c.fillText(ellipsize(c, r.browser.name, colW - 130), cx0 + 118, py + 238);
      font(c, 500, 23); c.globalAlpha = 0.7;
      c.fillText(fmt(t.matchPct, { match: r.match }), cx0 + 118, py + 268);
      c.globalAlpha = 1;
    });
  }

  if (d.osMark) {
    const oy = py + ph + 28;
    drawMark(c, d.osMark, x, oy, 48);
    font(c, 700, 30); c.fillStyle = "#fff";
    c.fillText(d.osMark.label, x + 68, oy + 35);
    const lw = c.measureText(d.osMark.label).width;
    font(c, 450, 28); c.globalAlpha = 0.75;
    c.fillText(ellipsize(c, `· ${d.osMark.quip}`, maxW - 68 - lw - 14), x + 68 + lw + 14, oy + 35);
    c.globalAlpha = 1;
  }

  font(c, 650, 30);
  c.fillText(u, x, 1270);
  c.textAlign = "right"; c.globalAlpha = 0.75;
  c.fillText(t.findYoursArrow, x + maxW, 1270);
  c.globalAlpha = 1; c.textAlign = "left";
}

// 2. Receipt: thermal-printer receipt of your answers.
function receiptBg({ c, d, H }: Env) {
  const [bg, a1, a2] = d.archetype.colors;
  c.fillStyle = bg; c.fillRect(0, 0, W, H);
  glow(c, W * 0.2, H * 0.2, 700, a1, 0.55);
  glow(c, W * 0.85, H * 0.85, 700, a2, 0.45);
}
type Row = { t: "c"; text: string; size: number; bold?: boolean } | { t: "kv"; k: string; v: string; size?: number; bold?: boolean } | { t: "dash" } | { t: "gap"; h: number } | { t: "barcode" };
function receipt({ c, d }: Env) {
  const lang = d.lang ?? "en";
  const t = QUIZ_I18N[lang].shareCard.canvas;
  const u = urlText(lang);
  const pw = 780, px = (W - pw) / 2, pad = 56, iw = pw - pad * 2;
  const now = new Date();
  const intl = LOCALE_META[lang].intl;
  const date = now.toLocaleDateString(intl, { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();
  const time = now.toLocaleTimeString(intl, { hour: "2-digit", minute: "2-digit" });
  const U = (s: string) => s.toUpperCase();
  // Answer lines are trimmed from the end until the receipt fits the card (first ones are the strongest picks).
  const prios = d.priorities.map((p): Row => ({ t: "kv", k: U(p.label), v: U(p.level) }));
  const feats = [...d.must.map((f) => ({ k: `+ ${U(f)}`, v: t.mustVal })), ...d.nice.map((f) => ({ k: `+ ${U(f)}`, v: t.niceVal }))].map((r): Row => ({ t: "kv", ...r }));
  const nopes = d.avoid.map((a): Row => ({ t: "kv", k: `- ${U(a)}`, v: t.nopeVal }));
  const build = (np: number, nf: number, na: number): Row[] => [
    { t: "c", text: "BROWSERWALL", size: 46, bold: true },
    { t: "c", text: t.receiptSubtitle, size: 24 },
    { t: "c", text: `${date}  ${time}   ${t.orderPrefix}${String(d.seed % 100000).padStart(5, "0")}`, size: 21 },
    { t: "dash" },
    ...(d.osMark ? [{ t: "kv", k: t.osKey, v: U(d.osMark.label) } as Row] : []),
    ...(d.osMark && d.osMark.label !== d.os ? [{ t: "c", text: `"${d.osMark.quip}"`, size: 20 } as Row] : []),
    { t: "kv", k: t.extKey, v: U((d.ext ?? t.anyExt).replace(" Web Store", "")) },
    { t: "dash" },
    ...prios.slice(0, np), ...feats.slice(0, nf), ...nopes.slice(0, na),
    ...(feats.length > nf || nopes.length > na ? [{ t: "c", text: fmt(t.moreItems, { n: feats.length - nf + nopes.length - na }), size: 20 } as Row] : []),
    { t: "dash" },
    { t: "kv", k: t.wallCount, v: String(d.total) },
    { t: "kv", k: t.survivedCount, v: String(d.fit) },
    { t: "dash" },
    { t: "c", text: t.youAre, size: 22 },
    { t: "c", text: U(d.archetype.name), size: 44, bold: true },
    { t: "dash" },
    { t: "kv", k: t.totalKey, v: U(d.top?.browser.name ?? "N/A"), size: 38, bold: true },
    { t: "kv", k: t.matchKey, v: d.top ? `${d.top.match}%` : "0%" },
    ...d.ranked.slice(1, 3).map((r, i): Row => ({ t: "kv", k: `${i + 2}. ${U(r.browser.name)}`, v: `${r.match}%` })),
    { t: "gap", h: 18 },
    { t: "barcode" },
    { t: "c", text: t.thankYou, size: 20 },
    { t: "c", text: u, size: 20, bold: true },
  ];
  const heightOf = (r: Row) => {
    if (r.t === "c") { font(c, r.bold ? 800 : 500, r.size, MONO); return wrap(c, r.text, iw).length * r.size * 1.3 + 4; }
    if (r.t === "kv") return (r.size ?? 25) * 1.6;
    if (r.t === "dash") return 30;
    if (r.t === "gap") return r.h;
    return 100;
  };
  const total = (rs: Row[]) => rs.reduce((a, r) => a + heightOf(r), 0) + pad * 2;
  let np = prios.length, nf = feats.length, na = nopes.length;
  let rows = build(np, nf, na);
  while (total(rows) > BLOCK - 70 && np + nf + na > 0) {
    if (nf > 2) nf--; else if (na > 1) na--; else if (np > 2) np--; else if (nf) nf--; else if (na) na--; else np--;
    rows = build(np, nf, na);
  }
  const ph = total(rows);
  const py = Math.max(35, (BLOCK - ph) / 2);

  c.save();
  c.translate(W / 2, BLOCK / 2);
  c.rotate(-0.018);
  c.translate(-W / 2, -BLOCK / 2);
  // Paper with torn (zigzag) top and bottom edges.
  const tooth = 18;
  c.beginPath();
  c.moveTo(px, py);
  for (let x = px; x < px + pw; x += tooth * 2) { c.lineTo(x + tooth, py - tooth * 0.8); c.lineTo(Math.min(x + tooth * 2, px + pw), py); }
  c.lineTo(px + pw, py + ph);
  for (let x = px + pw; x > px; x -= tooth * 2) { c.lineTo(x - tooth, py + ph + tooth * 0.8); c.lineTo(Math.max(x - tooth * 2, px), py + ph); }
  c.closePath();
  c.shadowColor = "rgb(0 0 0 / .5)"; c.shadowBlur = 60; c.shadowOffsetY = 24;
  c.fillStyle = "#f6f3ec"; c.fill();
  c.shadowColor = "transparent";

  const ink = "#1d1b18";
  c.fillStyle = ink; c.strokeStyle = ink; c.textBaseline = "alphabetic";
  let y = py + pad;
  const rand = rng(d.seed);
  for (const r of rows) {
    const h = heightOf(r);
    if (r.t === "c") {
      font(c, r.bold ? 800 : 500, r.size, MONO); c.textAlign = "center";
      let ly = y;
      for (const l of wrap(c, r.text, iw)) { ly += r.size * 1.3; c.fillText(l, W / 2, ly - r.size * 0.25); }
    } else if (r.t === "kv") {
      const size = r.size ?? 25;
      font(c, r.bold ? 800 : 500, size, MONO);
      c.textAlign = "right";
      const vw = Math.min(c.measureText(r.v).width, iw * 0.55);
      c.fillText(ellipsize(c, r.v, iw * 0.55), px + pad + iw, y + size * 1.15);
      c.textAlign = "left";
      c.fillText(ellipsize(c, r.k, iw - vw - 24), px + pad, y + size * 1.15);
    } else if (r.t === "dash") {
      c.save(); c.setLineDash([10, 8]); c.lineWidth = 2;
      c.beginPath(); c.moveTo(px + pad, y + h / 2); c.lineTo(px + pad + iw, y + h / 2); c.stroke(); c.restore();
    } else if (r.t === "barcode") {
      let bx = px + pad + 40;
      while (bx < px + pad + iw - 40) { const bw = 2 + Math.floor(rand() * 7); if (rand() > 0.35) c.fillRect(bx, y, bw, 80); bx += bw + 2 + Math.floor(rand() * 4); }
    }
    y += h;
  }
  c.restore();
  c.textAlign = "left";
}

// 3. Terminal: neofetch for your browser taste.
function terminalBg({ c, d, H }: Env) {
  const [bg, a1] = d.archetype.colors;
  c.fillStyle = bg; c.fillRect(0, 0, W, H);
  glow(c, W / 2, H / 2, 900, a1, 0.28);
}
function terminal({ c, d, logoOf }: Env) {
  const lang = d.lang ?? "en";
  const t = QUIZ_I18N[lang].shareCard.canvas;
  const u = urlText(lang);
  const [, a1, a2] = d.archetype.colors;
  const wx = 60, wy = 110, ww = W - 120, wh = 1130;
  c.save();
  c.shadowColor = "rgb(0 0 0 / .6)"; c.shadowBlur = 70; c.shadowOffsetY = 30;
  rrect(c, wx, wy, ww, wh, 26); c.fillStyle = "#0c0c0c"; c.fill();
  c.restore();
  rrect(c, wx, wy, ww, wh, 26); c.strokeStyle = "#2c2c2c"; c.lineWidth = 2; c.stroke();
  c.save(); rrect(c, wx, wy, ww, 66, [26, 26, 0, 0]); c.fillStyle = "#1a1a1a"; c.fill(); c.restore();
  ["#ff5f57", "#febc2e", "#28c840"].forEach((col, i) => { c.beginPath(); c.arc(wx + 40 + i * 36, wy + 33, 11, 0, Math.PI * 2); c.fillStyle = col; c.fill(); });
  font(c, 500, 24, MONO); c.fillStyle = "#8a8a8a"; c.textAlign = "center";
  c.fillText("you@browserwall: ~", W / 2, wy + 41);
  c.textAlign = "left";

  const x = wx + 44;
  let y = wy + 130;
  font(c, 600, 30, MONO);
  c.fillStyle = a1; c.fillText("$", x, y);
  c.fillStyle = "#e5e5e5"; c.fillText(" browserfetch --me", x + c.measureText("$").width, y);

  const b = d.top?.browser;
  drawLogo(c, logoOf(b), b, x, y + 50, 260);
  // Like neofetch: the distro logo, under the browser's.
  if (d.osMark) drawMark(c, d.osMark, x + 70, y + 360, 120);

  // Key/value column
  const kx = x + 310, kMaxW = wx + ww - 44 - kx;
  y += 70;
  font(c, 800, 32, MONO);
  c.fillStyle = a1; c.fillText("you", kx, y);
  let w = c.measureText("you").width;
  c.fillStyle = "#e5e5e5"; c.fillText("@", kx + w, y); w += c.measureText("@").width;
  c.fillStyle = a2; c.fillText("browserwall", kx + w, y);
  y += 20;
  font(c, 500, 30, MONO); c.fillStyle = "#555"; c.fillText("─".repeat(18), kx, y + 22);
  y += 30;
  const rows: [string, string][] = [
    [t.termPersonality, `${d.archetype.name}`],
    ...(d.rising ? [[t.termRising, d.rising.name] as [string, string]] : []),
    [t.termBrowser, b ? `${b.name} (${d.top!.match}%)` : t.termNone],
    ...(d.ranked.length > 1 ? [[t.termRunnersUp, d.ranked.slice(1, 3).map((r) => `${r.browser.name} ${r.match}%`).join(", ")] as [string, string]] : []),
    [t.termEngine, b ? engineLine(b, lang, " (", ")") : t.termNa],
    ...(d.osMark ? [[t.termOs, d.osMark.label] as [string, string]] : []),
    [t.termExt, d.ext ?? t.anyExt.toLowerCase()],
    [t.termPriorities, d.priorities.filter((p) => p.value >= 3).map((p) => p.label).join(", ") || t.termVibes],
    [t.termMust, d.must.join(", ") || t.termEmpty],
    [t.termAvoid, d.avoid.join(", ") || t.termEmpty],
    [t.termSurvivors, `${d.fit}/${d.total} ${formatCount(d.total, t.browsersWord, lang).replace(/^\d+\s*/, "")}`],
  ];
  const fs = 26, lh = 40;
  for (const [k, v] of rows) {
    font(c, 800, fs, MONO);
    c.fillStyle = a1;
    const key = `${k}: `;
    const kw = c.measureText(key).width;
    c.fillText(key, kx, (y += lh));
    font(c, 500, fs, MONO);
    c.fillStyle = "#e5e5e5";
    const lines = clampLines(c, wrap(c, v, kMaxW - kw), 2, kMaxW - kw);
    lines.forEach((l, i) => { if (i) y += lh; c.fillText(l, kx + kw, y); });
    if (y > wy + wh - 300) break;
  }
  // Palette blocks
  y += 40;
  const pal = ["#1f1f1f", "#ef4444", "#22c55e", "#eab308", "#3b82f6", "#a855f7", "#06b6d4", "#e5e5e5"];
  pal.forEach((col, i) => { c.fillStyle = col; c.fillRect(kx + i * 50, y, 50, 36); });
  [a1, a2].forEach((col, i) => { c.fillStyle = col; c.fillRect(kx + (8 + i) * 50, y, 50, 36); });

  // Roast as a comment + prompt
  y = Math.max(y + 90, wy + wh - 200);
  font(c, 500, 26, MONO); c.fillStyle = "#6b6b6b";
  const comment = d.osMark && d.osMark.label !== d.os ? `# ${d.osMark.quip} ${d.archetype.roast}` : `# ${d.archetype.roast}`;
  for (const l of clampLines(c, wrap(c, comment, ww - 88), 3, ww - 88)) { c.fillText(l, x, y); y += 38; }
  y += 24;
  font(c, 600, 30, MONO);
  c.fillStyle = a1; c.fillText("$", x, y);
  c.fillStyle = "#e5e5e5"; c.fillText(` open ${u}`, x + c.measureText("$").width, y);
  const cw = c.measureText(`$ open ${u} `).width;
  c.fillStyle = a1; c.fillRect(x + cw, y - 26, 18, 32);
}

// 4. Trading card: holo border, the browser's real scores as stats.
function tradingBg({ c, d, H }: Env) {
  const [bg, a1, a2] = d.archetype.colors;
  c.fillStyle = bg; c.fillRect(0, 0, W, H);
  glow(c, W * 0.15, H * 0.15, 650, a1, 0.6);
  glow(c, W * 0.9, H * 0.9, 650, a2, 0.5);
  c.save(); c.strokeStyle = "rgb(255 255 255 / .04)"; c.lineWidth = 2;
  for (let i = -H; i < W; i += 40) { c.beginPath(); c.moveTo(i, 0); c.lineTo(i + H, H); c.stroke(); }
  c.restore();
}
function trading({ c, d, logoOf }: Env) {
  const lang = d.lang ?? "en";
  const t = QUIZ_I18N[lang].shareCard.canvas;
  const u = urlText(lang);
  const [, a1, a2] = d.archetype.colors;
  const cx = 150, cy = 90, cw = 780, ch = 1170;
  c.save();
  c.shadowColor = "rgb(0 0 0 / .6)"; c.shadowBlur = 80; c.shadowOffsetY = 30;
  const holo = c.createConicGradient(0.6, W / 2, cy + ch / 2);
  [a1, "#ffffff", a2, "#fde68a", a1, "#c4b5fd", a2, a1].forEach((col, i, arr) => holo.addColorStop(i / (arr.length - 1), col));
  rrect(c, cx, cy, cw, ch, 44); c.fillStyle = holo; c.fill();
  c.restore();
  const ix = cx + 20, iy = cy + 20, iw = cw - 40, ih = ch - 40;
  rrect(c, ix, iy, iw, ih, 30); c.fillStyle = "#111113"; c.fill();

  const px = ix + 34, pw = iw - 68;
  const b = d.top?.browser;
  c.fillStyle = "#fff"; c.textAlign = "left"; c.textBaseline = "alphabetic";
  const hp = d.top ? `${d.top.match} HP` : "0 HP";
  font(c, 800, 40, HEAD);
  const hpw = c.measureText(hp).width;
  const nm = fit(c, b?.name ?? "MissingNo.", pw - hpw - 30, 54, 30, 800, HEAD, 1);
  c.fillText(nm.lines[0], px, iy + 80);
  font(c, 800, 40, HEAD); c.textAlign = "right"; c.fillStyle = a1;
  c.fillText(hp, px + pw, iy + 80);
  c.textAlign = "left";

  // Art window
  const ay = iy + 110, ah = d.ranked.length > 1 ? 340 : 440, ls = d.ranked.length > 1 ? 240 : 300;
  c.save();
  rrect(c, px, ay, pw, ah, 22); c.clip();
  const art = c.createLinearGradient(px, ay, px + pw, ay + ah);
  art.addColorStop(0, a1); art.addColorStop(1, a2);
  c.fillStyle = art; c.fillRect(px, ay, pw, ah);
  glow(c, px + pw * 0.3, ay + ah * 0.2, 420, "#ffffff", 0.35);
  c.fillStyle = "rgb(0 0 0 / .12)";
  for (let i = 0; i < 12; i++) { c.beginPath(); c.arc(px + pw / 2, ay + ah / 2, 60 + i * 50, 0, Math.PI * 2); c.lineWidth = 14; c.strokeStyle = "rgb(255 255 255 / .06)"; c.stroke(); }
  c.restore();
  rrect(c, px, ay, pw, ah, 22); c.strokeStyle = "rgb(255 255 255 / .25)"; c.lineWidth = 3; c.stroke();
  if (b) drawLogo(c, logoOf(b), b, px + pw / 2 - ls / 2, ay + ah / 2 - ls / 2, ls);
  else { font(c, 400, 220, EMOJI); c.textAlign = "center"; c.fillText("💀", px + pw / 2, ay + ah / 2 + 80); c.textAlign = "left"; }
  if (d.osMark) {
    // OS badge in the corner of the art window
    const r = 44, bx0 = px + pw - r - 20, by0 = ay + r + 20;
    c.beginPath(); c.arc(bx0, by0, r, 0, Math.PI * 2); c.fillStyle = "#111113"; c.fill();
    c.strokeStyle = "rgb(255 255 255 / .35)"; c.lineWidth = 3; c.stroke();
    drawMark(c, d.osMark, bx0 - 26, by0 - 26, 52);
  }

  // Type line
  const ty = ay + ah + 26;
  rrect(c, px, ty, pw, 64, 14); c.fillStyle = "rgb(255 255 255 / .07)"; c.fill();
  font(c, 400, 30, EMOJI); c.fillStyle = "#fff"; c.fillText(d.archetype.emoji, px + 20, ty + 43);
  const eng = b ? fmt(t.engineType, { engine: engineName(b.engine, lang) }) : t.unknownEngineType;
  font(c, 500, 24); const ew = c.measureText(eng).width;
  const at = fit(c, d.archetype.name, pw - ew - 110, 30, 20, 700, HEAD, 1);
  c.fillText(at.lines[0], px + 70, ty + 42);
  font(c, 500, 24); c.textAlign = "right"; c.globalAlpha = 0.6; c.fillText(eng, px + pw - 20, ty + 41); c.globalAlpha = 1; c.textAlign = "left";

  // Stats from the editorial scores
  const [sPriv, sExp, sCust, sLight, sMin] = t.stats;
  const stats: [string, number][] = b
    ? [[sPriv, b.scores.privacy], [sExp, b.scores.experience], [sCust, b.scores.customisation], [sLight, b.scores.lightness], [sMin, b.scores.minimalism]]
    : [[sPriv, 0], [sExp, 0], [sCust, 0], [sLight, 0], [sMin, 0]];
  let sy = ty + 110;
  const bx = px + 300, seg = (pw - 300 - 60) / 5;
  for (const [label, v] of stats) {
    font(c, 650, 28); c.fillStyle = "#e5e5e5"; c.fillText(label, px, sy);
    for (let i = 0; i < 5; i++) {
      rrect(c, bx + i * seg, sy - 22, seg - 8, 24, 6);
      c.fillStyle = i < v ? (i >= 4 ? a2 : a1) : "#262626"; c.fill();
    }
    font(c, 800, 28, HEAD); c.textAlign = "right"; c.fillStyle = "#fff"; c.fillText(String(v), px + pw, sy); c.textAlign = "left";
    sy += 54;
  }

  // Flavor text
  const bench = d.ranked.slice(1, 3);
  if (bench.length) {
    c.fillStyle = "rgb(255 255 255 / .15)"; c.fillRect(px, sy - 22, pw, 2);
    font(c, 700, 19); spacing(c, 3); c.fillStyle = "rgb(255 255 255 / .5)";
    c.fillText(t.alsoInDeck, px, sy + 12);
    spacing(c, 0);
    const colW = pw / bench.length;
    bench.forEach((r, i) => {
      const bx1 = px + i * colW;
      drawLogo(c, logoOf(r.browser), r.browser, bx1, sy + 30, 48, false);
      font(c, 700, 26); c.fillStyle = "#fff";
      c.fillText(ellipsize(c, r.browser.name, colW - 150), bx1 + 62, sy + 64);
      const nw = Math.min(c.measureText(r.browser.name).width, colW - 150);
      font(c, 700, 22, HEAD); c.fillStyle = a1;
      c.fillText(`${r.match} HP`, bx1 + 62 + nw + 12, sy + 64);
    });
    sy += 114;
  }
  sy += 4;
  c.fillStyle = "rgb(255 255 255 / .15)"; c.fillRect(px, sy - 20, pw, 2);
  font(c, "italic 450", 26); c.fillStyle = "rgb(255 255 255 / .75)";
  for (const l of clampLines(c, wrap(c, d.archetype.roast, pw), 2, pw)) { sy += 36; c.fillText(l, px, sy); }

  // Footer
  const fy = iy + ih - 30;
  font(c, 600, 22); c.fillStyle = "rgb(255 255 255 / .5)"; c.fillText(u, px, fy);
  const stars = "★".repeat(d.rarity.stars) + "☆".repeat(5 - d.rarity.stars);
  c.textAlign = "right"; c.fillStyle = a2; font(c, 700, 22);
  c.fillText(`${stars}  ${d.rarity.label.toUpperCase()}`, px + pw, fy);
  c.textAlign = "left";
}

// 5. Shortlist: every browser the results page shows, ranked.
function listBg({ c, d, H }: Env) {
  const [bg, a1, a2] = d.archetype.colors;
  c.fillStyle = bg; c.fillRect(0, 0, W, H);
  glow(c, W * 0.1, H * 0.05, 760, a1, 0.55);
  glow(c, W * 0.95, H * 0.95, 700, a2, 0.35);
}
function list({ c, d, logoOf }: Env) {
  const lang = d.lang ?? "en";
  const t = QUIZ_I18N[lang].shareCard.canvas;
  const u = urlText(lang);
  const [, a1] = d.archetype.colors;
  const x = 80, w = W - 160;
  c.fillStyle = "#fff"; c.textAlign = "left"; c.textBaseline = "alphabetic";
  font(c, 650, 26); spacing(c, 6); c.globalAlpha = 0.8;
  c.fillText(t.shortlistTitle, x, 110);
  spacing(c, 0); c.globalAlpha = 1;
  font(c, 400, 60, EMOJI); c.fillText(d.archetype.emoji, x, 192);
  const headFit = fit(c, d.archetype.name, w - 90, 64, 36, 820, HEAD, 1);
  c.fillText(headFit.lines[0], x + 90, 190);
  let sx = x;
  if (d.osMark) { drawMark(c, d.osMark, x, 220, 32); sx += 46; }
  font(c, 500, 27); c.fillStyle = "#fff"; c.globalAlpha = 0.72;
  c.fillText(`${d.osMark ? `${d.osMark.label} · ` : ""}${fmt(t.shortlistSub, { fit: d.fit, total: d.total })}`, sx, 246);
  c.globalAlpha = 1;

  const rows = d.ranked;
  if (!rows.length) {
    font(c, 800, 72, HEAD); c.textAlign = "center";
    c.fillText(t.nothingSurvived, W / 2, 700);
    font(c, 500, 32); c.globalAlpha = 0.7;
    c.fillText(d.archetype.roast.split(".")[0] + ".", W / 2, 760);
    c.globalAlpha = 1; c.textAlign = "left";
  }
  const top = 290, avail = 1210 - top, rowH = Math.min(130, avail / Math.max(rows.length, 1));
  const gap = 12, h = rowH - gap, logo = Math.min(76, h - 30);
  rows.forEach((r, i) => {
    const y = top + i * rowH, b = r.browser;
    c.save();
    rrect(c, x, y, w, h, 20); c.clip();
    c.fillStyle = i < 3 ? "rgb(255 255 255 / .1)" : "rgb(255 255 255 / .05)"; c.fillRect(x, y, w, h);
    c.fillStyle = hexA(a1, i < 3 ? 0.9 : 0.55); c.fillRect(x, y + h - 5, (w * r.match) / 100, 5); // match bar
    c.restore();
    const cy = y + h / 2;
    font(c, 800, 34, HEAD); c.fillStyle = "#fff"; c.globalAlpha = i < 3 ? 1 : 0.55; c.textAlign = "center";
    c.fillText(String(i + 1), x + 46, cy + 12);
    c.globalAlpha = 1; c.textAlign = "left";
    drawLogo(c, logoOf(b), b, x + 88, cy - logo / 2, logo, false);
    const nx = x + 88 + logo + 24;
    font(c, 800, 34, HEAD); c.textAlign = "right"; c.fillText(`${r.match}%`, x + w - 28, cy + 12);
    const mw = c.measureText(`${r.match}%`).width; c.textAlign = "left";
    const maxN = x + w - 28 - mw - 24 - nx;
    font(c, 700, h > 90 ? 34 : 30); c.fillText(ellipsize(c, b.name, maxN), nx, cy - 2);
    font(c, 450, h > 90 ? 23 : 21); c.globalAlpha = 0.6;
    c.fillText(ellipsize(c, engineLine(b, lang, t.basedOnInline), maxN), nx, cy + 30);
    c.globalAlpha = 1;
  });

  font(c, 650, 30); c.fillStyle = "#fff";
  c.fillText(u, x, 1280);
  c.textAlign = "right"; c.globalAlpha = 0.75;
  c.fillText(t.findYoursArrow, x + w, 1280);
  c.globalAlpha = 1; c.textAlign = "left";
}

const RENDER: Record<Design, { bg: (e: Env) => void; fg: (e: Env) => void }> = {
  wrapped: { bg: wrappedBg, fg: wrapped },
  receipt: { bg: receiptBg, fg: receipt },
  terminal: { bg: terminalBg, fg: terminal },
  trading: { bg: tradingBg, fg: trading },
  list: { bg: listBg, fg: list },
};

let fontsReady: Promise<unknown> | null = null;
const loadFonts = () => (fontsReady ??= Promise.all([
  document.fonts.load(`800 100px ${HEAD}`), document.fonts.load(`700 40px ${HEAD}`),
  document.fonts.load(`500 40px ${BODY}`), document.fonts.load(`italic 450 40px ${BODY}`), document.fonts.load(`650 40px ${BODY}`),
]).catch(() => null));

/** Draws the card onto `canvas` (resizing it to the format). */
export async function renderCard(canvas: HTMLCanvasElement, d: CardData, design: Design, format: Format) {
  const [, imgs] = await Promise.all([loadFonts(), Promise.all(d.ranked.map((r) => loadLogo(r.browser.logo)))]);
  const logos = new Map(d.ranked.map((r, i) => [r.browser.id, imgs[i]]));
  const { w, h } = sizeOf(format);
  canvas.width = w; canvas.height = h;
  const c = canvas.getContext("2d")!;
  c.reset?.();
  const env: Env = { c, d, logoOf: (b) => (b ? logos.get(b.id) ?? null : null), H: h };
  RENDER[design].bg(env);
  c.save();
  c.translate(0, (h - BLOCK) / 2);
  RENDER[design].fg(env);
  c.restore();
}

export const toBlob = (canvas: HTMLCanvasElement) =>
  new Promise<Blob>((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error("Canvas export failed"))), "image/png"));
