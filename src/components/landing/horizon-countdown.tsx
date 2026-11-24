"use client";

import React, { useEffect, useState } from "react";
import { LAUNCH_TARGET_MS } from "@/lib/waitlist";
import { AsciiRevealText } from "@/components/landing/ascii-reveal";

interface TimeParts {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
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
 * Ambient ASCII pulse characters strictly from the locked vocabulary (`^ - t + = T *`).
 */
const PULSE_GLYPHS = ["^", "-", "t", "+", "=", "T", "*"] as const;

interface HorizonCountdownProps {
  /** Triggers organic ASCII materialization when the black hole settles */
  revealed?: boolean;
  /** Skip materialization animation (`?skipIntro=1`) */
  instant?: boolean;
}

/**
 * Integrated Black Hole Horizon Countdown:
 * - Single-character unit labels (`37 D   09 H   34 M   25 S`) — zero `:`, zero `·`
 * - Slightly larger tabular numerals centered inside the pure `#000000` event horizon core
 * - `APP STORE V1.0 - JAN 1, 2027` label (no blue dot, no `·`)
 * - Rides inside the single WebGL2 black hole core from bottom horizon to top-pinned dome.
 */
export function HorizonCountdown({
  revealed = true,
  instant = true,
}: HorizonCountdownProps) {
  const [parts, setParts] = useState<TimeParts>({
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--",
  });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const update = () => {
      setParts(computeParts(Date.now()));
      setTick((t) => (t + 1) % PULSE_GLYPHS.length);
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

  const leftGlyph = PULSE_GLYPHS[tick % PULSE_GLYPHS.length];
  const rightGlyph = PULSE_GLYPHS[(tick + 3) % PULSE_GLYPHS.length];

  return (
    <div
      role="timer"
      aria-live="off"
      aria-label="Countdown to T-minus App Store v1.0 launch on January 1, 2027"
      className="flex flex-col items-center gap-2 select-none"
    >
      <div className="flex items-center gap-3.5 sm:gap-5">
        <span
          aria-hidden="true"
          className="hidden font-mono text-[13px] font-medium text-[#858AE3]/65 sm:inline"
        >
          {leftGlyph}
        </span>

        <div className="flex items-baseline gap-4 font-sans text-[27px] leading-none font-semibold tracking-[-0.025em] text-white tabular-nums sm:gap-7 sm:text-[36px]">
          {units.map((unit, idx) => (
            <span
              key={unit.label}
              className="inline-flex items-baseline gap-1 sm:gap-1.5"
            >
              <span className="drop-shadow-[0_0_18px_rgba(97,61,193,0.45)]">
                <AsciiRevealText
                  text={unit.value}
                  active={revealed}
                  instant={instant}
                  delayMs={idx * 75}
                  durationMs={520}
                  glyphClassName="text-[#858AE3]"
                />
              </span>
              <span className="font-mono text-[11.5px] font-medium tracking-[0.06em] text-[#858AE3] sm:text-[13.5px]">
                {unit.label}
              </span>
            </span>
          ))}
        </div>

        <span
          aria-hidden="true"
          className="hidden font-mono text-[13px] font-medium text-[#858AE3]/65 sm:inline"
        >
          {rightGlyph}
        </span>
      </div>

      <div className="font-mono text-[10.5px] font-medium tracking-[0.18em] text-[#858AE3]/90 uppercase sm:text-[12px]">
        <AsciiRevealText
          text="APP STORE V1.0 - JAN 1, 2027"
          active={revealed}
          instant={instant}
          delayMs={220}
          durationMs={620}
          glyphClassName="text-[#613DC1]"
        />
      </div>
    </div>
  );
}
