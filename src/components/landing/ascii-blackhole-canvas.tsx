"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { drawWordmarkMaskCanvas } from "@/components/landing/t-minus-wordmark";
import { LAUNCH_TARGET_MS } from "@/lib/waitlist";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Shared scroll & 3D camera telemetry published every animation frame so
 * `HorizonCountdown`, hero lift-off, Layer 20 curved pre-rim veil,
 * perimeter telemetry HUD, vernier rail, and the polar 60-tick bezel
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
  /** True strictly once the hero is ready to emerge */
  heroResolved: boolean;
  /** Screen Y (px from top) where the countdown centers inside the pure #000000 core */
  countdownCenterY: number;
  /** Scale factor for Horizon Strip mode (1.0 bottom -> 0.64/0.58 slim top dome) */
  countdownScale: number;
  /** Exact 3D-projected top-dome circle in CSS px for the slim Layer 20 curved pre-rim veil */
  domeCenterX: number;
  domeCenterY: number;
  domeRadiusPx: number;
  /** Rim Y at viewport edges (px from top) for upper-corner backing */
  domeEdgeY: number;
  /** Current viewport width in CSS px */
  viewportW: number;
  /** Current intro clock (0..9.90s) for perimeter HUD phase telemetry */
  introElapsed: number;
  /** Current 3D orbital camera elevation in degrees (26° -> 88° -> 154°) */
  elevDeg: number;
  /** Current orbital scroll azimuth in degrees (counter-rotates UI-3 outer bezel ring) */
  scrollAzimDeg: number;
  /** Live polar UTC 1-second escapement pulse (0..1) */
  tickPulse: number;
  /** Live polar UTC 1-second escapement wave progress (0..1) */
  tickProg: number;
}

export interface AsciiBlackholeControl {
  /** Immediately resolves the intro into the settled hero horizon with lock pulse */
  skipIntro: () => void;
  /** Smoothly replays the full 9.90s stellar evolution -> black hole sequence from t = 0 */
  replayIntro: () => void;
  /** Triggers subtle horizon ripple (toggle/typing) or full gravitational shockwave (waitlist submit) */
  pulseHorizon: (kind: "subtle" | "shockwave") => void;
}

interface AsciiBlackholeCanvasProps {
  onHeroReveal: (revealed: boolean) => void;
  onHorizonSync?: (state: HorizonSyncState) => void;
  /** Reference to the native CSS sticky scroll runway wrapper */
  runwayRef?: React.RefObject<HTMLDivElement | null>;
  /** Imperative control handle for SKIP ->, REPLAY, and waitlist gravitational pulses */
  controlRef?: React.MutableRefObject<AsciiBlackholeControl | null>;
  skipIntro?: boolean;
}

/**
 * Strict 7-step T^minus ASCII glyph ramp (` .:-^tT`).
 * Clean optical density progression without cluttered `* + =` static.
 */
const ASCII_RAMP = " .:-^tT";

// ---- Part A: Realistic Stellar Evolution -> Growing Black Hole (9.90s Total) ----
const INTRO_TOTAL_SEC = 9.9;
const HERO_REVEAL_SEC = 9.9;

