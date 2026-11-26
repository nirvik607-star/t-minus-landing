"use client";

import React, { useEffect, useRef } from "react";

/** Strict T^minus ASCII ramp (no cluttered `* + =` static). */
const MICRO_RAMP = [".", ":", "-", "^", "t", "T"] as const;
const PALETTE_COLORS = ["#858AE3", "#97DFFC", "#F7FAFF"] as const;
const LETTERS = ["M", "I", "N", "U", "S"] as const;

interface MicroCell {
  px: number;
  py: number;
  xNorm: number;
  yNorm: number;
  baseIdx: number;
  edgeFactor: number;
}

interface AsciiMinusWordmarkProps {
  /** Triggers the crisp left-to-right micro-ASCII crystallization entrance */
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
 * Vector `MINUS` Filled Internally With Crisp Pre-Baked Micro-ASCII:
 * - Defers all canvas/DOM work until `active || instant` so cold load has zero
 *   overhead before the opening dying star paints.
 * - Ink-cropped upright `Inter Tight` 700 vector letterforms clipped cleanly via
 *   offscreen `maskCanvas` (`destination-in`), eliminating dead top/bottom padding
 *   so vertical spacing above and below `MINUS` is visually exact.
 * - Pre-rendered integer-aligned sprite atlas (`IBM Plex Mono` 600, strict
 *   `.:-^tT` ramp) blitted via `drawImage` (zero per-frame `fillText` churn).
 * - Spatially coherent traveling sheen (zero per-cell random static flicker),
 *   calm ~8fps idle cadence, and automatic rAF pause when out of viewport.
 */
export function AsciiMinusWordmark({
  active,
  instant = false,
  delayMs = 110,
  durationMs = 620,
  className = "",
}: AsciiMinusWordmarkProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const headingProbeRef = useRef<HTMLSpanElement | null>(null);
  const monoProbeRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    // Do zero canvas allocation or layout work during the 9s intro before hero reveal
    if (!active && !instant) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const maskCanvas = document.createElement("canvas");
    const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });
    if (!maskCtx) return;

    const spriteCanvas = document.createElement("canvas");
    const spriteCtx = spriteCanvas.getContext("2d");
    if (!spriteCtx) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const settleImmediately = instant || reducedMotion;

    let cssW = 0;
    let cssH = 0;
    let dpr = 1.5;
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
    let loopRunning = false;
    let delayTimer = 0;
    let animStartTs = 0;
    let introProgress = settleImmediately ? 1 : 0;
    let introStarted = settleImmediately;
    let settled = settleImmediately;
    let inViewport = true;
    let lastShimmerTs = 0;
    let disposed = false;

    // Desktop magnetic pointer wake
    let pointerPxX = -9999;
    let pointerPxY = -9999;
    let wakeStrength = 0;
    let wakeTarget = 0;

    const rebuildSprites = () => {
      spriteCanvas.width = Math.max(1, MICRO_RAMP.length * cellPxW);
      spriteCanvas.height = Math.max(1, PALETTE_COLORS.length * cellPxH);
      spriteCtx.setTransform(1, 0, 0, 1, 0, 0);
      spriteCtx.clearRect(0, 0, spriteCanvas.width, spriteCanvas.height);

      const microFontPx = Math.max(7, Math.round(cellPxH * 0.88));
      // Use loaded IBM Plex Mono weight 600 (never unsupplied 700 faux-bold)
      spriteCtx.font = `600 ${microFontPx}px ${monoFamily}`;
      spriteCtx.textAlign = "center";
      spriteCtx.textBaseline = "middle";

      for (let row = 0; row < PALETTE_COLORS.length; row++) {
        spriteCtx.fillStyle = PALETTE_COLORS[row];
        const cy = Math.round((row + 0.52) * cellPxH);
        for (let i = 0; i < MICRO_RAMP.length; i++) {
          const cx = Math.round((i + 0.5) * cellPxW);
          spriteCtx.fillText(MICRO_RAMP[i], cx, cy);
        }
      }
    };

    const rebuildMaskAndCells = () => {
      const rect = container.getBoundingClientRect();
      const nextCssW = Math.max(1, Math.round(rect.width));
      const nextCssH = Math.max(1, Math.round(rect.height));
      const isMobile = nextCssW < 340;
      const nextDpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), 1.5);

      cssW = nextCssW;
      cssH = nextCssH;
      dpr = nextDpr;

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

      // Measure actual cap-height ink box so MINUS fills container symmetrically
      // with zero dead top/bottom padding
      const probeSize = Math.max(32, Math.round(ch * 1.18));
      maskCtx.setTransform(1, 0, 0, 1, 0, 0);
      maskCtx.clearRect(0, 0, cw, ch);
      maskCtx.font = `700 ${probeSize}px ${headingFamily}`;
      maskCtx.textAlign = "left";
      maskCtx.textBaseline = "alphabetic";

      const sampleMetrics = maskCtx.measureText("MINUS");
      const probeAscent =
        sampleMetrics.actualBoundingBoxAscent > 0
          ? sampleMetrics.actualBoundingBoxAscent
          : probeSize * 0.72;
      const probeDescent =
        sampleMetrics.actualBoundingBoxDescent >= 0
          ? sampleMetrics.actualBoundingBoxDescent
          : probeSize * 0.02;
      const probeInkH = Math.max(1, probeAscent + probeDescent);

      // Fit ink height cleanly to 90% of canvas height
      const targetInkH = ch * 0.9;
      let finalFontPx = Math.max(24, Math.round(probeSize * (targetInkH / probeInkH)));
      let finalTrackingPx = finalFontPx * 0.064;
      maskCtx.font = `700 ${finalFontPx}px ${headingFamily}`;

      const widths = LETTERS.map((chLetter) => maskCtx.measureText(chLetter).width);
      const totalW =
        widths.reduce((acc, w) => acc + w, 0) +
        finalTrackingPx * (LETTERS.length - 1);

      // Also constrain to 95% of canvas width
      if (totalW > cw * 0.95) {
        const fitRatio = (cw * 0.95) / totalW;
        finalFontPx = Math.max(20, Math.round(finalFontPx * fitRatio));
        finalTrackingPx = finalFontPx * 0.064;
      }

      vectorFont = `700 ${finalFontPx}px ${headingFamily}`;
      maskCtx.font = vectorFont;

      const finalMetrics = maskCtx.measureText("MINUS");
      const finalAscent =
        finalMetrics.actualBoundingBoxAscent > 0
          ? finalMetrics.actualBoundingBoxAscent
          : finalFontPx * 0.72;
      const finalDescent =
        finalMetrics.actualBoundingBoxDescent >= 0
          ? finalMetrics.actualBoundingBoxDescent
          : 0;
      const baselineY = Math.round(ch * 0.5 + (finalAscent - finalDescent) * 0.5);

      const finalWidths = LETTERS.map(
        (chLetter) => maskCtx.measureText(chLetter).width
      );
      const finalTotalW =
        finalWidths.reduce((acc, w) => acc + w, 0) +
        finalTrackingPx * (LETTERS.length - 1);

      let cursorX = (cw - finalTotalW) * 0.5;
      boundsLeft = cursorX;
      boundsWidth = Math.max(1, finalTotalW);

      letterPositions = [];
      maskCtx.fillStyle = "#ffffff";
      for (let i = 0; i < LETTERS.length; i++) {
        const chLetter = LETTERS[i];
        letterPositions.push({ ch: chLetter, x: cursorX, y: baselineY });
        maskCtx.fillText(chLetter, cursorX, baselineY);
        cursorX += finalWidths[i] + finalTrackingPx;
      }

      // Clean, legible micro-ASCII cell pitch (5.6x6.8px desktop / 4.6x5.8px mobile)
      const cellCssW = isMobile ? 4.6 : 5.6;
      const cellCssH = isMobile ? 5.8 : 6.8;
      cellPxW = Math.max(5, Math.round(cellCssW * dpr));
      cellPxH = Math.max(7, Math.round(cellCssH * dpr));
      rebuildSprites();

      const imgData = maskCtx.getImageData(0, 0, cw, ch).data;
      const cols = Math.ceil(cw / cellPxW);
      const rows = Math.ceil(ch / cellPxH);
      const nextCells: MicroCell[] = [];

      for (let r = 0; r < rows; r++) {
        const py = Math.round((r + 0.5) * cellPxH);
        if (py < 0 || py >= ch) continue;
        for (let c = 0; c < cols; c++) {
          const px = Math.round((c + 0.5) * cellPxW);
          if (px < 0 || px >= cw) continue;

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
          const edgeFactor = aCenter < 200 ? 1 : 0;

          // Structured deterministic density favoring crisp `- ^ t T` inside strokes
          const pattern = ((c * 3 + r * 5) & 7) / 7;
          const lumBias = (1 - yNorm * 0.28) * 0.68 + pattern * 0.32;
          const baseIdx = Math.min(
            MICRO_RAMP.length - 1,
            Math.max(2, Math.floor(lumBias * MICRO_RAMP.length))
          );

          nextCells.push({
            px: Math.round(px - cellPxW * 0.5),
            py: Math.round(py - cellPxH * 0.5),
            xNorm,
            yNorm,
            baseIdx,
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

      // 1) Luminous ice-blue -> periwinkle interior backing with soft wavefront feather
      const bgGrad = ctx.createLinearGradient(0, 0, cw, ch);
      bgGrad.addColorStop(0, "rgba(151, 223, 252, 0.32)");
      bgGrad.addColorStop(0.5, "rgba(196, 240, 255, 0.26)");
      bgGrad.addColorStop(1, "rgba(133, 138, 227, 0.26)");

      if (introProgress < 1) {
        // Match backing softly to the active crystallization wavefront
        const waveHeadX = boundsLeft + boundsWidth * Math.min(1, introProgress * 1.15);
        const waveTailX = Math.max(0, waveHeadX - boundsWidth * 0.32);
        const fadeGrad = ctx.createLinearGradient(waveTailX, 0, waveHeadX, 0);
        fadeGrad.addColorStop(0, "rgba(151, 223, 252, 0.30)");
        fadeGrad.addColorStop(0.65, "rgba(151, 223, 252, 0.16)");
        fadeGrad.addColorStop(1, "rgba(151, 223, 252, 0)");
        ctx.fillStyle = fadeGrad;
        ctx.fillRect(0, 0, Math.min(cw, waveHeadX + 2), ch);
      } else {
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, cw, ch);
      }

      // 2) Crisp integer-blitted micro-ASCII texture (coherent wave, zero noisy static)
      const wakeRadPx = 56 * dpr;

      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];

        let glyphIdx = c.baseIdx;
        let paletteRow = 1; // #97DFFC
        let alpha = 0.94;

        if (introProgress < 1) {
          const slotStart = c.xNorm * 0.62;
          const local = (introProgress - slotStart) / 0.38;
          if (local <= 0) continue;

          if (local < 1) {
            glyphIdx = Math.min(
              MICRO_RAMP.length - 1,
              Math.floor(local * MICRO_RAMP.length)
            );
            paletteRow = local > 0.72 ? 2 : local > 0.36 ? 1 : 0;
            alpha = Math.min(1, 0.42 + local * 0.65);
          } else {
            const crest = 0.5 + 0.5 * Math.sin(tSec * 1.15 - c.xNorm * 4.4);
            paletteRow = crest > 0.78 ? 2 : 1;
          }
        } else {
          // Spatially coherent traveling sheen across MINUS (zero per-cell random jitter)
          const wave = Math.sin(tSec * 1.05 - c.xNorm * 4.2 + c.yNorm * 1.5);
          if (wave > 0.86) {
            glyphIdx = Math.min(MICRO_RAMP.length - 1, c.baseIdx + 1);
            paletteRow = 2; // #F7FAFF highlight crest
            alpha = 0.98;
          } else if (wave < -0.72) {
            paletteRow = 0; // #858AE3 subtle periwinkle trough
            alpha = 0.86;
          } else {
            paletteRow = c.edgeFactor && wave > 0.25 ? 2 : 1;
            alpha = 0.94;
          }

          // Desktop magnetic hover wake
          if (wakeStrength > 0.005) {
            const cx = c.px + cellPxW * 0.5;
            const cy = c.py + cellPxH * 0.5;
            const d = Math.hypot(cx - pointerPxX, cy - pointerPxY);
            if (d < wakeRadPx) {
              const f = Math.pow(1 - d / wakeRadPx, 1.5) * wakeStrength;
              if (f > 0.16) {
                glyphIdx = Math.min(
                  MICRO_RAMP.length - 1,
                  glyphIdx + (f > 0.55 ? 2 : 1)
                );
                paletteRow = 2;
                alpha = 1.0;
              }
            }
          }
        }

        ctx.globalAlpha = alpha;
        ctx.drawImage(
          spriteCanvas,
          glyphIdx * cellPxW,
          paletteRow * cellPxH,
          cellPxW,
          cellPxH,
          c.px,
          c.py,
          cellPxW,
          cellPxH
        );
      }

      ctx.globalAlpha = 1;

      // 3) Clip micro-ASCII field strictly inside the anti-aliased vector `MINUS` letterforms
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(maskCanvas, 0, 0);
      ctx.globalCompositeOperation = "source-over";

      // 4) Razor-crisp translucent vector edge stroke around `MINUS`
      if (letterPositions.length > 0) {
        ctx.save();
        const strokeAlpha =
          introProgress < 1
            ? Math.min(0.56, Math.max(0, (introProgress - 0.18) / 0.82) * 0.56)
            : 0.56;
        if (strokeAlpha > 0.01) {
          ctx.font = vectorFont;
          ctx.textAlign = "left";
          ctx.textBaseline = "alphabetic";
          ctx.lineWidth = Math.max(0.85, 0.85 * dpr);
          ctx.strokeStyle = `rgba(151, 223, 252, ${strokeAlpha.toFixed(3)})`;
          for (let i = 0; i < letterPositions.length; i++) {
            const lp = letterPositions[i];
            ctx.strokeText(lp.ch, lp.x, lp.y);
          }
        }
        ctx.restore();
      }
    };

    let lastTs = performance.now();
    const tick = (ts: number) => {
      if (disposed || document.hidden || !inViewport) {
        loopRunning = false;
        return;
      }

      rafId = window.requestAnimationFrame(tick);

      const dt = Math.min(0.05, Math.max(0.001, (ts - lastTs) * 0.001));
      lastTs = ts;

      const animatingIntro = introStarted && !settled;
      if (animatingIntro) {
        if (animStartTs === 0) animStartTs = ts;
        introProgress = Math.min(
          1,
          (ts - animStartTs) / Math.max(180, durationMs)
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
      } else if (settled && !reducedMotion && ts - lastShimmerTs >= 125) {
        // Calm ~8fps coherent sheen (near-zero CPU via sprite blits)
        lastShimmerTs = ts;
        draw(ts);
      }
    };

    const startLoop = () => {
      if (disposed || reducedMotion || loopRunning || document.hidden || !inViewport) {
        return;
      }
      loopRunning = true;
      lastTs = performance.now();
      rafId = window.requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      if (!loopRunning) return;
      loopRunning = false;
      window.cancelAnimationFrame(rafId);
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
        startLoop();
      }, delayMs);
    }

    if (!reducedMotion && (settleImmediately || active)) {
      startLoop();
    } else if (active || settleImmediately) {
      draw(performance.now());
    }

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || reducedMotion || !settled) return;
      const rect = container.getBoundingClientRect();
      pointerPxX = (e.clientX - rect.left) * dpr;
      pointerPxY = (e.clientY - rect.top) * dpr;
      wakeTarget = 1;
      startLoop();
    };
    const onPointerLeave = () => {
      wakeTarget = 0;
    };

    const onVisibility = () => {
      if (document.hidden) {
        stopLoop();
      } else if (inViewport && (active || settleImmediately)) {
        startLoop();
      }
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          inViewport = entries[0]?.isIntersecting ?? true;
          if (!inViewport) {
            stopLoop();
          } else if (active || settleImmediately) {
            startLoop();
          }
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
      stopLoop();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      io?.disconnect();
      ro.disconnect();
    };
  }, [active, instant, delayMs, durationMs]);

  return (
    <span
      ref={containerRef}
      data-minus-wordmark="vector-micro-ascii"
      className={`relative mx-auto block h-[48px] w-[264px] max-w-full cursor-default select-none sm:h-[74px] sm:w-[418px] ${className}`}
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
