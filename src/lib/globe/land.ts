/**
 * Coarse land mask of the Earth for the text-glyph globe.
 *
 * GENERATED FILE — do not edit by hand. Rebuild with
 *   GLOBE_GEN_DIR=<scratch> node scripts/globe/build-land.mjs
 * (see ./README.md).
 *
 * Grid: equirectangular, 240 x 120 cells, 1.5 degrees per cell.
 *   row 0    = latitude  +90 .. +88.5   (north to south)
 *   column 0 = longitude -180 .. -178.5 (west to east)
 * A cell is land when its CENTRE lies inside a land polygon, so islands
 * smaller than a cell can be missing altogether (Hawaii has no land cell).
 *
 * Source data: Natural Earth 1:110m physical vectors, "Land" (v4.1.0),
 * https://www.naturalearthdata.com/ — public domain: free to use, modify and
 * redistribute, no permission or credit required ("Made with Natural Earth"
 * is the suggested, optional credit). Taken from the npm package world-atlas
 * (land-110m.json, TopoJSON), which is ISC licensed,
 * Copyright 2013-2019 Michael Bostock.
 * Generated with world-atlas@2.0.2, topojson-client@3.1.0, d3-geo@3.1.2;
 * none of them is needed at runtime.
 *
 * 9527 of 28800 cells are land (33.1% of cells,
 * 28.9% of the sphere's area once cells are weighted by cos(latitude)).
 */

export const LAND_COLS = 240;
export const LAND_ROWS = 120;

