"use client";

import { GarmentGlyph, type GarmentKind } from "@/components/demos/garment-glyph";

const KINDS: GarmentKind[] = ["shell", "jacket", "vest", "trouser", "tote", "liner", "overshirt"];

export default function Page() {
  return (
    <div className="grid min-h-[100dvh] grid-cols-4 gap-4 bg-ground p-6">
      {KINDS.map((k) => (
        <div key={k} className="h-[300px] rounded-[12px] border border-white/15 bg-[#13021D]">
          <GarmentGlyph kind={k} label={k} />
        </div>
      ))}
    </div>
  );
}
