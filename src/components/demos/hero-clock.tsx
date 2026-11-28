"use client";

import React, { useEffect, useRef } from "react";

/**
 * The app's hero clock, ported from the prototype.
 *
 * It is not set in a glyph font. Each numeral is a font-shaped mask filled
 * with a matrix of glyphs on a fixed grid, stacked in four layers:
 *   1. a solid grey silhouette of the whole lockup,
 *   2. the numeral field, masked to the digits,
 *   3. the identity field, masked to the serif T and the operator,
 *   4. unit marks (h, m, s) in ice. No colons.
 * As launch approaches the field steps through six stages. Cells never move;
 * the glyph set, grid pitch, colours and pattern change.
 */

export type Rung = "distant" | "approaching" | "imminent" | "critical" | "final" | "live";

export function rungFor(secondsLeft: number): Rung {
  if (secondsLeft <= 0) return "live";
  if (secondsLeft < 60) return "final";
  if (secondsLeft <= 900) return "critical";
  if (secondsLeft <= 3600) return "imminent";
  if (secondsLeft <= 43200) return "approaching";
  return "distant";
}

interface RungSpec {
  support: string[];
  cell: number;
  threshold: number;
  loop: number;
  ground: number;
  pattern: "waves" | "lanes" | "diamonds" | "rings";
  substrate: string[];
  signal: string[];
  identity: string[];
  glow: number;
}

const FULL_SET = ["^", "-", "t", "+", "=", "T", "*"];

const RUNGS: Record<Rung, RungSpec> = {
  distant: {
    support: FULL_SET,
    cell: 7.63,
    threshold: 0.79,
    loop: 2.2,
    ground: 0.3,
    pattern: "waves",
    substrate: ["#A9CEDF", "#6E97AC", "#D3E9F2"],
    signal: ["#6E2BD0"],
    identity: ["#8A4BEA", "#613DC1"],
    glow: 3.5,
  },
  approaching: {
    support: FULL_SET,
    cell: 7.31,
    threshold: 0.73,
    loop: 1.7,
    ground: 0.32,
    pattern: "waves",
    substrate: ["#A9CEDF", "#6E97AC", "#D3E9F2"],
    signal: ["#7A2BE8"],
    identity: ["#8A4BEA", "#613DC1"],
    glow: 4,
  },
  imminent: {
    support: ["-", "=", "t", "T"],
    cell: 7.0,
    threshold: 0.66,
    loop: 1.5,
    ground: 0.34,
    pattern: "lanes",
    substrate: ["#6E97AC", "#8A4BEA", "#FFFFFF"],
    signal: ["#A055F5", "#8A4BEA"],
    identity: ["#A055F5", "#8A4BEA"],
    glow: 4.8,
  },
  critical: {
    support: ["^", "+", "=", "t", "T"],
    cell: 6.73,
    threshold: 0.59,
    loop: 1.3,
    ground: 0.36,
    pattern: "diamonds",
    substrate: ["#A055F5", "#D3E9F2", "#F298B4", "#A9CEDF"],
    signal: ["#A055F5", "#D3E9F2", "#858AE3"],
    identity: ["#A055F5", "#8A4BEA"],
    glow: 5.6,
  },
  final: {
    support: ["T"],
    cell: 6.57,
    threshold: 0.53,
    loop: 1.1,
    ground: 0.38,
    pattern: "rings",
    substrate: ["#A055F5", "#858AE3", "#D3E9F2", "#F298B4", "#7BA4D4", "#FFFFFF"],
    signal: ["#FFFFFF", "#A055F5", "#D3E9F2", "#7BA4D4", "#858AE3"],
    identity: ["#A055F5", "#8A4BEA"],
    glow: 6.6,
  },
  live: {
    support: ["T"],
    cell: 6.47,
    threshold: 0.47,
    loop: 1.0,
    ground: 0.4,
    pattern: "rings",
    substrate: ["#A055F5", "#858AE3", "#D3E9F2", "#F298B4", "#7BA4D4", "#FFFFFF"],
    signal: ["#FFFFFF", "#A055F5", "#D3E9F2", "#7BA4D4", "#858AE3"],
    identity: ["#A055F5", "#8A4BEA"],
    glow: 6.6,
  },
};

