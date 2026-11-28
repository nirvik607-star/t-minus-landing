"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  BlackholeScene,
  type SceneControl,
  type SceneFrame,
  type SceneInputs,
} from "@/components/scene/blackhole-scene";
import {
  dialFraming,
  endingFraming,
  isWideDial,
  isWideStage,
  smooth,
  stageLayout,
} from "@/lib/scene/director";
import { GlyphMask } from "@/components/glyph/glyph-mask";
import { TMinusWordmark } from "@/components/landing/t-minus-wordmark";
import {
  DialClock,
  HeaderClock,
  HorizonClock,
  useLaunchClock,
} from "@/components/landing/countdown";
import { WaitlistForm } from "@/components/landing/waitlist-form";
import { Features } from "@/components/landing/features";
import type { WaitlistRole } from "@/lib/waitlist";
import { APP_STORE_URL } from "@/lib/launch";
import { sceneEnergy, sceneStage } from "@/lib/scene/energy";
import {
  WaitlistGlobe,
  useWaitlistPulse,
  type PulsePlace,
} from "@/components/globe/waitlist-globe";
import { areaCodeFromE164, regionForAreaCode } from "@/lib/globe/area-codes";

/** After zero, with a listing to point at, the page offers the app instead of the waitlist. */
function AppStoreButton() {
  return (
    <a
      href={APP_STORE_URL}
      className="inline-flex h-14 items-center justify-center rounded-[10px] bg-ink px-7 text-[15px] font-semibold uppercase tracking-[0.03em] text-accent transition-opacity duration-100 ease-out active:opacity-70"
    >
      Get T^minus on the App Store
    </a>
  );
}

/**
 * MINUS is the hero: a word as wide as the page, built from the letter T.
 * Lower-case t's are its quiet cells, capitals its loud ones.
 */
const MINUS_TINTS = ["#FFFFFF", "#E4DEFA", "#BDB5F2"];
const MINUS_GLYPHS = ["t", "t", "T", "t", "T", "T"] as const;

/** Below this many people the page does not quote a number. */
const PULSE_MIN_COUNT = 10;

/**
 * One line under the ending's headline: how many are on the list, and the
 * area whose turn it is on the globe. Says only what the feed says.
 */
function PulseLine({
  data,
  pinged,
  self,
}: {
  data: ReturnType<typeof useWaitlistPulse>;
  pinged: PulsePlace | null;
  self: PulsePlace | null;
}) {
  const count = data?.count ?? 0;
  const showCount = count >= PULSE_MIN_COUNT;
  return (
    <div className="mt-4 flex min-h-[3.1em] flex-col items-center gap-1 text-[15px] leading-[1.35] text-soft xl:items-start">
      {showCount ? (
        <p>
          <span className="value font-semibold text-ink">{count.toLocaleString("en-US")}</span> on
          the list{data?.sample ? " (preview data)" : ""}.
        </p>
      ) : (
        <p>{self ? "You are on the map." : "The map fills in as people join."}</p>
      )}
      {/* Changes every couple of seconds: kept out of screen readers' way. */}
      <p aria-hidden="true" className="value font-mono text-[12.5px] text-mute">
        {pinged
          ? pinged.self
            ? `You, near ${pinged.label}`
            : `Joined from near ${pinged.label}`
          : "\u00a0"}
      </p>
    </div>
  );
}

