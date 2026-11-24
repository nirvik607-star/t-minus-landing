"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, X } from "lucide-react";
import {
  AsciiBlackholeCanvas,
  type HorizonSyncState,
} from "@/components/landing/ascii-blackhole-canvas";
import { HorizonCountdown } from "@/components/landing/horizon-countdown";
import { WaitlistBar } from "@/components/landing/waitlist-bar";
import { TMinusWordmark } from "@/components/landing/t-minus-wordmark";
import { AsciiCornerButton } from "@/components/landing/ascii-corner-button";
import { AsciiRevealText } from "@/components/landing/ascii-reveal";

interface LandingExperienceProps {
  skipIntro?: boolean;
}

const EXPERIENCE_PILLARS = [
  {
    index: "01",
    title: "Live timed drops without site crashes.",
    body: "Every release runs on a real clock built to absorb launch-second traffic cleanly, without checkout stalls or cart ghosts.",
  },
  {
    index: "02",
    title: "AI sizing calibrated to real garment measurements.",
    body: "Matched against each piece's actual flat measurements and cut so you pick your fit with confidence before a drop sells through.",
  },
  {
    index: "03",
    title: "Brand-specific loyalty status with free shipping.",
    body: "Collect pieces from the labels you actually wear to unlock tier perks, early access windows, and free shipping directly with each brand.",
  },
  {
    index: "04",
    title: "Native drop-to-door shipment tracking.",
    body: "Follow every order from confirmation to doorstep right inside T^minus, without digging through inbox threads or third-party links.",
  },
] as const;

