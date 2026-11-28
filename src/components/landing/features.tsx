"use client";

import React, { useEffect, useRef, useState } from "react";
import { DropsHomeDemo } from "@/components/demos/drops-home-demo";
import { ClockDemo } from "@/components/demos/clock-demo";
// PENDING import { SizeAssistDemo } from "@/components/demos/size-assist-demo";
const SizeAssistDemo = PendingDemo;
// PENDING import { HoldDemo } from "@/components/demos/hold-demo";
const HoldDemo = PendingDemo;
// PENDING import { LabDemo } from "@/components/demos/lab-demo";
const LabDemo = PendingDemo;

/** Stands in while a demo is still being built. */
function PendingDemo(_: { active: boolean }) {
  return <div className="h-[560px] w-full max-w-[400px] rounded-[26px] border border-white/15 bg-black" />;
}

interface Feature {
  id: string;
  name: string;
  line: string;
  body: string;
  tryIt: string;
  Demo: React.ComponentType<{ active: boolean }>;
}

const FEATURES: Feature[] = [
  {
    id: "drops-home",
    name: "Drops Home",
    line: "Every drop in one place.",
    body: "The next release owns the whole screen: its clock, its pieces, its price. There is no feed to dig through.",
    tryIt: "Tap the bookmark to track the drop.",
    Demo: DropsHomeDemo,
  },
  {
    id: "clock",
    name: "The clock",
    line: "One clock, and it means it.",
    body: "It tightens at one hour, at fifteen minutes and in the final minute. At zero it doesn't stop. It becomes T-plus and keeps counting.",
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
      <p className="text-[15px] font-medium text-peri">{feature.name}</p>
      <h3 className="mt-3 max-w-[15ch] text-[clamp(2rem,3.5vw,3rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-ink">
        {feature.line}
      </h3>
      <p className="mt-4 max-w-[40ch] text-[17px] leading-[1.55] text-soft">{feature.body}</p>
      <p className="mt-5 text-[14.5px] leading-[1.4] text-mute">
        <span className="text-ink">Try it.</span> {feature.tryIt}
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

export function Features() {
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
      className="mx-auto w-full max-w-[1120px] px-5 pb-10 pt-24 sm:px-9 sm:pt-36"
    >
      <h2 className="max-w-[18ch] text-[clamp(2.2rem,4.4vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
        Everything a drop needs, before it opens.
      </h2>
      <p className="mt-5 max-w-[46ch] text-[17px] leading-[1.55] text-soft sm:text-[18px]">
        Five parts of the app, running here. They are small on purpose: this is
        how they look on your phone.
      </p>

      {wide ? (
        <div className="mt-6 grid grid-cols-[minmax(0,1fr)_420px] gap-x-20">
          <ol>
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
            <div className="sticky top-[max(84px,calc(50vh-330px))] h-[660px]">
              {FEATURES.map((f, i) => {
                const on = i === active;
                const { Demo } = f;
                return (
                  <div
                    key={f.id}
                    aria-hidden={!on}
                    inert={!on}
                    className={`absolute inset-0 flex items-start justify-center transition-[opacity,transform] duration-300 ease-out ${
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

      <p className="mt-10 max-w-[52ch] text-[17px] leading-[1.55] text-soft sm:mt-4">
        After the drop, every purchase lands in your Closet as a verified
        record, and each brand keeps its own membership.
      </p>
    </section>
  );
}
