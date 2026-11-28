"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import {
  AppCard,
  AppFrame,
  AppLabel,
  AppPrimaryButton,
  usePrefersReducedMotion,
} from "./app-ui";

/**
 * Size Assist: the result step, with the three answers live above it so a
 * visitor can change one and watch the starting size follow. The rule is the
 * app's own. The reference garment is treated as a known brand.
 */

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
type Size = (typeof SIZES)[number];

const REFERENCE_FITS = ["Snug", "Regular", "Relaxed", "Oversized"] as const;
type ReferenceFit = (typeof REFERENCE_FITS)[number];

const DESIRED_FITS = ["Tighter", "Similar", "Looser"] as const;
type DesiredFit = (typeof DESIRED_FITS)[number];

/** Confidence for a reference from a brand the app already knows. */
const BASE_CONFIDENCE = 84;
const CONFIRM_MS = 1600;
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";

interface Recommendation {
  recommended: Size;
  confidence: number;
  alternate: Size;
  alternateConfidence: number;
  label: "RECOMMENDED" | "CLOSER FIT";
  rationale: string;
}

function recommend(size: Size, fit: ReferenceFit, desired: DesiredFit): Recommendation {
  let index = SIZES.indexOf(size);
  if (fit === "Snug") index += 1;
  if (fit === "Oversized") index -= 1;
  if (desired === "Tighter") index -= 1;
  if (desired === "Looser") index += 1;

  const last = SIZES.length - 1;
  const primary = Math.min(Math.max(index, 0), last);
  // One size up, or one down from the top of the range.
  const alternate = primary < last ? primary + 1 : primary - 1;

  let confidence = BASE_CONFIDENCE;
  if (desired !== "Similar") confidence -= 4;
  if (fit === "Snug" || fit === "Oversized") confidence -= 5;

  return {
    recommended: SIZES[primary],
    confidence,
    alternate: SIZES[alternate],
    alternateConfidence: Math.max(48, confidence - 18),
    label: desired === "Tighter" ? "CLOSER FIT" : "RECOMMENDED",
    rationale: `Your usual ${size} fits ${fit.toLowerCase()}. For a ${desired.toLowerCase()} feel in this piece, start with ${SIZES[primary]}.`,
  };
}

/**
 * Wraps a value that can change. When it does, the new value settles in with
 * a short fade and rise. Nothing plays on first render or when `animate` is off.
 */
