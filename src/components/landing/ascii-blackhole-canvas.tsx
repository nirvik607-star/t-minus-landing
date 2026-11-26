"use client";

import React, { useEffect, useRef } from "react";
import { drawWordmarkMaskCanvas } from "@/components/landing/t-minus-wordmark";
import { LAUNCH_TARGET_MS } from "@/lib/waitlist";

/**
 * Shared scroll & 3D camera telemetry published every animation frame so
 * `HorizonCountdown`, hero lift-off, and the slim Layer 20 curved pre-rim veil
 * stay pixel-locked at 60fps with the real 3D black hole.
 */
export interface HorizonSyncState {
  /** 0 = bottom hero rest, 1 = slim top-pinned inverted event horizon */
  pinProgress: number;
  /** 0..1 intro settle (1 = settled bottom horizon) */
  settleProgress: number;
  /** 0..1 full top-down polar black hole dwell plateau */
  polarFactor: number;
  /** Exact 3D-projected diameter of the `#000000` black hole void in CSS px */
  polarDiameterPx: number;
  /** True strictly once the black hole has fully resolved at the bottom of the screen */
  heroResolved: boolean;
  /** Screen Y (px from top) where the countdown centers inside the pure #000000 core */
  countdownCenterY: number;
  /** Scale factor for Horizon Strip mode (1.0 bottom -> 0.64/0.60 slim top dome) */
  countdownScale: number;
  /** Exact 3D-projected top-dome circle in CSS px for the slim Layer 20 curved pre-rim veil */
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
 * Full 10-step T^minus hybrid ASCII glyph ramp (` .:-^t+=T*`).
 * Restores `.` and `:` low-end tail for silky obsidian fade-off without stepped banding.
 */
const ASCII_RAMP = " .:-^t+=T*";

// ---- Intro Choreography Timings (Total 9.00s to Full Bottom Resolve) ----
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
 * Pass 1: Analytic 3D Dying Star -> Gravitational Implosion ->
 *         3D Filamentary Supernova -> Relativistic Black Hole + Sculpted Spiral Disk
 *         + 3D Helical Polar Jets + Polar-Only UTC 1-Second Escapement Pulse
 */
const FS_SCENE = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 o;

uniform float uTime;
uniform float uViewAsp;
uniform float uSceneH;
uniform float uTanHalfFov;

// Continuous 3D orbital camera basis
uniform vec3  uCamPos;
uniform vec3  uCamRight;
uniform vec3  uCamUp;
uniform vec3  uCamFwd;

// Act I -> III uniforms
uniform float uStarVis;
uniform float uStarRadius;
uniform float uStarShift;
uniform float uStarCrack;
uniform float uImplode;
uniform float uEjecta;
uniform float uEjectaProg;
uniform float uBhBirth;
uniform float uDiskBirth;
uniform float uLockPulse;
uniform float uLockWaveProg;

// Polar-only UTC 1-second escapement pulse (strictly 0 on hero & top dome)
uniform float uTickPulse;
uniform float uTickProg;

// Continuous state parameters
uniform float uSettle;
uniform float uPin;
uniform float uPolarFactor;
uniform float uDiskOuterR;
uniform float uJetPower;
uniform float uCharge;
uniform float uBlastPeak;
uniform float uBlastProgress;
uniform vec2  uPointer;
uniform float uPointerActive;

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

// Natural Warm-White Dying Star Palette
const vec3 C_STAR_CORE   = vec3(1.0000, 0.9725, 0.9098); // #FFF8E8
const vec3 C_STAR_MID    = vec3(0.9216, 0.7882, 0.5961); // #EBC998
const vec3 C_STAR_LIMB   = vec3(0.5608, 0.3412, 0.2157); // #8F5737
const vec3 C_STAR_CORONA = vec3(0.9412, 0.7804, 0.5647); // #F0C790

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

float starTurbulence(vec3 p, float t) {
  float a = sin(p.x * 5.2 + t * 0.95) * cos(p.y * 5.6 - t * 0.78) * sin(p.z * 5.4 + t * 0.65);
  float b = sin((p.x + p.z) * 8.6 - t * 1.45) * cos((p.y - p.x) * 9.2 + t * 1.20);
  float c = cos((p.y + p.z) * 14.5 + t * 2.15) * sin((p.x - p.y * 0.7) * 13.0 - t * 1.75);
  return 0.5 + 0.30 * a + 0.17 * b + 0.10 * c;
}

vec4 evalDyingStar(vec3 ro, vec3 rd, vec3 closestPt, float b, float tc, float pixelAA) {
  if (uStarVis <= 0.002 || tc <= 0.0) return vec4(0.0);

  float R = max(0.12, uStarRadius);
  vec2 planeXY = vec2(dot(closestPt, uCamRight), dot(closestPt, uCamUp));
  float ang = atan(planeXY.y, planeXY.x);
  float pulseWave = 0.5 + 0.5 * sin(uTime * 11.0 + ang * 3.0);

  vec3 corePal = mix(C_STAR_CORE, vec3(1.0, 1.0, 1.0), uStarShift);
  vec3 midPal = mix(C_STAR_MID, mix(C_ICE_BLUE, C_WHITE_CORE, 0.36), uStarShift);
  vec3 limbPal = mix(C_STAR_LIMB, mix(C_DEEP_PURPLE, C_ACCENT, 0.55), uStarShift);
  vec3 coronaPal = mix(C_STAR_CORONA, mix(C_ICE_BLUE, C_PERIWINKLE, 0.48), uStarShift);

  vec3 starCol = vec3(0.0);
  float starAlpha = 0.0;

  float sphereMask = 1.0 - smoothstep(R - pixelAA * 1.5, R + pixelAA * 1.5, b);
  if (b < R + pixelAA * 2.0) {
    float zHalf = sqrt(max(0.0, R * R - min(b, R) * min(b, R)));
    vec3 pHit = ro + (tc - zHalf) * rd;
    vec3 N = normalize(pHit);

    float spin = uTime * (0.42 + uImplode * 2.2);
    float cs = cos(spin);
    float sn = sin(spin);
    vec3 Nr = vec3(N.x * cs + N.z * sn, N.y, -N.x * sn + N.z * cs);

    float gran = starTurbulence(Nr, uTime * (1.05 + uStarCrack * 0.95));
    float hotCells = smoothstep(0.45, 0.86, gran);
    float darkLanes = smoothstep(0.52, 0.14, gran);

    float f1 = abs(sin(Nr.x * 9.5 + Nr.y * 6.2 + uTime * 2.4) + cos(Nr.z * 8.4 - Nr.y * 7.1));
    float f2 = abs(cos(Nr.y * 11.2 - Nr.z * 7.8 - uTime * 2.8) + sin(Nr.x * 10.1 + Nr.z * 6.5));
    float crackMask = (1.0 - smoothstep(0.02, 0.21, min(f1, f2))) * uStarCrack;
    crackMask *= (0.68 + 0.32 * pulseWave);

    float ndotv = clamp(dot(N, -rd), 0.0, 1.0);
    float limbDark = pow(ndotv, 0.78);
    float rimFlare = pow(1.0 - ndotv, 3.2) * (0.44 + 0.48 * uStarCrack);

    vec3 surfCol = mix(limbPal, midPal, clamp(limbDark * 0.80 + hotCells * 0.36, 0.0, 1.0));
    surfCol = mix(surfCol, corePal, smoothstep(0.54, 0.94, limbDark * 0.64 + hotCells * 0.48));
    surfCol *= (1.0 - darkLanes * 0.54 * (1.0 - uStarShift * 0.35));

    vec3 crackCol = mix(C_ICE_BLUE, vec3(1.0), 0.56);
    surfCol = mix(surfCol, crackCol * 1.15, clamp(crackMask * 0.94, 0.0, 0.96));
    surfCol += mix(coronaPal, C_ICE_BLUE, 0.48 + 0.52 * uStarShift) * rimFlare * 0.86;

    float compressBoost = 1.0 + uImplode * 0.42 + uCharge * 0.75;
    starCol = surfCol * compressBoost * sphereMask;
    starAlpha = max(starAlpha, sphereMask);
  }

  float distOut = max(0.0, b - R);
  float coronaScale = max(0.26, R * 0.42);
  float normOut = distOut / coronaScale;
  if (normOut < 3.4) {
    float streamA = 0.5 + 0.5 * cos(ang * 6.0 - uTime * 0.95 + distOut * 2.2);
    float streamB = 0.5 + 0.5 * cos(ang * 11.0 + uTime * 1.35 - distOut * 2.8);
    float streamers = pow(max(streamA, streamB * 0.85), 2.8);

    float loopR = 0.22 + 0.24 * (0.5 + 0.5 * sin(ang * 5.0 + uTime * 0.75));
    float promArc = exp(-pow((normOut - loopR) * 7.6, 2.0))
      * smoothstep(0.45, 0.90, 0.5 + 0.5 * cos(ang * 5.0 - uTime * 0.6))
      * (1.0 - sphereMask) * (0.62 + 0.45 * uStarCrack);

    float innerCorona = exp(-normOut * 4.1) * (0.48 + 0.52 * streamers) * (1.0 - sphereMask * 0.85);
    float outerHalo = exp(-normOut * 1.95) * (0.10 + 0.16 * streamers) * (1.0 - sphereMask * 0.94);
    float outerCut = 1.0 - smoothstep(2.0, 3.2, normOut);

    vec3 cInner = mix(coronaPal, corePal, 0.35);
    vec3 cOuter = mix(mix(C_STAR_LIMB * 0.78, C_DEEP_PURPLE, uStarShift), C_ICE_BLUE, uStarCrack * 0.52);
    vec3 coronaRgb = (cInner * (innerCorona * 0.82 + promArc * 0.80) + cOuter * outerHalo) * outerCut;

    starCol += coronaRgb * (1.0 + uImplode * 0.32 + uCharge * 0.55);
    starAlpha = max(starAlpha, clamp((innerCorona * 0.85 + promArc * 0.78 + outerHalo * 0.42) * outerCut, 0.0, 1.0));
  }

  return vec4(starCol * uStarVis, clamp(starAlpha * uStarVis, 0.0, 1.0));
}

vec4 evalImplosionStreams(vec3 closestPt, float b, float tc) {
  if (uImplode <= 0.002 || tc <= 0.0) return vec4(0.0);

  vec2 planeXY = vec2(dot(closestPt, uCamRight), dot(closestPt, uCamUp));
  float ang = atan(planeXY.y, planeXY.x);
  float logB = log(max(b, 0.07));

  float armA = pow(0.5 + 0.5 * cos(ang * 12.0 + logB * 3.6 + uTime * 2.8), 4.8);
  float armB = pow(0.5 + 0.5 * cos(ang * 19.0 - logB * 4.4 - uTime * 2.1 + 1.1), 5.5);
  float dashA = smoothstep(0.32, 0.86, 0.5 + 0.5 * cos(logB * 15.0 + uTime * 14.5 + ang * 2.0));
  float dashB = smoothstep(0.38, 0.90, 0.5 + 0.5 * cos(logB * 21.0 + uTime * 18.5 - ang * 3.0));

  float radialEnv = smoothstep(max(0.08, uStarRadius * 0.65), max(0.24, uStarRadius * 1.15), b)
    * exp(-max(0.0, b - uStarRadius) * 0.94);

  float pinchR = max(0.22, uStarRadius * 1.32);
  float pinchRing = exp(-pow((b - pinchR) * 7.6, 2.0)) * (0.50 + 0.50 * cos(ang * 8.0 - uTime * 4.8));

  float streamEnergy = (armA * dashA * 0.90 + armB * dashB * 0.70) * radialEnv + pinchRing * 0.64;
  vec3 col = mix(C_DEEP_PURPLE, C_ACCENT, smoothstep(0.06, 0.30, streamEnergy));
  col = mix(col, C_ICE_BLUE, smoothstep(0.24, 0.68, streamEnergy + pinchRing * 0.45));
  col = mix(col, C_WHITE_CORE, smoothstep(0.72, 1.22, streamEnergy + uCharge * 0.45));

  float intensity = streamEnergy * uImplode * (0.98 + uCharge * 0.48);
  return vec4(col * intensity, clamp(intensity * 0.92, 0.0, 1.0));
}

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

