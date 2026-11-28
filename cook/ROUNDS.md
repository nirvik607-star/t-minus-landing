# Cook ledger: T^minus waitlist landing page

Started: 2026-11-28 04:04 UTC
Time: no floor | no cap (work in rounds until the bar is met or the user stops it)
Bar: design 9 | usability 9 | creativity 9 | content 9 (each out of 10, fresh reviewers on stills) and wins every blind pair against the baseline
Calibration offset: none yet (no user estimate received)
Usage: not readable
Gate: stills approved no | final render not applicable (the deliverable is the site)
Best so far: round 12, `cook/stills/r12/`

Correction, 05:20: the times first written for rounds 1 and 2 were estimates, not clock readings, and ran about 90 minutes ahead. They are replaced below with times taken from the commit log.

Correction, 07:01: the same mistake again for rounds 9 to 11, which I timed by guess and put up to 35 minutes ahead. Replaced with times from the commit log. Round times are now read from the clock when the entry is written.

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
- 06:00 The page content now sits behind the scene and is seen through the open hole, instead of the hole being a backdrop behind the content. Six walkthrough critics in a row said the idea stopped at the features; this makes the hole the frame for them. Flagged for the user.
- 06:00 Desktop features are mirrored to demo left, copy right, so the dial only has to grow in place to become the ring around the demo.
- 06:00 Header button is filled white again from the dial onward, because two critics said the demos' white buttons out-shouted an outlined call to action. Reverses the 05:10 decision.
- 06:00 The per-demo "Live demo, example data" tab and the "Try it." prefix are gone; the section says once that every demo runs on example data. One critic read the repeated tab as a template tell.
- 06:45 Closet is now a port of the app's own Closet screen (filters, Public Showcase count, piece states), read from the prototype source like the other five, instead of four loose tiles. Piece names are example data.
- 06:45 The membership line moved from Closet to the brand pitch in the closing, where it belongs to the audience it is for. Flagged for the user.
- 06:45 The intro's hole has a clean black shadow, with nothing drawn across its front. Five critics over six rounds read the band across it as a seam or a render fault at every angle tried.
- 06:45 The demos keep the app's white primary buttons, against three critics who wanted them outlined so they do not compete with the page's own button. The user asked for accuracy to the prototype. Flagged for the user.
- 06:45 Ice blue: the seconds of the page's countdown are the one ice-blue value in the hero and the dial; in the closing the word "zero." takes it and the seconds go white. Unit marks are periwinkle throughout.
- 07:08 MINUS arrives full of glyphs and they then clear out of it, leaving a plain white word. Seven critics in a row read the marks as dirt, damage or moth holes at every density and colour tried; this keeps the glyphs as the arrival and makes the line literal. Reverses the 05:10 perforated treatment. Flagged for the user.
- 07:08 Critics now contradict each other on the ring's size and position, the closing's layout and a label above the features, so those are left as they are for the user to judge.
- 06:58 On phones each demo is scaled to fit between the arcs of the rim (never below nine tenths) and rests there for a third of a screen. Its controls then measure 40 to 43px instead of 44. Seeing the demo whole was judged worth four pixels; flagged for the user.
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
Scores, eyeballed, raw:
- Blind pairs won by the new build: 8 of 8 (critic K). Features pair: design 7.5, creativity 8, content 8.
- Walkthrough (critic L, stronger model), whole page: design 6.4, usability 6.6, creativity 7.0, content 6.3.
Measured: `tsc --noEmit` clean; functional script passes; production build passes.
Progress note sent: 05:46 (eight stills).
Stop check: bar no -> next round

## Round 07

Time: 05:45 to 05:57 UTC | total elapsed 1.9h
Focus: the joins the round-6 walkthrough found, and the page at five more window sizes.

Changes:
- Stage radius sized to the copy; the dial clock swells and fades through the dive; shorter dive on phones; the hole stays centred through the rise.
- Header keeps its backing through the pull-out; a shade behind the logo during the intro.
- Closet has its own block, with labelled pieces.
- Short windows: the pinned demo scales to fit. Very short screens (a phone on its side) get the static layout. One-row footer and field fit at 360px.

