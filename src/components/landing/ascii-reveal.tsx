"use client";

import React, { useEffect, useMemo, useState } from "react";

/**
 * Strict locked ASCII glyph vocabulary (`^ - t + = T *`).
 */
const REVEAL_GLYPHS = ["^", "-", "t", "+", "=", "T", "*"] as const;

interface AsciiRevealTextProps {
  text: string;
  /** Starts the organic ASCII -> typography resolve when true */
  active: boolean;
  /** Bypass animation completely (used for `?skipIntro=1` and reduced-motion) */
  instant?: boolean;
  /** Wave sweep origin: left-to-right or symmetric center-outward */
  origin?: "left" | "center";
  /** Delay in ms after `active` flips true before the wave begins */
  delayMs?: number;
  /** Total wave sweep duration in ms */
  durationMs?: number;
  /** Optional class applied to the temporary resolving ASCII glyph */
  glyphClassName?: string;
  className?: string;
}

function deterministicGlyph(index: number, tick: number): string {
  const hash = (index * 37 + tick * 13 + 7) % REVEAL_GLYPHS.length;
  return REVEAL_GLYPHS[hash];
}

/**
 * Zero-jitter ASCII materialization for post-resolve hero copy:
 * - Reserves each character's exact final width so typography never shifts.
 * - Swaps to plain native text once resolved for crisp kerning & selection.
 */
export function AsciiRevealText({
  text,
  active,
  instant = false,
  origin = "left",
  delayMs = 0,
  durationMs = 760,
  glyphClassName = "text-[#858AE3]",
  className = "",
}: AsciiRevealTextProps) {
  const chars = useMemo(() => Array.from(text), [text]);
  const [resolved, setResolved] = useState(instant);
  const [phase, setPhase] = useState<{ progress: number; tick: number }>({
    progress: instant ? 1 : 0,
    tick: 0,
  });

  useEffect(() => {
    if (instant) {
      setResolved(true);
      return;
    }

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setResolved(true);
      return;
    }

    if (!active) {
      setResolved(false);
      setPhase({ progress: 0, tick: 0 });
      return;
    }

    let rafId = 0;
    let startTs = 0;
    let lastTickTs = 0;
    let tickCount = 0;

    const timer = window.setTimeout(() => {
      startTs = performance.now();
      lastTickTs = startTs;

      const step = (ts: number) => {
        const elapsed = ts - startTs;
        const p = Math.min(1, elapsed / Math.max(120, durationMs));

        if (ts - lastTickTs >= 52 || p >= 1) {
          lastTickTs = ts;
          tickCount += 1;
          setPhase({ progress: p, tick: tickCount });
        }

        if (p < 1) {
          rafId = window.requestAnimationFrame(step);
        } else {
          setResolved(true);
        }
      };

      rafId = window.requestAnimationFrame(step);
    }, delayMs);

    return () => {
      window.clearTimeout(timer);
      window.cancelAnimationFrame(rafId);
    };
  }, [active, instant, delayMs, durationMs]);

  if (resolved) {
    return <span className={className}>{text}</span>;
  }

  if (!active) {
    return (
      <span aria-label={text} className={className}>
        <span aria-hidden="true" className="opacity-0">
          {text}
        </span>
      </span>
    );
  }

  const total = Math.max(1, chars.length);
  const mid = (total - 1) * 0.5;
  const maxDist = Math.max(0.5, mid);

  return (
    <span aria-label={text} className={className}>
      {chars.map((ch, idx) => {
        if (ch === " ") {
          return <React.Fragment key={idx}> </React.Fragment>;
        }

        const normPos =
          origin === "center"
            ? Math.abs(idx - mid) / maxDist
            : idx / total;

        const slotStart = normPos * (origin === "center" ? 0.54 : 0.62);
        const slotSpan = origin === "center" ? 0.42 : 0.36;
        const slotEnd = Math.min(1, slotStart + slotSpan);
        const local =
          (phase.progress - slotStart) / Math.max(0.01, slotEnd - slotStart);

        if (local <= 0) {
          return (
            <span
              key={idx}
              aria-hidden="true"
              className="relative inline-block opacity-0"
            >
              {ch}
            </span>
          );
        }

        if (local >= 1) {
          return (
            <span key={idx} aria-hidden="true" className="relative inline-block">
              {ch}
            </span>
          );
        }

        const g = deterministicGlyph(idx, phase.tick);
        const glyphAlpha = Math.min(1, local * 1.45);

        return (
          <span key={idx} aria-hidden="true" className="relative inline-block">
            <span className="opacity-0">{ch}</span>
            <span
              style={{ opacity: glyphAlpha }}
              className={`pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-[0.74em] font-normal ${glyphClassName}`}
            >
              {g}
            </span>
          </span>
        );
      })}
    </span>
  );
}
