"use client";

import React, { useEffect, useRef } from "react";

/**
 * Streetwear drawn in the brand's letter.
 *
 * Each piece is described as vector paths in a 120 x 120 box: a silhouette,
 * areas that sit lighter or darker than the body, and a few seams.
 * The drawing is sampled onto a fixed grid of cells, and every cell inside the
 * silhouette holds one whole character. The field is the letter T: upper-case
 * and heavy where the cloth is bright, lower-case where it falls away. The edge
 * is a line of upper-case T's. A handful of supporting marks ("-", "=", "+",
 * "^") stand for ribbing, stitching and hardware.
 * Nothing moves.
 */

export type GarmentKind = "hoodie" | "tee" | "cargo" | "puffer" | "cap" | "sneaker" | "bag";

export const GARMENT_KINDS: readonly GarmentKind[] = [
  "hoodie",
  "tee",
  "cargo",
  "puffer",
  "cap",
  "sneaker",
  "bag",
];

type MarkGlyph = "-" | "=" | "+" | "^";

interface Tone {
  d: string;
  /** Added to the cell's tone: positive lifts towards white, negative sinks. */
  v: number;
  /** Stroke the path this many units wide instead of filling it. */
  stroke?: number;
}

interface Mark {
  d: string;
  glyph: MarkGlyph;
  /** Fill the path with the mark instead of tracing it one cell wide. */
  fill?: boolean;
}

interface GarmentSpec {
  /** Filled silhouette paths, in a 120 x 120 box. */
  fills: string[];
  /** Thick strokes that are part of the silhouette (a bag strap). */
  strokes?: Array<{ d: string; width: number }>;
  /** Lighter and darker areas, still drawn in T's. */
  tones?: Tone[];
  /** Supporting marks: ribbing, stitching, hardware. Kept few. */
  marks?: Mark[];
  /** Horizontal baffles: a repeating bright-to-dark band down the piece. */
  bands?: { period: number; offset: number };
}

