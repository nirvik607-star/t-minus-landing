// Generates src/lib/globe/area-codes.ts — NANP area code -> coarse public region.
//
//   GLOBE_GEN_DIR=<scratch> node scripts/globe/build-area-codes.mjs [--report]
//
// Per area code:
//   1. The code list, the state(s) served and the cities served come from
//      Google libphonenumber's geocoding table for +1 (prefix -> "City, ST"),
//      plus NANPA in-service geographic codes that table does not have yet.
//   2. Cities are joined to GeoNames (name + state) for population and coordinates.
//   3. "Main city" of a code with enough prefix-level data = the served city
//      with the highest sqrt(prefixes x population), ignoring stray prefixes.
//   4. Codes with little or no prefix-level data (mostly overlays) inherit the
//      region of the code they overlay. That code is found from the overlay's
//      own few prefixes, else from the city hint in areacode-to-zipcode, else
//      from libphonenumber's own "City, ST" label for the code.
import fs from "node:fs";
import path from "node:path";
import { repoRoot } from "./_deps.mjs";
import { countryOf, distanceKm, loadCities, loadCityHints, loadGeocoding, loadNanpa, sourceVersions } from "./area-code-sources.mjs";

const RICH_MIN_PREFIXES = 20; // enough prefix-level entries to pick a main city on their own

// The ONLY hand-entered facts in the table: overlay code -> the code it overlays,
// for three codes the npm datasets cannot place. libphonenumber gives just the
// state for each; areacode-to-zipcode has no record for 353 and 572, and files
// 840 (and 909 itself) under Anaheim, which libphonenumber's 909 prefixes contradict.
// Label and coordinates are still derived from the overlaid code's data.
// Delete an entry to drop that code from the table (840 would then follow the hint).
const MANUAL_OVERLAY_OF = {
  353: "608", // Wisconsin: overlay of 608 (Madison)
  572: "405", // Oklahoma: overlay of 405 (Oklahoma City)
  840: "909", // California: overlay of 909 (San Bernardino County)
};

const wantReport = process.argv.includes("--report");

const geocoding = loadGeocoding();
const cities = loadCities();
const hintFor = loadCityHints();
const nanpa = await loadNanpa();

// ---------------------------------------------------------------- 1. select codes
const included = [];
const excludedForeign = [];
for (const rec of geocoding.values()) {
  if (rec.known > 0 && rec.known >= rec.foreign && rec.states.length > 0) included.push(rec);
  else excludedForeign.push(rec.code);
}
// NANPA in-service geographic codes that libphonenumber's table lacks: keep those
// the hint dataset places in a US state / Canadian province.
const addedFromNanpa = [];
for (const code of nanpa.geo) {
  if (geocoding.has(code)) continue;
  const h = hintFor(code);
  if (!h || !countryOf(h.state)) continue;
  included.push({ code, label: null, labelCity: null, states: [h.state], cities: new Map(), cityTotal: 0, nanpaOnly: true });
  addedFromNanpa.push(code);
}
included.sort((a, b) => a.code.localeCompare(b.code));
excludedForeign.sort();
const byCode = new Map(included.map((r) => [r.code, r]));

// ---------------------------------------------------------------- 2. join to GeoNames
let prefixTotal = 0;
let prefixMatched = 0;
for (const rec of included) {
  rec.matched = new Map(); // GeoNames id -> { geo, name, count }
  rec.hint = hintFor(rec.code);
  if (rec.hint && !rec.states.includes(rec.hint.state)) rec.hint = null; // hint disagrees on the state
  for (const city of rec.cities.values()) {
    prefixTotal += city.count;
    const geo = cities.find(city.name, city.state);
    if (!geo) continue;
    prefixMatched += city.count;
    const m = rec.matched.get(geo.id) || { geo, name: city.name, top: 0, count: 0 };
    m.count += city.count;
    if (city.count > m.top) {
      m.top = city.count;
      m.name = city.name; // most common libphonenumber spelling
    }
    rec.matched.set(geo.id, m);
  }
}
const score = (m) => Math.sqrt(m.count * Math.max(m.geo.population, 1000));
function mainCity(rec) {
  const inState = [...rec.matched.values()].filter((m) => rec.states.includes(m.geo.state));
  // Ignore stray prefixes (one exchange of a big neighbouring city) unless nothing else is left.
  const solid = inState.filter((m) => m.count >= 2 && m.count >= rec.cityTotal * 0.03);
  const pool = solid.length ? solid : inState;
  return pool.sort((a, b) => score(b) - score(a) || a.geo.id - b.geo.id)[0] || null;
}

