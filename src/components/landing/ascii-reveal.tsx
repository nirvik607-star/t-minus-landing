"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Clean T^minus ASCII crystallization ramp (`.:-^tT`).
 * Zero cluttered `* + =` static; narrow chars use slim subset so glyphs never collide.
 */
const DENSITY_LADDER = [".", ":", "-", "^", "t", "T"] as const;
const NARROW_LADDER = [".", ":", "-", "^", "t"] as const;
const NARROW_CHARS = new Set(["i", "l", "I", ".", ",", "'", "!", ":", ";", "|", "-"]);

interface AsciiRevealTextProps {
  text: string;
  /** Starts the crisp ASCII wavefront materialization when true */
  active: boolean;
  /** Bypass animation completely (used for initial `?skipIntro=1` paint and reduced-motion) */
  instant?: boolean;
  /** Increment to cleanly replay the wavefront on scroll re-entry */
  replayKey?: number;
  /** Wave sweep origin */
  origin?: "left" | "center" | "right";
  /** Delay in ms after `active` flips true before the wave begins */
  delayMs?: number;
  /** Total wave sweep duration in ms */
  durationMs?: number;
  /** Optional class applied to mid-stage crystallizing glyphs */
  glyphClassName?: string;
  /** Optional class applied to the final `#97DFFC` lock-in crest */
  crestClassName?: string;
  className?: string;
}

/**
 * Zero-re-render, kerning-stable ASCII Wavefront Materialization:
 * - Single `requestAnimationFrame` loop mutates character span refs directly
 *   (zero 60fps React `setState` churn and zero per-frame `textShadow` thrash).
 * - Word-grouped spans + `fontKerning: "none"` eliminate horizontal text snap
 *   when resolving to a clean text node, and narrow-character glyphs never overflow.
 * - Optional deterministic QA pin `?revealAt=0.45` freezes mid-wavefront.
 */
