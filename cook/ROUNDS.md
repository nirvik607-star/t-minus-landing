# Cook ledger: T^minus waitlist landing page

Started: 2026-11-28 04:04 UTC
Time: no floor | no cap (work in rounds until the bar is met or the user stops it)
Bar: design 9 | usability 9 | creativity 9 | content 9 (each out of 10, fresh reviewers on stills) and wins every blind pair against the baseline
Calibration offset: none yet (no user estimate received)
Usage: not readable
Gate: stills approved no | final render not applicable (the deliverable is the site)
Best so far: round 6, `cook/stills/r06/`, commit 6e054d8

Correction, 05:20: the times first written for rounds 1 and 2 were estimates, not clock readings, and ran about 90 minutes ahead. They are replaced below with times taken from the commit log.

## Decisions

Made without asking, one line each.
- 04:04 Rebuild the scene renderer as a new module beside the old one, because iterating on 2,900 lines of generated shader code would be slower than owning a clean one.
- 04:04 Drop the docked top dome after the runway; the dial scrolls away with the page and the horizon returns at the closing, because content sliding under the dome left fragments showing either side of it.
- 04:04 Keep Newsreader for the brand serif (it is already the wordmark's T) and Inter for the functional sans (it is the wordmark's sans); drop Inter Tight.
- 04:04 Keep the scene inside the purple, periwinkle and white range; no ice blue in the scene, because the design system reserves it for one word or live value.
- 04:52 Intro length stays at about five seconds against the critics' advice (they want 2.5s), because the user chose it at intake. Any scroll, tap or key still ends it.
- 04:52 The clock demo stays a faithful port (glyph-filled digits, unit marks top-right) against three critics' preference for solid digits, because the user asked for accuracy to the prototype. Its grey ground is raised a step so the digits hold on desktop screens.
- 04:52 Lab cards and the Drops Home stage show garments drawn in glyphs instead of the prototype's placeholder field and space scenes, because a fashion page with no clothes on it fails its own subject. Flagged for the user.
- 04:52 Audiences section folded into the closing: the role choice swaps the statement and pitch.
- 05:10 Feature names are the headlines and are set in the brand serif italic, because three critics flagged two competing headline voices and the app's own rule is serif for product headlines. The user was wary of italics, so it is one CSS rule (`.headline`) to switch back. Flagged for the user.
- 05:10 MINUS is a white word perforated by brand-purple glyphs, not ice-blue glyphs on a faint ground, because every critic called the earlier fill muddy.
- 05:10 Header button is an outline; the form's submit is the only white button on the marketing page.
- 05:35 The features moved from the plum ground to a black stage inside the hole, and the audiences and after-the-drop blocks became the closing's role switch and a Closet block, because the same structural criticism came back four rounds running. Flagged for the user as the largest departure from the grilled plan.
- 05:10 "Example studio / Portland, OR" replaces "Independent studio / Your city" on the Drops Home stage; other demo data keeps the prototype's own placeholder style (Studio 01, CONCEPT_01) and each demo is labelled as running on example data.

## User feedback inbox

Exact words. Close an item only when a still proves it.
- 03:58 "some of the those prototype screens look a little wrong" | round 0 | open: archived screenshots dropped as references; demos built from the Swift source and still to be checked against fresh captures when the user sends them.

---

## Round 01

Time: 04:04 to 04:30 UTC | total elapsed 0.4h
Usage: not readable
Focus: the signature image (black hole, hero, dial, closing), because the page cannot be judged without it.

Changes:
- New renderer in `src/lib/scene/` and `src/components/scene/`: Schwarzschild ray tracing at cell resolution, glyph pass from an atlas of the brand set, intro timeline, scroll camera from horizon to top-down dial, closing horizon.
- New page: tokens from the locked design system, hero lockup with glyph-masked MINUS, new subhead, T-minus clock readouts inside the void, premise beside the dial, audiences, closing with form.
- New form: compliant consent line, 44px targets, brand name required, plain confirmation.

Stills: `cook/stills/r01/` | Pairs against baseline: `cook/compare/r01/`

Scores, eyeballed, raw (2 critics, one on a stronger model):
- Blind pairs won by the new build: 5 of 6 (critic B), 4 of 6 (critic A). Both lost the intro frame; A also preferred the old top-down view.
- New build per pair, about: design 6 to 6.5, usability 5 to 7.5, creativity 4 to 6.5, content 4 to 7.5.

Own score (logged, never decides): design 7, usability 7, creativity 7, content 7.
Measured: nothing. Not checked: demos, legal pages, keyboard, real devices.

