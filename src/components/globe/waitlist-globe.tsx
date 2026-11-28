"use client";

import React, { useEffect, useRef, useState } from "react";
import { isLand } from "@/lib/globe/land";
import { regionForAreaCode } from "@/lib/globe/area-codes";
import { WAITLIST_ENDPOINT } from "@/lib/launch";

/**
 * The waitlist, on a globe drawn in T's.
 *
 * The map only ever knows a broad area for a signup (the region an area code
 * serves) and how many people are on the list. See the pulse endpoint for
 * what is and is not sent.
 *
 * Like every glyph field on the page it is a fixed grid of cells: the Earth
 * turns by cells changing which character they hold, never by sliding.
 */

export interface PulsePlace {
  label: string;
  lat: number;
  lon: number;
  /** The visitor's own signup, added locally once they join. */
  self?: boolean;
}

export interface PulseData {
  count: number;
  places: PulsePlace[];
  /** True for the design preview's example data. Never true in production. */
  sample?: boolean;
}

/** Example activity for design review. Reachable only outside production, with ?pulseDemo=1. */
const SAMPLE_CODES = [
  "212", "310", "404", "312", "713", "305", "206", "415", "617", "303",
  "602", "615", "503", "702", "214", "313", "416", "604", "504", "612", "919", "808",
];

function samplePulse(): PulseData {
  const places: PulsePlace[] = [];
  for (const code of SAMPLE_CODES) {
    const r = regionForAreaCode(code);
    if (r) places.push({ label: r.label, lat: r.lat, lon: r.lon });
  }
  return { count: 1284, places, sample: true };
}

/**
 * Reads the public feed: a count and a shuffled handful of areas. Quiet on
 * failure (a static host has no endpoint): the globe then simply turns.
 */
export function useWaitlistPulse(): PulseData | null {
  const [data, setData] = useState<PulseData | null>(null);
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" &&
      new URLSearchParams(window.location.search).has("pulseDemo")
    ) {
      setData(samplePulse());
      return;
    }
    let dead = false;
    const load = async () => {
      if (document.hidden) return;
      try {
        const res = await fetch(`${WAITLIST_ENDPOINT}/pulse`, { headers: { accept: "application/json" } });
        if (!res.ok) return;
        const json = (await res.json()) as PulseData;
        if (!dead && typeof json.count === "number" && Array.isArray(json.places)) {
          setData({ count: json.count, places: json.places });
        }
      } catch {
        // no endpoint here: stay quiet
      }
    };
    load();
    const id = window.setInterval(load, 30000);
    return () => {
      dead = true;
      window.clearInterval(id);
    };
  }, []);
  return data;
}

const DEG = Math.PI / 180;
/** The view rests over North America, where the area codes are, and sways a little. */
const CENTRE_LAT = 37;
const CENTRE_LON = -97;
const SWAY = 26;

const WHITE = "#F6F3FF";
const PERI = "#858AE3";
const ACCENT = "#613DC1";
const DEEP = "#4E148C";