Stills: `cook/stills/r07/` | Pairs: `cook/compare/r07/`

Scores, eyeballed, raw:
- Blind pairs won by the new build: 8 of 8 (critic M). New build per pair: design 7 to 7.5, usability 6.5 to 7.5, creativity 6.5 to 7.5, content 4.5 (the intro frame, which has no words) to 7.5.
- Walkthrough (critic N, stronger model), whole page: design 6.5, usability 6.3, creativity 7.0, content 6.4. Features 6 on desktop and 5 on phone; dive 5 and 4.

Own score: design 7.5, usability 7.5, creativity 8, content 7.
Measured: `tsc --noEmit` clean; functional script passes; intro timing by script unchanged (4.4s first visit, 0.4s returning, 1.7s after Skip, 0.1s reduced motion); no-WebGL page renders complete; five extra sizes render without overflow or console errors.
Not checked: real-device frame rate; screen reader pass; the demos against fresh prototype captures.

Top gaps (critic N): on phones the hole vanished in the features, leaving a plain dark list; the dive frames were empty; the header was an opaque bar that cut the scene and the copy; desktop copy and card did not line up; unit marks crowding digits in the demo clock; a nearly invisible consent box; a grey smudge inside the hole on phones; an overloaded hero; no rim on the hole during the pull-out. Critic M: the outlined header button, the perk read last in the closing, a dead gap beside the closing headline, MINUS reading as moth-eaten.
Progress note sent: no separate note; folded into round 8.
Stop check: bar no -> next round

## Round 08

Time: 05:58 to 06:24 UTC | total elapsed 2.3h
Focus: the features act on phones (weakest shot, 5 for design and 4.5 for creativity) and the dive.

Changes:
- The hole is open from the dial onward: the scene is drawn above the features and its void is left clear, so the page is read through the hole and the rim hides whatever is outside it.
- Desktop: a full ring frames the pinned demo, each demo scaled to fit it, with the copy beside it on open ground. Only the block of copy near the middle of the screen is present; the others fade, so nothing slides under the header. Closet is the sixth part, pinned like the rest.
- Phones: the hole is a little smaller than the screen, so the lit rim curves across the top and bottom and copy and demos scroll behind it.
- Dive: the section starts under the end of the runway, hidden, and its first content rises into the hole as the hole opens. No empty frames.
- Pull-out: the ring stays whole and lit; the clock rides the hole; the closing copy fades in once the hole has dropped below it.
- Header: no bar, a soft shade behind the logo; the button is filled.
- Hero and closing: the perk is the line directly above the field; consent text smaller and quieter with a brighter box; closing headline on one line beside the form.
- Demo clock: more air after each unit mark and at the edges. No light inside the hole unless the disk really crosses in front of it (the grey smudge).
- MINUS: lighter perforation so the letter edges read clean.

Stills: `cook/stills/r08/` | Pairs: `cook/compare/r08/`

Scores, eyeballed, raw:
- Blind pairs won by the new build: 8 of 8 (critic O). New build per pair: design 6.5 to 7.5, usability 7 to 7.5, creativity 6.5 to 7.5, content 5 (the intro frame) to 8. Features pair, desktop: 7.5 / 7.5 / 7.5 / 8.
- Walkthrough (critic P, stronger model), whole page: design 6.4, usability 6.0, creativity 7.0, content 5.8. Features up to 6.5 desktop and 5.5 phone (from 6 and 5); dive up to 6 and 5.5 (from 5 and 4); the pull-out fell to 4.5 because the returning clock sat on the rim.
Own score: design 8, usability 7.5, creativity 8.5, content 7.
Measured: `tsc --noEmit` clean; functional script passes (no text under 12px by computed size, no target under 44px, form states, keyboard order, no console errors); intro timing 4.4s / 0.4s / 1.7s / 0.1s; no-WebGL page renders complete; five extra sizes render without overflow or console errors; production build passes.
Not checked: real-device frame rate (the scene now blends over page content while the hole is open); screen reader pass; the demos against fresh prototype captures. Demo cards on desktop are scaled between 0.84 and 1.15 to fit the ring, so their smallest labels can render near 10px on a 720px-tall window.
Progress note sent: 06:24 (six stills).

