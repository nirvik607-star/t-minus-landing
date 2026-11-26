"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export type DropChapter = 0 | 1 | 2 | 3;
export type GarmentSilhouette = "HOODIE" | "BOXY TEE" | "WORK JACKET";
export type GarmentCut = "CROPPED" | "REGULAR" | "OVERSIZED";

interface FlatMeasurements {
  chest: string;
  length: string;
  shoulder: string;
  weight: string;
}

const GARMENT_SPECS: Record<
  GarmentSilhouette,
  Record<GarmentCut, FlatMeasurements>
> = {
  HOODIE: {
    CROPPED: {
      chest: '23.0"',
      length: '25.5"',
      shoulder: '21.5"',
      weight: "480 GSM FLEECE",
    },
    REGULAR: {
      chest: '24.0"',
      length: '27.5"',
      shoulder: '22.0"',
      weight: "480 GSM FLEECE",
    },
    OVERSIZED: {
      chest: '26.5"',
      length: '29.0"',
      shoulder: '24.0"',
      weight: "480 GSM FLEECE",
    },
  },
  "BOXY TEE": {
    CROPPED: {
      chest: '22.5"',
      length: '25.0"',
      shoulder: '20.5"',
      weight: "285 GSM JERSEY",
    },
    REGULAR: {
      chest: '23.5"',
      length: '27.0"',
      shoulder: '21.5"',
      weight: "285 GSM JERSEY",
    },
    OVERSIZED: {
      chest: '25.5"',
      length: '28.5"',
      shoulder: '23.0"',
      weight: "285 GSM JERSEY",
    },
  },
  "WORK JACKET": {
    CROPPED: {
      chest: '23.5"',
      length: '24.5"',
      shoulder: '20.0"',
      weight: "14 OZ DUCK CANVAS",
    },
    REGULAR: {
      chest: '24.5"',
      length: '26.5"',
      shoulder: '21.0"',
      weight: "14 OZ DUCK CANVAS",
    },
    OVERSIZED: {
      chest: '26.5"',
      length: '28.0"',
      shoulder: '22.5"',
      weight: "14 OZ DUCK CANVAS",
    },
  },
};

const CHAPTER_LABELS = [
  "01 · LIVE CLOCK",
  "02 · GARMENT FIT",
  "03 · DIRECT LOYALTY",
  "04 · NATIVE TRACKING",
] as const;

const SILHOUETTES: readonly GarmentSilhouette[] = [
  "HOODIE",
  "BOXY TEE",
  "WORK JACKET",
];

const CUTS: readonly GarmentCut[] = ["CROPPED", "REGULAR", "OVERSIZED"];

/** Strict locked T^minus ASCII ramp (space + `^ - t + = T *` ONLY) */
const ASCII_RAMP = [" ", "^", "-", "t", "+", "=", "T", "*"] as const;

const GRID_COLS = 44;
const GRID_ROWS = 22;

interface CellSample {
  /** 0..7 index into ASCII_RAMP */
  idx: number;
  /** 0 = violet, 1 = periwinkle, 2 = ice-blue `#97DFFC`, 3 = crisp `#F7FAFF` peak */
  tone: 0 | 1 | 2 | 3;
}

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/**
 * Evaluate sculpted pure-ASCII garment silhouette (`HOODIE`, `BOXY TEE`, `WORK JACKET`)
 * parametrically reshaped by `CROPPED` / `REGULAR` / `OVERSIZED`.
 */
