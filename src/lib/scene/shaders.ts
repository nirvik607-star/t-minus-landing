/**
 * T^minus scene shaders.
 *
 * Two passes:
 *  1. SCENE  renders one texel per glyph cell. Each texel traces a few light
 *     rays through a Schwarzschild field (rs = 1) and records how much light
 *     reaches the camera. This pass is tiny (a few thousand texels), which is
 *     what keeps the scene cheap on phones.
 *  2. GLYPH  runs at full resolution. For every pixel it finds its cell, reads
 *     the cell's light, picks a glyph from the brand set by density and draws
 *     it from a pre-rasterised atlas. Cells never move; only the glyph in
 *     them and its luminosity change.
 */

export const VS_FULLSCREEN = `#version 300 es
precision highp float;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

export const FS_SCENE = `#version 300 es
precision highp float;
out vec4 o;

uniform vec2  uCellPx;      // cell size, CSS px
uniform vec2  uOriginPx;    // CSS px position of cell (0,0)'s bottom-left corner
uniform vec2  uHolePx;      // hole centre, CSS px, origin bottom-left
uniform float uFocalPx;     // focal length in CSS px
uniform vec3  uCamPos;
uniform vec3  uCamRight;
uniform vec3  uCamUp;
uniform vec3  uCamFwd;
uniform float uTime;        // seconds, scene clock
uniform float uMass;        // 0..1, scales gravity and the horizon (intro)
uniform float uDisk;        // 0..1 disk emission
uniform float uDiskIn;
uniform float uDiskOut;
uniform float uSpin;        // disk angular speed scale
uniform float uExposure;
uniform float uStar;        // 0..1 star visibility
uniform float uStarR;       // star radius (scene units)
uniform float uStarGain;
uniform float uStarPx;      // apparent star radius, CSS px
uniform float uFlood;       // 0..1 supernova light
uniform float uFloodR;      // flood front radius, CSS px
uniform float uDrainR;      // inner cleared radius, CSS px
uniform float uHand;        // 0..1 second-hand visibility
uniform float uHandAngle;   // radians, disk azimuth of the second hand
uniform float uPulse;       // 0..1 travelling brightening (typing, submit)
uniform float uPulseR;      // radius of the travelling pulse (scene units)
uniform int   uSamples;     // rays per cell (1..4)
uniform float uRingK;       // sharpness of the photon ring, set so it spans about one cell

const float TAU = 6.28318530718;
const float B_CRIT = 2.59807621135; // 3*sqrt(3)/2

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float hash31(vec3 p) {
  p = fract(p * vec3(0.1031, 0.1030, 0.0973));
  p += dot(p, p.yxz + 33.33);
  return fract((p.x + p.y) * p.z);
}

