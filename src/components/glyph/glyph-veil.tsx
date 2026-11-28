"use client";

import React, { useEffect, useRef } from "react";

/**
 * A change of scene made out of the scene's own material. When `trigger`
 * changes, T's close in over the round stage from its rim, then clear from
 * the centre outward, and whatever swapped underneath is revealed by them.
 *
 * Fixed cells, like every glyph field here: nothing slides, cells switch on
 * and off.
 */

function hash(a: number, b: number) {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const DURATION = 620;

interface GlyphVeilProps {
  /** Any value; a change plays the veil once. The first value does not. */
  trigger: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export function GlyphVeil({ trigger, className = "", style }: GlyphVeilProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (new URLSearchParams(window.location.search).has("still")) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const size = Math.max(1, Math.min(rect.width, rect.height));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    const cell = Math.max(9, Math.min(15, size / 52));
    const cols = Math.ceil(size / cell);
    const half = cols / 2;
    const mono =
      getComputedStyle(document.documentElement).getPropertyValue("--font-ibm-plex-mono").trim() ||
      "ui-monospace";
    const fLight = `500 ${(cell * 1.08).toFixed(1)}px ${mono}, monospace`;
    const fBold = `700 ${(cell * 1.3).toFixed(1)}px ${mono}, monospace`;
    const seed = Math.random() * 100;

    let raf = 0;
    const start = performance.now();
    const draw = (now: number) => {
      const t = (now - start) / DURATION;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      if (t >= 1) return;
      raf = window.requestAnimationFrame(draw);
      const cover = smooth(0, 0.4, t);
      const clear = smooth(0.46, 1, t);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let r = 0; r < cols; r++) {
        for (let c = 0; c < cols; c++) {
          const dx = (c + 0.5 - half) / half;
          const dy = (r + 0.5 - half) / half;
          const rho = Math.hypot(dx, dy);
          if (rho > 0.985) continue;
          const j = hash(c + seed, r);
          // Closes from the rim inward, opens from the centre outward.
          const covered = cover * 1.2 > (1 - rho) * 0.8 + j * 0.3;
          const cleared = clear * 1.2 > rho * 0.8 + j * 0.3;
          if (!covered || cleared) continue;
          const x = (c + 0.5) * cell;
          const y = (r + 0.5) * cell;
          ctx.globalAlpha = 1;
          ctx.fillStyle = "#000";
          ctx.fillRect(c * cell - 0.5, r * cell - 0.5, cell + 1, cell + 1);
          // Brightest at the moving edges, like a front of light.
          const edge = Math.max(
            1 - Math.abs(cover * 1.2 - ((1 - rho) * 0.8 + j * 0.3)) * 5,
            1 - Math.abs(clear * 1.2 - (rho * 0.8 + j * 0.3)) * 5,
            0
          );
          const loud = j > 0.55 || edge > 0.5;
          ctx.globalAlpha = 0.5 + 0.5 * edge;
          ctx.fillStyle = edge > 0.55 ? "#F6F3FF" : j > 0.4 ? "#858AE3" : "#613DC1";
          ctx.font = loud ? fBold : fLight;
          ctx.fillText(loud ? "T" : "t", x, y);
        }
      }
      ctx.globalAlpha = 1;
    };
    raf = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(raf);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={style}
      className={`pointer-events-none ${className}`}
    />
  );
}
