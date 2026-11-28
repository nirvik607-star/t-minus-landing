"use client";

import React, { useEffect, useState } from "react";
import {
  GARMENT_KINDS,
  GarmentGlyph,
  garmentColumns,
  layoutGarment,
  type GarmentKind,
} from "@/components/demos/garment-glyph";

/**
 * Every garment at three sizes: the hold demo's thumbnail, a closet tile and
 * the drop stage. Under each is the measured share of cells that are the
 * letter T, in either case. Not linked from the site.
 */
const SIZES = [320, 160, 60] as const;

function Mix({ kind, size }: { kind: GarmentKind; size: number }) {
  const [text, setText] = useState("");
  useEffect(() => {
    const { mix, cols, rows } = layoutGarment(kind, garmentColumns(size * 0.96));
    const share = (n: number) => `${((n / mix.total) * 100).toFixed(1)}%`;
    setText(
      `${cols}x${rows}, ${mix.total} cells, T+t ${share(mix.upper + mix.lower)} (T ${share(mix.upper)}, t ${share(mix.lower)}), marks ${share(mix.marks)}`
    );
  }, [kind, size]);
  return (
    <span data-mix={`${kind}-${size}`} className="font-mono text-[11px] leading-[1.3] text-white/60">
      {size}px: {text}
    </span>
  );
}

export default function Page() {
  return (
    <div className="min-h-[100dvh] bg-[#13021D] p-6">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(620px,1fr))] gap-6">
        {GARMENT_KINDS.map((kind) => (
          <section key={kind} data-kind={kind} className="flex flex-col gap-3 bg-[#13021D] p-3">
            <div className="flex items-end gap-5">
              {SIZES.map((size) => (
                <div
                  key={size}
                  className="shrink-0 rounded-[12px] border border-white/15 bg-[#13021D]"
                  style={{ width: size, height: size }}
                >
                  <GarmentGlyph kind={kind} label={`${kind}, drawn in glyphs`} />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-white">{kind}</span>
              {SIZES.map((size) => (
                <Mix key={size} kind={kind} size={size} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
