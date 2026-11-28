"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DropsHomeDemo } from "@/components/demos/drops-home-demo";
import { ClockDemo } from "@/components/demos/clock-demo";
import { SizeAssistDemo } from "@/components/demos/size-assist-demo";
import { HoldDemo } from "@/components/demos/hold-demo";
import { LabDemo } from "@/components/demos/lab-demo";
import { GarmentGlyph, type GarmentKind } from "@/components/demos/garment-glyph";
import { isWideStage, smooth, stageLayout, stageZoom } from "@/lib/scene/director";
import { sceneStage } from "@/lib/scene/energy";

interface Feature {
  id: string;
  /** The feature's own name in the app. It is the headline. */
  name: string;
  /** First sentence: what it is. Set in white, the rest follows in a softer tone. */
  lead: string;
  body: string;
  /** What to do with the demo. */
  hint?: string;
  /** The same hint on small screens, where it differs. */
  hintSmall?: string;
  Demo: React.ComponentType<{ active: boolean }>;
}

const CLOSET: Array<{ kind: GarmentKind; name: string; meta: string }> = [
  { kind: "jacket", name: "Field Jacket", meta: "Size M / Studio 01" },
  { kind: "trouser", name: "Zip-off Trouser", meta: "Size 32 / Studio 03" },
  { kind: "liner", name: "Quilted Liner", meta: "Size M / Studio 05" },
  { kind: "tote", name: "Modular Tote", meta: "One size / Studio 04" },
];

/** Not an app screen: four pieces as they would sit in a closet, drawn in glyphs. */
function ClosetPieces() {
  return (
    <ul aria-label="Four pieces in an example closet" className="grid w-full max-w-[400px] grid-cols-2 gap-2.5">
      {CLOSET.map((item) => (
        <li key={item.kind} className="rounded-[14px] border border-white/15 bg-[#13021D] p-3.5">
          <div className="aspect-square">
            <GarmentGlyph kind={item.kind} label={`${item.name}, drawn in glyphs`} />
          </div>
          <p className="mt-2 text-[15px] font-medium leading-tight text-ink">{item.name}</p>
          <p className="app-label mt-1 text-[12px] text-mute">{item.meta}</p>
        </li>
      ))}
    </ul>
  );
}

const FEATURES: Feature[] = [
  {
    id: "drops-home",
    name: "Drops Home",
    lead: "The next drop gets the whole screen.",
    body: "Every release you follow lives in one place, and whichever is next takes it over with its clock, its pieces and its price.",
    hint: "Tap the bookmark to track the drop.",
    Demo: DropsHomeDemo,
  },
  {
    id: "clock",
    name: "The clock",
    lead: "It changes as zero gets close.",
    body: "At one hour, fifteen minutes and one minute the clock tightens, so you can read how near a drop is at a glance. At zero it flips to T‑plus and counts up, so you always know how long a drop has been open.",
    hint: "Pick a moment and watch it change.",
    Demo: ClockDemo,
  },
  {
    id: "size-assist",
    name: "Size Assist",
    lead: "Start from a size you already wear.",
    body: "Say what you usually wear and how it fits. Size Assist compares that with the brand's measurements and gives you a size, how sure it is, and a roomier option.",
    hint: "Change an answer and the size follows.",
    Demo: SizeAssistDemo,
  },
  {
    id: "hold",
    name: "Holds and Standby",
    lead: "A hold that tells you when it ends.",
    body: "At checkout your piece is held on a timer you can see. If your size sells out, Standby gives you a numbered place for that exact size.",
    hint: "Skip to the last five seconds.",
    Demo: HoldDemo,
  },
  {
    id: "lab",
    name: "Lab",
    lead: "Vote before it's made.",
    body: "Swipe through pieces that don't exist yet. Support one, pass on another, and brands hear it before a unit is cut.",
    hint: "Drag the card, or use the arrow keys.",
    hintSmall: "Swipe the card, or tap a button.",
    Demo: LabDemo,
  },
  {
    id: "closet",
    name: "Closet",
    lead: "What you bought, kept.",
    body: "After a drop, each piece lands in your Closet with its size and the brand it came from. Brands can run their own membership inside the app.",
    Demo: ClosetPieces,
  },
];

