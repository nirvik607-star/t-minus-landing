"use client";

import React, { useEffect, useRef, useState } from "react";
import { DropsHomeDemo } from "@/components/demos/drops-home-demo";
import { ClockDemo } from "@/components/demos/clock-demo";
import { SizeAssistDemo } from "@/components/demos/size-assist-demo";
import { HoldDemo } from "@/components/demos/hold-demo";
import { LabDemo } from "@/components/demos/lab-demo";

interface Feature {
  id: string;
  name: string;
  line: string;
  body: string;
  tryIt: string;
  /** The same hint for touch screens, where it differs. */
  tryItTouch?: string;
  Demo: React.ComponentType<{ active: boolean }>;
}

const FEATURES: Feature[] = [
  {
    id: "drops-home",
    name: "Drops Home",
    line: "The next drop gets the whole screen.",
    body: "One place for every release you follow. Whichever is next owns the screen: its clock, its pieces, its price. There is no feed to dig through.",
    tryIt: "Tap the bookmark to track the drop.",
    Demo: DropsHomeDemo,
  },
  {
    id: "clock",
    name: "The clock",
    line: "It tightens as zero gets close.",
    body: "The clock changes at one hour, at fifteen minutes and in the final minute. At zero it flips to T-plus and counts up, so you always know how long a drop has been open.",
    tryIt: "Pick a moment and watch the field change.",
    Demo: ClockDemo,
  },
  {
    id: "size-assist",
    name: "Size Assist",
    line: "Start from a size you already wear.",
    body: "Name a garment you own. Size Assist compares it with the brand's measurements and gives you a size, how confident it is, and a roomier option.",
    tryIt: "Change an answer and the size follows.",
    Demo: SizeAssistDemo,
  },
  {
    id: "hold",
    name: "Holds and Standby",
    line: "A hold that tells you when it ends.",
    body: "At checkout your piece is held on a visible timer. If your size sells out, Standby gives you a numbered place for that exact size.",
    tryIt: "Skip to the last five seconds.",
    Demo: HoldDemo,
  },
  {
    id: "lab",
    name: "Lab",
    line: "Vote before it's made.",
    body: "Swipe through unreleased concepts. Support one, pass on another. Brands see what is worth producing before a unit is cut.",
    tryIt: "Drag the card, or use the arrow keys.",
    tryItTouch: "Swipe the card, or tap a button.",
    Demo: LabDemo,
  },
];

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

function Copy({ feature }: { feature: Feature }) {
  return (
    <>
      <h3 className="headline text-[clamp(2.5rem,4.4vw,4rem)] text-ink">{feature.name}</h3>
      <p className="mt-4 max-w-[24ch] text-[clamp(1.25rem,1.7vw,1.5rem)] font-medium leading-[1.25] tracking-[-0.01em] text-ink">
        {feature.line}
      </p>
      <p className="mt-4 max-w-[40ch] text-[17px] leading-[1.55] text-soft">{feature.body}</p>
      <p className="mt-5 max-w-[40ch] text-[14.5px] leading-[1.45] text-mute">
        <span className="text-ink">Try it.</span>{" "}
        {feature.tryItTouch ? (
          <>
            <span className="[@media(hover:none)]:hidden">{feature.tryIt}</span>
            <span className="hidden [@media(hover:none)]:inline">{feature.tryItTouch}</span>
          </>
        ) : (
          feature.tryIt
        )}{" "}
        The demo runs on example data.
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
      <div ref={ref} className="mt-7 flex justify-center">
        <Demo active={inView} />
      </div>
    </li>
  );
}

interface FeaturesProps {
  /** The pinned demo column on wide screens, so the scene can sit behind it. */
  panelRef?: React.RefObject<HTMLDivElement | null>;
  /** The scrolling list of features, for scroll progress. */
  listRef?: React.RefObject<HTMLOListElement | null>;
}

export function Features({ panelRef, listRef }: FeaturesProps) {
  const wide = useWide("(min-width: 1024px)");
  const [active, setActive] = useState(0);
  const [sectionRef, sectionInView] = useInView<HTMLElement>("0px");
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  // Wide layout: the feature whose copy crosses the middle of the screen is live.
  useEffect(() => {
    if (!wide) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = itemRefs.current.indexOf(e.target as HTMLLIElement);
            if (i >= 0) setActive(i);
          }
        }
      },
      { rootMargin: "-48% 0px -48% 0px" }
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [wide]);

  return (
    <section
      ref={sectionRef}
      data-section="features"
      className="mx-auto w-full max-w-[1360px] px-5 pb-10 pt-24 sm:px-10 sm:pt-36 lg:px-20"
    >
      <h2 className="headline max-w-[16ch] text-[clamp(2.6rem,5.2vw,4.6rem)] text-ink">
        Everything a drop needs, before it opens.
      </h2>
      <p className="mt-5 max-w-[46ch] text-[17px] leading-[1.55] text-soft sm:text-[18px]">
        Five parts of the app, running here. They are small on purpose: this is
        how they look on your phone.
      </p>

      {wide ? (
        <div className="mt-6 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-16">
          <ol ref={listRef}>
            {FEATURES.map((f, i) => (
              <li
                key={f.id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                data-feature={f.id}
                className="flex min-h-[82vh] flex-col justify-center"
              >
                <div
                  className={`transition-opacity duration-300 ease-out ${
                    i === active ? "opacity-100" : "opacity-45"
                  }`}
                >
                  <Copy feature={f} />
                </div>
              </li>
            ))}
          </ol>
          <div className="relative">
            <div
              ref={panelRef}
              className="sticky top-[max(76px,calc(50vh-330px))] h-[min(660px,calc(100vh-92px))]"
            >
              {FEATURES.map((f, i) => {
                const on = i === active;
                const { Demo } = f;
                return (
                  <div
                    key={f.id}
                    aria-hidden={!on}
                    inert={!on}
                    className={`absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-300 ease-out ${
                      on
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-2 opacity-0"
                    }`}
                  >
                    <Demo active={on && sectionInView} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <ol className="mt-4">
          {FEATURES.map((f) => (
            <InlineFeature key={f.id} feature={f} />
          ))}
        </ol>
      )}

      <p className="mt-12 max-w-[30ch] border-t border-line pt-10 text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-[1.25] tracking-[-0.015em] text-ink sm:mt-6 lg:pt-14">
        After the drop, what you bought lands in your Closet, and each brand
        keeps its own membership.
      </p>
    </section>
  );
}
