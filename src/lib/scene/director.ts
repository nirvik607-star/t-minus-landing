/**
 * The director turns page state (intro time, scroll, pointer) into one set of
 * camera and scene values per frame. The shader and the DOM both read from
 * it, so the countdown always sits exactly inside the event horizon.
 *
 * Scene units: Schwarzschild radius = 1.
 */

export const INTRO_SECONDS = 5.0;
export const INTRO_RETURNING_SECONDS = 1.1;

const B_CRIT = 2.598076211353316; // apparent shadow radius at infinity, in rs
const CAM_DIST = 18;
const DEG = Math.PI / 180;

export interface DirectorInput {
  w: number;
  h: number;
  /** Scene clock, seconds. */
  time: number;
  /** Seconds into the intro. >= INTRO_SECONDS means settled. */
  intro: number;
  /** 0..1 across the sticky runway. */
  pin: number;
  /** CSS px scrolled past the end of the runway (>= 0). */
  exitPx: number;
  /** 0..1 as the closing section arrives. */
  closing: number;
  /** Smoothed pointer, -1..1 on each axis, 0 when unused. */
  px: number;
  py: number;
  /** Whole seconds remaining, for the second hand. */
  secondsLeft: number;
  /** 0..1 through the features section: the disk turns as the reader scrolls it. */
  turn?: number;
  /** CSS px from the top that the hero or closing form reaches; the crest stays below it. 0 = unknown. */
  clearY?: number;
  /** 0..1 from the demos: how urgent the thing on screen is. Speeds and brightens the disk. */
  energy?: number;
}

export interface SceneValues {
  camPos: [number, number, number];
  camRight: [number, number, number];
  camUp: [number, number, number];
  camFwd: [number, number, number];
  focalPx: number;
  /** Hole centre, CSS px, origin top-left. */
  holeX: number;
  holeY: number;
  /** Shadow radius, CSS px. */
  shadowR: number;
  mass: number;
  disk: number;
  diskIn: number;
  diskOut: number;
  spin: number;
  exposure: number;
  star: number;
  starR: number;
  starGain: number;
  flood: number;
  floodR: number;
  drainR: number;
  hand: number;
  handAngle: number;
  voidAlpha: number;
  shimmer: number;
  stars: number;
  alpha: number;
  /** DOM cues, each 0..1. */
  heroReveal: number;
  horizonClock: number;
  dialClock: number;
  /** 0 = horizon framing, 1 = top-down dial. */
  polar: number;
  /** 0..1: how strongly the field is kept clear above the fade line. */
  fadeGuard: number;
  /** Soft light under the glyphs, the darkening around the hole, and its reach in CSS px. */
  glow: number;
  well: number;
  wellPx: number;
  /** 0..1: draw the disk where it crosses in front of the shadow (the intro's full silhouette only). */
  front: number;
  /** Apparent radius of the intro's star, CSS px. */
  starPx: number;
  /** 0..1: how far inside the hole the camera is. */
  dive: number;
}

interface Framing {
  elev: number; // degrees
  cx: number; // CSS px from left
  cy: number; // CSS px from top
  r: number; // shadow radius, CSS px
  diskOut: number;
  exposure: number;
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const smooth = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const smoother = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * t * (t * (t * 6 - 15) + 10);
};
const easeInCubic = (t: number) => t * t * t;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function mixFraming(a: Framing, b: Framing, t: number): Framing {
  return {
    elev: lerp(a.elev, b.elev, t),
    cx: lerp(a.cx, b.cx, t),
    cy: lerp(a.cy, b.cy, t),
    r: lerp(a.r, b.r, t),
    diskOut: lerp(a.diskOut, b.diskOut, t),
    exposure: lerp(a.exposure, b.exposure, t),
  };
}

/**
 * Horizon framing: the hole rises from the bottom of the screen with the
 * countdown inside it. On phones the hole is smaller and sits higher, so the
 * screen shows its whole upper half and the band of disk across its front.
 */
export function horizonFraming(w: number, h: number, lift = 0, clearY = 0): Framing {
  const phone = w < 700;
  const r = phone ? 0.56 * w : Math.max(0.42 * w, Math.min(1.05 * w, 430));
  let crest = phone
    ? Math.min(0.345 * h, 320)
    : Math.min(240, Math.max(128, 0.235 * h)) + lift * 0.5;
  // Never rise into the form above it.
  if (clearY > 0) crest = Math.max(118, Math.min(crest, h - clearY - (phone ? 64 : 40)));
  return {
    elev: lift > 0 ? 13 : 9,
    cx: w / 2,
    cy: h - crest + r,
    r,
    diskOut: lift > 0 ? 4.8 : phone ? 3.9 : 3.5,
    exposure: lift > 0 ? 2.9 : 2.6,
  };
}