export function AsciiRevealText({
  text,
  active,
  instant = false,
  replayKey = 0,
  origin = "left",
  delayMs = 0,
  durationMs = 640,
  glyphClassName = "text-[#858AE3]",
  crestClassName = "text-[#97DFFC]",
  className = "",
}: AsciiRevealTextProps) {
  const { chars, words } = useMemo(() => {
    const arr = Array.from(text);
    const grouped: Array<
      | { type: "space"; key: string }
      | { type: "word"; key: string; items: Array<{ ch: string; idx: number }> }
    > = [];

    let curWord: Array<{ ch: string; idx: number }> = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === " ") {
        if (curWord.length > 0) {
          grouped.push({ type: "word", key: `w-${i}`, items: curWord });
          curWord = [];
        }
        grouped.push({ type: "space", key: `s-${i}` });
      } else {
        curWord.push({ ch: arr[i], idx: i });
      }
    }
    if (curWord.length > 0) {
      grouped.push({ type: "word", key: `w-end`, items: curWord });
    }

    return { chars: arr, words: grouped };
  }, [text]);

  const [resolved, setResolved] = useState(instant && replayKey === 0);
  const nativeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const glyphRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    let pinnedProgress: number | null = null;
    try {
      const qs = new URLSearchParams(window.location.search);
      const raw = qs.get("revealAt");
      if (raw !== null) {
        const parsed = Number(raw);
        if (Number.isFinite(parsed) && parsed > 0 && parsed < 1) {
          pinnedProgress = parsed;
        }
      }
    } catch {
      // ignore
    }

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (pinnedProgress === null && reducedMotion) {
      setResolved(true);
      return;
    }

    if (pinnedProgress === null && instant && replayKey === 0) {
      setResolved(true);
      return;
    }

    const total = Math.max(1, chars.length);
    const mid = (total - 1) * 0.5;
    const maxDist = Math.max(0.5, mid);

    const slotSpan = Math.min(0.42, Math.max(0.24, 4.6 / total));
    const maxStart = 1.0 - slotSpan;

    const applyProgress = (p: number) => {
      for (let idx = 0; idx < chars.length; idx++) {
        const ch = chars[idx];
        if (ch === " ") continue;
        const natEl = nativeRefs.current[idx];
        const glyEl = glyphRefs.current[idx];
        if (!natEl || !glyEl) continue;

        const normPos =
          origin === "center"
            ? Math.abs(idx - mid) / maxDist
            : origin === "right"
              ? (total - 1 - idx) / Math.max(1, total - 1)
              : idx / Math.max(1, total - 1);

        const slotStart = normPos * maxStart;
        const local = (p - slotStart) / Math.max(0.01, slotSpan);

        if (local <= 0) {
          natEl.style.opacity = "0";
          glyEl.style.opacity = "0";
          if (glyEl.textContent !== "") glyEl.textContent = "";
        } else if (local >= 1) {
          natEl.style.opacity = "1";
          glyEl.style.opacity = "0";
          if (glyEl.textContent !== "") glyEl.textContent = "";
        } else {
          const ladder = NARROW_CHARS.has(ch) ? NARROW_LADDER : DENSITY_LADDER;
          const ladderIdx = Math.min(
            ladder.length - 1,
            Math.floor(local * ladder.length)
          );
          const glyph = ladder[ladderIdx];

          // Smooth cross-dissolve on final 20% so there is zero pop
          const lockFade = local > 0.8 ? (local - 0.8) / 0.2 : 0;
          const natAlpha = lockFade;
          const glyAlpha =
            lockFade > 0
              ? Math.max(0, 1 - lockFade * 1.15)
              : Math.min(1, 0.45 + local * 0.72);

          natEl.style.opacity = natAlpha.toFixed(3);
          glyEl.style.opacity = glyAlpha.toFixed(3);
          if (glyEl.textContent !== glyph) {
            glyEl.textContent = glyph;
          }

          // Clean color progression without per-frame textShadow repaints
          const targetColor =
            local >= 0.82
              ? "#F7FAFF"
              : local >= 0.62
                ? "#97DFFC"
                : local >= 0.34
                  ? ""
                  : "#613DC1";
          if (glyEl.style.color !== targetColor) {
            glyEl.style.color = targetColor;
          }
        }
      }
    };

    if (!active && pinnedProgress === null) {
      setResolved(false);
      const id = window.requestAnimationFrame(() => applyProgress(0));
      return () => window.cancelAnimationFrame(id);
    }

    if (pinnedProgress !== null) {
      setResolved(false);
      const id = window.requestAnimationFrame(() => applyProgress(pinnedProgress!));
      return () => window.cancelAnimationFrame(id);
    }

    setResolved(false);
    let rafId = 0;
    let startTs = 0;

    // Zero spans cleanly on the next frame (handles transition from `resolved=true -> false`)
    rafId = window.requestAnimationFrame(() => {
      applyProgress(0);
    });

    const timer = window.setTimeout(() => {
      window.cancelAnimationFrame(rafId);
      startTs = performance.now();

      const step = (ts: number) => {
        const elapsed = ts - startTs;
        const p = Math.min(1, elapsed / Math.max(200, durationMs));
        applyProgress(p);

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
  }, [active, instant, replayKey, origin, delayMs, durationMs, chars]);

  if (resolved) {
    return (
      <span
        data-ascii-reveal="resolved"
        data-ascii-run={replayKey}
        style={{ fontKerning: "none" }}
        className={className}
      >
        {text}
      </span>
    );
  }

  return (
    <span
      aria-label={text}
      data-ascii-reveal={active ? "animating" : "armed"}
      data-ascii-run={replayKey}
      style={{ fontKerning: "none" }}
      className={className}
    >
      {words.map((token) => {
        if (token.type === "space") {
          return <React.Fragment key={token.key}> </React.Fragment>;
        }
        return (
          <span key={token.key} className="inline-block whitespace-nowrap">
            {token.items.map(({ ch, idx }) => (
              <span key={idx} aria-hidden="true" className="relative inline-block">
                <span
                  ref={(el) => {
                    nativeRefs.current[idx] = el;
                  }}
                  style={{ opacity: 0 }}
                >
                  {ch}
                </span>
                <span
                  ref={(el) => {
                    glyphRefs.current[idx] = el;
                  }}
                  style={{ opacity: 0 }}
                  className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden font-mono text-[0.8em] leading-none font-medium ${glyphClassName} ${crestClassName ? "" : ""}`}
                />
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );
}

interface ScrollAsciiRevealProps {
  /** Text content for `telemetry` and `headline` tiers; children for `prose` tier */
  text?: string;
  children?: React.ReactNode;
  tier?: "telemetry" | "headline" | "prose";
  origin?: "left" | "center" | "right";
  instant?: boolean;
  delayMs?: number;
  className?: string;
}

/**
 * Bidirectional IntersectionObserver ASCII materialization:
 * - Triggers whenever an element is uncovered from under the docked top-dome black hole
 *   or from below the viewport, and silently re-arms only once fully cleared past the
 *   docked dome (`bottom <= 84`) or below the fold (`top >= innerHeight + 16`).
 * - Preserves `?skipIntro=1` initial settled load (while still replaying on subsequent
 *   scroll transitions), `?revealAt=...` QA pins, and `prefers-reduced-motion`.
 * - `telemetry`: crisp 540ms wavefront for coordinates & eyebrows
 * - `headline`: crisp 740ms wavefront with `#97DFFC -> #F7FAFF` crest
 * - `prose`: calm 480ms optical rise (never scrambles reading copy)
 */
export function ScrollAsciiReveal({
  text,
  children,
  tier = "headline",
  origin = "left",
  instant = false,
  delayMs = 0,
  className = "",
}: ScrollAsciiRevealProps) {
  const hostRef = useRef<HTMLSpanElement | null>(null);
  const [visible, setVisible] = useState(instant);
  const [playCount, setPlayCount] = useState(0);
  const [hasRevealPin, setHasRevealPin] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const visibleRef = useRef(instant);
  const armedRef = useRef(!instant);

  useEffect(() => {
    try {
      const qs = new URLSearchParams(window.location.search);
      if (qs.get("revealAt") !== null) {
        setHasRevealPin(true);
        visibleRef.current = true;
        setVisible(true);
        return;
      }
    } catch {
      // ignore
    }

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setIsReducedMotion(true);
      visibleRef.current = true;
      setVisible(true);
      return;
    }

    const el = hostRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      visibleRef.current = true;
      setVisible(true);
      return;
    }

    // If loaded with `?skipIntro=1`, keep elements currently visible on-screen settled
    // initially, while arming off-screen below-the-fold elements so scrolling uncovers them cleanly.
    const initRect = el.getBoundingClientRect();
    const initVh = window.innerHeight || 900;
    const initCleared = initRect.bottom <= 84 || initRect.top >= initVh + 16;
    if (initCleared) {
      armedRef.current = true;
      visibleRef.current = false;
      setVisible(false);
    } else if (instant) {
      armedRef.current = false;
      visibleRef.current = true;
      setVisible(true);
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const rect = entry.boundingClientRect;
          const vh = window.innerHeight || 900;

          if (entry.isIntersecting) {
            const largeBlock = rect.height > vh * 0.55;
            if (entry.intersectionRatio >= 0.1 || largeBlock) {
              if (!visibleRef.current) {
                visibleRef.current = true;
                if (armedRef.current) {
                  armedRef.current = false;
                  setPlayCount((n) => n + 1);
                }
                setVisible(true);
              }
            }
          } else {
            // Re-arm strictly once cleared past the docked top-dome veil or below viewport (zero edge flicker)
            const clearedAbove = rect.bottom <= 84;
            const clearedBelow = rect.top >= vh + 16;
            if (clearedAbove || clearedBelow) {
              armedRef.current = true;
              if (visibleRef.current) {
                visibleRef.current = false;
                setVisible(false);
              }
            }
          }
        }
      },
      { threshold: [0, 0.14], rootMargin: "-92px 0px -24px 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [instant]);

  const effectiveInstant =
    hasRevealPin
      ? false
      : isReducedMotion || (instant && playCount === 0);

  if (tier === "prose") {
    return (
      <span
        ref={hostRef}
        data-scroll-reveal-prose={visible ? "visible" : "armed"}
        data-scroll-reveal-run={playCount}
        style={{
          transitionDelay: effectiveInstant || !visible ? "0ms" : `${delayMs}ms`,
        }}
        className={`block transition-all ease-[cubic-bezier(0.22,1,0.36,1)] ${
          visible
            ? "duration-500 translate-y-0 opacity-100"
            : "duration-0 translate-y-2 opacity-0"
        } ${className}`}
      >
        {children ?? text}
      </span>
    );
  }

  const durationMs = tier === "telemetry" ? 540 : 740;

  return (
    <span ref={hostRef} className={className}>
      <AsciiRevealText
        text={text ?? ""}
        active={visible}
        instant={effectiveInstant}
        replayKey={playCount}
        origin={origin}
        delayMs={delayMs}
        durationMs={durationMs}
        glyphClassName={tier === "telemetry" ? "text-[#858AE3]" : "text-[#9EA3EE]"}
        crestClassName="text-[#97DFFC]"
      />
    </span>
  );
}

interface AsciiHorizonRuleProps {
  instant?: boolean;
  /** Subtle upward curve arch for the closing T-Zero bookend */
  variant?: "rule" | "arch";
  className?: string;
}

/**
 * Refined architectural hairline + restrained ASCII horizon calibration rule:
 * - Clean precision horizontal hairline (`1px` subtle `#858AE3/24`) with intentional
 *   corner ticks and a central micro-ASCII focal crest (`.:-^tT`) that materializes
 *   center-outward on every bidirectional scroll uncover without reallocating its canvas.
 */
export function AsciiHorizonRule({
  instant = false,
  variant = "rule",
  className = "",
}: AsciiHorizonRuleProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const monoProbeRef = useRef<HTMLSpanElement | null>(null);
  const [visible, setVisible] = useState(instant);
  const [playCount, setPlayCount] = useState(0);

  const visibleRef = useRef(instant);
  const armedRef = useRef(!instant);
  const controllerRef = useRef<{
    arm: () => void;
    settle: () => void;
    play: () => void;
  } | null>(null);

  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      visibleRef.current = true;
      setVisible(true);
      return;
    }

    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      visibleRef.current = true;
      setVisible(true);
      return;
    }

    const initRect = el.getBoundingClientRect();
    const initVh = window.innerHeight || 900;
    const initCleared = initRect.bottom <= 84 || initRect.top >= initVh + 16;
    if (initCleared) {
      armedRef.current = true;
      visibleRef.current = false;
      setVisible(false);
    } else if (instant) {
      armedRef.current = false;
      visibleRef.current = true;
      setVisible(true);
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const rect = entry.boundingClientRect;
          const vh = window.innerHeight || 900;

          if (entry.isIntersecting) {
            if (!visibleRef.current) {
              visibleRef.current = true;
              if (armedRef.current) {
                armedRef.current = false;
                setPlayCount((n) => n + 1);
              }
              setVisible(true);
            }
          } else {
            const clearedAbove = rect.bottom <= 84;
            const clearedBelow = rect.top >= vh + 16;
            if (clearedAbove || clearedBelow) {
              armedRef.current = true;
              if (visibleRef.current) {
                visibleRef.current = false;
                setVisible(false);
              }
            }
          }
        }
      },
      { threshold: [0, 0.14], rootMargin: "-92px 0px -24px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [instant]);

  // Persistent canvas setup (never reallocates when scrolling up/down)
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cssW = 0;
    let cssH = 0;
    let dpr = 1.5;
    let monoFamily = '"IBM Plex Mono", ui-monospace, SFMono-Regular, monospace';

    let pointerNormX = -10;
    let pointerInfluence = 0;
    let pointerTarget = 0;
    let isVisible = false;
    let settleImmediately = reducedMotion;
    let revealProgress = reducedMotion ? 1 : 0;
    let animStartTs = 0;
    let rafId = 0;
    let running = false;

    const syncSize = () => {
      const rect = container.getBoundingClientRect();
      cssW = Math.max(1, Math.round(rect.width));
      cssH = Math.max(1, Math.round(rect.height));
      dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), 1.5);
      canvas.width = Math.max(1, Math.round(cssW * dpr));
      canvas.height = Math.max(1, Math.round(cssH * dpr));

      if (monoProbeRef.current) {
        monoFamily = window.getComputedStyle(monoProbeRef.current).fontFamily;
      }
    };

    const draw = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!isVisible && !settleImmediately) return;
      if (cssW <= 2 || cssH <= 2) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const centerX = cw * 0.5;
      const baseCenterY = variant === "arch" ? ch * 0.78 : ch * 0.5;
      const archLift = variant === "arch" ? ch * 0.46 : 0;

      // 1) Precision architectural hairline spanning the reveal width
      const spanHalf = centerX * revealProgress;
      const lineGrad = ctx.createLinearGradient(
        centerX - spanHalf,
        0,
        centerX + spanHalf,
        0
      );
      lineGrad.addColorStop(0, "rgba(133, 138, 227, 0.16)");
      lineGrad.addColorStop(0.35, "rgba(133, 138, 227, 0.28)");
      lineGrad.addColorStop(0.5, "rgba(151, 223, 252, 0.45)");
      lineGrad.addColorStop(0.65, "rgba(133, 138, 227, 0.28)");
      lineGrad.addColorStop(1, "rgba(133, 138, 227, 0.16)");

      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = Math.max(1, Math.round(dpr * 0.65));
      ctx.beginPath();
      if (variant === "arch") {
        const steps = 48;
        for (let i = 0; i <= steps; i++) {
          const t = (i / steps) * 2 - 1;
          const x = centerX + t * spanHalf;
          const y =
            baseCenterY -
            archLift * Math.pow(Math.max(0, 1 - t * t), 1.3);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      } else {
        ctx.moveTo(centerX - spanHalf, Math.round(baseCenterY) + 0.5);
        ctx.lineTo(centerX + spanHalf, Math.round(baseCenterY) + 0.5);
      }
      ctx.stroke();

      // 2) Restrained corner & focal ASCII calibration ticks
      const fontPx = Math.max(9, Math.round((cssW < 640 ? 9.5 : 10.5) * dpr));
      ctx.font = `500 ${fontPx}px ${monoFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const cellPxW = Math.max(9, Math.round((cssW < 640 ? 9.5 : 11) * dpr));
      const crestHalfCols = cssW < 640 ? 7 : 11;

      if (revealProgress > 0.85) {
        const edgeAlpha = Math.min(1, (revealProgress - 0.85) / 0.15) * 0.72;
        ctx.fillStyle = "#858AE3";
        ctx.globalAlpha = edgeAlpha;
        ctx.fillText("+", Math.round(5 * dpr), Math.round(baseCenterY));
        ctx.fillText("+", cw - Math.round(5 * dpr), Math.round(baseCenterY));
      }

      for (let dc = -crestHalfCols; dc <= crestHalfCols; dc++) {
        const normFromCenter = Math.abs(dc) / Math.max(1, crestHalfCols);
        const local = Math.min(
          1,
          Math.max(0, (revealProgress - normFromCenter * 0.45) / 0.42)
        );
        if (local <= 0.02) continue;

        const px = Math.round(centerX + dc * cellPxW);
        const colNormX = px / Math.max(1, cw);
        const normAcrossRule = (px - centerX) / Math.max(1, centerX);
        const py =
          variant === "arch"
            ? Math.round(
                baseCenterY -
                  archLift *
                    Math.pow(
                      Math.max(0, 1 - normAcrossRule * normAcrossRule),
                      1.3
                    )
              )
            : Math.round(baseCenterY);

        let wake = 0;
        if (pointerInfluence > 0.005) {
          const d = Math.abs(colNormX - pointerNormX);
          if (d < 0.16) {
            wake = Math.pow(1 - d / 0.16, 1.7) * pointerInfluence;
          }
        }

        const energy = Math.pow(1 - normFromCenter, 1.45);
        let ladderIdx = Math.min(
          DENSITY_LADDER.length - 1,
          Math.floor(energy * (DENSITY_LADDER.length - 0.6))
        );
        if (local < 0.99) {
          ladderIdx = Math.min(
            DENSITY_LADDER.length - 1,
            Math.floor(local * DENSITY_LADDER.length)
          );
        } else if (wake > 0.25) {
          ladderIdx = Math.min(
            DENSITY_LADDER.length - 1,
            ladderIdx + (wake > 0.6 ? 2 : 1)
          );
        }

        ctx.fillStyle = "#040206";
        ctx.globalAlpha = 0.92;
        ctx.fillRect(
          px - Math.floor(cellPxW * 0.48),
          py - Math.floor(fontPx * 0.55),
          Math.ceil(cellPxW * 0.96),
          Math.ceil(fontPx * 1.1)
        );

        const isCenter = Math.abs(dc) <= 1;
        ctx.fillStyle =
          isCenter || wake > 0.35 || (local < 0.99 && ladderIdx >= 4)
            ? "#97DFFC"
            : energy > 0.4
              ? "#9EA3EE"
              : "#613DC1";
        ctx.globalAlpha = Math.min(
          1,
          (0.45 + 0.52 * energy + wake * 0.25) * Math.min(1, local * 1.4)
        );
        ctx.fillText(DENSITY_LADDER[ladderIdx], px, py);
      }

      ctx.globalAlpha = 1;
    };

    const ensureLoop = () => {
      if (running) return;
      running = true;
      let lastTs = performance.now();

      const step = (ts: number) => {
        const dt = Math.min(0.05, Math.max(0.001, (ts - lastTs) * 0.001));
        lastTs = ts;

        if (!settleImmediately && isVisible && revealProgress < 1) {
          if (animStartTs === 0) animStartTs = ts;
          revealProgress = Math.min(1, (ts - animStartTs) / 680);
        }

        pointerInfluence +=
          (pointerTarget - pointerInfluence) * Math.min(1, dt * 11);
        if (Math.abs(pointerTarget - pointerInfluence) < 0.003) {
          pointerInfluence = pointerTarget;
        }

        draw();

        const stillAnimating =
          (!settleImmediately && isVisible && revealProgress < 1) ||
          pointerInfluence > 0.003 ||
          pointerTarget > 0;

        if (stillAnimating) {
          rafId = window.requestAnimationFrame(step);
        } else {
          running = false;
        }
      };

      rafId = window.requestAnimationFrame(step);
    };

    const stopLoop = () => {
      if (!running) return;
      running = false;
      window.cancelAnimationFrame(rafId);
    };

    controllerRef.current = {
      arm: () => {
        if (reducedMotion) return;
        isVisible = false;
        settleImmediately = false;
        revealProgress = 0;
        animStartTs = 0;
        pointerTarget = 0;
        pointerInfluence = 0;
        stopLoop();
        draw();
      },
      settle: () => {
        isVisible = true;
        settleImmediately = true;
        revealProgress = 1;
        animStartTs = 0;
        stopLoop();
        draw();
      },
      play: () => {
        if (reducedMotion) {
          isVisible = true;
          settleImmediately = true;
          revealProgress = 1;
          draw();
          return;
        }
        isVisible = true;
        settleImmediately = false;
        revealProgress = 0;
        animStartTs = 0;
        ensureLoop();
      },
    };

    syncSize();
    if (reducedMotion) {
      draw();
    }

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || reducedMotion) return;
      const rect = container.getBoundingClientRect();
      pointerNormX = (e.clientX - rect.left) / Math.max(1, rect.width);
      pointerTarget = 1;
      ensureLoop();
    };
    const onPointerLeave = () => {
      pointerTarget = 0;
      ensureLoop();
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave, { passive: true });

    const ro = new ResizeObserver(() => {
      syncSize();
      draw();
    });
    ro.observe(container);

    let disposed = false;
    document.fonts?.ready
      .then(() => {
        if (disposed) return;
        syncSize();
        draw();
      })
      .catch(() => {});

    return () => {
      disposed = true;
      controllerRef.current = null;
      stopLoop();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      ro.disconnect();
    };
  }, [variant]);

  // Drive zero-reallocation reveal/reset transitions cleanly
  useEffect(() => {
    const ctrl = controllerRef.current;
    if (!ctrl) return;
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      ctrl.settle();
      return;
    }
    if (!visible) {
      ctrl.arm();
    } else if (instant && playCount === 0) {
      ctrl.settle();
    } else {
      ctrl.play();
    }
  }, [visible, instant, playCount]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      data-horizon-rule={visible ? "visible" : "armed"}
      data-horizon-rule-run={playCount}
      className={`relative w-full select-none ${
        variant === "arch" ? "h-9 sm:h-11" : "h-5 sm:h-6"
      } ${className}`}
    >
      <span
        ref={monoProbeRef}
        aria-hidden="true"
        className="pointer-events-none sr-only font-mono"
      >
        T
      </span>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
