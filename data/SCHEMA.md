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
old-hardware, performance, gaming, ai, crypto, developer, sync, mainstream,
chrome-extensions, firefox-addons, independent-engine, text-mode, retro,
portable, regional, enterprise, experimental, meme, rip, vpn

- `rip` = discontinued. `meme` = joke project (shown on the wall, never recommended by the quiz).
- `chrome-extensions` / `firefox-addons` = can install from the Chrome Web Store / AMO.
- Use 2–6 tags per browser.


## Scores (`data/scores.json`)

Each browser gets four 1-5 integers `[privacy, experience, customisation, lightness]`. Scores are editorial and
live outside the raw files; `merge.mjs` validates them and adds `scores` to `browsers.json`.
`{"like": "brave", "adjust": [0,0,0,-1]}` copies another entry; `{"s": [...], "low": true}` flags a guess.

- **privacy** – judged on business model and defaults, not on marketing. 5 = anti-fingerprinting, no telemetry, not ad-funded
  (Tor, Mullvad, LibreWolf). 4 = strong defaults, nonprofit/paid/open (Firefox, Brave, Safari). 3 = neutral or unverifiable.
  2 = ad/data-company owner, sponsored content or "free VPN" upsell (Chrome, Edge, Opera). 1 = history of selling/leaking data,
  or abandoned and unpatched (Avast/AVG, Yandex, Internet Explorer).
- **experience** – polish, defaults, stability, site compatibility out of the box. 5 = nothing to set up and everything works.
  1 = text-mode, early alpha or abandoned.
- **customisation** – UI/extension depth. 5 = deep UI and extension control (Firefox, Vivaldi, Floorp). 1 = almost nothing to change.
- **lightness** – RAM/CPU footprint and fit for old hardware. Not a speed ranking: mainstream browsers are within noise of each
  other in benchmarks, so only footprint differences are scored. 5 = text-mode/tiny. 3 = typical. 1 = known heavy.
