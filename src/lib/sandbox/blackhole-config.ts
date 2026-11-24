export type LoopBehavior = "ease-to-static" | "continuous";

export interface BlackholeShaderConfig {
  // Glyph & Shader Controls
  desktopCellPx: number;
  mobileCellPx: number;
  glyphRamp: string;
  sortRampByDensity: boolean;
  glyphSharpness: number;
  glowIntensity: number;
  hybridBgOpacity: number;
  glyphContrast: number;
  greenHueCenter: number;
  greenHueWidth: number;
  greenToIceIntensity: number;
  paletteRichness: number;

  // Framing & Timing Controls
  mobileZoom: number;
  mobileOffsetY: number;
  desktopZoom: number;
  fastScrollMultiplier: number;
  loopMode: LoopBehavior;

  // Scroll Choreography Curve Thresholds (0.0 -> 1.0 of hero track)
  scrollTrackVh: number;
  zoomEnd: number;
  maxZoomScale: number;
  wordmarkStart: number;
  wordmarkPeak: number;
  dockStart: number;
  dockEnd: number;
  contentRevealStart: number;
}

export const GALAXY_PALETTE = {
  deepVoid: "#13021D",
  spacePurple: "#2C0735",
  electricViolet: "#613DC1",
  periwinkle: "#858AE3",
  iceBlue: "#97DFFC",
} as const;

export const VIDEO_LOOP_START_SEC = 12.9667; // Frame 778 / 60fps (F_zoom3_settled)
export const VIDEO_LOOP_PEAK_SEC = 13.4333;  // Peak frame inside boomerang
export const VIDEO_TOTAL_SEC = 18.9667;      // 1138 frames @ 60fps

export const DEFAULT_BLACKHOLE_CONFIG: BlackholeShaderConfig = {
  // Glyph & Shader
  desktopCellPx: 11,
  mobileCellPx: 7,
  glyphRamp: " .:-^tT",
  sortRampByDensity: true,
  glyphSharpness: 1.32,
  glowIntensity: 0.9,
  hybridBgOpacity: 0.36,
  glyphContrast: 1.24,
  greenHueCenter: 96,
  greenHueWidth: 48,
  greenToIceIntensity: 1.05,
  paletteRichness: 0.94,

  // Framing & Timing
  mobileZoom: 0.94,
  mobileOffsetY: 0.02,
  desktopZoom: 1.0,
  fastScrollMultiplier: 6.0,
  loopMode: "ease-to-static",

  // Scroll Choreography
  scrollTrackVh: 400,
  zoomEnd: 0.36,
  maxZoomScale: 6.4,
  wordmarkStart: 0.3,
  wordmarkPeak: 0.54,
  dockStart: 0.66,
  dockEnd: 0.88,
  contentRevealStart: 0.84,
};

export const BLACKHOLE_PRESETS: Record<string, Partial<BlackholeShaderConfig>> = {
  "T^minus Galaxy (Default)": DEFAULT_BLACKHOLE_CONFIG,
  "Crisp High-Contrast Core": {
    desktopCellPx: 10,
    mobileCellPx: 7,
    glyphRamp: " .:-^tT",
    glyphSharpness: 1.65,
    glowIntensity: 1.15,
    hybridBgOpacity: 0.28,
    glyphContrast: 1.48,
    greenToIceIntensity: 1.2,
  },
  "Dense Atmospheric Nebula": {
    desktopCellPx: 8,
    mobileCellPx: 6,
    glyphRamp: " .,-^tT",
    glyphSharpness: 1.15,
    glowIntensity: 1.05,
    hybridBgOpacity: 0.54,
    glyphContrast: 1.15,
    paletteRichness: 0.98,
  },
};

export interface SandboxTelemetry {
  videoTime: number;
  videoDuration: number;
  introSettled: boolean;
  fastForwarding: boolean;
  scrollProgress: number;
  stageLabel: string;
  fps: number;
  cols: number;
  rows: number;
  activeMode: "desktop" | "mobile";
  webglStatus: "ready" | "fallback" | "initializing";
}

export function normalizeGlyphRamp(raw: string): string {
  const cleaned = raw.replace(/[\r\n]/g, "");
  const unique: string[] = [];
  for (const ch of cleaned) {
    if (!unique.includes(ch)) unique.push(ch);
  }
  if (unique.length < 2) {
    return DEFAULT_BLACKHOLE_CONFIG.glyphRamp;
  }
  return unique.join("");
}

export function getStageLabel(
  progress: number,
  cfg: BlackholeShaderConfig
): string {
  if (progress <= 0.015) return "Intro / Boomerang Hold";
  if (progress < cfg.zoomEnd) return "Stage 1 · Event Horizon Zoom";
  if (progress < cfg.dockStart) return "Stage 2 · T^minus Materialization";
  if (progress < cfg.dockEnd) return "Stage 3 · Navbar Docking";
  return "Stage 4 · Content Reveal";
}
