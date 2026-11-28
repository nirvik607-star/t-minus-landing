// Checks src/lib/globe/area-codes.ts against its sources and against land.ts.
// Needs Node >= 22.18 (imports the .ts files directly) and the generator packages.
//
//   GLOBE_GEN_DIR=<scratch> node scripts/globe/verify-area-codes.mjs [--seed=N]
import { genImport, genRequire } from "./_deps.mjs";
import { CA_ABBRS, US_ABBRS, US_STATES, countryOf, loadCities, loadCityHints, loadGeocoding, loadNanpa } from "./area-code-sources.mjs";

const { AREA_CODES, regionForAreaCode, areaCodeFromE164 } = await import(new URL("../../src/lib/globe/area-codes.ts", import.meta.url).href);
const { isLand, LAND_COLS, LAND_ROWS } = await import(new URL("../../src/lib/globe/land.ts", import.meta.url).href);

let failures = 0;
let flags = 0;
const check = (name, ok, detail = "") => {
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);
  return ok;
};
const show = (r) => (r ? `${r.label} (${r.lat}, ${r.lon})` : "null");
const stateOf = (r) => r.label.slice(-2);
const cityOf = (r) => r.label.slice(0, -4);

// ------------------------------------------------------------------ required look-ups
console.log("== required look-ups");
const near = (r, lat, lon, tol = 0.15) => !!r && Math.abs(r.lat - lat) <= tol && Math.abs(r.lon - lon) <= tol;
const r = regionForAreaCode;
check("212 -> New York, NY near (40.7, -74.0)", r("212")?.label === "New York, NY" && near(r("212"), 40.7, -74.0), show(r("212")));
check("415 -> San Francisco, CA", r("415")?.label === "San Francisco, CA" && near(r("415"), 37.8, -122.4), show(r("415")));
check("404 -> Atlanta, GA", r("404")?.label === "Atlanta, GA" && near(r("404"), 33.7, -84.4), show(r("404")));
check("312 -> Chicago, IL", r("312")?.label === "Chicago, IL" && near(r("312"), 41.9, -87.6), show(r("312")));
check("808 -> Hawaii (Honolulu), HI", r("808")?.label === "Honolulu, HI" && near(r("808"), 21.3, -157.9), show(r("808")));
check("907 -> Alaska", !!r("907") && stateOf(r("907")) === "AK" && near(r("907"), 61.2, -149.9), show(r("907")));
check("416 -> Toronto, ON", r("416")?.label === "Toronto, ON" && near(r("416"), 43.7, -79.4), show(r("416")));
check("604 -> Vancouver, BC", r("604")?.label === "Vancouver, BC" && near(r("604"), 49.3, -123.1), show(r("604")));
check("800 -> null", r("800") === null);
check('areaCodeFromE164("+14155550134") === "415"', areaCodeFromE164("+14155550134") === "415");
check('areaCodeFromE164("+442071234567") === null', areaCodeFromE164("+442071234567") === null);

console.log("\n== helper edge cases");
const nullInputs = ["", "41", "4155", "abc", "015", "115", "toString", "constructor", "__proto__", " 415", "415 "];
check("regionForAreaCode rejects malformed codes", nullInputs.every((c) => r(c) === null) && r(415) === null && r(undefined) === null);
const badPhones = ["+1415555013", "+141555501345", "14155550134", "4155550134", "+1 415 555 0134", "+1-415-555-0134", "+10155550134", "+11155550134", "+1415555013a", "", "+4915112345678", "+52155512345678"];
check("areaCodeFromE164 rejects non-NANP / malformed input", badPhones.every((p) => areaCodeFromE164(p) === null) && areaCodeFromE164(null) === null);
check('toll-free number: areaCodeFromE164 gives "800", regionForAreaCode gives null', areaCodeFromE164("+18005550100") === "800" && r(areaCodeFromE164("+18005550100")) === null);
check("regionForAreaCode(areaCodeFromE164(...)) round trip", r(areaCodeFromE164("+12125550123"))?.label === "New York, NY" && r(areaCodeFromE164("+16045550123"))?.label === "Vancouver, BC");

