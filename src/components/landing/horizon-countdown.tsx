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
 * Integrated Black Hole Horizon Countdown:
 * - Pure crisp `#FFFFFF` tabular numerals (zero neon glow, zero flanking pulse glyphs)
 * - Archival `Fragment Mono` single-letter unit labels (`D`, `H`, `M`, `S`)
 * - Single-line `APP STORE V1.0 · JAN 1, 2027` telemetry label (`whitespace-nowrap`)
 * - Rides inside the pure `#000000` 3D black hole core from bottom horizon to top-pinned dome.
 */
export function HorizonCountdown(_props: HorizonCountdownProps = {}) {
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

  const units = [
    { value: parts.days, label: "D" },
    { value: parts.hours, label: "H" },
    { value: parts.minutes, label: "M" },
    { value: parts.seconds, label: "S" },
  ];

  return (
    <div
      role="timer"
      aria-live="off"
      aria-label="Countdown to T-minus App Store v1.0 launch on January 1, 2027"
      className="flex flex-col items-center gap-1.5 select-none whitespace-nowrap sm:gap-2"
    >
      <div className="flex items-baseline gap-3.5 whitespace-nowrap font-sans text-[26px] leading-none font-semibold tracking-[-0.025em] text-white tabular-nums sm:gap-7 sm:text-[36px]">
        {units.map((unit) => (
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
  );
}
