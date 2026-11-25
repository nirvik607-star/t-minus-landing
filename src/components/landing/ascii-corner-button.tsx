"use client";

import React, { useEffect, useRef } from "react";

/**
 * Exact locked SwiftUI glyph vocabulary (`GlyphField.swift`):
 * strictly `^ - t + = T *` — zero `.`, zero `:`, zero `·`.
 */
const GLYPH_CHARSET = ["^", "-", "t", "+", "=", "T", "*"] as const;

function stableNoise(x: number, y: number): number {
  const raw = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return raw - Math.floor(raw);
}

function glyphForEnergy(energy: number): string {
  const idx = Math.min(
    GLYPH_CHARSET.length - 1,
    Math.max(0, Math.floor(energy * GLYPH_CHARSET.length))
  );
  return GLYPH_CHARSET[idx];
}

function sweepSignal(x: number, y: number, time: number): number {
  return (Math.sin(x * 0.09 + y * 0.115 - time * 2.15) + 1) * 0.5;
}

export type AsciiCornerButtonVariant = "primary" | "dark";

interface AsciiCornerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * - `primary`: Pure crisp white pill fill, `#613DC1` semibold label, zero interior glyph bleed.
   * - `dark`: Secondary dark polarity — `#613DC1` purple fill, optional restrained `#97DFFC`
   *   outer-corner ASCII glints, white label.
   */
  variant?: AsciiCornerButtonVariant;
  /** Optional rounded shape (`rect` for input-bar CTA, `pill` for standalone CTA) */
  shape?: "rect" | "pill";
  /** Render restrained diagonal corner ASCII glints (defaults to false on `primary` to prevent pill bleed) */
  showCornerGlyphs?: boolean;
}

export function AsciiCornerButton({
  variant = "primary",
  shape = "rect",
  showCornerGlyphs,
  className = "",
  children,
  disabled,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: AsciiCornerButtonProps) {
  const enableGlyphs = showCornerGlyphs ?? variant !== "primary";
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hoveredRef = useRef(false);

  useEffect(() => {
    if (!enableGlyphs) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let rafId = 0;
    let lastDraw = 0;
    let cssW = 0;
    let cssH = 0;
    let dpr = 2;

    const syncSize = () => {
      const rect = canvas.getBoundingClientRect();
      const nw = Math.max(1, Math.round(rect.width));
      const nh = Math.max(1, Math.round(rect.height));
      const ndpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), 3);
      if (nw !== cssW || nh !== cssH || ndpr !== dpr) {
        cssW = nw;
        cssH = nh;
        dpr = ndpr;
        canvas.width = Math.max(1, Math.round(cssW * dpr));
        canvas.height = Math.max(1, Math.round(cssH * dpr));
      }
    };

    const drawFrame = (timeSec: number) => {
      syncSize();
      if (cssW <= 1 || cssH <= 1) return;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pitchCss = cssH <= 42 ? 8 : 9;
      const baseFontCss = cssH <= 42 ? 9 : 10;
      const flashFontCss = baseFontCss + 1;

      const regularFont = `600 ${Math.round(baseFontCss * dpr)}px "Geist Mono", "SF Mono", ui-monospace, Menlo, monospace`;
      const flashFont = `700 ${Math.round(flashFontCss * dpr)}px "Geist Mono", "SF Mono", ui-monospace, Menlo, monospace`;

      const cols = Math.ceil(cssW / pitchCss);
      const rows = Math.ceil(cssH / pitchCss);
      const hoverBoost = hoveredRef.current ? 1.12 : 1.0;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let row = 0; row <= rows; row++) {
        for (let col = 0; col <= cols; col++) {
          const xCss = col * pitchCss + pitchCss * 0.5;
          const yCss = row * pitchCss + pitchCss * 0.5;
          const nx = xCss / Math.max(1, cssW);
          const ny = yCss / Math.max(1, cssH);

          // Tight outer corner tips only — generous label corridor
          const tlDist = Math.hypot(nx / 0.16, ny / 0.58);
          const brDist = Math.hypot((1 - nx) / 0.17, (1 - ny) / 0.58);
          const tlStrength = Math.max(0, 1 - tlDist);
          const brStrength = Math.max(0, 1 - brDist) * 1.05;
          const strength = Math.min(1, Math.max(tlStrength, brStrength));

          if (strength < 0.1 || (nx > 0.14 && nx < 0.86)) continue;

          const texture = stableNoise(col, row);
          const sig = sweepSignal(
            xCss,
            yCss,
            timeSec * (hoveredRef.current ? 1.35 : 1.0)
          );
          const flash = sig > 0.88 && texture > 0.42;
          const glyph = flash ? "T" : glyphForEnergy(0.18 + texture * 0.74);

          const px = Math.round(xCss * dpr);
          const py = Math.round(yCss * dpr);

          ctx.font = flash ? flashFont : regularFont;
          ctx.fillStyle =
            variant === "primary"
              ? flash
                ? "#4E148C"
                : "#613DC1"
              : flash
                ? "#FFFFFF"
                : strength > 0.48
                  ? "#97DFFC"
                  : "#B5EAFF";

          const tipCurve = Math.pow(strength, 1.55);
          const baseAlpha = flash ? 0.5 : 0.42;
          ctx.globalAlpha = Math.min(0.54, tipCurve * baseAlpha * hoverBoost);
          ctx.fillText(glyph, px, py);
        }
      }
      ctx.globalAlpha = 1;
    };

    const startTs = performance.now();
    drawFrame(0);

    if (reducedMotion || disabled) {
      const ro = new ResizeObserver(() => drawFrame(0));
      ro.observe(canvas);
      return () => ro.disconnect();
    }

    const tick = (ts: number) => {
      rafId = window.requestAnimationFrame(tick);
      if (document.hidden) return;
      if (ts - lastDraw < 42) return;
      lastDraw = ts;
      drawFrame((ts - startTs) * 0.001);
    };
    rafId = window.requestAnimationFrame(tick);

    const ro = new ResizeObserver(() => {
      drawFrame((performance.now() - startTs) * 0.001);
    });
    ro.observe(canvas);

    return () => {
      window.cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [enableGlyphs, variant, disabled]);

  const shapeClass = shape === "pill" ? "rounded-full" : "rounded-[10px]";
  const polarityClass =
    variant === "primary"
      ? "bg-white text-[#613DC1] border border-white shadow-[inset_0_1px_0_rgba(255,255,255,1),0_1px_2px_rgba(0,0,0,0.65),0_10px_28px_-10px_rgba(97,61,193,0.48)] hover:bg-[#FAF9FF] hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_2px_6px_rgba(0,0,0,0.6),0_12px_32px_-10px_rgba(151,223,252,0.42)]"
      : "bg-[#613DC1] text-white border border-[#858AE3]/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_1px_2px_rgba(0,0,0,0.7),0_12px_32px_-10px_rgba(97,61,193,0.72)] hover:bg-[#6E49D4] hover:border-[#97DFFC]/65 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.34),0_14px_34px_-10px_rgba(151,223,252,0.35)]";

  return (
    <button
      disabled={disabled}
      onMouseEnter={(e) => {
        hoveredRef.current = true;
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        hoveredRef.current = false;
        onMouseLeave?.(e);
      }}
      className={`group relative inline-flex cursor-pointer items-center justify-center overflow-hidden font-semibold tracking-[-0.012em] transition-[transform,background-color,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.975] focus-visible:ring-2 focus-visible:ring-[#97DFFC] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-55 ${shapeClass} ${polarityClass} ${className}`}
      {...rest}
    >
      {enableGlyphs ? (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
      ) : null}
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