function sampleGarmentCell(
  col: number,
  row: number,
  silhouette: GarmentSilhouette,
  cut: GarmentCut,
  showCalipers: boolean,
  tSec: number
): CellSample {
  const nx = ((col + 0.5) / GRID_COLS) * 2 - 1; // -1..1
  const ny = ((row + 0.5) / GRID_ROWS) * 2 - 1; // -1..1
  const ax = Math.abs(nx);

  const widthScale =
    cut === "OVERSIZED" ? 1.15 : cut === "CROPPED" ? 0.96 : 1.04;
  const hemY = cut === "OVERSIZED" ? 0.8 : cut === "CROPPED" ? 0.54 : 0.68;

  const torsoW =
    (silhouette === "BOXY TEE" ? 0.44 : 0.42) * widthScale;
  const topShoulderY = silhouette === "HOODIE" ? -0.44 : -0.54;

  let inside = false;
  let seam = 0; // 0..1 structural seam highlight
  let edgeDist = 1;

  if (silhouette === "HOODIE") {
    // 1) Hood dome (ny in [-0.88, -0.42])
    const hoodX = ax / (0.28 * widthScale);
    const hoodY = (ny + 0.62) / 0.25;
    const inHoodOuter =
      ny >= -0.88 && ny <= -0.42 && hoodX * hoodX + hoodY * hoodY <= 1.05;
    const inHoodOpening =
      ny >= -0.74 && ny <= -0.45 && ax < 0.12 && (ny + 0.6) / 0.16 < 0.9;
    if (inHoodOuter && !inHoodOpening) {
      inside = true;
      edgeDist = Math.min(edgeDist, 1.05 - (hoodX * hoodX + hoodY * hoodY));
      if (ax < 0.16 && ny > -0.76 && ny < -0.44) seam = Math.max(seam, 0.85);
    }

    // 2) Torso
    if (ny >= topShoulderY && ny <= hemY && ax <= torsoW) {
      inside = true;
      edgeDist = Math.min(
        edgeDist,
        torsoW - ax,
        hemY - ny,
        ny - topShoulderY + 0.12
      );
      // Drawstrings
      if (ny > -0.42 && ny < -0.05 && Math.abs(ax - 0.085) < 0.032) {
        seam = Math.max(seam, 0.95);
      }
      // Kangaroo pocket seam
      if (ny >= 0.18 && ny <= 0.48 && ax <= torsoW * 0.68) {
        const pocketTop = Math.abs(ny - 0.18) < 0.055;
        const pocketSide =
          ny > 0.18 && Math.abs(ax - (torsoW * 0.56 + (ny - 0.18) * 0.28)) < 0.05;
        if (pocketTop || pocketSide) seam = Math.max(seam, 0.82);
      }
      // Ribbed bottom hem band
      if (hemY - ny < 0.085) seam = Math.max(seam, 0.78);
    }

    // 3) Heavyweight tapered sleeves
    const sleeveT = clamp01((ny - (topShoulderY + 0.02)) / (hemY - 0.08 - topShoulderY));
    if (ny >= topShoulderY + 0.02 && ny <= hemY - 0.06) {
      const sleeveInner = torsoW - 0.02 + sleeveT * 0.14;
      const sleeveOuter =
        torsoW + 0.23 * widthScale + Math.sin(sleeveT * Math.PI * 0.65) * 0.12;
      if (ax >= sleeveInner && ax <= sleeveOuter) {
        inside = true;
        edgeDist = Math.min(
          edgeDist,
          sleeveOuter - ax,
          ax - sleeveInner,
          hemY - 0.06 - ny
        );
        if (hemY - 0.06 - ny < 0.085) seam = Math.max(seam, 0.82);
      }
    }
  } else if (silhouette === "BOXY TEE") {
    // 1) Wide boxy torso with curved crew-neck cutout
    const collarCut =
      ny < -0.4 && ax < 0.18 && (ax / 0.18) ** 2 + ((ny + 0.54) / 0.15) ** 2 < 1.0;
    const collarRim =
      !collarCut &&
      ny >= -0.56 &&
      ny <= -0.34 &&
      Math.abs((ax / 0.2) ** 2 + ((ny + 0.54) / 0.17) ** 2 - 1.0) < 0.26;

    if (ny >= topShoulderY && ny <= hemY && ax <= torsoW && !collarCut) {
      inside = true;
      edgeDist = Math.min(edgeDist, torsoW - ax, hemY - ny, ny - topShoulderY);
      if (collarRim) seam = Math.max(seam, 0.95);
      if (hemY - ny < 0.075) seam = Math.max(seam, 0.75);
    }

    // 2) Wide architectural drop-shoulder half sleeves
    const sleeveBottom = topShoulderY + 0.54;
    if (ny >= topShoulderY + 0.02 && ny <= sleeveBottom) {
      const st = clamp01((ny - topShoulderY) / 0.54);
      const sleeveOuter = torsoW + 0.24 * widthScale + st * 0.14;
      const sleeveInner = torsoW - 0.02 + st * 0.06;
      if (ax >= sleeveInner && ax <= sleeveOuter) {
        inside = true;
        edgeDist = Math.min(
          edgeDist,
          sleeveOuter - ax,
          sleeveBottom - ny,
          ny - topShoulderY
        );
        if (sleeveBottom - ny < 0.075) seam = Math.max(seam, 0.75);
      }
    }
  } else {
    // WORK JACKET: structured pointed collar + center placket + chest utility pockets + set-in sleeves
    const collarOpen =
      ny < -0.44 && ax < 0.14 && ny < -0.54 + (0.14 - ax) * 0.85;
    const inCollarLapel =
      ny >= -0.68 &&
      ny <= -0.46 &&
      ax >= 0.08 &&
      ax <= 0.25 &&
      ny >= -0.68 + (ax - 0.08) * 0.7;

    if (inCollarLapel) {
      inside = true;
      seam = Math.max(seam, 0.92);
      edgeDist = 0.12;
    }

    if (ny >= topShoulderY && ny <= hemY && ax <= torsoW && !collarOpen) {
      inside = true;
      edgeDist = Math.min(edgeDist, torsoW - ax, hemY - ny, ny - topShoulderY);
      // Center button placket
      if (ax < 0.048) {
        seam = Math.max(seam, 0.95);
      }
      // Symmetrical chest utility pockets
      if (ny >= -0.18 && ny <= 0.08 && ax >= 0.13 && ax <= torsoW * 0.74) {
        const isPocketEdge =
          Math.abs(ny + 0.18) < 0.05 ||
          Math.abs(ny - 0.08) < 0.05 ||
          Math.abs(ax - 0.13) < 0.045 ||
          Math.abs(ax - torsoW * 0.74) < 0.045;
        if (isPocketEdge) seam = Math.max(seam, 0.85);
      }
      if (hemY - ny < 0.08) seam = Math.max(seam, 0.8);
    }

    // Structured long sleeves
    const sleeveEnd = hemY - 0.03;
    if (ny >= topShoulderY + 0.01 && ny <= sleeveEnd) {
      const st = clamp01((ny - topShoulderY) / (sleeveEnd - topShoulderY));
      const sleeveInner = torsoW - 0.01 + st * 0.13;
      const sleeveOuter = torsoW + 0.21 * widthScale + st * 0.13;
      if (ax >= sleeveInner && ax <= sleeveOuter) {
        inside = true;
        edgeDist = Math.min(
          edgeDist,
          sleeveOuter - ax,
          ax - sleeveInner,
          sleeveEnd - ny
        );
        if (sleeveEnd - ny < 0.085) seam = Math.max(seam, 0.86);
      }
    }
  }

  // Chapter 02 overlay: Crisp `#97DFFC` ASCII Flat-Measurement Caliper Lines
  if (showCalipers) {
    // 1) Horizontal CHEST caliper across mid-torso (ny ≈ -0.02)
    const chestY = -0.02;
    if (Math.abs(ny - chestY) < 0.048 && ax <= torsoW + 0.03) {
      const isEndCap = Math.abs(ax - torsoW) < 0.055;
      const pulse = 0.5 + 0.5 * Math.sin(tSec * 3.2 - ax * 6.0);
      return {
        idx: isEndCap ? 7 : pulse > 0.72 ? 6 : 5, // `*`, `T`, `=`
        tone: isEndCap ? 3 : 2,
      };
    }

    // 2) Vertical LENGTH caliper rail along right side of garment
    const lenRailX = torsoW + 0.38;
    if (
      Math.abs(nx - lenRailX) < 0.035 &&
      ny >= topShoulderY &&
      ny <= hemY
    ) {
      const isCap =
        Math.abs(ny - topShoulderY) < 0.055 || Math.abs(ny - hemY) < 0.055;
      return {
        idx: isCap ? 7 : 4, // `*` caps, `+` vertical rail
        tone: isCap ? 3 : 2,
      };
    }

    // 3) Top SHOULDER span caliper above neckline
    const shY = silhouette === "HOODIE" ? -0.92 : -0.78;
    const shSpan = torsoW + 0.14;
    if (Math.abs(ny - shY) < 0.048 && ax <= shSpan + 0.03) {
      const isEndCap = Math.abs(ax - shSpan) < 0.055;
      return {
        idx: isEndCap ? 7 : 2, // `*` caps, `-` rule
        tone: isEndCap ? 3 : 2,
      };
    }
  }

  if (!inside) {
    return { idx: 0, tone: 0 };
  }

  // Sculptural 3D fabric fold shading so garment reads with depth in pure ASCII
  const drapeWave =
    0.5 +
    0.28 * Math.cos(nx * 5.2 + Math.sin(ny * 2.4) * 0.6 + tSec * 0.55) +
    0.22 * Math.cos(ny * 3.1 - nx * 1.4);
  const rim = clamp01(1 - edgeDist * 6.5);
  const density = clamp01(0.32 + drapeWave * 0.42 + seam * 0.42 - rim * 0.24);

  if (seam > 0.75) {
    return {
      idx: seam > 0.9 ? 6 : 5, // `T` or `=`
      tone: showCalipers ? 1 : 2,
    };
  }
  if (rim > 0.68) {
    return { idx: density > 0.4 ? 2 : 1, tone: 0 }; // `-` or `^`
  }
  if (density > 0.76) {
    return { idx: 6, tone: showCalipers ? 1 : 3 }; // `T`
  }
  if (density > 0.56) {
    return { idx: 5, tone: 1 }; // `=`
  }
  if (density > 0.38) {
    return { idx: 4, tone: 1 }; // `+`
  }
  return { idx: 3, tone: 0 }; // `t`
}

