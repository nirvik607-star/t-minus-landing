"use client";

import React, { useEffect, useRef } from "react";

/**
 * Garments drawn in the brand's glyphs.
 *
 * Each garment is a flat lay described as vector paths: a silhouette, the
 * parts that sit darker (sleeves), and the seams that give it structure
 * (plackets, pockets, cuffs, quilting).
 * The silhouette becomes a mask over a fixed grid of cells; cells inside it
 * hold glyphs whose weight follows a simple light from the upper left, seam
 * cells are drawn in the structure colour, and the edge is a line of marks.
 * Nothing moves.
 */

export type GarmentKind = "shell" | "jacket" | "vest" | "trouser" | "tote" | "liner" | "overshirt";

interface GarmentSpec {
  /** Filled silhouette paths, in a 120 x 120 box. Flat lay, arms out. */
  fills: string[];
  /** Thick strokes that are part of the silhouette (bag handles). */
  strokes?: Array<{ d: string; width: number }>;
  /** Parts that sit a step darker than the body (sleeves, the far leg). */
  shade?: string[];
  /** Seam lines, stroked thin. */
  seams: string[];
  /** Repeating quilting lines across the body, if any. */
  quilt?: boolean;
}

const SLEEVE_L = "M30,18 L8,70 L20,76 L34,44 Z";
const SLEEVE_R = "M90,18 L112,70 L100,76 L86,44 Z";
const CUFFS = ["M11.5,62.5 L23.5,68.5", "M108.5,62.5 L96.5,68.5"];
/** Torso with sleeves out: neck, shoulders, cuffs, straight hem. */
const TORSO =
  "M44,12 L76,12 L90,18 L112,70 L100,76 L86,44 L86,108 L34,108 L34,44 L20,76 L8,70 L30,18 Z";

const GARMENTS: Record<GarmentKind, GarmentSpec> = {
  // Hooded rain shell: hood, long zip, storm flap, slanted hand pockets, hem cord.
  shell: {
    fills: [TORSO, "M43,14 C36,-6 84,-6 77,14 C70,5 50,5 43,14 Z"],
    shade: [SLEEVE_L, SLEEVE_R],
    seams: [
      "M60,10 L60,108",
      "M56,10 L56,108",
      "M43,14 C50,22 70,22 77,14",
      "M40,68 L50,90",
      "M80,68 L70,90",
      "M34,101 L86,101",
      "M36,30 L84,30",
      ...CUFFS,
    ],
  },
  // Field jacket: stand collar, four flap pockets, waist cord.
  jacket: {
    fills: [TORSO, "M45,12 L75,12 L72,4 L48,4 Z"],
    shade: [SLEEVE_L, SLEEVE_R],
    seams: [
      "M60,6 L60,108",
      "M45,12 L60,20 L75,12",
      "M39,30 L55,30 L55,46 L39,46 Z",
      "M39,34 L55,34",
      "M65,30 L81,30 L81,46 L65,46 Z",
      "M65,34 L81,34",
      "M38,72 L56,72 L56,98 L38,98 Z",
      "M38,77 L56,77",
      "M64,72 L82,72 L82,98 L64,98 Z",
      "M64,77 L82,77",
      "M34,62 L86,62",
      ...CUFFS,
    ],
  },
  // Work vest: deep V, armholes, two patch pockets.
  vest: {
    fills: ["M46,8 L60,34 L74,8 L92,18 C85,34 85,46 92,58 L92,110 L28,110 L28,58 C35,46 35,34 28,18 Z"],
    seams: [
      "M60,34 L60,110",
      "M46,8 L60,34 L74,8",
      "M34,68 L54,68 L54,94 L34,94 Z",
      "M66,68 L86,68 L86,94 L66,94 Z",
      "M28,103 L92,103",
      "M66,42 L80,42 L80,54 L66,54 Z",
    ],
  },
  // Zip-off trouser: waistband, fly, slant pockets, zips above the knee.
  trouser: {
    fills: ["M34,6 L86,6 L96,114 L68,114 L60,44 L52,114 L24,114 Z"],
    shade: ["M60,6 L86,6 L96,114 L68,114 L60,44 Z"],
    seams: [
      "M34,14 L86,14",
      "M60,14 L60,40",
      "M37,15 C39,26 44,31 51,32",
      "M83,15 C81,26 76,31 69,32",
      "M29,62 L54,62",
      "M91,62 L66,62",
      "M29.6,65 L53.6,65",
      "M90.4,65 L66.4,65",
      "M25,107 L53,107",
      "M95,107 L67,107",
    ],
  },
  // Tote: trapezoid body, two handles, front pocket split in two.
  tote: {
    fills: ["M22,44 L98,44 L104,112 L16,112 Z"],
    strokes: [
      { d: "M40,46 C40,6 80,6 80,46", width: 5 },
    ],
    seams: ["M21,54 L99,54", "M38,66 L82,66 L83,96 L37,96 Z", "M60,66 L60,96", "M18,104 L102,104"],
  },
  // Quilted liner: round neck, snap front, diamond quilting.
  liner: {
    fills: ["M45,12 C52,22 68,22 75,12 L90,18 L112,70 L100,76 L86,44 L86,106 L34,106 L34,44 L20,76 L8,70 L30,18 Z"],
    shade: [SLEEVE_L, SLEEVE_R],
    seams: ["M60,19 L60,106", "M45,12 C52,22 68,22 75,12", ...CUFFS],
    quilt: true,
  },
  // Overshirt: pointed collar, placket, one chest pocket, curved hem.
  overshirt: {
    fills: [
      "M44,12 L76,12 L90,18 L112,70 L100,76 L86,44 L86,100 C76,112 44,112 34,100 L34,44 L20,76 L8,70 L30,18 Z",
      "M44,12 L60,24 L76,12 L71,3 L49,3 Z",
    ],
    shade: [SLEEVE_L, SLEEVE_R],
    seams: [
      "M60,24 L60,108",
      "M57,24 L57,108",
      "M44,12 L60,24 L76,12",
      "M49,3 L60,13 L71,3",
      "M66,38 L82,38 L82,56 L74,60 L66,56 Z",
      "M34,26 L86,26",
      ...CUFFS,
    ],
  },
};

