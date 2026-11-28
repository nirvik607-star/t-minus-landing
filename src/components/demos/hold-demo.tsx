"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import {
  AppCard,
  AppFrame,
  AppLabel,
  AppPrimaryButton,
  AppRail,
  GlyphPatch,
  usePrefersReducedMotion,
} from "./app-ui";

/**
 * Hold and Standby. Hold is the checkout screen's five-minute allocation
 * hold, running on a real clock. Standby is what the product page offers
 * once the allocation is gone.
 */

type View = "hold" | "standby";
const VIEWS: readonly View[] = ["hold", "standby"];
const VIEW_LABEL: Record<View, string> = { hold: "Hold", standby: "Standby" };

const HOLD_SECONDS = 300;
const LAST_SECONDS = 5;
const NOTE_MS = 1600;
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
/** iOS system red in dark mode, at the 88% the app draws it. */
const EXPIRED_RED = "text-[rgb(255_69_58/0.88)]";

const ITEM = { name: "Field Jacket", price: "$148", size: "M" } as const;
/** The drop's pool: 50 allocated, 23 sold, one unit in this hold. */
const POOL = { allocated: 50, sold: 23, held: 1, open: 26 } as const;

const STANDBY_SIZES = ["S", "M", "L", "XL"] as const;
type StandbySize = (typeof STANDBY_SIZES)[number];
const STANDBY_POSITION = 7;

