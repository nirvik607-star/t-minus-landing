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
  // Hooded rain shell: big hood, long A-line body to mid-thigh, storm flap, hem cord.
  shell: {
    fills: [
      "M44,16 L76,16 L90,22 L110,72 L98,78 L86,48 L92,116 L28,116 L34,48 L22,78 L10,72 L30,22 Z",
      "M41,18 C30,-8 90,-8 79,18 C72,8 48,8 41,18 Z",
    ],
    shade: ["M30,22 L10,72 L22,78 L34,48 Z", "M90,22 L110,72 L98,78 L86,48 Z"],
    seams: [
      "M60,12 L60,116",
      "M55.5,12 L55.5,116",
      "M41,18 C50,27 70,27 79,18",
      "M40,74 L50,96",
      "M80,74 L70,96",
      "M29,108 L91,108",
      "M36,34 L84,34",
      "M13.5,65 L25.5,71",
      "M106.5,65 L94.5,71",
    ],
  },
  // Field jacket: boxy and cropped, pointed collar, four flap pockets, waist cord.
  jacket: {
    fills: [
      "M42,14 L78,14 L94,20 L114,66 L102,73 L90,46 L90,100 L30,100 L30,46 L18,73 L6,66 L26,20 Z",
      "M42,14 L52,27 L60,17 L68,27 L78,14 L72,6 L48,6 Z",
    ],
    shade: ["M26,20 L6,66 L18,73 L30,46 Z", "M94,20 L114,66 L102,73 L90,46 Z"],
    seams: [
      "M60,17 L60,100",
      "M42,14 L52,27 L60,17 L68,27 L78,14",
      "M36,32 L54,32 L54,48 L36,48 Z",
      "M36,36.5 L54,36.5",
      "M66,32 L84,32 L84,48 L66,48 Z",
      "M66,36.5 L84,36.5",
      "M35,68 L55,68 L55,92 L35,92 Z",
      "M35,73 L55,73",
      "M65,68 L85,68 L85,92 L65,92 Z",
      "M65,73 L85,73",
      "M30,59 L90,59",
      "M9.5,59 L21.5,66",
      "M110.5,59 L98.5,66",
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
