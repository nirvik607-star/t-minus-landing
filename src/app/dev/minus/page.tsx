"use client";

import React from "react";
import { TWord, type TWordVariant } from "@/components/glyph/t-word";

const VARIANTS: Array<{ id: TWordVariant; name: string }> = [
  { id: "lattice", name: "A  Lattice: the word is nothing but T's" },
  { id: "monogram", name: "B  Monogram: purple letters printed with T and minus" },
  { id: "jacquard", name: "C  Jacquard: white letters, T's woven in tone on tone" },
];

/** Design review only: three ways to build MINUS from T's, in the hero's own lockup. */
export default function MinusLab() {
  return (
    <main className="min-h-screen bg-ground px-[4vw] py-8 text-ink">
      {VARIANTS.map((v) => (
        <section key={v.id} data-variant={v.id} className="mx-auto mb-10 w-full max-w-[1180px]">
          <p className="mb-3 font-sans text-[13px] text-mute">{v.name}</p>
          <div className="flex flex-col">
            <span className="statement self-start text-[clamp(1.9rem,3.5vw,3.3rem)] leading-[1] text-ink">Fashion.</span>
            <TWord
              text="MINUS"
              variant={v.id}
              label="minus"
              className={`my-1 w-full sm:h-[calc(min(92vw,1180px)/4.7)] ${
                v.id === "lattice" ? "h-[calc(92vw/2.9)]" : "h-[calc(92vw/4.2)]"
              }`}
            />
            <span className="statement self-end text-[clamp(1.9rem,3.5vw,3.3rem)] leading-[1] text-ink">the Noise.</span>
          </div>
        </section>
      ))}
    </main>
  );
}
