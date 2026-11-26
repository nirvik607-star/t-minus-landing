(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[894],{4783:(e,t,a)=>{"use strict";a.d(t,{LandingExperience:()=>K});var o=a(5155),r=a(2115);let l=(...e)=>{let t=new Set;for(let a of e)if("string"==typeof a)for(let e of a.split(/\s+/))e&&t.add(e);return[...t].join(" ")},i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},n=(0,r.createContext)({}),s=(0,r.forwardRef)(({color:e,size:t,width:a,height:o,strokeWidth:s,absoluteStrokeWidth:c,nonScalingStroke:u,className:m="",children:h,iconNode:d=[],icon:p={node:d,aliases:[],size:24},...f},x)=>{let{size:v=24,strokeWidth:g=2,absoluteStrokeWidth:b=!1,nonScalingStroke:C=!1,color:w="currentColor",className:y=""}=(0,r.useContext)(n)??{},E=!!h||(e=>{if(null==e||"object"!=typeof e)return!1;for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t)&&(t.startsWith("aria-")||"role"===t||"title"===t)&&null!=e[t])return!0;return!1})(f),[A,k,R=[]]=function(e,t={}){return function(e,t={}){let a=t.attributeNames??{},o=e=>a[e]??e,r=e.size??e.width??i.width,n=e.size??e.height??i.height,s=e.aliases?.filter(e=>"string"==typeof e&&""!==e.trim()).map(e=>`lucide-${e}`)??[],c=[...e.name?[`lucide-${e.name}`]:[],...s],u=t.className?.split(" ").filter(Boolean)??[],m=!1===t.includeDefaultClasses?l(...u):l("lucide",...c,...u),h=t.strokeWidth??i["stroke-width"];if(t.absoluteStrokeWidth){let a=Number(h)*Number(e.size??e.width??i.width)/Number(t.size??t.width??i.width);Number.isFinite(a)&&(h=a)}return["svg",{...Object.entries(i).reduce((e,[t,a])=>(e[o(t)]=a,e),{}),..."color"in t&&t.color&&{[o("stroke")]:t.color},..."size"in t&&null!=t.size&&{[o("width")]:t.size,[o("height")]:t.size},..."width"in t&&null!=t.width&&{[o("width")]:t.width},..."height"in t&&null!=t.height&&{[o("height")]:t.height},[o("stroke-width")]:h,...m&&{[o("class")]:m},[o("viewBox")]:`0 0 ${r} ${n}`,...!1===t.hasA11yProp?{[o("aria-hidden")]:"true"}:{},..."attributes"in t&&t.attributes},e.node.map(e=>{let[a,r,l]=e,i=t.nonScalingStroke?{[o("vector-effect")]:"non-scaling-stroke",...r}:r;return l?[a,i,l]:[a,i]})]}(e,{...t,attributeNames:{...t.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}(p,{color:e??w,width:a??t??v,height:o??t??v,strokeWidth:s??g,absoluteStrokeWidth:c??b,nonScalingStroke:u??C,className:l(y,m),hasA11yProp:E,attributes:f});return(0,r.createElement)(A,{ref:x,...k},[...R.map(([e,t])=>(0,r.createElement)(e,t)),...Array.isArray(h)?h:[h]])});function c(e,t=[],a=[]){let o,l="string"==typeof e?function(e,t,a=[]){if(null==t)throw Error("[lucide]: iconNode is required when icon name is used");return{name:(e.match(/\d+[xX]\d+|[A-Z]?[a-z]+|[A-Z]|\d+/g)??[]).join("-").toLowerCase(),size:24,node:t,...a.length>0?{aliases:a}:{}}}(e,t,a):e,i=(0,r.forwardRef)(({className:e,...t},a)=>(0,r.createElement)(s,{ref:a,icon:l,className:e,...t}));return l.name&&(i.displayName=(o=(e=>{let t="",a=!1;for(let o of e){if("-"===o||"_"===o||o<=" "){a=t.length>0;continue}0===t.length?t+=o.toLowerCase():t+=a?o.toUpperCase():o,a=!1}return t})(l.name)).charAt(0).toUpperCase()+o.slice(1)),i}let u={name:"arrow-up",size:24,node:[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]};u.node;let m=c(u),h={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};h.node;let d=c(h);function p({scale:e,className:t=""}){let a={gap:"calc(1px * var(--wm-scale, 1))",...void 0!==e?{"--wm-scale":String(e)}:{}};return(0,o.jsxs)("span",{"aria-label":"T-minus",className:`inline-flex items-baseline leading-none select-none ${t}`,style:a,children:[(0,o.jsx)("span",{"aria-hidden":"true",className:"font-serif font-medium italic",style:{fontSize:"calc(26px * var(--wm-scale, 1))",lineHeight:1},children:"T"}),(0,o.jsx)("span",{"aria-hidden":"true",className:"font-sans font-medium",style:{fontSize:"calc(15px * var(--wm-scale, 1))",lineHeight:1,letterSpacing:"calc(-0.5px * var(--wm-scale, 1))",transform:"translateY(calc(-3px * var(--wm-scale, 1)))",display:"inline-block"},children:"^minus"})]})}let f=" ^-t+=T*",x=`#version 300 es
precision highp float;
out vec2 vUv;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,v=`#version 300 es
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
}`,g=`#version 300 es
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
}`,b=`#version 300 es
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
}`,C=`#version 300 es
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
}`,w=`#version 300 es
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
}`;function y(e,t,a){let o=e.createShader(t);if(!o)throw Error("Unable to create shader");if(e.shaderSource(o,a),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(o)||"unknown error";throw e.deleteShader(o),Error(`Shader compile error: ${t}`)}return o}function E(e,t){let a=y(e,e.VERTEX_SHADER,x),o=y(e,e.FRAGMENT_SHADER,t),r=e.createProgram();if(!r)throw Error("Unable to create WebGL2 program");if(e.attachShader(r,a),e.attachShader(r,o),e.linkProgram(r),!e.getProgramParameter(r,e.LINK_STATUS)){let t=e.getProgramInfoLog(r)||"unknown error";throw e.deleteProgram(r),Error(`Program link error: ${t}`)}e.deleteShader(a),e.deleteShader(o);let l={},i=e.getProgramParameter(r,e.ACTIVE_UNIFORMS);for(let t=0;t<i;t++){let a=e.getActiveUniform(r,t);a&&(l[a.name]=e.getUniformLocation(r,a.name))}return{prog:r,u:l}}function A(e,t,a,o){let r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,t,a,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);let l=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,l),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),e.bindFramebuffer(e.FRAMEBUFFER,null),{tex:r,fb:l,w:t,h:a}}function k(e,t){t&&(e.deleteFramebuffer(t.fb),e.deleteTexture(t.tex))}function R(e,t,a,o){var r;let l,i,n,s,c,u,m,h,d,p,f,x=Math.min(2048,Math.max(768,Math.round(1.5*a))),v=Math.min(1280,Math.max(512,Math.round(1.5*o))),g=document.createElement("canvas");g.width=x,g.height=v,r=g.getContext("2d"),r.clearRect(0,0,x,v),r.fillStyle="#000000",r.fillRect(0,0,x,v),l=a<768,i=x/Math.max(1,a)*(l?4.2:7.4)/1,n=e=>`italic 500 ${Math.round(26*e)}px "Newsreader", "New York", Georgia, ui-serif, serif`,s=e=>`500 ${Math.round(15*e)}px -apple-system, BlinkMacSystemFont, "SF Pro Display", "Geist", sans-serif`,u=(c=e=>{let t=1.4*e,a=-.35*e;r.font=n(e);let o=r.measureText("T").width;r.font=s(e);let l=["^","m","i","n","u","s"],i=l.map(e=>r.measureText(e).width),c=i.reduce((e,t)=>e+t,0)+a*(l.length-1);return{tWidth:o,chars:l,charWidths:i,gap:t,tracking:a,totalWidth:o+t+c}})(i),u=c(i=x*(l?.76:.56)*i/Math.max(1,u.totalWidth)),m=.5*v+26*i*.34,h=.5*x-.5*u.totalWidth,d=3*i,p=(e,t,a=!1)=>{r.save(),r.fillStyle=e,r.shadowColor=t>0?e:"transparent",r.shadowBlur=t,r.textAlign="left",r.textBaseline="alphabetic";let o=h;a||(r.font=n(i),r.fillText("T",o,m)),o+=u.tWidth+u.gap,r.font=s(i);for(let e=0;e<u.chars.length;e++){let t=u.chars[e],l="^"===t;if(!a||l){let e=m-d;r.fillText(t,o,e)}o+=u.charWidths[e]+u.tracking}r.restore()},f=Math.max(12,Math.round(3.8*i)),r.globalCompositeOperation="lighter",p("rgb(0, 200, 0)",f),p("rgb(255, 0, 0)",0),p("rgb(0, 0, 255)",0,!0),r.globalCompositeOperation="source-over";let b=t??e.createTexture();return e.bindTexture(e.TEXTURE_2D,b),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,g),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),b}function S(e){return e<0?0:e>1?1:e}function T(e,t,a){let o=S((a-e)/(t-e));return o*o*(3-2*o)}function M(e){return e*Math.PI/180}function N(e,t,a,o,r,l,i,n){let s=o.x+i*r*l*t.x+n*l*a.x,c=o.y+i*r*l*t.y+n*l*a.y,u=o.z+i*r*l*t.z+n*l*a.z,m=1/Math.max(1e-6,Math.hypot(s,c,u)),h=s*m,d=c*m,p=u*m,f=-(e.x*h+e.y*d+e.z*p);return f<=0?99:Math.hypot(e.x+f*h,e.y+f*d,e.z+f*p)}function P(e,t,a,o,r,l,i,n,s){let c=1,u=-.35;if(N(e,t,a,o,r,l,n,1)>=s)return 0;for(let i=0;i<12;i++){let i=.5*(u+c);N(e,t,a,o,r,l,n,i)<s?c=i:u=i}return(.5-.5*(u+c)*.5)*i}function D({onHeroReveal:e,onHorizonSync:t,runwayRef:a,skipIntro:l=!1}){let i=(0,r.useRef)(null),n=(0,r.useRef)(null),s=(0,r.useRef)(e),c=(0,r.useRef)(t),u=(0,r.useRef)(a);return(0,r.useEffect)(()=>{s.current=e,c.current=t,u.current=a},[e,t,a]),(0,r.useEffect)(()=>{let e=n.current,t=i.current;if(!e||!t)return;let a=!1;try{let e=new URLSearchParams(window.location.search);a="1"===e.get("skipIntro")}catch{}let o=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=l||a||o,m=r;r&&s.current(!0);let h=t.getContext("2d"),d=function(){let e=["*","+","^","-"],t=[],a=918273,o=()=>(a=1664525*a+0x3c6ef35f>>>0)/0x100000000;for(let a=0;a<108;a++){let a=o(),r=o(),l=o(),i=Math.min(1,Math.hypot((a-.5)*1.15,r-.78)/.95);t.push({nx:a,ny:r,glyph:e[Math.floor(o()*e.length)],phase:o()*Math.PI*2,speed:.45+.95*o(),size:8.5+4*o(),tint:l>.88?"ice":l>.42?"periwinkle":"accent",crestDist:i})}return t}(),p=e.getContext("webgl2",{alpha:!0,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1});if(!p)return void s.current(!0);let x=E(p,v),y=E(p,g),N=E(p,b),D=E(p,C),B=E(p,w),F=p.createVertexArray();p.bindVertexArray(F);let I=function(e){let t=document.createElement("canvas");t.width=72*f.length,t.height=192;let a=t.getContext("2d");a.fillStyle="#000000",a.fillRect(0,0,t.width,t.height),a.fillStyle="#ffffff",a.textAlign="center",a.textBaseline="middle",a.font=`500 ${Math.round(69.12)}px "Geist Mono", "SF Mono", ui-monospace, Menlo, monospace`;for(let e=0;e<f.length;e++)a.fillText(f[e],(e+.5)*72,49.92);a.font=`700 ${Math.round(82.56)}px "Geist Mono", "SF Mono", ui-monospace, Menlo, monospace`;for(let e=0;e<f.length;e++)a.fillText(f[e],(e+.5)*72,145.92000000000002);let o=e.createTexture();return e.bindTexture(e.TEXTURE_2D,o),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),o}(p),_=null,j=0,L=0,U=0,z=0,O=1440,W=900,G=1.75,H=160,$=80,V=!1,X=.5,Y=null,q=null,J=null,K=null,Z=null,Q=null,ee=null;"u">typeof document&&document.fonts?.ready&&document.fonts.ready.then(()=>{O>0&&W>0&&(_=R(p,_,O,W))}).catch(()=>{});let et=(e,t,a)=>{a&&(p.activeTexture(p.TEXTURE0+e),p.bindTexture(p.TEXTURE_2D,t),p.uniform1i(a,e))},ea=e=>{e?(p.bindFramebuffer(p.FRAMEBUFFER,e.fb),p.viewport(0,0,e.w,e.h)):(p.bindFramebuffer(p.FRAMEBUFFER,null),p.viewport(0,0,U,z))},eo=.5,er=.5,el=.5,ei=.5,en=0,es=0,ec=e=>{"touch"===e.pointerType||o||(eo=S(e.clientX/Math.max(1,window.innerWidth)),er=S(1-e.clientY/Math.max(1,window.innerHeight)),en=1)},eu=()=>{en=0};window.addEventListener("pointermove",ec,{passive:!0}),window.addEventListener("pointerleave",eu,{passive:!0});let em=9*!!r,eh=2*!!r,ed=0,ep=performance.now(),ef=0,ex=0,ev=.0166,eg=0,eb=null;try{let e=new URLSearchParams(window.location.search).get("introAt");if(null!==e){let t=Number(e);Number.isFinite(t)&&t>=0&&t<=14&&(eb=t,em=Math.min(9,t),eh=Math.max(0,t-9),t>=9&&(m=!0,s.current(!0)))}}catch{}let eC=a=>{var l,i,n,v,g,b,C;if(ex=window.requestAnimationFrame(eC),document.hidden){ep=a;return}let w=Math.max(.001,(a-ep)*.001),E=Math.min(.05,w);ep=a,ev=.935*ev+.065*Math.min(w,.1),!V&&ev>.02?(eg+=E)>1.5&&(V=!0):eg=Math.max(0,eg-.5*E);let F=Math.min(1,8.5*E);el+=(eo-el)*F,ei+=(er-ei)*F,es+=(en-es)*Math.min(1,5.2*E);let ec=0,eu=u.current?.current;if(eu){let e=eu.getBoundingClientRect(),t=Math.max(1,e.height-window.innerHeight);ec=S(-e.top/t)}else{let e=Math.max(420,2*window.innerHeight);ec=S(window.scrollY/e)}if(ed+=(ec-ed)*Math.min(1,12*E),4e-4>Math.abs(ec-ed)&&(ed=ec),null!==eb)em=Math.min(9,eb),eh=Math.max(0,eb-9);else if(em<9){let e=window.scrollY>24?5.8:1;em=Math.min(9,em+E*e)}else eh=Math.min(10,eh+E);let ew=r||em>=8.999;if(!m&&ew&&(m=!0,s.current(!0)),(()=>{let a=e.getBoundingClientRect(),o=Math.max(1,Math.round(a.width)),r=Math.max(1,Math.round(a.height)),l=o<768,i=Math.min(window.devicePixelRatio||1,l?1.5:1.75),n=Math.max(2,Math.round(o*i)),s=Math.max(2,Math.round(r*i));O=o,W=r,G=i,(t.width!==n||t.height!==s)&&(t.width=n,t.height=s);let c=Math.max(3,(l?4.2:5)*i),u=Math.max(48,Math.floor(n/c)),m=Math.max(28,Math.floor(s/(1.72*c))),h=V?.38:l?.45:.5;if((Math.abs(o-j)>16||Math.abs(r-L)>16||!_)&&(j=o,L=r,_=R(p,_,o,r)),n===U&&s===z&&u===H&&m===$&&h===X&&Y)return;U=n,z=s,H=u,$=m,X=h,e.width=U,e.height=z,k(p,Y),k(p,q),k(p,J),k(p,K),k(p,Z),k(p,Q),k(p,ee);let d=Math.max(64,Math.round(U*h)),f=Math.max(64,Math.round(z*h)),x=Math.max(32,Math.round(.25*U)),v=Math.max(32,Math.round(.25*z)),g=Math.max(16,Math.round(.125*U)),b=Math.max(16,Math.round(.125*z));Y=A(p,d,f,p.LINEAR),q=A(p,H,$,p.NEAREST),J=A(p,U,z,p.LINEAR),K=A(p,x,v,p.LINEAR),Z=A(p,x,v,p.LINEAR),Q=A(p,g,b,p.LINEAR),ee=A(p,g,b,p.LINEAR)})(),!Y||!q||!J||!K||!Z||!Q||!ee)return;let ey=null!==eb?eb:.001*a,eE=O<768,eA=U/Math.max(1,z),ek=Math.tan(M(23)),eR=1-T(3.68,3.92,em),eS=T(1.25,2.4,em),eT=Math.pow(S((em-2.4)/(3.85-2.4)),2.2),eM=1.32+-1.1800000000000002*eT+.028*Math.sin(14*ey)*eS*(1-eT),eN=S(.22*T(1.35,2.45,em)+.78*T(2.4,3.65,em)),eP=S(.52*T(1.15,2.45,em)+.48*T(2.4,3.58,em)),eD=T(2.25,2.85,em)*(1-T(3.76,3.98,em)),eB=T(3.38,3.82,em)*(1-T(3.86,4.12,em)),eF=T(3.8,4.04,em)*(1-T(4.84,5.4,em)),eI=S((em-3.8)/1.75),e_=T(3.8,4.02,em)*(1-T(5.35,6.55,em)),ej=S((em-3.8)/2.75),eL=T(4.02,4.2,em)*(1-T(4.86,5.2,em)),eU=T(4.65,5.38,em),ez=T(4.72,5.6,em),eO=T(3.32,3.78,em)*(1+.65*eB+.35*eF)*(1-T(6.25,7.45,em)),eW=(l=S((em-6.6)/2.4))<.5?16*l*l*l*l*l:1-Math.pow(-2*l+2,5)/2,eG=!r&&ew?T(0,.08,eh)*(1-T(.16,.58,eh)):0,eH=S(eh/.58),e$=r?1:ew?T(0,.95,eh):0,eV=eR*(1-T(.18,.72,eN)),eX=eE?.225:.255,eY=eE?2.02:1.56,eq=Math.asin(1/eY),eJ=Math.atan((-1+2*eX)*ek),eK=eE?2.12:1.58,eZ=Math.asin(1/eK),eQ=Math.atan((1-2*(eE?.155:.152))*ek),e0=Math.max(3.9,Math.min(8.2,1/Math.sin(Math.atan(Math.max(.08,(eE?Math.min(.355*O,.175*W):Math.min(.165*O,.258*W))/(.5*W)*ek))))),e1=ed,e2=T(0,.28,e1),e5=S((e1-.28)/.38),e3=T(.66,1,e1),e4=T(.14,.3,e1)*(1-T(.64,.84,e1))*eW,e8=26+62*e2+66*e3,e6=e0+(.94*e0-e0)*e5,e7=e3>0?e6+(eK-e6)*e3:eY+(e6-eY)*e2,e9=e3>0?0+(-(eQ+eZ)-0)*e3:(i=eq-eJ)+(0-i)*e2,te=e2*M(12)+e5*M(42)+e3*M(16),tt=((v=(n=7.6+-.7999999999999998*T(0,2.4,em))+(7.25-n)*T(2.4,3.8,em))+(5.85-v)*T(4.1,6.55,em))*(eE?1.24:1),ta=19+-4*T(0,6.55,em),to=(g=M(-22),g+(M(-18)-g)*T(0,6.55,em)),tr=M(ta+(e8-ta)*eW),tl=tt+(e7-tt)*eW,ti=0+(e9-0)*eW,tn=to+(0-to)*eW,ts=0+(te-0)*eW,tc=Math.sin(tr),tu=Math.cos(tr),tm=Math.sin(ts),th=Math.cos(ts),td=(e,t,a)=>({x:e*th+a*tm,y:t,z:-e*tm+a*th}),tp=td(0,tl*tc,tl*tu),tf=td(0,-tc,-tu),tx=td(0,tu,-tc),tv=td(1,0,0),tg=Math.cos(ti),tb=Math.sin(ti),tC={x:tg*tf.x+tb*tx.x,y:tg*tf.y+tb*tx.y,z:tg*tf.z+tb*tx.z},tw={x:-tb*tf.x+tg*tx.x,y:-tb*tf.y+tg*tx.y,z:-tb*tf.z+tg*tx.z},ty=Math.cos(tn),tE=Math.sin(tn),tA={x:ty*tv.x+tE*tw.x,y:ty*tv.y+tE*tw.y,z:ty*tv.z+tE*tw.z},tk={x:-tE*tv.x+ty*tw.x,y:-tE*tv.y+ty*tw.y,z:-tE*tv.z+ty*tw.z},tR=5.2+((b=Math.min(.78*tl,eE?1.56:1.38))+(5.4-b)*e4-5.2)*eW,tS=W*(1-.48*eX),tT=.5*W,tM=(C=tS+((eE?60:54)-tS)*T(0,1,e1))+(tT-C)*e4,tN=1+((eE?.7:.72)-1)*T(0,1,e1),tP=tN+((eE?1.08:1.22)-tN)*e4,tD=.5*O,tB=-(.6*W),tF=.75*W,tI=48;if(e1>.62&&eW>.5){let e=P(tp,tA,tk,tC,eA,ek,W,0,1.16),t=P(tp,tA,tk,tC,eA,ek,W,.85,1.16),a=.5*O*.85,o=Math.max(8,e-t),r=(a*a+o*o)/(2*o);tD=.5*O,tF=r,tB=e-r,tI=t}c.current?.({pinProgress:e1,settleProgress:eW,heroResolved:ew,countdownCenterY:tM,countdownScale:tP,domeCenterX:tD,domeCenterY:tB,domeRadiusPx:tF,domeEdgeY:tI,viewportW:O});let t_=!eE&&!V;window.__TMINUS_BH_TELEMETRY__={fps:Number((1/Math.max(.001,ev)).toFixed(1)),frameMs:Number((1e3*ev).toFixed(2)),bloomTiers:t_?2:1,degraded:V,cols:H,rows:$,dpr:G,introElapsed:Number(em.toFixed(3)),resolveElapsed:Number(eh.toFixed(3)),heroResolved:ew,starRadius:Number(eM.toFixed(3)),bhBirth:Number(eU.toFixed(3)),pinProgress:Number(e1.toFixed(4)),polarFactor:Number(e4.toFixed(4)),elevDeg:Number((180*tr/Math.PI).toFixed(1))},a-ef>32&&(ef=a,((e,a,r,l)=>{if(!h||O<=1||W<=1)return;let i=G;h.setTransform(1,0,0,1,0,0),h.clearRect(0,0,t.width,t.height);let n=W*(.84+-.7*a)*i,s=Math.max(O,W)*(.34+-.12000000000000002*a)*i,c=h.createRadialGradient(.5*O*i,n,0,.5*O*i,n,s);c.addColorStop(0,`rgba(78, 20, 140, ${((.11+-.055*a)*r).toFixed(3)})`),c.addColorStop(.5,`rgba(44, 7, 53, ${((.04+-.02*a)*r).toFixed(3)})`),c.addColorStop(1,"rgba(4, 2, 6, 0)"),h.fillStyle=c,h.fillRect(0,0,t.width,t.height),h.textAlign="center",h.textBaseline="middle";let u=el*O,m=(1-ei)*W;if(l>.005){let t=1+-.35*a;for(let a=0;a<d.length;a++){let o=d[a],r=T(.55*o.crestDist,.55*o.crestDist+.42,l);if(r<=.01)continue;let n=Math.round(o.nx*O*i),s=Math.round(o.ny*W*i),c=S((.14+.3*(.42+.58*Math.sin(e*o.speed+o.phase)))*t*r);h.font=`500 ${Math.round(o.size*i)}px "Geist Mono", "SF Mono", ui-monospace, Menlo, monospace`,h.fillStyle="ice"===o.tint?"#97DFFC":"periwinkle"===o.tint?"#858AE3":"#613DC1",h.globalAlpha=c,h.fillText(o.glyph,n,s)}}if(!o&&es>.01&&l>.45){let t=["^","-","t","+","=","T","*"],a=Math.max(0,Math.floor((u-105)/17)),o=Math.min(Math.ceil(O/17),Math.ceil((u+105)/17)),r=Math.max(0,Math.floor((m-105)/17)),n=Math.min(Math.ceil(W/17),Math.ceil((m+105)/17)),s=T(.45,.95,l)*es;for(let l=r;l<=n;l++){let r=17*l+8.5,n=r-m;if(!(Math.abs(n)>=105))for(let c=a;c<=o;c++){let a=17*c+8.5,o=Math.hypot(a-u,n);if(o>=105)continue;let m=Math.pow(1-o/105,1.85),d=.76+.24*Math.sin(2.4*e+.65*c+.48*l),p=Math.min(.28,m*d*s*.32);if(p<.01)continue;let f=(Math.floor(2.3*e+.37*(17*c+31*l&63)-o/105*2.2)%t.length+t.length)%t.length,x=t[f],v=Math.round((8.5+2.5*m*d)*i);h.font=`500 ${v}px "Geist Mono", "SF Mono", ui-monospace, Menlo, monospace`;let g=Math.sin(3.1*e+1.13*c+.87*l);h.fillStyle=o<36||o<62&&g>.65?"#97DFFC":o<78?"#858AE3":"#613DC1",h.globalAlpha=p,h.fillText(x,Math.round(a*i),Math.round(r*i))}}}h.globalAlpha=1})(ey,e1,eW,e$)),p.disable(p.BLEND),ea(Y),p.useProgram(x.prog),p.uniform1f(x.u.uTime,ey),p.uniform1f(x.u.uViewAsp,eA),p.uniform1f(x.u.uSceneH,Y.h),p.uniform1f(x.u.uTanHalfFov,ek),p.uniform3f(x.u.uCamPos,tp.x,tp.y,tp.z),p.uniform3f(x.u.uCamRight,tA.x,tA.y,tA.z),p.uniform3f(x.u.uCamUp,tk.x,tk.y,tk.z),p.uniform3f(x.u.uCamFwd,tC.x,tC.y,tC.z),p.uniform1f(x.u.uStarVis,eR),p.uniform1f(x.u.uStarRadius,eM),p.uniform1f(x.u.uStarShift,eN),p.uniform1f(x.u.uStarCrack,eP),p.uniform1f(x.u.uImplode,eD),p.uniform1f(x.u.uEjecta,e_),p.uniform1f(x.u.uEjectaProg,ej),p.uniform1f(x.u.uBhBirth,eU),p.uniform1f(x.u.uDiskBirth,ez),p.uniform1f(x.u.uLockPulse,eG),p.uniform1f(x.u.uLockWaveProg,eH),p.uniform1f(x.u.uSettle,eW),p.uniform1f(x.u.uPin,e3),p.uniform1f(x.u.uPolarFactor,e4),p.uniform1f(x.u.uDiskOuterR,tR),p.uniform1f(x.u.uJetPower,eO),p.uniform1f(x.u.uCharge,eB),p.uniform1f(x.u.uBlastPeak,eF),p.uniform1f(x.u.uBlastProgress,eI),p.uniform2f(x.u.uPointer,el,ei),p.uniform1f(x.u.uPointerActive,es),p.drawArrays(p.TRIANGLES,0,3),ea(q),p.useProgram(y.prog),et(0,Y.tex,y.u.uBg),p.uniform2f(y.u.uBgInv,1/Y.w,1/Y.h),p.drawArrays(p.TRIANGLES,0,3),ea(J),p.useProgram(N.prog),et(0,q.tex,N.u.uCell),et(1,Y.tex,N.u.uBg),et(2,I,N.u.uAtlas),_&&et(3,_,N.u.uWordmarkMask),p.uniform2f(N.u.uGrid,H,$),p.uniform1f(N.u.uGlyphCount,f.length),p.uniform1f(N.u.uWordmarkCarve,eL),p.uniform1f(N.u.uBlastPeak,eF),p.uniform1f(N.u.uWarmTint,eV),p.uniform1f(N.u.uSettle,eW),p.uniform1f(N.u.uTime,ey),p.uniform2f(N.u.uPointer,el,ei),p.uniform1f(N.u.uPointerActive,es),p.uniform1f(N.u.uViewAsp,eA),p.drawArrays(p.TRIANGLES,0,3),p.useProgram(D.prog),ea(K),et(0,J.tex,D.u.uTex),p.uniform2f(D.u.uDir,1.25/K.w,0),p.uniform1f(D.u.uThreshold,.16),p.drawArrays(p.TRIANGLES,0,3),ea(Z),et(0,K.tex,D.u.uTex),p.uniform2f(D.u.uDir,0,1.25/Z.h),p.uniform1f(D.u.uThreshold,0),p.drawArrays(p.TRIANGLES,0,3),t_&&(ea(Q),et(0,Z.tex,D.u.uTex),p.uniform2f(D.u.uDir,2.2/Q.w,0),p.uniform1f(D.u.uThreshold,0),p.drawArrays(p.TRIANGLES,0,3),ea(ee),et(0,Q.tex,D.u.uTex),p.uniform2f(D.u.uDir,0,2.2/ee.h),p.uniform1f(D.u.uThreshold,0),p.drawArrays(p.TRIANGLES,0,3)),ea(null),p.clearColor(0,0,0,0),p.clear(p.COLOR_BUFFER_BIT),p.useProgram(B.prog),et(0,J.tex,B.u.uBase),et(1,Z.tex,B.u.uBloom1),et(2,t_?ee.tex:Z.tex,B.u.uBloom2),_&&et(3,_,B.u.uWordmarkMask),p.uniform2f(B.u.uGrid,H,$),p.uniform1f(B.u.uUseBloom2,+!!t_),p.uniform1f(B.u.uWordmarkCarve,eL);let tj=(.46+.08000000000000002*eW+.06*eR+.08*e_+.14*eG)*(1-.7*eF)+.14*e4;p.uniform1f(B.u.uGlow,tj),p.drawArrays(p.TRIANGLES,0,3)};return ex=window.requestAnimationFrame(eC),()=>{window.cancelAnimationFrame(ex),window.removeEventListener("pointermove",ec),window.removeEventListener("pointerleave",eu),k(p,Y),k(p,q),k(p,J),k(p,K),k(p,Z),k(p,Q),k(p,ee),p.deleteTexture(I),_&&p.deleteTexture(_),p.deleteVertexArray(F),p.deleteProgram(x.prog),p.deleteProgram(y.prog),p.deleteProgram(N.prog),p.deleteProgram(D.prog),p.deleteProgram(B.prog)}},[l]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("canvas",{ref:i,"aria-hidden":"true",className:"pointer-events-none fixed inset-0 z-0 h-[100dvh] w-full"}),(0,o.jsx)("canvas",{ref:n,"aria-hidden":"true",className:"pointer-events-none fixed inset-0 z-30 h-[100dvh] w-full"})]})}let B=Date.parse("2027-01-01T00:00:00-05:00");function F(e){return String(Math.max(0,Math.floor(e))).padStart(2,"0")}function I(e={}){let[t,a]=(0,r.useState)({days:"--",hours:"--",minutes:"--",seconds:"--"});(0,r.useEffect)(()=>{let e=()=>{let e,t,o,r,l;a((o=Math.floor((t=Math.floor(Math.max(0,B-Date.now())/1e3))/86400),r=Math.floor(t%86400/3600),l=Math.floor(t%3600/60),{days:(e=Math.max(0,Math.floor(o)))>=100?String(e):String(e).padStart(2,"0"),hours:F(r),minutes:F(l),seconds:F(t%60)}))};e();let t=window.setInterval(e,1e3);return()=>window.clearInterval(t)},[]);let l=[{value:t.days,label:"D"},{value:t.hours,label:"H"},{value:t.minutes,label:"M"},{value:t.seconds,label:"S"}];return(0,o.jsxs)("div",{role:"timer","aria-live":"off","aria-label":"Countdown to T-minus App Store v1.0 launch on January 1, 2027",className:"flex flex-col items-center gap-1.5 select-none whitespace-nowrap sm:gap-2",children:[(0,o.jsx)("div",{className:"flex items-baseline gap-3.5 whitespace-nowrap font-sans text-[26px] leading-none font-semibold tracking-[-0.025em] text-white tabular-nums sm:gap-7 sm:text-[36px]",children:l.map(e=>(0,o.jsxs)("span",{className:"inline-flex items-baseline gap-1 sm:gap-1.5",children:[(0,o.jsx)("span",{children:e.value}),(0,o.jsx)("span",{className:"font-mono text-[11px] font-normal tracking-[0.06em] text-[#858AE3] sm:text-[13px]",children:e.label})]},e.label))}),(0,o.jsx)("div",{"data-countdown-label":"true",className:"whitespace-nowrap font-mono text-[9.5px] font-normal tracking-[0.12em] text-[#858AE3]/90 uppercase sm:text-[11.5px] sm:tracking-[0.18em]",children:"APP STORE V1.0 \xb7 JAN 1, 2027"})]})}let _={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};_.node;let j=c(_),L={name:"calendar",size:24,node:[["path",{d:"M8 2v3",key:"1ioesn"}],["path",{d:"M16 2v3",key:"otl347"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",key:"h1oib"}],["path",{d:"M3 9h18",key:"1pudct"}]]};L.node;let U=c(L),z={name:"share-2",size:24,node:[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]]};z.node;let O=c(z);function W({variant:e="primary",shape:t="rect",className:a="",children:r,disabled:l,...i}){return(0,o.jsx)("button",{disabled:l,className:`inline-flex cursor-pointer items-center justify-center gap-2 font-sans font-semibold tracking-[-0.01em] transition-colors duration-150 active:translate-y-px focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#040206] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${"pill"===t?"rounded-full":"rounded-[6px]"} ${"primary"===e?"bg-white text-[#040206] border border-white hover:bg-[#97DFFC] hover:border-[#97DFFC]":"bg-[#07050D] text-white border border-[#858AE3]/30 hover:border-[#97DFFC]/70 hover:text-[#97DFFC]"} ${a}`,...i,children:r})}function G({inputRef:e,onOpenLegal:t}){let[a,l]=(0,r.useState)("SHOPPER"),[i,n]=(0,r.useState)(""),[s,c]=(0,r.useState)(""),[u,m]=(0,r.useState)(!1),[h,d]=(0,r.useState)(null),[p,f]=(0,r.useState)(!1),[x,v]=(0,r.useState)(null),[g,b]=(0,r.useState)(null),[C,w]=(0,r.useState)(null);async function y(e){e.preventDefault(),v(null);let t=function(e){let t=e.trim();if(!t)return null;let a=t.startsWith("+"),o=t.replace(/\D/g,"");return a?o.length<8||o.length>15||o.startsWith("0")?null:`+${o}`:10===o.length?"0"===o[0]||"1"===o[0]?null:`+1${o}`:11===o.length&&o.startsWith("1")?"0"===o[1]||"1"===o[1]?null:`+${o}`:o.length>=11&&o.length<=15&&!o.startsWith("0")?`+${o}`:null}(i);if(!t)return void v("Enter a valid mobile number (e.g. (555) 234-5678).");if(!u)return void v("Check the SMS consent box so we can text you on Jan 1.");f(!0);try{let e=await fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:t,role:a,brandHandle:"BRAND"===a&&s.trim()||null,smsConsent:!0,source:h})}),o=await e.json().catch(()=>({}));if(!e.ok)return void v("string"==typeof o?.error?o.error:"Something went wrong. Please try again.");b(a)}catch{v("Network error. Check your connection and try again.")}finally{f(!1)}}async function E(){let e=`${window.location.origin}/landing`;try{navigator.share?(await navigator.share({title:"T^minus",text:"T^minus launches Jan 1, 2027 \xb7 independent clothing drops on a live clock.",url:e}),w("Shared")):navigator.clipboard?.writeText?(await navigator.clipboard.writeText(e),w("Link copied")):w("Copy URL above")}catch{}finally{window.setTimeout(()=>w(null),2600)}}return(0,r.useEffect)(()=>{let e=new URLSearchParams(window.location.search),t=e.get("utm_source")||e.get("ref")||e.get("src")||null;t&&d(t.slice(0,64))},[]),g?(0,o.jsxs)("div",{role:"status","aria-live":"polite",className:"mx-auto flex w-full max-w-[448px] flex-col items-center rounded-[6px] border border-[#858AE3]/24 bg-[#07050D] px-6 py-6 text-center",children:[(0,o.jsxs)("div",{className:"inline-flex items-center gap-1.5 font-mono text-[10.5px] font-normal tracking-[0.16em] text-[#97DFFC] uppercase",children:[(0,o.jsx)(j,{className:"size-3.5 stroke-[2.2]"}),(0,o.jsx)("span",{children:"BRAND"===g?"+ BRAND SPOT SAVED":"+ ALLOCATION SECURED"})]}),(0,o.jsx)("h3",{className:"font-display mt-2.5 text-[21px] font-medium tracking-[-0.025em] text-white",children:"BRAND"===g?"Brand request saved.":"You're in for Jan 1."}),(0,o.jsx)("p",{className:"mt-2 max-w-[360px] text-[13.5px] leading-[1.52] text-[#D8D0EA]/80",children:"BRAND"===g?"We'll text you before launch to set up your storefront and schedule an early drop.":"Watch your texts on January 1 when App Store v1.0 goes live."}),(0,o.jsxs)("div",{className:"mt-5 flex w-full flex-col gap-2.5 sm:flex-row",children:[(0,o.jsxs)(W,{type:"button",variant:"primary",onClick:function(){let e,t=new Blob([(e=`${window.location.origin}/landing`.replace(/[\r\n]/g,""),`BEGIN:VCALENDAR\r
VERSION:2.0\r
PRODID:-//T^minus//Launch Reminder//EN\r
CALSCALE:GREGORIAN\r
METHOD:PUBLISH\r
BEGIN:VEVENT\r
UID:t-minus-launch-2027-01-01@t-minus.app\r
DTSTAMP:20261123T000000Z\r
DTSTART:20270101T050000Z\r
DTEND:20270101T053000Z\r
SUMMARY:T^minus launches on the App Store\r
DESCRIPTION:T^minus App Store v1.0 goes live at midnight ET. Your waitlist number unlocks 2 weeks of T^minus Pro free for early access to independent clothing drops. ${e}\r
URL:${e}\r
BEGIN:VALARM\r
ACTION:DISPLAY\r
DESCRIPTION:T^minus launches on the App Store in 15 minutes.\r
TRIGGER:-PT15M\r
END:VALARM\r
END:VEVENT\r
END:VCALENDAR`)],{type:"text/calendar;charset=utf-8"}),a=URL.createObjectURL(t),o=document.createElement("a");o.href=a,o.download="t-minus-launch-jan-1-2027.ics",document.body.appendChild(o),o.click(),o.remove(),URL.revokeObjectURL(a)},className:"h-10 flex-1 px-4 text-[13px]",children:[(0,o.jsx)(U,{className:"size-3.5"}),(0,o.jsx)("span",{children:"Save Jan 1 reminder"})]}),(0,o.jsxs)(W,{type:"button",variant:"dark",onClick:E,className:"h-10 flex-1 px-4 text-[13px]",children:[(0,o.jsx)(O,{className:"size-3.5"}),(0,o.jsx)("span",{children:C??"Send to a friend"})]})]})]}):(0,o.jsxs)("form",{onSubmit:y,noValidate:!0,className:"mx-auto flex w-full max-w-[448px] flex-col items-center",children:[(0,o.jsxs)("div",{role:"radiogroup","aria-label":"Waitlist role",className:"relative mb-2.5 inline-grid grid-cols-2 rounded-[6px] border border-[#858AE3]/24 bg-[#040206] p-[3px] sm:mb-3",children:[(0,o.jsx)("span",{"aria-hidden":"true",className:`pointer-events-none absolute top-[3px] bottom-[3px] left-[3px] w-[calc(50%-3px)] rounded-[4px] bg-[#613DC1] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${"BRAND"===a?"translate-x-full":"translate-x-0"}`}),[{id:"SHOPPER",label:"I'm shopping"},{id:"BRAND",label:"I run a brand"}].map(e=>{let t=a===e.id;return(0,o.jsx)("button",{type:"button",role:"radio","aria-checked":t,onClick:()=>{l(e.id),v(null)},className:`relative z-10 cursor-pointer rounded-[4px] px-3.5 py-1 text-[12px] font-medium tracking-[-0.005em] transition-colors duration-150 ${t?"text-white":"text-[#C4BBE0]/76 hover:text-white"}`,children:e.label},e.id)})]}),(0,o.jsxs)("div",{className:"flex w-full items-center gap-1.5 rounded-[6px] border border-[#858AE3]/24 bg-[#07050D] p-1.5 transition-colors duration-150 focus-within:border-[#97DFFC]/70",children:[(0,o.jsx)("label",{htmlFor:"waitlist-phone",className:"sr-only",children:"Mobile phone number"}),(0,o.jsx)("input",{ref:e,id:"waitlist-phone",name:"tel",type:"tel",inputMode:"tel",autoComplete:"tel",required:!0,placeholder:"+1 (555) 000-0000",value:i,onChange:e=>{n(function(e){let t=e.trimStart();if(t.startsWith("+"))return"+"+t.slice(1).replace(/[^\d\s-]/g,"").slice(0,18);let a=e.replace(/\D/g,"").slice(0,11);if(0===a.length)return"";if(11===a.length&&a.startsWith("1")){let e=a.slice(1);return`+1 (${e.slice(0,3)}) ${e.slice(3,6)}-${e.slice(6)}`}return a.length<=3?`(${a}`:a.length<=6?`(${a.slice(0,3)}) ${a.slice(3)}`:`(${a.slice(0,3)}) ${a.slice(3,6)}-${a.slice(6,10)}`}(e.target.value)),x&&v(null)},className:"h-9 min-w-0 flex-1 bg-transparent px-2.5 text-[14.5px] text-white placeholder:text-[#C4BBE0]/48 focus:outline-none sm:h-10 sm:px-3"}),(0,o.jsx)(W,{type:"submit",variant:"primary",disabled:p,className:"h-9 shrink-0 px-3.5 text-[12.5px] sm:h-10 sm:px-5 sm:text-[13px]",children:p?"Saving...":"BRAND"===a?"Join as a brand":"Get early access"})]}),(0,o.jsx)("div",{className:`grid w-full transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${"BRAND"===a?"mt-2 grid-rows-[1fr] opacity-100":"pointer-events-none mt-0 grid-rows-[0fr] opacity-0"}`,children:(0,o.jsxs)("div",{className:"overflow-hidden",children:[(0,o.jsx)("label",{htmlFor:"waitlist-brand",className:"sr-only",children:"Label or shop handle"}),(0,o.jsx)("input",{id:"waitlist-brand",name:"organization",type:"text",tabIndex:"BRAND"===a?0:-1,placeholder:"Label or shop handle (optional)",value:s,onChange:e=>c(e.target.value),maxLength:120,className:"h-9 w-full rounded-[6px] border border-[#858AE3]/24 bg-[#07050D] px-3 text-[13.5px] text-white placeholder:text-[#C4BBE0]/48 transition-colors focus:border-[#97DFFC]/70 focus:outline-none sm:h-10 sm:px-3.5"})]})}),(0,o.jsxs)("label",{className:"mt-2.5 flex cursor-pointer items-center justify-center gap-2 text-center text-[11px] leading-[1.35] text-[#C4BBE0]/78 select-none sm:mt-3",children:[(0,o.jsxs)("span",{className:"relative inline-flex size-3.5 shrink-0 items-center justify-center",children:[(0,o.jsx)("input",{type:"checkbox",checked:u,onChange:e=>{m(e.target.checked),x&&v(null)},className:"peer sr-only"}),(0,o.jsx)("span",{"aria-hidden":"true",className:"flex size-3.5 items-center justify-center rounded-[3px] border border-[#858AE3]/45 bg-[#07050D] transition-colors duration-150 peer-checked:border-[#97DFFC] peer-checked:bg-[#613DC1] peer-focus-visible:ring-1 peer-focus-visible:ring-[#97DFFC]",children:u?(0,o.jsx)(j,{className:"size-2.5 stroke-[2.8] text-white"}):null})]}),(0,o.jsxs)("span",{children:["Text me launch & drop alerts (STOP to opt out \xb7"," ",(0,o.jsx)("button",{type:"button",onClick:e=>{e.preventDefault(),t("privacy")},className:"cursor-pointer text-white/90 underline decoration-[#858AE3]/45 underline-offset-2 transition hover:text-[#97DFFC]",children:"Privacy"})," ","/"," ",(0,o.jsx)("button",{type:"button",onClick:e=>{e.preventDefault(),t("terms")},className:"cursor-pointer text-white/90 underline decoration-[#858AE3]/45 underline-offset-2 transition hover:text-[#97DFFC]",children:"Terms"}),")"]})]}),x?(0,o.jsx)("p",{role:"alert",className:"mt-2 text-center text-[12px] font-medium text-[#97DFFC]",children:x}):null]})}let H=["^","-","t","+","=","T","*"];function $({text:e,active:t,instant:a=!1,origin:l="left",delayMs:i=0,durationMs:n=760,glyphClassName:s="text-[#858AE3]",className:c=""}){let u=(0,r.useMemo)(()=>Array.from(e),[e]),[m,h]=(0,r.useState)(a),[d,p]=(0,r.useState)({progress:+!!a,tick:0});if((0,r.useEffect)(()=>{if(a||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return void h(!0);if(!t){h(!1),p({progress:0,tick:0});return}let e=0,o=0,r=0,l=0,s=window.setTimeout(()=>{r=o=performance.now();let t=a=>{let i=Math.min(1,(a-o)/Math.max(120,n));(a-r>=52||i>=1)&&(r=a,p({progress:i,tick:l+=1})),i<1?e=window.requestAnimationFrame(t):h(!0)};e=window.requestAnimationFrame(t)},i);return()=>{window.clearTimeout(s),window.cancelAnimationFrame(e)}},[t,a,i,n]),m)return(0,o.jsx)("span",{className:c,children:e});if(!t)return(0,o.jsx)("span",{"aria-label":e,className:c,children:(0,o.jsx)("span",{"aria-hidden":"true",className:"opacity-0",children:e})});let f=Math.max(1,u.length),x=(f-1)*.5,v=Math.max(.5,x);return(0,o.jsx)("span",{"aria-label":e,className:c,children:u.map((e,t)=>{let a;if(" "===e)return(0,o.jsx)(r.Fragment,{children:" "},t);let i=("center"===l?Math.abs(t-x)/v:t/f)*("center"===l?.54:.62),n=Math.min(1,i+("center"===l?.42:.36)),c=(d.progress-i)/Math.max(.01,n-i);if(c<=0)return(0,o.jsx)("span",{"aria-hidden":"true",className:"relative inline-block opacity-0",children:e},t);if(c>=1)return(0,o.jsx)("span",{"aria-hidden":"true",className:"relative inline-block",children:e},t);let u=(a=(37*t+13*d.tick+7)%H.length,H[a]),m=Math.min(1,1.45*c);return(0,o.jsxs)("span",{"aria-hidden":"true",className:"relative inline-block",children:[(0,o.jsx)("span",{className:"opacity-0",children:e}),(0,o.jsx)("span",{style:{opacity:m},className:`pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-[0.74em] font-normal ${s}`,children:u})]},t)})})}let V=["^","-","t","+","=","T","*"];function X({active:e,instant:t=!1,delayMs:a=240,durationMs:l=640,className:i=""}){let n=(0,r.useRef)(null),s=(0,r.useRef)(null),c=(0,r.useRef)(null),u=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let o=n.current,r=s.current;if(!o||!r)return;let i=r.getContext("2d");if(!i)return;let m=window.matchMedia("(prefers-reduced-motion: reduce)").matches,h=t||m,d=0,p=0,f=2,x=5.6,v=7.4,g="ui-monospace, SFMono-Regular, Menlo, monospace",b=[],C=0,w=0,y=0,E=h,A=()=>{let e=o.getBoundingClientRect(),t=Math.max(1,Math.round(e.width)),a=Math.max(1,Math.round(e.height)),l=Math.min(Math.max(window.devicePixelRatio||1,1),3);d=t,p=a,r.width=Math.max(1,Math.round(d*(f=l))),r.height=Math.max(1,Math.round(p*f));let i=d<360,n=Math.max(36,Math.floor(d/(x=i?4.35:5.6))),s=Math.max(8,Math.floor(p/(v=i?5.65:7.4))),m=c.current?window.getComputedStyle(c.current).fontFamily:"sans-serif";g=u.current?window.getComputedStyle(u.current).fontFamily:"ui-monospace, SFMono-Regular, Menlo, monospace";let h=4*n,C=4*s,w=document.createElement("canvas");w.width=h,w.height=C;let y=w.getContext("2d",{willReadFrequently:!0});if(!y)return;y.clearRect(0,0,h,C),y.fillStyle="#ffffff",y.textAlign="left",y.textBaseline="alphabetic";let E=["M","I","N","U","S"],A=1.16*C,k=e=>{y.font=`800 ${e.toFixed(1)}px ${m}`;let t=E.map(e=>y.measureText(e).width),a=.085*e,o=t.reduce((e,t)=>e+t,0)+a*(E.length-1),r=y.measureText("MINUS");return{widths:t,track:a,totalW:o,ascent:r.actualBoundingBoxAscent||.72*e,descent:r.actualBoundingBoxDescent||0}},R=k(A),S=.96*h,T=.94*C,M=Math.max(1,R.ascent+R.descent);A*=Math.min(S/Math.max(1,R.totalW),T/M);let N=(h-(R=k(A)).totalW)*.5,P=(C-(R.ascent+R.descent))*.5+R.ascent;y.font=`800 ${A.toFixed(1)}px ${m}`;let D=N;for(let e=0;e<E.length;e++)y.fillText(E[e],D,P),D+=R.widths[e]+R.track;let B=y.getImageData(0,0,h,C).data,F=[],I=Math.max(1,(n-1)*.5);for(let e=0;e<s;e++)for(let t=0;t<n;t++){let a,o,r,l=0,i=0,n=4*e,s=4*t;for(let e=0;e<4;e++){let t=(n+e)*h;for(let e=0;e<4;e++){let a=B[(t+s+e)*4+3]/255;l+=a,a>i&&(i=a)}}let c=l/16;if(c<.14)continue;let u=function(e,t){let a=43758.5453123*Math.sin(127.1*e+311.7*t);return a-Math.floor(a)}(t,e);c<.24?(a=u>.48?"^":"-",o="#613DC1",r=.88):c<.44?(a=u>.46?"+":"t",o="#858AE3",r=.96):(c<.52?(a=u>.42?"=":"+",o="#97DFFC"):c<.72?(a=u>.36?"T":"=",o=u>.68?"#D2F4FF":"#97DFFC"):(a=i>.96&&u>.58?"*":u>.2?"T":"=",o=u>.32?"#D2F4FF":"#97DFFC"),r=1),F.push({col:t,row:e,glyph:a,color:o,alpha:r,centerDist:Math.min(1,Math.abs(t-I)/I),seed:Math.floor(97*u)})}b=F},k=(t,a)=>{if(i.setTransform(1,0,0,1,0,0),i.clearRect(0,0,r.width,r.height),!e&&!h||0===b.length||d<=1||p<=1)return;let o=Math.max(36,Math.floor(d/x)),l=Math.max(8,Math.floor(p/v)),n=(d-o*x)*.5,s=(p-l*v)*.5,c=Math.max(8,Math.round(1.15*v*f));i.font=`400 ${c}px ${g}`,i.textAlign="center",i.textBaseline="middle";for(let e=0;e<b.length;e++){let o=b[e],r=Math.round((n+(o.col+.5)*x)*f),l=Math.round((s+(o.row+.53)*v)*f);if(t>=1){i.fillStyle=o.color,i.globalAlpha=o.alpha,i.fillText(o.glyph,r,l);continue}let c=(t-.5*o.centerDist)/.44;if(!(c<=0))if(c>=1)i.fillStyle=o.color,i.globalAlpha=o.alpha,i.fillText(o.glyph,r,l);else{let e=(o.seed+a)%V.length;i.fillStyle=c>.65?"#97DFFC":"#858AE3",i.globalAlpha=Math.min(1,1.35*c)*o.alpha,i.fillText(V[e],r,l)}}i.globalAlpha=1};(()=>{if(window.clearTimeout(w),window.cancelAnimationFrame(C),A(),h||E){E=!0,k(1,0);return}e?(k(0,0),w=window.setTimeout(()=>{let e=y=performance.now(),t=0,a=o=>{let r=Math.min(1,(o-y)/Math.max(160,l));(o-e>=46||r>=1)&&(e=o,k(r,t+=1)),r<1?C=window.requestAnimationFrame(a):(E=!0,k(1,0))};C=window.requestAnimationFrame(a)},a)):k(0,0)})();let R=new ResizeObserver(()=>{A(),E||h?k(1,0):e||k(0,0)});R.observe(o);let S=!1;return"u">typeof document&&document.fonts?.ready&&document.fonts.ready.then(()=>{!S&&(A(),(E||h)&&k(1,0))}).catch(()=>{}),()=>{S=!0,window.clearTimeout(w),window.cancelAnimationFrame(C),R.disconnect()}},[e,t,a,l]),(0,o.jsxs)("span",{ref:n,className:`relative mx-auto block h-[60px] w-[308px] max-w-full sm:h-[98px] sm:w-[468px] ${i}`,children:[(0,o.jsx)("span",{ref:c,"aria-hidden":"true",className:"font-display pointer-events-none sr-only",children:"MINUS"}),(0,o.jsx)("span",{ref:u,"aria-hidden":"true",className:"font-mono pointer-events-none sr-only",children:"T"}),(0,o.jsx)("span",{className:"sr-only",children:"Minus"}),(0,o.jsx)("canvas",{ref:s,"aria-hidden":"true",className:"block h-full w-full"})]})}let Y=[{code:"DROP / 01",spec:"LIVE CLOCK",title:"Timed drops on a real clock.",body:"Every release opens on a shared countdown built for launch-second demand, so checkout stays steady when a piece goes live."},{code:"FIT / 02",spec:"GARMENT SPEC",title:"Sizing matched to real measurements.",body:"Fit guidance calibrated to each piece's actual flat measurements and cut, so you choose the right size before a run sells through."},{code:"LOYALTY / 03",spec:"BRAND TIERS",title:"Direct loyalty with the labels you wear.",body:"Collect pieces from independent brands to unlock tier status, early drop windows, and free shipping tied directly to that label."},{code:"TRACK / 04",spec:"NATIVE FEED",title:"Drop-to-door order tracking.",body:"Follow every order from confirmation to doorstep inside T^minus, without digging through inbox threads or carrier links."}];function q(e,t,a){let o=Math.min(1,Math.max(0,(a-e)/(t-e)));return o*o*(3-2*o)}function J({className:e="",accent:t=!1}){return(0,o.jsx)("span",{"aria-hidden":"true",className:`pointer-events-none absolute z-10 flex size-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-[#040206] font-mono text-[11px] leading-none select-none ${t?"text-[#97DFFC]/85":"text-[#858AE3]/65"} ${e}`,children:"+"})}function K({skipIntro:e=!1}){let[t,a]=(0,r.useState)(e),[l,i]=(0,r.useState)(e),[n,s]=(0,r.useState)(null),c=(0,r.useRef)(null),u=(0,r.useRef)(null),h=(0,r.useRef)(null),f=(0,r.useRef)(null),x=(0,r.useRef)(null);(0,r.useEffect)(()=>{try{let e=new URLSearchParams(window.location.search);"1"===e.get("skipIntro")&&(a(!0),i(!0))}catch{}},[]),(0,r.useEffect)(()=>{let e=document.documentElement.style.backgroundColor,t=document.body.style.backgroundColor;return document.documentElement.style.backgroundColor="#040206",document.body.style.backgroundColor="#040206",()=>{document.documentElement.style.backgroundColor=e,document.body.style.backgroundColor=t}},[]),(0,r.useEffect)(()=>{if(!n)return;let e=e=>{"Escape"===e.key&&s(null)};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[n]);let v=(0,r.useCallback)(e=>{let t=f.current;t&&(t.style.opacity=e.heroResolved?"1":"0",t.style.transform=`translate3d(-50%, ${e.countdownCenterY.toFixed(1)}px, 0) translateY(-50%) scale(${e.countdownScale.toFixed(4)})`);let a=h.current;if(a){let t=q(.015,.22,e.pinProgress);a.style.opacity=(1-t).toFixed(4),a.style.transform=`translate3d(0, ${(-(34*t)).toFixed(1)}px, 0)`,a.style.pointerEvents=e.pinProgress>.14?"none":"auto"}let o=x.current;if(o){let t=q(.62,.84,e.pinProgress);if(o.style.opacity=t.toFixed(4),t>.002&&e.domeRadiusPx>10){let t=e.viewportW<640,a=e.domeCenterX.toFixed(1),r=e.domeCenterY.toFixed(1),l=(e.domeRadiusPx+(t?58:48)).toFixed(1),i=(e.domeRadiusPx+(t?94:84)).toFixed(1),n=(e.domeRadiusPx+(t?148:134)).toFixed(1),s=Math.max(0,e.domeEdgeY+(t?68:46)).toFixed(1),c=Math.max(68,e.domeEdgeY+(t?138:122)).toFixed(1);o.style.backgroundImage=`radial-gradient(circle at ${a}px ${r}px, #040206 0px, #040206 ${l}px, rgba(4, 2, 6, 0.94) ${i}px, rgba(4, 2, 6, 0) ${n}px), linear-gradient(180deg, #040206 0px, #040206 ${s}px, rgba(4, 2, 6, 0) ${c}px)`}else o.style.backgroundImage="none"}},[]),g=(0,r.useCallback)(()=>{window.scrollTo({top:0,behavior:"smooth"}),window.setTimeout(()=>{c.current?.focus({preventScroll:!0})},650)},[]);return(0,o.jsxs)("div",{className:"landing-typography relative min-h-[100dvh] w-full overflow-x-clip bg-[#040206] text-white selection:bg-[#613DC1]/55 selection:text-white",children:[(0,o.jsx)(D,{onHeroReveal:i,onHorizonSync:v,runwayRef:u,skipIntro:t}),(0,o.jsx)("div",{ref:x,"aria-hidden":"true",style:{opacity:0},className:"pointer-events-none fixed inset-0 z-20 will-change-[opacity]"}),(0,o.jsxs)("header",{className:`pointer-events-none fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-start px-5 transition-opacity duration-800 ease-out sm:h-20 sm:px-10 ${l?"opacity-100 delay-[720ms]":"opacity-0"}`,style:t?{transitionDelay:"0ms"}:void 0,children:[(0,o.jsx)("div",{"aria-hidden":"true",className:"pointer-events-none absolute top-0 left-0 h-24 w-56 sm:h-28 sm:w-72",style:{background:"radial-gradient(ellipse 95% 88% at 0% 0%, rgba(4, 2, 6, 0.92) 0%, rgba(4, 2, 6, 0.64) 48%, rgba(4, 2, 6, 0) 100%)"}}),(0,o.jsx)("a",{href:"#top",onClick:e=>{e.preventDefault(),window.scrollTo({top:0,behavior:"smooth"})},className:"pointer-events-auto relative z-10 text-white transition-opacity hover:opacity-85 focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:outline-none",children:(0,o.jsx)(p,{className:"[--wm-scale:1.05] sm:[--wm-scale:1.42]"})})]}),(0,o.jsx)("div",{ref:f,style:{opacity:+!!t,transform:"translate3d(-50%, calc(100dvh - 108px), 0) translateY(-50%)"},className:"pointer-events-none fixed top-0 left-1/2 z-40 transition-opacity duration-300 ease-out will-change-transform",children:(0,o.jsx)(I,{})}),(0,o.jsxs)("main",{id:"top",className:"relative z-10 w-full",children:[(0,o.jsx)("div",{ref:u,className:"relative h-[250dvh] w-full sm:h-[300dvh]",children:(0,o.jsx)("section",{className:`sticky top-0 flex h-[100dvh] w-full flex-col items-center justify-center px-5 pt-14 pb-[28dvh] transition-opacity duration-500 ease-out sm:px-8 sm:pt-16 sm:pb-[28vh] ${l?"opacity-100":"pointer-events-none opacity-0"}`,children:(0,o.jsxs)("div",{ref:h,className:"flex w-full max-w-[640px] flex-col items-center text-center will-change-transform",children:[(0,o.jsxs)("h1",{className:"flex w-full flex-col items-center",children:[(0,o.jsx)("span",{style:{fontSize:"clamp(1.7rem, 3.1vw, 2.8rem)"},className:"font-display block leading-[0.98] font-medium tracking-[-0.035em] text-white",children:(0,o.jsx)($,{text:"Fashion.",active:l,instant:t,origin:"center",delayMs:160,durationMs:560,glyphClassName:"text-[#858AE3]"})}),(0,o.jsx)(X,{active:l,instant:t,delayMs:240,durationMs:640,className:"my-1.5 sm:my-2"}),(0,o.jsx)("span",{style:{fontSize:"clamp(1.7rem, 3.1vw, 2.8rem)"},className:"font-display block leading-[1.02] font-medium tracking-[-0.035em] text-[#E2DCF0]",children:(0,o.jsx)($,{text:"the Noise.",active:l,instant:t,origin:"left",delayMs:340,durationMs:580,glyphClassName:"text-[#858AE3]"})})]}),(0,o.jsxs)("p",{className:"mt-3 max-w-[330px] text-[14px] leading-[1.48] font-normal text-[#D4CCE8]/84 sm:mt-4 sm:max-w-[460px] sm:text-[16px] sm:leading-[1.55]",children:[(0,o.jsx)($,{text:"The best clothes in the world rarely have the loudest ",active:l,instant:t,delayMs:500,durationMs:700,glyphClassName:"text-[#613DC1]"}),(0,o.jsx)("span",{className:"font-medium text-[#97DFFC]",children:(0,o.jsx)($,{text:"voice",active:l,instant:t,delayMs:860,durationMs:380,glyphClassName:"text-[#97DFFC]"})}),(0,o.jsx)($,{text:".",active:l,instant:t,delayMs:960,durationMs:160,glyphClassName:"text-[#858AE3]"})]}),(0,o.jsx)("div",{className:`mt-5 w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:mt-6 ${l?"translate-y-0 opacity-100 delay-[700ms]":"translate-y-2 opacity-0"}`,style:t?{transitionDelay:"0ms"}:void 0,children:(0,o.jsx)(G,{inputRef:c,onOpenLegal:s})})]})})}),(0,o.jsxs)("div",{className:"relative mx-auto w-full max-w-[960px] px-5 pt-28 sm:px-10 sm:pt-36",children:[(0,o.jsxs)("section",{className:"relative border-t border-[#858AE3]/20 pt-10 pb-20 sm:pt-14 sm:pb-28",children:[(0,o.jsx)(J,{className:"top-0 left-0",accent:!0}),(0,o.jsx)(J,{className:"top-0 left-full"}),(0,o.jsxs)("div",{className:"grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10",children:[(0,o.jsxs)("div",{className:"md:col-span-7",children:[(0,o.jsxs)("p",{className:"font-mono text-[11px] font-normal tracking-[0.16em] text-[#858AE3] uppercase",children:[(0,o.jsx)("span",{className:"text-[#97DFFC]",children:"+"})," MANIFESTO"]}),(0,o.jsx)("h2",{style:{fontSize:"clamp(1.85rem, 3.8vw, 3.05rem)"},className:"font-display mt-5 leading-[1.06] font-medium tracking-[-0.035em] text-white",children:"Independent labels shouldn't outspend algorithms to be found."})]}),(0,o.jsxs)("div",{className:"flex flex-col justify-between md:col-span-5 md:pt-10",children:[(0,o.jsx)("p",{className:"text-[15px] leading-[1.68] font-normal text-[#DCD4EE]/82 sm:text-[15.5px]",children:"Small clothing brands put months into fabric, cut, and finish, only to disappear under paid feeds. T^minus gives independent labels a dedicated home built around scheduled releases, so buyers discover pieces for the garment itself."}),(0,o.jsx)("div",{className:"mt-7 border-t border-[#858AE3]/16 pt-3.5 font-mono text-[10.5px] tracking-[0.14em] text-[#858AE3]/75 uppercase",children:"DEDICATED DROP PLATFORM \xb7 ZERO PAID FEED RANKING"})]})]})]}),(0,o.jsxs)("section",{"data-band":"specification",className:"relative",children:[(0,o.jsxs)("div",{className:"mb-4 flex items-center justify-between font-mono text-[11px] tracking-[0.16em] text-[#858AE3] uppercase",children:[(0,o.jsxs)("span",{children:[(0,o.jsx)("span",{className:"text-[#97DFFC]",children:"+"})," SPECIFICATION"]}),(0,o.jsx)("span",{className:"text-[#858AE3]/70",children:"01 \xb7 04"})]}),(0,o.jsxs)("div",{className:"relative border-y border-[#858AE3]/20",children:[(0,o.jsx)(J,{className:"top-0 left-0"}),(0,o.jsx)(J,{className:"top-0 left-full"}),(0,o.jsx)(J,{className:"top-full left-0"}),(0,o.jsx)(J,{className:"top-full left-full"}),(0,o.jsx)(J,{className:"top-0 left-1/2 hidden md:flex"}),(0,o.jsx)(J,{className:"top-full left-1/2 hidden md:flex"}),(0,o.jsx)(J,{className:"top-1/2 left-0 hidden md:flex"}),(0,o.jsx)(J,{className:"top-1/2 left-full hidden md:flex"}),(0,o.jsx)(J,{className:"top-1/2 left-1/2 hidden md:flex",accent:!0}),(0,o.jsx)("div",{className:"grid grid-cols-1 divide-y divide-[#858AE3]/18 md:grid-cols-2 md:divide-y-0",children:Y.map((e,t)=>(0,o.jsxs)("article",{className:`relative flex flex-col justify-between py-8 sm:py-10 ${t%2==1?"md:border-l md:border-[#858AE3]/20 md:pl-10":"md:pr-10"} ${t>=2?"md:border-t md:border-[#858AE3]/20":""}`,children:[t>0?(0,o.jsx)(J,{className:"top-0 left-0 md:hidden"}):null,(0,o.jsxs)("div",{className:"flex items-center justify-between font-mono text-[10.5px] tracking-[0.16em] uppercase",children:[(0,o.jsx)("span",{className:"text-[#97DFFC]",children:e.code}),(0,o.jsx)("span",{className:"text-[#858AE3]/65",children:e.spec})]}),(0,o.jsxs)("div",{className:"mt-6 sm:mt-7",children:[(0,o.jsx)("h3",{className:"font-display text-[21px] leading-[1.18] font-medium tracking-[-0.025em] text-white sm:text-[24px]",children:e.title}),(0,o.jsx)("p",{className:"mt-3 max-w-[38ch] text-[14.5px] leading-[1.64] text-[#D0C8E4]/80 sm:text-[15px]",children:e.body})]})]},e.code))})]})]}),(0,o.jsxs)("section",{"data-band":"closing",className:"relative border-b border-[#858AE3]/20 pt-14 pb-11 sm:pt-20 sm:pb-14",children:[(0,o.jsx)(J,{className:"top-full left-0"}),(0,o.jsx)(J,{className:"top-full left-full"}),(0,o.jsxs)("div",{className:"flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-end",children:[(0,o.jsxs)("div",{children:[(0,o.jsx)("p",{className:"font-mono text-[10.5px] tracking-[0.18em] text-[#858AE3] uppercase sm:text-[11px]",children:"APP STORE V1.0 \xb7 JANUARY 1, 2027"}),(0,o.jsxs)("h2",{style:{fontSize:"clamp(1.85rem, 3.8vw, 2.85rem)"},className:"font-display mt-3 leading-[1.06] font-medium tracking-[-0.035em] text-white",children:["Be there at ",(0,o.jsx)("span",{className:"text-[#97DFFC]",children:"T-zero."})]})]}),(0,o.jsxs)(W,{type:"button",variant:"primary",onClick:g,className:"h-11 w-full shrink-0 px-6 text-[13.5px] sm:w-auto",children:[(0,o.jsx)("span",{children:"Join the waitlist"}),(0,o.jsx)(m,{className:"size-3.5"})]})]})]}),(0,o.jsxs)("footer",{className:"flex items-center justify-between py-8 font-mono text-[11px] tracking-[0.1em] text-[#858AE3]/80",children:[(0,o.jsxs)("div",{className:"flex items-center gap-2.5",children:[(0,o.jsx)("button",{type:"button",onClick:()=>s("privacy"),className:"cursor-pointer transition hover:text-white",children:"Privacy"}),(0,o.jsx)("span",{className:"text-[#858AE3]/45",children:"\xb7"}),(0,o.jsx)("button",{type:"button",onClick:()=>s("terms"),className:"cursor-pointer transition hover:text-white",children:"Terms"})]}),(0,o.jsx)("span",{children:"\xa9 2026 T^minus"})]})]})]}),n?(0,o.jsx)("div",{role:"dialog","aria-modal":"true","aria-labelledby":"legal-modal-title",className:"fixed inset-0 z-50 flex items-center justify-center bg-[#040206]/90 px-5",onClick:()=>s(null),children:(0,o.jsxs)("div",{className:"relative w-full max-w-[480px] rounded-[6px] border border-[#858AE3]/24 bg-[#07050D] p-6 text-left sm:p-7",onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)("div",{className:"flex items-start justify-between gap-4",children:[(0,o.jsxs)("div",{children:[(0,o.jsxs)("p",{className:"font-mono text-[10px] tracking-[0.16em] text-[#858AE3] uppercase",children:[(0,o.jsx)("span",{className:"text-[#97DFFC]",children:"+"})," LEGAL \xb7"," ","privacy"===n?"PRIVACY":"TERMS"]}),(0,o.jsx)("h2",{id:"legal-modal-title",className:"font-display mt-2 text-[20px] font-medium tracking-[-0.025em] text-white",children:"privacy"===n?"Privacy Policy":"SMS & Waitlist Terms"})]}),(0,o.jsx)("button",{type:"button",onClick:()=>s(null),"aria-label":"Close",className:"inline-flex size-8 cursor-pointer items-center justify-center rounded-[4px] border border-[#858AE3]/24 bg-[#040206] text-[#D0C7E6] transition hover:border-[#97DFFC]/70 hover:text-white",children:(0,o.jsx)(d,{className:"size-4"})})]}),(0,o.jsx)("div",{className:"mt-4 space-y-3 border-t border-[#858AE3]/16 pt-4 text-[13.5px] leading-[1.64] text-[#D4CCE8]/84",children:"privacy"===n?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("p",{children:"T^minus collects your mobile phone number, your selected waitlist role (shopper or brand), and an optional brand handle solely to notify you about the January 1, 2027 App Store v1.0 launch, early drop access, and brand onboarding."}),(0,o.jsx)("p",{children:"We never sell, rent, or broker your phone number to third parties. You can opt out at any time by replying STOP to any message."})]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("p",{children:"By checking the SMS consent box and joining the T^minus waitlist, you agree to receive occasional launch-day and live drop text alerts at the mobile number provided. Consent is not a condition of purchase."}),(0,o.jsx)("p",{children:"Message and data rates may apply. Reply STOP to opt out at any time or HELP for support."})]})})]})}):null]})}},7894:(e,t,a)=>{Promise.resolve().then(a.bind(a,4783))}}]);