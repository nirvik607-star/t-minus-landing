"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import {
  buildLaunchCalendarIcs,
  formatPhoneDisplay,
  normalizePhoneToE164,
  type WaitlistRole,
} from "@/lib/waitlist";
import { SMS_PROGRAM, WAITLIST_ENDPOINT, WAITLIST_PERK, siteUrl } from "@/lib/launch";

/** The waitlist incentive, as one plain line. Renders nothing when no perk is set. */
export function PerkLine({ className = "" }: { className?: string }) {
  if (!WAITLIST_PERK) return null;
  return (
    <p className={`text-[14px] leading-[1.4] text-soft ${className}`}>
      <span className="font-semibold text-ink">Waitlist perk:</span>{" "}
      {WAITLIST_PERK.charAt(0).toLowerCase() + WAITLIST_PERK.slice(1)}
    </p>
  );
}

interface WaitlistFormProps {
  /** Set from outside to switch the audience (the "Apply as a brand" links). */
  requestedRole?: { role: WaitlistRole; seq: number } | null;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  /** "split" centres on small screens and starts from the left on large ones. */
  align?: "center" | "start" | "split";
  /** Light pulse through the scene while typing, a stronger one on success. */
  onPulse?: (strength: number) => void;
  /** Show the shopper / brand choice. Off in the hero, where the form stays short. */
  roleSwitch?: boolean;
  /** Told whenever the chosen audience changes, so the page can change its pitch. */
  onRoleChange?: (role: WaitlistRole) => void;
  /** Told once a signup has been saved. */
  onJoined?: (role: WaitlistRole) => void;
}

const ROLES: { id: WaitlistRole; label: string }[] = [
  { id: "SHOPPER", label: "I'm shopping" },
  { id: "BRAND", label: "I run a brand" },
];

