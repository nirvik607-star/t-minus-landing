// Loads and normalises the source datasets behind src/lib/globe/area-codes.ts.
// Used by build-area-codes.mjs (generation) and verify-area-codes.mjs (checks).
import fs from "node:fs";
import { genRequire, genVersion } from "./_deps.mjs";

/** US states + DC. Used only to turn libphonenumber's state names into abbreviations. */
export const US_STATES = {
  Alabama: "AL", Alaska: "AK", Arizona: "AZ", Arkansas: "AR", California: "CA", Colorado: "CO",
  Connecticut: "CT", Delaware: "DE", Florida: "FL", Georgia: "GA", Hawaii: "HI", Idaho: "ID",
  Illinois: "IL", Indiana: "IN", Iowa: "IA", Kansas: "KS", Kentucky: "KY", Louisiana: "LA",
  Maine: "ME", Maryland: "MD", Massachusetts: "MA", Michigan: "MI", Minnesota: "MN",
  Mississippi: "MS", Missouri: "MO", Montana: "MT", Nebraska: "NE", Nevada: "NV",
  "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY",
  "North Carolina": "NC", "North Dakota": "ND", Ohio: "OH", Oklahoma: "OK", Oregon: "OR",
  Pennsylvania: "PA", "Rhode Island": "RI", "South Carolina": "SC", "South Dakota": "SD",
  Tennessee: "TN", Texas: "TX", Utah: "UT", Vermont: "VT", Virginia: "VA", Washington: "WA",
  "West Virginia": "WV", Wisconsin: "WI", Wyoming: "WY", "District of Columbia": "DC",
  // Spellings used by libphonenumber's geocoding file:
  "Washington State": "WA", "Washington D.C.": "DC",
};

/** Canadian provinces and territories, with the GeoNames admin1 code of each. */
export const CA_PROVINCES = {
  Alberta: "AB", "British Columbia": "BC", Manitoba: "MB", "New Brunswick": "NB",
  "Newfoundland and Labrador": "NL", "Nova Scotia": "NS", Ontario: "ON",
  "Prince Edward Island": "PE", Quebec: "QC", Saskatchewan: "SK", Yukon: "YT",
  "Northwest Territories": "NT", Nunavut: "NU",
  // Typo present in libphonenumber's geocoding file (area code 257):
  "British Colombia": "BC",
};
export const GEONAMES_CA_ADMIN = {
  "01": "AB", "02": "BC", "03": "MB", "04": "NB", "05": "NL", "07": "NS", "08": "ON",
  "09": "PE", "10": "QC", "11": "SK", "12": "YT", "13": "NT", "14": "NU",
};

export const US_ABBRS = new Set(Object.values(US_STATES));
export const CA_ABBRS = new Set(Object.values(CA_PROVINCES));
export const countryOf = (abbr) => (US_ABBRS.has(abbr) ? "US" : CA_ABBRS.has(abbr) ? "CA" : null);
const STATE_NAMES = { ...US_STATES, ...CA_PROVINCES };

/** Name key used to join city names across datasets. */
export function normName(name) {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/^the /, "")
    .replace(/\b(saint|st\.)(?=\s)/g, "st")
    .replace(/\bsainte(?=\s)/g, "ste")
    .replace(/\b(fort|ft\.)(?=\s)/g, "ft")
    .replace(/\b(mount|mt\.)(?=\s)/g, "mt")
    .replace(/\bhts\b\.?/g, "heights")
    .replace(/\bspgs\b\.?/g, "springs")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** GeoNames populated places (via all-the-cities), indexed by country|state|name. */
export function loadCities() {
  const cities = genRequire("all-the-cities");
  const index = new Map();
  for (const c of cities) {
    if (c.country !== "US" && c.country !== "CA") continue;
    const state = c.country === "US" ? c.adminCode : GEONAMES_CA_ADMIN[c.adminCode];
    if (!state || !countryOf(state)) continue;
    const rec = {
      id: c.cityId,
      name: c.name,
      state,
      population: c.population,
      lat: c.loc.coordinates[1],
      lon: c.loc.coordinates[0],
    };
    const key = `${state}|${normName(c.name)}`;
    const prev = index.get(key);
    if (!prev || rec.population > prev.population) index.set(key, rec);
  }
  /** Look a city up by name within a state; tolerates "X" vs "X City". */
  const find = (name, state) => {
    const n = normName(name);
    const exact = index.get(`${state}|${n}`);
    const withCity = index.get(`${state}|${n} city`);
    const withoutCity = n.endsWith(" city") ? index.get(`${state}|${n.slice(0, -5)}`) : undefined;
    // An exact hit wins, unless "X City" dwarfs a same-named hamlet "X".
    if (exact && withCity && withCity.population > exact.population * 20) return withCity;
    return exact || withCity || withoutCity || null;
  };
  return { find, size: index.size };
}

