"use client";

import React from "react";

interface TMinusWordmarkProps {
  /**
   * Scale multiplier matching SwiftUI `TMinusWordmark(scale:)`
   * (1.0 = 26px serif T / 15px sans ^minus).
   * Omit when driving `--wm-scale` responsively via CSS classes
   * (e.g. `[--wm-scale:1.18] sm:[--wm-scale:1.48]`).
   */
  scale?: number;
  className?: string;
}

/**
 * Exact web translation of SwiftUI `TMinusWordmark` (`Theme.swift`):
 * - `T`: 26 * scale, medium (500), italic serif (Newsreader / New York / ui-serif)
 * - `^minus`: 15 * scale, medium (500), Inter / SF Pro sans, -0.5 * scale tracking, +3 * scale baseline offset
 * - 1 * scale gap, first-text-baseline aligned.
 */
export function TMinusWordmark({
  scale,
  className = "",
}: TMinusWordmarkProps) {
  const rootStyle: React.CSSProperties = {
    gap: "calc(1px * var(--wm-scale, 1))",
    ...(scale !== undefined
      ? ({ "--wm-scale": String(scale) } as React.CSSProperties)
      : {}),
  };

  return (
    <span
      aria-label="T-minus"
      className={`inline-flex items-baseline leading-none select-none ${className}`}
      style={rootStyle}
    >
      <span
        aria-hidden="true"
        className="font-serif font-medium italic"
        style={{
          fontSize: "calc(26px * var(--wm-scale, 1))",
          lineHeight: 1,
        }}
      >
        T
      </span>
      <span
        aria-hidden="true"
        className="font-sans font-medium"
        style={{
          fontSize: "calc(15px * var(--wm-scale, 1))",
          lineHeight: 1,
          letterSpacing: "calc(-0.5px * var(--wm-scale, 1))",
          transform: "translateY(calc(-3px * var(--wm-scale, 1)))",
          display: "inline-block",
        }}
      >
        ^minus
      </span>
    </span>
  );
}

/**
 * Deterministic high-DPI Canvas2D rasterizer of the exact SwiftUI `TMinusWordmark`
 * geometry (`26:15` serif-italic `T` + sans `^minus` with `-0.5` tracking, `+3`
 * baseline raise, `1` gap) used by the WebGL2 supernova ASCII wordmark pass.
 *
 * Channels:
 * - R: crisp `500`-weight letterform coverage for cell-quantized ASCII characters
 * - G: subtle outer light-energy halo
 * - B: caret `^` tag
 */
export function drawWordmarkMaskCanvas(
  ctx: CanvasRenderingContext2D,
  texW: number,
  texH: number,
  cssW: number
): void {
  ctx.clearRect(0, 0, texW, texH);
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, texW, texH);

  const isMobile = cssW < 768;
  const desiredWidthFrac = isMobile ? 0.76 : 0.56;
  const scaleToTex = texW / Math.max(1, cssW);

  let scale = ((isMobile ? 4.2 : 7.4) * scaleToTex) / 1.0;

  const serifFont = (s: number) =>
    `italic 500 ${Math.round(26 * s)}px "Newsreader", "New York", Georgia, ui-serif, serif`;
  const sansFont = (s: number) =>
    `500 ${Math.round(15 * s)}px "Inter Tight", "Inter", -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif`;

  const measureMark = (s: number) => {
    const gap = 1.4 * s;
    const tracking = -0.35 * s;
    ctx.font = serifFont(s);
    const tWidth = ctx.measureText("T").width;

    ctx.font = sansFont(s);
    const chars = ["^", "m", "i", "n", "u", "s"];
    const charWidths = chars.map((ch) => ctx.measureText(ch).width);
    const minusWidth =
      charWidths.reduce((acc, w) => acc + w, 0) +
      tracking * (chars.length - 1);

    return {
      tWidth,
      chars,
      charWidths,
      gap,
      tracking,
      totalWidth: tWidth + gap + minusWidth,
    };
  };

  let m = measureMark(scale);
  const targetWidth = texW * desiredWidthFrac;
  scale = (scale * targetWidth) / Math.max(1, m.totalWidth);
  m = measureMark(scale);

  const cx = texW * 0.5;
  const baselineY = texH * 0.5 + 26 * scale * 0.34;
  const startX = cx - m.totalWidth * 0.5;
  const baselineLift = 3 * scale;

  const renderPass = (
    fillStyle: string,
    blurPx: number,
    onlyCaret = false
  ) => {
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.shadowColor = blurPx > 0 ? fillStyle : "transparent";
    ctx.shadowBlur = blurPx;
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    let x = startX;
    if (!onlyCaret) {
      ctx.font = serifFont(scale);
      ctx.fillText("T", x, baselineY);
    }
    x += m.tWidth + m.gap;

    ctx.font = sansFont(scale);
    for (let i = 0; i < m.chars.length; i++) {
      const ch = m.chars[i];
      const isCaret = ch === "^";
      if (!onlyCaret || isCaret) {
        const y = baselineY - baselineLift;
        ctx.fillText(ch, x, y);
      }
      x += m.charWidths[i] + m.tracking;
    }
    ctx.restore();
  };

  const haloBlur = Math.max(12, Math.round(scale * 3.8));

  ctx.globalCompositeOperation = "lighter";
  renderPass("rgb(0, 200, 0)", haloBlur);
  renderPass("rgb(255, 0, 0)", 0);
  renderPass("rgb(0, 0, 255)", 0, true);
  ctx.globalCompositeOperation = "source-over";
}
