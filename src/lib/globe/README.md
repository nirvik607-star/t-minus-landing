# Globe data (generated — do not edit by hand)

- `land.ts` — 240x120 equirectangular land mask (base64 bits, cell-centre point-in-polygon) + `isLand(lat, lon)`. Natural Earth 1:110m land (public domain) from `world-atlas@2.0.2` (ISC), built with `topojson-client@3.1.0` and `d3-geo@3.1.2` (ISC).
- `area-codes.ts` — 417 US/Canada geographic area codes -> `{ label, lat, lon }`, + `regionForAreaCode`, `areaCodeFromE164`. Codes and cities served: Google libphonenumber geocoding (Apache-2.0) from `libphonenumber-geo-carrier@2.0.0` (MIT); coordinates: GeoNames (CC BY 4.0, attribution required) from `all-the-cities@3.1.0` (MIT); overlay hints: `areacode-to-zipcode@1.0.12` (ISC); NANPA in-service list: `area-codes-nanp@0.0.6` (MIT). Three overlay links are hand-entered in `scripts/globe/build-area-codes.mjs` (`MANUAL_OVERLAY_OF`).

Regenerate and verify from the repo root (Node >= 22.18; the generator packages live in a scratch folder, never in `package.json`):

    export GLOBE_GEN_DIR=/tmp/globe-gen && mkdir -p "$GLOBE_GEN_DIR" && (cd "$GLOBE_GEN_DIR" && npm init -y && npm i --no-audit --no-fund world-atlas@2.0.2 topojson-client@3.1.0 d3-geo@3.1.2 libphonenumber-geo-carrier@2.0.0 all-the-cities@3.1.0 areacode-to-zipcode@1.0.12 area-codes-nanp@0.0.6 us-atlas@3.0.1)
    node scripts/globe/build-land.mjs && node scripts/globe/build-area-codes.mjs
    node scripts/globe/verify-land.mjs && node scripts/globe/verify-area-codes.mjs && npx tsc --noEmit