/**
 * Chapter 03: Concentric Rotating Pure-ASCII Collector Signal Rings (Tier I / II / III)
 */
function sampleLoyaltyCell(col: number, row: number, tSec: number): CellSample {
  const nx = ((col + 0.5) / GRID_COLS) * 2 - 1;
  const ny = (((row + 0.5) / GRID_ROWS) * 2 - 1) * 0.92;
  const r = Math.hypot(nx * 1.08, ny);
  const ang = Math.atan2(ny, nx * 1.08);

  // Inner core emblem
  if (r < 0.14) {
    return { idx: r < 0.07 ? 7 : 6, tone: r < 0.07 ? 3 : 2 };
  }

  // 3 concentric collector tiers with orbiting `#97DFFC` early-access nodes
  const rings = [
    { rad: 0.34, speed: 0.95, nodes: 3, baseIdx: 6, tone: 2 as const },
    { rad: 0.59, speed: -0.62, nodes: 4, baseIdx: 5, tone: 1 as const },
    { rad: 0.84, speed: 0.38, nodes: 6, baseIdx: 3, tone: 0 as const },
  ];

  for (let i = 0; i < rings.length; i++) {
    const ring = rings[i];
    const d = Math.abs(r - ring.rad);
    if (d < 0.068) {
      const phase = ang * ring.nodes - tSec * ring.speed * ring.nodes;
      const nodePeak = Math.pow(0.5 + 0.5 * Math.cos(phase), 8);
      if (nodePeak > 0.58) {
        return { idx: 7, tone: 3 }; // crisp `*` access node
      }
      const dash = 0.5 + 0.5 * Math.cos(ang * (ring.nodes * 3) - tSec * ring.speed * 2);
      if (dash < 0.24) return { idx: 0, tone: 0 };
      return {
        idx: d < 0.032 ? ring.baseIdx : Math.max(1, ring.baseIdx - 2),
        tone: d < 0.032 ? ring.tone : 0,
      };
    }
  }

  return { idx: 0, tone: 0 };
}

