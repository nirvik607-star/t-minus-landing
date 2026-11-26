"use client";

import React, { useEffect, useRef } from "react";
import { drawWordmarkMaskCanvas } from "@/components/landing/t-minus-wordmark";

/**
 * Shared scroll & 3D camera telemetry published every animation frame so
 * `HorizonCountdown`, hero lift-off, and the Layer 20 curved pre-rim veil
 * stay pixel-locked at 60fps with the real 3D black hole.
 */
export interface HorizonSyncState {
  /** 0 = bottom hero rest, 1 = top-pinned inverted event horizon */
  pinProgress: number;
  /** 0..1 intro settle (1 = settled bottom horizon) */
  settleProgress: number;
  /** True strictly once the black hole has fully resolved at the bottom of the screen */
  heroResolved: boolean;
  /** Screen Y (px from top) where the countdown centers inside the pure #000000 core */
  countdownCenterY: number;
  /** Scale factor for countdown (1.0 bottom -> 1.22 polar -> 0.72 top dome) */
  countdownScale: number;
  /** Exact 3D-projected top-dome circle in CSS px for the Layer 20 curved pre-rim veil */
  domeCenterX: number;
  domeCenterY: number;
  domeRadiusPx: number;
  /** Rim Y at viewport edges (px from top) for upper-corner backing */
  domeEdgeY: number;
  /** Current viewport width in CSS px */
  viewportW: number;
}

interface AsciiBlackholeCanvasProps {
  onHeroReveal: (revealed: boolean) => void;
  onHorizonSync?: (state: HorizonSyncState) => void;
  /** Reference to the native CSS sticky scroll runway wrapper */
  runwayRef?: React.RefObject<HTMLDivElement | null>;
  skipIntro?: boolean;
}

/**
 * Strict locked ASCII glyph ramp (space + `^ - t + = T *` ONLY).
 * Zero `.`, zero `:`, zero `·`.
 */
const ASCII_RAMP = " ^-t+=T*";

// ---- Approved 1B + 2B Intro Choreography Timings (Total 9.00s to Full Bottom Resolve) ----
// Act I   (0.00s -> 2.40s): 3D Dying Supergiant (1B warm-white -> seismic #97DFFC cracks)
// Act II  (2.40s -> 3.85s): Core Collapse / Implosion + Infalling Streams + Polar Jet Breakout
// Act III (3.85s -> 5.65s): 3D Filamentary Supernova + Pure-ASCII T^minus + Singularity Punch-Through
// Act IV  (5.65s -> 9.00s): Newborn Black Hole Dwell (5.65 -> 6.60) -> Unbroken 3D Sweep -> Bottom Horizon
// Act V   (9.00s+):         Horizon Lock-In Shimmer + Upward ASCII Materialization (strictly post-resolve)
const INTRO_TOTAL_SEC = 9.0;
const HERO_REVEAL_SEC = 9.0;

