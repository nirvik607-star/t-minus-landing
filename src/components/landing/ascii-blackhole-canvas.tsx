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

// ---- Approved Intro Choreography Timings (Total 7.25s) ----
// Stage A (Cosmic Opening):            0.00s -> 3.60s (tilted 3/4 + helical #97DFFC jets)
// Stage B (Snappy Supernova + T^minus): 3.60s -> 4.95s (0.30s charge -> 0.78s white/ice burst -> 0.27s snap)
// Stage C (Unbroken 3D Sweep -> Hero):  4.85s -> 7.25s (hero reveal triggers ~6.05s)
const INTRO_TOTAL_SEC = 7.25;
const HERO_REVEAL_SEC = 6.05;

const VS_QUAD = `#version 300 es
precision highp float;
out vec2 vUv;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

/**
 * Pass 1: Loop-Free Analytic 3D Relativistic Black Hole + Kurzgesagt Spiral Streamlines
 *         + 3D Helical Polar Jets + Pure-White / Ice-Blue-Tinted Supernova
 *
 * - Pure procedural WebGL2 / GLSL ES 3.00 (ZERO MP4 video, ZERO texture lookups, ZERO raymarch loops).
 * - One true 3D black hole at world origin (0,0,0) with R_h = 1.0, equatorial disk in y = 0,
 *   and relativistic polar jets along +/- y.
 * - Strict T^minus Galaxy palette:
 *   #040206 obsidian space | #000000 pure event horizon |
 *   #2C0735 -> #4E148C -> #613DC1 -> #858AE3 -> #F7FAFF specular white core |
 *   #97DFFC ice-blue polar jets, inner ISCO sparks, explosion highlights & pointer ripple.
 *   ZERO orange/yellow.
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

// Continuous state parameters
uniform float uSettle;         // 0 = full-screen intro, 1 = settled horizon/scroll
uniform float uPin;            // 0 = bottom horizon, 1 = top-pinned dome
uniform float uPolarFactor;    // 0 = tilted / horizon, 1 = top-down polar spiral plateau
uniform float uDiskOuterR;     // smooth breathing disk extent (5.2 intro -> 2.65 hero -> 5.4 polar -> 2.35 top dome)
uniform float uJetPower;       // 1.0 intro -> 1.45 charge -> 0.0 settled
uniform float uCharge;         // 0..1 pre-detonation gravitational compression surge
uniform float uBlastPeak;      // 0..1 pure-white + ice-blue-tinted supernova peak
uniform float uBlastProgress;  // 0..1 expanding shockfront wave across Stage B
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

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

/**
 * Evaluate the unified 3D Kurzgesagt-inspired accretion disk at equatorial point xz (y = 0).
 * Seamless across all 360 deg via integer harmonic angular multipliers + continuous logarithmic
 * inward spiral twist (mild curl in tilted intro -> unmistakable inward spiral at polar plateau).
 * Returns vec4(rgb, opacity).
 */
vec4 evalDisk(vec2 xz, float outerR, float polarF, float time, float dopplerBias) {
  float r = length(xz);
  if (r < 1.02 || r > outerR) return vec4(0.0);

  float theta = atan(xz.y, xz.x);
  float logR = log(r);

  // Radial visibility envelope (crisp inner edge outside R_h, clean fade before outerR)
  float innerEnv = smoothstep(1.025, 1.13, r);
  float outerEnv = 1.0 - smoothstep(outerR * 0.62, outerR, r);
  float rNorm = clamp((r - 1.05) / max(0.6, outerR - 1.05), 0.0, 1.0);

  // Continuous inward logarithmic spiral tightness:
  // Tilted intro/horizon: crisp concentric tracks with subtle curl
  // Polar top-down dwell: bold unmistakable inward-spiraling vortex toward #000000 core
  float spiralTwist = mix(3.4, 14.5, polarF);
  float infall = time * mix(0.22, 0.62, polarF);

  // ---- Stratum 1: Hot Inner ISCO Streamlines (sweeps right into #000000 photon limb) ----
  float s1Phase = 3.0 * theta + (spiralTwist * 1.15) * logR + infall * 1.45 - time * 1.15;
  float s1Ring = smoothstep(0.30, 0.80, 0.5 + 0.5 * cos(s1Phase));
  float s1Conc = smoothstep(0.34, 0.82, 0.5 + 0.5 * cos(logR * 25.0 + infall * 2.2));
  float s1Track = mix(mix(s1Conc, s1Ring, 0.55), s1Ring, polarF);
  float s1Dash = smoothstep(0.14, 0.64, 0.5 + 0.5 * cos(4.0 * theta - 5.2 * logR - time * 1.9));
  float s1Env = smoothstep(1.025, 1.09, r) * (1.0 - smoothstep(1.65, 2.45, r));
  float s1Val = s1Track * (0.48 + 0.52 * s1Dash) * s1Env;

  // ---- Stratum 2: Bold Kurzgesagt Mid-Disk Dashed Spiral Arms (clean dark inter-lane channels) ----
  float s2ArmA = smoothstep(0.38, 0.82, 0.5 + 0.5 * cos(4.0 * theta + spiralTwist * logR + infall * 1.15 - time * 0.72));
  float s2ArmB = smoothstep(0.46, 0.84, 0.5 + 0.5 * cos(2.0 * theta + (spiralTwist * 0.72) * logR + infall * 0.85 - time * 0.48 + 1.4));
  // Concentric Kurzgesagt ring clarity when tilted (smoothly hands off to strong spiral at polar)
  float s2Conc = smoothstep(0.40, 0.80, 0.5 + 0.5 * cos(logR * 17.5 + infall * 1.4));
  float s2Lane = mix(max(s2Conc * 0.88, s2ArmA * 0.84), max(s2ArmA, s2ArmB * 0.88), polarF);
  // Variable-length tapered orbital dashes along the lanes
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

  // Soft underlying accretion plasma glow (restrained so dark inter-lane channels stay razor-legible in ASCII)
  float baseBed = exp(-(r - 1.05) * mix(1.45, 0.88, polarF)) * innerEnv * outerEnv * 0.30;

  // Inner ice-blue ISCO spark accents (restrained high-velocity Kurzgesagt accents)
  float sparkWave = smoothstep(0.84, 0.97, 0.5 + 0.5 * cos(5.0 * theta + (spiralTwist * 1.1) * logR - time * 2.1));
  float iceSpark = sparkWave * s1Env * (0.38 + 0.32 * polarF);

  // Relativistic Doppler asymmetry in tilted views, relaxing to full radial symmetry at polar top-down
  float doppler = 1.0 + dopplerBias * (1.0 - polarF) * 0.24 * cos(theta - 0.55);

  float energy = (baseBed + s1Val * 0.95 + s2Val * 0.78 + s3Val * 0.46) * doppler;
  energy *= (1.0 + uCharge * 0.65);

  // Strict T^minus Galaxy color ramp (zero orange/yellow)
  vec3 col = mix(C_SPACE, C_DEEP_PURPLE, smoothstep(0.05, 0.26, energy));
  col = mix(col, C_ACCENT, smoothstep(0.22, 0.50, energy));
  col = mix(col, C_PERIWINKLE, smoothstep(0.44, 0.78, energy));
  col = mix(col, C_WHITE_CORE, smoothstep(0.74, 1.12, energy));

  // Cool violet-to-periwinkle depth shift across radius + selective #97DFFC ice-blue glints
  col = mix(col, mix(C_DEEP_PURPLE, C_ACCENT, 0.55), rNorm * 0.34 * (1.0 - s1Val));
  col = mix(col, mix(C_ICE_BLUE, C_WHITE_CORE, 0.35), clamp(iceSpark * 0.78, 0.0, 0.78));

  float alpha = clamp(energy * 1.18, 0.0, 1.0) * innerEnv * outerEnv;
  return vec4(col * clamp(energy * 1.25, 0.0, 1.45), alpha);
}

/**
 * Evaluate closed-form 3D relativistic helical & streaked polar jets along +/- y axis.
 * Zero raymarching; depth-tested cleanly against the black hole shadow sphere.
 */
vec4 evalPolarJets(vec3 ro, vec3 rd, float tSphere, float coreShadow, float jetPower, float time) {
  if (jetPower <= 0.004) return vec4(0.0);

  float a = dot(rd.xz, rd.xz);
  if (a < 1e-5) return vec4(0.0);

  float tAxis = -dot(ro.xz, rd.xz) / a;
  if (tAxis <= 0.0) return vec4(0.0);

  // Occlude the far side of the jet behind the #000000 event horizon shadow
  float occ = (coreShadow > 0.5 && tAxis > tSphere) ? (1.0 - coreShadow) : 1.0;
  if (occ <= 0.01) return vec4(0.0);

  vec3 pAxis = ro + tAxis * rd;
  float s = pAxis.y;
  float absS = abs(s);
  if (absS < 0.84 || absS > 7.8) return vec4(0.0);

  float dPerp = length(pAxis.xz);

  // Collimated hyperboloid funnel widening cleanly from the poles
  float w = 0.095 + 0.064 * pow(max(absS - 0.85, 0.0), 1.14);
  if (dPerp > w * 2.6) return vec4(0.0);

  // Axial start right at pole & smooth far taper
  float axialEnv = smoothstep(0.86, 1.18, absS) * (1.0 - smoothstep(4.2, 7.6, absS));

  // Signed screen-transverse coordinate across the jet axis for 3D helical ribbons
  vec2 perpDir = normalize(vec2(-rd.z, rd.x) + vec2(1e-5));
  float signedX = dot(pAxis.xz, perpDir);

  // 1) Core collimated plasma beam
  float coreBeam = exp(-pow(dPerp / (w * 0.56), 2.0));

  // 2) Dual counter-wound Kurzgesagt helical ribbons spiraling outward along the jet
  float helixPhaseA = absS * 3.55 - time * 5.4;
  float helixPhaseB = absS * 3.55 - time * 5.4 + PI;
  float hA = w * 0.86 * sin(helixPhaseA);
  float hB = w * 0.86 * sin(helixPhaseB);
  float ribW = max(0.032, w * 0.24);
  float ribbonA = exp(-pow((signedX - hA) / ribW, 2.0)) * (0.55 + 0.45 * cos(helixPhaseA));
  float ribbonB = exp(-pow((signedX - hB) / ribW, 2.0)) * (0.55 + 0.45 * cos(helixPhaseB));
  float helices = clamp(ribbonA + ribbonB, 0.0, 1.35) * smoothstep(w * 1.9, w * 0.4, dPerp);

  // 3) High-velocity streaked plasma dashes shooting outward from the poles
  float laneId = floor((signedX / max(w, 0.05)) * 2.5 + 3.0);
  float laneSeed = hash11(laneId + (s > 0.0 ? 11.3 : 29.7));
  float streak = smoothstep(0.45, 0.88, 0.5 + 0.5 * sin(absS * 5.2 - time * (8.5 + laneSeed * 4.0) + laneSeed * TWO_PI));
  float streakMask = streak * exp(-pow(dPerp / (w * 0.95), 2.0));

  // Outer violet magnetic sheath
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
  // Subtle pointer gravitational lens deflection near rim
  vec2 ndcDeflected = ndc - (vUv - uPointer) * (0.018 * ptrRipple);
  vec3 rd = normalize(
    uCamFwd +
    ndcDeflected.x * uViewAsp * uTanHalfFov * uCamRight +
    ndcDeflected.y * uTanHalfFov * uCamUp
  );
  vec3 ro = uCamPos;

  // ---- 1) Exact 3D #000000 Event Horizon Shadow Sphere ----
  float tc = -dot(ro, rd);
  vec3 closestPt = ro + max(tc, 0.0) * rd;
  float b = length(closestPt);
  float pixelAA = max(0.006, (2.2 * uTanHalfFov / max(uSceneH, 64.0)) * max(tc, 1.0));
  float coreShadow = (tc > 0.0) ? (1.0 - smoothstep(R_H - pixelAA, R_H + pixelAA, b)) : 0.0;
  float tSphere = (b < R_H && tc > 0.0) ? (tc - sqrt(max(0.0, R_H * R_H - b * b))) : 1e9;

  // ---- 2) Analytic Gravitational Lensing + Front/Rear Equatorial Disk ----
  vec3 accumCol = vec3(0.0);
  float accumAlpha = 0.0;

  // Close-up settled bottom/top horizon factor (0 in intro & polar, 1 at settled horizons)
  float horizonClose = (1.0 - uPolarFactor) * uSettle;
  // Tight radial impact-parameter bound at settled horizons so open space above hero & below top dome stays 100% clean
  float horizonBound = mix(1.0, 1.0 - smoothstep(1.20, 1.46, b), horizonClose);
  // Behind-sphere Einstein lensing shines in tilted views, handing off seamlessly to direct 360 deg disk at polar plateau
  float lensedWeight = 1.0 - smoothstep(0.28, 0.78, uPolarFactor);

  // 2a) Gravitationally bent rear disk (Einstein upper & lower arches in tilted intro & horizons)
  if (b > R_H - pixelAA && tc > 0.0 && lensedWeight > 0.002 && horizonBound > 0.002) {
    float u_b = max(b - 0.58 * R_H, 0.032);
    float deflect = min(2.36, 1.14 / pow(u_b, 1.18));
    vec3 e_r = closestPt / max(b, 1e-4);
    vec3 rdBent = normalize(cos(deflect) * rd - sin(deflect) * e_r);

    if (abs(rdBent.y) > 1e-4) {
      float tRear = -closestPt.y / rdBent.y;
      if (tRear > 0.0) {
        vec3 hitRear = closestPt + tRear * rdBent;
        vec4 rearDisk = evalDisk(hitRear.xz, uDiskOuterR, uPolarFactor, uTime, 1.0);
        float archBoost = 1.0 + 0.34 * exp(-max(b - R_H, 0.0) * 3.6);
        float vis = (1.0 - coreShadow) * lensedWeight * horizonBound;
        accumCol += rearDisk.rgb * archBoost * vis;
        accumAlpha = max(accumAlpha, rearDisk.a * vis);
      }
    }
  }

  // 2b) Relativistic photon ring + layered Kurzgesagt horizon corona hugging the exact shadow limb (b -> 1.00..1.35)
  if (tc > 0.0) {
    float distOut = b - R_H;
    float ringAng = atan(closestPt.y, closestPt.x);
    float ringShimmer = 0.70 + 0.30 * sin(ringAng * 3.0 - uTime * 1.45) * cos(ringAng * 2.0 + uTime * 0.85);
    float ringStream = 0.5 + 0.5 * cos(ringAng * 6.0 - distOut * 34.0 - uTime * 1.9);

    // Rich, crisp photon ring & luminous horizon crescent on settled bottom/top horizons + polar core
    float photonWidth = mix(mix(26.0, 31.0, uPin), 24.0, uPolarFactor);
    float photonRing = exp(-pow((distOut - 0.016) * photonWidth, 2.0)) * (1.0 - coreShadow);

    // Secondary striated horizon plasma band hugging b = 1.01..1.28 on bottom hero & top dome
    float horizonArc = exp(-max(distOut, 0.0) * mix(9.2, 11.2, uPin))
      * smoothstep(-0.006, 0.018, distOut) * (1.0 - coreShadow) * horizonClose;
    float arcStripes = 0.62 + 0.38 * smoothstep(0.28, 0.78, ringStream);

    float innerHalo = exp(-max(distOut, 0.0) * mix(mix(7.8, 9.6, uPin), 6.2, uPolarFactor))
      * smoothstep(-0.01, 0.02, distOut) * (1.0 - coreShadow);

    float ptrLift = 1.0 + ptrRipple * 0.45;
    vec3 photonCol = mix(C_PERIWINKLE, C_WHITE_CORE, 0.64 + 0.24 * ringShimmer);
    photonCol = mix(photonCol, C_ICE_BLUE, clamp(ptrRipple * 0.55 + uCharge * 0.45 + 0.16 * ringShimmer, 0.0, 0.75));
    vec3 arcCol = mix(C_ACCENT, C_PERIWINKLE, smoothstep(0.25, 0.85, arcStripes * ringShimmer));
    arcCol = mix(arcCol, C_WHITE_CORE, smoothstep(0.06, 0.01, distOut) * 0.65);
    vec3 haloCol = mix(C_DEEP_PURPLE, C_ACCENT, 0.55 + 0.28 * ringShimmer);

    float photonBoost = mix(1.0, 1.24, horizonClose);
    accumCol += photonCol * photonRing * (0.90 + 0.30 * ringShimmer + uCharge * 0.75) * photonBoost * ptrLift;
    accumCol += arcCol * horizonArc * arcStripes * 0.86 * ptrLift;
    accumCol += haloCol * innerHalo * (0.34 + 0.16 * ringShimmer) * ptrLift;
    accumAlpha = max(accumAlpha, clamp(photonRing * 0.98 + horizonArc * 0.82 + innerHalo * 0.52, 0.0, 1.0));
  }

  // 2c) Direct equatorial disk:
  //     - In tilted views: renders the exact near half cleanly IN FRONT of the #000000 shadow
  //     - In top-down polar view (uPolarFactor -> 1): renders the ENTIRE 360 deg inward-spiraling disk seamlessly!
  float frontCoversShadow = 0.0;
  if (abs(rd.y) > 1e-4) {
    float tFront = -ro.y / rd.y;
    float maxT = tc + mix(0.04, 18.0, smoothstep(0.20, 0.72, uPolarFactor));
    if (tFront > 0.0 && tFront < tSphere && tFront <= maxT) {
      vec3 hitFront = ro + tFront * rd;
      // Gentle polar relativistic compression right outside R_h so spiral arms hug the photon ring cleanly
      vec2 diskXZ = hitFront.xz * mix(1.0, 0.955, uPolarFactor);
      vec4 frontDisk = evalDisk(diskXZ, uDiskOuterR, uPolarFactor, uTime, 1.0);
      float diskGate = horizonBound;
      if (frontDisk.a * diskGate > 0.002) {
        float frontCov = clamp(frontDisk.a * 1.18 * diskGate, 0.0, 1.0);
        accumCol = mix(accumCol, frontDisk.rgb * diskGate, frontCov) + frontDisk.rgb * (0.18 * diskGate);
        accumAlpha = max(accumAlpha, frontCov);
        // Only allow the near tilted disk (not polar) to cross in front of the core shadow
        frontCoversShadow = frontCov * (1.0 - smoothstep(0.25, 0.65, uPolarFactor));
      }
    }
  }

  // 2d) 3D Helical & Streaked Polar Jets along +/- y (intro & pre-blast surge)
  vec4 jets = evalPolarJets(ro, rd, tSphere, coreShadow, uJetPower, uTime);
  accumCol += jets.rgb;
  accumAlpha = max(accumAlpha, jets.a);

  // Enforce true pure #000000 inside the uncovered event horizon shadow
  float pureCoreLock = coreShadow * (1.0 - frontCoversShadow);
  accumCol *= (1.0 - pureCoreLock);

  // ---- 3) Supernova Explosion Light: Pure White + Extra-Bright Ice-Blue-Tinted Highlights ----
  if (uCharge > 0.001 || uBlastPeak > 0.001) {
    vec2 blastPos = (vUv - vec2(0.5, 0.5)) * vec2(uViewAsp * 0.68, 1.0);
    float blastR = length(blastPos);
    float blastAng = atan(blastPos.y, blastPos.x);

    // Rapid pre-detonation implosion core ignition
    if (uCharge > 0.001) {
      float coreSpark = exp(-pow(blastR * 3.8, 2.0)) * uCharge;
      vec3 chargeLight = mix(C_ICE_BLUE, vec3(1.0), 0.65);
      accumCol += chargeLight * coreSpark * 1.25;
      accumAlpha = max(accumAlpha, clamp(coreSpark, 0.0, 1.0));
    }

    if (uBlastPeak > 0.001) {
      // Blinding pure white (#FFFFFF / #F7FAFF) supernova core behind T^minus,
      // radiating into un-clipped extra-bright #97DFFC ice-blue shockfront & crisp radial streaks
      float coreWhite = exp(-pow(blastR * 1.65, 2.0));
      float midHalo = exp(-pow(blastR * 0.88, 2.0));

      // Expanding extra-bright ice-blue-tinted luminous shockfront ring
      float rShock = mix(0.22, 0.96, uBlastProgress);
      float shockRing = exp(-pow((blastR - rShock) * 8.5, 2.0));

      // Crisp radial supernova energy streaks radiating outward
      float raysA = pow(0.5 + 0.5 * cos(blastAng * 8.0 - uTime * 2.0), 3.0);
      float raysB = pow(0.5 + 0.5 * cos(blastAng * 14.0 + uTime * 1.5 + 0.7), 4.0);
      float radialRays = (raysA * 0.68 + raysB * 0.44) * exp(-blastR * 0.95);

      // Keep pure white dominant right behind T^minus while preserving vivid un-clipped #97DFFC shockfront & rays
      vec3 iceTintedWhite = mix(vec3(0.92, 0.98, 1.0), C_ICE_BLUE, 0.56);
      vec3 brightIceRing = mix(C_ICE_BLUE, vec3(0.86, 0.97, 1.0), 0.42);
      vec3 outerIceSpace = mix(C_DEEP_PURPLE, mix(C_PERIWINKLE, C_ICE_BLUE, 0.68), smoothstep(0.08, 0.72, midHalo + radialRays * 0.55));

      vec3 blastCol = mix(outerIceSpace, iceTintedWhite, smoothstep(0.26, 0.78, midHalo * 0.85 + radialRays * 0.42));
      blastCol = mix(blastCol, brightIceRing, clamp(shockRing * 0.88 + radialRays * 0.46 * (1.0 - coreWhite), 0.0, 0.92));
      blastCol = mix(blastCol, vec3(1.0, 1.0, 1.0), smoothstep(0.32, 0.82, coreWhite * 1.05 + midHalo * 0.28));

      float blastMix = clamp(uBlastPeak * (0.42 + 0.58 * midHalo + 0.34 * shockRing + 0.22 * radialRays), 0.0, 0.99);
      accumCol = mix(accumCol, blastCol, blastMix);
      accumAlpha = max(accumAlpha, clamp(uBlastPeak * 0.99, 0.0, 1.0));
      pureCoreLock *= (1.0 - smoothstep(0.10, 0.45, uBlastPeak));
    }
  }

  // During intro (settle < 0.55), keep sky grounded in #040206 obsidian; once settled, open space is alpha = 0.0
  float introSkyOpaque = 1.0 - smoothstep(0.14, 0.56, uSettle);
  accumCol = max(accumCol, C_OBSIDIAN * introSkyOpaque * (1.0 - pureCoreLock));

  // Strict zero-bleed alpha:
  // - 1.0 inside pure #000000 event horizon core
  // - smooth plasma alpha across glowing accretion streamlines & photon ring
  // - strictly 0.0 in open space above the settled hero horizon (zero bleed onto hero CTA!)
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
 * - Pure `#000000` black (`alpha = 1.0`) locked inside the event horizon core.
 * - Pure-ASCII `T^minus` supernova reveal:
 *   * ZERO flat dark-gray fill (`carvedFill` deleted)
 *   * 100% cell-quantized 4-tap sub-cell coverage
 *   * Core strokes: predominantly crisp dark `#000000`/`#040206` `T` glyphs (~75% `T` + subtle `*`/`=`)
 *   * Edges/serifs: lighter density-feathered `t`, `+`, `-`, `^` glyphs in deep obsidian-violet
 *   * Bright pure-white + ice-blue explosion light shines untouched behind & between every character.
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
uniform float uSettle;
uniform float uTime;
uniform vec2  uPointer;
uniform float uPointerActive;
uniform float uViewAsp;