Top gaps: the scene had no light or depth; MINUS least legible word; consent outweighed the incentive; no call to action in the dial view.
Progress note sent: about 04:28 (six stills).
Stop check: bar no | stills approved no -> next round

## Round 02

Time: 04:30 to 04:52 UTC | total elapsed 0.8h
Focus: light and depth in the scene, then the feature demos.

Changes:
- Scene: glow from blurred mips of the cell buffer, a darker well around the hole, hotter inner disk, stronger photon rim, heavier glyph for the hottest cells.
- All five demos live: Drops Home and the clock ported here from the prototype's own formulas and checked against its clock frames; Size Assist, Hold and Standby, and Lab built by two builders from the Swift-source spec.
- Features section (pinned demo beside scrolling copy; inline on phones), closing layout, app-style form controls, legal pages, social image and icons, static layout without WebGL2, robots and sitemap.
- Intro: flash travels as a band; headline arrives after the hole settles.

Stills: `cook/stills/r02/` | Pairs: `cook/compare/r02/`

Scores, eyeballed, raw:
- Blind pairs won by the new build: 8 of 8 (critic C).
- Walkthrough (critic D, stronger model), whole page: design 6.4, usability 6.0, creativity 7.0, content 5.6.

Own score: design 7.5, usability 7, creativity 7.5, content 6.5.
Measured: production build passes; `tsc --noEmit` clean.

Top gaps: no clothes anywhere; the black hole stops at the features; phone hero hides the hole; countdown ghost mid-rise; MINUS weak; layout edges inconsistent; developer captions and invented-looking numbers in demos.
Stop check: bar no -> next round

## Round 03

Time: 04:52 to 05:06 UTC | total elapsed 1.0h
Focus: carry the scene through the features, put garments on the page, simplify the hero form.

Changes:
- The glyph disk sits behind the pinned demo and turns with scroll.
- Garments drawn in glyphs on the Drops Home stage, the Lab cards and the Hold item row.
- Hero form is number, consent, one button; the audience choice lives in the closing and changes its statement and pitch.
- One layout grid; copy tightened; clocks hand off without a half-visible state.

Stills: `cook/stills/r03/` | Pairs: `cook/compare/r03/`

Scores, eyeballed, raw:
- Blind pairs won by the new build: 8 of 8 (critic E), including the intro frame for the first time.
- New build per pair (critic E): design 6.5, usability 7 to 7.5, creativity 6.5 to 7, content 6.5 to 7.
- Walkthrough (critic F, stronger model), whole page: design 6.3, usability 6.0, creativity 6.6, content 5.8. No real movement on round 2.

Own score: design 7.5, usability 7.5, creativity 7.5, content 7.
Measured (script, phone viewport): no text under 12px after fixes (was 65 demo labels at 9 to 11px); no tap target under 44px after fixes (was 5); form error, brand and success states behave; keyboard order runs logo, number, button, consent, links; no console errors.

Top gaps: ring low in contrast against a flat ground; MINUS muddy with a stray stroke on the S; phone hero still shows only a sliver; a blank screen mid-rise on phones; the same hoodie drawn three times; two headline voices; after-the-drop strip; caption under the demos unreadable.
Progress note sent: 05:00 (eight stills).
Stop check: bar no -> next round

## Round 04

Time: 05:06 to 05:20 UTC | total elapsed 1.3h
Focus: contrast in the scene, MINUS, garments, one headline voice, phone hero.

Changes:
- Scene: the ground under the glyph field drops toward black across the whole disk; the inner band runs white-hot; lanes have dark gaps; wider tonal range in the glyphs; softer front edge where the disk crosses the shadow.
- Phones: the hole is smaller and higher so its upper half shows with the clock inside; the strip clock stays through the rise and swaps to the dial readout at the centre.
- The disk quickens with the clock demo's stage and the hold's last seconds.
- MINUS: white, perforated by brand-purple glyphs, fitted to the flat cap height.
- Garments redrawn as seven distinct flat lays with shaded sleeves and seams.
- Feature names as headlines in the statement voice; after-the-drop is one line; captions moved into the copy; pinned demo fades out with its list; outline header button.
- Static export build passes; waitlist endpoint is a setting.

