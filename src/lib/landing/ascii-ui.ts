"use client";

import { useEffect, useState } from "react";

/**
 * Strict T^minus ASCII UI Glyph Vocabulary (Locked Step 3 Constraint #3).
 * Exclusively uses the original black hole shader ramp (" .:-^tT"):
 * unrecognizable quiet symbol strokes where only `T` visually resolves.
 * Zero noisy slashes, stars, or cluttered punctuation.
 */
export const STRICT_ASCII_RAMP = " .:-^tT" as const;
export const NOISE_GLYPHS = [".", ":", "-", "^", "t"] as const;

/** Deterministic hash (0..1) for stable, jitter-free glyph fields. */
export function hash2D(x: number, y: number, seed = 0): number {
  const n = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453123;
  return n - Math.floor(n);
}

/**
 * Shared 12fps throttled clock for subtle ASCII UI micro-shimmers.
 * Automatically pauses when the document tab is hidden or under
 * `prefers-reduced-motion: reduce` so mobile Safari / TikTok WebView stays at 60fps.
 */
type TickListener = (tick: number) => void;
const listeners = new Set<TickListener>();
let sharedTick = 0;
let timerId: number | null = null;
let visibilityBound = false;

function startTicker() {
  if (timerId !== null || typeof window === "undefined") return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  if (!visibilityBound) {
    visibilityBound = true;
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopTicker();
      } else if (listeners.size > 0) {
        startTicker();
      }
    });
  }

  if (document.hidden) return;
  timerId = window.setInterval(() => {
    sharedTick = (sharedTick + 1) % 100000;
    for (const cb of listeners) cb(sharedTick);
  }, 84); // ~12fps quiet clock cadence
}

function stopTicker() {
  if (timerId !== null) {
    window.clearInterval(timerId);
    timerId = null;
  }
}

export function useThrottledAsciiTick(enabled: boolean): number {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const listener: TickListener = (next) => setTick(next);
    listeners.add(listener);
    startTicker();

    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) stopTicker();
    };
  }, [enabled]);

  return tick;
}

/**
 * Fixed-character-count ASCII scramble hook (`" .:-^tT"` only).
 * Every intermediate frame has the EXACT same character length as `target`,
 * guaranteeing zero layout shift / zero text reflow.
 */
export function useAsciiDecode(
  target: string,
  triggerKey: string | number,
  durationMs = 280
): string {
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (typeof window === "undefined") {
      setDisplay(target);
      return;
    }
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target);
      return;
    }

    const totalFrames = Math.max(4, Math.round(durationMs / 40)); // ~25fps short burst
    let frame = 0;

    const id = window.setInterval(() => {
      frame += 1;
      const progress = Math.min(1, frame / totalFrames);
      if (progress >= 1) {
        setDisplay(target);
        window.clearInterval(id);
        return;
      }

      const len = target.length;
      let out = "";
      for (let i = 0; i < len; i++) {
        const ch = target[i];
        // Preserve whitespace and punctuation anchors to prevent any kerning jitter
        if (ch === " " || ch === ":" || ch === "·" || ch === ".") {
          out += ch;
          continue;
        }
        const revealAt = (i / Math.max(1, len)) * 0.72 + 0.14;
        if (progress >= revealAt) {
          out += ch;
        } else {
          const r = hash2D(i + 1, frame + 7, len);
          out += r > 0.84 ? "T" : NOISE_GLYPHS[Math.floor(r * NOISE_GLYPHS.length)];
        }
      }
      setDisplay(out);
    }, 40);

    return () => window.clearInterval(id);
  }, [target, triggerKey, durationMs]);

  return display;
}

export interface AsciiCell {
  ch: string;
  isT: boolean;
}

/**
 * Build a fixed-length (" .:-^tT") signal strip with rhythmic `T` anchors.
 * Length is strictly constant (`count` ch) for zero reflow.
 */
export function buildSignalStrip(
  count: number,
  tick: number,
  anchorIndices: number[],
  active: boolean
): AsciiCell[] {
  const anchors = new Set(anchorIndices);
  const cells: AsciiCell[] = [];

  for (let i = 0; i < count; i++) {
    if (anchors.has(i)) {
      cells.push({ ch: "T", isT: true });
      continue;
    }
    const wave = hash2D(i, active ? Math.floor(tick / 2) : Math.floor(tick / 6), 19);
    // Occasional resolved T pulse on active state while keeping surrounding field quiet
    if (active && wave > 0.91) {
      cells.push({ ch: "T", isT: true });
    } else if (wave < 0.24) {
      cells.push({ ch: " ", isT: false });
    } else {
      const idx = Math.min(
        NOISE_GLYPHS.length - 1,
        Math.floor(((wave - 0.24) / 0.76) * NOISE_GLYPHS.length)
      );
      cells.push({ ch: NOISE_GLYPHS[idx], isT: false });
    }
  }
  return cells;
}

/**
 * Build a fixed-width corner rail (always exact `len` characters) that ripples
 * through `" .:-^tT"` and locks its terminal `T` in `#97DFFC` when active.
 */
export function buildCornerRail(
  side: "left" | "right",
  active: boolean,
  tick: number
): AsciiCell[] {
  // Always exactly 7 characters: e.g. ".:-^t T" (left) or "T t^-:." (right)
  const restLeft = [".", ":", "-", " ", "^", " ", "T"];
  const activeLeft = [":", "-", "^", "t", " ", "T", "T"];
  const base = active ? activeLeft : restLeft;

  const seq = base.map((ch, idx) => {
    if (ch === "T") return { ch: "T", isT: true };
    if (ch === " ") return { ch: " ", isT: false };
    const r = hash2D(idx + 3, Math.floor(tick / (active ? 2 : 7)), side === "left" ? 3 : 11);
    if (active && r > 0.78) {
      return { ch: NOISE_GLYPHS[(idx + tick) % NOISE_GLYPHS.length], isT: false };
    }
    return { ch: r > 0.86 ? NOISE_GLYPHS[Math.floor(r * NOISE_GLYPHS.length)] : ch, isT: false };
  });

  return side === "left" ? seq : [...seq].reverse();
}
