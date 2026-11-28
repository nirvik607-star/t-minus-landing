"use client";

import React, { useEffect, useRef } from "react";

/**
 * A word built with the letter T, three ways. Each keeps the word clean at
 * reading distance and the T plain up close, and each moves a little.
 *
 * - lattice:  the word is nothing but T's: one size, one weight, on a fixed
 *             grid, each one standing clear of its neighbours. Light passes
 *             through it slowly.
 * - monogram: solid letters in the brand purple carrying a repeat of T and
 *             minus, set like the print on a monogram canvas. A sheen
 *             crosses it.
 * - jacquard: solid white letters with the same repeat woven in tone on
 *             tone, so the word is plain at a glance and the T's show where
 *             the light catches them.
 */
export type TWordVariant = "lattice" | "monogram" | "jacquard";

interface TWordProps {
  text: string;
  variant: TWordVariant;
  /** Accessible name; the canvas itself is decorative. */
  label?: string;
  /** Rows of T's across the cap height. */
  rows?: number;
  className?: string;
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const hash = (a: number, b: number) => {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

export function TWord({ text, variant, label, rows, className = "" }: TWordProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const css = getComputedStyle(document.documentElement);
    const sans = css.getPropertyValue("--font-inter").trim() || "sans-serif";
    const mono = css.getPropertyValue("--font-ibm-plex-mono").trim() || "monospace";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const still = new URLSearchParams(window.location.search).has("still");

    let w = 0;
    let h = 0;
    let dpr = 1;
    let disposed = false;
    let raf = 0;
    // The word as a mask, in device px, and a softened copy for the halftone.
    let mask: HTMLCanvasElement | null = null;
    let alpha: Uint8ClampedArray | null = null;
    let soft: Uint8ClampedArray | null = null;
    let mw = 0;
    let mh = 0;
    let cell = 10;
    let solid: HTMLCanvasElement | null = null;

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      dpr = Math.min(3, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      mw = canvas.width;
      mh = canvas.height;

      const inset = 0;
      const capTarget = mh;
      const m = document.createElement("canvas");
      m.width = mw;
      m.height = mh;
      const mctx = m.getContext("2d", { willReadFrequently: true })!;
      let px = capTarget * 1.38;
      const font = (size: number) => `800 ${size}px ${sans}`;
      mctx.font = font(px);
      const cap = mctx.measureText("H").actualBoundingBoxAscent || px * 0.72;
      px *= capTarget / cap;
      mctx.font = font(px);
      const tm = mctx.measureText(text);
      const textW = tm.actualBoundingBoxLeft + tm.actualBoundingBoxRight;
      // Taller boxes than the word's own shape narrow the letters; they are never shrunk.
      const sx = Math.min(1, (mw * (1 - inset * 0.6)) / textW);
      const ascent = mctx.measureText("H").actualBoundingBoxAscent;
      mctx.fillStyle = "#fff";
      mctx.save();
      mctx.translate(mw / 2, 0);
      mctx.scale(sx, 1);
      mctx.fillText(text, -textW / 2 + tm.actualBoundingBoxLeft, (mh + ascent) / 2);
      mctx.restore();
      mask = m;
      const data = mctx.getImageData(0, 0, mw, mh).data;
      alpha = new Uint8ClampedArray(mw * mh);
      for (let i = 0; i < mw * mh; i++) alpha[i] = data[i * 4 + 3];

      const r = rows ?? (variant === "lattice" ? 13 : 11);
      cell = capTarget / r / dpr;

      // The letters as a flat colour, for the two solid treatments.
      if (variant !== "lattice") {
        const f = document.createElement("canvas");
        f.width = mw;
        f.height = mh;
        const fctx = f.getContext("2d")!;
        fctx.drawImage(m, 0, 0);
        fctx.globalCompositeOperation = "source-in";
        fctx.fillStyle = variant === "monogram" ? "#613DC1" : "#F7F4FF";
        fctx.fillRect(0, 0, mw, mh);
        solid = f;
      }

      if ((variant as string) === "halftone") {
        // A blurred copy: how deep inside a stroke a point is.
        const b = document.createElement("canvas");
        b.width = mw;
        b.height = mh;
        const bctx = b.getContext("2d", { willReadFrequently: true })!;
        bctx.filter = `blur(${(cell * dpr * 0.62).toFixed(1)}px)`;
        bctx.drawImage(m, 0, 0);
        const bd = bctx.getImageData(0, 0, mw, mh).data;
        soft = new Uint8ClampedArray(mw * mh);
        for (let i = 0; i < mw * mh; i++) soft[i] = bd[i * 4 + 3];
      }
    };

    /** Share of a cell that lies inside the word, sampled 4x4. */
    const coverage = (x0: number, y0: number, size: number, src: Uint8ClampedArray) => {
      let sum = 0;
      for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 4; i++) {
          const x = Math.round((x0 + ((i + 0.5) / 4) * size) * dpr);
          const y = Math.round((y0 + ((j + 0.5) / 4) * size) * dpr);
          if (x < 0 || y < 0 || x >= mw || y >= mh) continue;
          sum += src[y * mw + x];
        }
      }
      return sum / (16 * 255);
    };