Stills: `cook/stills/r04/` | Pairs: `cook/compare/r04/`
Scores, eyeballed, raw:
- Blind pairs won by the new build: 7 of 8 (critic G). The loss was the desktop dial: a block replacement of mine had deleted the two lines that show the premise, so half that screen was empty. Fixed in round 5.
- New build per pair (critic G): design 6.5 to 7.5, usability 6.5 to 7, creativity 6.5 to 7.5, content 5.5 to 7. Up about half a point on design from round 3.
- Walkthrough (critic H, stronger model), whole page: design 6.3, usability 6.0, creativity 7.0, content 6.0. Dial scored 4.5 for the same missing premise.

Own score: design 7.5, usability 7.5, creativity 8, content 7.
Measured: static export build passes (17 routes); functional script passes as in round 3; live intro timing by script: hero fully visible 4.3s after the scene starts, 1.7s after pressing Skip at 0.5s, 0.1s with reduced motion.
Not checked: real-device frame rate; screen reader pass; the demos against fresh prototype captures.

Top gaps: the missing premise; a see-through demo card as it faded out; demo buttons looking like the real call to action; unit marks crowding digits in the demo clock; closing form off the grid; tab underline stub; glow washing out glyphs at the intro's peak; a hard seam across the hole in the intro (fourth mention); shell and jacket too alike.
Progress note sent: 05:19 (seven stills).
Stop check: bar no -> next round

## Round 05

Time: 05:20 to 05:33 UTC | total elapsed 1.5h
Focus: the round-4 gaps above.

Changes:
- Premise restored beside the dial.
- Header, features and closing on one container; the demo card and the closing form share a left edge; closing form column flush with the header button.
- Demos carry a small "Live demo, example data" tab; the sentence repeated under each feature is gone; the pinned demo stays solid as it leaves.
- Photon ring widened to about 1.4 cells so it survives as a crisp rim at any size; glow capped below white.
- Intro: nearly edge-on silhouette, so the disk crosses the hole as one bright band with clean black below; visible Skip intro button; the star shows more glyph and less bloom.
- MINUS on larger cells (nine rows) with a softer perforation; feature names larger.
- Shell is long with a big hood; field jacket is boxy and cropped with a pointed collar.
- Copy: Size Assist and clock leads rewritten to match what the demos do; brand link says what it applies for; one caption wording under both clocks.
- Layout measured on resize instead of on a timer.

Stills: `cook/stills/r05/` | Pairs: `cook/compare/r05/`

Scores, eyeballed, raw:
- Blind pairs won by the new build: 8 of 8 (critic I).
- New build per pair (critic I): design 7 to 7.5, usability 7 to 7.5, creativity 6.5 to 7.5, content 5.5 to 7.5.
- Walkthrough (critic J, stronger model), whole page: design 6.4, usability 6.8, creativity 6.6, content 6.2. Usability up 0.8; the rest flat. Dial 7.5, hero 7, features 6, closing 6.

Own score: design 7.5, usability 8, creativity 7.5, content 7.
Measured: `tsc --noEmit` clean; functional script passes (no text under 12px, no target under 44px, form states, keyboard order, no console errors).

Top gaps, the same from both critics and from rounds 2 to 4: the black hole stops at the features, which then read as a stock copy-left, card-right layout; hero and closing are the same composition; the scroll never escalates. Smaller: clock sits low in the desktop hero; a blank stretch mid-rise on desktop; an orphan line after the features; a four-level type stack in each feature; the demo tab colliding with the card corner.
Progress note sent: 05:34 (seven stills).
Stop check: bar no -> next round

## Round 06

Time: 05:33 to 05:45 UTC | total elapsed 1.7h
Focus: make the page one continuous camera move, because four walkthrough critics in a row named the features section as where the idea stops.

Changes:
- After the dial the camera drops through it. The void opens until it fills the screen as a black stage with the lit rim around it (down both sides on wide screens, in the corners on phones), and the five features play out inside. At the end it pulls back out and the hole settles as the horizon under the closing form.
- The disk turns with scroll through the features and quickens with the demos, as before.
- Features: the name is the headline; one paragraph with its first sentence in white; a quiet line above each demo marks it as a demo. Closet is a sixth, static block with four pieces drawn in glyphs.
- Scene: open spiral arms instead of rings; spikes on the intro's star; nothing in the centre while the flash peaks.
- Desktop horizon sits higher, so the countdown clears the fold; the strip clock travels to the centre of the void during the rise.
- Transitions cleaned: the premise leaves as the dive begins; the strip clock waits until the crest has cleared the closing form.
- Skip intro is a text control; header units are quiet; footer links brighter.

Stills: `cook/stills/r06/` | Pairs: `cook/compare/r06/`
Scores: two critics running.
Measured: `tsc --noEmit` clean; functional script passes; production build passes.
Progress note sent: 05:46 (eight stills).