function clock(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** Arrow keys move the choice inside a radio group; Home and End jump to the ends. */
function moveChoice<T extends string>(
  e: React.KeyboardEvent<HTMLDivElement>,
  options: readonly T[],
  value: T | null,
  onChange: (next: T) => void
) {
  const current = value === null ? -1 : options.indexOf(value);
  let next: number | null = null;
  if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (current + 1) % options.length;
  else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
    next = (Math.max(current, 0) - 1 + options.length) % options.length;
  else if (e.key === "Home") next = 0;
  else if (e.key === "End") next = options.length - 1;
  if (next === null) return;
  e.preventDefault();
  onChange(options[next]);
  e.currentTarget.querySelectorAll<HTMLElement>('[role="radio"]')[next]?.focus();
}

/** Content that settles in with a short fade and rise when it first appears. */
function Reveal({
  animate,
  className = "",
  children,
  ...rest
}: {
  animate: boolean;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const animateOnMount = useRef(animate);
  useEffect(() => {
    const el = ref.current;
    if (!animateOnMount.current || !el || typeof el.animate !== "function") return;
    const run = el.animate(
      [
        { opacity: 0, transform: "translateY(6px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 180, easing: EASE_OUT }
    );
    return () => run.cancel();
  }, []);
  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
}

function Check() {
  return (
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
  );
}

function ViewSwitch({ value, onChange }: { value: View; onChange: (next: View) => void }) {
  return (
    <div
      role="radiogroup"
      aria-label="Demo view"
      onKeyDown={(e) => moveChoice(e, VIEWS, value, onChange)}
      className="relative grid grid-cols-2 rounded-[10px] border border-[color:var(--aline)] bg-[color:var(--amuted)] p-[3px]"
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-[3px] left-[3px] top-[3px] w-[calc(50%-3px)] rounded-[7px] border border-white/10 bg-[#3a3a3c] transition-transform duration-200 ease-out motion-reduce:transition-none ${
          value === "standby" ? "translate-x-full" : "translate-x-0"
        }`}
      />
      {VIEWS.map((view) => {
        const checked = view === value;
        return (
          <button
            key={view}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            onClick={() => onChange(view)}
            className={`relative z-10 flex h-[2.75em] min-h-[44px] cursor-pointer items-center justify-center rounded-[7px] ${
              checked
                ? "text-white"
                : "text-[color:var(--secondary)] [@media(hover:hover)]:hover:text-white"
            }`}
          >
            <span className={`text-[0.875em] ${checked ? "font-semibold" : "font-medium"}`}>
              {VIEW_LABEL[view]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** A soft plate behind band copy, so field marks never run through the text. */
function Veil() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -inset-x-[0.875em] -inset-y-[0.6875em] rounded-[0.75em] bg-[color:var(--void)] blur-[6px]"
    />
  );
}

function PoolCell({ value, label, accent = false }: { value: number; label: string; accent?: boolean }) {
  return (
    <div className="flex flex-col-reverse gap-[0.1875em] bg-[color:var(--void)] px-[0.5625em] py-[0.625em]">
      <dt className="font-mono text-[0.5625em] font-medium uppercase leading-[1.2] tracking-[0.04em] text-white/[0.52]">
        {label}
      </dt>
      <dd
        className={`font-mono text-[0.9375em] font-semibold leading-[1.2] ${
          accent ? "text-ice" : "text-white"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function HoldBand({ remaining }: { remaining: number }) {
  const expired = remaining <= 0;
  return (
    <div className="overflow-hidden rounded-[12px] border border-white/[0.13]">
      <div className="relative flex min-h-[5.125em] items-center justify-between gap-[0.75em] bg-[color:var(--void)] px-[1em] py-[0.75em]">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 -inset-x-[4.5px] [mask-composite:intersect] [mask-image:linear-gradient(90deg,transparent_1%,#000_7%,#000_93%,transparent_99%),linear-gradient(180deg,#000_72%,transparent_98%)]"
        >
          <GlyphPatch
            cell={9}
            glyphColor={expired ? "#FF453A" : "#4E148C"}
            glyphOpacity={expired ? 0.12 : 0.26}
            signalColor={expired ? "rgba(255, 69, 58, 0.55)" : "#97DFFC"}
            signalThreshold={0.93}
            opacity={1}
          />
        </div>
        <div aria-live="polite" className="relative min-w-0">
          <Veil />
          <p
            className={`relative font-mono text-[0.625em] font-medium uppercase leading-[1.25] tracking-[0.045em] ${
              expired ? EXPIRED_RED : "text-white"
            }`}
          >
            {expired ? "Hold expired" : "Allocation held"}
          </p>
          <p className="relative mt-[0.4em] font-mono text-[0.625em] font-medium leading-[1.25] tracking-[0.045em] text-white/[0.62]">
            {expired ? "Units returned to the pool." : "Complete checkout before zero."}
          </p>
        </div>
        <div className="relative shrink-0">
          <Veil />
          <span
            role="timer"
            aria-atomic="true"
            className={`relative block font-mono text-[1.875em] font-medium leading-none ${
              expired ? EXPIRED_RED : "text-ice"
            }`}
          >
            <span className="sr-only">Hold time remaining </span>
            {clock(remaining)}
          </span>
        </div>
      </div>
      <dl className="grid grid-cols-4 gap-px bg-white/10">
        <PoolCell value={POOL.allocated} label="Allocated" />
        <PoolCell value={POOL.sold} label="Sold" />
        <PoolCell value={expired ? 0 : POOL.held} label="Held" accent={!expired} />
        <PoolCell value={expired ? POOL.open + POOL.held : POOL.open} label="Open" />
      </dl>
    </div>
  );
}

function HoldView({ active }: { active: boolean }) {
  const [remaining, setRemaining] = useState(HOLD_SECONDS);
  // Bumped whenever the clock is set, so the next tick lands a full second later.
  const [run, setRun] = useState(0);
  const [handoffNote, setHandoffNote] = useState(false);
  const expired = remaining <= 0;
  const nearEnd = remaining <= LAST_SECONDS;

  function setClock(seconds: number) {
    setRemaining(seconds);
    setRun((n) => n + 1);
  }

  // Off screen the clock is put back, so every visit opens on a full five minutes.
  useEffect(() => {
    if (active) return;
    setRemaining(HOLD_SECONDS);
    setHandoffNote(false);
  }, [active]);

  // One tick a second, only while this view is the one on screen.
  useEffect(() => {
    if (!active || expired) return;
    const id = window.setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => window.clearInterval(id);
  }, [active, expired, run]);

  useEffect(() => {
    if (!handoffNote || !active) return;
    const id = window.setTimeout(() => setHandoffNote(false), NOTE_MS);
    return () => window.clearTimeout(id);
  }, [handoffNote, active]);

  return (
    <>
      <div className="mt-[1em] flex flex-col gap-[0.5em]">
        <AppLabel tone="accent">Checkout</AppLabel>
        <p className="app-serif text-[2.125em] text-white">
          <span className="text-ice">Review</span> your order.
        </p>
        <p className="text-[0.9375em] leading-[1.45] text-[color:var(--secondary)]">
          {expired
            ? "Your hold ended. These units are back in the pool and anyone can claim them now."
            : "Your pieces are reserved for five minutes while you complete payment with the brand."}
        </p>
      </div>

      <div className="mt-[1.125em]">
        <HoldBand remaining={remaining} />
      </div>

      <div className="flex min-h-[44px] items-center">
        <button
          type="button"
          aria-disabled={nearEnd}
          onClick={() => {
            if (!nearEnd) setClock(LAST_SECONDS);
          }}
          className={`app-label -mx-[0.5em] flex min-h-[44px] items-center px-[0.5em] underline decoration-white/30 underline-offset-[0.3em] ${
            nearEnd
              ? "cursor-default text-[color:var(--secondary)] opacity-40"
              : "cursor-pointer text-[color:var(--secondary)] active:opacity-70 [@media(hover:hover)]:hover:text-white"
          }`}
        >
          Skip to the last five seconds
        </button>
      </div>

      <div className="mt-[0.25em]">
        <AppRail>Your items</AppRail>
        <div className="flex items-center gap-[0.875em] border-b border-[color:var(--aline)] py-[0.875em]">
          <div
            aria-hidden="true"
            className="relative h-[5em] w-[4.25em] shrink-0 overflow-hidden rounded-[8px] border border-white/[0.12] bg-[color:var(--galaxy-deep)]"
          >
            <div className="absolute inset-0 [mask-composite:intersect] [mask-image:linear-gradient(90deg,transparent,#000_16%,#000_84%,transparent),linear-gradient(180deg,transparent,#000_14%,#000_86%,transparent)]">
              <GlyphPatch cell={4} />
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-[0.375em]">
            <p className="font-semibold leading-[1.25] text-white">{ITEM.name}</p>
            <p className="font-mono text-[0.625em] font-semibold uppercase leading-[1.2] tracking-[0.045em] text-[color:var(--secondary)]">
              Size {ITEM.size}&nbsp;&nbsp;/&nbsp;&nbsp;Qty 1
            </p>
            <p className="text-[0.6875em] leading-[1.3] text-[color:var(--secondary)]">
              Payment and delivery by the brand
            </p>
          </div>
          <p className="shrink-0 self-center text-[0.9375em] font-semibold text-white">{ITEM.price}</p>
        </div>
      </div>

      <div className="mt-auto pt-[1em]">
        <AppPrimaryButton
          onClick={() => {
            if (expired) setClock(HOLD_SECONDS);
            else setHandoffNote(true);
          }}
        >
          {expired
            ? "Restart the 5:00 hold"
            : handoffNote
              ? "Opens in the app"
              : "Continue to the brand"}
        </AppPrimaryButton>
      </div>
    </>
  );
}

function StandbyPanel({ size }: { size: StandbySize }) {
  return (
    <AppCard selected className="flex flex-col gap-[0.5em] p-[1em]">
      <p className="font-mono text-[1.0625em] font-bold uppercase leading-[1.2] text-[#8f6cf0]">
        Standby / position {STANDBY_POSITION}
      </p>
      <p className="text-[0.9375em] leading-[1.4] text-[color:var(--secondary)]">
        Exact variant: {size}. If inventory returns, you get a private ten-minute purchase window.
      </p>
    </AppCard>
  );
}

function StandbyView({ shown, animate }: { shown: boolean; animate: boolean }) {
  const [size, setSize] = useState<StandbySize | null>(null);
  const [joined, setJoined] = useState<readonly StandbySize[]>([]);
  const labelId = useId();
  const isJoined = size !== null && joined.includes(size);

  // Leaving the view clears the choice, so it opens fresh next time.
  useEffect(() => {
    if (shown) return;
    setSize(null);
    setJoined([]);
  }, [shown]);

  return (
    <>
      <div className="mt-[1em] flex items-start justify-between gap-[1em]">
        <div className="flex min-w-0 flex-col gap-[0.375em]">
          <p className="app-serif text-[1.75em] text-white">{ITEM.name}</p>
          <AppLabel>0 / 18 remain</AppLabel>
        </div>
        <p className="shrink-0 pt-[0.2em] text-[1.125em] font-medium text-white">{ITEM.price}</p>
      </div>

      <AppCard selected className="mt-[0.8125em] flex flex-col gap-[0.5625em] border-accent/28! p-[1em]">
        <AppLabel tone="accent">Allocation exhausted</AppLabel>
        <p className="text-[0.9375em] font-medium leading-[1.35] text-white">
          Every unit in this drop&rsquo;s allocation was claimed before you reached this page.
        </p>
        <p className="text-[0.875em] leading-[1.42] text-[color:var(--secondary)]">
          Standby holds your place for this exact size if a unit is returned or another holder lets
          theirs go. It does not reserve inventory, it does not guarantee an order, and no payment is
          taken.
        </p>
      </AppCard>

      <div className="mt-[1em]">
        <div className="flex items-baseline justify-between">
          <AppLabel>
            <span id={labelId}>Select size</span>
          </AppLabel>
          <AppLabel tone={size === null ? "secondary" : "accent"}>{size ?? "None"}</AppLabel>
        </div>
        <div
          role="radiogroup"
          aria-labelledby={labelId}
          onKeyDown={(e) => moveChoice(e, STANDBY_SIZES, size, setSize)}
          className="mt-[0.6875em] grid grid-cols-4 gap-[0.4375em]"
        >
          {STANDBY_SIZES.map((option, i) => {
            const checked = option === size;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={checked}
                tabIndex={checked || (size === null && i === 0) ? 0 : -1}
                onClick={() => setSize(option)}
                className={`flex h-[2.875em] min-h-[46px] cursor-pointer items-center justify-center rounded-[4px] border active:opacity-70 ${
                  checked
                    ? "border-white bg-white text-black"
                    : "border-[color:var(--aline)] bg-[color:var(--elevated)] text-white [@media(hover:hover)]:hover:border-white/40"
                }`}
              >
                <span className="text-[0.75em] font-medium">{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-[0.875em]">
        <AppPrimaryButton
          disabled={size === null}
          aria-disabled={isJoined || undefined}
          onClick={() => {
            if (size !== null && !isJoined) setJoined((list) => [...list, size]);
          }}
          className={isJoined ? "cursor-default" : ""}
        >
          {isJoined ? (
            <>
              <Check />
              Joined standby
            </>
          ) : (
            "Join exact-size standby"
          )}
        </AppPrimaryButton>
      </div>

      {/* The panel's room is kept from the start, so joining never moves the frame. */}
      <div role="status" className="mt-[0.625em] grid">
        <div aria-hidden="true" className="invisible col-start-1 row-start-1">
          <StandbyPanel size="XL" />
        </div>
        {size !== null && isJoined && (
          <Reveal key={size} animate={animate} className="col-start-1 row-start-1">
            <StandbyPanel size={size} />
          </Reveal>
        )}
      </div>
    </>
  );
}

/**
 * One of the two views. Both are laid out in the same cell, so the frame is
 * always as tall as the taller one and switching never moves the page. The
 * view that is not showing is hidden from sight, focus and assistive tech.
 */
function ViewLayer({
  shown,
  animate,
  children,
}: {
  shown: boolean;
  animate: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const wasShown = useRef(shown);
  useEffect(() => {
    if (wasShown.current === shown) return;
    wasShown.current = shown;
    const el = ref.current;
    if (!shown || !animate || !el || typeof el.animate !== "function") return;
    const run = el.animate(
      [
        { opacity: 0, transform: "translateY(6px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 180, easing: EASE_OUT }
    );
    return () => run.cancel();
  }, [shown, animate]);
  return (
    <div
      ref={ref}
      inert={!shown}
      aria-hidden={shown ? undefined : true}
      className={`col-start-1 row-start-1 flex min-w-0 flex-col ${shown ? "" : "invisible"}`}
    >
      {children}
    </div>
  );
}

export function HoldDemo({ active }: { active: boolean }) {
  const reduced = usePrefersReducedMotion();
  const [view, setView] = useState<View>("hold");
  const animate = active && !reduced;

  return (
    <AppFrame label="Hold and Standby demo">
      <div className="flex flex-col px-[1.25em] pb-[1.25em] pt-[1em]">
        <ViewSwitch value={view} onChange={setView} />
        <div className="grid">
          <ViewLayer shown={view === "hold"} animate={animate}>
            <HoldView active={active && view === "hold"} />
          </ViewLayer>
          <ViewLayer shown={view === "standby"} animate={animate}>
            <StandbyView shown={view === "standby"} animate={animate} />
          </ViewLayer>
        </div>
      </div>
    </AppFrame>
  );
}
