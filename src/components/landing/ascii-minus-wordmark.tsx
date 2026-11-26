"use client";

import React, { useEffect, useRef } from "react";

const MICRO_RAMP = [".", ":", "-", "^", "t", "+", "=", "T", "*"] as const;
const LETTERS = ["M", "I", "N", "U", "S"] as const;

interface MicroCell {
  px: number;
  py: number;
  col: number;
  row: number;
  xNorm: number;
  yNorm: number;
  baseIdx: number;
  phase: number;
  edgeFactor: number;
}

interface AsciiMinusWordmarkProps {
  /** Triggers the slow left-to-right micro-ASCII crystallization entrance */
  active: boolean;
  /** Render immediately settled (`?skipIntro=1` or reduced-motion) */
  instant?: boolean;
  /** Delay in ms after `active` turns true */
  delayMs?: number;
  /** Total entrance duration in ms */
  durationMs?: number;
  className?: string;
}

/**
 * 2B — Vector `MINUS` Filled Internally With Live Micro-ASCII:
 * - Crisp upright `Inter Tight` 700 vector letterforms clipped via offscreen `maskCanvas`
 *   (`destination-in`), eliminating all stair-stepping and blockiness.
 * - Interior packed with fine-pitch (`3.8–4.2px`) live `#97DFFC -> #F7FAFF` micro-ASCII
 *   texture (`IBM Plex Mono`) over a subtle luminous ice-blue backing + razor hairline edge.
 * - Gentle 10fps living shimmer when settled + magnetic desktop hover wake.
 * - DPR capped at `2.0`.
 */
