"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDownRight, X } from "lucide-react";
import {
  AsciiBlackholeCanvas,
  type HorizonSyncState,
} from "@/components/landing/ascii-blackhole-canvas";
import { HorizonCountdown } from "@/components/landing/horizon-countdown";
import { WaitlistBar } from "@/components/landing/waitlist-bar";
import { TMinusWordmark } from "@/components/landing/t-minus-wordmark";
import {
  AsciiHorizonRule,
  AsciiRevealText,
  ScrollAsciiReveal,
} from "@/components/landing/ascii-reveal";
import { AsciiMinusWordmark } from "@/components/landing/ascii-minus-wordmark";
import type { WaitlistRole } from "@/lib/waitlist";

interface LandingExperienceProps {
  skipIntro?: boolean;
}

interface IndexRowSpec {
  index: string;
  title: string;
  body: string;
  specTag: string;
}

const ARCHITECTURE_INDEX: readonly IndexRowSpec[] = [
  {
    index: "01",
    title: "Timed drops on a live clock.",
    body: "Every release opens on a shared countdown built for launch-second demand, so checkout stays steady instead of disappearing into an ad feed.",
    specTag: "LIVE CLOCK",
  },
  {
    index: "02",
    title: "Sizing matched to real garment measurements.",
    body: "Fit guidance built from each piece's actual flat specs and cut, so you pick the right size with confidence before a small run sells through.",
    specTag: "FLAT SPECS",
  },
  {
    index: "03",
    title: "Direct loyalty with the labels you wear.",
    body: "Collect pieces from independent brands to unlock tier status, early drop windows, and free shipping tied directly to that label.",
    specTag: "BRAND TIERS",
  },
  {
    index: "04",
    title: "Native drop-to-door tracking.",
    body: "Follow every order from confirmation to doorstep inside T^minus, without digging through inbox threads or scattered carrier links.",
    specTag: "ORDER FEED",
  },
] as const;

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

interface SyncDomCache {
  cdOpacity: string;
  cdTransform: string;
  stripOpacity: string;
  stripTransform: string;
  polarOpacity: string;
  polarTransform: string;
  heroOpacity: string;
  heroTransform: string;
  heroPointer: string;
  veilOpacity: string;
  veilBg: string;
}

