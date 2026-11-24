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
   * - `primary`: SwiftUI `PrimaryActionLabel` polarity — crisp white fill,
   *   `#613DC1` purple diagonal-X corner ASCII glyphs, `#613DC1` label.
   * - `dark`: Secondary dark polarity — `#613DC1` purple fill,
   *   `#97DFFC` ice-blue diagonal-X corner ASCII glyphs, white label.
   */
  variant?: AsciiCornerButtonVariant;
  /** Optional rounded shape (`rect` for input-bar CTA, `pill` for standalone CTA) */
  shape?: "rect" | "pill";
}

/**
 * Crisp Retina Diagonal-X Corner ASCII Button (`GlyphFieldButtonBackground`
 * + `GlyphTextureLoop` ported directly from SwiftUI `GlyphField.swift`):
 *
 * - True native `devicePixelRatio` (up to 3x) with integer CSS cell pitch
 *   (`8px` / `9px`), integer font sizes, and exact device-pixel coordinate
 *   snapping so every `^ - t + = T *` glyph renders razor-sharp on Retina screens.
 * - Tightened top-left (`0,0`) and bottom-right (`1,1`) corner ellipses with
 *   generous center label clearance (`nx ∈ [0.19, 0.81]`) and restrained
 *   `~0.44–0.55` max tip opacity so corner ASCII frames the CTA cleanly.
 * - Apple-grade specular hairline borders & obsidian-grounded depth.
 */
export function AsciiCornerButton({
  variant = "primary",
  shape = "rect",
  className = "",
  children,
  disabled,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: AsciiCornerButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hoveredRef = useRef(false);

  useEffect(() => {
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

      // Render directly in device pixel coordinates for crisp, blur-free glyph snapping
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Strictly integer CSS pitch & font sizes -> clean Retina pixel alignment
      const pitchCss = cssH <= 42 ? 8 : 9;
      const baseFontCss = cssH <= 42 ? 9 : 10;
      const flashFontCss = baseFontCss + 1;

      const regularFont = `600 ${Math.round(baseFontCss * dpr)}px "Geist Mono", "SF Mono", ui-monospace, Menlo, monospace`;
      const flashFont = `700 ${Math.round(flashFontCss * dpr)}px "Geist Mono", "SF Mono", ui-monospace, Menlo, monospace`;

      const cols = Math.ceil(cssW / pitchCss);
      const rows = Math.ceil(cssH / pitchCss);
      const hoverBoost = hoveredRef.current ? 1.1 : 1.0;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let row = 0; row <= rows; row++) {
        for (let col = 0; col <= cols; col++) {
          const xCss = col * pitchCss + pitchCss * 0.5;
          const yCss = row * pitchCss + pitchCss * 0.5;
          const nx = xCss / Math.max(1, cssW);
          const ny = yCss / Math.max(1, cssH);

          // Tight diagonal-X corner mask:
          // Strictly tucked into top-left (0,0) & bottom-right (1,1) tips with wide label clearance
          const tlDist = Math.hypot(nx / 0.22, ny / 0.62);
          const brDist = Math.hypot((1 - nx) / 0.23, (1 - ny) / 0.62);
          const tlStrength = Math.max(0, 1 - tlDist);
          const brStrength = Math.max(0, 1 - brDist) * 1.06;
          const strength = Math.min(1, Math.max(tlStrength, brStrength));

          // Generous clear corridor around button label text
          if (strength < 0.08 || (nx > 0.19 && nx < 0.81)) continue;

          const texture = stableNoise(col, row);
          const sig = sweepSignal(
            xCss,
            yCss,
            timeSec * (hoveredRef.current ? 1.35 : 1.0)
          );
          const flash = sig > 0.88 && texture > 0.42;
          const glyph = flash ? "T" : glyphForEnergy(0.18 + texture * 0.74);

          // Exact device-pixel center snapping (eliminates sub-pixel canvas blur)
          const px = Math.round(xCss * dpr);
          const py = Math.round(yCss * dpr);

          ctx.font = flash ? flashFont : regularFont;

          if (variant === "primary") {
            ctx.fillStyle = flash
              ? "#4E148C"
              : strength > 0.55
                ? "#613DC1"
                : "#858AE3";
          } else {
            ctx.fillStyle = flash
              ? "#FFFFFF"
              : strength > 0.48
                ? "#97DFFC"
                : "#B5EAFF";
          }

          // Restrained corner-tip opacity (~0.44-0.55 max) with crisp inward falloff
          const tipCurve = Math.pow(strength, 1.45);
          const baseAlpha =
            variant === "primary"
              ? flash
                ? 0.54
                : 0.44
              : flash
                ? 0.55
                : 0.46;
          ctx.globalAlpha = Math.min(0.58, tipCurve * baseAlpha * hoverBoost);
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
      // Smooth 24fps cadence matching SwiftUI loop
      if (ts - lastDraw < 40) return;
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
  }, [variant, disabled]);

  const shapeClass = shape === "pill" ? "rounded-full" : "rounded-[10px]";
  const polarityClass =
    variant === "primary"
      ? "bg-white text-[#613DC1] border border-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_1px_2px_rgba(0,0,0,0.65),0_10px_28px_-10px_rgba(97,61,193,0.48)] hover:bg-[#FAF9FF] hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_2px_6px_rgba(0,0,0,0.6),0_12px_32px_-10px_rgba(151,223,252,0.42)]"
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
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
