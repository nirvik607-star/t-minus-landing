"use client";

import React, { useEffect, useRef } from "react";

/**
 * Small pieces shared by the feature demos. They follow the app's own
 * components: frame, labels, rails, cards and buttons.
 */

export function AppFrame({
  children,
  className = "",
  label,
}: {
  children: React.ReactNode;
  className?: string;
  /** Accessible name for the demo region. */
  label: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`app-demo relative w-full max-w-[400px] overflow-hidden rounded-[26px] border border-white/15 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.75)] ${className}`}
    >
      {children}
    </div>
  );
}

export function AppLabel({
  children,
  tone = "secondary",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "secondary" | "accent" | "ice" | "ink";
  className?: string;
}) {
  const color =
    tone === "accent"
      ? "text-[#8f6cf0]"
      : tone === "ice"
        ? "text-ice"
        : tone === "ink"
          ? "text-white"
          : "text-[color:var(--secondary)]";
  return <span className={`app-label ${color} ${className}`}>{children}</span>;
}

/** The app's rail: T-minus mark, label, hairline, minus-T mark. */
export function AppRail({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span aria-hidden="true" className="app-label text-[#8f6cf0]">
        T&minus;
      </span>
      <AppLabel>{children}</AppLabel>
      <span aria-hidden="true" className="h-px flex-1 bg-[color:var(--aline)]" />
      <span aria-hidden="true" className="app-label text-[#8f6cf0]">
        &minus;T
      </span>
    </div>
  );
}

export function AppCard({
  children,
  className = "",
  selected = false,
}: {
  children: React.ReactNode;
  className?: string;
  selected?: boolean;
}) {
  return (
    <div
      className={`rounded-[12px] border ${
        selected
          ? "border-accent bg-[color:var(--accent-soft)]"
          : "border-[color:var(--aline)] bg-[color:var(--amuted)]"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** The app's primary button: white fill, accent label, uppercase. */
export function AppPrimaryButton({
  children,
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`flex h-[52px] w-full cursor-pointer items-center justify-center rounded-[8px] bg-white px-4 text-[0.9375em] font-semibold uppercase tracking-[0.02em] text-accent transition-opacity duration-100 ease-out active:opacity-70 disabled:cursor-default disabled:opacity-35 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

const CHARSET = ["^", "-", "t", "+", "=", "T", "*"];

/**
 * A still field of glyphs, as the app uses behind placeholders and bands.
 * Drawn once; nothing in it moves.
 */
export function GlyphPatch({
  className = "",
  cell,
  glyphColor = "#B6B9EE",
  glyphOpacity = 0.3,
  signalColor = "#A08ADA",
  signalThreshold = 0.91,
  opacity = 0.24,
}: {
  className?: string;
  /** Cell pitch in CSS px. Defaults to a twentieth of the shorter side. */
  cell?: number;
  glyphColor?: string;
  glyphOpacity?: number;
  signalColor?: string;
  signalThreshold?: number;
  opacity?: number;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const mono =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--font-ibm-plex-mono")
        .trim() || "monospace";
    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const c = cell ?? Math.max(3, Math.min(w, h) / 20);
      const ns = (v: number) => (Math.sin(v) + 1) / 2;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let y = c / 2; y < h; y += c) {
        for (let x = c / 2; x < w; x += c) {
          const e = Math.min(
            1,
            0.56 * ns(0.074 * x + 0.041 * y) +
              0.24 * ns(-0.033 * x + 0.082 * y) +
              0.28 * hash(Math.round(x / c), Math.round(y / c))
          );
          if (e > signalThreshold) {
            ctx.globalAlpha = 1;
            ctx.fillStyle = signalColor;
            ctx.font = `600 ${c * 1.34}px ${mono}`;
            ctx.fillText("T", x, y);
          } else {
            ctx.globalAlpha = glyphOpacity;
            ctx.fillStyle = glyphColor;
            ctx.font = `500 ${c * 1.1}px ${mono}`;
            ctx.fillText(CHARSET[Math.min(6, Math.floor(e * 7))], x, y);
          }
        }
      }
      ctx.globalAlpha = 1;
    };
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    document.fonts.ready.then(draw);
    draw();
    return () => ro.disconnect();
  }, [cell, glyphColor, glyphOpacity, signalColor, signalThreshold]);
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ opacity }}
      className={`pointer-events-none block h-full w-full ${className}`}
    />
  );
}

/** True when the user asks for reduced motion. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}