    const start = performance.now();
    const draw = (now: number) => {
      if (disposed) return;
      if (!reduced && !still) raf = window.requestAnimationFrame(draw);
      if (!alpha || !mask) return;
      const t = reduced || still ? 2.4 : (now - start) / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";

      const cols = Math.ceil(w / cell) + 2;
      const rowsN = Math.ceil(h / cell) + 2;
      // Grids are centred, so the word is cut the same way on both sides.
      const ox = (w - cols * cell) / 2;
      const oy = (h - rowsN * cell) / 2;

      if (variant === "lattice") {
        // Each T stands clear in its cell, so it reads as a letter and not as a mesh.
        const size = cell * 1.02;
        ctx.font = `700 ${size.toFixed(2)}px ${mono}, monospace`;
        const capH = size * 0.7;
        for (let r = 0; r < rowsN; r++) {
          for (let c = 0; c < cols; c++) {
            const x0 = ox + c * cell;
            const y0 = oy + r * cell;
            if (coverage(x0, y0, cell, alpha) < 0.62) continue;
            // One slow band of light, left to right.
            const wave = 0.5 + 0.5 * Math.sin(x0 * 0.009 - t * 0.8 + r * 0.04);
            ctx.globalAlpha = 0.62 + 0.38 * wave;
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText("T", x0 + cell / 2, y0 + cell / 2 + capH / 2);
          }
        }
        ctx.globalAlpha = 1;
      } else {
        // A half-drop repeat of T and minus, as on a monogram canvas.
        const size = cell * 0.98;
        const capH = size * 0.7;
        const band = ((t * 0.13) % 1.7) - 0.35; // where the sheen is, across the word
        const mono700 = `700 ${size.toFixed(2)}px ${mono}, monospace`;
        const sec = Math.floor(t);
        for (let r = -1; r < rowsN; r++) {
          const shift = r % 2 === 0 ? 0 : cell / 2;
          for (let c = -1; c < cols + 1; c++) {
            const x = ox + c * cell + shift;
            const y = oy + r * cell;
            const u = x / w + (y / h) * 0.1;
            const sheen = Math.exp(-Math.pow((u - band) / 0.085, 2));
            const isT = (c + (r >> 1)) % 2 === 0;
            ctx.font = mono700;
            if (variant === "monogram") {
              ctx.fillStyle = "#FFFFFF";
              ctx.globalAlpha = isT ? 0.82 + 0.18 * sheen : 0.34 + 0.4 * sheen;
            } else {
              // Tone on tone: barely there until the light crosses it.
              ctx.fillStyle = "#613DC1";
              ctx.globalAlpha = isT ? 0.13 + 0.5 * sheen : 0.07 + 0.3 * sheen;
            }
            // One minus keeps time, a different one each second.
            if (!isT && hash(c + sec * 7, r) > 0.985) ctx.globalAlpha = 1;
            ctx.fillText(isT ? "T" : "\u2212", x + cell / 2, y + cell / 2 + capH / 2);
          }
        }
        ctx.globalAlpha = 1;
        // Cut the print to the letters, then lay the letters under it.
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(mask, 0, 0);
        if (solid) {
          ctx.globalCompositeOperation = "destination-over";
          ctx.drawImage(solid, 0, 0);
        }
        ctx.globalCompositeOperation = "source-over";
      }
    };

    const ro = new ResizeObserver(() => {
      build();
      if (reduced || still) window.requestAnimationFrame(draw);
    });
    ro.observe(wrap);
    build();
    document.fonts.ready.then(() => {
      if (disposed) return;
      build();
      if (reduced || still) window.requestAnimationFrame(draw);
    });
    raf = window.requestAnimationFrame(draw);
    return () => {
      disposed = true;
      window.cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [text, variant, rows]);

  return (
    <div ref={wrapRef} role={label ? "img" : undefined} aria-label={label} className={className}>
      <canvas ref={canvasRef} aria-hidden="true" className="block" />
    </div>
  );
}