/**
 * Chapter 04: Pure-ASCII Orbital Transit Arc (Confirmed -> In Transit -> Doorstep)
 */
function sampleTrackingCell(col: number, row: number, tSec: number): CellSample {
  const u = (col + 0.5) / GRID_COLS; // 0..1
  const v = (row + 0.5) / GRID_ROWS; // 0..1

  // Graceful parabolic orbital delivery arc from left (0.12) -> peak center (0.50) -> right (0.88)
  const arcU = (u - 0.1) / 0.8;
  const inArcSpan = arcU >= -0.02 && arcU <= 1.02;
  const arcY = 0.66 - 0.38 * Math.sin(clamp01(arcU) * Math.PI);

  // 3 Waypoint nodes: Confirmed (0.0), In Transit (0.5), Doorstep (1.0)
  const waypoints = [
    { x: 0.1, y: 0.66 },
    { x: 0.5, y: 0.28 },
    { x: 0.9, y: 0.66 },
  ];

  for (let i = 0; i < waypoints.length; i++) {
    const wp = waypoints[i];
    const d = Math.hypot((u - wp.x) * 1.4, v - wp.y);
    if (d < 0.055) {
      return { idx: 7, tone: 3 }; // `*` crisp waypoint core
    }
    if (d < 0.105) {
      return { idx: 4, tone: 2 }; // `+` halo
    }
  }

  // Traveling `#97DFFC` live order packet along the orbital arc
  const packetU = (tSec * 0.26) % 1;
  const packetX = 0.1 + packetU * 0.8;
  const packetY = 0.66 - 0.38 * Math.sin(packetU * Math.PI);
  const dPacket = Math.hypot((u - packetX) * 1.4, v - packetY);
  if (dPacket < 0.065) {
    return { idx: 7, tone: 3 };
  }

  // Orbital trajectory curve
  if (inArcSpan) {
    const dArc = Math.abs(v - arcY);
    if (dArc < 0.045) {
      const passed = arcU <= packetU;
      const trail = Math.exp(-Math.abs(arcU - packetU) * 11.0);
      if (trail > 0.35) return { idx: 6, tone: 2 };
      return {
        idx: passed ? 5 : 2, // `=` completed path vs `-` upcoming path
        tone: passed ? 2 : 1,
      };
    }
  }

  // Subtle horizontal ground baseline beneath the transit arc
  if (Math.abs(v - 0.78) < 0.028 && u >= 0.08 && u <= 0.92) {
    return { idx: col % 3 === 0 ? 1 : 2, tone: 0 };
  }

  return { idx: 0, tone: 0 };
}

