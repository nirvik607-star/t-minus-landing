"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Check, Share2 } from "lucide-react";
import {
  buildLaunchCalendarIcs,
  formatPhoneDisplay,
  normalizePhoneToE164,
  type WaitlistRole,
} from "@/lib/waitlist";
import { AsciiCornerButton } from "@/components/landing/ascii-corner-button";

interface WaitlistBarProps {
  inputRef?: React.RefObject<HTMLInputElement | null>;
  onOpenLegal: (doc: "privacy" | "terms") => void;
  /** Optional external role sync triggered by below-the-fold Shopper / Brand CTAs */
  requestedRole?: { role: WaitlistRole; seq: number } | null;
}

export function WaitlistBar({
  inputRef,
  onOpenLegal,
  requestedRole,
}: WaitlistBarProps) {
  const [role, setRole] = useState<WaitlistRole>("SHOPPER");
  const [phoneInput, setPhoneInput] = useState("");
  const [brandHandle, setBrandHandle] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [sourceTag, setSourceTag] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedRole, setConfirmedRole] = useState<WaitlistRole | null>(null);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!requestedRole) return;
    setRole(requestedRole.role);
    setErrorMsg(null);
  }, [requestedRole]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm =
      params.get("utm_source") ||
      params.get("ref") ||
      params.get("src") ||
      null;
    if (utm) {
      setSourceTag(utm.slice(0, 64));
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    const e164 = normalizePhoneToE164(phoneInput);
    if (!e164) {
      setErrorMsg("Enter a valid mobile number (e.g. (555) 234-5678).");
      return;
    }

    if (!smsConsent) {
      setErrorMsg("Check the SMS consent box so we can text you on Jan 1.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: e164,
          role,
          brandHandle: role === "BRAND" ? brandHandle.trim() || null : null,
          smsConsent: true,
          source: sourceTag,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMsg(
          typeof data?.error === "string"
            ? data.error
            : "Something went wrong. Please try again."
        );
        return;
      }

      setConfirmedRole(role);
    } catch {
      setErrorMsg("Network error. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleSaveReminder() {
    const ics = buildLaunchCalendarIcs(`${window.location.origin}/landing`);
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "t-minus-launch-jan-1-2027.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function handleShare() {
    const shareUrl = `${window.location.origin}/landing`;
    const shareText =
      "T^minus launches Jan 1, 2027 · independent clothing drops on a live clock.";

    try {
      if (navigator.share) {
        await navigator.share({
          title: "T^minus",
          text: shareText,
          url: shareUrl,
        });
        setShareFeedback("Shared");
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setShareFeedback("Link copied");
      } else {
        setShareFeedback("Copy URL above");
      }
    } catch {
      // user dismissed share sheet
    } finally {
      window.setTimeout(() => setShareFeedback(null), 2600);
    }
  }

  if (confirmedRole) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mx-auto flex w-full max-w-[448px] flex-col items-center rounded-[6px] border border-[#858AE3]/24 bg-[#07050D] px-6 py-6 text-center"
      >
        <div className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-normal tracking-[0.16em] text-[#97DFFC] uppercase">
          <Check className="size-3.5 stroke-[2.2]" />
          <span>
            {confirmedRole === "BRAND"
              ? "+ BRAND SPOT SAVED"
              : "+ ALLOCATION SECURED"}
          </span>
        </div>

        <h3 className="mt-2.5 font-sans text-[21px] font-medium tracking-[-0.025em] text-white">
          {confirmedRole === "BRAND"
            ? "Brand request saved."
            : "You're in for Jan 1."}
        </h3>

        <p className="mt-2 max-w-[360px] text-[13.5px] leading-[1.52] text-[#D8D0EA]/80">
          {confirmedRole === "BRAND"
            ? "We'll text you before launch to set up your storefront and schedule an early drop."
            : "Watch your texts on January 1 when App Store v1.0 goes live."}
        </p>

        <div className="mt-5 flex w-full flex-col gap-2.5 sm:flex-row">
          <AsciiCornerButton
            type="button"
            variant="primary"
            onClick={handleSaveReminder}
            className="h-10 flex-1 px-4 text-[13px]"
          >
            <Calendar className="size-3.5" />
            <span>Save Jan 1 reminder</span>
          </AsciiCornerButton>

          <AsciiCornerButton
            type="button"
            variant="dark"
            onClick={handleShare}
            className="h-10 flex-1 px-4 text-[13px]"
          >
            <Share2 className="size-3.5" />
            <span>{shareFeedback ?? "Send to a friend"}</span>
          </AsciiCornerButton>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto flex w-full max-w-[448px] flex-col items-center"
    >
      {/* Flat matte architectural audience switcher (Geist sans) */}
      <div
        role="radiogroup"
        aria-label="Waitlist role"
        className="relative mb-2.5 inline-grid grid-cols-2 rounded-[6px] border border-[#858AE3]/24 bg-[#040206] p-[3px] sm:mb-3"
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute top-[3px] bottom-[3px] left-[3px] w-[calc(50%-3px)] rounded-[4px] bg-[#613DC1] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            role === "BRAND" ? "translate-x-full" : "translate-x-0"
          }`}
        />
        {(
          [
            { id: "SHOPPER" as const, label: "I'm shopping" },
            { id: "BRAND" as const, label: "I run a brand" },
          ] as const
        ).map((opt) => {
          const active = role === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => {
                setRole(opt.id);
                setErrorMsg(null);
              }}
              className={`relative z-10 cursor-pointer rounded-[4px] px-3.5 py-1 text-[12px] font-medium tracking-[-0.005em] transition-colors duration-150 ${
                active ? "text-white" : "text-[#C4BBE0]/76 hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Matte architectural single-row obsidian input bar + crisp flat white CTA */}
      <div className="flex w-full items-center gap-1.5 rounded-[6px] border border-[#858AE3]/24 bg-[#07050D] p-1.5 transition-colors duration-150 focus-within:border-[#97DFFC]/70">
        <label htmlFor="waitlist-phone" className="sr-only">
          Mobile phone number
        </label>
        <input
          ref={inputRef}
          id="waitlist-phone"
          name="tel"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          placeholder="+1 (555) 000-0000"
          value={phoneInput}
          onChange={(e) => {
            setPhoneInput(formatPhoneDisplay(e.target.value));
            if (errorMsg) setErrorMsg(null);
          }}
          className="h-9 min-w-0 flex-1 bg-transparent px-2.5 text-[14.5px] text-white placeholder:text-[#C4BBE0]/48 focus:outline-none sm:h-10 sm:px-3"
        />

        <AsciiCornerButton
          type="submit"
          variant="primary"
          disabled={submitting}
          className="h-9 shrink-0 px-3.5 text-[12.5px] sm:h-10 sm:px-5 sm:text-[13px]"
        >
          {submitting
            ? "Saving..."
            : role === "BRAND"
              ? "Join as a brand"
              : "Get early access"}
        </AsciiCornerButton>
      </div>

      {/* Smoothly revealed compact matte brand handle input when "I run a brand" is active */}
      <div
        className={`grid w-full transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          role === "BRAND"
            ? "mt-2 grid-rows-[1fr] opacity-100"
            : "pointer-events-none mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <label htmlFor="waitlist-brand" className="sr-only">
            Label or shop handle
          </label>
          <input
            id="waitlist-brand"
            name="organization"
            type="text"
            tabIndex={role === "BRAND" ? 0 : -1}
            placeholder="Label or shop handle (optional)"
            value={brandHandle}
            onChange={(e) => setBrandHandle(e.target.value)}
            maxLength={120}
            className="h-9 w-full rounded-[6px] border border-[#858AE3]/24 bg-[#07050D] px-3 text-[13.5px] text-white placeholder:text-[#C4BBE0]/48 transition-colors focus:border-[#97DFFC]/70 focus:outline-none sm:h-10 sm:px-3.5"
          />
        </div>
      </div>

      {/* Compact 1-line custom SMS consent with crisp middot */}
      <label className="mt-2.5 flex cursor-pointer items-center justify-center gap-2 text-center text-[11px] leading-[1.35] text-[#C4BBE0]/78 select-none sm:mt-3">
        <span className="relative inline-flex size-3.5 shrink-0 items-center justify-center">
          <input
            type="checkbox"
            checked={smsConsent}
            onChange={(e) => {
              setSmsConsent(e.target.checked);
              if (errorMsg) setErrorMsg(null);
            }}
            className="peer sr-only"
          />
          <span
            aria-hidden="true"
            className="flex size-3.5 items-center justify-center rounded-[3px] border border-[#858AE3]/45 bg-[#07050D] transition-colors duration-150 peer-checked:border-[#97DFFC] peer-checked:bg-[#613DC1] peer-focus-visible:ring-1 peer-focus-visible:ring-[#97DFFC]"
          >
            {smsConsent ? (
              <Check className="size-2.5 stroke-[2.8] text-white" />
            ) : null}
          </span>
        </span>
        <span>
          Text me launch &amp; drop alerts (STOP to opt out ·{" "}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onOpenLegal("privacy");
            }}
            className="cursor-pointer text-white/90 underline decoration-[#858AE3]/45 underline-offset-2 transition hover:text-[#97DFFC]"
          >
            Privacy
          </button>{" "}
          /{" "}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onOpenLegal("terms");
            }}
            className="cursor-pointer text-white/90 underline decoration-[#858AE3]/45 underline-offset-2 transition hover:text-[#97DFFC]"
          >
            Terms
          </button>
          )
        </span>
      </label>

      {errorMsg ? (
        <p
          role="alert"
          className="mt-2 text-center text-[12px] font-medium text-[#97DFFC]"
        >
          {errorMsg}
        </p>
      ) : null}
    </form>
  );
}
