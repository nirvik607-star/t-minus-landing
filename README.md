# T^minus Landing Page

Standalone Next.js 16 + WebGL2 ASCII Black Hole landing page for **T^minus** (`App Store v1.0 - Jan 1, 2027`).

Zero database setup, zero `.env` variables, and zero native C++ addons—designed to clone and run cleanly out of the box on macOS (Apple Silicon or Intel).

## Quickstart (macOS / Linux / Windows)

Requires **Node.js 20+**.

```bash
git clone https://github.com/nirvik607-star/t-minus-landing.git
cd t-minus-landing
npm install
npm run dev
```

Open **http://localhost:3000** (or **http://localhost:3000/landing** — both routes render the exact same experience).

### Production build

```bash
npm run build
npm run start
```

## Useful Preview Query Params

| URL | State |
| --- | --- |
| `http://localhost:3000/` | Full 12s intro -> supernova `T^minus` ASCII carve -> bottom horizon settle -> scroll choreography |
| `http://localhost:3000/?skipIntro=1` | Instant settled hero with live bottom black hole horizon |
| `http://localhost:3000/?introAt=6.6` | Pinned at supernova peak (`500`-weight dark ASCII `T^minus` carve) |
| `http://localhost:3000/?introAt=9.8` | Pinned mid-descent during intro-to-horizon settle |

## Project Map

- `src/components/landing/ascii-blackhole-canvas.tsx` — Persistent WebGL2 5-pass ASCII shader (`^ - t + = T *`), single continuous black hole camera (intro -> bottom horizon -> mid-scroll spherical plateau -> top-pinned dome with pre-rim occlusion), plus Layer 0 starfield and multi-glyph cursor aura.
- `src/components/landing/landing-experience.tsx` — Main layout, scroll-synced countdown positioning, editorial sections, and legal modals.
- `src/components/landing/horizon-countdown.tsx` — Tabular launch countdown (`37 D 09 H 34 M 25 S`) synced inside the `#000000` event horizon core.
- `src/components/landing/waitlist-bar.tsx` — Audience toggle (`I'm shopping` / `I run a brand`), phone formatter, SMS consent, `.ics` launch reminder, and share sheet.
- `src/components/landing/ascii-corner-button.tsx` — Retina pixel-snapped diagonal-X corner ASCII CTA button.
- `src/components/landing/ascii-reveal.tsx` — Organic settle text materialization (`^ - t + = T *`).
- `src/components/landing/t-minus-wordmark.tsx` — Locked `26:15` SwiftUI `T^minus` wordmark SVG + WebGL mask rasterizer.
- `src/app/api/sandbox/video/route.ts` — Cross-platform HTTP Range video streamer for `master_blackhole_boomerang.mp4` (Safari/WebKit compatible).
- `src/app/api/waitlist/route.ts` — Local JSON waitlist endpoint (`.data/waitlist.json`, gitignored) with E.164 phone validation and CSV/JSON export.