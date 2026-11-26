"use client";

import React, { useEffect, useState } from "react";
import { LAUNCH_TARGET_MS } from "@/lib/waitlist";

interface TimeParts {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export interface HorizonCountdownProps {
  /** Ref for the horizontal Horizon Strip layer (bottom `pin=0` & top dome `pin=1`) */
  stripRef?: React.RefObject<HTMLDivElement | null>;
  /** Ref for the Space-Filling Polar Chronograph layer (full `#000000` black hole void) */
  polarRef?: React.RefObject<HTMLDivElement | null>;
  /** Retained as optional prop for caller compatibility */
  revealed?: boolean;
  /** Retained as optional prop for caller compatibility */
  instant?: boolean;
}

function pad2(n: number): string {
  return String(Math.max(0, Math.floor(n))).padStart(2, "0");
}

function padDays(n: number): string {
  const v = Math.max(0, Math.floor(n));
  return v >= 100 ? String(v) : String(v).padStart(2, "0");
}

function computeParts(nowMs: number): TimeParts {
  const diff = Math.max(0, LAUNCH_TARGET_MS - nowMs);
  const totalSec = Math.floor(diff / 1000);
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return {
    days: padDays(d),
    hours: pad2(h),
    minutes: pad2(m),
    seconds: pad2(s),
  };
}

/**
 * Integrated Black Hole Horizon Countdown (Zero-Blur Dual-Mode Morph):
 * - Layer A (`stripRef`): Exact horizontal strip preserved for bottom horizon (`pin=0`)
 *   and top-pinned dome (`pin=1`), rendered at native crisp `Geist` (`scale <= 1.0`).
 * - Layer B (`polarRef`): Monumental Space-Filling Circular Chronograph rendered at
 *   large native pixel size and scaled down (`scale <= 1.0`) to fill ~82% of the pure
 *   `#000000` polar black hole void with zero softness on any screen.
 */
export function HorizonCountdown({
  stripRef,
  polarRef,
}: HorizonCountdownProps = {}) {
  const [parts, setParts] = useState<TimeParts>({
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--",
  });

  useEffect(() => {
    const update = () => {
      setParts(computeParts(Date.now()));
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  const stripUnits = [
    { value: parts.days, label: "D" },
    { value: parts.hours, label: "H" },
    { value: parts.minutes, label: "M" },
    { value: parts.seconds, label: "S" },
  ];

  const polarSubUnits = [
    { value: parts.hours, label: "H" },
    { value: parts.minutes, label: "M" },
    { value: parts.seconds, label: "S" },
  ];

  return (
    <div
      role="timer"
      aria-live="off"
      aria-label="Countdown to T-minus App Store v1.0 launch on January 1, 2027"
      className="relative flex items-center justify-center select-none whitespace-nowrap"
    >
      {/* Layer A: Horizon Strip (Bottom Rest & Top Dome — Exact Proportions Preserved) */}
      <div
        ref={stripRef}
        data-countdown-mode="strip"
        className="flex flex-col items-center gap-1.5 will-change-transform sm:gap-2"
      >
        <div className="flex items-baseline gap-3.5 whitespace-nowrap font-sans text-[26px] leading-none font-semibold tracking-[-0.03em] text-white tabular-nums sm:gap-7 sm:text-[36px]">
          {stripUnits.map((unit) => (
            <span
              key={unit.label}
              className="inline-flex items-baseline gap-1 sm:gap-1.5"
            >
              <span>{unit.value}</span>
              <span className="font-mono text-[11px] font-normal tracking-[0.06em] text-[#858AE3] sm:text-[13px]">
                {unit.label}
              </span>
            </span>
          ))}
        </div>

        <div
          data-countdown-label="true"
          className="whitespace-nowrap font-mono text-[9.5px] font-normal tracking-[0.12em] text-[#858AE3]/90 uppercase sm:text-[11.5px] sm:tracking-[0.18em]"
        >
          APP STORE V1.0 · JAN 1, 2027
        </div>
      </div>

      {/* Layer B: Space-Filling Polar Chronograph (Fills ~82% of the #000000 Circular Core) */}
      <div
        ref={polarRef}
        data-countdown-mode="polar"
        style={{ opacity: 0, transform: "translate(-50%, -50%) scale(0.84)" }}
        className="pointer-events-none absolute top-1/2 left-1/2 flex w-[264px] flex-col items-center text-center will-change-transform sm:w-[410px]"
      >
        <span className="font-mono text-[9.5px] font-medium tracking-[0.24em] text-[#97DFFC] uppercase sm:text-[11.5px]">
          LAUNCHING IN
        </span>

        {/* Monumental DAYS Centerpiece spanning the black hole equator */}
        <div className="mt-1.5 flex items-baseline justify-center gap-2 sm:mt-2.5 sm:gap-3">
          <span className="font-sans text-[78px] leading-[0.86] font-semibold tracking-[-0.05em] text-white tabular-nums sm:text-[128px]">
            {parts.days}
          </span>
          <span className="font-mono text-[12px] font-medium tracking-[0.16em] text-[#97DFFC] uppercase sm:text-[17px]">
            DAYS
          </span>
        </div>

        {/* Crisp Architectural Hairline Divider */}
        <div
          aria-hidden="true"
          className="my-2.5 h-px w-[72%] bg-gradient-to-r from-transparent via-[#858AE3]/45 to-transparent sm:my-4"
        />

        {/* Bold Secondary H · M · S Row */}
        <div className="flex items-baseline justify-center gap-4 font-sans text-[24px] leading-none font-medium tracking-[-0.025em] text-white tabular-nums sm:gap-7 sm:text-[40px]">
          {polarSubUnits.map((unit) => (
            <span
              key={unit.label}
              className="inline-flex items-baseline gap-1 sm:gap-1.5"
            >
              <span>{unit.value}</span>
              <span className="font-mono text-[10px] font-normal tracking-[0.08em] text-[#858AE3] sm:text-[14px]">
                {unit.label}
              </span>
            </span>
          ))}
        </div>

        {/* Bottom Archival Launch Stamp */}
        <div className="mt-2.5 font-mono text-[9px] font-normal tracking-[0.16em] text-[#858AE3]/88 uppercase sm:mt-4 sm:text-[11.5px] sm:tracking-[0.2em]">
          APP STORE V1.0 · JAN 1, 2027
        </div>
      </div>
    </div>
  );
}
