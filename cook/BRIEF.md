# Brief: T^minus waitlist landing page

Target: rebuild the T^minus waitlist landing page to a standard that could win an Awwwards Site of the Day, with signup as the page's one job. Stack: Next.js 16 (app router), React 19, Tailwind 4, hand-written WebGL2. No new runtime dependencies unless one clearly earns it.

References: none for the page as a whole ("no references"). The current page is the baseline it must clearly beat (`cook/stills/r00/`). The feature demos take the current iOS prototype as reference; its archived screenshots are outdated, so demos are built from the Swift source and design system, then corrected against fresh captures when the user sends them. `cook/refs/` holds local material from the private prototype repo and is never committed.

Bar: Awwwards jury criteria, each out of 10, scored by fresh reviewers who see only stills: design 9, usability 9, creativity 9, content 9. Also, per shot, in a blind pair against the baseline the new page must be picked as the better one every time.
Calibration offset: none yet.

Time: no fixed floor, no cap. Work in rounds, send stills after each, stop when the bar is met or the user says stop. Started: 2026-11-28 04:04 UTC.
Usage: not readable from here. Keep parallel subagents to independent parts and critics.
Hardware: unknown visitor devices, phone first. Scene pass runs at glyph-cell resolution so it stays cheap on mid-range phones. Stills here render through SwiftShader (software), so frame rate on real GPUs is not measurable in this environment.
Deliverable: the working site on branch `claude/dazzling-lamport-kgwn4w`, plus stills per round.
Permissions: push to the working branch after each round: yes. Deploy to GitHub Pages: no. Nothing from the private prototype repo (screens, partner names, fixture brand names) goes into this public repo.

User's words: "be super ambitious and try to impress me across the whole improvement pass", "i want a landing page worthy of winning of awwwards", "improve the animation itself to the best of your ability", "I don't want it to end up looking like ai slop with the italics", "try to base it on the prototype that we have currently and just make sure they look really professional and accurate".

## Settled decisions (from the grilling rounds)

Purpose and audience
- Signup wins when spectacle and signup conflict. Shoppers first, brands get a secondary path.
- Phone opened from an Instagram or TikTok link is the primary target.

Kept as signature
- The glyph-drawn black hole, the countdown inside the event horizon, the T^minus wordmark, the "Fashion. MINUS the Noise." lockup.

Brand system (locked in the app's design system)
- Palette: accent `#613DC1`, ground `#2C0735`, deep purple `#4E148C`, periwinkle `#858AE3`, ice blue `#97DFFC`. Ice blue marks one word or one live value per view, never a fill. Pure black only inside the event horizon.
- Type: brand serif italic for identity headlines and statements (same family as the wordmark's T), functional sans for body and controls, mono for live values. Italics used with restraint: the user does not want it to read as generated.
- Glyph set `^ - t + = T *`. No `.` `:` or `·` in glyph fields. Cells are fixed: no drift, wave or jitter. Motion comes from glyph substitution, density and luminosity.
- At zero the clock flips from T-minus to T-plus and keeps counting.
- Approved lines: "Be ready at zero.", "Join the crew." Say "brand", not "label" or "boutique".

Content
- Hero subhead: "Limited drops from independent brands, on one live clock. On the App Store January 1." The old subhead ("The best clothes in the world rarely have the loudest voice.") opens the premise.
- Button: "Join the waitlist". No "early access" or "first access" promises.
- Perk, in one setting: "Two weeks of Premium, free, when it opens."
- No advertising claims anywhere on the page.
- Features, in order: Drops Home, the clock, Size Assist, Holds and Standby, Lab. Launch Ready is left out. One line after them for Closet and per-brand membership. No order tracking.
- No app screenshots. Features are shown as live demos built for the page, faithful to the current prototype.
- Plain words: no degree readout, no HERO / POLAR / INDEX / T-ZERO rail, no PREMISE / ARCHITECTURE labels. Confirmation reads "You're on the list."

Motion and structure
- Intro about 5 seconds on a first visit (was 9.9), ended early by any scroll, tap or key. Returning visitors about 1 second.
- Scroll runway cut to about one viewport; the top-down view carries the premise as well as the clock.
- New black hole renderer (real light bending, crisp glyphs, no blur haze). Keep the old one until the new one beats it side by side.

Plumbing
- Capture stays as is for now (phone number, posts to `/api/waitlist`). Build as if numbers can be collected. Host move is deferred.
- Consent line and public `/privacy` and `/terms` pages written to carrier-review requirements. Still needed from the user: legal business name, support email, texts per month, domain. Until then: brand name "T^minus", 4 messages a month, and a support address held in one config value.
- Defaults applied: 44px tap targets, 16px inputs, no text under 12px, AA contrast, focus held in dialogs, social preview image, favicon, one canonical URL, share and calendar links that respect the base path, export endpoint locked without a token, brand name required on the brand path, T-plus and an App Store button at zero.

Rules for this run
- Cook's slop ban list applies, with two brand exceptions: purple is the brand's locked palette (flat fields, no gradient washes), and the brand serif italic is the app's own headline rule.
- No eyebrow labels, no all-caps mono chrome, no 01/02/03 counters, no shockwave rings, no decorative particles, no em dashes in copy.
