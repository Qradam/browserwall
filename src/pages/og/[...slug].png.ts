// /og/<page path>.png – a 1200×630 share image for every browser, comparison, news post, guide, list and alternatives page.
import type { APIRoute, GetStaticPaths } from "astro";
import { OG_CARDS, type Card } from "../../lib/og";
import { renderCard } from "../../lib/og-render";

export const getStaticPaths = (() =>
  [...OG_CARDS].map(([path, card]) => ({ params: { slug: path.slice(1) }, props: { card } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) =>
  new Response(new Uint8Array(await renderCard((props as { card: Card }).card)), { headers: { "Content-Type": "image/png" } });