  float webA = smoothstep(0.36, 0.88, 0.5 + 0.5 * cos(ang * 10.0 - b * 2.5 + uTime * 2.2));
  float webB = smoothstep(0.40, 0.90, 0.5 + 0.5 * cos(ang * 17.0 + b * 3.2 - uTime * 1.7));
  float filaments = max(webA, webB * 0.82);

  float rayPattern = pow(0.5 + 0.5 * cos(ang * 9.0 - uTime * 1.4), 3.6) * 0.58
    + pow(0.5 + 0.5 * cos(ang * 15.0 + uTime * 1.1 + 0.5), 4.6) * 0.40;
  float trailingInterior = (1.0 - smoothstep(rMain * 0.68, rMain * 1.05, b))
    * smoothstep(0.30, max(0.65, rInner * 0.55), b)
    * (0.18 + 0.82 * rayPattern) * (1.0 - p * 0.75);

  float energy = mainShell * (0.50 + 0.60 * filaments)
    + innerShell * (0.42 + 0.48 * webA) * 0.75
    + trailingInterior * 0.36;

  vec3 col = mix(C_SPACE, C_DEEP_PURPLE, smoothstep(0.05, 0.26, energy));
  col = mix(col, C_ACCENT, smoothstep(0.22, 0.48, energy));
  col = mix(col, C_PERIWINKLE, smoothstep(0.42, 0.74, energy));
  col = mix(col, C_ICE_BLUE, clamp(mainShell * 0.78 + innerShell * 0.42, 0.0, 0.84));
  col = mix(col, C_WHITE_CORE, smoothstep(0.84, 1.32, energy * (1.0 - p * 0.55)));

  float blastDuck = 1.0 - uBlastPeak * 0.35;
  float fade = uEjecta * mix(1.12, 0.54, smoothstep(0.32, 0.92, p)) * blastDuck;
  return vec4(col * energy * fade, clamp(energy * fade * 0.94, 0.0, 1.0));
}

/**
 * Volumetric 3D Accretion Disk tuned for fine-pitch hybrid luminous ASCII:
 * - Soft plasma body + carved spiral arms + polar-only 1s escapement wave synced to countdown.
 */
vec4 evalDisk(vec2 xz, float outerR, float polarF, float time, float dopplerBias) {
  if (uDiskBirth <= 0.002) return vec4(0.0);

  float r = length(xz);
  if (r < 1.02 || r > outerR) return vec4(0.0);

  float theta = atan(xz.y, xz.x);
  float logR = log(r);

  float birthRadiusGate = smoothstep(
    mix(outerR * 0.88, 1.02, uDiskBirth),
    mix(outerR * 1.05, 1.13, uDiskBirth),
    r
  );
  float innerEnv = mix(birthRadiusGate, smoothstep(1.025, 1.12, r), smoothstep(0.65, 1.0, uDiskBirth));
  float outerEnv = 1.0 - smoothstep(outerR * 0.58, outerR, r);
  float rNorm = clamp((r - 1.05) / max(0.6, outerR - 1.05), 0.0, 1.0);

  float birthTwist = (1.0 - uDiskBirth) * 5.2;
  float spiralTwist = mix(3.4 + birthTwist, 14.8, polarF);
  float infall = time * mix(0.18, 0.58, polarF);

  // ---- Stratum 1: Crisp Hot Inner ISCO Streamlines ----
  float s1Phase = 3.0 * theta + (spiralTwist * 1.15) * logR + infall * 1.45 - time * 1.05;
  float s1Ring = smoothstep(0.38, 0.84, 0.5 + 0.5 * cos(s1Phase));
  float s1Conc = smoothstep(0.40, 0.84, 0.5 + 0.5 * cos(logR * 25.0 + infall * 2.0));
  float s1Track = mix(mix(s1Conc, s1Ring, 0.58), s1Ring, polarF);
  float s1Dash = smoothstep(0.20, 0.72, 0.5 + 0.5 * cos(4.0 * theta - 5.2 * logR - time * 1.75));
  float s1Env = smoothstep(1.025, 1.09, r) * (1.0 - smoothstep(1.68, 2.45, r));
  float s1Val = s1Track * (0.46 + 0.54 * s1Dash) * s1Env;

  // ---- Stratum 2: Mid-Disk Spiral Arms ----
  float s2ArmA = smoothstep(0.44, 0.86, 0.5 + 0.5 * cos(4.0 * theta + spiralTwist * logR + infall * 1.15 - time * 0.68));
  float s2ArmB = smoothstep(0.50, 0.88, 0.5 + 0.5 * cos(2.0 * theta + (spiralTwist * 0.72) * logR + infall * 0.85 - time * 0.45 + 1.4));
  float s2Conc = smoothstep(0.44, 0.84, 0.5 + 0.5 * cos(logR * 17.5 + infall * 1.3));
  float s2Lane = mix(max(s2Conc * 0.88, s2ArmA * 0.86), max(s2ArmA, s2ArmB * 0.88), polarF);
  float s2DashA = smoothstep(0.24, 0.68, 0.5 + 0.5 * cos(3.0 * theta - 4.4 * logR - time * 1.12 + 0.6));
  float s2DashB = smoothstep(0.30, 0.74, 0.5 + 0.5 * cos(5.0 * theta + 3.1 * logR - time * 0.90));
  float s2Env = smoothstep(1.06, 1.24, r) * (1.0 - smoothstep(outerR * 0.52, outerR * 0.94, r));
  float s2Val = s2Lane * max(s2DashA, s2DashB * 0.86) * s2Env;

  // ---- Stratum 3: Sweeping Outer Violet Arcs ----
  float s3Arm = smoothstep(0.50, 0.88, 0.5 + 0.5 * cos(2.0 * theta + (spiralTwist * 0.58) * logR + infall * 0.65 - time * 0.32 + 2.5));
  float s3Conc = smoothstep(0.50, 0.86, 0.5 + 0.5 * cos(logR * 11.0 + infall * 0.85));
  float s3Lane = mix(max(s3Conc * 0.80, s3Arm * 0.76), s3Arm, polarF);
  float s3Dash = smoothstep(0.36, 0.78, 0.5 + 0.5 * cos(2.0 * theta - 2.6 * logR - time * 0.48));
  float s3Env = smoothstep(1.50, 2.20, r) * outerEnv;
  float s3Val = s3Lane * (0.28 + 0.72 * s3Dash) * s3Env;

  // Calibrated volumetric baseBed for silky violet-to-obsidian radial falloff
  float baseBed = exp(-(r - 1.04) * mix(2.2, 1.38, polarF)) * innerEnv * outerEnv * 0.28;

  float sparkWave = smoothstep(0.84, 0.97, 0.5 + 0.5 * cos(5.0 * theta + (spiralTwist * 1.1) * logR - time * 1.9));
  float iceSpark = sparkWave * s1Env * (0.34 + 0.38 * polarF);

  // Polar-Only UTC 1-Second Escapement Wave across inner polar spiral arms (strictly 0 on hero & top dome)
  float polarGate = smoothstep(0.55, 0.90, polarF);
  float tickWave = 0.0;
  if (uTickPulse > 0.002 && uSettle > 0.5 && polarGate > 0.001) {
    float rTick = mix(1.06, 2.85, uTickProg);
    float ringSigma = 0.14;
    float ringBand = exp(-pow((r - rTick) / ringSigma, 2.0));
    float armMod = 0.45 + 0.55 * max(s1Track, s2Lane);
    tickWave = ringBand * armMod * uTickPulse * polarGate * 0.44 * uSettle * innerEnv * outerEnv;
  }

  float doppler = 1.0 + dopplerBias * (1.0 - polarF) * 0.26 * cos(theta - 0.55);

  float energy = (baseBed + s1Val * 1.02 + s2Val * 0.84 + s3Val * 0.52) * doppler * uDiskBirth;
  energy = energy * (1.0 + uCharge * 0.65) + tickWave * 1.45;

  vec3 col = mix(C_SPACE, C_DEEP_PURPLE, smoothstep(0.04, 0.24, energy));
  col = mix(col, C_ACCENT, smoothstep(0.20, 0.48, energy));
  col = mix(col, C_PERIWINKLE, smoothstep(0.42, 0.76, energy));
  col = mix(col, C_WHITE_CORE, smoothstep(0.74, 1.12, energy));

  col = mix(col, mix(C_DEEP_PURPLE, C_ACCENT, 0.55), rNorm * 0.34 * (1.0 - s1Val));
  col = mix(col, mix(C_ICE_BLUE, C_WHITE_CORE, 0.40), clamp(iceSpark * 0.72 + tickWave * 2.8, 0.0, 0.94));

  float alpha = clamp(energy * 1.24, 0.0, 1.0) * innerEnv * outerEnv;
  return vec4(col * clamp(energy * 1.26, 0.0, 1.50), alpha);
}

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
  float outerSheath = exp(-pow(dPerp / (w * 1.65), 2.0)) * 0.28;

  float total = (coreBeam * 0.72 + helices * 0.80 + streakMask * 0.54 + outerSheath) * axialEnv * jetPower * occ;
  total *= (1.0 + uCharge * 0.55);

  vec3 jetCol = mix(C_ACCENT, C_ICE_BLUE, smoothstep(0.08, 0.48, coreBeam + helices + streakMask * 0.6));
  jetCol = mix(jetCol, C_WHITE_CORE, smoothstep(0.62, 1.25, coreBeam * 0.9 + helices * 0.55 + uCharge * 0.35));
  return vec4(jetCol * total, clamp(total * 0.92, 0.0, 1.0));
}