/** True while the element is near the middle of the viewport. */
function useInView<T extends Element>(margin = "-20% 0px -20% 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, inView] as const;
}

function Copy({ feature, wide }: { feature: Feature; wide: boolean }) {
  const hint = !wide && feature.hintSmall ? feature.hintSmall : feature.hint;
  return (
    <>
      <h3
        className={`headline text-ink ${
          wide ? "text-[clamp(2.75rem,4.7vw,4.5rem)]" : "text-[clamp(2.75rem,5.4vw,5rem)]"
        }`}
      >
        {feature.name}
      </h3>
      <p className="mt-5 max-w-[40ch] text-[18px] leading-[1.5] text-soft lg:text-[19px]">
        <span className="font-medium text-ink">{feature.lead}</span> {feature.body}
      </p>
      {hint ? (
        <p className="mt-5 flex items-baseline gap-2.5 text-[15px] leading-[1.45] text-soft">
          {/* The demo sits to the left on wide screens and below on small ones. */}
          <span aria-hidden="true" className="text-peri">
            {wide ? "←" : "↓"}
          </span>
          {hint}
        </p>
      ) : null}
    </>
  );
}

function InlineFeature({ feature }: { feature: Feature }) {
  const [ref, inView] = useInView<HTMLDivElement>("-10% 0px -10% 0px");
  const { Demo } = feature;
  return (
    <li data-feature={feature.id} className="py-10">
      <Copy feature={feature} wide={false} />
      <div ref={ref} className="mt-8 flex justify-center">
        <Demo active={inView} />
      </div>
    </li>
  );
}

interface FeaturesProps {
  /** The section element, so the page can read scroll progress through it. */
  outerRef?: React.RefObject<HTMLElement | null>;
  /** False when the page is laid out statically, without the black hole. */
  scene: boolean;
}

interface Layout {
  cx: number;
  r: number;
  copyW: number;
  /** Viewport x of the stage column's left edge. */
  colLeft: number;
  zooms: number[];
}

const CARD_W = 400;

/**
 * The features are read through the hole. On wide screens a full ring frames
 * the demo, which stays put while the copy scrolls beside it. On small screens
 * copy and demo scroll together behind the rim.
 */