export function LandingExperience({
  skipIntro = false,
}: LandingExperienceProps) {
  const [instantMode, setInstantMode] = useState(skipIntro);
  const [heroRevealed, setHeroRevealed] = useState(skipIntro);
  const [legalDoc, setLegalDoc] = useState<"privacy" | "terms" | null>(null);
  const [closingRequestedRole, setClosingRequestedRole] = useState<{
    role: WaitlistRole;
    seq: number;
  } | null>(null);

  const heroPhoneRef = useRef<HTMLInputElement | null>(null);
  const closingPhoneRef = useRef<HTMLInputElement | null>(null);
  const closingSectionRef = useRef<HTMLDivElement | null>(null);
  const runwayRef = useRef<HTMLDivElement | null>(null);
  const heroCopyRef = useRef<HTMLDivElement | null>(null);
  const countdownTrackRef = useRef<HTMLDivElement | null>(null);
  const countdownStripRef = useRef<HTMLDivElement | null>(null);
  const countdownPolarRef = useRef<HTMLDivElement | null>(null);
  const preRimVeilRef = useRef<HTMLDivElement | null>(null);
  const syncCacheRef = useRef<SyncDomCache>({
    cdOpacity: "",
    cdTransform: "",
    stripOpacity: "",
    stripTransform: "",
    polarOpacity: "",
    polarTransform: "",
    heroOpacity: "",
    heroTransform: "",
    heroPointer: "",
    veilOpacity: "",
    veilBg: "",
  });

  // Honor ?skipIntro=1 client-side cleanly (100% static-export compatible)
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

  // Dirty-checked 60fps DOM sync: zero style mutations or paint invalidations at idle!
  const handleHorizonSync = useCallback((state: HorizonSyncState) => {
    const cache = syncCacheRef.current;

    // 1) Center countdown container physically inside the `#000000` 3D black hole core
    const countdownEl = countdownTrackRef.current;
    if (countdownEl) {
      const cdAlpha = smoothstep(0.66, 0.98, state.settleProgress);
      const nextCdOpacity = cdAlpha.toFixed(3);
      const nextCdTransform = `translate3d(-50%, ${state.countdownCenterY.toFixed(1)}px, 0) translateY(-50%)`;
      if (cache.cdOpacity !== nextCdOpacity) {
        cache.cdOpacity = nextCdOpacity;
        countdownEl.style.opacity = nextCdOpacity;
      }
      if (cache.cdTransform !== nextCdTransform) {
        cache.cdTransform = nextCdTransform;
        countdownEl.style.transform = nextCdTransform;
      }
    }

    // 1a) Horizon Strip mode (bottom pin=0 & slim top dome pin=1)
    const stripEl = countdownStripRef.current;
    if (stripEl) {
      const nextStripOpacity = (
        1 - smoothstep(0.18, 0.48, state.polarFactor)
      ).toFixed(3);
      const nextStripTransform = `scale(${state.countdownScale.toFixed(4)})`;
      if (cache.stripOpacity !== nextStripOpacity) {
        cache.stripOpacity = nextStripOpacity;
        stripEl.style.opacity = nextStripOpacity;
      }
      if (cache.stripTransform !== nextStripTransform) {
        cache.stripTransform = nextStripTransform;
        stripEl.style.transform = nextStripTransform;
      }
    }

    // 1b) Space-Filling Polar Chronograph mode inside `#000000` polar void
    const polarEl = countdownPolarRef.current;
    if (polarEl) {
      const polarOpacity = smoothstep(0.32, 0.68, state.polarFactor);
      const nextPolarOpacity = polarOpacity.toFixed(3);
      if (cache.polarOpacity !== nextPolarOpacity) {
        cache.polarOpacity = nextPolarOpacity;
        polarEl.style.opacity = nextPolarOpacity;
      }
      if (polarOpacity > 0.001) {
        const isNarrow = state.viewportW < 640;
        const naturalW = isNarrow ? 264 : 410;
        const naturalH = isNarrow ? 172 : 260;
        const fitW =
          (state.polarDiameterPx * (isNarrow ? 0.75 : 0.82)) / naturalW;
        const fitH =
          (state.polarDiameterPx * (isNarrow ? 0.72 : 0.78)) / naturalH;
        const fitScale = Math.min(1.0, Math.max(0.55, Math.min(fitW, fitH)));
        const settleZoom =
          0.86 + 0.14 * smoothstep(0.28, 0.74, state.polarFactor);
        const polarScale = fitScale * settleZoom;
        const nextPolarTransform = `translate(-50%, -50%) scale(${polarScale.toFixed(4)})`;
        if (cache.polarTransform !== nextPolarTransform) {
          cache.polarTransform = nextPolarTransform;
          polarEl.style.transform = nextPolarTransform;
        }
      }
    }

    // 2) Smoothly lift & fade sticky hero copy as camera orbits toward top-down polar spiral
    const heroEl = heroCopyRef.current;
    if (heroEl) {
      const fadeOut = smoothstep(0.015, 0.22, state.pinProgress);
      const nextHeroOpacity = (1 - fadeOut).toFixed(3);
      const nextHeroTransform = `translate3d(0, ${(-fadeOut * 34).toFixed(1)}px, 0)`;
      const nextHeroPointer = state.pinProgress > 0.14 ? "none" : "auto";
      if (cache.heroOpacity !== nextHeroOpacity) {
        cache.heroOpacity = nextHeroOpacity;
        heroEl.style.opacity = nextHeroOpacity;
      }
      if (cache.heroTransform !== nextHeroTransform) {
        cache.heroTransform = nextHeroTransform;
        heroEl.style.transform = nextHeroTransform;
      }
      if (cache.heroPointer !== nextHeroPointer) {
        cache.heroPointer = nextHeroPointer;
        heroEl.style.pointerEvents = nextHeroPointer;
      }
    }

    // 3) Slim Layer 20 curved #040206 pre-rim occlusion veil strictly capped <= 122px
    const veilEl = preRimVeilRef.current;
    if (veilEl) {
      const veilAlpha = smoothstep(0.68, 0.88, state.pinProgress);
      const nextVeilOpacity = veilAlpha.toFixed(3);
      if (cache.veilOpacity !== nextVeilOpacity) {
        cache.veilOpacity = nextVeilOpacity;
        veilEl.style.opacity = nextVeilOpacity;
      }

      let nextVeilBg = "none";
      if (veilAlpha > 0.002 && state.domeRadiusPx > 10) {
        const isNarrow = state.viewportW < 640;
        const cx = state.domeCenterX.toFixed(0);
        const cy = state.domeCenterY.toFixed(0);
        const maxBottomY = 122;
        const maxR = Math.max(24, maxBottomY - state.domeCenterY);
        const solidR = Math.min(
          maxR - 22,
          state.domeRadiusPx + (isNarrow ? 16 : 14)
        ).toFixed(0);
        const midR = Math.min(
          maxR - 10,
          state.domeRadiusPx + (isNarrow ? 28 : 26)
        ).toFixed(0);
        const fadeR = Math.min(
          maxR,
          state.domeRadiusPx + (isNarrow ? 42 : 40)
        ).toFixed(0);
        const edgeSolid = Math.min(
          74,
          Math.max(24, state.domeEdgeY + 12)
        ).toFixed(0);
        const edgeFade = Math.min(
          118,
          Math.max(58, state.domeEdgeY + 38)
        ).toFixed(0);

        nextVeilBg = [
          `radial-gradient(circle at ${cx}px ${cy}px, #040206 0px, #040206 ${solidR}px, rgba(4, 2, 6, 0.90) ${midR}px, rgba(4, 2, 6, 0) ${fadeR}px)`,
          `linear-gradient(180deg, #040206 0px, #040206 ${edgeSolid}px, rgba(4, 2, 6, 0) ${edgeFade}px)`,
        ].join(", ");
      }
      if (cache.veilBg !== nextVeilBg) {
        cache.veilBg = nextVeilBg;
        veilEl.style.backgroundImage = nextVeilBg;
      }
    }
  }, []);

  const handleSelectClosingRole = useCallback((role: WaitlistRole) => {
    setClosingRequestedRole((prev) => ({ role, seq: (prev?.seq ?? 0) + 1 }));
    closingSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    window.setTimeout(() => {
      closingPhoneRef.current?.focus({ preventScroll: true });
    }, 320);
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-clip bg-[#040206] font-sans text-white selection:bg-[#613DC1]/55 selection:text-white">
      {/* Layer 0 (starfield) + Layer 30 (Crisp Volumetric ASCII 3D Black Hole) */}
      <AsciiBlackholeCanvas
        onHeroReveal={setHeroRevealed}
        onHorizonSync={handleHorizonSync}
        runwayRef={runwayRef}
        skipIntro={instantMode}
      />

      {/* Layer 20: Slim curved #040206 pre-rim occlusion veil (<= 122px total) */}
      <div
        ref={preRimVeilRef}
        aria-hidden="true"
        style={{ opacity: 0 }}
        className="pointer-events-none fixed inset-0 z-20 will-change-[opacity]"
      />

      {/* Layer 40: Fixed Top-Left Iconic T^minus Wordmark (Italic Newsreader T + upright ^minus) */}
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-start px-5 transition-opacity duration-500 ease-out sm:h-[76px] sm:px-10 ${
          heroRevealed ? "opacity-100 delay-[260ms]" : "opacity-0"
        }`}
        style={instantMode ? { transitionDelay: "0ms" } : undefined}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 h-20 w-52 sm:h-24 sm:w-64"
          style={{
            background:
              "radial-gradient(ellipse 95% 88% at 0% 0%, rgba(4, 2, 6, 0.92) 0%, rgba(4, 2, 6, 0.62) 48%, rgba(4, 2, 6, 0) 100%)",
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
          <TMinusWordmark className="[--wm-scale:1.05] sm:[--wm-scale:1.38]" />
        </a>
      </header>

      {/* Layer 40: Dual-Mode Horizon & Space-Filling Polar Chronograph physically bound inside #000000 core */}
      <div
        ref={countdownTrackRef}
        style={{
          opacity: instantMode ? 1 : 0,
          transform:
            "translate3d(-50%, calc(100dvh - 96px), 0) translateY(-50%)",
        }}
        className="pointer-events-none fixed top-0 left-1/2 z-40 will-change-transform"
      >
        <HorizonCountdown
          stripRef={countdownStripRef}
          polarRef={countdownPolarRef}
        />
      </div>

      {/* Main Flow (Hero sits at z-[35] above shader while below-fold scrolls at z-10 beneath slim top dome) */}
      <main id="top" className="relative w-full">
        {/* NATIVE CSS STICKY SCROLL RUNWAY: Bottom Horizon -> Polar Void -> Slim Top Dome */}
        <div
          ref={runwayRef}
          className="relative h-[255dvh] w-full sm:h-[305dvh]"
        >
          <section
            data-section="hero"
            className={`sticky top-0 z-[35] flex h-[100dvh] w-full flex-col items-center justify-center px-5 pt-16 pb-[23dvh] transition-opacity duration-400 ease-out sm:px-8 sm:pt-[76px] sm:pb-[25vh] ${
              heroRevealed ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div
              ref={heroCopyRef}
              className="flex w-full max-w-[660px] flex-col items-center text-center will-change-transform"
            >
              {/* Balanced Sculptural Lockup: Fashion. / MINUS / the Noise. */}
              <h1 className="flex w-full flex-col items-center">
                <span
                  style={{ fontSize: "clamp(2.05rem, 4.1vw, 3.45rem)" }}
                  className="block font-heading leading-[1.0] font-semibold tracking-[-0.035em] text-white"
                >
                  <AsciiRevealText
                    text="Fashion."
                    active={heroRevealed}
                    instant={instantMode}
                    origin="left"
                    delayMs={40}
                    durationMs={540}
                  />
                </span>

                <AsciiMinusWordmark
                  active={heroRevealed}
                  instant={instantMode}
                  delayMs={110}
                  durationMs={620}
                  className="my-2 sm:my-2.5"
                />

                <span
                  style={{ fontSize: "clamp(2.05rem, 4.1vw, 3.45rem)" }}
                  className="block font-heading leading-[1.02] font-semibold tracking-[-0.035em] text-[#EAE5F5]"
                >
                  <AsciiRevealText
                    text="the Noise."
                    active={heroRevealed}
                    instant={instantMode}
                    origin="left"
                    delayMs={200}
                    durationMs={560}
                  />
                </span>
              </h1>

              {/* Plain human subhead (optical rise — no overlapping body-text ASCII scramble) */}
              <p
                className={`mt-5 max-w-[330px] font-sans text-[14.5px] leading-[1.52] font-normal text-[#DCD5EE] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:mt-6 sm:max-w-[460px] sm:text-[16px] sm:leading-[1.55] ${
                  heroRevealed
                    ? "translate-y-0 opacity-100 delay-[260ms]"
                    : "translate-y-2 opacity-0"
                }`}
                style={instantMode ? { transitionDelay: "0ms" } : undefined}
              >
                The best clothes in the world rarely have the loudest{" "}
                <span className="font-medium text-[#97DFFC]">voice</span>.
              </p>

              {/* Matte architectural switcher + input bar + 1-line consent (Waitlist offer OFF) */}
              <div
                data-hero-waitlist="true"
                className={`mt-6 w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:mt-7 ${
                  heroRevealed
                    ? "translate-y-0 opacity-100 delay-[300ms]"
                    : "translate-y-2 opacity-0"
                }`}
                style={instantMode ? { transitionDelay: "0ms" } : undefined}
              >
                <WaitlistBar
                  idPrefix="hero-waitlist"
                  inputRef={heroPhoneRef}
                  onOpenLegal={setLegalDoc}
                />
              </div>
            </div>
          </section>
        </div>

        {/* ======================================================================== */}
        {/* BELOW THE FOLD — BALANCED 3-BAND ARCHITECTURAL LEDGER (Layer 10)        */}
        {/* ======================================================================== */}
        <div
          data-below-fold="true"
          className="relative z-10 mx-auto w-full max-w-[1080px] px-5 pt-16 sm:px-10 sm:pt-24"
        >
          {/* BAND 1: Balanced 12-Col Asymmetric Premise */}
          <section data-band="premise" className="pb-16 sm:pb-24">
            <p className="font-mono text-[11px] font-medium tracking-[0.18em] text-[#A2A7F0] uppercase">
              <span className="text-[#97DFFC]">+</span>{" "}
              <ScrollAsciiReveal
                text="PREMISE"
                tier="telemetry"
                instant={instantMode}
              />
            </p>

            <div className="mt-5 grid grid-cols-1 gap-8 md:mt-6 md:grid-cols-12 md:items-end md:gap-12">
              <div className="md:col-span-7">
                <h2
                  style={{ fontSize: "clamp(1.92rem, 4.3vw, 3.6rem)" }}
                  className="max-w-[18ch] font-heading leading-[1.03] font-semibold tracking-[-0.036em] text-white"
                >
                  <ScrollAsciiReveal
                    text="Great independent labels shouldn't have to buy attention to be found."
                    tier="headline"
                    instant={instantMode}
                  />
                </h2>
              </div>

              <div className="flex flex-col justify-end md:col-span-5">
                <ScrollAsciiReveal
                  tier="prose"
                  instant={instantMode}
                  delayMs={120}
                >
                  <p className="font-sans text-[15.5px] leading-[1.68] font-normal text-[#DDD6EF] sm:text-[16px]">
                    Small clothing brands put months into fabric, cut, and
                    finish, only to disappear under paid feeds. T^minus gives
                    independent labels a dedicated home built around scheduled
                    releases, so buyers discover pieces for the garment itself.
                  </p>
                </ScrollAsciiReveal>

                <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-[#858AE3]/24 pt-5 font-mono text-[10.5px] tracking-[0.14em] uppercase">
                  <div>
                    <dt className="text-[#9EA3EE]">FORMAT</dt>
                    <dd className="mt-1 text-white">SCHEDULED DROPS</dd>
                  </div>
                  <div>
                    <dt className="text-[#9EA3EE]">FEED RANKING</dt>
                    <dd className="mt-1 text-white">ZERO PAID ADS</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="mt-14 sm:mt-20">
              <AsciiHorizonRule instant={instantMode} />
            </div>
          </section>

          {/* BAND 2 (4B): Pure 01–04 Editorial Architectural Index */}
          <section data-band="architecture" className="pb-16 sm:pb-24">
            <div className="mb-8 flex items-center justify-between font-mono text-[11px] font-medium tracking-[0.18em] text-[#A2A7F0] uppercase sm:mb-10">
              <span>
                <span className="text-[#97DFFC]">+</span>{" "}
                <ScrollAsciiReveal
                  text="ARCHITECTURE"
                  tier="telemetry"
                  instant={instantMode}
                />
              </span>
              <span className="text-[#A2A7F0]">01 — 04</span>
            </div>

            <ol className="divide-y divide-[#858AE3]/22 border-y border-[#858AE3]/22">
              {ARCHITECTURE_INDEX.map((item, idx) => (
                <li
                  key={item.index}
                  className="group relative py-7 transition-colors duration-200 [@media(hover:hover)]:hover:bg-[#613DC1]/[0.06] sm:px-3 sm:py-9"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-0 hidden -translate-y-1/2 font-mono text-[11px] text-[#97DFFC] opacity-0 transition-opacity duration-200 [@media(hover:hover)]:group-hover:opacity-100 sm:block"
                  >
                    +
                  </span>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-baseline md:gap-8">
                    <div className="flex items-center justify-between md:col-span-1 md:block">
                      <span className="font-mono text-[12.5px] font-medium tracking-[0.16em] text-[#97DFFC] tabular-nums">
                        {item.index}
                      </span>
                      <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-[#A2A7F0] uppercase md:hidden">
                        {item.specTag}
                      </span>
                    </div>

                    <div className="md:col-span-4">
                      <h3 className="font-heading text-[21px] leading-[1.18] font-semibold tracking-[-0.025em] text-white sm:text-[23px]">
                        <ScrollAsciiReveal
                          text={item.title}
                          tier="headline"
                          instant={instantMode}
                          delayMs={idx * 60}
                        />
                      </h3>
                    </div>

                    <div className="md:col-span-5">
                      <ScrollAsciiReveal
                        tier="prose"
                        instant={instantMode}
                        delayMs={80 + idx * 50}
                      >
                        <p className="max-w-[44ch] font-sans text-[15px] leading-[1.64] text-[#D8D1EC]">
                          {item.body}
                        </p>
                      </ScrollAsciiReveal>
                    </div>

                    <div className="hidden text-right md:col-span-2 md:block">
                      <span className="font-mono text-[10.5px] font-medium tracking-[0.16em] text-[#A2A7F0] uppercase transition-colors duration-200 [@media(hover:hover)]:group-hover:text-[#97DFFC]">
                        {item.specTag}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* BAND 3 (6A): Shopper / Brand Distinction + "Be there at T-zero." + Inline WaitlistBar */}
          <section data-band="closing" className="pb-12 sm:pb-16">
            <div className="grid grid-cols-1 gap-10 pb-14 md:grid-cols-2 md:gap-0 md:divide-x md:divide-[#858AE3]/22 sm:pb-16">
              {/* For Shoppers */}
              <div className="flex flex-col justify-between md:pr-12 lg:pr-16">
                <div>
                  <p className="font-mono text-[11px] font-medium tracking-[0.18em] text-[#A2A7F0] uppercase">
                    <span className="text-[#97DFFC]">+</span>{" "}
                    <ScrollAsciiReveal
                      text="FOR SHOPPERS"
                      tier="telemetry"
                      instant={instantMode}
                    />
                  </p>
                  <h3 className="mt-3.5 font-heading text-[24px] leading-[1.15] font-semibold tracking-[-0.03em] text-white sm:text-[28px]">
                    <ScrollAsciiReveal
                      text="Find drops worth waiting for."
                      tier="headline"
                      instant={instantMode}
                    />
                  </h3>
                  <ScrollAsciiReveal
                    tier="prose"
                    instant={instantMode}
                    delayMs={80}
                  >
                    <p className="mt-3.5 max-w-[42ch] font-sans text-[15px] leading-[1.66] text-[#D8D1EC]">
                      Discover independent releases on a live clock, check true
                      garment measurements before launch, and get first access
                      without scrolling past ads.
                    </p>
                  </ScrollAsciiReveal>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectClosingRole("SHOPPER")}
                  className="mt-6 inline-flex w-fit cursor-pointer items-center gap-1.5 font-mono text-[11.5px] font-medium tracking-[0.14em] text-[#97DFFC] uppercase transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:outline-none"
                >
                  <span>Join as a shopper</span>
                  <ArrowDownRight className="size-3.5" />
                </button>
              </div>

              {/* For Independent Labels */}
              <div className="flex flex-col justify-between border-t border-[#858AE3]/20 pt-9 md:border-t-0 md:pt-0 md:pl-12 lg:pl-16">
                <div>
                  <p className="font-mono text-[11px] font-medium tracking-[0.18em] text-[#A2A7F0] uppercase">
                    <span className="text-[#97DFFC]">+</span>{" "}
                    <ScrollAsciiReveal
                      text="FOR INDEPENDENT LABELS"
                      tier="telemetry"
                      instant={instantMode}
                    />
                  </p>
                  <h3 className="mt-3.5 font-heading text-[24px] leading-[1.15] font-semibold tracking-[-0.03em] text-white sm:text-[28px]">
                    <ScrollAsciiReveal
                      text="Launch on your own clock."
                      tier="headline"
                      instant={instantMode}
                    />
                  </h3>
                  <ScrollAsciiReveal
                    tier="prose"
                    instant={instantMode}
                    delayMs={80}
                  >
                    <p className="mt-3.5 max-w-[42ch] font-sans text-[15px] leading-[1.66] text-[#D8D1EC]">
                      Keep your own identity, story, and pricing. Turn every
                      collection into a scheduled release event and build direct
                      repeat buyers without paying ad platforms.
                    </p>
                  </ScrollAsciiReveal>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectClosingRole("BRAND")}
                  className="mt-6 inline-flex w-fit cursor-pointer items-center gap-1.5 font-mono text-[11.5px] font-medium tracking-[0.14em] text-[#97DFFC] uppercase transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:outline-none"
                >
                  <span>Apply as a brand</span>
                  <ArrowDownRight className="size-3.5" />
                </button>
              </div>
            </div>

            <AsciiHorizonRule
              variant="arch"
              instant={instantMode}
              className="mb-10 sm:mb-12"
            />

            {/* Inline T-Zero Closing Conversion Split */}
            <div
              ref={closingSectionRef}
              className="grid grid-cols-1 gap-8 border-b border-[#858AE3]/22 pb-12 md:grid-cols-12 md:items-center md:gap-10 sm:pb-14"
            >
              <div className="md:col-span-6">
                <p className="font-mono text-[11px] font-medium tracking-[0.18em] text-[#A2A7F0] uppercase">
                  APP STORE V1.0 · JANUARY 1, 2027
                </p>
                <h2
                  style={{ fontSize: "clamp(2.1rem, 4.1vw, 3.25rem)" }}
                  className="mt-3 font-heading leading-[1.04] font-semibold tracking-[-0.035em] text-white"
                >
                  <ScrollAsciiReveal
                    text="Be there at "
                    tier="headline"
                    instant={instantMode}
                  />
                  <span className="text-[#97DFFC]">
                    <ScrollAsciiReveal
                      text="T-zero."
                      tier="headline"
                      instant={instantMode}
                      delayMs={180}
                    />
                  </span>
                </h2>
                <p className="mt-3.5 max-w-[38ch] font-sans text-[15px] leading-[1.62] text-[#D8D1EC]">
                  Drop your mobile number for launch-day access and scheduled
                  release alerts.
                </p>
              </div>

              <div
                data-closing-waitlist="true"
                className="flex md:col-span-6 md:justify-end"
              >
                <WaitlistBar
                  idPrefix="closing-waitlist"
                  inputRef={closingPhoneRef}
                  onOpenLegal={setLegalDoc}
                  requestedRole={closingRequestedRole}
                  align="left"
                />
              </div>
            </div>
          </section>

          {/* Quiet Archival IBM Plex Mono Footer */}
          <footer className="flex items-center justify-between py-7 font-mono text-[11px] font-medium tracking-[0.1em] text-[#A2A7F0]">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setLegalDoc("privacy")}
                className="cursor-pointer transition hover:text-white"
              >
                Privacy
              </button>
              <span className="text-[#858AE3]/55">·</span>
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
            className="relative w-full max-w-[480px] rounded-[6px] border border-[#858AE3]/30 bg-[#07050D] p-6 text-left sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10.5px] font-medium tracking-[0.16em] text-[#A2A7F0] uppercase">
                  <span className="text-[#97DFFC]">+</span> LEGAL ·{" "}
                  {legalDoc === "privacy" ? "PRIVACY" : "TERMS"}
                </p>
                <h2
                  id="legal-modal-title"
                  className="mt-2 font-heading text-[21px] font-semibold tracking-[-0.025em] text-white"
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
                className="inline-flex size-8 cursor-pointer items-center justify-center rounded-[4px] border border-[#858AE3]/30 bg-[#040206] text-[#DCD5EE] transition hover:border-[#97DFFC]/75 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 border-t border-[#858AE3]/20 pt-4 text-[13.5px] leading-[1.64] text-[#DCD5EE]">
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