const VS_QUAD = `#version 300 es
precision highp float;
out vec2 vUv;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

/**
 * Pass 1: Loop-Free Analytic 3D Dying Star -> Gravitational Implosion ->
 *         3D Filamentary Supernova -> Relativistic Black Hole + Kurzgesagt Spiral Disk
 *         + 3D Helical Polar Jets
 *
 * - Pure procedural WebGL2 / GLSL ES 3.00 (ZERO MP4 video, ZERO texture lookups, ZERO raymarch loops).
 * - Everything shares world origin (0, 0, 0) for zero off-center drift across all acts.
 * - Act I starts with a sculpted 1B warm-white supergiant floating in deep #040206 obsidian space,
 *   shifting sharply into #97DFFC ice-blue & T^minus Galaxy violet during core collapse and supernova.
 * - Once settled (>= 9.00s), strictly T^minus Galaxy palette:
 *   #040206 obsidian | #000000 pure event horizon |
 *   #2C0735 -> #4E148C -> #613DC1 -> #858AE3 -> #F7FAFF | #97DFFC ice-blue accents.
 */
const FS_SCENE = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 o;

uniform float uTime;
uniform float uViewAsp;
uniform float uSceneH;
uniform float uTanHalfFov;

// Continuous 3D orbital camera basis (gimbal-lock-free across elev 14 deg -> 88 deg -> 154 deg)
uniform vec3  uCamPos;
uniform vec3  uCamRight;
uniform vec3  uCamUp;
uniform vec3  uCamFwd;

// Act I -> III: 3D Dying Star, Gravitational Implosion & Filamentary Supernova Ejecta
uniform float uStarVis;        // 0..1 dying star presence (Act I -> Act II)
uniform float uStarRadius;     // 1.32 sculpted supergiant -> 0.14 collapsed core
uniform float uStarShift;      // 0 = 1B warm-white photosphere -> 1 = electric #97DFFC & Galaxy violet
uniform float uStarCrack;      // 0..1 seismic instability fracture veins
uniform float uImplode;        // 0..1 radial infalling plasma tendrils
uniform float uEjecta;         // 0..1 expanding 3D Rayleigh-Taylor supernova ejecta shell
uniform float uEjectaProg;     // 0..1 radial expansion of supernova shell & nebula wisps
uniform float uBhBirth;        // 0 = no black hole yet, 1 = full #000000 event horizon punched open
uniform float uDiskBirth;      // 0 = no disk yet, 1 = fallback accretion disk spun up
uniform float uLockPulse;      // 0..1 post-resolve #97DFFC horizon lock-in shimmer pulse
uniform float uLockWaveProg;   // 0..1 outward radial ripple along settled photon rim

// Continuous state parameters
uniform float uSettle;         // 0 = full-screen intro, 1 = settled horizon/scroll
uniform float uPin;            // 0 = bottom horizon, 1 = top-pinned dome
uniform float uPolarFactor;    // 0 = tilted / horizon, 1 = top-down polar spiral plateau
uniform float uDiskOuterR;     // smooth breathing disk extent
uniform float uJetPower;       // 0 Act I -> breakout at collapse -> newborn BH -> 0 settled
uniform float uCharge;         // 0..1 pre-detonation pinch-point singularity surge
uniform float uBlastPeak;      // 0..1 pure-white + ice-blue-tinted supernova core flash
uniform float uBlastProgress;  // 0..1 expanding shockfront wave across Act III
uniform vec2  uPointer;        // smoothed normalized UV pointer
uniform float uPointerActive;  // 0..1 pointer presence

const float PI = 3.14159265;
const float TWO_PI = 6.28318530;
const float R_H = 1.0;

// Strict T^minus Galaxy Palette
const vec3 C_OBSIDIAN    = vec3(0.0157, 0.0078, 0.0235); // #040206
const vec3 C_SPACE       = vec3(0.1725, 0.0275, 0.2078); // #2C0735
const vec3 C_DEEP_PURPLE = vec3(0.3059, 0.0784, 0.5490); // #4E148C
const vec3 C_ACCENT      = vec3(0.3804, 0.2392, 0.7569); // #613DC1
const vec3 C_PERIWINKLE  = vec3(0.5216, 0.5412, 0.8902); // #858AE3
const vec3 C_ICE_BLUE    = vec3(0.5922, 0.8745, 0.9882); // #97DFFC
const vec3 C_WHITE_CORE  = vec3(0.9686, 0.9804, 1.0000); // #F7FAFF

// 1B Natural Warm-White Dying Star Palette (high-contrast convective photosphere in deep space)
const vec3 C_STAR_CORE   = vec3(1.0000, 0.9725, 0.9098); // #FFF8E8 incandescent warm-white
const vec3 C_STAR_MID    = vec3(0.9216, 0.7882, 0.5961); // #EBC998 champagne-gold granulation
const vec3 C_STAR_LIMB   = vec3(0.5608, 0.3412, 0.2157); // #8F5737 deep convective limb contrast
const vec3 C_STAR_CORONA = vec3(0.9412, 0.7804, 0.5647); // #F0C790 sculpted warm corona

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

/**
 * Loop-free 3D trigonometric stellar granulation & turbulent plasma field on a unit sphere.
 */
float starTurbulence(vec3 p, float t) {
  float a = sin(p.x * 5.2 + t * 0.95) * cos(p.y * 5.6 - t * 0.78) * sin(p.z * 5.4 + t * 0.65);
  float b = sin((p.x + p.z) * 8.6 - t * 1.45) * cos((p.y - p.x) * 9.2 + t * 1.20);
  float c = cos((p.y + p.z) * 14.5 + t * 2.15) * sin((p.x - p.y * 0.7) * 13.0 - t * 1.75);
  return 0.5 + 0.30 * a + 0.17 * b + 0.10 * c;
}

/**
 * Act I & II: Sculpted 3D Dying Supergiant Star floating in deep #040206 obsidian space.
 * - High-contrast convective boiling cells (reads clearly through ASCII ^-t+=T*),
 *   crisp limb darkening, tight magnetic coronal loops, and seismic #97DFFC core-failure cracks.
 */
vec4 evalDyingStar(vec3 ro, vec3 rd, vec3 closestPt, float b, float tc, float pixelAA) {
  if (uStarVis <= 0.002 || tc <= 0.0) return vec4(0.0);

  float R = max(0.12, uStarRadius);
  vec2 planeXY = vec2(dot(closestPt, uCamRight), dot(closestPt, uCamUp));
  float ang = atan(planeXY.y, planeXY.x);

  float pulseWave = 0.5 + 0.5 * sin(uTime * 11.0 + ang * 3.0);

  // Color temperature shift: 1B warm-white -> electric #97DFFC & Galaxy violet during core collapse
  vec3 corePal = mix(C_STAR_CORE, vec3(1.0, 1.0, 1.0), uStarShift);
  vec3 midPal = mix(C_STAR_MID, mix(C_ICE_BLUE, C_WHITE_CORE, 0.36), uStarShift);
  vec3 limbPal = mix(C_STAR_LIMB, mix(C_DEEP_PURPLE, C_ACCENT, 0.55), uStarShift);
  vec3 coronaPal = mix(C_STAR_CORONA, mix(C_ICE_BLUE, C_PERIWINKLE, 0.48), uStarShift);

  vec3 starCol = vec3(0.0);
  float starAlpha = 0.0;

  // 1) Analytic 3D ray-sphere photosphere with rich convective boiling contrast
  float sphereMask = 1.0 - smoothstep(R - pixelAA * 1.5, R + pixelAA * 1.5, b);
  if (b < R + pixelAA * 2.0) {
    float zHalf = sqrt(max(0.0, R * R - min(b, R) * min(b, R)));
    vec3 pHit = ro + (tc - zHalf) * rd;
    vec3 N = normalize(pHit);

    // Spin up smoothly during collapse (conservation of angular momentum)
    float spin = uTime * (0.42 + uImplode * 2.2);
    float cs = cos(spin);
    float sn = sin(spin);
    vec3 Nr = vec3(N.x * cs + N.z * sn, N.y, -N.x * sn + N.z * cs);

    float gran = starTurbulence(Nr, uTime * (1.05 + uStarCrack * 0.95));
    float hotCells = smoothstep(0.42, 0.86, gran);
    float darkLanes = smoothstep(0.50, 0.14, gran);

    // Seismic instability fractures veining across the star as iron-core fusion fails
    float f1 = abs(sin(Nr.x * 9.5 + Nr.y * 6.2 + uTime * 2.4) + cos(Nr.z * 8.4 - Nr.y * 7.1));
    float f2 = abs(cos(Nr.y * 11.2 - Nr.z * 7.8 - uTime * 2.8) + sin(Nr.x * 10.1 + Nr.z * 6.5));
    float crackMask = (1.0 - smoothstep(0.02, 0.21, min(f1, f2))) * uStarCrack;
    crackMask *= (0.68 + 0.32 * pulseWave);

    // Sculptural 3D limb darkening so the sphere clearly curves in 3D space
    float ndotv = clamp(dot(N, -rd), 0.0, 1.0);
    float limbDark = pow(ndotv, 0.72);
    float rimFlare = pow(1.0 - ndotv, 3.2) * (0.42 + 0.48 * uStarCrack);

    vec3 surfCol = mix(limbPal, midPal, clamp(limbDark * 0.82 + hotCells * 0.34, 0.0, 1.0));
    surfCol = mix(surfCol, corePal, smoothstep(0.52, 0.94, limbDark * 0.65 + hotCells * 0.45));
    // Carve real dark convective inter-granule channels so ASCII glyphs visibly boil on the 3D surface
    surfCol *= (1.0 - darkLanes * 0.46 * (1.0 - uStarShift * 0.38));

    // Electric #97DFFC / pure-white fracture veins & collapsing superheated pinch
    vec3 crackCol = mix(C_ICE_BLUE, vec3(1.0), 0.56);
    surfCol = mix(surfCol, crackCol * 1.15, clamp(crackMask * 0.92, 0.0, 0.95));
    surfCol += mix(coronaPal, C_ICE_BLUE, 0.48 + 0.52 * uStarShift) * rimFlare * 0.85;

    float compressBoost = 1.0 + uImplode * 0.42 + uCharge * 0.75;
    starCol = surfCol * compressBoost * sphereMask;
    starAlpha = max(starAlpha, sphereMask);
  }

  // 2) Tight, sculpted volumetric chromosphere & arched coronal prominences (keeps surrounding space pure obsidian!)
  float distOut = max(0.0, b - R);
  float coronaScale = max(0.26, R * 0.42);
  float normOut = distOut / coronaScale;
  if (normOut < 3.4) {
    float streamA = 0.5 + 0.5 * cos(ang * 6.0 - uTime * 0.95 + distOut * 2.2);
    float streamB = 0.5 + 0.5 * cos(ang * 11.0 + uTime * 1.35 - distOut * 2.8);
    float streamers = pow(max(streamA, streamB * 0.85), 2.4);

    // Arched magnetic prominence loops hugging the sphere limb
    float loopR = 0.22 + 0.24 * (0.5 + 0.5 * sin(ang * 5.0 + uTime * 0.75));
    float promArc = exp(-pow((normOut - loopR) * 7.2, 2.0))
      * smoothstep(0.42, 0.90, 0.5 + 0.5 * cos(ang * 5.0 - uTime * 0.6))
      * (1.0 - sphereMask) * (0.62 + 0.45 * uStarCrack);

    float innerCorona = exp(-normOut * 3.85) * (0.52 + 0.48 * streamers) * (1.0 - sphereMask * 0.82);
    float outerHalo = exp(-normOut * 1.75) * (0.12 + 0.16 * streamers) * (1.0 - sphereMask * 0.92);
    float outerCut = 1.0 - smoothstep(2.1, 3.3, normOut);

    vec3 cInner = mix(coronaPal, corePal, 0.35);
    vec3 cOuter = mix(mix(C_STAR_LIMB * 0.78, C_DEEP_PURPLE, uStarShift), C_ICE_BLUE, uStarCrack * 0.52);
    vec3 coronaRgb = (cInner * (innerCorona * 0.82 + promArc * 0.78) + cOuter * outerHalo) * outerCut;

    starCol += coronaRgb * (1.0 + uImplode * 0.32 + uCharge * 0.55);
    starAlpha = max(starAlpha, clamp((innerCorona * 0.85 + promArc * 0.78 + outerHalo * 0.45) * outerCut, 0.0, 1.0));
  }

  return vec4(starCol * uStarVis, clamp(starAlpha * uStarVis, 0.0, 1.0));
}

/**
 * Act II: High-Velocity 3D Gravitational Implosion Filaments rushing INWARD into the collapsing core.
 * High dark-space contrast between streams so the inward pull reads unmistakably in ASCII.
 */
vec4 evalImplosionStreams(vec3 closestPt, float b, float tc) {
  if (uImplode <= 0.002 || tc <= 0.0) return vec4(0.0);

  vec2 planeXY = vec2(dot(closestPt, uCamRight), dot(closestPt, uCamUp));
  float ang = atan(planeXY.y, planeXY.x);
  float logB = log(max(b, 0.07));

  // Positive +uTime phase pushes radial plasma streaks visibly INWARD toward (0,0,0)
  float armA = pow(0.5 + 0.5 * cos(ang * 12.0 + logB * 3.6 + uTime * 2.8), 4.5);
  float armB = pow(0.5 + 0.5 * cos(ang * 19.0 - logB * 4.4 - uTime * 2.1 + 1.1), 5.2);
  float dashA = smoothstep(0.28, 0.86, 0.5 + 0.5 * cos(logB * 15.0 + uTime * 14.5 + ang * 2.0));
  float dashB = smoothstep(0.36, 0.90, 0.5 + 0.5 * cos(logB * 21.0 + uTime * 18.5 - ang * 3.0));

  float radialEnv = smoothstep(max(0.08, uStarRadius * 0.65), max(0.24, uStarRadius * 1.15), b)
    * exp(-max(0.0, b - uStarRadius) * 0.92);

  // Tightening gravitational lensing compression ring around the imploding star
  float pinchR = max(0.22, uStarRadius * 1.32);
  float pinchRing = exp(-pow((b - pinchR) * 7.2, 2.0)) * (0.50 + 0.50 * cos(ang * 8.0 - uTime * 4.8));

  float streamEnergy = (armA * dashA * 0.88 + armB * dashB * 0.68) * radialEnv + pinchRing * 0.62;
  vec3 col = mix(C_DEEP_PURPLE, C_ACCENT, smoothstep(0.06, 0.30, streamEnergy));
  col = mix(col, C_ICE_BLUE, smoothstep(0.24, 0.68, streamEnergy + pinchRing * 0.45));
  col = mix(col, C_WHITE_CORE, smoothstep(0.72, 1.22, streamEnergy + uCharge * 0.45));

  float intensity = streamEnergy * uImplode * (0.95 + uCharge * 0.48);
  return vec4(col * intensity, clamp(intensity * 0.92, 0.0, 1.0));
}

/**
 * Act III -> early Act IV: 3D Expanding Rayleigh-Taylor Supernova Ejecta Shell & Double Shockfront.
 * Sculpted hollow rings + plasma tendrils that sweep across the viewport without clipping corners to white.
 */
vec4 evalSupernovaEjecta(vec3 closestPt, float b, float tc) {
  if (uEjecta <= 0.002 || tc <= 0.0) return vec4(0.0);

  vec2 planeXY = vec2(dot(closestPt, uCamRight), dot(closestPt, uCamUp));
  float ang = atan(planeXY.y, planeXY.x);

  float p = uEjectaProg;
  float rMain = mix(0.28, 7.8, pow(p, 0.72));
  float rInner = mix(0.18, 4.6, pow(p, 0.86));

  float rtRipple = 0.20 * sin(ang * 7.0 + p * 4.5)
    + 0.13 * cos(ang * 13.0 - p * 6.2 + 0.8)
    + 0.07 * sin(ang * 21.0 + p * 8.0);
  float shellDist = b - (rMain + rtRipple * (0.32 + p * 0.78));
  float shellW = mix(0.22, 0.68, p);
  float mainShell = exp(-pow(shellDist / shellW, 2.0));

  float innerDist = b - (rInner + rtRipple * 0.42);
  float innerW = mix(0.18, 0.56, p);
  float innerShell = exp(-pow(innerDist / innerW, 2.0));

  float webA = smoothstep(0.32, 0.88, 0.5 + 0.5 * cos(ang * 10.0 - b * 2.5 + uTime * 2.2));
  float webB = smoothstep(0.36, 0.90, 0.5 + 0.5 * cos(ang * 17.0 + b * 3.2 - uTime * 1.7));
  float filaments = max(webA, webB * 0.82);

  float rayPattern = pow(0.5 + 0.5 * cos(ang * 9.0 - uTime * 1.4), 3.4) * 0.58
    + pow(0.5 + 0.5 * cos(ang * 15.0 + uTime * 1.1 + 0.5), 4.4) * 0.40;
  float trailingInterior = (1.0 - smoothstep(rMain * 0.68, rMain * 1.05, b))
    * smoothstep(0.30, max(0.65, rInner * 0.55), b)
    * (0.20 + 0.80 * rayPattern) * (1.0 - p * 0.75);

  float energy = mainShell * (0.52 + 0.58 * filaments)
    + innerShell * (0.42 + 0.48 * webA) * 0.75
    + trailingInterior * 0.38;

  vec3 col = mix(C_SPACE, C_DEEP_PURPLE, smoothstep(0.05, 0.26, energy));
  col = mix(col, C_ACCENT, smoothstep(0.22, 0.48, energy));
  col = mix(col, C_PERIWINKLE, smoothstep(0.42, 0.74, energy));
  col = mix(col, C_ICE_BLUE, clamp(mainShell * 0.75 + innerShell * 0.40, 0.0, 0.82));
  col = mix(col, C_WHITE_CORE, smoothstep(0.84, 1.32, energy * (1.0 - p * 0.55)));

  // Restrain ejecta while the central white blast is at peak so corners stay vivid ice-blue/violet
  float blastDuck = 1.0 - uBlastPeak * 0.55;
  float fade = uEjecta * mix(1.05, 0.52, smoothstep(0.32, 0.92, p)) * blastDuck;
  return vec4(col * energy * fade, clamp(energy * fade * 0.92, 0.0, 1.0));
}

/**
 * Evaluate the unified 3D Kurzgesagt-inspired accretion disk at equatorial point xz (y = 0).
 * Seamless across all 360 deg via integer harmonic angular multipliers + continuous logarithmic
 * inward spiral twist (mild curl in tilted intro -> unmistakable inward spiral at polar plateau).
 * Returns vec4(rgb, opacity).
 */
vec4 evalDisk(vec2 xz, float outerR, float polarF, float time, float dopplerBias) {
  if (uDiskBirth <= 0.002) return vec4(0.0);

  float r = length(xz);
  if (r < 1.02 || r > outerR) return vec4(0.0);

  float theta = atan(xz.y, xz.x);
  float logR = log(r);

  // During diskBirth (0 -> 1), fallback supernova plasma winds inward from outer disk toward R_h
  float birthRadiusGate = smoothstep(
    mix(outerR * 0.88, 1.02, uDiskBirth),
    mix(outerR * 1.05, 1.13, uDiskBirth),
    r
  );
  float innerEnv = mix(birthRadiusGate, smoothstep(1.025, 1.13, r), smoothstep(0.65, 1.0, uDiskBirth));
  float outerEnv = 1.0 - smoothstep(outerR * 0.62, outerR, r);
  float rNorm = clamp((r - 1.05) / max(0.6, outerR - 1.05), 0.0, 1.0);

  float birthTwist = (1.0 - uDiskBirth) * 5.2;
  float spiralTwist = mix(3.4 + birthTwist, 14.5, polarF);
  float infall = time * mix(0.22, 0.62, polarF);

  // ---- Stratum 1: Hot Inner ISCO Streamlines ----
  float s1Phase = 3.0 * theta + (spiralTwist * 1.15) * logR + infall * 1.45 - time * 1.15;
  float s1Ring = smoothstep(0.30, 0.80, 0.5 + 0.5 * cos(s1Phase));
  float s1Conc = smoothstep(0.34, 0.82, 0.5 + 0.5 * cos(logR * 25.0 + infall * 2.2));
  float s1Track = mix(mix(s1Conc, s1Ring, 0.55), s1Ring, polarF);
  float s1Dash = smoothstep(0.14, 0.64, 0.5 + 0.5 * cos(4.0 * theta - 5.2 * logR - time * 1.9));
  float s1Env = smoothstep(1.025, 1.09, r) * (1.0 - smoothstep(1.65, 2.45, r));
  float s1Val = s1Track * (0.48 + 0.52 * s1Dash) * s1Env;

  // ---- Stratum 2: Bold Kurzgesagt Mid-Disk Dashed Spiral Arms ----
  float s2ArmA = smoothstep(0.38, 0.82, 0.5 + 0.5 * cos(4.0 * theta + spiralTwist * logR + infall * 1.15 - time * 0.72));
  float s2ArmB = smoothstep(0.46, 0.84, 0.5 + 0.5 * cos(2.0 * theta + (spiralTwist * 0.72) * logR + infall * 0.85 - time * 0.48 + 1.4));
  float s2Conc = smoothstep(0.40, 0.80, 0.5 + 0.5 * cos(logR * 17.5 + infall * 1.4));
  float s2Lane = mix(max(s2Conc * 0.88, s2ArmA * 0.84), max(s2ArmA, s2ArmB * 0.88), polarF);
  float s2DashA = smoothstep(0.20, 0.62, 0.5 + 0.5 * cos(3.0 * theta - 4.4 * logR - time * 1.18 + 0.6));
  float s2DashB = smoothstep(0.26, 0.68, 0.5 + 0.5 * cos(5.0 * theta + 3.1 * logR - time * 0.94));
  float s2Env = smoothstep(1.06, 1.24, r) * (1.0 - smoothstep(outerR * 0.52, outerR * 0.94, r));
  float s2Val = s2Lane * max(s2DashA, s2DashB * 0.88) * s2Env;

  // ---- Stratum 3: Wide Sweeping Outer Violet Arcs ----
  float s3Arm = smoothstep(0.46, 0.86, 0.5 + 0.5 * cos(2.0 * theta + (spiralTwist * 0.58) * logR + infall * 0.65 - time * 0.34 + 2.5));
  float s3Conc = smoothstep(0.46, 0.84, 0.5 + 0.5 * cos(logR * 11.0 + infall * 0.9));
  float s3Lane = mix(max(s3Conc * 0.78, s3Arm * 0.72), s3Arm, polarF);
  float s3Dash = smoothstep(0.34, 0.76, 0.5 + 0.5 * cos(2.0 * theta - 2.6 * logR - time * 0.52));
  float s3Env = smoothstep(1.55, 2.25, r) * outerEnv;
  float s3Val = s3Lane * (0.25 + 0.75 * s3Dash) * s3Env;

  float baseBed = exp(-(r - 1.05) * mix(1.45, 0.88, polarF)) * innerEnv * outerEnv * 0.30;

  float sparkWave = smoothstep(0.84, 0.97, 0.5 + 0.5 * cos(5.0 * theta + (spiralTwist * 1.1) * logR - time * 2.1));
  float iceSpark = sparkWave * s1Env * (0.38 + 0.32 * polarF);

  float doppler = 1.0 + dopplerBias * (1.0 - polarF) * 0.24 * cos(theta - 0.55);

  float energy = (baseBed + s1Val * 0.95 + s2Val * 0.78 + s3Val * 0.46) * doppler * uDiskBirth;
  energy *= (1.0 + uCharge * 0.65);

  vec3 col = mix(C_SPACE, C_DEEP_PURPLE, smoothstep(0.05, 0.26, energy));
  col = mix(col, C_ACCENT, smoothstep(0.22, 0.50, energy));
  col = mix(col, C_PERIWINKLE, smoothstep(0.44, 0.78, energy));
  col = mix(col, C_WHITE_CORE, smoothstep(0.74, 1.12, energy));

  col = mix(col, mix(C_DEEP_PURPLE, C_ACCENT, 0.55), rNorm * 0.34 * (1.0 - s1Val));
  col = mix(col, mix(C_ICE_BLUE, C_WHITE_CORE, 0.35), clamp(iceSpark * 0.78, 0.0, 0.78));

  float alpha = clamp(energy * 1.18, 0.0, 1.0) * innerEnv * outerEnv;
  return vec4(col * clamp(energy * 1.25, 0.0, 1.45), alpha);
}

/**
 * Evaluate closed-form 3D relativistic helical & streaked polar jets along +/- y axis.
 * Punches out during late core collapse, blazes around the newborn black hole, then recedes cleanly.
 */
vec4 evalPolarJets(vec3 ro, vec3 rd, float tSphere, float coreShadow, float jetPower, float time) {
  if (jetPower <= 0.004) return vec4(0.0);

  float a = dot(rd.xz, rd.xz);
  if (a < 1e-5) return vec4(0.0);

  float tAxis = -dot(ro.xz, rd.xz) / a;
  if (tAxis <= 0.0) return vec4(0.0);

  float occ = (coreShadow > 0.5 && tAxis > tSphere) ? (1.0 - coreShadow) : 1.0;
  if (occ <= 0.01) return vec4(0.0);

  vec3 pAxis = ro + tAxis * rd;
  float s = pAxis.y;
  float absS = abs(s);
  float minAxial = mix(0.24, 0.84, uBhBirth);
  if (absS < minAxial || absS > 8.2) return vec4(0.0);

  float dPerp = length(pAxis.xz);

  float w = 0.095 + 0.064 * pow(max(absS - minAxial, 0.0), 1.14);
  if (dPerp > w * 2.6) return vec4(0.0);

  float axialEnv = smoothstep(minAxial, minAxial + 0.34, absS) * (1.0 - smoothstep(4.4, 8.0, absS));

  vec2 perpDir = normalize(vec2(-rd.z, rd.x) + vec2(1e-5));
  float signedX = dot(pAxis.xz, perpDir);

  float coreBeam = exp(-pow(dPerp / (w * 0.56), 2.0));

  float helixPhaseA = absS * 3.55 - time * 5.4;
  float helixPhaseB = absS * 3.55 - time * 5.4 + PI;
  float hA = w * 0.86 * sin(helixPhaseA);
  float hB = w * 0.86 * sin(helixPhaseB);
  float ribW = max(0.032, w * 0.24);
  float ribbonA = exp(-pow((signedX - hA) / ribW, 2.0)) * (0.55 + 0.45 * cos(helixPhaseA));
  float ribbonB = exp(-pow((signedX - hB) / ribW, 2.0)) * (0.55 + 0.45 * cos(helixPhaseB));
  float helices = clamp(ribbonA + ribbonB, 0.0, 1.35) * smoothstep(w * 1.9, w * 0.4, dPerp);

  float laneId = floor((signedX / max(w, 0.05)) * 2.5 + 3.0);
  float laneSeed = hash11(laneId + (s > 0.0 ? 11.3 : 29.7));
  float streak = smoothstep(0.45, 0.88, 0.5 + 0.5 * sin(absS * 5.2 - time * (8.5 + laneSeed * 4.0) + laneSeed * TWO_PI));
  float streakMask = streak * exp(-pow(dPerp / (w * 0.95), 2.0));

  float outerSheath = exp(-pow(dPerp / (w * 1.65), 2.0)) * 0.32;

  float total = (coreBeam * 0.72 + helices * 0.78 + streakMask * 0.52 + outerSheath) * axialEnv * jetPower * occ;
  total *= (1.0 + uCharge * 0.55);

  vec3 jetCol = mix(C_ACCENT, C_ICE_BLUE, smoothstep(0.08, 0.48, coreBeam + helices + streakMask * 0.6));
  jetCol = mix(jetCol, C_WHITE_CORE, smoothstep(0.62, 1.25, coreBeam * 0.9 + helices * 0.55 + uCharge * 0.35));

  return vec4(jetCol * total, clamp(total * 0.92, 0.0, 1.0));
}

void main() {
  // Subtle GPU pointer proximity lensing ripple along the settled accretion rim
  vec2 ptrDelta = vUv - uPointer;
  ptrDelta.x *= uViewAsp;
  float ptrDist = length(ptrDelta);
  float ptrRipple = exp(-pow(ptrDist * 4.4, 2.0)) * uPointerActive * uSettle;

  // Build exact 3D perspective camera ray
  vec2 ndc = vUv * 2.0 - 1.0;
  vec2 ndcDeflected = ndc - (vUv - uPointer) * (0.018 * ptrRipple);
  vec3 rd = normalize(
    uCamFwd +
    ndcDeflected.x * uViewAsp * uTanHalfFov * uCamRight +
    ndcDeflected.y * uTanHalfFov * uCamUp
  );
  vec3 ro = uCamPos;

  // Exact world-origin ray impact parameter b
  float tc = -dot(ro, rd);
  vec3 closestPt = ro + max(tc, 0.0) * rd;
  float b = length(closestPt);
  float pixelAA = max(0.006, (2.2 * uTanHalfFov / max(uSceneH, 64.0)) * max(tc, 1.0));

  // ---- 1) Exact 3D #000000 Event Horizon Shadow Sphere (Punches open ONLY after core bounce) ----
  float effectiveRh = mix(0.30, R_H, smoothstep(0.0, 0.85, uBhBirth));
  float coreShadow = (uBhBirth > 0.002 && tc > 0.0)
    ? (1.0 - smoothstep(effectiveRh - pixelAA, effectiveRh + pixelAA, b)) * smoothstep(0.0, 0.25, uBhBirth)
    : 0.0;
  float tSphere = (uBhBirth > 0.002 && b < effectiveRh && tc > 0.0)
    ? (tc - sqrt(max(0.0, effectiveRh * effectiveRh - b * b)))
    : 1e9;

  vec3 accumCol = vec3(0.0);
  float accumAlpha = 0.0;

  // ---- 1b) Act I & II: Dying Supergiant Star + Gravitational Implosion Streams ----
  if (uStarVis > 0.002) {
    vec4 star = evalDyingStar(ro, rd, closestPt, b, tc, pixelAA);
    accumCol += star.rgb;
    accumAlpha = max(accumAlpha, star.a);
  }
  if (uImplode > 0.002) {
    vec4 imp = evalImplosionStreams(closestPt, b, tc);
    accumCol += imp.rgb;
    accumAlpha = max(accumAlpha, imp.a);
  }

  // ---- 2) Analytic Gravitational Lensing + Front/Rear Equatorial Disk (Post-Supernova Birth) ----
  float horizonClose = (1.0 - uPolarFactor) * uSettle;
  float horizonBound = mix(1.0, 1.0 - smoothstep(1.20, 1.46, b), horizonClose);
  float lensedWeight = 1.0 - smoothstep(0.28, 0.78, uPolarFactor);

  // 2a) Gravitationally bent rear disk (Einstein upper & lower arches)
  if (uDiskBirth > 0.002 && b > effectiveRh - pixelAA && tc > 0.0 && lensedWeight > 0.002 && horizonBound > 0.002) {
    float u_b = max(b - 0.58 * effectiveRh, 0.032);
    float deflect = min(2.36, 1.14 / pow(u_b, 1.18));
    vec3 e_r = closestPt / max(b, 1e-4);
    vec3 rdBent = normalize(cos(deflect) * rd - sin(deflect) * e_r);

    if (abs(rdBent.y) > 1e-4) {
      float tRear = -closestPt.y / rdBent.y;
      if (tRear > 0.0) {
        vec3 hitRear = closestPt + tRear * rdBent;
        vec4 rearDisk = evalDisk(hitRear.xz, uDiskOuterR, uPolarFactor, uTime, 1.0);
        float archBoost = 1.0 + 0.34 * exp(-max(b - effectiveRh, 0.0) * 3.6);
        float vis = (1.0 - coreShadow) * lensedWeight * horizonBound;
        accumCol += rearDisk.rgb * archBoost * vis;
        accumAlpha = max(accumAlpha, rearDisk.a * vis);
      }
    }
  }

  // 2b) Relativistic photon ring + layered Kurzgesagt horizon corona + Post-Resolve Lock-In Pulse
  if (uBhBirth > 0.002 && tc > 0.0) {
    float distOut = b - effectiveRh;
    float ringAng = atan(closestPt.y, closestPt.x);
    float ringShimmer = 0.70 + 0.30 * sin(ringAng * 3.0 - uTime * 1.45) * cos(ringAng * 2.0 + uTime * 0.85);
    float ringStream = 0.5 + 0.5 * cos(ringAng * 6.0 - distOut * 34.0 - uTime * 1.9);

    float photonWidth = mix(mix(26.0, 31.0, uPin), 24.0, uPolarFactor);
    float photonRing = exp(-pow((distOut - 0.016) * photonWidth, 2.0)) * (1.0 - coreShadow);

    float horizonArc = exp(-max(distOut, 0.0) * mix(9.2, 11.2, uPin))
      * smoothstep(-0.006, 0.018, distOut) * (1.0 - coreShadow) * horizonClose;
    float arcStripes = 0.62 + 0.38 * smoothstep(0.28, 0.78, ringStream);

    float innerHalo = exp(-max(distOut, 0.0) * mix(mix(7.8, 9.6, uPin), 6.2, uPolarFactor))
      * smoothstep(-0.01, 0.02, distOut) * (1.0 - coreShadow);

    // Subtle #97DFFC lock-in shimmer ripple radiating outward from the settled bottom photon rim at 9.00s
    float lockR = mix(0.015, 0.24, uLockWaveProg);
    float lockWave = exp(-pow((distOut - lockR) * 26.0, 2.0)) * (1.0 - coreShadow) * uLockPulse * horizonClose;

    float ptrLift = 1.0 + ptrRipple * 0.45;
    float birthGlow = uBhBirth * (1.0 + (1.0 - uBhBirth) * 0.75);
    vec3 photonCol = mix(C_PERIWINKLE, C_WHITE_CORE, 0.64 + 0.24 * ringShimmer);
    photonCol = mix(photonCol, C_ICE_BLUE, clamp(ptrRipple * 0.55 + (1.0 - uBhBirth) * 0.65 + uLockPulse * 0.55 + 0.16 * ringShimmer, 0.0, 0.85));
    vec3 arcCol = mix(C_ACCENT, C_PERIWINKLE, smoothstep(0.25, 0.85, arcStripes * ringShimmer));
    arcCol = mix(arcCol, C_WHITE_CORE, smoothstep(0.06, 0.01, distOut) * 0.65);
    vec3 haloCol = mix(C_DEEP_PURPLE, C_ACCENT, 0.55 + 0.28 * ringShimmer);

    float photonBoost = mix(1.0, 1.24, horizonClose);
    accumCol += photonCol * photonRing * (0.90 + 0.30 * ringShimmer) * photonBoost * ptrLift * birthGlow;
    accumCol += arcCol * horizonArc * arcStripes * 0.86 * ptrLift * uBhBirth;
    accumCol += haloCol * innerHalo * (0.34 + 0.16 * ringShimmer) * ptrLift * uBhBirth;
    accumCol += mix(C_ICE_BLUE, C_WHITE_CORE, 0.45) * lockWave * 0.72;
    accumAlpha = max(accumAlpha, clamp((photonRing * 0.98 + horizonArc * 0.82 + innerHalo * 0.52) * uBhBirth + lockWave * 0.65, 0.0, 1.0));
  }

  // 2c) Direct equatorial disk (near half in tilted views, full 360 deg vortex at polar plateau)
  float frontCoversShadow = 0.0;
  if (uDiskBirth > 0.002 && abs(rd.y) > 1e-4) {
    float tFront = -ro.y / rd.y;
    float maxT = tc + mix(0.04, 18.0, smoothstep(0.20, 0.72, uPolarFactor));
    if (tFront > 0.0 && tFront < tSphere && tFront <= maxT) {
      vec3 hitFront = ro + tFront * rd;
      vec2 diskXZ = hitFront.xz * mix(1.0, 0.955, uPolarFactor);
      vec4 frontDisk = evalDisk(diskXZ, uDiskOuterR, uPolarFactor, uTime, 1.0);
      float diskGate = horizonBound;
      if (frontDisk.a * diskGate > 0.002) {
        float frontCov = clamp(frontDisk.a * 1.18 * diskGate, 0.0, 1.0);
        accumCol = mix(accumCol, frontDisk.rgb * diskGate, frontCov) + frontDisk.rgb * (0.18 * diskGate);
        accumAlpha = max(accumAlpha, frontCov);
        frontCoversShadow = frontCov * (1.0 - smoothstep(0.25, 0.65, uPolarFactor));
      }
    }
  }

  // 2d) 3D Helical & Streaked Polar Jets along +/- y (breakout during collapse -> newborn BH)
  vec4 jets = evalPolarJets(ro, rd, tSphere, coreShadow, uJetPower, uTime);
  accumCol += jets.rgb;
  accumAlpha = max(accumAlpha, jets.a);

  // 2e) Act III -> early Act IV: Expanding 3D Filamentary Supernova Ejecta Shell & Nebula Wisps
  if (uEjecta > 0.002) {
    vec4 ej = evalSupernovaEjecta(closestPt, b, tc);
    float ejVis = 1.0 - coreShadow * smoothstep(0.25, 0.85, uBhBirth);
    accumCol += ej.rgb * ejVis;
    accumAlpha = max(accumAlpha, ej.a * ejVis);
  }

  // Enforce true pure #000000 inside the uncovered event horizon shadow
  float pureCoreLock = coreShadow * (1.0 - frontCoversShadow);
  accumCol *= (1.0 - pureCoreLock);

  // ---- 3) Supernova Core Detonation Flash: Pure White Core + Un-Clipped Electric #97DFFC & Violet Shockfront ----
  if (uCharge > 0.001 || uBlastPeak > 0.001) {
    vec2 blastPos = (vUv - vec2(0.5, 0.5)) * vec2(uViewAsp * 0.68, 1.0);
    float blastR = length(blastPos);
    float blastAng = atan(blastPos.y, blastPos.x);

    // Pre-detonation pinch-point singularity ignition
    if (uCharge > 0.001) {
      float coreSpark = exp(-pow(blastR * 5.2, 2.0)) * uCharge;
      float flareH = exp(-abs(blastPos.y) * 32.0) * exp(-abs(blastPos.x) * 4.4) * uCharge * 0.68;
      vec3 chargeLight = mix(C_ICE_BLUE, vec3(1.0), 0.68);
      accumCol += chargeLight * (coreSpark * 1.35 + flareH);
      accumAlpha = max(accumAlpha, clamp(coreSpark + flareH, 0.0, 1.0));
    }

    if (uBlastPeak > 0.001) {
      // Sculpted radial luminance profile: blinding pure white behind T^minus,
      // electric #97DFFC mid-ring & shockfront, deep #613DC1 / #2C0735 Galaxy violet at viewport corners
      float coreWhite = exp(-pow(blastR * 2.15, 2.0));
      float midHalo = exp(-pow(blastR * 1.18, 2.0));

      float rShock = mix(0.18, 0.96, uBlastProgress);
      float shockRing = exp(-pow((blastR - rShock) * 9.5, 2.0));

      float raysA = pow(0.5 + 0.5 * cos(blastAng * 8.0 - uTime * 2.0), 3.4);
      float raysB = pow(0.5 + 0.5 * cos(blastAng * 14.0 + uTime * 1.5 + 0.7), 4.4);
      float radialRays = (raysA * 0.62 + raysB * 0.40) * exp(-blastR * 1.25);

      vec3 outerViolet = mix(C_SPACE, C_DEEP_PURPLE, smoothstep(0.05, 0.55, midHalo + radialRays * 0.55));
      vec3 midIceViolet = mix(C_ACCENT, C_ICE_BLUE, smoothstep(0.18, 0.75, midHalo * 0.85 + shockRing * 0.65));
      vec3 brightIceRing = mix(C_ICE_BLUE, vec3(0.88, 0.97, 1.0), 0.38);

      vec3 blastCol = mix(outerViolet, midIceViolet, smoothstep(0.12, 0.66, midHalo + radialRays * 0.45));
      blastCol = mix(blastCol, brightIceRing, clamp(shockRing * 0.86 + radialRays * 0.44 * (1.0 - coreWhite), 0.0, 0.90));
      blastCol = mix(blastCol, vec3(1.0, 1.0, 1.0), smoothstep(0.24, 0.76, coreWhite * 1.12 + midHalo * 0.18));

      float blastMix = clamp(uBlastPeak * (0.28 + 0.72 * midHalo + 0.42 * shockRing + 0.24 * radialRays), 0.0, 0.98);
      float centerPunch = 1.0 - coreShadow * smoothstep(0.18, 0.72, uBhBirth) * (1.0 - smoothstep(0.55, 0.88, uBlastPeak));
      accumCol = mix(accumCol, blastCol, blastMix * centerPunch);
      accumAlpha = max(accumAlpha, clamp(uBlastPeak * 0.98, 0.0, 1.0));
      pureCoreLock *= (1.0 - smoothstep(0.12, 0.55, uBlastPeak) * centerPunch);
    }
  }

  // During intro (settle < 0.55), keep sky grounded in #040206 obsidian; once settled, open space is alpha = 0.0
  float introSkyOpaque = 1.0 - smoothstep(0.14, 0.56, uSettle);
  accumCol = max(accumCol, C_OBSIDIAN * introSkyOpaque * (1.0 - pureCoreLock));

  float plasmaLum = dot(accumCol, vec3(0.2126, 0.7152, 0.0722));
  float settledPlasmaAlpha = smoothstep(0.025, 0.32, plasmaLum) * smoothstep(0.01, 0.22, accumAlpha);
  float finalAlpha = clamp(max(max(pureCoreLock, settledPlasmaAlpha), introSkyOpaque), 0.0, 1.0);

  o = vec4(clamp(accumCol, 0.0, 1.0), finalAlpha);
}`;

