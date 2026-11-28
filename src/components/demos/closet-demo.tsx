"use client";

import React, { useState } from "react";
import { AppFrame, AppLabel } from "@/components/demos/app-ui";
import { GarmentGlyph, type GarmentKind } from "@/components/demos/garment-glyph";

/**
 * The app's Closet: every piece you have secured, with its size and where it
 * stands, filtered by state. Up to three can go on a public Showcase.
 * Pieces here are example data; the layout follows the app's screen.
 */

const FILTERS = ["All", "Secured", "Incoming", "Owned", "Returned"] as const;
type Filter = (typeof FILTERS)[number];

interface Piece {
  id: string;
  kind: GarmentKind;
  name: string;
  size: string;
  state: Exclude<Filter, "All">;
}

const PIECES: Piece[] = [
  { id: "hoodie", kind: "hoodie", name: "Heavyweight Hoodie", size: "M", state: "Owned" },
  { id: "cargo", kind: "cargo", name: "Cargo Pant", size: "32", state: "Owned" },
  { id: "sneaker", kind: "sneaker", name: "Court Sneaker", size: "10", state: "Incoming" },
  { id: "cap", kind: "cap", name: "Five-Panel Cap", size: "OS", state: "Secured" },
];

const SHOWCASE_LIMIT = 3;

export function ClosetDemo() {
  const [filter, setFilter] = useState<Filter>("All");
  const [showcase, setShowcase] = useState<string[]>(["hoodie"]);

  const shown = PIECES.filter((p) => filter === "All" || p.state === filter);

  const toggle = (id: string) =>
    setShowcase((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : cur.length < SHOWCASE_LIMIT ? [...cur, id] : cur
    );

  return (
    <AppFrame label="Closet demo: the pieces you have secured, with a public Showcase">
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

      <div className="flex flex-col gap-[0.875em] px-5 pb-5 pt-[1.125em]">
        <div>
          <p className="app-serif text-[2.125em] text-white">
            Your <span className="text-ice">closet.</span>
          </p>
          <p className="mt-[0.4em] text-[0.875em] leading-[1.4] text-[color:var(--secondary)]">
            Choose up to three pieces for your public Showcase.
          </p>
        </div>

        <div role="group" aria-label="Filter by state" className="flex gap-1 sm:gap-1.5">
          {FILTERS.map((f) => {
            const on = f === filter;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f)}
                className={`h-11 min-w-11 flex-auto cursor-pointer rounded-[8px] px-2 text-[0.75em] font-medium transition-colors duration-150 ease-out sm:px-2.5 ${
                  on ? "bg-white text-black" : "bg-[color:var(--amuted)] text-white"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <AppLabel tone="ink">Public Showcase</AppLabel>
          <AppLabel tone="accent" className="value">
            {showcase.length} / {SHOWCASE_LIMIT}
          </AppLabel>
        </div>

        {/* Held to its full height, so the frame does not change size with the filter. */}
        <div className="min-h-[25.25em]">
          {shown.length === 0 ? (
            <p className="pt-2 text-[0.9375em] leading-[1.4] text-[color:var(--secondary)]">
              No garments currently match this state.
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-3">
              {shown.map((p) => {
                const featured = showcase.includes(p.id);
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      aria-pressed={featured}
                      onClick={() => toggle(p.id)}
                      className="flex w-full cursor-pointer flex-col items-stretch text-left"
                    >
                      <span className="relative block h-[8.25em] overflow-hidden rounded-[12px] border border-white/[0.13] bg-[color:var(--galaxy-deep)] p-2">
                        {/* The name below says what it is; the drawing is decoration here. */}
                        <span aria-hidden="true" className="block h-full w-full">
                          <GarmentGlyph kind={p.kind} label="" />
                        </span>
                        {featured ? (
                          <span className="app-label absolute right-2 top-2 flex h-5 items-center bg-accent px-1.5 text-white">
                            Showcase
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-[0.625em] text-[0.9375em] font-medium leading-[1.2] text-white">
                        {p.name}
                      </span>
                      <span className="app-label mt-1 text-[color:var(--secondary)]">Size {p.size}</span>
                      <span className="app-label mt-1 text-[#8f6cf0]">{p.state}</span>
                      <span className="sr-only">
                        {featured ? ". In your Showcase. Tap to remove." : ". Tap to add to your Showcase."}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </AppFrame>
  );
}
