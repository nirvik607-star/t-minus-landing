"use client";

import React, { useEffect, useState } from "react";
import { AppFrame, AppPrimaryButton, GlyphPatch } from "@/components/demos/app-ui";
import { HeroClock } from "@/components/demos/hero-clock";

const START = 11 * 3600 + 59 * 60 + 59;

/** Drops Home: the next release owns the screen. */
export function DropsHomeDemo({ active }: { active: boolean }) {
  const [seconds, setSeconds] = useState(START);
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setSeconds((s) => (s > 1 ? s - 1 : START)), 1000);
    return () => window.clearInterval(id);
  }, [active]);

  return (
    <AppFrame label="Drops Home demo: the next drop with its live clock">
      {/* App header */}
      <div className="flex h-[52px] items-center justify-between border-b border-[color:var(--aline)] px-5">
        <svg aria-hidden="true" viewBox="0 0 20 20" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
          <circle cx="8.6" cy="8.6" r="5.4" />
          <path d="M12.8 12.8l4 4" />
        </svg>
        <span aria-hidden="true" className="inline-flex items-baseline">
          <span className="font-display text-[26px] font-medium italic leading-none">T</span>
          <span className="-translate-y-[3px] text-[15px] font-medium leading-none tracking-[-0.5px]">^minus</span>
        </span>
        <svg aria-hidden="true" viewBox="0 0 20 20" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.2 6.6h11.6l-.9 10H5.1l-.9-10z" />
          <path d="M7.3 6.6V5.4a2.7 2.7 0 015.4 0v1.2" />
        </svg>
      </div>

      {/* Hero clock */}
      <HeroClock secondsLeft={seconds} active={active} />
      <div className="mt-2 h-px w-full bg-[color:var(--aline)]" />

      {/* Stage */}
      <div className="px-2 pt-4">
        <div className="relative overflow-hidden rounded-[12px] border border-white/15 bg-[color:var(--galaxy-deep)]" style={{ aspectRatio: "1.28 / 1" }}>
          <div className="absolute inset-0">
            <GlyphPatch />
          </div>
          <div className="absolute left-2 top-2 flex flex-col gap-[3px] bg-black/70 px-2 py-1.5">
            <span className="app-label text-[color:var(--secondary)]">50 units allocated</span>
            <span className="app-label text-ice value">{tracked ? 413 : 412} interested</span>
          </div>
          <button
            type="button"
            aria-pressed={tracked}
            aria-label={tracked ? "Stop tracking this drop" : "Track this drop"}
            onClick={() => setTracked((t) => !t)}
            className="absolute right-1 top-1 flex size-11 cursor-pointer items-center justify-center"
          >
            <span className={`flex size-9 items-center justify-center rounded-full transition-colors duration-150 ease-out ${tracked ? "bg-accent text-white" : "bg-white/90 text-black"}`}>
              <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill={tracked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
                <path d="M4 2.6h8v10.9l-4-2.7-4 2.7V2.6z" />
              </svg>
            </span>
          </button>
          <span className="app-label absolute bottom-[9px] left-[9px] text-[color:var(--secondary)]">
            Independent studio / Your city
          </span>
        </div>
      </div>

      <div className="flex items-baseline justify-between px-5 pt-[13px]">
        <span className="app-serif text-[1.4375em]">Field Jacket</span>
        <span className="value text-[1.0625em] font-medium">$148</span>
      </div>

      <div className="px-5 pb-5 pt-3.5">
        <AppPrimaryButton>Get launch ready</AppPrimaryButton>
        <button
          type="button"
          className="mt-2 flex h-12 w-full cursor-pointer items-center justify-between rounded-[8px] bg-[color:var(--elevated)] px-4 text-[0.75em] font-medium uppercase tracking-[0.02em] text-white transition-opacity duration-100 ease-out active:opacity-70"
        >
          <span>View drop details</span>
          <svg aria-hidden="true" viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l6-6M4.2 3H9v4.8" />
          </svg>
        </button>
      </div>
    </AppFrame>
  );
}
