"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  BlackholeScene,
  type SceneControl,
  type SceneFrame,
  type SceneInputs,
} from "@/components/scene/blackhole-scene";
import { dialFraming, isWideDial, smooth } from "@/lib/scene/director";
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

const MINUS_TINTS = ["#97DFFC", "#97DFFC", "#D3E9F2"];

export function LandingPage() {
  const clock = useLaunchClock();
  const [sceneOff, setSceneOff] = useState(false);
  const [requestedRole, setRequestedRole] = useState<{
    role: WaitlistRole;
    seq: number;
  } | null>(null);

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
  const closingPhoneRef = useRef<HTMLInputElement | null>(null);
  const minusReveal = useRef(0);
  const cache = useRef<Record<string, string>>({});

  // Geometry that only changes with the viewport.
  const anchors = useRef({ heroFormBottom: 0, closingFormBottomDoc: 0 });
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
    // Place the premise against the dial.
    const premise = premiseRef.current;
    if (premise) {
      const dial = dialFraming(w, h);
      const ring = dial.r * 2.22;
      if (isWideDial(w, h)) {
        const left = dial.cx + ring + 56;
        premise.style.left = `${left}px`;
        premise.style.right = "auto";
        premise.style.top = "50%";
        premise.style.width = `${Math.max(260, Math.min(430, w - left - 56))}px`;
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
    const iv = window.setInterval(measure, 1500);
    window.addEventListener("resize", measure, { passive: true });
    document.fonts.ready.then(measure);
    return () => {
      window.clearTimeout(id);
      window.clearInterval(iv);
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
    write("hero-p", heroRef.current, "pointer-events", heroOpacity > 0.5 ? "auto" : "none");
    write("hero-v", heroRef.current, "visibility", heroOpacity < 0.01 ? "hidden" : "visible");
    minusReveal.current = f.heroReveal;

    // The field stays clear of whichever form sits above the horizon.
    inputsRef.current.fadeLine =
      f.closing > 0.001
        ? anchors.current.closingFormBottomDoc - window.scrollY + 22
        : anchors.current.heroFormBottom + 22;

    // Strip clock: inside the void, under the crest.
    const crestY = f.holeY - f.shadowR;
    const room = h - crestY;
    const stripY = crestY + Math.max(54, Math.min(room * 0.5, 104));
    write(
      "hc-t",
      horizonClockRef.current,
      "transform",
      `translate3d(${f.holeX.toFixed(1)}px, ${stripY.toFixed(1)}px, 0) translate(-50%, -50%)`
    );
    write("hc-o", horizonClockRef.current, "opacity", f.horizonClock.toFixed(3));

    // Dial clock: centred in the void, sized to it.
    const scale = Math.min(1.25, (f.shadowR * 2 * 0.8) / 300);
    write(
      "dc-t",
      dialClockRef.current,
      "transform",
      `translate3d(${f.holeX.toFixed(1)}px, ${f.holeY.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(4)})`
    );
    write("dc-o", dialClockRef.current, "opacity", f.dialClock.toFixed(3));
    write("pr-o", premiseRef.current, "opacity", smooth(0.7, 0.95, f.polar).toFixed(3));
    write(
      "pr-y",
      premiseRef.current,
      "--rise",
      `${((1 - smooth(0.7, 0.95, f.polar)) * 14).toFixed(1)}px`
    );

    // Header extras appear once the scene's own clocks are out of view.
    const showExtras = f.settled && f.horizonClock < 0.04 && f.dialClock < 0.04;
    write("hx-o", headerExtrasRef.current, "opacity", showExtras ? "1" : "0");
    write("hx-p", headerExtrasRef.current, "pointer-events", showExtras ? "auto" : "none");
  }, []);

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

      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between px-5 sm:h-[68px] sm:px-9">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="pointer-events-auto text-ink"
        >
          <TMinusWordmark className="[--wm-scale:1.05] sm:[--wm-scale:1.3]" />
        </a>
        <div
          ref={headerExtrasRef}
          style={{ opacity: 0, pointerEvents: "none" }}
          className="flex items-center gap-4 transition-opacity duration-300 ease-out"
        >
          <HeaderClock parts={clock} />
          <button
            type="button"
            onClick={() => goToForm()}
            className="h-10 cursor-pointer rounded-[8px] bg-ink px-4 text-[14px] font-semibold text-ground transition-opacity duration-150 active:opacity-70"
          >
            Join
          </button>
        </div>
      </header>

      {/* Clocks that live inside the event horizon. */}
      <div
        ref={horizonClockRef}
        style={{ opacity: 0 }}
        className="pointer-events-none fixed left-0 top-0 z-20 will-change-transform"
      >
        <HorizonClock parts={clock} />
      </div>
      <div
        ref={dialClockRef}
        style={{ opacity: 0 }}
        className="pointer-events-none fixed left-0 top-0 z-20 will-change-transform"
      >
        <DialClock parts={clock} />
      </div>

      <main id="top" className="relative z-10">
        {/* Runway: horizon, then the camera rises to look straight down. */}
        <div ref={runwayRef} data-runway className="relative h-[225dvh]">
          <div className="sticky top-0 h-[100dvh] overflow-hidden">
            <section
              ref={heroRef}
              data-section="hero"
              style={{ opacity: sceneOff ? 1 : 0 }}
              className="absolute inset-x-0 top-0 flex flex-col items-center px-5 pt-[calc(56px+2.2dvh)] will-change-transform sm:pt-[calc(68px+3.4dvh)]"
            >
              <h1 className="flex flex-col items-center text-center">
                <span className="statement text-[clamp(2.5rem,5vw,4.3rem)] text-ink">
                  Fashion.
                </span>
                <GlyphMask
                  text="MINUS"
                  label="minus"
                  cell={6}
                  tints={MINUS_TINTS}
                  threshold={0.7}
                  revealSource={minusReveal}
                  className="my-2 h-[66px] w-[318px] sm:my-3 sm:h-[102px] sm:w-[492px]"
                />
                <span className="statement text-[clamp(2.5rem,5vw,4.3rem)] text-ink">
                  the Noise.
                </span>
              </h1>
              <p className="mt-4 max-w-[36ch] text-center text-[16px] leading-[1.45] text-soft sm:mt-6 sm:max-w-[44ch] sm:text-[18px]">
                Limited drops from independent brands, on one live clock. On the
                App Store January 1.
              </p>
              <div ref={heroFormRef} className="mt-4 flex w-full justify-center sm:mt-6">
                <WaitlistForm onPulse={pulse} />
              </div>
            </section>

            <div
              ref={premiseRef}
              style={{ opacity: 0, transform: "translateY(-50%)" }}
              className="pointer-events-none absolute"
            >
              <div style={{ transform: "translateY(var(--rise, 0px))" }}>
                <p className="statement text-[clamp(1.75rem,3.1vw,2.7rem)] leading-[1.04] text-ink">
                  The best clothes in the world rarely have the loudest voice.
                </p>
                <p className="mt-4 text-[15.5px] leading-[1.55] text-soft sm:mt-5 sm:text-[17px]">
                  Small brands put months into fabric, cut and finish, then get
                  one post to launch it. T^minus gives every release a
                  countdown, a place to get ready, and a crowd that shows up on
                  time.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Features />

        {/* Two audiences, one form. */}
        <section data-section="audiences" className="mx-auto w-full max-w-[1120px] px-5 pb-24 pt-10 sm:px-9 sm:pb-36">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-0">
            <div className="md:border-r md:border-line md:pr-14">
              <p className="text-[14px] font-medium text-mute">For shoppers</p>
              <h2 className="statement mt-3 text-[clamp(2rem,3.4vw,2.9rem)] text-ink">
                Find drops worth waiting for.
              </h2>
              <p className="mt-4 max-w-[40ch] text-[16.5px] leading-[1.55] text-soft">
                Follow independent releases on a live clock, sort out your size
                before launch, and be there when it opens.
              </p>
              <button
                type="button"
                onClick={() => goToForm("SHOPPER")}
                className="mt-6 h-12 cursor-pointer rounded-[8px] bg-ink px-5 text-[15px] font-semibold text-ground transition-opacity duration-150 active:opacity-70"
              >
                Join as a shopper
              </button>
            </div>
            <div className="md:pl-14">
              <p className="text-[14px] font-medium text-mute">For brands</p>
              <h2 className="statement mt-3 text-[clamp(2rem,3.4vw,2.9rem)] text-ink">
                Launch on your own clock.
              </h2>
              <p className="mt-4 max-w-[40ch] text-[16.5px] leading-[1.55] text-soft">
                Keep your identity, your pricing and your checkout. Turn each
                collection into a scheduled release, and see real demand before
                you commit to a run.
              </p>
              <button
                type="button"
                onClick={() => goToForm("BRAND")}
                className="mt-6 h-12 cursor-pointer rounded-[8px] border border-line px-5 text-[15px] font-semibold text-ink transition-colors duration-150 [@media(hover:hover)]:hover:border-peri"
              >
                Apply as a brand
              </button>
            </div>
          </div>
        </section>

        {/* Closing: the horizon returns. */}
        <section
          ref={closingRef}
          data-section="closing"
          className="relative flex min-h-[100dvh] flex-col items-center px-5 pt-[13dvh] sm:pt-[15dvh]"
        >
          <h2 className="statement text-center text-[clamp(2.7rem,6vw,5rem)] text-ink">
            Be ready at <span className="text-ice">zero.</span>
          </h2>
          <p className="mt-4 max-w-[34ch] text-center text-[16.5px] leading-[1.45] text-soft sm:text-[18px]">
            Leave your number. We&rsquo;ll text you the moment T^minus is live.
          </p>
          <div ref={closingFormRef} className="mt-6 flex w-full justify-center">
            <WaitlistForm
              inputRef={closingPhoneRef}
              requestedRole={requestedRole}
              onPulse={pulse}
              showPerk={false}
            />
          </div>
          <footer className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-center gap-x-1 px-5 pb-2 text-[13px] text-mute sm:pb-3">
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
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "auto" });
                  controlRef.current?.replayIntro();
                }}
                className="inline-flex h-11 cursor-pointer items-center px-2 [@media(hover:hover)]:hover:text-ink"
              >
                Replay intro
              </button>
            </nav>
          </footer>
        </section>
      </main>
    </div>
  );
}
