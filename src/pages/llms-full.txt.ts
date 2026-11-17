// /llms-full.txt – every browser with scores, facts, AI details and score rationale, in plain text.
import type { APIRoute } from "astro";
import { browsers, ENGINES, TAGS } from "../data/browsers";
import { abs, osNames, UPDATED } from "../lib/seo";

export const GET: APIRoute = ({ site }) => {
  const entries = browsers.map((b) => {
    const s = b.scores;
    const lines = [
      `## ${b.name}`,
      `URL: ${abs(site, `/browsers/${b.id}`)}`,
      b.description,
      `Engine: ${ENGINES[b.engine]}${b.basedOn ? ` (based on ${b.basedOn})` : ""} · OS: ${osNames(b).join(", ")} · Status: ${b.status} · ${b.openSource ? "Open source" : "Closed source"}`,
      `Scores (1-5): privacy ${s.privacy}, experience ${s.experience}, customisation ${s.customisation}, lightness ${s.lightness}, minimalism ${s.minimalism}${s.lowConfidence ? " (estimate)" : ""}`,
      `Features: ${b.tags.map((t) => TAGS[t]?.label ?? t).join(", ")}`,
      b.ai ? `Built-in AI: level ${b.ai.level}/3${b.ai.agent ? ", agent" + (b.ai.agentPaid ? " (paid)" : "") : ""}; models: ${b.ai.models}; quality ${b.ai.quality ?? "?"}/5; can be disabled: ${b.ai.canDisable}` : "Built-in AI: none",
      `Price: ${b.price ? b.price.note : "free"}`,
      b.scoreWhy ? `Why these scores: ${b.scoreWhy}` : "",
      b.note ? `Note: ${b.note}` : "",
      b.website ? `Website: ${b.website}` : "",
    ];
    return lines.filter(Boolean).join("\n");
  });
  const body = `# browserwall – full browser data (${UPDATED})

Editorial scores: privacy is judged on business model and defaults; experience = polish and site compatibility out of the box; customisation = UI and extension depth; lightness = RAM/CPU footprint (not speed); minimalism = few bundled extras. For a personal recommendation, use the quiz: ${abs(site, "/quiz")}

${entries.join("\n\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