Top gaps (critic P): the clock printing over the rim on the way out, with the hole off-centre; demo frames changing width and height from part to part; the dial's text on a different column from the feature copy; the rim cutting into reading room on phones and slicing text; muddy digits in the demo clock; two clocks with nothing to say which is the launch; four ice-blue unit marks on the page's own clocks; closing columns not aligned; a seam across the hole in the intro. Critic O: MINUS reading as dirt at small cell sizes; an undersized hero lockup on desktop. Both: a fashion page with no fashion on it.
Stop check: bar no -> next round

## Round 09

Time: 06:24 to 06:35 UTC | total elapsed 2.5h
Focus: the round-8 gaps above, then an automated accessibility audit, which had never been run.

Changes:
- One scale for every demo inside the ring; feature copy starts at one height; the premise beside the dial sits on the feature copy's column.
- Pull-out: the hole returns to the centre line first; the clock waits until the void is wide enough to hold it and never sits within a line's height of the rim.
- Content dims as it nears the rim instead of being cut by it; slightly larger porthole on phones.
- Page clocks: periwinkle unit marks, so ice blue is one word per view; the header clock is labelled as the launch count.
- Hero: larger lockup on desktop; larger glyph cells in MINUS so the marks read as characters; perk and brand link drop out below 800px of height.
- Intro: a more open view of the disk so the band across the hole has body. One beat of light through the ring when the part changes.
- Closing: wider body, columns aligned, a little lower.
- Demo clock: a slightly stronger base under the glyph fill. Still a glyph fill.
- Accessibility: the audit showed the hero (the page's h1 and first form) left the accessibility tree once scrolled past, and my round-8 change hid the features from screen readers and the keyboard while the page sat at the top. Both now stay reachable; focusing the faded hero form scrolls back to it. The scene's clocks moved inside the main landmark.

Stills: `cook/stills/r09/` | Pairs: `cook/compare/r09/`

Scores, eyeballed, raw:
- Blind pairs won by the new build: 8 of 8 (critic Q). New build per pair: design 6.5 to 7, usability 6.5 to 7.5, creativity 6 to 7.5, content 3.5 (the intro frame) to 8.
- Walkthrough (critic R, stronger model), whole page: design 6.4, usability 6.3, creativity 7.1, content 5.9. Features 6.5 / 7 / 7.5 / 7 on desktop and 6 / 6 / 7 / 7 on phone, against 6 / 6.5 / 6 / 6 and 5 / 6 / 4.5 / 6 in round 7. Pull-out 5 and 4: an empty frame with no clock and no button.
Own score: design 8, usability 8, creativity 8.5, content 7.
Measured: `tsc --noEmit` clean; axe-core (WCAG 2.1 A and AA plus best practice) reports no violations on the page at hero, features and closing, desktop and phone, or on the two legal pages; functional script passes; focusing the hero field from the features returns scroll to 0 with the hero visible; intro timing 4.4s / 0.4s / 1.7s / 0.1s; five extra sizes render without overflow or console errors; no-WebGL page renders complete.
Not checked: real-device frame rate; a pass with a real screen reader; the demos against fresh prototype captures.

Top gaps (critic R): the ring sitting hard against the left edge on desktop; Closet with no frame beside five framed demos; an empty pull-out; the phone closing clock dimmed and touching the rim; logo and button on raw rim glyphs on phones, with lines of copy sliced between them; nothing ice blue in the hero or dial; weak borders on the field and consent box; two weak lines under the section heading; closing columns a few pixels out. Critic Q: the band across the intro's hole reading as a render fault.
Stop check: bar no -> next round

## Round 10

Time: 06:36 to 06:49 UTC | total elapsed 2.8h
Focus: the round-9 gaps above.

Changes:
- Closet: a port of the app's Closet screen. Filter by state, tap a piece to put it on the Showcase (up to three).
- Ring: narrower copy column, so the ring sits clear of the left edge at 1440.
- Pull-out: the header button stays until the closing form arrives; the clock rides under the crest all the way out, seated deeper while the hole is still large.
- Phone closing: a wider hole, so the clock sits inside it at full strength.
- Phones inside the hole: a stronger shade behind the logo and button; content fades over a longer run before the rim.
- Countdown: seconds in ice blue in the hero and dial; the day mark tucked against its digits.
- Form: a visible field border, a heavier consent box, lighter consent text.
- Section heading: one line under it, which also says the demos run on example data.
- Intro: clean black shadow, no band across the front.
- Closing: columns aligned, a little lower; the brand pitch carries the membership line.

Stills: `cook/stills/r10/` | Pairs: `cook/compare/r10/`

Scores, eyeballed, raw:
- Blind pairs won by the new build: 8 of 8 (critic S). New build per pair: design 6.5 to 7.5, usability 6.5 to 7.5, creativity 6.5 to 8, content 4.5 (the intro frame) to 7. Closet pair: 7.5 / 7 / 8 / 7.
- Walkthrough (critic T, stronger model), whole page: design 6.8, usability 6.4, creativity 7.3, content 6.3. The first whole-page movement since round 2 (round 9: 6.4 / 6.3 / 7.1 / 5.9). Desktop features 7 / 7 / 7 / 7, closet 7 / 7 / 6.5 / 7, intro 7 / 6 / 8, dial 7.5 / 7 / 7.5 / 7, closing 7 / 7.5 / 6.5 / 7. Phone features 5.5 / 5 / 6 / 7.
Own score: design 8, usability 8, creativity 8.5, content 7.5.
Measured: `tsc --noEmit` clean; axe-core reports no violations (page at three scroll states on desktop and phone, and both legal pages); functional script passes; intro timing 4.3s first visit, 0.4s returning, 1.8s after Skip, 0.1s reduced motion; five extra sizes render without horizontal overflow or console errors; no-WebGL page renders complete; production build passes.
Not checked: real-device frame rate; a pass with a real screen reader; the demos against fresh prototype captures.

Top gaps (critic T): on phones no demo was ever seen whole, because the bottom rim cut each one; two headings of the same size stacked on phones; the countdown high in an otherwise empty hole during the rise; the header clock as a third countdown style; glyphs in MINUS cut at the letter edges; faded copy ghosting behind the phone header. Critic S: the hero countdown touching the rim's glow; an undersized premise beside the dial.
Stop check: bar no -> next round

## Round 11

Time: 06:50 to 06:59 UTC | total elapsed 2.9h
Focus: phones inside the hole, the weakest shot (5.5 / 5 / 6 / 7).

Changes:
- Phones: each demo is scaled to fit between the two arcs of the rim and rests there, centred and whole, for a third of a screen of scrolling. Six new stills record that state.
- Phones: the section heading steps down in size so it does not compete with the first part's name; solid shade behind the logo and button.
- MINUS: only whole glyphs, inside the letters; nothing cut at an edge.
- Hero: the countdown sits deeper in the hole, clear of the rim's glow. During the rise it reaches the centre of the void sooner.
- Dial: larger premise.
- Header clock: no label. Closing: new body copy that says what the texts will be, instead of repeating the hero.
- The runway no longer takes taps meant for the first demo as it rises (found by a hit test, not by a critic).

Stills: `cook/stills/r11/` | Pairs: `cook/compare/r11/`

Scores, eyeballed, raw:
- Blind pairs won by the new build: 8 of 8 (critic U). New build per pair: design 6.9 to 7.3, usability 6.3 to 7.5, creativity 6.7 to 7.5, content 5.4 (the intro frame) to 7.4.
- Walkthrough (critic V, stronger model), whole page: design 6.4, usability 6.6, creativity 7.0, content 6.0. Phone features 7 / 7 / 6.5 / 7 and phone closet 7 / 7 / 6 / 7, from 5.5 / 5 / 6 / 7. Intro 7.5 / 6.5 / 8 / 6.
- Reading the last three walkthroughs together (6.4 / 6.3 / 7.1 / 5.9, then 6.8 / 6.4 / 7.3 / 6.3, then 6.4 / 6.6 / 7.0 / 6.0): a different critic each round moves the whole-page score by about 0.4 either way, which is more than one round's changes do. Section scores are the steadier signal.
Own score: design 8, usability 8, creativity 8.5, content 7.5.
Measured: `tsc --noEmit` clean; axe-core reports no violations; functional script: no text under 12px, form states and keyboard order pass, no console errors, and 26 demo controls on the phone measure 40 to 43px while their demo is scaled (everything else is 44px or more); hit tests: the hero field and the first demo take taps at three scroll positions on desktop and phone; four extra sizes render without horizontal overflow or console errors; no-WebGL page renders complete.
Not checked: real-device frame rate; a pass with a real screen reader; the demos against fresh prototype captures; the phone hold on a real iPhone with its moving address bar.

Top gaps (critic V): the desktop ring running under the header and close to the left edge, with the demo small inside it; an undersized hero countdown; glyph marks in MINUS reading as rendering damage; the section heading smaller than the first part's name on phones; an empty phone pull-out; the closing's split layout against the hero's centred one; the Skip control on the white of the intro's flash; a part's name wrapping to two lines and moving the copy under it; an outlined button on the legal pages. Critic U: the same marks in MINUS; demo buttons out-ranking the page's own.
Stop check: bar no. The loop pauses here for the user: see the note under round 12.

## Round 12

Time: 07:02 to 07:15 UTC | total elapsed 3.2h
Focus: the round-11 gaps that are faults, not matters of taste.

Changes:
- MINUS: glyphs on arrival, plain white at rest.
- Desktop features: every part's name sits in a two-line slot, so the copy under it starts at one height.
- Skip intro has its own dark backing. Legal pages use the same filled button as the page.
- Phones: the closing copy arrives sooner in the pull-out, once it is clear of the rim.
- Closing body shortened; it no longer repeats the consent line beneath it.

Stills: `cook/stills/r12/`
Scores: not run for this round. The changes answer points raised by seven critics (MINUS) or are alignment fixes, and one more pair of critics would add more noise than signal.
Own score: design 8, usability 8, creativity 8.5, content 7.5.
Measured: `tsc --noEmit` clean; axe-core reports no violations; functional script as in round 11 (26 scaled demo controls on the phone at 40 to 43px, nothing else under 44px, no text under 12px, forms and keyboard order pass, no console errors); hit tests pass; five extra sizes render without horizontal overflow or console errors; no-WebGL page renders complete; intro timing 4.4s first visit, 0.4s returning, 1.7s after Skip, 0.1s reduced motion; `npm run build` and `npm run build:pages` both pass; a recorded scroll of the whole page ran at 38 frames a second at phone size and 15 at 1280x720 on software rendering, with no GPU.
Not checked: frame rate on a real phone or laptop GPU; a pass with a real screen reader; the demos against fresh prototype captures; the phone hold on a real iPhone with its moving address bar.

Why the loop pauses: the bar is 9 on four criteria and the page stands at about 6.5 / 6.5 / 7.1 / 6.1 by the walkthrough critics and about 7 / 7 / 7.2 / 7 by the pairs critics, having won every blind pair against the old page in each of the last seven scored rounds (5 to 11). Three things now hold the score: no real garment, brand or drop to show; decisions that are the user's (listed under Decisions as flagged); and critics who have begun reversing each other. Further rounds without the user's eye would trade one critic's taste for the next.