// ---------------------------------------------------------------- 3. resolve regions
const sharesState = (a, b) => a.states.some((s) => b.states.includes(s));
const regions = new Map(); // code -> { name, geo, how }
const inherit = (rec, parent, why) => regions.set(rec.code, { ...regions.get(parent.code), how: `shares region of ${parent.code} (${why})` });

// Pass 1: codes with plenty of prefix-level data stand on their own.
const rich = included.filter((r) => r.cityTotal >= RICH_MIN_PREFIXES && mainCity(r));
for (const rec of rich) {
  const m = mainCity(rec);
  regions.set(rec.code, { name: m.name, geo: m.geo, how: "own prefixes" });
}

// Pass 2: a few prefixes of their own — attach to the rich code that best covers them.
const small = included.filter((r) => !regions.has(r.code) && r.matched.size > 0);
for (const rec of small) {
  let best = null;
  for (const p of rich) {
    if (!sharesState(p, rec)) continue;
    let weight = 0;
    let contained = 0;
    for (const m of rec.matched.values()) {
      const pm = p.matched.get(m.geo.id);
      if (!pm) continue;
      contained += m.count;
      weight += m.count * (pm.count / p.cityTotal);
    }
    if (contained / rec.cityTotal >= 0.5 && (!best || weight > best.weight)) best = { p, weight };
  }
  const m = mainCity(rec);
  if (best) inherit(rec, best.p, "own prefixes overlap");
  else if (m) regions.set(rec.code, { name: m.name, geo: m.geo, how: `own prefixes (only ${rec.cityTotal})` });
}

// Pass 3: no prefix-level data — find the overlaid code from a city hint.
const withPrefixes = included.filter((r) => regions.has(r.code));
/** The code (same state) in whose prefixes this city is most prominent. */
function codeServing(geo, rec) {
  let best = null;
  for (const p of withPrefixes) {
    if (!sharesState(p, rec)) continue;
    const m = p.matched.get(geo.id);
    if (!m) continue;
    const share = m.count / p.cityTotal;
    if (!best || share > best.share) best = { p, share };
  }
  return best ? best.p : null;
}
/** The code (same state) whose prefix cities cluster around this point. */
function codeAround(geo, rec) {
  let best = null;
  for (const p of withPrefixes) {
    if (!sharesState(p, rec)) continue;
    let weight = 0;
    for (const m of p.matched.values()) weight += m.count * Math.exp(-distanceKm(geo.lat, geo.lon, m.geo.lat, m.geo.lon) / 25);
    if (weight > 1 && (!best || weight > best.weight)) best = { p, weight };
  }
  return best ? best.p : null;
}

const unresolved = [];
for (const rec of included) {
  if (regions.has(rec.code)) continue;

  const manual = MANUAL_OVERLAY_OF[rec.code];
  if (manual) {
    const p = byCode.get(manual);
    if (!p || !regions.has(manual) || !sharesState(p, rec)) throw new Error(`MANUAL_OVERLAY_OF ${rec.code} -> ${manual} is not usable`);
    inherit(rec, p, "hand-entered overlay link");
    continue;
  }

  const hintGeo = rec.hint ? cities.find(rec.hint.name, rec.hint.state) : null;
  const labelGeo = rec.labelCity ? cities.find(rec.labelCity.name, rec.labelCity.state) : null;

  // (a) Another code with prefix data carries the very same hint city: same overlay complex.
  //     If several do, prefer the one whose prefixes actually contain that city.
  if (rec.hint) {
    const twins = withPrefixes.filter((p) => p.hint && p.hint.key === rec.hint.key && sharesState(p, rec));
    if (twins.length) {
      const share = (p) => (hintGeo && p.matched.get(hintGeo.id) ? p.matched.get(hintGeo.id).count / p.cityTotal : 0);
      twins.sort((a, b) => share(b) - share(a) || b.cityTotal - a.cityTotal || a.code.localeCompare(b.code));
      inherit(rec, twins[0], `same hint city: ${rec.hint.name}, ${rec.hint.state}`);
      continue;
    }
  }
  // (b) The hint city, then libphonenumber's label city, appears in some code's prefixes.
  let parent = hintGeo && codeServing(hintGeo, rec);
  if (parent) {
    inherit(rec, parent, `hint city ${rec.hint.name}, ${rec.hint.state} is served by it`);
    continue;
  }
  parent = labelGeo && codeServing(labelGeo, rec);
  if (parent) {
    inherit(rec, parent, `label city ${rec.labelCity.name}, ${rec.labelCity.state} is served by it`);
    continue;
  }
  // (c) libphonenumber names a city for the whole code and no other code serves it.
  if (labelGeo) {
    regions.set(rec.code, { name: rec.labelCity.name, geo: labelGeo, how: "libphonenumber city label" });
    continue;
  }
  // (d) The hint city lies among the prefix cities of some code.
  parent = hintGeo && codeAround(hintGeo, rec);
  if (parent) {
    inherit(rec, parent, `hint city ${rec.hint.name}, ${rec.hint.state} lies within it`);
    continue;
  }
  unresolved.push(rec.code);
}

