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
portable, regional, enterprise, experimental, meme, rip

- `rip` = discontinued. `meme` = joke project (shown on the wall, never recommended by the quiz).
- `chrome-extensions` / `firefox-addons` = can install from the Chrome Web Store / AMO.
- Use 2–6 tags per browser.
