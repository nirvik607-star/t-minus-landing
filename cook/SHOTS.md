# Shots

A shot is one page state at a fixed viewport. Desktop is 1440x900, phone is 390x844. Every shot is reachable by URL so each round renders identical framing. The harness is `cook/harness/stills.mjs`.

URL controls (new build): `?shot=<id>` freezes the scene clock and intro at the named state; `?introAt=<seconds>` pins the intro timeline; `?still=1` stops glyph substitution so renders are repeatable.

| Shot | State | Viewports | What it has to prove | Watch for |
|---|---|---|---|---|
| S01 | Hero, settled | desktop, phone | The lockup, the one-line promise and the form read at a glance; the horizon and countdown sit under them as one image | Form crowding the horizon on short phones; ice blue used more than once |
| S02 | Intro, star | desktop | The first frame is already worth looking at | Blobby or smeared glyph field |
| S03 | Intro, collapse and flash | desktop | The collapse reads as an event on a fixed grid | A drawn ring instead of a density front |
| S04 | Intro, hole forming | desktop, phone | The full lensed silhouette: shadow, arc over the top, band across the front | Mushy rings, no tonal range |
| S05 | Runway, rising | desktop | The camera move between horizon and top-down holds up mid-way | Text and scene fighting |
| S06 | Top-down dial | desktop, phone | The hole as a watch dial: clock in the void, premise beside or beneath it | A white wall of glyphs; clock not centred in the void |
| S07 | Features, each of five | desktop, phone | Each demo is accurate to the prototype and reads without a caption | Demo text under 12px; controls under 44px |
| S08 | After the drop | desktop, phone | Closet and membership read as the end of the feature list. (The audiences block was folded into the closing in round 3.) | |
| S09 | Closing | desktop, phone | The horizon returns behind "Be ready at zero." and the form | |
| S10 | Form states | phone | Error, brand path, success | Consent text legibility |
| S11 | Legal pages | phone | Privacy and Terms are real pages in the same system | |

Baseline for the blind pair: `cook/stills/r00/` holds the current page at the matching states.