/** Pass 2: Anti-aliased 4-tap cell downsample onto the high-density ASCII grid */
const FS_CELL = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 o;
uniform sampler2D uBg;
uniform vec2 uBgInv;
void main() {
  vec2 d = uBgInv * 0.72;
  vec4 a = texture(uBg, vUv + vec2(-d.x, -d.y));
  vec4 b = texture(uBg, vUv + vec2( d.x, -d.y));
  vec4 c = texture(uBg, vUv + vec2(-d.x,  d.y));
  vec4 e = texture(uBg, vUv + vec2( d.x,  d.y));
  o = (a + b + c + e) * 0.25;
}`;

/**
 * Pass 3: True Native WebGL2 ASCII Fragment Shader
 * - Strictly uses ` ^-t+=T*` (zero `.`, zero `:`, zero `·`).
 * - Preserves warm-white 1B star corona hues in Act I, shifting seamlessly into T^minus Galaxy hues.
 * - Pure `#000000` black (`alpha = 1.0`) locked inside the event horizon core.
 * - Pure-ASCII `T^minus` supernova reveal:
 *   * ZERO flat dark-gray fill
 *   * 100% cell-quantized 4-tap sub-cell coverage
 *   * Core strokes: predominantly crisp dark `#000000`/`#040206` `T` glyphs (~75% `T` + subtle `*`/`=`)
 *   * Edges/serifs: lighter density-feathered `t`, `+`, `-`, `^` glyphs in deep obsidian-violet
 */
