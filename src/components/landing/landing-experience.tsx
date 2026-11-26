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
import {
  AsciiHorizonRule,
  AsciiRevealText,
  ScrollAsciiReveal,
} from "@/components/landing/ascii-reveal";
import { AsciiMinusWordmark } from "@/components/landing/ascii-minus-wordmark";
import {
  AsciiDropSpecimen,
  type DropChapter,
} from "@/components/landing/ascii-drop-specimen";
import type { WaitlistRole } from "@/lib/waitlist";

interface LandingExperienceProps {
  skipIntro?: boolean;
}

interface DropChapterSpec {
  id: DropChapter;
  index: string;
  shortLabel: string;
  title: string;
  body: string;
}

const DROP_CHAPTERS: readonly DropChapterSpec[] = [
  {
    id: 0,
    index: "01",
    shortLabel: "01 Clock",
    title: "Timed drops on a live clock.",
    body: "Every release opens on a shared countdown built for launch-second demand, so checkout stays steady when a piece goes live instead of disappearing into a feed.",
  },
  {
    id: 1,
    index: "02",
    shortLabel: "02 Fit",
    title: "Sizing matched to real garment measurements.",
    body: "Fit guidance built from each piece's actual flat specs and cut, so you pick the right size with confidence before a small run sells through.",
  },
  {
    id: 2,
    index: "03",
    shortLabel: "03 Loyalty",
    title: "Direct loyalty with the labels you wear.",
    body: "Collect pieces from independent brands to unlock tier status, early drop windows, and free shipping tied directly to that label.",
  },
  {
    id: 3,
    index: "04",
    shortLabel: "04 Track",
    title: "Native drop-to-door tracking.",
    body: "Follow every order from confirmation to doorstep inside T^minus, without digging through inbox threads or scattered carrier links.",
  },
] as const;

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export function LandingExperience({
  skipIntro = false,
}: LandingExperienceProps) {
  const [instantMode, setInstantMode] = useState(skipIntro);
  const [heroRevealed, setHeroRevealed] = useState(skipIntro);
  const [legalDoc, setLegalDoc] = useState<"privacy" | "terms" | null>(null);
  const [activeChapter, setActiveChapter] = useState<DropChapter>(0);
  const [requestedRole, setRequestedRole] = useState<{
    role: WaitlistRole;
    seq: number;
  } | null>(null);

  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const runwayRef = useRef<HTMLDivElement | null>(null);
  const heroCopyRef = useRef<HTMLDivElement | null>(null);
  const countdownTrackRef = useRef<HTMLDivElement | null>(null);
  const countdownStripRef = useRef<HTMLDivElement | null>(null);
  const countdownPolarRef = useRef<HTMLDivElement | null>(null);
  const preRimVeilRef = useRef<HTMLDivElement | null>(null);
  const chapterRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const manualChapterLockUntilRef = useRef<number>(0);

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

  // Desktop scroll-linked chapter activation in Band 2 (paused briefly after explicit user click)
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (window.innerWidth < 768) return;
        if (performance.now() < manualChapterLockUntilRef.current) return;
        let bestId: DropChapter | null = null;
        let bestRatio = 0;
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            const raw = entry.target.getAttribute("data-chapter-id");
            const parsed = raw !== null ? Number(raw) : NaN;
            if (parsed >= 0 && parsed <= 3) {
              bestId = parsed as DropChapter;
              bestRatio = entry.intersectionRatio;
            }
          }
        }
        if (bestId !== null) {
          setActiveChapter(bestId);
        }
      },
      {
        rootMargin: "-30% 0px -42% 0px",
        threshold: [0.2, 0.5, 0.8],
      }
    );

    for (const el of chapterRefs.current) {
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);

  const handleSelectChapter = useCallback((id: DropChapter) => {
    manualChapterLockUntilRef.current = performance.now() + 1800;
    setActiveChapter(id);
  }, []);

  // Frame-locked 60fps DOM sync for dual-mode HorizonCountdown, hero lift-off, and Layer 20 curved pre-rim veil
  const handleHorizonSync = useCallback((state: HorizonSyncState) => {
    // 1) Center countdown container physically inside the `#000000` 3D black hole core (zero outer scaling)
    const countdownEl = countdownTrackRef.current;
    if (countdownEl) {
      countdownEl.style.opacity = state.heroResolved ? "1" : "0";
      countdownEl.style.transform = `translate3d(-50%, ${state.countdownCenterY.toFixed(1)}px, 0) translateY(-50%)`;
    }

    // 1a) Horizon Strip mode (bottom pin=0 & top dome pin=1 — exact proportions preserved, scale <= 1.0)
    const stripEl = countdownStripRef.current;
    if (stripEl) {
      const stripOpacity = 1 - smoothstep(0.18, 0.48, state.polarFactor);
      stripEl.style.opacity = stripOpacity.toFixed(4);
      stripEl.style.transform = `scale(${state.countdownScale.toFixed(4)})`;
    }

    // 1b) Space-Filling Polar Chronograph mode (fills ~78% desktop / ~75% mobile of `#000000` polar void with clean photon-ring margin)
    const polarEl = countdownPolarRef.current;
    if (polarEl) {
      const polarOpacity = smoothstep(0.32, 0.68, state.polarFactor);
      const isNarrow = state.viewportW < 640;
      const naturalW = isNarrow ? 264 : 410;
      const naturalH = isNarrow ? 172 : 260;
      const fitW = (state.polarDiameterPx * (isNarrow ? 0.75 : 0.82)) / naturalW;
      const fitH = (state.polarDiameterPx * (isNarrow ? 0.72 : 0.78)) / naturalH;
      const fitScale = Math.min(1.0, Math.max(0.55, Math.min(fitW, fitH)));
      const settleZoom = 0.86 + 0.14 * smoothstep(0.28, 0.74, state.polarFactor);
      const polarScale = fitScale * settleZoom;

      polarEl.style.opacity = polarOpacity.toFixed(4);
      polarEl.style.transform = `translate(-50%, -50%) scale(${polarScale.toFixed(4)})`;
    }

    // 2) Smoothly lift & fade sticky hero copy as camera orbits toward top-down polar spiral
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

  const handleJumpToWaitlist = useCallback((role?: WaitlistRole) => {
    if (role) {
      setRequestedRole((prev) => ({ role, seq: (prev?.seq ?? 0) + 1 }));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.setTimeout(() => {
      phoneInputRef.current?.focus({ preventScroll: true });
    }, 650);
  }, []);

  const mobileChapter = DROP_CHAPTERS[activeChapter];

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-clip bg-[#040206] font-sans text-white selection:bg-[#613DC1]/55 selection:text-white">
      {/* Layer 0 (native-DPR obsidian starfield + cursor aura) + Layer 30 (1:1 pure-ASCII 3D Black Hole + UTC heartbeat) */}
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

      {/* Layer 40: Fixed Top-Left Iconic T^minus Wordmark (Italic Newsreader T + Geist ^minus) */}
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

      {/* Layer 40: Dual-Mode Horizon & Space-Filling Polar Chronograph physically bound inside the #000000 core */}
      <div
        ref={countdownTrackRef}
        style={{
          opacity: instantMode ? 1 : 0,
          transform:
            "translate3d(-50%, calc(100dvh - 108px), 0) translateY(-50%)",
        }}
        className="pointer-events-none fixed top-0 left-1/2 z-40 transition-opacity duration-300 ease-out will-change-transform"
      >
        <HorizonCountdown
          stripRef={countdownStripRef}
          polarRef={countdownPolarRef}
        />
      </div>

      {/* Layer 10: Main Content Flow */}
      <main id="top" className="relative z-10 w-full">
        {/* NATIVE CSS STICKY SCROLL RUNWAY (zero scroll-hijacking): Bottom Horizon -> Polar Void -> Top Dome */}
        <div
          ref={runwayRef}
          className="relative h-[255dvh] w-full sm:h-[305dvh]"
        >
          <section
            className={`sticky top-0 flex h-[100dvh] w-full flex-col items-center justify-center px-5 pt-12 pb-[27dvh] transition-opacity duration-500 ease-out sm:px-8 sm:pt-14 sm:pb-[27vh] ${
              heroRevealed ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div
              ref={heroCopyRef}
              className="flex w-full max-w-[660px] flex-col items-center text-center will-change-transform"
            >
              {/* Upright Geist + Sculptural 56x9 ASCII MINUS Lockup (Zero Italics) */}
              <h1 className="flex w-full flex-col items-center">
                <span
                  style={{ fontSize: "clamp(1.75rem, 3.1vw, 2.75rem)" }}
                  className="block font-sans leading-[0.98] font-medium tracking-[-0.035em] text-white"
                >
                  <AsciiRevealText
                    text="Fashion."
                    active={heroRevealed}
                    instant={instantMode}
                    origin="center"
                    delayMs={120}
                    durationMs={520}
                  />
                </span>

                <AsciiMinusWordmark
                  active={heroRevealed}
                  instant={instantMode}
                  delayMs={200}
                  durationMs={680}
                  className="my-2 sm:my-2.5"
                />

                <span
                  style={{ fontSize: "clamp(1.75rem, 3.1vw, 2.75rem)" }}
                  className="block font-sans leading-[1.02] font-medium tracking-[-0.035em] text-[#E2DCF0]"
                >
                  <AsciiRevealText
                    text="the Noise."
                    active={heroRevealed}
                    instant={instantMode}
                    origin="left"
                    delayMs={360}
                    durationMs={560}
                  />
                </span>
              </h1>

              {/* Plain human subhead with single-word #97DFFC emphasis */}
              <p className="mt-3 max-w-[330px] font-sans text-[14px] leading-[1.5] font-normal text-[#D4CCE8]/84 sm:mt-4 sm:max-w-[460px] sm:text-[16px] sm:leading-[1.55]">
                <AsciiRevealText
                  text="The best clothes in the world rarely have the loudest "
                  active={heroRevealed}
                  instant={instantMode}
                  delayMs={540}
                  durationMs={640}
                  glyphClassName="text-[#613DC1]"
                />
                <span className="font-medium text-[#97DFFC]">
                  <AsciiRevealText
                    text="voice"
                    active={heroRevealed}
                    instant={instantMode}
                    delayMs={860}
                    durationMs={340}
                    glyphClassName="text-[#97DFFC]"
                  />
                </span>
                <AsciiRevealText
                  text="."
                  active={heroRevealed}
                  instant={instantMode}
                  delayMs={960}
                  durationMs={140}
                  glyphClassName="text-[#858AE3]"
                />
              </p>

              {/* Matte architectural switcher + input bar + 1-line consent */}
              <div
                className={`mt-5 w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:mt-6 ${
                  heroRevealed
                    ? "translate-y-0 opacity-100 delay-[680ms]"
                    : "translate-y-2 opacity-0"
                }`}
                style={instantMode ? { transitionDelay: "0ms" } : undefined}
              >
                <WaitlistBar
                  inputRef={phoneInputRef}
                  onOpenLegal={setLegalDoc}
                  requestedRole={requestedRole}
                />
              </div>
            </div>
          </section>
        </div>

        {/* ================================================================= */}
        {/* BELOW THE FOLD — "THE DROP CHRONOLOGY" (Geist Editorial + ASCII) */}
        {/* ================================================================= */}
        <div className="relative mx-auto w-full max-w-[1040px] px-5 pt-28 sm:px-10 sm:pt-36">
          {/* BAND 1: Open Editorial Premise (Zero Boxes, Generous Obsidian Space) */}
          <section data-band="premise" className="pb-16 sm:pb-24">
            <p className="font-mono text-[10.5px] font-normal tracking-[0.18em] text-[#858AE3] uppercase sm:text-[11px]">
              <span className="text-[#97DFFC]">+</span>{" "}
              <ScrollAsciiReveal
                text="PREMISE"
                tier="telemetry"
                instant={instantMode}
              />
            </p>

            <h2
              style={{ fontSize: "clamp(2rem, 4.4vw, 3.45rem)" }}
              className="mt-5 max-w-[19ch] font-sans leading-[1.05] font-medium tracking-[-0.035em] text-white"
            >
              <ScrollAsciiReveal
                text="Great independent labels shouldn't have to buy attention to be found."
                tier="headline"
                instant={instantMode}
              />
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-5 md:col-start-7">
                <ScrollAsciiReveal tier="prose" instant={instantMode} delayMs={120}>
                  <p className="font-sans text-[15.5px] leading-[1.7] font-normal text-[#DCD4EE]/84 sm:text-[16px]">
                    Small clothing brands put months into fabric, cut, and
                    finish, only to disappear under paid feeds. T^minus gives
                    independent labels a dedicated home built around scheduled
                    releases, so buyers discover pieces for the garment itself.
                  </p>
                </ScrollAsciiReveal>
              </div>
            </div>

            <div className="mt-14 sm:mt-20">
              <AsciiHorizonRule instant={instantMode} />
            </div>
          </section>

          {/* BAND 2: Interactive "Anatomy of a Drop" Split + Single Shared Sticky Pure-ASCII Specimen */}
          <section data-band="anatomy" className="pb-20 sm:pb-28">
            <div className="mb-8 flex items-center justify-between font-mono text-[10.5px] tracking-[0.18em] text-[#858AE3] uppercase sm:mb-12 sm:text-[11px]">
              <span>
                <span className="text-[#97DFFC]">+</span>{" "}
                <ScrollAsciiReveal
                  text="ANATOMY OF A DROP"
                  tier="telemetry"
                  instant={instantMode}
                />
              </span>
              <span className="text-[#858AE3]/72">01 — 04</span>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-12 lg:gap-16">
              {/* Mobile 4-tab switcher */}
              <div
                role="tablist"
                aria-label="Anatomy of a drop chapters"
                className="grid grid-cols-4 gap-1.5 md:hidden"
              >
                {DROP_CHAPTERS.map((ch) => {
                  const selected = activeChapter === ch.id;
                  return (
                    <button
                      key={ch.index}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => handleSelectChapter(ch.id)}
                      className={`cursor-pointer rounded-[5px] border px-2 py-2 text-center font-mono text-[10px] tracking-[0.08em] uppercase transition-colors ${
                        selected
                          ? "border-[#97DFFC]/75 bg-[#613DC1]/25 text-[#97DFFC]"
                          : "border-[#858AE3]/20 bg-[#06040B] text-[#C4BBE0]/72"
                      }`}
                    >
                      {ch.shortLabel}
                    </button>
                  );
                })}
              </div>

              {/* Desktop Borderless Editorial Chapters (Left Column) */}
              <div className="hidden flex-col md:col-span-6 md:flex">
                {DROP_CHAPTERS.map((ch, idx) => {
                  const active = activeChapter === ch.id;
                  return (
                    <button
                      key={ch.index}
                      ref={(el) => {
                        chapterRefs.current[idx] = el;
                      }}
                      data-chapter-id={ch.id}
                      type="button"
                      onClick={() => handleSelectChapter(ch.id)}
                      onMouseEnter={() => handleSelectChapter(ch.id)}
                      className={`group relative cursor-pointer border-l py-8 pl-7 text-left transition-colors duration-200 focus-visible:outline-none ${
                        active
                          ? "border-[#97DFFC]"
                          : "border-[#858AE3]/18 hover:border-[#858AE3]/55"
                      }`}
                    >
                      <span
                        className={`font-mono text-[12px] tracking-[0.18em] transition-colors ${
                          active
                            ? "text-[#97DFFC]"
                            : "text-[#858AE3]/65 group-hover:text-[#858AE3]"
                        }`}
                      >
                        {ch.index}
                      </span>

                      <h3
                        className={`mt-2.5 font-sans text-[24px] leading-[1.18] font-medium tracking-[-0.028em] transition-colors lg:text-[26px] ${
                          active
                            ? "text-white"
                            : "text-white/62 group-hover:text-white/90"
                        }`}
                      >
                        {ch.title}
                      </h3>

                      <p
                        className={`mt-3 max-w-[40ch] font-sans text-[15px] leading-[1.66] transition-colors ${
                          active
                            ? "text-[#D4CCE8]/86"
                            : "text-[#D4CCE8]/48 group-hover:text-[#D4CCE8]/72"
                        }`}
                      >
                        {ch.body}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Single Shared Pure-ASCII Drop Specimen (Full-width mobile / Sticky right col desktop) */}
              <div className="md:col-span-6">
                <div className="md:sticky md:top-[192px]">
                  <AsciiDropSpecimen activeChapter={activeChapter} />
                </div>
              </div>

              {/* Mobile Active Chapter Readout */}
              <div className="border-l border-[#97DFFC]/55 pl-4 md:hidden">
                <span className="font-mono text-[11px] tracking-[0.16em] text-[#97DFFC]">
                  {mobileChapter.index}
                </span>
                <h3 className="mt-1.5 font-sans text-[21px] leading-[1.2] font-medium tracking-[-0.025em] text-white">
                  {mobileChapter.title}
                </h3>
                <p className="mt-2 font-sans text-[14.5px] leading-[1.64] text-[#D0C8E4]/82">
                  {mobileChapter.body}
                </p>
              </div>
            </div>
          </section>

          {/* BAND 3: Open Two-Side Editorial Split ("For shoppers" / "For independent labels") */}
          <section data-band="audience" className="pb-20 sm:pb-28">
            <AsciiHorizonRule instant={instantMode} className="mb-12 sm:mb-16" />

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-[#858AE3]/18">
              {/* For Shoppers */}
              <div className="flex flex-col justify-between md:pr-12 lg:pr-16">
                <div>
                  <p className="font-mono text-[10.5px] tracking-[0.18em] text-[#858AE3] uppercase sm:text-[11px]">
                    <span className="text-[#97DFFC]">+</span>{" "}
                    <ScrollAsciiReveal
                      text="FOR SHOPPERS"
                      tier="telemetry"
                      instant={instantMode}
                    />
                  </p>
                  <h3 className="mt-4 font-sans text-[25px] leading-[1.14] font-medium tracking-[-0.03em] text-white sm:text-[29px]">
                    <ScrollAsciiReveal
                      text="Find drops worth waiting for."
                      tier="headline"
                      instant={instantMode}
                    />
                  </h3>
                  <ScrollAsciiReveal tier="prose" instant={instantMode} delayMs={100}>
                    <p className="mt-4 max-w-[40ch] font-sans text-[15px] leading-[1.68] text-[#D4CCE8]/82">
                      Discover independent releases on a live clock, check true
                      garment measurements before launch, and get first access
                      without scrolling past ads to find something real.
                    </p>
                  </ScrollAsciiReveal>
                </div>

                <button
                  type="button"
                  onClick={() => handleJumpToWaitlist("SHOPPER")}
                  className="mt-7 inline-flex w-fit cursor-pointer items-center gap-2 font-mono text-[11.5px] tracking-[0.14em] text-[#97DFFC] uppercase transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:outline-none"
                >
                  <span>Join as a shopper</span>
                  <ArrowUp className="size-3.5" />
                </button>
              </div>

              {/* For Independent Labels */}
              <div className="flex flex-col justify-between border-t border-[#858AE3]/16 pt-10 md:border-t-0 md:pt-0 md:pl-12 lg:pl-16">
                <div>
                  <p className="font-mono text-[10.5px] tracking-[0.18em] text-[#858AE3] uppercase sm:text-[11px]">
                    <span className="text-[#97DFFC]">+</span>{" "}
                    <ScrollAsciiReveal
                      text="FOR INDEPENDENT LABELS"
                      tier="telemetry"
                      instant={instantMode}
                    />
                  </p>
                  <h3 className="mt-4 font-sans text-[25px] leading-[1.14] font-medium tracking-[-0.03em] text-white sm:text-[29px]">
                    <ScrollAsciiReveal
                      text="Launch on your own clock."
                      tier="headline"
                      instant={instantMode}
                    />
                  </h3>
                  <ScrollAsciiReveal tier="prose" instant={instantMode} delayMs={100}>
                    <p className="mt-4 max-w-[40ch] font-sans text-[15px] leading-[1.68] text-[#D4CCE8]/82">
                      Keep your own identity, story, and pricing. Turn every
                      collection into a scheduled release event and build direct
                      repeat buyers without paying ad platforms to reach them.
                    </p>
                  </ScrollAsciiReveal>
                </div>

                <button
                  type="button"
                  onClick={() => handleJumpToWaitlist("BRAND")}
                  className="mt-7 inline-flex w-fit cursor-pointer items-center gap-2 font-mono text-[11.5px] tracking-[0.14em] text-[#97DFFC] uppercase transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:outline-none"
                >
                  <span>Apply as a brand</span>
                  <ArrowUp className="size-3.5" />
                </button>
              </div>
            </div>
          </section>

          {/* BAND 4: Architectural "T-Zero" Closing Horizon Bookend */}
          <section data-band="closing" className="relative pt-4 pb-12 sm:pb-16">
            <AsciiHorizonRule
              variant="arch"
              instant={instantMode}
              className="mb-10 sm:mb-12"
            />

            <div className="flex flex-col items-start justify-between gap-7 border-b border-[#858AE3]/18 pb-12 sm:flex-row sm:items-end sm:pb-14">
              <div>
                <p className="font-mono text-[10.5px] tracking-[0.18em] text-[#858AE3] uppercase sm:text-[11px]">
                  APP STORE V1.0 · JANUARY 1, 2027
                </p>
                <h2
                  style={{ fontSize: "clamp(1.95rem, 4vw, 3.05rem)" }}
                  className="mt-3 font-sans leading-[1.06] font-medium tracking-[-0.035em] text-white"
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
              </div>

              <AsciiCornerButton
                type="button"
                variant="primary"
                onClick={() => handleJumpToWaitlist()}
                className="h-11 w-full shrink-0 px-6 text-[13.5px] sm:w-auto"
              >
                <span>Get early access</span>
                <ArrowUp className="size-3.5" />
              </AsciiCornerButton>
            </div>
          </section>

          {/* Quiet Archival Geist Mono Footer */}
          <footer className="flex items-center justify-between py-7 font-mono text-[11px] tracking-[0.1em] text-[#858AE3]/80">
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
                  className="mt-2 font-sans text-[20px] font-medium tracking-[-0.025em] text-white"
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
