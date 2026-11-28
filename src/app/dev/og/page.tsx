"use client";

import React, { useRef } from "react";
import { BlackholeScene } from "@/components/scene/blackhole-scene";
import { TMinusWordmark } from "@/components/landing/t-minus-wordmark";

/** Composition for the social preview image. Rendered at 1200x630 and saved to public/og.png. */
export default function OgPage() {
  const runwayRef = useRef<HTMLDivElement | null>(null);
  const closingRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-ground text-ink">
      <BlackholeScene runwayRef={runwayRef} closingRef={closingRef} />
      <div ref={runwayRef} className="hidden" />
      <div ref={closingRef} className="hidden" />
      <div className="absolute left-[56px] top-[46px] z-10">
        <TMinusWordmark className="[--wm-scale:2.1]" />
      </div>
      <div className="absolute bottom-[44px] left-[56px] z-10">
        <p className="statement text-[58px] leading-[1] text-ink">Fashion, minus the noise.</p>
        <p className="mt-4 text-[25px] leading-[1.3] text-soft">
          Limited drops from independent brands, on one live clock.
        </p>
      </div>
      <p className="absolute right-[56px] top-[58px] z-10 text-[22px] font-medium text-soft">
        On the App Store January 1, 2027
      </p>
    </div>
  );
}
