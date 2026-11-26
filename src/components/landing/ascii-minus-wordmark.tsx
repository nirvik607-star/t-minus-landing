"use client";

import React, { useEffect, useRef } from "react";

/**
 * Locked T^minus ASCII glyph vocabulary (` ^-t+=T*`).
 * Index 0 is empty space; indices 1..7 ramp strictly by visual density.
 */
const LOCKED_GLYPHS = ["^", "-", "t", "+", "=", "T", "*"] as const;

interface CellSpec {
  col: number;
  row: number;
  glyph: string;
  color: string;
  alpha: number;
  /** Normalized horizontal distance from center (0 = center, 1 = outer edge) */
  centerDist: number;
  seed: number;
}

interface AsciiMinusWordmarkProps {
  /** Triggers clean center-outward ASCII materialization after horizon resolve */
  active: boolean;
  /** Render immediately settled (`?skipIntro=1` or reduced-motion) */
  instant?: boolean;
  /** Delay in ms after `active` turns true (timed right after `Fashion.`) */
  delayMs?: number;
  /** Total entrance settle duration in ms */
  durationMs?: number;
  className?: string;
}

function stableHash(col: number, row: number): number {
  const s = Math.sin(col * 127.1 + row * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

/**
 * High-DPI Canvas2D ASCII centerpiece for `MINUS`:
 * - Genuinely constructed out of discrete ` ^-t+=T*` glyphs (zero CSS blur, zero glow).
 * - Core letterforms render in bright `#97DFFC` ice-blue with crisp `#D2F4FF` peak
 *   highlights on dense `T` / `*` / `=` interior cells, reserving `#858AE3` and
 *   `#613DC1` strictly for the outermost thin silhouette fringe (`cov < 0.44`).
 * - Enters cleanly after `Fashion.` post-horizon resolve and stays rock-steady
 *   with zero idle animation loop once settled.
 */
export function AsciiMinusWordmark({
  active,
  instant = false,
  delayMs = 240,
  durationMs = 640,
  className = "",
}: AsciiMinusWordmarkProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const displayProbeRef = useRef<HTMLSpanElement | null>(null);
  const monoProbeRef = useRef<HTMLSpanElement | null>(null);

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
    let cellW = 5.6;
    let cellH = 7.4;
    let monoFamily = "ui-monospace, SFMono-Regular, Menlo, monospace";
    let cells: CellSpec[] = [];

    let rafId = 0;
    let delayTimer = 0;
    let animStartTs = 0;
    let settled = settleImmediately;

    const rebuildGrid = () => {
      const rect = container.getBoundingClientRect();
      const nw = Math.max(1, Math.round(rect.width));
      const nh = Math.max(1, Math.round(rect.height));
      const ndpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), 3);

      cssW = nw;
      cssH = nh;
      dpr = ndpr;
      canvas.width = Math.max(1, Math.round(cssW * dpr));
      canvas.height = Math.max(1, Math.round(cssH * dpr));

      const isNarrow = cssW < 360;
      cellW = isNarrow ? 4.35 : 5.6;
      cellH = isNarrow ? 5.65 : 7.4;

      const cols = Math.max(36, Math.floor(cssW / cellW));
      const rows = Math.max(8, Math.floor(cssH / cellH));

      const displayFamily = displayProbeRef.current
        ? window.getComputedStyle(displayProbeRef.current).fontFamily
        : "sans-serif";
      monoFamily = monoProbeRef.current
        ? window.getComputedStyle(monoProbeRef.current).fontFamily
        : "ui-monospace, SFMono-Regular, Menlo, monospace";

      // 4x supersampled offscreen alpha mask for crisp anti-aliased glyph density sampling
      const sampleScale = 4;
      const maskW = cols * sampleScale;
      const maskH = rows * sampleScale;
      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = maskW;
      maskCanvas.height = maskH;
      const mctx = maskCanvas.getContext("2d", { willReadFrequently: true });
      if (!mctx) return;

      mctx.clearRect(0, 0, maskW, maskH);
      mctx.fillStyle = "#ffffff";
      mctx.textAlign = "left";
      mctx.textBaseline = "alphabetic";

      const letters = ["M", "I", "N", "U", "S"];
      const trackingRatio = 0.085;

      // Measure & fit MINUS cleanly inside the mask canvas with tight optical bounds
      let fontSize = maskH * 1.16;
      const measureWord = (fs: number) => {
        mctx.font = `800 ${fs.toFixed(1)}px ${displayFamily}`;
        const widths = letters.map((ch) => mctx.measureText(ch).width);
        const track = fs * trackingRatio;
        const totalW =
          widths.reduce((acc, w) => acc + w, 0) +
          track * (letters.length - 1);
        const metrics = mctx.measureText("MINUS");
        const ascent = metrics.actualBoundingBoxAscent || fs * 0.72;
        const descent = metrics.actualBoundingBoxDescent || 0;
        return { widths, track, totalW, ascent, descent };
      };

      let m = measureWord(fontSize);
      const maxTargetW = maskW * 0.96;
      const maxTargetH = maskH * 0.94;
      const glyphH = Math.max(1, m.ascent + m.descent);
      const scaleW = maxTargetW / Math.max(1, m.totalW);
      const scaleH = maxTargetH / glyphH;
      fontSize *= Math.min(scaleW, scaleH);
      m = measureWord(fontSize);

      const startX = (maskW - m.totalW) * 0.5;
      const drawnH = m.ascent + m.descent;
      const baselineY = (maskH - drawnH) * 0.5 + m.ascent;

      mctx.font = `800 ${fontSize.toFixed(1)}px ${displayFamily}`;
      let cursorX = startX;
      for (let i = 0; i < letters.length; i++) {
        mctx.fillText(letters[i], cursorX, baselineY);
        cursorX += m.widths[i] + m.track;
      }

      const img = mctx.getImageData(0, 0, maskW, maskH).data;
      const nextCells: CellSpec[] = [];
      const halfCols = Math.max(1, (cols - 1) * 0.5);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          let sum = 0;
          let peak = 0;
          const baseY = row * sampleScale;
          const baseX = col * sampleScale;

          for (let sy = 0; sy < sampleScale; sy++) {
            const rowOff = (baseY + sy) * maskW;
            for (let sx = 0; sx < sampleScale; sx++) {
              const a = img[(rowOff + baseX + sx) * 4 + 3] / 255;
              sum += a;
              if (a > peak) peak = a;
            }
          }

          const cov = sum / (sampleScale * sampleScale);
          if (cov < 0.14) continue;

          const h = stableHash(col, row);
          let glyph: string;
          let color: string;
          let alpha: number;

          if (cov < 0.24) {
            // Outermost thin silhouette fringe: ^ / - in Galaxy violet (#613DC1)
            glyph = h > 0.48 ? "^" : "-";
            color = "#613DC1";
            alpha = 0.88;
          } else if (cov < 0.44) {
            // Thin outer shoulder: t / + in Galaxy periwinkle (#858AE3)
            glyph = h > 0.46 ? "+" : "t";
            color = "#858AE3";
            alpha = 0.96;
          } else if (cov < 0.52) {
            // Inner edge transition into bright ice-blue (#97DFFC)
            glyph = h > 0.42 ? "=" : "+";
            color = "#97DFFC";
            alpha = 1.0;
          } else if (cov < 0.72) {
            // Strong letterform body: = / T in crisp #97DFFC with selective #D2F4FF highlights
            glyph = h > 0.36 ? "T" : "=";
            color = h > 0.68 ? "#D2F4FF" : "#97DFFC";
            alpha = 1.0;
          } else {
            // Dense solid letterform core: high-ink T / * / = lifted to #D2F4FF peak highlights
            glyph =
              peak > 0.96 && h > 0.58
                ? "*"
                : h > 0.2
                  ? "T"
                  : "=";
            color = h > 0.32 ? "#D2F4FF" : "#97DFFC";
            alpha = 1.0;
          }

          nextCells.push({
            col,
            row,
            glyph,
            color,
            alpha,
            centerDist: Math.min(1, Math.abs(col - halfCols) / halfCols),
            seed: Math.floor(h * 97),
          });
        }
      }

      cells = nextCells;
    };

    const drawProgress = (progress: number, tick: number) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!active && !settleImmediately) return;
      if (cells.length === 0 || cssW <= 1 || cssH <= 1) return;

      const cols = Math.max(36, Math.floor(cssW / cellW));
      const rows = Math.max(8, Math.floor(cssH / cellH));
      const offsetX = (cssW - cols * cellW) * 0.5;
      const offsetY = (cssH - rows * cellH) * 0.5;

      const fontPx = Math.max(8, Math.round(cellH * 1.15 * dpr));
      ctx.font = `400 ${fontPx}px ${monoFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];
        const px = Math.round((offsetX + (c.col + 0.5) * cellW) * dpr);
        const py = Math.round((offsetY + (c.row + 0.53) * cellH) * dpr);

        if (progress >= 1) {
          ctx.fillStyle = c.color;
          ctx.globalAlpha = c.alpha;
          ctx.fillText(c.glyph, px, py);
          continue;
        }

        const startT = c.centerDist * 0.5;
        const local = (progress - startT) / 0.44;
        if (local <= 0) continue;

        if (local >= 1) {
          ctx.fillStyle = c.color;
          ctx.globalAlpha = c.alpha;
          ctx.fillText(c.glyph, px, py);
        } else {
          const idx = (c.seed + tick) % LOCKED_GLYPHS.length;
          ctx.fillStyle = local > 0.65 ? "#97DFFC" : "#858AE3";
          ctx.globalAlpha = Math.min(1, local * 1.35) * c.alpha;
          ctx.fillText(LOCKED_GLYPHS[idx], px, py);
        }
      }

      ctx.globalAlpha = 1;
    };

    const startOrRender = () => {
      window.clearTimeout(delayTimer);
      window.cancelAnimationFrame(rafId);

      rebuildGrid();

      if (settleImmediately || settled) {
        settled = true;
        drawProgress(1, 0);
        return;
      }

      if (!active) {
        drawProgress(0, 0);
        return;
      }

      drawProgress(0, 0);
      delayTimer = window.setTimeout(() => {
        animStartTs = performance.now();
        let lastTickTs = animStartTs;
        let tick = 0;

        const step = (ts: number) => {
          const p = Math.min(1, (ts - animStartTs) / Math.max(160, durationMs));
          if (ts - lastTickTs >= 46 || p >= 1) {
            lastTickTs = ts;
            tick += 1;
            drawProgress(p, tick);
          }

          if (p < 1) {
            rafId = window.requestAnimationFrame(step);
          } else {
            settled = true;
            drawProgress(1, 0);
          }
        };

        rafId = window.requestAnimationFrame(step);
      }, delayMs);
    };

    startOrRender();

    const ro = new ResizeObserver(() => {
      rebuildGrid();
      if (settled || settleImmediately) {
        drawProgress(1, 0);
      } else if (!active) {
        drawProgress(0, 0);
      }
    });
    ro.observe(container);

    let disposed = false;
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready
        .then(() => {
          if (disposed) return;
          rebuildGrid();
          if (settled || settleImmediately) {
            drawProgress(1, 0);
          }
        })
        .catch(() => {});
    }

    return () => {
      disposed = true;
      window.clearTimeout(delayTimer);
      window.cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [active, instant, delayMs, durationMs]);

  return (
    <span
      ref={containerRef}
      className={`relative mx-auto block h-[60px] w-[308px] max-w-full sm:h-[98px] sm:w-[468px] ${className}`}
    >
      {/* Hidden font probes so Canvas2D reads the exact Next.js hashed font family strings */}
      <span
        ref={displayProbeRef}
        aria-hidden="true"
        className="font-display pointer-events-none sr-only"
      >
        MINUS
      </span>
      <span
        ref={monoProbeRef}
        aria-hidden="true"
        className="font-mono pointer-events-none sr-only"
      >
        T
      </span>

      <span className="sr-only">Minus</span>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block h-full w-full"
      />
    </span>
  );
}
