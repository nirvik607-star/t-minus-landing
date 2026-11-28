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

/** Tone steps. The body rests at 0; a step up is white, a step down lower-case. */
const LIFT = 0.25;
const SINK = -0.2;
const DEEP = -0.45;

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
  /** Let the mark replace the edge where it crosses it (hardware on a strap). */
  over?: boolean;
}

interface GarmentSpec {
  /** Moves the whole drawing down by this many units, to centre it in the box. */
  drop?: number;
  /** Filled silhouette paths, in a 120 x 120 box. */
  fills: string[];
  /** Thick strokes that are part of the silhouette (a bag's handles). */
  strokes?: Array<{ d: string; width: number }>;
  /** Lighter and darker areas, still drawn in T's. */
  tones?: Tone[];
  /** Supporting marks: ribbing, stitching, hardware. Kept few. */
  marks?: Mark[];
  /**
   * Horizontal baffles: a repeating bright-to-dark band down the piece. On
   * each seam row the outline steps in by a cell, so the edge reads as quilted.
   */
  bands?: { period: number; offset: number };
}

const GARMENTS: Record<GarmentKind, GarmentSpec> = {
  // Heavyweight pullover hoodie: hood laid flat, kangaroo pocket, ribbed cuffs and hem.
  hoodie: {
    drop: 4,
    fills: [
      "M43,29 L77,29 L96,36 L110,84 L110,93 L94,93 L94,85 L85,58 L85,108 L35,108 L35,58 L26,85 L26,93 L10,93 L10,84 L24,36 Z",
      "M41,32 C34,20 42,5 60,5 C78,5 86,20 79,32 Z",
    ],
    tones: [
      // Sleeves sit a step back from the body.
      { d: "M26,34 L10,84 L10,93 L26,93 L26,85 L35,58 L34,32 Z", v: SINK },
      { d: "M94,34 L110,84 L110,93 L94,93 L94,85 L85,58 L86,32 Z", v: SINK },
      // The hood's opening.
      { d: "M50,32 C46,22 51,14 60,14 C69,14 74,22 70,32 C66,37 54,37 50,32 Z", v: DEEP },
      // Kangaroo pocket, with its two hand openings.
      { d: "M47,73 L73,73 L80,85 L80,98 L40,98 L40,85 Z", v: LIFT },
      { d: "M47,73 L40,85", v: -0.7, stroke: 3 },
      { d: "M73,73 L80,85", v: -0.7, stroke: 3 },
    ],
    marks: [
      { d: "M35,100.5 L85,100.5 L85,108 L35,108 Z", glyph: "=", fill: true },
      { d: "M10,85.5 L26,85.5 L26,93 L10,93 Z", glyph: "=", fill: true },
      { d: "M94,85.5 L110,85.5 L110,93 L94,93 Z", glyph: "=", fill: true },
      { d: "M55,40 L55,54", glyph: "+" },
      { d: "M65,40 L65,54", glyph: "+" },
    ],
  },
  // Boxy graphic tee: dropped shoulders, wide short sleeves, a block on the chest.
  tee: {
    fills: [
      "M47,15 C52,25 68,25 73,15 L93,16 C99,17 103,20 106,25 L118,47 L104,58 L93,48 L93,101 L27,101 L27,48 L16,58 L2,47 L14,25 C17,20 21,17 27,16 Z",
    ],
    tones: [
      { d: "M24,15 L14,25 L2,47 L16,58 L27,48 L28,15 Z", v: SINK },
      { d: "M96,15 L106,25 L118,47 L104,58 L93,48 L92,15 Z", v: SINK },
      { d: "M44,40 L76,40 L76,62 L44,62 Z", v: LIFT },
    ],
    marks: [
      { d: "M46,17 C52,28 68,28 74,17", glyph: "=", over: true },
      { d: "M27,94 L93,94 L93,101 L27,101 Z", glyph: "-", fill: true },
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
      { d: "M60,14 L89,14 L101,112 L69,112 L60,46 Z", v: SINK },
      { d: "M19,56 L41,56 L40,86 L16,86 Z", v: LIFT },
      { d: "M101,56 L79,56 L80,86 L104,86 Z", v: LIFT - SINK },
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
    drop: 10,
    fills: [
      "M43,22 L77,22 C92,22 102,26 106,36 L114,76 L114,86 L98,86 L98,80 L89,52 L89,92 L31,92 L31,52 L22,80 L22,86 L6,86 L6,76 L14,36 C18,26 28,22 43,22 Z",
      "M45,6 L75,6 L78,24 L42,24 Z",
    ],
    marks: [{ d: "M60,8 L60,92", glyph: "+" }],
    bands: { period: 11, offset: 0 },
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
      { d: "M41,86 C37,58 47,36 69,34 C60,48 57,66 58,86 Z", v: LIFT },
      { d: "M44,57 L54,57 L54,69 L44,69 Z", v: -0.7 },
      { d: "M70,34 C82,48 86,66 86,86", v: DEEP, stroke: 3 },
      // Brim.
      { d: "M43,77 L15,83 C8,85 8,93 16,94 L47,90 Z", v: SINK },
      // The opening above the strap.
      { d: "M95,86 C95,74 105,72 111,76 L111,86 Z", v: -0.7 },
    ],
    marks: [
      { d: "M94,83.5 L112,83.5", glyph: "=" },
      { d: "M70.5,52 L73.5,52", glyph: "+" },
      { d: "M94.5,58 L97.5,58", glyph: "+" },
    ],
  },
  // Chunky low-top from the side, toe to the left: thick sole, laced throat, padded collar.
  sneaker: {
    fills: [
      "M7,82 C5,90 9,97 18,97 L108,97 C115,97 116,88 114,80 L112,76 L9,78 Z",
      "M9,79 C9,66 22,60 38,56 L62,34 C66,29 75,27 79,31 L86,44 C92,42 100,36 106,33 C111,44 114,64 113,78 Z",
    ],
    tones: [
      // Midsole, with a groove along it, and the line where the upper meets it.
      { d: "M7,82 C5,90 9,97 18,97 L108,97 C115,97 116,88 114,80 L112,76 L9,78 Z", v: LIFT },
      { d: "M30,88.5 L113,87", v: -LIFT, stroke: 3 },
      { d: "M9,79.5 L113,77.5", v: -0.9, stroke: 3 },
      // Toe cap and heel counter.
      { d: "M9,79 C9,66 22,60 32,58 C35,66 33,74 30,79 Z", v: LIFT },
      { d: "M97,78 C96,60 100,44 106,33 C111,44 114,64 113,78 Z", v: LIFT },
      // Side panel.
      { d: "M48,78 L66,50 L84,50 L80,78 Z", v: SINK },
    ],
    marks: [
      { d: "M44,57 L66,37", glyph: "=" },
      { d: "M72,33 L78,34", glyph: "^" },
    ],
  },
  // Canvas tote: tall body, one pair of handles, a printed block on the front.
  bag: {
    fills: ["M25,46 L95,46 L99,112 L21,112 Z"],
    strokes: [{ d: "M43,48 C43,4 77,4 77,48", width: 4.5 }],
    tones: [
      { d: "M42,68 L78,68 L78,94 L42,94 Z", v: LIFT },
      { d: "M24,53 L96,53", v: SINK, stroke: 3 },
    ],
    marks: [
      { d: "M23,106 L97,106", glyph: "-" },
      { d: "M41,52 L45,52", glyph: "+" },
      { d: "M75,52 L79,52", glyph: "+" },
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
/** Font size, in cell widths. */
const GLYPH_SIZE = 1.3;

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

/**
 * Columns for a drawing this many CSS pixels across: coarser when small, so
 * the shape holds. Always odd, so a centre seam has a column to sit in.
 */
export function garmentColumns(px: number) {
  return px < 96 ? 21 : px < 210 ? 29 : 37;
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
  const drop = spec.drop ?? 0;
  mc.setTransform(sub / cellW, 0, 0, sub / cellH, 0, (drop * sub) / cellH);
  mc.fillStyle = "#fff";
  mc.strokeStyle = "#fff";
  mc.lineCap = "round";
  mc.lineJoin = "round";
  for (const d of spec.fills) mc.fill(new Path2D(d));
  for (const s of spec.strokes ?? []) {
    // Never thinner than a cell, or a handle breaks up on the coarse grid.
    mc.lineWidth = Math.max(s.width, 1.25 * cellH);
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

  const bandRows = spec.bands ? Math.max(3, Math.round(spec.bands.period / cellH)) : 0;
  const bandStart = spec.bands ? Math.round((spec.bands.offset + drop) / cellH) : 0;
  /** Where a row falls in its baffle: 0 at the top, bandRows - 1 on the seam. */
  const bandStep = (r: number) => (((r - bandStart) % bandRows) + bandRows) % bandRows;
  // (Left alone on the coarsest grid, where a cell is too much to lose.)
  if (bandRows && cols >= 29) {
    const pinched: number[] = [];
    for (let r = 0; r < rows; r++) {
      if (bandStep(r) !== bandRows - 1) continue;
      for (let c = 0; c < cols; c++) {
        // Not along a hem or cuff, which should stay a whole line.
        if (!inside[r * cols + c] || r === rows - 1 || !inside[(r + 1) * cols + c]) continue;
        const left = c > 0 && inside[r * cols + c - 1];
        const right = c < cols - 1 && inside[r * cols + c + 1];
        if (left !== right) pinched.push(r * cols + c);
      }
    }
    for (const i of pinched) inside[i] = 0;
  }

  // Tones and marks are tested at each cell's centre, in cell space, so a
  // line is one cell wide whichever way it runs.
  const probe = document.createElement("canvas").getContext("2d")!;
  const toCells = new DOMMatrix([1 / cellW, 0, 0, 1 / cellH, 0, drop / cellH]);
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

  const mark: Array<Mark | undefined> = new Array(cols * rows);
  probe.lineWidth = 1;
  for (const k of spec.marks ?? []) {
    const p = inCells(k.d);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!inside[r * cols + c]) continue;
        const hit = k.fill
          ? probe.isPointInPath(p, c + 0.5, r + 0.5)
          : probe.isPointInStroke(p, c + 0.5, r + 0.5);
        if (hit) mark[r * cols + c] = k;
      }
    }
  }

  const at = (c: number, r: number) =>
    c >= 0 && r >= 0 && c < cols && r < rows ? inside[r * cols + c] : 0;

  const cells: GarmentCell[] = [];
  const mix = { total: 0, upper: 0, lower: 0, marks: 0 };
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!inside[r * cols + c]) continue;
      const edge = !at(c - 1, r) || !at(c + 1, r) || !at(c, r - 1) || !at(c, r + 1);
      const k = mark[r * cols + c];

      let cell: GarmentCell;
      if (k && (!edge || k.over)) {
        cell = { col: c, row: r, glyph: k.glyph, color: WHITE, alpha: 0.92, weight: 600 };
      } else if (edge) {
        cell = { col: c, row: r, glyph: "T", color: WHITE, alpha: 1, weight: 700 };
      } else {
        // A little light from the upper left, then the piece's own lights and darks.
        let t =
          0.64 - 0.1 * ((r + 0.5) / rows - 0.5) - 0.12 * ((c + 0.5) / cols - 0.5) + tone[r * cols + c];
        if (bandRows) {
          const b = bandStep(r);
          t += b === 0 ? LIFT : b === bandRows - 1 ? DEEP : 0;
        }
        if (t >= 0.8) cell = { col: c, row: r, glyph: "T", color: WHITE, alpha: 1, weight: 700 };
        else if (t >= 0.5)
          cell = { col: c, row: r, glyph: "T", color: PERIWINKLE, alpha: 1, weight: 500 };
        else if (t >= 0.3)
          cell = { col: c, row: r, glyph: "t", color: PERIWINKLE, alpha: 0.85, weight: 500 };
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
/* Drawing and component                                               */
/* ------------------------------------------------------------------ */

/** Draw `kind` into `canvas` at the size it is laid out at, one whole character a cell. */
export function paintGarment(canvas: HTMLCanvasElement, kind: GarmentKind, fontFamily: string) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
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
  const size = cw * GLYPH_SIZE;
  const baseline = (ch + size * 0.698) / 2;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  let weight = 0;
  for (const cell of layout.cells) {
    if (cell.weight !== weight) {
      weight = cell.weight;
      ctx.font = `${weight} ${size}px ${fontFamily}`;
    }
    ctx.globalAlpha = cell.alpha;
    ctx.fillStyle = cell.color;
    ctx.fillText(cell.glyph, ox + (cell.col + 0.5) * cw, oy + cell.row * ch + baseline);
  }
  ctx.globalAlpha = 1;
}

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
    const mono =
      getComputedStyle(document.documentElement).getPropertyValue("--font-ibm-plex-mono").trim() ||
      "monospace";
    const draw = () => paintGarment(canvas, kind, mono);
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