// ---------------------------------------------------------------- 4. emit
const rows = included
  .filter((r) => regions.get(r.code))
  .map((r) => {
    const reg = regions.get(r.code);
    return {
      code: r.code,
      label: `${reg.name}, ${reg.geo.state}`,
      lat: Math.round(reg.geo.lat * 100) / 100,
      lon: Math.round(reg.geo.lon * 100) / 100,
      how: reg.how,
      states: r.states,
      stateOk: r.states.includes(reg.geo.state),
    };
  });

const us = rows.filter((r) => countryOf(r.label.slice(-2)) === "US").length;
const ca = rows.length - us;
const notInNanpa = rows.filter((r) => !nanpa.geo.has(r.code)).map((r) => r.code);
const nanpaNonGeoHit = rows.filter((r) => nanpa.nonGeo.has(r.code)).map((r) => r.code);
const regionsCount = new Set(rows.map((r) => r.label)).size;

const wrap = (text, width, indent) => {
  const lines = [];
  let line = "";
  for (const word of text.split(" ")) {
    if (line && (line + " " + word).length > width) {
      lines.push(line);
      line = word;
    } else line = line ? `${line} ${word}` : word;
  }
  if (line) lines.push(line);
  return lines.join(`\n${indent}`);
};

const out = `/**
 * North American Numbering Plan area codes -> coarse public region, for the
 * waitlist globe ("roughly where signups come from").
 *
 * GENERATED FILE — do not edit by hand. Rebuild with
 *   GLOBE_GEN_DIR=<scratch> node scripts/globe/build-area-codes.mjs
 * (see ./README.md). ${rows.length} geographic area codes: ${us} in the United States
 * (50 states + DC) and ${ca} in Canada, in ${regionsCount} distinct regions.
 *
 * Each entry is the main city served by the area code plus its state/province,
 * with that city's coordinates (2 decimals). It is a coarse label for the whole
 * code, not a location for any one number: area codes cover large areas, and
 * mobile numbers are routinely kept after a move. Overlay codes inherit the
 * label and coordinates of the code they overlay. Codes that span several
 * provinces carry their main city's: 902/782 (NS + PE) -> Halifax, NS and
 * 867 (YT + NT + NU) -> Whitehorse, YT.
 *
 * Sources, generated with ${wrap(sourceVersions().join(", "), 60, " * ")}:
 *  - Area code list, state and cities served: Google libphonenumber's geocoding
 *    table for country code 1 (Apache License 2.0, (c) Google and contributors),
 *    as redistributed in the npm package libphonenumber-geo-carrier (MIT).
 *  - City coordinates and populations: GeoNames (https://www.geonames.org/),
 *    licensed CC BY 4.0, from the npm package all-the-cities (MIT).
 *    Attribution: contains data from GeoNames.
 *  - City hints used only to find which code an overlay belongs to:
 *    npm package areacode-to-zipcode (ISC).
 *  - NANPA's list of in-service geographic codes, snapshot ${nanpa.snapshot.slice(0, 10)}, from
 *    the npm package area-codes-nanp (MIT): cross-check, and the source of
 *    ${addedFromNanpa.length} codes libphonenumber's table lacks (${addedFromNanpa.join(", ") || "none"}).
 *    ${notInNanpa.length} codes here are newer than that snapshot and their in-service status
 *    was not verified (${notInNanpa.join(", ") || "none"}).
 *  - Hand-entered, because no dataset above places them: which code three
 *    overlays belong to (${Object.entries(MANUAL_OVERLAY_OF).map(([c, p]) => `${c} -> ${p}`).join(", ")}).
 *
 * Not included: toll-free (800, 833, 844, 855, 866, 877, 888), premium 900,
 * personal 5XX, 600/622/633, 700, 710 and every other non-geographic code;
 * US territories (Puerto Rico 787/939, US Virgin Islands 340, Guam 671,
 * Northern Marianas 670, American Samoa 684) and the Caribbean/Bermuda
 * members of the NANP. regionForAreaCode() returns null for all of them.
 */

export interface AreaRegion {
  label: string;
  lat: number;
  lon: number;
}

export const AREA_CODES: Record<string, AreaRegion> = {
${rows.map((r) => `  "${r.code}": { label: ${JSON.stringify(r.label)}, lat: ${r.lat}, lon: ${r.lon} },`).join("\n")}
};

/**
 * Region for a 3-digit area code such as "415".
 * Null when the code is not a US/Canada geographic area code in the table.
 */
export function regionForAreaCode(code: string): AreaRegion | null {
  if (typeof code !== "string" || !/^[2-9][0-9]{2}$/.test(code)) return null;
  return Object.prototype.hasOwnProperty.call(AREA_CODES, code) ? AREA_CODES[code] : null;
}

/**
 * Area code of an E.164 NANP number: "+14155550134" -> "415".
 * Null unless the input is exactly "+1" followed by 10 digits whose first digit is 2-9.
 * The code is not checked against AREA_CODES (toll-free "+18005550100" gives "800").
 */
export function areaCodeFromE164(phone: string): string | null {
  if (typeof phone !== "string") return null;
  const match = /^\\+1([2-9][0-9]{2})[0-9]{7}$/.exec(phone);
  return match ? match[1] : null;
}
`;

