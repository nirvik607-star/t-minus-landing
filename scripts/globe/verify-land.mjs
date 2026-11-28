// Checks src/lib/globe/land.ts. Needs Node >= 22.18 (imports the .ts file directly).
//
//   node scripts/globe/verify-land.mjs
//
// With GLOBE_GEN_DIR set it also re-tests 2000 random cells against the source polygons.
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

const landUrl = new URL("../../src/lib/globe/land.ts", import.meta.url).href;
const { isLand, isLandCell, LAND_COLS, LAND_ROWS, LAND_MASK_BASE64 } = await import(landUrl);

let failures = 0;
const check = (name, ok, detail = "") => {
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);
};

console.log(`grid ${LAND_COLS} x ${LAND_ROWS}, base64 length ${LAND_MASK_BASE64.length}\n`);

const expectLand = [
  ["Denver", 39.7, -105],
  ["Paris", 48.9, 2.3],
  ["Nairobi", -1.3, 36.8],
  ["Sydney", -33.9, 151.2],
  ["São Paulo", -23.5, -46.6],
];
const expectSea = [
  ["mid-Atlantic", 30, -40],
  ["mid-Pacific", 0, -150],
  ["Gulf of Mexico", 25, -90],
  ["Indian Ocean", -30, 80],
];
for (const [name, lat, lon] of expectLand) check(`land: ${name} (${lat}, ${lon})`, isLand(lat, lon) === true);
for (const [name, lat, lon] of expectSea) check(`sea:  ${name} (${lat}, ${lon})`, isLand(lat, lon) === false);

// Wrapping, clamping and bad input.
check("longitude wraps (+360, -360, +720)", isLand(48.9, 362.3) && isLand(48.9, -357.7) && isLand(39.7, 615));
check("lon 180 equals lon -180", isLand(66, 180) === isLand(66, -180));
check("latitude clamps (95 -> row 0, -95 -> last row)", isLand(95, 0) === isLandCell(0, 120) && isLand(-95, 0) === isLandCell(LAND_ROWS - 1, 120));
check("south pole row is land (Antarctica), north pole row is sea", isLand(-90, 0) === true && isLand(90, 0) === false);
check("NaN / Infinity -> false", isLand(NaN, 0) === false && isLand(0, Infinity) === false);
check("isLandCell wraps columns", isLandCell(34, 51) === isLandCell(34, 51 + LAND_COLS) && isLandCell(34, 51) === isLandCell(34, 51 - LAND_COLS));

// The Buffer fallback must decode to the same mask as atob.
{
  const reference = [];
  for (let r = 0; r < LAND_ROWS; r++) for (let c = 0; c < LAND_COLS; c++) reference.push(isLandCell(r, c));
  const savedAtob = globalThis.atob;
  globalThis.atob = undefined;
  const fresh = await import(`${landUrl}?no-atob`);
  let same = true;
  for (let r = 0; r < LAND_ROWS && same; r++)
    for (let c = 0; c < LAND_COLS; c++)
      if (fresh.isLandCell(r, c) !== reference[r * LAND_COLS + c]) {
        same = false;
        break;
      }
  globalThis.atob = savedAtob;
  check("Buffer fallback (no atob) decodes the same mask", same);
}

// Land fraction.
let cells = 0;
let area = 0;
let total = 0;
for (let r = 0; r < LAND_ROWS; r++) {
  const w = Math.cos(((90 - (r + 0.5) * (180 / LAND_ROWS)) * Math.PI) / 180);
  for (let c = 0; c < LAND_COLS; c++) {
    total += w;
    if (isLandCell(r, c)) {
      cells++;
      area += w;
    }
  }
}
const cellPct = (100 * cells) / (LAND_COLS * LAND_ROWS);
const areaPct = (100 * area) / total;
console.log(`\nland cells: ${cells} / ${LAND_COLS * LAND_ROWS} = ${cellPct.toFixed(2)}% of cells`);
console.log(`land fraction of the sphere (cos-latitude weighted): ${areaPct.toFixed(2)}%  (real Earth: about 29%)`);
check("area-weighted land fraction is between 27% and 31%", areaPct > 27 && areaPct < 31);

// Optional: compare random cells with the source polygons.
if (process.env.GLOBE_GEN_DIR) {
  const req = createRequire(path.join(path.resolve(process.env.GLOBE_GEN_DIR), "package.json"));
  const imp = (name) => import(pathToFileURL(req.resolve(name)).href);
  const topology = req("world-atlas/land-110m.json");
  const { feature } = await imp("topojson-client");
  const { geoContains } = await imp("d3-geo");
  const land = feature(topology, topology.objects.land);
  let seed = 12345;
  const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  let mismatches = 0;
  const n = 2000;
  for (let i = 0; i < n; i++) {
    const r = Math.floor(rand() * LAND_ROWS);
    const c = Math.floor(rand() * LAND_COLS);
    const lat = 90 - (r + 0.5) * (180 / LAND_ROWS);
    const lon = -180 + (c + 0.5) * (360 / LAND_COLS);
    if (geoContains(land, [lon, lat]) !== isLand(lat, lon)) mismatches++;
  }
  check(`${n} random cell centres agree with world-atlas land-110m via geoContains`, mismatches === 0, `${mismatches} mismatches`);
}

// ASCII art at 120 x 60: one character per 2 x 2 block, "#" when at least 2 of the 4 cells are land.
console.log("\nmask at 120 x 60 (# = land):\n");
for (let r = 0; r < LAND_ROWS; r += 2) {
  let line = "";
  for (let c = 0; c < LAND_COLS; c += 2) {
    const n = isLandCell(r, c) + isLandCell(r, c + 1) + isLandCell(r + 1, c) + isLandCell(r + 1, c + 1);
    line += n >= 2 ? "#" : " ";
  }
  console.log(line.replace(/\s+$/, ""));
}

console.log(`\n${failures === 0 ? "ALL LAND CHECKS PASSED" : `${failures} LAND CHECK(S) FAILED`}`);
process.exit(failures === 0 ? 0 : 1);