/** Packed bits, row-major, most significant bit first; 1 = land. Base64 of 3600 bytes. */
export const LAND_MASK_BASE64 =
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wAAAAAA" +
  "AAAAAAAAAAAAAAAAAAAAAAAAAB//8////44AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPx/n////+AAAA/AAYAAAAfAAAAA" +
  "AAAAAAAAAAAEO3v4f////+AAAPgAAAAAAAAcAAAAAAAAAAAAAADAAAfgP////+AAAHAAAAAAAAAMAAAAAAAAAAAAAAA9" +
  "jjCAAP///+AAAAAAAAHgAAP/8AAPAAAAAAAAAAcAAAAAAD///8AAAAAAAAYAAD//gAAAAAAAAAAAAAe6zs/AAB///4AA" +
  "AAAAABgDA/////wGAAAAwAEAAAI/wM//AAf//4AAAAAAABwHf/////z/+AABAB//wPI/+sEP4A///wAAAAf8AACHf///" +
  "/////8B8wH/////ww3mB4Af/8AAAAD//xjf7v///////////7A////////+B/g//gAAAAH//4///f///////////GH//" +
  "//////0P5Af4AH4AAPx+H///////////////AAf///////Ng+AP4ADAAA/n////////////////+AD///////8COMAHw" +
  "AAAAD/P///////////////v8AD/7/////4APwABgAAAAH/P//////////////wfAAA+AH////4APzAAAAAAAD/D/////" +
  "////////JhgAAAFAAf///8AH/gAAAAAIAOD////////////4AHAAAAQAAP////wH/gAAAAAMBuP////////////wAPgA" +
  "ACAAAH////+f/8AAAAAWAhf////////////AAPAAAAAAAT////+f/+AAAAA3H//////////////+AOAAAAAAAB/////f" +
  "/8AAAAAHn//////////////+AIAAAAAAAB//////8wAAAAAMf//////////////9AAAAAAAAAA//////2HAAAAAF////" +
  "///////////4AAAAAAAAAAf/////+AgAAAAD///////////////4AAAAAAAAAAf//////wAAAAAB///yfx/////////w" +
  "AAAAAAAAAAf/////yAAAAAAB/z/gPj/////////jAAAAAAAAAAf/////gAAAAAA/wY/gDx////////8HAAAAAAAAAAf/" +
  "////AAAAAAA/gGfnn4////////wAAAAAAAAAAAf////+AAAAAAA/ACY//4///////1gGAAAAAAAAAAP////8AAAAAAA/" +
  "ACM//4///////hwEAAAAAAAAAAH////4AAAAAAAOLgA//////////4wcAAAAAAAAAAH////4AAAAAAAN/gDC////////" +
  "/wz8AAAAAAAAAAB////wAAAAAAAf/gAA/////////wDgAAAAAAAAAAA////AAAAAAAA//8YB/////////4EAAAAAAAAA" +
  "AAAX///AAAAAAAA///f//////////4AAAAAAAAAAAAAX/5BAAAAAAAB//////z///////4AAAAAAAAAAAAAb/gBAAAAA" +
  "AAH////8/5///////4AAAAAAAAAAAAAF/gBoAAAAAAP////+/4f//////wAAAAAAAAAAAAAE/gAAAAAAAAP////+f8wH" +
  "/////gAAAAAAAAAAAAAAfgAAAAAAAAf/////P/4D/////IAAAAAAAAAAAAAAPgAQAAAAAAf/////v/8D/+f/4AAAAAAA" +
  "AAAAAAAAPgwOAAAAAAf/////n/4Af8P+AAAAAAAAAAAAAAAAHxwAwAAAAAf/////n/wAfwH+wAAAAAAAAAAAAAAAB/gA" +
  "AAAAAAf/////z/gAfgH+AMAAAAAAAAAAAAAAAT8AAAAAAAf/////z+AAfAF/AIAAAAAAAAAAAAAAAB+AAAAAAAf/////" +
  "94AAOAB/gIAAAAAAAAAAAAAAAAMAAAAAAAf//////AAAOAA/gCAAAAAAAAAAAAAAAAEBQAAAAAP/////+MAAGAAHAFAA" +
  "AAAAAAAAAAAAAACDfgAAAAH//////8AAGAACAAAAAAAAAAAAAAAAAABP/wAAAAH//////4AABABgADAAAAAAAAAAAAAA" +
  "AAAP/4AAAAD//////4AABAAQABAAAAAAAAAAAAAAAAAP//gAAAA/H////wAAAACYBgAAAAAAAAAAAAAAAAAH//wAAAAA" +
  "A////wAAAADYDAAAAAAAAAAAAAAAAAAP//wAAAAAA////gAAAABoPgAAAAAAAAAAAAAAAAAf//4AAAAAA///+AAAAAA4" +
  "fuQAAAAAAAAAAAAAAAA///+AAAAAA///8AAAAAAYfASAAAAAAAAAAAAAAAA////AAAAAA///4AAAAAAcfYBYAAAAAAAA" +
  "AAAAAAA////8AAAAAf//4AAAAAAOCEh/AAAAAAAAAAAAAAA/////AAAAAP//wAAAAAAGAAAPgAAAAAAAAAAAAAA/////" +
  "gAAAAP//wAAAAAADIABPwIAAAAAAAAAAAAAf////gAAAAH//wAAAAAAAOAAPYCAAAAAAAAAAAAAP////AAAAAH//4AAA" +
  "AAAAACAAMAAAAAAAAAAAAAAP///+AAAAAH//4AAAAAAAAAAAAAAAAAAAAAAAAAAH///+AAAAAH//4AAAAAAAAAHhAAAA" +
  "AAAAAAAAAAAH///8AAAAAP//4IAAAAAAAAvjAAAAAAAAAAAAAAAD///8AAAAAP//4cAAAAAAAB/jgAAAAAAAAAAAAAAA" +
  "///8AAAAAP//h4AAAAAAAD/7gAAAAAAAAAAAAAAAf//8AAAAAP//B4AAAAAAAH//wAAAAAAAAAAAAAAAf//4AAAAAH/+" +
  "AwAAAAAAAf//4AQAAAAAAAAAAAAAf//4AAAAAH//BwAAAAAAB///8AIAAAAAAAAAAAAAf//gAAAAAD//BwAAAAAAD///" +
  "+AAAAAAAAAAAAAAAf/8AAAAAAD/+BgAAAAAAD////AAAAAAAAAAAAAAAf/8AAAAAAD/8AAAAAAAAD////AAAAAAAAAAA" +
  "AAAAf/8AAAAAAD/8AAAAAAAAD////AAAAAAAAAAAAAAA//4AAAAAAB/4AAAAAAAAB////AAAAAAAAAAAAAAA//wAAAAA" +
  "AA/wAAAAAAAAB////AAAAAAAAAAAAAAA//gAAAAAAA/gAAAAAAAAB/h//AAAAAAAAAAAAAAA//AAAAAAAA+AAAAAAAAA" +
  "B+Av+AAAAAAAAAAAAAAA/8AAAAAAAAAAAAAAAAAAAAAP8AAQAAAAAAAAAAAB/8AAAAAAAAAAAAAAAAAAAAAH8AAIAAAA" +
  "AAAAAAAB/4AAAAAAAAAAAAAAAAAAAAADQAAOAAAAAAAAAAAB/gAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAB+AAA" +
  "AAAAAAAAAAAAAAAAAAAAYAAIAAAAAAAAAAAB+AAAAAAAAAAAAAAAAAAAAAAAYAAwAAAAAAAAAAAD8AAAAAAAAAAAAAAA" +
  "AAAAAAAAAADAAAAAAAAAAAAD4AAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAA" +
  "AAAAAAAAAAAD4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD" +
  "wYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AAAAAAAAAAA" +
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAA" +
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAAAAAAAAAAAADwAACAefH/gAAAAAAAAAAAAAAAAEAAAAAAAAAAAB//8B///" +
  "////4AAAAAAAAAAAAAAA/AAAAAAAAAAH///8P////////8AAAAAAAAAAAAAB3gAAAAATf//////8//////////+AAAAA" +
  "AAAAAAgAHgAAAAH////////////////////AAAAAAAB4B////gAAAAP///////////////////4AAAAD////////4AAA" +
  "AD////////////////////gAAALP///////8AAAAD/////////////////////gAABj////////wAAHg////////////" +
  "//////////4AAAAD///////8AQ/AB////////////////////+AAAAB//////////AGP//////////////////////AA" +
  "AAA///////////////////////////////////8A/8AAf///////////////////////////////////////////////" +
  "////////////////////////////////////////////////////////////////////////////////////////////" +
  "////////////////";

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
    throw new Error(`land mask: expected ${expected} bytes, got ${bytes.length}`);
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
