"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import {
  AppFrame,
  AppLabel,
  AppRail,
  usePrefersReducedMotion,
} from "@/components/demos/app-ui";

/**
 * Lab: a short stack of unreleased concepts. Drag the front card, use the
 * buttons, or focus the stack and press the arrow keys.
 */

type SceneKind = "galaxy" | "satellite" | "package";

interface Concept {
  id: string;
  title: string;
  category: string;
  byline: string;
  supporters: number;
  scene: SceneKind;
  /** Second use of a scene stands on a different frame. */
  variant: 0 | 1;
}

const CONCEPTS: Concept[] = [
  {
    id: "CONCEPT_01",
    title: "Packable rain shell",
    category: "Outerwear",
    byline: "Studio 01, $120 to $160 provisional",
    supporters: 284,
    scene: "galaxy",
    variant: 0,
  },
  {
    id: "CONCEPT_02",
    title: "Reversible work vest",
    category: "Layers",
    byline: "Studio 02, $90 to $120 provisional",
    supporters: 173,
    scene: "satellite",
    variant: 0,
  },
  {
    id: "CONCEPT_03",
    title: "Zip-off travel trouser",
    category: "Bottoms",
    byline: "Studio 03, $110 to $140 provisional",
    supporters: 96,
    scene: "package",
    variant: 0,
  },
  {
    id: "CONCEPT_04",
    title: "Modular tote",
    category: "Accessories",
    byline: "Studio 04, $60 to $85 provisional",
    supporters: 211,
    scene: "galaxy",
    variant: 1,
  },
  {
    id: "CONCEPT_05",
    title: "Quilted liner jacket",
    category: "Outerwear",
    byline: "Studio 05, $140 to $180 provisional",
    supporters: 152,
    scene: "satellite",
    variant: 1,
  },
  {
    id: "CONCEPT_06",
    title: "Knit overshirt",
    category: "Shirting",
    byline: "Studio 06, $95 to $125 provisional",
    supporters: 68,
    scene: "package",
    variant: 1,
  },
];

const COUNT = CONCEPTS.length;
const LAST = COUNT - 1;

const pad2 = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ */
/* Artwork: frozen character art                                       */
/* ------------------------------------------------------------------ */

const WHITE = "#FFFFFF";
const PERI = "#858AE3";
const ACCENT = "#613DC1";
const ICE = "#97DFFC";