const VS_QUAD = `#version 300 es
precision highp float;
out vec2 vUv;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

/**
 * Pass 1: Analytic 3D Red-Supergiant Swell -> Runaway Core Collapse ->
 *         Multi-Shell Core-Bounce Supernova -> Growing Pinpoint Black Hole
 *         + Spiral Fallback Accretion Disk + 3D Helical Polar Jets
 *         + Polar-Only UTC 1-Second Escapement Pulse + Waitlist Coupling
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

// Act I -> IV stellar evolution & black hole nucleation uniforms
uniform float uStarVis;
uniform float uStarRadius;
uniform float uStarSwell;
uniform float uStarSpinPhase;
uniform float uPinch;
uniform float uStarShift;
uniform float uStarCrack;
uniform float uImplode;
uniform float uEjecta;
uniform float uEjectaProg;
uniform float uBhBirth;
uniform float uBhRadius;
uniform float uFallback;
uniform float uFallbackProg;
uniform float uDiskBirth;
uniform float uLockPulse;
uniform float uLockWaveProg;

// Waitlist gravitational coupling (UI-2)
uniform float uUiRipple;
uniform float uUiShock;
uniform float uUiShockProg;

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

// Initial Warm-White Star -> Bloated Amber-Copper Red Supergiant Palette
const vec3 C_STAR_CORE   = vec3(1.0000, 0.9725, 0.9098); // #FFF8E8
const vec3 C_STAR_MID    = vec3(0.9216, 0.7882, 0.5961); // #EBC998
const vec3 C_STAR_LIMB   = vec3(0.5608, 0.3412, 0.2157); // #8F5737
const vec3 C_STAR_CORONA = vec3(0.9412, 0.7804, 0.5647); // #F0C790
const vec3 C_SG_MID      = vec3(0.8510, 0.5098, 0.2941); // #D9824B
const vec3 C_SG_LIMB     = vec3(0.5608, 0.2392, 0.1569); // #8F3D28
const vec3 C_SG_CORONA   = vec3(0.9176, 0.5490, 0.3176); // #EA8C51

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

float starTurbulence(vec3 p, float t, float swell) {
  float scale = mix(1.0, 0.72, swell);
  vec3 q = p * scale;
  float a = sin(q.x * 5.0 + t * 0.88) * cos(q.y * 5.4 - t * 0.74) * sin(q.z * 5.2 + t * 0.62);
  float b = sin((q.x + q.z) * 8.4 - t * 1.38) * cos((q.y - q.x) * 9.0 + t * 1.15);
  float c = cos((q.y + q.z) * 14.0 + t * 2.05) * sin((q.x - q.y * 0.7) * 12.6 - t * 1.68);
  return 0.5 + 0.32 * a + 0.18 * b + 0.10 * c;
}

vec4 evalDyingStar(vec3 ro, vec3 rd, vec3 closestPt, float b, float tc, float pixelAA) {
  if (uStarVis <= 0.002 || tc <= 0.0) return vec4(0.0);

  float Rbase = max(0.09, uStarRadius);
  vec2 planeXY = vec2(dot(closestPt, uCamRight), dot(closestPt, uCamUp));
  float ang = atan(planeXY.y, planeXY.x);

  // Subtle equatorial oblateness as angular momentum spikes during collapse
  vec2 oblateXY = vec2(
    planeXY.x / (1.0 + uPinch * 0.14),
    planeXY.y / (1.0 - uPinch * 0.11)
  );
  float bEval = mix(b, length(oblateXY), uPinch);

  // Convective red-supergiant limb ripples (+-3.2%) driven by uStarSwell
  float limbRipple = (
    0.019 * sin(ang * 5.0 + uStarSpinPhase * 1.35 + uTime * 1.1) +
    0.013 * cos(ang * 9.0 - uStarSpinPhase * 1.9 + 0.7)
  ) * uStarSwell;
  float R = Rbase * (1.0 + limbRipple);
  float pulseWave = 0.5 + 0.5 * sin(uTime * 8.5 + ang * 3.0);

  // Act 1 red-supergiant palette (#FFF8E8 -> #D9824B -> #8F3D28) -> Act 2 shock blueshift (#F7FAFF -> #97DFFC)
  vec3 warmMid = mix(C_STAR_MID, C_SG_MID, uStarSwell);
  vec3 warmLimb = mix(C_STAR_LIMB, C_SG_LIMB, uStarSwell);
  vec3 warmCorona = mix(C_STAR_CORONA, C_SG_CORONA, uStarSwell);

  vec3 corePal = mix(C_STAR_CORE, C_WHITE_CORE, uStarShift);
  vec3 midPal = mix(warmMid, mix(C_ICE_BLUE, C_WHITE_CORE, 0.42), uStarShift);
  vec3 limbPal = mix(warmLimb, mix(C_DEEP_PURPLE, C_ACCENT, 0.58), uStarShift);
  vec3 coronaPal = mix(warmCorona, mix(C_ICE_BLUE, C_PERIWINKLE, 0.44), uStarShift);

  vec3 starCol = vec3(0.0);
  float starAlpha = 0.0;

  float sphereMask = 1.0 - smoothstep(R - pixelAA * 1.5, R + pixelAA * 1.5, bEval);
  if (bEval < R + pixelAA * 2.0) {
    float zHalf = sqrt(max(0.0, R * R - min(bEval, R) * min(bEval, R)));
    vec3 pHit = ro + (tc - zHalf) * rd;
    vec3 N = normalize(pHit);

    // Smooth CPU-integrated angular momentum spin-up (zero phase discontinuity)
    float cs = cos(uStarSpinPhase);
    float sn = sin(uStarSpinPhase);
    vec3 Nr = vec3(N.x * cs + N.z * sn, N.y, -N.x * sn + N.z * cs);

    float gran = starTurbulence(Nr, uTime * (0.95 + uStarCrack * 0.85), uStarSwell);
    float hotCells = smoothstep(0.42, 0.86, gran);
    float darkLanes = smoothstep(0.54, 0.14, gran);

    // Giant asymmetric convective supergiant plumes + surface crust fissures
    float swellAsym = mix(1.0, 0.82 + 0.28 * sin(Nr.x * 2.8 + Nr.y * 2.1 + 0.5), uStarSwell * (1.0 - uStarShift));
    float f1 = abs(sin(Nr.x * 9.2 + Nr.y * 6.0 + uStarSpinPhase * 0.7) + cos(Nr.z * 8.2 - Nr.y * 6.8));
    float f2 = abs(cos(Nr.y * 10.8 - Nr.z * 7.5 - uStarSpinPhase * 0.9) + sin(Nr.x * 9.8 + Nr.z * 6.2));
    float crackMask = (1.0 - smoothstep(0.02, 0.22, min(f1, f2))) * uStarCrack;
    crackMask *= (0.68 + 0.32 * pulseWave);

    float ndotv = clamp(dot(N, -rd), 0.0, 1.0);
    float limbExp = mix(0.76, 1.26, uStarSwell) * (1.0 - uStarShift * 0.36);
    float limbDark = pow(ndotv, limbExp) * swellAsym;
    float rimFlare = pow(1.0 - ndotv, 3.0) * (0.40 + 0.30 * uStarSwell + 0.48 * uStarCrack);

    vec3 surfCol = mix(limbPal, midPal, clamp(limbDark * 0.82 + hotCells * 0.38, 0.0, 1.0));
    surfCol = mix(surfCol, corePal, smoothstep(0.50, 0.92, limbDark * 0.62 + hotCells * 0.50));
    surfCol *= (1.0 - darkLanes * mix(0.50, 0.62, uStarSwell) * (1.0 - uStarShift * 0.42));

    vec3 warmCrackCol = mix(C_STAR_CORE, vec3(1.0, 0.86, 0.62), 0.35);
    vec3 shockCrackCol = mix(C_ICE_BLUE, C_WHITE_CORE, 0.55);
    vec3 crackCol = mix(warmCrackCol, shockCrackCol, smoothstep(0.08, 0.68, uStarShift));
    surfCol = mix(surfCol, crackCol * 1.18, clamp(crackMask * 0.92, 0.0, 0.96));
    surfCol += mix(coronaPal, C_ICE_BLUE, 0.36 + 0.64 * uStarShift) * rimFlare * 0.88;

    float compressBoost = 1.0 + uStarSwell * 0.08 + uImplode * 0.46 + uCharge * 0.82;
    starCol = surfCol * compressBoost * sphereMask;
    starAlpha = max(starAlpha, sphereMask);
  }

  // Corona + Solar-flare prominence loops lifting outward (0.22R -> 0.58R)
  float distOut = max(0.0, bEval - R);
  float coronaScale = max(0.24, Rbase * mix(0.42, 0.64, uStarSwell));
  float normOut = distOut / coronaScale;
  if (normOut < 3.4) {
    float streamA = 0.5 + 0.5 * cos(ang * 6.0 - uTime * 0.95 + distOut * 2.0);
    float streamB = 0.5 + 0.5 * cos(ang * 11.0 + uTime * 1.35 - distOut * 2.6);
    float streamers = pow(max(streamA, streamB * 0.85), 2.7);

    // Prominence magnetic arcs lift outward from 0.22R to 0.58R as the supergiant swells
    float loopLiftR = mix(0.22, 0.58, uStarSwell) * Rbase;
    float loopArcA = abs(sin(ang * 3.0 + uStarSpinPhase * 0.55));
    float loopArcB = abs(sin(ang * 5.0 - uStarSpinPhase * 0.72 + 1.1));
    float loopHeightA = loopLiftR * pow(loopArcA, 0.75);
    float loopHeightB = loopLiftR * 0.76 * pow(loopArcB, 0.85);
    float loopBandA = exp(-pow((distOut - loopHeightA) / max(0.055, Rbase * 0.075), 2.0))
      * smoothstep(0.18, 0.88, loopArcA)
      * smoothstep(0.38, 0.86, 0.5 + 0.5 * cos(ang * 3.0 - 0.6 + uStarSpinPhase * 0.35));
    float loopBandB = exp(-pow((distOut - loopHeightB) / max(0.048, Rbase * 0.068), 2.0))
      * smoothstep(0.22, 0.90, loopArcB)
      * smoothstep(0.46, 0.90, 0.5 + 0.5 * cos(ang * 5.0 + 1.4 - uStarSpinPhase * 0.45));
    float promArc = clamp(loopBandA + loopBandB * 0.75, 0.0, 1.25)
      * (1.0 - sphereMask) * (0.48 + 0.58 * uStarSwell + 0.34 * uStarCrack);

    float innerCorona = exp(-normOut * mix(4.2, 3.3, uStarSwell)) * (0.46 + 0.54 * streamers) * (1.0 - sphereMask * 0.86);
    float outerHalo = exp(-normOut * 1.95) * (0.10 + 0.16 * streamers) * (1.0 - sphereMask * 0.94);
    float outerCut = 1.0 - smoothstep(2.0, 3.2, normOut);

    vec3 cInner = mix(coronaPal, corePal, 0.34);
    vec3 cProm = mix(mix(C_SG_CORONA, C_STAR_CORE, 0.38), C_ICE_BLUE, uStarShift);
    vec3 cOuter = mix(mix(warmLimb * 0.76, C_DEEP_PURPLE, uStarShift), C_ICE_BLUE, uStarCrack * 0.46 * uStarShift);
    vec3 coronaRgb = (cInner * innerCorona * 0.80 + cProm * promArc * 0.86 + cOuter * outerHalo) * outerCut;

    starCol += coronaRgb * (1.0 + uImplode * 0.36 + uCharge * 0.62);
    starAlpha = max(starAlpha, clamp((innerCorona * 0.85 + promArc * 0.82 + outerHalo * 0.42) * outerCut, 0.0, 1.0));
  }

  return vec4(starCol * uStarVis, clamp(starAlpha * uStarVis, 0.0, 1.0));
}

vec4 evalImplosionStreams(vec3 closestPt, float b, float tc) {
  if (uImplode <= 0.002 || tc <= 0.0) return vec4(0.0);

  vec2 planeXY = vec2(dot(closestPt, uCamRight), dot(closestPt, uCamUp));
  float ang = atan(planeXY.y, planeXY.x);
  float logB = log(max(b, 0.06));

  // Inward radial velocity accelerates as core radius plunges
  float rushRate = 1.0 + (1.0 - clamp(uStarRadius / 1.6, 0.0, 1.0)) * 1.45;
  float armA = pow(0.5 + 0.5 * cos(ang * 12.0 + logB * 3.8 + uStarSpinPhase * 1.2), 4.6);
  float armB = pow(0.5 + 0.5 * cos(ang * 19.0 - logB * 4.5 - uStarSpinPhase * 0.95 + 1.1), 5.2);
  float dashA = smoothstep(0.30, 0.86, 0.5 + 0.5 * cos(logB * 15.0 + uTime * 12.5 * rushRate + ang * 2.0));
  float dashB = smoothstep(0.36, 0.90, 0.5 + 0.5 * cos(logB * 21.0 + uTime * 15.5 * rushRate - ang * 3.0));

  float radialEnv = smoothstep(max(0.07, uStarRadius * 0.62), max(0.20, uStarRadius * 1.12), b)
    * exp(-max(0.0, b - uStarRadius) * 0.88);

  float pinchR = max(0.18, uStarRadius * 1.30);
  float pinchRing = exp(-pow((b - pinchR) * 7.8, 2.0)) * (0.50 + 0.50 * cos(ang * 8.0 - uStarSpinPhase * 2.2));

  float streamEnergy = (armA * dashA * 0.92 + armB * dashB * 0.72) * radialEnv + pinchRing * 0.68;
  vec3 col = mix(C_DEEP_PURPLE, C_ACCENT, smoothstep(0.06, 0.30, streamEnergy));
  col = mix(col, C_ICE_BLUE, smoothstep(0.22, 0.66, streamEnergy + pinchRing * 0.48));
  col = mix(col, C_WHITE_CORE, smoothstep(0.70, 1.18, streamEnergy + uCharge * 0.48));

  float intensity = streamEnergy * uImplode * (1.02 + uCharge * 0.52);
  return vec4(col * intensity, clamp(intensity * 0.94, 0.0, 1.0));
}

vec4 evalSupernovaEjecta(vec3 closestPt, float b, float tc) {
  if (uEjecta <= 0.002 || tc <= 0.0) return vec4(0.0);

  vec2 planeXY = vec2(dot(closestPt, uCamRight), dot(closestPt, uCamUp));
  float ang = atan(planeXY.y, planeXY.x);

  float p = uEjectaProg;
  // Forward shock blasts outward from the 0.11 core; reverse inner shock decelerates for Act 4 fallback
  float rMain = mix(0.11, 8.4, pow(p, 0.70));
  float rMid = mix(0.11, 5.4, pow(p, 0.82));
  float rReverse = mix(0.11, 3.1, sin(min(p * 1.32, 1.0) * PI * 0.55));

  float rtRipple = 0.22 * sin(ang * 7.0 + p * 4.5)
    + 0.14 * cos(ang * 13.0 - p * 6.2 + 0.8)
    + 0.08 * sin(ang * 21.0 + p * 8.0);
  float shellDist = b - (rMain + rtRipple * (0.28 + p * 0.82));
  float shellW = mix(0.20, 0.72, p);
  float mainShell = exp(-pow(shellDist / shellW, 2.0));

  float midDist = b - (rMid + rtRipple * 0.50);
  float midW = mix(0.18, 0.58, p);
  float midShell = exp(-pow(midDist / midW, 2.0));

  float revDist = b - (rReverse + rtRipple * 0.26);
  float revW = mix(0.15, 0.42, p);
  float revShell = exp(-pow(revDist / revW, 2.0)) * (1.0 - smoothstep(0.58, 0.96, p));

  float webA = smoothstep(0.34, 0.88, 0.5 + 0.5 * cos(ang * 10.0 - b * 2.5 + uTime * 1.9));
  float webB = smoothstep(0.38, 0.90, 0.5 + 0.5 * cos(ang * 17.0 + b * 3.2 - uTime * 1.5));
  float filaments = max(webA, webB * 0.82);

  float rayPattern = pow(0.5 + 0.5 * cos(ang * 9.0 - uTime * 1.15), 3.6) * 0.58
    + pow(0.5 + 0.5 * cos(ang * 15.0 + uTime * 0.95 + 0.5), 4.6) * 0.40;
  float trailingInterior = (1.0 - smoothstep(rMain * 0.68, rMain * 1.05, b))
    * smoothstep(0.22, max(0.55, rMid * 0.52), b)
    * (0.18 + 0.82 * rayPattern) * (1.0 - p * 0.76);

  float energy = mainShell * (0.50 + 0.62 * filaments)
    + midShell * (0.40 + 0.48 * webA) * 0.72
    + revShell * (0.36 + 0.52 * webB) * 0.62
    + trailingInterior * 0.34;

  vec3 col = mix(C_SPACE, C_DEEP_PURPLE, smoothstep(0.05, 0.26, energy));
  col = mix(col, C_ACCENT, smoothstep(0.22, 0.48, energy));
  col = mix(col, C_PERIWINKLE, smoothstep(0.42, 0.74, energy));
  col = mix(col, C_ICE_BLUE, clamp(mainShell * 0.76 + midShell * 0.42 + revShell * 0.35, 0.0, 0.86));
  col = mix(col, C_WHITE_CORE, smoothstep(0.84, 1.32, energy * (1.0 - p * 0.55)));

  float blastDuck = 1.0 - uBlastPeak * 0.36;
  float fade = uEjecta * mix(1.14, 0.52, smoothstep(0.34, 0.92, p)) * blastDuck;
  return vec4(col * energy * fade, clamp(energy * fade * 0.94, 0.0, 1.0));
}

/**
 * Act 4 Spiral Fallback Ribbons:
 * Pulls decelerating inner supernova ejecta inward along tightening logarithmic
 * spiral trajectories straight into the growing black hole's forming accretion disk.
 */
vec4 evalFallbackRibbons(vec3 closestPt, float b, float tc, float rh) {
  if (uFallback <= 0.002 || tc <= 0.0) return vec4(0.0);
  float rInnerGate = rh * 1.03;
  if (b < rInnerGate * 0.92 || b > 5.8) return vec4(0.0);

  vec2 planeXY = vec2(dot(closestPt, uCamRight), dot(closestPt, uCamUp));
  float ang = atan(planeXY.y, planeXY.x);
  float logRatio = log(max(b / max(0.08, rh), 1.01));

  // Spiral wind tightens dramatically as fallback material conserves angular momentum
  float twist = mix(4.2, 8.8, uFallbackProg);
  float spin = uTime * 2.45 + uFallbackProg * 4.2;

  float ribA = pow(0.5 + 0.5 * cos(3.0 * ang + twist * logRatio - spin), 5.0);
  float ribB = pow(0.5 + 0.5 * cos(5.0 * ang + (twist * 0.82) * logRatio - spin * 1.22 + 1.3), 6.2);
  float dash = smoothstep(0.28, 0.88, 0.5 + 0.5 * cos(logRatio * 10.0 + uTime * 6.8 - ang * 2.0));

  float outerRim = mix(4.8, 2.25, uFallbackProg);
  float env = smoothstep(rInnerGate * 0.96, rInnerGate * 1.24, b)
    * (1.0 - smoothstep(outerRim * 0.58, outerRim, b));

  // Shock-heated plunge glow right as fallback streams join the photon ring / ISCO
  float plungeHeat = exp(-max(0.0, b - rInnerGate) * 2.2) * (0.45 + 0.55 * ribA);
  float energy = ((ribA * 0.95 + ribB * 0.65) * (0.48 + 0.52 * dash) * env + plungeHeat * 0.52) * uFallback;

  vec3 col = mix(C_DEEP_PURPLE, C_ACCENT, smoothstep(0.05, 0.28, energy));
  col = mix(col, C_PERIWINKLE, smoothstep(0.24, 0.58, energy));
  col = mix(col, C_ICE_BLUE, clamp(plungeHeat * 0.78 + smoothstep(0.52, 0.95, energy) * 0.65, 0.0, 0.92));
  col = mix(col, C_WHITE_CORE, smoothstep(0.88, 1.35, energy + plungeHeat * 0.35));

  return vec4(col * energy * 1.12, clamp(energy * 0.95, 0.0, 1.0));
}

/**
 * Volumetric 3D Accretion Disk tuned for calm laminar ASCII flow:
 * - Scales proportionally with rh during Act 4 black hole growth (0.04 -> 1.00)
 *   and is mathematically identical to settled rh = 1.0.
 */
vec4 evalDisk(vec2 xz, float outerR, float polarF, float time, float dopplerBias, float rh) {
  if (uDiskBirth <= 0.002) return vec4(0.0);

  float rRaw = length(xz);
  float rScale = max(0.16, rh);
  float r = rRaw / rScale;
  float effOuterR = outerR / rScale;
  if (r < 1.02 || r > effOuterR) return vec4(0.0);

  float theta = atan(xz.y, xz.x);
  float logR = log(r);

  float birthRadiusGate = smoothstep(
    mix(effOuterR * 0.88, 1.02, uDiskBirth),
    mix(effOuterR * 1.05, 1.13, uDiskBirth),
    r
  );
  float innerEnv = mix(birthRadiusGate, smoothstep(1.025, 1.12, r), smoothstep(0.65, 1.0, uDiskBirth));
  float outerEnv = 1.0 - smoothstep(effOuterR * 0.58, effOuterR, r);
  float rNorm = clamp((r - 1.05) / max(0.6, effOuterR - 1.05), 0.0, 1.0);

  float birthTwist = (1.0 - uDiskBirth) * 5.2;
  float spiralTwist = mix(3.4 + birthTwist, 13.6, polarF);
  float infall = time * mix(0.12, 0.38, polarF);

  // ---- Stratum 1: Crisp Hot Inner ISCO Streamlines ----
  float s1Phase = 3.0 * theta + (spiralTwist * 1.12) * logR + infall * 1.25 - time * 0.65;
  float s1Ring = smoothstep(0.36, 0.84, 0.5 + 0.5 * cos(s1Phase));
  float s1Conc = smoothstep(0.38, 0.84, 0.5 + 0.5 * cos(logR * 22.0 + infall * 1.6));
  float s1Track = mix(mix(s1Conc, s1Ring, 0.56), s1Ring, polarF);
  float s1Dash = smoothstep(0.24, 0.74, 0.5 + 0.5 * cos(3.0 * theta - 4.2 * logR - time * 0.95));
  float s1Env = smoothstep(1.025, 1.09, r) * (1.0 - smoothstep(1.68, 2.45, r));
  float s1Val = s1Track * (0.54 + 0.46 * s1Dash) * s1Env;

  // ---- Stratum 2: Mid-Disk Spiral Arms ----
  float s2ArmA = smoothstep(0.42, 0.86, 0.5 + 0.5 * cos(4.0 * theta + spiralTwist * logR + infall * 0.95 - time * 0.44));
  float s2ArmB = smoothstep(0.48, 0.88, 0.5 + 0.5 * cos(2.0 * theta + (spiralTwist * 0.72) * logR + infall * 0.72 - time * 0.30 + 1.4));
  float s2Conc = smoothstep(0.42, 0.84, 0.5 + 0.5 * cos(logR * 16.0 + infall * 1.0));
  float s2Lane = mix(max(s2Conc * 0.88, s2ArmA * 0.86), max(s2ArmA, s2ArmB * 0.88), polarF);
  float s2DashA = smoothstep(0.26, 0.70, 0.5 + 0.5 * cos(3.0 * theta - 3.6 * logR - time * 0.68 + 0.6));
  float s2DashB = smoothstep(0.30, 0.74, 0.5 + 0.5 * cos(4.0 * theta + 2.8 * logR - time * 0.56));
  float s2Env = smoothstep(1.06, 1.24, r) * (1.0 - smoothstep(effOuterR * 0.52, effOuterR * 0.94, r));
  float s2Val = s2Lane * max(s2DashA, s2DashB * 0.86) * s2Env;

  // ---- Stratum 3: Sweeping Outer Violet Arcs ----
  float s3Arm = smoothstep(0.48, 0.88, 0.5 + 0.5 * cos(2.0 * theta + (spiralTwist * 0.58) * logR + infall * 0.55 - time * 0.24 + 2.5));
  float s3Conc = smoothstep(0.48, 0.86, 0.5 + 0.5 * cos(logR * 10.5 + infall * 0.72));
  float s3Lane = mix(max(s3Conc * 0.80, s3Arm * 0.76), s3Arm, polarF);
  float s3Dash = smoothstep(0.36, 0.78, 0.5 + 0.5 * cos(2.0 * theta - 2.4 * logR - time * 0.36));
  float s3Env = smoothstep(1.50, 2.20, r) * outerEnv;
  float s3Val = s3Lane * (0.34 + 0.66 * s3Dash) * s3Env;

  float baseBed = exp(-(r - 1.04) * mix(2.2, 1.38, polarF)) * innerEnv * outerEnv * 0.30;

  float sparkWave = smoothstep(0.84, 0.97, 0.5 + 0.5 * cos(4.0 * theta + (spiralTwist * 1.0) * logR - time * 1.1));
  float iceSpark = sparkWave * s1Env * (0.34 + 0.36 * polarF);

  // Polar-Only UTC 1-Second Escapement Wave across inner polar spiral arms
  float polarGate = smoothstep(0.55, 0.90, polarF);
  float tickWave = 0.0;
  if (uTickPulse > 0.002 && uSettle > 0.5 && polarGate > 0.001) {
    float rTick = mix(1.06, 2.85, uTickProg);
    float ringSigma = 0.14;
    float ringBand = exp(-pow((r - rTick) / ringSigma, 2.0));
    float armMod = 0.45 + 0.55 * max(s1Track, s2Lane);
    tickWave = ringBand * armMod * uTickPulse * polarGate * 0.44 * uSettle * innerEnv * outerEnv;
  }

  float doppler = 1.0 + dopplerBias * (1.0 - polarF) * 0.24 * cos(theta - 0.55);

  float energy = (baseBed + s1Val * 1.00 + s2Val * 0.84 + s3Val * 0.52) * doppler * uDiskBirth;
  energy = energy * (1.0 + uCharge * 0.65 + uUiRipple * 0.28 + uUiShock * 0.55) + tickWave * 1.45;

  vec3 col = mix(C_SPACE, C_DEEP_PURPLE, smoothstep(0.04, 0.24, energy));
  col = mix(col, C_ACCENT, smoothstep(0.20, 0.48, energy));
  col = mix(col, C_PERIWINKLE, smoothstep(0.42, 0.76, energy));
  col = mix(col, C_WHITE_CORE, smoothstep(0.74, 1.12, energy));

  col = mix(col, mix(C_DEEP_PURPLE, C_ACCENT, 0.55), rNorm * 0.34 * (1.0 - s1Val));
  col = mix(col, mix(C_ICE_BLUE, C_WHITE_CORE, 0.40), clamp(iceSpark * 0.72 + tickWave * 2.8 + uUiRipple * 0.24 + uUiShock * 0.52, 0.0, 0.94));

  float alpha = clamp(energy * 1.24, 0.0, 1.0) * innerEnv * outerEnv;
  return vec4(col * clamp(energy * 1.26, 0.0, 1.50), alpha);
}

vec4 evalPolarJets(vec3 ro, vec3 rd, float tSphere, float coreShadow, float jetPower, float time, float rh) {
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
  float minAxial = mix(0.16, max(0.22, rh * 0.86), uBhBirth);
  if (absS < minAxial || absS > 8.4) return vec4(0.0);

  float dPerp = length(pAxis.xz);
  float w = 0.088 + 0.062 * pow(max(absS - minAxial, 0.0), 1.14);
  if (dPerp > w * 2.6) return vec4(0.0);

  float axialEnv = smoothstep(minAxial, minAxial + 0.32, absS) * (1.0 - smoothstep(4.5, 8.2, absS));
  vec2 perpDir = normalize(vec2(-rd.z, rd.x) + vec2(1e-5));
  float signedX = dot(pAxis.xz, perpDir);

  float coreBeam = exp(-pow(dPerp / (w * 0.56), 2.0));
  float helixPhaseA = absS * 3.55 - time * 5.2;
  float helixPhaseB = absS * 3.55 - time * 5.2 + PI;
  float hA = w * 0.86 * sin(helixPhaseA);
  float hB = w * 0.86 * sin(helixPhaseB);
  float ribW = max(0.030, w * 0.24);
  float ribbonA = exp(-pow((signedX - hA) / ribW, 2.0)) * (0.55 + 0.45 * cos(helixPhaseA));
  float ribbonB = exp(-pow((signedX - hB) / ribW, 2.0)) * (0.55 + 0.45 * cos(helixPhaseB));
  float helices = clamp(ribbonA + ribbonB, 0.0, 1.35) * smoothstep(w * 1.9, w * 0.4, dPerp);

  float laneId = floor((signedX / max(w, 0.05)) * 2.5 + 3.0);
  float laneSeed = hash11(laneId + (s > 0.0 ? 11.3 : 29.7));
  float streak = smoothstep(0.45, 0.88, 0.5 + 0.5 * sin(absS * 5.2 - time * (7.5 + laneSeed * 3.5) + laneSeed * TWO_PI));
  float streakMask = streak * exp(-pow(dPerp / (w * 0.95), 2.0));
  float outerSheath = exp(-pow(dPerp / (w * 1.65), 2.0)) * 0.28;

  float total = (coreBeam * 0.74 + helices * 0.80 + streakMask * 0.54 + outerSheath) * axialEnv * jetPower * occ;
  total *= (1.0 + uCharge * 0.58);

  vec3 jetCol = mix(C_ACCENT, C_ICE_BLUE, smoothstep(0.08, 0.46, coreBeam + helices + streakMask * 0.6));
  jetCol = mix(jetCol, C_WHITE_CORE, smoothstep(0.60, 1.22, coreBeam * 0.92 + helices * 0.55 + uCharge * 0.35));
  return vec4(jetCol * total, clamp(total * 0.92, 0.0, 1.0));
}

void main() {
  // Fast GPU early-out for empty sky pixels when settled on bottom hero or docked top dome
  if (uSettle > 0.99 && uPolarFactor < 0.01 && uLockPulse < 0.002 && uUiShock < 0.002) {
    if (uPin > 0.98 && vUv.y < 0.68) {
      o = vec4(0.0);
      return;
    }
    if (uPin < 0.02 && vUv.y > 0.46) {
      o = vec4(0.0);
      return;
    }
  }

  vec2 ptrDelta = vUv - uPointer;
  ptrDelta.x *= uViewAsp;
  float ptrDist = length(ptrDelta);
  float ptrRipple = exp(-pow(ptrDist * 4.4, 2.0)) * uPointerActive * uSettle;

  vec2 ndc = vUv * 2.0 - 1.0;
  vec2 ndcDeflected = ndc - (vUv - uPointer) * (0.014 * ptrRipple);
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

  // Act 4 physical pinpoint singularity -> growing event horizon radius (0.04 -> 1.00)
  float effectiveRh = max(0.04, uBhRadius);
  float coreShadow = (uBhBirth > 0.002 && tc > 0.0)
    ? (1.0 - smoothstep(effectiveRh - pixelAA, effectiveRh + pixelAA, b)) * uBhBirth
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

  // Rear gravitationally lensed disk (Einstein arches) with proportional Schwarzschild deflection
  if (uDiskBirth > 0.002 && b > effectiveRh - pixelAA && tc > 0.0 && lensedWeight > 0.002 && horizonBound > 0.002) {
    float u_b = max(b - 0.58 * effectiveRh, 0.032 * effectiveRh);
    float deflect = min(2.36, 1.14 * pow(effectiveRh, 1.18) / pow(u_b, 1.18));
    vec3 e_r = closestPt / max(b, 1e-4);
    vec3 rdBent = normalize(cos(deflect) * rd - sin(deflect) * e_r);

    if (abs(rdBent.y) > 1e-4) {
      float tRear = -closestPt.y / rdBent.y;
      if (tRear > 0.0) {
        vec3 hitRear = closestPt + tRear * rdBent;
        vec4 rearDisk = evalDisk(hitRear.xz, uDiskOuterR, uPolarFactor, uTime, 1.0, effectiveRh);
        float archBoost = 1.0 + 0.36 * exp(-max(b - effectiveRh, 0.0) * (3.8 / max(0.25, effectiveRh)));
        float vis = (1.0 - coreShadow) * lensedWeight * horizonBound;
        accumCol += rearDisk.rgb * archBoost * vis;
        accumAlpha = max(accumAlpha, rearDisk.a * vis);
      }
    }
  }

  // Relativistic photon ring + calm horizon corona + Polar 1s Escapement + Waitlist Coupling Waves
  if (uBhBirth > 0.002 && tc > 0.0) {
    float distOut = b - effectiveRh;
    float ringAng = atan(closestPt.y, closestPt.x);
    float shimmerAmp = mix(0.04, 0.22, uPolarFactor);
    float ringShimmer = (1.0 - shimmerAmp) + shimmerAmp * sin(ringAng * 3.0 - uTime * 0.95) * cos(ringAng * 2.0 + uTime * 0.55);
    float ringStream = 0.5 + 0.5 * cos(ringAng * 5.0 - distOut * 28.0 - uTime * 0.85);

    float photonWidth = mix(mix(29.0, 36.0, uPin), 25.0, uPolarFactor) / mix(0.68, 1.0, effectiveRh);
    float photonRing = exp(-pow((distOut - 0.014 * mix(0.55, 1.0, effectiveRh)) * photonWidth, 2.0)) * (1.0 - coreShadow);

    float horizonArc = exp(-max(distOut, 0.0) * mix(10.8, 15.5, uPin))
      * smoothstep(-0.005, 0.016, distOut) * (1.0 - coreShadow) * horizonClose;
    float arcStripes = mix(0.80, 0.62 + 0.38 * smoothstep(0.32, 0.82, ringStream), 1.0 - uPin * 0.5);

    float innerHalo = exp(-max(distOut, 0.0) * mix(mix(9.4, 14.5, uPin), 6.8, uPolarFactor))
      * smoothstep(-0.01, 0.018, distOut) * (1.0 - coreShadow);

    float lockR = mix(0.015, 0.24, uLockWaveProg);
    float lockWave = exp(-pow((distOut - lockR) * 26.0, 2.0)) * (1.0 - coreShadow) * uLockPulse * horizonClose;

    // UI-2: Subtle WaitlistBar typing/toggle ripple & full celebratory submit gravitational shockwave
    float uiSubtleWave = exp(-max(distOut, 0.0) * 14.0) * smoothstep(-0.004, 0.014, distOut)
      * (0.55 + 0.45 * cos(ringAng * 6.0 - uTime * 5.0)) * (1.0 - coreShadow) * uUiRipple * uSettle;
    float shockR = mix(0.012, 0.56, uUiShockProg);
    float shockBand = exp(-pow((distOut - shockR) * mix(22.0, 12.0, uUiShockProg), 2.0)) * (1.0 - coreShadow) * uUiShock * uSettle;
    float shockTrail = exp(-pow((distOut - shockR * 0.52) * 18.0, 2.0)) * (1.0 - coreShadow) * uUiShock * 0.46 * uSettle;

    float polarGate = smoothstep(0.55, 0.90, uPolarFactor);
    float tickRimR = mix(0.014, 0.28, uTickProg);
    float tickRimWave = exp(-pow((distOut - tickRimR) * 26.0, 2.0))
      * (1.0 - coreShadow) * uTickPulse * polarGate * 0.36 * uSettle;

    float ptrLift = 1.0 + ptrRipple * 0.40 + uUiRipple * 0.36 + uUiShock * 0.55;
    float growEnergize = 1.0 + (1.0 - effectiveRh) * 0.55;
    float birthGlow = uBhBirth * (1.0 + (1.0 - uBhBirth) * 0.72) * growEnergize;
    vec3 photonCol = mix(C_PERIWINKLE, C_WHITE_CORE, 0.72 + 0.20 * ringShimmer);
    photonCol = mix(photonCol, C_ICE_BLUE, clamp(ptrRipple * 0.50 + (1.0 - effectiveRh) * 0.55 + uLockPulse * 0.55 + uUiRipple * 0.55 + uUiShock * 0.85 + tickRimWave * 2.6 + 0.14 * ringShimmer, 0.0, 0.92));
    vec3 arcCol = mix(C_ACCENT, C_PERIWINKLE, smoothstep(0.25, 0.85, arcStripes * ringShimmer));
    arcCol = mix(arcCol, C_WHITE_CORE, smoothstep(0.055, 0.008, distOut) * 0.72);
    vec3 haloCol = mix(C_DEEP_PURPLE, C_ACCENT, 0.55 + 0.24 * ringShimmer);

    float photonBoost = mix(1.06, mix(1.26, 1.14, uPin), horizonClose);
    accumCol += photonCol * photonRing * (0.98 + 0.22 * ringShimmer) * photonBoost * ptrLift * birthGlow;
    accumCol += arcCol * horizonArc * arcStripes * mix(0.86, 0.68, uPin) * ptrLift * uBhBirth;
    accumCol += haloCol * innerHalo * (0.28 + 0.12 * ringShimmer) * ptrLift * uBhBirth;
    accumCol += mix(C_ICE_BLUE, C_WHITE_CORE, 0.48) * (lockWave * 0.72 + tickRimWave * 1.95 + uiSubtleWave * 0.58 + shockBand * 1.25 + shockTrail * 0.62);
    accumAlpha = max(accumAlpha, clamp((photonRing * 0.98 + horizonArc * 0.84 + innerHalo * 0.46) * uBhBirth + lockWave * 0.65 + tickRimWave + uiSubtleWave * 0.55 + shockBand * 0.92, 0.0, 1.0));
  }

  // Direct equatorial disk
  float frontCoversShadow = 0.0;
  if (uDiskBirth > 0.002 && abs(rd.y) > 1e-4) {
    float tFront = -ro.y / rd.y;
    float maxT = tc + mix(0.04, 18.0, smoothstep(0.20, 0.72, uPolarFactor));
    if (tFront > 0.0 && tFront < tSphere && tFront <= maxT) {
      vec3 hitFront = ro + tFront * rd;
      vec2 diskXZ = hitFront.xz * mix(1.0, 0.955, uPolarFactor);
      vec4 frontDisk = evalDisk(diskXZ, uDiskOuterR, uPolarFactor, uTime, 1.0, effectiveRh);
      float diskGate = horizonBound;
      if (frontDisk.a * diskGate > 0.002) {
        float frontCov = clamp(frontDisk.a * 1.18 * diskGate, 0.0, 1.0);
        accumCol = mix(accumCol, frontDisk.rgb * diskGate, frontCov) + frontDisk.rgb * (0.18 * diskGate);
        accumAlpha = max(accumAlpha, frontCov);
        frontCoversShadow = frontCov * (1.0 - smoothstep(0.25, 0.65, uPolarFactor));
      }
    }
  }

  if (uFallback > 0.002) {
    vec4 fb = evalFallbackRibbons(closestPt, b, tc, effectiveRh);
    float fbVis = 1.0 - coreShadow;
    accumCol += fb.rgb * fbVis;
    accumAlpha = max(accumAlpha, fb.a * fbVis);
  }

  if (uJetPower > 0.004) {
    vec4 jets = evalPolarJets(ro, rd, tSphere, coreShadow, uJetPower, uTime, effectiveRh);
    accumCol += jets.rgb;
    accumAlpha = max(accumAlpha, jets.a);
  }

  if (uEjecta > 0.002) {
    vec4 ej = evalSupernovaEjecta(closestPt, b, tc);
    float ejVis = 1.0 - coreShadow * smoothstep(0.15, 0.72, uBhBirth);
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
      float coreSpark = exp(-pow(blastR * 5.6, 2.0)) * uCharge;
      float flareH = exp(-abs(blastPos.y) * 34.0) * exp(-abs(blastPos.x) * 4.4) * uCharge * 0.72;
      vec3 chargeLight = mix(C_ICE_BLUE, vec3(1.0), 0.68);
      accumCol += chargeLight * (coreSpark * 1.40 + flareH);
      accumAlpha = max(accumAlpha, clamp(coreSpark + flareH, 0.0, 1.0));
    }

    if (uBlastPeak > 0.001) {
      float coreWhite = exp(-pow(blastR * 1.85, 2.0));
      float midHalo = exp(-pow(blastR * 1.05, 2.0));
      float rShock = mix(0.12, 0.96, uBlastProgress);
      float shockRing = exp(-pow((blastR - rShock) * 8.5, 2.0));

      float raysA = pow(0.5 + 0.5 * cos(blastAng * 8.0 - uTime * 1.8), 3.2);
      float raysB = pow(0.5 + 0.5 * cos(blastAng * 14.0 + uTime * 1.3 + 0.7), 4.2);
      float radialRays = (raysA * 0.62 + raysB * 0.40) * exp(-blastR * 1.15);

      vec3 outerViolet = mix(C_SPACE, C_DEEP_PURPLE, smoothstep(0.05, 0.55, midHalo + radialRays * 0.55));
      vec3 midIceViolet = mix(C_ACCENT, C_ICE_BLUE, smoothstep(0.14, 0.70, midHalo * 0.88 + shockRing * 0.65));
      vec3 brightIceRing = mix(C_ICE_BLUE, vec3(0.92, 0.985, 1.0), 0.45);

      vec3 blastCol = mix(outerViolet, midIceViolet, smoothstep(0.10, 0.62, midHalo + radialRays * 0.45));
      blastCol = mix(blastCol, brightIceRing, clamp(shockRing * 0.88 + radialRays * 0.44 * (1.0 - coreWhite), 0.0, 0.92));
      blastCol = mix(blastCol, vec3(1.0, 1.0, 1.0), smoothstep(0.18, 0.68, coreWhite * 1.20 + midHalo * 0.25));

      float blastMix = clamp(uBlastPeak * (0.34 + 0.76 * midHalo + 0.44 * shockRing + 0.24 * radialRays), 0.0, 0.99);
      // Let nucleating pinpoint singularity (5.20s+) punch cleanly through the fading blast center
      float centerPunch = 1.0 - coreShadow * smoothstep(0.10, 0.55, uBhBirth);
      accumCol = mix(accumCol, blastCol, blastMix * centerPunch);
      accumAlpha = max(accumAlpha, clamp(uBlastPeak * 0.99, 0.0, 1.0));
      pureCoreLock *= (1.0 - smoothstep(0.18, 0.62, uBlastPeak) * centerPunch);
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
  vec2 d = uBgInv * 0.75;
  vec4 a = texture(uBg, uvCenter + vec2(-d.x, -d.y));
  vec4 b = texture(uBg, uvCenter + vec2( d.x, -d.y));
  vec4 c = texture(uBg, uvCenter + vec2(-d.x,  d.y));
  vec4 e = texture(uBg, uvCenter + vec2( d.x,  d.y));
  o = (a + b + c + e) * 0.25;
}`;

