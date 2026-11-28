# T^minus landing page

Waitlist page for **T^minus**: limited drops from independent brands, on one live clock. On the App Store January 1, 2027.

Next.js 16, React 19, Tailwind 4 and a hand-written WebGL2 scene. No video, no image assets beyond the social card and icons, no runtime dependencies beyond Next and React.

## Run it

Requires Node.js 20 or later.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Node server build, includes the /api/waitlist endpoint
npm run build:pages  # static export for GitHub Pages, written to ./out
```

## What is where

| Path | What it is |
| --- | --- |
| `src/lib/launch.ts` | The facts the page states: launch date, waitlist perk, text-message programme details, App Store URL. Change them here. |
| `src/components/landing/landing-page.tsx` | The page, as one camera move: horizon (hero), rise to the top-down dial, the hole opens and the features are read through it, pull back out to the closing. Layers bottom to top: black, the features, the scene canvas, hero and closing, clocks, header. |
| `src/components/landing/features.tsx` | The six parts of the app with their copy. Wide screens: a ring frames the pinned demo, copy beside it. Small screens: copy and demo scroll behind the rim. |
| `src/components/landing/waitlist-form.tsx` | The form, consent line and confirmation. |
| `src/components/landing/countdown.tsx` | One ticking clock and its three readouts. Flips to T-plus at zero. |
| `src/components/scene/blackhole-scene.tsx` | The canvas: sets up WebGL, runs the frame loop, reports geometry to the page. |
| `src/lib/scene/shaders.ts` | Two passes. The first traces light through a black hole's field at one sample per glyph cell. The second draws the brand glyphs from an atlas. |
| `src/lib/scene/director.ts` | Turns intro time and scroll position into camera and scene values. The page reads the same values to place the countdown inside the event horizon. |
| `src/components/demos/` | The six feature demos, built from the iOS prototype's own layouts and rules, plus `garment-glyph.tsx`, which draws garments in the brand's glyphs. |
| `src/lib/scene/energy.ts` | One shared value the demos write and the scene reads, so the disk quickens with what is on screen. |
| `src/components/glyph/glyph-mask.tsx` | Text drawn as a font-shaped mask filled with glyphs, as the app draws its clock. |
| `src/app/privacy`, `src/app/terms` | Public legal pages for the text-message programme. |
| `src/app/api/waitlist/route.ts` | Local JSON waitlist endpoint for Node server runs. The export (`GET`) stays shut unless `WAITLIST_EXPORT_TOKEN` is set. |
| `src/app/v1` | The previous page, kept for comparison until the rebuild is approved. |
| `cook/` | Working notes for the rebuild: brief, shot list, round ledger and the still-rendering harness. |

## Useful URL controls

| URL | State |
| --- | --- |
| `/` | Full page. The intro runs about five seconds on a first visit and about one second after that. Any scroll, tap or key ends it early. |
| `/?skipIntro=1` | Settled hero, no intro. |
| `/?introAt=3.4` | Intro pinned at a time in seconds (0 to 5). |
| `/?still=1` | Freezes the scene clock and glyph changes, for repeatable screenshots. |

## Before launch

- Signups post to `/api/waitlist`, which writes to a local file. A static export has no endpoint, so the form cannot save there. Move to a host with a real datastore before sending traffic.
- `src/lib/launch.ts` holds a placeholder support address and message frequency. Set them, and have the legal pages reviewed, before registering the text-message programme with carriers.
- Set `APP_STORE_URL` once the listing exists: at zero the form becomes a download button.