const FS_GLYPH = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 o;

uniform sampler2D uCell;
uniform sampler2D uBg;
uniform sampler2D uAtlas;
uniform sampler2D uWordmarkMask;
uniform vec2  uGrid;
uniform float uGlyphCount;
uniform float uWordmarkCarve;   // 0..1 pure-ASCII T^minus reveal during peak supernova
uniform float uBlastPeak;       // 0..1 white/ice supernova light window
uniform float uWarmTint;        // 1 during 1B warm-white Act I star, 0 on collapse & settled BH
uniform float uSettle;
uniform float uTime;
uniform vec2  uPointer;
uniform float uPointerActive;
uniform float uViewAsp;

const vec3 C_OBSIDIAN    = vec3(0.0157, 0.0078, 0.0235); // #040206
const vec3 C_DEEP_VOID   = vec3(0.0745, 0.0078, 0.1137); // #13021D
const vec3 C_ACCENT      = vec3(0.3804, 0.2392, 0.7569); // #613DC1
const vec3 C_ICE_BLUE    = vec3(0.5922, 0.8745, 0.9882); // #97DFFC
const vec3 C_WARM_CORONA = vec3(0.8471, 0.6549, 0.4549); // #D8A774 warm 1B star fringe

float cellHash(ivec2 c) {
  vec2 p = fract(vec2(c) * vec2(0.1031, 0.1030));
  p += dot(p, p.yx + 33.33);
  return fract((p.x + p.y) * p.x);
}