// ------------------------------------------------------------------ structure
console.log("\n== table structure");
const codes = Object.keys(AREA_CODES).sort();
const us = codes.filter((c) => US_ABBRS.has(stateOf(AREA_CODES[c])));
const ca = codes.filter((c) => CA_ABBRS.has(stateOf(AREA_CODES[c])));
console.log(`count of codes: ${codes.length}  (United States ${us.length}, Canada ${ca.length}); distinct regions: ${new Set(codes.map((c) => AREA_CODES[c].label)).size}`);
check("every key is a 3-digit NANP area code shape [2-9]XX and not N11", codes.every((c) => /^[2-9][0-9]{2}$/.test(c) && !/^.11$/.test(c)));
check('every label is "City, ST" with a US state / DC / Canadian province', codes.every((c) => /^\S.*, [A-Z]{2}$/.test(AREA_CODES[c].label) && countryOf(stateOf(AREA_CODES[c]))), `${us.length + ca.length}/${codes.length}`);
check("every lat/lon is a finite number inside North America's bounding box", codes.every((c) => { const e = AREA_CODES[c]; return Number.isFinite(e.lat) && Number.isFinite(e.lon) && e.lat > 18 && e.lat < 72 && e.lon > -170 && e.lon < -50; }));
const byLabel = new Map();
for (const c of codes) {
  const e = AREA_CODES[c];
  const k = e.label;
  if (!byLabel.has(k)) byLabel.set(k, new Set());
  byLabel.get(k).add(`${e.lat},${e.lon}`);
}
check("codes that share a label share coordinates", [...byLabel.values()].every((s) => s.size === 1));

const nanpa = await loadNanpa();
const mustBeAbsent = [
  ...nanpa.nonGeo, // 5XX personal, 600/622/633, 700, 710, toll-free, 900
  "800", "833", "844", "855", "866", "877", "888", "900", "710", "500", "533", "544", "566", "577", "588",
  "787", "939", "340", "670", "671", "684", // US territories
  "242", "246", "264", "268", "284", "345", "441", "473", "649", "658", "664", "721", "758", "767", "784", "809", "829", "849", "868", "869", "876",
];
const present = [...new Set(mustBeAbsent)].filter((c) => r(c) !== null);
check("no toll-free, non-geographic, territory or Caribbean code is in the table", present.length === 0, present.join(", ") || `${new Set(mustBeAbsent).size} codes checked`);

const statesLabelled = new Set(codes.map((c) => stateOf(AREA_CODES[c])));
const missingUs = [...US_ABBRS].filter((s) => !statesLabelled.has(s));
check("all 50 states + DC have at least one area code labelled in them", US_ABBRS.size === 51 && missingUs.length === 0, missingUs.join(", ") || "51/51");
console.log(`      Canadian provinces/territories never used as a label: ${[...CA_ABBRS].filter((s) => !statesLabelled.has(s)).join(", ") || "none"} (they share 902/782 and 867)`);

// ------------------------------------------------------------------ against the sources
console.log("\n== agreement with the sources (all entries)");
const geocoding = loadGeocoding();
const cities = loadCities();
const hintFor = loadCityHints();