/** Deterministic 0 to 1 value for a seed, as the app's artwork uses. */
function artNoise(seed: number) {
  const raw = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return raw - Math.floor(raw);
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/* Galaxy ----------------------------------------------------------- */

/** Density ramp, heaviest first. Mostly T and t, with a few structural marks. */
const RAMP = [
  "T", "T", "M", "T", "W", "T", "T", "#", "T", "T", "%", "T", "T", "T",
  "T", "#", "T", "T", "t", "T", "t", "T", "@", "T", "t", "T", "t", "T",
  "t", "T", "t", "T", "t", "T", "t", "T",
];
const RAMP_LAST = RAMP.length - 1;

/** Ink weight travels with the ramp index: bold at the core, light at the rim. */
function rampWeight(index: number): 400 | 500 | 600 {
  if (index <= 18) return 600;
  if (index <= 23) return 500;
  return 400;
}

/** Hot core to cold rim. */
const SPECTRUM: [number, number, number, number][] = [
  [0.0, 1.0, 0.98, 0.93],
  [0.14, 1.0, 0.91, 0.74],
  [0.3, 1.0, 0.79, 0.57],
  [0.46, 0.96, 0.62, 0.72],
  [0.62, 0.64, 0.4, 0.99],
  [0.78, 0.33, 0.58, 0.99],
  [0.9, 0.28, 0.8, 0.97],
  [1.0, 0.42, 0.86, 0.99],
];

const SPECTRUM_STEPS = 64;
const SPECTRUM_BINS: string[] = Array.from({ length: SPECTRUM_STEPS + 1 }, (_, i) => {
  const x = i / SPECTRUM_STEPS;
  let upper = 1;
  while (upper < SPECTRUM.length - 1 && SPECTRUM[upper][0] < x) upper += 1;
  const a = SPECTRUM[upper - 1];
  const b = SPECTRUM[upper];
  const k = (x - a[0]) / Math.max(1e-6, b[0] - a[0]);
  const ch = (n: 1 | 2 | 3) => Math.round((a[n] + (b[n] - a[n]) * k) * 255);
  return `rgb(${ch(1)} ${ch(2)} ${ch(3)})`;
});

const CORE_RAMP = ["@", "@", "@", "M", "M", "M", "W", "W", "#", "#", "%", "%"];
const CORE_TINT = "#6A1DE6";
const CORE_BODY = 17;
const CORE_PATCH = 19;
const STAR_RAMP = ["T", "t", "+", "-", "*", "o"];

interface Cell {
  x: number;
  y: number;
  ch: string;
  fill: string;
  alpha: number;
}

/**
 * The card-scale spiral: a monospace lattice where every cell draws and
 * density sets how heavy and how bright it is. One frame, never animated.
 */
function drawGalaxy(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  family: string,
  variant: number
) {
  const point = 6;
  const pitchX = point * 0.6;
  const pitchY = point * 1.24;
  const arms = 4;
  const squash = 0.46;
  const tilt = 0.15;
  const winding = 4.4 + variant * 0.22;
  const time = (7 + variant * 1.7) * 0.2;
  const cx = w / 2;
  const cy = h / 2;
  const reach = Math.min(w * 0.62, (h * 0.62) / squash);
  const step = (2 * Math.PI) / arms;
  const ct = Math.cos(tilt);
  const st = Math.sin(tilt);

  ctx.clearRect(0, 0, w, h);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // A faint lift under the core, flattened with the disc.
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1, squash);
  const halo = ctx.createRadialGradient(0, 0, 0, 0, 0, 190);
  halo.addColorStop(0, "rgb(255 255 255 / 0.09)");
  halo.addColorStop(0.5, "rgb(255 255 255 / 0.035)");
  halo.addColorStop(1, "rgb(255 255 255 / 0)");
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(0, 0, 190, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // The core: a small violet ball on a lattice a third of the disc's pitch.
  const corePitchX = pitchX / 3;
  const corePitchY = pitchY / 3;
  const coreOuter = CORE_BODY + corePitchY;
  ctx.fillStyle = CORE_TINT;
  for (const weight of [700, 600] as const) {
    ctx.font = `${weight === 700 ? 600 : 500} ${point * 0.42}px ${family}`;
    for (
      let row = Math.floor((cy - coreOuter) / corePitchY);
      row <= Math.ceil((cy + coreOuter) / corePitchY);
      row += 1
    ) {
      for (
        let column = Math.floor((cx - coreOuter) / corePitchX);
        column <= Math.ceil((cx + coreOuter) / corePitchX);
        column += 1
      ) {
        const px = corePitchX * (column + 0.5);
        const py = corePitchY * (row + 0.5);
        const nx = (px - cx) / CORE_BODY;
        const ny = (py - cy) / CORE_BODY;
        const radius = Math.sqrt(nx * nx + ny * ny);
        if (radius > 1) continue;
        // Light from the upper left on top of a radial falloff.
        const facing = nx * -0.5 + ny * -0.6;
        const shade = clamp01(0.47 + 0.42 * Math.pow(1 - radius, 0.62) + facing * 0.15);
        if (shade > 0.58 !== (weight === 700)) continue;
        const glyph =
          CORE_RAMP[Math.min(CORE_RAMP.length - 1, Math.floor((1 - shade) * CORE_RAMP.length))];
        const edge = radius > 0.9 ? Math.max(0, 1 - (radius - 0.9) / 0.1) : 1;
        ctx.globalAlpha = clamp01(shade * (0.34 + 0.66 * edge));
        ctx.fillText(glyph, px, py);
      }
    }
  }

  const columns = Math.ceil(w / pitchX) + 1;
  const rows = Math.ceil(h / pitchY) + 1;
  const stars: (Cell & { size: number })[] = [];
  const byWeight: Record<400 | 500 | 600, Cell[]> = { 400: [], 500: [], 600: [] };
  const driftX = Math.round(time * 0.55) % 3;
  const driftY = Math.round(time * 0.31) % 2;

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const px = pitchX * (column + 0.5);
      const py = pitchY * (row + 0.5);
      // Tilt first, then flatten.
      const ox = (px - cx) / reach;
      const oy = (py - cy) / reach;
      const dx = ox * ct - oy * st;
      const flatY = ox * st + oy * ct;
      const dy = flatY / squash;
      const r2 = dx * dx + dy * dy;
      const r = Math.sqrt(r2);
      const centreRadius = Math.sqrt(dx * dx + flatY * flatY) * reach;
      const rPoints = r * reach;
      if (centreRadius < CORE_PATCH) continue;

      // Sparse stars above and around the disc, none in the lower band.
      const sn = artNoise(column * 29 + row * 97 + 3);
      const starAllowed = 1 - clamp01((py / h - 0.62) / 0.22);
      if (sn < 0.02 * starAllowed) {
        const twinkle =
          0.52 + 0.3 * Math.sin(time * 1.1 + sn * 63) + 0.18 * Math.sin(time * 2.7 + sn * 149);
        const driftHash = artNoise((column + driftX) * 29 + (row + driftY) * 97 + 3);
        const pick = Math.floor(1 + artNoise(column * 7 + row * 13 + 5) * (STAR_RAMP.length - 2));
        stars.push({
          x: px,
          y: py,
          ch: STAR_RAMP[pick],
          fill: PERI,
          size: point * (0.78 + sn * 0.4),
          alpha: ((0.7 + twinkle * 0.3) * (0.65 + driftHash * 0.35)) / (1 + r * 0.55),
        });
      }

      // Distance from the nearest arm, measured along the winding.
      const theta = Math.atan2(dy, dx);
      const phase = (theta - r * winding - time) / step;
      const armDistance = Math.abs(phase - Math.round(phase)) * step;
      const armWidth = step * (0.34 + r * 0.15);
      const armShape = Math.min(1, armDistance / armWidth);
      let density = armShape < 0.8 ? 1 : Math.max(0, 1 - (armShape - 0.8) / 0.2);
      density *= 1 / (1 + r2 * r * 0.95);
      density *= 1 - r2 * r * 0.3;
      // The arms drain toward the centre and sit in a shadow around the core.
      const feed = Math.max(0, 1 - rPoints / 88);
      density *= 1 - feed * feed * 0.66;
      const bulge = Math.max(0, 1 - rPoints / 60);
      const shadow = Math.min(1, rPoints / 42);
      density *= shadow * shadow * shadow;
      density = Math.max(0, density);

      const lift = Math.min(1, density * 0.86 + bulge * bulge * 0.35);
      const bucket = Math.floor(lift * 15) / 15;
      const glyphIndex = Math.min(RAMP_LAST, Math.max(0, Math.floor((1 - bucket) * RAMP_LAST)));

      // Colour runs along the spectrum by radius; arms lean hot, and a
      // low-frequency field breaks the perfect radial symmetry.
      const armLift = 1 - armShape;
      const region =
        artNoise(Math.floor(column / 7) * 31 + Math.floor(row / 7) * 17 + 5) - 0.5;
      const t = clamp01(Math.pow(Math.min(1, r), 0.82) - armLift * 0.1 + region * 0.1);
      const floor = 0.26;
      byWeight[rampWeight(glyphIndex)].push({
        x: px,
        y: py,
        ch: RAMP[glyphIndex],
        fill: SPECTRUM_BINS[Math.round(t * SPECTRUM_STEPS)],
        alpha: floor + Math.pow(density, 0.72) * (1 - floor),
      });
    }
  }

  for (const star of stars) {
    ctx.font = `500 ${star.size}px ${family}`;
    ctx.fillStyle = star.fill;
    ctx.globalAlpha = clamp01(star.alpha);
    ctx.fillText(star.ch, star.x, star.y);
  }
  for (const weight of [400, 500, 600] as const) {
    ctx.font = `${weight} ${point}px ${family}`;
    for (const cell of byWeight[weight]) {
      ctx.fillStyle = cell.fill;
      ctx.globalAlpha = cell.alpha;
      ctx.fillText(cell.ch, cell.x, cell.y);
    }
  }
  ctx.globalAlpha = 1;
}

