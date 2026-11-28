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
import { PerkLine, WaitlistForm } from "@/components/landing/waitlist-form";
import { Features } from "@/components/landing/features";
import type { WaitlistRole } from "@/lib/waitlist";
import { APP_STORE_URL } from "@/lib/launch";

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

const MINUS_TINTS = ["#FFFFFF", "#E6F6FE", "#BFEAFD"];

export function LandingPage() {
  const clock = useLaunchClock();
  const live = clock.ready && clock.plus;
  const offerApp = live && APP_STORE_URL !== "";
  const [sceneOff, setSceneOff] = useState(false);
  const [requestedRole, setRequestedRole] = useState<{
    role: WaitlistRole;
    seq: number;
  } | null>(null);
  const [closingRole, setClosingRole] = useState<WaitlistRole>("SHOPPER");
  const [joined, setJoined] = useState(false);

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
  const closingPhoneRef = useRef<HTMLInputElement | null>(null);
  const featPanelRef = useRef<HTMLDivElement | null>(null);
  const featListRef = useRef<HTMLOListElement | null>(null);
  const minusReveal = useRef(0);
  const cache = useRef<Record<string, string>>({});
  const sceneOffRef = useRef(false);
  sceneOffRef.current = sceneOff;

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
    if (premise && !sceneOffRef.current) {
      const dial = dialFraming(w, h);
      const ring = dial.r * 2.22;
      if (isWideDial(w, h)) {
        const left = dial.cx + ring + 56;
        premise.style.left = `${left}px`;
        premise.style.right = "auto";
        premise.style.top = "50%";
        premise.style.width = `${Math.max(260, Math.min(440, w - left - 80))}px`;
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
    // The word finishes resolving before the rest of the hero has faded in.
    minusReveal.current = Math.min(1, f.heroReveal * 1.8);

    // The field stays clear of whichever form sits above the horizon.
    inputsRef.current.fadeLine =
      f.closing > 0.001
        ? anchors.current.closingFormBottomDoc - window.scrollY + 22
        : anchors.current.heroFormBottom + 22;

    // Strip clock: inside the void, under the crest.
    const crestY = f.holeY - f.shadowR;
    const room = h - crestY;
    const stripY = crestY + Math.max(52, Math.min(room * 0.44, 104));
    write(
      "hc-t",
      horizonClockRef.current,
      "transform",
      `translate3d(${f.holeX.toFixed(1)}px, ${stripY.toFixed(1)}px, 0) translate(-50%, -50%)`
    );
    write("hc-o", horizonClockRef.current, "opacity", f.horizonClock.toFixed(3));
    write("hc-v", horizonClockRef.current, "visibility", f.horizonClock < 0.02 ? "hidden" : "visible");

    // Dial clock: centred in the void, sized to it.
    const dialEm = Math.min(20, ((f.shadowR * 2 * 0.8) / 300) * 16);
    write("dc-f", dialClockRef.current, "font-size", `${dialEm.toFixed(2)}px`);
    write(
      "dc-t",
      dialClockRef.current,
      "transform",
      `translate3d(${f.holeX.toFixed(1)}px, ${f.holeY.toFixed(1)}px, 0) translate(-50%, -50%)`
    );
    write("dc-o", dialClockRef.current, "opacity", f.dialClock.toFixed(3));
    write("dc-v", dialClockRef.current, "visibility", f.dialClock < 0.02 ? "hidden" : "visible");

    // Through the features the hole sits behind the pinned demo (wide screens).
    const panel = featPanelRef.current;
    const list = featListRef.current;
    if (panel && list && f.exitPx > 0 && f.closing < 0.001) {
      const pr = panel.getBoundingClientRect();
      const lr = list.getBoundingClientRect();
      const cy = pr.top + pr.height / 2;
      const on = smooth(h * 1.0, h * 0.62, cy) * smooth(-h * 0.12, h * 0.2, cy);
      inputsRef.current.feat = {
        x: pr.left + pr.width / 2,
        y: cy,
        r: Math.min(pr.width, 440) * 0.36,
        on,
        turn: Math.min(1, Math.max(0, (h * 0.5 - lr.top) / Math.max(1, lr.height))),
      };
    } else {
      inputsRef.current.feat = undefined;
    }
    write("pr-o", premiseRef.current, "opacity", smooth(0.7, 0.95, f.polar).toFixed(3));
    write(
      "pr-y",
      premiseRef.current,
      "--rise",
      `${((1 - smooth(0.7, 0.95, f.polar)) * 14).toFixed(1)}px`
    );

    // Header extras appear once the scene's own clocks are out of view.
    const showClock = f.settled && f.horizonClock < 0.04 && f.dialClock < 0.04;
    write("hk-o", headerClockRef.current, "opacity", showClock ? "1" : "0");
    const overContent = f.exitPx > f.h * 0.45 && f.closing < 0.05;
    write("hb-o", headerBackRef.current, "opacity", overContent ? "1" : "0");
    const showJoin = f.settled && pin > 0.24 && f.closing < 0.35;
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
    set(horizonClockRef.current, {
      opacity: "1",
      position: "absolute",
      top: "calc(100dvh - 86px)",
      left: "50%",
      transform: "translate(-50%, -50%)",
    });
    set(dialClockRef.current, { display: "none" });
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
    set(headerBackRef.current, { opacity: "1" });
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

      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between px-5 sm:h-[68px] sm:px-9">
        {/* A plain backing once page content scrolls beneath the header. */}
        <div
          ref={headerBackRef}
          aria-hidden="true"
          style={{ opacity: 0 }}
          className="absolute inset-0 -z-10 border-b border-line bg-ground/90 backdrop-blur-md transition-opacity duration-200 ease-out"
        />
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
            className="h-11 cursor-pointer rounded-[8px] bg-ink px-4 text-[13.5px] font-semibold uppercase tracking-[0.03em] text-accent transition-opacity duration-100 ease-out active:opacity-70"
          >
            Join the waitlist
          </button>
        </div>
      </header>

      {/* Clocks that live inside the event horizon. */}
      <div
        ref={horizonClockRef}
        style={{ opacity: 0 }}
        className="pointer-events-none fixed left-0 top-0 z-20 will-change-transform"
      >
        <HorizonClock parts={clock} joined={joined} />
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
        <div
          ref={runwayRef}
          data-runway
          className={sceneOff ? "relative" : "relative h-[225dvh]"}
        >
          {sceneOff ? (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[100dvh] overflow-hidden"
            >
              {/* The horizon, drawn plainly: a black disc with a lit rim. */}
              <div className="absolute left-1/2 top-[calc(100dvh-170px)] size-[max(84vw,860px)] -translate-x-1/2 rounded-full border-2 border-peri bg-black shadow-[0_0_0_10px_rgba(133,138,227,0.18),0_0_90px_10px_rgba(97,61,193,0.55)]" />
            </div>
          ) : null}
          <div
            className={
              sceneOff
                ? "relative mx-auto flex min-h-[100dvh] max-w-[1120px] flex-col"
                : "sticky top-0 h-[100dvh] overflow-hidden"
            }
          >
            <section
              ref={heroRef}
              data-section="hero"
              style={{ opacity: sceneOff ? 1 : 0 }}
              className={`${
                sceneOff ? "relative min-h-[100dvh]" : "absolute inset-x-0 top-0"
              } flex flex-col items-center px-5 pt-[calc(56px+1.6dvh)] will-change-transform sm:pt-[calc(68px+2dvh)]`}
            >
              <h1 className="flex flex-col items-center text-center">
                <span className="statement text-[clamp(2.25rem,min(4.6vw,6.6dvh),3.9rem)] text-ink">
                  Fashion.
                </span>
                <GlyphMask
                  text="MINUS"
                  label="minus"
                  cell={6}
                  tints={MINUS_TINTS}
                  threshold={0.62}
                  silhouetteOpacity={0.34}
                  revealSource={minusReveal}
                  className="my-1.5 h-[min(62px,8dvh)] w-[min(300px,38.5dvh)] sm:my-2 sm:h-[min(92px,10.2dvh)] sm:w-[min(444px,49.2dvh)]"
                />
                <span className="statement text-[clamp(2.25rem,min(4.6vw,6.6dvh),3.9rem)] text-ink">
                  the Noise.
                </span>
              </h1>
              <p className="mt-3.5 max-w-[36ch] text-center text-[16px] leading-[1.45] text-soft sm:mt-4 sm:max-w-[44ch] sm:text-[18px]">
                Limited drops from independent brands, on one live clock.{" "}
                {live ? "On the App Store now." : "On the App Store January 1."}
              </p>
              {offerApp ? null : (
                <PerkLine className="mt-3 text-center [@media(max-height:680px)]:hidden" />
              )}
              <div ref={heroFormRef} className="mt-3.5 flex w-full flex-col items-center sm:mt-4">
                {offerApp ? (
                  <AppStoreButton />
                ) : (
                  <>
                    <WaitlistForm onPulse={pulse} roleSwitch={false} onJoined={() => setJoined(true)} />
                    <button
                      type="button"
                      onClick={() => goToForm("BRAND")}
                      className="mt-1 inline-flex h-11 cursor-pointer items-center text-[14px] text-mute underline decoration-peri/60 underline-offset-[3px] [@media(hover:hover)]:hover:text-ink"
                    >
                      Run a brand? Apply here
                    </button>
                  </>
                )}
              </div>
            </section>

            <div
              ref={premiseRef}
              style={{ opacity: 0, transform: "translateY(-50%)" }}
              className={sceneOff ? "max-w-[720px] px-5 pb-6 pt-20 sm:px-9" : "pointer-events-none absolute"}
            >
              <div style={{ transform: "translateY(var(--rise, 0px))" }}>
                <p className="statement text-[clamp(1.75rem,3.1vw,2.7rem)] leading-[1.04] text-ink">
                  The best clothes in the world rarely have the loudest voice.
                </p>
                <p className="mt-4 text-[15.5px] leading-[1.55] text-soft sm:mt-5 sm:text-[17px]">
                  <span className="hidden sm:inline">
                    Small brands put months into fabric, cut and finish, then
                    get one post to launch it.{" "}
                  </span>
                  T^minus gives every release a countdown, a place to get
                  ready, and one moment to open.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Features panelRef={featPanelRef} listRef={featListRef} />

        {/* Closing: the horizon returns. The audience choice changes the pitch. */}
        <section
          ref={closingRef}
          data-section="closing"
          className="relative flex min-h-[100dvh] flex-col items-center px-5 pt-[12dvh] sm:px-10 lg:px-20 lg:pt-[14dvh]"
        >
          <div className="grid w-full max-w-[1200px] grid-cols-1 items-start gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,1fr)_460px]">
            <div className="text-center lg:text-left">
              <h2 className="statement text-[clamp(2.9rem,7.2vw,6rem)] leading-[0.94] text-ink">
                {closingRole === "BRAND" ? (
                  <>
                    Launch on <br className="hidden lg:block" />
                    your own <span className="text-ice">clock.</span>
                  </>
                ) : (
                  <>
                    Be ready <br className="hidden lg:block" />
                    at <span className="text-ice">zero.</span>
                  </>
                )}
              </h2>
              <p className="mx-auto mt-4 max-w-[34ch] text-[16.5px] leading-[1.5] text-soft sm:text-[18px] lg:mx-0 lg:mt-6">
                {closingRole === "BRAND"
                  ? "Keep your identity, your pricing and your checkout. Turn each collection into a scheduled release. Leave a number and we\u2019ll text you about setting up your first drop."
                  : live
                    ? "T^minus is live. Leave your number for drop alerts."
                    : "Follow independent releases on a live clock and be there when they open. Leave your number and we\u2019ll text you the moment T^minus is live."}
              </p>
            </div>
            <div className="flex flex-col items-center lg:items-start lg:pt-2">
              <PerkLine className="mb-3 text-center lg:text-left" />
              <div ref={closingFormRef} className="flex w-full justify-center lg:justify-start">
                <WaitlistForm
                  inputRef={closingPhoneRef}
                  requestedRole={requestedRole}
                  onPulse={pulse}
                  onRoleChange={setClosingRole}
                  onJoined={() => setJoined(true)}
                  align="split"
                />
              </div>
            </div>
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
