"use client";

import React from "react";

/** Placeholder while the demos are built: the five features as plain copy. */
const FEATURES = [
  {
    name: "Drops Home",
    line: "Every drop in one place.",
    body: "The next release owns the whole screen: the clock, the pieces, the price. No feed to dig through.",
  },
  {
    name: "The clock",
    line: "One clock, and it means it.",
    body: "It tightens at one hour, fifteen minutes and the final minute. At zero it doesn't stop. It becomes T-plus and keeps counting.",
  },
  {
    name: "Size Assist",
    line: "Start from a size you already wear.",
    body: "Name a garment you own. Size Assist compares it with the brand's measurements and gives you a size, how confident it is, and a roomier option.",
  },
  {
    name: "Holds and Standby",
    line: "A hold that tells you when it ends.",
    body: "At checkout your piece is held on a visible timer. If your size sells out, Standby gives you a numbered place for that exact size.",
  },
  {
    name: "Lab",
    line: "Vote before it's made.",
    body: "Swipe through unreleased concepts. Support one, pass on another, say why. Brands see what's worth producing before a unit is cut.",
  },
] as const;

export function Features() {
  return (
    <section data-section="features" className="mx-auto w-full max-w-[1120px] px-5 pb-20 pt-24 sm:px-9 sm:pb-28 sm:pt-36">
      <h2 className="statement max-w-[16ch] text-[clamp(2.3rem,4.6vw,4rem)] text-ink">
        Everything a drop needs, before it opens.
      </h2>
      <div className="mt-12 grid grid-cols-1 gap-x-14 gap-y-12 sm:mt-16 md:grid-cols-2">
        {FEATURES.map((f) => (
          <article key={f.name}>
            <p className="text-[14px] font-medium text-mute">{f.name}</p>
            <h3 className="mt-2 text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[28px]">
              {f.line}
            </h3>
            <p className="mt-3 max-w-[44ch] text-[16.5px] leading-[1.55] text-soft">{f.body}</p>
          </article>
        ))}
      </div>
      <p className="mt-14 max-w-[52ch] text-[16.5px] leading-[1.55] text-soft">
        After the drop, every purchase lands in your Closet as a verified
        record, and each brand keeps its own membership.
      </p>
    </section>
  );
}
