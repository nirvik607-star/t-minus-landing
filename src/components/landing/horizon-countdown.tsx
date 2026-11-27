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
  /** Ref for the bottom launch-date subline (fades out cleanly when docked into the top dome) */
  stripSublineRef?: React.RefObject<HTMLDivElement | null>;
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
 * - Synchronized 1:1 with the UTC `(LAUNCH_TARGET_MS - Date.now())` second boundary.
 * - Layer A (`stripRef`): 4-column architectural horizon strip (Option 2A) for bottom
 *   horizon (`pin=0`) and enlarged docked top dome (`pin=1`).
 * - Layer B (`polarRef`): Enlarged space-filling circular chronograph inside the pure
 *   `#000000` polar black hole void (bezel-free, Option B2).
 */
export function HorizonCountdown({
  stripRef,
  stripSublineRef,
  polarRef,
}: HorizonCountdownProps = {}) {
  const [parts, setParts] = useState<TimeParts>({
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--",
  });

  useEffect(() => {
    let timerId = 0;
    let disposed = false;

    const tick = () => {
      if (disposed) return;
      const nowMs = Date.now();
      const remMs = Math.max(0, LAUNCH_TARGET_MS - nowMs);
      const edgeWholeSec = Math.floor(remMs / 1000);
      const next = computeParts(nowMs);
      setParts(next);

      if (typeof window !== "undefined") {
        (window as unknown as Record<string, unknown>).__TMINUS_COUNTDOWN_SYNC__ =
          {
            lastFlipNowMs: nowMs,
            lastFlipPerfMs: performance.now(),
            remMs,
            edgeWholeSec,
            elapsedSinceEdgeMs: remMs > 0 ? 999 - (remMs % 1000) : 0,
            seconds: next.seconds,
          };
      }

      // Align next update strictly to the exact UTC second-decrement edge (+4ms guard)
      const msUntilNextFlip = remMs > 0 ? (remMs % 1000) + 4 : 1000;
      timerId = window.setTimeout(tick, msUntilNextFlip);
    };

    tick();
    return () => {
      disposed = true;
      window.clearTimeout(timerId);
    };
  }, []);

  const stripUnits = [
    { value: parts.days, label: "DAYS" },
    { value: parts.hours, label: "HRS" },
    { value: parts.minutes, label: "MIN" },
    { value: parts.seconds, label: "SEC" },
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
      {/* Layer A: Option 2A 4-Column Architectural Strip (Bottom Rest & Enlarged Top Dome) */}
      <div
        ref={stripRef}
        data-countdown-mode="strip"
        className="relative flex flex-col items-center will-change-transform"
      >
        <div className="flex items-center whitespace-nowrap">
          {stripUnits.map((unit, idx) => (
            <React.Fragment key={unit.label}>
              {idx > 0 ? (
                <span
                  aria-hidden="true"
                  className="h-7 w-px bg-[#858AE3]/26 sm:h-10"
                />
              ) : null}
              <span className="flex flex-col items-center px-2.5 sm:px-6">
                <span className="min-w-[2ch] text-center font-heading text-[32px] leading-[0.94] font-semibold tracking-[-0.035em] text-white tabular-nums sm:text-[44px]">
                  {unit.value}
                </span>
                <span className="mt-1 font-mono text-[9px] leading-none font-medium tracking-[0.16em] text-[#9EA3EE] uppercase sm:mt-1.5 sm:text-[10px]">
                  {unit.label}
                </span>
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Grounding hairline + launch stamp (positioned cleanly beneath the 4-col center so docked digits stay optically centered) */}
        <div
          ref={stripSublineRef}
          data-countdown-subline="true"
          className="pointer-events-none absolute top-full left-1/2 flex -translate-x-1/2 flex-col items-center pt-2 will-change-[opacity] sm:pt-2.5"
        >
          <div
            aria-hidden="true"
            className="mb-1.5 h-px w-44 bg-gradient-to-r from-transparent via-[#858AE3]/38 to-transparent sm:mb-2 sm:w-72"
          />
          <div
            data-countdown-label="true"
            className="whitespace-nowrap font-mono text-[9px] leading-none font-medium tracking-[0.14em] text-[#A2A7F0] uppercase sm:text-[10.5px] sm:tracking-[0.2em]"
          >
            APP STORE V1.0 · JAN 1, 2027
          </div>
        </div>
      </div>

      {/* Layer B: Enlarged Space-Filling Polar Chronograph (Bezel-Free inside #000000 Polar Void) */}
      <div
        ref={polarRef}
        data-countdown-mode="polar"
        style={{ opacity: 0, transform: "translate(-50%, -50%) scale(0.86)" }}
        className="pointer-events-none absolute top-1/2 left-1/2 flex w-[290px] flex-col items-center text-center will-change-transform sm:w-[460px]"
      >
        <span className="font-mono text-[11px] font-medium tracking-[0.24em] text-[#97DFFC] uppercase sm:text-[13px]">
          LAUNCHING IN
        </span>

        {/* Monumental DAYS Centerpiece spanning the black hole equator */}
        <div className="mt-1.5 flex items-baseline justify-center gap-2 sm:mt-2.5 sm:gap-3.5">
          <span className="font-heading text-[92px] leading-[0.86] font-semibold tracking-[-0.045em] text-white tabular-nums sm:text-[152px]">
            {parts.days}
          </span>
          <span className="font-mono text-[14px] font-medium tracking-[0.16em] text-[#97DFFC] uppercase sm:text-[19px]">
            DAYS
          </span>
        </div>

        {/* Crisp Architectural Hairline Divider */}
        <div
          aria-hidden="true"
          className="my-3 h-px w-[76%] bg-gradient-to-r from-transparent via-[#858AE3]/55 to-transparent sm:my-4.5"
        />

        {/* Bold Secondary H · M · S Row */}
        <div className="flex items-baseline justify-center gap-4.5 font-heading text-[28px] leading-none font-semibold tracking-[-0.025em] text-white tabular-nums sm:gap-8 sm:text-[46px]">
          {polarSubUnits.map((unit) => (
            <span
              key={unit.label}
              className="inline-flex items-baseline gap-1 sm:gap-1.5"
            >
              <span className="inline-block min-w-[2ch] text-right">
                {unit.value}
              </span>
              <span className="font-mono text-[11px] font-medium tracking-[0.08em] text-[#9EA3EE] sm:text-[15px]">
                {unit.label}
              </span>
            </span>
          ))}
        </div>

        {/* Bottom Archival Launch Stamp */}
        <div className="mt-3 font-mono text-[10px] font-medium tracking-[0.16em] text-[#A2A7F0] uppercase sm:mt-4.5 sm:text-[12px] sm:tracking-[0.2em]">
          APP STORE V1.0 · JAN 1, 2027
        </div>
      </div>
    </div>
  );
}
