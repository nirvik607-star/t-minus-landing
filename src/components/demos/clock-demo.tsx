"use client";

import React, { useEffect, useRef, useState } from "react";
import { AppFrame, AppLabel, usePrefersReducedMotion } from "@/components/demos/app-ui";
import { HeroClock, rungFor, type Rung } from "@/components/demos/hero-clock";
import { setSceneEnergy } from "@/lib/scene/energy";

interface Stage {
  id: string;
  name: string;
  /** Where the demo clock starts when this stage is chosen (seconds to launch). */
  start: number;
  shows: string;
  note: string;
}

const STAGES: Stage[] = [
  { id: "far", name: "Hours out", start: 11 * 3600 + 59 * 60 + 59, shows: "hh mm ss", note: "More than an hour out: hours, minutes and seconds." },
  { id: "hour", name: "Inside the hour", start: 59 * 60 + 59, shows: "mm ss", note: "The hours drop away and the pace picks up." },
  { id: "quarter", name: "Fifteen minutes", start: 14 * 60 + 59, shows: "mm ss", note: "Fifteen minutes. The field opens from the centre." },
  { id: "final", name: "The final minute", start: 12, shows: "ss", note: "Only seconds now, and only the letter T." },
  { id: "live", name: "Zero and after", start: 0, shows: "T+", note: "Zero. The minus becomes a plus and it keeps counting." },
];

const RUNG_STAGE: Record<Rung, number> = {
  distant: 0,
  approaching: 0,
  imminent: 1,
  critical: 2,
  final: 3,
  live: 4,
};

export function ClockDemo({ active }: { active: boolean }) {
  const reduced = usePrefersReducedMotion();
  const [seconds, setSeconds] = useState(STAGES[0].start);
  const [touched, setTouched] = useState(false);
  const [choice, setChoice] = useState(0);
  const chosenAt = useRef(0);

  // The demo clock runs in real seconds from wherever the stage starts.
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearInterval(id);
  }, [active]);

  // Until someone picks a stage, walk through them.
  useEffect(() => {
    if (!active || touched || reduced) return;
    chosenAt.current = performance.now();
    const id = window.setInterval(() => {
      setChoice((c) => {
        const next = (c + 1) % STAGES.length;
        setSeconds(STAGES[next].start);
        return next;
      });
    }, 5200);
    return () => window.clearInterval(id);
  }, [active, touched, reduced]);

  const stageIndex = RUNG_STAGE[rungFor(seconds)];
  const stage = STAGES[stageIndex];

  // The disk behind the demo quickens with the clock.
  useEffect(() => {
    if (!active) return;
    setSceneEnergy([0, 0.3, 0.55, 1, 0.8][stageIndex]);
    return () => setSceneEnergy(0);
  }, [active, stageIndex]);

  const pick = (i: number) => {
    setTouched(true);
    setChoice(i);
    setSeconds(STAGES[i].start);
  };

  return (
    <AppFrame label="Clock demo: how the countdown changes as launch approaches">
      <div className="px-0 pt-5">
        <div className="px-5">
          <AppLabel tone="accent">The clock</AppLabel>
        </div>
        <div className="mt-3 bg-black">
          <HeroClock secondsLeft={seconds} active={active} />
        </div>
        <div className="h-px w-full bg-[color:var(--aline)]" />
      </div>

      <div className="px-5 pb-5 pt-4">
        <p className="min-h-[2.7em] text-[0.9375em] leading-[1.4] text-[color:var(--secondary)]">
          {stage.note}
        </p>
        <div role="radiogroup" aria-label="Time to launch" className="mt-3 flex flex-col">
          {STAGES.map((s, i) => {
            const on = i === stageIndex;
            return (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => pick(i)}
                className={`group flex h-12 cursor-pointer items-center justify-between border-t border-[color:var(--aline)] text-left transition-colors duration-150 ease-out last:border-b ${
                  on ? "text-white" : "text-[color:var(--secondary)] [@media(hover:hover)]:hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`h-[2px] w-[18px] transition-colors duration-150 ${on ? "bg-accent" : "bg-transparent"}`}
                  />
                  <span className={`text-[0.9375em] ${on ? "font-semibold" : "font-normal"}`}>{s.name}</span>
                </span>
                <span className={`app-label ${on ? "text-ice" : "text-[color:var(--secondary)]"}`}>{s.shows}</span>
              </button>
            );
          })}
        </div>
        {choice === 3 && stageIndex === 4 ? (
          <p className="sr-only" aria-live="polite">
            The clock reached zero and is now counting up.
          </p>
        ) : null}
      </div>
    </AppFrame>
  );
}