export function Features({ outerRef, scene }: FeaturesProps) {
  const [wide, setWide] = useState(false);
  const [active, setActive] = useState(0);
  const [layout, setLayout] = useState<Layout | null>(null);
  const [sectionRef, sectionInView] = useInView<HTMLElement>("0px");
  const stageColRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const copyRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cardHeights = useRef<number[]>([]);

  useEffect(() => {
    const update = () => setWide(isWideStage(window.innerWidth, window.innerHeight));
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  // Wide layout: size the ring to the window and each demo to the ring.
  useLayoutEffect(() => {
    if (!wide) {
      sceneStage.on = false;
      setLayout(null);
      return;
    }
    const compute = (reset: boolean) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const s = stageLayout(w, h);
      if (reset) cardHeights.current = [];
      const zooms = FEATURES.map((_, i) => {
        const el = cardRefs.current[i];
        // A demo may grow as it is used; it is never scaled back up afterwards.
        const seen = Math.max(cardHeights.current[i] ?? 0, el?.offsetHeight ?? 0);
        cardHeights.current[i] = seen;
        return stageZoom(s.r, CARD_W, seen || 640);
      });
      const colLeft = stageColRef.current?.getBoundingClientRect().left ?? 0;
      sceneStage.on = true;
      sceneStage.cx = s.cx;
      sceneStage.cy = s.cy;
      sceneStage.r = s.r;
      sceneStage.guardX = s.copyLeft - 6;
      setLayout((prev) =>
        prev &&
        prev.cx === s.cx &&
        prev.r === s.r &&
        prev.copyW === s.copyW &&
        prev.colLeft === colLeft &&
        prev.zooms.every((z, i) => Math.abs(z - zooms[i]) < 0.004)
          ? prev
          : { cx: s.cx, r: s.r, copyW: s.copyW, colLeft, zooms }
      );
    };
    compute(true);
    const onResize = () => compute(true);
    window.addEventListener("resize", onResize, { passive: true });
    const ro = new ResizeObserver(() => compute(false));
    cardRefs.current.forEach((el) => el && ro.observe(el));
    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      sceneStage.on = false;
    };
  }, [wide]);

  // Wide layout: the feature whose copy is nearest the middle of the screen
  // is live, and each block of copy is only fully present near the middle,
  // so one thing is read at a time and nothing slides under the header.
  useEffect(() => {
    if (!wide) return;
    let raf = 0;
    const pick = () => {
      raf = 0;
      const h = window.innerHeight;
      const mid = h / 2;
      let best = 0;
      let bestDist = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs((r.top + r.bottom) / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
        const copy = copyRefs.current[i];
        if (copy) copy.style.opacity = (1 - smooth(0.2 * h, 0.43 * h, d)).toFixed(3);
      });
      const intro = introRef.current;
      if (intro) {
        const r = intro.getBoundingClientRect();
        intro.style.opacity = smooth(0.1 * h, 0.27 * h, (r.top + r.bottom) / 2).toFixed(3);
      }
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(pick);
    };
    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [wide]);

  const intro = (
    <>
      <h2 className="headline max-w-[14ch] text-[clamp(2.6rem,4.7vw,4.4rem)] text-ink">
        Inside the app.
      </h2>
      <p className="mt-5 max-w-[40ch] text-[18px] leading-[1.5] text-soft lg:text-[19px]">
        Six parts of it, working. Every demo is live and runs on example data.
      </p>
    </>
  );

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        if (outerRef) outerRef.current = el;
      }}
      data-section="features"
      // With the scene on, the section starts under the end of the runway: it
      // is hidden there, and rises into the hole as the hole opens.
      className={`relative mx-auto w-full max-w-[1360px] px-5 sm:px-10 lg:px-20 ${
        scene ? "-mt-[25dvh]" : "pt-10"
      }`}
    >
      {wide ? (
        <div
          className="grid gap-x-0"
          style={{ gridTemplateColumns: `minmax(0,1fr) ${layout?.copyW ?? 400}px` }}
        >
          {/* The stage: under the scene, seen through the hole. */}
          <div ref={stageColRef} className="relative z-[1]">
            <div className="sticky top-0 h-[100dvh]">
              {FEATURES.map((f, i) => {
                const on = i === active;
                const { Demo } = f;
                return (
                  <div
                    key={f.id}
                    aria-hidden={!on}
                    inert={!on}
                    style={{
                      left: layout ? layout.cx - layout.colLeft : "50%",
                      width: CARD_W,
                      transform: `translate(-50%, -50%) scale(${layout?.zooms[i] ?? 1})`,
                    }}
                    className={`absolute top-1/2 transition-opacity duration-300 ease-out ${
                      on ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                  >
                    <div
                      ref={(el) => {
                        cardRefs.current[i] = el;
                      }}
                    >
                      <Demo active={on && sectionInView} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* The copy: beside the ring, over open ground. */}
          <div className="relative z-10">
            <div ref={introRef} className="pt-[30vh]">
              {intro}
            </div>
            <ol>
              {FEATURES.map((f, i) => (
                <li
                  key={f.id}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  data-feature={f.id}
                  className="flex min-h-[86vh] flex-col justify-center"
                >
                  <div
                    ref={(el) => {
                      copyRefs.current[i] = el;
                    }}
                  >
                    <Copy feature={f} wide />
                  </div>
                </li>
              ))}
            </ol>
            <div aria-hidden="true" className="h-[16vh]" />
          </div>
        </div>
      ) : (
        <div className={`relative z-[1] ${scene ? "pt-9" : ""}`}>
          {intro}
          <ol className="mt-2 pb-10">
            {FEATURES.map((f) => (
              <InlineFeature key={f.id} feature={f} />
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