void main() {
  vec2 g = vUv * uGrid;
  ivec2 cellCoord = ivec2(clamp(floor(g), vec2(0.0), uGrid - 1.0));
  vec2 cellUv = (vec2(cellCoord) + 0.5) / uGrid;
  vec2 f = fract(g);
  vec2 paddedF = clamp(f, vec2(0.03), vec2(0.97));

  vec4 cell = texelFetch(uCell, cellCoord, 0);
  vec4 bgTex = texture(uBg, vUv);

  float cellLum = dot(cell.rgb, vec3(0.2126, 0.7152, 0.0722));
  float bgLum = dot(bgTex.rgb, vec3(0.2126, 0.7152, 0.0722));
  float energy = clamp(cellLum * 1.08, 0.0, 0.9999);

  vec2 ptrD = cellUv - uPointer;
  ptrD.x *= uViewAsp;
  float ptrBoost = exp(-pow(length(ptrD) * 4.5, 2.0)) * uPointerActive * uSettle * smoothstep(0.06, 0.25, energy);
  float shapedEnergy = clamp(energy + ptrBoost * 0.15, 0.0, 0.9999);

  float idx = floor(shapedEnergy * uGlyphCount);
  float atlasRow = 0.0;

  // ---- Cell-Quantized Pure-ASCII T^minus Wordmark (Skipped when uWordmarkCarve == 0) ----
  float wmCov = 0.0;
  float wmHalo = 0.0;
  float wmCaret = 0.0;
  bool isWordmarkCell = false;

  if (uWordmarkCarve > 0.001) {
    vec2 subOff = 0.24 / uGrid;
    vec3 s0 = texture(uWordmarkMask, cellUv + vec2(-subOff.x, -subOff.y)).rgb;
    vec3 s1 = texture(uWordmarkMask, cellUv + vec2( subOff.x, -subOff.y)).rgb;
    vec3 s2 = texture(uWordmarkMask, cellUv + vec2(-subOff.x,  subOff.y)).rgb;
    vec3 s3 = texture(uWordmarkMask, cellUv + vec2( subOff.x,  subOff.y)).rgb;
    vec3 wmAvg = (s0 + s1 + s2 + s3) * 0.25;

    wmCov = wmAvg.r * uWordmarkCarve;
    wmHalo = wmAvg.g * uWordmarkCarve;
    wmCaret = wmAvg.b * uWordmarkCarve;

    if (wmCov >= 0.22) {
      isWordmarkCell = true;
      atlasRow = 1.0;

      float h = cellHash(cellCoord);
      float radDist = length((cellUv - vec2(0.5)) * vec2(uViewAsp, 1.0));
      float wave = fract(h + radDist * 1.6 - uTime * 2.4);

      if (wmCov >= 0.50) {
        if (wave < 0.75) {
          idx = 6.0; // 'T'
        } else if (wave < 0.89) {
          idx = 7.0; // '*'
        } else {
          idx = 5.0; // '='
        }
      } else {
        float edgeNorm = clamp((wmCov - 0.22) / 0.28, 0.0, 0.999);
        if (edgeNorm < 0.28) {
          idx = 1.0; // '^'
        } else if (edgeNorm < 0.54) {
          idx = 2.0; // '-'
        } else if (edgeNorm < 0.78) {
          idx = 4.0; // '+'
        } else {
          idx = 3.0; // 't'
        }
      }
    }
  }

  vec2 tileSize = vec2(uGlyphCount, 2.0);
  vec2 atlasUv = vec2(
    (idx + paddedF.x) / uGlyphCount,
    (atlasRow + (1.0 - paddedF.y)) * 0.5
  );
  float rawCov = textureGrad(
    uAtlas,
    atlasUv,
    dFdx(g) / tileSize,
    dFdy(g) / tileSize
  ).r;
  float cov = isWordmarkCell
    ? smoothstep(0.10, 0.44, rawCov)
    : smoothstep(0.16, 0.60, rawCov);

  float alpha = bgTex.a;
  float introOpaque = 1.0 - smoothstep(0.14, 0.56, uSettle);

  float isPureCore = smoothstep(0.90, 0.99, alpha)
    * (1.0 - smoothstep(0.002, 0.010, bgLum))
    * (1.0 - smoothstep(0.10, 0.45, uBlastPeak));

  float backWeight = mix(mix(0.42, 0.46, uSettle), 0.90, uBlastPeak);
  vec3 baseBack = bgTex.rgb * backWeight;

  float glyphGate = smoothstep(0.025, 0.12, shapedEnergy) * (1.0 - isPureCore);
  vec3 dimBaseColor = mix(C_ACCENT * 1.08, C_WARM_CORONA, uWarmTint);
  vec3 glyphColor = mix(
    dimBaseColor,
    cell.rgb * mix(1.32, 1.56, shapedEnergy),
    smoothstep(0.05, 0.28, shapedEnergy)
  );
  vec3 blastGlyphCol = mix(C_ICE_BLUE, vec3(0.95, 0.99, 1.0), smoothstep(0.68, 0.96, cellLum));
  glyphColor = mix(glyphColor, blastGlyphCol, uBlastPeak * 0.78);

  vec3 sceneCol = baseBack + glyphColor * cov * glyphGate * mix(1.0, 0.94, uSettle) * (1.0 - uBlastPeak * 0.78);

  sceneCol *= (1.0 - isPureCore);

  // ---- Pure-ASCII T^minus Composition (ZERO flat dark-gray fill, 100% crisp dark glyphs on bright light) ----
  if (uWordmarkCarve > 0.001) {
    vec3 iceSheen = mix(vec3(1.0), C_ICE_BLUE, 0.36);
    sceneCol = mix(sceneCol, iceSheen, clamp(wmHalo * 0.28 * (1.0 - smoothstep(0.24, 0.52, wmCov)), 0.0, 0.32));

    if (isWordmarkCell) {
      vec3 edgeInk = mix(C_DEEP_VOID, C_OBSIDIAN, 0.62);
      vec3 coreInk = vec3(0.0, 0.0, 0.0);
      vec3 glyphInk = mix(edgeInk, coreInk, smoothstep(0.36, 0.60, wmCov));
      glyphInk = mix(glyphInk, C_DEEP_VOID * 1.1, wmCaret * 0.22 * (1.0 - smoothstep(0.48, 0.70, wmCov)));

      float strokeStrength = smoothstep(0.20, 0.46, wmCov);
      float glyphAlpha = clamp(cov * mix(0.84, 1.0, strokeStrength), 0.0, 1.0);
      sceneCol = mix(sceneCol, glyphInk, glyphAlpha);
    }
  }

  float outAlpha = clamp(max(alpha, introOpaque), 0.0, 1.0);
  float coronaGlyphAlpha = cov * smoothstep(0.10, 0.38, shapedEnergy) * smoothstep(0.02, 0.20, alpha) * (1.0 - isPureCore);
  outAlpha = clamp(max(outAlpha, coronaGlyphAlpha), 0.0, 1.0);

  o = vec4(clamp(sceneCol, 0.0, 1.0) * outAlpha, outAlpha);
}`;

/** Pass 4: Separable 5-tap linear-sampled Gaussian bloom thresholded above #040206 obsidian */
const FS_BLUR = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 o;
uniform sampler2D uTex;
uniform vec2 uDir;
uniform float uThreshold;

vec3 sampleTap(vec2 uv) {
  vec4 t = texture(uTex, uv);
  vec3 c = t.rgb;
  if (uThreshold > 0.001) {
    float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
    float keep = smoothstep(uThreshold, uThreshold + 0.18, l);
    return c * keep;
  }
  return c;
}

void main() {
  vec3 c = sampleTap(vUv) * 0.227027;
  c += (sampleTap(vUv + uDir * 1.384615) + sampleTap(vUv - uDir * 1.384615)) * 0.316216;
  c += (sampleTap(vUv + uDir * 3.230769) + sampleTap(vUv - uDir * 3.230769)) * 0.070270;
  o = vec4(c, 1.0);
}`;

/**
 * Pass 5: Final Premultiplied Alpha Composite
 * - Supports 2-tier bloom (desktop) and 1-tier bloom (mobile / adaptive budget).
 * - Samples uWordmarkMask strictly on quantized ASCII cell coordinates matching FS_GLYPH
 *   so there is ZERO stair-stepped per-pixel overhanging outline.
 */
const FS_COMP = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 o;
uniform sampler2D uBase;
uniform sampler2D uBloom1;
uniform sampler2D uBloom2;
uniform sampler2D uWordmarkMask;
uniform vec2  uGrid;
uniform float uUseBloom2;
uniform float uWordmarkCarve;
uniform float uGlow;