const GARMENTS: Record<GarmentKind, GarmentSpec> = {
  // Heavyweight pullover hoodie: hood laid flat, kangaroo pocket, ribbed cuffs and hem.
  hoodie: {
    fills: [
      "M43,29 L77,29 L94,36 L113,88 L98,94 L85,58 L85,108 L35,108 L35,58 L22,94 L7,88 L26,36 Z",
      "M42,31 C34,14 43,3 60,3 C77,3 86,14 78,31 Z",
    ],
    tones: [
      // Sleeves sit a step back from the body.
      { d: "M28,35 L7,88 L22,94 L35,58 L34,33 Z", v: -0.2 },
      { d: "M92,35 L113,88 L98,94 L85,58 L86,33 Z", v: -0.2 },
      // The hood's opening.
      { d: "M50,31 C46,19 51,12 60,12 C69,12 74,19 70,31 C66,36 54,36 50,31 Z", v: -0.6 },
      // Kangaroo pocket, with its two hand openings.
      { d: "M47,74 L73,74 L80,86 L80,98 L40,98 L40,86 Z", v: 0.26 },
      { d: "M47,74 L40,86", v: -0.6, stroke: 3 },
      { d: "M73,74 L80,86", v: -0.6, stroke: 3 },
    ],
    marks: [
      { d: "M35,101 L85,101 L85,108 L35,108 Z", glyph: "=", fill: true },
      { d: "M7,88 L22,94 L24.7,86.5 L9.7,80.5 Z", glyph: "=", fill: true },
      { d: "M113,88 L98,94 L95.3,86.5 L110.3,80.5 Z", glyph: "=", fill: true },
      { d: "M55,38 L55,52", glyph: "+" },
      { d: "M65,38 L65,52", glyph: "+" },
    ],
  },
  // Boxy graphic tee: dropped shoulders, wide short sleeves, a block on the chest.
  tee: {
    fills: [
      "M46,14 C52,23 68,23 74,14 L97,23 L116,50 L102,60 L91,47 L91,106 L29,106 L29,47 L18,60 L4,50 L23,23 Z",
    ],
    tones: [
      { d: "M24,22 L4,50 L18,60 L29,47 L30,26 Z", v: -0.22 },
      { d: "M96,22 L116,50 L102,60 L91,47 L90,26 Z", v: -0.22 },
      { d: "M44,40 L76,40 L76,64 L44,64 Z", v: 0.5 },
    ],
    marks: [
      { d: "M43,18 C51,29 69,29 77,18", glyph: "=" },
      { d: "M30,100.5 L90,100.5", glyph: "-" },
    ],
  },
  // Cargo pant: relaxed leg, a bellows pocket on the outside of each thigh.
  cargo: {
    fills: [
      "M33,6 L87,6 L89,14 L101,112 L69,112 L60,46 L51,112 L19,112 L31,14 Z",
      "M19,56 L41,56 L40,86 L16,86 Z",
      "M101,56 L79,56 L80,86 L104,86 Z",
    ],
    tones: [
      // The far leg.
      { d: "M60,14 L89,14 L101,112 L69,112 L60,46 Z", v: -0.14 },
      { d: "M19,56 L41,56 L40,86 L16,86 Z", v: 0.3 },
      { d: "M101,56 L79,56 L80,86 L104,86 Z", v: 0.42 },
    ],
    marks: [
      { d: "M34,12.5 L86,12.5", glyph: "=" },
      { d: "M60,18 L60,38", glyph: "+" },
      { d: "M21,62 L41,62", glyph: "-" },
      { d: "M99,62 L79,62", glyph: "-" },
      { d: "M21,106.5 L50,106.5", glyph: "-" },
      { d: "M99,106.5 L70,106.5", glyph: "-" },
    ],
  },
  // Cropped puffer: fat sleeves, high collar, horizontal baffles, short hem.
  puffer: {
    fills: [
      "M43,22 L77,22 C90,22 98,28 101,36 L115,80 L99,88 L88,56 L88,92 L32,92 L32,56 L21,88 L5,80 L19,36 C22,28 30,22 43,22 Z",
      "M45,6 L75,6 L78,24 L42,24 Z",
    ],
    tones: [
      { d: "M21,34 L5,80 L21,88 L32,56 L31,30 Z", v: -0.1 },
      { d: "M99,34 L115,80 L99,88 L88,56 L89,30 Z", v: -0.1 },
    ],
    marks: [{ d: "M60,8 L60,92", glyph: "+" }],
    bands: { period: 11.25, offset: 3.75 },
  },
  // Five-panel cap from the side: tall front panel, flat brim, strap at the back.
  cap: {
    fills: [
      "M41,86 C37,58 47,36 69,34 C95,32 111,52 111,86 Z",
      "M43,77 L15,83 C8,85 8,93 16,94 L47,90 Z",
      "M66,33 a4,3.6 0 1,0 8,0 a4,3.6 0 1,0 -8,0 Z",
    ],
    tones: [
      // Front panel, and the patch on it.
      { d: "M41,86 C37,58 47,36 69,34 C60,48 57,66 58,86 Z", v: 0.2 },
      { d: "M43,56 L55,56 L55,70 L43,70 Z", v: 0.5 },
      { d: "M70,34 C82,48 86,66 86,86", v: -0.5, stroke: 3 },
      // Brim.
      { d: "M43,77 L15,83 C8,85 8,93 16,94 L47,90 Z", v: -0.16 },
      // The opening above the strap.
      { d: "M95,86 C95,74 105,72 111,76 L111,86 Z", v: -0.7 },
    ],
    marks: [
      { d: "M94,83.5 L112,83.5", glyph: "=" },
      { d: "M76,52 L76.5,52", glyph: "+" },
      { d: "M94,56 L94.5,56", glyph: "+" },
    ],
  },
  // Chunky low-top from the side, toe to the left: thick sole, laced throat, padded collar.
  sneaker: {
    fills: [
      "M7,82 C5,90 9,97 18,97 L108,97 C115,97 116,88 114,80 L112,76 L9,78 Z",
      "M9,79 C9,66 22,60 38,56 L62,34 C66,29 75,27 79,31 L86,44 C92,42 100,36 106,33 C111,44 114,64 113,78 Z",
    ],
    tones: [
      // Midsole, and the line where the upper meets it.
      { d: "M7,82 C5,90 9,97 18,97 L108,97 C115,97 116,88 114,80 L112,76 L9,78 Z", v: 0.42 },
      { d: "M9,79.5 L113,77.5", v: -0.7, stroke: 3 },
      // Toe cap and heel counter.
      { d: "M9,79 C9,66 22,60 32,58 C35,66 33,74 30,79 Z", v: 0.22 },
      { d: "M97,78 C96,60 100,44 106,33 C111,44 114,64 113,78 Z", v: 0.22 },
      // Side panel.
      { d: "M48,78 L66,50 L84,50 L80,78 Z", v: -0.3 },
    ],
    marks: [
      { d: "M44,57 L66,37", glyph: "=" },
      { d: "M72,33 L78,34", glyph: "^" },
    ],
  },
  // Crossbody bag: long strap, zip across the top, front pocket.
  bag: {
    fills: [
      "M30,62 L90,62 Q98,62 98,70 L98,104 Q98,112 90,112 L30,112 Q22,112 22,104 L22,70 Q22,62 30,62 Z",
    ],
    strokes: [{ d: "M28,66 C8,-6 112,-6 92,66", width: 6 }],
    tones: [{ d: "M34,82 L86,82 L86,104 L34,104 Z", v: 0.3 }],
    marks: [
      { d: "M27,70.5 L93,70.5", glyph: "-" },
      { d: "M35,81.5 L85,81.5", glyph: "=" },
      { d: "M26,58 L30,58", glyph: "+" },
      { d: "M90,58 L94,58", glyph: "+" },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Layout: paths to a fixed grid of characters                          */
/* ------------------------------------------------------------------ */

const WHITE = "#FFFFFF";
const PERIWINKLE = "#858AE3";
const ACCENT = "#613DC1";

/** Cells are a little taller than wide, as letters are. */
const CELL_ASPECT = 1.125;

export interface GarmentCell {
  col: number;
  row: number;
  glyph: string;
  color: string;
  alpha: number;
  weight: 500 | 600 | 700;
}

export interface GarmentLayout {
  cols: number;
  rows: number;
  cells: GarmentCell[];
  /** How the cells divide: upper-case T, lower-case t, and supporting marks. */
  mix: { total: number; upper: number; lower: number; marks: number };
}

function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

/** Columns for a drawing this many CSS pixels across: coarser when small, so the shape holds. */
export function garmentColumns(px: number) {
  return px < 96 ? 22 : px < 210 ? 30 : 36;
}

const layouts = new Map<string, GarmentLayout>();

/** The characters for one garment on a grid `cols` wide. Needs a document. */
export function layoutGarment(kind: GarmentKind, cols: number): GarmentLayout {
  const key = `${kind}:${cols}`;
  const cached = layouts.get(key);
  if (cached) return cached;

  const spec = GARMENTS[kind];
  const cellW = 120 / cols;
  const rows = Math.round(120 / (cellW * CELL_ASPECT));
  const cellH = 120 / rows;

  // Silhouette: coverage of each cell, sampled 4 x 4.
  const sub = 4;
  const m = document.createElement("canvas");
  m.width = cols * sub;
  m.height = rows * sub;
  const mc = m.getContext("2d", { willReadFrequently: true })!;
  mc.setTransform(sub / cellW, 0, 0, sub / cellH, 0, 0);
  mc.fillStyle = "#fff";
  mc.strokeStyle = "#fff";
  mc.lineCap = "round";
  for (const d of spec.fills) mc.fill(new Path2D(d));
  for (const s of spec.strokes ?? []) {
    mc.lineWidth = s.width;
    mc.stroke(new Path2D(s.d));
  }
  const data = mc.getImageData(0, 0, m.width, m.height).data;
  const inside = new Uint8Array(cols * rows);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let sum = 0;
      for (let y = 0; y < sub; y++) {
        for (let x = 0; x < sub; x++) {
          sum += data[((r * sub + y) * m.width + c * sub + x) * 4 + 3];
        }
      }
      inside[r * cols + c] = sum / (sub * sub * 255) >= 0.5 ? 1 : 0;
    }
  }

  // Tones and marks are tested at each cell's centre, in cell space, so a
  // line is one cell wide whichever way it runs.
  const probe = document.createElement("canvas").getContext("2d")!;
  const toCells = new DOMMatrix([1 / cellW, 0, 0, 1 / cellH, 0, 0]);
  const inCells = (d: string) => {
    const p = new Path2D();
    p.addPath(new Path2D(d), toCells);
    return p;
  };

  const tone = new Float32Array(cols * rows);
  for (const t of spec.tones ?? []) {
    const p = inCells(t.d);
    probe.lineWidth = Math.max(1, (t.stroke ?? 0) / cellW);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!inside[r * cols + c]) continue;
        const hit = t.stroke
          ? probe.isPointInStroke(p, c + 0.5, r + 0.5)
          : probe.isPointInPath(p, c + 0.5, r + 0.5);
        if (hit) tone[r * cols + c] += t.v;
      }
    }
  }

  const mark: Array<MarkGlyph | undefined> = new Array(cols * rows);
  probe.lineWidth = 1;
  for (const k of spec.marks ?? []) {
    const p = inCells(k.d);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!inside[r * cols + c]) continue;
        const hit = k.fill
          ? probe.isPointInPath(p, c + 0.5, r + 0.5)
          : probe.isPointInStroke(p, c + 0.5, r + 0.5);
        if (hit) mark[r * cols + c] = k.glyph;
      }
    }
  }

  const bandRows = spec.bands ? Math.max(2, Math.round(spec.bands.period / cellH)) : 0;
  const bandStart = spec.bands ? Math.round(spec.bands.offset / cellH) : 0;

  const at = (c: number, r: number) =>
    c >= 0 && r >= 0 && c < cols && r < rows ? inside[r * cols + c] : 0;

  const cells: GarmentCell[] = [];
  const mix = { total: 0, upper: 0, lower: 0, marks: 0 };
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!inside[r * cols + c]) continue;
      const edge = !at(c - 1, r) || !at(c + 1, r) || !at(c, r - 1) || !at(c, r + 1);
      const glyphMark = mark[r * cols + c];

      let cell: GarmentCell;
      if (edge) {
        cell = { col: c, row: r, glyph: "T", color: WHITE, alpha: 1, weight: 700 };
      } else if (glyphMark) {
        cell = { col: c, row: r, glyph: glyphMark, color: WHITE, alpha: 0.92, weight: 600 };
      } else {
        // Light from the upper left, then the piece's own lights and darks.
        let t =
          0.6 -
          0.2 * ((r + 0.5) / rows - 0.5) -
          0.1 * ((c + 0.5) / cols - 0.5) +
          0.1 * (hash(c, r) - 0.5) +
          tone[r * cols + c];
        if (bandRows) {
          const k = (((r - bandStart) % bandRows) + bandRows) % bandRows;
          t += k === 0 ? 0.3 : k === bandRows - 1 ? -0.36 : 0;
        }
        if (t >= 0.8) cell = { col: c, row: r, glyph: "T", color: WHITE, alpha: 1, weight: 700 };
        else if (t >= 0.52)
          cell = { col: c, row: r, glyph: "T", color: PERIWINKLE, alpha: 1, weight: 600 };
        else if (t >= 0.3)
          cell = { col: c, row: r, glyph: "t", color: PERIWINKLE, alpha: 0.9, weight: 500 };
        else cell = { col: c, row: r, glyph: "t", color: ACCENT, alpha: 1, weight: 500 };
      }
      cells.push(cell);
      mix.total++;
      if (cell.glyph === "T") mix.upper++;
      else if (cell.glyph === "t") mix.lower++;
      else mix.marks++;
    }
  }

  const layout = { cols, rows, cells, mix };
  layouts.set(key, layout);
  return layout;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function GarmentGlyph({
  kind,
  className = "",
  label = "",
}: {
  kind: GarmentKind;
  className?: string;
  /** Accessible description, e.g. "Heavyweight hoodie, drawn in glyphs". Empty when decorative. */
  label?: string;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const mono =
      getComputedStyle(document.documentElement).getPropertyValue("--font-ibm-plex-mono").trim() ||
      "monospace";

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      // Fit the 120 x 120 drawing into the box with a small margin.
      const g = Math.min(w, h) * 0.96;
      const ox = (w - g) / 2;
      const oy = (h - g) / 2;
      const layout = layoutGarment(kind, garmentColumns(g));
      const cw = g / layout.cols;
      const ch = g / layout.rows;
      // Sized so a capital fills most of its cell and still stands clear of its neighbours.
      const size = cw * 1.3;
      const baseline = (ch + size * 0.698) / 2;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      let weight = 0;
      for (const cell of layout.cells) {
        if (cell.weight !== weight) {
          weight = cell.weight;
          ctx.font = `${weight} ${size}px ${mono}`;
        }
        ctx.globalAlpha = cell.alpha;
        ctx.fillStyle = cell.color;
        ctx.fillText(cell.glyph, ox + (cell.col + 0.5) * cw, oy + cell.row * ch + baseline);
      }
      ctx.globalAlpha = 1;
    };

    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    document.fonts.ready.then(draw);
    draw();
    return () => ro.disconnect();
  }, [kind]);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={label}
      className={`block h-full w-full ${className}`}
    />
  );
}