const vec3 C_OBSIDIAN    = vec3(0.0157, 0.0078, 0.0235); // #040206
const vec3 C_DEEP_VOID   = vec3(0.0745, 0.0078, 0.1137); // #13021D
const vec3 C_ACCENT      = vec3(0.3804, 0.2392, 0.7569); // #613DC1
const vec3 C_ICE_BLUE    = vec3(0.5922, 0.8745, 0.9882); // #97DFFC

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

  // Subtle pointer proximity glyph density lift strictly along the glowing accretion rim
  vec2 ptrD = cellUv - uPointer;
  ptrD.x *= uViewAsp;
  float ptrBoost = exp(-pow(length(ptrD) * 4.5, 2.0)) * uPointerActive * uSettle * smoothstep(0.06, 0.25, energy);
  float shapedEnergy = clamp(energy + ptrBoost * 0.15, 0.0, 0.9999);

  // Default live black hole glyph selection from strict 8-slot atlas (" ^-t+=T*")
  float idx = floor(shapedEnergy * uGlyphCount);
  float atlasRow = 0.0;

  // ---- Cell-Quantized Pure-ASCII T^minus Wordmark (Skipped when uWordmarkCarve == 0) ----
  float wmCov = 0.0;
  float wmHalo = 0.0;
  float wmCaret = 0.0;
  bool isWordmarkCell = false;

  if (uWordmarkCarve > 0.001) {
    // 4-tap sub-cell average strictly inside this ASCII cell (zero per-pixel overhang)
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
      atlasRow = 1.0; // bold 700 weight for razor-legible supernova pure-ASCII T^minus

      float h = cellHash(cellCoord);
      float radDist = length((cellUv - vec2(0.5)) * vec2(uViewAsp, 1.0));
      float wave = fract(h + radDist * 1.4 - uTime * 2.1);

      if (wmCov >= 0.50) {
        // Core stroke cells: predominantly crisp 'T' (~75%), with subtle electric '=' / '*' glints
        if (wave < 0.75) {
          idx = 6.0; // 'T'
        } else if (wave < 0.89) {
          idx = 7.0; // '*'
        } else {
          idx = 5.0; // '='
        }
      } else {
        // Edge / serif / curve feather cells: lighter density-stepped ASCII glyphs ('^', '-', '+', 't')
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
  // Flip local cell Y (1.0 - paddedF.y) because atlas uploaded with UNPACK_FLIP_Y = false
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

  // Pure #000000 event horizon core lock (high alpha, zero luminance, outside supernova peak)
  float isPureCore = smoothstep(0.90, 0.99, alpha)
    * (1.0 - smoothstep(0.002, 0.010, bgLum))
    * (1.0 - smoothstep(0.10, 0.45, uBlastPeak));

  // Hybrid plasma backing + crisp ASCII glyphs (pure white/ice-blue background shines through on blast)
  float backWeight = mix(mix(0.42, 0.46, uSettle), 0.94, uBlastPeak);
  vec3 baseBack = bgTex.rgb * backWeight;

  float glyphGate = smoothstep(0.025, 0.12, shapedEnergy) * (1.0 - isPureCore);
  vec3 glyphColor = mix(
    C_ACCENT * 1.08,
    cell.rgb * mix(1.32, 1.56, shapedEnergy),
    smoothstep(0.05, 0.28, shapedEnergy)
  );
  // During pure-white supernova sky (outside wordmark cells), keep subtle extra-bright ice-blue/white ASCII texture
  vec3 blastGlyphCol = mix(C_ICE_BLUE, vec3(0.95, 0.99, 1.0), smoothstep(0.68, 0.96, cellLum));
  glyphColor = mix(glyphColor, blastGlyphCol, uBlastPeak * 0.82);

  vec3 sceneCol = baseBack + glyphColor * cov * glyphGate * mix(1.0, 0.94, uSettle) * (1.0 - uBlastPeak * 0.84);

  // Pure #000000 event horizon core lock
  sceneCol *= (1.0 - isPureCore);

  // ---- Pure-ASCII T^minus Composition (ZERO flat dark-gray fill, 100% crisp dark glyphs on bright light) ----
  if (uWordmarkCarve > 0.001) {
    // Subtle extra-bright ice-blue luminous rim sheen right outside the dark ASCII letterforms
    vec3 iceSheen = mix(vec3(1.0), C_ICE_BLUE, 0.36);
    sceneCol = mix(sceneCol, iceSheen, clamp(wmHalo * 0.28 * (1.0 - smoothstep(0.24, 0.52, wmCov)), 0.0, 0.32));

    if (isWordmarkCell) {
      // Core 'T' strokes: pure #000000 ink; feathered edge glyphs: crisp deep obsidian-violet ink
      vec3 edgeInk = mix(C_DEEP_VOID, C_OBSIDIAN, 0.62);
      vec3 coreInk = vec3(0.0, 0.0, 0.0);
      vec3 glyphInk = mix(edgeInk, coreInk, smoothstep(0.36, 0.60, wmCov));
      // Subtle cool tint on caret '^' outer edge
      glyphInk = mix(glyphInk, C_DEEP_VOID * 1.1, wmCaret * 0.22 * (1.0 - smoothstep(0.48, 0.70, wmCov)));

      // Composite ONLY the ASCII glyph strokes themselves (cov) — zero flat slab behind them!
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
    // Exact 4-tap cell-quantized mask match with FS_GLYPH -> zero per-pixel overhang & zero bloom washout over ASCII T^minus
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

  // Keep open space above the settled horizon strictly transparent (zero bloom veil over hero CTA)
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
 * - Row 0 (top): crisp `500` medium weight for the live 3D black hole accretion field
 * - Row 1 (bottom): refined `550` medium weight for the pure-ASCII `T^minus` explosion
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

  // Row 0: crisp 500 regular weight
  ctx.font = `500 ${Math.round(cellH * 0.72)}px "Geist Mono", "SF Mono", ui-monospace, Menlo, monospace`;
  for (let i = 0; i < ASCII_RAMP.length; i++) {
    ctx.fillText(ASCII_RAMP[i], (i + 0.5) * cellW, cellH * 0.52);
  }

  // Row 1: bold 700 weight for razor-legible pure-ASCII supernova T^minus (zero flat fill needed)
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

/**
 * Exact 3D ray impact parameter b for a screen point (ndcX, ndcY) used to solve
 * exact screen Y bounds of the top-pinned dome rim for the Layer 20 curved veil.
 */
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

/**
 * Find the exact CSS screen Y (px from top) where the lower rim of the top-pinned
 * black hole (impact parameter = targetR) crosses horizontal coordinate `ndcX`.
 */
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
  // Top of viewport is ndcY = +1 (inside dome, small b); lower down is smaller ndcY (larger b)
  let hi = 1.0; // inside or closer to dome center
  let lo = -0.35; // clearly below the top dome
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

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let qsSkipIntro = false;
    try {
      qsSkipIntro =
        typeof window !== "undefined" &&
        new URLSearchParams(window.location.search).get("skipIntro") === "1";
    } catch {
      // ignore
    }
    const startSettled = skipIntro || qsSkipIntro || reducedMotion;

    let heroRevealed = startSettled;
    if (startSettled) {
      onRevealRef.current(true);
    }

    // ---- Layer 0: Obsidian Cosmic Starfield + Global Viewport Cursor Glyph Aura ----
    const starCtx = starCanvas.getContext("2d");
    const stars = createStarfield(108);

    // ---- Layer 30: Single Persistent WebGL2 Procedural 3D Black Hole ----
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
      // Strict laptop/mobile DPR budget: 1.75 desktop / 1.5 mobile
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

      // Crisp high-density ASCII grid (~280x100 desktop / ~92x112 mobile)
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

    // Damped pointer tracking (disabled on touch devices)
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
    let smoothedPin = 0.0;
    let lastTs = performance.now();
    let lastBgDraw = 0;
    let rafId = 0;

    // Rolling 30-frame EMA adaptive performance governor
    let dtEma = 0.0166;
    let overBudgetSec = 0;

    // Optional deterministic QA pin: ?introAt=1.8 | 4.2 | 5.8
    let pinnedIntroAt: number | null = null;
    try {
      const qs = new URLSearchParams(window.location.search);
      const rawPin = qs.get("introAt");
      if (rawPin !== null) {
        const parsed = Number(rawPin);
        if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 10) {
          pinnedIntroAt = parsed;
          introElapsed = parsed;
          if (parsed >= HERO_REVEAL_SEC) {
            heroRevealed = true;
            onRevealRef.current(true);
          }
        }
      }
    } catch {
      // ignore
    }

    const drawBackgroundField = (tSec: number, pin: number, settle: number) => {
      if (!starCtx || cssWGlobal <= 1 || cssHGlobal <= 1) return;
      const dpr = dprGlobal;
      starCtx.setTransform(1, 0, 0, 1, 0, 0);
      starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);

      // Restrained deep-purple horizon atmosphere whisper on #040206 obsidian
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

      // Sparse cosmic ASCII starfield (`* + ^ -`) emerging radially outward on settle
      const starWave = smoothstep(0.5, 1.0, settle);
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

      // Dynamic Multi-Glyph Cursor Aura (`^ - t + = T *`) on desktop pointer
      if (!reducedMotion && pointerActive > 0.01 && settle > 0.65) {
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

        const fieldFade = smoothstep(0.65, 0.98, settle) * pointerActive;

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

      // Adaptive performance governor (30-frame rolling EMA)
      dtEma = dtEma * 0.935 + Math.min(rawDt, 0.1) * 0.065;
      if (!adaptiveDegraded && dtEma > 0.02) {
        overBudgetSec += dt;
        if (overBudgetSec > 1.5) {
          adaptiveDegraded = true;
        }
      } else {
        overBudgetSec = Math.max(0, overBudgetSec - dt * 0.5);
      }

      // Silky damped pointer motion
      const pLerp = Math.min(1, dt * 8.5);
      pointerX += (pointerTargetX - pointerX) * pLerp;
      pointerY += (pointerTargetY - pointerY) * pLerp;
      pointerActive +=
        (pointerActiveTarget - pointerActive) * Math.min(1, dt * 5.2);

      // Exact native CSS sticky scroll runway progress: s in [0, 1]
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

      // Intro clock progression (early scrolling smoothly accelerates intro)
      if (pinnedIntroAt !== null) {
        introElapsed = pinnedIntroAt;
      } else if (introElapsed < INTRO_TOTAL_SEC) {
        const scrollBoost = window.scrollY > 24 ? 5.2 : 1.0;
        introElapsed = Math.min(INTRO_TOTAL_SEC, introElapsed + dt * scrollBoost);
      }

      if (!heroRevealed && introElapsed >= HERO_REVEAL_SEC) {
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
      // 1) STAGE A -> B -> C TIMING & SUPERNOVA ENVELOPES (Approved 7.25s)
      // =====================================================================
      // Stage A (0.00s -> 3.60s): Cosmic Opening (tilted 3/4 + helical polar jets)
      const stageAProg = clamp01(introElapsed / 3.6);

      // Stage B (3.60s -> 4.95s, 1.35s total):
      //   0.30s rapid surge (3.60 -> 3.90) -> ~0.78s pure-white/ice-blue blast & T^minus -> 0.27s radial snap
      const charge =
        smoothstep(3.55, 3.88, introElapsed) *
        (1.0 - smoothstep(3.9, 4.14, introElapsed));
      const blastPeak =
        smoothstep(3.78, 4.02, introElapsed) *
        (1.0 - smoothstep(4.64, 4.95, introElapsed));
      const blastProgress = clamp01((introElapsed - 3.78) / (4.95 - 3.78));
      const wordmarkCarve =
        smoothstep(3.92, 4.08, introElapsed) *
        (1.0 - smoothstep(4.56, 4.84, introElapsed));

      // Stage C (4.85s -> 7.25s): Unbroken 3D Camera Sweep -> Settled Bottom Horizon
      const settle = easeInOutQuint(clamp01((introElapsed - 4.85) / 2.4));

      // Polar jets: vivid during 3.60s opening, surge at charge, recede cleanly before settled hero
      const jetPower =
        (1.0 + charge * 0.45) * (1.0 - smoothstep(4.45, 5.45, introElapsed));

      // =====================================================================
      // 2) UNBROKEN 3D ORBITAL CAMERA TRAJECTORY (Intro -> Horizon -> Polar -> Top Dome)
      // =====================================================================
      // Solve exact bottom horizon and top dome distances & pitch angles for current viewport
      const bottomApex = isMobile ? 0.225 : 0.255; // ~230px desktop / ~190px mobile
      const topApex = isMobile ? 0.155 : 0.152; // ~137px desktop / ~131px mobile

      const distBottom = isMobile ? 2.02 : 1.56;
      const alphaBottom = Math.asin(1 / distBottom);
      const topLimbAngleBottom = Math.atan(
        (-1 + 2 * bottomApex) * tanHalfFov
      );
      const pitchBottom = alphaBottom - topLimbAngleBottom; // positive = camera tilts UP -> BH at bottom

      const distTop = isMobile ? 2.12 : 1.58;
      const alphaTop = Math.asin(1 / distTop);
      const botLimbAngleTop = Math.atan((1 - 2 * topApex) * tanHalfFov);
      const pitchTop = -(botLimbAngleTop + alphaTop); // negative = camera tilts DOWN -> BH at top

      // Responsive polar top-down distance so #000000 shadow fits countdown cleanly on desktop AND mobile
      const targetPolarRadiusPx = isMobile
        ? Math.min(cssWGlobal * 0.355, cssHGlobal * 0.175)
        : Math.min(cssWGlobal * 0.165, cssHGlobal * 0.258);
      const polarTanAlpha =
        (targetPolarRadiusPx / (cssHGlobal * 0.5)) * tanHalfFov;
      const polarAlpha = Math.atan(Math.max(0.08, polarTanAlpha));
      const distPolarClamped = Math.max(3.9, Math.min(8.2, 1 / Math.sin(polarAlpha)));

      // ---- Three Scroll Segments across s in [0, 1] ----
      // 1) Lift-Off (0.00 -> 0.28): Bottom Horizon -> Top-Down Polar
      // 2) Polar Top-Down Dwell Plateau (0.28 -> 0.66): Locked elev=88 deg with subtle live scroll-coupled spin
      // 3) Sweep to Top-Pinned Dome (0.66 -> 1.00): Polar -> Inverted Top Dome
      const s = smoothedPin;
      const segLift = smoothstep(0.0, 0.28, s);
      const segPlateau = clamp01((s - 0.28) / (0.66 - 0.28));
      const segDock = smoothstep(0.66, 1.0, s);

      // Polar dwell factor (0 at horizons, 1 across s: 0.28..0.66)
      const polarFactor =
        smoothstep(0.14, 0.30, s) * (1.0 - smoothstep(0.64, 0.84, s)) * settle;

      // Elevation angle along meridian (26 deg bottom -> 88 deg polar -> 154 deg top dome)
      const scrollElevDeg =
        mixNum(26, 88, segLift) + (154 - 88) * segDock;
      // Slight gentle zoom-in across the polar plateau so it feels alive while dwelling
      const plateauDist = mixNum(distPolarClamped, distPolarClamped * 0.94, segPlateau);
      const scrollDist =
        segDock > 0
          ? mixNum(plateauDist, distTop, segDock)
          : mixNum(distBottom, plateauDist, segLift);

      const scrollPitch =
        segDock > 0
          ? mixNum(0, pitchTop, segDock)
          : mixNum(pitchBottom, 0, segLift);

      // Gentle azimuthal orbit during polar plateau (scroll-coupled spin)
      const scrollAzim =
        segLift * degToRad(12) +
        segPlateau * degToRad(42) +
        segDock * degToRad(16);

      // Intro Stage A -> B camera values (centered tilted 3/4 view + classic -22 deg bank)
      const introDistBase = isMobile ? 8.2 : 6.45;
      const introDist = mixNum(introDistBase, introDistBase * 0.86, stageAProg) - charge * 0.35;
      const introElevDeg = mixNum(17.5, 14.5, stageAProg);
      const introRoll = mixNum(degToRad(-22), degToRad(-18), stageAProg);

      // Unbroken blend from Intro (settle = 0) -> Settled Scroll Camera (settle = 1)
      const elevRad = degToRad(mixNum(introElevDeg, scrollElevDeg, settle));
      const camDist = mixNum(introDist, scrollDist, settle);
      const pitchOffset = mixNum(0, scrollPitch, settle);
      const bankRoll = mixNum(introRoll, 0, settle);
      const azimRad = mixNum(0, scrollAzim, settle);

      // Construct gimbal-lock-free orthonormal orbital camera basis in y-z meridian, then rotate by azim around Y
      const sinE = Math.sin(elevRad);
      const cosE = Math.cos(elevRad);
      const sinA = Math.sin(azimRad);
      const cosA = Math.cos(azimRad);

      // Local meridian vectors (before azimuthal rotation around Y):
      // radial = (0, sinE, cosE), baseFwd = -radial, baseUp = (0, cosE, -sinE), baseRight = (1, 0, 0)
      const rotY = (vx: number, vy: number, vz: number): Vec3 => ({
        x: vx * cosA + vz * sinA,
        y: vy,
        z: -vx * sinA + vz * cosA,
      });

      const camPos = rotY(0, camDist * sinE, camDist * cosE);
      const baseFwd = rotY(0, -sinE, -cosE);
      const baseUp = rotY(0, cosE, -sinE);
      const baseRight = rotY(1, 0, 0);

      // Apply pitchOffset in (baseFwd, baseUp) plane so BH stays centered horizontally
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

      // Apply subtle intro bank roll around fwd0 (relaxes to 0 deg smoothly across Stage C)
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

      // Breathing accretion disk extent: wide in intro & polar, strictly inside camDist at bottom/top horizons (zero near-lens clip!)
      const horizonOuterR = Math.min(camDist * 0.78, isMobile ? 1.56 : 1.38);
      const settledOuterR = mixNum(horizonOuterR, 5.4, polarFactor);
      const diskOuterR = mixNum(5.2, settledOuterR, settle);

      // =====================================================================
      // 3) EXACT 3D-TO-DOM COUNTDOWN & LAYER 20 CURVED PRE-RIM VEIL SYNC
      // =====================================================================
      const bottomCountdownY = cssHGlobal * (1.0 - bottomApex * 0.48);
      const topCountdownY = isMobile ? 60 : 54;
      const polarCenterY = cssHGlobal * 0.5;
      const cdBaseY = mixNum(bottomCountdownY, topCountdownY, smoothstep(0.0, 1.0, s));
      const countdownCenterY = mixNum(cdBaseY, polarCenterY, polarFactor);

      const baseCdScale = mixNum(1.0, isMobile ? 0.7 : 0.72, smoothstep(0.0, 1.0, s));
      const midCdScale = isMobile ? 1.08 : 1.22;
      const countdownScale = mixNum(baseCdScale, midCdScale, polarFactor);

      // Solve exact 3D-projected circle hugging the top-pinned dome's outer glowing rim (b = 1.16)
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
        const radius = (halfChordX * halfChordX + sagitta * sagitta) / (2 * sagitta);
        domeCenterX = cssWGlobal * 0.5;
        domeRadiusPx = radius;
        domeCenterY = rimCenterY - radius;
        domeEdgeY = rimEdgeY;
      }

      onSyncRef.current?.({
        pinProgress: s,
        settleProgress: settle,
        countdownCenterY,
        countdownScale,
        domeCenterX,
        domeCenterY,
        domeRadiusPx,
        domeEdgeY,
        viewportW: cssWGlobal,
      });

      // Expose read-only runtime telemetry for automated visual & performance verification
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
          pinProgress: Number(s.toFixed(4)),
          polarFactor: Number(polarFactor.toFixed(4)),
          elevDeg: Number(((elevRad * 180) / Math.PI).toFixed(1)),
        };
      }

      // Redraw Layer 0 starfield + cursor aura at smooth ~30fps
      if (ts - lastBgDraw > 32) {
        lastBgDraw = ts;
        drawBackgroundField(tSec, s, settle);
      }

      gl.disable(gl.BLEND);

      // ---- PASS 1: Analytic 3D Procedural Black Hole ----
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
        mixNum(0.46, 0.54, settle) * (1.0 - blastPeak * 0.64) + polarFactor * 0.14;
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

      {/* Layer 30: Single persistent 60fps WebGL2 Procedural 3D ASCII Black Hole */}
      <canvas
        ref={glCanvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 h-[100dvh] w-full"
      />
    </>
  );
}