void main() {
  vec2 ptrDelta = vUv - uPointer;
  ptrDelta.x *= uViewAsp;
  float ptrDist = length(ptrDelta);
  float ptrRipple = exp(-pow(ptrDist * 4.4, 2.0)) * uPointerActive * uSettle;

  vec2 ndc = vUv * 2.0 - 1.0;
  vec2 ndcDeflected = ndc - (vUv - uPointer) * (0.018 * ptrRipple);
  vec3 rd = normalize(
    uCamFwd +
    ndcDeflected.x * uViewAsp * uTanHalfFov * uCamRight +
    ndcDeflected.y * uTanHalfFov * uCamUp
  );
  vec3 ro = uCamPos;

  float tc = -dot(ro, rd);
  vec3 closestPt = ro + max(tc, 0.0) * rd;
  float b = length(closestPt);
  float pixelAA = max(0.005, (2.0 * uTanHalfFov / max(uSceneH, 64.0)) * max(tc, 1.0));

  float effectiveRh = mix(0.30, R_H, smoothstep(0.0, 0.85, uBhBirth));
  float coreShadow = (uBhBirth > 0.002 && tc > 0.0)
    ? (1.0 - smoothstep(effectiveRh - pixelAA, effectiveRh + pixelAA, b)) * smoothstep(0.0, 0.25, uBhBirth)
    : 0.0;
  float tSphere = (uBhBirth > 0.002 && b < effectiveRh && tc > 0.0)
    ? (tc - sqrt(max(0.0, effectiveRh * effectiveRh - b * b)))
    : 1e9;

  vec3 accumCol = vec3(0.0);
  float accumAlpha = 0.0;

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

  // Tightly bounded outer arcs when settled (especially slim docked top dome uPin=1)
  float horizonClose = (1.0 - uPolarFactor) * uSettle;
  float boundStart = mix(1.14, 1.06, uPin);
  float boundEnd = mix(1.34, 1.20, uPin);
  float horizonBound = mix(1.0, 1.0 - smoothstep(boundStart, boundEnd, b), horizonClose);
  float lensedWeight = 1.0 - smoothstep(0.28, 0.78, uPolarFactor);

  // Rear gravitationally lensed disk (Einstein arches)
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
        float archBoost = 1.0 + 0.36 * exp(-max(b - effectiveRh, 0.0) * 3.8);
        float vis = (1.0 - coreShadow) * lensedWeight * horizonBound;
        accumCol += rearDisk.rgb * archBoost * vis;
        accumAlpha = max(accumAlpha, rearDisk.a * vis);
      }
    }
  }

  // Relativistic photon ring + calm horizon corona + Polar-Only 1s Escapement Rim Ripple
  if (uBhBirth > 0.002 && tc > 0.0) {
    float distOut = b - effectiveRh;
    float ringAng = atan(closestPt.y, closestPt.x);
    // Calm rock-steady rim outside polar focus (no unintended pulsing on hero or top dome)
    float shimmerAmp = mix(0.05, 0.26, uPolarFactor);
    float ringShimmer = (1.0 - shimmerAmp) + shimmerAmp * sin(ringAng * 3.0 - uTime * 1.45) * cos(ringAng * 2.0 + uTime * 0.85);
    float ringStream = 0.5 + 0.5 * cos(ringAng * 6.0 - distOut * 34.0 - uTime * 1.4);

    float photonWidth = mix(mix(29.0, 36.0, uPin), 25.0, uPolarFactor);
    float photonRing = exp(-pow((distOut - 0.014) * photonWidth, 2.0)) * (1.0 - coreShadow);

    float horizonArc = exp(-max(distOut, 0.0) * mix(10.8, 15.5, uPin))
      * smoothstep(-0.005, 0.016, distOut) * (1.0 - coreShadow) * horizonClose;
    float arcStripes = mix(0.76, 0.56 + 0.44 * smoothstep(0.32, 0.82, ringStream), 1.0 - uPin * 0.5);

    float innerHalo = exp(-max(distOut, 0.0) * mix(mix(9.4, 14.5, uPin), 6.8, uPolarFactor))
      * smoothstep(-0.01, 0.018, distOut) * (1.0 - coreShadow);

    float lockR = mix(0.015, 0.24, uLockWaveProg);
    float lockWave = exp(-pow((distOut - lockR) * 26.0, 2.0)) * (1.0 - coreShadow) * uLockPulse * horizonClose;

    // Polar-only UTC 1-second escapement rim flash
    float polarGate = smoothstep(0.55, 0.90, uPolarFactor);
    float tickRimR = mix(0.014, 0.28, uTickProg);
    float tickRimWave = exp(-pow((distOut - tickRimR) * 26.0, 2.0))
      * (1.0 - coreShadow) * uTickPulse * polarGate * 0.36 * uSettle;

    float ptrLift = 1.0 + ptrRipple * 0.44;
    float birthGlow = uBhBirth * (1.0 + (1.0 - uBhBirth) * 0.72);
    vec3 photonCol = mix(C_PERIWINKLE, C_WHITE_CORE, 0.72 + 0.20 * ringShimmer);
    photonCol = mix(photonCol, C_ICE_BLUE, clamp(ptrRipple * 0.52 + (1.0 - uBhBirth) * 0.62 + uLockPulse * 0.55 + tickRimWave * 2.6 + 0.14 * ringShimmer, 0.0, 0.90));
    vec3 arcCol = mix(C_ACCENT, C_PERIWINKLE, smoothstep(0.25, 0.85, arcStripes * ringShimmer));
    arcCol = mix(arcCol, C_WHITE_CORE, smoothstep(0.055, 0.008, distOut) * 0.72);
    vec3 haloCol = mix(C_DEEP_PURPLE, C_ACCENT, 0.55 + 0.24 * ringShimmer);

    float photonBoost = mix(1.06, mix(1.26, 1.14, uPin), horizonClose);
    accumCol += photonCol * photonRing * (0.98 + 0.24 * ringShimmer) * photonBoost * ptrLift * birthGlow;
    accumCol += arcCol * horizonArc * arcStripes * mix(0.86, 0.68, uPin) * ptrLift * uBhBirth;
    accumCol += haloCol * innerHalo * (0.28 + 0.12 * ringShimmer) * ptrLift * uBhBirth;
    accumCol += mix(C_ICE_BLUE, C_WHITE_CORE, 0.48) * (lockWave * 0.72 + tickRimWave * 1.95);
    accumAlpha = max(accumAlpha, clamp((photonRing * 0.98 + horizonArc * 0.84 + innerHalo * 0.46) * uBhBirth + lockWave * 0.65 + tickRimWave, 0.0, 1.0));
  }

  // Direct equatorial disk
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

  vec4 jets = evalPolarJets(ro, rd, tSphere, coreShadow, uJetPower, uTime);
  accumCol += jets.rgb;
  accumAlpha = max(accumAlpha, jets.a);

  if (uEjecta > 0.002) {
    vec4 ej = evalSupernovaEjecta(closestPt, b, tc);
    float ejVis = 1.0 - coreShadow * smoothstep(0.25, 0.85, uBhBirth);
    accumCol += ej.rgb * ejVis;
    accumAlpha = max(accumAlpha, ej.a * ejVis);
  }

  float pureCoreLock = coreShadow * (1.0 - frontCoversShadow);
  accumCol *= (1.0 - pureCoreLock);

  // Radiant Supernova Core Detonation Flash
  if (uCharge > 0.001 || uBlastPeak > 0.001) {
    vec2 blastPos = (vUv - vec2(0.5, 0.5)) * vec2(uViewAsp * 0.68, 1.0);
    float blastR = length(blastPos);
    float blastAng = atan(blastPos.y, blastPos.x);

    if (uCharge > 0.001) {
      float coreSpark = exp(-pow(blastR * 5.2, 2.0)) * uCharge;
      float flareH = exp(-abs(blastPos.y) * 32.0) * exp(-abs(blastPos.x) * 4.4) * uCharge * 0.68;
      vec3 chargeLight = mix(C_ICE_BLUE, vec3(1.0), 0.68);
      accumCol += chargeLight * (coreSpark * 1.35 + flareH);
      accumAlpha = max(accumAlpha, clamp(coreSpark + flareH, 0.0, 1.0));
    }

    if (uBlastPeak > 0.001) {
      float coreWhite = exp(-pow(blastR * 1.85, 2.0));
      float midHalo = exp(-pow(blastR * 1.05, 2.0));
      float rShock = mix(0.18, 0.96, uBlastProgress);
      float shockRing = exp(-pow((blastR - rShock) * 8.5, 2.0));

      float raysA = pow(0.5 + 0.5 * cos(blastAng * 8.0 - uTime * 2.0), 3.2);
      float raysB = pow(0.5 + 0.5 * cos(blastAng * 14.0 + uTime * 1.5 + 0.7), 4.2);
      float radialRays = (raysA * 0.62 + raysB * 0.40) * exp(-blastR * 1.15);

      vec3 outerViolet = mix(C_SPACE, C_DEEP_PURPLE, smoothstep(0.05, 0.55, midHalo + radialRays * 0.55));
      vec3 midIceViolet = mix(C_ACCENT, C_ICE_BLUE, smoothstep(0.14, 0.70, midHalo * 0.88 + shockRing * 0.65));
      vec3 brightIceRing = mix(C_ICE_BLUE, vec3(0.92, 0.985, 1.0), 0.45);

      vec3 blastCol = mix(outerViolet, midIceViolet, smoothstep(0.10, 0.62, midHalo + radialRays * 0.45));
      blastCol = mix(blastCol, brightIceRing, clamp(shockRing * 0.88 + radialRays * 0.44 * (1.0 - coreWhite), 0.0, 0.92));
      blastCol = mix(blastCol, vec3(1.0, 1.0, 1.0), smoothstep(0.18, 0.68, coreWhite * 1.20 + midHalo * 0.25));

      float blastMix = clamp(uBlastPeak * (0.34 + 0.76 * midHalo + 0.44 * shockRing + 0.24 * radialRays), 0.0, 0.99);
      float centerPunch = 1.0 - coreShadow * smoothstep(0.18, 0.72, uBhBirth) * (1.0 - smoothstep(0.55, 0.88, uBlastPeak));
      accumCol = mix(accumCol, blastCol, blastMix * centerPunch);
      accumAlpha = max(accumAlpha, clamp(uBlastPeak * 0.99, 0.0, 1.0));
      pureCoreLock *= (1.0 - smoothstep(0.12, 0.55, uBlastPeak) * centerPunch);
    }
  }

  float introSkyOpaque = 1.0 - smoothstep(0.14, 0.56, uSettle);
  accumCol = max(accumCol, C_OBSIDIAN * introSkyOpaque * (1.0 - pureCoreLock));

  float plasmaLum = dot(accumCol, vec3(0.2126, 0.7152, 0.0722));
  float settledPlasmaAlpha = smoothstep(0.016, 0.24, plasmaLum) * smoothstep(0.01, 0.18, accumAlpha);
  float finalAlpha = clamp(max(max(pureCoreLock, settledPlasmaAlpha), introSkyOpaque), 0.0, 1.0);

  o = vec4(clamp(accumCol, 0.0, 1.0), finalAlpha);
}`;

/**
 * Pass 2: Grid-Aligned 4-Tap AA Cell Downsample
 */
const FS_CELL = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 o;
uniform sampler2D uBg;
uniform vec2 uBgInv;
uniform vec2 uGridOrigin;
uniform vec2 uCellPx;
uniform vec2 uCanvasPx;
uniform vec2 uGrid;

void main() {
  vec2 cellIdx = floor(vUv * uGrid);
  vec2 pxCenter = uGridOrigin + (cellIdx + 0.5) * uCellPx;
  vec2 uvCenter = clamp(pxCenter / uCanvasPx, vec2(0.0), vec2(1.0));
  vec2 d = uBgInv * 0.65;
  vec4 a = texture(uBg, uvCenter + vec2(-d.x, -d.y));
  vec4 b = texture(uBg, uvCenter + vec2( d.x, -d.y));
  vec4 c = texture(uBg, uvCenter + vec2(-d.x,  d.y));
  vec4 e = texture(uBg, uvCenter + vec2( d.x,  d.y));
  o = (a + b + c + e) * 0.25;
}`;

