"use client";

import React, { useEffect, useRef } from "react";

/**
 * Garments drawn in the brand's glyphs.
 *
 * Each garment is a flat front view described as vector paths: a silhouette,
 * and the seams that give it structure (plackets, pockets, cuffs, quilting).
 * The silhouette becomes a mask over a fixed grid of cells; cells inside it
 * hold glyphs whose weight follows a simple light from the upper left, seam
 * cells are drawn in the structure colour, and the edge is a line of marks.
 * Nothing moves.
 */

export type GarmentKind = "shell" | "jacket" | "vest" | "trouser" | "tote" | "liner" | "overshirt";

interface GarmentSpec {
  /** Filled silhouette paths, in a 100 x 120 box. */
  fills: string[];
  /** Thick strokes that are part of the silhouette (bag handles). */
  strokes?: Array<{ d: string; width: number }>;
  /** Seam lines, stroked thin. */
  seams: string[];
  /** Repeating quilting lines across the body, if any. */
  quilt?: boolean;
}

const JACKET_BODY =
  "M38,13 L62,13 L66,19 L82,24 L96,86 L84,91 L77,50 L77,107 L23,107 L23,50 L16,91 L4,86 L18,24 L34,19 Z";

const GARMENTS: Record<GarmentKind, GarmentSpec> = {
  shell: {
    fills: [JACKET_BODY, "M34,19 C30,1 70,1 66,19 C60,10 40,10 34,19 Z"],
    seams: [
      "M50,14 L50,107",
      "M23,100 L77,100",
      "M29,66 L43,64 L43,84 L29,84 Z",
      "M71,66 L57,64 L57,84 L71,84 Z",
      "M8,80 L18,84",
      "M92,80 L82,84",
      "M34,19 C42,26 58,26 66,19",
    ],
  },
  jacket: {
    fills: [JACKET_BODY, "M36,13 L64,13 L62,7 L38,7 Z"],
    seams: [
      "M50,13 L50,107",
      "M28,36 L44,36 L44,50 L28,50 Z",
      "M72,36 L56,36 L56,50 L72,50 Z",
      "M27,70 L45,70 L45,94 L27,94 Z",
      "M73,70 L55,70 L55,94 L73,94 Z",
      "M23,60 L77,60",
      "M8,80 L18,84",
      "M92,80 L82,84",
    ],
  },
  vest: {
    fills: ["M38,12 L46,17 L54,17 L62,12 L76,21 C71,34 71,42 78,50 L78,106 L22,106 L22,50 C29,42 29,34 24,21 Z"],
    seams: [
      "M38,12 L50,38 L62,12",
      "M50,38 L50,106",
      "M27,62 L45,62 L45,84 L27,84 Z",
      "M73,62 L55,62 L55,84 L73,84 Z",
      "M22,98 L78,98",
    ],
  },
  trouser: {
    fills: ["M27,8 L73,8 L80,113 L55,113 L50,46 L45,113 L20,113 Z"],
    seams: [
      "M27,15 L73,15",
      "M50,15 L50,40",
      "M30,16 C32,26 37,30 43,31",
      "M70,16 C68,26 63,30 57,31",
      "M23.6,66 L47.6,66",
      "M76.4,66 L52.4,66",
      "M21,106 L45.4,106",
      "M79,106 L54.6,106",
    ],
  },
  tote: {
    fills: ["M20,46 L80,46 L86,110 L14,110 Z"],
    strokes: [
      { d: "M34,48 C34,12 66,12 66,48", width: 5.2 },
    ],
    seams: ["M19,56 L81,56", "M36,68 L64,68 L65,92 L35,92 Z", "M50,68 L50,92"],
  },
  liner: {
    fills: ["M38,14 C44,20 56,20 62,14 L82,24 L95,86 L84,91 L77,50 L77,106 L23,106 L23,50 L16,91 L5,86 L18,24 Z"],
    seams: ["M50,19 L50,106", "M38,14 C44,20 56,20 62,14", "M8,80 L18,84", "M92,80 L82,84"],
    quilt: true,
  },
  overshirt: {
    fills: [JACKET_BODY, "M38,13 L50,22 L62,13 L58,6 L42,6 Z"],
    seams: [
      "M50,22 L50,107",
      "M38,13 L50,22 L62,13",
      "M56,40 L70,40 L70,56 L56,56 Z",
      "M8,80 L18,84",
      "M92,80 L82,84",
      "M23,101 L77,101",
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

      // Fit the 100 x 120 drawing into the box with a margin.
      const scale = Math.min((w * 0.86) / 100, (h * 0.9) / 120);
      const gw = 100 * scale;
      const gh = 120 * scale;
      const ox = (w - gw) / 2;
      const oy = (h - gh) / 2;
      const cell = Math.max(3.6, Math.min(6.4, gh / 44));
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
      const seams = raster((c) => {
        c.strokeStyle = "#fff";
        c.lineWidth = 1.5;
        c.lineJoin = "round";
        for (const d of spec.seams) c.stroke(new Path2D(d));
        if (spec.quilt) {
          c.lineWidth = 1.1;
          for (let i = -120; i < 220; i += 13) {
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
          let tone = 0.95 - 0.66 * v - 0.26 * u + 0.18 * fold + 0.16 * (hash(c, r) - 0.5);
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
