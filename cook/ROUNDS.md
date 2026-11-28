# Cook ledger: T^minus waitlist landing page

Started: 2026-11-28 04:04 UTC
Time: no floor | no cap (work in rounds until the bar is met or the user stops it)
Bar: design 9 | usability 9 | creativity 9 | content 9 (each out of 10, fresh reviewers on stills) and wins every blind pair against the baseline
Calibration offset: none yet
Usage: not readable
Gate: stills approved no | final render not applicable (the deliverable is the site)
Best so far: baseline only, `cook/stills/r00/`, commit eb6b31a

## Decisions

Made without asking, one line each.
- 04:04 Rebuild the scene renderer as a new module beside the old one, because iterating on 2,900 lines of generated shader code would be slower than owning a clean one.
- 04:04 Drop the docked top dome after the runway; the dial scrolls away with the page and the horizon returns at the closing, because content sliding under the dome left fragments showing either side of it.
- 04:04 Keep Newsreader for the brand serif (it is already the wordmark's T) and Inter for the functional sans (it is the wordmark's sans); drop Inter Tight.
- 04:04 Keep the scene inside the purple, periwinkle and white range; no ice blue in the scene, because the design system reserves it for one word or live value.

## User feedback inbox

Exact words. Close an item only when a still proves it.
- 03:58 "some of the those prototype screens look a little wrong" | round 0 | open: archived screenshots dropped as references; demos to be checked against fresh captures when the user sends them.

---

## Round 01

Time: 04:04 to 05:20 UTC | total elapsed 1.3h
Usage: not readable
Focus: the signature image (black hole, hero, dial, closing), because the page cannot be judged without it.

Changes:
- New renderer in `src/lib/scene/` and `src/components/scene/`: Schwarzschild ray tracing at cell resolution, glyph pass from an atlas of the brand set, intro timeline (star, collapse, flood, hole, sweep), scroll camera from horizon to top-down dial, closing horizon.
- New page: tokens from the locked design system, hero lockup with glyph-masked MINUS, new subhead, T-minus clock readouts inside the void, premise beside the dial, audiences, closing with form, footer inside the void.
- New form: compliant consent line, 44px targets, brand name required, plain confirmation.

Stills: `cook/stills/r01/` and `cook/stills/r01-2x/` | Pairs against baseline: `cook/compare/r01/`

Scores, eyeballed: one critic so far (second still running), new build, raw, no calibration.

| Shot | Design | Usability | Creativity | Content | Blind pair vs baseline |
|---|---|---|---|---|---|
| Hero desktop | 6 | 7 | 5 | 7 | won (medium) |
| Dial desktop | 6 | 6 | 5 | 7 | won (medium) |
| Hero phone | 6 | 7 | 5 | 7 | won (high) |
| Closing desktop | 6 | 7 | 4 | 6 | won (medium) |
| Dial phone | 6 | 5 | 5 | 7 | won (medium) |
| Intro frame | 4 | 4 | 4 | 2 | lost (medium) |

Own score (logged, never decides): design 7, usability 7, creativity 7, content 7.

Measured: nothing this round. Frame rate on real GPUs not measurable here (software rendering).

Not checked this round: feature demos (not built), legal pages (not built), keyboard pass, real-device performance.

Top gaps from the critic:
1. The scene reads flat: thin, evenly dotted rings on a plain purple field with no depth, light or energy. The old intro frame beat the new one on this.
2. MINUS is the least legible word in the headline; the consent block outweighs the incentive.
3. No call to action in the dial view; footer links sat on the glyph field.
4. Tells: italic serif with sans, a cyan last word, purple on purple.

Progress note sent: 05:12 (six stills).
Stop check: bar no | stills approved no -> next round
Next focus: light and depth in the scene, then the feature demos.

## Round 02 (in progress)

Changes so far:
- Scene: glow from blurred mips of the cell buffer, a darker well around the hole, hotter inner disk, stronger photon rim and beaming, a heavier T for the hottest cells, spiral lanes.
- Intro: a wide-silhouette beat before the sweep.
- Hero sized against viewport height; perk moved above the form as one line; consent shortened; Join button in the header once the hero form is out of reach; fewer serif italics planned (hero, premise, closing only).
- Feature demos started: two builders on Size Assist + Hold/Standby and Lab; clock and Drops Home built here.

Round 02 closed 06:35 UTC | total elapsed 2.5h

Further changes in round 2:
- All five demos live: Drops Home and the clock ported here from the prototype's own formulas and checked against its clock frames; Size Assist, Hold and Standby, and Lab built by two builders from the Swift-source spec.
- Features section: pinned demo beside scrolling copy on wide screens, inline on phones.
- Closing given its own two-column layout; app-style form controls; legal pages; social image and icons; static layout without WebGL2; robots and sitemap; production build passes.
- Intro: flash travels as a band (no full-white frame); headline arrives after the hole settles.

Stills: `cook/stills/r02/` | Pairs: `cook/compare/r02/`

Scores, eyeballed, raw (one walkthrough critic on a stronger model; pairs critic still running):

| Section | Design | Usability | Creativity | Content |
|---|---|---|---|---|
| Whole page | 6.4 | 6.0 | 7.0 | 5.6 |
| Intro (desktop) | 7.0 | 5.0 | 7.5 | n/a |
| Hero (desktop / phone) | 6.8 / 6.0 | 7.0 / 6.5 | 7.0 / 6.0 | 6.5 |
| Dial (desktop / phone) | 7.6 / 7.2 | 7.0 | 7.8 / 7.5 | 7.5 |
| Features | 5.8 | 6.5 | 5.5 | 5.0 |
| Audiences | 5.0 | 6.5 | 3.5 | 6.0 |
| Closing | 7.0 | 7.5 | 6.5 | 7.0 |

Own score (logged, never decides): design 7.5, usability 7, creativity 7.5, content 6.5.

Measured: production build passes (14 routes). `tsc --noEmit` clean.
Not checked: real-device frame rate, static export build, screen reader pass.

Top gaps from the critic:
1. No clothes anywhere: product areas are glyph noise with placeholder captions.
2. The black hole stops once the features start; the lower page reads as a dark-purple template.
3. Phone hero: the form fills the screen and the hole is a sliver. Cut the perk pill and tabs from the first screen.
4. Countdown ghost at about 5% contrast mid-rise.
5. MINUS weaker than the lines around it; caught mid-reveal as "MINU".
6. Feature layout: content edge does not match the header edge; audiences block is flat and templated.
7. Copy: developer captions in the clock demo, invented-looking numbers, "demo confidence", UK "programme".

Decisions:
- 06:35 Intro length stays at about five seconds against the critics' advice (they want 2.5s), because the user chose it at intake. Any scroll, tap or key still ends it.
- 06:35 Clock demo stays a faithful port (glyph-filled digits, unit marks top-right) against the critic's preference for solid digits, because the user asked for accuracy to the prototype.
- 06:35 Lab cards and the Drops Home stage will show garments drawn in glyphs instead of the prototype's placeholder field and space scenes, because a fashion page with no clothes on it fails its own subject. Flagged for the user.
- 06:35 Audiences section folded into the closing: the role choice swaps the statement and pitch.

Stop check: bar no | stills approved no -> next round
Next focus (round 3): scene carried through the features, garments in glyphs, simpler hero form, layout grid, copy.
