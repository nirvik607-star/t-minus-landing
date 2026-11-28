/**
 * One place for the facts the page states. Change them here, not in components.
 */

/** January 1, 2027, 00:00 Eastern Time. */
export const LAUNCH_ISO = "2027-01-01T00:00:00-05:00";
export const LAUNCH_MS = Date.parse(LAUNCH_ISO);
export const LAUNCH_DATE_LONG = "January 1, 2027";
export const LAUNCH_DATE_SHORT = "January 1";

/**
 * What joining gets you. Provisional: the owner may swap this for a different
 * incentive. Set to null to show no perk line at all.
 */
export const WAITLIST_PERK: string | null =
  "2 weeks of Premium, free when it opens.";

/** Text-message programme details shown in the consent line and legal pages. */
export const SMS_PROGRAM = {
  brand: "T^minus",
  /** Upper bound stated to subscribers and to carrier review. */
  maxMessagesPerMonth: 4,
  /** Set to the monitored support address before carrier registration. */
  supportEmail: "support@t-minus.app",
} as const;

/** App Store listing. Empty until the listing exists; the page shows a button at zero when set. */
export const APP_STORE_URL = "";

/**
 * Where the form posts. The built-in endpoint only exists on a Node server;
 * a static deployment sets NEXT_PUBLIC_WAITLIST_ENDPOINT to its own.
 */
export const WAITLIST_ENDPOINT =
  process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT ?? "/api/waitlist";

/** Base path the site is served under ("" at a domain root, "/t-minus-landing" on GitHub Pages). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Absolute URL of the page for share sheets and calendar entries. */
export function siteUrl(): string {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}${BASE_PATH}/`;
}