export function WaitlistForm({
  requestedRole,
  inputRef,
  align = "center",
  onPulse,
  roleSwitch = true,
  onRoleChange,
  onJoined,
}: WaitlistFormProps) {
  const uid = useId();
  const phoneId = `${uid}-phone`;
  const brandId = `${uid}-brand`;
  const consentId = `${uid}-consent`;
  const errorId = `${uid}-error`;

  const [role, setRole] = useState<WaitlistRole>("SHOPPER");
  const [phone, setPhone] = useState("");
  const [brand, setBrand] = useState("");
  const [consent, setConsent] = useState(false);
  const [source, setSource] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<{ field: "phone" | "brand" | "consent" | "form"; text: string } | null>(null);
  const [joined, setJoined] = useState<WaitlistRole | null>(null);
  const [shareNote, setShareNote] = useState<string | null>(null);
  const lastPulse = useRef(0);
  const doneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!requestedRole) return;
    setRole(requestedRole.role);
    setError(null);
  }, [requestedRole]);

  useEffect(() => {
    onRoleChange?.(role);
  }, [role, onRoleChange]);

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const tag = qs.get("utm_source") || qs.get("ref") || qs.get("src");
    if (tag) setSource(tag.slice(0, 64));
  }, []);

  useEffect(() => {
    if (joined) doneRef.current?.focus();
  }, [joined]);

  const typingPulse = () => {
    const now = performance.now();
    if (now - lastPulse.current < 220) return;
    lastPulse.current = now;
    onPulse?.(0.22);
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const e164 = normalizePhoneToE164(phone);
    if (!e164) {
      setError({ field: "phone", text: "Enter a mobile number, like (555) 234-5678." });
      return;
    }
    if (role === "BRAND" && !brand.trim()) {
      setError({ field: "brand", text: "Add your brand's name so we know who to contact." });
      return;
    }
    if (!consent) {
      setError({ field: "consent", text: "Tick the box so we're allowed to text you." });
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: e164,
          role,
          brandHandle: role === "BRAND" ? brand.trim() : null,
          smsConsent: true,
          source,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError({
          field: "form",
          text:
            typeof data?.error === "string"
              ? data.error
              : "That didn't save. Try again in a moment.",
        });
        return;
      }
      setJoined(role);
      onJoined?.(role);
      onPulse?.(1);
    } catch {
      setError({ field: "form", text: "No connection. Check your signal and try again." });
    } finally {
      setBusy(false);
    }
  }

  function addToCalendar() {
    const ics = buildLaunchCalendarIcs(siteUrl());
    const url = URL.createObjectURL(
      new Blob([ics], { type: "text/calendar;charset=utf-8" })
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "t-minus-launch.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function share() {
    const url = siteUrl();
    const text = "T^minus: limited drops from independent brands, on one live clock. January 1.";
    try {
      if (navigator.share) {
        await navigator.share({ title: "T^minus", text, url });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setShareNote("Link copied");
        window.setTimeout(() => setShareNote(null), 2400);
      }
    } catch {
      // share sheet dismissed
    }
  }

  const alignCls =
    align === "start"
      ? "items-start text-left"
      : align === "split"
        ? "items-center text-center lg:items-start lg:text-left"
        : "items-center text-center";

  if (joined) {
    return (
      <div
        ref={doneRef}
        tabIndex={-1}
        role="status"
        className={`flex w-full max-w-[460px] flex-col rounded-[12px] border border-line bg-ground-deep/80 p-6 outline-none ${alignCls}`}
      >
        <p className="statement text-[30px] text-ink sm:text-[34px]">
          {joined === "BRAND" ? "Your brand is on the list." : "You're on the list."}
        </p>
        <p className="mt-3 max-w-[36ch] text-[15px] leading-[1.5] text-soft">
          {joined === "BRAND"
            ? "We'll text you before launch about setting up your first drop."
            : "We'll text you on January 1, the moment T^minus is live."}
        </p>
        <div className="mt-5 flex w-full flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={addToCalendar}
            className="h-12 flex-1 cursor-pointer rounded-[8px] bg-ink px-4 text-[15px] font-semibold text-ground transition-opacity duration-150 active:opacity-70"
          >
            Add January 1 to calendar
          </button>
          <button
            type="button"
            onClick={share}
            className="h-12 flex-1 cursor-pointer rounded-[8px] border border-line px-4 text-[15px] font-semibold text-ink transition-colors duration-150 [@media(hover:hover)]:hover:border-peri"
          >
            {shareNote ?? "Send to a friend"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className={`flex w-full max-w-[460px] flex-col ${alignCls}`}>
      {roleSwitch ? (
        <div
          role="radiogroup"
          aria-label="Who is joining"
          className="flex h-11 items-stretch gap-7"
        >
          {ROLES.map((opt) => {
            const on = role === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => {
                  setRole(opt.id);
                  setError(null);
                  onPulse?.(0.3);
                }}
                className={`relative flex cursor-pointer items-center px-0.5 text-[15px] transition-colors duration-150 ease-out ${
                  on ? "font-semibold text-ink" : "font-medium text-mute [@media(hover:hover)]:hover:text-ink"
                }`}
              >
                {opt.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0.5 bottom-[5px] h-[2px] bg-ink transition-opacity duration-150 ease-out ${
                    on ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </div>
      ) : null}

      <div className={`${roleSwitch ? "mt-2" : ""} flex w-full items-center gap-1.5 rounded-[12px] border border-line bg-ground-deep/80 p-1.5 transition-colors duration-150 focus-within:border-peri`}>
        <label htmlFor={phoneId} className="sr-only">
          Mobile number
        </label>
        <input
          ref={inputRef}
          id={phoneId}
          name="tel"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          aria-invalid={error?.field === "phone"}
          aria-describedby={error ? errorId : undefined}
          placeholder="Mobile number"
          value={phone}
          onChange={(e) => {
            setPhone(formatPhoneDisplay(e.target.value));
            if (error) setError(null);
            typingPulse();
          }}
          className="h-11 w-0 min-w-0 flex-1 bg-transparent px-3 text-[16px] text-ink outline-none placeholder:text-mute/80 sm:h-12 sm:text-[17px]"
        />
        <button
          type="submit"
          disabled={busy}
          className="h-11 shrink-0 cursor-pointer whitespace-nowrap rounded-[8px] bg-ink px-4 text-[13.5px] font-semibold uppercase tracking-[0.03em] text-accent transition-opacity duration-100 ease-out active:opacity-70 disabled:cursor-default disabled:opacity-60 sm:h-12 sm:px-6 sm:text-[14.5px]"
        >
          {busy ? "Joining" : "Join the waitlist"}
        </button>
      </div>

      <div
        className={`grid w-full transition-[grid-template-rows,opacity,margin] duration-200 ease-out ${
          role === "BRAND" ? "mt-2 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <label htmlFor={brandId} className="sr-only">
            Brand name
          </label>
          <input
            id={brandId}
            name="organization"
            type="text"
            autoComplete="organization"
            tabIndex={role === "BRAND" ? 0 : -1}
            aria-invalid={error?.field === "brand"}
            placeholder="Brand name"
            value={brand}
            maxLength={120}
            onChange={(e) => {
              setBrand(e.target.value);
              if (error) setError(null);
            }}
            className="h-12 w-full rounded-[12px] border border-line bg-ground-deep/80 px-4 text-[16px] text-ink outline-none transition-colors duration-150 placeholder:text-mute/80 focus:border-peri"
          />
        </div>
      </div>

      <div className="mt-3 flex w-full items-start gap-3 text-left">
        <span className="relative mt-[1px] inline-flex size-6 shrink-0">
          <input
            id={consentId}
            type="checkbox"
            checked={consent}
            aria-invalid={error?.field === "consent"}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (error) setError(null);
            }}
            className="peer absolute -inset-2.5 z-10 cursor-pointer opacity-0"
          />
          <span
            aria-hidden="true"
            className="flex size-6 items-center justify-center rounded-[6px] border border-peri/70 bg-ground-deep/80 transition-colors duration-150 peer-checked:border-accent peer-checked:bg-accent peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ice"
          >
            <svg
              viewBox="0 0 16 16"
              className={`size-3.5 text-ink transition-opacity duration-100 ${consent ? "opacity-100" : "opacity-0"}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3.2 8.4l3 3 6.6-7" />
            </svg>
          </span>
        </span>
        <label htmlFor={consentId} className="cursor-pointer text-[13px] leading-[1.45] text-soft/85">
          Text me {SMS_PROGRAM.brand} launch and drop alerts. Up to{" "}
          {SMS_PROGRAM.maxMessagesPerMonth} msgs/month. Msg &amp; data rates may
          apply. Reply STOP to cancel, HELP for help.{" "}
          <Link href="/privacy" className="py-3.5 text-ink underline decoration-peri/70 underline-offset-2">
            Privacy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="-mx-1 px-1 py-3.5 text-ink underline decoration-peri/70 underline-offset-2">
            Terms
          </Link>
          .
        </label>
      </div>

      <p id={errorId} role="alert" className={`min-h-0 text-[13.5px] font-medium text-ink ${error ? "mt-2.5" : ""}`}>
        {error?.text}
      </p>

    </form>
  );
}
