import { NextResponse } from "next/server";
import { readEntries } from "@/lib/waitlist-store";
import { areaCodeFromE164, regionForAreaCode } from "@/lib/globe/area-codes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** How many places one response carries. The globe cycles through them. */
const SAMPLE = 40;

/**
 * What the public map is allowed to know: how many people are on the list,
 * and a shuffled handful of the broad areas their area codes belong to.
 *
 * Nothing that could point at a person leaves the server: no number, no part
 * of a number, no id, no time, no order of joining. An area is the region an
 * area code serves (a metro or part of a state), shared by a great many
 * phones, and a number with no recognisable area code is simply left out.
 */
export async function GET() {
  const entries = readEntries();
  const places = [];
  for (const entry of entries) {
    const code = areaCodeFromE164(entry.phone);
    const region = code ? regionForAreaCode(code) : null;
    if (region) places.push({ label: region.label, lat: region.lat, lon: region.lon });
  }
  // Shuffle, so the response says nothing about who joined when.
  for (let i = places.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [places[i], places[j]] = [places[j], places[i]];
  }
  return NextResponse.json(
    { count: entries.length, places: places.slice(0, SAMPLE) },
    { headers: { "Cache-Control": "public, max-age=15" } }
  );
}
