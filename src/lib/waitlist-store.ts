import fs from "node:fs";
import path from "node:path";
import type { WaitlistRole } from "@/lib/waitlist";

/**
 * The local waitlist store: one JSON file under .data/. Server only.
 * It holds phone numbers, so nothing here is ever sent to a browser as is.
 */

export interface WaitlistRecord {
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

export function readEntries(): WaitlistRecord[] {
  try {
    if (!fs.existsSync(STORE_PATH)) return [];
    const parsed = JSON.parse(fs.readFileSync(STORE_PATH, "utf-8"));
    return Array.isArray(parsed) ? (parsed as WaitlistRecord[]) : [];
  } catch {
    return [];
  }
}

export function writeEntries(entries: WaitlistRecord[]) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(STORE_PATH, JSON.stringify(entries, null, 2), "utf-8");
}

