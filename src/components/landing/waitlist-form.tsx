"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import {
  buildLaunchCalendarIcs,
  formatPhoneDisplay,
  normalizePhoneToE164,
  type WaitlistRole,
} from "@/lib/waitlist";
import { SMS_PROGRAM, WAITLIST_PERK, siteUrl } from "@/lib/launch";

interface WaitlistFormProps {
  /** Set from outside to switch the audience (the "Apply as a brand" links). */
  requestedRole?: { role: WaitlistRole; seq: number } | null;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  align?: "center" | "start";
  /** Light pulse through the scene while typing, a stronger one on success. */
  onPulse?: (strength: number) => void;
  /** Hide the perk line where space is short. */
  showPerk?: boolean;
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
  showPerk = true,
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
      const res = await fetch("/api/waitlist", {
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

  const alignCls = align === "start" ? "items-start text-left" : "items-center text-center";
  const consentAlign = align === "start" ? "" : "sm:mx-auto";

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
      <div
        role="radiogroup"
        aria-label="Who is joining"
        className="relative grid h-11 w-full max-w-[300px] grid-cols-2 rounded-[10px] border border-line bg-ground-deep/70 p-[3px]"
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-[3px] left-[3px] top-[3px] w-[calc(50%-3px)] rounded-[7px] bg-accent transition-transform duration-200 ease-out ${
            role === "BRAND" ? "translate-x-full" : "translate-x-0"
          }`}
        />
        {ROLES.map((opt) => (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={role === opt.id}
            onClick={() => {
              setRole(opt.id);
              setError(null);
              onPulse?.(0.3);
            }}
            className={`relative z-10 cursor-pointer rounded-[7px] text-[14px] font-medium transition-colors duration-150 ${
              role === opt.id ? "text-ink" : "text-mute [@media(hover:hover)]:hover:text-ink"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="mt-3 flex w-full items-center gap-1.5 rounded-[12px] border border-line bg-ground-deep/80 p-1.5 transition-colors duration-150 focus-within:border-peri">
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
          className="h-11 w-0 min-w-0 flex-1 bg-transparent px-3 text-[16px] text-ink outline-none placeholder:text-mute/80"
        />
        <button
          type="submit"
          disabled={busy}
          className="h-11 shrink-0 cursor-pointer whitespace-nowrap rounded-[8px] bg-ink px-4 text-[15px] font-semibold text-ground transition-opacity duration-150 active:opacity-70 disabled:cursor-default disabled:opacity-60 sm:px-5"
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

      <div className={`mt-3 flex w-full max-w-[430px] items-start gap-3 text-left ${consentAlign}`}>
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
        <label htmlFor={consentId} className="cursor-pointer text-[12.5px] leading-[1.45] text-mute">
          Text me {SMS_PROGRAM.brand} launch and drop alerts. Up to{" "}
          {SMS_PROGRAM.maxMessagesPerMonth} messages a month. Message and data
          rates may apply. Reply STOP to cancel, HELP for help.{" "}
          <Link href="/privacy" className="text-soft underline decoration-peri/60 underline-offset-2">
            Privacy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="text-soft underline decoration-peri/60 underline-offset-2">
            Terms
          </Link>
          .
        </label>
      </div>

      <p id={errorId} role="alert" className={`min-h-0 text-[13.5px] font-medium text-ice ${error ? "mt-2.5" : ""}`}>
        {error?.text}
      </p>

      {showPerk && WAITLIST_PERK && !error ? (
        <p className="mt-2.5 text-[13.5px] leading-[1.4] text-soft">
          Join before launch: {WAITLIST_PERK.charAt(0).toLowerCase() + WAITLIST_PERK.slice(1)}
        </p>
      ) : null}
    </form>
  );
}