export function AsciiMinusWordmark({
  active,
  instant = false,
  delayMs = 180,
  durationMs = 1050,
  className = "",
}: AsciiMinusWordmarkProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const headingProbeRef = useRef<HTMLSpanElement | null>(null);
  const monoProbeRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const maskCanvas = document.createElement("canvas");
    const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });
    if (!maskCtx) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const settleImmediately = instant || reducedMotion;

    let cssW = 0;
    let cssH = 0;
    let dpr = 2;
    let headingFamily = '"Inter Tight", "Inter", -apple-system, sans-serif';
    let monoFamily = '"IBM Plex Mono", ui-monospace, SFMono-Regular, monospace';

    let cellPxW = 8;
    let cellPxH = 10;
    let cells: MicroCell[] = [];
    let letterPositions: Array<{ ch: string; x: number; y: number }> = [];
    let vectorFont = "";
    let boundsLeft = 0;
    let boundsWidth = 1;

    let rafId = 0;
    let delayTimer = 0;
    let animStartTs = 0;
    let introProgress = settleImmediately ? 1 : 0;
    let introStarted = settleImmediately;
    let settled = settleImmediately;
    let inViewport = true;
    let lastShimmerTs = 0;

    // Desktop magnetic pointer wake
    let pointerPxX = -9999;
    let pointerPxY = -9999;
    let wakeStrength = 0;
    let wakeTarget = 0;

    const rebuildMaskAndCells = () => {
      const rect = container.getBoundingClientRect();
      cssW = Math.max(1, Math.round(rect.width));
      cssH = Math.max(1, Math.round(rect.height));
      const isMobile = cssW < 340;
      dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), 2.0);

      const cw = Math.max(2, Math.round(cssW * dpr));
      const ch = Math.max(2, Math.round(cssH * dpr));
      canvas.width = cw;
      canvas.height = ch;
      maskCanvas.width = cw;
      maskCanvas.height = ch;

      if (headingProbeRef.current) {
        headingFamily = window.getComputedStyle(headingProbeRef.current).fontFamily;
      }
      if (monoProbeRef.current) {
        monoFamily = window.getComputedStyle(monoProbeRef.current).fontFamily;
      }

      // Compute clean upright architectural vector typography fitting container height
      const fontSizePx = Math.round(ch * (isMobile ? 0.86 : 0.88));
      vectorFont = `700 ${fontSizePx}px ${headingFamily}`;
      maskCtx.setTransform(1, 0, 0, 1, 0, 0);
      maskCtx.clearRect(0, 0, cw, ch);
      maskCtx.font = vectorFont;
      maskCtx.textAlign = "left";
      maskCtx.textBaseline = "middle";

      const trackingPx = fontSizePx * 0.068;
      const widths = LETTERS.map((chLetter) => maskCtx.measureText(chLetter).width);
      const totalW =
        widths.reduce((acc, w) => acc + w, 0) +
        trackingPx * (LETTERS.length - 1);

      // Fit safely inside canvas width with 4% breathing margin
      const fitRatio = totalW > cw * 0.94 ? (cw * 0.94) / totalW : 1;
      const finalFontPx = Math.max(24, Math.round(fontSizePx * fitRatio));
      const finalTrackingPx = finalFontPx * 0.068;
      vectorFont = `700 ${finalFontPx}px ${headingFamily}`;
      maskCtx.font = vectorFont;

      const finalWidths = LETTERS.map(
        (chLetter) => maskCtx.measureText(chLetter).width
      );
      const finalTotalW =
        finalWidths.reduce((acc, w) => acc + w, 0) +
        finalTrackingPx * (LETTERS.length - 1);

      let cursorX = (cw - finalTotalW) * 0.5;
      const centerY = ch * 0.52;
      boundsLeft = cursorX;
      boundsWidth = Math.max(1, finalTotalW);

      letterPositions = [];
      maskCtx.fillStyle = "#ffffff";
      for (let i = 0; i < LETTERS.length; i++) {
        const chLetter = LETTERS[i];
        letterPositions.push({ ch: chLetter, x: cursorX, y: centerY });
        maskCtx.fillText(chLetter, cursorX, centerY);
        cursorX += finalWidths[i] + finalTrackingPx;
      }

      // Sample mask pixels to precompute interior micro-ASCII cell centers (3.8-4.2px pitch)
      const imgData = maskCtx.getImageData(0, 0, cw, ch).data;
      const cellCssW = isMobile ? 3.8 : 4.2;
      const cellCssH = isMobile ? 4.8 : 5.3;
      cellPxW = Math.max(5, Math.round(cellCssW * dpr));
      cellPxH = Math.max(6, Math.round(cellCssH * dpr));

      const cols = Math.ceil(cw / cellPxW);
      const rows = Math.ceil(ch / cellPxH);
      const nextCells: MicroCell[] = [];

      for (let r = 0; r < rows; r++) {
        const py = Math.round((r + 0.5) * cellPxH);
        if (py < 0 || py >= ch) continue;
        for (let c = 0; c < cols; c++) {
          const px = Math.round((c + 0.5) * cellPxW);
          if (px < 0 || px >= cw) continue;

          // Sample 5 points inside cell so stroke edges remain richly populated before clipping
          const idxCenter = (py * cw + px) * 4 + 3;
          const aCenter = imgData[idxCenter];
          const sx1 = Math.max(0, px - Math.floor(cellPxW * 0.35));
          const sx2 = Math.min(cw - 1, px + Math.floor(cellPxW * 0.35));
          const sy1 = Math.max(0, py - Math.floor(cellPxH * 0.35));
          const sy2 = Math.min(ch - 1, py + Math.floor(cellPxH * 0.35));
          const aMax = Math.max(
            aCenter,
            imgData[(py * cw + sx1) * 4 + 3],
            imgData[(py * cw + sx2) * 4 + 3],
            imgData[(sy1 * cw + px) * 4 + 3],
            imgData[(sy2 * cw + px) * 4 + 3]
          );
          if (aMax < 36) continue;

          const xNorm = Math.min(1, Math.max(0, (px - boundsLeft) / boundsWidth));
          const yNorm = py / Math.max(1, ch);
          const hash =
            Math.abs(Math.sin(c * 12.9898 + r * 78.233) * 43758.5453) % 1;
          const edgeFactor = aCenter < 200 ? 1 : 0;

          // Rich structured density distribution favoring crisp `t + = T *` inside strokes
          const lumBias = (1 - yNorm * 0.32) * 0.72 + hash * 0.28;
          const baseIdx = Math.min(
            MICRO_RAMP.length - 1,
            Math.max(2, Math.floor(lumBias * MICRO_RAMP.length))
          );

          nextCells.push({
            px,
            py,
            col: c,
            row: r,
            xNorm,
            yNorm,
            baseIdx,
            phase: hash * Math.PI * 2,
            edgeFactor,
          });
        }
      }

      cells = nextCells;
    };

    const draw = (ts: number) => {
      const cw = canvas.width;
      const ch = canvas.height;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, cw, ch);

      if (!active && !settleImmediately) return;
      if (introProgress <= 0.001 && !settleImmediately) return;

      const tSec = ts * 0.001;

      // 1) Subtle luminous ice-blue -> periwinkle interior backing so letterforms read instantly
      const bgGrad = ctx.createLinearGradient(0, 0, cw, ch);
      bgGrad.addColorStop(0, "rgba(151, 223, 252, 0.34)");
      bgGrad.addColorStop(0.5, "rgba(196, 240, 255, 0.28)");
      bgGrad.addColorStop(1, "rgba(133, 138, 227, 0.28)");

      if (introProgress < 1) {
        const revealX = boundsLeft + boundsWidth * Math.min(1, introProgress * 1.06);
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, revealX, ch);
        ctx.clip();
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, cw, ch);
        ctx.restore();
      } else {
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, cw, ch);
      }

      // 2) Fine-pitch live micro-ASCII texture packed cleanly inside the letters
      const microFontPx = Math.max(7, Math.round(cellPxH * 1.04));
      ctx.font = `700 ${microFontPx}px ${monoFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const wakeRadPx = 56 * dpr;

      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];

        let glyphIdx = c.baseIdx;
        let color = "#97DFFC";
        let alpha = 0.92;

        if (introProgress < 1) {
          // Slow, obvious left-to-right crystallization wavefront across MINUS
          const slotStart = c.xNorm * 0.66;
          const local = (introProgress - slotStart) / 0.34;
          if (local <= 0) continue;

          if (local < 1) {
            glyphIdx = Math.min(
              MICRO_RAMP.length - 1,
              Math.floor(local * MICRO_RAMP.length)
            );
            color =
              local > 0.72 ? "#F7FAFF" : local > 0.38 ? "#97DFFC" : "#858AE3";
            alpha = Math.min(1, 0.35 + local * 0.85);
          } else {
            const crest =
              0.5 + 0.5 * Math.sin(tSec * 1.4 - c.xNorm * 6.0 + c.phase);
            color = crest > 0.68 ? "#F7FAFF" : "#97DFFC";
          }
        } else {
          // Calm, subtle living micro-ASCII shimmer when settled
          const wave = Math.sin(tSec * 1.35 - c.xNorm * 5.2 + c.yNorm * 2.4 + c.phase);
          const shift = wave > 0.78 ? 1 : wave < -0.82 ? -1 : 0;
          glyphIdx = Math.min(
            MICRO_RAMP.length - 1,
            Math.max(1, c.baseIdx + shift)
          );

          if (c.edgeFactor && wave < -0.2) {
            color = "#B7EBFF";
            alpha = 0.86;
          } else if (wave > 0.55 || glyphIdx >= 7) {
            color = "#F7FAFF";
            alpha = 0.98;
          } else if (wave < -0.55) {
            color = "#858AE3";
            alpha = 0.82;
          } else {
            color = "#97DFFC";
            alpha = 0.94;
          }

          // Desktop magnetic hover wake
          if (wakeStrength > 0.005) {
            const d = Math.hypot(c.px - pointerPxX, c.py - pointerPxY);
            if (d < wakeRadPx) {
              const f = Math.pow(1 - d / wakeRadPx, 1.6) * wakeStrength;
              if (f > 0.14) {
                glyphIdx = Math.min(
                  MICRO_RAMP.length - 1,
                  glyphIdx + (f > 0.52 ? 2 : 1)
                );
                color = "#F7FAFF";
                alpha = 1.0;
              }
            }
          }
        }

        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.fillText(MICRO_RAMP[glyphIdx], c.px, c.py);
      }

      ctx.globalAlpha = 1;

      // 3) Clip the entire micro-ASCII field strictly inside the anti-aliased vector `MINUS` letterforms
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(maskCanvas, 0, 0);
      ctx.globalCompositeOperation = "source-over";

      // 4) Razor-crisp translucent vector edge stroke around `MINUS` for luxury typographic definition
      if (letterPositions.length > 0) {
        ctx.save();
        if (introProgress < 1) {
          const revealX =
            boundsLeft + boundsWidth * Math.min(1, introProgress * 1.06);
          ctx.beginPath();
          ctx.rect(0, 0, revealX, ch);
          ctx.clip();
        }
        ctx.font = vectorFont;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.lineWidth = Math.max(0.85, 0.85 * dpr);
        ctx.strokeStyle = "rgba(151, 223, 252, 0.56)";
        for (let i = 0; i < letterPositions.length; i++) {
          const lp = letterPositions[i];
          ctx.strokeText(lp.ch, lp.x, lp.y);
        }
        ctx.restore();
      }
    };

    let lastTs = performance.now();
    const tick = (ts: number) => {
      rafId = window.requestAnimationFrame(tick);
      if (document.hidden || !inViewport) {
        lastTs = ts;
        return;
      }

      const dt = Math.min(0.05, Math.max(0.001, (ts - lastTs) * 0.001));
      lastTs = ts;

      const animatingIntro = introStarted && !settled;
      if (animatingIntro) {
        if (animStartTs === 0) animStartTs = ts;
        introProgress = Math.min(
          1,
          (ts - animStartTs) / Math.max(200, durationMs)
        );
        if (introProgress >= 1) {
          settled = true;
        }
      }

      const lerpRate = wakeTarget > wakeStrength ? 14 : 8;
      wakeStrength += (wakeTarget - wakeStrength) * Math.min(1, dt * lerpRate);
      if (Math.abs(wakeTarget - wakeStrength) < 0.003) {
        wakeStrength = wakeTarget;
      }

      const wakeActive = wakeStrength > 0.003 || wakeTarget > 0;
      if (animatingIntro || wakeActive) {
        draw(ts);
      } else if (settled && !reducedMotion && ts - lastShimmerTs >= 95) {
        // Gentle ~10fps living micro-ASCII shimmer (zero CPU burn)
        lastShimmerTs = ts;
        draw(ts);
      }
    };

    rebuildMaskAndCells();

    if (settleImmediately) {
      introProgress = 1;
      introStarted = true;
      settled = true;
      draw(performance.now());
    } else if (active) {
      delayTimer = window.setTimeout(() => {
        introStarted = true;
        animStartTs = 0;
      }, delayMs);
    }

    if (!reducedMotion) {
      rafId = window.requestAnimationFrame(tick);
    } else if (active || settleImmediately) {
      draw(performance.now());
    }

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || reducedMotion || !settled) return;
      const rect = container.getBoundingClientRect();
      pointerPxX = (e.clientX - rect.left) * dpr;
      pointerPxY = (e.clientY - rect.top) * dpr;
      wakeTarget = 1;
    };
    const onPointerLeave = () => {
      wakeTarget = 0;
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave, { passive: true });

    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          inViewport = entries[0]?.isIntersecting ?? true;
        },
        { threshold: 0.02 }
      );
      io.observe(container);
    }

    const ro = new ResizeObserver(() => {
      rebuildMaskAndCells();
      if (settled || settleImmediately || introProgress > 0) {
        draw(performance.now());
      }
    });
    ro.observe(container);

    let disposed = false;
    document.fonts?.ready
      .then(() => {
        if (disposed) return;
        rebuildMaskAndCells();
        if (settled || settleImmediately || introProgress > 0) {
          draw(performance.now());
        }
      })
      .catch(() => {});

    return () => {
      disposed = true;
      window.clearTimeout(delayTimer);
      window.cancelAnimationFrame(rafId);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      io?.disconnect();
      ro.disconnect();
    };
  }, [active, instant, delayMs, durationMs]);

  return (
    <span
      ref={containerRef}
      data-minus-wordmark="vector-micro-ascii"
      className={`relative mx-auto block h-[64px] w-[276px] max-w-full cursor-default select-none sm:h-[104px] sm:w-[448px] ${className}`}
    >
      <span
        ref={headingProbeRef}
        aria-hidden="true"
        className="pointer-events-none sr-only font-heading font-bold"
      >
        MINUS
      </span>
      <span
        ref={monoProbeRef}
        aria-hidden="true"
        className="pointer-events-none sr-only font-mono font-semibold"
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
