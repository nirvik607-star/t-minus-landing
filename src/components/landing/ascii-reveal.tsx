"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Full T^minus ASCII crystallization ramp (` . : - ^ t + = T *`).
 * Ordered from subtle obsidian dust to crystalline cyan/white lock-in.
 */
const DENSITY_LADDER = [".", ":", "-", "^", "t", "+", "=", "T", "*"] as const;

interface AsciiRevealTextProps {
  text: string;
  /** Starts the slow, obvious ASCII wavefront materialization when true */
  active: boolean;
  /** Bypass animation completely (used for `?skipIntro=1` and reduced-motion) */
  instant?: boolean;
  /** Wave sweep origin */
  origin?: "left" | "center" | "right";
  /** Delay in ms after `active` flips true before the wave begins */
  delayMs?: number;
  /** Total wave sweep duration in ms (deliberately slow & readable: 950-1250ms) */
  durationMs?: number;
  /** Optional class applied to mid-stage crystallizing glyphs */
  glyphClassName?: string;
  /** Optional class applied to the final `#97DFFC` `*` / `T` lock-in crest */
  crestClassName?: string;
  className?: string;
}

/**
 * Zero-re-render, deliberately slow & unmistakable ASCII Wavefront Materialization (7A):
 * - Single `requestAnimationFrame` loop mutates character span refs directly in the DOM
 *   (ZERO 60fps React `setState` churn).
 * - Visible 4-6 character glowing ASCII wavefront (`.:-^t+=T*`) sweeps across the headline
 *   over `~1050–1250ms` in `#613DC1 -> #858AE3 -> #97DFFC -> #F7FAFF`, crystallizing
 *   crisp upright typography cleanly behind it with zero size-pop jitter.
 * - Optional deterministic QA pin `?revealAt=0.45` freezes mid-wavefront for visual QA.
 */