/**
 * Pass 3: Pre-Glyph Separable Bloom Blur (single crisp tier on `rtScene`, NEVER blurring glyphs)
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
  c += (sampleTap(vUv + uDir * 1.45) + sampleTap(vUv - uDir * 1.45)) * 0.316216;
  c += (sampleTap(vUv + uDir * 3.35) + sampleTap(vUv - uDir * 3.35)) * 0.070270;
  o = vec4(c, 1.0);
}`;

/**
 * Pass 4 (Direct-to-Screen): Crisp 1:1 Native-Pixel Volumetric ASCII + Bloom Composite
 * - Merges glyph shading & bloom composite into a single fullscreen pass (eliminates rtGlyph)
 * - Strict 7-step ` .:-^tT` ramp with narrow boundary crossfade (zero 60Hz threshold popping)
 * - Clean low-energy noise gate prevents buzzing outer halo cells
 * - Pure `#000000` locked inside the event horizon core
 */
const FS_GLYPH_COMP = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 o;

uniform sampler2D uCell;
uniform sampler2D uBg;
uniform sampler2D uAtlas;
uniform sampler2D uBloom;
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
uniform float uGlow;
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

float sampleGlyph(int glyphIdx, int row, ivec2 subPx) {
  ivec2 atlasPx = ivec2(
    glyphIdx * uCellPx.x + subPx.x,
    row * uCellPx.y + (uCellPx.y - 1 - subPx.y)
  );
  return texelFetch(uAtlas, atlasPx, 0).r;
}