let stateBad = [];
let coordBad = [];
let ownServed = 0;
const servedBy = (code, geo) => {
  const rec = geocoding.get(code);
  if (!rec) return 0;
  let n = 0;
  for (const c of rec.cities.values()) if (cities.find(c.name, c.state)?.id === geo.id) n += c.count;
  return n;
};
for (const c of codes) {
  const e = AREA_CODES[c];
  const rec = geocoding.get(c);
  const states = rec ? rec.states : [hintFor(c)?.state];
  if (!states.includes(stateOf(e))) stateBad.push(c);
  const geo = cities.find(cityOf(e), stateOf(e));
  if (!geo || Math.abs(geo.lat - e.lat) > 0.0051 || Math.abs(geo.lon - e.lon) > 0.0051) coordBad.push(c);
  else if (servedBy(c, geo) > 0 || (rec?.labelCity && cities.find(rec.labelCity.name, rec.labelCity.state)?.id === geo.id)) ownServed++;
}
check("label state is a state the code serves per libphonenumber (hint dataset for NANPA-only codes)", stateBad.length === 0, stateBad.join(", ") || `${codes.length}/${codes.length}`);
check("coordinates equal the GeoNames point of the label city (rounded to 2 decimals)", coordBad.length === 0, coordBad.join(", ") || `${codes.length}/${codes.length}`);
console.log(`      label city is served by the code itself per libphonenumber: ${ownServed}; inherited from the overlaid code: ${codes.length - ownServed}`);
const notNanpa = codes.filter((c) => !nanpa.geo.has(c));
console.log(`      codes not in NANPA's in-service geographic list of ${nanpa.snapshot.slice(0, 10)} (newer or not yet in service): ${notNanpa.join(", ") || "none"}`);
const notLibphone = codes.filter((c) => !geocoding.has(c));
console.log(`      codes not in libphonenumber's table (taken from NANPA + hint dataset): ${notLibphone.join(", ") || "none"}`);
let hintStateBad = [];
let hintMissing = [];
for (const c of codes) {
  const h = hintFor(c);
  if (!h) hintMissing.push(c);
  else if (h.state !== stateOf(AREA_CODES[c]) && !(geocoding.get(c)?.states || []).includes(h.state)) hintStateBad.push(c);
}
check("independent dataset (areacode-to-zipcode) puts every code in a state the code serves", hintStateBad.length === 0, hintStateBad.join(", ") || `${codes.length - hintMissing.length} compared, no record for ${hintMissing.join(", ") || "none"}`);

// ------------------------------------------------------------------ inside the right state
console.log("\n== coordinates fall inside the right state / country");
const { feature } = await genImport("topojson-client");
const { geoContains } = await genImport("d3-geo");
const usTopo = genRequire("us-atlas/states-10m.json");
const stateShapes = new Map();
for (const f of feature(usTopo, usTopo.objects.states).features) {
  const abbr = US_STATES[f.properties.name];
  if (abbr) stateShapes.set(abbr, f);
}
const outsideState = us.filter((c) => !geoContains(stateShapes.get(stateOf(AREA_CODES[c])), [AREA_CODES[c].lon, AREA_CODES[c].lat]));
check(`US entries lie inside their state's polygon (us-atlas states-10m, Census 2017)`, outsideState.length === 0, outsideState.map((c) => `${c} ${show(AREA_CODES[c])}`).join("; ") || `${us.length}/${us.length}`);
const worldTopo = genRequire("world-atlas/countries-10m.json");
const canada = feature(worldTopo, worldTopo.objects.countries).features.find((f) => f.properties.name === "Canada");
const inCanada = (lat, lon) => geoContains(canada, [lon, lat]);
// Waterfront cities (their GeoNames point sits on the harbour) can fall just off the
// 1:10m coastline, so a point within 0.02 degrees (about 2 km) of Canada also counts.
const nearCanada = (e) => [-0.02, 0, 0.02].some((dy) => [-0.02, 0, 0.02].some((dx) => inCanada(e.lat + dy, e.lon + dx)));
const offCoast = ca.filter((c) => !inCanada(AREA_CODES[c].lat, AREA_CODES[c].lon));
const outsideCanada = offCoast.filter((c) => !nearCanada(AREA_CODES[c]));
check("Canadian entries lie inside Canada, or within 0.02 degrees of it (world-atlas countries-10m)", outsideCanada.length === 0, outsideCanada.map((c) => `${c} ${show(AREA_CODES[c])}`).join("; ") || `${ca.length - offCoast.length} inside, ${offCoast.length} on the waterfront within 0.02 degrees: ${offCoast.join(", ") || "none"}`);
console.log("      (province for Canadian entries is checked through the GeoNames join above)");

