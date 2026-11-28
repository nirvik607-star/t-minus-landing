"use client";

import React, { useEffect, useRef } from "react";

/**
 * Text drawn the way the app draws its clock: a font-shaped mask filled with
 * a matrix of glyphs on a fixed grid. Nothing in the grid ever moves; a slow
 * loop changes which glyph each cell holds and how bright it is.
 */

const SUPPORT = ["^", "-", "t", "+", "=", "T"] as const;

export interface GlyphMaskProps {
  text: string;
  /** CSS font shorthand for the mask, without size. e.g. `700 var(--font-inter)` resolved by caller. */
  maskWeight?: number;
  maskItalic?: boolean;
  /** CSS variable holding the mask font family. */
  maskFamilyVar?: string;
  /** Cell pitch in CSS px. Ignored when `rows` is set. */
  cell?: number;
  /** Number of glyph rows across the cap height; the cell pitch follows the box. */
  rows?: number;
  /** Tints, cycled across the field. */
  tints?: string[];
  /** Colour of the brightest cells. */
  signal?: string;
  /** The solid word under the field. */
  silhouette?: string;
  silhouetteOpacity?: number;
  /** Energy above which a cell becomes a signal T. 0..1 */
  threshold?: number;
  /** How full a cell must be before it gets a mark. Near 1 keeps every mark whole, inside the letter. */
  minCoverage?: number;
  /** The marks leave once the word has fully arrived, and the plain silhouette is what stays. */
  clearAfterReveal?: boolean;
  /** Characters for the ordinary cells, quiet to loud. Defaults to the full brand set. */
  glyphs?: readonly string[];
  /** When the box is taller than the word's own shape, narrow the letters to fit instead of shrinking them. */
  condense?: boolean;
  /** Seconds per loop. */
  loop?: number;
  /** 0..1: how much of the word has materialised (ordered scan, left to right). */
  reveal?: number;
  /** Same, read every frame from a ref so a parent can scrub it without re-rendering. */
  revealSource?: { current: number };
  /** When true the reveal runs once on mount over `revealMs`. */
  autoReveal?: boolean;
  revealMs?: number;
  revealDelayMs?: number;
  /** Letter spacing for the mask, in em. */
  tracking?: number;
  className?: string;
  /** Accessible name; defaults to the text. */
  label?: string;
}

function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

