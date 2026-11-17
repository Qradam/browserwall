# browserwall

A curated wall of desktop web browsers (quiz coming next). Static Astro site, deployed on Cloudflare Pages.

## Develop

```sh
npm install
npm run dev        # localhost:4321
npm run build      # -> dist/
npm run verify     # build first; headless smoke test (Playwright)
```

## Data pipeline

```
data/raw/*.json  ──merge.mjs──▶  src/data/browsers.json  ──fetch-logos.mjs──▶  public/logos/ + src/data/logos.json
   ▲ research          ▲ data/overrides.json (fixes)          ▲ data/logo-overrides.json
                       ▲ data/curation.json (inclusion standard + allowlist)
```

- `node scripts/merge.mjs` – merge, dedupe, validate, apply overrides and curation. Dropped ids go to `data/dropped.txt`.
- `node scripts/fetch-logos.mjs [id ...]` – download official logos (Wikipedia infobox → project/site icons → GitHub avatar → favicon).
- `node scripts/check-repos.mjs` / `node scripts/stars.mjs` – last commit dates and star counts for GitHub repos.

To add a browser: add it to a `data/raw/*.json` file (schema in `data/SCHEMA.md`), add its id to `data/curation.json`, then run the merge and logo fetch.

## Deploy (Cloudflare Pages)

Connect the GitHub repo in Cloudflare Pages. Framework preset: **Astro**, build command `npm run build`, output directory `dist`, env `NODE_VERSION=22`.

Logos are trademarks of their respective owners.