// ------------------------------------------------------------------ land mask
console.log("\n== every entry against the land mask (land.ts)");
const cellLat = 180 / LAND_ROWS;
const cellLon = 360 / LAND_COLS;
const inSea = [];
const farInSea = [];
for (const c of codes) {
  const e = AREA_CODES[c];
  if (isLand(e.lat, e.lon)) continue;
  inSea.push(c);
  let neighbourLand = false;
  for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (isLand(e.lat + dy * cellLat, e.lon + dx * cellLon)) neighbourLand = true;
  if (!neighbourLand) farInSea.push(c);
}
console.log(`      on a land cell: ${codes.length - inSea.length}/${codes.length}`);
console.log(`      on a sea cell but next to a land cell (coast or island smaller than the 1.5 degree grid): ${inSea.filter((c) => !farInSea.includes(c)).map((c) => `${c} ${show(AREA_CODES[c])}`).join("; ") || "none"}`);
// Reported, not gated: the mask is a 1.5 degree cell-centre sample, so small islands have no land cell at all.
const cellsToLand = (e) => {
  for (let d = 2; d < LAND_COLS / 2; d++)
    for (let dy = -d; dy <= d; dy++)
      for (let dx = -d; dx <= d; dx++)
        if (Math.max(Math.abs(dx), Math.abs(dy)) === d && Math.abs(e.lat + dy * cellLat) <= 90 && isLand(e.lat + dy * cellLat, e.lon + dx * cellLon)) return d;
  return Infinity;
};
if (farInSea.length === 0) console.log("PASS  no entry is in the sea by more than one cell");
else {
  flags += farInSea.length;
  for (const c of farInSea) console.log(`FLAG  in the sea by more than one cell: ${c} ${show(AREA_CODES[c])} — nearest land cell is ${cellsToLand(AREA_CODES[c])} cells away`);
}

// ------------------------------------------------------------------ 15 random spot checks
const seedArg = process.argv.find((a) => a.startsWith("--seed="));
let seed = seedArg ? Number(seedArg.slice(7)) : 20261128;
console.log(`\n== 15 random entries against the source data (seed ${seed})`);
const rand = () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const pool = [...codes];
const sample = [];
while (sample.length < 15) sample.push(pool.splice(Math.floor(rand() * pool.length), 1)[0]);
for (const c of sample.sort()) {
  const e = AREA_CODES[c];
  const rec = geocoding.get(c);
  const h = hintFor(c);
  const geo = cities.find(cityOf(e), stateOf(e));
  const top = rec ? [...rec.cities.values()].sort((a, b) => b.count - a.count).slice(0, 3).map((x) => `${x.name}, ${x.state} x${x.count}`).join("; ") : "";
  const stateOk = (rec ? rec.states : [h?.state]).includes(stateOf(e));
  const coordOk = !!geo && Math.abs(geo.lat - e.lat) <= 0.0051 && Math.abs(geo.lon - e.lon) <= 0.0051;
  const own = geo ? servedBy(c, geo) : 0;
  const labelCityMatch = !!(geo && rec?.labelCity && cities.find(rec.labelCity.name, rec.labelCity.state)?.id === geo.id);
  // Other codes of the same state whose prefixes include the label city (the overlaid code is one of them).
  const others = geo ? codes.filter((o) => o !== c && geocoding.get(o)?.states.includes(stateOf(e)) && servedBy(o, geo) > 0) : [];
  const hintTwins = h ? others.filter((o) => hintFor(o)?.key === h.key) : [];
  const basis = own > 0 ? `own prefixes list it x${own}` : labelCityMatch ? "libphonenumber labels the whole code with this city" : others.length ? `inherited: ${cityOf(e)} is served by ${others.join("/")}${hintTwins.length ? `; same hint city as ${hintTwins.join("/")}` : ""}` : "NO SOURCE SUPPORT";
  const ok = stateOk && coordOk && (own > 0 || labelCityMatch || others.length > 0);
  check(`${c} -> ${show(e)}`, ok);
  console.log(`        libphonenumber: ${rec ? `"${rec.label ?? "(no area-code level label)"}", states ${rec.states.join("/")}, ${rec.cityTotal} city prefixes${top ? ` (top: ${top})` : ""}` : "not in table"}`);
  console.log(`        hint dataset:   ${h ? `${h.name}, ${h.state}` : "no record"}   GeoNames: ${geo ? `${geo.name}, ${geo.state} (${geo.lat}, ${geo.lon}), pop ${geo.population}` : "NOT FOUND"}`);
  console.log(`        basis:          ${basis}`);
}

console.log(`\n${failures === 0 ? "ALL AREA CODE CHECKS PASSED" : `${failures} AREA CODE CHECK(S) FAILED`}${flags ? `, ${flags} entr${flags === 1 ? "y" : "ies"} FLAGGED (see above)` : ""}`);
process.exit(failures === 0 ? 0 : 1);