export function GlyphMask({
  text,
  maskWeight = 700,
  maskItalic = false,
  maskFamilyVar = "--font-inter",
  cell: cellProp = 6,
  rows: rowsProp,
  tints = ["#97DFFC", "#858AE3", "#D3E9F2"],
  signal = "#FFFFFF",
  silhouette = "#97DFFC",
  silhouetteOpacity = 0.2,
  threshold = 0.74,
  minCoverage = 0.5,
  clearAfterReveal = false,
  glyphs = SUPPORT,
  condense = false,
  loop = 2.0,
  reveal,
  revealSource,
  autoReveal = false,
  revealMs = 900,
  revealDelayMs = 0,
  tracking = -0.02,
  className = "",
  label,
}: GlyphMaskProps) {
  const wrapRef = useRef<HTMLSpanElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const revealRef = useRef(reveal ?? (autoReveal ? 0 : 1));
  if (reveal !== undefined) revealRef.current = reveal;

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const still =
      new URLSearchParams(window.location.search).get("still") === "1";
    const styles = getComputedStyle(document.documentElement);
    const maskFamily =
      styles.getPropertyValue(maskFamilyVar).trim() || "sans-serif";
    const monoFamily =
      styles.getPropertyValue("--font-ibm-plex-mono").trim() || "monospace";

    let disposed = false;
    let raf = 0;
    let cell = cellProp;
    let cols = 0;
    let rows = 0;
    let coverage = new Float32Array(0);
    let w = 0;
    let h = 0;
    let dpr = 1;
    let lastFrame = -1;
    let clearedAt = 0;
    let silScaleX = 1;
    let silMid = 0;
    let silFont = "";
    let silX = 0;
    let silY = 0;
    let silSpacing = 0;
    const start = performance.now();

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      if (rowsProp) cell = h / rowsProp;
      cols = Math.max(1, Math.floor(w / cell));
      rows = Math.max(1, Math.floor(h / cell));

      // Rasterise the word at 4 samples per cell and keep how full each cell is.
      const sub = 4;
      const mw = cols * sub;
      const mh = rows * sub;
      const mask = document.createElement("canvas");
      mask.width = mw;
      mask.height = mh;
      const mctx = mask.getContext("2d", { willReadFrequently: true })!;
      const fontFor = (px: number) =>
        `${maskItalic ? "italic " : ""}${maskWeight} ${px}px ${maskFamily}`;
      // Fit: the flat cap height (measured on H, so round letters' overshoot
      // doesn't count) fills the rows exactly; shrink if the word is too wide.
      const setFont = (size: number) => {
        mctx.font = fontFor(size);
        mctx.textBaseline = "alphabetic";
        if ("letterSpacing" in mctx) {
          (mctx as unknown as { letterSpacing: string }).letterSpacing = `${tracking * size}px`;
        }
      };
      let px = mh * 1.36;
      setFont(px);
      const capNow = mctx.measureText("H").actualBoundingBoxAscent || px * 0.72;
      px *= mh / capNow;
      setFont(px);
      let m = mctx.measureText(text);
      const wide = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
      silScaleX = 1;
      if (wide > mw * 0.995) {
        if (condense) {
          // Full height kept; the letters are drawn narrower.
          silScaleX = (mw * 0.995) / wide;
        } else {
          px *= (mw * 0.995) / wide;
          setFont(px);
          m = mctx.measureText(text);
        }
      }
      const ascent = mctx.measureText("H").actualBoundingBoxAscent;
      const textW = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
      mctx.fillStyle = "#fff";
      mctx.save();
      mctx.translate(mw / 2, 0);
      mctx.scale(silScaleX, 1);
      mctx.fillText(text, -textW / 2 + m.actualBoundingBoxLeft, (mh + ascent) / 2);
      mctx.restore();
      // The same word, solid, drawn faintly under the field so it always reads.
      const k = cell / sub;
      silFont = fontFor(px * k);
      silSpacing = tracking * px * k;
      silX = (-textW / 2 + m.actualBoundingBoxLeft) * k;
      silMid = (mw / 2) * k;
      silY = ((mh + ascent) / 2) * k;
      const data = mctx.getImageData(0, 0, mw, mh).data;
      coverage = new Float32Array(cols * rows);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          let sum = 0;
          for (let y = 0; y < sub; y++) {
            for (let x = 0; x < sub; x++) {
              sum += data[((r * sub + y) * mw + c * sub + x) * 4 + 3];
            }
          }
          coverage[r * cols + c] = sum / (sub * sub * 255);
        }
      }
      lastFrame = -1;
    };

    const draw = (now: number) => {
      if (disposed) return;
      raf = window.requestAnimationFrame(draw);
      // The app plays its fields at 12 frames a second.
      const elapsed = (now - start) / 1000;
      const frame = reduced || still ? 0 : Math.floor(elapsed * 12);
      let rv = revealSource ? revealSource.current : revealRef.current;
      if (autoReveal && reveal === undefined && !revealSource) {
        const t = (now - start - revealDelayMs) / revealMs;
        rv = reduced || still ? 1 : Math.min(1, Math.max(0, t));
        revealRef.current = rv;
      }
      // The marks are the noise. Once the word has resolved they clear out of it.
      let marks = 1;
      if (clearAfterReveal) {
        if (rv >= 0.999) {
          if (clearedAt === 0) clearedAt = now;
          marks = reduced || still ? 0 : 1 - Math.min(1, Math.max(0, (now - clearedAt - 350) / 900));
        } else {
          clearedAt = 0;
        }
      }
      const revealKey = Math.round(rv * 200) + Math.round(marks * 60) * 1000;
      // Nothing left to animate once the marks are gone.
      // (A rebuild sets lastFrame to -1, which always forces one redraw.)
      if (
        lastFrame !== -1 &&
        (frame === lastFrame || marks === 0) &&
        revealKey === (draw as unknown as { k?: number }).k
      ) {
        return;
      }
      lastFrame = frame;
      (draw as unknown as { k?: number }).k = revealKey;

      const phi = ((frame / 12) % loop) / loop * Math.PI * 2;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const ox = (w - cols * cell) / 2;
      const oy = (h - rows * cell) / 2;
      const glyphPx = cell * 1.18;
      const fontSupport = `600 ${glyphPx}px ${monoFamily}`;
      const fontSignal = `600 ${cell * 1.3}px ${monoFamily}`;

      // Layer 1: the solid silhouette, wiped in with the same scan.
      ctx.save();
      ctx.beginPath();
      ctx.rect(ox, oy, cols * cell * Math.min(1, rv * 1.25), rows * cell);
      ctx.clip();
      ctx.font = silFont;
      if ("letterSpacing" in ctx) {
        (ctx as unknown as { letterSpacing: string }).letterSpacing = `${silSpacing}px`;
      }
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.globalAlpha = silhouetteOpacity;
      ctx.fillStyle = silhouette;
      ctx.translate(ox + silMid, 0);
      ctx.scale(silScaleX, 1);
      ctx.fillText(text, silX, oy + silY);
      ctx.restore();
      if ("letterSpacing" in ctx) {
        (ctx as unknown as { letterSpacing: string }).letterSpacing = "0px";
      }
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let r = 0; r < (marks > 0 ? rows : 0); r++) {
        for (let c = 0; c < cols; c++) {
          const cov = coverage[r * cols + c];
          if (cov < minCoverage) continue;
          // Ordered scan: columns arrive left to right with a slight diagonal.
          const order = (c + r * 0.35) / (cols + rows * 0.35);
          const local = (rv * 1.25 - order) / 0.25;
          if (local <= 0) continue;
          const x = ox + (c + 0.5) * cell;
          const y = oy + (r + 0.5) * cell;
          const ns = (v: number) => (Math.sin(v) + 1) / 2;
          const nc = (v: number) => (Math.cos(v) + 1) / 2;
          let e =
            0.56 * ns(0.068 * x * 1.6 + 0.102 * y * 1.6 - phi) +
            0.28 * nc(-0.042 * x * 1.6 + 0.076 * y * 1.6 + 2 * phi) +
            0.3 * hash(c * 1.3 + frame * 0.07, r * 1.7);
          e = Math.min(1, e);
          const arriving = local < 1;
          const isSignal = e > threshold || arriving;
          const glyph = isSignal
            ? "T"
            : glyphs[Math.min(glyphs.length - 1, Math.floor(e * glyphs.length))];
          const tint = isSignal
            ? signal
            : tints[(3 * c + 5 * r + Math.floor(e * tints.length)) % tints.length];
          ctx.globalAlpha = (cov < 0.8 ? 0.7 : 1) * marks;
          ctx.fillStyle = tint;
          ctx.font = isSignal ? fontSignal : fontSupport;
          ctx.fillText(glyph, x, y + cell * 0.04);
        }
      }
      ctx.globalAlpha = 1;
    };

    const ro = new ResizeObserver(() => build());
    ro.observe(wrap);
    document.fonts.ready.then(() => {
      if (disposed) return;
      build();
    });
    build();
    raf = window.requestAnimationFrame(draw);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [
    text,
    maskWeight,
    maskItalic,
    maskFamilyVar,
    cellProp,
    minCoverage,
    clearAfterReveal,
    glyphs,
    condense,
    rowsProp,
    tints,
    signal,
    silhouette,
    silhouetteOpacity,
    threshold,
    loop,
    reveal,
    revealSource,
    autoReveal,
    revealMs,
    revealDelayMs,
    tracking,
  ]);

  return (
    <span
      ref={wrapRef}
      role="img"
      aria-label={label ?? text}
      className={`relative block ${className}`}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full" />
    </span>
  );
}
