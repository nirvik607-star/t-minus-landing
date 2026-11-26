"use client";

import React, { useEffect, useRef } from "react";

/**
 * Strict locked T^minus ASCII density ramp (`^ - t + = T *`).
 * Zero `.`, zero `:`, zero `·`.
 */
const DENSITY_RAMP = ["^", "-", "t", "+", "=", "T", "*"] as const;

type CellRole = "primary" | "bridge" | "diagonal" | "bevel";

interface BlueprintCell {
  col: number;
  row: number;
  role: CellRole;
  baseIdx: number;
  baseColor: string;
  baseWeight: 500 | 600 | 700;
  /** Normalized horizontal distance from wordmark center (0 = center, 1 = outer edge) */
  centerDist: number;
  /** Left-to-right column ratio (0..1) for photon lock-in sweep */
  xNorm: number;
  seed: number;
}

/**
 * Hand-tuned 56x9 architectural ASCII matrix for `M I N U S`:
 * - Guaranteed 3-column pure obsidian gaps between every letter
 * - Wide-open interior counters so `MINUS` reads unmistakably at any viewport size
 * - Structural role tokens:
 *     `#` = primary structural vertical/peak (`T` / `*` in `#F7FAFF` / `#D4F5FF`)
 *     `=` = horizontal bar / bridge (`=` / `+` in `#97DFFC`)
 *     `~` = diagonal / inner chamfer (`t` / `+` in `#858AE3`)
 *     `^` = crisp single-cell exterior bevel accent (`^` / `-` in `#613DC1`)
 */
const LETTERS: readonly (readonly string[])[] = [
  // M (11 cols)
  [
    "##^     ^##",
    "###~   ~###",
    "##=#~ ~#=##",
    "## ~#=#~ ##",
    "##  =#=  ##",
    "##   ~   ##",
    "##       ##",
    "##       ##",
    "#=       =#",
  ],
  // I (5 cols)
  [
    "=###=",
    " ~#~ ",
    " ### ",
    " ### ",
    " ### ",
    " ### ",
    " ### ",
    " ~#~ ",
    "=###=",
  ],
  // N (10 cols)
  [
    "###     ##",
    "##=#    ##",
    "## ~#   ##",
    "##  =#  ##",
    "##   =# ##",
    "##    =###",
    "##     ###",
    "##     ~##",
    "#=      =#",
  ],
  // U (9 cols)
  [
    "#=     =#",
    "##     ##",
    "##     ##",
    "##     ##",
    "##     ##",
    "##     ##",
    "##~   ~##",
    "~#=====#~",
    " ^=====^ ",
  ],
  // S (9 cols)
  [
    " ^=====^ ",
    "~#=====#~",
    "##     ^~",
    "~##===~  ",
    "  ^===##~",
    "      ~##",
    "^~     ##",
    "~#=====#~",
    " ^=====^ ",
  ],
];

const LETTER_GAP = 3;
const GRID_ROWS = 9;
const GRID_COLS =
  LETTERS.reduce((sum, glyph) => sum + glyph[0].length, 0) +
  LETTER_GAP * (LETTERS.length - 1); // 11 + 3 + 5 + 3 + 10 + 3 + 9 + 3 + 9 = 56 cols

function buildBlueprintCells(): BlueprintCell[] {
  const cells: BlueprintCell[] = [];
  const halfCols = (GRID_COLS - 1) * 0.5;
  let colOffset = 0;

  for (let l = 0; l < LETTERS.length; l++) {
    const glyphRows = LETTERS[l];
    const glyphW = glyphRows[0].length;

    for (let r = 0; r < GRID_ROWS; r++) {
      const line = glyphRows[r];
      for (let c = 0; c < glyphW; c++) {
        const token = line[c];
        if (token === " ") continue;

        const col = colOffset + c;
        const hash = Math.abs(Math.sin(col * 12.9898 + r * 78.233) * 43758.5453) % 1;

        let role: CellRole;
        let baseIdx: number;
        let baseColor: string;
        let baseWeight: 500 | 600 | 700;

        if (token === "#") {
          role = "primary";
          // Load-bearing corners & top/bottom anchor peaks get `*`, vertical stems get `T`
          const isPeak = (r === 0 || r === 4 || r === 8) && hash > 0.62;
          baseIdx = isPeak ? 6 : 5; // `*` or `T`
          baseColor = isPeak ? "#F7FAFF" : hash > 0.35 ? "#E6F8FF" : "#D2F4FF";
          baseWeight = 700;
        } else if (token === "=") {
          role = "bridge";
          baseIdx = hash > 0.25 ? 4 : 3; // `=` or `+`
          baseColor = "#97DFFC";
          baseWeight = 600;
        } else if (token === "~") {
          role = "diagonal";
          baseIdx = hash > 0.45 ? 3 : 2; // `+` or `t`
          baseColor = "#858AE3";
          baseWeight = 500;
        } else {
          role = "bevel";
          baseIdx = hash > 0.5 ? 0 : 1; // `^` or `-`
          baseColor = "#613DC1";
          baseWeight = 500;
        }

        cells.push({
          col,
          row: r,
          role,
          baseIdx,
          baseColor,
          baseWeight,
          centerDist: Math.min(1, Math.abs(col - halfCols) / Math.max(1, halfCols)),
          xNorm: col / Math.max(1, GRID_COLS - 1),
          seed: Math.floor(hash * 97),
        });
      }
    }

    colOffset += glyphW + LETTER_GAP;
  }

  return cells;
}