/**
 * Pass 3: 1A Hybrid Luminous Volumetric 1:1 Native-Pixel ASCII Shader
 * - Fine near-square physical cells (`5.8x7.8px` desktop / `4.5x6.5px` mobile)
 * - Full 10-step ramp ` .:-^t+=T*` via zero-blur `texelFetch` into `IBM Plex Mono` atlas
 * - Calibrated luminous volumetric plasma substrate (`0.24–0.32`) under crisp unblurred glyphs
 * - Radiant supernova core (`blastCoreBack ~ 0.92`) with crisp dark carved `T^minus` ASCII letters
 * - Pure `#000000` locked inside the event horizon core (`alpha = 1.0`)
 */
const FS_GLYPH = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 o;

uniform sampler2D uCell;
uniform sampler2D uBg;
uniform sampler2D uAtlas;
uniform sampler2D uWordmarkMask;
uniform ivec2 uGrid;
uniform ivec2 uCellPx;
uniform ivec2 uGridOrigin;
uniform vec2  uCanvasPx;
uniform float uGlyphCount;
uniform float uWordmarkCarve;
uniform float uBlastPeak;
uniform float uWarmTint;
uniform float uSettle;
uniform float uTime;
uniform vec2  uPointer;
uniform float uPointerActive;
uniform float uViewAsp;

const vec3 C_OBSIDIAN    = vec3(0.0157, 0.0078, 0.0235); // #040206
const vec3 C_DEEP_VOID   = vec3(0.0745, 0.0078, 0.1137); // #13021D
const vec3 C_SPACE       = vec3(0.1725, 0.0275, 0.2078); // #2C0735
const vec3 C_DEEP_PURPLE = vec3(0.3059, 0.0784, 0.5490); // #4E148C
const vec3 C_ACCENT      = vec3(0.3804, 0.2392, 0.7569); // #613DC1
const vec3 C_PERIWINKLE  = vec3(0.5216, 0.5412, 0.8902); // #858AE3
const vec3 C_ICE_BLUE    = vec3(0.5922, 0.8745, 0.9882); // #97DFFC
const vec3 C_WHITE_CORE  = vec3(0.9686, 0.9804, 1.0000); // #F7FAFF
const vec3 C_WARM_CORONA = vec3(0.8471, 0.6549, 0.4549); // #D8A774