const GalaxyArt = memo(function GalaxyArt({ variant }: { variant: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let disposed = false;
    let drawn = "";
    const family = getComputedStyle(canvas).fontFamily || "monospace";
    const draw = (force: boolean) => {
      if (disposed) return;
      // Layout size, so a card scaled back in the stack still draws at 1:1.
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w < 2 || h < 2) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const key = `${w}x${h}@${dpr}`;
      if (!force && key === drawn) return;
      drawn = key;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawGalaxy(ctx, w, h, family, variant);
    };
    const ro = new ResizeObserver(() => draw(false));
    ro.observe(canvas);
    draw(false);
    // Canvas text does not wait for web fonts on its own.
    Promise.all([400, 500, 600].map((wt) => document.fonts.load(`${wt} 12px ${family}`)))
      .then(() => draw(true))
      .catch(() => undefined);
    return () => {
      disposed = true;
      ro.disconnect();
    };
  }, [variant]);
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 block h-full w-full font-mono"
    />
  );
});

/* Satellite and package -------------------------------------------- */

/** Drawing box for the object scenes; the SVG scales it to the panel. */
const ART_W = 356;
const ART_H = 264;
const ART_CELL = 16;

interface Mark {
  x: number;
  y: number;
  ch: string;
  size: number;
  fill: string;
  opacity: number;
}