void main() {
  vec4 base = texture(uBase, vUv);
  vec3 b1 = texture(uBloom1, vUv).rgb;
  vec3 bloom = (uUseBloom2 > 0.5)
    ? (b1 * 0.58 + texture(uBloom2, vUv).rgb * 0.42)
    : b1;

  float bloomAtten = 1.0;
  if (uWordmarkCarve > 0.001) {
    vec2 cellUv = (floor(vUv * uGrid) + 0.5) / uGrid;
    vec2 subOff = 0.24 / uGrid;
    float wmCell = (
      texture(uWordmarkMask, cellUv + vec2(-subOff.x, -subOff.y)).r +
      texture(uWordmarkMask, cellUv + vec2( subOff.x, -subOff.y)).r +
      texture(uWordmarkMask, cellUv + vec2(-subOff.x,  subOff.y)).r +
      texture(uWordmarkMask, cellUv + vec2( subOff.x,  subOff.y)).r
    ) * 0.25 * uWordmarkCarve;
    bloomAtten = 1.0 - smoothstep(0.16, 0.30, wmCell) * 0.96;
  }

  float bloomAlphaGate = smoothstep(0.01, 0.14, base.a);
  vec3 col = base.rgb + bloom * uGlow * bloomAtten * mix(bloomAlphaGate, 1.0, 0.35);
  float finalA = clamp(max(base.a, dot(bloom * uGlow * bloomAtten, vec3(0.2126, 0.7152, 0.0722)) * 0.42 * bloomAlphaGate), 0.0, 1.0);
  o = vec4(clamp(col, 0.0, 1.0), finalA);
}`;

interface GLProgramBundle {
  prog: WebGLProgram;
  u: Record<string, WebGLUniformLocation | null>;
}

interface RenderTarget {
  tex: WebGLTexture;
  fb: WebGLFramebuffer;
  w: number;
  h: number;
}

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  src: string
): WebGLShader {
  const s = gl.createShader(type);
  if (!s) throw new Error("Unable to create shader");
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(s) || "unknown error";
    gl.deleteShader(s);
    throw new Error(`Shader compile error: ${log}`);
  }
  return s;
}

function linkProgram(
  gl: WebGL2RenderingContext,
  fsSrc: string
): GLProgramBundle {
  const vs = compileShader(gl, gl.VERTEX_SHADER, VS_QUAD);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSrc);
  const prog = gl.createProgram();
  if (!prog) throw new Error("Unable to create WebGL2 program");
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(prog) || "unknown error";
    gl.deleteProgram(prog);
    throw new Error(`Program link error: ${log}`);
  }
  gl.deleteShader(vs);
  gl.deleteShader(fs);

  const u: Record<string, WebGLUniformLocation | null> = {};
  const count = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS) as number;
  for (let i = 0; i < count; i++) {
    const info = gl.getActiveUniform(prog, i);
    if (info) {
      u[info.name] = gl.getUniformLocation(prog, info.name);
    }
  }
  return { prog, u };
}

function createRT(
  gl: WebGL2RenderingContext,
  w: number,
  h: number,
  filter: number
): RenderTarget {
  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA8,
    w,
    h,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    null
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const fb = gl.createFramebuffer()!;
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    tex,
    0
  );
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return { tex, fb, w, h };
}

function freeRT(gl: WebGL2RenderingContext, rt: RenderTarget | null) {
  if (!rt) return;
  gl.deleteFramebuffer(rt.fb);
  gl.deleteTexture(rt.tex);
}

/**
 * 2-row high-resolution WebGL2 glyph atlas strictly containing ` ^-t+=T*`:
 * - Row 0 (top): crisp `500` medium weight for the live 3D cosmic field
 * - Row 1 (bottom): bold `700` weight for the pure-ASCII `T^minus` explosion
 */
function buildGlyphAtlas(gl: WebGL2RenderingContext): WebGLTexture {
  const cellW = 72;
  const cellH = 96;
  const canvas = document.createElement("canvas");
  canvas.width = cellW * ASCII_RAMP.length;
  canvas.height = cellH * 2;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.font = `500 ${Math.round(cellH * 0.72)}px "Geist Mono", "SF Mono", ui-monospace, Menlo, monospace`;
  for (let i = 0; i < ASCII_RAMP.length; i++) {
    ctx.fillText(ASCII_RAMP[i], (i + 0.5) * cellW, cellH * 0.52);
  }

  ctx.font = `700 ${Math.round(cellH * 0.86)}px "Geist Mono", "SF Mono", ui-monospace, Menlo, monospace`;
  for (let i = 0; i < ASCII_RAMP.length; i++) {
    ctx.fillText(ASCII_RAMP[i], (i + 0.5) * cellW, cellH * 1.52);
  }

  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MIN_FILTER,
    gl.LINEAR_MIPMAP_LINEAR
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return tex;
}

function buildWordmarkMaskTexture(
  gl: WebGL2RenderingContext,
  existing: WebGLTexture | null,
  cssW: number,
  cssH: number
): WebGLTexture {
  const texW = Math.min(2048, Math.max(768, Math.round(cssW * 1.5)));
  const texH = Math.min(1280, Math.max(512, Math.round(cssH * 1.5)));
  const canvas = document.createElement("canvas");
  canvas.width = texW;
  canvas.height = texH;
  const ctx = canvas.getContext("2d")!;

  drawWordmarkMaskCanvas(ctx, texW, texH, cssW);

  const tex = existing ?? gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return tex;
}

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function easeInOutQuint(t: number): number {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
}

function mixNum(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function degToRad(d: number): number {
  return (d * Math.PI) / 180;
}

function rayImpactParam(
  camPos: Vec3,
  camRight: Vec3,
  camUp: Vec3,
  camFwd: Vec3,
  aspect: number,
  tanHalfFov: number,
  ndcX: number,
  ndcY: number
): number {
  const rx =
    camFwd.x +
    ndcX * aspect * tanHalfFov * camRight.x +
    ndcY * tanHalfFov * camUp.x;
  const ry =
    camFwd.y +
    ndcX * aspect * tanHalfFov * camRight.y +
    ndcY * tanHalfFov * camUp.y;
  const rz =
    camFwd.z +
    ndcX * aspect * tanHalfFov * camRight.z +
    ndcY * tanHalfFov * camUp.z;
  const invLen = 1 / Math.max(1e-6, Math.hypot(rx, ry, rz));
  const rdx = rx * invLen;
  const rdy = ry * invLen;
  const rdz = rz * invLen;
  const tc = -(camPos.x * rdx + camPos.y * rdy + camPos.z * rdz);
  if (tc <= 0) return 99;
  const cx = camPos.x + tc * rdx;
  const cy = camPos.y + tc * rdy;
  const cz = camPos.z + tc * rdz;
  return Math.hypot(cx, cy, cz);
}

function solveTopDomeRimY(
  camPos: Vec3,
  camRight: Vec3,
  camUp: Vec3,
  camFwd: Vec3,
  aspect: number,
  tanHalfFov: number,
  cssH: number,
  ndcX: number,
  targetR: number
): number {
  let hi = 1.0;
  let lo = -0.35;
  const bTop = rayImpactParam(
    camPos,
    camRight,
    camUp,
    camFwd,
    aspect,
    tanHalfFov,
    ndcX,
    hi
  );
  if (bTop >= targetR) {
    return 0;
  }
  for (let i = 0; i < 12; i++) {
    const mid = 0.5 * (lo + hi);
    const b = rayImpactParam(
      camPos,
      camRight,
      camUp,
      camFwd,
      aspect,
      tanHalfFov,
      ndcX,
      mid
    );
    if (b < targetR) {
      hi = mid;
    } else {
      lo = mid;
    }
  }
  const ndcRim = 0.5 * (lo + hi);
  return (0.5 - 0.5 * ndcRim) * cssH;
}

interface StarSpec {
  nx: number;
  ny: number;
  glyph: "*" | "+" | "^" | "-";
  phase: number;
  speed: number;
  size: number;
  tint: "periwinkle" | "accent" | "ice";
  crestDist: number;
}

function createStarfield(count: number): StarSpec[] {
  const glyphs: Array<"*" | "+" | "^" | "-"> = ["*", "+", "^", "-"];
  const stars: StarSpec[] = [];
  let s = 918273;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  for (let i = 0; i < count; i++) {
    const nx = rand();
    const ny = rand();
    const rTint = rand();
    const crestDist = Math.min(
      1,
      Math.hypot((nx - 0.5) * 1.15, ny - 0.78) / 0.95
    );
    stars.push({
      nx,
      ny,
      glyph: glyphs[Math.floor(rand() * glyphs.length)],
      phase: rand() * Math.PI * 2,
      speed: 0.45 + rand() * 0.95,
      size: 8.5 + rand() * 4.0,
      tint: rTint > 0.88 ? "ice" : rTint > 0.42 ? "periwinkle" : "accent",
      crestDist,
    });
  }
  return stars;
}

export function AsciiBlackholeCanvas({
  onHeroReveal,
  onHorizonSync,
  runwayRef,
  skipIntro = false,
}: AsciiBlackholeCanvasProps) {
  const starCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const glCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const onRevealRef = useRef(onHeroReveal);
  const onSyncRef = useRef(onHorizonSync);
  const runwayRefLatest = useRef(runwayRef);

  useEffect(() => {
    onRevealRef.current = onHeroReveal;
    onSyncRef.current = onHorizonSync;
    runwayRefLatest.current = runwayRef;
  }, [onHeroReveal, onHorizonSync, runwayRef]);

  useEffect(() => {
    const glCanvas = glCanvasRef.current;
    const starCanvas = starCanvasRef.current;
    if (!glCanvas || !starCanvas) return;

    let querySkipIntro = false;
    try {
      const qs = new URLSearchParams(window.location.search);
      querySkipIntro = qs.get("skipIntro") === "1";
    } catch {
      // ignore
    }

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startSettled = skipIntro || querySkipIntro || reducedMotion;

    let heroRevealed = startSettled;
    if (startSettled) {
      onRevealRef.current(true);
    }

    // ---- Layer 0: Obsidian Cosmic Starfield + Global Viewport Cursor Glyph Aura ----
    const starCtx = starCanvas.getContext("2d");
    const stars = createStarfield(108);

    // ---- Layer 30: Single Persistent WebGL2 Procedural 3D Cosmic Pipeline ----
    const gl = glCanvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      onRevealRef.current(true);
      return;
    }

    const pScene = linkProgram(gl, FS_SCENE);
    const pCell = linkProgram(gl, FS_CELL);
    const pGlyph = linkProgram(gl, FS_GLYPH);
    const pBlur = linkProgram(gl, FS_BLUR);
    const pComp = linkProgram(gl, FS_COMP);

    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);

    const atlasTex = buildGlyphAtlas(gl);

    let wordmarkTex: WebGLTexture | null = null;
    let lastMaskCssW = 0;
    let lastMaskCssH = 0;

    let cw = 0;
    let ch = 0;
    let cssWGlobal = 1440;
    let cssHGlobal = 900;
    let dprGlobal = 1.75;
    let cols = 160;
    let rows = 80;
    let adaptiveDegraded = false;
    let lastSceneScale = 0.5;
    let rtScene: RenderTarget | null = null;
    let rtCell: RenderTarget | null = null;
    let rtGlyph: RenderTarget | null = null;
    let rtB1A: RenderTarget | null = null;
    let rtB1B: RenderTarget | null = null;
    let rtB2A: RenderTarget | null = null;
    let rtB2B: RenderTarget | null = null;

    const syncBuffers = () => {
      const rect = glCanvas.getBoundingClientRect();
      const cssW = Math.max(1, Math.round(rect.width));
      const cssH = Math.max(1, Math.round(rect.height));
      const isMobile = cssW < 768;
      const dprCap = isMobile ? 1.5 : 1.75;
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const nw = Math.max(2, Math.round(cssW * dpr));
      const nh = Math.max(2, Math.round(cssH * dpr));

      cssWGlobal = cssW;
      cssHGlobal = cssH;
      dprGlobal = dpr;

      if (starCanvas.width !== nw || starCanvas.height !== nh) {
        starCanvas.width = nw;
        starCanvas.height = nh;
      }

      const cellCss = isMobile ? 4.2 : 5.0;
      const cellPx = Math.max(3, cellCss * dpr);
      const nCols = Math.max(48, Math.floor(nw / cellPx));
      const nRows = Math.max(28, Math.floor(nh / (cellPx * 1.72)));

      const sceneScale = adaptiveDegraded ? 0.38 : isMobile ? 0.45 : 0.5;

      if (
        Math.abs(cssW - lastMaskCssW) > 16 ||
        Math.abs(cssH - lastMaskCssH) > 16 ||
        !wordmarkTex
      ) {
        lastMaskCssW = cssW;
        lastMaskCssH = cssH;
        wordmarkTex = buildWordmarkMaskTexture(gl, wordmarkTex, cssW, cssH);
      }

      if (
        nw === cw &&
        nh === ch &&
        nCols === cols &&
        nRows === rows &&
        sceneScale === lastSceneScale &&
        rtScene
      ) {
        return;
      }

      cw = nw;
      ch = nh;
      cols = nCols;
      rows = nRows;
      lastSceneScale = sceneScale;
      glCanvas.width = cw;
      glCanvas.height = ch;

      freeRT(gl, rtScene);
      freeRT(gl, rtCell);
      freeRT(gl, rtGlyph);
      freeRT(gl, rtB1A);
      freeRT(gl, rtB1B);
      freeRT(gl, rtB2A);
      freeRT(gl, rtB2B);

      const bgW = Math.max(64, Math.round(cw * sceneScale));
      const bgH = Math.max(64, Math.round(ch * sceneScale));
      const b1W = Math.max(32, Math.round(cw * 0.25));
      const b1H = Math.max(32, Math.round(ch * 0.25));
      const b2W = Math.max(16, Math.round(cw * 0.125));
      const b2H = Math.max(16, Math.round(ch * 0.125));

      rtScene = createRT(gl, bgW, bgH, gl.LINEAR);
      rtCell = createRT(gl, cols, rows, gl.NEAREST);
      rtGlyph = createRT(gl, cw, ch, gl.LINEAR);
      rtB1A = createRT(gl, b1W, b1H, gl.LINEAR);
      rtB1B = createRT(gl, b1W, b1H, gl.LINEAR);
      rtB2A = createRT(gl, b2W, b2H, gl.LINEAR);
      rtB2B = createRT(gl, b2W, b2H, gl.LINEAR);
    };

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready
        .then(() => {
          if (cssWGlobal > 0 && cssHGlobal > 0) {
            wordmarkTex = buildWordmarkMaskTexture(
              gl,
              wordmarkTex,
              cssWGlobal,
              cssHGlobal
            );
          }
        })
        .catch(() => {});
    }

    const bindTex = (
      unit: number,
      tex: WebGLTexture,
      loc: WebGLUniformLocation | null
    ) => {
      if (!loc) return;
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.uniform1i(loc, unit);
    };

    const setTarget = (rt: RenderTarget | null) => {
      if (rt) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, rt.fb);
        gl.viewport(0, 0, rt.w, rt.h);
      } else {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, cw, ch);
      }
    };

    let pointerTargetX = 0.5;
    let pointerTargetY = 0.5;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let pointerActiveTarget = 0;
    let pointerActive = 0;

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || reducedMotion) return;
      pointerTargetX = clamp01(e.clientX / Math.max(1, window.innerWidth));
      pointerTargetY = clamp01(1 - e.clientY / Math.max(1, window.innerHeight));
      pointerActiveTarget = 1;
    };
    const handlePointerLeave = () => {
      pointerActiveTarget = 0;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, {
      passive: true,
    });

    let introElapsed = startSettled ? INTRO_TOTAL_SEC : 0.0;
    let resolveElapsed = startSettled ? 2.0 : 0.0;
    let smoothedPin = 0.0;
    let lastTs = performance.now();
    let lastBgDraw = 0;
    let rafId = 0;

    let dtEma = 0.0166;
    let overBudgetSec = 0;

    // Optional deterministic QA pin: ?introAt=1.0 | 3.35 | 4.45 | 5.85 | 8.2 | 9.25
    let pinnedIntroAt: number | null = null;
    try {
      const qs = new URLSearchParams(window.location.search);
      const rawPin = qs.get("introAt");
      if (rawPin !== null) {
        const parsed = Number(rawPin);
        if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 14) {
          pinnedIntroAt = parsed;
          introElapsed = Math.min(INTRO_TOTAL_SEC, parsed);
          resolveElapsed = Math.max(0, parsed - INTRO_TOTAL_SEC);
          if (parsed >= HERO_REVEAL_SEC) {
            heroRevealed = true;
            onRevealRef.current(true);
          }
        }
      }
    } catch {
      // ignore
    }

    const drawBackgroundField = (
      tSec: number,
      pin: number,
      settle: number,
      starWave: number
    ) => {
      if (!starCtx || cssWGlobal <= 1 || cssHGlobal <= 1) return;
      const dpr = dprGlobal;
      starCtx.setTransform(1, 0, 0, 1, 0, 0);
      starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);

      const glowY = cssHGlobal * mixNum(0.84, 0.14, pin) * dpr;
      const glowRad =
        Math.max(cssWGlobal, cssHGlobal) * mixNum(0.34, 0.22, pin) * dpr;
      const grad = starCtx.createRadialGradient(
        cssWGlobal * 0.5 * dpr,
        glowY,
        0,
        cssWGlobal * 0.5 * dpr,
        glowY,
        glowRad
      );
      grad.addColorStop(
        0,
        `rgba(78, 20, 140, ${(mixNum(0.11, 0.055, pin) * settle).toFixed(3)})`
      );
      grad.addColorStop(
        0.5,
        `rgba(44, 7, 53, ${(mixNum(0.04, 0.02, pin) * settle).toFixed(3)})`
      );
      grad.addColorStop(1, "rgba(4, 2, 6, 0)");
      starCtx.fillStyle = grad;
      starCtx.fillRect(0, 0, starCanvas.width, starCanvas.height);

      starCtx.textAlign = "center";
      starCtx.textBaseline = "middle";

      const ptrCssX = pointerX * cssWGlobal;
      const ptrCssY = (1 - pointerY) * cssHGlobal;

      // Sparse cosmic ASCII starfield (`* + ^ -`) rippling radially outward AFTER bottom resolve
      if (starWave > 0.005) {
        const calmBelowFold = mixNum(1.0, 0.65, pin);
        for (let i = 0; i < stars.length; i++) {
          const st = stars[i];
          const localAppear = smoothstep(
            st.crestDist * 0.55,
            st.crestDist * 0.55 + 0.42,
            starWave
          );
          if (localAppear <= 0.01) continue;

          const sx = Math.round(st.nx * cssWGlobal * dpr);
          const sy = Math.round(st.ny * cssHGlobal * dpr);
          const twinkle = 0.42 + 0.58 * Math.sin(tSec * st.speed + st.phase);
          const alpha = clamp01(
            (0.14 + 0.3 * twinkle) * calmBelowFold * localAppear
          );

          starCtx.font = `500 ${Math.round(st.size * dpr)}px "Geist Mono", "SF Mono", ui-monospace, Menlo, monospace`;
          starCtx.fillStyle =
            st.tint === "ice"
              ? "#97DFFC"
              : st.tint === "periwinkle"
                ? "#858AE3"
                : "#613DC1";
          starCtx.globalAlpha = alpha;
          starCtx.fillText(st.glyph, sx, sy);
        }
      }

      if (!reducedMotion && pointerActive > 0.01 && starWave > 0.45) {
        const cursorGlyphs = ["^", "-", "t", "+", "=", "T", "*"];
        const gridCss = 17;
        const radiusCss = 105;
        const minCol = Math.max(0, Math.floor((ptrCssX - radiusCss) / gridCss));
        const maxCol = Math.min(
          Math.ceil(cssWGlobal / gridCss),
          Math.ceil((ptrCssX + radiusCss) / gridCss)
        );
        const minRow = Math.max(0, Math.floor((ptrCssY - radiusCss) / gridCss));
        const maxRow = Math.min(
          Math.ceil(cssHGlobal / gridCss),
          Math.ceil((ptrCssY + radiusCss) / gridCss)
        );

        const fieldFade = smoothstep(0.45, 0.95, starWave) * pointerActive;

        for (let row = minRow; row <= maxRow; row++) {
          const cyCss = row * gridCss + gridCss * 0.5;
          const dy = cyCss - ptrCssY;
          if (Math.abs(dy) >= radiusCss) continue;

          for (let col = minCol; col <= maxCol; col++) {
            const cxCss = col * gridCss + gridCss * 0.5;
            const dx = cxCss - ptrCssX;
            const dist = Math.hypot(dx, dy);
            if (dist >= radiusCss) continue;

            const norm = 1 - dist / radiusCss;
            const falloff = Math.pow(norm, 1.85);
            const shimmer =
              0.76 + 0.24 * Math.sin(tSec * 2.4 + col * 0.65 + row * 0.48);
            const alpha = Math.min(0.28, falloff * shimmer * fieldFade * 0.32);
            if (alpha < 0.01) continue;

            const cellSeed = (col * 17 + row * 31) & 63;
            const cyclePos =
              tSec * 2.3 + cellSeed * 0.37 - (dist / radiusCss) * 2.2;
            const glyphIdx =
              ((Math.floor(cyclePos) % cursorGlyphs.length) +
                cursorGlyphs.length) %
              cursorGlyphs.length;
            const glyph = cursorGlyphs[glyphIdx];

            const fontPx = Math.round((8.5 + 2.5 * falloff * shimmer) * dpr);
            starCtx.font = `500 ${fontPx}px "Geist Mono", "SF Mono", ui-monospace, Menlo, monospace`;

            const glint = Math.sin(tSec * 3.1 + col * 1.13 + row * 0.87);
            starCtx.fillStyle =
              dist < 36 || (dist < 62 && glint > 0.65)
                ? "#97DFFC"
                : dist < 78
                  ? "#858AE3"
                  : "#613DC1";
            starCtx.globalAlpha = alpha;
            starCtx.fillText(
              glyph,
              Math.round(cxCss * dpr),
              Math.round(cyCss * dpr)
            );
          }
        }
      }

      starCtx.globalAlpha = 1;
    };

    const frame = (ts: number) => {
      rafId = window.requestAnimationFrame(frame);
      if (document.hidden) {
        lastTs = ts;
        return;
      }

      const rawDt = Math.max(0.001, (ts - lastTs) * 0.001);
      const dt = Math.min(0.05, rawDt);
      lastTs = ts;

      dtEma = dtEma * 0.935 + Math.min(rawDt, 0.1) * 0.065;
      if (!adaptiveDegraded && dtEma > 0.02) {
        overBudgetSec += dt;
        if (overBudgetSec > 1.5) {
          adaptiveDegraded = true;
        }
      } else {
        overBudgetSec = Math.max(0, overBudgetSec - dt * 0.5);
      }

      const pLerp = Math.min(1, dt * 8.5);
      pointerX += (pointerTargetX - pointerX) * pLerp;
      pointerY += (pointerTargetY - pointerY) * pLerp;
      pointerActive +=
        (pointerActiveTarget - pointerActive) * Math.min(1, dt * 5.2);

      let rawPin = 0;
      const runwayEl = runwayRefLatest.current?.current;
      if (runwayEl) {
        const rect = runwayEl.getBoundingClientRect();
        const scrollable = Math.max(1, rect.height - window.innerHeight);
        rawPin = clamp01(-rect.top / scrollable);
      } else {
        const fallbackSpan = Math.max(420, window.innerHeight * 2.0);
        rawPin = clamp01(window.scrollY / fallbackSpan);
      }

      smoothedPin += (rawPin - smoothedPin) * Math.min(1, dt * 12.0);
      if (Math.abs(rawPin - smoothedPin) < 0.0004) {
        smoothedPin = rawPin;
      }

      if (pinnedIntroAt !== null) {
        introElapsed = Math.min(INTRO_TOTAL_SEC, pinnedIntroAt);
        resolveElapsed = Math.max(0, pinnedIntroAt - INTRO_TOTAL_SEC);
      } else if (introElapsed < INTRO_TOTAL_SEC) {
        const scrollBoost = window.scrollY > 24 ? 5.8 : 1.0;
        introElapsed = Math.min(INTRO_TOTAL_SEC, introElapsed + dt * scrollBoost);
      } else {
        resolveElapsed = Math.min(10, resolveElapsed + dt);
      }

      // Strictly gate hero reveal until the black hole has FULLY resolved at the bottom of the screen
      const isResolvedNow =
        startSettled || introElapsed >= HERO_REVEAL_SEC - 0.001;
      if (!heroRevealed && isResolvedNow) {
        heroRevealed = true;
        onRevealRef.current(true);
      }

      syncBuffers();
      if (
        !rtScene ||
        !rtCell ||
        !rtGlyph ||
        !rtB1A ||
        !rtB1B ||
        !rtB2A ||
        !rtB2B
      ) {
        return;
      }

      const tSec = pinnedIntroAt !== null ? pinnedIntroAt : ts * 0.001;
      const isMobile = cssWGlobal < 768;
      const viewAsp = cw / Math.max(1, ch);
      const tanHalfFov = Math.tan(degToRad(23)); // 46 deg vertical FOV

      // =====================================================================
      // 1) ACT I -> V TIMING: SCULPTED 3D STAR -> IMPLOSION -> SUPERNOVA -> NEWBORN BH -> LOCK-IN
      // =====================================================================
      // Act I (0.00s -> 2.40s): 1B Warm-white dying supergiant (R = 1.32 in deep obsidian space)
      // Act II (2.40s -> 3.85s): Violent core collapse (R: 1.32 -> 0.14), infalling streams, polar jet breakout
      const starVis = 1.0 - smoothstep(3.68, 3.92, introElapsed);
      const tremble = smoothstep(1.25, 2.4, introElapsed);
      const collapseT = clamp01((introElapsed - 2.4) / (3.85 - 2.4));
      const collapseEase = Math.pow(collapseT, 2.2);
      const starRadius =
        mixNum(1.32, 0.14, collapseEase) +
        Math.sin(tSec * 14.0) * 0.028 * tremble * (1.0 - collapseEase);
      const starShift = clamp01(
        smoothstep(1.35, 2.45, introElapsed) * 0.22 +
          smoothstep(2.4, 3.65, introElapsed) * 0.78
      );
      const starCrack = clamp01(
        smoothstep(1.15, 2.45, introElapsed) * 0.52 +
          smoothstep(2.4, 3.58, introElapsed) * 0.48
      );
      const implode =
        smoothstep(2.25, 2.85, introElapsed) *
        (1.0 - smoothstep(3.76, 3.98, introElapsed));

      const charge =
        smoothstep(3.38, 3.82, introElapsed) *
        (1.0 - smoothstep(3.86, 4.12, introElapsed));

      // Act III (3.85s -> 5.65s): Core bounce supernova + 3D filamentary ejecta + pure-ASCII T^minus
      const blastPeak =
        smoothstep(3.8, 4.04, introElapsed) *
        (1.0 - smoothstep(4.84, 5.4, introElapsed));
      const blastProgress = clamp01((introElapsed - 3.8) / (5.55 - 3.8));
      const ejecta =
        smoothstep(3.8, 4.02, introElapsed) *
        (1.0 - smoothstep(5.35, 6.55, introElapsed));
      const ejectaProg = clamp01((introElapsed - 3.8) / (6.55 - 3.8));
      const wordmarkCarve =
        smoothstep(4.02, 4.2, introElapsed) *
        (1.0 - smoothstep(4.86, 5.2, introElapsed));

      // Singularity punch-through & fallback accretion disk spin-up (zero BH during Act I & II!)
      const bhBirth = smoothstep(4.65, 5.38, introElapsed);
      const diskBirth = smoothstep(4.72, 5.6, introElapsed);

      // Polar jets: absent in Act I -> break out during late collapse -> blaze on newborn BH -> recede
      const jetBreakout = smoothstep(3.32, 3.78, introElapsed);
      const jetFade = 1.0 - smoothstep(6.25, 7.45, introElapsed);
      const jetPower =
        jetBreakout * (1.0 + charge * 0.65 + blastPeak * 0.35) * jetFade;

      // Act IV (6.60s -> 9.00s): Unbroken 3D Camera Sweep -> Settled Bottom Horizon
      const settle = easeInOutQuint(clamp01((introElapsed - 6.6) / 2.4));

      // Act V (9.00s+): Subtle #97DFFC lock-in shimmer along settled bottom rim + starfield emergence
      const lockPulse =
        !startSettled && isResolvedNow
          ? smoothstep(0.0, 0.08, resolveElapsed) *
            (1.0 - smoothstep(0.16, 0.58, resolveElapsed))
          : 0.0;
      const lockWaveProg = clamp01(resolveElapsed / 0.58);
      const starWave = startSettled
        ? 1.0
        : isResolvedNow
          ? smoothstep(0.0, 0.95, resolveElapsed)
          : 0.0;

      const warmTint = starVis * (1.0 - smoothstep(0.18, 0.72, starShift));

      // =====================================================================
      // 2) UNBROKEN 3D ORBITAL CAMERA TRAJECTORY
      // =====================================================================
      const bottomApex = isMobile ? 0.225 : 0.255;
      const topApex = isMobile ? 0.155 : 0.152;

      const distBottom = isMobile ? 2.02 : 1.56;
      const alphaBottom = Math.asin(1 / distBottom);
      const topLimbAngleBottom = Math.atan(
        (-1 + 2 * bottomApex) * tanHalfFov
      );
      const pitchBottom = alphaBottom - topLimbAngleBottom;

      const distTop = isMobile ? 2.12 : 1.58;
      const alphaTop = Math.asin(1 / distTop);
      const botLimbAngleTop = Math.atan((1 - 2 * topApex) * tanHalfFov);
      const pitchTop = -(botLimbAngleTop + alphaTop);

      const targetPolarRadiusPx = isMobile
        ? Math.min(cssWGlobal * 0.355, cssHGlobal * 0.175)
        : Math.min(cssWGlobal * 0.165, cssHGlobal * 0.258);
      const polarTanAlpha =
        (targetPolarRadiusPx / (cssHGlobal * 0.5)) * tanHalfFov;
      const polarAlpha = Math.atan(Math.max(0.08, polarTanAlpha));
      const distPolarClamped = Math.max(
        3.9,
        Math.min(8.2, 1 / Math.sin(polarAlpha))
      );

      const s = smoothedPin;
      const segLift = smoothstep(0.0, 0.28, s);
      const segPlateau = clamp01((s - 0.28) / (0.66 - 0.28));
      const segDock = smoothstep(0.66, 1.0, s);

      const polarFactor =
        smoothstep(0.14, 0.3, s) * (1.0 - smoothstep(0.64, 0.84, s)) * settle;

      const scrollElevDeg = mixNum(26, 88, segLift) + (154 - 88) * segDock;
      const plateauDist = mixNum(
        distPolarClamped,
        distPolarClamped * 0.94,
        segPlateau
      );
      const scrollDist =
        segDock > 0
          ? mixNum(plateauDist, distTop, segDock)
          : mixNum(distBottom, plateauDist, segLift);

      const scrollPitch =
        segDock > 0
          ? mixNum(0, pitchTop, segDock)
          : mixNum(pitchBottom, 0, segLift);

      const scrollAzim =
        segLift * degToRad(12) +
        segPlateau * degToRad(42) +
        segDock * degToRad(16);

      const mobileScale = isMobile ? 1.24 : 1.0;
      const dAct1 = mixNum(7.6, 6.8, smoothstep(0.0, 2.4, introElapsed));
      const dAct2 = mixNum(dAct1, 7.25, smoothstep(2.4, 3.8, introElapsed));
      const introDist =
        mixNum(dAct2, 5.85, smoothstep(4.1, 6.55, introElapsed)) * mobileScale;
      const introElevDeg = mixNum(
        19.0,
        15.0,
        smoothstep(0.0, 6.55, introElapsed)
      );
      const introRoll = mixNum(
        degToRad(-22),
        degToRad(-18),
        smoothstep(0.0, 6.55, introElapsed)
      );

      const elevRad = degToRad(mixNum(introElevDeg, scrollElevDeg, settle));
      const camDist = mixNum(introDist, scrollDist, settle);
      const pitchOffset = mixNum(0, scrollPitch, settle);
      const bankRoll = mixNum(introRoll, 0, settle);
      const azimRad = mixNum(0, scrollAzim, settle);

      const sinE = Math.sin(elevRad);
      const cosE = Math.cos(elevRad);
      const sinA = Math.sin(azimRad);
      const cosA = Math.cos(azimRad);

      const rotY = (vx: number, vy: number, vz: number): Vec3 => ({
        x: vx * cosA + vz * sinA,
        y: vy,
        z: -vx * sinA + vz * cosA,
      });

      const camPos = rotY(0, camDist * sinE, camDist * cosE);
      const baseFwd = rotY(0, -sinE, -cosE);
      const baseUp = rotY(0, cosE, -sinE);
      const baseRight = rotY(1, 0, 0);

      const cosP = Math.cos(pitchOffset);
      const sinP = Math.sin(pitchOffset);
      const fwd0: Vec3 = {
        x: cosP * baseFwd.x + sinP * baseUp.x,
        y: cosP * baseFwd.y + sinP * baseUp.y,
        z: cosP * baseFwd.z + sinP * baseUp.z,
      };
      const up0: Vec3 = {
        x: -sinP * baseFwd.x + cosP * baseUp.x,
        y: -sinP * baseFwd.y + cosP * baseUp.y,
        z: -sinP * baseFwd.z + cosP * baseUp.z,
      };

      const cosR = Math.cos(bankRoll);
      const sinR = Math.sin(bankRoll);
      const camRight: Vec3 = {
        x: cosR * baseRight.x + sinR * up0.x,
        y: cosR * baseRight.y + sinR * up0.y,
        z: cosR * baseRight.z + sinR * up0.z,
      };
      const camUp: Vec3 = {
        x: -sinR * baseRight.x + cosR * up0.x,
        y: -sinR * baseRight.y + cosR * up0.y,
        z: -sinR * baseRight.z + cosR * up0.z,
      };
      const camFwd = fwd0;

      const horizonOuterR = Math.min(camDist * 0.78, isMobile ? 1.56 : 1.38);
      const settledOuterR = mixNum(horizonOuterR, 5.4, polarFactor);
      const diskOuterR = mixNum(5.2, settledOuterR, settle);

      // =====================================================================
      // 3) EXACT 3D-TO-DOM COUNTDOWN & LAYER 20 CURVED PRE-RIM VEIL SYNC
      // =====================================================================
      const bottomCountdownY = cssHGlobal * (1.0 - bottomApex * 0.48);
      const topCountdownY = isMobile ? 60 : 54;
      const polarCenterY = cssHGlobal * 0.5;
      const cdBaseY = mixNum(
        bottomCountdownY,
        topCountdownY,
        smoothstep(0.0, 1.0, s)
      );
      const countdownCenterY = mixNum(cdBaseY, polarCenterY, polarFactor);

      const baseCdScale = mixNum(
        1.0,
        isMobile ? 0.7 : 0.72,
        smoothstep(0.0, 1.0, s)
      );
      const midCdScale = isMobile ? 1.08 : 1.22;
      const countdownScale = mixNum(baseCdScale, midCdScale, polarFactor);

      let domeCenterX = cssWGlobal * 0.5;
      let domeCenterY = -cssHGlobal * 0.6;
      let domeRadiusPx = cssHGlobal * 0.75;
      let domeEdgeY = 48;

      if (s > 0.62 && settle > 0.5) {
        const rimCenterY = solveTopDomeRimY(
          camPos,
          camRight,
          camUp,
          camFwd,
          viewAsp,
          tanHalfFov,
          cssHGlobal,
          0.0,
          1.16
        );
        const edgeNdcX = 0.85;
        const rimEdgeY = solveTopDomeRimY(
          camPos,
          camRight,
          camUp,
          camFwd,
          viewAsp,
          tanHalfFov,
          cssHGlobal,
          edgeNdcX,
          1.16
        );
        const halfChordX = edgeNdcX * (cssWGlobal * 0.5);
        const sagitta = Math.max(8, rimCenterY - rimEdgeY);
        const radius =
          (halfChordX * halfChordX + sagitta * sagitta) / (2 * sagitta);
        domeCenterX = cssWGlobal * 0.5;
        domeRadiusPx = radius;
        domeCenterY = rimCenterY - radius;
        domeEdgeY = rimEdgeY;
      }

      onSyncRef.current?.({
        pinProgress: s,
        settleProgress: settle,
        heroResolved: isResolvedNow,
        countdownCenterY,
        countdownScale,
        domeCenterX,
        domeCenterY,
        domeRadiusPx,
        domeEdgeY,
        viewportW: cssWGlobal,
      });

      const useBloom2 = !isMobile && !adaptiveDegraded;
      if (typeof window !== "undefined") {
        (
          window as unknown as Record<string, unknown>
        ).__TMINUS_BH_TELEMETRY__ = {
          fps: Number((1 / Math.max(0.001, dtEma)).toFixed(1)),
          frameMs: Number((dtEma * 1000).toFixed(2)),
          bloomTiers: useBloom2 ? 2 : 1,
          degraded: adaptiveDegraded,
          cols,
          rows,
          dpr: dprGlobal,
          introElapsed: Number(introElapsed.toFixed(3)),
          resolveElapsed: Number(resolveElapsed.toFixed(3)),
          heroResolved: isResolvedNow,
          starRadius: Number(starRadius.toFixed(3)),
          bhBirth: Number(bhBirth.toFixed(3)),
          pinProgress: Number(s.toFixed(4)),
          polarFactor: Number(polarFactor.toFixed(4)),
          elevDeg: Number(((elevRad * 180) / Math.PI).toFixed(1)),
        };
      }

      if (ts - lastBgDraw > 32) {
        lastBgDraw = ts;
        drawBackgroundField(tSec, s, settle, starWave);
      }

      gl.disable(gl.BLEND);

      // ---- PASS 1: Analytic 3D Dying Star -> Implosion -> Supernova -> Black Hole ----
      setTarget(rtScene);
      gl.useProgram(pScene.prog);
      gl.uniform1f(pScene.u.uTime, tSec);
      gl.uniform1f(pScene.u.uViewAsp, viewAsp);
      gl.uniform1f(pScene.u.uSceneH, rtScene.h);
      gl.uniform1f(pScene.u.uTanHalfFov, tanHalfFov);
      gl.uniform3f(pScene.u.uCamPos, camPos.x, camPos.y, camPos.z);
      gl.uniform3f(pScene.u.uCamRight, camRight.x, camRight.y, camRight.z);
      gl.uniform3f(pScene.u.uCamUp, camUp.x, camUp.y, camUp.z);
      gl.uniform3f(pScene.u.uCamFwd, camFwd.x, camFwd.y, camFwd.z);
      gl.uniform1f(pScene.u.uStarVis, starVis);
      gl.uniform1f(pScene.u.uStarRadius, starRadius);
      gl.uniform1f(pScene.u.uStarShift, starShift);
      gl.uniform1f(pScene.u.uStarCrack, starCrack);
      gl.uniform1f(pScene.u.uImplode, implode);
      gl.uniform1f(pScene.u.uEjecta, ejecta);
      gl.uniform1f(pScene.u.uEjectaProg, ejectaProg);
      gl.uniform1f(pScene.u.uBhBirth, bhBirth);
      gl.uniform1f(pScene.u.uDiskBirth, diskBirth);
      gl.uniform1f(pScene.u.uLockPulse, lockPulse);
      gl.uniform1f(pScene.u.uLockWaveProg, lockWaveProg);
      gl.uniform1f(pScene.u.uSettle, settle);
      gl.uniform1f(pScene.u.uPin, segDock);
      gl.uniform1f(pScene.u.uPolarFactor, polarFactor);
      gl.uniform1f(pScene.u.uDiskOuterR, diskOuterR);
      gl.uniform1f(pScene.u.uJetPower, jetPower);
      gl.uniform1f(pScene.u.uCharge, charge);
      gl.uniform1f(pScene.u.uBlastPeak, blastPeak);
      gl.uniform1f(pScene.u.uBlastProgress, blastProgress);
      gl.uniform2f(pScene.u.uPointer, pointerX, pointerY);
      gl.uniform1f(pScene.u.uPointerActive, pointerActive);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // ---- PASS 2: 4-Tap AA Cell Downsample ----
      setTarget(rtCell);
      gl.useProgram(pCell.prog);
      bindTex(0, rtScene.tex, pCell.u.uBg);
      gl.uniform2f(pCell.u.uBgInv, 1.0 / rtScene.w, 1.0 / rtScene.h);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // ---- PASS 3: Native WebGL2 ASCII Pass + Cell-Quantized Pure-ASCII T^minus ----
      setTarget(rtGlyph);
      gl.useProgram(pGlyph.prog);
      bindTex(0, rtCell.tex, pGlyph.u.uCell);
      bindTex(1, rtScene.tex, pGlyph.u.uBg);
      bindTex(2, atlasTex, pGlyph.u.uAtlas);
      if (wordmarkTex) {
        bindTex(3, wordmarkTex, pGlyph.u.uWordmarkMask);
      }
      gl.uniform2f(pGlyph.u.uGrid, cols, rows);
      gl.uniform1f(pGlyph.u.uGlyphCount, ASCII_RAMP.length);
      gl.uniform1f(pGlyph.u.uWordmarkCarve, wordmarkCarve);
      gl.uniform1f(pGlyph.u.uBlastPeak, blastPeak);
      gl.uniform1f(pGlyph.u.uWarmTint, warmTint);
      gl.uniform1f(pGlyph.u.uSettle, settle);
      gl.uniform1f(pGlyph.u.uTime, tSec);
      gl.uniform2f(pGlyph.u.uPointer, pointerX, pointerY);
      gl.uniform1f(pGlyph.u.uPointerActive, pointerActive);
      gl.uniform1f(pGlyph.u.uViewAsp, viewAsp);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // ---- PASS 4: Thresholded Separable Gaussian Bloom (2-tier desktop / 1-tier mobile) ----
      gl.useProgram(pBlur.prog);
      setTarget(rtB1A);
      bindTex(0, rtGlyph.tex, pBlur.u.uTex);
      gl.uniform2f(pBlur.u.uDir, 1.25 / rtB1A.w, 0.0);
      gl.uniform1f(pBlur.u.uThreshold, 0.16);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      setTarget(rtB1B);
      bindTex(0, rtB1A.tex, pBlur.u.uTex);
      gl.uniform2f(pBlur.u.uDir, 0.0, 1.25 / rtB1B.h);
      gl.uniform1f(pBlur.u.uThreshold, 0.0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (useBloom2) {
        setTarget(rtB2A);
        bindTex(0, rtB1B.tex, pBlur.u.uTex);
        gl.uniform2f(pBlur.u.uDir, 2.2 / rtB2A.w, 0.0);
        gl.uniform1f(pBlur.u.uThreshold, 0.0);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        setTarget(rtB2B);
        bindTex(0, rtB2A.tex, pBlur.u.uTex);
        gl.uniform2f(pBlur.u.uDir, 0.0, 2.2 / rtB2B.h);
        gl.uniform1f(pBlur.u.uThreshold, 0.0);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }

      // ---- PASS 5: Final Premultiplied Alpha Composite ----
      setTarget(null);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(pComp.prog);
      bindTex(0, rtGlyph.tex, pComp.u.uBase);
      bindTex(1, rtB1B.tex, pComp.u.uBloom1);
      bindTex(2, useBloom2 ? rtB2B.tex : rtB1B.tex, pComp.u.uBloom2);
      if (wordmarkTex) {
        bindTex(3, wordmarkTex, pComp.u.uWordmarkMask);
      }
      gl.uniform2f(pComp.u.uGrid, cols, rows);
      gl.uniform1f(pComp.u.uUseBloom2, useBloom2 ? 1.0 : 0.0);
      gl.uniform1f(pComp.u.uWordmarkCarve, wordmarkCarve);
      const glowAmount =
        (mixNum(0.46, 0.54, settle) + starVis * 0.06 + ejecta * 0.08 + lockPulse * 0.14) *
          (1.0 - blastPeak * 0.70) +
        polarFactor * 0.14;
      gl.uniform1f(pComp.u.uGlow, glowAmount);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    rafId = window.requestAnimationFrame(frame);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);

      freeRT(gl, rtScene);
      freeRT(gl, rtCell);
      freeRT(gl, rtGlyph);
      freeRT(gl, rtB1A);
      freeRT(gl, rtB1B);
      freeRT(gl, rtB2A);
      freeRT(gl, rtB2B);
      gl.deleteTexture(atlasTex);
      if (wordmarkTex) gl.deleteTexture(wordmarkTex);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(pScene.prog);
      gl.deleteProgram(pCell.prog);
      gl.deleteProgram(pGlyph.prog);
      gl.deleteProgram(pBlur.prog);
      gl.deleteProgram(pComp.prog);
    };
  }, [skipIntro]);

  return (
    <>
      {/* Layer 0: Obsidian space starfield (`* + ^ -`) + Global viewport cursor glyph aura */}
      <canvas
        ref={starCanvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-[100dvh] w-full"
      />

      {/* Layer 30: Single persistent 60fps WebGL2 Procedural 3D Star -> Supernova -> Black Hole */}
      <canvas
        ref={glCanvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 h-[100dvh] w-full"
      />
    </>
  );
}
