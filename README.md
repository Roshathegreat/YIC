# YIC — Plastic Governance Ledger + Ise's World

Dual-audience plastic governance platform built for the 2026 environmental competition (deadline 2026-05-31). One backend, two front-end faces:

- **The Ledger** (`/`) — clean, sourced, citable database for researchers and journalists.
- **Ise's World** (`/lobster`) — pixel-art-leaning youth surface narrated by Ise, a Japanese spiny lobster from Beppu Bay. Content here is AI-translated from the same backend via the Anthropic API.

MVP scope: Japan, United States, Taiwan.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind v4
- Zod for data validation
- `react-simple-maps` + `world-atlas` for the global map
- Anthropic SDK (wired in week 2)
- Deploy: Vercel free tier

## Local development

```bash
npm install --legacy-peer-deps
npm run validate:data   # Zod-validate all country JSON
npm run dev             # http://localhost:3000
```

`--legacy-peer-deps` is required because `react-simple-maps@3` declares an older React peer.

## Routes

| Path | Surface | Notes |
|---|---|---|
| `/` | Ledger | Landing with global map + country tiles |
| `/countries/[id]` | Ledger | Country detail with sources |
| `/treaty` | Ledger | 3-country treaty position compare |
| `/lobster` | Lobster | World map with marine animal markers |
| `/lobster/countries/[id]` | Lobster | Per-country lobster narration (week 2) |
| `/lobster/court` | Lobster | UN court (week 3) |
| `/lobster/news` | Lobster | Daily AI news brief (week 2) |
| `/lobster/beppu` | Lobster | Beppu deep node |
| `/api/translate` | API | Translation endpoint (501 until week 2) |
| `/api/cron/daily` | API | Daily cron handler (no-op until week 2) |

## Data

Country records live in `data/countries/{japan,usa,taiwan}.json` and are validated against `lib/schema.ts` on every build (`prebuild` hook).

Every record carries `sources[]` and `lastUpdated`. Items the AI could not verify carry `verified: false` and a `note` explaining what to check — fact-check these before publishing.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import to Vercel — framework auto-detected as Next.js.
3. **Set install command to `npm install --legacy-peer-deps`** in Vercel project settings (because of the react-simple-maps peer-dep).
4. No environment variables required for week 1. Add `ANTHROPIC_API_KEY` in week 2 to enable the translation layer.

## Roadmap

- Week 1 ✅ Scaffold, schema, ledger surface, world map on both surfaces.
- Week 2 — Translation layer (Anthropic API), lobster voice content, Beppu deep node.
- Week 3 — Pixel art assets, UN court view, daily news cron.
- Week 4 — Source audit, search on ledger, accessibility, submission.

## Status of seed data

The country JSON files contain real starter facts with real source URLs, but most entries carry `verified: false` and a `note` flagging what the human collaborator must verify before publishing. Treat the current data as a working draft, not a published artifact.