const round2 = (v: number) => Math.round(v * 100) / 100;

function mark(x: number, y: number, ch: string, size: number, fill: string, opacity: number): Mark {
  return { x: round2(x), y: round2(y), ch, size: round2(size), fill, opacity: round2(opacity) };
}

const SATELLITE_FRAME = ["\\-+-/", "-T-T-", "/---/"];

/** A satellite on a dotted orbit of + and o marks, brightest where it sits. */
function buildSatellite(angle: number): Mark[] {
  const cell = ART_CELL;
  const cx = ART_W / 2;
  const cy = ART_H * 0.46;
  const rx = ART_W * 0.34;
  const ry = ART_H * 0.17;
  const blockW = SATELLITE_FRAME[0].length * cell;
  const blockH = SATELLITE_FRAME.length * cell;
  const bx = cx + Math.cos(angle) * rx - blockW / 2;
  const by = cy + Math.sin(angle) * ry - blockH / 2;
  const marks: Mark[] = [];

  const count = 96;
  for (let i = 0; i < count; i += 1) {
    const theta = (i / count) * Math.PI * 2;
    const x = cx + Math.cos(theta) * rx;
    const y = cy + Math.sin(theta) * ry;
    // The orbit yields to the object so no mark sits under its frame.
    const clear = cell * 0.35;
    if (x > bx - clear && x < bx + blockW + clear && y > by - clear && y < by + blockH + clear) {
      continue;
    }
    const near = (Math.cos(theta - angle) + 1) / 2;
    const cross = i % 4 === 0;
    marks.push(mark(x, y, cross ? "+" : "o", cell * 0.6, cross ? ACCENT : PERI, 0.1 + near * 0.26));
  }

  SATELLITE_FRAME.forEach((line, row) => {
    Array.from(line).forEach((ch, column) => {
      const fill = ch === "T" ? WHITE : ch === "+" ? ACCENT : PERI;
      marks.push(
        mark(bx + (column + 0.5) * cell, by + (row + 0.5) * cell, ch, cell * 0.86, fill, 0.92)
      );
    });
  });
  return marks;
}

const PACKAGE_FRAME = ["/--+--\\", "| +  + |", "|  T-T |", "| +  + |", "\\--+--/"];

/** A parcel in transit: a thrust trail behind it, a dashed trajectory above. */
function buildPackage(left: number, top: number, seed: number): Mark[] {
  const cell = ART_CELL;
  const blockW = 8 * cell;
  const blockH = PACKAGE_FRAME.length * cell;
  const marks: Mark[] = [];

  const lineY = top - cell * 2.6;
  for (let i = 0; i * cell * 1.8 <= ART_W; i += 2) {
    marks.push(mark(i * cell * 1.8 + cell * 0.6, lineY, "o", cell * 0.5, PERI, 0.16));
  }

  const trail = 9;
  for (let row = 0; row < trail; row += 1) {
    const u = row / trail;
    const jitter = (artNoise(row * 23 + 11 + seed * 7) - 0.5) * cell * (0.8 + u * 1.6);
    marks.push(
      mark(
        left - (row + 0.6) * cell * 1.1 + jitter,
        top + blockH / 2 + jitter * 0.5,
        row % 3 === 0 ? "o" : "+",
        cell * 0.62,
        u < 0.34 ? ICE : ACCENT,
        (1 - u) * 0.5
      )
    );
  }

  PACKAGE_FRAME.forEach((line, row) => {
    const inset = (blockW / cell - line.length) / 2;
    Array.from(line).forEach((ch, column) => {
      if (ch === " ") return;
      const fill =
        ch === "T" ? ICE : ch === "+" ? ACCENT : ch === "/" || ch === "\\" ? PERI : WHITE;
      marks.push(
        mark(left + (inset + column + 0.5) * cell, top + (row + 0.5) * cell, ch, cell * 0.86, fill, 0.92)
      );
    });
  });
  return marks;
}

