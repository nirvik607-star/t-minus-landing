"use client";

import React, { useEffect, useRef } from "react";
import {
  VIDEO_LOOP_START_SEC,
  VIDEO_TOTAL_SEC,
} from "@/lib/sandbox/blackhole-config";
import { drawWordmarkMaskCanvas } from "@/components/landing/t-minus-wordmark";

/**
 * Shared scroll & camera telemetry published every animation frame so
 * `HorizonCountdown` rides in pixel-locked 60fps unison inside the real
 * black hole's pure `#000000` core.
 */
export interface HorizonSyncState {
  /** 0 = bottom hero rest, 1 = top-pinned inverted event horizon */
  pinProgress: number;
  /** 0..1 intro settle (1 = settled bottom horizon) */
  settleProgress: number;
  /** Screen Y (px from top) where the countdown centers inside the black core */
  countdownCenterY: number;
  /** Scale factor for countdown as it docks into the top dome */
  countdownScale: number;
  /** Current viewport width in CSS px */
  viewportW: number;
}

interface AsciiBlackholeCanvasProps {
  onHeroReveal: (revealed: boolean) => void;
  onHorizonSync?: (state: HorizonSyncState) => void;
  skipIntro?: boolean;
}

/**
 * Strict locked ASCII glyph ramp (space + `^ - t + = T *` ONLY).
 * Zero `.`, zero `:`, zero `·`.
 */
const ASCII_RAMP = " ^-t+=T*";

const VS_QUAD = `#version 300 es
precision highp float;
out vec2 vUv;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

/**
 * Pass 1: Single Continuous Projective Black Hole Camera
 *
 * - True obsidian space ground (`#040206`) & pure `#000000` event horizon core.
 * - Galaxy purples (`#2C0735`, `#4E148C`, `#613DC1`, `#858AE3`) + `#97DFFC` ice-blue
 *   restricted strictly to the accretion disk, gravitational lensing rim, ASCII glyphs,
 *   and subtle atmospheric glow.
 * - ZERO scene crossfade, ZERO synthetic flat line, ZERO detached scrolling oval:
 *   One continuous camera transform `(uCamCenter, uCamZoom, uCamAnamorphicX, uCamTilt, uCamRoll)`
 *   samples the real looping `master_blackhole_boomerang.mp4` black hole across every state:
 *     1) Intro (0.0s–5.2s): full-frame approach
 *     2) Supernova peak (5.2s–7.8s): white-hot blast with refined 500-weight dark ASCII `T^minus` carve
 *     3) Settle (7.8s–12.0s): continuous zoom + upward camera pitch so the real black hole's curved
 *        accretion arch & pure `#000000` shadow expand across the bottom ~26% of the viewport
 *     4) Scroll (p: 0 -> 1): constant planetary-scale camera orbit sweeping upward and tilting
 *        smoothly so the exact same black hole's bottom edge forms the downward-curving pinned top dome.
 */
const FS_COLOR = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 o;

uniform sampler2D uVideo;
uniform float uHasVideo;
uniform float uTime;
uniform float uViewAsp;
uniform float uVideoAsp;
uniform float uSettle;          // 0 = full-screen intro, 1 = settled horizon camera
uniform float uPin;             // 0 = bottom horizon, 1 = top-pinned dome
uniform float uMidBell;         // 0..1 mid-scroll spherical black hole plateau (p ~ 0.42-0.58)
uniform float uBlastPeak;       // 0..1 white-hot supernova flash window for T^minus carve
uniform vec2  uCamCenter;       // normalized UV screen center of the real black hole
uniform float uCamZoom;         // continuous camera zoom (1.0 intro -> planetary zoom)
uniform float uCamAnamorphicX;  // subtle planetary width span
uniform float uCamTilt;         // projective pitch (+ bottom horizon -> 0 mid -> - top dome)
uniform float uCamRoll;         // continuous orbital roll (0 -> PI across scroll)
uniform vec2  uPointer;         // smoothed normalized UV pointer position
uniform float uPointerActive;   // 0..1 pointer presence

// Exact probed center & shadow semi-axes of the real black hole in master_blackhole_boomerang.mp4 (WebGL bottom-up UV)
const vec2 BH_CENTER = vec2(0.50, 0.515);
const vec2 BH_RADII  = vec2(0.086, 0.104);

vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

float hueDist(float a, float b) {
  float d = abs(a - b);
  return min(d, 1.0 - d);
}

/**
 * High-contrast Galaxy grading ramp anchored on pure #000000 black:
 * #000000 -> #2C0735 -> #4E148C -> #613DC1 -> #858AE3 -> specular white core
 */
vec3 galaxyGrade(float lum, vec3 srcNeutral) {
  vec3 cBlack      = vec3(0.0000, 0.0000, 0.0000); // #000000
  vec3 cSpace      = vec3(0.1725, 0.0275, 0.2078); // #2C0735
  vec3 cDeepPurple = vec3(0.3059, 0.0784, 0.5490); // #4E148C
  vec3 cAccent     = vec3(0.3804, 0.2392, 0.7569); // #613DC1
  vec3 cPeriwinkle = vec3(0.5216, 0.5412, 0.8902); // #858AE3
  vec3 cWhiteCore  = vec3(0.9700, 0.9780, 1.0000); // white-hot specular peak

  vec3 col = mix(cBlack, cSpace, smoothstep(0.02, 0.16, lum));
  col = mix(col, cDeepPurple, smoothstep(0.14, 0.34, lum));
  col = mix(col, cAccent, smoothstep(0.30, 0.54, lum));
  col = mix(col, cPeriwinkle, smoothstep(0.50, 0.78, lum));
  col = mix(col, cWhiteCore, smoothstep(0.76, 0.98, lum));

  float srcEnergy = max(srcNeutral.r, max(srcNeutral.g, srcNeutral.b));
  col *= (0.86 + 0.28 * smoothstep(0.08, 0.95, srcEnergy));
  return col;
}