export function AsciiRevealText({
  text,
  active,
  instant = false,
  origin = "left",
  delayMs = 0,
  durationMs = 1180,
  glyphClassName = "text-[#858AE3]",
  crestClassName = "text-[#97DFFC]",
  className = "",
}: AsciiRevealTextProps) {
  const chars = useMemo(() => Array.from(text), [text]);
  const [resolved, setResolved] = useState(instant);
  const nativeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const glyphRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    // Check optional deterministic QA freeze (?revealAt=0.0..1.0)
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

    if (pinnedProgress === null && instant) {
      setResolved(true);
      return;
    }

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (pinnedProgress === null && reducedMotion) {
      setResolved(true);
      return;
    }

    if (!active && pinnedProgress === null) {
      setResolved(false);
      return;
    }

    const total = Math.max(1, chars.length);
    const mid = (total - 1) * 0.5;
    const maxDist = Math.max(0.5, mid);

    // 4-6 char unmistakable glowing wavefront width
    const slotSpan = Math.min(0.42, Math.max(0.22, 5.2 / total));
    const maxStart = 1.0 - slotSpan;

    const applyProgress = (p: number) => {
      for (let idx = 0; idx < chars.length; idx++) {
        if (chars[idx] === " ") continue;
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
          glyEl.textContent = "";
        } else if (local >= 1) {
          natEl.style.opacity = "1";
          natEl.style.color = "";
          glyEl.style.opacity = "0";
          glyEl.textContent = "";
        } else {
          // Ordered density ladder with clear slow step progression
          const ladderIdx = Math.min(
            DENSITY_LADDER.length - 1,
            Math.floor(local * DENSITY_LADDER.length)
          );
          const glyph = DENSITY_LADDER[ladderIdx];

          // Smooth cross-dissolve on final 14% so there is ZERO jarring size-pop
          const lockFade = local > 0.84 ? (local - 0.84) / 0.16 : 0;
          const natAlpha = lockFade;
          const glyAlpha =
            lockFade > 0
              ? Math.max(0, 1 - lockFade * 1.15)
              : Math.min(1, 0.42 + local * 0.85);

          natEl.style.opacity = natAlpha.toFixed(3);
          glyEl.style.opacity = glyAlpha.toFixed(3);
          if (glyEl.textContent !== glyph) {
            glyEl.textContent = glyph;
          }

          // Color progression: deep violet -> periwinkle -> bright #97DFFC -> #F7FAFF crest
          if (local >= 0.72) {
            glyEl.style.color = local >= 0.86 ? "#F7FAFF" : "#97DFFC";
            glyEl.style.textShadow = "0 0 11px rgba(151, 223, 252, 0.58)";
          } else if (local >= 0.36) {
            glyEl.style.color = "";
            glyEl.style.textShadow = "0 0 6px rgba(133, 138, 227, 0.32)";
          } else {
            glyEl.style.color = "#613DC1";
            glyEl.style.textShadow = "none";
          }
        }
      }
    };

    if (pinnedProgress !== null) {
      setResolved(false);
      // Apply on next animation frame after spans mount
      const id = window.requestAnimationFrame(() => applyProgress(pinnedProgress!));
      return () => window.cancelAnimationFrame(id);
    }

    setResolved(false);
    let rafId = 0;
    let startTs = 0;

    // Initialize hidden before delay completes
    applyProgress(0);

    const timer = window.setTimeout(() => {
      startTs = performance.now();

      const step = (ts: number) => {
        const elapsed = ts - startTs;
        const p = Math.min(1, elapsed / Math.max(240, durationMs));
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
  }, [active, instant, origin, delayMs, durationMs, chars]);

  if (resolved) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span aria-label={text} className={className}>
      {chars.map((ch, idx) => {
        if (ch === " ") {
          return <React.Fragment key={idx}> </React.Fragment>;
        }
        return (
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
              className={`pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-[0.88em] leading-none font-medium ${glyphClassName} ${crestClassName ? "" : ""}`}
            />
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
 * Below-the-fold one-shot IntersectionObserver ASCII materialization:
 * - `telemetry`: crisp 850ms left-to-right slow wavefront for coordinates & eyebrows
 * - `headline`: deliberate 1240ms slow glowing ASCII wavefront with `#97DFFC -> #F7FAFF` crest
 * - `prose`: calm 520ms optical rise (never scrambles dense reading copy)
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
  const [hasRevealPin, setHasRevealPin] = useState(false);

  useEffect(() => {
    try {
      const qs = new URLSearchParams(window.location.search);
      if (qs.get("revealAt") !== null) {
        setHasRevealPin(true);
        setVisible(true);
        return;
      }
    } catch {
      // ignore
    }

    if (instant) {
      setVisible(true);
      return;
    }

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const el = hostRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -24px 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [instant]);

  if (tier === "prose") {
    return (
      <span
        ref={hostRef}
        style={{
          transitionDelay: instant ? "0ms" : `${delayMs}ms`,
        }}
        className={`block transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          visible ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0"
        } ${className}`}
      >
        {children ?? text}
      </span>
    );
  }

  const durationMs = tier === "telemetry" ? 860 : 1240;

  return (
    <span ref={hostRef} className={className}>
      <AsciiRevealText
        text={text ?? ""}
        active={visible}
        instant={hasRevealPin ? false : instant}
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
 *   corner ticks and a central micro-ASCII focal crest (`.:-^t+=T*`) that materializes
 *   slowly center-outward and responds smoothly to desktop hover.
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

  useEffect(() => {
    if (instant) {
      setVisible(true);
      return;
    }

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [instant]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const settleImmediately = instant || reducedMotion;

    let cssW = 0;
    let cssH = 0;
    let dpr = 2;
    let monoFamily = '"IBM Plex Mono", ui-monospace, SFMono-Regular, monospace';

    let pointerNormX = -10;
    let pointerInfluence = 0;
    let pointerTarget = 0;
    let revealProgress = settleImmediately ? 1 : 0;
    let animStartTs = 0;
    let rafId = 0;
    let running = false;

    const syncSize = () => {
      const rect = container.getBoundingClientRect();
      cssW = Math.max(1, Math.round(rect.width));
      cssH = Math.max(1, Math.round(rect.height));
      dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), 2.0);
      canvas.width = Math.max(1, Math.round(cssW * dpr));
      canvas.height = Math.max(1, Math.round(cssH * dpr));

      if (monoProbeRef.current) {
        monoFamily = window.getComputedStyle(monoProbeRef.current).fontFamily;
      }
    };

    const draw = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!visible && !settleImmediately) return;
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
          const t = (i / steps) * 2 - 1; // -1..1
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

      // 2) Intentional corner & focal ASCII calibration ticks (`+` at edges, restrained crest at center)
      const fontPx = Math.max(9, Math.round((cssW < 640 ? 9.5 : 10.5) * dpr));
      ctx.font = `500 ${fontPx}px ${monoFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const cellPxW = Math.max(9, Math.round((cssW < 640 ? 9.5 : 11) * dpr));
      const crestHalfCols = cssW < 640 ? 7 : 11;

      // Edge architectural anchor ticks (`+`)
      if (revealProgress > 0.85) {
        const edgeAlpha = Math.min(1, (revealProgress - 0.85) / 0.15) * 0.72;
        ctx.fillStyle = "#858AE3";
        ctx.globalAlpha = edgeAlpha;
        ctx.fillText("+", Math.round(5 * dpr), Math.round(baseCenterY));
        ctx.fillText("+", cw - Math.round(5 * dpr), Math.round(baseCenterY));
      }

      // Central restrained ASCII calibration crest + hover wake
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
          Math.floor(energy * 6.8 + 0.5)
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

        // Clean obsidian backing behind central ASCII characters so hairline never strikes through glyphs
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
          isCenter || wake > 0.35 || (local < 0.99 && ladderIdx >= 6)
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

        if (!settleImmediately && visible && revealProgress < 1) {
          if (animStartTs === 0) animStartTs = ts;
          revealProgress = Math.min(1, (ts - animStartTs) / 980);
        }

        pointerInfluence +=
          (pointerTarget - pointerInfluence) * Math.min(1, dt * 11);
        if (Math.abs(pointerTarget - pointerInfluence) < 0.003) {
          pointerInfluence = pointerTarget;
        }

        draw();

        const stillAnimating =
          (!settleImmediately && visible && revealProgress < 1) ||
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

    syncSize();
    if (visible || settleImmediately) {
      if (settleImmediately) {
        revealProgress = 1;
        draw();
      } else {
        ensureLoop();
      }
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
      window.cancelAnimationFrame(rafId);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      ro.disconnect();
    };
  }, [visible, instant, variant]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
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
