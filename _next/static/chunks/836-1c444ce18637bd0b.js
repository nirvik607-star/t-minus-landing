(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[836],{836:(e,t,a)=>{Promise.resolve().then(a.bind(a,1757))},1757:(e,t,a)=>{"use strict";a.d(t,{LandingExperience:()=>ec});var r=a(5155),o=a(2115);let n=(...e)=>{let t=new Set;for(let a of e)if("string"==typeof a)for(let e of a.split(/\s+/))e&&t.add(e);return[...t].join(" ")},i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},l=(0,o.createContext)({}),s=(0,o.forwardRef)(({color:e,size:t,width:a,height:r,strokeWidth:s,absoluteStrokeWidth:c,nonScalingStroke:m,className:u="",children:h,iconNode:d=[],icon:p={node:d,aliases:[],size:24},...f},x)=>{let{size:v=24,strokeWidth:g=2,absoluteStrokeWidth:b=!1,nonScalingStroke:C=!1,color:E="currentColor",className:w=""}=(0,o.useContext)(l)??{},y=!!h||(e=>{if(null==e||"object"!=typeof e)return!1;for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t)&&(t.startsWith("aria-")||"role"===t||"title"===t)&&null!=e[t])return!0;return!1})(f),[M,A,R=[]]=function(e,t={}){return function(e,t={}){let a=t.attributeNames??{},r=e=>a[e]??e,o=e.size??e.width??i.width,l=e.size??e.height??i.height,s=e.aliases?.filter(e=>"string"==typeof e&&""!==e.trim()).map(e=>`lucide-${e}`)??[],c=[...e.name?[`lucide-${e.name}`]:[],...s],m=t.className?.split(" ").filter(Boolean)??[],u=!1===t.includeDefaultClasses?n(...m):n("lucide",...c,...m),h=t.strokeWidth??i["stroke-width"];if(t.absoluteStrokeWidth){let a=Number(h)*Number(e.size??e.width??i.width)/Number(t.size??t.width??i.width);Number.isFinite(a)&&(h=a)}return["svg",{...Object.entries(i).reduce((e,[t,a])=>(e[r(t)]=a,e),{}),..."color"in t&&t.color&&{[r("stroke")]:t.color},..."size"in t&&null!=t.size&&{[r("width")]:t.size,[r("height")]:t.size},..."width"in t&&null!=t.width&&{[r("width")]:t.width},..."height"in t&&null!=t.height&&{[r("height")]:t.height},[r("stroke-width")]:h,...u&&{[r("class")]:u},[r("viewBox")]:`0 0 ${o} ${l}`,...!1===t.hasA11yProp?{[r("aria-hidden")]:"true"}:{},..."attributes"in t&&t.attributes},e.node.map(e=>{let[a,o,n]=e,i=t.nonScalingStroke?{[r("vector-effect")]:"non-scaling-stroke",...o}:o;return n?[a,i,n]:[a,i]})]}(e,{...t,attributeNames:{...t.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}(p,{color:e??E,width:a??t??v,height:r??t??v,strokeWidth:s??g,absoluteStrokeWidth:c??b,nonScalingStroke:m??C,className:n(w,u),hasA11yProp:y,attributes:f});return(0,o.createElement)(M,{ref:x,...A},[...R.map(([e,t])=>(0,o.createElement)(e,t)),...Array.isArray(h)?h:[h]])});function c(e,t=[],a=[]){let r,n="string"==typeof e?function(e,t,a=[]){if(null==t)throw Error("[lucide]: iconNode is required when icon name is used");return{name:(e.match(/\d+[xX]\d+|[A-Z]?[a-z]+|[A-Z]|\d+/g)??[]).join("-").toLowerCase(),size:24,node:t,...a.length>0?{aliases:a}:{}}}(e,t,a):e,i=(0,o.forwardRef)(({className:e,...t},a)=>(0,o.createElement)(s,{ref:a,icon:n,className:e,...t}));return n.name&&(i.displayName=(r=(e=>{let t="",a=!1;for(let r of e){if("-"===r||"_"===r||r<=" "){a=t.length>0;continue}0===t.length?t+=r.toLowerCase():t+=a?r.toUpperCase():r,a=!1}return t})(n.name)).charAt(0).toUpperCase()+r.slice(1)),i}let m={name:"arrow-up",size:24,node:[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]};m.node;let u=c(m),h={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};h.node;let d=c(h);function p({scale:e,className:t=""}){let a={gap:"calc(1px * var(--wm-scale, 1))",...void 0!==e?{"--wm-scale":String(e)}:{}};return(0,r.jsxs)("span",{"aria-label":"T-minus",className:`inline-flex items-baseline leading-none select-none ${t}`,style:a,children:[(0,r.jsx)("span",{"aria-hidden":"true",className:"font-serif font-medium italic",style:{fontSize:"calc(26px * var(--wm-scale, 1))",lineHeight:1},children:"T"}),(0,r.jsx)("span",{"aria-hidden":"true",className:"font-sans font-medium",style:{fontSize:"calc(15px * var(--wm-scale, 1))",lineHeight:1,letterSpacing:"calc(-0.5px * var(--wm-scale, 1))",transform:"translateY(calc(-3px * var(--wm-scale, 1)))",display:"inline-block"},children:"^minus"})]})}let f=" ^-t+=T*",x=`#version 300 es
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

// Innovation A: T-Zero 1-second UTC photon heartbeat pulse
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

// 1B Natural Warm-White Dying Star Palette
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
    // Deeper dark convective channels so discrete ASCII characters visibly boil on the 3D sphere
    surfCol *= (1.0 - darkLanes * 0.58 * (1.0 - uStarShift * 0.35));

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

  float blastDuck = 1.0 - uBlastPeak * 0.55;
  float fade = uEjecta * mix(1.08, 0.52, smoothstep(0.32, 0.92, p)) * blastDuck;
  return vec4(col * energy * fade, clamp(energy * fade * 0.92, 0.0, 1.0));
}

/**
 * Sculpted 3D Accretion Disk tuned specifically for pure-ASCII legibility:
 * - Deep obsidian dark lanes carved between spiral arms so discrete ASCII ribbons pop in 3D space
 * - Innovation A: UTC 1-second '#97DFFC' photon wave rippling cleanly across the inner 2-3 rings
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
  float outerEnv = 1.0 - smoothstep(outerR * 0.62, outerR, r);
  float rNorm = clamp((r - 1.05) / max(0.6, outerR - 1.05), 0.0, 1.0);

  float birthTwist = (1.0 - uDiskBirth) * 5.2;
  float spiralTwist = mix(3.4 + birthTwist, 14.8, polarF);
  float infall = time * mix(0.22, 0.62, polarF);

  // ---- Stratum 1: Crisp Hot Inner ISCO Streamlines ----
  float s1Phase = 3.0 * theta + (spiralTwist * 1.15) * logR + infall * 1.45 - time * 1.15;
  float s1Ring = smoothstep(0.42, 0.84, 0.5 + 0.5 * cos(s1Phase));
  float s1Conc = smoothstep(0.44, 0.84, 0.5 + 0.5 * cos(logR * 25.0 + infall * 2.2));
  float s1Track = mix(mix(s1Conc, s1Ring, 0.58), s1Ring, polarF);
  float s1Dash = smoothstep(0.22, 0.72, 0.5 + 0.5 * cos(4.0 * theta - 5.2 * logR - time * 1.9));
  float s1Env = smoothstep(1.025, 1.09, r) * (1.0 - smoothstep(1.68, 2.45, r));
  float s1Val = s1Track * (0.42 + 0.58 * s1Dash) * s1Env;

  // ---- Stratum 2: High-Contrast Mid-Disk Spiral Arms with Deep Obsidian Channels ----
  float s2ArmA = smoothstep(0.48, 0.86, 0.5 + 0.5 * cos(4.0 * theta + spiralTwist * logR + infall * 1.15 - time * 0.72));
  float s2ArmB = smoothstep(0.54, 0.88, 0.5 + 0.5 * cos(2.0 * theta + (spiralTwist * 0.72) * logR + infall * 0.85 - time * 0.48 + 1.4));
  float s2Conc = smoothstep(0.48, 0.84, 0.5 + 0.5 * cos(logR * 17.5 + infall * 1.4));
  float s2Lane = mix(max(s2Conc * 0.88, s2ArmA * 0.86), max(s2ArmA, s2ArmB * 0.88), polarF);
  float s2DashA = smoothstep(0.26, 0.68, 0.5 + 0.5 * cos(3.0 * theta - 4.4 * logR - time * 1.18 + 0.6));
  float s2DashB = smoothstep(0.32, 0.74, 0.5 + 0.5 * cos(5.0 * theta + 3.1 * logR - time * 0.94));
  float s2Env = smoothstep(1.06, 1.24, r) * (1.0 - smoothstep(outerR * 0.52, outerR * 0.94, r));
  float s2Val = s2Lane * max(s2DashA, s2DashB * 0.86) * s2Env;

  // ---- Stratum 3: Sweeping Outer Violet Arcs ----
  float s3Arm = smoothstep(0.54, 0.88, 0.5 + 0.5 * cos(2.0 * theta + (spiralTwist * 0.58) * logR + infall * 0.65 - time * 0.34 + 2.5));
  float s3Conc = smoothstep(0.54, 0.86, 0.5 + 0.5 * cos(logR * 11.0 + infall * 0.9));
  float s3Lane = mix(max(s3Conc * 0.80, s3Arm * 0.76), s3Arm, polarF);
  float s3Dash = smoothstep(0.38, 0.78, 0.5 + 0.5 * cos(2.0 * theta - 2.6 * logR - time * 0.52));
  float s3Env = smoothstep(1.55, 2.25, r) * outerEnv;
  float s3Val = s3Lane * (0.24 + 0.76 * s3Dash) * s3Env;

  // Lowered baseBed so dark obsidian space cleanly separates ASCII spiral ribbons
  float baseBed = exp(-(r - 1.05) * mix(2.1, 1.35, polarF)) * innerEnv * outerEnv * 0.16;

  float sparkWave = smoothstep(0.84, 0.97, 0.5 + 0.5 * cos(5.0 * theta + (spiralTwist * 1.1) * logR - time * 2.1));
  float iceSpark = sparkWave * s1Env * (0.42 + 0.34 * polarF);

  // Innovation A: UTC 1-Second Photon Heartbeat Wave across inner 2-3 accretion rings
  float tickWave = 0.0;
  if (uTickPulse > 0.002 && uSettle > 0.5) {
    float rTick = mix(1.05, mix(1.42, 2.35, polarF), uTickProg);
    float ringSigma = mix(0.055, 0.11, polarF);
    float ringBand = exp(-pow((r - rTick) / ringSigma, 2.0));
    float strength = mix(0.11, 0.24, polarF);
    tickWave = ringBand * uTickPulse * strength * uSettle * innerEnv * outerEnv;
  }

  float doppler = 1.0 + dopplerBias * (1.0 - polarF) * 0.28 * cos(theta - 0.55);

  float energy = (baseBed + s1Val * 1.05 + s2Val * 0.84 + s3Val * 0.52) * doppler * uDiskBirth;
  energy = energy * (1.0 + uCharge * 0.65) + tickWave * 1.35;

  vec3 col = mix(C_SPACE, C_DEEP_PURPLE, smoothstep(0.05, 0.26, energy));
  col = mix(col, C_ACCENT, smoothstep(0.22, 0.50, energy));
  col = mix(col, C_PERIWINKLE, smoothstep(0.44, 0.78, energy));
  col = mix(col, C_WHITE_CORE, smoothstep(0.76, 1.14, energy));

  col = mix(col, mix(C_DEEP_PURPLE, C_ACCENT, 0.55), rNorm * 0.34 * (1.0 - s1Val));
  col = mix(col, mix(C_ICE_BLUE, C_WHITE_CORE, 0.32), clamp(iceSpark * 0.82 + tickWave * 2.6, 0.0, 0.92));

  float alpha = clamp(energy * 1.22, 0.0, 1.0) * innerEnv * outerEnv;
  return vec4(col * clamp(energy * 1.28, 0.0, 1.50), alpha);
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

  float horizonClose = (1.0 - uPolarFactor) * uSettle;
  float horizonBound = mix(1.0, 1.0 - smoothstep(1.22, 1.48, b), horizonClose);
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
        float archBoost = 1.0 + 0.38 * exp(-max(b - effectiveRh, 0.0) * 3.6);
        float vis = (1.0 - coreShadow) * lensedWeight * horizonBound;
        accumCol += rearDisk.rgb * archBoost * vis;
        accumAlpha = max(accumAlpha, rearDisk.a * vis);
      }
    }
  }

  // Relativistic photon ring + horizon corona + Lock-In Pulse + UTC 1s Horizon Heartbeat
  if (uBhBirth > 0.002 && tc > 0.0) {
    float distOut = b - effectiveRh;
    float ringAng = atan(closestPt.y, closestPt.x);
    float ringShimmer = 0.70 + 0.30 * sin(ringAng * 3.0 - uTime * 1.45) * cos(ringAng * 2.0 + uTime * 0.85);
    float ringStream = 0.5 + 0.5 * cos(ringAng * 6.0 - distOut * 34.0 - uTime * 1.9);

    float photonWidth = mix(mix(28.0, 32.0, uPin), 26.0, uPolarFactor);
    float photonRing = exp(-pow((distOut - 0.015) * photonWidth, 2.0)) * (1.0 - coreShadow);

    float horizonArc = exp(-max(distOut, 0.0) * mix(9.6, 11.4, uPin))
      * smoothstep(-0.005, 0.018, distOut) * (1.0 - coreShadow) * horizonClose;
    float arcStripes = 0.52 + 0.48 * smoothstep(0.32, 0.82, ringStream);

    float innerHalo = exp(-max(distOut, 0.0) * mix(mix(8.4, 10.0, uPin), 6.8, uPolarFactor))
      * smoothstep(-0.01, 0.02, distOut) * (1.0 - coreShadow);

    float lockR = mix(0.015, 0.24, uLockWaveProg);
    float lockWave = exp(-pow((distOut - lockR) * 26.0, 2.0)) * (1.0 - coreShadow) * uLockPulse * horizonClose;

    // Innovation A: subtle 1-cell '#97DFFC' rim ripple on UTC second tick in horizon view
    float tickRimR = mix(0.015, 0.20, uTickProg);
    float tickRimWave = exp(-pow((distOut - tickRimR) * 32.0, 2.0))
      * (1.0 - coreShadow) * uTickPulse * mix(0.11, 0.22, uPolarFactor) * uSettle;

    float ptrLift = 1.0 + ptrRipple * 0.48;
    float birthGlow = uBhBirth * (1.0 + (1.0 - uBhBirth) * 0.75);
    vec3 photonCol = mix(C_PERIWINKLE, C_WHITE_CORE, 0.66 + 0.24 * ringShimmer);
    photonCol = mix(photonCol, C_ICE_BLUE, clamp(ptrRipple * 0.55 + (1.0 - uBhBirth) * 0.65 + uLockPulse * 0.55 + tickRimWave * 2.5 + 0.18 * ringShimmer, 0.0, 0.88));
    vec3 arcCol = mix(C_ACCENT, C_PERIWINKLE, smoothstep(0.25, 0.85, arcStripes * ringShimmer));
    arcCol = mix(arcCol, C_WHITE_CORE, smoothstep(0.06, 0.01, distOut) * 0.68);
    vec3 haloCol = mix(C_DEEP_PURPLE, C_ACCENT, 0.55 + 0.28 * ringShimmer);

    float photonBoost = mix(1.04, 1.26, horizonClose);
    accumCol += photonCol * photonRing * (0.94 + 0.30 * ringShimmer) * photonBoost * ptrLift * birthGlow;
    accumCol += arcCol * horizonArc * arcStripes * 0.88 * ptrLift * uBhBirth;
    accumCol += haloCol * innerHalo * (0.28 + 0.14 * ringShimmer) * ptrLift * uBhBirth;
    accumCol += mix(C_ICE_BLUE, C_WHITE_CORE, 0.45) * (lockWave * 0.72 + tickRimWave * 1.65);
    accumAlpha = max(accumAlpha, clamp((photonRing * 0.98 + horizonArc * 0.82 + innerHalo * 0.45) * uBhBirth + lockWave * 0.65 + tickRimWave, 0.0, 1.0));
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

  // Supernova Core Detonation Flash
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

  float introSkyOpaque = 1.0 - smoothstep(0.14, 0.56, uSettle);
  accumCol = max(accumCol, C_OBSIDIAN * introSkyOpaque * (1.0 - pureCoreLock));

  float plasmaLum = dot(accumCol, vec3(0.2126, 0.7152, 0.0722));
  float settledPlasmaAlpha = smoothstep(0.02, 0.26, plasmaLum) * smoothstep(0.01, 0.20, accumAlpha);
  float finalAlpha = clamp(max(max(pureCoreLock, settledPlasmaAlpha), introSkyOpaque), 0.0, 1.0);

  o = vec4(clamp(accumCol, 0.0, 1.0), finalAlpha);
}`,g=`#version 300 es
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
}`,b=`#version 300 es
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

  // Exact integer cell coordinate & intra-cell native pixel offset
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
  float energy = clamp(pow(clamp(cellLum * 1.18, 0.0, 1.0), 0.92), 0.0, 0.9999);

  vec2 ptrD = cellUv - uPointer;
  ptrD.x *= uViewAsp;
  float ptrBoost = exp(-pow(length(ptrD) * 4.5, 2.0)) * uPointerActive * uSettle * smoothstep(0.05, 0.22, energy);
  float shapedEnergy = clamp(energy + ptrBoost * 0.18, 0.0, 0.9999);

  int idx = int(floor(shapedEnergy * uGlyphCount));
  int atlasRow = 0;

  // During Act III supernova blast, energize into bright incandescent 'T' and '*' glyphs
  if (uBlastPeak > 0.05 && shapedEnergy > 0.25) {
    float hBlast = cellHash(cellCoord);
    int blastIdx = shapedEnergy > 0.68 ? (hBlast > 0.42 ? 7 : 6) : (shapedEnergy > 0.45 ? 6 : 5);
    idx = max(idx, int(mix(float(idx), float(blastIdx), smoothstep(0.12, 0.65, uBlastPeak))));
  }

  // ---- Cell-Quantized Pure-ASCII T^minus Wordmark (Skipped when uWordmarkCarve == 0) ----
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

      if (wmCov >= 0.48) {
        if (wave < 0.74) {
          idx = 6; // 'T'
        } else if (wave < 0.89) {
          idx = 7; // '*'
        } else {
          idx = 5; // '='
        }
      } else {
        float edgeNorm = clamp((wmCov - 0.20) / 0.28, 0.0, 0.999);
        if (edgeNorm < 0.28) {
          idx = 1; // '^'
        } else if (edgeNorm < 0.54) {
          idx = 2; // '-'
        } else if (edgeNorm < 0.78) {
          idx = 4; // '+'
        } else {
          idx = 3; // 't'
        }
      }
    }
  }

  // Exact 1:1 native-pixel texelFetch (NO mipmaps, NO bilinear blur!)
  ivec2 atlasPx = ivec2(
    idx * uCellPx.x + subPx.x,
    atlasRow * uCellPx.y + (uCellPx.y - 1 - subPx.y)
  );
  float cov = inGrid ? texelFetch(uAtlas, atlasPx, 0).r : 0.0;
  // Crisp native contrast curve (keeps anti-aliased glyph edges razor-clean)
  cov = smoothstep(0.08, 0.78, cov);

  float alpha = bgTex.a;
  float introOpaque = 1.0 - smoothstep(0.14, 0.56, uSettle);

  float isPureCore = smoothstep(0.90, 0.99, alpha)
    * (1.0 - smoothstep(0.002, 0.012, bgLum))
    * (1.0 - smoothstep(0.10, 0.45, uBlastPeak));

  // ---- INVERTED HIERARCHY: 0% raster crutch across disk, <= 6% photon whisper only ----
  float photonWhisper = smoothstep(0.70, 0.98, bgLum) * 0.06 * (1.0 - isPureCore);
  vec2 blastCenterDist = (vUv - vec2(0.5)) * vec2(uViewAsp * 0.72, 1.0);
  float blastCoreBack = exp(-pow(length(blastCenterDist) * 2.25, 2.0)) * uBlastPeak * 0.24;
  vec3 baseBack = bgTex.rgb * (photonWhisper + blastCoreBack) + C_OBSIDIAN * introOpaque * (1.0 - isPureCore);

  // Per-glyph Galaxy chromatic energy palette (' ^-t+=T*')
  vec3 palGlyph;
  if (idx <= 2) {
    palGlyph = mix(C_DEEP_PURPLE, C_ACCENT, idx == 2 ? 0.65 : 0.15);
  } else if (idx <= 4) {
    palGlyph = mix(C_ACCENT, C_PERIWINKLE, idx == 4 ? 0.78 : 0.28);
  } else if (idx <= 6) {
    palGlyph = mix(C_PERIWINKLE, C_WHITE_CORE, idx == 6 ? 0.68 : 0.28);
  } else {
    palGlyph = mix(C_ICE_BLUE, C_WHITE_CORE, smoothstep(0.76, 0.98, shapedEnergy));
  }

  // Blend in actual 3D scene hue (preserves 1B warm star in Act I + '#97DFFC' ice sparks & UTC pulse)
  vec3 sceneTint = cell.rgb / max(cellLum, 0.08);
  vec3 warmColor = mix(C_WARM_CORONA, cell.rgb * 1.32, smoothstep(0.12, 0.55, shapedEnergy));
  vec3 coolColor = mix(palGlyph, clamp(palGlyph * 0.55 + cell.rgb * 0.92, 0.0, 1.0), 0.52);
  // Lift ice-blue sparks & pointer wake cleanly onto '#97DFFC'
  float iceCue = clamp((sceneTint.b - sceneTint.r) * 0.65, 0.0, 1.0);
  coolColor = mix(coolColor, C_ICE_BLUE, clamp(iceCue * 0.52 + ptrBoost * 0.75, 0.0, 0.85));
  if (idx == 7) {
    coolColor = mix(C_ICE_BLUE, C_WHITE_CORE, smoothstep(0.84, 0.98, shapedEnergy));
  }
  vec3 glyphColor = mix(coolColor, warmColor, uWarmTint);

  // Act III supernova blast glyphs shine in incandescent ice-blue & crisp white
  vec3 blastGlyphCol = mix(C_ICE_BLUE, vec3(0.98, 0.995, 1.0), smoothstep(0.55, 0.92, cellLum));
  glyphColor = mix(glyphColor, blastGlyphCol, uBlastPeak * 0.82);

  float glyphGate = smoothstep(0.03, 0.11, shapedEnergy) * (1.0 - isPureCore);
  float glyphAlpha = cov * glyphGate;
  vec3 sceneCol = mix(baseBack, glyphColor, glyphAlpha);

  // Enforce true pure #000000 inside the uncovered event horizon shadow
  sceneCol *= (1.0 - isPureCore);

  // ---- Pure-ASCII T^minus Supernova Reveal (Zero flat gray fill, 100% crisp dark glyphs) ----
  if (uWordmarkCarve > 0.001) {
    // Subtle bright ice-white luminous backdrop immediately behind carved dark letters so they pop
    vec3 blastBack = mix(C_ICE_BLUE, vec3(1.0), 0.62);
    float wmBackLight = clamp((wmCov * 0.72 + wmHalo * 0.32) * uBlastPeak, 0.0, 0.88);
    sceneCol = mix(sceneCol, blastBack, wmBackLight * (1.0 - (isWordmarkCell ? cov : 0.0)));

    if (isWordmarkCell) {
      vec3 edgeInk = mix(C_DEEP_VOID, C_OBSIDIAN, 0.68);
      vec3 coreInk = vec3(0.0, 0.0, 0.0);
      vec3 glyphInk = mix(edgeInk, coreInk, smoothstep(0.36, 0.58, wmCov));
      glyphInk = mix(glyphInk, C_DEEP_VOID * 1.15, wmCaret * 0.20 * (1.0 - smoothstep(0.48, 0.70, wmCov)));

      float strokeStrength = smoothstep(0.20, 0.46, wmCov);
      float wmInkAlpha = clamp(cov * mix(0.88, 1.0, strokeStrength), 0.0, 1.0);
      sceneCol = mix(sceneCol, glyphInk, wmInkAlpha);
      glyphAlpha = max(glyphAlpha, wmInkAlpha);
    }
  }

  // Output alpha: pure #000000 core = 1.0; intro sky = 1.0; settled space = crisp glyphs + photon whisper ONLY
  float settledAlpha = clamp(max(glyphAlpha, photonWhisper * 5.0), 0.0, 1.0);
  float outAlpha = clamp(max(max(isPureCore, introOpaque), settledAlpha), 0.0, 1.0);
  if (uWordmarkCarve > 0.001 && wmCov > 0.15) {
    outAlpha = max(outAlpha, clamp(wmCov * uBlastPeak, 0.0, 1.0));
  }

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
    float keep = smoothstep(uThreshold, uThreshold + 0.22, l);
    return c * keep;
  }
  return c;
}

void main() {
  vec3 c = sampleTap(vUv) * 0.227027;
  c += (sampleTap(vUv + uDir * 1.384615) + sampleTap(vUv - uDir * 1.384615)) * 0.316216;
  c += (sampleTap(vUv + uDir * 3.230769) + sampleTap(vUv - uDir * 3.230769)) * 0.070270;
  o = vec4(c, 1.0);
}`,E=`#version 300 es
precision highp float;
in vec2 vUv;
out vec4 o;
uniform sampler2D uBase;
uniform sampler2D uBloom1;
uniform sampler2D uWordmarkMask;
uniform vec2  uGrid;
uniform float uWordmarkCarve;
uniform float uGlow;

void main() {
  ivec2 px = ivec2(gl_FragCoord.xy);
  vec4 base = texelFetch(uBase, px, 0);
  vec3 halo = texture(uBloom1, vUv).rgb * uGlow;

  // Detect pure #000000 event horizon core (alpha ~1.0, rgb ~0.0) so zero halo bleeds inside
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
    bloomAtten *= (1.0 - smoothstep(0.16, 0.30, wmCell) * 0.96);
  }

  vec3 underHalo = halo * bloomAtten;
  float haloLum = dot(underHalo, vec3(0.2126, 0.7152, 0.0722));
  float haloAlpha = clamp(haloLum * 0.85, 0.0, 0.55);

  // Premultiplied OVER composite: crisp unblurred 'base' glyphs strictly ON TOP of subtle 'underHalo'
  vec3 outRgb = base.rgb + underHalo * (1.0 - base.a);
  float outA = clamp(base.a + haloAlpha * (1.0 - base.a), 0.0, 1.0);

  // Re-enforce true #000000 inside pure core
  outRgb *= (1.0 - isPureCore);
  outA = max(outA, isPureCore);

  o = vec4(clamp(outRgb, 0.0, 1.0), outA);
}`;function w(e,t,a){let r=e.createShader(t);if(!r)throw Error("Unable to create shader");if(e.shaderSource(r,a),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(r)||"unknown error";throw e.deleteShader(r),Error(`Shader compile error: ${t}`)}return r}function y(e,t){let a=w(e,e.VERTEX_SHADER,x),r=w(e,e.FRAGMENT_SHADER,t),o=e.createProgram();if(!o)throw Error("Unable to create WebGL2 program");if(e.attachShader(o,a),e.attachShader(o,r),e.linkProgram(o),!e.getProgramParameter(o,e.LINK_STATUS)){let t=e.getProgramInfoLog(o)||"unknown error";throw e.deleteProgram(o),Error(`Program link error: ${t}`)}e.deleteShader(a),e.deleteShader(r);let n={},i=e.getProgramParameter(o,e.ACTIVE_UNIFORMS);for(let t=0;t<i;t++){let a=e.getActiveUniform(o,t);a&&(n[a.name]=e.getUniformLocation(o,a.name))}return{prog:o,u:n}}function M(e,t,a,r){let o=e.createTexture();e.bindTexture(e.TEXTURE_2D,o),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,t,a,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);let n=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0),e.bindFramebuffer(e.FRAMEBUFFER,null),{tex:o,fb:n,w:t,h:a}}function A(e,t){t&&(e.deleteFramebuffer(t.fb),e.deleteTexture(t.tex))}function R(e,t,a,r){var o;let n,i,l,s,c,m,u,h,d,p,f,x=Math.min(2048,Math.max(768,Math.round(1.5*a))),v=Math.min(1280,Math.max(512,Math.round(1.5*r))),g=document.createElement("canvas");g.width=x,g.height=v,o=g.getContext("2d"),o.clearRect(0,0,x,v),o.fillStyle="#000000",o.fillRect(0,0,x,v),n=a<768,i=x/Math.max(1,a)*(n?4.2:7.4)/1,l=e=>`italic 500 ${Math.round(26*e)}px "Newsreader", "New York", Georgia, ui-serif, serif`,s=e=>`500 ${Math.round(15*e)}px -apple-system, BlinkMacSystemFont, "SF Pro Display", "Geist", sans-serif`,m=(c=e=>{let t=1.4*e,a=-.35*e;o.font=l(e);let r=o.measureText("T").width;o.font=s(e);let n=["^","m","i","n","u","s"],i=n.map(e=>o.measureText(e).width),c=i.reduce((e,t)=>e+t,0)+a*(n.length-1);return{tWidth:r,chars:n,charWidths:i,gap:t,tracking:a,totalWidth:r+t+c}})(i),m=c(i=x*(n?.76:.56)*i/Math.max(1,m.totalWidth)),u=.5*v+26*i*.34,h=.5*x-.5*m.totalWidth,d=3*i,p=(e,t,a=!1)=>{o.save(),o.fillStyle=e,o.shadowColor=t>0?e:"transparent",o.shadowBlur=t,o.textAlign="left",o.textBaseline="alphabetic";let r=h;a||(o.font=l(i),o.fillText("T",r,u)),r+=m.tWidth+m.gap,o.font=s(i);for(let e=0;e<m.chars.length;e++){let t=m.chars[e],n="^"===t;if(!a||n){let e=u-d;o.fillText(t,r,e)}r+=m.charWidths[e]+m.tracking}o.restore()},f=Math.max(12,Math.round(3.8*i)),o.globalCompositeOperation="lighter",p("rgb(0, 200, 0)",f),p("rgb(255, 0, 0)",0),p("rgb(0, 0, 255)",0,!0),o.globalCompositeOperation="source-over";let b=t??e.createTexture();return e.bindTexture(e.TEXTURE_2D,b),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,g),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),b}function k(e){return e<0?0:e>1?1:e}function T(e,t,a){let r=k((a-e)/(t-e));return r*r*(3-2*r)}function N(e){return e*Math.PI/180}function P(e,t,a,r,o,n,i,l){let s=r.x+i*o*n*t.x+l*n*a.x,c=r.y+i*o*n*t.y+l*n*a.y,m=r.z+i*o*n*t.z+l*n*a.z,u=1/Math.max(1e-6,Math.hypot(s,c,m)),h=s*u,d=c*u,p=m*u,f=-(e.x*h+e.y*d+e.z*p);return f<=0?99:Math.hypot(e.x+f*h,e.y+f*d,e.z+f*p)}function S(e,t,a,r,o,n,i,l,s){let c=1,m=-.35;if(P(e,t,a,r,o,n,l,1)>=s)return 0;for(let i=0;i<12;i++){let i=.5*(m+c);P(e,t,a,r,o,n,l,i)<s?c=i:m=i}return(.5-.5*(m+c)*.5)*i}function D({onHeroReveal:e,onHorizonSync:t,runwayRef:a,skipIntro:n=!1}){let i=(0,o.useRef)(null),l=(0,o.useRef)(null),s=(0,o.useRef)(null),c=(0,o.useRef)(e),m=(0,o.useRef)(t),u=(0,o.useRef)(a);return(0,o.useEffect)(()=>{c.current=e,m.current=t,u.current=a},[e,t,a]),(0,o.useEffect)(()=>{let e=l.current,t=i.current;if(!e||!t)return;let a=!1;try{let e=new URLSearchParams(window.location.search);a="1"===e.get("skipIntro")}catch{}let r=window.matchMedia("(prefers-reduced-motion: reduce)").matches,o=n||a||r,h=o;o&&c.current(!0);let d=t.getContext("2d"),p=function(){let e=["*","+","^","-"],t=[],a=918273,r=()=>(a=1664525*a+0x3c6ef35f>>>0)/0x100000000;for(let a=0;a<104;a++){let a=r(),o=r(),n=r(),i=Math.min(1,Math.hypot((a-.5)*1.15,o-.78)/.95);t.push({nx:a,ny:o,glyph:e[Math.floor(r()*e.length)],phase:r()*Math.PI*2,speed:.45+.95*r(),sizeCss:r()>.62?12:10,tint:n>.88?"ice":n>.42?"periwinkle":"accent",crestDist:i})}return t}(),x=e.getContext("webgl2",{alpha:!0,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1});if(!x)return void c.current(!0);let w=y(x,v),P=y(x,g),D=y(x,b),F=y(x,C),j=y(x,E),I=x.createVertexArray();x.bindVertexArray(I);let B="ui-monospace, SFMono-Regular, Menlo, monospace";s.current&&(B=window.getComputedStyle(s.current).fontFamily);let _=null,O=0,L=0,U="",W=null,z=0,G=0,H=0,$=0,V=1440,X=900,Y=2,q=180,J=69,K=16,Z=26,Q=0,ee=0,et=!1,ea=.5,er=null,eo=null,en=null,ei=null,el=null,es=(a=!1)=>{let r=e.getBoundingClientRect(),o=Math.max(1,Math.round(r.width)),n=Math.max(1,Math.round(r.height)),i=o<640,l=o>=640&&o<1024,c=Math.min(Math.max(window.devicePixelRatio||1,1),i?3:2.5),m=Math.max(2,Math.round(o*c)),u=Math.max(2,Math.round(n*c));V=o,X=n,Y=c,(t.width!==m||t.height!==u)&&(t.width=m,t.height=u),s.current&&(B=window.getComputedStyle(s.current).fontFamily);let h=Math.max(6,Math.round((i?6:l?7:8)*c)),d=Math.max(10,Math.round((i?10:l?11.5:13)*c)),p=Math.max(48,Math.floor(m/h)),v=Math.max(28,Math.floor(u/d)),g=Math.floor((m-p*h)*.5),b=Math.floor((u-v*d)*.5),C=et?.36:i?.42:.5;if((a||!_||h!==O||d!==L||B!==U)&&(O=h,L=d,U=B,_=function(e,t,a,r,o){let n=document.createElement("canvas");n.width=a*f.length,n.height=2*r;let i=n.getContext("2d");i.fillStyle="#000000",i.fillRect(0,0,n.width,n.height),i.fillStyle="#ffffff",i.textAlign="center",i.textBaseline="middle";let l=Math.max(8,Math.round(.8*r));i.font=`${r<=14?600:500} ${l}px ${o}`;for(let e=0;e<f.length;e++)i.fillText(f[e],Math.round((e+.5)*a),Math.round(.52*r));let s=Math.max(9,Math.round(.9*r));i.font=`700 ${s}px ${o}`;for(let e=0;e<f.length;e++)i.fillText(f[e],Math.round((e+.5)*a),Math.round(1.52*r));let c=t??e.createTexture();return e.bindTexture(e.TEXTURE_2D,c),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),c}(x,_,h,d,B)),(Math.abs(o-z)>16||Math.abs(n-G)>16||!W)&&(z=o,G=n,W=R(x,W,o,n)),m===H&&u===$&&p===q&&v===J&&h===K&&d===Z&&C===ea&&er)return;H=m,$=u,q=p,J=v,K=h,Z=d,Q=g,ee=b,ea=C,e.width=H,e.height=$,A(x,er),A(x,eo),A(x,en),A(x,ei),A(x,el);let E=Math.max(64,Math.round(H*C)),w=Math.max(64,Math.round($*C)),y=Math.max(32,Math.round(.25*H)),k=Math.max(32,Math.round(.25*$));er=M(x,E,w,x.LINEAR),eo=M(x,q,J,x.NEAREST),en=M(x,H,$,x.NEAREST),ei=M(x,y,k,x.LINEAR),el=M(x,y,k,x.LINEAR)},ec=!1;"u">typeof document&&document.fonts?.ready&&document.fonts.ready.then(()=>{!ec&&V>0&&X>0&&(W=R(x,W,V,X),es(!0))}).catch(()=>{});let em=(e,t,a)=>{a&&(x.activeTexture(x.TEXTURE0+e),x.bindTexture(x.TEXTURE_2D,t),x.uniform1i(a,e))},eu=e=>{e?(x.bindFramebuffer(x.FRAMEBUFFER,e.fb),x.viewport(0,0,e.w,e.h)):(x.bindFramebuffer(x.FRAMEBUFFER,null),x.viewport(0,0,H,$))},eh=.5,ed=.5,ep=.5,ef=.5,ex=0,ev=0,eg=e=>{"touch"===e.pointerType||r||(eh=k(e.clientX/Math.max(1,window.innerWidth)),ed=k(1-e.clientY/Math.max(1,window.innerHeight)),ex=1)},eb=()=>{ex=0};window.addEventListener("pointermove",eg,{passive:!0}),window.addEventListener("pointerleave",eb,{passive:!0});let eC=9*!!o,eE=2*!!o,ew=0,ey=performance.now(),eM=0,eA=0,eR=.0166,ek=0,eT=null;try{let e=new URLSearchParams(window.location.search).get("introAt");if(null!==e){let t=Number(e);Number.isFinite(t)&&t>=0&&t<=14&&(eT=t,eC=Math.min(9,t),eE=Math.max(0,t-9),t>=9&&(h=!0,c.current(!0)))}}catch{}let eN=e=>{var a,n,i,l,s,v,g;if(eA=window.requestAnimationFrame(eN),document.hidden){ey=e;return}let b=Math.max(.001,(e-ey)*.001),C=Math.min(.05,b);ey=e,eR=.935*eR+.065*Math.min(b,.1),!et&&eR>.022?(ek+=C)>1.8&&(et=!0):ek=Math.max(0,ek-.5*C);let E=Math.min(1,8.5*C);ep+=(eh-ep)*E,ef+=(ed-ef)*E,ev+=(ex-ev)*Math.min(1,5.2*C);let y=0,M=u.current?.current;if(M){let e=M.getBoundingClientRect(),t=Math.max(1,e.height-window.innerHeight);y=k(-e.top/t)}else{let e=Math.max(420,2*window.innerHeight);y=k(window.scrollY/e)}if(ew+=(y-ew)*Math.min(1,12*C),4e-4>Math.abs(y-ew)&&(ew=y),null!==eT)eC=Math.min(9,eT),eE=Math.max(0,eT-9);else if(eC<9){let e=window.scrollY>24?5.8:1;eC=Math.min(9,eC+C*e)}else eE=Math.min(10,eE+C);let A=o||eC>=8.999;if(!h&&A&&(h=!0,c.current(!0)),es(),!er||!eo||!en||!ei||!el||!_)return;let R=null!==eT?eT:.001*e,I=V<768,O=H/Math.max(1,$),L=Math.tan(N(23)),U=1-T(3.68,3.92,eC),z=T(1.25,2.4,eC),G=Math.pow(k((eC-2.4)/(3.85-2.4)),2.2),ea=1.32+-1.1800000000000002*G+.028*Math.sin(14*R)*z*(1-G),ec=k(.22*T(1.35,2.45,eC)+.78*T(2.4,3.65,eC)),eg=k(.52*T(1.15,2.45,eC)+.48*T(2.4,3.58,eC)),eb=T(2.25,2.85,eC)*(1-T(3.76,3.98,eC)),eP=T(3.38,3.82,eC)*(1-T(3.86,4.12,eC)),eS=T(3.8,4.04,eC)*(1-T(4.84,5.4,eC)),eD=k((eC-3.8)/1.75),eF=T(3.8,4.02,eC)*(1-T(5.35,6.55,eC)),ej=k((eC-3.8)/2.75),eI=T(4.02,4.2,eC)*(1-T(4.86,5.2,eC)),eB=T(4.65,5.38,eC),e_=T(4.72,5.6,eC),eO=T(3.32,3.78,eC)*(1+.65*eP+.35*eS)*(1-T(6.25,7.45,eC)),eL=(a=k((eC-6.6)/2.4))<.5?16*a*a*a*a*a:1-Math.pow(-2*a+2,5)/2,eU=!o&&A?T(0,.08,eE)*(1-T(.16,.58,eE)):0,eW=k(eE/.58),ez=o?1:A?T(0,.95,eE):0,eG=0,eH=0;if(!r&&eL>.5&&null===eT){let e=Date.now()%1e3*.001;e<.38&&(eG=Math.sin(Math.PI*(eH=e/.38)))}let e$=U*(1-T(.18,.72,ec)),eV=I?.225:.255,eX=I?2.02:1.56,eY=Math.asin(1/eX),eq=Math.atan((-1+2*eV)*L),eJ=I?2.12:1.58,eK=Math.asin(1/eJ),eZ=Math.atan((1-2*(I?.155:.152))*L),eQ=Math.max(3.4,Math.min(7.8,1/Math.sin(Math.atan(Math.max(.08,(I?Math.min(.395*V,.195*X):Math.min(.19*V,.285*X))/(.5*X)*L))))),e0=ew,e1=T(0,.28,e0),e2=k((e0-.28)/.38),e5=T(.66,1,e0),e8=T(.14,.3,e0)*(1-T(.64,.84,e0))*eL,e4=26+62*e1+66*e5,e3=eQ+(.94*eQ-eQ)*e2,e6=e5>0?e3+(eJ-e3)*e5:eX+(e3-eX)*e1,e7=e5>0?0+(-(eZ+eK)-0)*e5:(n=eY-eq)+(0-n)*e1,e9=e1*N(12)+e2*N(42)+e5*N(16),te=((l=(i=7.6+-.7999999999999998*T(0,2.4,eC))+(7.25-i)*T(2.4,3.8,eC))+(5.85-l)*T(4.1,6.55,eC))*(I?1.24:1),tt=19+-4*T(0,6.55,eC),ta=(s=N(-22),s+(N(-18)-s)*T(0,6.55,eC)),tr=N(tt+(e4-tt)*eL),to=te+(e6-te)*eL,tn=0+(e7-0)*eL,ti=ta+(0-ta)*eL,tl=0+(e9-0)*eL,ts=Math.sin(tr),tc=Math.cos(tr),tm=Math.sin(tl),tu=Math.cos(tl),th=(e,t,a)=>({x:e*tu+a*tm,y:t,z:-e*tm+a*tu}),td=th(0,to*ts,to*tc),tp=th(0,-ts,-tc),tf=th(0,tc,-ts),tx=th(1,0,0),tv=Math.cos(tn),tg=Math.sin(tn),tb={x:tv*tp.x+tg*tf.x,y:tv*tp.y+tg*tf.y,z:tv*tp.z+tg*tf.z},tC={x:-tg*tp.x+tv*tf.x,y:-tg*tp.y+tv*tf.y,z:-tg*tp.z+tv*tf.z},tE=Math.cos(ti),tw=Math.sin(ti),ty={x:tE*tx.x+tw*tC.x,y:tE*tx.y+tw*tC.y,z:tE*tx.z+tw*tC.z},tM={x:-tw*tx.x+tE*tC.x,y:-tw*tx.y+tE*tC.y,z:-tw*tx.z+tE*tC.z},tA=5.2+((v=Math.min(.78*to,I?1.56:1.38))+(5.6-v)*e8-5.2)*eL,tR=X*(1-.48*eV),tk=.5*X,tT=(g=tR+((I?60:54)-tR)*T(0,1,e0))+(tk-g)*e8,tN=1+((I?.7:.72)-1)*T(0,1,e0),tP=Math.max(160,2*(Math.tan(Math.asin(k(1/Math.max(1.05,to))))/L*(.5*X))),tS=.5*V,tD=-(.6*X),tF=.75*X,tj=48;if(e0>.62&&eL>.5){let e=S(td,ty,tM,tb,O,L,X,0,1.16),t=S(td,ty,tM,tb,O,L,X,.85,1.16),a=.5*V*.85,r=Math.max(8,e-t),o=(a*a+r*r)/(2*r);tS=.5*V,tF=o,tD=e-o,tj=t}m.current?.({pinProgress:e0,settleProgress:eL,polarFactor:e8,polarDiameterPx:tP,heroResolved:A,countdownCenterY:tT,countdownScale:tN,domeCenterX:tS,domeCenterY:tD,domeRadiusPx:tF,domeEdgeY:tj,viewportW:V}),window.__TMINUS_BH_TELEMETRY__={fps:Number((1/Math.max(.001,eR)).toFixed(1)),frameMs:Number((1e3*eR).toFixed(2)),degraded:et,cols:q,rows:J,cellPxW:K,cellPxH:Z,dpr:Y,introElapsed:Number(eC.toFixed(3)),resolveElapsed:Number(eE.toFixed(3)),heroResolved:A,pinProgress:Number(e0.toFixed(4)),polarFactor:Number(e8.toFixed(4)),polarDiameterPx:Math.round(tP),elevDeg:Number((180*tr/Math.PI).toFixed(1))},e-eM>32&&(eM=e,((e,a,o,n)=>{if(!d||V<=1||X<=1)return;let i=Y;d.setTransform(1,0,0,1,0,0),d.clearRect(0,0,t.width,t.height);let l=X*(.84+-.7*a)*i,s=Math.max(V,X)*(.3+-.09999999999999998*a)*i,c=d.createRadialGradient(.5*V*i,l,0,.5*V*i,l,s);c.addColorStop(0,`rgba(78, 20, 140, ${((.04+-.015*a)*o).toFixed(3)})`),c.addColorStop(1,"rgba(4, 2, 6, 0)"),d.fillStyle=c,d.fillRect(0,0,t.width,t.height),d.textAlign="center",d.textBaseline="middle";let m=`500 ${Math.round(10*i)}px ${B}`,u=`500 ${Math.round(12*i)}px ${B}`;if(n>.005){let t=1+-.38*a;for(let a=0;a<p.length;a++){let r=p[a],o=T(.55*r.crestDist,.55*r.crestDist+.42,n);if(o<=.01)continue;let l=Math.round(r.nx*V*i),s=Math.round(r.ny*X*i),c=k((.16+.34*(.45+.55*Math.sin(e*r.speed+r.phase)))*t*o);d.font=12===r.sizeCss?u:m,d.fillStyle="ice"===r.tint?"#97DFFC":"periwinkle"===r.tint?"#858AE3":"#613DC1",d.globalAlpha=c,d.fillText(r.glyph,l,s)}}if(!r&&ev>.01&&n>.45){let t=["^","-","t","+","=","T","*"],a=ep*V,r=(1-ef)*X,o=Math.max(0,Math.floor((a-104)/18)),l=Math.min(Math.ceil(V/18),Math.ceil((a+104)/18)),s=Math.max(0,Math.floor((r-104)/18)),c=Math.min(Math.ceil(X/18),Math.ceil((r+104)/18)),h=T(.45,.95,n)*ev;for(let n=s;n<=c;n++){let s=18*n+9,c=s-r;if(!(Math.abs(c)>=104))for(let r=o;r<=l;r++){let o=18*r+9,l=Math.hypot(o-a,c);if(l>=104)continue;let p=Math.pow(1-l/104,1.85),f=Math.min(.32,p*(.78+.22*Math.sin(2.4*e+.65*r+.48*n))*h*.36);if(f<.012)continue;let x=(Math.floor(2.3*e+.37*(17*r+31*n&63)-l/104*2.2)%t.length+t.length)%t.length,v=t[x];d.font=p>.55?u:m;let g=Math.sin(3.1*e+1.13*r+.87*n);d.fillStyle=l<36||l<62&&g>.65?"#97DFFC":l<78?"#858AE3":"#613DC1",d.globalAlpha=f,d.fillText(v,Math.round(o*i),Math.round(s*i))}}}d.globalAlpha=1})(R,e0,eL,ez)),x.disable(x.BLEND),eu(er),x.useProgram(w.prog),x.uniform1f(w.u.uTime,R),x.uniform1f(w.u.uViewAsp,O),x.uniform1f(w.u.uSceneH,er.h),x.uniform1f(w.u.uTanHalfFov,L),x.uniform3f(w.u.uCamPos,td.x,td.y,td.z),x.uniform3f(w.u.uCamRight,ty.x,ty.y,ty.z),x.uniform3f(w.u.uCamUp,tM.x,tM.y,tM.z),x.uniform3f(w.u.uCamFwd,tb.x,tb.y,tb.z),x.uniform1f(w.u.uStarVis,U),x.uniform1f(w.u.uStarRadius,ea),x.uniform1f(w.u.uStarShift,ec),x.uniform1f(w.u.uStarCrack,eg),x.uniform1f(w.u.uImplode,eb),x.uniform1f(w.u.uEjecta,eF),x.uniform1f(w.u.uEjectaProg,ej),x.uniform1f(w.u.uBhBirth,eB),x.uniform1f(w.u.uDiskBirth,e_),x.uniform1f(w.u.uLockPulse,eU),x.uniform1f(w.u.uLockWaveProg,eW),x.uniform1f(w.u.uTickPulse,eG),x.uniform1f(w.u.uTickProg,eH),x.uniform1f(w.u.uSettle,eL),x.uniform1f(w.u.uPin,e5),x.uniform1f(w.u.uPolarFactor,e8),x.uniform1f(w.u.uDiskOuterR,tA),x.uniform1f(w.u.uJetPower,eO),x.uniform1f(w.u.uCharge,eP),x.uniform1f(w.u.uBlastPeak,eS),x.uniform1f(w.u.uBlastProgress,eD),x.uniform2f(w.u.uPointer,ep,ef),x.uniform1f(w.u.uPointerActive,ev),x.drawArrays(x.TRIANGLES,0,3),eu(eo),x.useProgram(P.prog),em(0,er.tex,P.u.uBg),x.uniform2f(P.u.uBgInv,1/er.w,1/er.h),x.uniform2f(P.u.uGridOrigin,Q,ee),x.uniform2f(P.u.uCellPx,K,Z),x.uniform2f(P.u.uCanvasPx,H,$),x.uniform2f(P.u.uGrid,q,J),x.drawArrays(x.TRIANGLES,0,3),eu(en),x.useProgram(D.prog),em(0,eo.tex,D.u.uCell),em(1,er.tex,D.u.uBg),em(2,_,D.u.uAtlas),W&&em(3,W,D.u.uWordmarkMask),x.uniform2i(D.u.uGrid,q,J),x.uniform2i(D.u.uCellPx,K,Z),x.uniform2i(D.u.uGridOrigin,Q,ee),x.uniform2f(D.u.uCanvasPx,H,$),x.uniform1f(D.u.uGlyphCount,f.length),x.uniform1f(D.u.uWordmarkCarve,eI),x.uniform1f(D.u.uBlastPeak,eS),x.uniform1f(D.u.uWarmTint,e$),x.uniform1f(D.u.uSettle,eL),x.uniform1f(D.u.uTime,R),x.uniform2f(D.u.uPointer,ep,ef),x.uniform1f(D.u.uPointerActive,ev),x.uniform1f(D.u.uViewAsp,O),x.drawArrays(x.TRIANGLES,0,3),x.useProgram(F.prog),eu(ei),em(0,er.tex,F.u.uTex),x.uniform2f(F.u.uDir,1.35/ei.w,0),x.uniform1f(F.u.uThreshold,.62),x.drawArrays(x.TRIANGLES,0,3),eu(el),em(0,ei.tex,F.u.uTex),x.uniform2f(F.u.uDir,0,1.35/el.h),x.uniform1f(F.u.uThreshold,0),x.drawArrays(x.TRIANGLES,0,3),eu(null),x.clearColor(0,0,0,0),x.clear(x.COLOR_BUFFER_BIT),x.useProgram(j.prog),em(0,en.tex,j.u.uBase),em(1,el.tex,j.u.uBloom1),W&&em(2,W,j.u.uWordmarkMask),x.uniform2f(j.u.uGrid,q,J),x.uniform1f(j.u.uWordmarkCarve,eI);let tI=(.16+.03*eL+.05*U+.06*eF+.08*eU+.04*eG)*(1-.72*eS);x.uniform1f(j.u.uGlow,tI),x.drawArrays(x.TRIANGLES,0,3)};return eA=window.requestAnimationFrame(eN),()=>{ec=!0,window.cancelAnimationFrame(eA),window.removeEventListener("pointermove",eg),window.removeEventListener("pointerleave",eb),A(x,er),A(x,eo),A(x,en),A(x,ei),A(x,el),_&&x.deleteTexture(_),W&&x.deleteTexture(W),x.deleteVertexArray(I),x.deleteProgram(w.prog),x.deleteProgram(P.prog),x.deleteProgram(D.prog),x.deleteProgram(F.prog),x.deleteProgram(j.prog)}},[n]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("span",{ref:s,"aria-hidden":"true",className:"pointer-events-none sr-only font-mono",children:"T"}),(0,r.jsx)("canvas",{ref:i,"aria-hidden":"true",className:"pointer-events-none fixed inset-0 z-0 h-full w-full"}),(0,r.jsx)("canvas",{ref:l,"aria-hidden":"true",className:"pointer-events-none fixed inset-0 z-30 h-full w-full"})]})}let F=Date.parse("2027-01-01T00:00:00-05:00");function j(e){return String(Math.max(0,Math.floor(e))).padStart(2,"0")}function I({stripRef:e,polarRef:t}={}){let[a,n]=(0,o.useState)({days:"--",hours:"--",minutes:"--",seconds:"--"});(0,o.useEffect)(()=>{let e=()=>{let e,t,a,r,o;n((a=Math.floor((t=Math.floor(Math.max(0,F-Date.now())/1e3))/86400),r=Math.floor(t%86400/3600),o=Math.floor(t%3600/60),{days:(e=Math.max(0,Math.floor(a)))>=100?String(e):String(e).padStart(2,"0"),hours:j(r),minutes:j(o),seconds:j(t%60)}))};e();let t=window.setInterval(e,1e3);return()=>window.clearInterval(t)},[]);let i=[{value:a.days,label:"D"},{value:a.hours,label:"H"},{value:a.minutes,label:"M"},{value:a.seconds,label:"S"}],l=[{value:a.hours,label:"H"},{value:a.minutes,label:"M"},{value:a.seconds,label:"S"}];return(0,r.jsxs)("div",{role:"timer","aria-live":"off","aria-label":"Countdown to T-minus App Store v1.0 launch on January 1, 2027",className:"relative flex items-center justify-center select-none whitespace-nowrap",children:[(0,r.jsxs)("div",{ref:e,"data-countdown-mode":"strip",className:"flex flex-col items-center gap-1.5 will-change-transform sm:gap-2",children:[(0,r.jsx)("div",{className:"flex items-baseline gap-3.5 whitespace-nowrap font-sans text-[26px] leading-none font-semibold tracking-[-0.03em] text-white tabular-nums sm:gap-7 sm:text-[36px]",children:i.map(e=>(0,r.jsxs)("span",{className:"inline-flex items-baseline gap-1 sm:gap-1.5",children:[(0,r.jsx)("span",{children:e.value}),(0,r.jsx)("span",{className:"font-mono text-[11px] font-normal tracking-[0.06em] text-[#858AE3] sm:text-[13px]",children:e.label})]},e.label))}),(0,r.jsx)("div",{"data-countdown-label":"true",className:"whitespace-nowrap font-mono text-[9.5px] font-normal tracking-[0.12em] text-[#858AE3]/90 uppercase sm:text-[11.5px] sm:tracking-[0.18em]",children:"APP STORE V1.0 \xb7 JAN 1, 2027"})]}),(0,r.jsxs)("div",{ref:t,"data-countdown-mode":"polar",style:{opacity:0,transform:"translate(-50%, -50%) scale(0.84)"},className:"pointer-events-none absolute top-1/2 left-1/2 flex w-[264px] flex-col items-center text-center will-change-transform sm:w-[410px]",children:[(0,r.jsx)("span",{className:"font-mono text-[9.5px] font-medium tracking-[0.24em] text-[#97DFFC] uppercase sm:text-[11.5px]",children:"LAUNCHING IN"}),(0,r.jsxs)("div",{className:"mt-1.5 flex items-baseline justify-center gap-2 sm:mt-2.5 sm:gap-3",children:[(0,r.jsx)("span",{className:"font-sans text-[78px] leading-[0.86] font-semibold tracking-[-0.05em] text-white tabular-nums sm:text-[128px]",children:a.days}),(0,r.jsx)("span",{className:"font-mono text-[12px] font-medium tracking-[0.16em] text-[#97DFFC] uppercase sm:text-[17px]",children:"DAYS"})]}),(0,r.jsx)("div",{"aria-hidden":"true",className:"my-2.5 h-px w-[72%] bg-gradient-to-r from-transparent via-[#858AE3]/45 to-transparent sm:my-4"}),(0,r.jsx)("div",{className:"flex items-baseline justify-center gap-4 font-sans text-[24px] leading-none font-medium tracking-[-0.025em] text-white tabular-nums sm:gap-7 sm:text-[40px]",children:l.map(e=>(0,r.jsxs)("span",{className:"inline-flex items-baseline gap-1 sm:gap-1.5",children:[(0,r.jsx)("span",{children:e.value}),(0,r.jsx)("span",{className:"font-mono text-[10px] font-normal tracking-[0.08em] text-[#858AE3] sm:text-[14px]",children:e.label})]},e.label))}),(0,r.jsx)("div",{className:"mt-2.5 font-mono text-[9px] font-normal tracking-[0.16em] text-[#858AE3]/88 uppercase sm:mt-4 sm:text-[11.5px] sm:tracking-[0.2em]",children:"APP STORE V1.0 \xb7 JAN 1, 2027"})]})]})}let B={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};B.node;let _=c(B),O={name:"calendar",size:24,node:[["path",{d:"M8 2v3",key:"1ioesn"}],["path",{d:"M16 2v3",key:"otl347"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",key:"h1oib"}],["path",{d:"M3 9h18",key:"1pudct"}]]};O.node;let L=c(O),U={name:"share-2",size:24,node:[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]]};U.node;let W=c(U);function z({variant:e="primary",shape:t="rect",className:a="",children:o,disabled:n,...i}){return(0,r.jsx)("button",{disabled:n,className:`inline-flex cursor-pointer items-center justify-center gap-2 font-sans font-semibold tracking-[-0.01em] transition-colors duration-150 active:translate-y-px focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#040206] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${"pill"===t?"rounded-full":"rounded-[6px]"} ${"primary"===e?"bg-white text-[#040206] border border-white hover:bg-[#97DFFC] hover:border-[#97DFFC]":"bg-[#07050D] text-white border border-[#858AE3]/30 hover:border-[#97DFFC]/70 hover:text-[#97DFFC]"} ${a}`,...i,children:o})}function G({inputRef:e,onOpenLegal:t,requestedRole:a}){let[n,i]=(0,o.useState)("SHOPPER"),[l,s]=(0,o.useState)(""),[c,m]=(0,o.useState)(""),[u,h]=(0,o.useState)(!1),[d,p]=(0,o.useState)(null),[f,x]=(0,o.useState)(!1),[v,g]=(0,o.useState)(null),[b,C]=(0,o.useState)(null),[E,w]=(0,o.useState)(null);async function y(e){e.preventDefault(),g(null);let t=function(e){let t=e.trim();if(!t)return null;let a=t.startsWith("+"),r=t.replace(/\D/g,"");return a?r.length<8||r.length>15||r.startsWith("0")?null:`+${r}`:10===r.length?"0"===r[0]||"1"===r[0]?null:`+1${r}`:11===r.length&&r.startsWith("1")?"0"===r[1]||"1"===r[1]?null:`+${r}`:r.length>=11&&r.length<=15&&!r.startsWith("0")?`+${r}`:null}(l);if(!t)return void g("Enter a valid mobile number (e.g. (555) 234-5678).");if(!u)return void g("Check the SMS consent box so we can text you on Jan 1.");x(!0);try{let e=await fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:t,role:n,brandHandle:"BRAND"===n&&c.trim()||null,smsConsent:!0,source:d})}),a=await e.json().catch(()=>({}));if(!e.ok)return void g("string"==typeof a?.error?a.error:"Something went wrong. Please try again.");C(n)}catch{g("Network error. Check your connection and try again.")}finally{x(!1)}}async function M(){let e=`${window.location.origin}/landing`;try{navigator.share?(await navigator.share({title:"T^minus",text:"T^minus launches Jan 1, 2027 \xb7 independent clothing drops on a live clock.",url:e}),w("Shared")):navigator.clipboard?.writeText?(await navigator.clipboard.writeText(e),w("Link copied")):w("Copy URL above")}catch{}finally{window.setTimeout(()=>w(null),2600)}}return(0,o.useEffect)(()=>{a&&(i(a.role),g(null))},[a]),(0,o.useEffect)(()=>{let e=new URLSearchParams(window.location.search),t=e.get("utm_source")||e.get("ref")||e.get("src")||null;t&&p(t.slice(0,64))},[]),b?(0,r.jsxs)("div",{role:"status","aria-live":"polite",className:"mx-auto flex w-full max-w-[448px] flex-col items-center rounded-[6px] border border-[#858AE3]/24 bg-[#07050D] px-6 py-6 text-center",children:[(0,r.jsxs)("div",{className:"inline-flex items-center gap-1.5 font-mono text-[10.5px] font-normal tracking-[0.16em] text-[#97DFFC] uppercase",children:[(0,r.jsx)(_,{className:"size-3.5 stroke-[2.2]"}),(0,r.jsx)("span",{children:"BRAND"===b?"+ BRAND SPOT SAVED":"+ ALLOCATION SECURED"})]}),(0,r.jsx)("h3",{className:"mt-2.5 font-sans text-[21px] font-medium tracking-[-0.025em] text-white",children:"BRAND"===b?"Brand request saved.":"You're in for Jan 1."}),(0,r.jsx)("p",{className:"mt-2 max-w-[360px] text-[13.5px] leading-[1.52] text-[#D8D0EA]/80",children:"BRAND"===b?"We'll text you before launch to set up your storefront and schedule an early drop.":"Watch your texts on January 1 when App Store v1.0 goes live."}),(0,r.jsxs)("div",{className:"mt-5 flex w-full flex-col gap-2.5 sm:flex-row",children:[(0,r.jsxs)(z,{type:"button",variant:"primary",onClick:function(){let e,t=new Blob([(e=`${window.location.origin}/landing`.replace(/[\r\n]/g,""),`BEGIN:VCALENDAR\r
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
END:VCALENDAR`)],{type:"text/calendar;charset=utf-8"}),a=URL.createObjectURL(t),r=document.createElement("a");r.href=a,r.download="t-minus-launch-jan-1-2027.ics",document.body.appendChild(r),r.click(),r.remove(),URL.revokeObjectURL(a)},className:"h-10 flex-1 px-4 text-[13px]",children:[(0,r.jsx)(L,{className:"size-3.5"}),(0,r.jsx)("span",{children:"Save Jan 1 reminder"})]}),(0,r.jsxs)(z,{type:"button",variant:"dark",onClick:M,className:"h-10 flex-1 px-4 text-[13px]",children:[(0,r.jsx)(W,{className:"size-3.5"}),(0,r.jsx)("span",{children:E??"Send to a friend"})]})]})]}):(0,r.jsxs)("form",{onSubmit:y,noValidate:!0,className:"mx-auto flex w-full max-w-[448px] flex-col items-center",children:[(0,r.jsxs)("div",{role:"radiogroup","aria-label":"Waitlist role",className:"relative mb-2.5 inline-grid grid-cols-2 rounded-[6px] border border-[#858AE3]/24 bg-[#040206] p-[3px] sm:mb-3",children:[(0,r.jsx)("span",{"aria-hidden":"true",className:`pointer-events-none absolute top-[3px] bottom-[3px] left-[3px] w-[calc(50%-3px)] rounded-[4px] bg-[#613DC1] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${"BRAND"===n?"translate-x-full":"translate-x-0"}`}),[{id:"SHOPPER",label:"I'm shopping"},{id:"BRAND",label:"I run a brand"}].map(e=>{let t=n===e.id;return(0,r.jsx)("button",{type:"button",role:"radio","aria-checked":t,onClick:()=>{i(e.id),g(null)},className:`relative z-10 cursor-pointer rounded-[4px] px-3.5 py-1 text-[12px] font-medium tracking-[-0.005em] transition-colors duration-150 ${t?"text-white":"text-[#C4BBE0]/76 hover:text-white"}`,children:e.label},e.id)})]}),(0,r.jsxs)("div",{className:"flex w-full items-center gap-1.5 rounded-[6px] border border-[#858AE3]/24 bg-[#07050D] p-1.5 transition-colors duration-150 focus-within:border-[#97DFFC]/70",children:[(0,r.jsx)("label",{htmlFor:"waitlist-phone",className:"sr-only",children:"Mobile phone number"}),(0,r.jsx)("input",{ref:e,id:"waitlist-phone",name:"tel",type:"tel",inputMode:"tel",autoComplete:"tel",required:!0,placeholder:"+1 (555) 000-0000",value:l,onChange:e=>{s(function(e){let t=e.trimStart();if(t.startsWith("+"))return"+"+t.slice(1).replace(/[^\d\s-]/g,"").slice(0,18);let a=e.replace(/\D/g,"").slice(0,11);if(0===a.length)return"";if(11===a.length&&a.startsWith("1")){let e=a.slice(1);return`+1 (${e.slice(0,3)}) ${e.slice(3,6)}-${e.slice(6)}`}return a.length<=3?`(${a}`:a.length<=6?`(${a.slice(0,3)}) ${a.slice(3)}`:`(${a.slice(0,3)}) ${a.slice(3,6)}-${a.slice(6,10)}`}(e.target.value)),v&&g(null)},className:"h-9 min-w-0 flex-1 bg-transparent px-2.5 text-[14.5px] text-white placeholder:text-[#C4BBE0]/48 focus:outline-none sm:h-10 sm:px-3"}),(0,r.jsx)(z,{type:"submit",variant:"primary",disabled:f,className:"h-9 shrink-0 px-3.5 text-[12.5px] sm:h-10 sm:px-5 sm:text-[13px]",children:f?"Saving...":"BRAND"===n?"Join as a brand":"Get early access"})]}),(0,r.jsx)("div",{className:`grid w-full transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${"BRAND"===n?"mt-2 grid-rows-[1fr] opacity-100":"pointer-events-none mt-0 grid-rows-[0fr] opacity-0"}`,children:(0,r.jsxs)("div",{className:"overflow-hidden",children:[(0,r.jsx)("label",{htmlFor:"waitlist-brand",className:"sr-only",children:"Label or shop handle"}),(0,r.jsx)("input",{id:"waitlist-brand",name:"organization",type:"text",tabIndex:"BRAND"===n?0:-1,placeholder:"Label or shop handle (optional)",value:c,onChange:e=>m(e.target.value),maxLength:120,className:"h-9 w-full rounded-[6px] border border-[#858AE3]/24 bg-[#07050D] px-3 text-[13.5px] text-white placeholder:text-[#C4BBE0]/48 transition-colors focus:border-[#97DFFC]/70 focus:outline-none sm:h-10 sm:px-3.5"})]})}),(0,r.jsxs)("label",{className:"mt-2.5 flex cursor-pointer items-center justify-center gap-2 text-center text-[11px] leading-[1.35] text-[#C4BBE0]/78 select-none sm:mt-3",children:[(0,r.jsxs)("span",{className:"relative inline-flex size-3.5 shrink-0 items-center justify-center",children:[(0,r.jsx)("input",{type:"checkbox",checked:u,onChange:e=>{h(e.target.checked),v&&g(null)},className:"peer sr-only"}),(0,r.jsx)("span",{"aria-hidden":"true",className:"flex size-3.5 items-center justify-center rounded-[3px] border border-[#858AE3]/45 bg-[#07050D] transition-colors duration-150 peer-checked:border-[#97DFFC] peer-checked:bg-[#613DC1] peer-focus-visible:ring-1 peer-focus-visible:ring-[#97DFFC]",children:u?(0,r.jsx)(_,{className:"size-2.5 stroke-[2.8] text-white"}):null})]}),(0,r.jsxs)("span",{children:["Text me launch & drop alerts (STOP to opt out \xb7"," ",(0,r.jsx)("button",{type:"button",onClick:e=>{e.preventDefault(),t("privacy")},className:"cursor-pointer text-white/90 underline decoration-[#858AE3]/45 underline-offset-2 transition hover:text-[#97DFFC]",children:"Privacy"})," ","/"," ",(0,r.jsx)("button",{type:"button",onClick:e=>{e.preventDefault(),t("terms")},className:"cursor-pointer text-white/90 underline decoration-[#858AE3]/45 underline-offset-2 transition hover:text-[#97DFFC]",children:"Terms"}),")"]})]}),v?(0,r.jsx)("p",{role:"alert",className:"mt-2 text-center text-[12px] font-medium text-[#97DFFC]",children:v}):null]})}let H=["^","-","t","+","=","T","*"];function $({text:e,active:t,instant:a=!1,origin:n="left",delayMs:i=0,durationMs:l=680,glyphClassName:s="text-[#858AE3]",crestClassName:c="text-[#97DFFC]",className:m=""}){let u=(0,o.useMemo)(()=>Array.from(e),[e]),[h,d]=(0,o.useState)(a),[p,f]=(0,o.useState)(+!!a);if((0,o.useEffect)(()=>{if(a||window.matchMedia("(prefers-reduced-motion: reduce)").matches){d(!0),f(1);return}if(!t){d(!1),f(0);return}let e=0,r=0,o=window.setTimeout(()=>{r=performance.now();let t=a=>{let o=Math.min(1,(a-r)/Math.max(120,l));f(o),o<1?e=window.requestAnimationFrame(t):d(!0)};e=window.requestAnimationFrame(t)},i);return()=>{window.clearTimeout(o),window.cancelAnimationFrame(e)}},[t,a,i,l]),h)return(0,r.jsx)("span",{className:m,children:e});if(!t)return(0,r.jsx)("span",{"aria-label":e,className:m,children:(0,r.jsx)("span",{"aria-hidden":"true",className:"opacity-0",children:e})});let x=Math.max(1,u.length),v=(x-1)*.5,g=Math.max(.5,v);return(0,r.jsx)("span",{"aria-label":e,className:m,children:u.map((e,t)=>{if(" "===e)return(0,r.jsx)(o.Fragment,{children:" "},t);let a=("center"===n?Math.abs(t-v)/g:"right"===n?(x-1-t)/Math.max(1,x-1):t/Math.max(1,x-1))*("center"===n?.52:.58),i=Math.min(1,a+("center"===n?.44:.38)),l=(p-a)/Math.max(.01,i-a);if(l<=0)return(0,r.jsx)("span",{"aria-hidden":"true",className:"relative inline-block opacity-0",children:e},t);if(l>=1)return(0,r.jsx)("span",{"aria-hidden":"true",className:"relative inline-block",children:e},t);let m=Math.min(H.length-1,Math.floor(l*H.length)),u=H[m],h=Math.min(1,.35+.9*l);return(0,r.jsxs)("span",{"aria-hidden":"true",className:"relative inline-block",children:[(0,r.jsx)("span",{className:"opacity-0",children:e}),(0,r.jsx)("span",{style:{opacity:h},className:`pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-[0.76em] font-medium ${m>=5?c:m<=1?"text-[#613DC1]":s}`,children:u})]},t)})})}function V({text:e,children:t,tier:a="headline",origin:n="left",instant:i=!1,delayMs:l=0,className:s=""}){let c=(0,o.useRef)(null),[m,u]=(0,o.useState)(i);return((0,o.useEffect)(()=>{if(i||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return void u(!0);let e=c.current;if(!e||"u"<typeof IntersectionObserver)return void u(!0);let t=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){u(!0),t.disconnect();break}},{threshold:.16,rootMargin:"0px 0px -32px 0px"});return t.observe(e),()=>t.disconnect()},[i]),"prose"===a)?(0,r.jsx)("span",{ref:c,style:{transitionDelay:i?"0ms":`${l}ms`},className:`block transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${m?"translate-y-0 opacity-100":"translate-y-2.5 opacity-0"} ${s}`,children:t??e}):(0,r.jsx)("span",{ref:c,className:s,children:(0,r.jsx)($,{text:e??"",active:m,instant:i,origin:n,delayMs:l,durationMs:"telemetry"===a?320:620,glyphClassName:"telemetry"===a?"text-[#613DC1]":"text-[#858AE3]",crestClassName:"text-[#97DFFC]"})})}function X({instant:e=!1,variant:t="rule",className:a=""}){let n=(0,o.useRef)(null),i=(0,o.useRef)(null),l=(0,o.useRef)(null),[s,c]=(0,o.useState)(e);return(0,o.useEffect)(()=>{if(e||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return void c(!0);let t=n.current;if(!t||"u"<typeof IntersectionObserver)return void c(!0);let a=new IntersectionObserver(e=>{for(let t of e)if(t.isIntersecting){c(!0),a.disconnect();break}},{threshold:.2});return a.observe(t),()=>a.disconnect()},[e]),(0,o.useEffect)(()=>{let a=n.current,r=i.current;if(!a||!r)return;let o=r.getContext("2d");if(!o)return;let c=window.matchMedia("(prefers-reduced-motion: reduce)").matches,m=e||c,u=0,h=0,d=2,p="ui-monospace, SFMono-Regular, Menlo, monospace",f=-10,x=0,v=0,g=+!!m,b=0,C=0,E=!1,w=()=>{let e=a.getBoundingClientRect();u=Math.max(1,Math.round(e.width)),h=Math.max(1,Math.round(e.height));let t=u<640;d=Math.min(Math.max(window.devicePixelRatio||1,1),t?3:2.5),r.width=Math.max(1,Math.round(u*d)),r.height=Math.max(1,Math.round(h*d)),l.current&&(p=window.getComputedStyle(l.current).fontFamily)},y=()=>{if(o.setTransform(1,0,0,1,0,0),o.clearRect(0,0,r.width,r.height),!s&&!m||u<=2||h<=2)return;let e=Math.max(8,Math.round((u<640?9:11)*d)),a=Math.max(19,Math.floor(r.width/e)),n=Math.floor((r.width-a*e)*.5),i=(a-1)*.5,l=Math.max(10,Math.round((u<640?10:11)*d));o.font=`500 ${l}px ${p}`,o.textAlign="center",o.textBaseline="middle";let c="arch"===t?.78*r.height:.5*r.height,v="arch"===t?.54*r.height:0;for(let r=0;r<a;r++){let l=Math.abs(r-i)/Math.max(1,i),s=Math.min(1,Math.max(0,(g-.58*l)/.38));if(s<=.01)continue;let m=Math.pow(1-l,1.55),u=(r+.5)/a,h=0;if(x>.005){let e=Math.abs(u-f);e<.14&&(h=Math.pow(1-e/.14,1.8)*x)}let d=Math.min(H.length-1,Math.floor(5.2*m+.35));s<.99?d=Math.min(H.length-1,Math.floor(s*H.length)):h>.22&&(d=Math.min(H.length-1,d+(h>.62?2:1)));let p=H[d],b=n+r*e+Math.floor(.5*e),C=Math.round("arch"===t?c-v*Math.pow(Math.max(0,1-l*l),1.25):c),E="#613DC1",w=.42+.45*m;s<.99&&d>=5?(E="#97DFFC",w=.95):h>.32||l<.06&&m>.9?(E="#97DFFC",w=Math.min(1,.78+.22*h)):(m>.48||h>.12)&&(E="#858AE3",w=Math.min(.92,.58+.34*m+.2*h)),o.fillStyle=E,o.globalAlpha=w*Math.min(1,1.4*s),o.fillText(p,b,C)}o.globalAlpha=1},M=()=>{if(E)return;E=!0;let e=performance.now(),t=a=>{let r=Math.min(.05,Math.max(.001,(a-e)*.001));e=a,!m&&s&&g<1&&(0===b&&(b=a),g=Math.min(1,(a-b)/560)),x+=(v-x)*Math.min(1,11*r),.003>Math.abs(v-x)&&(x=v),y(),!m&&s&&g<1||x>.003||v>0?C=window.requestAnimationFrame(t):E=!1};C=window.requestAnimationFrame(t)};w(),(s||m)&&(m?(g=1,y()):M());let A=e=>{if("touch"===e.pointerType||c)return;let t=a.getBoundingClientRect();f=(e.clientX-t.left)/Math.max(1,t.width),v=1,M()},R=()=>{v=0,M()};a.addEventListener("pointermove",A,{passive:!0}),a.addEventListener("pointerleave",R,{passive:!0});let k=new ResizeObserver(()=>{w(),y()});k.observe(a);let T=!1;return document.fonts?.ready.then(()=>{T||(w(),y())}).catch(()=>{}),()=>{T=!0,window.cancelAnimationFrame(C),a.removeEventListener("pointermove",A),a.removeEventListener("pointerleave",R),k.disconnect()}},[s,e,t]),(0,r.jsxs)("div",{ref:n,"aria-hidden":"true",className:`relative w-full select-none ${"arch"===t?"h-10 sm:h-12":"h-5 sm:h-6"} ${a}`,children:[(0,r.jsx)("span",{ref:l,"aria-hidden":"true",className:"pointer-events-none sr-only font-mono",children:"T"}),(0,r.jsx)("canvas",{ref:i,className:"block h-full w-full"})]})}let Y=["^","-","t","+","=","T","*"],q=[["##^     ^##","###~   ~###","##=#~ ~#=##","## ~#=#~ ##","##  =#=  ##","##   ~   ##","##       ##","##       ##","#=       =#"],["=###="," ~#~ "," ### "," ### "," ### "," ### "," ### "," ~#~ ","=###="],["###     ##","##=#    ##","## ~#   ##","##  =#  ##","##   =# ##","##    =###","##     ###","##     ~##","#=      =#"],["#=     =#","##     ##","##     ##","##     ##","##     ##","##     ##","##~   ~##","~#=====#~"," ^=====^ "],[" ^=====^ ","~#=====#~","##     ^~","~##===~  ","  ^===##~","      ~##","^~     ##","~#=====#~"," ^=====^ "]],J=q.reduce((e,t)=>e+t[0].length,0)+3*(q.length-1),K=function(){let e=[],t=(J-1)*.5,a=0;for(let r=0;r<q.length;r++){let o=q[r],n=o[0].length;for(let r=0;r<9;r++){let i=o[r];for(let o=0;o<n;o++){let n,l,s,c,m=i[o];if(" "===m)continue;let u=a+o,h=Math.abs(43758.5453*Math.sin(12.9898*u+78.233*r))%1;if("#"===m){n="primary";let e=(0===r||4===r||8===r)&&h>.62;l=e?6:5,s=e?"#F7FAFF":h>.35?"#E6F8FF":"#D2F4FF",c=700}else"="===m?(n="bridge",l=h>.25?4:3,s="#97DFFC",c=600):("~"===m?(n="diagonal",l=h>.45?3:2,s="#858AE3"):(n="bevel",l=h>.5?0:1,s="#613DC1"),c=500);e.push({col:u,row:r,role:n,baseIdx:l,baseColor:s,baseWeight:c,centerDist:Math.min(1,Math.abs(u-t)/Math.max(1,t)),xNorm:u/Math.max(1,J-1),seed:Math.floor(97*h)})}}a+=n+3}return e}();function Z({active:e,instant:t=!1,delayMs:a=200,durationMs:n=680,className:i=""}){let l=(0,o.useRef)(null),s=(0,o.useRef)(null),c=(0,o.useRef)(null);return(0,o.useEffect)(()=>{let r=l.current,o=s.current;if(!r||!o)return;let i=o.getContext("2d");if(!i)return;let m=window.matchMedia("(prefers-reduced-motion: reduce)").matches,u=t||m,h=0,d=0,p=2,f=20,x=28,v=0,g=0,b="ui-monospace, SFMono-Regular, Menlo, monospace",C=0,E=0,w=!1,y=0,M=+!!u,A=u,R=u,k=-99,T=-99,N=0,P=0,S=()=>{let e=r.getBoundingClientRect();h=Math.max(1,Math.round(e.width)),d=Math.max(1,Math.round(e.height));let t=h<420;p=Math.min(Math.max(window.devicePixelRatio||1,1),t?3:2.5),o.width=Math.max(1,Math.round(h*p)),o.height=Math.max(1,Math.round(d*p)),f=Math.max(5,Math.floor(o.width/J)),x=Math.max(8,Math.floor(o.height/9)),v=Math.floor((o.width-f*J)*.5),g=Math.floor((o.height-9*x)*.5),c.current&&(b=window.getComputedStyle(c.current).fontFamily)},D=()=>{if(i.setTransform(1,0,0,1,0,0),i.clearRect(0,0,o.width,o.height),!e&&!u||M<=.001&&!u)return;let t=Math.max(9,Math.round(.92*x)),a=`500 ${t}px ${b}`,r=`600 ${t}px ${b}`,n=`700 ${t}px ${b}`;i.textAlign="center",i.textBaseline="middle";let l=(M-.36)/.64;for(let e=0;e<K.length;e++){let t=K[e],o=v+t.col*f+Math.floor(.5*f),s=g+t.row*x+Math.floor(.52*x),c=t.baseIdx,m=t.baseColor,u=1,h=t.baseWeight;if(M<1){let e=("bevel"===t.role?0:"diagonal"===t.role?.06:"bridge"===t.role?.16:.28)+.34*t.centerDist,a=(M-e)/.34;if(a<=0)continue;a<1?(c=Math.min(Y.length-1,Math.floor(a*(t.baseIdx+1.4))),m=a>.72?"#97DFFC":a>.35?"#858AE3":"#613DC1",u=Math.min(1,.3+.9*a),h=500):"primary"===t.role&&l>0&&l<1.12&&.065>Math.abs(t.xNorm-l)&&(c=6,m="#97DFFC",h=700)}else if(N>.005){let e=Math.hypot(t.col-k,(t.row-T)*1.45);if(e<4.6){let a=Math.pow(1-e/4.6,1.65)*N;if(a>.16){let e=a>.58?2:1;c=Math.min(Y.length-1,t.baseIdx+e),m=a>.52?"#F7FAFF":"#97DFFC",h=a>.45?700:600}}}i.font=700===h?n:600===h?r:a,i.fillStyle=m,i.globalAlpha=u,i.fillText(Y[c],o,s)}i.globalAlpha=1},F=()=>{if(w)return;w=!0;let e=performance.now(),t=a=>{let r=Math.min(.05,Math.max(.001,(a-e)*.001));e=a,A&&!R&&(0===y&&(y=a),(M=Math.min(1,(a-y)/Math.max(180,n)))>=1&&(R=!0));let o=P>N?16:9;N+=(P-N)*Math.min(1,r*o),.003>Math.abs(P-N)&&(N=P),D(),A&&!R||N>.003||P>0?C=window.requestAnimationFrame(t):w=!1};C=window.requestAnimationFrame(t)};S(),u?(M=1,A=!0,R=!0,D()):e&&(E=window.setTimeout(()=>{A=!0,y=0,F()},a));let j=e=>{if("touch"===e.pointerType||m||!R)return;let t=r.getBoundingClientRect(),a=(e.clientX-t.left)*p,o=(e.clientY-t.top)*p;k=(a-v)/Math.max(1,f)-.5,T=(o-g)/Math.max(1,x)-.5,P=1,F()},I=()=>{P=0,R&&F()};r.addEventListener("pointermove",j,{passive:!0}),r.addEventListener("pointerleave",I,{passive:!0});let B=new ResizeObserver(()=>{S(),(R||u||M>0)&&D()});B.observe(r);let _=!1;return document.fonts?.ready.then(()=>{!_&&(S(),(R||u||M>0)&&D())}).catch(()=>{}),()=>{_=!0,window.clearTimeout(E),window.cancelAnimationFrame(C),r.removeEventListener("pointermove",j),r.removeEventListener("pointerleave",I),B.disconnect()}},[e,t,a,n]),(0,r.jsxs)("span",{ref:l,className:`relative mx-auto block h-[86px] w-[336px] max-w-full cursor-default select-none sm:h-[126px] sm:w-[560px] ${i}`,children:[(0,r.jsx)("span",{ref:c,"aria-hidden":"true",className:"pointer-events-none sr-only font-mono",children:"T"}),(0,r.jsx)("span",{className:"sr-only",children:"Minus"}),(0,r.jsx)("canvas",{ref:s,"aria-hidden":"true",className:"block h-full w-full"})]})}let Q={HOODIE:{CROPPED:{chest:'23.0"',length:'25.5"',shoulder:'21.5"',weight:"480 GSM FLEECE"},REGULAR:{chest:'24.0"',length:'27.5"',shoulder:'22.0"',weight:"480 GSM FLEECE"},OVERSIZED:{chest:'26.5"',length:'29.0"',shoulder:'24.0"',weight:"480 GSM FLEECE"}},"BOXY TEE":{CROPPED:{chest:'22.5"',length:'25.0"',shoulder:'20.5"',weight:"285 GSM JERSEY"},REGULAR:{chest:'23.5"',length:'27.0"',shoulder:'21.5"',weight:"285 GSM JERSEY"},OVERSIZED:{chest:'25.5"',length:'28.5"',shoulder:'23.0"',weight:"285 GSM JERSEY"}},"WORK JACKET":{CROPPED:{chest:'23.5"',length:'24.5"',shoulder:'20.0"',weight:"14 OZ DUCK CANVAS"},REGULAR:{chest:'24.5"',length:'26.5"',shoulder:'21.0"',weight:"14 OZ DUCK CANVAS"},OVERSIZED:{chest:'26.5"',length:'28.0"',shoulder:'22.5"',weight:"14 OZ DUCK CANVAS"}}},ee=["01 \xb7 LIVE CLOCK","02 \xb7 GARMENT FIT","03 \xb7 DIRECT LOYALTY","04 \xb7 NATIVE TRACKING"],et=["HOODIE","BOXY TEE","WORK JACKET"],ea=["CROPPED","REGULAR","OVERSIZED"],er=[" ","^","-","t","+","=","T","*"];function eo(e){return e<0?0:e>1?1:e}function en(e,t,a,r,o,n){let i=(e+.5)/44*2-1,l=(t+.5)/22*2-1,s=Math.abs(i),c="OVERSIZED"===r?1.15:"CROPPED"===r?.96:1.04,m="OVERSIZED"===r?.8:"CROPPED"===r?.54:.68,u=("BOXY TEE"===a?.44:.42)*c,h="HOODIE"===a?-.44:-.54,d=!1,p=0,f=1;if("HOODIE"===a){let e=s/(.28*c),t=(l+.62)/.25;if(l>=-.88&&l<=-.42&&e*e+t*t<=1.05&&!(l>=-.74&&l<=-.45&&s<.12&&(l+.6)/.16<.9)&&(d=!0,f=Math.min(f,1.05-(e*e+t*t)),s<.16&&l>-.76&&l<-.44&&(p=Math.max(p,.85))),l>=h&&l<=m&&s<=u){if(d=!0,f=Math.min(f,u-s,m-l,l-h+.12),l>-.42&&l<-.05&&.032>Math.abs(s-.085)&&(p=Math.max(p,.95)),l>=.18&&l<=.48&&s<=.68*u){let e=.055>Math.abs(l-.18),t=l>.18&&.05>Math.abs(s-(.56*u+(l-.18)*.28));(e||t)&&(p=Math.max(p,.82))}m-l<.085&&(p=Math.max(p,.78))}let a=eo((l-(h+.02))/(m-.08-h));if(l>=h+.02&&l<=m-.06){let e=u-.02+.14*a,t=u+.23*c+.12*Math.sin(a*Math.PI*.65);s>=e&&s<=t&&(d=!0,f=Math.min(f,t-s,s-e,m-.06-l),m-.06-l<.085&&(p=Math.max(p,.82)))}}else if("BOXY TEE"===a){let e=l<-.4&&s<.18&&(s/.18)**2+((l+.54)/.15)**2<1,t=!e&&l>=-.56&&l<=-.34&&.26>Math.abs((s/.2)**2+((l+.54)/.17)**2-1);l>=h&&l<=m&&s<=u&&!e&&(d=!0,f=Math.min(f,u-s,m-l,l-h),t&&(p=Math.max(p,.95)),m-l<.075&&(p=Math.max(p,.75)));let a=h+.54;if(l>=h+.02&&l<=a){let e=eo((l-h)/.54),t=u+.24*c+.14*e;s>=u-.02+.06*e&&s<=t&&(d=!0,f=Math.min(f,t-s,a-l,l-h),a-l<.075&&(p=Math.max(p,.75)))}}else{l>=-.68&&l<=-.46&&s>=.08&&s<=.25&&l>=-.68+(s-.08)*.7&&(d=!0,p=Math.max(p,.92),f=.12),l>=h&&l<=m&&s<=u&&!(l<-.44&&s<.14&&l<-.54+(.14-s)*.85)&&(d=!0,f=Math.min(f,u-s,m-l,l-h),s<.048&&(p=Math.max(p,.95)),l>=-.18&&l<=.08&&s>=.13&&s<=.74*u&&(.05>Math.abs(l+.18)||.05>Math.abs(l-.08)||.045>Math.abs(s-.13)||.045>Math.abs(s-.74*u))&&(p=Math.max(p,.85)),m-l<.08&&(p=Math.max(p,.8)));let e=m-.03;if(l>=h+.01&&l<=e){let t=eo((l-h)/(e-h)),a=u-.01+.13*t,r=u+.21*c+.13*t;s>=a&&s<=r&&(d=!0,f=Math.min(f,r-s,s-a,e-l),e-l<.085&&(p=Math.max(p,.86)))}}if(o){if(.048>Math.abs(l- -.02)&&s<=u+.03){let e=.055>Math.abs(s-u),t=.5+.5*Math.sin(3.2*n-6*s);return{idx:e?7:t>.72?6:5,tone:e?3:2}}if(.035>Math.abs(i-(u+.38))&&l>=h&&l<=m){let e=.055>Math.abs(l-h)||.055>Math.abs(l-m);return{idx:e?7:4,tone:e?3:2}}let e=u+.14;if(.048>Math.abs(l-("HOODIE"===a?-.92:-.78))&&s<=e+.03){let t=.055>Math.abs(s-e);return{idx:t?7:2,tone:t?3:2}}}if(!d)return{idx:0,tone:0};let x=.5+.28*Math.cos(5.2*i+.6*Math.sin(2.4*l)+.55*n)+.22*Math.cos(3.1*l-1.4*i),v=eo(1-6.5*f),g=eo(.32+.42*x+.42*p-.24*v);return p>.75?{idx:p>.9?6:5,tone:o?1:2}:v>.68?{idx:g>.4?2:1,tone:0}:g>.76?{idx:6,tone:o?1:3}:g>.56?{idx:5,tone:1}:g>.38?{idx:4,tone:1}:{idx:3,tone:0}}function ei({activeChapter:e,className:t=""}){let[a,n]=(0,o.useState)("HOODIE"),[i,l]=(0,o.useState)("REGULAR"),[s,c]=(0,o.useState)(252),m=(0,o.useRef)(null),u=(0,o.useRef)(null),h=(0,o.useRef)(null),d=(0,o.useRef)(e),p=(0,o.useRef)(a),f=(0,o.useRef)(i),x=(0,o.useRef)(0);(0,o.useEffect)(()=>{d.current=e,p.current=a,f.current=i,x.current=performance.now()},[e,a,i]),(0,o.useEffect)(()=>{let e=window.setInterval(()=>{c(e=>e<=1?299:e-1)},1e3);return()=>window.clearInterval(e)},[]);let v=(0,o.useMemo)(()=>{let e=Math.floor(s/60),t=s%60;return`T-00:${String(e).padStart(2,"0")}:${String(t).padStart(2,"0")}`},[s]),g=Q[a][i];(0,o.useEffect)(()=>{let e=m.current,t=u.current;if(!e||!t)return;let a=t.getContext("2d");if(!a)return;let r=window.matchMedia("(prefers-reduced-motion: reduce)").matches,o=420,n=264,i=2,l=18,s=22,c=0,v=0,g="ui-monospace, SFMono-Regular, Menlo, monospace",b=-99,C=-99,E=0,w=0,y=!0,M=0,A=()=>{let a=e.getBoundingClientRect();o=Math.max(1,Math.round(a.width)),n=Math.max(1,Math.round(a.height));let r=o<420;i=Math.min(Math.max(window.devicePixelRatio||1,1),r?3:2.5),t.width=Math.max(1,Math.round(o*i)),t.height=Math.max(1,Math.round(n*i)),l=Math.max(5,Math.floor(t.width/44)),s=Math.max(8,Math.floor(t.height/22)),c=Math.floor((t.width-44*l)*.5),v=Math.floor((t.height-22*s)*.5),h.current&&(g=window.getComputedStyle(h.current).fontFamily)};A();let R=performance.now(),k=e=>{if(M=window.requestAnimationFrame(k),document.hidden||!y){R=e;return}let o=Math.min(.05,Math.max(.001,(e-R)*.001));R=e,((e,o)=>{let n=r?0:.001*e,i=d.current,m=p.current,u=f.current,h=eo((r?1e3:e-x.current)/380),y=w>E?15:8.5;E+=(w-E)*Math.min(1,o*y),.003>Math.abs(w-E)&&(E=w),a.setTransform(1,0,0,1,0,0),a.clearRect(0,0,t.width,t.height);let M=Math.max(9,Math.round(.88*s)),A=`500 ${M}px ${g}`,R=`700 ${M}px ${g}`;a.textAlign="center",a.textBaseline="middle";for(let e=0;e<22;e++)for(let t=0;t<44;t++){let r,o=(r=0===i?en(t,e,m,u,!1,n):1===i?en(t,e,m,u,!0,n):2===i?function(e,t,a){let r=(e+.5)/44*2-1,o=((t+.5)/22*2-1)*.92,n=Math.hypot(1.08*r,o),i=Math.atan2(o,1.08*r);if(n<.14)return{idx:n<.07?7:6,tone:n<.07?3:2};let l=[{rad:.34,speed:.95,nodes:3,baseIdx:6,tone:2},{rad:.59,speed:-.62,nodes:4,baseIdx:5,tone:1},{rad:.84,speed:.38,nodes:6,baseIdx:3,tone:0}];for(let e=0;e<l.length;e++){let t=l[e],r=Math.abs(n-t.rad);if(r<.068){if(Math.pow(.5+.5*Math.cos(i*t.nodes-a*t.speed*t.nodes),8)>.58)return{idx:7,tone:3};if(.5+.5*Math.cos(i*(3*t.nodes)-a*t.speed*2)<.24)return{idx:0,tone:0};return{idx:r<.032?t.baseIdx:Math.max(1,t.baseIdx-2),tone:r<.032?t.tone:0}}}return{idx:0,tone:0}}(t,e,n):function(e,t,a){let r=(e+.5)/44,o=(t+.5)/22,n=(r-.1)/.8,i=n>=-.02&&n<=1.02,l=.66-.38*Math.sin(eo(n)*Math.PI),s=[{x:.1,y:.66},{x:.5,y:.28},{x:.9,y:.66}];for(let e=0;e<s.length;e++){let t=s[e],a=Math.hypot((r-t.x)*1.4,o-t.y);if(a<.055)return{idx:7,tone:3};if(a<.105)return{idx:4,tone:2}}let c=.26*a%1,m=.66-.38*Math.sin(c*Math.PI);if(.065>Math.hypot((r-(.1+.8*c))*1.4,o-m))return{idx:7,tone:3};if(i&&.045>Math.abs(o-l)){let e=n<=c;return Math.exp(-(11*Math.abs(n-c)))>.35?{idx:6,tone:2}:{idx:e?5:2,tone:e?2:1}}return .028>Math.abs(o-.78)&&r>=.08&&r<=.92?{idx:e%3==0?1:2,tone:0}:{idx:0,tone:0}}(t,e,n)).idx,d=r.tone;if(h<1&&o>0){let a=eo((1.45*h-.45*(1.1*Math.abs(t/44-.5)+e/22*.4))/.55);if(a<=.02)continue;a<.92&&(o=Math.max(1,Math.min(7,Math.floor(7*a))),d=a>.72?2:1)}if(0===o)continue;let p=!1;if(E>.005){let a=Math.hypot(t-b,(e-C)*1.25);if(a<4.4){let e=Math.pow(1-a/4.4,1.65)*E;e>.16&&(o=Math.min(7,o+(e>.58?2:1)),d=e>.55?3:2,p=!0)}}let f=c+t*l+Math.floor(.5*l),x=v+e*s+Math.floor(.52*s);a.font=d>=2||p?R:A,a.fillStyle=3===d?"#F7FAFF":2===d?"#97DFFC":1===d?"#858AE3":"#613DC1",a.globalAlpha=d>=2?1:1===d?.9:.74,a.fillText(er[o],f,x)}a.globalAlpha=1})(e,o)};M=window.requestAnimationFrame(k);let T=t=>{if("touch"===t.pointerType||r)return;let a=e.getBoundingClientRect();b=((t.clientX-a.left)*i-c)/Math.max(1,l)-.5,C=((t.clientY-a.top)*i-v)/Math.max(1,s)-.5,w=1},N=()=>{w=0};e.addEventListener("pointermove",T,{passive:!0}),e.addEventListener("pointerleave",N,{passive:!0});let P=new ResizeObserver(()=>A());P.observe(e);let S="u">typeof IntersectionObserver?new IntersectionObserver(e=>{y=e[0]?.isIntersecting??!0},{threshold:.01}):null;S?.observe(e);let D=!1;return document.fonts?.ready.then(()=>{D||A()}).catch(()=>{}),()=>{D=!0,window.cancelAnimationFrame(M),e.removeEventListener("pointermove",T),e.removeEventListener("pointerleave",N),P.disconnect(),S?.disconnect()}},[]);let b=0===e||1===e;return(0,r.jsxs)("div",{"data-specimen":"true",className:`relative overflow-hidden rounded-[8px] border border-[#858AE3]/22 bg-[#06040B] ${t}`,children:[(0,r.jsx)("span",{ref:h,"aria-hidden":"true",className:"pointer-events-none sr-only font-mono",children:"T"}),(0,r.jsxs)("div",{className:"flex items-center justify-between border-b border-[#858AE3]/16 px-4 py-3 font-mono text-[10px] tracking-[0.16em] uppercase sm:px-5 sm:text-[10.5px]",children:[(0,r.jsxs)("span",{className:"text-[#858AE3]/85",children:[(0,r.jsx)("span",{className:"text-[#97DFFC]",children:"+"})," PROTOTYPE SPECIMEN \xb7 ARCHIVE 001"]}),(0,r.jsx)("span",{className:"text-[#97DFFC]",children:ee[e]})]}),(0,r.jsxs)("div",{ref:m,className:"relative h-[238px] w-full bg-[#040206] sm:h-[296px]",children:[(0,r.jsx)("canvas",{ref:u,"aria-label":`Interactive pure-ASCII drop preview for ${ee[e]}`,className:"block h-full w-full"}),2===e?(0,r.jsxs)("div",{className:"pointer-events-none absolute inset-x-4 bottom-3 flex items-center justify-between font-mono text-[9.5px] tracking-[0.16em] text-[#858AE3]/85 uppercase sm:inset-x-5",children:[(0,r.jsx)("span",{children:"TIER I \xb7 EARLY WINDOW"}),(0,r.jsx)("span",{className:"text-[#97DFFC]",children:"TIER III \xb7 FREE SHIPPING"})]}):3===e?(0,r.jsxs)("div",{className:"pointer-events-none absolute inset-x-4 bottom-3 flex items-center justify-between font-mono text-[9.5px] tracking-[0.16em] text-[#858AE3]/85 uppercase sm:inset-x-5",children:[(0,r.jsx)("span",{children:"CONFIRMED"}),(0,r.jsx)("span",{className:"text-[#97DFFC]",children:"IN TRANSIT"}),(0,r.jsx)("span",{children:"DOORSTEP"})]}):null]}),(0,r.jsx)("div",{className:"border-t border-[#858AE3]/16 bg-[#07050D] px-4 py-3.5 sm:px-5 sm:py-4",children:b?(0,r.jsxs)("div",{className:"space-y-3",children:[(0,r.jsxs)("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[(0,r.jsx)("div",{role:"radiogroup","aria-label":"Garment silhouette",className:"flex flex-wrap items-center gap-1",children:et.map(e=>{let t=a===e;return(0,r.jsx)("button",{type:"button",role:"radio","aria-checked":t,onClick:()=>n(e),className:`cursor-pointer rounded-[4px] border px-2 py-1 font-mono text-[9.5px] tracking-[0.12em] uppercase transition-colors sm:px-2.5 sm:text-[10px] ${t?"border-[#97DFFC]/80 bg-[#613DC1]/25 text-[#97DFFC]":"border-[#858AE3]/20 bg-[#040206] text-[#C4BBE0]/72 hover:border-[#858AE3]/50 hover:text-white"}`,children:e},e)})}),(0,r.jsx)("div",{role:"radiogroup","aria-label":"Garment cut",className:"flex items-center gap-1",children:ea.map(e=>{let t=i===e;return(0,r.jsx)("button",{type:"button",role:"radio","aria-checked":t,onClick:()=>l(e),className:`cursor-pointer rounded-[4px] border px-2 py-1 font-mono text-[9.5px] tracking-[0.11em] uppercase transition-colors sm:text-[10px] ${t?"border-[#858AE3]/80 bg-[#858AE3]/18 text-white":"border-[#858AE3]/16 bg-transparent text-[#858AE3]/75 hover:border-[#858AE3]/45 hover:text-white"}`,children:e},e)})})]}),0===e?(0,r.jsxs)("div",{className:"flex items-center justify-between border-t border-[#858AE3]/14 pt-2.5 font-mono text-[10.5px] tracking-[0.12em] uppercase",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2 text-[#D8D0EA]/85",children:[(0,r.jsx)("span",{className:"text-[#97DFFC]",children:v}),(0,r.jsx)("span",{className:"text-[#858AE3]/55",children:"\xb7"}),(0,r.jsx)("span",{children:"5-MIN CART HOLD"})]}),(0,r.jsx)("span",{className:"text-[#858AE3]/80",children:g.weight})]}):(0,r.jsxs)("div",{"data-fit-readout":"true",className:"grid grid-cols-3 gap-2 border-t border-[#858AE3]/14 pt-2.5 font-mono text-[10px] tracking-[0.12em] uppercase",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("span",{className:"block text-[#858AE3]/72",children:"CHEST"}),(0,r.jsx)("span",{className:"mt-0.5 block text-[12px] font-medium text-[#97DFFC]",children:g.chest})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("span",{className:"block text-[#858AE3]/72",children:"LENGTH"}),(0,r.jsx)("span",{className:"mt-0.5 block text-[12px] font-medium text-white",children:g.length})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("span",{className:"block text-[#858AE3]/72",children:"SHOULDER"}),(0,r.jsx)("span",{className:"mt-0.5 block text-[12px] font-medium text-white",children:g.shoulder})]})]})]}):2===e?(0,r.jsxs)("div",{className:"flex items-center justify-between font-mono text-[10.5px] tracking-[0.12em] uppercase",children:[(0,r.jsx)("span",{className:"text-[#D8D0EA]/85",children:"DIRECT LABEL LOYALTY \xb7 NO PLATFORM MIDDLEMAN"}),(0,r.jsx)("span",{className:"text-[#97DFFC]",children:"3 TIERS"})]}):(0,r.jsxs)("div",{className:"flex items-center justify-between font-mono text-[10.5px] tracking-[0.12em] uppercase",children:[(0,r.jsx)("span",{className:"text-[#D8D0EA]/85",children:"NATIVE ORDER FEED \xb7 LIVE CARRIER SYNC"}),(0,r.jsx)("span",{className:"text-[#97DFFC]",children:"DROP TO DOOR"})]})})]})}let el=[{id:0,index:"01",shortLabel:"01 Clock",title:"Timed drops on a live clock.",body:"Every release opens on a shared countdown built for launch-second demand, so checkout stays steady when a piece goes live instead of disappearing into a feed."},{id:1,index:"02",shortLabel:"02 Fit",title:"Sizing matched to real garment measurements.",body:"Fit guidance built from each piece's actual flat specs and cut, so you pick the right size with confidence before a small run sells through."},{id:2,index:"03",shortLabel:"03 Loyalty",title:"Direct loyalty with the labels you wear.",body:"Collect pieces from independent brands to unlock tier status, early drop windows, and free shipping tied directly to that label."},{id:3,index:"04",shortLabel:"04 Track",title:"Native drop-to-door tracking.",body:"Follow every order from confirmation to doorstep inside T^minus, without digging through inbox threads or scattered carrier links."}];function es(e,t,a){let r=Math.min(1,Math.max(0,(a-e)/(t-e)));return r*r*(3-2*r)}function ec({skipIntro:e=!1}){let[t,a]=(0,o.useState)(e),[n,i]=(0,o.useState)(e),[l,s]=(0,o.useState)(null),[c,m]=(0,o.useState)(0),[h,f]=(0,o.useState)(null),x=(0,o.useRef)(null),v=(0,o.useRef)(null),g=(0,o.useRef)(null),b=(0,o.useRef)(null),C=(0,o.useRef)(null),E=(0,o.useRef)(null),w=(0,o.useRef)(null),y=(0,o.useRef)([]),M=(0,o.useRef)(0);(0,o.useEffect)(()=>{try{let e=new URLSearchParams(window.location.search);"1"===e.get("skipIntro")&&(a(!0),i(!0))}catch{}},[]),(0,o.useEffect)(()=>{let e=document.documentElement.style.backgroundColor,t=document.body.style.backgroundColor;return document.documentElement.style.backgroundColor="#040206",document.body.style.backgroundColor="#040206",()=>{document.documentElement.style.backgroundColor=e,document.body.style.backgroundColor=t}},[]),(0,o.useEffect)(()=>{if(!l)return;let e=e=>{"Escape"===e.key&&s(null)};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[l]),(0,o.useEffect)(()=>{if("u"<typeof IntersectionObserver)return;let e=new IntersectionObserver(e=>{if(window.innerWidth<768||performance.now()<M.current)return;let t=null,a=0;for(let r of e)if(r.isIntersecting&&r.intersectionRatio>a){let e=r.target.getAttribute("data-chapter-id"),o=null!==e?Number(e):NaN;o>=0&&o<=3&&(t=o,a=r.intersectionRatio)}null!==t&&m(t)},{rootMargin:"-30% 0px -42% 0px",threshold:[.2,.5,.8]});for(let t of y.current)t&&e.observe(t);return()=>e.disconnect()},[]);let A=(0,o.useCallback)(e=>{M.current=performance.now()+1800,m(e)},[]),R=(0,o.useCallback)(e=>{let t=b.current;t&&(t.style.opacity=e.heroResolved?"1":"0",t.style.transform=`translate3d(-50%, ${e.countdownCenterY.toFixed(1)}px, 0) translateY(-50%)`);let a=C.current;if(a){let t=1-es(.18,.48,e.polarFactor);a.style.opacity=t.toFixed(4),a.style.transform=`scale(${e.countdownScale.toFixed(4)})`}let r=E.current;if(r){let t=es(.32,.68,e.polarFactor),a=e.viewportW<640,o=Math.min(1,Math.max(.55,Math.min(e.polarDiameterPx*(a?.75:.82)/(a?264:410),e.polarDiameterPx*(a?.72:.78)/(a?172:260)))),n=.86+.14*es(.28,.74,e.polarFactor);r.style.opacity=t.toFixed(4),r.style.transform=`translate(-50%, -50%) scale(${(o*n).toFixed(4)})`}let o=g.current;if(o){let t=es(.015,.22,e.pinProgress);o.style.opacity=(1-t).toFixed(4),o.style.transform=`translate3d(0, ${(-(34*t)).toFixed(1)}px, 0)`,o.style.pointerEvents=e.pinProgress>.14?"none":"auto"}let n=w.current;if(n){let t=es(.62,.84,e.pinProgress);if(n.style.opacity=t.toFixed(4),t>.002&&e.domeRadiusPx>10){let t=e.viewportW<640,a=e.domeCenterX.toFixed(1),r=e.domeCenterY.toFixed(1),o=(e.domeRadiusPx+(t?58:48)).toFixed(1),i=(e.domeRadiusPx+(t?94:84)).toFixed(1),l=(e.domeRadiusPx+(t?148:134)).toFixed(1),s=Math.max(0,e.domeEdgeY+(t?68:46)).toFixed(1),c=Math.max(68,e.domeEdgeY+(t?138:122)).toFixed(1);n.style.backgroundImage=`radial-gradient(circle at ${a}px ${r}px, #040206 0px, #040206 ${o}px, rgba(4, 2, 6, 0.94) ${i}px, rgba(4, 2, 6, 0) ${l}px), linear-gradient(180deg, #040206 0px, #040206 ${s}px, rgba(4, 2, 6, 0) ${c}px)`}else n.style.backgroundImage="none"}},[]),k=(0,o.useCallback)(e=>{e&&f(t=>({role:e,seq:(t?.seq??0)+1})),window.scrollTo({top:0,behavior:"smooth"}),window.setTimeout(()=>{x.current?.focus({preventScroll:!0})},650)},[]),T=el[c];return(0,r.jsxs)("div",{className:"relative min-h-[100dvh] w-full overflow-x-clip bg-[#040206] font-sans text-white selection:bg-[#613DC1]/55 selection:text-white",children:[(0,r.jsx)(D,{onHeroReveal:i,onHorizonSync:R,runwayRef:v,skipIntro:t}),(0,r.jsx)("div",{ref:w,"aria-hidden":"true",style:{opacity:0},className:"pointer-events-none fixed inset-0 z-20 will-change-[opacity]"}),(0,r.jsxs)("header",{className:`pointer-events-none fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-start px-5 transition-opacity duration-800 ease-out sm:h-20 sm:px-10 ${n?"opacity-100 delay-[720ms]":"opacity-0"}`,style:t?{transitionDelay:"0ms"}:void 0,children:[(0,r.jsx)("div",{"aria-hidden":"true",className:"pointer-events-none absolute top-0 left-0 h-24 w-56 sm:h-28 sm:w-72",style:{background:"radial-gradient(ellipse 95% 88% at 0% 0%, rgba(4, 2, 6, 0.92) 0%, rgba(4, 2, 6, 0.64) 48%, rgba(4, 2, 6, 0) 100%)"}}),(0,r.jsx)("a",{href:"#top",onClick:e=>{e.preventDefault(),window.scrollTo({top:0,behavior:"smooth"})},className:"pointer-events-auto relative z-10 text-white transition-opacity hover:opacity-85 focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:outline-none",children:(0,r.jsx)(p,{className:"[--wm-scale:1.05] sm:[--wm-scale:1.42]"})})]}),(0,r.jsx)("div",{ref:b,style:{opacity:+!!t,transform:"translate3d(-50%, calc(100dvh - 108px), 0) translateY(-50%)"},className:"pointer-events-none fixed top-0 left-1/2 z-40 transition-opacity duration-300 ease-out will-change-transform",children:(0,r.jsx)(I,{stripRef:C,polarRef:E})}),(0,r.jsxs)("main",{id:"top",className:"relative z-10 w-full",children:[(0,r.jsx)("div",{ref:v,className:"relative h-[255dvh] w-full sm:h-[305dvh]",children:(0,r.jsx)("section",{className:`sticky top-0 flex h-[100dvh] w-full flex-col items-center justify-center px-5 pt-12 pb-[27dvh] transition-opacity duration-500 ease-out sm:px-8 sm:pt-14 sm:pb-[27vh] ${n?"opacity-100":"pointer-events-none opacity-0"}`,children:(0,r.jsxs)("div",{ref:g,className:"flex w-full max-w-[660px] flex-col items-center text-center will-change-transform",children:[(0,r.jsxs)("h1",{className:"flex w-full flex-col items-center",children:[(0,r.jsx)("span",{style:{fontSize:"clamp(1.75rem, 3.1vw, 2.75rem)"},className:"block font-sans leading-[0.98] font-medium tracking-[-0.035em] text-white",children:(0,r.jsx)($,{text:"Fashion.",active:n,instant:t,origin:"center",delayMs:120,durationMs:520})}),(0,r.jsx)(Z,{active:n,instant:t,delayMs:200,durationMs:680,className:"my-2 sm:my-2.5"}),(0,r.jsx)("span",{style:{fontSize:"clamp(1.75rem, 3.1vw, 2.75rem)"},className:"block font-sans leading-[1.02] font-medium tracking-[-0.035em] text-[#E2DCF0]",children:(0,r.jsx)($,{text:"the Noise.",active:n,instant:t,origin:"left",delayMs:360,durationMs:560})})]}),(0,r.jsxs)("p",{className:"mt-3 max-w-[330px] font-sans text-[14px] leading-[1.5] font-normal text-[#D4CCE8]/84 sm:mt-4 sm:max-w-[460px] sm:text-[16px] sm:leading-[1.55]",children:[(0,r.jsx)($,{text:"The best clothes in the world rarely have the loudest ",active:n,instant:t,delayMs:540,durationMs:640,glyphClassName:"text-[#613DC1]"}),(0,r.jsx)("span",{className:"font-medium text-[#97DFFC]",children:(0,r.jsx)($,{text:"voice",active:n,instant:t,delayMs:860,durationMs:340,glyphClassName:"text-[#97DFFC]"})}),(0,r.jsx)($,{text:".",active:n,instant:t,delayMs:960,durationMs:140,glyphClassName:"text-[#858AE3]"})]}),(0,r.jsx)("div",{className:`mt-5 w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:mt-6 ${n?"translate-y-0 opacity-100 delay-[680ms]":"translate-y-2 opacity-0"}`,style:t?{transitionDelay:"0ms"}:void 0,children:(0,r.jsx)(G,{inputRef:x,onOpenLegal:s,requestedRole:h})})]})})}),(0,r.jsxs)("div",{className:"relative mx-auto w-full max-w-[1040px] px-5 pt-28 sm:px-10 sm:pt-36",children:[(0,r.jsxs)("section",{"data-band":"premise",className:"pb-16 sm:pb-24",children:[(0,r.jsxs)("p",{className:"font-mono text-[10.5px] font-normal tracking-[0.18em] text-[#858AE3] uppercase sm:text-[11px]",children:[(0,r.jsx)("span",{className:"text-[#97DFFC]",children:"+"})," ",(0,r.jsx)(V,{text:"PREMISE",tier:"telemetry",instant:t})]}),(0,r.jsx)("h2",{style:{fontSize:"clamp(2rem, 4.4vw, 3.45rem)"},className:"mt-5 max-w-[19ch] font-sans leading-[1.05] font-medium tracking-[-0.035em] text-white",children:(0,r.jsx)(V,{text:"Great independent labels shouldn't have to buy attention to be found.",tier:"headline",instant:t})}),(0,r.jsx)("div",{className:"mt-8 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-12 md:gap-10",children:(0,r.jsx)("div",{className:"md:col-span-5 md:col-start-7",children:(0,r.jsx)(V,{tier:"prose",instant:t,delayMs:120,children:(0,r.jsx)("p",{className:"font-sans text-[15.5px] leading-[1.7] font-normal text-[#DCD4EE]/84 sm:text-[16px]",children:"Small clothing brands put months into fabric, cut, and finish, only to disappear under paid feeds. T^minus gives independent labels a dedicated home built around scheduled releases, so buyers discover pieces for the garment itself."})})})}),(0,r.jsx)("div",{className:"mt-14 sm:mt-20",children:(0,r.jsx)(X,{instant:t})})]}),(0,r.jsxs)("section",{"data-band":"anatomy",className:"pb-20 sm:pb-28",children:[(0,r.jsxs)("div",{className:"mb-8 flex items-center justify-between font-mono text-[10.5px] tracking-[0.18em] text-[#858AE3] uppercase sm:mb-12 sm:text-[11px]",children:[(0,r.jsxs)("span",{children:[(0,r.jsx)("span",{className:"text-[#97DFFC]",children:"+"})," ",(0,r.jsx)(V,{text:"ANATOMY OF A DROP",tier:"telemetry",instant:t})]}),(0,r.jsx)("span",{className:"text-[#858AE3]/72",children:"01 — 04"})]}),(0,r.jsxs)("div",{className:"grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-12 lg:gap-16",children:[(0,r.jsx)("div",{role:"tablist","aria-label":"Anatomy of a drop chapters",className:"grid grid-cols-4 gap-1.5 md:hidden",children:el.map(e=>{let t=c===e.id;return(0,r.jsx)("button",{type:"button",role:"tab","aria-selected":t,onClick:()=>A(e.id),className:`cursor-pointer rounded-[5px] border px-2 py-2 text-center font-mono text-[10px] tracking-[0.08em] uppercase transition-colors ${t?"border-[#97DFFC]/75 bg-[#613DC1]/25 text-[#97DFFC]":"border-[#858AE3]/20 bg-[#06040B] text-[#C4BBE0]/72"}`,children:e.shortLabel},e.index)})}),(0,r.jsx)("div",{className:"hidden flex-col md:col-span-6 md:flex",children:el.map((e,t)=>{let a=c===e.id;return(0,r.jsxs)("button",{ref:e=>{y.current[t]=e},"data-chapter-id":e.id,type:"button",onClick:()=>A(e.id),onMouseEnter:()=>A(e.id),className:`group relative cursor-pointer border-l py-8 pl-7 text-left transition-colors duration-200 focus-visible:outline-none ${a?"border-[#97DFFC]":"border-[#858AE3]/18 hover:border-[#858AE3]/55"}`,children:[(0,r.jsx)("span",{className:`font-mono text-[12px] tracking-[0.18em] transition-colors ${a?"text-[#97DFFC]":"text-[#858AE3]/65 group-hover:text-[#858AE3]"}`,children:e.index}),(0,r.jsx)("h3",{className:`mt-2.5 font-sans text-[24px] leading-[1.18] font-medium tracking-[-0.028em] transition-colors lg:text-[26px] ${a?"text-white":"text-white/62 group-hover:text-white/90"}`,children:e.title}),(0,r.jsx)("p",{className:`mt-3 max-w-[40ch] font-sans text-[15px] leading-[1.66] transition-colors ${a?"text-[#D4CCE8]/86":"text-[#D4CCE8]/48 group-hover:text-[#D4CCE8]/72"}`,children:e.body})]},e.index)})}),(0,r.jsx)("div",{className:"md:col-span-6",children:(0,r.jsx)("div",{className:"md:sticky md:top-[192px]",children:(0,r.jsx)(ei,{activeChapter:c})})}),(0,r.jsxs)("div",{className:"border-l border-[#97DFFC]/55 pl-4 md:hidden",children:[(0,r.jsx)("span",{className:"font-mono text-[11px] tracking-[0.16em] text-[#97DFFC]",children:T.index}),(0,r.jsx)("h3",{className:"mt-1.5 font-sans text-[21px] leading-[1.2] font-medium tracking-[-0.025em] text-white",children:T.title}),(0,r.jsx)("p",{className:"mt-2 font-sans text-[14.5px] leading-[1.64] text-[#D0C8E4]/82",children:T.body})]})]})]}),(0,r.jsxs)("section",{"data-band":"audience",className:"pb-20 sm:pb-28",children:[(0,r.jsx)(X,{instant:t,className:"mb-12 sm:mb-16"}),(0,r.jsxs)("div",{className:"grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-[#858AE3]/18",children:[(0,r.jsxs)("div",{className:"flex flex-col justify-between md:pr-12 lg:pr-16",children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("p",{className:"font-mono text-[10.5px] tracking-[0.18em] text-[#858AE3] uppercase sm:text-[11px]",children:[(0,r.jsx)("span",{className:"text-[#97DFFC]",children:"+"})," ",(0,r.jsx)(V,{text:"FOR SHOPPERS",tier:"telemetry",instant:t})]}),(0,r.jsx)("h3",{className:"mt-4 font-sans text-[25px] leading-[1.14] font-medium tracking-[-0.03em] text-white sm:text-[29px]",children:(0,r.jsx)(V,{text:"Find drops worth waiting for.",tier:"headline",instant:t})}),(0,r.jsx)(V,{tier:"prose",instant:t,delayMs:100,children:(0,r.jsx)("p",{className:"mt-4 max-w-[40ch] font-sans text-[15px] leading-[1.68] text-[#D4CCE8]/82",children:"Discover independent releases on a live clock, check true garment measurements before launch, and get first access without scrolling past ads to find something real."})})]}),(0,r.jsxs)("button",{type:"button",onClick:()=>k("SHOPPER"),className:"mt-7 inline-flex w-fit cursor-pointer items-center gap-2 font-mono text-[11.5px] tracking-[0.14em] text-[#97DFFC] uppercase transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:outline-none",children:[(0,r.jsx)("span",{children:"Join as a shopper"}),(0,r.jsx)(u,{className:"size-3.5"})]})]}),(0,r.jsxs)("div",{className:"flex flex-col justify-between border-t border-[#858AE3]/16 pt-10 md:border-t-0 md:pt-0 md:pl-12 lg:pl-16",children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("p",{className:"font-mono text-[10.5px] tracking-[0.18em] text-[#858AE3] uppercase sm:text-[11px]",children:[(0,r.jsx)("span",{className:"text-[#97DFFC]",children:"+"})," ",(0,r.jsx)(V,{text:"FOR INDEPENDENT LABELS",tier:"telemetry",instant:t})]}),(0,r.jsx)("h3",{className:"mt-4 font-sans text-[25px] leading-[1.14] font-medium tracking-[-0.03em] text-white sm:text-[29px]",children:(0,r.jsx)(V,{text:"Launch on your own clock.",tier:"headline",instant:t})}),(0,r.jsx)(V,{tier:"prose",instant:t,delayMs:100,children:(0,r.jsx)("p",{className:"mt-4 max-w-[40ch] font-sans text-[15px] leading-[1.68] text-[#D4CCE8]/82",children:"Keep your own identity, story, and pricing. Turn every collection into a scheduled release event and build direct repeat buyers without paying ad platforms to reach them."})})]}),(0,r.jsxs)("button",{type:"button",onClick:()=>k("BRAND"),className:"mt-7 inline-flex w-fit cursor-pointer items-center gap-2 font-mono text-[11.5px] tracking-[0.14em] text-[#97DFFC] uppercase transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:outline-none",children:[(0,r.jsx)("span",{children:"Apply as a brand"}),(0,r.jsx)(u,{className:"size-3.5"})]})]})]})]}),(0,r.jsxs)("section",{"data-band":"closing",className:"relative pt-4 pb-12 sm:pb-16",children:[(0,r.jsx)(X,{variant:"arch",instant:t,className:"mb-10 sm:mb-12"}),(0,r.jsxs)("div",{className:"flex flex-col items-start justify-between gap-7 border-b border-[#858AE3]/18 pb-12 sm:flex-row sm:items-end sm:pb-14",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{className:"font-mono text-[10.5px] tracking-[0.18em] text-[#858AE3] uppercase sm:text-[11px]",children:"APP STORE V1.0 \xb7 JANUARY 1, 2027"}),(0,r.jsxs)("h2",{style:{fontSize:"clamp(1.95rem, 4vw, 3.05rem)"},className:"mt-3 font-sans leading-[1.06] font-medium tracking-[-0.035em] text-white",children:[(0,r.jsx)(V,{text:"Be there at ",tier:"headline",instant:t}),(0,r.jsx)("span",{className:"text-[#97DFFC]",children:(0,r.jsx)(V,{text:"T-zero.",tier:"headline",instant:t,delayMs:180})})]})]}),(0,r.jsxs)(z,{type:"button",variant:"primary",onClick:()=>k(),className:"h-11 w-full shrink-0 px-6 text-[13.5px] sm:w-auto",children:[(0,r.jsx)("span",{children:"Get early access"}),(0,r.jsx)(u,{className:"size-3.5"})]})]})]}),(0,r.jsxs)("footer",{className:"flex items-center justify-between py-7 font-mono text-[11px] tracking-[0.1em] text-[#858AE3]/80",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2.5",children:[(0,r.jsx)("button",{type:"button",onClick:()=>s("privacy"),className:"cursor-pointer transition hover:text-white",children:"Privacy"}),(0,r.jsx)("span",{className:"text-[#858AE3]/45",children:"\xb7"}),(0,r.jsx)("button",{type:"button",onClick:()=>s("terms"),className:"cursor-pointer transition hover:text-white",children:"Terms"})]}),(0,r.jsx)("span",{children:"\xa9 2026 T^minus"})]})]})]}),l?(0,r.jsx)("div",{role:"dialog","aria-modal":"true","aria-labelledby":"legal-modal-title",className:"fixed inset-0 z-50 flex items-center justify-center bg-[#040206]/90 px-5",onClick:()=>s(null),children:(0,r.jsxs)("div",{className:"relative w-full max-w-[480px] rounded-[6px] border border-[#858AE3]/24 bg-[#07050D] p-6 text-left sm:p-7",onClick:e=>e.stopPropagation(),children:[(0,r.jsxs)("div",{className:"flex items-start justify-between gap-4",children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("p",{className:"font-mono text-[10px] tracking-[0.16em] text-[#858AE3] uppercase",children:[(0,r.jsx)("span",{className:"text-[#97DFFC]",children:"+"})," LEGAL \xb7"," ","privacy"===l?"PRIVACY":"TERMS"]}),(0,r.jsx)("h2",{id:"legal-modal-title",className:"mt-2 font-sans text-[20px] font-medium tracking-[-0.025em] text-white",children:"privacy"===l?"Privacy Policy":"SMS & Waitlist Terms"})]}),(0,r.jsx)("button",{type:"button",onClick:()=>s(null),"aria-label":"Close",className:"inline-flex size-8 cursor-pointer items-center justify-center rounded-[4px] border border-[#858AE3]/24 bg-[#040206] text-[#D0C7E6] transition hover:border-[#97DFFC]/70 hover:text-white",children:(0,r.jsx)(d,{className:"size-4"})})]}),(0,r.jsx)("div",{className:"mt-4 space-y-3 border-t border-[#858AE3]/16 pt-4 text-[13.5px] leading-[1.64] text-[#D4CCE8]/84",children:"privacy"===l?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{children:"T^minus collects your mobile phone number, your selected waitlist role (shopper or brand), and an optional brand handle solely to notify you about the January 1, 2027 App Store v1.0 launch, early drop access, and brand onboarding."}),(0,r.jsx)("p",{children:"We never sell, rent, or broker your phone number to third parties. You can opt out at any time by replying STOP to any message."})]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{children:"By checking the SMS consent box and joining the T^minus waitlist, you agree to receive occasional launch-day and live drop text alerts at the mobile number provided. Consent is not a condition of purchase."}),(0,r.jsx)("p",{children:"Message and data rates may apply. Reply STOP to opt out at any time or HELP for support."})]})})]})}):null]})}}}]);