vec4 sampleGradedVideo(vec2 uv, float settle, out float greenOut, out float lumOut) {
  vec3 iceBlue = vec3(0.5922, 0.8745, 0.9882); // #97DFFC
  float inBounds =
    smoothstep(0.0, 0.02, uv.x) * (1.0 - smoothstep(0.98, 1.0, uv.x)) *
    smoothstep(0.0, 0.02, uv.y) * (1.0 - smoothstep(0.98, 1.0, uv.y));

  vec3 src = vec3(0.0);
  if (uHasVideo > 0.5) {
    src = texture(uVideo, clamp(uv, 0.001, 0.999)).rgb * inBounds;
  } else {
    float r = length((uv - BH_CENTER) / BH_RADII);
    float ring = exp(-pow((r - 1.12) * 5.2, 2.0));
    src = vec3(0.55, 0.75, 0.70) * ring;
  }

  // Complete green energy jet -> #97DFFC ice-blue remap (zero green leakage)
  vec3 hsv = rgb2hsv(src);
  float hDist = hueDist(hsv.x, 0.33);
  float hueMask = 1.0 - smoothstep(0.07, 0.21, hDist);
  float greenExcess = clamp((src.g - max(src.r, src.b)) * 5.2, 0.0, 1.0);
  float satMask = smoothstep(0.08, 0.28, hsv.y);
  float greenMask = clamp(max(hueMask * satMask, greenExcess * 1.15), 0.0, 1.0);

  vec3 deGreened = vec3(
    src.r,
    min(src.g, max(src.r, src.b) * 0.92),
    max(src.b, src.g * 0.68)
  );

  float rawLum = dot(src, vec3(0.2126, 0.7152, 0.0722));
  // Suppress raw video background haze (~0.12-0.19) once settled so obsidian space stays pitch-clean
  float gateLo = mix(0.06, 0.16, settle);
  float gateHi = mix(0.20, 0.34, settle);
  float shadowGate = smoothstep(gateLo, gateHi, rawLum);
  float shapedLum = clamp(pow(max(rawLum, 0.0), 0.88) * shadowGate, 0.0, 1.0);

  vec3 purpleAccretion = galaxyGrade(shapedLum, deGreened);

  float beamEnergy = clamp(max(rawLum, hsv.z) * 1.28, 0.0, 1.32) * shadowGate;
  vec3 iceJet = mix(iceBlue, vec3(0.95, 0.99, 1.0), smoothstep(0.72, 1.24, beamEnergy) * 0.45) * beamEnergy;

  vec3 graded = mix(purpleAccretion, iceJet, clamp(greenMask * 1.15, 0.0, 1.0));
  greenOut = greenMask * shadowGate;
  lumOut = shapedLum;
  return vec4(graded, shapedLum);
}