export function LandingExperience({
  skipIntro = false,
}: LandingExperienceProps) {
  const [heroRevealed, setHeroRevealed] = useState(skipIntro);
  const [legalDoc, setLegalDoc] = useState<"privacy" | "terms" | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const countdownTrackRef = useRef<HTMLDivElement | null>(null);

  // Keep document root painted in true obsidian #040206 so overscroll matches space cleanly
  useEffect(() => {
    const prevHtmlBg = document.documentElement.style.backgroundColor;
    const prevBodyBg = document.body.style.backgroundColor;
    document.documentElement.style.backgroundColor = "#040206";
    document.body.style.backgroundColor = "#040206";
    return () => {
      document.documentElement.style.backgroundColor = prevHtmlBg;
      document.body.style.backgroundColor = prevBodyBg;
    };
  }, []);

  // Close legal modal on Escape
  useEffect(() => {
    if (!legalDoc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLegalDoc(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [legalDoc]);

  // Frame-locked DOM transform syncing HorizonCountdown directly inside the pure #000000 core
  const handleHorizonSync = useCallback((state: HorizonSyncState) => {
    const el = countdownTrackRef.current;
    if (!el) return;
    const vis = Math.min(1, Math.max(0, (state.settleProgress - 0.5) / 0.5));
    el.style.opacity = String(vis);
    el.style.transform = `translate3d(-50%, ${state.countdownCenterY.toFixed(1)}px, 0) translateY(-50%) scale(${state.countdownScale.toFixed(4)})`;
  }, []);

  const handleReturnToWaitlist = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.setTimeout(() => {
      phoneInputRef.current?.focus({ preventScroll: true });
    }, 650);
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-clip bg-[#040206] text-white selection:bg-[#613DC1]/55 selection:text-white">
      {/* Layer 0 (obsidian starfield + global cursor T-field) + Layer 30 (single persistent WebGL2 black hole) */}
      <AsciiBlackholeCanvas
        onHeroReveal={setHeroRevealed}
        onHorizonSync={handleHorizonSync}
        skipIntro={skipIntro}
      />

      {/* Layer 40: Minimal Top-Left T^minus Wordmark (always crisp & unobstructed above the pinned dome) */}
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-start px-5 transition-opacity duration-900 ease-out sm:h-16 sm:px-10 ${
          heroRevealed ? "opacity-100" : "opacity-0"
        }`}
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="pointer-events-auto text-white transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:ring-[#97DFFC] focus-visible:outline-none"
        >
          <TMinusWordmark scale={0.95} />
        </a>
      </header>

      {/* Layer 40: Horizon Countdown physically bound inside the pure #000000 black hole core */}
      <div
        ref={countdownTrackRef}
        style={{
          opacity: skipIntro ? 1 : 0,
          transform: "translate3d(-50%, calc(100dvh - 108px), 0) translateY(-50%)",
        }}
        className="pointer-events-none fixed top-0 left-1/2 z-40 will-change-transform"
      >
        <HorizonCountdown revealed={heroRevealed} instant={skipIntro} />
      </div>

      {/* Layer 10: Main Content Flow (scrolls cleanly upward behind the Layer 30 live ASCII event horizon) */}
      <main id="top" className="relative z-10 w-full">
        {/* ABOVE-THE-FOLD HERO */}
        <section
          className={`relative flex min-h-[100dvh] w-full flex-col items-center justify-center px-5 pt-14 pb-[27vh] transition-opacity duration-700 ease-out sm:px-8 sm:pt-16 sm:pb-[29vh] ${
            heroRevealed ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="flex w-full max-w-[660px] flex-col items-center text-center">
            {/* Two-Line Centered Headline with Organic ASCII Materialization on Settle */}
            <h1
              style={{ fontSize: "clamp(2.55rem, 5.6vw, 4.25rem)" }}
              className="font-sans leading-[1.06] font-medium tracking-[-0.036em] text-white"
            >
              <span className="block">
                <AsciiRevealText
                  text="Fashion."
                  active={heroRevealed}
                  instant={skipIntro}
                  delayMs={140}
                  durationMs={640}
                  glyphClassName="text-[#858AE3]"
                />
              </span>
              <span className="block">
                <span className="font-serif text-[1.08em] font-medium italic tracking-[-0.02em] text-[#97DFFC]">
                  <AsciiRevealText
                    text="Minus"
                    active={heroRevealed}
                    instant={skipIntro}
                    delayMs={240}
                    durationMs={620}
                    glyphClassName="text-[#97DFFC]"
                  />
                </span>{" "}
                <AsciiRevealText
                  text="the Noise."
                  active={heroRevealed}
                  instant={skipIntro}
                  delayMs={320}
                  durationMs={680}
                  glyphClassName="text-[#858AE3]"
                />
              </span>
            </h1>

            {/* Locked Subhead with single-word #97DFFC emphasis & organic ASCII resolve */}
            <p className="mt-4 max-w-[460px] text-[15px] leading-[1.55] font-normal text-[#D4CCE8]/86 sm:text-[16.5px]">
              <AsciiRevealText
                text="The best clothes in the world rarely have the loudest "
                active={heroRevealed}
                instant={skipIntro}
                delayMs={360}
                durationMs={780}
                glyphClassName="text-[#613DC1]"
              />
              <span className="font-medium text-[#97DFFC]">
                <AsciiRevealText
                  text="voice"
                  active={heroRevealed}
                  instant={skipIntro}
                  delayMs={740}
                  durationMs={420}
                  glyphClassName="text-[#97DFFC]"
                />
              </span>
              <AsciiRevealText
                text="."
                active={heroRevealed}
                instant={skipIntro}
                delayMs={860}
                durationMs={180}
                glyphClassName="text-[#858AE3]"
              />
            </p>

            {/* Minimal Audience Switcher + Single-Row Frosted Obsidian Input Bar + 1-Line Consent */}
            <div
              className={`mt-7 w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:mt-8 ${
                heroRevealed
                  ? "translate-y-0 opacity-100 delay-[420ms]"
                  : "translate-y-2.5 opacity-0"
              }`}
              style={skipIntro ? { transitionDelay: "0ms" } : undefined}
            >
              <WaitlistBar
                inputRef={phoneInputRef}
                onOpenLegal={setLegalDoc}
              />
            </div>
          </div>
        </section>

        {/* BELOW THE FOLD — Calm Editorial Story Masking Cleanly Behind the Pinned Top Horizon */}
        <div className="relative w-full">
          {/* + THE MISSION */}
          <section className="relative mx-auto flex min-h-[76dvh] max-w-[660px] flex-col items-center justify-center px-6 py-28 text-center sm:py-36">
            <p className="font-mono text-[10.5px] font-medium tracking-[0.18em] text-[#858AE3] uppercase">
              <span className="text-[#613DC1]">+</span> THE MISSION
            </p>

            <h2
              style={{ fontSize: "clamp(2.05rem, 4.8vw, 3.4rem)" }}
              className="mt-5 font-sans leading-[1.09] font-medium tracking-[-0.035em] text-white"
            >
              Craft over{" "}
              <span className="font-serif text-[1.07em] font-medium italic tracking-[-0.015em] text-[#97DFFC]">
                ad spend.
              </span>
            </h2>

            <p className="mt-6 max-w-[520px] text-[15.5px] leading-[1.72] text-[#DCD4EE]/84 sm:text-[17px]">
              Independent labels shouldn&apos;t have to outspend algorithms just
              to be found. T^minus shifts fashion back to garment craft, giving
              underrated clothing brands luxury-grade drop infrastructure
              without needing a marketing budget.
            </p>
          </section>

          {/* + THE EXPERIENCE */}
          <section className="relative mx-auto max-w-[620px] px-6 py-24 text-center sm:py-32">
            <p className="font-mono text-[10.5px] font-medium tracking-[0.18em] text-[#858AE3] uppercase">
              <span className="text-[#613DC1]">+</span> THE EXPERIENCE
            </p>

            <h2
              style={{ fontSize: "clamp(2.05rem, 4.6vw, 3.25rem)" }}
              className="mt-5 font-sans leading-[1.09] font-medium tracking-[-0.035em] text-white"
            >
              Built for every{" "}
              <span className="font-serif text-[1.07em] font-medium italic tracking-[-0.015em] text-[#97DFFC]">
                drop.
              </span>
            </h2>

            <div className="mt-16 divide-y divide-[#858AE3]/16">
              {EXPERIENCE_PILLARS.map((item) => (
                <div key={item.index} className="py-10 first:pt-0 last:pb-0">
                  <span className="font-mono text-[10.5px] tracking-[0.18em] text-[#858AE3]">
                    {item.index}
                  </span>
                  <h3 className="mt-2.5 font-sans text-[20px] leading-[1.28] font-medium tracking-[-0.02em] text-white sm:text-[23px]">
                    {item.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-[480px] text-[14.5px] leading-[1.68] text-[#D0C7E6]/80 sm:text-[15.5px]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CLOSING ACTION — Dark Secondary Polarity (#613DC1 fill + crisp #97DFFC diagonal-X corner ASCII) */}
          <section className="relative mx-auto flex max-w-[540px] flex-col items-center px-6 pt-20 pb-28 text-center sm:pt-24 sm:pb-36">
            <p className="font-mono text-[10.5px] tracking-[0.18em] text-[#858AE3] uppercase">
              APP STORE V1.0 - JANUARY 1, 2027
            </p>

            <h2
              style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)" }}
              className="mt-4 font-sans leading-[1.12] font-medium tracking-[-0.032em] text-white"
            >
              Be there when the{" "}
              <span className="font-serif text-[1.06em] font-medium italic text-[#97DFFC]">
                clock
              </span>{" "}
              hits zero.
            </h2>

            <AsciiCornerButton
              type="button"
              variant="dark"
              shape="pill"
              onClick={handleReturnToWaitlist}
              className="mt-8 h-12 px-7 text-[14px]"
            >
              <span>Join the waitlist</span>
              <ArrowUp className="size-3.5" />
            </AsciiCornerButton>
          </section>

          {/* Quiet Minimal Footer (zero ·, zero :) */}
          <footer className="relative mx-auto flex max-w-[960px] items-center justify-between border-t border-[#858AE3]/14 px-6 py-7 font-mono text-[10.5px] tracking-[0.08em] text-[#858AE3]/80 sm:px-10">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setLegalDoc("privacy")}
                className="cursor-pointer transition hover:text-white"
              >
                Privacy
              </button>
              <span className="text-[#858AE3]/40">/</span>
              <button
                type="button"
                onClick={() => setLegalDoc("terms")}
                className="cursor-pointer transition hover:text-white"
              >
                Terms
              </button>
            </div>

            <span>© T^minus</span>
          </footer>
        </div>
      </main>

      {/* Privacy & Terms Modal (obsidian glass surface with Galaxy hairline border, zero · or :) */}
      {legalDoc ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#040206]/84 px-5 backdrop-blur-md"
          onClick={() => setLegalDoc(null)}
        >
          <div
            className="relative w-full max-w-[480px] rounded-2xl border border-[#858AE3]/28 bg-[#0B0612] p-6 text-left shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95)] sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4">
              <h2
                id="legal-modal-title"
                className="font-sans text-[17px] font-medium tracking-[-0.015em] text-white"
              >
                {legalDoc === "privacy" ? "Privacy Policy" : "SMS & Waitlist Terms"}
              </h2>
              <button
                type="button"
                onClick={() => setLegalDoc(null)}
                aria-label="Close"
                className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full border border-[#858AE3]/30 text-[#D0C7E6] transition hover:border-[#97DFFC]/50 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-[13.5px] leading-[1.62] text-[#D4CCE8]/86">
              {legalDoc === "privacy" ? (
                <>
                  <p>
                    T^minus collects your mobile phone number, your selected
                    waitlist role (shopper or brand), and an optional brand
                    handle solely to notify you about the January 1, 2027 App
                    Store v1.0 launch, early drop access, and brand onboarding.
                  </p>
                  <p>
                    We never sell, rent, or broker your phone number to third
                    parties. You can opt out at any time by replying STOP to any
                    message.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    By checking the SMS consent box and joining the T^minus
                    waitlist, you agree to receive occasional launch-day and
                    live drop text alerts at the mobile number provided. Consent
                    is not a condition of purchase.
                  </p>
                  <p>
                    Message and data rates may apply. Reply STOP to opt out at
                    any time or HELP for support.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