interface AsciiDropSpecimenProps {
  activeChapter: DropChapter;
  className?: string;
}

/**
 * Interactive High-DPI Pure-ASCII Drop Specimen (`PROTOTYPE SPECIMEN · ARCHIVE 001`):
 * - Strictly constructed out of ` ^-t+=T*` in probed `Geist Mono` at native DPR
 * - Morphs seamlessly across Band 2's 4 chapters (`01 Clock` -> `02 Fit` -> `03 Loyalty` -> `04 Track`)
 * - Innovation B: Playable Silhouette (`HOODIE` / `BOXY TEE` / `WORK JACKET`) + Cut (`CROPPED` / `REGULAR` / `OVERSIZED`) switcher
 * - Innovation C: Gravitational Magnetic ASCII Hover Wake on desktop pointers
 */
export function AsciiDropSpecimen({
  activeChapter,
  className = "",
}: AsciiDropSpecimenProps) {
  const [silhouette, setSilhouette] = useState<GarmentSilhouette>("HOODIE");
  const [cut, setCut] = useState<GarmentCut>("REGULAR");
  const [specimenSec, setSpecimenSec] = useState(252); // 04:12 illustrative specimen timer

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const monoProbeRef = useRef<HTMLSpanElement | null>(null);

  const chapterRef = useRef<DropChapter>(activeChapter);
  const silhouetteRef = useRef<GarmentSilhouette>(silhouette);
  const cutRef = useRef<GarmentCut>(cut);
  const morphStartRef = useRef<number>(0);

  useEffect(() => {
    chapterRef.current = activeChapter;
    silhouetteRef.current = silhouette;
    cutRef.current = cut;
    morphStartRef.current = performance.now();
  }, [activeChapter, silhouette, cut]);

  // Live illustrative specimen drop timer (loops 05:00 -> 00:00 cleanly, clearly labeled as prototype specimen)
  useEffect(() => {
    const id = window.setInterval(() => {
      setSpecimenSec((prev) => (prev <= 1 ? 299 : prev - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const specimenTimerText = useMemo(() => {
    const m = Math.floor(specimenSec / 60);
    const s = specimenSec % 60;
    return `T-00:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }, [specimenSec]);

  const specs = GARMENT_SPECS[silhouette][cut];

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cssW = 420;
    let cssH = 264;
    let dpr = 2;
    let cellPxW = 18;
    let cellPxH = 22;
    let originX = 0;
    let originY = 0;
    let monoFamily = "ui-monospace, SFMono-Regular, Menlo, monospace";

    // Innovation C: Magnetic hover wake state
    let ptrCol = -99;
    let ptrRow = -99;
    let wakeStrength = 0;
    let wakeTarget = 0;
    let isVisible = true;
    let rafId = 0;

    const syncSize = () => {
      const rect = container.getBoundingClientRect();
      cssW = Math.max(1, Math.round(rect.width));
      cssH = Math.max(1, Math.round(rect.height));
      const isMobile = cssW < 420;
      dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), isMobile ? 3.0 : 2.5);
      canvas.width = Math.max(1, Math.round(cssW * dpr));
      canvas.height = Math.max(1, Math.round(cssH * dpr));

      cellPxW = Math.max(5, Math.floor(canvas.width / GRID_COLS));
      cellPxH = Math.max(8, Math.floor(canvas.height / GRID_ROWS));
      originX = Math.floor((canvas.width - cellPxW * GRID_COLS) * 0.5);
      originY = Math.floor((canvas.height - cellPxH * GRID_ROWS) * 0.5);

      if (monoProbeRef.current) {
        monoFamily = window.getComputedStyle(monoProbeRef.current).fontFamily;
      }
    };

    const drawFrame = (ts: number, dt: number) => {
      const tSec = reducedMotion ? 0 : ts * 0.001;
      const chapter = chapterRef.current;
      const sil = silhouetteRef.current;
      const activeCut = cutRef.current;

      const morphElapsed = reducedMotion ? 1000 : ts - morphStartRef.current;
      const morphP = clamp01(morphElapsed / 380);

      const lerpRate = wakeTarget > wakeStrength ? 15 : 8.5;
      wakeStrength += (wakeTarget - wakeStrength) * Math.min(1, dt * lerpRate);
      if (Math.abs(wakeTarget - wakeStrength) < 0.003) wakeStrength = wakeTarget;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const fontPx = Math.max(9, Math.round(cellPxH * 0.88));
      const font500 = `500 ${fontPx}px ${monoFamily}`;
      const font700 = `700 ${fontPx}px ${monoFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const wakeRadius = 4.4;

      for (let r = 0; r < GRID_ROWS; r++) {
        for (let c = 0; c < GRID_COLS; c++) {
          let sample: CellSample;
          if (chapter === 0) {
            sample = sampleGarmentCell(c, r, sil, activeCut, false, tSec);
          } else if (chapter === 1) {
            sample = sampleGarmentCell(c, r, sil, activeCut, true, tSec);
          } else if (chapter === 2) {
            sample = sampleLoyaltyCell(c, r, tSec);
          } else {
            sample = sampleTrackingCell(c, r, tSec);
          }

          // Smooth density-crystallization morph wave on state/garment/cut switches
          let glyphIdx = sample.idx;
          let tone = sample.tone;
          if (morphP < 1 && glyphIdx > 0) {
            const waveDist = Math.abs(c / GRID_COLS - 0.5) * 1.1 + (r / GRID_ROWS) * 0.4;
            const local = clamp01((morphP * 1.45 - waveDist * 0.45) / 0.55);
            if (local <= 0.02) continue;
            if (local < 0.92) {
              glyphIdx = Math.max(1, Math.min(7, Math.floor(local * 7)));
              tone = local > 0.72 ? 2 : 1;
            }
          }

          if (glyphIdx === 0) continue;

          // Innovation C: Gravitational Magnetic ASCII Hover Wake
          let boosted = false;
          if (wakeStrength > 0.005) {
            const dist = Math.hypot(c - ptrCol, (r - ptrRow) * 1.25);
            if (dist < wakeRadius) {
              const f = Math.pow(1 - dist / wakeRadius, 1.65) * wakeStrength;
              if (f > 0.16) {
                glyphIdx = Math.min(7, glyphIdx + (f > 0.58 ? 2 : 1));
                tone = f > 0.55 ? 3 : 2;
                boosted = true;
              }
            }
          }

          const px = originX + c * cellPxW + Math.floor(cellPxW * 0.5);
          const py = originY + r * cellPxH + Math.floor(cellPxH * 0.52);

          ctx.font = tone >= 2 || boosted ? font700 : font500;
          ctx.fillStyle =
            tone === 3
              ? "#F7FAFF"
              : tone === 2
                ? "#97DFFC"
                : tone === 1
                  ? "#858AE3"
                  : "#613DC1";
          ctx.globalAlpha = tone >= 2 ? 1.0 : tone === 1 ? 0.9 : 0.74;
          ctx.fillText(ASCII_RAMP[glyphIdx], px, py);
        }
      }

      ctx.globalAlpha = 1;
    };

    syncSize();
    let lastTs = performance.now();

    const loop = (ts: number) => {
      rafId = window.requestAnimationFrame(loop);
      if (document.hidden || !isVisible) {
        lastTs = ts;
        return;
      }
      const dt = Math.min(0.05, Math.max(0.001, (ts - lastTs) * 0.001));
      lastTs = ts;
      drawFrame(ts, dt);
    };

    rafId = window.requestAnimationFrame(loop);

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || reducedMotion) return;
      const rect = container.getBoundingClientRect();
      ptrCol = ((e.clientX - rect.left) * dpr - originX) / Math.max(1, cellPxW) - 0.5;
      ptrRow = ((e.clientY - rect.top) * dpr - originY) / Math.max(1, cellPxH) - 0.5;
      wakeTarget = 1;
    };
    const onPointerLeave = () => {
      wakeTarget = 0;
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave, { passive: true });

    const ro = new ResizeObserver(() => syncSize());
    ro.observe(container);

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              isVisible = entries[0]?.isIntersecting ?? true;
            },
            { threshold: 0.01 }
          )
        : null;
    io?.observe(container);

    let disposed = false;
    document.fonts?.ready
      .then(() => {
        if (!disposed) syncSize();
      })
      .catch(() => {});

    return () => {
      disposed = true;
      window.cancelAnimationFrame(rafId);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      ro.disconnect();
      io?.disconnect();
    };
  }, []);

  const showGarmentControls = activeChapter === 0 || activeChapter === 1;

  return (
    <div
      data-specimen="true"
      className={`relative overflow-hidden rounded-[8px] border border-[#858AE3]/22 bg-[#06040B] ${className}`}
    >
      <span
        ref={monoProbeRef}
        aria-hidden="true"
        className="pointer-events-none sr-only font-mono"
      >
        T
      </span>

      {/* Top Architectural Telemetry Strip */}
      <div className="flex items-center justify-between border-b border-[#858AE3]/16 px-4 py-3 font-mono text-[10px] tracking-[0.16em] uppercase sm:px-5 sm:text-[10.5px]">
        <span className="text-[#858AE3]/85">
          <span className="text-[#97DFFC]">+</span> PROTOTYPE SPECIMEN · ARCHIVE 001
        </span>
        <span className="text-[#97DFFC]">{CHAPTER_LABELS[activeChapter]}</span>
      </div>

      {/* Live High-DPI Pure-ASCII Sculpture Viewport */}
      <div
        ref={containerRef}
        className="relative h-[238px] w-full bg-[#040206] sm:h-[296px]"
      >
        <canvas
          ref={canvasRef}
          aria-label={`Interactive pure-ASCII drop preview for ${CHAPTER_LABELS[activeChapter]}`}
          className="block h-full w-full"
        />

        {/* Subtle chapter-specific floating corner coordinates */}
        {activeChapter === 2 ? (
          <div className="pointer-events-none absolute inset-x-4 bottom-3 flex items-center justify-between font-mono text-[9.5px] tracking-[0.16em] text-[#858AE3]/85 uppercase sm:inset-x-5">
            <span>TIER I · EARLY WINDOW</span>
            <span className="text-[#97DFFC]">TIER III · FREE SHIPPING</span>
          </div>
        ) : activeChapter === 3 ? (
          <div className="pointer-events-none absolute inset-x-4 bottom-3 flex items-center justify-between font-mono text-[9.5px] tracking-[0.16em] text-[#858AE3]/85 uppercase sm:inset-x-5">
            <span>CONFIRMED</span>
            <span className="text-[#97DFFC]">IN TRANSIT</span>
            <span>DOORSTEP</span>
          </div>
        ) : null}
      </div>

      {/* Interactive Innovation B Controls + Live Telemetry Readout */}
      <div className="border-t border-[#858AE3]/16 bg-[#07050D] px-4 py-3.5 sm:px-5 sm:py-4">
        {showGarmentControls ? (
          <div className="space-y-3">
            {/* Silhouette & Cut Switchers (Innovation B) */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div
                role="radiogroup"
                aria-label="Garment silhouette"
                className="flex flex-wrap items-center gap-1"
              >
                {SILHOUETTES.map((item) => {
                  const selected = silhouette === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setSilhouette(item)}
                      className={`cursor-pointer rounded-[4px] border px-2 py-1 font-mono text-[9.5px] tracking-[0.12em] uppercase transition-colors sm:px-2.5 sm:text-[10px] ${
                        selected
                          ? "border-[#97DFFC]/80 bg-[#613DC1]/25 text-[#97DFFC]"
                          : "border-[#858AE3]/20 bg-[#040206] text-[#C4BBE0]/72 hover:border-[#858AE3]/50 hover:text-white"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

              <div
                role="radiogroup"
                aria-label="Garment cut"
                className="flex items-center gap-1"
              >
                {CUTS.map((item) => {
                  const selected = cut === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setCut(item)}
                      className={`cursor-pointer rounded-[4px] border px-2 py-1 font-mono text-[9.5px] tracking-[0.11em] uppercase transition-colors sm:text-[10px] ${
                        selected
                          ? "border-[#858AE3]/80 bg-[#858AE3]/18 text-white"
                          : "border-[#858AE3]/16 bg-transparent text-[#858AE3]/75 hover:border-[#858AE3]/45 hover:text-white"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chapter 01 (Clock + 5-min hold) vs Chapter 02 (Flat Garment Measurements) */}
            {activeChapter === 0 ? (
              <div className="flex items-center justify-between border-t border-[#858AE3]/14 pt-2.5 font-mono text-[10.5px] tracking-[0.12em] uppercase">
                <div className="flex items-center gap-2 text-[#D8D0EA]/85">
                  <span className="text-[#97DFFC]">{specimenTimerText}</span>
                  <span className="text-[#858AE3]/55">·</span>
                  <span>5-MIN CART HOLD</span>
                </div>
                <span className="text-[#858AE3]/80">{specs.weight}</span>
              </div>
            ) : (
              <div
                data-fit-readout="true"
                className="grid grid-cols-3 gap-2 border-t border-[#858AE3]/14 pt-2.5 font-mono text-[10px] tracking-[0.12em] uppercase"
              >
                <div>
                  <span className="block text-[#858AE3]/72">CHEST</span>
                  <span className="mt-0.5 block text-[12px] font-medium text-[#97DFFC]">
                    {specs.chest}
                  </span>
                </div>
                <div>
                  <span className="block text-[#858AE3]/72">LENGTH</span>
                  <span className="mt-0.5 block text-[12px] font-medium text-white">
                    {specs.length}
                  </span>
                </div>
                <div>
                  <span className="block text-[#858AE3]/72">SHOULDER</span>
                  <span className="mt-0.5 block text-[12px] font-medium text-white">
                    {specs.shoulder}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : activeChapter === 2 ? (
          <div className="flex items-center justify-between font-mono text-[10.5px] tracking-[0.12em] uppercase">
            <span className="text-[#D8D0EA]/85">
              DIRECT LABEL LOYALTY · NO PLATFORM MIDDLEMAN
            </span>
            <span className="text-[#97DFFC]">3 TIERS</span>
          </div>
        ) : (
          <div className="flex items-center justify-between font-mono text-[10.5px] tracking-[0.12em] uppercase">
            <span className="text-[#D8D0EA]/85">
              NATIVE ORDER FEED · LIVE CARRIER SYNC
            </span>
            <span className="text-[#97DFFC]">DROP TO DOOR</span>
          </div>
        )}
      </div>
    </div>
  );
}
