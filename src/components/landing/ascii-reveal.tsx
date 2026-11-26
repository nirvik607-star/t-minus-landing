"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Strict locked T^minus ASCII density ramp (`^ - t + = T *`).
 * Ordered from lowest visual density to peak crystalline density.
 */
const DENSITY_LADDER = ["^", "-", "t", "+", "=", "T", "*"] as const;

interface AsciiRevealTextProps {
  text: string;
  /** Starts the ordered density-ladder ASCII -> typography crystallization when true */
  active: boolean;
  /** Bypass animation completely (used for `?skipIntro=1` and reduced-motion) */
  instant?: boolean;
  /** Wave sweep origin */
  origin?: "left" | "center" | "right";
  /** Delay in ms after `active` flips true before the wave begins */
  delayMs?: number;
  /** Total wave sweep duration in ms */
  durationMs?: number;
  /** Optional class applied to the mid-stage crystallizing glyphs */
  glyphClassName?: string;
  /** Optional class applied to the final `#97DFFC` `*` phase-lock crest */
  crestClassName?: string;
  className?: string;
}

/**
 * 60fps ordered density-ladder ASCII crystallization:
 *   void -> `^` -> `-` / `t` -> `+` / `=` -> `T` -> `*` (#97DFFC crest) -> native Geist glyph.
 * Zero random noise, zero layout shift, swaps to plain native text once resolved.
 */