void main() {
  ivec2 fragPx = ivec2(gl_FragCoord.xy);
  ivec2 relPx = fragPx - uGridOrigin;

  ivec2 rawCell = ivec2(floor(vec2(relPx) / vec2(uCellPx)));
  bool inGrid = rawCell.x >= 0 && rawCell.y >= 0 && rawCell.x < uGrid.x && rawCell.y < uGrid.y;
  ivec2 cellCoord = clamp(rawCell, ivec2(0), uGrid - ivec2(1));
  ivec2 subPx = clamp(relPx - cellCoord * uCellPx, ivec2(0), uCellPx - ivec2(1));

  vec4 cell = texelFetch(uCell, cellCoord, 0);
  vec4 bgTex = texture(uBg, vUv);

  // Fast exit for empty transparent sky pixels while preserving soft outer bloom feathering
  float introOpaque = 1.0 - smoothstep(0.14, 0.56, uSettle);
  if (introOpaque < 0.001 && cell.a < 0.004 && bgTex.a < 0.004 && uWordmarkCarve < 0.001) {
    vec3 haloOnly = texture(uBloom, vUv).rgb * uGlow;
    float haloLum = dot(haloOnly, vec3(0.2126, 0.7152, 0.0722));
    if (haloLum < 0.002) {
      o = vec4(0.0);
    } else {
      float haloAlpha = clamp(haloLum * 0.95, 0.0, 0.72);
      o = vec4(clamp(haloOnly, 0.0, 1.0), haloAlpha);
    }
    return;
  }

  vec2 gridF = vec2(uGrid);
  vec2 cellUv = (vec2(uGridOrigin) + (vec2(cellCoord) + 0.5) * vec2(uCellPx)) / uCanvasPx;

  float cellLum = dot(cell.rgb, vec3(0.2126, 0.7152, 0.0722));
  float bgLum = dot(bgTex.rgb, vec3(0.2126, 0.7152, 0.0722));

  float energy = clamp(pow(clamp(cellLum * 1.16, 0.0, 1.0), 0.92), 0.0, 0.9999);

  vec2 ptrD = cellUv - uPointer;
  ptrD.x *= uViewAsp;
  float ptrBoost = exp(-pow(length(ptrD) * 4.5, 2.0)) * uPointerActive * uSettle * smoothstep(0.05, 0.22, energy);
  float shapedEnergy = clamp(energy + ptrBoost * 0.16, 0.0, 0.9999);

  int maxGlyphIdx = int(uGlyphCount) - 1;
  float scaled = shapedEnergy * float(maxGlyphIdx);
  int idx = clamp(int(floor(scaled)), 0, maxGlyphIdx);
  int idxNext = min(idx + 1, maxGlyphIdx);
  float crossBlend = smoothstep(0.74, 1.0, fract(scaled));
  int atlasRow = 0;

  // Act III supernova blast smoothly energizes bright cells toward '^', 't', 'T' (4..6)
  if (uBlastPeak > 0.05 && shapedEnergy > 0.25) {
    float blastTarget = shapedEnergy > 0.65 ? 6.0 : (shapedEnergy > 0.42 ? 5.0 : 4.0);
    float boosted = mix(scaled, max(scaled, blastTarget), smoothstep(0.12, 0.65, uBlastPeak));
    idx = clamp(int(floor(boosted)), 0, maxGlyphIdx);
    idxNext = min(idx + 1, maxGlyphIdx);
    crossBlend = smoothstep(0.74, 1.0, fract(boosted));
  }

  // ---- Cell-Quantized ASCII T^minus Supernova Wordmark (steady, zero static flicker) ----
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
      crossBlend = 0.0;

      if (wmCov >= 0.48) {
        idx = 6; // 'T' solid crisp stroke core
      } else if (wmCov >= 0.34) {
        idx = 5; // 't' inner shoulder
      } else if (wmCov >= 0.26) {
        idx = 4; // '^' outer contour
      } else {
        idx = 3; // '-' soft edge
      }
      idxNext = idx;
    }
  }

  // Crisp 1:1 native-pixel texelFetch with anti-popping narrow boundary crossfade
  float cov = 0.0;
  if (inGrid) {
    float c0 = sampleGlyph(idx, atlasRow, subPx);
    if (crossBlend > 0.002 && idxNext != idx) {
      float c1 = sampleGlyph(idxNext, atlasRow, subPx);
      cov = mix(c0, c1, crossBlend);
    } else {
      cov = c0;
    }
    cov = smoothstep(0.14, 0.78, cov);
  }

  float alpha = bgTex.a;

  // Clean event horizon core lock
  float bgPureCore = smoothstep(0.90, 0.99, alpha)
    * (1.0 - smoothstep(0.002, 0.014, bgLum))
    * (1.0 - smoothstep(0.18, 0.62, uBlastPeak));
  float cellPureCore = smoothstep(0.92, 0.99, cell.a)
    * (1.0 - smoothstep(0.003, 0.018, cellLum))
    * (1.0 - smoothstep(0.18, 0.62, uBlastPeak));
  float isPureCore = max(bgPureCore, cellPureCore * 0.85);

  // ---- Hybrid Volumetric Substrate + Radiant Supernova Core ----
  float diskSubstrate = mix(0.24, 0.34, smoothstep(0.16, 0.78, bgLum))
    * smoothstep(0.022, 0.14, bgLum)
    * (1.0 - bgPureCore);
  vec2 blastCenterDist = (vUv - vec2(0.5)) * vec2(uViewAsp * 0.72, 1.0);
  float blastCoreBack = (exp(-pow(length(blastCenterDist) * 1.42, 2.0)) * 0.90 + 0.14) * uBlastPeak;
  float backWeight = clamp(diskSubstrate + blastCoreBack, 0.0, 1.0);
  vec3 baseBack = bgTex.rgb * backWeight + C_OBSIDIAN * introOpaque * (1.0 - bgPureCore);

  // Smooth continuous Galaxy chromatic ramp matching 7-step ' .:-^tT'
  vec3 palGlyph = mix(C_SPACE, C_DEEP_PURPLE, smoothstep(0.05, 0.24, shapedEnergy));
  palGlyph = mix(palGlyph, C_ACCENT, smoothstep(0.22, 0.46, shapedEnergy));
  palGlyph = mix(palGlyph, C_PERIWINKLE, smoothstep(0.44, 0.70, shapedEnergy));
  palGlyph = mix(palGlyph, C_ICE_BLUE, smoothstep(0.68, 0.88, shapedEnergy));
  palGlyph = mix(palGlyph, C_WHITE_CORE, smoothstep(0.84, 0.98, shapedEnergy));

  vec3 sceneTint = cell.rgb / max(cellLum, 0.08);
  vec3 warmColor = mix(C_WARM_CORONA, cell.rgb * 1.32, smoothstep(0.12, 0.55, shapedEnergy));
  vec3 coolColor = mix(palGlyph, clamp(palGlyph * 0.56 + cell.rgb * 0.88, 0.0, 1.0), 0.48);
  float iceCue = clamp((sceneTint.b - sceneTint.r) * 0.65, 0.0, 1.0);
  coolColor = mix(coolColor, C_ICE_BLUE, clamp(iceCue * 0.50 + ptrBoost * 0.70, 0.0, 0.86));
  vec3 glyphColor = mix(coolColor, warmColor, uWarmTint);

  vec3 blastGlyphCol = mix(C_ICE_BLUE, vec3(0.99, 0.996, 1.0), smoothstep(0.45, 0.88, cellLum));
  glyphColor = mix(glyphColor, blastGlyphCol, uBlastPeak * 0.84);

  // Clean noise gate eliminates dim edge buzzing
  float glyphGate = smoothstep(0.042, 0.135, shapedEnergy) * (1.0 - isPureCore);
  float glyphAlpha = cov * glyphGate;
  vec3 sceneCol = mix(baseBack, glyphColor, glyphAlpha);

  // Enforce true pure #000000 inside uncovered event horizon shadow
  sceneCol *= (1.0 - bgPureCore);

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
  float baseAlpha = clamp(max(max(bgPureCore, introOpaque), settledAlpha), 0.0, 1.0);
  if (uWordmarkCarve > 0.001 && wmCov > 0.14) {
    baseAlpha = max(baseAlpha, clamp(wmCov * uBlastPeak, 0.0, 1.0));
  }
  vec3 basePremul = clamp(sceneCol, 0.0, 1.0) * baseAlpha;

  // ---- Crisp-On-Top Volumetric Bloom Composite (Zero Glyph Blurring) ----
  vec3 halo = texture(uBloom, vUv).rgb * uGlow;
  float bloomAtten = 1.0 - bgPureCore;
  if (uWordmarkCarve > 0.001) {
    bloomAtten *= (1.0 - smoothstep(0.18, 0.34, wmCov) * 0.94);
  }

  vec3 underHalo = halo * bloomAtten;
  float haloLum = dot(underHalo, vec3(0.2126, 0.7152, 0.0722));
  float haloAlpha = clamp(haloLum * 0.95, 0.0, 0.72);

  vec3 outRgb = basePremul + underHalo * (1.0 - baseAlpha * 0.52);
  float outA = clamp(baseAlpha + haloAlpha * (1.0 - baseAlpha), 0.0, 1.0);

  outRgb *= (1.0 - bgPureCore);
  outA = max(outA, bgPureCore);

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

