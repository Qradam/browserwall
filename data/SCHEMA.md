# Browser entry schema

Each `data/raw/*.json` file is a JSON array of entries:

```json
{
  "id": "floorp",                       // lowercase kebab-case, unique
  "name": "Floorp",
  "engine": "gecko",                    // blink | gecko | webkit | goanna | servo | ladybird | trident | presto | text | other
  "basedOn": "Firefox ESR",             // upstream project, or null if original
  "os": ["windows", "macos", "linux"],  // desktop only: windows | macos | linux | bsd | other
  "status": "active",                   // active | maintenance | discontinued
  "openSource": true,
  "description": "One factual sentence, max ~140 chars.",
  "tags": ["vertical-tabs", "customizable", "workspaces"],
  "website": "https://floorp.app",      // or null
  "repo": "https://github.com/Floorp-Projects/Floorp", // or null
  "logo": "https://direct-url-to-official-logo.svg-or-png", // or null
  "sources": ["https://..."]            // where facts were verified
}
```

## Allowed tags (use only these)

privacy, de-googled, ad-blocking, security-hardened, tor, vertical-tabs, workspaces,
split-view, keyboard-driven, power-user, customizable, minimal, lightweight,
old-hardware, gaming, ai, crypto, developer, sync, mainstream,
chrome-extensions, firefox-addons, independent-engine, text-mode, retro,
portable, regional, enterprise, experimental, meme, rip, vpn

- `rip` = discontinued. `meme` = joke project (shown on the wall, never recommended by the quiz).
- `chrome-extensions` / `firefox-addons` = can install from the Chrome Web Store / AMO.
- Use 2–6 tags per browser.


## Scores (`data/scores.json`)

Each browser gets five 1-5 integers `[privacy, experience, customisation, lightness, minimalism]`. Scores are editorial and
live outside the raw files; `merge.mjs` validates them and adds `scores` to `browsers.json`.
`{"like": "brave", "adjust": [0,0,0,-1]}` copies another entry; `{"s": [...], "low": true}` flags a guess.

- **privacy** – judged on business model and defaults, not on marketing. 5 = anti-fingerprinting, no telemetry, not ad-funded
  (Tor, Mullvad, LibreWolf, Brave Origin). 4 = strong defaults, nonprofit/paid/open (Firefox, Brave, Safari). 3 = neutral or
  unverifiable, including new unaudited one-person projects.
  2 = ad/data-company owner, sponsored content or "free VPN" upsell (Chrome, Edge, Opera). 1 = history of selling/leaking data,
  or abandoned and unpatched (Avast/AVG, Yandex, Internet Explorer).
  Strong defaults can outweigh the business model (Brave 4 vs Opera 2). Score the product, not the parent company.
  Lagging months behind upstream security fixes costs a point (Supermium, qutebrowser/Falkon on Qt WebEngine).
  AI browsers that send pages to cloud LLMs by default or keep browsing "memories" are 2.
- **experience** – polish, defaults, stability, site compatibility out of the box. 5 = nothing to set up and everything works.
  1 = text-mode, early alpha or abandoned. Early-access projects under ~6 months old, pre-1.0 and driven mainly by one or
  two developers are capped at 2 and flagged as estimates (Crest, Ardia, Wren).
- **customisation** – UI/extension depth. 5 = deep UI and extension control (Firefox, Vivaldi, Floorp). 1 = almost nothing to change.
- **lightness** – RAM/CPU footprint and fit for old hardware. Not a speed ranking: mainstream browsers are within noise of each
  other in benchmarks, so only footprint differences are scored. 5 = text-mode/tiny. 3 = typical. 1 = known heavy.
- **minimalism** - how clean vs bloated the browser is out of the box. 5 = few built-ins, quiet UI (Min, Mullvad, qutebrowser). 3 = typical, some extras that can be switched off (Firefox). 2 = an AI
  sidebar or similar built into the default UI (Chrome with Gemini, Dia). 1 = bundled extras such as wallet, VPN, mail, shopping, news or AI sidebars (Opera, Edge, Vivaldi, Brave, Avast). Independent of lightness: a browser can be light on RAM yet cluttered, or heavy yet minimal.

Consistency (checked by `merge.mjs`): a `privacy` tag needs privacy ≥ 3; `minimal` needs minimalism ≥ 4; `lightweight` and
`old-hardware` need lightness ≥ 4; `customizable` needs customisation ≥ 4. Browsers with `ai`, `vpn` or `crypto` built in can't
have minimalism ≥ 4.

Scores were re-checked against online opinion and evidence in November 2026: raw findings with sources are in
`data/research/*.json`, and the summary shown on the site is in `data/score-notes.json`.

## Built-in AI (`data/ai.json`)

Per browser: `level` 0-3 (0 none, 1 basic chat/summaries, 2 integrated assistant using page/tab context, 3 agentic: acts in
the browser for you), `agent`, `agentPaid`, `models`, `onByDefault`, `canDisable` (`fully` | `partly` | `no`), `local`,
`quality` 1-5 (how capable and well-regarded, from reviews) and `sources`. Channels in `data/channels.json` inherit from their
parent. `merge.mjs` sets the `ai` tag for level ≥ 2. AI only counts against minimalism when it's on by default and can't be
fully switched off. Raw research: `data/research/ai-*.json`.