const SATELLITE_MARKS: Mark[][] = [buildSatellite(2.05), buildSatellite(-0.62)];
const PACKAGE_MARKS: Mark[][] = [buildPackage(150, 104, 0), buildPackage(128, 96, 1)];

const GlyphScene = memo(function GlyphScene({ marks }: { marks: Mark[] }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${ART_W} ${ART_H}`}
      preserveAspectRatio="xMidYMid meet"
      className="pointer-events-none absolute inset-0 h-full w-full font-mono font-medium"
    >
      {marks.map((m, i) => (
        <text
          key={i}
          x={m.x}
          y={m.y}
          fontSize={m.size}
          fill={m.fill}
          fillOpacity={m.opacity}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {m.ch}
        </text>
      ))}
    </svg>
  );
});

function Artwork({ scene, variant }: { scene: SceneKind; variant: 0 | 1 }) {
  if (scene === "galaxy") return <GalaxyArt variant={variant} />;
  if (scene === "satellite") return <GlyphScene marks={SATELLITE_MARKS[variant]} />;
  return <GlyphScene marks={PACKAGE_MARKS[variant]} />;
}

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

const HEART_PATH =
  "M8 13.6S2.2 10.2 2.2 6.2A3.2 3.2 0 0 1 8 4.4a3.2 3.2 0 0 1 5.8 1.8c0 4-5.8 7.4-5.8 7.4z";

function IconX() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-[1em] w-[1em]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M3.75 3.75l8.5 8.5M12.25 3.75l-8.5 8.5" />
    </svg>
  );
}

function IconBookmark({ filled }: { filled: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-[1em] w-[1em]"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    >
      <path d="M4.4 2.4h7.2a.6.6 0 0 1 .6.6v10.7L8 10.9l-4.2 2.8V3a.6.6 0 0 1 .6-.6z" />
    </svg>
  );
}

function IconHeart({ filled, className }: { filled: boolean; className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.7}
      strokeLinejoin="round"
    >
      <path d={HEART_PATH} />
    </svg>
  );
}

function IconArrowUpRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className="h-[0.625em] w-[0.625em]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l6-6M4.25 3H9v4.75" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

const ConceptCard = memo(function ConceptCard({ concept }: { concept: Concept }) {
  return (
    <div className="@container flex h-full flex-col overflow-hidden rounded-[12px] border border-[color:var(--aline)] bg-[color:var(--paper)]">
      <div className="relative -mx-px -mt-px min-h-0 flex-1 overflow-hidden rounded-[12px] border border-white/[0.13] bg-[color:var(--galaxy-deep)]">
        <Artwork scene={concept.scene} variant={concept.variant} />
        <div className="absolute bottom-0 left-0 flex flex-col gap-[0.1875em] p-[0.875em]">
          <span className="app-label text-ice/[0.72]">Illustrative artwork</span>
          <span className="app-label text-white/[0.52]">{concept.id}</span>
        </div>
      </div>
      <div className="flex flex-col gap-[0.625em] p-[1em]">
        <AppRail>
          {concept.category} / Feedback
        </AppRail>
        <p className="truncate text-[length:clamp(1.14em,6.9cqi,1.5em)] font-medium leading-[1.2] tracking-[-0.027em] text-white">
          {concept.title}
        </p>
        <p className="truncate text-[length:clamp(0.8125em,4.3cqi,0.9375em)] leading-[1.35] text-[color:var(--secondary)]">
          {concept.byline}
        </p>
        <div className="flex items-center justify-between gap-3 text-[0.6875em] font-medium leading-[1.35]">
          <span className="flex items-center gap-[0.36em] text-[#8f6cf0]">
            <IconHeart filled className="h-[1.1em] w-[1.1em]" />
            <span className="value">{concept.supporters} supporters</span>
          </span>
          <span aria-hidden="true" className="flex items-center gap-[0.4em] text-white">
            <IconArrowUpRight />
            Full view
          </span>
        </div>
      </div>
    </div>
  );
});

/* ------------------------------------------------------------------ */
/* Demo                                                                */
/* ------------------------------------------------------------------ */

type Phase = "idle" | "dragging" | "settling" | "leaving";

interface Offset {
  x: number;
  y: number;
}

interface DragState {
  id: number;
  startX: number;
  startY: number;
  active: boolean;
  samples: { t: number; x: number }[];
}

const ZERO: Offset = { x: 0, y: 0 };

/** Travel before a press becomes a drag. */
const DRAG_SLOP = 4;
/** The badge shows past this offset. */
const BADGE_AT = 28;
/** Predicted travel past this commits the card. */
const COMMIT_AT = 100;
/** How far ahead the release velocity is projected, in ms. */
const PREDICT_MS = 180;
const FLY_X = 520;
const FLY_Y = 18;
const LEAVE_MS = 160;
const SETTLE_MS = 300;

/* Close to a spring with response .30 and damping .82. */
const SETTLE_TRANSITION = `transform ${SETTLE_MS}ms cubic-bezier(0.2, 0.9, 0.3, 1.1)`;
const LEAVE_TRANSITION = `transform ${LEAVE_MS}ms ease-in, opacity ${LEAVE_MS}ms ease-in`;

const BACK_STYLES: React.CSSProperties[] = [
  { transform: "translateY(1em) scale(0.965)", opacity: 0.62, zIndex: 20 },
  { transform: "translateY(2em) scale(0.93)", opacity: 0.36, zIndex: 10 },
];

const DECISION_BASE =
  "relative flex h-[3.5em] min-h-[44px] flex-1 cursor-pointer flex-col items-center justify-center gap-[0.3125em] rounded-[8px] text-white transition-opacity duration-100 ease-out active:opacity-70 before:pointer-events-none before:absolute before:inset-0 before:rounded-[8px] before:bg-white before:opacity-0 before:transition-opacity before:duration-150 before:ease-out [@media(hover:hover)]:hover:before:opacity-[0.07]";

function DecisionButton({
  label,
  icon,
  accent = false,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  accent?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${DECISION_BASE} ${accent ? "bg-accent" : "bg-[rgb(28_28_30/0.72)]"}`}
    >
      {icon}
      <span className="app-label">{label}</span>
    </button>
  );
}

