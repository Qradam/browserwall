// Renders a share card (see og.ts) to PNG with satori (layout -> SVG) and resvg (SVG -> PNG). Build time only.
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { Browser } from "../data/browsers";
import { OG_AXES, type Card } from "./og";

const W = 1200, H = 630;
const font = (w: number) => readFileSync(join(process.cwd(), `node_modules/@fontsource/inter/files/inter-latin-${w}-normal.woff`));
const FONTS = [400, 600, 700].map((weight) => ({ name: "Inter", data: font(weight), weight: weight as 400 | 600 | 700, style: "normal" as const }));
const C = { bg: "#000000", text: "#fafafa", muted: "#a1a1a1", faint: "#6b6b6b", tile: "#141414", line: "#262626", off: "#262626" };

// Tiny hyperscript for satori's element objects. Every element with several children needs display:flex.
type El = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: (El | string | null | false)[]): El =>
  ({ type, props: { style: { display: "flex", ...style }, children: children.filter((c) => c !== null && c !== false) } });

const MIME: Record<string, string> = { ".png": "image/png", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".jpeg": "image/jpeg" };
const logoCache = new Map<string, string | null>();
function logoData(b: Browser): string | null {
  if (!b.logo) return null;
  if (logoCache.has(b.logo)) return logoCache.get(b.logo)!;
  const ext = b.logo.slice(b.logo.lastIndexOf(".")).toLowerCase();
  const file = join(process.cwd(), "public", b.logo);
  const uri = MIME[ext] && existsSync(file) ? `data:${MIME[ext]};base64,${readFileSync(file).toString("base64")}` : null; // .ico/.webp: monogram
  logoCache.set(b.logo, uri);
  return uri;
}

const tile = (b: Browser, size: number): El => {
  const src = logoData(b);
  return h("div", { width: size, height: size, borderRadius: size * 0.22, background: `linear-gradient(180deg, #1c1c1c, ${C.tile})`, border: `1.5px solid ${C.line}`, alignItems: "center", justifyContent: "center", flexShrink: 0 },
    src ? { type: "img", props: { src, width: size * 0.58, height: size * 0.58, style: { objectFit: "contain" } } }
      : h("div", { fontSize: size * 0.3, fontWeight: 700, color: C.muted }, b.name.slice(0, 2).toUpperCase()));
};

