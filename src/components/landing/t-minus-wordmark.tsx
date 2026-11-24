"use client";

import React from "react";

interface TMinusWordmarkProps {
  /** Scale multiplier matching SwiftUI `TMinusWordmark(scale:)` (1.0 = 26px serif T / 15px sans ^minus) */
  scale?: number;
  className?: string;
}

/**
 * Exact web translation of SwiftUI `TMinusWordmark` (`Theme.swift`):
 * - `T`: 26 * scale, medium (500), italic serif (Newsreader / New York / ui-serif)
 * - `^minus`: 15 * scale, medium (500), system sans (SF Pro / Geist), -0.5 * scale tracking, +3 * scale baseline offset
 * - 1 * scale gap, first-text-baseline aligned.
 */
export function TMinusWordmark({
  scale = 1,
  className = "",
}: TMinusWordmarkProps) {
  const tSize = 26 * scale;
  const minusSize = 15 * scale;
  const gap = 1 * scale;
  const tracking = -0.5 * scale;
  const baselineLift = 3 * scale;

  return (
    <span
      aria-label="T-minus"
      className={`inline-flex items-baseline leading-none select-none ${className}`}
      style={{ gap: `${gap}px` }}
    >
      <span
        aria-hidden="true"
        className="font-serif italic font-medium"
        style={{
          fontSize: `${tSize}px`,
          lineHeight: 1,
        }}
      >
        T
      </span>
      <span
        aria-hidden="true"
        className="font-sans font-medium"
        style={{
          fontSize: `${minusSize}px`,
          lineHeight: 1,
          letterSpacing: `${tracking}px`,
          transform: `translateY(${-baselineLift}px)`,
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
 * baseline raise, `1` gap) used by the WebGL2 explosion ASCII carve mask.
 *
 * Uses clean `500` medium weight with ZERO heavy stroke inflation so gaps between
 * `T`, `^`, and `minus` stay crisp and never overlap or bleed into each other.
 *
 * Channels:
 * - R: crisp `500`-weight letterform core for dark high-contrast ASCII glyphs
 * - G: soft outer halo around the strokes so the blast edges read cleanly
 * - B: caret `^` accent region
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

  // Preserve exact locked viewport scale and centered placement during explosion peak
  const isMobile = cssW < 768;
  const desiredWidthFrac = isMobile ? 0.78 : 0.62;
  const scaleToTex = texW / Math.max(1, cssW);

  let scale = ((isMobile ? 4.4 : 7.8) * scaleToTex) / 1.0;

  // Clean 500 medium weight matching SwiftUI TMinusWordmark (no bold inflation)
  const serifFont = (s: number) =>
    `italic 500 ${Math.round(26 * s)}px "Newsreader", "New York", Georgia, ui-serif, serif`;
  const sansFont = (s: number) =>
    `500 ${Math.round(15 * s)}px -apple-system, BlinkMacSystemFont, "SF Pro Display", "Geist", sans-serif`;

  const measureMark = (s: number) => {
    const gap = 1 * s;
    const tracking = -0.5 * s;
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
  // Optical vertical centering using first-text-baseline of the 26*scale serif T
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

  const haloBlur = Math.max(14, Math.round(scale * 4.4));

  ctx.globalCompositeOperation = "lighter";
  // G: soft outer luminance rim halo around strokes
  renderPass("rgb(0, 220, 0)", haloBlur);
  // R: clean 500-weight fill ONLY (zero outline stroke inflation so inter-letter gaps stay sharp)
  renderPass("rgb(255, 0, 0)", 0);
  // B: caret region tag
  renderPass("rgb(0, 0, 255)", 0, true);
  ctx.globalCompositeOperation = "source-over";
}
