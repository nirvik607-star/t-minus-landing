import React from "react";

const ASCII_RAMP = " .:-^tT";

const VIEW_SIZE = 360;
const CELL_W = 7.5;
const CELL_H = 10.5;
const COLS = 48; // 48 * 7.5 = 360
const ROWS = 34; // 34 * 10.5 = 357
const ORIGIN_Y = (VIEW_SIZE - ROWS * CELL_H) * 0.5;
const R_NORM = 0.7; // Matches R = 0.96 disc + corona inside 34dvh/42dvh bounding box

interface SeedCell {
  x: string;
  glyph: string;
  fill: "#FFF8E8" | "#EBC998" | "#8F5737" | "#F0C790";
}

interface SeedRow {
  y: string;
  cells: SeedCell[];
}

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function buildDeterministicAsciiStarRows(): SeedRow[] {
  const rows: SeedRow[] = [];
  const half = VIEW_SIZE * 0.5;

  for (let row = 0; row < ROWS; row++) {
    const py = ORIGIN_Y + (row + 0.5) * CELL_H;
    const ny = (py - half) / half;
    const cells: SeedCell[] = [];

    for (let col = 0; col < COLS; col++) {
      const px = (col + 0.5) * CELL_W;
      const nx = (px - half) / half;
      const rNorm = Math.hypot(nx, ny);
      const b = rNorm / R_NORM;

      let energy = 0;
      let fill: SeedCell["fill"] = "#8F5737";

      if (b < 1.0) {
        const sx = nx / R_NORM;
        const sy = -ny / R_NORM;
        const sz = Math.sqrt(Math.max(0, 1 - b * b));

        // Matches FS_SCENE starTurbulence(N, 0.0, 0.0) deterministically
        const a = Math.sin(sx * 5.0) * Math.cos(sy * 5.4) * Math.sin(sz * 5.2);
        const tb = Math.sin((sx + sz) * 8.4) * Math.cos((sy - sx) * 9.0);
        const c =
          Math.cos((sy + sz) * 14.0) * Math.sin((sx - sy * 0.7) * 12.6);
        const gran = 0.5 + 0.32 * a + 0.18 * tb + 0.1 * c;

        const hotCells = smoothstep(0.42, 0.86, gran);
        const darkLanes = smoothstep(0.64, 0.24, gran);

        const ndotv = clamp01(sz);
        const limbDark = Math.pow(ndotv, 0.92);
        const rimFlare = Math.pow(1 - ndotv, 3.0) * 0.4;

        const midMix = clamp01(limbDark * 0.78 + hotCells * 0.42);
        const coreMix = smoothstep(0.56, 0.94, limbDark * 0.54 + hotCells * 0.56);

        let lum = 0.28 + midMix * 0.44 + coreMix * 0.34;
        lum *= 1.0 - darkLanes * 0.66;
        lum += rimFlare * 0.34;

        energy = clamp01(Math.pow(clamp01(lum * 1.1), 0.92));

        if (darkLanes > 0.54 && energy < 0.56) {
          fill = "#8F5737";
        } else if (energy >= 0.76) {
          fill = "#FFF8E8";
        } else if (energy >= 0.48) {
          fill = "#EBC998";
        } else if (ndotv < 0.38 && rimFlare > 0.11) {
          fill = "#F0C790";
        } else {
          fill = "#8F5737";
        }
      } else if (b < 1.38) {
        const ang = Math.atan2(-ny, nx);
        const distOut = (b - 1.0) * 0.96;
        const normOut = distOut / (0.96 * 0.42);

        const streamA = 0.5 + 0.5 * Math.cos(ang * 6.0 + distOut * 2.0);
        const streamB = 0.5 + 0.5 * Math.cos(ang * 11.0 - distOut * 2.6);
        const streamers = Math.pow(Math.max(streamA, streamB * 0.85), 2.7);

        const innerCorona = Math.exp(-normOut * 4.2) * (0.46 + 0.54 * streamers);
        const outerHalo = Math.exp(-normOut * 1.95) * (0.1 + 0.16 * streamers);
        const outerCut = 1.0 - smoothstep(1.25, 2.2, normOut);
        const coronaLum = (innerCorona * 0.78 + outerHalo * 0.52) * outerCut;

        energy = clamp01(Math.pow(clamp01(coronaLum * 1.15), 0.92));
        fill = energy >= 0.24 ? "#F0C790" : "#8F5737";
      }

      // Noise gate matching FS_GLYPH_COMP so outer edge is crisp
      if (energy < 0.085) continue;

      const idx = Math.min(
        ASCII_RAMP.length - 1,
        Math.max(1, Math.floor(energy * ASCII_RAMP.length))
      );
      const glyph = ASCII_RAMP[idx];
      if (!glyph || glyph === " ") continue;

      cells.push({
        x: px.toFixed(2),
        glyph,
        fill,
      });
    }

    if (cells.length > 0) {
      rows.push({
        y: py.toFixed(2),
        cells,
      });
    }
  }

  return rows;
}

const SEED_ROWS: readonly SeedRow[] = buildDeterministicAsciiStarRows();

/**
 * Crisp deterministic SSR ASCII glyph star (strict ` .:-^tT` ramp in
 * `#FFF8E8 / #EBC998 / #8F5737 / #F0C790` with convective dark-lane contrast).
 * Renders at 0ms cold load before WebGL2 compiles — zero smooth radial-gradient blur.
 */
export function AsciiStarSsrSeed() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
      data-star-ssr-ascii="true"
      aria-hidden="true"
      className="h-[34dvh] w-[34dvh] select-none sm:h-[42dvh] sm:w-[42dvh]"
      style={{
        fontFamily:
          'var(--font-ibm-plex-mono), "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
      }}
    >
      <g
        fontSize="10.0"
        fontWeight="600"
        textAnchor="middle"
        dominantBaseline="central"
        textRendering="geometricPrecision"
      >
        {SEED_ROWS.map((row) => (
          <text key={row.y} y={row.y}>
            {row.cells.map((cell) => (
              <tspan key={cell.x} x={cell.x} fill={cell.fill}>
                {cell.glyph}
              </tspan>
            ))}
          </text>
        ))}
      </g>
    </svg>
  );
}