const mark = (): El => ({ type: "img", props: { width: 46, height: 46, src: `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="15" fill="#232325"/><rect x=".75" y=".75" width="62.5" height="62.5" rx="14.25" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="1.5"/><g fill="#fff" fill-opacity=".3"><rect x="9" y="11" width="22" height="12" rx="3.5"/><rect x="33" y="11" width="22" height="12" rx="3.5"/><rect x="9" y="26" width="8" height="12" rx="3.5"/><rect x="47" y="26" width="8" height="12" rx="3.5"/><rect x="9" y="41" width="22" height="12" rx="3.5"/><rect x="33" y="41" width="22" height="12" rx="3.5"/></g><rect x="20" y="26" width="24" height="12" rx="3.5" fill="#fff"/></svg>`).toString("base64")}` } });

const titleSize = (t: string) => (t.length <= 16 ? 84 : t.length <= 30 ? 68 : t.length <= 48 ? 56 : t.length <= 70 ? 48 : 42);

const bar = (v: number, seg = 30): El => h("div", { gap: 5 }, ...[1, 2, 3, 4, 5].map((i) => h("div", { width: seg, height: 10, borderRadius: 3, background: i <= v ? C.text : C.off })));

function right(card: Card): El {
  if (card.kind === "browser") {
    return h("div", { flexDirection: "column", alignItems: "center", gap: 30, width: 380 },
      tile(card.b, 190),
      h("div", { flexDirection: "column", gap: 13, width: 380 },
        ...OG_AXES.map((ax) => h("div", { alignItems: "center", justifyContent: "space-between" },
          h("div", { fontSize: 19, color: C.muted, width: 150 }, ax.key === "experience" ? "Experience" : ax.label),
          bar(card.b.scores[ax.key]),
          h("div", { fontSize: 19, fontWeight: 600, color: C.text, width: 40, justifyContent: "flex-end" }, `${card.b.scores[ax.key]}/5`)))));
  }
  if (card.kind === "compare") {
    const { a, b } = card;
    return h("div", { flexDirection: "column", alignItems: "center", gap: 28, width: 400 },
      h("div", { alignItems: "center", gap: 22 }, tile(a, 150), h("div", { fontSize: 30, fontWeight: 700, color: C.faint }, "vs"), tile(b, 150)),
      h("div", { flexDirection: "column", gap: 12, width: 400 },
        ...OG_AXES.map((ax) => {
          const x = a.scores[ax.key], y = b.scores[ax.key];
          const cell = (v: number, win: boolean) => h("div", { width: 56, justifyContent: "center", fontSize: 22, fontWeight: 700, color: win ? C.text : C.faint }, `${v}/5`);
          return h("div", { alignItems: "center", justifyContent: "space-between", paddingBottom: 8, borderBottom: `1px solid ${C.line}` },
            cell(x, x >= y), h("div", { fontSize: 19, color: C.muted }, ax.key === "experience" ? "Experience" : ax.label), cell(y, y >= x));
        })));
  }
  const logos = card.logos.slice(0, 6);
  const size = logos.length <= 1 ? 230 : logos.length <= 4 ? 150 : 118;
  return h("div", { flexWrap: "wrap", gap: 18, width: logos.length <= 1 ? 230 : logos.length <= 4 ? 318 : 390, justifyContent: "center", alignContent: "center" }, ...logos.map((b) => tile(b, size)));
}

const INNER_W = W - 32 - 112 - 3, INNER_H = H - 32 - 104 - 3; // satori is content-box: frame minus padding and border
const rightWidth = (card: Card) => card.kind === "browser" ? 380 : card.kind === "compare" ? 400 : card.logos.length <= 1 ? 230 : card.logos.length <= 4 ? 318 : 390;

export async function renderCard(card: Card): Promise<Buffer> {
  // A fixed width: with flex:1, long text widens the whole frame past the canvas.
  const left = h("div", { flexDirection: "column", width: INNER_W - rightWidth(card) - 40, paddingRight: 40, flexShrink: 0, justifyContent: "space-between", height: INNER_H },
    h("div", { alignItems: "center", gap: 14 }, mark(), h("div", { fontSize: 32, color: C.text, letterSpacing: -1.2 }, "browserwall")),
    h("div", { flexDirection: "column", gap: 18 },
      h("div", { fontSize: 20, fontWeight: 600, letterSpacing: 2.4, color: C.muted, textTransform: "uppercase" }, card.kicker),
      h("div", { fontSize: titleSize(card.title), fontWeight: 700, color: C.text, letterSpacing: -2, lineHeight: 1.05 }, card.title),
      h("div", { fontSize: 25, color: C.muted, lineHeight: 1.4, maxHeight: 105, overflow: "hidden" }, card.subtitle.length > 150 ? card.subtitle.slice(0, card.subtitle.lastIndexOf(" ", 147)) + "…" : card.subtitle)),
    h("div", { fontSize: 22, fontWeight: 600, color: C.faint }, "browserwall.org"));
  const root = h("div", { width: W, height: H, background: C.bg, fontFamily: "Inter", position: "relative" },
    h("div", { position: "absolute", top: 16, left: 16, width: INNER_W, height: INNER_H, borderRadius: 30, border: `1.5px solid #262626`, background: "linear-gradient(160deg, #141414 0%, #050505 70%)", padding: "52px 56px", alignItems: "center" },
      left, right(card)));
  const svg = await satori(root as never, { width: W, height: H, fonts: FONTS });
  return new Resvg(svg, { fitTo: { mode: "width", value: W } }).render().asPng();
}