/** The full silhouette, held mid-screen during the intro. */
function silhouetteFraming(w: number, h: number): Framing {
  return {
    // Nearly edge-on: the disk crosses the front of the hole as one thin band.
    elev: 6,
    cx: w / 2,
    cy: h * 0.5,
    r: w < 700 ? 0.24 * w : 0.15 * Math.min(w, h * 1.25),
    diskOut: 10.5,
    exposure: 2.6,
  };
}

/** Top-down: the hole as a dial with the clock in the void. */
export function isWideDial(w: number, h: number): boolean {
  return w >= 1080 && w / h > 1.25;
}

export function dialFraming(w: number, h: number): Framing {
  const wide = isWideDial(w, h);
  const r = wide ? Math.min(0.228 * h, 0.145 * w) : Math.min(0.36 * w, 0.185 * h);
  return {
    elev: 90,
    cx: wide ? w * 0.335 : w / 2,
    cy: wide ? h * 0.5 : h * 0.36,
    r,
    diskOut: 4.9,
    exposure: 2.4,
  };
}

/**
 * Inside: the camera has dropped through the dial. The void fills the screen
 * as a black stage and the lit rim shows around its edge.
 */
export function insideFraming(w: number, h: number): Framing {
  return {
    elev: 90,
    cx: w / 2,
    cy: h / 2,
    // Wide screens: a round stage with the rim down both sides. Tall screens:
    // the rim sits just past the edges and shows only in the corners, clear
    // of the copy.
    r: Math.max(0.47 * w, 0.5 * h + 6),
    diskOut: 4.3,
    exposure: 2.3,
  };
}

