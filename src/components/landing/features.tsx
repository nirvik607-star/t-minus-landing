"use client";

import React, { useEffect, useRef, useState } from "react";
import { DropsHomeDemo } from "@/components/demos/drops-home-demo";
import { ClockDemo } from "@/components/demos/clock-demo";
import { SizeAssistDemo } from "@/components/demos/size-assist-demo";
import { HoldDemo } from "@/components/demos/hold-demo";
import { LabDemo } from "@/components/demos/lab-demo";
import { GarmentGlyph, type GarmentKind } from "@/components/demos/garment-glyph";

interface Feature {
  id: string;
  /** The feature's own name in the app. It is the headline. */
  name: string;
  /** First sentence: what it is. Set in white, the rest follows in a softer tone. */
  lead: string;
  body: string;
  tryIt: string;
  /** The same hint on small screens, where it differs. */
  tryItSmall?: string;
  Demo: React.ComponentType<{ active: boolean }>;
}

const FEATURES: Feature[] = [
  {
    id: "drops-home",
    name: "Drops Home",
    lead: "The next drop gets the whole screen.",
    body: "Every release you follow lives in one place, and whichever is next takes it over with its clock, its pieces and its price.",
    tryIt: "Tap the bookmark to track the drop.",
    Demo: DropsHomeDemo,
  },
  {
    id: "clock",
    name: "The clock",
    lead: "It changes as zero gets close.",
    body: "At one hour, fifteen minutes and one minute the clock tightens, so you can read how near a drop is at a glance. At zero it flips to T-plus and counts up, so you always know how long a drop has been open.",
    tryIt: "Pick a moment and watch it change.",
    Demo: ClockDemo,
  },
  {
    id: "size-assist",
    name: "Size Assist",
    lead: "Start from a size you already wear.",
    body: "Say what you usually wear and how it fits. Size Assist compares that with the brand's measurements and gives you a size, how sure it is, and a roomier option.",
    tryIt: "Change an answer and the size follows.",
    Demo: SizeAssistDemo,
  },
  {
    id: "hold",
    name: "Holds and Standby",
    lead: "A hold that tells you when it ends.",
    body: "At checkout your piece is held on a timer you can see. If your size sells out, Standby gives you a numbered place for that exact size.",
    tryIt: "Skip to the last five seconds.",
    Demo: HoldDemo,
  },
  {
    id: "lab",
    name: "Lab",
    lead: "Vote before it's made.",
    body: "Swipe through pieces that don't exist yet. Support one, pass on another, and brands hear it before a unit is cut.",
    tryIt: "Drag the card, or use the arrow keys.",
    tryItSmall: "Swipe the card, or tap a button.",
    Demo: LabDemo,
  },
];

const CLOSET: GarmentKind[] = ["jacket", "trouser", "liner", "tote"];

function useWide(query: string) {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return wide;
}

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

/** Marks a demo as a demo, in one quiet line above its frame. */
function Framed({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[400px]">
      <p className="mb-2 pr-1 text-right text-[12px] leading-none text-mute">Live demo, example data</p>
      {children}
    </div>
  );
}

function Copy({ feature }: { feature: Feature }) {
  return (
    <>
      <h3 className="headline text-[clamp(2.75rem,5.4vw,5rem)] text-ink">{feature.name}</h3>
      <p className="mt-5 max-w-[40ch] text-[18px] leading-[1.5] text-soft lg:text-[20px]">
        <span className="font-medium text-ink">{feature.lead}</span> {feature.body}
      </p>
      <p className="mt-5 max-w-[40ch] text-[15px] leading-[1.45] text-mute">
        <span className="text-ink">Try it.</span>{" "}
        {feature.tryItSmall ? (
          <>
            <span className="hidden lg:inline">{feature.tryIt}</span>
            <span className="lg:hidden">{feature.tryItSmall}</span>
          </>
        ) : (
          feature.tryIt
        )}
      </p>
    </>
  );
}