function linkProgramsBatch(
  gl: WebGL2RenderingContext,
  fsSources: string[]
): GLProgramBundle[] {
  const vs = gl.createShader(gl.VERTEX_SHADER);
  if (!vs) throw new Error("Unable to create vertex shader");
  gl.shaderSource(vs, VS_QUAD);
  gl.compileShader(vs);

  const entries = fsSources.map((fsSrc) => {
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fs) throw new Error("Unable to create fragment shader");
    gl.shaderSource(fs, fsSrc);
    gl.compileShader(fs);

    const prog = gl.createProgram();
    if (!prog) throw new Error("Unable to create WebGL2 program");
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    return { fs, prog };
  });

  const bundles: GLProgramBundle[] = [];
  for (const { fs, prog } of entries) {
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      const pLog = gl.getProgramInfoLog(prog) || "";
      const fsLog = gl.getShaderInfoLog(fs) || "";
      const vsLog = gl.getShaderInfoLog(vs) || "";
      gl.deleteProgram(prog);
      gl.deleteShader(fs);
      gl.deleteShader(vs);
      throw new Error(`Program link error: ${pLog} ${fsLog} ${vsLog}`.trim());
    }
    gl.deleteShader(fs);

    const u: Record<string, WebGLUniformLocation | null> = {};
    const count = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS) as number;
    for (let i = 0; i < count; i++) {
      const info = gl.getActiveUniform(prog, i);
      if (info) {
        u[info.name] = gl.getUniformLocation(prog, info.name);
      }
    }
    bundles.push({ prog, u });
  }
  gl.deleteShader(vs);
  return bundles;
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

  const row0Size = Math.max(8, Math.round(cellPxH * 0.84));
  ctx.font = `500 ${row0Size}px ${monoFamily}`;
  for (let i = 0; i < ASCII_RAMP.length; i++) {
    ctx.fillText(
      ASCII_RAMP[i],
      Math.round((i + 0.5) * cellPxW),
      Math.round(cellPxH * 0.52)
    );
  }

  const row1Size = Math.max(8, Math.round(cellPxH * 0.88));
  ctx.font = `600 ${row1Size}px ${monoFamily}`;
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

function createDummyWordmarkTexture(gl: WebGL2RenderingContext): WebGLTexture {
  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    2,
    2,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array(16)
  );
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
  const texW = Math.min(1536, Math.max(640, Math.round(cssW * 1.2)));
  const texH = Math.min(960, Math.max(420, Math.round(cssH * 1.2)));
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

/**
 * Computes physical star radius R(t) across Act 1 (Red-Supergiant Swell 0.96 -> 1.72)
 * and Act 2 (0.15s peak stall -> runaway gravitational core collapse 1.72 -> 0.11).
 */
function computeStarRadiusAt(t: number): number {
  // Act 1 (0.00s -> 2.65s): unmistakable ~1.8x red-supergiant swell with acoustic breathing
  const swellEase = Math.pow(smoothstep(0.0, 2.62, t), 0.92);
  const baseGrowR = mixNum(0.96, 1.72, swellEase);
  const postPeakT = Math.max(0, t - 1.7);
  const breathPhase = 6.5 * t + 7.5 * postPeakT * postPeakT;
  const breathEnv =
    smoothstep(0.32, 1.82, t) * (1.0 - smoothstep(2.68, 3.05, t));
  const acousticBreath = Math.sin(breathPhase) * 0.045 * breathEnv;

  if (t <= 2.8) {
    // 2.65s -> 2.80s brief peak stall for gravitational weight before plunge
    const stallQuiver =
      t > 2.65 ? Math.sin((t - 2.65) * 42.0) * 0.012 : 0.0;
    return baseGrowR + acousticBreath + stallQuiver;
  }

  // Act 2 (2.80s -> 4.15s): accelerating runaway core collapse (1.72 -> 0.11, ~15.6x implosion)
  const collapseT = clamp01((t - 2.8) / (4.15 - 2.8));
  const collapseEase = smoothstep(0.0, 1.0, collapseT);
  return mixNum(1.72, 0.11, collapseEase) + acousticBreath * (1.0 - collapseEase);
}

/** Deterministic spin integral for `?introAt=` QA snapshots (`omega ~ 1 / R^1.35`). */
function computeDeterministicSpinPhase(t: number): number {
  const clamped = Math.max(0, Math.min(4.4, t));
  const steps = 64;
  const dt = clamped / steps;
  let phase = 0;
  for (let i = 0; i < steps; i++) {
    const r = Math.max(0.11, computeStarRadiusAt((i + 0.5) * dt));
    const omega = 0.44 * Math.pow(0.96 / r, 1.35);
    phase += omega * dt;
  }
  return phase;
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
  glyph: "." | ":" | "-" | "^" | "t";
  phase: number;
  speed: number;
  sizeCss: 10 | 12;
  tint: "periwinkle" | "accent" | "ice";
  crestDist: number;
}

function createStarfield(count: number): StarSpec[] {
  const glyphs: Array<"." | ":" | "-" | "^" | "t"> = [".", ":", "-", "^", "t"];
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
      speed: 0.35 + rand() * 0.75,
      sizeCss: rand() > 0.66 ? 12 : 10,
      tint: rTint > 0.86 ? "ice" : rTint > 0.42 ? "periwinkle" : "accent",
      crestDist,
    });
  }
  return stars;
}