// Value noise, periodic along x with the given integer period.
float vnoiseP(vec2 p, float period) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float x0 = mod(i.x, period);
  float x1 = mod(i.x + 1.0, period);
  float a = hash21(vec2(x0, i.y));
  float b = hash21(vec2(x1, i.y));
  float c = hash21(vec2(x0, i.y + 1.0));
  float d = hash21(vec2(x1, i.y + 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float vnoise3(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float n000 = hash31(i);
  float n100 = hash31(i + vec3(1, 0, 0));
  float n010 = hash31(i + vec3(0, 1, 0));
  float n110 = hash31(i + vec3(1, 1, 0));
  float n001 = hash31(i + vec3(0, 0, 1));
  float n101 = hash31(i + vec3(1, 0, 1));
  float n011 = hash31(i + vec3(0, 1, 1));
  float n111 = hash31(i + vec3(1, 1, 1));
  return mix(
    mix(mix(n000, n100, f.x), mix(n010, n110, f.x), f.y),
    mix(mix(n001, n101, f.x), mix(n011, n111, f.x), f.y),
    f.z
  );
}

// Streaks that run along the orbit: few lumps around, many rings across.
float streaks(float r, float theta) {
  float u = theta / TAU;
  float lr = log(max(r, 0.001));
  float n = 0.0;
  n += 0.52 * vnoiseP(vec2(u * 6.0, lr * 7.5), 6.0);
  n += 0.30 * vnoiseP(vec2(u * 15.0, lr * 19.0 + 3.1), 15.0);
  n += 0.18 * vnoiseP(vec2(u * 37.0, lr * 43.0 + 7.7), 37.0);
  return n;
}

// Emission and opacity of the disk at a plane hit. xyz: (intensity, heat, alpha)
vec3 shadeDisk(vec3 hit, vec3 v) {
  float r = length(hit.xz);
  if (r < uDiskIn || r > uDiskOut) return vec3(0.0);
  float span = max(uDiskOut - uDiskIn, 0.001);
  float x = (r - uDiskIn) / span;
  float phi = atan(hit.z, hit.x);

  // Keplerian shear, shown as two layers that cross-fade so the texture
  // never winds itself into a solid spiral.
  float omega = uSpin * pow(r, -1.5);
  const float PERIOD = 26.0;
  float ph0 = fract(uTime / PERIOD);
  float ph1 = fract(uTime / PERIOD + 0.5);
  float base = uTime * uSpin * 0.045;
  float n0 = streaks(r, phi + base + omega * (ph0 - 0.5) * PERIOD);
  float n1 = streaks(r, phi + base + omega * (ph1 - 0.5) * PERIOD + 2.4);
  float w0 = 1.0 - abs(2.0 * ph0 - 1.0);
  float n = mix(n1, n0, w0);

  float edgeIn = smoothstep(0.0, 0.05, x);
  float edgeOut = 1.0 - smoothstep(0.7, 1.0, x);
  float prof = pow(uDiskIn / r, 1.75) * edgeIn * edgeOut;

  // Ring structure: gaps and bright lanes.
  // Lanes trail in a loose two-armed spiral, with real dark gaps between them.
  float lane = 0.5 + 0.5 * sin(log(r) * 9.5 - 2.0 * (phi + base * 5.0) + n * 3.4);
  float ripple = 0.5 + 0.5 * sin(log(r) * 31.0 - 3.0 * phi + n * 5.0);
  float lanes = (0.16 + 0.84 * lane * lane) * (0.72 + 0.28 * ripple);
  float fine = vnoiseP(vec2((phi + base * 9.0 + omega * 3.0) / TAU * 11.0, log(r) * 38.0), 11.0);
  float tex = smoothstep(0.22, 0.78, n);
  float emit = prof * (0.2 + 2.3 * tex * tex + 0.8 * smoothstep(0.55, 0.9, fine)) * lanes;
  // The innermost band runs white-hot.
  emit += 1.1 * exp(-x * 13.0) * edgeIn * (0.5 + 0.5 * tex);
  // A floor of faint matter so the outer disk thins out instead of vanishing.
  emit += 0.04 * edgeIn * edgeOut * (0.4 + tex);

  // Relativistic beaming: the side rotating toward the camera is brighter.
  float beta = sqrt(0.5 / max(r - 1.0, 0.35));
  beta = min(beta, 0.72);
  vec3 tang = vec3(-sin(phi), 0.0, cos(phi));
  float cosT = dot(tang, -normalize(v));
  float gamma = inversesqrt(1.0 - beta * beta);
  float dop = 1.0 / (gamma * (1.0 - beta * cosT));
  float grav = sqrt(max(1.0 - 1.0 / r, 0.02));
  float boost = pow(dop * grav, 3.0);
  emit *= mix(1.0, boost, 0.72);

  // Second hand: one hot cell on the inner edge, stepping once a second.
  float dAng = abs(mod(phi - uHandAngle + 3.14159265, TAU) - 3.14159265);
  float hand = uHand * smoothstep(0.022, 0.008, dAng) * (1.0 - smoothstep(0.2, 0.3, x));
  emit += hand * 4.0;

  // Travelling pulse (typing, submit).
  float pulse = uPulse * smoothstep(0.9, 0.0, abs(r - uPulseR));
  emit *= 1.0 + pulse * 1.8;

  float heat = clamp(prof * 0.9 * tex * mix(1.0, boost, 0.5) + hand, 0.0, 1.0);
  float alpha = clamp(prof * (0.5 + 1.0 * tex) * 1.5 + hand, 0.0, 0.95);
  return vec3(emit * uDisk, heat, alpha * uDisk);
}

// Light arriving along one ray. Returns (intensity, heat, absorbed).
vec3 trace(vec3 ro, vec3 rd) {
  float I = 0.0;
  float heat = 0.0;
  float absorbed = 0.0;
  float transmit = 1.0;

  // ---- the star (intro), drawn in flat space ----
  if (uStar > 0.001) {
    float b = dot(ro, rd);
    float c = dot(ro, ro) - uStarR * uStarR;
    float disc = b * b - c;
    float impact = length(cross(ro, rd));
    if (disc > 0.0) {
      float t = -b - sqrt(disc);
      vec3 n = normalize(ro + rd * t);
      float mu = max(dot(n, -rd), 0.0);
      float limb = 0.2 + 0.8 * pow(mu, 0.85);
      float ca = cos(uTime * 0.11), sa = sin(uTime * 0.11);
      vec3 q = vec3(ca * n.x + sa * n.z, n.y, -sa * n.x + ca * n.z);
      float g = 0.6 * vnoise3(q * 4.6 + vec3(0.0, uTime * 0.05, 0.0))
              + 0.4 * vnoise3(q * 10.5 - vec3(uTime * 0.07, 0.0, 0.0));
      float cells = smoothstep(0.30, 0.72, g);
      float s = limb * (0.5 + 0.85 * cells);
      I += uStar * uStarGain * s;
      heat = max(heat, uStar * limb * cells);
    } else {
      float d = (impact - uStarR) / max(uStarR, 0.001);
      float ang = atan(dot(ro + rd * (-b), uCamUp), dot(ro + rd * (-b), uCamRight));
      float ray = vnoiseP(vec2(ang / TAU * 24.0, uTime * 0.25), 24.0);
      float corona = exp(-d * (3.4 + 3.0 * ray)) * (0.55 + 0.45 * ray);
      I += uStar * uStarGain * 0.42 * corona;
    }
  }

  // ---- the hole and its disk ----
  if (uMass > 0.001 || uDisk > 0.001) {
    vec3 p = ro;
    vec3 v = rd;
    vec3 hv = cross(p, v);
    float h2 = dot(hv, hv);
    float m = uMass;
    float bound = uDiskOut + 2.5;
    // Skip the empty approach when the ray clearly misses everything.
    float impact = sqrt(h2);
    if (impact > bound) {
      return vec3(I, heat, 0.0);
    }
    // Jump to the bounding sphere.
    float bq = dot(p, v);
    float cq = dot(p, p) - bound * bound;
    float dq = bq * bq - cq;
    if (cq > 0.0 && dq > 0.0) {
      p += v * max(-bq - sqrt(dq), 0.0);
    }
    for (int i = 0; i < 150; i++) {
      float r2 = dot(p, p);
      float r = sqrt(r2);
      if (r < m) { absorbed = 1.0; break; }
      float dt = clamp(0.085 * r, 0.035, 0.9);
      // Slow down while skimming the disk plane so thin crossings aren't missed.
      dt = min(dt, max(abs(p.y) * 0.6, 0.045));
      vec3 a = -1.5 * m * h2 * p / (r2 * r2 * r);
      v += a * dt;
      vec3 pn = p + v * dt;
      if (p.y * pn.y < 0.0) {
        float t = p.y / (p.y - pn.y);
        vec3 hit = mix(p, pn, t);
        vec3 d = shadeDisk(hit, v);
        I += transmit * d.x;
        heat = max(heat, transmit * d.y);
        transmit *= 1.0 - d.z;
        if (transmit < 0.02) break;
      }
      p = pn;
      if (r2 > bound * bound * 1.05 && dot(p, v) > 0.0) break;
    }
    // Photon ring: light that skimmed the critical orbit piles up into a thin
    // bright rim just outside the shadow.
    if (absorbed < 0.5 && m > 0.02) {
      float xr = impact / (B_CRIT * m) - 1.0;
      if (xr > 0.0) {
        vec3 foot = ro + rd * (-dot(ro, rd));
        float ang = atan(dot(foot, uCamUp), dot(foot, uCamRight));
        float grain = 0.72 + 0.28 * vnoiseP(vec2(ang / TAU * 48.0, uTime * 0.6), 48.0);
        float ring = exp(-xr * uRingK) * grain;
        I += transmit * ring * 3.6 * uDisk;
        heat = max(heat, transmit * ring * uDisk);
      }
    }
  }

  return vec3(I, heat, absorbed);
}

void main() {
  vec2 cell = floor(gl_FragCoord.xy);
  float I = 0.0;
  float heat = 0.0;
  float absorbed = 0.0;
  int n = clamp(uSamples, 1, 4);
  for (int s = 0; s < 4; s++) {
    if (s >= n) break;
    // Rotated-grid offsets inside the cell.
    vec2 jit = n == 1 ? vec2(0.5) : vec2(
      0.25 + 0.5 * float(s & 1) + (float(s >> 1) - 0.5) * 0.25,
      0.25 + 0.5 * float(s >> 1) - (float(s & 1) - 0.5) * 0.25
    );
    vec2 px = uOriginPx + (cell + jit) * uCellPx;
    vec2 d = px - uHolePx;
    vec3 rd = normalize(uCamFwd * uFocalPx + uCamRight * d.x + uCamUp * d.y);
    vec3 r = trace(uCamPos, rd);
    I += r.x;
    heat += r.y;
    absorbed += r.z;
  }
  float inv = 1.0 / float(n);
  I *= inv; heat *= inv; absorbed *= inv;

  // Supernova light: floods outward from the centre across the fixed grid,
  // then drains from the middle. A density front, never a drawn ring.
  if (uFlood > 0.001) {
    vec2 c = uOriginPx + (cell + 0.5) * uCellPx - uHolePx;
    float dist = length(c);
    float ang = atan(c.y, c.x);
    float rag = vnoiseP(vec2(ang / TAU * 36.0, dist * 0.012), 36.0);
    float front = uFloodR * (0.78 + 0.34 * rag);
    float inside = smoothstep(front, front * 0.62, dist);
    float drained = smoothstep(uDrainR * 0.7, uDrainR * 1.15, dist);
    float grain = 0.55 + 0.45 * hash21(cell + floor(uTime * 14.0));
    I += uFlood * inside * drained * grain * 2.4;
    heat = max(heat, uFlood * inside * drained * 0.9);
  }

  // The star throws four thin spikes along the grid, the way a bright point
  // does through a lens. They lengthen as the core brightens.
  if (uStar > 0.001) {
    vec2 c = uOriginPx + (cell + 0.5) * uCellPx - uHolePx;
    float reach = uStarPx * (1.5 + 0.9 * uStarGain) + 40.0;
    float sx = exp(-abs(c.y) / (uCellPx.y * 0.55)) * exp(-abs(c.x) / reach);
    float sy = exp(-abs(c.x) / (uCellPx.x * 0.55)) * exp(-abs(c.y) / (reach * 0.72));
    float outside = smoothstep(uStarPx * 0.9, uStarPx * 1.25, length(c));
    I += uStar * uStarGain * 0.9 * (sx + sy) * outside;
  }

  float ink = 1.0 - exp(-uExposure * I);
  o = vec4(ink, clamp(heat, 0.0, 1.0), absorbed, 1.0);
}`;

export const FS_GLYPH = `#version 300 es
precision highp float;
out vec4 o;

uniform sampler2D uScene;   // one texel per cell: ink, heat, absorbed
uniform sampler2D uAtlas;   // glyphs left to right, sparse to dense
uniform vec2  uCellDev;     // cell size, device px
uniform vec2  uOriginDev;   // device px of cell (0,0)'s bottom-left corner
uniform vec2  uGrid;        // cols, rows
uniform float uGlyphs;      // glyphs in the atlas (ramp + reserved)
uniform float uRamp;        // glyphs in the density ramp
uniform vec2  uHoleDev;     // hole centre, device px, origin bottom-left
uniform float uShadowDev;   // shadow radius, device px
uniform float uVoid;        // 0..1 opacity of the black disc
uniform float uTime;
uniform float uShimmer;     // 0..1 glyph substitution activity
uniform float uStars;       // 0..1 sparse field stars
uniform float uAlpha;       // whole-scene opacity
uniform float uDpr;
uniform float uFadeLineDev; // glyphs fade out above this y (device px, origin bottom)
uniform float uFadeSoftDev;
uniform float uGlow;        // 0..1 soft light under the glyphs
uniform float uWell;        // 0..1 darkening of the ground around the hole
uniform float uWellDev;     // falloff length of the well, device px
uniform float uSignal;      // atlas index (1-based) of the large signal T
uniform float uPolar;       // 0 = seen at an angle, 1 = seen from above
uniform float uFront;       // 0..1: show the disk where it crosses in front of the shadow
uniform float uCut;         // 1 = the void is left open, so the page beneath shows through the hole
uniform float uFadeXDev;    // the field fades out to the right of this x (device px); far right = off

const vec3 C_DEEP  = vec3(0.306, 0.078, 0.549); // #4E148C
const vec3 C_ACC   = vec3(0.380, 0.239, 0.757); // #613DC1
const vec3 C_PERI  = vec3(0.522, 0.541, 0.890); // #858AE3
const vec3 C_WHITE = vec3(0.965, 0.955, 1.000);
const vec3 C_GROUND = vec3(0.17255, 0.02745, 0.20784); // #2C0735, the page ground

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec3 palette(float ink, float heat) {
  float t = clamp(ink + heat * 0.25, 0.0, 1.0);
  vec3 c = mix(C_ACC, C_PERI, smoothstep(0.1, 0.46, t));
  c = mix(c, C_WHITE, smoothstep(0.4, 0.88, t));
  return c;
}

void main() {
  vec2 frag = gl_FragCoord.xy - uOriginDev;
  vec2 cell = floor(frag / uCellDev);
  vec2 local = fract(frag / uCellDev);
  vec4 s = vec4(0.0);
  if (cell.x >= 0.0 && cell.y >= 0.0 && cell.x < uGrid.x && cell.y < uGrid.y) {
    s = texelFetch(uScene, ivec2(cell), 0);
  }
  float ink = s.r;
  float heat = s.g;

  // The void: a true black disc under the glyphs.
  float distHole = length(gl_FragCoord.xy - uHoleDev);
  float voidA = uVoid * (1.0 - smoothstep(uShadowDev - 1.25 * uDpr, uShadowDev + 0.25 * uDpr, distHole));

  // Ordered dither so tone falls across neighbouring glyphs instead of banding.
  float dth = fract(dot(cell, vec2(0.7548776662, 0.5698402910)));
  float levels = uRamp;
  float lvl = pow(ink, 0.8) * (levels + 0.4) + (dth - 0.5) * 0.9;
  float gi = clamp(floor(lvl), 0.0, levels);
  bool hot = lvl > levels + 0.25;

  // Substitution: now and then a lit cell swaps to its neighbour glyph.
  float rate = 1.6;
  float slot = floor(uTime * rate + hash21(cell) * 7.0);
  float sub = hash21(cell + slot * 0.731);
  if (gi >= 1.0 && sub < 0.16 * uShimmer) {
    gi = clamp(gi + (sub < 0.08 * uShimmer ? 1.0 : -1.0), 1.0, levels);
  }

  vec3 col = vec3(0.0);
  float a = 0.0;
  if (gi >= 1.0) {
    float idx = hot ? uSignal : gi;
    vec2 uv = vec2((idx - 1.0 + local.x) / uGlyphs, local.y);
    float cov = texture(uAtlas, uv).r;
    col = hot ? C_WHITE : palette(ink, heat);
    a = cov * mix(0.34, 1.0, smoothstep(0.04, 0.5, ink));
  } else if (uStars > 0.001) {
    // Sparse field stars: fixed cells that blink through two glyphs.
    float h = hash21(cell * 1.37 + 11.0);
    if (h > 0.9955 && distHole > uShadowDev * 1.02) {
      float tw = hash21(cell + floor(uTime * 0.45 + h * 40.0));
      float g = tw < 0.5 ? 1.0 : 3.0;
      vec2 uv = vec2((g - 1.0 + local.x) / uGlyphs, local.y);
      float cov = texture(uAtlas, uv).r;
      col = mix(C_DEEP, C_PERI, tw);
      a = cov * uStars * (0.35 + 0.5 * tw) * (tw < 0.12 ? 0.0 : 1.0);
    }
  }

  // Inside the shadow, light is only real where the near side of the disk
  // crosses in front of it: below centre, and only when seen at an angle.
  // Everywhere else the rim is kept clean.
  float inside = 1.0 - smoothstep(uShadowDev - 0.6 * uCellDev.x, uShadowDev + 0.3 * uCellDev.x, distHole);
  float legit = (1.0 - uPolar) * smoothstep(-0.02, 0.05, (uHoleDev.y - gl_FragCoord.y) / max(uShadowDev, 1.0));
  // Only the bright band survives there; its dim outskirts would read as stripes.
  legit *= uFront * smoothstep(0.07, 0.3, ink);
  a *= 1.0 - inside * (1.0 - legit) * uVoid;

  // Keep the field clear of the form above the horizon.
  a *= 1.0 - smoothstep(uFadeLineDev - uFadeSoftDev, uFadeLineDev, gl_FragCoord.y);
  // And clear of the copy that stands beside the ring on wide screens.
  float sideClear = 1.0 - smoothstep(uFadeXDev - 80.0 * uDpr, uFadeXDev, gl_FragCoord.x);
  a *= sideClear;

  // Soft light from the cells around this pixel, read from blurred mips of
  // the scene. It sits under the glyphs and gives the field its depth.
  vec2 suv = (gl_FragCoord.xy - uOriginDev) / (uCellDev * uGrid);
  float g1 = textureLod(uScene, suv, 1.4).r;
  float g2 = textureLod(uScene, suv, 3.0).r;
  float g3 = textureLod(uScene, suv, 4.6).r;
  float glowInk = g1 * 0.5 + g2 * 0.34 + g3 * 0.3;
  vec3 glowCol = mix(C_DEEP, C_ACC, smoothstep(0.02, 0.3, glowInk));
  glowCol = mix(glowCol, C_PERI, smoothstep(0.25, 0.7, glowInk));
  // The glow tops out at periwinkle and partial strength, so the characters
  // on top of it stay readable even where the scene is brightest.
  float glowAmt = uGlow * min(0.62, smoothstep(0.0, 0.5, glowInk) * (0.3 + 0.7 * glowInk));
  glowAmt *= 1.0 - smoothstep(uFadeLineDev - uFadeSoftDev * 1.6, uFadeLineDev + uFadeSoftDev * 0.5, gl_FragCoord.y);
  glowAmt *= sideClear;

  // The well: space darkens toward the hole, so the light has something to
  // stand against.
  float wellD = max(distHole - uShadowDev, 0.0) / max(uWellDev, 1.0);
  float wellA = uWell * exp(-wellD * wellD * 1.6) * uVoid;
  wellA *= 1.0 - 0.7 * smoothstep(uFadeLineDev - uFadeSoftDev * 4.0, uFadeLineDev + uFadeSoftDev, gl_FragCoord.y);

  // Composite, bottom to top: ground, well, void, glow, glyph.
  float underA = max(wellA, voidA);
  // No light inside the shadow unless the disk really crosses in front of it.
  vec3 underC = glowCol * glowAmt * (1.0 - voidA * mix(1.0, 0.82, uFront));
  vec3 outC = col * a + underC * (1.0 - a);
  float outA = a + underA * (1.0 - a);
  // Porthole: the field is laid on its own ground and the void is left open,
  // so the page beneath shows through the hole and is hidden everywhere else.
  if (uCut > 0.5) {
    vec3 solid = outC + C_GROUND * (1.0 - outA);
    // Content dims as it nears the rim, so text fades out instead of being sliced.
    float edge = smoothstep(uShadowDev - 84.0 * uDpr, uShadowDev - 4.0 * uDpr, distHole) * 0.96;
    float holeA = a + (1.0 - a) * edge;
    outC = mix(solid, col * a, voidA);
    outA = mix(1.0, holeA, voidA);
  }
  o = vec4(outC, outA) * uAlpha;
}`;
