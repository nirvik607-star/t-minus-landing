import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {
  escapeCsvCell,
  normalizePhoneToE164,
  type WaitlistRole,
} from "@/lib/waitlist";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface WaitlistRecord {
  id: string;
  phone: string;
  role: WaitlistRole;
  brandHandle: string | null;
  proTrialWeeks: number;
  source: string | null;
  smsConsentAt: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_PATH = path.join(DATA_DIR, "waitlist.json");

function readEntries(): WaitlistRecord[] {
  try {
    if (!fs.existsSync(STORE_PATH)) return [];
    const parsed = JSON.parse(fs.readFileSync(STORE_PATH, "utf-8"));
    return Array.isArray(parsed) ? (parsed as WaitlistRecord[]) : [];
  } catch {
    return [];
  }
}

function writeEntries(entries: WaitlistRecord[]) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(STORE_PATH, JSON.stringify(entries, null, 2), "utf-8");
}

function sanitizeOptionalText(raw: unknown, maxLen: number): string | null {
  if (typeof raw !== "string") return null;
  const cleaned = raw.trim().replace(/\s+/g, " ");
  if (!cleaned) return null;
  return cleaned.slice(0, maxLen);
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }

  const rawPhone = typeof body.phone === "string" ? body.phone : "";
  const phone = normalizePhoneToE164(rawPhone);
  if (!phone) {
    return NextResponse.json(
      { error: "Enter a valid mobile number (e.g. (555) 234-5678)." },
      { status: 400 }
    );
  }

  if (body.smsConsent !== true) {
    return NextResponse.json(
      { error: "Please check the text consent box before joining." },
      { status: 400 }
    );
  }

  const role: WaitlistRole = body.role === "BRAND" ? "BRAND" : "SHOPPER";
  const brandHandle =
    role === "BRAND" ? sanitizeOptionalText(body.brandHandle, 120) : null;

  if (role === "BRAND" && !brandHandle) {
    return NextResponse.json(
      { error: "Enter your brand name or @handle." },
      { status: 400 }
    );
  }

  const source =
    sanitizeOptionalText(body.source, 160) ??
    sanitizeOptionalText(req.headers.get("referer"), 160);

  try {
    const entries = readEntries();
    const idx = entries.findIndex((e) => e.phone === phone);

    if (idx !== -1) {
      const existing = entries[idx];
      if (
        role === "BRAND" &&
        (existing.role !== "BRAND" ||
          (brandHandle && existing.brandHandle !== brandHandle))
      ) {
        entries[idx] = {
          ...existing,
          role: "BRAND",
          brandHandle: brandHandle ?? existing.brandHandle,
        };
        writeEntries(entries);
      }

      const updated = entries[idx];
      return NextResponse.json({
        ok: true,
        alreadyJoined: true,
        entry: {
          id: updated.id,
          role: updated.role,
          proTrialWeeks: updated.proTrialWeeks,
          createdAt: updated.createdAt,
        },
      });
    }

    const now = new Date().toISOString();
    const created: WaitlistRecord = {
      id: crypto.randomUUID(),
      phone,
      role,
      brandHandle,
      proTrialWeeks: 2,
      source,
      smsConsentAt: now,
      createdAt: now,
    };

    entries.unshift(created);
    writeEntries(entries);

    return NextResponse.json(
      {
        ok: true,
        alreadyJoined: false,
        entry: {
          id: created.id,
          role: created.role,
          proTrialWeeks: created.proTrialWeeks,
          createdAt: created.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[/api/waitlist] failed to save entry:", err);
    return NextResponse.json(
      { error: "Something went wrong saving your spot. Try again." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const configuredToken = process.env.WAITLIST_EXPORT_TOKEN;
  if (configuredToken) {
    const provided =
      req.nextUrl.searchParams.get("token") ??
      req.headers.get("x-waitlist-token");
    if (provided !== configuredToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const format = req.nextUrl.searchParams.get("format");
  const entries = readEntries();

  if (format === "csv") {
    const header = [
      "id",
      "phone",
      "role",
      "brandHandle",
      "proTrialWeeks",
      "source",
      "smsConsentAt",
      "createdAt",
    ].join(",");

    const rows = entries.map((e) =>
      [
        escapeCsvCell(e.id),
        escapeCsvCell(e.phone),
        escapeCsvCell(e.role),
        escapeCsvCell(e.brandHandle),
        escapeCsvCell(e.proTrialWeeks),
        escapeCsvCell(e.source),
        escapeCsvCell(e.smsConsentAt),
        escapeCsvCell(e.createdAt),
      ].join(",")
    );

    const csv = [header, ...rows].join("\r\n");
    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="t-minus-waitlist.csv"',
        "Cache-Control": "no-store",
      },
    });
  }

  return NextResponse.json({
    count: entries.length,
    entries,
  });
}