function hash(a: number, b: number) {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

interface WaitlistGlobeProps {
  places: PulsePlace[];
  /** Runs the idle cycle. Off while the globe is out of view. */
  active: boolean;
  /** Called as each place takes its turn, so the page can say where. */
  onPing?: (place: PulsePlace) => void;
  className?: string;
}

export function WaitlistGlobe({ places, active, onPing, className = "" }: WaitlistGlobeProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const placesRef = useRef(places);
  placesRef.current = places;
  const activeRef = useRef(active);
  activeRef.current = active;
  const onPingRef = useRef(onPing);
  onPingRef.current = onPing;

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const still = new URLSearchParams(window.location.search).has("still");
    const mono =
      getComputedStyle(document.documentElement).getPropertyValue("--font-ibm-plex-mono").trim() ||
      "ui-monospace";
    const family = `${mono}, ui-monospace, monospace`;

    let size = 0;
    let cell = 10;
    let cols = 0;
    let dpr = 1;
    let raf = 0;
    let disposed = false;
    let lastFrame = -1;
    const start = performance.now();

    // The idle cycle: one place at a time takes a ring of light.
    let cursor = 0;
    let nextAt = 600;
    let ping: { place: PulsePlace; t0: number } | null = null;
    let seenSelf = false;
    let announced = false;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      size = Math.max(1, Math.min(rect.width, rect.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      cell = Math.max(6.5, Math.min(14, size / 46));
      cols = Math.floor(size / cell);
      lastFrame = -1;
    };

    /** Screen cell for a place, or null when it is on the far side. */
    const project = (lat: number, lon: number, lat0: number, lon0: number) => {
      const p = lat * DEG;
      const l = (lon - lon0) * DEG;
      const p0 = lat0 * DEG;
      const cosc = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l);
      if (cosc < 0.08) return null;
      const x = Math.cos(p) * Math.sin(l);
      const y = Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l);
      const half = cols / 2;
      return { c: half + x * (half - 1.2) - 0.5, r: half - y * (half - 1.2) - 0.5, depth: cosc };
    };

    const draw = (now: number) => {
      if (disposed) return;
      raf = window.requestAnimationFrame(draw);
      const elapsed = (now - start) / 1000;
      const frame = reduced || still ? 0 : Math.floor(elapsed * 12);
      const list = placesRef.current;

      // Advance the idle cycle.
      if (activeRef.current && list.length > 0 && !reduced && !still) {
        const ms = now - start;
        const self = list.find((p) => p.self);
        if (self && !seenSelf) {
          // The visitor's own place goes first, the moment they join.
          seenSelf = true;
          ping = { place: self, t0: ms };
          nextAt = ms + 3200;
          onPingRef.current?.(self);
        } else if (ms >= nextAt) {
          const place = list[cursor % list.length];
          cursor++;
          ping = { place, t0: ms };
          nextAt = ms + 2400;
          onPingRef.current?.(place);
        }
      }

      // Without motion there is no cycle: one place is named and holds its ring.
      if ((reduced || still) && list.length > 0 && !announced) {
        announced = true;
        lastFrame = -1;
        onPingRef.current?.(list.find((p) => p.self) ?? list[0]);
      }

      if (frame === lastFrame && !ping) return;
      lastFrame = frame;

      const lon0 = CENTRE_LON + (reduced || still ? 0 : SWAY * Math.sin(elapsed * 0.11));
      const lat0 = CENTRE_LAT;
      const p0 = lat0 * DEG;
      const half = cols / 2;
      const ox = (size - cols * cell) / 2;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      // The disc itself is black, so nothing behind the globe shows through it.
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - 0.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const fLight = `400 ${(cell * 1.02).toFixed(1)}px ${family}`;
      const fMid = `600 ${(cell * 1.16).toFixed(1)}px ${family}`;
      const fBold = `700 ${(cell * 1.3).toFixed(1)}px ${family}`;
      const fMark = `700 ${(cell * 1.62).toFixed(1)}px ${family}`;

      // Where each known place falls on the grid right now.
      const marks = new Map<number, number>();
      const seen = new Set<string>();
      for (let i = 0; i < list.length; i++) {
        const pl = list[i];
        // Places that share an area are nudged apart a cell, always the same way.
        const key = `${pl.lat},${pl.lon}`;
        const dup = seen.has(key);
        seen.add(key);
        const j = dup ? i + 1 : 0;
        const pr = project(pl.lat + (hash(j, 1) - 0.5) * (dup ? 2.4 : 0), pl.lon + (hash(j, 2) - 0.5) * (dup ? 3 : 0), lat0, lon0);
        if (!pr) continue;
        marks.set(Math.round(pr.r) * 1000 + Math.round(pr.c), pl.self ? 2 : 1);
      }

      let ring: { c: number; r: number; age: number } | null = null;
      if ((reduced || still) && list.length > 0) {
        const held = list.find((p) => p.self) ?? list[0];
        const pr = project(held.lat, held.lon, lat0, lon0);
        if (pr) ring = { c: pr.c, r: pr.r, age: 0.6 };
      } else if (ping) {
        const age = (now - start - ping.t0) / 1000;
        if (age > 2.2) ping = null;
        else {
          const pr = project(ping.place.lat, ping.place.lon, lat0, lon0);
          if (pr) ring = { c: pr.c, r: pr.r, age };
        }
      }

      for (let r = 0; r < cols; r++) {
        for (let c = 0; c < cols; c++) {
          const x = (c + 0.5 - half) / (half - 1.2);
          const y = -(r + 0.5 - half) / (half - 1.2);
          const rho2 = x * x + y * y;
          const px = ox + (c + 0.5) * cell;
          const py = ox + (r + 0.5) * cell;

          if (rho2 > 1) {
            // A thin atmosphere, one cell deep.
            if (rho2 < 1.11) {
              ctx.globalAlpha = 0.5;
              ctx.fillStyle = ACCENT;
              ctx.font = fLight;
              ctx.fillText("t", px, py);
            }
            continue;
          }

          const z = Math.sqrt(1 - rho2);
          const rho = Math.sqrt(rho2);
          let lat = lat0;
          let lon = lon0;
          if (rho > 1e-6) {
            const cc = Math.asin(rho);
            const sinc = Math.sin(cc);
            const cosc = Math.cos(cc);
            lat = Math.asin(cosc * Math.sin(p0) + (y * sinc * Math.cos(p0)) / rho) / DEG;
            lon = lon0 + Math.atan2(x * sinc, rho * Math.cos(p0) * cosc - y * Math.sin(p0) * sinc) / DEG;
          }

          // Lit from the upper left, darkening toward the limb.
          const lightDot = Math.max(0, -0.42 * x + 0.5 * y + 0.76 * z);
          const shade = Math.pow(z, 0.45) * (0.4 + 0.6 * lightDot);

          // The ring of a ping brightens whatever it passes over.
          let lift = 0;
          if (ring) {
            const d = Math.hypot(c - ring.c, r - ring.r);
            const radius = ring.age * 5.2;
            lift = Math.max(0, 1 - Math.abs(d - radius) / 1.1) * Math.max(0, 1 - ring.age / 1.6);
            if (d < 0.8) lift = Math.max(lift, 1 - ring.age / 2.2);
          }

          const mark = marks.get(r * 1000 + c);
          if (mark) {
            ctx.globalAlpha = 1;
            ctx.fillStyle = WHITE;
            ctx.font = mark === 2 || lift > 0.4 ? fMark : fBold;
            ctx.fillText("T", px, py);
            continue;
          }

          if (isLand(lat, lon)) {
            const tone = Math.min(1, shade + lift * 0.9);
            ctx.globalAlpha = Math.min(1, 0.42 + 0.58 * tone);
            ctx.fillStyle = tone > 0.82 ? WHITE : tone > 0.5 ? PERI : ACCENT;
            if (tone > 0.72) {
              ctx.font = fBold;
              ctx.fillText("T", px, py);
            } else if (tone > 0.46) {
              ctx.font = fMid;
              ctx.fillText("T", px, py);
            } else {
              ctx.font = fMid;
              ctx.fillText("t", px, py);
            }
          } else if (lift > 0.25) {
            // Open water only shows where a ring crosses it.
            ctx.globalAlpha = lift * 0.9;
            ctx.fillStyle = PERI;
            ctx.font = fLight;
            ctx.fillText("t", px, py);
          } else if ((c + r) % 2 === 0 && hash(c, r) > 0.35) {
            ctx.globalAlpha = 0.16 + 0.3 * shade;
            ctx.fillStyle = DEEP;
            ctx.font = fLight;
            ctx.fillText("-", px, py);
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();
    document.fonts.ready.then(() => {
      lastFrame = -1;
    });
    raf = window.requestAnimationFrame(draw);
    return () => {
      disposed = true;
      window.cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className={`flex items-center justify-center ${className}`}>
      <canvas ref={canvasRef} aria-hidden="true" className="block" />
    </div>
  );
}
