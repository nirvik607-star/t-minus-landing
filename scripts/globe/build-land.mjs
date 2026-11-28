// Generates src/lib/globe/land.ts — a 240x120 equirectangular land mask.
//
//   GLOBE_GEN_DIR=<scratch> node scripts/globe/build-land.mjs
//
// Source: Natural Earth 1:110m land polygons as redistributed by the npm
// package "world-atlas" (land-110m.json, TopoJSON). Each cell CENTRE is tested
// with d3-geo's spherical point-in-polygon (geoContains), which handles
// holes, the antimeridian and the polar cap of Antarctica.
import fs from "node:fs";
import path from "node:path";
import { genImport, genRequire, genVersion, repoRoot } from "./_deps.mjs";

const COLS = 240;
const ROWS = 120;
const STEP = 360 / COLS; // 1.5 degrees

const topology = genRequire("world-atlas/land-110m.json");
const { feature } = await genImport("topojson-client");
const { geoContains } = await genImport("d3-geo");

const land = feature(topology, topology.objects.land);

const bytes = new Uint8Array((COLS * ROWS) / 8);
let landCells = 0;
let landArea = 0;
let totalArea = 0;
for (let row = 0; row < ROWS; row++) {
  const lat = 90 - (row + 0.5) * STEP;
  const weight = Math.cos((lat * Math.PI) / 180);
  for (let col = 0; col < COLS; col++) {
    const lon = -180 + (col + 0.5) * STEP;
    totalArea += weight;
    if (geoContains(land, [lon, lat])) {
      const i = row * COLS + col;
      bytes[i >> 3] |= 0x80 >> (i & 7);
      landCells++;
      landArea += weight;
    }
  }
}

const base64 = Buffer.from(bytes).toString("base64");
const chunks = base64.match(/.{1,92}/g).map((line) => `  "${line}"`);

const versions = ["world-atlas", "topojson-client", "d3-geo"]
  .map((name) => `${name}@${genVersion(name)}`)
  .join(", ");

const out = `/**
 * Coarse land mask of the Earth for the text-glyph globe.
 *
 * GENERATED FILE — do not edit by hand. Rebuild with
 *   GLOBE_GEN_DIR=<scratch> node scripts/globe/build-land.mjs
 * (see ./README.md).
 *
 * Grid: equirectangular, ${COLS} x ${ROWS} cells, ${STEP} degrees per cell.
 *   row 0    = latitude  +90 .. +${90 - STEP}   (north to south)
 *   column 0 = longitude -180 .. -${180 - STEP} (west to east)
 * A cell is land when its CENTRE lies inside a land polygon, so islands
 * smaller than a cell can be missing altogether (Hawaii has no land cell).
 *
 * Source data: Natural Earth 1:110m physical vectors, "Land" (v4.1.0),
 * https://www.naturalearthdata.com/ — public domain: free to use, modify and
 * redistribute, no permission or credit required ("Made with Natural Earth"
 * is the suggested, optional credit). Taken from the npm package world-atlas
 * (land-110m.json, TopoJSON), which is ISC licensed,
 * Copyright 2013-2019 Michael Bostock.
 * Generated with ${versions};
 * none of them is needed at runtime.
 *
 * ${landCells} of ${COLS * ROWS} cells are land (${((100 * landCells) / (COLS * ROWS)).toFixed(1)}% of cells,
 * ${((100 * landArea) / totalArea).toFixed(1)}% of the sphere's area once cells are weighted by cos(latitude)).
 */

export const LAND_COLS = ${COLS};
export const LAND_ROWS = ${ROWS};

/** Packed bits, row-major, most significant bit first; 1 = land. Base64 of ${bytes.length} bytes. */
export const LAND_MASK_BASE64 =
${chunks.join(" +\n")};

let landBits: Uint8Array | null = null;

function decodeLandMask(): Uint8Array {
  const expected = (LAND_COLS * LAND_ROWS) / 8;
  let bytes: Uint8Array;
  if (typeof atob === "function") {
    const binary = atob(LAND_MASK_BASE64);
    bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  } else {
    // Old Node without a global atob. Looked up through globalThis so that
    // bundlers do not inject a Buffer polyfill into the browser bundle.
    const NodeBuffer = (
      globalThis as {
        Buffer?: { from(data: string, encoding: "base64"): Uint8Array };
      }
    ).Buffer;
    if (!NodeBuffer) throw new Error("land mask: no base64 decoder available");
    bytes = Uint8Array.from(NodeBuffer.from(LAND_MASK_BASE64, "base64"));
  }
  if (bytes.length !== expected) {
    throw new Error(\`land mask: expected \${expected} bytes, got \${bytes.length}\`);
  }
  return bytes;
}

/** Land test for one grid cell. Columns wrap around; rows outside the grid are not land. */
export function isLandCell(row: number, col: number): boolean {
  if (!Number.isFinite(row) || !Number.isFinite(col)) return false;
  const r = Math.floor(row);
  if (r < 0 || r >= LAND_ROWS) return false;
  const c = ((Math.floor(col) % LAND_COLS) + LAND_COLS) % LAND_COLS;
  if (landBits === null) landBits = decodeLandMask();
  const i = r * LAND_COLS + c;
  return (landBits[i >> 3] & (0x80 >> (i & 7))) !== 0;
}

/**
 * True when the grid cell containing (lat, lon) is land.
 * Latitude is clamped to [-90, 90]; longitude wraps (any multiple of 360 is fine).
 */
export function isLand(lat: number, lon: number): boolean {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return false;
  const row = Math.min(LAND_ROWS - 1, Math.max(0, Math.floor(((90 - lat) / 180) * LAND_ROWS)));
  const col = Math.floor(((lon + 180) / 360) * LAND_COLS);
  return isLandCell(row, col);
}
`;

const target = path.join(repoRoot, "src", "lib", "globe", "land.ts");
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, out);
console.log(
  `wrote ${path.relative(repoRoot, target)}: ${landCells}/${COLS * ROWS} land cells ` +
    `(${((100 * landCells) / (COLS * ROWS)).toFixed(2)}% of cells, ` +
    `${((100 * landArea) / totalArea).toFixed(2)}% area-weighted), ${base64.length} base64 chars`,
);
