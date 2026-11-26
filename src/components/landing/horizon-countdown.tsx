"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { LAUNCH_TARGET_MS } from "@/lib/waitlist";

interface TimeParts {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export interface PolarBezelControl {
  update: (params: {
    polarFactor: number;
    polarDiameterPx: number;
    scrollAzimDeg: number;
    tickPulse: number;
  }) => void;
}

export interface HorizonCountdownProps {
  /** Ref for the horizontal Horizon Strip layer (bottom `pin=0` & top dome `pin=1`) */
  stripRef?: React.RefObject<HTMLDivElement | null>;
  /** Ref for the Space-Filling Polar Chronograph layer (full `#000000` black hole void) */
  polarRef?: React.RefObject<HTMLDivElement | null>;
  /** Imperative ref so LandingExperience can drive the UI-3 60-tick bezel at 60fps without React re-renders */
  bezelControlRef?: React.MutableRefObject<PolarBezelControl | null>;
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

interface BezelTickGeom {
  idx: number;
  isMajor: boolean;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function buildSixtyTicks(): BezelTickGeom[] {
  const cx = 120;
  const cy = 120;
  const rOuter = 108.5;
  const ticks: BezelTickGeom[] = [];
  for (let i = 0; i < 60; i++) {
    const isMajor = i % 5 === 0;
    const rInner = isMajor ? 100.5 : 104.2;
    const rad = ((i * 6 - 90) * Math.PI) / 180;
    const cosA = Math.cos(rad);
    const sinA = Math.sin(rad);
    ticks.push({
      idx: i,
      isMajor,
      x1: Number((cx + rInner * cosA).toFixed(2)),
      y1: Number((cy + rInner * sinA).toFixed(2)),
      x2: Number((cx + rOuter * cosA).toFixed(2)),
      y2: Number((cy + rOuter * sinA).toFixed(2)),
    });
  }
  return ticks;
}

const OUTER_CARDINALS = [
  { deg: 0, label: "000°" },
  { deg: 90, label: "090°" },
  { deg: 180, label: "180°" },
  { deg: 270, label: "270°" },
] as const;

const OUTER_MINOR_MARKS = Array.from({ length: 12 }, (_, k) => {
  const rad = ((k * 30 - 90) * Math.PI) / 180;
  const cosA = Math.cos(rad);
  const sinA = Math.sin(rad);
  return {
    k,
    x1: Number((120 + 112.5 * cosA).toFixed(2)),
    y1: Number((120 + 112.5 * sinA).toFixed(2)),
    x2: Number((120 + 116.5 * cosA).toFixed(2)),
    y2: Number((120 + 116.5 * sinA).toFixed(2)),
  };
});

/**
 * Integrated Black Hole Horizon Countdown (Zero-Blur Dual-Mode Morph + UI-3 60-Tick Orbital Bezel):
 * - Synchronized 1:1 with the UTC `(LAUNCH_TARGET_MS - Date.now())` second boundary.
 * - Layer A (`stripRef`): Crisp horizontal strip for bottom horizon (`pin=0`) and slim top dome (`pin=1`).
 * - Layer B (`polarRef`): Space-Filling Circular Chronograph inside the `#000000` polar black hole void,
 *   encircled by the razor-sharp 60-tick horological escapement ring + counter-rotating degree bezel.
 */
export function HorizonCountdown({
  stripRef,
  polarRef,
  bezelControlRef,
}: HorizonCountdownProps = {}) {
  const [parts, setParts] = useState<TimeParts>({
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--",
  });

  const bezelWrapperRef = useRef<HTMLDivElement | null>(null);
  const outerRingRef = useRef<SVGGElement | null>(null);
  const meridianNotchRef = useRef<SVGPolygonElement | null>(null);
  const tickRefs = useRef<Array<SVGLineElement | null>>([]);
  const lastBezelStateRef = useRef({
    opacity: "",
    sizePx: -1,
    rotDeg: "",
    activeTick: -1,
    pulseBucket: -1,
  });

  const ticks = useMemo(() => buildSixtyTicks(), []);

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

  // Wire dirty-checked 60fps imperative bezel controller (only active when polarFactor > 0.32)
  useEffect(() => {
    if (!bezelControlRef) return;

    const applyBezelUpdate: PolarBezelControl["update"] = ({
      polarFactor,
      polarDiameterPx,
      scrollAzimDeg,
      tickPulse,
    }) => {
      const wrap = bezelWrapperRef.current;
      if (!wrap) return;
      const cache = lastBezelStateRef.current;

      if (polarFactor <= 0.32) {
        if (cache.opacity !== "0") {
          cache.opacity = "0";
          wrap.style.opacity = "0";
        }
        return;
      }

      const normAlpha = Math.min(1, Math.max(0, (polarFactor - 0.32) / 0.36));
      const smoothAlpha = normAlpha * normAlpha * (3 - 2 * normAlpha);
      const nextOp = smoothAlpha.toFixed(3);
      if (cache.opacity !== nextOp) {
        cache.opacity = nextOp;
        wrap.style.opacity = nextOp;
      }

      // Size bezel dynamically to 94% of the projected `#000000` polar void diameter
      const targetSize = Math.max(152, Math.round(polarDiameterPx * 0.94));
      if (Math.abs(cache.sizePx - targetSize) >= 1) {
        cache.sizePx = targetSize;
        wrap.style.width = `${targetSize}px`;
        wrap.style.height = `${targetSize}px`;
      }

      // Counter-rotate outer degree ring smoothly with orbital scroll azimuth
      const rotStr = `rotate(${(-scrollAzimDeg * 1.15).toFixed(2)} 120 120)`;
      if (outerRingRef.current && cache.rotDeg !== rotStr) {
        cache.rotDeg = rotStr;
        outerRingRef.current.setAttribute("transform", rotStr);
      }

      // Exact UTC second-locked clockwise escapement tick + fading 3-tick trail
      const remMs = Math.max(0, LAUNCH_TARGET_MS - Date.now());
      const curSec = Math.floor(remMs / 1000) % 60;
      const activeIdx = (60 - curSec) % 60;
      const pulseBucket = Math.round(tickPulse * 12);

      if (cache.activeTick !== activeIdx || cache.pulseBucket !== pulseBucket) {
        const prevActive = cache.activeTick;
        cache.activeTick = activeIdx;
        cache.pulseBucket = pulseBucket;

        // Reset previously lit neighborhood cleanly (tick 0 stays hidden beneath T-0 meridian notch)
        const resetIdx = (idx: number) => {
          const el = tickRefs.current[idx];
          if (!el) return;
          if (idx === 0) {
            el.setAttribute("stroke-opacity", "0");
            return;
          }
          const isMajor = idx % 5 === 0;
          el.setAttribute("stroke", "#858AE3");
          el.setAttribute("stroke-opacity", isMajor ? "0.48" : "0.22");
          el.setAttribute("stroke-width", isMajor ? "1.15" : "0.75");
        };

        if (prevActive >= 0 && prevActive !== activeIdx) {
          for (let d = 0; d <= 4; d++) {
            resetIdx((prevActive - d + 60) % 60);
          }
        }

        // Light active second tick + 3-tick fading escapement trail
        const trailSpecs = [
          {
            offset: 0,
            color: "#97DFFC",
            op: (0.88 + 0.12 * tickPulse).toFixed(2),
            wMajor: (1.9 + 0.35 * tickPulse).toFixed(2),
            wMinor: (1.5 + 0.35 * tickPulse).toFixed(2),
          },
          {
            offset: 1,
            color: "#97DFFC",
            op: (0.48 + 0.24 * tickPulse).toFixed(2),
            wMajor: "1.45",
            wMinor: "1.05",
          },
          {
            offset: 2,
            color: "#858AE3",
            op: (0.36 + 0.14 * tickPulse).toFixed(2),
            wMajor: "1.25",
            wMinor: "0.9",
          },
          {
            offset: 3,
            color: "#858AE3",
            op: "0.28",
            wMajor: "1.15",
            wMinor: "0.8",
          },
        ];

        for (const spec of trailSpecs) {
          const tIdx = (activeIdx - spec.offset + 60) % 60;
          if (tIdx === 0) continue;
          const el = tickRefs.current[tIdx];
          if (!el) continue;
          const isMajor = tIdx % 5 === 0;
          el.setAttribute("stroke", spec.color);
          el.setAttribute("stroke-opacity", spec.op);
          el.setAttribute("stroke-width", isMajor ? spec.wMajor : spec.wMinor);
        }

        // Accentuate 12 o'clock T-0 meridian notch when tick hits 0 or pulses
        if (meridianNotchRef.current) {
          const atMeridian = activeIdx === 0;
          meridianNotchRef.current.setAttribute(
            "fill",
            atMeridian ? "#F7FAFF" : "#97DFFC"
          );
          meridianNotchRef.current.setAttribute(
            "fill-opacity",
            atMeridian ? "1" : (0.78 + 0.22 * tickPulse).toFixed(2)
          );
        }
      }
    };

    bezelControlRef.current = { update: applyBezelUpdate };
    return () => {
      if (bezelControlRef.current) {
        bezelControlRef.current = null;
      }
    };
  }, [bezelControlRef]);

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
      {/* Layer A: Horizon Strip (Bottom Rest & Slim Top Dome) */}
      <div
        ref={stripRef}
        data-countdown-mode="strip"
        className="flex flex-col items-center gap-1.5 will-change-transform sm:gap-2"
      >
        <div className="flex items-baseline gap-3.5 whitespace-nowrap font-heading text-[26px] leading-none font-semibold tracking-[-0.03em] text-white tabular-nums sm:gap-7 sm:text-[36px]">
          {stripUnits.map((unit) => (
            <span
              key={unit.label}
              className="inline-flex items-baseline gap-1 sm:gap-1.5"
            >
              <span className="inline-block min-w-[2ch] text-right">
                {unit.value}
              </span>
              <span className="font-mono text-[11px] font-medium tracking-[0.06em] text-[#9EA3EE] sm:text-[13px]">
                {unit.label}
              </span>
            </span>
          ))}
        </div>

        <div
          data-countdown-label="true"
          className="whitespace-nowrap font-mono text-[9.5px] font-medium tracking-[0.13em] text-[#A2A7F0] uppercase sm:text-[11px] sm:tracking-[0.18em]"
        >
          APP STORE V1.0 · JAN 1, 2027
        </div>
      </div>

      {/* UI-3: Horological 60-Tick Orbital Bezel dynamically sized inside #000000 Polar Void */}
      <div
        ref={bezelWrapperRef}
        data-polar-bezel="true"
        aria-hidden="true"
        style={{ opacity: 0, width: "280px", height: "280px" }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-[opacity,width,height]"
      >
        <svg
          viewBox="0 0 240 240"
          shapeRendering="geometricPrecision"
          className="h-full w-full overflow-visible"
        >
          {/* Counter-rotating outer orbital degree ring */}
          <g ref={outerRingRef} data-bezel-outer-ring="true">
            <circle
              cx="120"
              cy="120"
              r="114.5"
              fill="none"
              stroke="#858AE3"
              strokeOpacity="0.24"
              strokeWidth="0.6"
              strokeDasharray="2.5 3.5"
            />
            {OUTER_MINOR_MARKS.map((m) => (
              <line
                key={m.k}
                x1={m.x1}
                y1={m.y1}
                x2={m.x2}
                y2={m.y2}
                stroke="#858AE3"
                strokeOpacity={m.k % 3 === 0 ? "0.52" : "0.24"}
                strokeWidth={m.k % 3 === 0 ? "0.85" : "0.55"}
              />
            ))}
            {OUTER_CARDINALS.map((c) => (
              <text
                key={c.deg}
                x="120"
                y="4.2"
                textAnchor="middle"
                fill="#9EA3EE"
                fillOpacity="0.52"
                fontSize="4.6"
                fontFamily="var(--font-ibm-plex-mono), ui-monospace, monospace"
                letterSpacing="0.08em"
                transform={
                  c.deg === 0 ? undefined : `rotate(${c.deg} 120 120)`
                }
              >
                {c.label}
              </text>
            ))}
          </g>

          {/* Subtle inner containment hairline */}
          <circle
            cx="120"
            cy="120"
            r="98.5"
            fill="none"
            stroke="#858AE3"
            strokeOpacity="0.14"
            strokeWidth="0.55"
          />

          {/* 60 Horological Escapement Ticks (12 Major / 48 Minor) */}
          <g data-bezel-ticks="60">
            {ticks.map((t) => (
              <line
                key={t.idx}
                ref={(el) => {
                  tickRefs.current[t.idx] = el;
                }}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke="#858AE3"
                strokeOpacity={
                  t.idx === 0 ? "0" : t.isMajor ? "0.48" : "0.22"
                }
                strokeWidth={t.isMajor ? "1.15" : "0.75"}
                strokeLinecap="butt"
              />
            ))}
          </g>

          {/* 12 o'clock T-0 Meridian Notch at the top of the 60-tick ring */}
          <polygon
            ref={meridianNotchRef}
            data-bezel-meridian="T-0"
            points="120,20.2 116.8,11.8 123.2,11.8"
            fill="#97DFFC"
            fillOpacity="0.92"
          />
          <text
            x="120"
            y="26.4"
            textAnchor="middle"
            fill="#97DFFC"
            fillOpacity="0.88"
            fontSize="4.7"
            fontWeight="600"
            fontFamily="var(--font-ibm-plex-mono), ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            T-0
          </text>
        </svg>
      </div>

      {/* Layer B: Space-Filling Polar Chronograph (Cleanly framed inside 60-Tick Orbital Bezel) */}
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
          <span className="font-heading text-[78px] leading-[0.86] font-semibold tracking-[-0.045em] text-white tabular-nums sm:text-[128px]">
            {parts.days}
          </span>
          <span className="font-mono text-[12px] font-medium tracking-[0.16em] text-[#97DFFC] uppercase sm:text-[17px]">
            DAYS
          </span>
        </div>

        {/* Crisp Architectural Hairline Divider */}
        <div
          aria-hidden="true"
          className="my-2.5 h-px w-[72%] bg-gradient-to-r from-transparent via-[#858AE3]/55 to-transparent sm:my-4"
        />

        {/* Bold Secondary H · M · S Row */}
        <div className="flex items-baseline justify-center gap-4 font-heading text-[24px] leading-none font-semibold tracking-[-0.025em] text-white tabular-nums sm:gap-7 sm:text-[40px]">
          {polarSubUnits.map((unit) => (
            <span
              key={unit.label}
              className="inline-flex items-baseline gap-1 sm:gap-1.5"
            >
              <span className="inline-block min-w-[2ch] text-right">
                {unit.value}
              </span>
              <span className="font-mono text-[10px] font-medium tracking-[0.08em] text-[#9EA3EE] sm:text-[14px]">
                {unit.label}
              </span>
            </span>
          ))}
        </div>

        {/* Bottom Archival Launch Stamp */}
        <div className="mt-2.5 font-mono text-[9px] font-medium tracking-[0.16em] text-[#A2A7F0] uppercase sm:mt-4 sm:text-[11px] sm:tracking-[0.2em]">
          APP STORE V1.0 · JAN 1, 2027
        </div>
      </div>
    </div>
  );
}