/**
 * Google libphonenumber's English geocoding table for country code 1
 * (resources/geocoding/en/1.txt), as shipped in libphonenumber-geo-carrier.
 * Returns one record per area code found in the table.
 */
export function loadGeocoding() {
  const { BSON } = genRequire("bson");
  const file = genRequire.resolve("libphonenumber-geo-carrier/resources/geocodes/en/1.bson");
  const table = BSON.deserialize(fs.readFileSync(file));

  const parse = (value) => {
    if (!value) return null;
    if (value === "Washington D.C.") return { states: ["DC"], city: "Washington", state: "DC" };
    const parts = value.split(", ");
    const last = parts[parts.length - 1];
    if (parts.length >= 2 && /^[A-Z]{2}$/.test(last)) {
      if (!countryOf(last)) return { foreign: true };
      // "Louisiana Street, Houston, TX" -> Houston
      return { states: [last], city: parts[parts.length - 2], state: last };
    }
    const states = value.split("/").map((s) => STATE_NAMES[s.trim()]);
    if (states.every(Boolean)) return { states };
    return { foreign: true }; // Caribbean islands, Guam, "Watson Lake" (no state given) ...
  };

  const codes = new Map();
  const get = (npa) => {
    let rec = codes.get(npa);
    if (!rec) {
      rec = { code: npa, label: null, labelStates: null, labelCity: null, cities: new Map(), cityTotal: 0, stateVotes: new Map(), foreign: 0, known: 0 };
      codes.set(npa, rec);
    }
    return rec;
  };
  for (const [prefix, value] of Object.entries(table)) {
    const rec = get(prefix.slice(0, 3));
    const p = parse(value);
    if (prefix.length === 3) {
      rec.label = value;
      if (p && !p.foreign) {
        rec.labelStates = p.states;
        if (p.city) rec.labelCity = { name: p.city, state: p.state };
      }
    }
    if (!p) continue;
    if (p.foreign) {
      rec.foreign++;
      continue;
    }
    rec.known++;
    for (const s of p.states) rec.stateVotes.set(s, (rec.stateVotes.get(s) || 0) + 1);
    if (p.city && prefix.length > 3) {
      const key = `${p.city}, ${p.state}`;
      const entry = rec.cities.get(key) || { name: p.city, state: p.state, count: 0 };
      entry.count++;
      rec.cities.set(key, entry);
      rec.cityTotal++;
    }
  }
  for (const rec of codes.values()) {
    // States served: the area-code level label when it names states, else the
    // states that make up at least 20% of the longer-prefix entries.
    if (rec.labelStates) rec.states = rec.labelStates;
    else {
      const total = [...rec.stateVotes.values()].reduce((a, b) => a + b, 0);
      rec.states = [...rec.stateVotes].filter(([, n]) => n >= total * 0.2).sort((a, b) => b[1] - a[1]).map(([s]) => s);
    }
  }
  return codes;
}

/** NANPA's list of in-service geographic / non-geographic NPAs (area-codes-nanp snapshot). */
export async function loadNanpa() {
  const file = genRequire.resolve("area-codes-nanp/package.json").replace(/package\.json$/, "dist/esm/area_codes.js");
  const source = fs.readFileSync(file, "utf8");
  const snapshot = (source.match(/generated from CSV file: (\S+)/) || [])[1] || "unknown";
  const list = (name) => {
    const m = source.match(new RegExp(`export const ${name} = \\[([^\\]]*)\\]`));
    if (!m) throw new Error(`area-codes-nanp: ${name} not found`);
    return new Set(m[1].match(/\d{3}/g));
  };
  return { snapshot, geo: list("areaCodesByGeo"), nonGeo: list("areaCodesByNonGeo") };
}

/** One "main city" hint per area code from areacode-to-zipcode (covers overlay codes). */
export function loadCityHints() {
  const { getDataFromAreaCode } = genRequire("areacode-to-zipcode");
  return (code) => {
    const d = getDataFromAreaCode(Number(code));
    if (!d || !d.city || !d.state) return null;
    return { name: d.city, state: d.state, country: d.country };
  };
}

export const sourceVersions = () =>
  ["libphonenumber-geo-carrier", "all-the-cities", "areacode-to-zipcode", "area-codes-nanp"].map(
    (name) => `${name}@${genVersion(name)}`,
  );