export function LandingPage() {
  const clock = useLaunchClock();
  const live = clock.ready && clock.plus;
  const offerApp = live && APP_STORE_URL !== "";
  const [sceneOff, setSceneOff] = useState(false);
  // Enough rows of T's for the letters to hold their shape at each size.
  const [minusRows, setMinusRows] = useState(8);
  useEffect(() => {
    const update = () => setMinusRows(window.innerWidth >= 900 ? 12 : window.innerWidth >= 560 ? 10 : 8);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  // The pinned hero needs height. On a very short screen (a phone on its side)
  // the page lays out statically instead, as it does without WebGL.
  useEffect(() => {
    const check = () => {
      if (window.innerHeight < 540) setSceneOff(true);
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);
  const [requestedRole, setRequestedRole] = useState<{
    role: WaitlistRole;
    seq: number;
  } | null>(null);
  const [closingRole, setClosingRole] = useState<WaitlistRole>("SHOPPER");
  const [joined, setJoined] = useState(false);
  // The ending's globe: the public feed, the visitor's own place once they
  // join, and whichever place is taking its turn.
  const pulseData = useWaitlistPulse();
  const [selfPlace, setSelfPlace] = useState<PulsePlace | null>(null);
  const [pinged, setPinged] = useState<PulsePlace | null>(null);
  const [globeOn, setGlobeOn] = useState(false);
  const globeOnRef = useRef(false);
  const globeRef = useRef<HTMLDivElement | null>(null);
  const places = React.useMemo(
    () => [...(selfPlace ? [selfPlace] : []), ...(pulseData?.places ?? [])],
    [selfPlace, pulseData]
  );
  const onJoined = useCallback((_role: WaitlistRole, phone?: string) => {
    setJoined(true);
    const code = phone ? areaCodeFromE164(phone) : null;
    const region = code ? regionForAreaCode(code) : null;
    if (region) setSelfPlace({ ...region, self: true });
  }, []);

  const runwayRef = useRef<HTMLDivElement | null>(null);
  const closingRef = useRef<HTMLElement | null>(null);
  const controlRef = useRef<SceneControl | null>(null);
  const inputsRef = useRef<SceneInputs>({ fadeLine: 0 });

  const heroRef = useRef<HTMLDivElement | null>(null);
  const heroFormRef = useRef<HTMLDivElement | null>(null);
  const closingFormRef = useRef<HTMLDivElement | null>(null);
  const premiseRef = useRef<HTMLDivElement | null>(null);
  const horizonClockRef = useRef<HTMLDivElement | null>(null);
  const dialClockRef = useRef<HTMLDivElement | null>(null);
  const headerExtrasRef = useRef<HTMLDivElement | null>(null);
  const headerClockRef = useRef<HTMLSpanElement | null>(null);
  const headerBackRef = useRef<HTMLDivElement | null>(null);
  const skipRef = useRef<HTMLButtonElement | null>(null);
  const headerScrimRef = useRef<HTMLDivElement | null>(null);
  const closingPhoneRef = useRef<HTMLInputElement | null>(null);
  const closingBodyRef = useRef<HTMLDivElement | null>(null);
  const featSectionRef = useRef<HTMLElement | null>(null);
  const underlayRef = useRef<HTMLDivElement | null>(null);
  const minusReveal = useRef(0);
  const heroShown = useRef(true);
  const cache = useRef<Record<string, string>>({});
  const sceneOffRef = useRef(false);
  sceneOffRef.current = sceneOff;

  // Geometry that only changes with the viewport.
  const anchors = useRef({ heroFormBottom: 0, closingFormBottomDoc: 0, stripHalf: 160 });
  const measure = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const form = heroFormRef.current;
    const hero = heroRef.current;
    if (form && hero) {
      // The hero is pinned to the top of the viewport, so offsets are viewport px.
      anchors.current.heroFormBottom =
        hero.offsetTop + form.offsetTop + form.offsetHeight;
    }
    const closing = closingFormRef.current;
    if (closing) {
      anchors.current.closingFormBottomDoc =
        closing.getBoundingClientRect().bottom + window.scrollY;
    }
    const body = closingBodyRef.current;
    if (body && !sceneOffRef.current) {
      const wideEnd = isWideStage(w, h);
      const end = endingFraming(w, h, wideEnd ? { ...stageLayout(w, h) } : null);
      // Small screens: the copy starts under the ring. Wide: it takes the feature copy's column.
      body.style.setProperty("--end-top", `${Math.round(end.cy + end.r * 1.34 + 14)}px`);
      body.style.setProperty("--end-col", `${stageLayout(w, h).copyW}px`);
    }
    const strip = horizonClockRef.current;
    if (strip && strip.offsetWidth > 0) anchors.current.stripHalf = strip.offsetWidth / 2;
    // Place the premise against the dial.
    const premise = premiseRef.current;
    if (premise && !sceneOffRef.current) {
      const dial = dialFraming(w, h);
      const ring = dial.r * 2.22;
      if (isWideDial(w, h)) {
        // Same column the feature copy takes beside the ring, so the text
        // edge does not move between the dial and what follows.
        const col = isWideStage(w, h) ? stageLayout(w, h) : null;
        const left = col ? col.copyLeft : dial.cx + ring + 56;
        premise.style.left = `${left}px`;
        premise.style.right = "auto";
        premise.style.top = "50%";
        premise.style.width = `${col ? col.copyW : Math.max(260, Math.min(440, w - left - 80))}px`;
        premise.style.transform = "translateY(-50%)";
        premise.style.textAlign = "left";
      } else {
        const top = Math.min(dial.cy + ring + 18, h * 0.985 - premise.offsetHeight);
        premise.style.left = "50%";
        premise.style.right = "auto";
        premise.style.top = `${top}px`;
        premise.style.width = `min(${w - 40}px, 440px)`;
        premise.style.transform = "translateX(-50%)";
        premise.style.textAlign = "center";
      }
    }
  }, []);

  useEffect(() => {
    measure();
    const id = window.setTimeout(measure, 300);
    const ro = new ResizeObserver(() => measure());
    ro.observe(document.body);
    window.addEventListener("resize", measure, { passive: true });
    document.fonts.ready.then(measure);
    return () => {
      window.clearTimeout(id);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const write = (key: string, el: HTMLElement | null, prop: string, value: string) => {
    if (!el) return;
    if (cache.current[key] === value) return;
    cache.current[key] = value;
    el.style.setProperty(prop, value);
  };

  const onFrame = useCallback((f: SceneFrame) => {
    const { pin, h } = f;

    // Hero copy: arrives with the intro, lifts away as the camera rises.
    const leave = smooth(0.02, 0.2, pin);
    const heroOpacity = f.heroReveal * (1 - leave);
    write("hero-o", heroRef.current, "opacity", heroOpacity.toFixed(3));
    write(
      "hero-t",
      heroRef.current,
      "transform",
      `translate3d(0, ${(-leave * 36 + (1 - f.heroReveal) * 10).toFixed(1)}px, 0)`
    );
    // Faded out, the hero still holds the page's h1 and first form for
    // assistive tech and the keyboard; focusing into it scrolls back to it.
    write("hero-p", heroRef.current, "pointer-events", heroOpacity > 0.5 ? "auto" : "none");
    heroShown.current = heroOpacity > 0.5;
    // The word finishes resolving before the rest of the hero has faded in.
    minusReveal.current = Math.min(1, f.heroReveal * 1.8);

    // The field stays clear of the hero's form above the horizon.
    inputsRef.current.fadeLine = anchors.current.heroFormBottom + 22;

    // Strip clock: inside the void, under the crest. As the camera rises it
    // travels to the centre of the void.
    const crestY = f.holeY - f.shadowR;
    const room = h - crestY;
    const low = crestY + Math.max(50, Math.min(room * 0.5, 96));
    const stripY = Math.max(
      crestY + 46,
      low + (Math.min(f.holeY, h * 0.5) - low) * smooth(0.04, 0.42, f.polar)
    );
    write(
      "hc-t",
      horizonClockRef.current,
      "transform",
      `translate3d(${f.holeX.toFixed(1)}px, ${stripY.toFixed(1)}px, 0) translate(-50%, -50%)`
    );
    const stripOpacity = f.horizonClock;
    write("hc-o", horizonClockRef.current, "opacity", stripOpacity.toFixed(3));

    // The ending: the world sits in the void, sized to it. The copy beside
    // it arrives once the ring has nearly settled.
    const globeSize = f.shadowR * 2 * 0.955;
    write("gl-s", globeRef.current, "width", `${globeSize.toFixed(1)}px`);
    write("gl-h", globeRef.current, "height", `${globeSize.toFixed(1)}px`);
    write(
      "gl-t",
      globeRef.current,
      "transform",
      `translate3d(${f.holeX.toFixed(1)}px, ${f.holeY.toFixed(1)}px, 0) translate(-50%, -50%)`
    );
    write("gl-o", globeRef.current, "opacity", f.world.toFixed(3));
    write("gl-v", globeRef.current, "visibility", f.world < 0.02 ? "hidden" : "visible");
    if (globeOnRef.current !== f.world > 0.3) {
      globeOnRef.current = f.world > 0.3;
      setGlobeOn(globeOnRef.current);
    }
    const closingIn = f.closing > 0.001 ? smooth(0.62, 0.9, f.closing) : 0;
    write("hc-v", horizonClockRef.current, "visibility", stripOpacity < 0.02 ? "hidden" : "visible");

    // Dial clock: centred in the void, sized to it.
    const dialEm = Math.min(20 + 46 * f.dive, ((f.shadowR * 2 * 0.8) / 300) * 16);
    write("dc-f", dialClockRef.current, "font-size", `${dialEm.toFixed(2)}px`);
    write(
      "dc-t",
      dialClockRef.current,
      "transform",
      `translate3d(${f.holeX.toFixed(1)}px, ${f.holeY.toFixed(1)}px, 0) translate(-50%, -50%)`
    );
    write("dc-o", dialClockRef.current, "opacity", f.dialClock.toFixed(3));
    write("dc-v", dialClockRef.current, "visibility", f.dialClock < 0.02 ? "hidden" : "visible");

    // The premise arrives once the camera is nearly overhead.
    const premiseIn =
      smooth(0.7, 0.95, f.polar) *
      smooth(0.6, 0.74, pin) *
      (1 - smooth(0, h * 0.16, f.exitPx));
    write("pr-o", premiseRef.current, "opacity", premiseIn.toFixed(3));
    write("pr-y", premiseRef.current, "--rise", `${((1 - premiseIn) * 14).toFixed(1)}px`);

    // From the dial onward the void is open: the features sit under the scene
    // on black and are seen through the hole.
    const open = f.cut > 0.5;
    write("ul-o", underlayRef.current, "opacity", open ? "1" : "0");
    // Unseen but still reachable before then. (Opacity is cleared, not set to
    // 1, so the section's columns keep their own places in the page's layers.)
    write("ft-o", featSectionRef.current, "opacity", open ? "" : "0");
    inputsRef.current.stage = sceneStage.on ? sceneStage : null;

    write("cl-o", closingRef.current, "opacity", closingIn.toFixed(3));
    write("cl-p", closingRef.current, "pointer-events", closingIn > 0.5 ? "auto" : "none");

    // Inside the hole: the disk turns with progress through the features and
    // answers whatever the demo on screen is doing.
    const feats = featSectionRef.current;
    if (feats && f.exitPx > 0 && f.closing < 0.001) {
      const fr = feats.getBoundingClientRect();
      inputsRef.current.turn = Math.min(1, Math.max(0, (h * 0.5 - fr.top) / Math.max(1, fr.height)));
      inputsRef.current.energy = sceneEnergy.value;
    } else {
      inputsRef.current.energy = 0;
    }

    // A visible way past the intro, for as long as it is running.
    const showSkip = !f.settled && f.heroReveal < 0.15;
    write("sk-o", skipRef.current, "opacity", showSkip ? "1" : "0");
    write("sk-v", skipRef.current, "visibility", showSkip ? "visible" : "hidden");

    // Header extras appear once the scene's own clocks are out of view.
    const showClock = f.settled && f.horizonClock < 0.04 && f.dialClock < 0.04;
    write("hk-o", headerClockRef.current, "opacity", showClock ? "1" : "0");
    const overContent = f.exitPx > f.h * 0.12;
    write("hs-o", headerScrimRef.current, "opacity", !f.settled && f.heroReveal < 0.6 ? "1" : "0");
    write("hb-o", headerBackRef.current, "opacity", overContent ? "1" : "0");
    // Stays until the closing form itself is arriving.
    const showJoin = f.settled && pin > 0.24 && f.closing < 0.86;
    write("hx-o", headerExtrasRef.current, "opacity", showJoin ? "1" : "0");
    write("hx-p", headerExtrasRef.current, "pointer-events", showJoin ? "auto" : "none");
    // Hidden controls must not take keyboard focus.
    write("hx-v", headerExtrasRef.current, "visibility", showJoin ? "visible" : "hidden");
  }, []);

  // Without WebGL2 there is no scene to follow: lay the same content out
  // statically, with a plain drawn horizon under the hero.
  useEffect(() => {
    if (!sceneOff) return;
    minusReveal.current = 1;
    const set = (el: HTMLElement | null, styles: Record<string, string>) => {
      if (!el) return;
      for (const [k, v] of Object.entries(styles)) el.style.setProperty(k, v);
    };
    set(heroRef.current, { opacity: "1", visibility: "visible", "pointer-events": "auto", transform: "none" });
    set(premiseRef.current, {
      opacity: "1",
      position: "relative",
      left: "auto",
      top: "auto",
      width: "auto",
      transform: "none",
      "text-align": "left",
      "pointer-events": "auto",
    });
    set(headerExtrasRef.current, { opacity: "1", visibility: "visible", "pointer-events": "auto" });
    set(headerBackRef.current, { opacity: "1", background: "rgb(44 7 53 / 0.94)", height: "100%" });
  }, [sceneOff]);

  const pulse = useCallback((strength: number) => {
    controlRef.current?.pulse(strength);
  }, []);

  const goToForm = useCallback((role?: WaitlistRole) => {
    if (role) setRequestedRole((p) => ({ role, seq: (p?.seq ?? 0) + 1 }));
    closingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => closingPhoneRef.current?.focus({ preventScroll: true }), 650);
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-clip bg-ground text-ink">
      {sceneOff ? null : (
        <BlackholeScene
          runwayRef={runwayRef}
          closingRef={closingRef}
          controlRef={controlRef}
          inputsRef={inputsRef}
          onFrame={onFrame}
          onUnavailable={() => setSceneOff(true)}
        />
      )}

      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 h-14 sm:h-[68px]">
        {/* Inside the hole: a soft shade, so the logo holds against the rim behind it. */}
        <div
          ref={headerBackRef}
          aria-hidden="true"
          style={{ opacity: 0 }}
          className="absolute inset-x-0 top-0 -z-10 h-[92px] bg-gradient-to-b from-[#13021D] via-[#13021D]/85 to-transparent transition-opacity duration-200 ease-out sm:h-28"
        />
        {/* During the intro, a soft shade so the logo and Skip hold against the flash. */}
        <div
          ref={headerScrimRef}
          aria-hidden="true"
          style={{ opacity: 0 }}
          className="absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-[#13021D]/90 to-transparent transition-opacity duration-300 ease-out"
        />
        {/* Same grid as the sections below: logo over the copy edge, button over the form edge. */}
        <div className="relative mx-auto flex h-full w-full max-w-[1360px] items-center justify-between px-5 sm:px-10 lg:px-20">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="T-minus, back to top"
          className="pointer-events-auto -mx-2 inline-flex h-11 items-center px-2 text-ink [filter:drop-shadow(0_0_10px_rgb(19_2_29/0.85))]"
        >
          <TMinusWordmark className="[--wm-scale:1.05] sm:[--wm-scale:1.3]" />
        </a>
        <button
          ref={skipRef}
          type="button"
          onClick={() => controlRef.current?.skipIntro()}
          style={{ opacity: 0, visibility: "hidden" }}
          className="pointer-events-auto absolute right-3 top-1/2 h-11 -translate-y-1/2 cursor-pointer rounded-[8px] bg-[#13021D]/70 px-3.5 text-[14px] font-medium text-ink transition-opacity duration-200 ease-out sm:right-8 lg:right-20 [@media(hover:hover)]:hover:bg-[#13021D]/90"
        >
          Skip intro
        </button>
        <div
          ref={headerExtrasRef}
          style={{ opacity: 0, pointerEvents: "none", visibility: "hidden" }}
          className="flex items-center gap-4 transition-opacity duration-300 ease-out"
        >
          <span
            ref={headerClockRef}
            style={{ opacity: 0 }}
            className="hidden transition-opacity duration-300 ease-out sm:inline-flex"
          >
            <HeaderClock parts={clock} />
          </span>
          <button
            type="button"
            onClick={() => goToForm()}
            className="h-11 cursor-pointer rounded-[8px] bg-ink px-4 text-[13.5px] font-semibold uppercase tracking-[0.03em] text-accent transition-opacity duration-150 ease-out active:opacity-70 [@media(hover:hover)]:hover:opacity-90"
          >
            Join the waitlist
          </button>
        </div>
        </div>
      </header>

      {/* Black behind the open void. Only shown while the void is open. */}
      {sceneOff ? null : (
        <div
          ref={underlayRef}
          aria-hidden="true"
          style={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-0 bg-black"
        />
      )}

      {/* Layers, bottom to top: black, the features, the scene, hero and closing, clocks, header. */}
      <main id="top" className="relative">
        {/* Clocks that live inside the event horizon. */}
        {sceneOff ? null : (
          <>
            <div
              ref={horizonClockRef}
              style={{ opacity: 0 }}
              className="pointer-events-none fixed left-0 top-0 z-20 will-change-transform"
            >
              <HorizonClock parts={clock} joined={joined} />
            </div>
            <div
              ref={globeRef}
              style={{ opacity: 0, visibility: "hidden" }}
              className="pointer-events-none fixed left-0 top-0 z-20 will-change-transform"
            >
              <WaitlistGlobe places={places} active={globeOn} onPing={setPinged} className="size-full" />
            </div>
            <div
              ref={dialClockRef}
              style={{ opacity: 0 }}
              className="pointer-events-none fixed left-0 top-0 z-20 will-change-transform"
            >
              <DialClock parts={clock} />
            </div>
          </>
        )}

        {/* Runway: horizon, then the camera rises to look straight down. */}
        <div
          ref={runwayRef}
          data-runway
          // The runway sits above the scene, and the features rise beneath its
          // tail: it must not take the taps meant for them. The hero turns its
          // own pointer events on while it is showing.
          className={sceneOff ? "relative" : "pointer-events-none relative z-10 h-[225dvh]"}
        >
          <div
            className={
              sceneOff
                ? "relative flex flex-col"
                : "sticky top-0 h-[100dvh] overflow-hidden"
            }
          >
            <section
              ref={heroRef}
              data-section="hero"
              onFocusCapture={() => {
                if (!sceneOff && !heroShown.current) window.scrollTo({ top: 0, behavior: "auto" });
              }}
              style={{ opacity: sceneOff ? 1 : 0 }}
              className={`${
                sceneOff ? "relative" : "absolute inset-x-0 top-0"
              } flex flex-col items-center px-5 pt-[calc(56px+1.6dvh)] will-change-transform sm:pt-[calc(68px+2dvh)]`}
            >
              {/* The statement at poster scale: the two serif lines hang off the ends of the word. */}
              <h1 className="flex w-[min(92vw,1180px,158dvh)] flex-col">
                <span className="statement self-start text-[clamp(1.9rem,min(3.5vw,6dvh),3.3rem)] leading-[1] text-ink">
                  Fashion.
                </span>
                <GlyphMask
                  text="MINUS"
                  label="minus"
                  rows={minusRows}
                  maskWeight={800}
                  glyphs={MINUS_GLYPHS}
                  tints={MINUS_TINTS}
                  signal="#FFFFFF"
                  silhouette="#FFFFFF"
                  silhouetteOpacity={0.1}
                  threshold={0.62}
                  revealSource={minusReveal}
                  className="my-1 aspect-[4.86/1] w-full sm:my-1.5"
                />
                <span className="statement self-end text-[clamp(1.9rem,min(3.5vw,6dvh),3.3rem)] leading-[1] text-ink">
                  the Noise.
                </span>
              </h1>
              <p className="mt-3.5 max-w-[36ch] text-center text-[16px] leading-[1.45] text-soft sm:mt-4 sm:max-w-[44ch] sm:text-[18px]">
                Limited drops from independent brands, on one live clock.{" "}
                {live ? "On the App Store now." : "On the App Store January 1."}
              </p>
              <div ref={heroFormRef} className="mt-4 flex w-full flex-col items-center sm:mt-5">
                {offerApp ? (
                  <AppStoreButton />
                ) : (
                  <>
                    <WaitlistForm onPulse={pulse} roleSwitch={false} perk onJoined={onJoined} />
                    <button
                      type="button"
                      onClick={() => goToForm("BRAND")}
                      className="mt-1 inline-flex h-11 cursor-pointer items-center text-[13.5px] text-mute underline decoration-peri/60 underline-offset-[3px] [@media(max-height:799px)]:hidden [@media(hover:hover)]:hover:text-ink"
                    >
                      Run a brand? Apply to launch a drop
                    </button>
                  </>
                )}
              </div>
              {sceneOff ? (
                <div className="relative -mx-5 mt-10 flex w-[calc(100%+2.5rem)] justify-center overflow-hidden pb-9 pt-14">
                  {/* The horizon, drawn plainly: a black disc with a lit rim. */}
                  <div
                    aria-hidden="true"
                    className="absolute left-1/2 top-2 size-[max(130vw,900px)] -translate-x-1/2 rounded-full border-2 border-peri bg-black shadow-[0_0_0_10px_rgba(133,138,227,0.18),0_0_90px_10px_rgba(97,61,193,0.55)]"
                  />
                  <div className="relative">
                    <HorizonClock parts={clock} joined={joined} />
                  </div>
                </div>
              ) : null}
            </section>

            <div
              ref={premiseRef}
              style={{ opacity: 0, transform: "translateY(-50%)" }}
              className={sceneOff ? "mx-auto w-full max-w-[1360px] px-5 pb-6 pt-16 sm:px-10 lg:px-20" : "pointer-events-none absolute"}
            >
              <div style={{ transform: "translateY(var(--rise, 0px))" }}>
                <p className="statement text-[clamp(1.75rem,3.3vw,3rem)] leading-[1.04] text-ink">
                  The best clothes in the world rarely have the loudest voice.
                </p>
                <p className="mt-4 text-[15.5px] leading-[1.55] text-soft sm:mt-5 sm:text-[17px]">
                  Small brands put months into fabric, cut and finish, then get
                  one post to launch it. T^minus gives every release a
                  countdown, a place to get ready, and one moment to open.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Features outerRef={featSectionRef} scene={!sceneOff} onPart={() => pulse(0.45)} />

        {/* The ending: the world in the void, and the signup beside it. */}
        <section
          ref={closingRef}
          data-section="closing"
          className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[1360px] flex-col px-5 pb-16 sm:px-10 lg:px-20"
        >
          {sceneOff ? (
            <div className="mx-auto mt-16 size-[min(78vw,340px)]">
              <WaitlistGlobe places={places} active onPing={setPinged} className="size-full" />
            </div>
          ) : null}
          <div
            ref={closingBodyRef}
            className={`flex w-full flex-1 flex-col items-center text-center ${
              sceneOff ? "pt-8" : "justify-start pt-[var(--end-top,56dvh)] xl:justify-center xl:pt-0"
            } xl:ml-auto xl:w-[var(--end-col,400px)] xl:items-start xl:text-left`}
          >
            <h2 className="statement text-[clamp(2.7rem,4.6vw,4.4rem)] leading-[0.96] text-ink">
              {closingRole === "BRAND" ? (
                <>
                  Launch on your own <span className="text-ice">clock.</span>
                </>
              ) : (
                <>
                  Be ready at <span className="text-ice">zero.</span>
                </>
              )}
            </h2>
            <PulseLine data={pulseData} pinged={pinged} self={selfPlace} />
            <p className="mt-3 hidden max-w-[40ch] text-[17px] leading-[1.5] text-soft xl:block">
              {closingRole === "BRAND"
                ? "Keep your identity, your pricing and your checkout. Turn each collection into a scheduled release, and run your membership inside the app."
                : live
                  ? "T^minus is live. Leave your number for drop alerts."
                  : "One text the moment T^minus is live. After that, only drop alerts."}
            </p>
            <div ref={closingFormRef} className="mt-4 flex w-full flex-col items-center xl:mt-6 xl:items-start">
              <WaitlistForm
                inputRef={closingPhoneRef}
                requestedRole={requestedRole}
                onPulse={pulse}
                onRoleChange={setClosingRole}
                onJoined={onJoined}
                align="split"
                perk
              />
            </div>
          </div>
          <footer className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-center gap-x-1 px-5 pb-2 text-[13px] text-soft sm:pb-3">
            <span className="px-2">&copy; 2026 T^minus</span>
            <nav className="flex items-center gap-1">
              <Link href="/privacy" className="inline-flex h-11 items-center px-2 [@media(hover:hover)]:hover:text-ink">
                Privacy
              </Link>
              <Link href="/terms" className="inline-flex h-11 items-center px-2 [@media(hover:hover)]:hover:text-ink">
                Terms
              </Link>
              <button
                type="button"
                aria-label="Replay intro"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "auto" });
                  controlRef.current?.replayIntro();
                }}
                className="inline-flex h-11 cursor-pointer items-center px-2 [@media(hover:hover)]:hover:text-ink"
              >
                Replay<span className="hidden sm:inline">&nbsp;intro</span>
              </button>
            </nav>
          </footer>
        </section>
      </main>
    </div>
  );
}