float cellHash(ivec2 c) {
  vec2 p = fract(vec2(c) * vec2(0.1031, 0.1030));
  p += dot(p, p.yx + 33.33);
  return fract((p.x + p.y) * p.x);
}

void main() {
  ivec2 fragPx = ivec2(gl_FragCoord.xy);
  ivec2 relPx = fragPx - uGridOrigin;

  ivec2 rawCell = ivec2(floor(vec2(relPx) / vec2(uCellPx)));
  bool inGrid = rawCell.x >= 0 && rawCell.y >= 0 && rawCell.x < uGrid.x && rawCell.y < uGrid.y;
  ivec2 cellCoord = clamp(rawCell, ivec2(0), uGrid - ivec2(1));
  ivec2 subPx = clamp(relPx - cellCoord * uCellPx, ivec2(0), uCellPx - ivec2(1));

  vec2 gridF = vec2(uGrid);
  vec2 cellUv = (vec2(uGridOrigin) + (vec2(cellCoord) + 0.5) * vec2(uCellPx)) / uCanvasPx;

  vec4 cell = texelFetch(uCell, cellCoord, 0);
  vec4 bgTex = texture(uBg, vUv);

  float cellLum = dot(cell.rgb, vec3(0.2126, 0.7152, 0.0722));
  float bgLum = dot(bgTex.rgb, vec3(0.2126, 0.7152, 0.0722));
  float energy = clamp(pow(clamp(cellLum * 1.18, 0.0, 1.0), 0.90), 0.0, 0.9999);

  vec2 ptrD = cellUv - uPointer;
  ptrD.x *= uViewAsp;
  float ptrBoost = exp(-pow(length(ptrD) * 4.5, 2.0)) * uPointerActive * uSettle * smoothstep(0.04, 0.22, energy);
  float shapedEnergy = clamp(energy + ptrBoost * 0.18, 0.0, 0.9999);

  int idx = int(floor(shapedEnergy * uGlyphCount));
  int atlasRow = 0;

  // Act III supernova blast energizes bright cells into '=', 'T', '*' (indices 7, 8, 9)
  if (uBlastPeak > 0.05 && shapedEnergy > 0.25) {
    float hBlast = cellHash(cellCoord);
    int blastIdx = shapedEnergy > 0.68 ? (hBlast > 0.42 ? 9 : 8) : (shapedEnergy > 0.45 ? 8 : 7);
    idx = max(idx, int(mix(float(idx), float(blastIdx), smoothstep(0.12, 0.65, uBlastPeak))));
  }

  // ---- Cell-Quantized ASCII T^minus Supernova Wordmark ----
  float wmCov = 0.0;
  float wmHalo = 0.0;
  float wmCaret = 0.0;
  bool isWordmarkCell = false;

  if (uWordmarkCarve > 0.001) {
    vec2 subOff = 0.24 / gridF;
    vec3 s0 = texture(uWordmarkMask, cellUv + vec2(-subOff.x, -subOff.y)).rgb;
    vec3 s1 = texture(uWordmarkMask, cellUv + vec2( subOff.x, -subOff.y)).rgb;
    vec3 s2 = texture(uWordmarkMask, cellUv + vec2(-subOff.x,  subOff.y)).rgb;
    vec3 s3 = texture(uWordmarkMask, cellUv + vec2( subOff.x,  subOff.y)).rgb;
    vec3 wmAvg = (s0 + s1 + s2 + s3) * 0.25;

    wmCov = wmAvg.r * uWordmarkCarve;
    wmHalo = wmAvg.g * uWordmarkCarve;
    wmCaret = wmAvg.b * uWordmarkCarve;

    if (wmCov >= 0.20) {
      isWordmarkCell = true;
      atlasRow = 1;

      float h = cellHash(cellCoord);
      float radDist = length((cellUv - vec2(0.5)) * vec2(uViewAsp, 1.0));
      float wave = fract(h + radDist * 1.6 - uTime * 2.4);

      if (wmCov >= 0.46) {
        if (wave < 0.72) {
          idx = 8; // 'T'
        } else if (wave < 0.88) {
          idx = 9; // '*'
        } else {
          idx = 7; // '='
        }
      } else {
        float edgeNorm = clamp((wmCov - 0.20) / 0.26, 0.0, 0.999);
        if (edgeNorm < 0.26) {
          idx = 4; // '^'
        } else if (edgeNorm < 0.52) {
          idx = 3; // '-'
        } else if (edgeNorm < 0.78) {
          idx = 6; // '+'
        } else {
          idx = 5; // 't'
        }
      }
    }
  }

  // Exact 1:1 native-pixel texelFetch (NO mipmaps, NO bilinear blur)
  ivec2 atlasPx = ivec2(
    idx * uCellPx.x + subPx.x,
    atlasRow * uCellPx.y + (uCellPx.y - 1 - subPx.y)
  );
  float cov = inGrid ? texelFetch(uAtlas, atlasPx, 0).r : 0.0;
  cov = smoothstep(0.08, 0.76, cov);

  float alpha = bgTex.a;
  float introOpaque = 1.0 - smoothstep(0.14, 0.56, uSettle);

  float isPureCore = smoothstep(0.90, 0.99, alpha)
    * (1.0 - smoothstep(0.002, 0.012, bgLum))
    * (1.0 - smoothstep(0.10, 0.45, uBlastPeak));

  // ---- 1A HYBRID VOLUMETRIC SUBSTRATE + RADIANT SUPERNOVA CORE ----
  float diskSubstrate = mix(0.24, 0.32, smoothstep(0.18, 0.78, bgLum))
    * smoothstep(0.018, 0.14, bgLum)
    * (1.0 - isPureCore);
  vec2 blastCenterDist = (vUv - vec2(0.5)) * vec2(uViewAsp * 0.72, 1.0);
  float blastCoreBack = (exp(-pow(length(blastCenterDist) * 1.42, 2.0)) * 0.90 + 0.14) * uBlastPeak;
  float backWeight = clamp(diskSubstrate + blastCoreBack, 0.0, 1.0);
  vec3 baseBack = bgTex.rgb * backWeight + C_OBSIDIAN * introOpaque * (1.0 - isPureCore);

  // Per-glyph Galaxy chromatic energy palette (10-step ' .:-^t+=T*')
  vec3 palGlyph;
  if (idx <= 2) {
    palGlyph = mix(C_SPACE, C_DEEP_PURPLE, idx == 2 ? 0.82 : 0.38);
  } else if (idx <= 4) {
    palGlyph = mix(C_DEEP_PURPLE, C_ACCENT, idx == 4 ? 0.84 : 0.36);
  } else if (idx <= 6) {
    palGlyph = mix(C_ACCENT, C_PERIWINKLE, idx == 6 ? 0.82 : 0.38);
  } else if (idx <= 8) {
    palGlyph = mix(C_PERIWINKLE, C_WHITE_CORE, idx == 8 ? 0.74 : 0.34);
  } else {
    palGlyph = mix(C_ICE_BLUE, C_WHITE_CORE, smoothstep(0.76, 0.98, shapedEnergy));
  }

  vec3 sceneTint = cell.rgb / max(cellLum, 0.08);
  vec3 warmColor = mix(C_WARM_CORONA, cell.rgb * 1.32, smoothstep(0.12, 0.55, shapedEnergy));
  vec3 coolColor = mix(palGlyph, clamp(palGlyph * 0.52 + cell.rgb * 0.96, 0.0, 1.0), 0.54);
  float iceCue = clamp((sceneTint.b - sceneTint.r) * 0.68, 0.0, 1.0);
  coolColor = mix(coolColor, C_ICE_BLUE, clamp(iceCue * 0.55 + ptrBoost * 0.75, 0.0, 0.88));
  if (idx == 9) {
    coolColor = mix(C_ICE_BLUE, C_WHITE_CORE, smoothstep(0.84, 0.98, shapedEnergy));
  }
  vec3 glyphColor = mix(coolColor, warmColor, uWarmTint);

  // Act III supernova blast glyphs shine in incandescent ice-blue & crisp white
  vec3 blastGlyphCol = mix(C_ICE_BLUE, vec3(0.99, 0.996, 1.0), smoothstep(0.45, 0.88, cellLum));
  glyphColor = mix(glyphColor, blastGlyphCol, uBlastPeak * 0.84);

  float glyphGate = smoothstep(0.018, 0.085, shapedEnergy) * (1.0 - isPureCore);
  float glyphAlpha = cov * glyphGate;
  vec3 sceneCol = mix(baseBack, glyphColor, glyphAlpha);

  // Enforce true pure #000000 inside uncovered event horizon shadow
  sceneCol *= (1.0 - isPureCore);

  // ---- High-Contrast Radiant Supernova T^minus Carve ----
  if (uWordmarkCarve > 0.001) {
    vec3 blastBack = mix(C_ICE_BLUE, vec3(1.0), 0.76);
    float wmBackLight = clamp((wmCov * 0.86 + wmHalo * 0.44) * uBlastPeak, 0.0, 0.95);
    sceneCol = mix(sceneCol, blastBack, wmBackLight * (1.0 - (isWordmarkCell ? cov : 0.0)));

    if (isWordmarkCell) {
      vec3 edgeInk = mix(C_DEEP_VOID, C_OBSIDIAN, 0.78);
      vec3 coreInk = vec3(0.0, 0.0, 0.0);
      vec3 glyphInk = mix(edgeInk, coreInk, smoothstep(0.34, 0.56, wmCov));
      glyphInk = mix(glyphInk, C_DEEP_VOID * 1.15, wmCaret * 0.18 * (1.0 - smoothstep(0.48, 0.70, wmCov)));

      float strokeStrength = smoothstep(0.20, 0.44, wmCov);
      float wmInkAlpha = clamp(cov * mix(0.90, 1.0, strokeStrength), 0.0, 1.0);
      sceneCol = mix(sceneCol, glyphInk, wmInkAlpha);
      glyphAlpha = max(glyphAlpha, wmInkAlpha);
    }
  }

  float settledAlpha = clamp(max(glyphAlpha, diskSubstrate * 2.15), 0.0, 1.0);
  float outAlpha = clamp(max(max(isPureCore, introOpaque), settledAlpha), 0.0, 1.0);
  if (uWordmarkCarve > 0.001 && wmCov > 0.14) {
    outAlpha = max(outAlpha, clamp(wmCov * uBlastPeak, 0.0, 1.0));
  }

  o = vec4(clamp(sceneCol, 0.0, 1.0) * outAlpha, outAlpha);
}`;

/**
 * Pass 4: Pre-Glyph Separable Bloom Blur (runs on `rtScene`, NEVER blurring `rtGlyph`)
 */
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
    float keep = smoothstep(uThreshold, uThreshold + 0.24, l);
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
 * Pass 5: Crisp-On-Top 2-Tier Volumetric Bloom Composite
 * - Reads 100% unblurred `rtGlyph` via exact `texelFetch`
 * - Combines 1/4-res tight bloom + 1/8-res wide atmospheric bloom
 * - Strictly masks bloom to 0.0 inside pure `#000000` event horizon core & dark carved `T^minus` strokes
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
uniform float uWordmarkCarve;
uniform float uGlow;