export function LabDemo({ active }: { active: boolean }) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState<Offset>(ZERO);
  const [phase, setPhase] = useState<Phase>("idle");
  const [saved, setSaved] = useState<ReadonlySet<string>>(() => new Set<string>());
  const [round, setRound] = useState(0);
  const [status, setStatus] = useState("");

  const stackRef = useRef<HTMLDivElement | null>(null);
  const deckRef = useRef<HTMLDivElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const restartRef = useRef<HTMLButtonElement | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const timerRef = useRef<number | null>(null);
  /** True while a card is flying off; a second decision has to wait for it. */
  const busyRef = useRef(false);
  const focusAfter = useRef<"restart" | "stack" | null>(null);

  const concept = CONCEPTS[index];
  const atEnd = index >= LAST;
  const isSaved = saved.has(concept.id);

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    },
    []
  );

  // Off screen: drop a drag that is still in hand.
  useEffect(() => {
    if (active || !dragRef.current) return;
    dragRef.current = null;
    setOffset(ZERO);
    setPhase("idle");
  }, [active]);

  // Keep keyboard focus when the row of controls is swapped out under it.
  useEffect(() => {
    const target = focusAfter.current;
    if (!target) return;
    if (target === "restart" && atEnd) {
      focusAfter.current = null;
      restartRef.current?.focus({ preventScroll: true });
    } else if (target === "stack" && !atEnd) {
      focusAfter.current = null;
      stackRef.current?.focus({ preventScroll: true });
    }
  }, [atEnd]);

  // Restart: the stack settles back in. Skipped for the first round.
  useEffect(() => {
    const deck = deckRef.current;
    if (round === 0 || reduced || !deck || typeof deck.animate !== "function") return;
    const animation = deck.animate(
      [
        { opacity: 0, transform: "translateY(0.75em) scale(0.985)" },
        { opacity: 1, transform: "translateY(0) scale(1)" },
      ],
      { duration: 340, easing: "cubic-bezier(0.2, 0.9, 0.3, 1.08)" }
    );
    return () => animation.cancel();
  }, [round, reduced]);

  const settle = () => {
    clearTimer();
    setOffset(ZERO);
    if (reduced) {
      setPhase("idle");
      return;
    }
    setPhase("settling");
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      setPhase((p) => (p === "settling" ? "idle" : p));
    }, SETTLE_MS + 20);
  };

  const commit = (direction: 1 | -1) => {
    if (busyRef.current) return;
    if (atEnd) {
      setStatus(`That's the round. Card ${COUNT} of ${COUNT}. Choose Back to the start to go again.`);
      return;
    }
    const next = index + 1;
    const verb = direction > 0 ? "Supported" : "Passed";
    setStatus(
      `${verb}: ${concept.title}. Card ${next + 1} of ${COUNT}.${next >= LAST ? " That's the round." : ""}`
    );
    if (next >= LAST && actionsRef.current?.contains(document.activeElement)) {
      focusAfter.current = "restart";
    }
    clearTimer();
    dragRef.current = null;
    if (reduced) {
      setIndex(next);
      setOffset(ZERO);
      setPhase("idle");
      return;
    }
    busyRef.current = true;
    setPhase("leaving");
    setOffset({ x: direction * FLY_X, y: FLY_Y });
    // The next card is in place one frame after the fly-off ends, unanimated.
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      busyRef.current = false;
      setIndex(next);
      setOffset(ZERO);
      setPhase("idle");
    }, LEAVE_MS + 10);
  };

  const toggleSave = () => {
    const willSave = !saved.has(concept.id);
    setSaved((prev) => {
      const nextSet = new Set(prev);
      if (willSave) nextSet.add(concept.id);
      else nextSet.delete(concept.id);
      return nextSet;
    });
    setStatus(willSave ? `Saved: ${concept.title}.` : `Removed from saved: ${concept.title}.`);
  };

  const restart = () => {
    if (busyRef.current) return;
    if (document.activeElement === restartRef.current) focusAfter.current = "stack";
    clearTimer();
    dragRef.current = null;
    setIndex(0);
    setOffset(ZERO);
    setPhase("idle");
    setRound((r) => r + 1);
    setStatus(`Back to the start. Card 1 of ${COUNT}: ${CONCEPTS[0].title}.`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      commit(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      commit(1);
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (busyRef.current || dragRef.current) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    let baseX = 0;
    if (phase === "settling") {
      // Caught mid spring-back: carry on from where the card is.
      baseX = new DOMMatrixReadOnly(getComputedStyle(e.currentTarget).transform).m41;
      clearTimer();
      setOffset({ x: baseX, y: 0 });
      setPhase("dragging");
    }
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      return;
    }
    const scale = atEnd ? END_RESISTANCE : 1;
    dragRef.current = {
      id: e.pointerId,
      startX: e.clientX - baseX / scale,
      startY: e.clientY,
      active: phase === "settling",
      samples: [{ t: e.timeStamp, x: e.clientX }],
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (!drag.active) {
      // Horizontal only; a vertical move belongs to the page.
      if (Math.abs(dx) < DRAG_SLOP || Math.abs(dx) < Math.abs(dy)) return;
      drag.active = true;
      setPhase("dragging");
    }
    drag.samples.push({ t: e.timeStamp, x: e.clientX });
    if (drag.samples.length > 8) drag.samples.shift();
    setOffset({ x: atEnd ? dx * END_RESISTANCE : dx, y: dy });
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>, cancelled: boolean) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) return;
    dragRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (!drag.active) return;
    if (cancelled || atEnd) {
      settle();
      return;
    }
    // Project the release velocity forward, as the app's gesture does.
    const last = drag.samples[drag.samples.length - 1];
    const first = drag.samples.find((s) => last.t - s.t <= 100) ?? last;
    const dt = last.t - first.t;
    const velocity = dt > 0 && e.timeStamp - last.t < 80 ? (last.x - first.x) / dt : 0;
    const predicted = e.clientX - drag.startX + velocity * PREDICT_MS;
    if (predicted > COMMIT_AT) commit(1);
    else if (predicted < -COMMIT_AT) commit(-1);
    else settle();
  };

  const resting = phase === "idle" && offset.x === 0 && offset.y === 0;
  const frontStyle: React.CSSProperties = {
    transform: resting
      ? undefined
      : `translate3d(${offset.x}px, ${offset.y * 0.1}px, 0) rotate(${reduced ? 0 : offset.x / 28}deg)`,
    opacity: phase === "leaving" ? 0.78 : 1,
    transition:
      phase === "settling" ? SETTLE_TRANSITION : phase === "leaving" ? LEAVE_TRANSITION : "none",
    willChange: resting ? undefined : "transform",
    touchAction: "pan-y",
    zIndex: 30,
  };

  const badge = atEnd ? null : offset.x > BADGE_AT ? "support" : offset.x < -BADGE_AT ? "pass" : null;
  const badgeOpacity = Math.min(1, (Math.abs(offset.x) - BADGE_AT) / 14);

  const stackLabel = atEnd
    ? `Concept cards. Card ${COUNT} of ${COUNT}: ${concept.title}. That's the round.`
    : `Concept cards. Card ${index + 1} of ${COUNT}: ${concept.title}. Press the left arrow to pass or the right arrow to support.`;

  return (
    <AppFrame label="Lab demo: swipe to support or pass on unreleased concepts">
      <div className="flex flex-col gap-[0.75em] px-[1.25em] pb-[1.125em] pt-[1.25em]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-[0.1875em]">
            <AppLabel tone="accent">Lab / Private taste signal</AppLabel>
            <p className="text-[1.25em] font-medium leading-[1.2] tracking-[-0.0175em] text-white">
              What should exist next?
            </p>
          </div>
          <AppLabel className="value shrink-0 whitespace-nowrap">
            <span className="sr-only">Card </span>
            {pad2(index + 1)} <span aria-hidden="true">/</span>
            <span className="sr-only">of</span> {pad2(COUNT)}
          </AppLabel>
        </div>

        <div
          ref={stackRef}
          role="group"
          tabIndex={0}
          aria-label={stackLabel}
          aria-keyshortcuts="ArrowLeft ArrowRight"
          onKeyDown={onKeyDown}
          className="relative h-[26.875em] rounded-[12px]"
        >
          <div ref={deckRef} className="absolute inset-0">
            {CONCEPTS.slice(index, index + 3).map((item, depth) =>
              depth === 0 ? (
                <div
                  key={item.id}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={(e) => endDrag(e, false)}
                  onPointerCancel={(e) => endDrag(e, true)}
                  onLostPointerCapture={(e) => endDrag(e, true)}
                  style={frontStyle}
                  className={`absolute inset-x-0 top-0 h-[25.75em] select-none ${
                    phase === "dragging" ? "cursor-grabbing" : "cursor-grab"
                  }`}
                >
                  <ConceptCard concept={item} />
                  {badge ? (
                    <span
                      aria-hidden="true"
                      style={{ opacity: badgeOpacity }}
                      className={`pointer-events-none absolute top-[1em] flex h-[2.125em] items-center rounded-[4px] px-[0.8125em] ${
                        badge === "support" ? "right-[1em] bg-accent" : "left-[1em] bg-black/[0.82]"
                      }`}
                    >
                      <span className="font-mono text-[0.75em] font-semibold uppercase leading-none tracking-[0.083em] text-white">
                        {badge === "support" ? "Support" : "Pass"}
                      </span>
                    </span>
                  ) : null}
                </div>
              ) : (
                <div
                  key={item.id}
                  aria-hidden="true"
                  style={BACK_STYLES[depth - 1]}
                  className="pointer-events-none absolute inset-x-0 top-0 h-[25.75em]"
                >
                  <ConceptCard concept={item} />
                </div>
              )
            )}
          </div>
        </div>

        <div ref={actionsRef} className="flex gap-[0.625em]">
          {atEnd ? (
            <button
              ref={restartRef}
              type="button"
              onClick={restart}
              className={`${DECISION_BASE} bg-accent`}
            >
              <span className="app-label">Back to the start</span>
            </button>
          ) : (
            <>
              <DecisionButton label="Pass" icon={<IconX />} onClick={() => commit(-1)} />
              <DecisionButton
                label={isSaved ? "Saved" : "Save"}
                icon={<IconBookmark filled={isSaved} />}
                onClick={toggleSave}
              />
              <DecisionButton
                accent
                label="Support"
                icon={<IconHeart filled={false} className="h-[1em] w-[1em]" />}
                onClick={() => commit(1)}
              />
            </>
          )}
        </div>

        <div aria-hidden="true" className="grid grid-cols-[1fr_auto_1fr] items-center">
          <AppLabel>Pass</AppLabel>
          <AppLabel>{atEnd ? "That's the round" : "Swipe or tap"}</AppLabel>
          <AppLabel className="text-right">Support</AppLabel>
        </div>

        <p aria-live="polite" className="sr-only">
          {status}
        </p>
      </div>
    </AppFrame>
  );
}

/** On the last card a drag only leans; there is nothing behind it to reach. */
const END_RESISTANCE = 0.3;