export function direct(input: DirectorInput): SceneValues {
  const { w, h, intro, pin, exitPx, closing, px, py } = input;
  const clearY = input.clearY ?? 0;
  const energy = clamp01(input.energy ?? 0);
  const horizon = horizonFraming(w, h, 0, clearY);
  const dial = dialFraming(w, h);
  const sil = silhouetteFraming(w, h);
  const alpha = 1;

  // ---------------- scroll framing ----------------
  const rise = smoother(0.04, 0.62, pin);
  let f = mixFraming(horizon, dial, rise);
  // Travel on an arc: the hole lifts before it shrinks, so it never dips.
  f.cy = lerp(horizon.cy, dial.cy, smoother(0.02, 0.5, pin));
  f.r = lerp(horizon.r, dial.r, smoother(0.08, 0.6, pin));
  let polar = rise;

  // Past the runway the camera drops through the dial: the void opens until
  // it fills the screen, and the features play out inside it.
  const inside = insideFraming(w, h);
  let orbit = 0;
  let dive = 0;
  if (exitPx > 0) {
    dive = smoother(0, h * 0.85, exitPx);
    f = mixFraming(dial, inside, dive);
    polar = 1;
    orbit = (input.turn ?? 0) * 3.2;
  }

  // At the end it pulls back out, and the hole settles as the horizon under
  // the closing form.
  if (closing > 0.001) {
    const k = smoother(0, 1, closing);
    const end = horizonFraming(w, h, 78, clearY);
    f = mixFraming(inside, end, k);
    polar = 1 - k;
    orbit *= 1 - k;
  }

  // ---------------- intro ----------------
  let mass = 1;
  let disk = 1;
  let star = 0;
  let starR = 4.2;
  let starGain = 1;
  let flood = 0;
  let floodR = 0;
  let drainR = 0;
  let voidAlpha = 1;
  let heroReveal = 1;
  let clockReveal = 1;
  let spin = 1;
  let front = 0;
  let glow = 0.95;

  if (intro < INTRO_SECONDS) {
    const t = Math.max(0, intro);
    const maxDim = Math.hypot(w, h);

    // Star: breathes, then its core gives way.
    const collapse = clamp01((t - 1.55) / 0.62);
    star = 1 - smooth(2.12, 2.3, t);
    starR = lerp(4.3 + 0.12 * Math.sin(t * 2.1), 0.22, easeInCubic(collapse));
    starGain = 1.05 + 2.6 * easeInCubic(collapse);

    // Light floods the grid, then drains from the middle.
    const fl = clamp01((t - 2.12) / 0.62);
    flood = smooth(2.1, 2.2, t) * (1 - smooth(2.45, 2.95, t)) * 0.62;
    floodR = easeOutCubic(fl) * maxDim * 0.74;
    drainR = easeOutCubic(clamp01((t - 2.2) / 0.78)) * maxDim * 0.7;

    // The hole: horizon opens from a point; the disk gathers from infall.
    mass = smooth(2.42, 3.05, t);
    disk = smooth(2.5, 3.4, t);
    voidAlpha = smooth(2.45, 2.8, t);
    spin = 1 + 2.4 * (1 - smooth(2.5, 4.4, t));

    // Camera: hold on the star, let the full silhouette open, then sweep down
    // to the horizon while the disk draws in.
    const sweep = smoother(3.2, 4.4, t);
    front = 1 - smooth(0.15, 0.6, sweep);
    // The star is made of glyphs first and light second.
    glow = lerp(0.45, 0.95, smooth(2.2, 3.0, t));
    const starFrame: Framing = { ...sil, r: sil.r * 1.02 };
    f = mixFraming(starFrame, horizon, sweep);
    const open = smooth(2.5, 3.3, t);
    const drawIn = smooth(3.3, 4.25, t);
    f.diskOut = lerp(lerp(3.0, 9.5, open), horizon.diskOut, drawIn);
    polar = 0;

    heroReveal = smooth(4.1, 4.75, t);
    clockReveal = smooth(4.45, 5.0, t);
  }

  // ---------------- camera basis ----------------
  const parallax = 1 - polar;
  const elev = (f.elev + py * -1.6 * parallax) * DEG;
  const az = px * 5.5 * DEG * parallax + orbit;
  const ce = Math.cos(elev);
  const se = Math.sin(elev);
  const ca = Math.cos(az);
  const sa = Math.sin(az);
  const dir: [number, number, number] = [ce * sa, se, ce * ca];
  const camPos: [number, number, number] = [
    dir[0] * CAM_DIST,
    dir[1] * CAM_DIST,
    dir[2] * CAM_DIST,
  ];
  const camFwd: [number, number, number] = [-dir[0], -dir[1], -dir[2]];
  const camRight: [number, number, number] = [ca, 0, -sa];
  // up = right x forward
  const camUp: [number, number, number] = [
    camRight[1] * camFwd[2] - camRight[2] * camFwd[1],
    camRight[2] * camFwd[0] - camRight[0] * camFwd[2],
    camRight[0] * camFwd[1] - camRight[1] * camFwd[0],
  ];

  // Focal length that makes the shadow exactly f.r pixels across its radius.
  // During the intro the horizon is smaller (mass < 1) but the framing is the
  // same, so the focal length always refers to the full-mass shadow.
  const focalPx = (f.r * Math.sqrt(CAM_DIST * CAM_DIST - B_CRIT * B_CRIT)) / B_CRIT;

  // Second hand: one step a second, a full turn a minute. Clockwise as seen
  // from above, starting from the top of the dial.
  const sec = ((input.secondsLeft % 60) + 60) % 60;
  const handAngle = -Math.PI / 2 - (sec / 60) * Math.PI * 2;

  // Each readout is either plainly there or gone: no half-visible in-between.
  // The strip rides the hole through the rise, then swaps to the dial readout
  // in one short cross-fade at the centre of the void. Inside, neither shows.
  const insideNow = exitPx > 0 && closing <= 0.001;
  const horizonClock = insideNow ? 0 : clockReveal * (1 - smooth(0.62, 0.76, polar));
  const dialClock =
    closing > 0.001 ? 0 : smooth(0.68, 0.86, polar) * (1 - smooth(0, h * 0.2, exitPx));

  return {
    camPos,
    camRight,
    camUp,
    camFwd,
    focalPx,
    holeX: f.cx,
    holeY: f.cy,
    shadowR: f.r * Math.max(mass, 0.0001),
    mass,
    disk,
    diskIn: 2.2,
    diskOut: f.diskOut,
    spin: spin * (1 + 2.6 * energy),
    exposure: f.exposure * (1 + 0.28 * energy),
    star,
    starR,
    starGain,
    flood,
    floodR,
    drainR,
    hand: 0,
    handAngle,
    voidAlpha,
    shimmer: 1,
    stars: 0,
    alpha,
    heroReveal,
    horizonClock,
    dialClock,
    polar,
    // On the way out, the field is kept off the closing copy from the start.
    fadeGuard:
      closing > 0.001
        ? smooth(0, 0.12, closing)
        : (1 - smooth(0.05, 0.3, polar)) * smooth(3.4, 4.1, intro),
    glow,
    front,
    // The ground under the glyph field drops toward black across the whole
    // disk, so the light has real dark to stand against.
    well: 0.9 * mass,
    wellPx: f.r * (f.diskOut / B_CRIT) * lerp(0.5, 0.92, polar) * (1 - 0.5 * dive),
    starPx: (starR * focalPx) / CAM_DIST,
    dive: closing > 0.001 ? 1 - smoother(0, 1, closing) : dive,
  };
}
