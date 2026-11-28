"use client";

import React, { useEffect, useState } from "react";
import { LAUNCH_DATE_LONG, LAUNCH_MS } from "@/lib/launch";

export interface ClockParts {
  /** False before the first client tick, so server and client markup match. */
  ready: boolean;
  /** True once the launch time has passed: the clock reads T-plus and counts up. */
  plus: boolean;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const pad = (n: number) => String(Math.max(0, Math.floor(n))).padStart(2, "0");

function partsAt(nowMs: number): ClockParts {
  const diff = LAUNCH_MS - nowMs;
  const plus = diff <= 0;
  const total = Math.floor(Math.abs(diff) / 1000);
  return {
    ready: true,
    plus,
    days: pad(Math.floor(total / 86400)),
    hours: pad(Math.floor((total % 86400) / 3600)),
    minutes: pad(Math.floor((total % 3600) / 60)),
    seconds: pad(total % 60),
  };
}

const BLANK: ClockParts = {
  ready: false,
  plus: false,
  days: "--",
  hours: "--",
  minutes: "--",
  seconds: "--",
};

/** One ticking clock shared by every readout, aligned to the second boundary. */
export function useLaunchClock(): ClockParts {
  const [parts, setParts] = useState<ClockParts>(BLANK);
  useEffect(() => {
    let timer = 0;
    let disposed = false;
    const tick = () => {
      if (disposed) return;
      const now = Date.now();
      setParts(partsAt(now));
      const untilNext = 1000 - (Math.abs(LAUNCH_MS - now) % 1000) + 6;
      timer = window.setTimeout(tick, Math.min(1000, Math.max(40, untilNext)));
    };
    tick();
    return () => {
      disposed = true;
      window.clearTimeout(timer);
    };
  }, []);
  return parts;
}

/** The mark that opens every readout: the wordmark's T and the operator. */
function Prefix({ plus, className = "" }: { plus: boolean; className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-flex items-baseline ${className}`}>
      <span className="font-display font-semibold italic">T</span>
      <span className="font-sans font-medium">{plus ? "+" : "−"}</span>
    </span>
  );
}

function spoken(p: ClockParts) {
  if (!p.ready) return "Countdown to launch";
  const lead = p.plus ? "Launched" : "Launches in";
  const tail = p.plus ? "ago" : "";
  return `${lead} ${Number(p.days)} days, ${Number(p.hours)} hours, ${Number(p.minutes)} minutes ${tail}`.trim();
}

interface UnitProps {
  value: string;
  unit: string;
  numeralClass: string;
  unitClass: string;
}

function Unit({ value, unit, numeralClass, unitClass }: UnitProps) {
  return (
    <span className="inline-flex items-start">
      <span className={`value font-sans font-semibold ${numeralClass}`}>{value}</span>
      <span className={`font-mono font-medium ${unitClass}`}>{unit}</span>
    </span>
  );
}

/** The strip that sits inside the event horizon under the form. */
export function HorizonClock({ parts, joined = false }: { parts: ClockParts; joined?: boolean }) {
  const numeral =
    "text-[34px] leading-[0.9] tracking-[-0.03em] text-ink sm:text-[46px]";
  const unit = "ml-[3px] mt-[2px] text-[14px] leading-none text-peri sm:text-[17px]";
  return (
    <div
      role="timer"
      aria-label={spoken(parts)}
      className="flex select-none flex-col items-center whitespace-nowrap"
    >
      <div aria-hidden="true" className="flex items-start gap-2.5 sm:gap-4">
        <Prefix
          plus={parts.plus}
          className="text-[34px] leading-[0.9] text-ink sm:text-[46px]"
        />
        <Unit value={parts.days} unit="d" numeralClass={numeral} unitClass={unit} />
        <Unit value={parts.hours} unit="h" numeralClass={numeral} unitClass={unit} />
        <Unit value={parts.minutes} unit="m" numeralClass={numeral} unitClass={unit} />
        <Unit value={parts.seconds} unit="s" numeralClass={numeral} unitClass={unit} />
      </div>
      <p className="mt-2.5 font-sans text-[13px] leading-none text-mute sm:mt-3">
        {joined ? (
          <span className="text-ink">You&rsquo;re in. See you at zero.</span>
        ) : parts.plus ? (
          "Live on the App Store"
        ) : (
          `On the App Store ${LAUNCH_DATE_LONG}`
        )}
      </p>
    </div>
  );
}

/**
 * The large readout in the void when the hole is seen from above.
 * Sized in em: the page sets the font size from the radius of the void, and
 * the small type keeps a 12px floor however small the void gets.
 */
export function DialClock({ parts }: { parts: ClockParts }) {
  const small = "text-[max(12px,0.82em)]";
  const unit = `ml-[0.12em] mt-[0.05em] font-mono font-medium leading-none text-peri text-[max(12px,0.95em)]`;
  const numeral = "value font-sans text-[2.15em] font-semibold leading-[0.9] tracking-[-0.03em] text-ink";
  return (
    <div
      role="timer"
      aria-label={spoken(parts)}
      className="flex w-[18.75em] select-none flex-col items-center whitespace-nowrap"
    >
      <div aria-hidden="true" className="flex items-start">
        <Prefix plus={parts.plus} className="mr-[0.05em] text-[5.25em] leading-[0.8] text-ink" />
        <span className="value font-sans text-[7.4em] font-semibold leading-[0.8] tracking-[-0.045em] text-ink">
          {parts.days}
        </span>
        <span className="ml-[0.2em] mt-[0.2em] font-mono text-[max(15px,1.6em)] font-medium leading-none text-ice">
          d
        </span>
      </div>
      <div aria-hidden="true" className="mt-[1.25em] flex items-start gap-[1em]">
        <span className="inline-flex items-start">
          <span className={numeral}>{parts.hours}</span>
          <span className={unit}>h</span>
        </span>
        <span className="inline-flex items-start">
          <span className={numeral}>{parts.minutes}</span>
          <span className={unit}>m</span>
        </span>
        <span className="inline-flex items-start">
          <span className={numeral}>{parts.seconds}</span>
          <span className={unit}>s</span>
        </span>
      </div>
      <p className={`mt-[1em] font-sans leading-none text-mute ${small}`}>
        {parts.plus ? "Live on the App Store" : `On the App Store ${LAUNCH_DATE_LONG}`}
      </p>
    </div>
  );
}

/** One line for the header once the scene's own clocks have scrolled away. */
export function HeaderClock({ parts }: { parts: ClockParts }) {
  return (
    <span
      role="timer"
      aria-label={spoken(parts)}
      className="value inline-flex items-baseline gap-[0.45em] whitespace-nowrap font-mono text-[12px] font-medium text-soft sm:text-[13px]"
    >
      <span aria-hidden="true">
        {parts.plus ? "T+" : "T−"}
        {parts.days}
        <span className="text-peri">d</span>
      </span>
      <span aria-hidden="true">
        {parts.hours}
        <span className="text-peri">h</span>
      </span>
      <span aria-hidden="true">
        {parts.minutes}
        <span className="text-peri">m</span>
      </span>
      <span aria-hidden="true">
        {parts.seconds}
        <span className="text-peri">s</span>
      </span>
    </span>
  );
}