const target = path.join(repoRoot, "src", "lib", "globe", "area-codes.ts");
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, out);

// ---------------------------------------------------------------- 5. report
console.log(`wrote ${path.relative(repoRoot, target)}: ${rows.length} codes (${us} US, ${ca} Canada), ${regionsCount} distinct regions`);
console.log(`prefix-level city entries joined to GeoNames: ${prefixMatched}/${prefixTotal} (${((100 * prefixMatched) / prefixTotal).toFixed(1)}%)`);
console.log(`excluded (not a US state / Canadian province in the geocoding table): ${excludedForeign.join(", ") || "none"}`);
console.log(`added from NANPA's in-service list (absent from the geocoding table): ${addedFromNanpa.join(", ") || "none"}`);
console.log(`hand-entered overlay links: ${Object.entries(MANUAL_OVERLAY_OF).map(([c, p]) => `${c}->${p}`).join(", ")}`);
console.log(`unresolved (no city could be placed): ${unresolved.join(", ") || "none"}`);
console.log(`label state not among the code's states: ${rows.filter((r) => !r.stateOk).map((r) => r.code).join(", ") || "none"}`);
console.log(`in the table but not in NANPA's in-service geographic list of ${nanpa.snapshot.slice(0, 10)}: ${notInNanpa.join(", ") || "none"}`);
console.log(`in the table but listed non-geographic by NANPA: ${nanpaNonGeoHit.join(", ") || "none"}`);
const tableCodes = new Set(rows.map((r) => r.code));
const missing = [...nanpa.geo].filter((c) => !tableCodes.has(c));
console.log(
  `NANPA in-service geographic codes not in the table: ` +
    missing.map((c) => { const h = hintFor(c); return h ? `${c} (${h.name}, ${h.state}, ${h.country})` : c; }).join(", "),
);
const states = new Set(rows.map((r) => r.label.slice(-2)));
const allStates = new Set(included.flatMap((r) => r.states));
console.log(`states/provinces served: ${allStates.size}; with a label of their own: ${states.size}; served but never the label: ${[...allStates].filter((s) => !states.has(s)).join(", ") || "none"}`);

if (wantReport) {
  let agree = 0;
  let compared = 0;
  console.log("\ncode  label                          lat      lon   | states | how | hint");
  for (const r of rows) {
    const h = hintFor(r.code);
    const rec = byCode.get(r.code);
    let hintNote = "no hint";
    if (h) {
      compared++;
      const hg = cities.find(h.name, h.state);
      const same = hg && hg.id === regions.get(r.code).geo.id;
      if (same) agree++;
      hintNote = same ? "= hint" : `hint: ${h.name}, ${h.state}`;
    }
    console.log(
      `${r.code}   ${r.label.padEnd(28)} ${String(r.lat).padStart(6)} ${String(r.lon).padStart(8)}  | ${r.states.join("/")} | ${rec.label ?? "-"} | ${r.how} | ${hintNote}`,
    );
  }
  console.log(`\nlabel city equals the areacode-to-zipcode hint city for ${agree}/${compared} codes`);
}