function InlineFeature({ feature }: { feature: Feature }) {
  const [ref, inView] = useInView<HTMLDivElement>("-10% 0px -10% 0px");
  const { Demo } = feature;
  return (
    <li data-feature={feature.id} className="py-10">
      <Copy feature={feature} />
      <div ref={ref} className="mt-8 flex justify-center">
        <Framed>
          <Demo active={inView} />
        </Framed>
      </div>
    </li>
  );
}

interface FeaturesProps {
  /** The section element, so the page can read scroll progress through it. */
  outerRef?: React.RefObject<HTMLElement | null>;
}

/**
 * The features play out inside the hole: a black stage with the lit rim
 * around it. On wide screens the demo stays put while the copy scrolls.
 */
export function Features({ outerRef }: FeaturesProps) {
  const wide = useWide("(min-width: 1024px)");
  const [active, setActive] = useState(0);
  const [sectionRef, sectionInView] = useInView<HTMLElement>("0px");
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  // Wide layout: the feature whose copy is nearest the middle of the screen is live.
  useEffect(() => {
    if (!wide) return;
    let raf = 0;
    const pick = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
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
      });
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

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        if (outerRef) outerRef.current = el;
      }}
      data-section="features"
      className="mx-auto w-full max-w-[1360px] px-5 pb-16 pt-[42dvh] sm:px-10 lg:px-20"
    >
      <h2 className="headline max-w-[14ch] text-[clamp(2.6rem,5.2vw,4.6rem)] text-ink">
        Inside: everything a drop needs.
      </h2>
      <p className="mt-5 max-w-[44ch] text-[18px] leading-[1.5] text-soft lg:text-[20px]">
        Five parts of the app, running here. They are small on purpose: this is
        how they look on your phone.
      </p>

      {wide ? (
        <div className="mt-4 grid grid-cols-[minmax(0,1fr)_460px] gap-x-16">
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
                  className={`transition-opacity duration-300 ease-out ${
                    i === active ? "opacity-100" : "opacity-40"
                  }`}
                >
                  <Copy feature={f} />
                </div>
              </li>
            ))}
          </ol>
          <div className="relative">
            <div className="sticky top-[max(72px,calc(50vh-345px))] h-[min(690px,calc(100vh-84px))]">
              {FEATURES.map((f, i) => {
                const on = i === active;
                const { Demo } = f;
                return (
                  <div
                    key={f.id}
                    aria-hidden={!on}
                    inert={!on}
                    className={`absolute inset-0 flex items-center justify-start transition-[opacity,transform] duration-300 ease-out ${
                      on
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-2 opacity-0"
                    }`}
                  >
                    <Framed>
                      <Demo active={on && sectionInView} />
                    </Framed>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <ol className="mt-2">
          {FEATURES.map((f) => (
            <InlineFeature key={f.id} feature={f} />
          ))}
        </ol>
      )}

      {/* After the drop: what you bought, kept. */}
      <div className="mt-10 grid grid-cols-1 items-center gap-x-16 gap-y-8 lg:mt-0 lg:grid-cols-[minmax(0,1fr)_460px]">
        <div>
          <h3 className="headline text-[clamp(2.75rem,5.4vw,5rem)] text-ink">Closet</h3>
          <p className="mt-5 max-w-[40ch] text-[18px] leading-[1.5] text-soft lg:text-[20px]">
            <span className="font-medium text-ink">What you bought, kept.</span> After a drop,
            each piece lands in your Closet with its size and the brand it came from, and each
            brand keeps its own membership.
          </p>
        </div>
        <ul
          aria-label="Four pieces in a closet"
          className="grid w-full max-w-[400px] grid-cols-2 gap-2 justify-self-center lg:justify-self-start"
        >
          {CLOSET.map((kind) => (
            <li
              key={kind}
              className="aspect-square rounded-[12px] border border-white/15 bg-[#13021D] p-3"
            >
              <GarmentGlyph kind={kind} label="" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
