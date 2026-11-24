/**
 * T^minus Waitlist utilities — E.164 phone normalization, launch target
 * timestamp, and Jan 1, 2027 calendar reminder (.ics) builder.
 */

export type WaitlistRole = "SHOPPER" | "BRAND";

/** January 1, 2027 00:00:00 Eastern Time (UTC-05:00) */
export const LAUNCH_TARGET_ISO = "2027-01-01T00:00:00-05:00";
export const LAUNCH_TARGET_MS = Date.parse(LAUNCH_TARGET_ISO);

/**
 * Normalize a user-entered phone string to strict E.164 format (+[country][number]).
 * - 10-digit US/Canada numbers (e.g. "(555) 234-5678") -> "+15552345678"
 * - 11-digit leading-1 US/Canada numbers ("1 555 234 5678") -> "+15552345678"
 * - Explicit international numbers ("+44 7911 123456") -> "+447911123456"
 * Returns null if the input cannot form a valid E.164 phone number (8-15 digits).
 */
export function normalizePhoneToE164(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const hasLeadingPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");

  if (hasLeadingPlus) {
    if (digits.length < 8 || digits.length > 15 || digits.startsWith("0")) {
      return null;
    }
    return `+${digits}`;
  }

  // Standard 10-digit North American format (area code cannot start with 0 or 1)
  if (digits.length === 10) {
    if (digits[0] === "0" || digits[0] === "1") return null;
    return `+1${digits}`;
  }

  // 11-digit North American format with leading 1
  if (digits.length === 11 && digits.startsWith("1")) {
    if (digits[1] === "0" || digits[1] === "1") return null;
    return `+${digits}`;
  }

  // Other international numbers typed without leading "+"
  if (digits.length >= 11 && digits.length <= 15 && !digits.startsWith("0")) {
    return `+${digits}`;
  }

  return null;
}

/**
 * Gently format US/CA phone input as the user types while leaving international
 * (+...) entries clean and unobstructed.
 */
export function formatPhoneDisplay(raw: string): string {
  const trimmed = raw.trimStart();
  if (trimmed.startsWith("+")) {
    return "+" + trimmed.slice(1).replace(/[^\d\s-]/g, "").slice(0, 18);
  }
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length === 11 && digits.startsWith("1")) {
    const rest = digits.slice(1);
    return `+1 (${rest.slice(0, 3)}) ${rest.slice(3, 6)}-${rest.slice(6)}`;
  }
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

/**
 * Generate a standards-compliant .ics file for January 1, 2027 00:00 ET (05:00 UTC).
 */
export function buildLaunchCalendarIcs(siteUrl: string): string {
  const cleanUrl = siteUrl.replace(/[\r\n]/g, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//T^minus//Launch Reminder//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:t-minus-launch-2027-01-01@t-minus.app",
    "DTSTAMP:20261123T000000Z",
    "DTSTART:20270101T050000Z",
    "DTEND:20270101T053000Z",
    "SUMMARY:T^minus launches on the App Store",
    `DESCRIPTION:T^minus App Store v1.0 goes live at midnight ET. Your waitlist number unlocks 2 weeks of T^minus Pro free for early access to independent clothing drops. ${cleanUrl}`,
    `URL:${cleanUrl}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:T^minus launches on the App Store in 15 minutes.",
    "TRIGGER:-PT15M",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/** CSV field escaper for waitlist exports. */
export function escapeCsvCell(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}