const pad2 = (n: number) => String(Math.max(0, Math.floor(n))).padStart(2, "0");
const ns = (v: number) => (Math.sin(v) + 1) / 2;
const nc = (v: number) => (Math.cos(v) + 1) / 2;
function noise(c: number, r: number, f: number) {
  const s = Math.sin(c * 127.1 + r * 311.7 + f * 74.7) * 43758.5453;
  return s - Math.floor(s);
}

interface Glyph {
  text: string;
  x: number; // left edge of its slot
  w: number; // slot width
  font: string;
  baseline: number;
  kind: "identity" | "numeral";
}

interface Mark {
  text: string;
  x: number;
  y: number;
  size: number;
}

interface Lockup {
  glyphs: Glyph[];
  marks: Mark[];
  key: string;
}

export interface HeroClockProps {
  /** Whole seconds until launch. Zero or below shows T-plus, counting up. */
  secondsLeft: number;
  /** Stop the loop while the clock is off screen. */
  active?: boolean;
  className?: string;
}

export function HeroClock({ secondsLeft, active = true, className = "" }: HeroClockProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const secondsRef = useRef(secondsLeft);
  secondsRef.current = secondsLeft;
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const still = new URLSearchParams(window.location.search).get("still") === "1";
    const root = getComputedStyle(document.documentElement);
    const sans = root.getPropertyValue("--font-inter").trim() || "sans-serif";
    const serif = root.getPropertyValue("--font-newsreader").trim() || "serif";
    const mono = root.getPropertyValue("--font-ibm-plex-mono").trim() || "monospace";

    const field = document.createElement("canvas");
    const fctx = field.getContext("2d")!;
    const mask = document.createElement("canvas");
    const mctx = mask.getContext("2d")!;

    let disposed = false;
    let raf = 0;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let k = 1; // px per prototype point
    let lockup: Lockup | null = null;
    let lastFrame = -1;
    let lastKey = "";
    const start = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      k = W / 402;
      for (const c of [canvas, field, mask]) {
        c.width = Math.round(W * dpr);
        c.height = Math.round(H * dpr);
      }
      lockup = null;
      lastFrame = -1;
    };

    /** Build the lockup for a time: T, operator, then pairs with unit marks. */
    const build = (secs: number): Lockup => {
      const plus = secs <= 0;
      const abs = Math.abs(secs);
      const hh = Math.floor(abs / 3600);
      const mm = Math.floor((abs % 3600) / 60);
      const ss = abs % 60;
      const mode: "hms" | "ms" | "s" = abs > 3600 ? "hms" : abs >= 60 ? "ms" : "s";
      const pairs =
        mode === "hms"
          ? [
              { v: pad2(hh), u: "h" },
              { v: pad2(mm), u: "m" },
              { v: pad2(ss), u: "s" },
            ]
          : mode === "ms"
            ? [
                { v: pad2(mm), u: "m" },
                { v: pad2(ss), u: "s" },
              ]
            : [{ v: pad2(ss), u: "s" }];
      let digitPt = mode === "hms" ? 68 : mode === "ms" ? 103 : 140;
      let tPt = mode === "hms" ? 98 : mode === "ms" ? 118 : 150;
      const opPt = 54;
      const markPt = mode === "s" ? 16 : 14.5;

      const measure = () => {
        // Ascent is reported from the current baseline, so pin it first.
        ctx.textBaseline = "alphabetic";
        const digitFont = `600 ${digitPt * k}px ${sans}`;
        const tFont = `italic 500 ${tPt * k}px ${serif}`;
        const opFont = `italic 500 ${opPt * k}px ${serif}`;
        ctx.font = digitFont;
        let slot = 0;
        for (let d = 0; d < 10; d++) slot = Math.max(slot, ctx.measureText(String(d)).width);
        slot *= 0.96;
        const cap = ctx.measureText("0").actualBoundingBoxAscent;
        ctx.font = tFont;
        const tW = ctx.measureText("T").width * 0.94;
        ctx.font = opFont;
        const opW = ctx.measureText(plus ? "+" : "−").width;
        const markW = markPt * k * 0.95;
        const gapT = 2 * k;
        const gapOp = 7 * k;
        const pairGap = 5 * k;
        const total =
          tW + gapT + opW + gapOp + pairs.length * (slot * 2 + markW) + (pairs.length - 1) * pairGap;
        return { digitFont, tFont, opFont, slot, cap, tW, opW, markW, gapT, gapOp, pairGap, total };
      };

      let m = measure();
      const room = W - 24 * k;
      if (m.total > room) {
        const s = room / m.total;
        digitPt *= s;
        tPt *= s;
        m = measure();
      }

      const mid = H * 0.46;
      const baseline = mid + m.cap / 2;
      const glyphs: Glyph[] = [];
      const marks: Mark[] = [];
      let x = (W - m.total) / 2;
      glyphs.push({ text: "T", x, w: m.tW, font: m.tFont, baseline, kind: "identity" });
      x += m.tW + m.gapT;
      glyphs.push({
        text: plus ? "+" : "−",
        x,
        w: m.opW,
        font: m.opFont,
        baseline: baseline - m.cap * 0.18,
        kind: "identity",
      });
      x += m.opW + m.gapOp;
      for (const p of pairs) {
        for (const ch of p.v) {
          glyphs.push({ text: ch, x, w: m.slot, font: m.digitFont, baseline, kind: "numeral" });
          x += m.slot;
        }
        marks.push({ text: p.u, x: x + m.markW * 0.5, y: baseline - m.cap + markPt * k * 0.5, size: markPt * k });
        x += m.markW + m.pairGap;
      }
      return { glyphs, marks, key: `${plus ? "+" : "-"}${pairs.map((p) => p.v).join("")}` };
    };

    const drawGlyphs = (c: CanvasRenderingContext2D, kind: Glyph["kind"] | "all") => {
      if (!lockup) return;
      c.textAlign = "center";
      c.textBaseline = "alphabetic";
      for (const g of lockup.glyphs) {
        if (kind !== "all" && g.kind !== kind) continue;
        c.font = g.font;
        c.fillText(g.text, g.x + g.w / 2, g.baseline);
      }
    };

    /** Fill the whole canvas with one field, then keep only what the mask covers. */
    const paintField = (
      spec: RungSpec,
      kind: Glyph["kind"],
      phi: number,
      frame: number
    ) => {
      const identity = kind === "identity";
      const cell = (identity ? Math.max(spec.cell * 0.86 * 0.94, 5.25) : spec.cell * 1.06) * k;
      const threshold = identity ? Math.max(0.42, spec.threshold - 0.34) : spec.threshold;
      const p = identity ? phi * 1.38 : phi;
      const substrate = identity ? spec.identity : spec.substrate;
      const signals = identity ? spec.identity : spec.signal;
      const cols = Math.ceil(W / cell);
      const rows = Math.ceil(H / cell);
      const cc = (cols - 1) / 2;
      const cr = (rows - 1) / 2;
      const n = spec.support.length;
      const tOnly = n === 1;

      fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fctx.globalCompositeOperation = "source-over";
      fctx.clearRect(0, 0, W, H);
      fctx.textAlign = "center";
      fctx.textBaseline = "middle";
      const supportFont = `600 ${cell * (tOnly ? 0.65 : 0.9) * 1.36}px ${mono}`;
      const signalFont = `600 ${cell * 0.99 * 1.44}px ${mono}`;
      const glowPulse = 0.55 + 0.45 * Math.sin(3 * p);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Prototype formulas work in points.
          const x = ((c + 0.5) * cell) / k;
          const y = ((r + 0.5) * cell) / k;
          let e: number;
          let key: number;
          if (spec.pattern === "waves") {
            e =
              0.56 * ns(0.068 * x + 0.102 * y - p) +
              0.28 * nc(-0.042 * x + 0.076 * y + 2 * p) +
              0.3 * noise(c, r, frame);
            key = 3 * c + 5 * r;
          } else if (spec.pattern === "lanes") {
            const lane = (((c + r) % 9) + 9) % 9;
            const rail = (((c - r) % 9) + 9) % 9 === 0 ? 1 : 0.1;
            e = 0.1 + 0.58 * ns(p - 0.7 * lane) + 0.2 * rail + 0.07 * noise(c, r, frame);
            key = Math.floor(lane / 3);
          } else if (spec.pattern === "diamonds") {
            const d = Math.abs(c - cc) + Math.abs(r - cr);
            const band = Math.floor(d) % 5 === 0 ? 1 : 0.12;
            const reticle = Math.abs(c - cc) < 0.6 || Math.abs(r - cr) < 0.6 ? 1 : 0.08;
            e = 0.08 + 0.48 * ns(p - 0.72 * d) + 0.23 * band + 0.12 * reticle + 0.05 * noise(c, r, frame);
            key = Math.floor(d / 3);
          } else {
            const dx = c - cc;
            const dy = r - cr;
            const rho = Math.hypot(dx, dy);
            const theta = Math.atan2(dy, dx);
            const ring = Math.floor(rho) % 4 === 0 ? 1 : 0.1;
            const sweep = Math.pow(Math.max(0, Math.cos(theta - p)), 3);
            e = 0.08 + 0.38 * ns(p - 0.88 * rho) + 0.24 * ring + 0.25 * sweep + 0.04 * noise(c, r, frame);
            key = Math.floor(((theta + Math.PI) / (Math.PI * 2)) * 6) + Math.floor(rho);
          }
          e = Math.min(0.999, Math.max(0, e));
          const step = Math.floor(e * n);
          const px = (c + 0.5) * cell;
          const py = (r + 0.5) * cell;
          if (e > threshold) {
            const tint = signals[(key + step) % signals.length];
            fctx.font = signalFont;
            fctx.fillStyle = tint;
            fctx.shadowColor = tint;
            fctx.shadowBlur = spec.glow * k * dpr * glowPulse;
            fctx.fillText("T", px, py);
            fctx.shadowBlur = 0;
          } else {
            fctx.font = supportFont;
            fctx.fillStyle = substrate[(key + step) % substrate.length];
            fctx.fillText(spec.support[Math.min(n - 1, step)], px, py);
          }
        }
      }

      // Mask: keep the field only inside the letterforms.
      mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mctx.clearRect(0, 0, W, H);
      mctx.fillStyle = "#fff";
      drawGlyphs(mctx, kind);
      fctx.setTransform(1, 0, 0, 1, 0, 0);
      fctx.globalCompositeOperation = "destination-in";
      fctx.drawImage(mask, 0, 0);
      fctx.globalCompositeOperation = "source-over";

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(field, 0, 0);
    };

    const render = (now: number) => {
      if (disposed) return;
      raf = window.requestAnimationFrame(render);
      if (!activeRef.current && lastFrame >= 0) return;
      const secs = secondsRef.current;
      const spec = RUNGS[rungFor(secs)];
      const elapsed = (now - start) / 1000;
      const frame = reduced || still ? 0 : Math.floor(elapsed * 12);
      // Rebuild the lockup only when the digits change.
      const abs = Math.abs(secs);
      const wantKey = `${secs <= 0 ? "+" : "-"}${abs > 3600 ? "h" : abs >= 60 ? "m" : "s"}${abs}`;
      if (!lockup || lockup.key !== wantKey) {
        lockup = build(secs);
        lockup.key = wantKey;
      }
      if (frame === lastFrame && lockup.key === lastKey) return;
      lastFrame = frame;
      lastKey = lockup.key;

      const phi = (((frame / 12) % spec.loop) / spec.loop) * Math.PI * 2;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // 1. silhouette
      ctx.globalAlpha = spec.ground;
      ctx.fillStyle = "#8C8F96";
      drawGlyphs(ctx, "all");
      ctx.globalAlpha = 1;

      // 2 and 3. the two glyph fields
      paintField(spec, "numeral", phi, frame);
      paintField(spec, "identity", phi, frame);

      // 4. unit marks
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#97DFFC";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const mk of lockup.marks) {
        ctx.font = `500 ${mk.size}px ${mono}`;
        ctx.fillText(mk.text, mk.x, mk.y);
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    document.fonts.ready.then(() => {
      lockup = null;
      lastFrame = -1;
    });
    raf = window.requestAnimationFrame(render);
    return () => {
      disposed = true;
      window.cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  const abs = Math.abs(secondsLeft);
  const label =
    secondsLeft <= 0
      ? `T plus ${abs} seconds`
      : `T minus ${Math.floor(abs / 3600)} hours ${Math.floor((abs % 3600) / 60)} minutes ${abs % 60} seconds`;

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      className={`block w-full ${className}`}
      style={{ aspectRatio: "402 / 132" }}
    />
  );
}