void main() {
  vec3 cObsidian   = vec3(0.0157, 0.0078, 0.0235); // #040206
  vec3 cSpace      = vec3(0.1725, 0.0275, 0.2078); // #2C0735
  vec3 cDeepPurple = vec3(0.3059, 0.0784, 0.5490); // #4E148C
  vec3 cAccent     = vec3(0.3804, 0.2392, 0.7569); // #613DC1
  vec3 cPeriwinkle = vec3(0.5216, 0.5412, 0.8902); // #858AE3
  vec3 cIceBlue    = vec3(0.5922, 0.8745, 0.9882); // #97DFFC

  // Subtle GPU pointer proximity gravitational lens ripple near the accretion rim
  vec2 ptrDelta = vUv - uPointer;
  ptrDelta.x *= uViewAsp;
  float ptrDist = length(ptrDelta);
  float ptrRipple = exp(-pow(ptrDist * 4.2, 2.0)) * uPointerActive * uSettle;

  // ---- SINGLE CONTINUOUS PROJECTIVE CAMERA ON THE REAL BLACK HOLE ----
  vec2 p = vUv - uCamCenter;
  // Perspective pitch foreshortening along Y (0 during intro/mid-scroll, smooth tilt at horizons)
  float perspDenom = clamp(1.0 + p.y * uCamTilt * 0.34, 0.68, 1.48);
  vec2 q = p / perspDenom;

  // Aspect-matched cover fit (identity at uCamZoom = 1.0, uCamAnamorphicX = 1.0)
  float baseScaleX = (uViewAsp < uVideoAsp) ? (uViewAsp / uVideoAsp) : 1.0;
  float baseScaleY = (uViewAsp < uVideoAsp) ? 1.0 : (uVideoAsp / uViewAsp);

  vec2 scaled = vec2(q.x * baseScaleX / uCamAnamorphicX, q.y * baseScaleY) / uCamZoom;

  // Normalize into the real black hole's exact shadow-sphere coordinates so orbital roll
  // preserves the exact shadow contour without wobble or oval distortion
  vec2 coreNorm = scaled / BH_RADII;
  float rCore = length(coreNorm);

  float cR = cos(uCamRoll);
  float sR = sin(uCamRoll);
  vec2 rotNorm = vec2(cR * coreNorm.x - sR * coreNorm.y, sR * coreNorm.x + cR * coreNorm.y);
  vec2 vidDelta = rotNorm * BH_RADII;

  // Subtle gravitational lensing deflection near pointer
  vec2 vidUv = BH_CENTER + vidDelta - (vUv - uPointer) * (0.008 * ptrRipple);

  // Early-completing settle cleanup eliminates residual upper-frame haze during 7.8s -> 12.0s descent
  float settleClean = smoothstep(0.06, 0.58, uSettle);

  float vidGreen = 0.0;
  float vidLum = 0.0;
  vec3 vidCol = sampleGradedVideo(vidUv, settleClean, vidGreen, vidLum).rgb;

  // White-hot supernova flash boost during peak blast (5.2s–7.8s):
  // Keeps the explosion authentically luminous so 500-weight dark ASCII T^minus carves cleanly
  if (uBlastPeak > 0.001) {
    vec2 blastPos = (vUv - vec2(0.5, 0.5)) * vec2(uViewAsp * 0.56, 1.15);
    float blastRad = length(blastPos);
    float blastCore = exp(-pow(blastRad * 1.48, 2.0));
    float blastBloom = exp(-pow(blastRad * 0.88, 2.0));
    vec3 whiteHot = mix(cPeriwinkle, vec3(0.96, 0.985, 1.0), smoothstep(0.15, 0.88, blastCore));
    whiteHot = mix(whiteHot, cIceBlue, (1.0 - blastCore) * 0.34 * blastBloom);
    vidCol = mix(vidCol, whiteHot, clamp(uBlastPeak * (0.54 * blastBloom + 0.44 * blastCore), 0.0, 0.95));
    vidCol += vec3(0.94, 0.97, 1.0) * blastCore * uBlastPeak * 0.24;
  }

  // ---- PURE #000000 EVENT HORIZON CORE + LIVE PHOTON RING CONTINUITY ----
  // Physically locked to the exact projected shadow of master_blackhole_boomerang.mp4 (rCore <= 1.0)
  float coreMask = (1.0 - smoothstep(0.94, 1.015, rCore)) * smoothstep(0.12, 0.55, uSettle);

  // Adaptive corona envelope:
  // - Tightly hugs the event horizon crest at bottom horizon (p=0) and top-pinned dome (p=1)
  // - Smoothly opens during mid-scroll (uMidBell -> 1) so the full authentic swirling accretion
  //   structure of master_blackhole_boomerang.mp4 breathes around the central spherical black hole
  float horizonOuterStart = mix(1.03, 1.015, uPin);
  float horizonOuterEnd   = mix(1.24, 1.15, uPin);
  float outerStart = mix(horizonOuterStart, 1.08, uMidBell);
  float outerEnd   = mix(horizonOuterEnd, 1.85, uMidBell);
  float outerDiskMask = mix(1.0, 1.0 - smoothstep(outerStart, outerEnd, rCore), settleClean);

  // Sample grazing photon-ring modulation directly from the live swirling video just outside rCore = 1.0
  float angle = atan(rotNorm.y, rotNorm.x);
  vec2 ringSampleUv = BH_CENTER + vec2(cos(angle + uTime * 0.06), sin(angle + uTime * 0.06)) * BH_RADII * 1.18;
  float ringGreen = 0.0;
  float ringLum = 0.0;
  vec3 ringVid = sampleGradedVideo(ringSampleUv, settleClean, ringGreen, ringLum).rgb;
  float liveMod = 0.62 + 0.68 * smoothstep(0.06, 0.72, max(vidLum, ringLum));

  // Crisp relativistic photon ring hugging the exact shadow limb (active once settled)
  float distOut = rCore - 1.0;
  float photonWidth  = mix(mix(46.0, 62.0, uPin), 28.0, uMidBell);
  float lensingDecay = mix(mix(17.5, 26.0, uPin), 9.5, uMidBell);
  float haloDecay    = mix(mix(10.5, 16.5, uPin), 4.6, uMidBell);
  float photonRing   = exp(-pow((distOut - 0.008) * photonWidth, 2.0)) * uSettle;
  float innerLensing = exp(-max(distOut, 0.0) * lensingDecay) * smoothstep(-0.015, 0.02, distOut) * uSettle;
  float outerHalo    = exp(-max(distOut, 0.0) * haloDecay) * smoothstep(-0.005, 0.035, distOut) * uSettle;
  float ptrLift = 1.0 + ptrRipple * 0.36;

  vec3 photonCol = mix(cPeriwinkle, vec3(0.96, 0.98, 1.0), 0.38 + 0.30 * liveMod);
  photonCol = mix(photonCol, cIceBlue, clamp(max(vidGreen, ringGreen) * 0.72 + ptrRipple * 0.25, 0.0, 0.72));
  vec3 haloCol = mix(cDeepPurple, cAccent, 0.45 + 0.35 * liveMod);
  haloCol = mix(haloCol, cIceBlue, clamp(vidGreen * 0.45, 0.0, 0.4));

  // Combine authentic live video plasma + crisp grazing photon ring, then carve pure #000000 core
  float diskWeight = mix(mix(0.88, 0.74, uPin), 1.06, uMidBell);
  vec3 settledPlasma =
    vidCol * outerDiskMask * (diskWeight + ptrRipple * 0.22) +
    photonCol * photonRing * (0.68 + 0.30 * liveMod) * ptrLift +
    haloCol * innerLensing * (0.30 + 0.20 * liveMod) * ptrLift +
    cSpace * outerHalo * 0.22 +
    ringVid * photonRing * 0.28;

  // Apply early outerDiskMask during descent so upper-hemisphere raw video artifacts vanish cleanly
  vec3 introBase = vidCol * outerDiskMask;
  vec3 sceneCol = mix(introBase, settledPlasma, uSettle);

  // Enforce true pure #000000 black inside the real event horizon shadow
  sceneCol *= (1.0 - coreMask);

  // During intro (settle < 0.62), keep deep sky grounded at #040206 obsidian, then clear cleanly
  float introSkyOpaque = 1.0 - smoothstep(0.18, 0.62, uSettle);
  sceneCol = max(sceneCol, cObsidian * introSkyOpaque * (1.0 - coreMask));

  // Pre-rim obsidian occlusion skirt behind the pinned top dome (p -> 1):
  // Smoothly masks scrolling below-the-fold headlines ~28px BEFORE they collide with the glowing rim,
  // and veils the upper-left/right dome corners without affecting Layer 40 (T^minus & docked countdown)
  float pinMask = smoothstep(0.68, 0.96, uPin) * uSettle;
  float preRimSkirt = (1.0 - smoothstep(1.03, 1.22, rCore)) * pinMask;
  float topCornerSkirt = smoothstep(0.87, 0.96, vUv.y) * pinMask;
  float domeOccMask = clamp(max(preRimSkirt, topCornerSkirt), 0.0, 1.0);
  sceneCol = max(sceneCol, cObsidian * domeOccMask * (1.0 - coreMask));

  // Premultiplied occlusion alpha:
  // - 1.0 solidly inside the pure #000000 event horizon core + pre-rim top-dome skirt
  // - Smooth alpha across the glowing ASCII accretion plasma & photon ring
  // - 0.0 out in open obsidian space once settled
  float plasmaLum = dot(sceneCol, vec3(0.2126, 0.7152, 0.0722));
  float plasmaAlpha = clamp(
    photonRing * 0.92 +
    innerLensing * 0.56 +
    outerHalo * 0.24 +
    smoothstep(0.035, 0.42, plasmaLum) * outerDiskMask * 0.95,
    0.0,
    1.0
  );
  float finalAlpha = clamp(max(max(max(coreMask, domeOccMask), plasmaAlpha), introSkyOpaque), 0.0, 1.0);

  o = vec4(clamp(sceneCol, 0.0, 1.0), finalAlpha);
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
 * - Strictly uses ` ^-t+=T*` (zero `.`, zero `:`, zero `·`)
 * - Pure `#000000` black (`alpha = 1.0`) inside the event horizon core for sharp contrast
 *   and clean masking of scrolling text under the pinned top dome
 * - Refined 500-weight `T^minus` explosion carve: preserves exact `26:15` SwiftUI geometry
 *   with crisp inter-letter gaps and zero outline bleed
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
uniform float uWordmarkCarve;   // 0..1 dark ASCII T^minus carve during peak white-hot blast
uniform float uSettle;
uniform float uPin;
uniform float uTime;
uniform vec2  uPointer;
uniform float uPointerActive;
uniform float uViewAsp;

void main() {
  vec2 g = vUv * uGrid;
  ivec2 cellCoord = ivec2(clamp(floor(g), vec2(0.0), uGrid - 1.0));
  vec2 cellUv = (vec2(cellCoord) + 0.5) / uGrid;
  vec2 f = fract(g);
  vec2 paddedF = clamp(f, vec2(0.03), vec2(0.97));

  vec4 cell = texelFetch(uCell, cellCoord, 0);
  vec4 bgTex = texture(uBg, vUv);

  vec3 cObsidian   = vec3(0.0157, 0.0078, 0.0235); // #040206
  vec3 cSpace      = vec3(0.1725, 0.0275, 0.2078); // #2C0735
  vec3 cDeepPurple = vec3(0.3059, 0.0784, 0.5490); // #4E148C
  vec3 cAccent     = vec3(0.3804, 0.2392, 0.7569); // #613DC1
  vec3 cPeriwinkle = vec3(0.5216, 0.5412, 0.8902); // #858AE3

  float cellLum = dot(cell.rgb, vec3(0.2126, 0.7152, 0.0722));
  float bgLum = dot(bgTex.rgb, vec3(0.2126, 0.7152, 0.0722));
  float energy = clamp(cellLum * 1.06, 0.0, 0.9999);

  // Subtle pointer proximity glyph density lift strictly along the glowing accretion rim
  vec2 ptrD = cellUv - uPointer;
  ptrD.x *= uViewAsp;
  float ptrBoost = exp(-pow(length(ptrD) * 4.5, 2.0)) * uPointerActive * uSettle * smoothstep(0.06, 0.25, energy);
  float shapedEnergy = clamp(energy + ptrBoost * 0.14, 0.0, 0.9999);

  // Sample exact 500-weight SwiftUI T^minus wordmark mask at cell center
  vec3 wmSample = texture(uWordmarkMask, cellUv).rgb;
  // Tighter threshold keeps inter-character gaps between T, ^, and minus razor-clean
  float wmStroke = smoothstep(0.34, 0.72, wmSample.r) * uWordmarkCarve;
  float wmHalo   = wmSample.g * uWordmarkCarve;
  float wmCaret  = wmSample.b * uWordmarkCarve;

  // Choose glyph from exact 8-slot atlas (" ^-t+=T*")
  // Row 0: crisp 500 weight for live black hole
  // Row 1: refined 550 medium weight for explosion T^minus carve (never chunky 700)
  float idx = floor(shapedEnergy * uGlyphCount);
  float atlasRow = 0.0;

  if (wmStroke > 0.24) {
    float wave = fract(float(cellCoord.x) * 0.19 + float(cellCoord.y) * 0.13 + uTime * 1.45);
    // Crisp structural spread across ^ - t + = T * (keeps strokes refined & airy, never muddy)
    idx = clamp(1.0 + floor(wave * (uGlyphCount - 1.0)), 1.0, uGlyphCount - 1.0);
    if (wmStroke > 0.68) {
      idx = clamp(2.0 + floor(wave * 5.0), 2.0, uGlyphCount - 1.0);
    }
    atlasRow = 1.0;
  }

  vec2 tileSize = vec2(uGlyphCount, 2.0);
  vec2 atlasUv = vec2(
    (idx + paddedF.x) / uGlyphCount,
    (atlasRow + paddedF.y) * 0.5
  );
  float rawCov = textureGrad(
    uAtlas,
    atlasUv,
    dFdx(g) / tileSize,
    dFdy(g) / tileSize
  ).r;
  float cov = smoothstep(0.16, 0.62, rawCov);

  float alpha = bgTex.a;
  float introOpaque = 1.0 - smoothstep(0.18, 0.62, uSettle);

  // Inside the pure #000000 event horizon core (high alpha, zero luminance):
  // Distinguishes pure #000000 core (bgLum < 0.005) from #040206 obsidian pre-rim skirt (bgLum ~ 0.0106)
  float isPureCore = smoothstep(0.85, 0.99, alpha) * (1.0 - smoothstep(0.003, 0.009, bgLum)) * smoothstep(0.25, 0.65, uSettle);

  // Smooth plasma backing where accretion luminance exists + exact seamless #040206 obsidian floor
  // inside the pinned top-dome pre-rim feather skirt so headings vanish cleanly without a dark seam
  float backWeight = mix(0.46, 0.52, uSettle);
  float pinSkirtFloor = smoothstep(0.68, 0.96, uPin) * uSettle * smoothstep(0.05, 0.95, alpha) * (1.0 - isPureCore);
  vec3 baseBack = max(bgTex.rgb * backWeight, cObsidian * pinSkirtFloor);

  float glyphGate = smoothstep(0.025, 0.13, shapedEnergy);
  vec3 glyphColor = mix(
    cAccent * 1.05,
    cell.rgb * mix(1.30, 1.54, shapedEnergy),
    smoothstep(0.05, 0.28, shapedEnergy)
  );
  vec3 sceneCol = baseBack + glyphColor * cov * glyphGate * mix(1.0, 0.96, uSettle);

  // Pure #000000 event horizon core lock
  sceneCol *= (1.0 - isPureCore);

  // ---- Peak Explosion T^minus Dark-ASCII Carve (Refined 500 Medium Weight) ----
  if (uWordmarkCarve > 0.001) {
    // Clean luminous rim lift around strokes
    vec3 blastAura = mix(cPeriwinkle, vec3(0.96, 0.985, 1.0), 0.70);
    sceneCol = mix(sceneCol, blastAura, clamp(wmHalo * 0.36 * (1.0 - wmStroke), 0.0, 0.42));

    // High-contrast dark obsidian/deep-purple ASCII glyphs carved directly into the white-hot core
    vec3 darkGlyph = mix(cDeepPurple * 0.52, cObsidian, smoothstep(0.28, 0.80, wmStroke));
    darkGlyph = mix(darkGlyph, cSpace * 0.9, wmCaret * 0.35);

    // Subtle recessed stroke interior + crisp dark ASCII glyphs (preserves airy inter-letter separation)
    vec3 carvedFill = mix(sceneCol, mix(cSpace, cObsidian, 0.45), wmStroke * 0.36);
    float carveAlpha = clamp(cov * smoothstep(0.22, 0.60, wmStroke), 0.0, 1.0);
    sceneCol = mix(carvedFill, darkGlyph, carveAlpha * 0.98);
  }

  float outAlpha = clamp(max(alpha, introOpaque), 0.0, 1.0);
  float coronaGlyphAlpha = cov * smoothstep(0.12, 0.42, shapedEnergy) * smoothstep(0.03, 0.24, alpha);
  outAlpha = clamp(max(outAlpha, coronaGlyphAlpha), 0.0, 1.0);

  o = vec4(clamp(sceneCol, 0.0, 1.0) * outAlpha, outAlpha);
}`;

/** Pass 4: Separable Gaussian bloom thresholded strictly above obsidian #040206 ground */
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
 * Pass 5: 2-tier thresholded additive Gaussian bloom composite with premultiplied alpha.
 * - Inside the pure `#000000` event horizon (`alpha = 1.0`): cleanly occludes scrolling copy.
 * - Outside the rim (`alpha -> 0.0`): pure additive purple/ice optical glow over `#040206` space.
 * - Tightly attenuates bloom inside the `500`-weight `T^minus` carve strokes during supernova peak.
 */
const FS_COMP = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 o;
uniform sampler2D uBase;
uniform sampler2D uBloom1;
uniform sampler2D uBloom2;
uniform sampler2D uWordmarkMask;
uniform float uWordmarkCarve;
uniform float uGlow;
void main() {
  vec4 base = texture(uBase, vUv);
  vec3 bloom = texture(uBloom1, vUv).rgb * 0.58 + texture(uBloom2, vUv).rgb * 0.42;
  float wmMask = smoothstep(0.30, 0.68, texture(uWordmarkMask, vUv).r) * uWordmarkCarve;
  float bloomAtten = 1.0 - wmMask * 0.92;
  vec3 col = base.rgb + bloom * uGlow * bloomAtten;
  o = vec4(clamp(col, 0.0, 1.0), clamp(base.a, 0.0, 1.0));
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
 * - Row 0 (top): crisp `500` medium weight for the live black hole accretion field
 * - Row 1 (bottom): refined `550` medium weight for the clean explosion `T^minus` carve
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

  // Row 1: refined 550 medium weight (crisp legibility without chunky bold bleed)
  ctx.font = `550 ${Math.round(cellH * 0.74)}px "Geist Mono", "SF Mono", ui-monospace, Menlo, monospace`;
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

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function mixNum(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

interface StarSpec {
  nx: number;
  ny: number;
  glyph: "*" | "+" | "^" | "-";
  phase: number;
  speed: number;
  size: number;
  tint: "periwinkle" | "accent" | "ice";
  /** Normalized radial distance from bottom horizon crest for organic settle bloom */
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
  skipIntro = false,
}: AsciiBlackholeCanvasProps) {
  const starCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const glCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const onRevealRef = useRef(onHeroReveal);
  const onSyncRef = useRef(onHorizonSync);

  useEffect(() => {
    onRevealRef.current = onHeroReveal;
    onSyncRef.current = onHorizonSync;
  }, [onHeroReveal, onHorizonSync]);

  useEffect(() => {
    const glCanvas = glCanvasRef.current;
    const starCanvas = starCanvasRef.current;
    const video = videoRef.current;
    if (!glCanvas || !starCanvas || !video) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startSettled = skipIntro || reducedMotion;

    let heroRevealed = startSettled;
    if (startSettled) {
      onRevealRef.current(true);
    }

    // ---- Layer 0: Obsidian Cosmic Starfield + Global Viewport Cursor `T`-Glyph Field ----
    const starCtx = starCanvas.getContext("2d");
    const stars = createStarfield(112);

    // ---- Layer 30: Single Persistent WebGL2 Black Hole (`alpha: true`, premultiplied) ----
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

    const pColor = linkProgram(gl, FS_COLOR);
    const pCell = linkProgram(gl, FS_CELL);
    const pGlyph = linkProgram(gl, FS_GLYPH);
    const pBlur = linkProgram(gl, FS_BLUR);
    const pComp = linkProgram(gl, FS_COMP);

    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);

    const atlasTex = buildGlyphAtlas(gl);

    const videoTex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, videoTex);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([4, 2, 6, 255])
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    let wordmarkTex: WebGLTexture | null = null;
    let lastMaskCssW = 0;
    let lastMaskCssH = 0;

    let cw = 0;
    let ch = 0;
    let cssWGlobal = 1440;
    let cssHGlobal = 900;
    let dprGlobal = 2;
    let cols = 160;
    let rows = 80;
    let rtBg: RenderTarget | null = null;
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
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const nw = Math.max(2, Math.round(cssW * dpr));
      const nh = Math.max(2, Math.round(cssH * dpr));
      const isMobile = cssW < 768;

      cssWGlobal = cssW;
      cssHGlobal = cssH;
      dprGlobal = dpr;

      if (starCanvas.width !== nw || starCanvas.height !== nh) {
        starCanvas.width = nw;
        starCanvas.height = nh;
      }

      // High-density ASCII grid for ultra-crisp fine-grain lensing arch & clean 500-weight explosion carve
      const cellCss = isMobile ? 4.0 : 4.8;
      const cellPx = Math.max(3, cellCss * dpr);
      const nCols = Math.max(44, Math.floor(nw / cellPx));
      const nRows = Math.max(26, Math.floor(nh / (cellPx * 1.76)));

      if (
        Math.abs(cssW - lastMaskCssW) > 16 ||
        Math.abs(cssH - lastMaskCssH) > 16 ||
        !wordmarkTex
      ) {
        lastMaskCssW = cssW;
        lastMaskCssH = cssH;
        wordmarkTex = buildWordmarkMaskTexture(gl, wordmarkTex, cssW, cssH);
      }

      if (nw === cw && nh === ch && nCols === cols && nRows === rows && rtBg) {
        return;
      }

      cw = nw;
      ch = nh;
      cols = nCols;
      rows = nRows;
      glCanvas.width = cw;
      glCanvas.height = ch;

      freeRT(gl, rtBg);
      freeRT(gl, rtCell);
      freeRT(gl, rtGlyph);
      freeRT(gl, rtB1A);
      freeRT(gl, rtB1B);
      freeRT(gl, rtB2A);
      freeRT(gl, rtB2B);

      const bgW = Math.max(64, Math.round(cw * 0.5));
      const bgH = Math.max(64, Math.round(ch * 0.5));
      const b1W = Math.max(32, Math.round(cw * 0.25));
      const b1H = Math.max(32, Math.round(ch * 0.25));
      const b2W = Math.max(16, Math.round(cw * 0.125));
      const b2H = Math.max(16, Math.round(ch * 0.125));

      rtBg = createRT(gl, bgW, bgH, gl.LINEAR);
      rtCell = createRT(gl, cols, rows, gl.NEAREST);
      rtGlyph = createRT(gl, cw, ch, gl.LINEAR);
      rtB1A = createRT(gl, b1W, b1H, gl.LINEAR);
      rtB1B = createRT(gl, b1W, b1H, gl.LINEAR);
      rtB2A = createRT(gl, b2W, b2H, gl.LINEAR);
      rtB2B = createRT(gl, b2W, b2H, gl.LINEAR);
    };

    // Rebuild wordmark mask once Newsreader webfont finishes loading so serif T is exact
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

    // Damped global pointer tracking (drives both viewport-wide `T`-glyph field & subtle lensing ripple)
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

    const tryPlay = () => {
      if (video.readyState >= 1) {
        try {
          video.currentTime = startSettled ? VIDEO_LOOP_START_SEC + 0.45 : 0;
          video.playbackRate = startSettled ? 0.82 : 0.72;
        } catch {
          // ignore
        }
      }
      video.play().catch(() => {});
    };
    video.addEventListener("loadedmetadata", tryPlay);
    tryPlay();

    const resumePlay = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };
    window.addEventListener("pointerdown", resumePlay, { passive: true });
    window.addEventListener("wheel", resumePlay, { passive: true });
    window.addEventListener("touchstart", resumePlay, { passive: true });

    let introElapsed = startSettled ? 12.0 : 0.0;
    let smoothedPin = 0.0;
    let lastVideoTime = -1;
    let lastTs = performance.now();
    let lastBgDraw = 0;
    let rafId = 0;

    // Optional deterministic QA pin: ?introAt=6.6
    let pinnedIntroAt: number | null = null;
    try {
      const qs = new URLSearchParams(window.location.search);
      const rawPin = qs.get("introAt");
      if (rawPin !== null) {
        const parsed = Number(rawPin);
        if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 14) {
          pinnedIntroAt = parsed;
          introElapsed = parsed;
          if (parsed >= 9.2) {
            heroRevealed = true;
            onRevealRef.current(true);
          }
        }
      }
    } catch {
      // ignore
    }

    /**
     * Layer 0 Renderer:
     * 1) Restrained obsidian atmosphere glow strictly hugging the black hole horizon side
     * 2) Sparse `* + ^ -` cosmic starfield that blooms radially outward as the black hole settles
     * 3) Global Cursor `T`-Glyph Field across the entire viewport (subtle circular aura with
     *    shimmer & micro-scale, capped at restrained opacity so it never interferes with copy/cursor)
     */
    const drawBackgroundField = (tSec: number, pin: number, settle: number) => {
      if (!starCtx || cssWGlobal <= 1 || cssHGlobal <= 1) return;
      const dpr = dprGlobal;
      starCtx.setTransform(1, 0, 0, 1, 0, 0);
      starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);

      // 1) Very restrained deep-purple horizon atmosphere whisper on pure #040206 obsidian
      const glowY = cssHGlobal * mixNum(0.84, 0.14, pin) * dpr;
      const glowRad = Math.max(cssWGlobal, cssHGlobal) * mixNum(0.36, 0.24, pin) * dpr;
      const grad = starCtx.createRadialGradient(
        cssWGlobal * 0.5 * dpr,
        glowY,
        0,
        cssWGlobal * 0.5 * dpr,
        glowY,
        glowRad
      );
      grad.addColorStop(0, `rgba(78, 20, 140, ${(mixNum(0.11, 0.06, pin) * settle).toFixed(3)})`);
      grad.addColorStop(0.5, `rgba(44, 7, 53, ${(mixNum(0.04, 0.02, pin) * settle).toFixed(3)})`);
      grad.addColorStop(1, "rgba(4, 2, 6, 0)");
      starCtx.fillStyle = grad;
      starCtx.fillRect(0, 0, starCanvas.width, starCanvas.height);

      starCtx.textAlign = "center";
      starCtx.textBaseline = "middle";

      const ptrCssX = pointerX * cssWGlobal;
      const ptrCssY = (1 - pointerY) * cssHGlobal;

      // 2) Sparse cosmic ASCII starfield (`* + ^ -`) emerging radially outward on settle
      const starWave = smoothstep(0.54, 1.0, settle);
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
            (0.14 + 0.30 * twinkle) * calmBelowFold * localAppear
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

      // 3) Tighter Dynamic Multi-Glyph Cursor Aura (`^ - t + = T *`) across the entire viewport
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
            const alpha = Math.min(0.3, falloff * shimmer * fieldFade * 0.34);
            if (alpha < 0.01) continue;

            // Deterministic spatio-temporal cycle across the full brand glyph set (^ - t + = T *)
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

            // #858AE3 periwinkle body + selective #97DFFC ice-blue inner glints + #613DC1 outer rim
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

      const dt = Math.min(0.05, Math.max(0.001, (ts - lastTs) * 0.001));
      lastTs = ts;

      // Silky damped pointer motion
      const pLerp = Math.min(1, dt * 8.5);
      pointerX += (pointerTargetX - pointerX) * pLerp;
      pointerY += (pointerTargetY - pointerY) * pLerp;
      pointerActive +=
        (pointerActiveTarget - pointerActive) * Math.min(1, dt * 5.2);

      // Scroll progress: 0 = bottom horizon, 1 = top-pinned inverted event horizon
      const scrollSpan = Math.max(280, window.innerHeight * 0.84);
      const rawPin = clamp01(window.scrollY / scrollSpan);
      smoothedPin += (rawPin - smoothedPin) * Math.min(1, dt * 11.0);
      if (Math.abs(rawPin - smoothedPin) < 0.0005) {
        smoothedPin = rawPin;
      }

      // Intro clock progression (scrolling skips/accelerates intro cleanly)
      if (pinnedIntroAt !== null) {
        introElapsed = pinnedIntroAt;
      } else if (introElapsed < 12.0) {
        const scrollBoost = window.scrollY > 24 ? 5.5 : 1.0;
        introElapsed = Math.min(12.0, introElapsed + dt * scrollBoost);
      }

      // Trigger organic ASCII materialization as the camera settles into the bottom horizon
      if (!heroRevealed && introElapsed >= 9.2) {
        heroRevealed = true;
        onRevealRef.current(true);
      }

      // Synchronize master_blackhole_boomerang.mp4 to continuous choreography
      if (video.readyState >= 2) {
        const vTime = video.currentTime || 0;

        if (pinnedIntroAt !== null) {
          let targetVideoT = VIDEO_LOOP_START_SEC + 0.5;
          if (pinnedIntroAt < 5.2) {
            targetVideoT = (pinnedIntroAt / 5.2) * 4.25;
          } else if (pinnedIntroAt < 7.8) {
            targetVideoT = 4.25 + ((pinnedIntroAt - 5.2) / 2.6) * 1.45;
          } else if (pinnedIntroAt < 12.0) {
            targetVideoT = 5.7 + ((pinnedIntroAt - 7.8) / 4.2) * 7.35;
          }
          if (Math.abs(vTime - targetVideoT) > 0.25) {
            try {
              video.currentTime = targetVideoT;
            } catch {
              // ignore
            }
          }
        } else if (introElapsed < 12.0) {
          let targetRate = 0.72;
          if (introElapsed < 5.2) {
            targetRate = 0.8;
          } else if (introElapsed < 7.8) {
            targetRate = 0.62;
          } else {
            targetRate = 1.78;
          }
          if (Math.abs(video.playbackRate - targetRate) > 0.06) {
            video.playbackRate = targetRate;
          }
        } else {
          if (Math.abs(video.playbackRate - 0.82) > 0.05) {
            video.playbackRate = 0.82;
          }
          if (vTime >= VIDEO_TOTAL_SEC - 0.08) {
            try {
              video.currentTime = VIDEO_LOOP_START_SEC + 0.04;
            } catch {
              // ignore
            }
          }
        }

        if (vTime !== lastVideoTime) {
          lastVideoTime = vTime;
          gl.bindTexture(gl.TEXTURE_2D, videoTex);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            video
          );
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        }
      }

      syncBuffers();
      if (!rtBg || !rtCell || !rtGlyph || !rtB1A || !rtB1B || !rtB2A || !rtB2B) {
        return;
      }

      const tSec = ts * 0.001;
      const isMobile = cssWGlobal < 768;
      const viewAsp = cw / Math.max(1, ch);
      const videoAsp =
        video.videoWidth > 0 && video.videoHeight > 0
          ? video.videoWidth / video.videoHeight
          : 16 / 9;

      // ---- 1) Peak white-hot supernova & refined 500-weight dark ASCII T^minus carve ----
      const blastPeak =
        smoothstep(5.1, 6.1, introElapsed) *
        (1.0 - smoothstep(7.1, 8.2, introElapsed));
      const wordmarkCarve =
        smoothstep(5.45, 6.25, introElapsed) *
        (1.0 - smoothstep(7.05, 7.95, introElapsed));

      // ---- 2) Single Continuous Black Hole Camera Curve ----
      // Settle (7.8s -> 12.0s): continuous zoom + upward pitch directly into the real black hole
      const settle = easeInOutCubic(clamp01((introElapsed - 7.8) / 4.2));
      // Scroll (p: 0 -> 1): Option 1A constant planetary-scale upward sweep + orbital pitch/roll
      const pEase = smoothstep(0.0, 1.0, smoothedPin);

      const BH_RX = 0.086;
      const BH_RY = 0.104;
      const baseScaleY = viewAsp < videoAsp ? 1.0 : videoAsp / viewAsp;

      // Approved Round 3 subtle mid-scroll plateau (p ~ 0.42-0.58):
      // Zooms out mid-scroll into a true 1:1 spherical black hole in viewport center,
      // then smoothly zooms back into the downward-curving top-pinned dome.
      const midRise = smoothstep(0.1, 0.42, pEase);
      const midFall = 1.0 - smoothstep(0.58, 0.9, pEase);
      const midBell = midRise * midFall;

      const bottomZoom = isMobile ? 3.25 : 4.65;
      const topZoom = isMobile ? 3.25 : 4.55;
      const midZoom = isMobile ? 1.62 : 2.55; // ~477px desktop / ~284px mobile true circular core
      const horizonZoom = mixNum(bottomZoom, topZoom, pEase);
      const scrollZoom = mixNum(horizonZoom, midZoom, midBell);

      const bottomAnamo = isMobile ? 0.72 : 1.34;
      const topAnamo = isMobile ? 0.72 : 1.44;
      // Exact 1:1 circular aspect correction in screen pixels regardless of viewport ratio
      const trueSphereAnamo = BH_RY / (BH_RX * videoAsp);
      const horizonAnamo = mixNum(bottomAnamo, topAnamo, pEase);
      const scrollAnamo = mixNum(horizonAnamo, trueSphereAnamo, midBell);

      // Exact bottom-horizon & top-pinned dome depths
      const bottomApex = isMobile ? 0.225 : 0.255; // ~230px desktop / ~190px mobile
      const topApex = isMobile ? 0.155 : 0.148;    // ~133px desktop / ~131px mobile

      const hShadowBottom = (BH_RY * bottomZoom) / baseScaleY;
      const hShadowTop = (BH_RY * topZoom) / baseScaleY;

      const cyBottom = -hShadowBottom + bottomApex;
      const cyTop = 1.0 + hShadowTop - topApex;
      // Monotonic glide through viewport center during plateau (never reverses)
      const linearCy = mixNum(cyBottom, cyTop, pEase);
      const scrollCy = mixNum(linearCy, 0.5, midBell * 0.92);

      // Continuous camera parameters from Intro (settle = 0) -> Settled Scroll Orbit (settle = 1)
      const camZoom = mixNum(1.0, scrollZoom, settle);
      const camAnamorphicX = mixNum(1.0, scrollAnamo, settle);
      const camCy = mixNum(0.515, scrollCy, settle);
      // Zero perspective tilt during the central spherical plateau for true radial symmetry
      const camTilt = mixNum(0.0, mixNum(0.26, -0.26, pEase) * (1.0 - midBell), settle);
      // Continuous orbital roll (0 -> PI) as the camera sweeps from top limb to bottom limb
      const camRoll = pEase * Math.PI * settle;

      // Pixel-locked HorizonCountdown traveling in the exact center of the black hole:
      // Bottom horizon (1.0x) -> expanding inside central sphere (1.24x desktop / 1.12x mobile)
      // -> scaling back cleanly inside the pure #000000 top-pinned dome (0.72x / 0.70x)
      const bottomCountdownY = cssHGlobal * (1.0 - bottomApex * 0.47);
      const topCountdownY = isMobile ? 64 : 54;
      const coreScreenY = cssHGlobal * (1.0 - camCy);
      const cdBaseY = mixNum(bottomCountdownY, topCountdownY, pEase);
      const countdownCenterY = mixNum(cdBaseY, coreScreenY, midBell);
      const baseCdScale = mixNum(1.0, isMobile ? 0.7 : 0.72, pEase);
      const midCdScale = isMobile ? 1.12 : 1.24;
      const countdownScale = mixNum(baseCdScale, midCdScale, midBell);

      onSyncRef.current?.({
        pinProgress: pEase,
        settleProgress: settle,
        countdownCenterY,
        countdownScale,
        viewportW: cssWGlobal,
      });

      // Redraw Layer 0 (starfield + global cursor `T`-glyph field) at smooth ~33fps
      if (ts - lastBgDraw > 28) {
        lastBgDraw = ts;
        drawBackgroundField(tSec, pEase, settle);
      }

      gl.disable(gl.BLEND);

      // ---- PASS 1: Single Continuous Black Hole Camera & Pure #000000 Core ----
      setTarget(rtBg);
      gl.useProgram(pColor.prog);
      bindTex(0, videoTex, pColor.u.uVideo);
      gl.uniform1f(pColor.u.uHasVideo, video.readyState >= 2 ? 1.0 : 0.0);
      gl.uniform1f(pColor.u.uTime, tSec);
      gl.uniform1f(pColor.u.uViewAsp, viewAsp);
      gl.uniform1f(pColor.u.uVideoAsp, videoAsp);
      gl.uniform1f(pColor.u.uSettle, settle);
      gl.uniform1f(pColor.u.uPin, pEase);
      gl.uniform1f(pColor.u.uMidBell, midBell * settle);
      gl.uniform1f(pColor.u.uBlastPeak, blastPeak);
      gl.uniform2f(pColor.u.uCamCenter, 0.5, camCy);
      gl.uniform1f(pColor.u.uCamZoom, camZoom);
      gl.uniform1f(pColor.u.uCamAnamorphicX, camAnamorphicX);
      gl.uniform1f(pColor.u.uCamTilt, camTilt);
      gl.uniform1f(pColor.u.uCamRoll, camRoll);
      gl.uniform2f(pColor.u.uPointer, pointerX, pointerY);
      gl.uniform1f(pColor.u.uPointerActive, pointerActive);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // ---- PASS 2: 4-Tap Cell Downsample ----
      setTarget(rtCell);
      gl.useProgram(pCell.prog);
      bindTex(0, rtBg.tex, pCell.u.uBg);
      gl.uniform2f(pCell.u.uBgInv, 1.0 / rtBg.w, 1.0 / rtBg.h);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // ---- PASS 3: Native WebGL2 ASCII Pass + Refined 500-Weight T^minus Carve ----
      setTarget(rtGlyph);
      gl.useProgram(pGlyph.prog);
      bindTex(0, rtCell.tex, pGlyph.u.uCell);
      bindTex(1, rtBg.tex, pGlyph.u.uBg);
      bindTex(2, atlasTex, pGlyph.u.uAtlas);
      if (wordmarkTex) {
        bindTex(3, wordmarkTex, pGlyph.u.uWordmarkMask);
      }
      gl.uniform2f(pGlyph.u.uGrid, cols, rows);
      gl.uniform1f(pGlyph.u.uGlyphCount, ASCII_RAMP.length);
      gl.uniform1f(pGlyph.u.uWordmarkCarve, wordmarkCarve);
      gl.uniform1f(pGlyph.u.uSettle, settle);
      gl.uniform1f(pGlyph.u.uPin, pEase);
      gl.uniform1f(pGlyph.u.uTime, tSec);
      gl.uniform2f(pGlyph.u.uPointer, pointerX, pointerY);
      gl.uniform1f(pGlyph.u.uPointerActive, pointerActive);
      gl.uniform1f(pGlyph.u.uViewAsp, viewAsp);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // ---- PASS 4: 2-Tier Thresholded Separable Gaussian Bloom ----
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

      // ---- PASS 5: Final Premultiplied Alpha Composite ----
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
      gl.uniform1f(pComp.u.uWordmarkCarve, wordmarkCarve);
      const glowAmount =
        mixNum(0.42, 0.52, settle) + blastPeak * 0.28 + midBell * 0.1;
      gl.uniform1f(pComp.u.uGlow, glowAmount);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    rafId = window.requestAnimationFrame(frame);

    return () => {
      window.cancelAnimationFrame(rafId);
      video.removeEventListener("loadedmetadata", tryPlay);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerdown", resumePlay);
      window.removeEventListener("wheel", resumePlay);
      window.removeEventListener("touchstart", resumePlay);

      freeRT(gl, rtBg);
      freeRT(gl, rtCell);
      freeRT(gl, rtGlyph);
      freeRT(gl, rtB1A);
      freeRT(gl, rtB1B);
      freeRT(gl, rtB2A);
      freeRT(gl, rtB2B);
      gl.deleteTexture(atlasTex);
      gl.deleteTexture(videoTex);
      if (wordmarkTex) gl.deleteTexture(wordmarkTex);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(pColor.prog);
      gl.deleteProgram(pCell.prog);
      gl.deleteProgram(pGlyph.prog);
      gl.deleteProgram(pBlur.prog);
      gl.deleteProgram(pComp.prog);
    };
  }, [skipIntro]);

  return (
    <>
      <video
        ref={videoRef}
        src="/api/sandbox/video"
        playsInline
        muted
        loop
        preload="auto"
        crossOrigin="anonymous"
        aria-hidden="true"
        className="pointer-events-none fixed h-px w-px opacity-0"
      />

      {/* Layer 0: Obsidian space starfield (`* + ^ -`) + Global viewport cursor `T`-glyph field */}
      <canvas
        ref={starCanvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-[100dvh] w-full"
      />

      {/* Layer 30: Single persistent 60fps WebGL2 ASCII black hole
          (pure #000000 event horizon core + continuous camera dive & scroll orbit) */}
      <canvas
        ref={glCanvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 h-[100dvh] w-full"
      />
    </>
  );
}