function Swap({
  value,
  animate,
  display = "inline-block",
  className = "",
  children,
}: {
  value: string | number;
  animate: boolean;
  display?: "inline-block" | "block" | "inline-flex";
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const previous = useRef(value);
  useEffect(() => {
    if (previous.current === value) return;
    previous.current = value;
    const el = ref.current;
    if (!animate || !el || typeof el.animate !== "function") return;
    const run = el.animate(
      [
        { opacity: 0, transform: "translateY(0.2em)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 180, easing: EASE_OUT }
    );
    return () => run.cancel();
  }, [value, animate]);
  return (
    <span ref={ref} className={`${display} ${className}`}>
      {children}
    </span>
  );
}

/** Arrow keys move the choice inside a radio group; Home and End jump to the ends. */
function moveChoice<T extends string>(
  e: React.KeyboardEvent<HTMLDivElement>,
  options: readonly T[],
  value: T,
  onChange: (next: T) => void
) {
  const current = options.indexOf(value);
  let next: number | null = null;
  if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (current + 1) % options.length;
  else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
    next = (current - 1 + options.length) % options.length;
  else if (e.key === "Home") next = 0;
  else if (e.key === "End") next = options.length - 1;
  if (next === null) return;
  e.preventDefault();
  onChange(options[next]);
  e.currentTarget.querySelectorAll<HTMLElement>('[role="radio"]')[next]?.focus();
}

function ChipRow<T extends string>({
  question,
  options,
  value,
  onChange,
  columns,
}: {
  question: string;
  options: readonly T[];
  value: T;
  onChange: (next: T) => void;
  /** Grid column class, one column per option. */
  columns: string;
}) {
  const labelId = useId();
  return (
    <div>
      <AppLabel className="block" tone="secondary">
        <span id={labelId}>{question}</span>
      </AppLabel>
      <div
        role="radiogroup"
        aria-labelledby={labelId}
        onKeyDown={(e) => moveChoice(e, options, value, onChange)}
        className={`mt-[0.4375em] grid gap-[0.375em] ${columns}`}
      >
        {options.map((option) => {
          const checked = option === value;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={checked ? 0 : -1}
              onClick={() => onChange(option)}
              className={`flex h-[2.75em] min-h-[44px] min-w-0 cursor-pointer items-center justify-center rounded-[8px] border active:opacity-70 ${
                checked
                  ? "border-accent bg-[color:var(--accent-soft)] text-white"
                  : "border-[color:var(--aline)] bg-[rgb(28_28_30/0.62)] text-[color:var(--secondary)] [@media(hover:hover)]:hover:border-white/30 [@media(hover:hover)]:hover:text-white"
              }`}
            >
              <span className={`text-[0.875em] ${checked ? "font-semibold" : "font-medium"}`}>
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ResultCard({
  selected,
  size,
  label,
  confidence,
  detail,
  animate,
}: {
  selected: boolean;
  size: Size;
  label: string;
  confidence: number;
  detail: string;
  animate: boolean;
}) {
  return (
    <AppCard
      selected={selected}
      className={`flex items-start gap-[0.875em] px-[1em] py-[0.875em] ${
        selected ? "" : "bg-[rgb(28_28_30/0.62)]!"
      }`}
    >
      <div className="-mt-[0.0625em] w-[3.25em] shrink-0">
        <Swap
          value={size}
          animate={animate}
          className={`font-mono font-medium ${
            size.length > 2 ? "text-[1.4375em] leading-[1.3]" : "text-[1.875em] leading-none"
          } ${selected ? "text-[#8f6cf0]" : "text-white"}`}
        >
          {size}
        </Swap>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-[0.75em] gap-y-[0.3125em]">
          <span className="app-label font-semibold! text-[#8f6cf0]">
            <Swap value={label} animate={animate}>
              {label}
            </Swap>
          </span>
          <span className="app-label text-[color:var(--secondary)]">
            <Swap value={confidence} animate={animate}>
              {confidence}%
            </Swap>{" "}
            demo confidence
          </span>
        </div>
        <p className="mt-[0.45em] text-[0.8125em] leading-[1.4] text-[color:var(--secondary)]">
          <Swap value={detail} animate={animate} display="block">
            {detail}
          </Swap>
        </p>
      </div>
    </AppCard>
  );
}

export function SizeAssistDemo({ active }: { active: boolean }) {
  const reduced = usePrefersReducedMotion();
  const [size, setSize] = useState<Size>("M");
  const [fit, setFit] = useState<ReferenceFit>("Regular");
  const [desired, setDesired] = useState<DesiredFit>("Similar");
  const [confirmed, setConfirmed] = useState<Size | null>(null);

  const result = recommend(size, fit, desired);
  const animate = active && !reduced;
  const showConfirmed = active && confirmed === result.recommended;

  // The confirmed state is brief, and only runs while the demo is on screen.
  useEffect(() => {
    if (confirmed === null) return;
    if (!active) {
      setConfirmed(null);
      return;
    }
    const id = window.setTimeout(() => setConfirmed(null), CONFIRM_MS);
    return () => window.clearTimeout(id);
  }, [confirmed, active]);

  function answer<T>(set: (next: T) => void) {
    return (next: T) => {
      set(next);
      setConfirmed(null);
    };
  }

  return (
    <AppFrame label="Size Assist demo">
      <div className="flex flex-col px-[1.25em] pb-[1.25em] pt-[1.125em]">
        <div className="flex flex-col gap-[0.4375em]">
          <div className="flex items-center gap-[0.5em]">
            <span aria-hidden="true" className="app-label text-[#8f6cf0]">
              +
            </span>
            <AppLabel tone="ink">Size Assist / result</AppLabel>
          </div>
          <p aria-live="polite" aria-atomic="true" className="app-serif text-[2em] text-white">
            Start with{" "}
            <Swap value={result.recommended} animate={animate}>
              {result.recommended}
            </Swap>
            .
          </p>
          <p className="text-[0.875em] leading-[1.4] text-[color:var(--secondary)]">
            <Swap value={result.confidence} animate={animate}>
              {result.confidence}%
            </Swap>{" "}
            demo confidence, with one clear alternate. You make the final choice.
          </p>
        </div>

        <div className="mt-[1em] flex flex-col gap-[0.625em]">
          <ChipRow
            question="What size do you wear?"
            options={SIZES}
            value={size}
            onChange={answer(setSize)}
            columns="grid-cols-6"
          />
          <ChipRow
            question="How does it fit you?"
            options={REFERENCE_FITS}
            value={fit}
            onChange={answer(setFit)}
            columns="grid-cols-4"
          />
          <ChipRow
            question="How should this piece fit?"
            options={DESIRED_FITS}
            value={desired}
            onChange={answer(setDesired)}
            columns="grid-cols-3"
          />
        </div>

        <div className="mt-[1em] flex flex-col gap-[0.625em]">
          <ResultCard
            selected
            size={result.recommended}
            label={result.label}
            confidence={result.confidence}
            detail={result.rationale}
            animate={animate}
          />
          <ResultCard
            selected={false}
            size={result.alternate}
            label="MORE RELAXED"
            confidence={result.alternateConfidence}
            detail="Choose this if you want additional room through the garment."
            animate={animate}
          />
        </div>

        <div className="mt-[0.875em]">
          <AppPrimaryButton
            onClick={() => {
              if (!showConfirmed) setConfirmed(result.recommended);
            }}
          >
            <Swap
              value={showConfirmed ? "done" : "use"}
              animate={animate}
              display="inline-flex"
              className="items-center"
            >
              {showConfirmed ? (
                <>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="mr-[0.5em] size-[1em]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3.2 8.4l3 3 6.6-7" />
                  </svg>
                  Size {result.recommended} selected
                </>
              ) : (
                <>
                  Use size&nbsp;
                  <Swap value={result.recommended} animate={animate}>
                    {result.recommended}
                  </Swap>
                </>
              )}
            </Swap>
          </AppPrimaryButton>
          <span role="status" className="sr-only">
            {showConfirmed ? `Size ${result.recommended} selected.` : ""}
          </span>
        </div>
      </div>
    </AppFrame>
  );
}