void main() {
  ivec2 px = ivec2(gl_FragCoord.xy);
  vec4 base = texelFetch(uBase, px, 0);
  vec3 halo = (texture(uBloom1, vUv).rgb * 0.68 + texture(uBloom2, vUv).rgb * 0.46) * uGlow;

  float maxRgb = max(base.r, max(base.g, base.b));
  float isPureCore = smoothstep(0.95, 0.995, base.a) * (1.0 - smoothstep(0.002, 0.012, maxRgb));

  float bloomAtten = 1.0 - isPureCore;
  if (uWordmarkCarve > 0.001) {
    vec2 cellUv = (floor(vUv * uGrid) + 0.5) / uGrid;
    vec2 subOff = 0.24 / uGrid;
    float wmCell = (
      texture(uWordmarkMask, cellUv + vec2(-subOff.x, -subOff.y)).r +
      texture(uWordmarkMask, cellUv + vec2( subOff.x, -subOff.y)).r +
      texture(uWordmarkMask, cellUv + vec2(-subOff.x,  subOff.y)).r +
      texture(uWordmarkMask, cellUv + vec2( subOff.x,  subOff.y)).r
    ) * 0.25 * uWordmarkCarve;
    bloomAtten *= (1.0 - smoothstep(0.18, 0.34, wmCell) * 0.94);
  }

  vec3 underHalo = halo * bloomAtten;
  float haloLum = dot(underHalo, vec3(0.2126, 0.7152, 0.0722));
  float haloAlpha = clamp(haloLum * 0.95, 0.0, 0.72);

  // Crisp unblurred ASCII characters preserved cleanly on top of volumetric 2-tier bloom
  vec3 outRgb = base.rgb + underHalo * (1.0 - base.a * 0.52);
  float outA = clamp(base.a + haloAlpha * (1.0 - base.a), 0.0, 1.0);

  outRgb *= (1.0 - isPureCore);
  outA = max(outA, isPureCore);

  o = vec4(clamp(outRgb, 0.0, 1.0), outA);
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
 * 1:1 Native-Pixel `IBM Plex Mono` WebGL2 Glyph Atlas (` .:-^t+=T*`):
 * - `row0Size = 0.92 * cellPxH` eliminates horizontal black Venetian-blind gaps.
 * - Row 0: crisp medium/semibold weight for the live 3D cosmic field.
 * - Row 1: bold `700` weight for the Act III supernova `T^minus` carve.
 */
function buildNativeGlyphAtlas(
  gl: WebGL2RenderingContext,
  existing: WebGLTexture | null,
  cellPxW: number,
  cellPxH: number,
  monoFamily: string
): WebGLTexture {
  const canvas = document.createElement("canvas");
  canvas.width = cellPxW * ASCII_RAMP.length;
  canvas.height = cellPxH * 2;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const row0Weight = cellPxH <= 14 ? 600 : 500;
  const row0Size = Math.max(7, Math.round(cellPxH * 0.92));
  ctx.font = `${row0Weight} ${row0Size}px ${monoFamily}`;
  for (let i = 0; i < ASCII_RAMP.length; i++) {
    ctx.fillText(
      ASCII_RAMP[i],
      Math.round((i + 0.5) * cellPxW),
      Math.round(cellPxH * 0.52)
    );
  }

  const row1Size = Math.max(8, Math.round(cellPxH * 0.96));
  ctx.font = `700 ${row1Size}px ${monoFamily}`;
  for (let i = 0; i < ASCII_RAMP.length; i++) {
    ctx.fillText(
      ASCII_RAMP[i],
      Math.round((i + 0.5) * cellPxW),
      Math.round(cellPxH * 1.52)
    );
  }

  const tex = existing ?? gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
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
  glyph: "*" | "+" | "^" | "-" | ".";
  phase: number;
  speed: number;
  sizeCss: 10 | 12;
  tint: "periwinkle" | "accent" | "ice";
  crestDist: number;
}

function createStarfield(count: number): StarSpec[] {
  const glyphs: Array<"*" | "+" | "^" | "-" | "."> = ["*", "+", "^", "-", "."];
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
      sizeCss: rand() > 0.62 ? 12 : 10,
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
  const monoProbeRef = useRef<HTMLSpanElement | null>(null);
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

    const starCtx = starCanvas.getContext("2d");
    const stars = createStarfield(104);

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

    let monoFamily = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
    if (monoProbeRef.current) {
      monoFamily = window.getComputedStyle(monoProbeRef.current).fontFamily;
    }

    let atlasTex: WebGLTexture | null = null;
    let lastAtlasCellW = 0;
    let lastAtlasCellH = 0;
    let lastAtlasFont = "";

    let wordmarkTex: WebGLTexture | null = null;
    let lastMaskCssW = 0;
    let lastMaskCssH = 0;

    let cw = 0;
    let ch = 0;
    let cssWGlobal = 1440;
    let cssHGlobal = 900;
    let dprGlobal = 2.0;
    let cols = 248;
    let rows = 115;
    let cellPxW = 12;
    let cellPxH = 16;
    let gridOriginX = 0;
    let gridOriginY = 0;
    let adaptiveDegraded = false;
    let lastSceneScale = 0.5;
    let rtScene: RenderTarget | null = null;
    let rtCell: RenderTarget | null = null;
    let rtGlyph: RenderTarget | null = null;
    let rtB1A: RenderTarget | null = null;
    let rtB1B: RenderTarget | null = null;
    let rtB2A: RenderTarget | null = null;
    let rtB2B: RenderTarget | null = null;

    const syncBuffers = (forceAtlas = false) => {
      const rect = glCanvas.getBoundingClientRect();
      const cssW = Math.max(1, Math.round(rect.width));
      const cssH = Math.max(1, Math.round(rect.height));
      const isMobile = cssW < 640;
      const isTablet = cssW >= 640 && cssW < 1024;
      // Strict DPR <= 2.0 cap across mobile & desktop
      const dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), 2.0);
      const nw = Math.max(2, Math.round(cssW * dpr));
      const nh = Math.max(2, Math.round(cssH * dpr));

      cssWGlobal = cssW;
      cssHGlobal = cssH;
      dprGlobal = dpr;

      if (starCanvas.width !== nw || starCanvas.height !== nh) {
        starCanvas.width = nw;
        starCanvas.height = nh;
      }

      if (monoProbeRef.current) {
        monoFamily = window.getComputedStyle(monoProbeRef.current).fontFamily;
      }

      // Fine near-square physical ASCII cells (eliminates Venetian-blind striping completely)
      const cellCssW = isMobile ? 4.5 : isTablet ? 5.2 : 5.8;
      const cellCssH = isMobile ? 6.5 : isTablet ? 7.2 : 7.8;
      const nCellPxW = Math.max(5, Math.round(cellCssW * dpr));
      const nCellPxH = Math.max(7, Math.round(cellCssH * dpr));
      const nCols = Math.max(64, Math.floor(nw / nCellPxW));
      const nRows = Math.max(48, Math.floor(nh / nCellPxH));
      const nOriginX = Math.floor((nw - nCols * nCellPxW) * 0.5);
      const nOriginY = Math.floor((nh - nRows * nCellPxH) * 0.5);

      const sceneScale = adaptiveDegraded ? 0.36 : isMobile ? 0.44 : 0.52;

      if (
        forceAtlas ||
        !atlasTex ||
        nCellPxW !== lastAtlasCellW ||
        nCellPxH !== lastAtlasCellH ||
        monoFamily !== lastAtlasFont
      ) {
        lastAtlasCellW = nCellPxW;
        lastAtlasCellH = nCellPxH;
        lastAtlasFont = monoFamily;
        atlasTex = buildNativeGlyphAtlas(
          gl,
          atlasTex,
          nCellPxW,
          nCellPxH,
          monoFamily
        );
      }

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
        nCellPxW === cellPxW &&
        nCellPxH === cellPxH &&
        sceneScale === lastSceneScale &&
        rtScene
      ) {
        return;
      }

      cw = nw;
      ch = nh;
      cols = nCols;
      rows = nRows;
      cellPxW = nCellPxW;
      cellPxH = nCellPxH;
      gridOriginX = nOriginX;
      gridOriginY = nOriginY;
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
      rtGlyph = createRT(gl, cw, ch, gl.NEAREST);
      rtB1A = createRT(gl, b1W, b1H, gl.LINEAR);
      rtB1B = createRT(gl, b1W, b1H, gl.LINEAR);
      rtB2A = createRT(gl, b2W, b2H, gl.LINEAR);
      rtB2B = createRT(gl, b2W, b2H, gl.LINEAR);
    };

    let disposed = false;
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready
        .then(() => {
          if (disposed) return;
          if (cssWGlobal > 0 && cssHGlobal > 0) {
            wordmarkTex = buildWordmarkMaskTexture(
              gl,
              wordmarkTex,
              cssWGlobal,
              cssHGlobal
            );
            syncBuffers(true);
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
    let lastPulseEdgeSec = -1;
    let lastPulseTriggerPerfMs = 0;

    // Optional deterministic QA pin: ?introAt=1.0 | 3.35 | 4.22 | 5.85 | 8.2 | 9.25
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

      const glowY = cssHGlobal * mixNum(0.84, 0.09, pin) * dpr;
      const glowRad =
        Math.max(cssWGlobal, cssHGlobal) * mixNum(0.28, 0.16, pin) * dpr;
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
        `rgba(78, 20, 140, ${(mixNum(0.04, 0.022, pin) * settle).toFixed(3)})`
      );
      grad.addColorStop(1, "rgba(4, 2, 6, 0)");
      starCtx.fillStyle = grad;
      starCtx.fillRect(0, 0, starCanvas.width, starCanvas.height);

      starCtx.textAlign = "center";
      starCtx.textBaseline = "middle";

      const font10 = `500 ${Math.round(10 * dpr)}px ${monoFamily}`;
      const font12 = `500 ${Math.round(12 * dpr)}px ${monoFamily}`;

      if (starWave > 0.005) {
        const calmBelowFold = mixNum(1.0, 0.62, pin);
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
          const twinkle = 0.45 + 0.55 * Math.sin(tSec * st.speed + st.phase);
          const alpha = clamp01(
            (0.16 + 0.32 * twinkle) * calmBelowFold * localAppear
          );

          starCtx.font = st.sizeCss === 12 ? font12 : font10;
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
        const cursorGlyphs = [".", ":", "-", "^", "t", "+", "=", "T", "*"];
        const ptrCssX = pointerX * cssWGlobal;
        const ptrCssY = (1 - pointerY) * cssHGlobal;
        const gridCss = 18;
        const radiusCss = 104;
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
              0.78 + 0.22 * Math.sin(tSec * 2.4 + col * 0.65 + row * 0.48);
            const alpha = Math.min(0.32, falloff * shimmer * fieldFade * 0.36);
            if (alpha < 0.012) continue;

            const cellSeed = (col * 17 + row * 31) & 63;
            const cyclePos =
              tSec * 2.3 + cellSeed * 0.37 - (dist / radiusCss) * 2.2;
            const glyphIdx =
              ((Math.floor(cyclePos) % cursorGlyphs.length) +
                cursorGlyphs.length) %
              cursorGlyphs.length;
            const glyph = cursorGlyphs[glyphIdx];

            starCtx.font = falloff > 0.55 ? font12 : font10;
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
      if (!adaptiveDegraded && dtEma > 0.024) {
        overBudgetSec += dt;
        if (overBudgetSec > 2.2) {
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

      const scrollDt = Math.min(0.18, rawDt);
      smoothedPin += (rawPin - smoothedPin) * Math.min(1, scrollDt * 14.0);
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
        !rtB2B ||
        !atlasTex
      ) {
        return;
      }

      const tSec = pinnedIntroAt !== null ? pinnedIntroAt : ts * 0.001;
      const isMobile = cssWGlobal < 768;
      const viewAsp = cw / Math.max(1, ch);
      const tanHalfFov = Math.tan(degToRad(23)); // 46 deg vertical FOV

      // =====================================================================
      // 1) ACT I -> V TIMING
      // =====================================================================
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

      const bhBirth = smoothstep(4.65, 5.38, introElapsed);
      const diskBirth = smoothstep(4.72, 5.6, introElapsed);

      const jetBreakout = smoothstep(3.32, 3.78, introElapsed);
      const jetFade = 1.0 - smoothstep(6.25, 7.45, introElapsed);
      const jetPower =
        jetBreakout * (1.0 + charge * 0.65 + blastPeak * 0.35) * jetFade;

      const settle = easeInOutQuint(clamp01((introElapsed - 6.6) / 2.4));

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
      // 2) 3D ORBITAL CAMERA + HERO ARC CLEARANCE + SLIM DOCKED TOP DOME
      // =====================================================================
      // Generous hero clearance at bottom (pin=0) + slim <=122px top dome (pin=1)
      const bottomApex = isMobile ? 0.198 : 0.214;
      const topApex = isMobile ? 0.086 : 0.068;

      const distBottom = isMobile ? 2.08 : 1.62;
      const alphaBottom = Math.asin(1 / distBottom);
      const topLimbAngleBottom = Math.atan(
        (-1 + 2 * bottomApex) * tanHalfFov
      );
      const pitchBottom = alphaBottom - topLimbAngleBottom;

      const distTop = isMobile ? 2.34 : 2.15;
      const alphaTop = Math.asin(1 / distTop);
      const botLimbAngleTop = Math.atan((1 - 2 * topApex) * tanHalfFov);
      const pitchTop = -(botLimbAngleTop + alphaTop);

      // Enlarged polar core aperture for Space-Filling Polar Chronograph
      const targetPolarRadiusPx = isMobile
        ? Math.min(cssWGlobal * 0.395, cssHGlobal * 0.195)
        : Math.min(cssWGlobal * 0.19, cssHGlobal * 0.285);
      const polarTanAlpha =
        (targetPolarRadiusPx / (cssHGlobal * 0.5)) * tanHalfFov;
      const polarAlpha = Math.atan(Math.max(0.08, polarTanAlpha));
      const distPolarClamped = Math.max(
        3.4,
        Math.min(7.8, 1 / Math.sin(polarAlpha))
      );

      const s = smoothedPin;
      const segLift = smoothstep(0.0, 0.28, s);
      const segPlateau = clamp01((s - 0.28) / (0.66 - 0.28));
      const segDock = smoothstep(0.66, 1.0, s);

      const polarFactor =
        smoothstep(0.14, 0.3, s) * (1.0 - smoothstep(0.64, 0.84, s)) * settle;

      // =====================================================================
      // 2b) POLAR-ONLY UTC-SYNCED 1-SECOND ESCAPEMENT PULSE
      // Strictly 0 on settled hero (pin=0) and slim top dome (pin=1).
      // Shares exact `(LAUNCH_TARGET_MS - Date.now())` boundary with HorizonCountdown.
      // 40ms fast attack + 320ms smooth exponential decay.
      // =====================================================================
      const polarGate = smoothstep(0.55, 0.9, polarFactor);
      let tickPulse = 0.0;
      let tickProg = 0.0;
      let tickElapsedSinceEdgeMs = 0;
      if (
        !reducedMotion &&
        settle > 0.5 &&
        polarGate > 0.001 &&
        pinnedIntroAt === null
      ) {
        const nowMs = Date.now();
        const remMs = Math.max(0, LAUNCH_TARGET_MS - nowMs);
        const curWholeSec = Math.floor(remMs / 1000);
        tickElapsedSinceEdgeMs = remMs > 0 ? 999 - (remMs % 1000) : 0;

        if (curWholeSec !== lastPulseEdgeSec) {
          lastPulseEdgeSec = curWholeSec;
          lastPulseTriggerPerfMs = performance.now() - tickElapsedSinceEdgeMs;
        }

        const totalWindowMs = 360; // 40ms attack + 320ms exponential decay
        if (tickElapsedSinceEdgeMs < totalWindowMs) {
          tickProg = tickElapsedSinceEdgeMs / totalWindowMs;
          const env =
            tickElapsedSinceEdgeMs < 40
              ? smoothstep(0, 40, tickElapsedSinceEdgeMs)
              : Math.exp(-((tickElapsedSinceEdgeMs - 40) / 115));
          const tailCut = 1.0 - smoothstep(285, 360, tickElapsedSinceEdgeMs);
          tickPulse = env * tailCut * polarGate;
        }
      }

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

      const bottomOuterR = Math.min(camDist * 0.72, isMobile ? 1.38 : 1.28);
      const dockedOuterR = Math.min(camDist * 0.66, isMobile ? 1.22 : 1.18);
      const horizonOuterR = mixNum(bottomOuterR, dockedOuterR, segDock);
      const settledOuterR = mixNum(horizonOuterR, 5.6, polarFactor);
      const diskOuterR = mixNum(5.2, settledOuterR, settle);

      // =====================================================================
      // 3) EXACT 3D-TO-DOM COUNTDOWN & SLIM LAYER 20 CURVED PRE-RIM VEIL SYNC
      // =====================================================================
      const bottomCountdownY = cssHGlobal * (1.0 - bottomApex * 0.45);
      const topCountdownY = isMobile ? 34 : 31;
      const polarCenterY = cssHGlobal * 0.5;
      const cdBaseY = mixNum(
        bottomCountdownY,
        topCountdownY,
        smoothstep(0.0, 1.0, s)
      );
      const countdownCenterY = mixNum(cdBaseY, polarCenterY, polarFactor);

      const countdownScale = mixNum(
        1.0,
        isMobile ? 0.6 : 0.64,
        smoothstep(0.0, 1.0, s)
      );

      const projSinAlpha = clamp01(1 / Math.max(1.05, camDist));
      const projTanAlpha = Math.tan(Math.asin(projSinAlpha));
      const polarRadiusNowPx = (projTanAlpha / tanHalfFov) * (cssHGlobal * 0.5);
      const polarDiameterPx = Math.max(160, polarRadiusNowPx * 2.0);

      let domeCenterX = cssWGlobal * 0.5;
      let domeCenterY = -cssHGlobal * 0.6;
      let domeRadiusPx = cssHGlobal * 0.75;
      let domeEdgeY = 36;
      let domeApexRimY = 0;

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
          1.08
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
          1.08
        );
        const halfChordX = edgeNdcX * (cssWGlobal * 0.5);
        const sagitta = Math.max(8, rimCenterY - rimEdgeY);
        const radius =
          (halfChordX * halfChordX + sagitta * sagitta) / (2 * sagitta);
        domeCenterX = cssWGlobal * 0.5;
        domeRadiusPx = radius;
        domeCenterY = rimCenterY - radius;
        domeEdgeY = rimEdgeY;
        domeApexRimY = rimCenterY;
      }

      onSyncRef.current?.({
        pinProgress: s,
        settleProgress: settle,
        polarFactor,
        polarDiameterPx,
        heroResolved: isResolvedNow,
        countdownCenterY,
        countdownScale,
        domeCenterX,
        domeCenterY,
        domeRadiusPx,
        domeEdgeY,
        viewportW: cssWGlobal,
      });

      if (typeof window !== "undefined") {
        (
          window as unknown as Record<string, unknown>
        ).__TMINUS_BH_TELEMETRY__ = {
          fps: Number((1 / Math.max(0.001, dtEma)).toFixed(1)),
          frameMs: Number((dtEma * 1000).toFixed(2)),
          degraded: adaptiveDegraded,
          cols,
          rows,
          cellPxW,
          cellPxH,
          dpr: dprGlobal,
          introElapsed: Number(introElapsed.toFixed(3)),
          resolveElapsed: Number(resolveElapsed.toFixed(3)),
          heroResolved: isResolvedNow,
          pinProgress: Number(s.toFixed(4)),
          polarFactor: Number(polarFactor.toFixed(4)),
          polarGate: Number(polarGate.toFixed(4)),
          tickPulse: Number(tickPulse.toFixed(4)),
          tickProg: Number(tickProg.toFixed(4)),
          tickElapsedSinceEdgeMs,
          pulseEdgeWholeSec: lastPulseEdgeSec,
          lastPulseTriggerPerfMs: Number(lastPulseTriggerPerfMs.toFixed(2)),
          polarDiameterPx: Math.round(polarDiameterPx),
          domeApexRimY: Math.round(domeApexRimY),
          domeEdgeY: Math.round(domeEdgeY),
          elevDeg: Number(((elevRad * 180) / Math.PI).toFixed(1)),
        };
      }

      if (ts - lastBgDraw > 32) {
        lastBgDraw = ts;
        drawBackgroundField(tSec, s, settle, starWave);
      }

      gl.disable(gl.BLEND);

      // ---- PASS 1: Analytic 3D Cosmic Scene ----
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
      gl.uniform1f(pScene.u.uTickPulse, tickPulse);
      gl.uniform1f(pScene.u.uTickProg, tickProg);
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

      // ---- PASS 2: Grid-Aligned 4-Tap AA Cell Downsample ----
      setTarget(rtCell);
      gl.useProgram(pCell.prog);
      bindTex(0, rtScene.tex, pCell.u.uBg);
      gl.uniform2f(pCell.u.uBgInv, 1.0 / rtScene.w, 1.0 / rtScene.h);
      gl.uniform2f(pCell.u.uGridOrigin, gridOriginX, gridOriginY);
      gl.uniform2f(pCell.u.uCellPx, cellPxW, cellPxH);
      gl.uniform2f(pCell.u.uCanvasPx, cw, ch);
      gl.uniform2f(pCell.u.uGrid, cols, rows);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // ---- PASS 3: 1:1 Native-Pixel Hybrid Luminous ASCII Fragment Pass ----
      setTarget(rtGlyph);
      gl.useProgram(pGlyph.prog);
      bindTex(0, rtCell.tex, pGlyph.u.uCell);
      bindTex(1, rtScene.tex, pGlyph.u.uBg);
      bindTex(2, atlasTex, pGlyph.u.uAtlas);
      if (wordmarkTex) {
        bindTex(3, wordmarkTex, pGlyph.u.uWordmarkMask);
      }
      gl.uniform2i(pGlyph.u.uGrid, cols, rows);
      gl.uniform2i(pGlyph.u.uCellPx, cellPxW, cellPxH);
      gl.uniform2i(pGlyph.u.uGridOrigin, gridOriginX, gridOriginY);
      gl.uniform2f(pGlyph.u.uCanvasPx, cw, ch);
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

      // ---- PASS 4: 2-Tier Volumetric Bloom (Strictly on rtScene, NEVER on rtGlyph) ----
      gl.useProgram(pBlur.prog);
      // Tier 1: 1/4-res tight luminous halo
      setTarget(rtB1A);
      bindTex(0, rtScene.tex, pBlur.u.uTex);
      gl.uniform2f(pBlur.u.uDir, 1.65 / rtB1A.w, 0.0);
      gl.uniform1f(pBlur.u.uThreshold, 0.34);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      setTarget(rtB1B);
      bindTex(0, rtB1A.tex, pBlur.u.uTex);
      gl.uniform2f(pBlur.u.uDir, 0.0, 1.65 / rtB1B.h);
      gl.uniform1f(pBlur.u.uThreshold, 0.0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // Tier 2: 1/8-res wide atmospheric cosmic bloom
      setTarget(rtB2A);
      bindTex(0, rtB1B.tex, pBlur.u.uTex);
      gl.uniform2f(pBlur.u.uDir, 2.25 / rtB2A.w, 0.0);
      gl.uniform1f(pBlur.u.uThreshold, 0.0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      setTarget(rtB2B);
      bindTex(0, rtB2A.tex, pBlur.u.uTex);
      gl.uniform2f(pBlur.u.uDir, 0.0, 2.25 / rtB2B.h);
      gl.uniform1f(pBlur.u.uThreshold, 0.0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // ---- PASS 5: Crisp-On-Top 2-Tier Volumetric Composite ----
      setTarget(null);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(pComp.prog);
      bindTex(0, rtGlyph.tex, pComp.u.uBase);
      bindTex(1, rtB1B.tex, pComp.u.uBloom1);
      bindTex(2, rtB2B.tex, pComp.u.uBloom2);
      if (wordmarkTex) {
        bindTex(3, wordmarkTex, pComp.u.uWordmarkMask);
      }
      gl.uniform2f(pComp.u.uGrid, cols, rows);
      gl.uniform1f(pComp.u.uWordmarkCarve, wordmarkCarve);
      // Calibrated 2-tier volumetric bloom + radiant supernova boost + polar-only tick lift
      const glowAmount =
        mixNum(0.46, 0.52, settle) +
        starVis * 0.14 +
        ejecta * 0.16 +
        blastPeak * 0.36 +
        lockPulse * 0.1 +
        tickPulse * 0.18;
      gl.uniform1f(pComp.u.uGlow, glowAmount);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    rafId = window.requestAnimationFrame(frame);

    return () => {
      disposed = true;
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
      if (atlasTex) gl.deleteTexture(atlasTex);
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
      <span
        ref={monoProbeRef}
        aria-hidden="true"
        className="pointer-events-none sr-only font-mono"
      >
        T
      </span>
      <canvas
        ref={starCanvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      />
      <canvas
        ref={glCanvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 h-full w-full"
      />
    </>
  );
}
