# T^minus Landing Page

Standalone Next.js 16 + procedural 3D WebGL2/GLSL ASCII Black Hole landing page for **T^minus** (`App Store v1.0 - Jan 1, 2027`).

**Live Preview (GitHub Pages):** https://nirvik607-star.github.io/t-minus-landing/

Zero MP4 video assets, zero database setup, zero `.env` variables, and zero native C++ addons—runs natively on macOS, Windows, and Linux, and exports cleanly as a static site for GitHub Pages.

## Quickstart (macOS / Linux / Windows)

Requires **Node.js 20+**.

```bash
git clone https://github.com/nirvik607-star/t-minus-landing.git
cd t-minus-landing
npm install
npm run dev
```

Open **http://localhost:3000** (or **http://localhost:3000/landing** — both routes render the exact same experience).

### Production & Static GitHub Pages Build

```bash
# Node server build (includes local /api/waitlist JSON endpoint)
npm run build
npm run start

# Static GitHub Pages export (outputs to ./out with .nojekyll)
npm run build:pages
```

## Useful Preview Query Params

| URL | State |
| --- | --- |
| `/` | Full 7.25s 3D intro (3.60s cosmic opening -> 1.35s pure-white/ice-blue supernova & pure-ASCII `T^minus` -> unbroken 3D sweep to bottom horizon) |
| `/?skipIntro=1` | Instant settled hero with live bottom black hole horizon |
| `/?introAt=1.8` | Pinned during Stage A cosmic opening (tilted 3/4 black hole + helical `#97DFFC` polar jets) |
| `/?introAt=4.22` | Pinned at Stage B supernova peak (pure-white + ice-blue burst & pure-ASCII `T^minus`) |
| `/?introAt=5.7` | Pinned mid-flight during Stage C 3D sweep |

## Project Map

- `src/components/landing/ascii-blackhole-canvas.tsx` — Pure procedural 3D WebGL2/GLSL ES 3.00 relativistic black hole (` ^-t+=T*` strict glyph ramp, Galaxy palette, seamless inward-spiral top-down polar streamlines, 3D helical polar jets, cell-quantized pure-ASCII `T^minus`, adaptive bloom/EMA governor, zero MP4 video).
- `src/components/landing/landing-experience.tsx` — Native CSS sticky scroll runway, frame-locked countdown sync, hero lift-off fade, enlarged responsive wordmark, and Layer 20 curved `#040206` pre-rim occlusion veil.
- `src/components/landing/horizon-countdown.tsx` — Tabular launch countdown synced inside the `#000000` event horizon core.
- `src/components/landing/waitlist-bar.tsx` — Audience toggle (`I'm shopping` / `I run a brand`), E.164 phone formatter, SMS consent, `.ics` launch reminder, and share sheet.
- `src/components/landing/ascii-corner-button.tsx` — Retina pixel-snapped diagonal-X corner ASCII CTA button (disabled on pure-white primary pills).
- `src/components/landing/ascii-reveal.tsx` — Organic settle text materialization (`^ - t + = T *`).
- `src/components/landing/t-minus-wordmark.tsx` — Locked `26:15` SwiftUI `T^minus` wordmark + crisp `500`-weight WebGL mask rasterizer.
- `src/app/api/waitlist/route.ts` — Local JSON waitlist endpoint (`.data/waitlist.json`, gitignored) for Node server runs (`NEXT_PUBLIC_WAITLIST_ENDPOINT` can be set for static deployments).