const BLUEPRINT_CELLS = buildBlueprintCells();

interface AsciiMinusWordmarkProps {
  /** Triggers the 3-beat loom-weave ASCII materialization after horizon resolve */
  active: boolean;
  /** Render immediately settled (`?skipIntro=1` or reduced-motion) */
  instant?: boolean;
  /** Delay in ms after `active` turns true */
  delayMs?: number;
  /** Total loom-weave entrance duration in ms */
  durationMs?: number;
  className?: string;
}

/**
 * Sculptural high-DPI Canvas2D ASCII centerpiece for `MINUS`:
 * - Bespoke 56x9 architectural glyph matrix in probed `Geist Mono` (600/700)
 * - Exact integer physical-pixel snapping at native DPR (<=2.5 desktop / <=3.0 mobile)
 * - Strictly ` ^-t+=T*` with structural stroke-role coloring (zero random dither mud)
 * - 3-beat loom-weave entrance + Innovation C (Gravitational Magnetic ASCII Hover Wake)
 * - Zero idle rAF loop once settled and pointer is outside bounds.
 */
export function AsciiMinusWordmark({
  active,
  instant = false,
  delayMs = 200,
  durationMs = 680,
  className = "",
}: AsciiMinusWordmarkProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
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
    let cellPxW = 20;
    let cellPxH = 28;
    let originPxX = 0;
    let originPxY = 0;
    let monoFamily = "ui-monospace, SFMono-Regular, Menlo, monospace";

    let rafId = 0;
    let delayTimer = 0;
    let running = false;
    let animStartTs = 0;
    let introProgress = settleImmediately ? 1 : 0;
    let introStarted = settleImmediately;
    let settled = settleImmediately;

    // Innovation C: Magnetic ASCII Hover Wake state
    let pointerCol = -99;
    let pointerRow = -99;
    let wakeStrength = 0;
    let wakeTarget = 0;

    const syncMetrics = () => {
      const rect = container.getBoundingClientRect();
      cssW = Math.max(1, Math.round(rect.width));
      cssH = Math.max(1, Math.round(rect.height));
      const isMobile = cssW < 420;
      dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), isMobile ? 3.0 : 2.5);

      canvas.width = Math.max(1, Math.round(cssW * dpr));
      canvas.height = Math.max(1, Math.round(cssH * dpr));

      // Exact integer physical pixel cell dimensions fitting 56x9 cleanly inside container
      cellPxW = Math.max(5, Math.floor(canvas.width / GRID_COLS));
      cellPxH = Math.max(8, Math.floor(canvas.height / GRID_ROWS));
      originPxX = Math.floor((canvas.width - cellPxW * GRID_COLS) * 0.5);
      originPxY = Math.floor((canvas.height - cellPxH * GRID_ROWS) * 0.5);

      if (monoProbeRef.current) {
        monoFamily = window.getComputedStyle(monoProbeRef.current).fontFamily;
      }
    };

    const draw = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!active && !settleImmediately) return;
      if (introProgress <= 0.001 && !settleImmediately) return;

      const fontPx = Math.max(9, Math.round(cellPxH * 0.92));
      const font500 = `500 ${fontPx}px ${monoFamily}`;
      const font600 = `600 ${fontPx}px ${monoFamily}`;
      const font700 = `700 ${fontPx}px ${monoFamily}`;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const wakeRadius = 4.6;
      // Crisp 1-column photon sweep racing across during Beat 3
      const sweepCol = (introProgress - 0.36) / 0.64;

      for (let i = 0; i < BLUEPRINT_CELLS.length; i++) {
        const c = BLUEPRINT_CELLS[i];
        const px = originPxX + c.col * cellPxW + Math.floor(cellPxW * 0.5);
        const py = originPxY + c.row * cellPxH + Math.floor(cellPxH * 0.52);

        let glyphIdx = c.baseIdx;
        let color = c.baseColor;
        let alpha = 1.0;
        let weight = c.baseWeight;

        if (introProgress < 1) {
          // 3-Beat Loom-Weave Entrance Choreography:
          // Beat 1: exterior bevels & diagonals frame the silhouette center-outward
          // Beat 2: `#97DFFC` bridges sweep outward
          // Beat 3: `#F7FAFF` structural verticals lock in with photon crest
          const roleDelay =
            c.role === "bevel"
              ? 0.0
              : c.role === "diagonal"
                ? 0.06
                : c.role === "bridge"
                  ? 0.16
                  : 0.28;
          const startT = roleDelay + c.centerDist * 0.34;
          const local = (introProgress - startT) / 0.34;
          if (local <= 0) continue;

          if (local < 1) {
            const rampPos = Math.min(
              DENSITY_RAMP.length - 1,
              Math.floor(local * (c.baseIdx + 1.4))
            );
            glyphIdx = rampPos;
            color = local > 0.72 ? "#97DFFC" : local > 0.35 ? "#858AE3" : "#613DC1";
            alpha = Math.min(1, 0.3 + local * 0.9);
            weight = 500;
          } else if (c.role === "primary" && sweepCol > 0 && sweepCol < 1.12) {
            const crestDist = Math.abs(c.xNorm - sweepCol);
            if (crestDist < 0.065) {
              glyphIdx = 6; // `*` photon lock-in crest
              color = "#97DFFC";
              weight = 700;
            }
          }
        } else if (wakeStrength > 0.005) {
          // Innovation C: Gravitational Magnetic ASCII Hover Wake
          const dx = c.col - pointerCol;
          const dy = (c.row - pointerRow) * 1.45;
          const dist = Math.hypot(dx, dy);
          if (dist < wakeRadius) {
            const f = Math.pow(1 - dist / wakeRadius, 1.65) * wakeStrength;
            if (f > 0.16) {
              const boost = f > 0.58 ? 2 : 1;
              glyphIdx = Math.min(DENSITY_RAMP.length - 1, c.baseIdx + boost);
              color = f > 0.52 ? "#F7FAFF" : "#97DFFC";
              weight = f > 0.45 ? 700 : 600;
            }
          }
        }

        ctx.font = weight === 700 ? font700 : weight === 600 ? font600 : font500;
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.fillText(DENSITY_RAMP[glyphIdx], px, py);
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

        if (introStarted && !settled) {
          if (animStartTs === 0) animStartTs = ts;
          introProgress = Math.min(
            1,
            (ts - animStartTs) / Math.max(180, durationMs)
          );
          if (introProgress >= 1) {
            settled = true;
          }
        }

        // Smooth 240ms magnetic hover relaxation
        const lerpRate = wakeTarget > wakeStrength ? 16 : 9;
        wakeStrength += (wakeTarget - wakeStrength) * Math.min(1, dt * lerpRate);
        if (Math.abs(wakeTarget - wakeStrength) < 0.003) {
          wakeStrength = wakeTarget;
        }

        draw();

        const keepRunning =
          (introStarted && !settled) || wakeStrength > 0.003 || wakeTarget > 0;
        if (keepRunning) {
          rafId = window.requestAnimationFrame(step);
        } else {
          running = false;
        }
      };

      rafId = window.requestAnimationFrame(step);
    };

    syncMetrics();

    if (settleImmediately) {
      introProgress = 1;
      introStarted = true;
      settled = true;
      draw();
    } else if (active) {
      delayTimer = window.setTimeout(() => {
        introStarted = true;
        animStartTs = 0;
        ensureLoop();
      }, delayMs);
    }

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || reducedMotion || !settled) return;
      const rect = container.getBoundingClientRect();
      const px = (e.clientX - rect.left) * dpr;
      const py = (e.clientY - rect.top) * dpr;
      pointerCol = (px - originPxX) / Math.max(1, cellPxW) - 0.5;
      pointerRow = (py - originPxY) / Math.max(1, cellPxH) - 0.5;
      wakeTarget = 1;
      ensureLoop();
    };
    const onPointerLeave = () => {
      wakeTarget = 0;
      if (settled) ensureLoop();
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave, { passive: true });

    const ro = new ResizeObserver(() => {
      syncMetrics();
      if (settled || settleImmediately || introProgress > 0) {
        draw();
      }
    });
    ro.observe(container);

    let disposed = false;
    document.fonts?.ready
      .then(() => {
        if (disposed) return;
        syncMetrics();
        if (settled || settleImmediately || introProgress > 0) {
          draw();
        }
      })
      .catch(() => {});

    return () => {
      disposed = true;
      window.clearTimeout(delayTimer);
      window.cancelAnimationFrame(rafId);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      ro.disconnect();
    };
  }, [active, instant, delayMs, durationMs]);

  return (
    <span
      ref={containerRef}
      className={`relative mx-auto block h-[86px] w-[336px] max-w-full cursor-default select-none sm:h-[126px] sm:w-[560px] ${className}`}
    >
      <span
        ref={monoProbeRef}
        aria-hidden="true"
        className="pointer-events-none sr-only font-mono"
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