export function AsciiBlackholeCanvas({
  onHeroReveal,
  onHorizonSync,
  runwayRef,
  controlRef,
  skipIntro = false,
}: AsciiBlackholeCanvasProps) {
  const starCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const glCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const monoProbeRef = useRef<HTMLSpanElement | null>(null);
  const ssrSeedRef = useRef<HTMLDivElement | null>(null);
  const onRevealRef = useRef(onHeroReveal);
  const onSyncRef = useRef(onHorizonSync);
  const runwayRefLatest = useRef(runwayRef);
  const controlRefLatest = useRef(controlRef);

  useEffect(() => {
    onRevealRef.current = onHeroReveal;
    onSyncRef.current = onHorizonSync;
    runwayRefLatest.current = runwayRef;
    controlRefLatest.current = controlRef;
  }, [onHeroReveal, onHorizonSync, runwayRef, controlRef]);

  useIsomorphicLayoutEffect(() => {
    const glCanvas = glCanvasRef.current;
    const starCanvas = starCanvasRef.current;
    if (!glCanvas || !starCanvas) return;

    let querySkipIntro = false;
    let pinnedIntroAt: number | null = null;
    try {
      const qs = new URLSearchParams(window.location.search);
      querySkipIntro = qs.get("skipIntro") === "1";
      const rawPin = qs.get("introAt");
      if (rawPin !== null) {
        const parsed = Number(rawPin);
        if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 14) {
          pinnedIntroAt = parsed;
        }
      }
    } catch {
      // ignore
    }

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointerFine =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches;

    let startSettled = skipIntro || querySkipIntro || reducedMotion;

    let heroRevealed =
      startSettled || (pinnedIntroAt !== null && pinnedIntroAt >= HERO_REVEAL_SEC);
    if (heroRevealed) {
      onRevealRef.current(true);
    }
    if (startSettled && ssrSeedRef.current) {
      ssrSeedRef.current.style.display = "none";
    }

    const starCtx = starCanvas.getContext("2d");
    const stars = createStarfield(64);

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
      if (ssrSeedRef.current) ssrSeedRef.current.style.display = "none";
      onRevealRef.current(true);
      return;
    }

    const [pScene, pCell, pBlur, pGlyphComp] = linkProgramsBatch(gl, [
      FS_SCENE,
      FS_CELL,
      FS_BLUR,
      FS_GLYPH_COMP,
    ]);

    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);

    let monoFamily =
      '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

    let atlasTex: WebGLTexture | null = null;
    let lastAtlasCellW = 0;
    let lastAtlasCellH = 0;
    let lastAtlasFont = "";

    let wordmarkTex: WebGLTexture | null = null;
    let wordmarkBuilt = false;
    let lastMaskCssW = 0;
    let lastMaskCssH = 0;

    let cw = 0;
    let ch = 0;
    let cssWGlobal = window.innerWidth || 1440;
    let cssHGlobal = window.innerHeight || 900;
    let dprGlobal = 1.25;
    let cols = 192;
    let rows = 86;
    let cellPxW = 9;
    let cellPxH = 13;
    let gridOriginX = 0;
    let gridOriginY = 0;
    let adaptiveDegraded = false;
    let lastSceneScale = 0.38;
    let lastScissorMode: "full" | "bottom" | "top" = "full";
    let rtScene: RenderTarget | null = null;
    let rtCell: RenderTarget | null = null;
    let rtBA: RenderTarget | null = null;
    let rtBB: RenderTarget | null = null;

    // Cached runway metrics (computed asynchronously after Frame 1 so Frame 1 has zero forced reflow)
    let runwayTopDocY = 0;
    let runwayScrollable = Math.max(420, (window.innerHeight || 900) * 1.8);

    const syncRunwayMetrics = () => {
      const runwayEl = runwayRefLatest.current?.current;
      if (runwayEl) {
        const rect = runwayEl.getBoundingClientRect();
        runwayTopDocY = rect.top + window.scrollY;
        runwayScrollable = Math.max(1, rect.height - window.innerHeight);
      } else {
        runwayTopDocY = 0;
        runwayScrollable = Math.max(420, window.innerHeight * 2.0);
      }
    };

    const clearOffscreenRTs = () => {
      gl.disable(gl.SCISSOR_TEST);
      gl.clearColor(0, 0, 0, 0);
      const targets = [rtScene, rtCell, rtBA, rtBB];
      for (const rt of targets) {
        if (!rt) continue;
        gl.bindFramebuffer(gl.FRAMEBUFFER, rt.fb);
        gl.viewport(0, 0, rt.w, rt.h);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    };

    const ensureWordmarkTexture = (force = false) => {
      if (startSettled && !force) return;
      if (
        !force &&
        wordmarkBuilt &&
        Math.abs(cssWGlobal - lastMaskCssW) <= 16 &&
        Math.abs(cssHGlobal - lastMaskCssH) <= 16
      ) {
        return;
      }
      lastMaskCssW = cssWGlobal;
      lastMaskCssH = cssHGlobal;
      wordmarkTex = buildWordmarkMaskTexture(
        gl,
        wordmarkTex,
        cssWGlobal,
        cssHGlobal
      );
      wordmarkBuilt = true;
    };

    const syncBuffers = (forceAtlas = false, isInitialMount = false) => {
      let cssW = Math.max(1, Math.round(window.innerWidth || 1440));
      let cssH = Math.max(1, Math.round(window.innerHeight || 900));
      if (!isInitialMount) {
        const rect = glCanvas.getBoundingClientRect();
        cssW = Math.max(1, Math.round(rect.width || cssW));
        cssH = Math.max(1, Math.round(rect.height || cssH));
      }

      const isMobile = cssW < 640;
      const isTablet = cssW >= 640 && cssW < 1024;

      const maxDpr = adaptiveDegraded ? 1.0 : cssW >= 1024 ? 1.25 : 1.5;
      const dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), maxDpr);
      const nw = Math.max(2, Math.round(cssW * dpr));
      const nh = Math.max(2, Math.round(cssH * dpr));

      cssWGlobal = cssW;
      cssHGlobal = cssH;
      dprGlobal = dpr;

      if (!isInitialMount && monoProbeRef.current) {
        monoFamily = window.getComputedStyle(monoProbeRef.current).fontFamily;
      }

      const cellCssW = isMobile ? 6.0 : isTablet ? 6.8 : 7.5;
      const cellCssH = isMobile ? 8.8 : isTablet ? 9.6 : 10.5;
      const nCellPxW = Math.max(6, Math.round(cellCssW * dpr));
      const nCellPxH = Math.max(9, Math.round(cellCssH * dpr));
      const nCols = Math.max(48, Math.floor(nw / nCellPxW));
      const nRows = Math.max(36, Math.floor(nh / nCellPxH));
      const nOriginX = Math.floor((nw - nCols * nCellPxW) * 0.5);
      const nOriginY = Math.floor((nh - nRows * nCellPxH) * 0.5);

      const sceneScale = adaptiveDegraded ? 0.28 : isMobile ? 0.34 : 0.38;

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

      // Defer heavy wordmark mask rasterization off initial mount unless QA pinned near supernova
      if (!wordmarkTex) {
        if (pinnedIntroAt !== null && pinnedIntroAt >= 4.0 && !startSettled) {
          ensureWordmarkTexture(true);
        } else {
          wordmarkTex = createDummyWordmarkTexture(gl);
        }
      } else if (!isInitialMount && wordmarkBuilt && !startSettled) {
        ensureWordmarkTexture(false);
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
      lastScissorMode = "full";
      glCanvas.width = cw;
      glCanvas.height = ch;

      if (starCanvas.width !== cssW || starCanvas.height !== cssH) {
        starCanvas.width = cssW;
        starCanvas.height = cssH;
      }

      freeRT(gl, rtScene);
      freeRT(gl, rtCell);
      freeRT(gl, rtBA);
      freeRT(gl, rtBB);

      const bgW = Math.max(64, Math.round(cw * sceneScale));
      const bgH = Math.max(64, Math.round(ch * sceneScale));
      const bW = Math.max(32, Math.round(cw * 0.18));
      const bH = Math.max(32, Math.round(cw * 0.18));

      rtScene = createRT(gl, bgW, bgH, gl.LINEAR);
      rtCell = createRT(gl, cols, rows, gl.NEAREST);
      rtBA = createRT(gl, bW, bH, gl.LINEAR);
      rtBB = createRT(gl, bW, bH, gl.LINEAR);
      if (!isInitialMount) {
        clearOffscreenRTs();
      }
    };

    syncBuffers(true, true);

    let disposed = false;

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

    const setTargetScissored = (
      rt: RenderTarget | null,
      vMin: number,
      vMax: number
    ) => {
      const w = rt ? rt.w : cw;
      const h = rt ? rt.h : ch;
      gl.bindFramebuffer(gl.FRAMEBUFFER, rt ? rt.fb : null);
      gl.viewport(0, 0, w, h);
      if (vMin <= 0.001 && vMax >= 0.999) {
        gl.disable(gl.SCISSOR_TEST);
      } else {
        const sy = Math.max(0, Math.floor(vMin * h) - 2);
        const syEnd = Math.min(h, Math.ceil(vMax * h) + 2);
        gl.enable(gl.SCISSOR_TEST);
        gl.scissor(0, sy, w, Math.max(1, syEnd - sy));
      }
    };

    let pointerTargetX = 0.5;
    let pointerTargetY = 0.5;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let pointerActiveTarget = 0;
    let pointerActive = 0;
    // UI-5: Damped 3D camera pointer parallax (desktop pointer: fine only)
    let parallaxX = 0;
    let parallaxY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || reducedMotion) return;
      pointerTargetX = clamp01(e.clientX / Math.max(1, cssWGlobal));
      pointerTargetY = clamp01(1 - e.clientY / Math.max(1, cssHGlobal));
      pointerActiveTarget = 1;
    };
    const handlePointerLeave = () => {
      pointerActiveTarget = 0;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, {
      passive: true,
    });

    let introElapsed =
      pinnedIntroAt !== null
        ? Math.min(INTRO_TOTAL_SEC, pinnedIntroAt)
        : startSettled
          ? INTRO_TOTAL_SEC
          : 0.0;
    let resolveElapsed =
      pinnedIntroAt !== null
        ? Math.max(0, pinnedIntroAt - INTRO_TOTAL_SEC)
        : startSettled
          ? 2.0
          : 0.0;
    let starSpinPhase =
      pinnedIntroAt !== null ? computeDeterministicSpinPhase(pinnedIntroAt) : 0.0;
    let replayScrollGuard = false;
    let replayGuardElapsed = 0;

    // UI-2 Waitlist gravitational coupling state
    let uiRippleAmp = 0;
    let uiShockActive = false;
    let uiShockElapsed = 0;
    const UI_SHOCK_DURATION = 1.25;

    let smoothedPin = 0.0;
    let lastTs = performance.now();
    let lastBgDraw = 0;
    let rafId = 0;
    let loopRunning = false;
    let firstStarPaintPerfMs: number | null = null;

    let dtEma = 0.0166;
    let overBudgetSec = 0;
    let lastPulseEdgeSec = -1;
    let lastPulseTriggerPerfMs = 0;

    // Expose imperative controls for SKIP ->, Footer REPLAY, and WaitlistBar coupling
    const controlApi: AsciiBlackholeControl = {
      skipIntro: () => {
        pinnedIntroAt = null;
        startSettled = false;
        replayScrollGuard = false;
        introElapsed = INTRO_TOTAL_SEC;
        resolveElapsed = 0.0;
        if (!heroRevealed) {
          heroRevealed = true;
          onRevealRef.current(true);
        }
        if (ssrSeedRef.current) {
          ssrSeedRef.current.style.display = "none";
        }
        lastBgDraw = 0;
      },
      replayIntro: () => {
        if (reducedMotion) return;
        pinnedIntroAt = null;
        startSettled = false;
        introElapsed = 0.0;
        resolveElapsed = 0.0;
        starSpinPhase = 0.0;
        uiRippleAmp = 0;
        uiShockActive = false;
        uiShockElapsed = 0;
        replayScrollGuard = window.scrollY > 24;
        replayGuardElapsed = 0;
        smoothedPin = 0.0;
        heroRevealed = false;
        onRevealRef.current(false);
        if (starCtx) {
          starCtx.clearRect(0, 0, cssWGlobal, cssHGlobal);
        }
        lastScissorMode = "full";
        clearOffscreenRTs();
        if (!wordmarkBuilt) {
          ensureWordmarkTexture(true);
        }
      },
      pulseHorizon: (kind) => {
        if (reducedMotion) return;
        if (kind === "subtle") {
          uiRippleAmp = Math.min(1.0, Math.max(uiRippleAmp, 0.72));
        } else {
          uiShockActive = true;
          uiShockElapsed = 0.0;
          uiRippleAmp = 1.0;
          lastBgDraw = 0;
        }
      },
    };
    if (controlRefLatest.current) {
      controlRefLatest.current.current = controlApi;
    }

    const drawBackgroundField = (
      tSec: number,
      pin: number,
      settle: number,
      starWave: number,
      shockAmp: number,
      shockProg: number
    ) => {
      if (!starCtx || cssWGlobal <= 1 || cssHGlobal <= 1) return;
      if (starWave <= 0.005 && settle <= 0.05) return;

      starCtx.setTransform(1, 0, 0, 1, 0, 0);
      starCtx.clearRect(0, 0, cssWGlobal, cssHGlobal);

      if (settle > 0.05) {
        const glowY = cssHGlobal * mixNum(0.84, 0.09, pin);
        const glowRad =
          Math.max(cssWGlobal, cssHGlobal) * mixNum(0.26, 0.14, pin);
        const grad = starCtx.createRadialGradient(
          cssWGlobal * 0.5,
          glowY,
          0,
          cssWGlobal * 0.5,
          glowY,
          glowRad
        );
        grad.addColorStop(
          0,
          `rgba(78, 20, 140, ${(mixNum(0.04, 0.02, pin) * settle).toFixed(3)})`
        );
        grad.addColorStop(1, "rgba(4, 2, 6, 0)");
        starCtx.fillStyle = grad;
        starCtx.fillRect(0, 0, cssWGlobal, cssHGlobal);
      }

      starCtx.textAlign = "center";
      starCtx.textBaseline = "middle";

      const font10 = `500 10px ${monoFamily}`;
      const font12 = `500 12px ${monoFamily}`;

      if (starWave > 0.005) {
        const calmBelowFold = mixNum(1.0, 0.58, pin);
        const waveOriginY = mixNum(0.82, 0.08, pin);
        for (let i = 0; i < stars.length; i++) {
          const st = stars[i];
          const localAppear = smoothstep(
            st.crestDist * 0.5,
            st.crestDist * 0.5 + 0.42,
            starWave
          );
          if (localAppear <= 0.01) continue;

          const sx = Math.round(st.nx * cssWGlobal);
          const sy = Math.round(st.ny * cssHGlobal);
          const twinkle = 0.5 + 0.5 * Math.sin(tSec * st.speed + st.phase);

          // UI-2 celebratory shockwave ripples across the ASCII starfield
          let shockBoost = 0;
          if (shockAmp > 0.01) {
            const distFromCrest = Math.hypot(
              (st.nx - 0.5) * 1.15,
              st.ny - waveOriginY
            );
            const waveRadius = shockProg * 1.35;
            const ringDelta = distFromCrest - waveRadius;
            shockBoost =
              Math.exp(-(ringDelta * ringDelta) / 0.016) * shockAmp * 0.72;
          }

          const alpha = clamp01(
            (0.14 + 0.28 * twinkle + shockBoost) * calmBelowFold * localAppear
          );

          starCtx.font =
            st.sizeCss === 12 || shockBoost > 0.22 ? font12 : font10;
          starCtx.fillStyle =
            shockBoost > 0.18 || st.tint === "ice"
              ? "#97DFFC"
              : st.tint === "periwinkle"
                ? "#858AE3"
                : "#613DC1";
          starCtx.globalAlpha = alpha;
          starCtx.fillText(st.glyph, sx, sy);
        }
      }

      if (!reducedMotion && pointerActive > 0.015 && starWave > 0.45) {
        const cursorGlyphs = [".", ":", "-", "^", "t", "T"];
        const ptrCssX = pointerX * cssWGlobal;
        const ptrCssY = (1 - pointerY) * cssHGlobal;
        const gridCss = 20;
        const radiusCss = 92;
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
            const alpha = Math.min(0.28, falloff * fieldFade * 0.34);
            if (alpha < 0.015) continue;

            const glyphIdx = Math.min(
              cursorGlyphs.length - 1,
              Math.floor(falloff * cursorGlyphs.length)
            );
            starCtx.font = falloff > 0.58 ? font12 : font10;
            starCtx.fillStyle =
              dist < 36 ? "#97DFFC" : dist < 72 ? "#858AE3" : "#613DC1";
            starCtx.globalAlpha = alpha;
            starCtx.fillText(
              cursorGlyphs[glyphIdx],
              Math.round(cxCss),
              Math.round(cyCss)
            );
          }
        }
      }

      starCtx.globalAlpha = 1;
    };

    const renderFrame = (ts: number, isFirstPaint = false) => {
      const rawDt = isFirstPaint
        ? 0.001
        : Math.max(0.001, (ts - lastTs) * 0.001);
      const dt = Math.min(0.05, rawDt);
      const wallDt = Math.min(0.4, rawDt);
      lastTs = ts;

      if (!isFirstPaint) {
        dtEma = dtEma * 0.92 + Math.min(rawDt, 0.12) * 0.08;
        if (!adaptiveDegraded && dtEma > 0.026) {
          overBudgetSec += wallDt;
          if (overBudgetSec > 0.75) {
            adaptiveDegraded = true;
            syncBuffers();
          }
        } else {
          overBudgetSec = Math.max(0, overBudgetSec - wallDt * 0.5);
        }
      }

      const pLerp = Math.min(1, dt * 8.5);
      pointerX += (pointerTargetX - pointerX) * pLerp;
      pointerY += (pointerTargetY - pointerY) * pLerp;
      pointerActive +=
        (pointerActiveTarget - pointerActive) * Math.min(1, dt * 5.2);

      // UI-5: Damped 3D camera pointer parallax (desktop fine pointer only)
      const targetParallaxX =
        pointerFine && !reducedMotion && pointerActiveTarget > 0.5
          ? (pointerTargetX - 0.5) * 2.0
          : 0.0;
      const targetParallaxY =
        pointerFine && !reducedMotion && pointerActiveTarget > 0.5
          ? (pointerTargetY - 0.5) * 2.0
          : 0.0;
      const paraLerp = Math.min(1, dt * 4.2);
      parallaxX += (targetParallaxX - parallaxX) * paraLerp;
      parallaxY += (targetParallaxY - parallaxY) * paraLerp;

      // UI-2: Decay subtle waitlist ripple & advance celebratory shockwave
      if (uiRippleAmp > 0.001) {
        uiRippleAmp = Math.max(0, uiRippleAmp * Math.exp(-dt * 4.8));
        if (uiRippleAmp < 0.002) uiRippleAmp = 0;
      }
      let uiShockAmp = 0.0;
      let uiShockProg = 0.0;
      if (uiShockActive) {
        uiShockElapsed += dt;
        uiShockProg = clamp01(uiShockElapsed / UI_SHOCK_DURATION);
        uiShockAmp =
          smoothstep(0.0, 0.08, uiShockProg) *
          (1.0 - smoothstep(0.28, 1.0, uiShockProg));
        if (uiShockElapsed >= UI_SHOCK_DURATION) {
          uiShockActive = false;
          uiShockElapsed = 0;
          uiShockAmp = 0;
        }
      }

      // Zero-reflow scroll progress from cached runway metrics
      const rawPin = clamp01(
        (window.scrollY - runwayTopDocY) / runwayScrollable
      );
      const scrollDt = Math.min(0.18, rawDt);
      smoothedPin += (rawPin - smoothedPin) * Math.min(1, scrollDt * 14.0);
      if (Math.abs(rawPin - smoothedPin) < 0.0004) {
        smoothedPin = rawPin;
      }

      if (replayScrollGuard) {
        replayGuardElapsed += wallDt;
        if (window.scrollY <= 24 || replayGuardElapsed > 0.9) {
          replayScrollGuard = false;
          smoothedPin = 0.0;
        }
      }

      if (pinnedIntroAt !== null) {
        introElapsed = Math.min(INTRO_TOTAL_SEC, pinnedIntroAt);
        resolveElapsed = Math.max(0, pinnedIntroAt - INTRO_TOTAL_SEC);
      } else if (replayScrollGuard) {
        introElapsed = 0.0;
        resolveElapsed = 0.0;
      } else if (!isFirstPaint && introElapsed < INTRO_TOTAL_SEC) {
        const scrollBoost = window.scrollY > 24 ? 6.5 : 1.0;
        introElapsed = Math.min(
          INTRO_TOTAL_SEC,
          introElapsed + wallDt * scrollBoost
        );
      } else if (!isFirstPaint) {
        resolveElapsed = Math.min(10, resolveElapsed + wallDt);
      }

      // Deferred wordmark safety trigger shifted to 3.5s (well before 4.32s supernova carve)
      if (!startSettled && !wordmarkBuilt && introElapsed >= 3.5) {
        ensureWordmarkTexture(true);
      }

      const isResolvedNow =
        startSettled || introElapsed >= HERO_REVEAL_SEC - 0.001;
      if (!heroRevealed && isResolvedNow) {
        heroRevealed = true;
        onRevealRef.current(true);
      }

      if (!rtScene || !rtCell || !rtBA || !rtBB || !atlasTex) {
        return;
      }

      const tSec = pinnedIntroAt !== null ? pinnedIntroAt : ts * 0.001;
      const isMobile = cssWGlobal < 768;
      const viewAsp = cw / Math.max(1, ch);
      const tanHalfFov = Math.tan(degToRad(23));

      // =====================================================================
      // 1) PART A: REALISTIC STELLAR EVOLUTION -> GROWING BLACK HOLE (9.90s)
      // =====================================================================
      // Act 1 (0.00s -> 2.65s): Red-Supergiant Swell (0.96 -> 1.72, ~1.8x)
      // Act 2 (2.65s -> 4.15s): 0.15s stall -> Runaway Core Collapse (1.72 -> 0.11)
      const starVis = 1.0 - smoothstep(4.08, 4.24, introElapsed);
      const starRadius = computeStarRadiusAt(introElapsed);
      const starSwell =
        smoothstep(0.05, 2.55, introElapsed) *
        (1.0 - smoothstep(2.68, 3.22, introElapsed));

      if (pinnedIntroAt !== null) {
        starSpinPhase = computeDeterministicSpinPhase(introElapsed);
      } else if (!isFirstPaint && starVis > 0.002) {
        const omega = 0.44 * Math.pow(0.96 / Math.max(0.11, starRadius), 1.35);
        starSpinPhase += omega * dt;
      }

      const pinch =
        smoothstep(2.85, 3.92, introElapsed) *
        (1.0 - smoothstep(4.08, 4.24, introElapsed));
      const starShift = smoothstep(2.85, 3.92, introElapsed);
      const starCrack = clamp01(
        smoothstep(0.95, 2.55, introElapsed) * 0.58 +
          smoothstep(2.68, 3.92, introElapsed) * 0.42
      );
      const implode =
        smoothstep(2.68, 3.18, introElapsed) *
        (1.0 - smoothstep(4.10, 4.26, introElapsed));

      const charge =
        smoothstep(3.65, 4.12, introElapsed) *
        (1.0 - smoothstep(4.16, 4.42, introElapsed));

      // Act 3 (4.15s -> 5.75s): Core-Bounce Supernova + T^minus Carve (4.32s -> 5.50s)
      const blastPeak =
        smoothstep(4.12, 4.32, introElapsed) *
        (1.0 - smoothstep(5.22, 5.72, introElapsed));
      const blastProgress = clamp01((introElapsed - 4.12) / (5.95 - 4.12));
      const ejecta =
        smoothstep(4.12, 4.32, introElapsed) *
        (1.0 - smoothstep(6.2, 7.25, introElapsed));
      const ejectaProg = clamp01((introElapsed - 4.12) / (7.25 - 4.12));
      const wordmarkCarve =
        smoothstep(4.32, 4.52, introElapsed) *
        (1.0 - smoothstep(5.26, 5.5, introElapsed));

      // Act 4 (5.20s -> 7.45s): Pinpoint Singularity Nucleation -> Growing Black Hole (0.04 -> 1.00)
      const bhBirth = smoothstep(5.2, 5.4, introElapsed);
      const bhGrowT = clamp01((introElapsed - 5.2) / (6.85 - 5.2));
      const bhGrowEase = 1.0 - Math.pow(1.0 - smoothstep(0.0, 1.0, bhGrowT), 1.65);
      const bhRadius = mixNum(0.04, 1.0, bhGrowEase);

      const fallback =
        smoothstep(5.25, 5.72, introElapsed) *
        (1.0 - smoothstep(6.95, 7.45, introElapsed));
      const fallbackProg = clamp01((introElapsed - 5.25) / (7.35 - 5.25));
      const diskBirth = smoothstep(5.32, 6.65, introElapsed);

      // Polar neutrino/relativistic jets break out 3.65s -> 4.15s and taper 6.80s -> 8.05s
      const jetBreakout = smoothstep(3.65, 4.08, introElapsed);
      const jetFade = 1.0 - smoothstep(6.8, 8.05, introElapsed);
      const jetPower =
        jetBreakout * (1.0 + charge * 0.64 + blastPeak * 0.35) * jetFade;

      // Act 5 (7.45s -> 9.90s): Orbital Descent & Hero Lock
      const settle = easeInOutQuint(clamp01((introElapsed - 7.45) / (9.9 - 7.45)));

      const lockPulse =
        !startSettled && introElapsed >= INTRO_TOTAL_SEC - 0.001
          ? smoothstep(0.0, 0.08, resolveElapsed) *
            (1.0 - smoothstep(0.16, 0.54, resolveElapsed))
          : 0.0;
      const lockWaveProg = clamp01(resolveElapsed / 0.54);
      const starWave = startSettled
        ? 1.0
        : isResolvedNow
          ? smoothstep(0.0, 0.95, resolveElapsed)
          : 0.0;

      const warmTint = starVis * (1.0 - smoothstep(0.16, 0.72, starShift));

      // =====================================================================
      // 2) 3D ORBITAL CAMERA + UI-5 POINTER PARALLAX + SLIM DOCKED TOP DOME
      // =====================================================================
      const bottomApex = isMobile ? 0.195 : 0.212;
      const topApex = isMobile ? 0.084 : 0.068;

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

      // Polar-only UTC 1-second escapement pulse
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

        const totalWindowMs = 360;
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

      // UI-5: Damped +-2.2 deg azimuth / +-1.2 deg elevation tilt on hero rest & polar plateau
      const parallaxGate =
        settle *
        (1.0 - smoothstep(0.58, 0.84, s)) *
        (pointerFine && !reducedMotion ? 1.0 : 0.0);
      const parallaxAzimRad = degToRad(2.2) * parallaxX * parallaxGate;
      const parallaxElevDeg = 1.2 * parallaxY * parallaxGate;

      const baseScrollElevDeg =
        mixNum(26, 88, segLift) + (154 - 88) * segDock;
      // Keep north-pole polar elevation strictly below 89.2 deg to prevent gimbal flip
      const scrollElevDeg =
        segDock > 0.05
          ? baseScrollElevDeg + parallaxElevDeg
          : Math.min(89.2, baseScrollElevDeg + parallaxElevDeg);

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

      // Intro camera trajectory: gentle pull-back (7.6 -> 8.2) during supergiant swell so limb never clips on 390x844 mobile
      const mobileScale = isMobile ? 1.28 : 1.0;
      const dAct1 = mixNum(7.6, 8.2, smoothstep(0.0, 2.65, introElapsed));
      const dAct2 = mixNum(dAct1, 7.85, smoothstep(2.75, 4.15, introElapsed));
      const introDist =
        mixNum(dAct2, 5.85, smoothstep(4.35, 7.45, introElapsed)) * mobileScale;
      const introElevDeg = mixNum(
        19.0,
        15.0,
        smoothstep(0.0, 7.45, introElapsed)
      );
      const introRoll = mixNum(
        degToRad(-22),
        degToRad(-18),
        smoothstep(0.0, 7.45, introElapsed)
      );

      const elevDegNow = mixNum(introElevDeg, scrollElevDeg, settle);
      const elevRad = degToRad(elevDegNow);
      const camDist = mixNum(introDist, scrollDist, settle);
      const pitchOffset = mixNum(0, scrollPitch, settle);
      const bankRoll = mixNum(introRoll, 0, settle);
      const azimRad = mixNum(0, scrollAzim, settle) + parallaxAzimRad;

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
      const topCountdownY = isMobile ? 33 : 31;
      const polarCenterY = cssHGlobal * 0.5;
      const cdBaseY = mixNum(
        bottomCountdownY,
        topCountdownY,
        smoothstep(0.0, 1.0, s)
      );
      const countdownCenterY = mixNum(cdBaseY, polarCenterY, polarFactor);

      const countdownScale = mixNum(
        1.0,
        isMobile ? 0.58 : 0.64,
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
        introElapsed,
        elevDeg: baseScrollElevDeg,
        scrollAzimDeg: (scrollAzim * 180) / Math.PI,
        tickPulse,
        tickProg,
      });

      // Throttled 1x-DPR starfield (~14fps idle, ~25fps on pointer/shockwave; skipped during Act I-IV)
      const bgIntervalMs =
        uiShockAmp > 0.01 ? 24 : pointerActive > 0.02 ? 40 : 72;
      if (
        (starWave > 0.005 || settle > 0.05) &&
        ts - lastBgDraw >= bgIntervalMs
      ) {
        lastBgDraw = ts;
        drawBackgroundField(tSec, s, settle, starWave, uiShockAmp, uiShockProg);
      }

      // Hardware scissor band (skips 52%–66% of GPU work at idle & below fold; expands cleanly during shockwave)
      let scissorMode: "full" | "bottom" | "top" = "full";
      let vMin = 0.0;
      let vMax = 1.0;
      if (
        settle > 0.99 &&
        polarFactor < 0.01 &&
        lockPulse < 0.002 &&
        uiShockAmp < 0.002
      ) {
        if (segDock < 0.02) {
          scissorMode = "bottom";
          vMin = 0.0;
          vMax = 0.48;
        } else if (segDock > 0.98) {
          scissorMode = "top";
          vMin = 0.66;
          vMax = 1.0;
        }
      }
      if (scissorMode !== lastScissorMode) {
        lastScissorMode = scissorMode;
        if (scissorMode !== "full") {
          clearOffscreenRTs();
        }
      }

      gl.disable(gl.BLEND);

      // ---- PASS 1: Analytic 3D Cosmic Scene ----
      setTargetScissored(rtScene, vMin, vMax);
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
      gl.uniform1f(pScene.u.uStarSwell, starSwell);
      gl.uniform1f(pScene.u.uStarSpinPhase, starSpinPhase);
      gl.uniform1f(pScene.u.uPinch, pinch);
      gl.uniform1f(pScene.u.uStarShift, starShift);
      gl.uniform1f(pScene.u.uStarCrack, starCrack);
      gl.uniform1f(pScene.u.uImplode, implode);
      gl.uniform1f(pScene.u.uEjecta, ejecta);
      gl.uniform1f(pScene.u.uEjectaProg, ejectaProg);
      gl.uniform1f(pScene.u.uBhBirth, bhBirth);
      gl.uniform1f(pScene.u.uBhRadius, bhRadius);
      gl.uniform1f(pScene.u.uFallback, fallback);
      gl.uniform1f(pScene.u.uFallbackProg, fallbackProg);
      gl.uniform1f(pScene.u.uDiskBirth, diskBirth);
      gl.uniform1f(pScene.u.uLockPulse, lockPulse);
      gl.uniform1f(pScene.u.uLockWaveProg, lockWaveProg);
      gl.uniform1f(pScene.u.uUiRipple, uiRippleAmp);
      gl.uniform1f(pScene.u.uUiShock, uiShockAmp);
      gl.uniform1f(pScene.u.uUiShockProg, uiShockProg);
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
      setTargetScissored(rtCell, vMin, vMax);
      gl.useProgram(pCell.prog);
      bindTex(0, rtScene.tex, pCell.u.uBg);
      gl.uniform2f(pCell.u.uBgInv, 1.0 / rtScene.w, 1.0 / rtScene.h);
      gl.uniform2f(pCell.u.uGridOrigin, gridOriginX, gridOriginY);
      gl.uniform2f(pCell.u.uCellPx, cellPxW, cellPxH);
      gl.uniform2f(pCell.u.uCanvasPx, cw, ch);
      gl.uniform2f(pCell.u.uGrid, cols, rows);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // ---- PASS 3: Crisp Single-Tier Pre-Glyph Bloom (2 Passes on rtScene) ----
      gl.useProgram(pBlur.prog);
      setTargetScissored(rtBA, vMin, vMax);
      bindTex(0, rtScene.tex, pBlur.u.uTex);
      gl.uniform2f(pBlur.u.uDir, 1.85 / rtBA.w, 0.0);
      gl.uniform1f(pBlur.u.uThreshold, 0.34);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      setTargetScissored(rtBB, vMin, vMax);
      bindTex(0, rtBA.tex, pBlur.u.uTex);
      gl.uniform2f(pBlur.u.uDir, 0.0, 1.85 / rtBB.h);
      gl.uniform1f(pBlur.u.uThreshold, 0.0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // ---- PASS 4: Direct-to-Screen 1:1 Crisp ASCII + Volumetric Bloom Composite ----
      gl.disable(gl.SCISSOR_TEST);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, cw, ch);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      setTargetScissored(null, vMin, vMax);
      gl.useProgram(pGlyphComp.prog);
      bindTex(0, rtCell.tex, pGlyphComp.u.uCell);
      bindTex(1, rtScene.tex, pGlyphComp.u.uBg);
      bindTex(2, atlasTex, pGlyphComp.u.uAtlas);
      bindTex(3, rtBB.tex, pGlyphComp.u.uBloom);
      if (wordmarkTex) {
        bindTex(4, wordmarkTex, pGlyphComp.u.uWordmarkMask);
      }
      gl.uniform2i(pGlyphComp.u.uGrid, cols, rows);
      gl.uniform2i(pGlyphComp.u.uCellPx, cellPxW, cellPxH);
      gl.uniform2i(pGlyphComp.u.uGridOrigin, gridOriginX, gridOriginY);
      gl.uniform2f(pGlyphComp.u.uCanvasPx, cw, ch);
      gl.uniform1f(pGlyphComp.u.uGlyphCount, ASCII_RAMP.length);
      gl.uniform1f(pGlyphComp.u.uWordmarkCarve, wordmarkCarve);
      gl.uniform1f(pGlyphComp.u.uBlastPeak, blastPeak);
      gl.uniform1f(pGlyphComp.u.uWarmTint, warmTint);
      gl.uniform1f(pGlyphComp.u.uSettle, settle);
      const glowAmount =
        mixNum(0.46, 0.54, settle) +
        starVis * 0.14 +
        ejecta * 0.16 +
        fallback * 0.14 +
        blastPeak * 0.34 +
        lockPulse * 0.1 +
        uiRippleAmp * 0.08 +
        uiShockAmp * 0.24 +
        tickPulse * 0.18;
      gl.uniform1f(pGlyphComp.u.uGlow, glowAmount);
      gl.uniform2f(pGlyphComp.u.uPointer, pointerX, pointerY);
      gl.uniform1f(pGlyphComp.u.uPointerActive, pointerActive);
      gl.uniform1f(pGlyphComp.u.uViewAsp, viewAsp);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.disable(gl.SCISSOR_TEST);

      if (firstStarPaintPerfMs === null && starVis > 0.5) {
        firstStarPaintPerfMs = Number(performance.now().toFixed(2));
      }
      if (ssrSeedRef.current && ssrSeedRef.current.style.display !== "none") {
        ssrSeedRef.current.style.display = "none";
      }

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
          firstStarPaintPerfMs,
          wordmarkBuilt,
          introElapsed: Number(introElapsed.toFixed(3)),
          resolveElapsed: Number(resolveElapsed.toFixed(3)),
          starRadius: Number(starRadius.toFixed(3)),
          starSwell: Number(starSwell.toFixed(3)),
          bhRadius: Number(bhRadius.toFixed(3)),
          fallback: Number(fallback.toFixed(3)),
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
          elevDeg: Number(elevDegNow.toFixed(1)),
          parallaxAzimDeg: Number(((parallaxAzimRad * 180) / Math.PI).toFixed(2)),
          parallaxElevDeg: Number(parallaxElevDeg.toFixed(2)),
          uiRippleAmp: Number(uiRippleAmp.toFixed(3)),
          uiShockAmp: Number(uiShockAmp.toFixed(3)),
        };
      }
    };

    const frame = (ts: number) => {
      if (disposed || document.hidden) {
        loopRunning = false;
        return;
      }
      rafId = window.requestAnimationFrame(frame);
      renderFrame(ts, false);
    };

    const startLoop = (paintImmediately = false) => {
      if (disposed || loopRunning || document.hidden) return;
      loopRunning = true;
      const now = performance.now();
      lastTs = now;
      if (paintImmediately) {
        renderFrame(now, true);
      }
      rafId = window.requestAnimationFrame(frame);
    };

    const stopLoop = () => {
      if (!loopRunning) return;
      loopRunning = false;
      window.cancelAnimationFrame(rafId);
    };

    const onVisibility = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop(false);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Paint Frame 1 immediately on mount so the warm dying star appears with zero rAF delay
    startLoop(true);

    let roCanvas: ResizeObserver | null = null;
    let roRunway: ResizeObserver | null = null;
    let postMountTimer = 0;
    let wordmarkIdleId = 0;
    let wordmarkTimer = 0;

    postMountTimer = window.setTimeout(() => {
      if (disposed) return;
      syncRunwayMetrics();
      roCanvas = new ResizeObserver(() => {
        if (disposed) return;
        syncBuffers(false, false);
        syncRunwayMetrics();
      });
      roCanvas.observe(glCanvas);

      const runwayElInit = runwayRefLatest.current?.current;
      if (runwayElInit) {
        roRunway = new ResizeObserver(() => {
          if (!disposed) syncRunwayMetrics();
        });
        roRunway.observe(runwayElInit);
      }
    }, 0);

    // Build wordmark mask well before 4.32s supernova carve without blocking Frame 1
    if (!startSettled && !wordmarkBuilt) {
      const scheduleWordmarkBuild = () => {
        if (disposed || wordmarkBuilt) return;
        ensureWordmarkTexture(true);
      };
      if (
        typeof (window as unknown as { requestIdleCallback?: unknown })
          .requestIdleCallback === "function"
      ) {
        wordmarkIdleId = (
          window as Window & {
            requestIdleCallback: (
              cb: () => void,
              opts?: { timeout: number }
            ) => number;
          }
        ).requestIdleCallback(scheduleWordmarkBuild, { timeout: 1400 });
      } else {
        wordmarkTimer = window.setTimeout(scheduleWordmarkBuild, 450);
      }
    }

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready
        .then(() => {
          if (disposed) return;
          if (!startSettled) {
            window.setTimeout(() => {
              if (!disposed) ensureWordmarkTexture(true);
            }, 220);
          }
          syncBuffers(true, false);
          syncRunwayMetrics();
        })
        .catch(() => {});
    }

    return () => {
      disposed = true;
      if (controlRefLatest.current) {
        controlRefLatest.current.current = null;
      }
      window.clearTimeout(postMountTimer);
      window.clearTimeout(wordmarkTimer);
      if (
        wordmarkIdleId &&
        typeof (window as unknown as { cancelIdleCallback?: unknown })
          .cancelIdleCallback === "function"
      ) {
        (
          window as Window & { cancelIdleCallback: (id: number) => void }
        ).cancelIdleCallback(wordmarkIdleId);
      }
      stopLoop();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      roCanvas?.disconnect();
      roRunway?.disconnect();
      freeRT(gl, rtScene);
      freeRT(gl, rtCell);
      freeRT(gl, rtBA);
      freeRT(gl, rtBB);
      if (atlasTex) gl.deleteTexture(atlasTex);
      if (wordmarkTex) gl.deleteTexture(wordmarkTex);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(pScene.prog);
      gl.deleteProgram(pCell.prog);
      gl.deleteProgram(pBlur.prog);
      gl.deleteProgram(pGlyphComp.prog);
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
      {!skipIntro ? (
        <div
          ref={ssrSeedRef}
          data-star-ssr-seed="true"
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[25] flex items-center justify-center bg-[#040206] motion-reduce:hidden"
        >
          {/* Sized ~34dvh mobile / ~42dvh desktop to seamlessly match R = 0.96 at d = 7.6 */}
          <div
            className="h-[34dvh] w-[34dvh] rounded-full sm:h-[42dvh] sm:w-[42dvh]"
            style={{
              background:
                "radial-gradient(circle, #FFF8E8 0%, #F4D8AE 26%, #EBC998 44%, rgba(143, 87, 55, 0.72) 61%, rgba(240, 199, 144, 0.22) 77%, rgba(4, 2, 6, 0) 100%)",
              filter: "blur(0.8px)",
            }}
          />
        </div>
      ) : null}
      <canvas
        ref={glCanvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 h-full w-full"
      />
    </>
  );
}
