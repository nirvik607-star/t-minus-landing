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
import { AsciiMinusWordmark } from "@/components/landing/ascii-minus-wordmark";

interface LandingExperienceProps {
  skipIntro?: boolean;
}

const SYSTEM_CELLS = [
  {
    code: "DROP / 01",
    spec: "LIVE CLOCK",
    title: "Timed drops on a real clock.",
    body: "Every release opens on a shared countdown built for launch-second demand, so checkout stays steady when a piece goes live.",
  },
  {
    code: "FIT / 02",
    spec: "GARMENT SPEC",
    title: "Sizing matched to real measurements.",
    body: "Fit guidance calibrated to each piece's actual flat measurements and cut, so you choose the right size before a run sells through.",
  },
  {
    code: "LOYALTY / 03",
    spec: "BRAND TIERS",
    title: "Direct loyalty with the labels you wear.",
    body: "Collect pieces from independent brands to unlock tier status, early drop windows, and free shipping tied directly to that label.",
  },
  {
    code: "TRACK / 04",
    spec: "NATIVE FEED",
    title: "Drop-to-door order tracking.",
    body: "Follow every order from confirmation to doorstep inside T^minus, without digging through inbox threads or carrier links.",
  },
] as const;

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function HairlineTick({
  className = "",
  accent = false,
}: {
  className?: string;
  accent?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 flex size-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-[#040206] font-mono text-[11px] leading-none select-none ${
        accent ? "text-[#97DFFC]/85" : "text-[#858AE3]/65"
      } ${className}`}
    >
      +
    </span>
  );
}

export function LandingExperience({
  skipIntro = false,
}: LandingExperienceProps) {
  const [instantMode, setInstantMode] = useState(skipIntro);
  const [heroRevealed, setHeroRevealed] = useState(skipIntro);
  const [legalDoc, setLegalDoc] = useState<"privacy" | "terms" | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const runwayRef = useRef<HTMLDivElement | null>(null);
  const heroCopyRef = useRef<HTMLDivElement | null>(null);
  const countdownTrackRef = useRef<HTMLDivElement | null>(null);
  const preRimVeilRef = useRef<HTMLDivElement | null>(null);

  // Honor ?skipIntro=1 client-side as well (supports static exports cleanly)
  useEffect(() => {
    try {
      const qs = new URLSearchParams(window.location.search);
      if (qs.get("skipIntro") === "1") {
        setInstantMode(true);
        setHeroRevealed(true);
      }
    } catch {
      // ignore
    }
  }, []);

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

  // Frame-locked DOM sync for HorizonCountdown, hero lift-off fade, and Layer 20 curved pre-rim occlusion veil
  const handleHorizonSync = useCallback((state: HorizonSyncState) => {
    // 1) Sync HorizonCountdown physically inside the pure #000000 3D black hole core
    const countdownEl = countdownTrackRef.current;
    if (countdownEl) {
      countdownEl.style.opacity = state.heroResolved ? "1" : "0";
      countdownEl.style.transform = `translate3d(-50%, ${state.countdownCenterY.toFixed(1)}px, 0) translateY(-50%) scale(${state.countdownScale.toFixed(4)})`;
    }

    // 2) Smoothly lift & fade the sticky hero copy out as the camera orbits toward top-down polar
    const heroEl = heroCopyRef.current;
    if (heroEl) {
      const fadeOut = smoothstep(0.015, 0.22, state.pinProgress);
      const heroOpacity = 1 - fadeOut;
      const liftY = -fadeOut * 34;
      heroEl.style.opacity = heroOpacity.toFixed(4);
      heroEl.style.transform = `translate3d(0, ${liftY.toFixed(1)}px, 0)`;
      heroEl.style.pointerEvents = state.pinProgress > 0.14 ? "none" : "auto";
    }

    // 3) Layer 20 curved #040206 pre-rim occlusion veil synced to exact 3D-projected top dome rim
    //    Extended solid zone below domeEdgeY eliminates any faint text bleed under the top dome on narrow mobile viewports.
    const veilEl = preRimVeilRef.current;
    if (veilEl) {
      const veilAlpha = smoothstep(0.62, 0.84, state.pinProgress);
      veilEl.style.opacity = veilAlpha.toFixed(4);
      if (veilAlpha > 0.002 && state.domeRadiusPx > 10) {
        const isNarrow = state.viewportW < 640;
        const cx = state.domeCenterX.toFixed(1);
        const cy = state.domeCenterY.toFixed(1);
        const solidR = (state.domeRadiusPx + (isNarrow ? 58 : 48)).toFixed(1);
        const midR = (state.domeRadiusPx + (isNarrow ? 94 : 84)).toFixed(1);
        const fadeR = (state.domeRadiusPx + (isNarrow ? 148 : 134)).toFixed(1);
        const edgeSolid = Math.max(
          0,
          state.domeEdgeY + (isNarrow ? 68 : 46)
        ).toFixed(1);
        const edgeFade = Math.max(
          68,
          state.domeEdgeY + (isNarrow ? 138 : 122)
        ).toFixed(1);
        veilEl.style.backgroundImage = [
          `radial-gradient(circle at ${cx}px ${cy}px, #040206 0px, #040206 ${solidR}px, rgba(4, 2, 6, 0.94) ${midR}px, rgba(4, 2, 6, 0) ${fadeR}px)`,
          `linear-gradient(180deg, #040206 0px, #040206 ${edgeSolid}px, rgba(4, 2, 6, 0) ${edgeFade}px)`,
        ].join(", ");
      } else {
        veilEl.style.backgroundImage = "none";
      }
    }
  }, []);

  const handleReturnToWaitlist = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.setTimeout(() => {
      phoneInputRef.current?.focus({ preventScroll: true });
    }, 650);
  }, []);

  return (
    <div className="landing-typography relative min-h-[100dvh] w-full overflow-x-clip bg-[#040206] text-white selection:bg-[#613DC1]/55 selection:text-white">
      {/* Layer 0 (obsidian starfield + global cursor T-field) + Layer 30 (single persistent 3D WebGL2 Star -> Supernova -> Black Hole) */}
      <AsciiBlackholeCanvas
        onHeroReveal={setHeroRevealed}
        onHorizonSync={handleHorizonSync}
        runwayRef={runwayRef}
        skipIntro={instantMode}
      />

      {/* Layer 20: Curved #040206 pre-rim occlusion veil synced to exact 3D-projected top dome */}
      <div
        ref={preRimVeilRef}
        aria-hidden="true"
        style={{ opacity: 0 }}
        className="pointer-events-none fixed inset-0 z-20 will-change-[opacity]"
      />

      {/* Layer 40: Fixed Top-Left T^minus Wordmark with corner-feathered obsidian scrim for contrast over bright spiral arms */}
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-start px-5 transition-opacity duration-800 ease-out sm:h-20 sm:px-10 ${
          heroRevealed ? "opacity-100 delay-[720ms]" : "opacity-0"
        }`}
        style={instantMode ? { transitionDelay: "0ms" } : undefined}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 h-24 w-56 sm:h-28 sm:w-72"
          style={{
            background:
              "radial-gradient(ellipse 95% 88% at 0% 0%, rgba(4, 2, 6, 0.92) 0%, rgba(4, 2, 6, 0.64) 48%, rgba(4, 2, 6, 0) 100%)",
          }}
        />
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="pointer-events-auto relative z-10 text-white transition-opacity hover:opacity-85 focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:outline-none"
        >
          <TMinusWordmark className="[--wm-scale:1.05] sm:[--wm-scale:1.42]" />
        </a>
      </header>

      {/* Layer 40: Horizon Countdown physically bound inside the pure #000000 3D black hole core */}
      <div
        ref={countdownTrackRef}
        style={{
          opacity: instantMode ? 1 : 0,
          transform:
            "translate3d(-50%, calc(100dvh - 108px), 0) translateY(-50%)",
        }}
        className="pointer-events-none fixed top-0 left-1/2 z-40 transition-opacity duration-300 ease-out will-change-transform"
      >
        <HorizonCountdown />
      </div>

      {/* Layer 10: Main Content Flow (scrolls cleanly upward behind Layer 20 veil & Layer 30 3D horizon) */}
      <main id="top" className="relative z-10 w-full">
        {/* NATIVE CSS STICKY SCROLL RUNWAY (zero scroll-hijacking): Bottom Horizon -> Polar Spiral Dwell -> Top Dome */}
        <div
          ref={runwayRef}
          className="relative h-[250dvh] w-full sm:h-[300dvh]"
        >
          <section
            className={`sticky top-0 flex h-[100dvh] w-full flex-col items-center justify-center px-5 pt-14 pb-[28dvh] transition-opacity duration-500 ease-out sm:px-8 sm:pt-16 sm:pb-[28vh] ${
              heroRevealed ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div
              ref={heroCopyRef}
              className="flex w-full max-w-[640px] flex-col items-center text-center will-change-transform"
            >
              {/* Upright 3-Tier Architectural Lockup: Fashion. / ASCII MINUS / the Noise. */}
              <h1 className="flex w-full flex-col items-center">
                <span
                  style={{ fontSize: "clamp(1.7rem, 3.1vw, 2.8rem)" }}
                  className="font-display block leading-[0.98] font-medium tracking-[-0.035em] text-white"
                >
                  <AsciiRevealText
                    text="Fashion."
                    active={heroRevealed}
                    instant={instantMode}
                    origin="center"
                    delayMs={160}
                    durationMs={560}
                    glyphClassName="text-[#858AE3]"
                  />
                </span>

                <AsciiMinusWordmark
                  active={heroRevealed}
                  instant={instantMode}
                  delayMs={240}
                  durationMs={640}
                  className="my-1.5 sm:my-2"
                />

                <span
                  style={{ fontSize: "clamp(1.7rem, 3.1vw, 2.8rem)" }}
                  className="font-display block leading-[1.02] font-medium tracking-[-0.035em] text-[#E2DCF0]"
                >
                  <AsciiRevealText
                    text="the Noise."
                    active={heroRevealed}
                    instant={instantMode}
                    origin="left"
                    delayMs={340}
                    durationMs={580}
                    glyphClassName="text-[#858AE3]"
                  />
                </span>
              </h1>

              {/* Plain human subhead with single-word #97DFFC emphasis */}
              <p className="mt-3 max-w-[330px] text-[14px] leading-[1.48] font-normal text-[#D4CCE8]/84 sm:mt-4 sm:max-w-[460px] sm:text-[16px] sm:leading-[1.55]">
                <AsciiRevealText
                  text="The best clothes in the world rarely have the loudest "
                  active={heroRevealed}
                  instant={instantMode}
                  delayMs={500}
                  durationMs={700}
                  glyphClassName="text-[#613DC1]"
                />
                <span className="font-medium text-[#97DFFC]">
                  <AsciiRevealText
                    text="voice"
                    active={heroRevealed}
                    instant={instantMode}
                    delayMs={860}
                    durationMs={380}
                    glyphClassName="text-[#97DFFC]"
                  />
                </span>
                <AsciiRevealText
                  text="."
                  active={heroRevealed}
                  instant={instantMode}
                  delayMs={960}
                  durationMs={160}
                  glyphClassName="text-[#858AE3]"
                />
              </p>

              {/* Matte architectural switcher + input bar + 1-line consent */}
              <div
                className={`mt-5 w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:mt-6 ${
                  heroRevealed
                    ? "translate-y-0 opacity-100 delay-[700ms]"
                    : "translate-y-2 opacity-0"
                }`}
                style={instantMode ? { transitionDelay: "0ms" } : undefined}
              >
                <WaitlistBar
                  inputRef={phoneInputRef}
                  onOpenLegal={setLegalDoc}
                />
              </div>
            </div>
          </section>
        </div>

        {/* BELOW THE FOLD — Left-Anchored Architectural Grid Masking Cleanly Behind the Layer 20 Veil & Layer 30 Top Dome */}
        <div className="relative mx-auto w-full max-w-[960px] px-5 pt-28 sm:px-10 sm:pt-36">
          {/* BAND 1: Asymmetric Split Thesis Band (+ MANIFESTO) */}
          <section className="relative border-t border-[#858AE3]/20 pt-10 pb-20 sm:pt-14 sm:pb-28">
            <HairlineTick className="top-0 left-0" accent />
            <HairlineTick className="top-0 left-full" />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-7">
                <p className="font-mono text-[11px] font-normal tracking-[0.16em] text-[#858AE3] uppercase">
                  <span className="text-[#97DFFC]">+</span> MANIFESTO
                </p>

                <h2
                  style={{ fontSize: "clamp(1.85rem, 3.8vw, 3.05rem)" }}
                  className="font-display mt-5 leading-[1.06] font-medium tracking-[-0.035em] text-white"
                >
                  Independent labels shouldn&apos;t outspend algorithms to be
                  found.
                </h2>
              </div>

              <div className="flex flex-col justify-between md:col-span-5 md:pt-10">
                <p className="text-[15px] leading-[1.68] font-normal text-[#DCD4EE]/82 sm:text-[15.5px]">
                  Small clothing brands put months into fabric, cut, and finish,
                  only to disappear under paid feeds. T^minus gives independent
                  labels a dedicated home built around scheduled releases, so
                  buyers discover pieces for the garment itself.
                </p>

                <div className="mt-7 border-t border-[#858AE3]/16 pt-3.5 font-mono text-[10.5px] tracking-[0.14em] text-[#858AE3]/75 uppercase">
                  DEDICATED DROP PLATFORM · ZERO PAID FEED RANKING
                </div>
              </div>
            </div>
          </section>

          {/* BAND 2: Exposed 2x2 Hairline Specification Grid with + Intersection Ticks */}
          <section data-band="specification" className="relative">
            <div className="mb-4 flex items-center justify-between font-mono text-[11px] tracking-[0.16em] text-[#858AE3] uppercase">
              <span>
                <span className="text-[#97DFFC]">+</span> SPECIFICATION
              </span>
              <span className="text-[#858AE3]/70">01 · 04</span>
            </div>

            <div className="relative border-y border-[#858AE3]/20">
              {/* Perimeter + ticks */}
              <HairlineTick className="top-0 left-0" />
              <HairlineTick className="top-0 left-full" />
              <HairlineTick className="top-full left-0" />
              <HairlineTick className="top-full left-full" />

              {/* Desktop 2x2 structural rail + ticks + ice-blue center crosshair */}
              <HairlineTick className="top-0 left-1/2 hidden md:flex" />
              <HairlineTick className="top-full left-1/2 hidden md:flex" />
              <HairlineTick className="top-1/2 left-0 hidden md:flex" />
              <HairlineTick className="top-1/2 left-full hidden md:flex" />
              <HairlineTick className="top-1/2 left-1/2 hidden md:flex" accent />

              <div className="grid grid-cols-1 divide-y divide-[#858AE3]/18 md:grid-cols-2 md:divide-y-0">
                {SYSTEM_CELLS.map((cell, idx) => {
                  const isRightCol = idx % 2 === 1;
                  const isBottomRow = idx >= 2;
                  return (
                    <article
                      key={cell.code}
                      className={`relative flex flex-col justify-between py-8 sm:py-10 ${
                        isRightCol
                          ? "md:border-l md:border-[#858AE3]/20 md:pl-10"
                          : "md:pr-10"
                      } ${
                        isBottomRow ? "md:border-t md:border-[#858AE3]/20" : ""
                      }`}
                    >
                      {/* Mobile left-rail + tick on internal row dividers */}
                      {idx > 0 ? (
                        <HairlineTick className="top-0 left-0 md:hidden" />
                      ) : null}

                      <div className="flex items-center justify-between font-mono text-[10.5px] tracking-[0.16em] uppercase">
                        <span className="text-[#97DFFC]">{cell.code}</span>
                        <span className="text-[#858AE3]/65">{cell.spec}</span>
                      </div>

                      <div className="mt-6 sm:mt-7">
                        <h3 className="font-display text-[21px] leading-[1.18] font-medium tracking-[-0.025em] text-white sm:text-[24px]">
                          {cell.title}
                        </h3>
                        <p className="mt-3 max-w-[38ch] text-[14.5px] leading-[1.64] text-[#D0C8E4]/80 sm:text-[15px]">
                          {cell.body}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* BAND 3: Full-Width Rule-Framed Closing Launch Bar (border-b only; shares Band 2's bottom hairline) */}
          <section
            data-band="closing"
            className="relative border-b border-[#858AE3]/20 pt-14 pb-11 sm:pt-20 sm:pb-14"
          >
            <HairlineTick className="top-full left-0" />
            <HairlineTick className="top-full left-full" />

            <div className="flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono text-[10.5px] tracking-[0.18em] text-[#858AE3] uppercase sm:text-[11px]">
                  APP STORE V1.0 · JANUARY 1, 2027
                </p>
                <h2
                  style={{ fontSize: "clamp(1.85rem, 3.8vw, 2.85rem)" }}
                  className="font-display mt-3 leading-[1.06] font-medium tracking-[-0.035em] text-white"
                >
                  Be there at <span className="text-[#97DFFC]">T-zero.</span>
                </h2>
              </div>

              <AsciiCornerButton
                type="button"
                variant="primary"
                onClick={handleReturnToWaitlist}
                className="h-11 w-full shrink-0 px-6 text-[13.5px] sm:w-auto"
              >
                <span>Join the waitlist</span>
                <ArrowUp className="size-3.5" />
              </AsciiCornerButton>
            </div>
          </section>

          {/* Quiet Archival Monospace Footer */}
          <footer className="flex items-center justify-between py-8 font-mono text-[11px] tracking-[0.1em] text-[#858AE3]/80">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setLegalDoc("privacy")}
                className="cursor-pointer transition hover:text-white"
              >
                Privacy
              </button>
              <span className="text-[#858AE3]/45">·</span>
              <button
                type="button"
                onClick={() => setLegalDoc("terms")}
                className="cursor-pointer transition hover:text-white"
              >
                Terms
              </button>
            </div>

            <span>&copy; 2026 T^minus</span>
          </footer>
        </div>
      </main>

      {/* Matte Architectural Privacy & Terms Modal */}
      {legalDoc ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#040206]/90 px-5"
          onClick={() => setLegalDoc(null)}
        >
          <div
            className="relative w-full max-w-[480px] rounded-[6px] border border-[#858AE3]/24 bg-[#07050D] p-6 text-left sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.16em] text-[#858AE3] uppercase">
                  <span className="text-[#97DFFC]">+</span> LEGAL ·{" "}
                  {legalDoc === "privacy" ? "PRIVACY" : "TERMS"}
                </p>
                <h2
                  id="legal-modal-title"
                  className="font-display mt-2 text-[20px] font-medium tracking-[-0.025em] text-white"
                >
                  {legalDoc === "privacy"
                    ? "Privacy Policy"
                    : "SMS & Waitlist Terms"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setLegalDoc(null)}
                aria-label="Close"
                className="inline-flex size-8 cursor-pointer items-center justify-center rounded-[4px] border border-[#858AE3]/24 bg-[#040206] text-[#D0C7E6] transition hover:border-[#97DFFC]/70 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 border-t border-[#858AE3]/16 pt-4 text-[13.5px] leading-[1.64] text-[#D4CCE8]/84">
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