export function AsciiRevealText({
  text,
  active,
  instant = false,
  origin = "left",
  delayMs = 0,
  durationMs = 680,
  glyphClassName = "text-[#858AE3]",
  crestClassName = "text-[#97DFFC]",
  className = "",
}: AsciiRevealTextProps) {
  const chars = useMemo(() => Array.from(text), [text]);
  const [resolved, setResolved] = useState(instant);
  const [progress, setProgress] = useState(instant ? 1 : 0);

  useEffect(() => {
    if (instant) {
      setResolved(true);
      setProgress(1);
      return;
    }

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setResolved(true);
      setProgress(1);
      return;
    }

    if (!active) {
      setResolved(false);
      setProgress(0);
      return;
    }

    let rafId = 0;
    let startTs = 0;

    const timer = window.setTimeout(() => {
      startTs = performance.now();

      const step = (ts: number) => {
        const elapsed = ts - startTs;
        const p = Math.min(1, elapsed / Math.max(120, durationMs));
        setProgress(p);

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
            : origin === "right"
              ? (total - 1 - idx) / Math.max(1, total - 1)
              : idx / Math.max(1, total - 1);

        const slotStart = normPos * (origin === "center" ? 0.52 : 0.58);
        const slotSpan = origin === "center" ? 0.44 : 0.38;
        const slotEnd = Math.min(1, slotStart + slotSpan);
        const local =
          (progress - slotStart) / Math.max(0.01, slotEnd - slotStart);

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

        // Ordered density progression through `^ - t + = T *`
        const ladderIdx = Math.min(
          DENSITY_LADDER.length - 1,
          Math.floor(local * DENSITY_LADDER.length)
        );
        const glyph = DENSITY_LADDER[ladderIdx];
        const isCrest = ladderIdx >= 5;
        const isEarly = ladderIdx <= 1;
        const colorCls = isCrest
          ? crestClassName
          : isEarly
            ? "text-[#613DC1]"
            : glyphClassName;
        const glyphAlpha = Math.min(1, 0.35 + local * 0.9);

        return (
          <span key={idx} aria-hidden="true" className="relative inline-block">
            <span className="opacity-0">{ch}</span>
            <span
              style={{ opacity: glyphAlpha }}
              className={`pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-[0.76em] font-medium ${colorCls}`}
            >
              {glyph}
            </span>
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
 * - `telemetry`: crisp 320ms left-to-right density decode for coordinates & indices
 * - `headline`: dignified 620ms density-ladder sweep with `#97DFFC` `*` crest
 * - `prose`: calm 420ms optical rise (never scrambles dense reading copy)
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
      { threshold: 0.16, rootMargin: "0px 0px -32px 0px" }
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
        className={`block transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          visible ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0"
        } ${className}`}
      >
        {children ?? text}
      </span>
    );
  }

  const durationMs = tier === "telemetry" ? 320 : 620;

  return (
    <span ref={hostRef} className={className}>
      <AsciiRevealText
        text={text ?? ""}
        active={visible}
        instant={instant}
        origin={origin}
        delayMs={delayMs}
        durationMs={durationMs}
        glyphClassName={tier === "telemetry" ? "text-[#613DC1]" : "text-[#858AE3]"}
        crestClassName="text-[#97DFFC]"
      />
    </span>
  );
}

interface AsciiHorizonRuleProps {
  /** Optional subtle center label or emblem */
  instant?: boolean;
  /** Subtle upward curve arch for the closing T-Zero bookend */
  variant?: "rule" | "arch";
  className?: string;
}

/**
 * Full-width architectural ASCII horizon divider strictly using ` ^-t+=T*`.
 * Materializes center-outward on scroll and supports Innovation C:
 * Gravitational Magnetic ASCII Hover Wake across desktop pointers.
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
    let monoFamily = "ui-monospace, SFMono-Regular, Menlo, monospace";

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
      const isMobile = cssW < 640;
      dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), isMobile ? 3.0 : 2.5);
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

      const cellCssW = cssW < 640 ? 9 : 11;
      const cellPxW = Math.max(8, Math.round(cellCssW * dpr));
      const cols = Math.max(19, Math.floor(canvas.width / cellPxW));
      const originX = Math.floor((canvas.width - cols * cellPxW) * 0.5);
      const midCol = (cols - 1) * 0.5;

      const fontPx = Math.max(10, Math.round((cssW < 640 ? 10 : 11) * dpr));
      ctx.font = `500 ${fontPx}px ${monoFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const baseCenterY = variant === "arch" ? canvas.height * 0.78 : canvas.height * 0.5;
      const archLift = variant === "arch" ? canvas.height * 0.54 : 0;

      for (let c = 0; c < cols; c++) {
        const normFromCenter = Math.abs(c - midCol) / Math.max(1, midCol);
        const slotStart = normFromCenter * 0.58;
        const local = Math.min(1, Math.max(0, (revealProgress - slotStart) / 0.38));
        if (local <= 0.01) continue;

        // Symmetrical horizon density curve: peak `*` / `T` at center tapering to `-` / `^` at edges
        const baseEnergy = Math.pow(1 - normFromCenter, 1.55);
        const colNormX = (c + 0.5) / cols;

        // Magnetic hover wake (Innovation C)
        let wake = 0;
        if (pointerInfluence > 0.005) {
          const d = Math.abs(colNormX - pointerNormX);
          if (d < 0.14) {
            wake = Math.pow(1 - d / 0.14, 1.8) * pointerInfluence;
          }
        }

        let ladderIdx = Math.min(
          DENSITY_LADDER.length - 1,
          Math.floor(baseEnergy * 5.2 + 0.35)
        );
        if (local < 0.99) {
          ladderIdx = Math.min(
            DENSITY_LADDER.length - 1,
            Math.floor(local * DENSITY_LADDER.length)
          );
        } else if (wake > 0.22) {
          ladderIdx = Math.min(
            DENSITY_LADDER.length - 1,
            ladderIdx + (wake > 0.62 ? 2 : 1)
          );
        }

        const glyph = DENSITY_LADDER[ladderIdx];
        const px = originX + c * cellPxW + Math.floor(cellPxW * 0.5);
        const archY =
          variant === "arch"
            ? baseCenterY - archLift * Math.pow(Math.max(0, 1 - normFromCenter * normFromCenter), 1.25)
            : baseCenterY;
        const py = Math.round(archY);

        let color = "#613DC1";
        let alpha = 0.42 + 0.45 * baseEnergy;
        if (local < 0.99 && ladderIdx >= 5) {
          color = "#97DFFC";
          alpha = 0.95;
        } else if (wake > 0.32 || (normFromCenter < 0.06 && baseEnergy > 0.9)) {
          color = "#97DFFC";
          alpha = Math.min(1, 0.78 + wake * 0.22);
        } else if (baseEnergy > 0.48 || wake > 0.12) {
          color = "#858AE3";
          alpha = Math.min(0.92, 0.58 + baseEnergy * 0.34 + wake * 0.2);
        }

        ctx.fillStyle = color;
        ctx.globalAlpha = alpha * Math.min(1, local * 1.4);
        ctx.fillText(glyph, px, py);
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
          revealProgress = Math.min(1, (ts - animStartTs) / 560);
        }

        pointerInfluence += (pointerTarget - pointerInfluence) * Math.min(1, dt * 11);
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
        variant === "arch" ? "h-10 sm:h-12" : "h-5 sm:h-6"
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