const BODY = ["-", "^", "+", "=", "t", "T"];

function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

export function GarmentGlyph({
  kind,
  className = "",
  label,
}: {
  kind: GarmentKind;
  className?: string;
  /** Accessible description, e.g. "Field jacket, drawn in glyphs". */
  label: string;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const spec = GARMENTS[kind];
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
      const scale = Math.min((w * 0.94) / 120, (h * 0.94) / 120);
      const gw = 120 * scale;
      const gh = 120 * scale;
      const ox = (w - gw) / 2;
      const oy = (h - gh) / 2;
      const cell = Math.max(3.4, Math.min(6, gh / 50));
      const cols = Math.ceil(w / cell);
      const rows = Math.ceil(h / cell);

      // Rasterise silhouette and seams at 3 samples a cell.
      const sub = 3;
      const mw = cols * sub;
      const mh = rows * sub;
      const k = (sub / cell) * scale;
      const raster = (paint: (c: CanvasRenderingContext2D) => void) => {
        const m = document.createElement("canvas");
        m.width = mw;
        m.height = mh;
        const c = m.getContext("2d", { willReadFrequently: true })!;
        c.setTransform(k, 0, 0, k, (ox * sub) / cell, (oy * sub) / cell);
        paint(c);
        const data = c.getImageData(0, 0, mw, mh).data;
        const out = new Float32Array(cols * rows);
        for (let r = 0; r < rows; r++) {
          for (let cx = 0; cx < cols; cx++) {
            let sum = 0;
            for (let y = 0; y < sub; y++) {
              for (let x = 0; x < sub; x++) {
                sum += data[((r * sub + y) * mw + cx * sub + x) * 4 + 3];
              }
            }
            out[r * cols + cx] = sum / (sub * sub * 255);
          }
        }
        return out;
      };

      const body = raster((c) => {
        c.fillStyle = "#fff";
        for (const d of spec.fills) c.fill(new Path2D(d));
        if (spec.strokes) {
          c.strokeStyle = "#fff";
          c.lineCap = "round";
          for (const s of spec.strokes) {
            c.lineWidth = s.width;
            c.stroke(new Path2D(s.d));
          }
        }
      });
      const shade = raster((c) => {
        c.fillStyle = "#fff";
        for (const d of spec.shade ?? []) c.fill(new Path2D(d));
      });
      const seams = raster((c) => {
        c.strokeStyle = "#fff";
        c.lineWidth = 1.5;
        c.lineJoin = "round";
        for (const d of spec.seams) c.stroke(new Path2D(d));
        if (spec.quilt) {
          c.lineWidth = 1.1;
          for (let i = -120; i < 240; i += 14) {
            c.stroke(new Path2D(`M${i},0 L${i + 120},120`));
            c.stroke(new Path2D(`M${i + 120},0 L${i},120`));
          }
        }
      });

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const cxm = (ox + gw / 2) / cell;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cov = body[r * cols + c];
          if (cov < 0.22) continue;
          const seam = seams[r * cols + c] * (cov > 0.5 ? 1 : 0);
          const x = (c + 0.5) * cell;
          const y = (r + 0.5) * cell;
          // Is this an edge cell? Any neighbour mostly outside.
          const edge =
            cov < 0.72 ||
            (body[r * cols + c - 1] ?? 0) < 0.3 ||
            (body[r * cols + c + 1] ?? 0) < 0.3 ||
            (body[(r - 1) * cols + c] ?? 0) < 0.3 ||
            (body[(r + 1) * cols + c] ?? 0) < 0.3;

          // Light from the upper left, falling off down and to the right, with
          // a soft fold either side of the centre line.
          const u = (x - ox) / gw;
          const v = (y - oy) / gh;
          const fold = 0.5 + 0.5 * Math.cos((c - cxm) * 0.42);
          let tone =
            0.92 - 0.34 * v - 0.2 * u + 0.16 * fold + 0.16 * (hash(c, r) - 0.5) -
            0.24 * shade[r * cols + c];
          tone = Math.min(0.999, Math.max(0.02, tone));

          let glyph: string;
          let color: string;
          let size = cell * 1.24;
          let alpha = 1;
          if (seam > 0.3) {
            glyph = seam > 0.62 ? "+" : "-";
            color = "#D3E9F2";
            alpha = 0.95;
          } else if (edge) {
            glyph = "T";
            color = "#858AE3";
            size = cell * 1.3;
          } else {
            const step = Math.floor(tone * BODY.length);
            glyph = BODY[step];
            color = tone > 0.8 ? "#FFFFFF" : tone > 0.58 ? "#B9BCF2" : tone > 0.34 ? "#8A6BEA" : "#613DC1";
            alpha = 0.55 + 0.45 * tone;
          }
          ctx.globalAlpha = alpha;
          ctx.fillStyle = color;
          ctx.font = `600 ${size}px ${mono}`;
          ctx.fillText(glyph, x, y + cell * 0.04);
        }
      }
      ctx.globalAlpha = 1;
    };

    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    document.fonts.ready.then(draw);
    draw();
    return () => ro.disconnect();
  }, [kind]);

  return <canvas ref={ref} role="img" aria-label={label} className={`block h-full w-full ${className}`} />;
}
