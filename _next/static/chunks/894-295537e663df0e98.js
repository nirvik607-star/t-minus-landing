(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[894],{4307:(e,t,a)=>{"use strict";a.d(t,{LandingExperience:()=>Q});var o=a(5155),r=a(2115);let l=(...e)=>{let t=new Set;for(let a of e)if("string"==typeof a)for(let e of a.split(/\s+/))e&&t.add(e);return[...t].join(" ")},i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},n=(0,r.createContext)({}),s=(0,r.forwardRef)(({color:e,size:t,width:a,height:o,strokeWidth:s,absoluteStrokeWidth:c,nonScalingStroke:m,className:u="",children:d,iconNode:h=[],icon:p={node:h,aliases:[],size:24},...f},x)=>{let{size:v=24,strokeWidth:g=2,absoluteStrokeWidth:b=!1,nonScalingStroke:C=!1,color:w="currentColor",className:y=""}=(0,r.useContext)(n)??{},E=!!d||(e=>{if(null==e||"object"!=typeof e)return!1;for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t)&&(t.startsWith("aria-")||"role"===t||"title"===t)&&null!=e[t])return!0;return!1})(f),[A,M,R=[]]=function(e,t={}){return function(e,t={}){let a=t.attributeNames??{},o=e=>a[e]??e,r=e.size??e.width??i.width,n=e.size??e.height??i.height,s=e.aliases?.filter(e=>"string"==typeof e&&""!==e.trim()).map(e=>`lucide-${e}`)??[],c=[...e.name?[`lucide-${e.name}`]:[],...s],m=t.className?.split(" ").filter(Boolean)??[],u=!1===t.includeDefaultClasses?l(...m):l("lucide",...c,...m),d=t.strokeWidth??i["stroke-width"];if(t.absoluteStrokeWidth){let a=Number(d)*Number(e.size??e.width??i.width)/Number(t.size??t.width??i.width);Number.isFinite(a)&&(d=a)}return["svg",{...Object.entries(i).reduce((e,[t,a])=>(e[o(t)]=a,e),{}),..."color"in t&&t.color&&{[o("stroke")]:t.color},..."size"in t&&null!=t.size&&{[o("width")]:t.size,[o("height")]:t.size},..."width"in t&&null!=t.width&&{[o("width")]:t.width},..."height"in t&&null!=t.height&&{[o("height")]:t.height},[o("stroke-width")]:d,...u&&{[o("class")]:u},[o("viewBox")]:`0 0 ${r} ${n}`,...!1===t.hasA11yProp?{[o("aria-hidden")]:"true"}:{},..."attributes"in t&&t.attributes},e.node.map(e=>{let[a,r,l]=e,i=t.nonScalingStroke?{[o("vector-effect")]:"non-scaling-stroke",...r}:r;return l?[a,i,l]:[a,i]})]}(e,{...t,attributeNames:{...t.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}(p,{color:e??w,width:a??t??v,height:o??t??v,strokeWidth:s??g,absoluteStrokeWidth:c??b,nonScalingStroke:m??C,className:l(y,u),hasA11yProp:E,attributes:f});return(0,r.createElement)(A,{ref:x,...M},[...R.map(([e,t])=>(0,r.createElement)(e,t)),...Array.isArray(d)?d:[d]])});function c(e,t=[],a=[]){let o,l="string"==typeof e?function(e,t,a=[]){if(null==t)throw Error("[lucide]: iconNode is required when icon name is used");return{name:(e.match(/\d+[xX]\d+|[A-Z]?[a-z]+|[A-Z]|\d+/g)??[]).join("-").toLowerCase(),size:24,node:t,...a.length>0?{aliases:a}:{}}}(e,t,a):e,i=(0,r.forwardRef)(({className:e,...t},a)=>(0,r.createElement)(s,{ref:a,icon:l,className:e,...t}));return l.name&&(i.displayName=(o=(e=>{let t="",a=!1;for(let o of e){if("-"===o||"_"===o||o<=" "){a=t.length>0;continue}0===t.length?t+=o.toLowerCase():t+=a?o.toUpperCase():o,a=!1}return t})(l.name)).charAt(0).toUpperCase()+o.slice(1)),i}let m={name:"arrow-down-right",size:24,node:[["path",{d:"m7 7 10 10",key:"1fmybs"}],["path",{d:"M17 7v10H7",key:"6fjiku"}]]};m.node;let u=c(m),d={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};d.node;let h=c(d);function p({scale:e,className:t=""}){let a={gap:"calc(1px * var(--wm-scale, 1))",...void 0!==e?{"--wm-scale":String(e)}:{}};return(0,o.jsxs)("span",{"aria-label":"T-minus",className:`inline-flex items-baseline leading-none select-none ${t}`,style:a,children:[(0,o.jsx)("span",{"aria-hidden":"true",className:"font-serif font-medium italic",style:{fontSize:"calc(26px * var(--wm-scale, 1))",lineHeight:1},children:"T"}),(0,o.jsx)("span",{"aria-hidden":"true",className:"font-sans font-medium",style:{fontSize:"calc(15px * var(--wm-scale, 1))",lineHeight:1,letterSpacing:"calc(-0.5px * var(--wm-scale, 1))",transform:"translateY(calc(-3px * var(--wm-scale, 1)))",display:"inline-block"},children:"^minus"})]})}let f=Date.parse("2027-01-01T00:00:00-05:00"),x=" .:-^t+=T*",v=`#version 300 es
precision highp float;
out vec2 vUv;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,g=`#version 300 es
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
}`,b=`#version 300 es
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
}`,C=`#version 300 es
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
}`,w=`#version 300 es
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
}`,y=`#version 300 es
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
}`;function E(e,t,a){let o=e.createShader(t);if(!o)throw Error("Unable to create shader");if(e.shaderSource(o,a),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(o)||"unknown error";throw e.deleteShader(o),Error(`Shader compile error: ${t}`)}return o}function A(e,t){let a=E(e,e.VERTEX_SHADER,v),o=E(e,e.FRAGMENT_SHADER,t),r=e.createProgram();if(!r)throw Error("Unable to create WebGL2 program");if(e.attachShader(r,a),e.attachShader(r,o),e.linkProgram(r),!e.getProgramParameter(r,e.LINK_STATUS)){let t=e.getProgramInfoLog(r)||"unknown error";throw e.deleteProgram(r),Error(`Program link error: ${t}`)}e.deleteShader(a),e.deleteShader(o);let l={},i=e.getProgramParameter(r,e.ACTIVE_UNIFORMS);for(let t=0;t<i;t++){let a=e.getActiveUniform(r,t);a&&(l[a.name]=e.getUniformLocation(r,a.name))}return{prog:r,u:l}}function M(e,t,a,o){let r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,t,a,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);let l=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,l),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),e.bindFramebuffer(e.FRAMEBUFFER,null),{tex:r,fb:l,w:t,h:a}}function R(e,t){t&&(e.deleteFramebuffer(t.fb),e.deleteTexture(t.tex))}function k(e,t,a,o){var r;let l,i,n,s,c,m,u,d,h,p,f,x=Math.min(2048,Math.max(768,Math.round(1.5*a))),v=Math.min(1280,Math.max(512,Math.round(1.5*o))),g=document.createElement("canvas");g.width=x,g.height=v,r=g.getContext("2d"),r.clearRect(0,0,x,v),r.fillStyle="#000000",r.fillRect(0,0,x,v),l=a<768,i=x/Math.max(1,a)*(l?4.2:7.4)/1,n=e=>`italic 500 ${Math.round(26*e)}px "Newsreader", "New York", Georgia, ui-serif, serif`,s=e=>`500 ${Math.round(15*e)}px "Inter Tight", "Inter", -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif`,m=(c=e=>{let t=1.4*e,a=-.35*e;r.font=n(e);let o=r.measureText("T").width;r.font=s(e);let l=["^","m","i","n","u","s"],i=l.map(e=>r.measureText(e).width),c=i.reduce((e,t)=>e+t,0)+a*(l.length-1);return{tWidth:o,chars:l,charWidths:i,gap:t,tracking:a,totalWidth:o+t+c}})(i),m=c(i=x*(l?.76:.56)*i/Math.max(1,m.totalWidth)),u=.5*v+26*i*.34,d=.5*x-.5*m.totalWidth,h=3*i,p=(e,t,a=!1)=>{r.save(),r.fillStyle=e,r.shadowColor=t>0?e:"transparent",r.shadowBlur=t,r.textAlign="left",r.textBaseline="alphabetic";let o=d;a||(r.font=n(i),r.fillText("T",o,u)),o+=m.tWidth+m.gap,r.font=s(i);for(let e=0;e<m.chars.length;e++){let t=m.chars[e],l="^"===t;if(!a||l){let e=u-h;r.fillText(t,o,e)}o+=m.charWidths[e]+m.tracking}r.restore()},f=Math.max(12,Math.round(3.8*i)),r.globalCompositeOperation="lighter",p("rgb(0, 200, 0)",f),p("rgb(255, 0, 0)",0),p("rgb(0, 0, 255)",0,!0),r.globalCompositeOperation="source-over";let b=t??e.createTexture();return e.bindTexture(e.TEXTURE_2D,b),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,g),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),b}function P(e){return e<0?0:e>1?1:e}function T(e,t,a){let o=P((a-e)/(t-e));return o*o*(3-2*o)}function S(e){return e*Math.PI/180}function N(e,t,a,o,r,l,i,n){let s=o.x+i*r*l*t.x+n*l*a.x,c=o.y+i*r*l*t.y+n*l*a.y,m=o.z+i*r*l*t.z+n*l*a.z,u=1/Math.max(1e-6,Math.hypot(s,c,m)),d=s*u,h=c*u,p=m*u,f=-(e.x*d+e.y*h+e.z*p);return f<=0?99:Math.hypot(e.x+f*d,e.y+f*h,e.z+f*p)}function D(e,t,a,o,r,l,i,n,s){let c=1,m=-.35;if(N(e,t,a,o,r,l,n,1)>=s)return 0;for(let i=0;i<12;i++){let i=.5*(m+c);N(e,t,a,o,r,l,n,i)<s?c=i:m=i}return(.5-.5*(m+c)*.5)*i}function F({onHeroReveal:e,onHorizonSync:t,runwayRef:a,skipIntro:l=!1}){let i=(0,r.useRef)(null),n=(0,r.useRef)(null),s=(0,r.useRef)(null),c=(0,r.useRef)(e),m=(0,r.useRef)(t),u=(0,r.useRef)(a);return(0,r.useEffect)(()=>{c.current=e,m.current=t,u.current=a},[e,t,a]),(0,r.useEffect)(()=>{let e=n.current,t=i.current;if(!e||!t)return;let a=!1;try{let e=new URLSearchParams(window.location.search);a="1"===e.get("skipIntro")}catch{}let o=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=l||a||o,d=r;r&&c.current(!0);let h=t.getContext("2d"),p=function(){let e=["*","+","^","-","."],t=[],a=918273,o=()=>(a=1664525*a+0x3c6ef35f>>>0)/0x100000000;for(let a=0;a<104;a++){let a=o(),r=o(),l=o(),i=Math.min(1,Math.hypot((a-.5)*1.15,r-.78)/.95);t.push({nx:a,ny:r,glyph:e[Math.floor(o()*e.length)],phase:o()*Math.PI*2,speed:.45+.95*o(),sizeCss:o()>.62?12:10,tint:l>.88?"ice":l>.42?"periwinkle":"accent",crestDist:i})}return t}(),v=e.getContext("webgl2",{alpha:!0,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1});if(!v)return void c.current(!0);let E=A(v,g),N=A(v,b),F=A(v,C),j=A(v,w),_=A(v,y),B=v.createVertexArray();v.bindVertexArray(B);let I='"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';s.current&&(I=window.getComputedStyle(s.current).fontFamily);let L=null,O=0,U=0,W="",z=null,G=0,H=0,$=0,V=0,X=1440,Y=900,q=2,J=248,K=115,Z=12,Q=16,ee=0,et=0,ea=!1,eo=.5,er=null,el=null,ei=null,en=null,es=null,ec=null,em=null,eu=(a=!1)=>{let o=e.getBoundingClientRect(),r=Math.max(1,Math.round(o.width)),l=Math.max(1,Math.round(o.height)),i=r<640,n=r>=640&&r<1024,c=Math.min(Math.max(window.devicePixelRatio||1,1),2),m=Math.max(2,Math.round(r*c)),u=Math.max(2,Math.round(l*c));X=r,Y=l,q=c,(t.width!==m||t.height!==u)&&(t.width=m,t.height=u),s.current&&(I=window.getComputedStyle(s.current).fontFamily);let d=Math.max(5,Math.round((i?4.5:n?5.2:5.8)*c)),h=Math.max(7,Math.round((i?6.5:n?7.2:7.8)*c)),p=Math.max(64,Math.floor(m/d)),f=Math.max(48,Math.floor(u/h)),g=Math.floor((m-p*d)*.5),b=Math.floor((u-f*h)*.5),C=ea?.36:i?.44:.52;if((a||!L||d!==O||h!==U||I!==W)&&(O=d,U=h,W=I,L=function(e,t,a,o,r){let l=document.createElement("canvas");l.width=a*x.length,l.height=2*o;let i=l.getContext("2d");i.fillStyle="#000000",i.fillRect(0,0,l.width,l.height),i.fillStyle="#ffffff",i.textAlign="center",i.textBaseline="middle";let n=Math.max(7,Math.round(.92*o));i.font=`${o<=14?600:500} ${n}px ${r}`;for(let e=0;e<x.length;e++)i.fillText(x[e],Math.round((e+.5)*a),Math.round(.52*o));let s=Math.max(8,Math.round(.96*o));i.font=`700 ${s}px ${r}`;for(let e=0;e<x.length;e++)i.fillText(x[e],Math.round((e+.5)*a),Math.round(1.52*o));let c=t??e.createTexture();return e.bindTexture(e.TEXTURE_2D,c),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,l),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),c}(v,L,d,h,I)),(Math.abs(r-G)>16||Math.abs(l-H)>16||!z)&&(G=r,H=l,z=k(v,z,r,l)),m===$&&u===V&&p===J&&f===K&&d===Z&&h===Q&&C===eo&&er)return;$=m,V=u,J=p,K=f,Z=d,Q=h,ee=g,et=b,eo=C,e.width=$,e.height=V,R(v,er),R(v,el),R(v,ei),R(v,en),R(v,es),R(v,ec),R(v,em);let w=Math.max(64,Math.round($*C)),y=Math.max(64,Math.round(V*C)),E=Math.max(32,Math.round(.25*$)),A=Math.max(32,Math.round(.25*V)),P=Math.max(16,Math.round(.125*$)),T=Math.max(16,Math.round(.125*V));er=M(v,w,y,v.LINEAR),el=M(v,J,K,v.NEAREST),ei=M(v,$,V,v.NEAREST),en=M(v,E,A,v.LINEAR),es=M(v,E,A,v.LINEAR),ec=M(v,P,T,v.LINEAR),em=M(v,P,T,v.LINEAR)},ed=!1;"u">typeof document&&document.fonts?.ready&&document.fonts.ready.then(()=>{!ed&&X>0&&Y>0&&(z=k(v,z,X,Y),eu(!0))}).catch(()=>{});let eh=(e,t,a)=>{a&&(v.activeTexture(v.TEXTURE0+e),v.bindTexture(v.TEXTURE_2D,t),v.uniform1i(a,e))},ep=e=>{e?(v.bindFramebuffer(v.FRAMEBUFFER,e.fb),v.viewport(0,0,e.w,e.h)):(v.bindFramebuffer(v.FRAMEBUFFER,null),v.viewport(0,0,$,V))},ef=.5,ex=.5,ev=.5,eg=.5,eb=0,eC=0,ew=e=>{"touch"===e.pointerType||o||(ef=P(e.clientX/Math.max(1,window.innerWidth)),ex=P(1-e.clientY/Math.max(1,window.innerHeight)),eb=1)},ey=()=>{eb=0};window.addEventListener("pointermove",ew,{passive:!0}),window.addEventListener("pointerleave",ey,{passive:!0});let eE=9*!!r,eA=2*!!r,eM=0,eR=performance.now(),ek=0,eP=0,eT=.0166,eS=0,eN=-1,eD=0,eF=null;try{let e=new URLSearchParams(window.location.search).get("introAt");if(null!==e){let t=Number(e);Number.isFinite(t)&&t>=0&&t<=14&&(eF=t,eE=Math.min(9,t),eA=Math.max(0,t-9),t>=9&&(d=!0,c.current(!0)))}}catch{}let ej=e=>{var a,l,i,n,s,g,b;if(eP=window.requestAnimationFrame(ej),document.hidden){eR=e;return}let C=Math.max(.001,(e-eR)*.001),w=Math.min(.05,C);eR=e,eT=.935*eT+.065*Math.min(C,.1),!ea&&eT>.024?(eS+=w)>2.2&&(ea=!0):eS=Math.max(0,eS-.5*w);let y=Math.min(1,8.5*w);ev+=(ef-ev)*y,eg+=(ex-eg)*y,eC+=(eb-eC)*Math.min(1,5.2*w);let A=0,M=u.current?.current;if(M){let e=M.getBoundingClientRect(),t=Math.max(1,e.height-window.innerHeight);A=P(-e.top/t)}else{let e=Math.max(420,2*window.innerHeight);A=P(window.scrollY/e)}let R=Math.min(.18,C);if(eM+=(A-eM)*Math.min(1,14*R),4e-4>Math.abs(A-eM)&&(eM=A),null!==eF)eE=Math.min(9,eF),eA=Math.max(0,eF-9);else if(eE<9){let e=window.scrollY>24?5.8:1;eE=Math.min(9,eE+w*e)}else eA=Math.min(10,eA+w);let k=r||eE>=8.999;if(!d&&k&&(d=!0,c.current(!0)),eu(),!er||!el||!ei||!en||!es||!ec||!em||!L)return;let B=null!==eF?eF:.001*e,O=X<768,U=$/Math.max(1,V),W=Math.tan(S(23)),G=1-T(3.68,3.92,eE),H=T(1.25,2.4,eE),eo=Math.pow(P((eE-2.4)/(3.85-2.4)),2.2),ed=1.32+-1.1800000000000002*eo+.028*Math.sin(14*B)*H*(1-eo),ew=P(.22*T(1.35,2.45,eE)+.78*T(2.4,3.65,eE)),ey=P(.52*T(1.15,2.45,eE)+.48*T(2.4,3.58,eE)),e_=T(2.25,2.85,eE)*(1-T(3.76,3.98,eE)),eB=T(3.38,3.82,eE)*(1-T(3.86,4.12,eE)),eI=T(3.8,4.04,eE)*(1-T(4.84,5.4,eE)),eL=P((eE-3.8)/1.75),eO=T(3.8,4.02,eE)*(1-T(5.35,6.55,eE)),eU=P((eE-3.8)/2.75),eW=T(4.02,4.2,eE)*(1-T(4.86,5.2,eE)),ez=T(4.65,5.38,eE),eG=T(4.72,5.6,eE),eH=T(3.32,3.78,eE)*(1+.65*eB+.35*eI)*(1-T(6.25,7.45,eE)),e$=(a=P((eE-6.6)/2.4))<.5?16*a*a*a*a*a:1-Math.pow(-2*a+2,5)/2,eV=!r&&k?T(0,.08,eA)*(1-T(.16,.58,eA)):0,eX=P(eA/.58),eY=r?1:k?T(0,.95,eA):0,eq=G*(1-T(.18,.72,ew)),eJ=O?.198:.214,eK=O?2.08:1.62,eZ=Math.asin(1/eK),eQ=Math.atan((-1+2*eJ)*W),e0=O?2.34:2.15,e1=Math.asin(1/e0),e2=Math.atan((1-2*(O?.086:.068))*W),e5=Math.max(3.4,Math.min(7.8,1/Math.sin(Math.atan(Math.max(.08,(O?Math.min(.395*X,.195*Y):Math.min(.19*X,.285*Y))/(.5*Y)*W))))),e3=eM,e4=T(0,.28,e3),e8=P((e3-.28)/.38),e6=T(.66,1,e3),e7=T(.14,.3,e3)*(1-T(.64,.84,e3))*e$,e9=T(.55,.9,e7),te=0,tt=0,ta=0;if(!o&&e$>.5&&e9>.001&&null===eF){let e=Math.max(0,f-Date.now()),t=Math.floor(e/1e3);ta=e>0?999-e%1e3:0,t!==eN&&(eN=t,eD=performance.now()-ta),ta<360&&(tt=ta/360,te=(ta<40?T(0,40,ta):Math.exp(-((ta-40)/115)))*(1-T(285,360,ta))*e9)}let to=26+62*e4+66*e6,tr=e5+(.94*e5-e5)*e8,tl=e6>0?tr+(e0-tr)*e6:eK+(tr-eK)*e4,ti=e6>0?0+(-(e2+e1)-0)*e6:(l=eZ-eQ)+(0-l)*e4,tn=e4*S(12)+e8*S(42)+e6*S(16),ts=((n=(i=7.6+-.7999999999999998*T(0,2.4,eE))+(7.25-i)*T(2.4,3.8,eE))+(5.85-n)*T(4.1,6.55,eE))*(O?1.24:1),tc=19+-4*T(0,6.55,eE),tm=(s=S(-22),s+(S(-18)-s)*T(0,6.55,eE)),tu=S(tc+(to-tc)*e$),td=ts+(tl-ts)*e$,th=0+(ti-0)*e$,tp=tm+(0-tm)*e$,tf=0+(tn-0)*e$,tx=Math.sin(tu),tv=Math.cos(tu),tg=Math.sin(tf),tb=Math.cos(tf),tC=(e,t,a)=>({x:e*tb+a*tg,y:t,z:-e*tg+a*tb}),tw=tC(0,td*tx,td*tv),ty=tC(0,-tx,-tv),tE=tC(0,tv,-tx),tA=tC(1,0,0),tM=Math.cos(th),tR=Math.sin(th),tk={x:tM*ty.x+tR*tE.x,y:tM*ty.y+tR*tE.y,z:tM*ty.z+tR*tE.z},tP={x:-tR*ty.x+tM*tE.x,y:-tR*ty.y+tM*tE.y,z:-tR*ty.z+tM*tE.z},tT=Math.cos(tp),tS=Math.sin(tp),tN={x:tT*tA.x+tS*tP.x,y:tT*tA.y+tS*tP.y,z:tT*tA.z+tS*tP.z},tD={x:-tS*tA.x+tT*tP.x,y:-tS*tA.y+tT*tP.y,z:-tS*tA.z+tT*tP.z},tF=Math.min(.72*td,O?1.38:1.28),tj=5.2+((g=tF+(Math.min(.66*td,O?1.22:1.18)-tF)*e6)+(5.6-g)*e7-5.2)*e$,t_=Y*(1-.45*eJ),tB=.5*Y,tI=(b=t_+((O?34:31)-t_)*T(0,1,e3))+(tB-b)*e7,tL=1+((O?.6:.64)-1)*T(0,1,e3),tO=Math.max(160,2*(Math.tan(Math.asin(P(1/Math.max(1.05,td))))/W*(.5*Y))),tU=.5*X,tW=-(.6*Y),tz=.75*Y,tG=36,tH=0;if(e3>.62&&e$>.5){let e=D(tw,tN,tD,tk,U,W,Y,0,1.08),t=D(tw,tN,tD,tk,U,W,Y,.85,1.08),a=.5*X*.85,o=Math.max(8,e-t),r=(a*a+o*o)/(2*o);tU=.5*X,tz=r,tW=e-r,tG=t,tH=e}m.current?.({pinProgress:e3,settleProgress:e$,polarFactor:e7,polarDiameterPx:tO,heroResolved:k,countdownCenterY:tI,countdownScale:tL,domeCenterX:tU,domeCenterY:tW,domeRadiusPx:tz,domeEdgeY:tG,viewportW:X}),window.__TMINUS_BH_TELEMETRY__={fps:Number((1/Math.max(.001,eT)).toFixed(1)),frameMs:Number((1e3*eT).toFixed(2)),degraded:ea,cols:J,rows:K,cellPxW:Z,cellPxH:Q,dpr:q,introElapsed:Number(eE.toFixed(3)),resolveElapsed:Number(eA.toFixed(3)),heroResolved:k,pinProgress:Number(e3.toFixed(4)),polarFactor:Number(e7.toFixed(4)),polarGate:Number(e9.toFixed(4)),tickPulse:Number(te.toFixed(4)),tickProg:Number(tt.toFixed(4)),tickElapsedSinceEdgeMs:ta,pulseEdgeWholeSec:eN,lastPulseTriggerPerfMs:Number(eD.toFixed(2)),polarDiameterPx:Math.round(tO),domeApexRimY:Math.round(tH),domeEdgeY:Math.round(tG),elevDeg:Number((180*tu/Math.PI).toFixed(1))},e-ek>32&&(ek=e,((e,a,r,l)=>{if(!h||X<=1||Y<=1)return;let i=q;h.setTransform(1,0,0,1,0,0),h.clearRect(0,0,t.width,t.height);let n=Y*(.84+-.75*a)*i,s=Math.max(X,Y)*(.28+-.12000000000000002*a)*i,c=h.createRadialGradient(.5*X*i,n,0,.5*X*i,n,s);c.addColorStop(0,`rgba(78, 20, 140, ${((.04+-.018000000000000002*a)*r).toFixed(3)})`),c.addColorStop(1,"rgba(4, 2, 6, 0)"),h.fillStyle=c,h.fillRect(0,0,t.width,t.height),h.textAlign="center",h.textBaseline="middle";let m=`500 ${Math.round(10*i)}px ${I}`,u=`500 ${Math.round(12*i)}px ${I}`;if(l>.005){let t=1+-.38*a;for(let a=0;a<p.length;a++){let o=p[a],r=T(.55*o.crestDist,.55*o.crestDist+.42,l);if(r<=.01)continue;let n=Math.round(o.nx*X*i),s=Math.round(o.ny*Y*i),c=P((.16+.32*(.45+.55*Math.sin(e*o.speed+o.phase)))*t*r);h.font=12===o.sizeCss?u:m,h.fillStyle="ice"===o.tint?"#97DFFC":"periwinkle"===o.tint?"#858AE3":"#613DC1",h.globalAlpha=c,h.fillText(o.glyph,n,s)}}if(!o&&eC>.01&&l>.45){let t=[".",":","-","^","t","+","=","T","*"],a=ev*X,o=(1-eg)*Y,r=Math.max(0,Math.floor((a-104)/18)),n=Math.min(Math.ceil(X/18),Math.ceil((a+104)/18)),s=Math.max(0,Math.floor((o-104)/18)),c=Math.min(Math.ceil(Y/18),Math.ceil((o+104)/18)),d=T(.45,.95,l)*eC;for(let l=s;l<=c;l++){let s=18*l+9,c=s-o;if(!(Math.abs(c)>=104))for(let o=r;o<=n;o++){let r=18*o+9,n=Math.hypot(r-a,c);if(n>=104)continue;let p=Math.pow(1-n/104,1.85),f=Math.min(.32,p*(.78+.22*Math.sin(2.4*e+.65*o+.48*l))*d*.36);if(f<.012)continue;let x=(Math.floor(2.3*e+.37*(17*o+31*l&63)-n/104*2.2)%t.length+t.length)%t.length,v=t[x];h.font=p>.55?u:m;let g=Math.sin(3.1*e+1.13*o+.87*l);h.fillStyle=n<36||n<62&&g>.65?"#97DFFC":n<78?"#858AE3":"#613DC1",h.globalAlpha=f,h.fillText(v,Math.round(r*i),Math.round(s*i))}}}h.globalAlpha=1})(B,e3,e$,eY)),v.disable(v.BLEND),ep(er),v.useProgram(E.prog),v.uniform1f(E.u.uTime,B),v.uniform1f(E.u.uViewAsp,U),v.uniform1f(E.u.uSceneH,er.h),v.uniform1f(E.u.uTanHalfFov,W),v.uniform3f(E.u.uCamPos,tw.x,tw.y,tw.z),v.uniform3f(E.u.uCamRight,tN.x,tN.y,tN.z),v.uniform3f(E.u.uCamUp,tD.x,tD.y,tD.z),v.uniform3f(E.u.uCamFwd,tk.x,tk.y,tk.z),v.uniform1f(E.u.uStarVis,G),v.uniform1f(E.u.uStarRadius,ed),v.uniform1f(E.u.uStarShift,ew),v.uniform1f(E.u.uStarCrack,ey),v.uniform1f(E.u.uImplode,e_),v.uniform1f(E.u.uEjecta,eO),v.uniform1f(E.u.uEjectaProg,eU),v.uniform1f(E.u.uBhBirth,ez),v.uniform1f(E.u.uDiskBirth,eG),v.uniform1f(E.u.uLockPulse,eV),v.uniform1f(E.u.uLockWaveProg,eX),v.uniform1f(E.u.uTickPulse,te),v.uniform1f(E.u.uTickProg,tt),v.uniform1f(E.u.uSettle,e$),v.uniform1f(E.u.uPin,e6),v.uniform1f(E.u.uPolarFactor,e7),v.uniform1f(E.u.uDiskOuterR,tj),v.uniform1f(E.u.uJetPower,eH),v.uniform1f(E.u.uCharge,eB),v.uniform1f(E.u.uBlastPeak,eI),v.uniform1f(E.u.uBlastProgress,eL),v.uniform2f(E.u.uPointer,ev,eg),v.uniform1f(E.u.uPointerActive,eC),v.drawArrays(v.TRIANGLES,0,3),ep(el),v.useProgram(N.prog),eh(0,er.tex,N.u.uBg),v.uniform2f(N.u.uBgInv,1/er.w,1/er.h),v.uniform2f(N.u.uGridOrigin,ee,et),v.uniform2f(N.u.uCellPx,Z,Q),v.uniform2f(N.u.uCanvasPx,$,V),v.uniform2f(N.u.uGrid,J,K),v.drawArrays(v.TRIANGLES,0,3),ep(ei),v.useProgram(F.prog),eh(0,el.tex,F.u.uCell),eh(1,er.tex,F.u.uBg),eh(2,L,F.u.uAtlas),z&&eh(3,z,F.u.uWordmarkMask),v.uniform2i(F.u.uGrid,J,K),v.uniform2i(F.u.uCellPx,Z,Q),v.uniform2i(F.u.uGridOrigin,ee,et),v.uniform2f(F.u.uCanvasPx,$,V),v.uniform1f(F.u.uGlyphCount,x.length),v.uniform1f(F.u.uWordmarkCarve,eW),v.uniform1f(F.u.uBlastPeak,eI),v.uniform1f(F.u.uWarmTint,eq),v.uniform1f(F.u.uSettle,e$),v.uniform1f(F.u.uTime,B),v.uniform2f(F.u.uPointer,ev,eg),v.uniform1f(F.u.uPointerActive,eC),v.uniform1f(F.u.uViewAsp,U),v.drawArrays(v.TRIANGLES,0,3),v.useProgram(j.prog),ep(en),eh(0,er.tex,j.u.uTex),v.uniform2f(j.u.uDir,1.65/en.w,0),v.uniform1f(j.u.uThreshold,.34),v.drawArrays(v.TRIANGLES,0,3),ep(es),eh(0,en.tex,j.u.uTex),v.uniform2f(j.u.uDir,0,1.65/es.h),v.uniform1f(j.u.uThreshold,0),v.drawArrays(v.TRIANGLES,0,3),ep(ec),eh(0,es.tex,j.u.uTex),v.uniform2f(j.u.uDir,2.25/ec.w,0),v.uniform1f(j.u.uThreshold,0),v.drawArrays(v.TRIANGLES,0,3),ep(em),eh(0,ec.tex,j.u.uTex),v.uniform2f(j.u.uDir,0,2.25/em.h),v.uniform1f(j.u.uThreshold,0),v.drawArrays(v.TRIANGLES,0,3),ep(null),v.clearColor(0,0,0,0),v.clear(v.COLOR_BUFFER_BIT),v.useProgram(_.prog),eh(0,ei.tex,_.u.uBase),eh(1,es.tex,_.u.uBloom1),eh(2,em.tex,_.u.uBloom2),z&&eh(3,z,_.u.uWordmarkMask),v.uniform2f(_.u.uGrid,J,K),v.uniform1f(_.u.uWordmarkCarve,eW);let t$=.46+.06*e$+.14*G+.16*eO+.36*eI+.1*eV+.18*te;v.uniform1f(_.u.uGlow,t$),v.drawArrays(v.TRIANGLES,0,3)};return eP=window.requestAnimationFrame(ej),()=>{ed=!0,window.cancelAnimationFrame(eP),window.removeEventListener("pointermove",ew),window.removeEventListener("pointerleave",ey),R(v,er),R(v,el),R(v,ei),R(v,en),R(v,es),R(v,ec),R(v,em),L&&v.deleteTexture(L),z&&v.deleteTexture(z),v.deleteVertexArray(B),v.deleteProgram(E.prog),v.deleteProgram(N.prog),v.deleteProgram(F.prog),v.deleteProgram(j.prog),v.deleteProgram(_.prog)}},[l]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("span",{ref:s,"aria-hidden":"true",className:"pointer-events-none sr-only font-mono",children:"T"}),(0,o.jsx)("canvas",{ref:i,"aria-hidden":"true",className:"pointer-events-none fixed inset-0 z-0 h-full w-full"}),(0,o.jsx)("canvas",{ref:n,"aria-hidden":"true",className:"pointer-events-none fixed inset-0 z-30 h-full w-full"})]})}function j(e){return String(Math.max(0,Math.floor(e))).padStart(2,"0")}function _({stripRef:e,polarRef:t}={}){let[a,l]=(0,r.useState)({days:"--",hours:"--",minutes:"--",seconds:"--"});(0,r.useEffect)(()=>{let e=0,t=!1,a=()=>{let o,r,i,n,s;if(t)return;let c=Date.now(),m=Math.max(0,f-c),u=Math.floor(m/1e3),d=(i=Math.floor((r=Math.floor(Math.max(0,f-c)/1e3))/86400),n=Math.floor(r%86400/3600),s=Math.floor(r%3600/60),{days:(o=Math.max(0,Math.floor(i)))>=100?String(o):String(o).padStart(2,"0"),hours:j(n),minutes:j(s),seconds:j(r%60)});l(d),window.__TMINUS_COUNTDOWN_SYNC__={lastFlipNowMs:c,lastFlipPerfMs:performance.now(),remMs:m,edgeWholeSec:u,elapsedSinceEdgeMs:m>0?999-m%1e3:0,seconds:d.seconds},e=window.setTimeout(a,m>0?m%1e3+4:1e3)};return a(),()=>{t=!0,window.clearTimeout(e)}},[]);let i=[{value:a.days,label:"D"},{value:a.hours,label:"H"},{value:a.minutes,label:"M"},{value:a.seconds,label:"S"}],n=[{value:a.hours,label:"H"},{value:a.minutes,label:"M"},{value:a.seconds,label:"S"}];return(0,o.jsxs)("div",{role:"timer","aria-live":"off","aria-label":"Countdown to T-minus App Store v1.0 launch on January 1, 2027",className:"relative flex items-center justify-center select-none whitespace-nowrap",children:[(0,o.jsxs)("div",{ref:e,"data-countdown-mode":"strip",className:"flex flex-col items-center gap-1.5 will-change-transform sm:gap-2",children:[(0,o.jsx)("div",{className:"flex items-baseline gap-3.5 whitespace-nowrap font-heading text-[26px] leading-none font-semibold tracking-[-0.03em] text-white tabular-nums sm:gap-7 sm:text-[36px]",children:i.map(e=>(0,o.jsxs)("span",{className:"inline-flex items-baseline gap-1 sm:gap-1.5",children:[(0,o.jsx)("span",{children:e.value}),(0,o.jsx)("span",{className:"font-mono text-[11px] font-medium tracking-[0.06em] text-[#9EA3EE] sm:text-[13px]",children:e.label})]},e.label))}),(0,o.jsx)("div",{"data-countdown-label":"true",className:"whitespace-nowrap font-mono text-[9.5px] font-medium tracking-[0.13em] text-[#A2A7F0] uppercase sm:text-[11px] sm:tracking-[0.18em]",children:"APP STORE V1.0 \xb7 JAN 1, 2027"})]}),(0,o.jsxs)("div",{ref:t,"data-countdown-mode":"polar",style:{opacity:0,transform:"translate(-50%, -50%) scale(0.84)"},className:"pointer-events-none absolute top-1/2 left-1/2 flex w-[264px] flex-col items-center text-center will-change-transform sm:w-[410px]",children:[(0,o.jsx)("span",{className:"font-mono text-[9.5px] font-medium tracking-[0.24em] text-[#97DFFC] uppercase sm:text-[11.5px]",children:"LAUNCHING IN"}),(0,o.jsxs)("div",{className:"mt-1.5 flex items-baseline justify-center gap-2 sm:mt-2.5 sm:gap-3",children:[(0,o.jsx)("span",{className:"font-heading text-[78px] leading-[0.86] font-semibold tracking-[-0.045em] text-white tabular-nums sm:text-[128px]",children:a.days}),(0,o.jsx)("span",{className:"font-mono text-[12px] font-medium tracking-[0.16em] text-[#97DFFC] uppercase sm:text-[17px]",children:"DAYS"})]}),(0,o.jsx)("div",{"aria-hidden":"true",className:"my-2.5 h-px w-[72%] bg-gradient-to-r from-transparent via-[#858AE3]/55 to-transparent sm:my-4"}),(0,o.jsx)("div",{className:"flex items-baseline justify-center gap-4 font-heading text-[24px] leading-none font-semibold tracking-[-0.025em] text-white tabular-nums sm:gap-7 sm:text-[40px]",children:n.map(e=>(0,o.jsxs)("span",{className:"inline-flex items-baseline gap-1 sm:gap-1.5",children:[(0,o.jsx)("span",{children:e.value}),(0,o.jsx)("span",{className:"font-mono text-[10px] font-medium tracking-[0.08em] text-[#9EA3EE] sm:text-[14px]",children:e.label})]},e.label))}),(0,o.jsx)("div",{className:"mt-2.5 font-mono text-[9px] font-medium tracking-[0.16em] text-[#A2A7F0] uppercase sm:mt-4 sm:text-[11px] sm:tracking-[0.2em]",children:"APP STORE V1.0 \xb7 JAN 1, 2027"})]})]})}let B={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};B.node;let I=c(B),L={name:"calendar",size:24,node:[["path",{d:"M8 2v3",key:"1ioesn"}],["path",{d:"M16 2v3",key:"otl347"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",key:"h1oib"}],["path",{d:"M3 9h18",key:"1pudct"}]]};L.node;let O=c(L),U={name:"share-2",size:24,node:[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]]};U.node;let W=c(U);function z({variant:e="primary",shape:t="rect",className:a="",children:r,disabled:l,...i}){return(0,o.jsx)("button",{disabled:l,className:`inline-flex cursor-pointer items-center justify-center gap-2 font-sans font-semibold tracking-[-0.01em] transition-colors duration-150 active:translate-y-px focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#040206] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${"pill"===t?"rounded-full":"rounded-[6px]"} ${"primary"===e?"bg-white text-[#040206] border border-white [@media(hover:hover)]:hover:bg-[#E8F7FE] [@media(hover:hover)]:hover:border-[#E8F7FE]":"bg-[#07050D] text-white border border-[#858AE3]/35 [@media(hover:hover)]:hover:border-[#97DFFC]/75 [@media(hover:hover)]:hover:text-[#97DFFC]"} ${a}`,...i,children:r})}function G({idPrefix:e="waitlist",inputRef:t,onOpenLegal:a,requestedRole:l,align:i="center"}){let[n,s]=(0,r.useState)("SHOPPER"),[c,m]=(0,r.useState)(""),[u,d]=(0,r.useState)(""),[h,p]=(0,r.useState)(!1),[f,x]=(0,r.useState)(null),[v,g]=(0,r.useState)(!1),[b,C]=(0,r.useState)(null),[w,y]=(0,r.useState)(null),[E,A]=(0,r.useState)(null);async function M(e){e.preventDefault(),C(null);let t=function(e){let t=e.trim();if(!t)return null;let a=t.startsWith("+"),o=t.replace(/\D/g,"");return a?o.length<8||o.length>15||o.startsWith("0")?null:`+${o}`:10===o.length?"0"===o[0]||"1"===o[0]?null:`+1${o}`:11===o.length&&o.startsWith("1")?"0"===o[1]||"1"===o[1]?null:`+${o}`:o.length>=11&&o.length<=15&&!o.startsWith("0")?`+${o}`:null}(c);if(!t)return void C("Enter a valid mobile number (e.g. (555) 234-5678).");if(!h)return void C("Check the SMS consent box so we can text you on Jan 1.");g(!0);try{let e=await fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:t,role:n,brandHandle:"BRAND"===n&&u.trim()||null,smsConsent:!0,source:f})}),a=await e.json().catch(()=>({}));if(!e.ok)return void C("string"==typeof a?.error?a.error:"Something went wrong. Please try again.");y(n)}catch{C("Network error. Check your connection and try again.")}finally{g(!1)}}async function R(){let e=`${window.location.origin}/landing`;try{navigator.share?(await navigator.share({title:"T^minus",text:"T^minus launches Jan 1, 2027 \xb7 independent clothing drops on a live clock.",url:e}),A("Shared")):navigator.clipboard?.writeText?(await navigator.clipboard.writeText(e),A("Link copied")):A("Copy URL above")}catch{}finally{window.setTimeout(()=>A(null),2600)}}(0,r.useEffect)(()=>{l&&(s(l.role),C(null))},[l]),(0,r.useEffect)(()=>{let e=new URLSearchParams(window.location.search),t=e.get("utm_source")||e.get("ref")||e.get("src")||null;t&&x(t.slice(0,64))},[]);let k="left"===i?"items-start text-left":"mx-auto items-center text-center",P=`${e}-phone`,T=`${e}-brand`;return w?(0,o.jsxs)("div",{role:"status","aria-live":"polite",className:`flex w-full max-w-[452px] flex-col rounded-[6px] border border-[#858AE3]/30 bg-[#07050D] px-6 py-6 ${k}`,children:[(0,o.jsxs)("div",{className:"inline-flex items-center gap-1.5 font-mono text-[10.5px] font-medium tracking-[0.16em] text-[#97DFFC] uppercase",children:[(0,o.jsx)(I,{className:"size-3.5 stroke-[2.2]"}),(0,o.jsx)("span",{children:"BRAND"===w?"+ BRAND SPOT SAVED":"+ ALLOCATION SECURED"})]}),(0,o.jsx)("h3",{className:"mt-2.5 font-heading text-[21px] font-semibold tracking-[-0.025em] text-white",children:"BRAND"===w?"Brand request saved.":"You're in for Jan 1."}),(0,o.jsx)("p",{className:"mt-2 max-w-[360px] text-[13.5px] leading-[1.54] text-[#DCD5EE]",children:"BRAND"===w?"We'll text you before launch to set up your storefront and schedule an early drop.":"Watch your texts on January 1 when App Store v1.0 goes live."}),(0,o.jsxs)("div",{className:"mt-5 flex w-full flex-col gap-2.5 sm:flex-row",children:[(0,o.jsxs)(z,{type:"button",variant:"primary",onClick:function(){let e,t=new Blob([(e=`${window.location.origin}/landing`.replace(/[\r\n]/g,""),`BEGIN:VCALENDAR\r
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
END:VCALENDAR`)],{type:"text/calendar;charset=utf-8"}),a=URL.createObjectURL(t),o=document.createElement("a");o.href=a,o.download="t-minus-launch-jan-1-2027.ics",document.body.appendChild(o),o.click(),o.remove(),URL.revokeObjectURL(a)},className:"h-10 flex-1 px-4 text-[13px]",children:[(0,o.jsx)(O,{className:"size-3.5"}),(0,o.jsx)("span",{children:"Save Jan 1 reminder"})]}),(0,o.jsxs)(z,{type:"button",variant:"dark",onClick:R,className:"h-10 flex-1 px-4 text-[13px]",children:[(0,o.jsx)(W,{className:"size-3.5"}),(0,o.jsx)("span",{children:E??"Send to a friend"})]})]})]}):(0,o.jsxs)("form",{onSubmit:M,noValidate:!0,className:`flex w-full max-w-[452px] flex-col ${k}`,children:[(0,o.jsxs)("div",{role:"radiogroup","aria-label":"Waitlist role",className:"relative mb-2.5 inline-grid grid-cols-2 rounded-[6px] border border-[#858AE3]/30 bg-[#05030A] p-[3px] sm:mb-3",children:[(0,o.jsx)("span",{"aria-hidden":"true",className:`pointer-events-none absolute top-[3px] bottom-[3px] left-[3px] w-[calc(50%-3px)] rounded-[4px] bg-[#613DC1] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${"BRAND"===n?"translate-x-full":"translate-x-0"}`}),[{id:"SHOPPER",label:"I'm shopping"},{id:"BRAND",label:"I run a brand"}].map(e=>{let t=n===e.id;return(0,o.jsx)("button",{type:"button",role:"radio","aria-checked":t,onClick:()=>{s(e.id),C(null)},className:`relative z-10 cursor-pointer rounded-[4px] px-3.5 py-1 text-[12px] font-medium tracking-[-0.005em] transition-colors duration-150 ${t?"text-white":"text-[#CFC7E6] hover:text-white"}`,children:e.label},e.id)})]}),(0,o.jsxs)("div",{className:"flex w-full items-center gap-1.5 rounded-[6px] border border-[#858AE3]/30 bg-[#07050D] p-1.5 transition-colors duration-150 focus-within:border-[#97DFFC]/80",children:[(0,o.jsx)("label",{htmlFor:P,className:"sr-only",children:"Mobile phone number"}),(0,o.jsx)("input",{ref:t,id:P,name:"tel",type:"tel",inputMode:"tel",autoComplete:"tel",required:!0,placeholder:"+1 (555) 000-0000",value:c,onChange:e=>{m(function(e){let t=e.trimStart();if(t.startsWith("+"))return"+"+t.slice(1).replace(/[^\d\s-]/g,"").slice(0,18);let a=e.replace(/\D/g,"").slice(0,11);if(0===a.length)return"";if(11===a.length&&a.startsWith("1")){let e=a.slice(1);return`+1 (${e.slice(0,3)}) ${e.slice(3,6)}-${e.slice(6)}`}return a.length<=3?`(${a}`:a.length<=6?`(${a.slice(0,3)}) ${a.slice(3)}`:`(${a.slice(0,3)}) ${a.slice(3,6)}-${a.slice(6,10)}`}(e.target.value)),b&&C(null)},className:"h-9 w-0 min-w-0 flex-1 bg-transparent px-2.5 text-[14px] text-white placeholder:text-[#B8B0D4]/75 focus:outline-none sm:h-10 sm:px-3 sm:text-[14.5px]"}),(0,o.jsx)(z,{type:"submit",variant:"primary",disabled:v,className:"h-9 shrink-0 whitespace-nowrap px-3 text-[12px] sm:h-10 sm:px-5 sm:text-[13px]",children:v?"Saving...":"BRAND"===n?"Join as a brand":"Get early access"})]}),(0,o.jsx)("div",{className:`grid w-full transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${"BRAND"===n?"mt-2 grid-rows-[1fr] opacity-100":"pointer-events-none mt-0 grid-rows-[0fr] opacity-0"}`,children:(0,o.jsxs)("div",{className:"overflow-hidden",children:[(0,o.jsx)("label",{htmlFor:T,className:"sr-only",children:"Label or shop handle"}),(0,o.jsx)("input",{id:T,name:"organization",type:"text",tabIndex:"BRAND"===n?0:-1,placeholder:"Label or shop handle (optional)",value:u,onChange:e=>d(e.target.value),maxLength:120,className:"h-9 w-full rounded-[6px] border border-[#858AE3]/30 bg-[#07050D] px-3 text-[13.5px] text-white placeholder:text-[#B8B0D4]/75 transition-colors focus:border-[#97DFFC]/80 focus:outline-none sm:h-10 sm:px-3.5"})]})}),(0,o.jsxs)("label",{className:`mt-2.5 flex cursor-pointer items-center gap-2 text-[11px] leading-[1.35] text-[#D4CCE8]/90 select-none sm:mt-3 ${"left"===i?"justify-start text-left":"justify-center text-center"}`,children:[(0,o.jsxs)("span",{className:"relative inline-flex size-3.5 shrink-0 items-center justify-center",children:[(0,o.jsx)("input",{type:"checkbox",checked:h,onChange:e=>{p(e.target.checked),b&&C(null)},className:"peer sr-only"}),(0,o.jsx)("span",{"aria-hidden":"true",className:"flex size-3.5 items-center justify-center rounded-[3px] border border-[#858AE3]/55 bg-[#07050D] transition-colors duration-150 peer-checked:border-[#97DFFC] peer-checked:bg-[#613DC1] peer-focus-visible:ring-1 peer-focus-visible:ring-[#97DFFC]",children:h?(0,o.jsx)(I,{className:"size-2.5 stroke-[2.8] text-white"}):null})]}),(0,o.jsxs)("span",{children:["Text me launch & drop alerts (STOP to opt out \xb7"," ",(0,o.jsx)("button",{type:"button",onClick:e=>{e.preventDefault(),a("privacy")},className:"cursor-pointer text-white underline decoration-[#858AE3]/55 underline-offset-2 transition hover:text-[#97DFFC]",children:"Privacy"})," ","/"," ",(0,o.jsx)("button",{type:"button",onClick:e=>{e.preventDefault(),a("terms")},className:"cursor-pointer text-white underline decoration-[#858AE3]/55 underline-offset-2 transition hover:text-[#97DFFC]",children:"Terms"}),")"]})]}),b?(0,o.jsx)("p",{role:"alert",className:"mt-2 text-[12px] font-medium text-[#97DFFC]",children:b}):null]})}let H=[".",":","-","^","t","+","=","T","*"];function $({text:e,active:t,instant:a=!1,origin:l="left",delayMs:i=0,durationMs:n=1180,glyphClassName:s="text-[#858AE3]",crestClassName:c="text-[#97DFFC]",className:m=""}){let u=(0,r.useMemo)(()=>Array.from(e),[e]),[d,h]=(0,r.useState)(a),p=(0,r.useRef)([]),f=(0,r.useRef)([]);return((0,r.useEffect)(()=>{let e=null;try{let t=new URLSearchParams(window.location.search).get("revealAt");if(null!==t){let a=Number(t);Number.isFinite(a)&&a>0&&a<1&&(e=a)}}catch{}if(null===e&&a)return void h(!0);let o=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(null===e&&o)return void h(!0);if(!t&&null===e)return void h(!1);let r=Math.max(1,u.length),s=(r-1)*.5,c=Math.max(.5,s),m=Math.min(.42,Math.max(.22,5.2/r)),d=1-m,x=e=>{for(let t=0;t<u.length;t++){if(" "===u[t])continue;let a=p.current[t],o=f.current[t];if(!a||!o)continue;let i=(e-("center"===l?Math.abs(t-s)/c:"right"===l?(r-1-t)/Math.max(1,r-1):t/Math.max(1,r-1))*d)/Math.max(.01,m);if(i<=0)a.style.opacity="0",o.style.opacity="0",o.textContent="";else if(i>=1)a.style.opacity="1",a.style.color="",o.style.opacity="0",o.textContent="";else{let e=Math.min(H.length-1,Math.floor(i*H.length)),t=H[e],r=i>.84?(i-.84)/.16:0,l=r>0?Math.max(0,1-1.15*r):Math.min(1,.42+.85*i);a.style.opacity=r.toFixed(3),o.style.opacity=l.toFixed(3),o.textContent!==t&&(o.textContent=t),i>=.72?(o.style.color=i>=.86?"#F7FAFF":"#97DFFC",o.style.textShadow="0 0 11px rgba(151, 223, 252, 0.58)"):i>=.36?(o.style.color="",o.style.textShadow="0 0 6px rgba(133, 138, 227, 0.32)"):(o.style.color="#613DC1",o.style.textShadow="none")}}};if(null!==e){h(!1);let t=window.requestAnimationFrame(()=>x(e));return()=>window.cancelAnimationFrame(t)}h(!1);let v=0,g=0;x(0);let b=window.setTimeout(()=>{g=performance.now();let e=t=>{let a=Math.min(1,(t-g)/Math.max(240,n));x(a),a<1?v=window.requestAnimationFrame(e):h(!0)};v=window.requestAnimationFrame(e)},i);return()=>{window.clearTimeout(b),window.cancelAnimationFrame(v)}},[t,a,l,i,n,u]),d)?(0,o.jsx)("span",{className:m,children:e}):(0,o.jsx)("span",{"aria-label":e,className:m,children:u.map((e,t)=>" "===e?(0,o.jsx)(r.Fragment,{children:" "},t):(0,o.jsxs)("span",{"aria-hidden":"true",className:"relative inline-block",children:[(0,o.jsx)("span",{ref:e=>{p.current[t]=e},style:{opacity:0},children:e}),(0,o.jsx)("span",{ref:e=>{f.current[t]=e},style:{opacity:0},className:`pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-[0.88em] leading-none font-medium ${s} `})]},t))})}function V({text:e,children:t,tier:a="headline",origin:l="left",instant:i=!1,delayMs:n=0,className:s=""}){let c=(0,r.useRef)(null),[m,u]=(0,r.useState)(i),[d,h]=(0,r.useState)(!1);return((0,r.useEffect)(()=>{try{let e=new URLSearchParams(window.location.search);if(null!==e.get("revealAt")){h(!0),u(!0);return}}catch{}if(i||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return void u(!0);let e=c.current;if(!e||"u"<typeof IntersectionObserver)return void u(!0);let t=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){u(!0),t.disconnect();break}},{threshold:.14,rootMargin:"0px 0px -24px 0px"});return t.observe(e),()=>t.disconnect()},[i]),"prose"===a)?(0,o.jsx)("span",{ref:c,style:{transitionDelay:i?"0ms":`${n}ms`},className:`block transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${m?"translate-y-0 opacity-100":"translate-y-2.5 opacity-0"} ${s}`,children:t??e}):(0,o.jsx)("span",{ref:c,className:s,children:(0,o.jsx)($,{text:e??"",active:m,instant:!d&&i,origin:l,delayMs:n,durationMs:"telemetry"===a?860:1240,glyphClassName:"telemetry"===a?"text-[#858AE3]":"text-[#9EA3EE]",crestClassName:"text-[#97DFFC]"})})}function X({instant:e=!1,variant:t="rule",className:a=""}){let l=(0,r.useRef)(null),i=(0,r.useRef)(null),n=(0,r.useRef)(null),[s,c]=(0,r.useState)(e);return(0,r.useEffect)(()=>{if(e||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return void c(!0);let t=l.current;if(!t||"u"<typeof IntersectionObserver)return void c(!0);let a=new IntersectionObserver(e=>{for(let t of e)if(t.isIntersecting){c(!0),a.disconnect();break}},{threshold:.2});return a.observe(t),()=>a.disconnect()},[e]),(0,r.useEffect)(()=>{let a=l.current,o=i.current;if(!a||!o)return;let r=o.getContext("2d");if(!r)return;let c=window.matchMedia("(prefers-reduced-motion: reduce)").matches,m=e||c,u=0,d=0,h=2,p='"IBM Plex Mono", ui-monospace, SFMono-Regular, monospace',f=-10,x=0,v=0,g=+!!m,b=0,C=0,w=!1,y=()=>{let e=a.getBoundingClientRect();u=Math.max(1,Math.round(e.width)),d=Math.max(1,Math.round(e.height)),h=Math.min(Math.max(window.devicePixelRatio||1,1),2),o.width=Math.max(1,Math.round(u*h)),o.height=Math.max(1,Math.round(d*h)),n.current&&(p=window.getComputedStyle(n.current).fontFamily)},E=()=>{if(r.setTransform(1,0,0,1,0,0),r.clearRect(0,0,o.width,o.height),!s&&!m||u<=2||d<=2)return;let e=o.width,a=o.height,l=.5*e,i="arch"===t?.78*a:.5*a,n="arch"===t?.46*a:0,c=l*g,v=r.createLinearGradient(l-c,0,l+c,0);if(v.addColorStop(0,"rgba(133, 138, 227, 0.16)"),v.addColorStop(.35,"rgba(133, 138, 227, 0.28)"),v.addColorStop(.5,"rgba(151, 223, 252, 0.45)"),v.addColorStop(.65,"rgba(133, 138, 227, 0.28)"),v.addColorStop(1,"rgba(133, 138, 227, 0.16)"),r.strokeStyle=v,r.lineWidth=Math.max(1,Math.round(.65*h)),r.beginPath(),"arch"===t)for(let e=0;e<=48;e++){let t=e/48*2-1,a=l+t*c,o=i-n*Math.pow(Math.max(0,1-t*t),1.3);0===e?r.moveTo(a,o):r.lineTo(a,o)}else r.moveTo(l-c,Math.round(i)+.5),r.lineTo(l+c,Math.round(i)+.5);r.stroke();let b=Math.max(9,Math.round((u<640?9.5:10.5)*h));r.font=`500 ${b}px ${p}`,r.textAlign="center",r.textBaseline="middle";let C=Math.max(9,Math.round((u<640?9.5:11)*h)),w=u<640?7:11;if(g>.85){let t=.72*Math.min(1,(g-.85)/.15);r.fillStyle="#858AE3",r.globalAlpha=t,r.fillText("+",Math.round(5*h),Math.round(i)),r.fillText("+",e-Math.round(5*h),Math.round(i))}for(let a=-w;a<=w;a++){let o=Math.abs(a)/Math.max(1,w),s=Math.min(1,Math.max(0,(g-.45*o)/.42));if(s<=.02)continue;let c=Math.round(l+a*C),m=c/Math.max(1,e),u=(c-l)/Math.max(1,l),d="arch"===t?Math.round(i-n*Math.pow(Math.max(0,1-u*u),1.3)):Math.round(i),h=0;if(x>.005){let e=Math.abs(m-f);e<.16&&(h=Math.pow(1-e/.16,1.7)*x)}let p=Math.pow(1-o,1.45),v=Math.min(H.length-1,Math.floor(6.8*p+.5));s<.99?v=Math.min(H.length-1,Math.floor(s*H.length)):h>.25&&(v=Math.min(H.length-1,v+(h>.6?2:1))),r.fillStyle="#040206",r.globalAlpha=.92,r.fillRect(c-Math.floor(.48*C),d-Math.floor(.55*b),Math.ceil(.96*C),Math.ceil(1.1*b)),r.fillStyle=1>=Math.abs(a)||h>.35||s<.99&&v>=6?"#97DFFC":p>.4?"#9EA3EE":"#613DC1",r.globalAlpha=Math.min(1,(.45+.52*p+.25*h)*Math.min(1,1.4*s)),r.fillText(H[v],c,d)}r.globalAlpha=1},A=()=>{if(w)return;w=!0;let e=performance.now(),t=a=>{let o=Math.min(.05,Math.max(.001,(a-e)*.001));e=a,!m&&s&&g<1&&(0===b&&(b=a),g=Math.min(1,(a-b)/980)),x+=(v-x)*Math.min(1,11*o),.003>Math.abs(v-x)&&(x=v),E(),!m&&s&&g<1||x>.003||v>0?C=window.requestAnimationFrame(t):w=!1};C=window.requestAnimationFrame(t)};y(),(s||m)&&(m?(g=1,E()):A());let M=e=>{if("touch"===e.pointerType||c)return;let t=a.getBoundingClientRect();f=(e.clientX-t.left)/Math.max(1,t.width),v=1,A()},R=()=>{v=0,A()};a.addEventListener("pointermove",M,{passive:!0}),a.addEventListener("pointerleave",R,{passive:!0});let k=new ResizeObserver(()=>{y(),E()});k.observe(a);let P=!1;return document.fonts?.ready.then(()=>{P||(y(),E())}).catch(()=>{}),()=>{P=!0,window.cancelAnimationFrame(C),a.removeEventListener("pointermove",M),a.removeEventListener("pointerleave",R),k.disconnect()}},[s,e,t]),(0,o.jsxs)("div",{ref:l,"aria-hidden":"true",className:`relative w-full select-none ${"arch"===t?"h-9 sm:h-11":"h-5 sm:h-6"} ${a}`,children:[(0,o.jsx)("span",{ref:n,"aria-hidden":"true",className:"pointer-events-none sr-only font-mono",children:"T"}),(0,o.jsx)("canvas",{ref:i,className:"block h-full w-full"})]})}let Y=[".",":","-","^","t","+","=","T","*"],q=["M","I","N","U","S"];function J({active:e,instant:t=!1,delayMs:a=180,durationMs:l=1050,className:i=""}){let n=(0,r.useRef)(null),s=(0,r.useRef)(null),c=(0,r.useRef)(null),m=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let o=n.current,r=s.current;if(!o||!r)return;let i=r.getContext("2d");if(!i)return;let u=document.createElement("canvas"),d=u.getContext("2d",{willReadFrequently:!0});if(!d)return;let h=window.matchMedia("(prefers-reduced-motion: reduce)").matches,p=t||h,f=0,x=0,v=2,g='"Inter Tight", "Inter", -apple-system, sans-serif',b='"IBM Plex Mono", ui-monospace, SFMono-Regular, monospace',C=8,w=10,y=[],E=[],A="",M=0,R=1,k=0,P=0,T=0,S=+!!p,N=p,D=p,F=!0,j=0,_=-9999,B=-9999,I=0,L=0,O=()=>{let e=o.getBoundingClientRect();f=Math.max(1,Math.round(e.width)),x=Math.max(1,Math.round(e.height));let t=f<340;v=Math.min(Math.max(window.devicePixelRatio||1,1),2);let a=Math.max(2,Math.round(f*v)),l=Math.max(2,Math.round(x*v));r.width=a,r.height=l,u.width=a,u.height=l,c.current&&(g=window.getComputedStyle(c.current).fontFamily),m.current&&(b=window.getComputedStyle(m.current).fontFamily);let i=Math.round(l*(t?.86:.88));A=`700 ${i}px ${g}`,d.setTransform(1,0,0,1,0,0),d.clearRect(0,0,a,l),d.font=A,d.textAlign="left",d.textBaseline="middle";let n=q.map(e=>d.measureText(e).width).reduce((e,t)=>e+t,0)+.068*i*(q.length-1),s=Math.max(24,Math.round(i*(n>.94*a?.94*a/n:1))),h=.068*s;d.font=A=`700 ${s}px ${g}`;let p=q.map(e=>d.measureText(e).width),k=p.reduce((e,t)=>e+t,0)+h*(q.length-1),P=(a-k)*.5,T=.52*l;M=P,R=Math.max(1,k),E=[],d.fillStyle="#ffffff";for(let e=0;e<q.length;e++){let t=q[e];E.push({ch:t,x:P,y:T}),d.fillText(t,P,T),P+=p[e]+h}let S=d.getImageData(0,0,a,l).data,N=Math.ceil(a/(C=Math.max(5,Math.round((t?3.8:4.2)*v)))),D=Math.ceil(l/(w=Math.max(6,Math.round((t?4.8:5.3)*v)))),F=[];for(let e=0;e<D;e++){let t=Math.round((e+.5)*w);if(!(t<0)&&!(t>=l))for(let o=0;o<N;o++){let r=Math.round((o+.5)*C);if(r<0||r>=a)continue;let i=S[(t*a+r)*4+3],n=Math.max(0,r-Math.floor(.35*C)),s=Math.min(a-1,r+Math.floor(.35*C)),c=Math.max(0,t-Math.floor(.35*w)),m=Math.min(l-1,t+Math.floor(.35*w));if(36>Math.max(i,S[(t*a+n)*4+3],S[(t*a+s)*4+3],S[(c*a+r)*4+3],S[(m*a+r)*4+3]))continue;let u=Math.min(1,Math.max(0,(r-M)/R)),d=t/Math.max(1,l),h=Math.abs(43758.5453*Math.sin(12.9898*o+78.233*e))%1,p=+(i<200),f=(1-.32*d)*.72+.28*h,x=Math.min(Y.length-1,Math.max(2,Math.floor(f*Y.length)));F.push({px:r,py:t,col:o,row:e,xNorm:u,yNorm:d,baseIdx:x,phase:h*Math.PI*2,edgeFactor:p})}}y=F},U=t=>{let a=r.width,o=r.height;if(i.setTransform(1,0,0,1,0,0),i.clearRect(0,0,a,o),!e&&!p||S<=.001&&!p)return;let l=.001*t,n=i.createLinearGradient(0,0,a,o);if(n.addColorStop(0,"rgba(151, 223, 252, 0.34)"),n.addColorStop(.5,"rgba(196, 240, 255, 0.28)"),n.addColorStop(1,"rgba(133, 138, 227, 0.28)"),S<1){let e=M+R*Math.min(1,1.06*S);i.save(),i.beginPath(),i.rect(0,0,e,o),i.clip(),i.fillStyle=n,i.fillRect(0,0,a,o),i.restore()}else i.fillStyle=n,i.fillRect(0,0,a,o);let s=Math.max(7,Math.round(1.04*w));i.font=`700 ${s}px ${b}`,i.textAlign="center",i.textBaseline="middle";let c=56*v;for(let e=0;e<y.length;e++){let t=y[e],a=t.baseIdx,o="#97DFFC",r=.92;if(S<1){let e=.66*t.xNorm,i=(S-e)/.34;if(i<=0)continue;i<1?(a=Math.min(Y.length-1,Math.floor(i*Y.length)),o=i>.72?"#F7FAFF":i>.38?"#97DFFC":"#858AE3",r=Math.min(1,.35+.85*i)):o=.5+.5*Math.sin(1.4*l-6*t.xNorm+t.phase)>.68?"#F7FAFF":"#97DFFC"}else{let e=Math.sin(1.35*l-5.2*t.xNorm+2.4*t.yNorm+t.phase),i=e>.78?1:e<-.82?-1:0;if(a=Math.min(Y.length-1,Math.max(1,t.baseIdx+i)),t.edgeFactor&&e<-.2?(o="#B7EBFF",r=.86):e>.55||a>=7?(o="#F7FAFF",r=.98):e<-.55?(o="#858AE3",r=.82):(o="#97DFFC",r=.94),I>.005){let e=Math.hypot(t.px-_,t.py-B);if(e<c){let t=Math.pow(1-e/c,1.6)*I;t>.14&&(a=Math.min(Y.length-1,a+(t>.52?2:1)),o="#F7FAFF",r=1)}}}i.fillStyle=o,i.globalAlpha=r,i.fillText(Y[a],t.px,t.py)}if(i.globalAlpha=1,i.globalCompositeOperation="destination-in",i.drawImage(u,0,0),i.globalCompositeOperation="source-over",E.length>0){if(i.save(),S<1){let e=M+R*Math.min(1,1.06*S);i.beginPath(),i.rect(0,0,e,o),i.clip()}i.font=A,i.textAlign="left",i.textBaseline="middle",i.lineWidth=Math.max(.85,.85*v),i.strokeStyle="rgba(151, 223, 252, 0.56)";for(let e=0;e<E.length;e++){let t=E[e];i.strokeText(t.ch,t.x,t.y)}i.restore()}},W=performance.now(),z=e=>{if(k=window.requestAnimationFrame(z),document.hidden||!F){W=e;return}let t=Math.min(.05,Math.max(.001,(e-W)*.001));W=e;let a=N&&!D;a&&(0===T&&(T=e),(S=Math.min(1,(e-T)/Math.max(200,l)))>=1&&(D=!0));let o=L>I?14:8;I+=(L-I)*Math.min(1,t*o),.003>Math.abs(L-I)&&(I=L);let r=I>.003||L>0;a||r?U(e):D&&!h&&e-j>=95&&(j=e,U(e))};O(),p?(S=1,N=!0,D=!0,U(performance.now())):e&&(P=window.setTimeout(()=>{N=!0,T=0},a)),h?(e||p)&&U(performance.now()):k=window.requestAnimationFrame(z);let G=e=>{if("touch"===e.pointerType||h||!D)return;let t=o.getBoundingClientRect();_=(e.clientX-t.left)*v,B=(e.clientY-t.top)*v,L=1},H=()=>{L=0};o.addEventListener("pointermove",G,{passive:!0}),o.addEventListener("pointerleave",H,{passive:!0});let $=null;"u">typeof IntersectionObserver&&($=new IntersectionObserver(e=>{F=e[0]?.isIntersecting??!0},{threshold:.02})).observe(o);let V=new ResizeObserver(()=>{O(),(D||p||S>0)&&U(performance.now())});V.observe(o);let X=!1;return document.fonts?.ready.then(()=>{!X&&(O(),(D||p||S>0)&&U(performance.now()))}).catch(()=>{}),()=>{X=!0,window.clearTimeout(P),window.cancelAnimationFrame(k),o.removeEventListener("pointermove",G),o.removeEventListener("pointerleave",H),$?.disconnect(),V.disconnect()}},[e,t,a,l]),(0,o.jsxs)("span",{ref:n,"data-minus-wordmark":"vector-micro-ascii",className:`relative mx-auto block h-[64px] w-[276px] max-w-full cursor-default select-none sm:h-[104px] sm:w-[448px] ${i}`,children:[(0,o.jsx)("span",{ref:c,"aria-hidden":"true",className:"pointer-events-none sr-only font-heading font-bold",children:"MINUS"}),(0,o.jsx)("span",{ref:m,"aria-hidden":"true",className:"pointer-events-none sr-only font-mono font-semibold",children:"T"}),(0,o.jsx)("span",{className:"sr-only",children:"Minus"}),(0,o.jsx)("canvas",{ref:s,"aria-hidden":"true",className:"block h-full w-full"})]})}let K=[{index:"01",title:"Timed drops on a live clock.",body:"Every release opens on a shared countdown built for launch-second demand, so checkout stays steady instead of disappearing into an ad feed.",specTag:"LIVE CLOCK"},{index:"02",title:"Sizing matched to real garment measurements.",body:"Fit guidance built from each piece's actual flat specs and cut, so you pick the right size with confidence before a small run sells through.",specTag:"FLAT SPECS"},{index:"03",title:"Direct loyalty with the labels you wear.",body:"Collect pieces from independent brands to unlock tier status, early drop windows, and free shipping tied directly to that label.",specTag:"BRAND TIERS"},{index:"04",title:"Native drop-to-door tracking.",body:"Follow every order from confirmation to doorstep inside T^minus, without digging through inbox threads or scattered carrier links.",specTag:"ORDER FEED"}];function Z(e,t,a){let o=Math.min(1,Math.max(0,(a-e)/(t-e)));return o*o*(3-2*o)}function Q({skipIntro:e=!1}){let[t,a]=(0,r.useState)(e),[l,i]=(0,r.useState)(e),[n,s]=(0,r.useState)(null),[c,m]=(0,r.useState)(null),d=(0,r.useRef)(null),f=(0,r.useRef)(null),x=(0,r.useRef)(null),v=(0,r.useRef)(null),g=(0,r.useRef)(null),b=(0,r.useRef)(null),C=(0,r.useRef)(null),w=(0,r.useRef)(null),y=(0,r.useRef)(null);(0,r.useEffect)(()=>{try{let e=new URLSearchParams(window.location.search);"1"===e.get("skipIntro")&&(a(!0),i(!0))}catch{}},[]),(0,r.useEffect)(()=>{let e=document.documentElement.style.backgroundColor,t=document.body.style.backgroundColor;return document.documentElement.style.backgroundColor="#040206",document.body.style.backgroundColor="#040206",()=>{document.documentElement.style.backgroundColor=e,document.body.style.backgroundColor=t}},[]),(0,r.useEffect)(()=>{if(!n)return;let e=e=>{"Escape"===e.key&&s(null)};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[n]);let E=(0,r.useCallback)(e=>{let t=b.current;t&&(t.style.opacity=e.heroResolved?"1":"0",t.style.transform=`translate3d(-50%, ${e.countdownCenterY.toFixed(1)}px, 0) translateY(-50%)`);let a=C.current;if(a){let t=1-Z(.18,.48,e.polarFactor);a.style.opacity=t.toFixed(4),a.style.transform=`scale(${e.countdownScale.toFixed(4)})`}let o=w.current;if(o){let t=Z(.32,.68,e.polarFactor),a=e.viewportW<640,r=Math.min(1,Math.max(.55,Math.min(e.polarDiameterPx*(a?.75:.82)/(a?264:410),e.polarDiameterPx*(a?.72:.78)/(a?172:260)))),l=.86+.14*Z(.28,.74,e.polarFactor);o.style.opacity=t.toFixed(4),o.style.transform=`translate(-50%, -50%) scale(${(r*l).toFixed(4)})`}let r=g.current;if(r){let t=Z(.015,.22,e.pinProgress);r.style.opacity=(1-t).toFixed(4),r.style.transform=`translate3d(0, ${(-(34*t)).toFixed(1)}px, 0)`,r.style.pointerEvents=e.pinProgress>.14?"none":"auto"}let l=y.current;if(l){let t=Z(.68,.88,e.pinProgress);if(l.style.opacity=t.toFixed(4),t>.002&&e.domeRadiusPx>10){let t=e.viewportW<640,a=e.domeCenterX.toFixed(1),o=e.domeCenterY.toFixed(1),r=Math.max(24,122-e.domeCenterY),i=Math.min(r-22,e.domeRadiusPx+(t?16:14)).toFixed(1),n=Math.min(r-10,e.domeRadiusPx+(t?28:26)).toFixed(1),s=Math.min(r,e.domeRadiusPx+(t?42:40)).toFixed(1),c=Math.min(74,Math.max(24,e.domeEdgeY+12)).toFixed(1),m=Math.min(118,Math.max(58,e.domeEdgeY+38)).toFixed(1);l.style.backgroundImage=`radial-gradient(circle at ${a}px ${o}px, #040206 0px, #040206 ${i}px, rgba(4, 2, 6, 0.90) ${n}px, rgba(4, 2, 6, 0) ${s}px), linear-gradient(180deg, #040206 0px, #040206 ${c}px, rgba(4, 2, 6, 0) ${m}px)`}else l.style.backgroundImage="none"}},[]),A=(0,r.useCallback)(e=>{m(t=>({role:e,seq:(t?.seq??0)+1})),x.current?.scrollIntoView({behavior:"smooth",block:"center"}),window.setTimeout(()=>{f.current?.focus({preventScroll:!0})},320)},[]);return(0,o.jsxs)("div",{className:"relative min-h-[100dvh] w-full overflow-x-clip bg-[#040206] font-sans text-white selection:bg-[#613DC1]/55 selection:text-white",children:[(0,o.jsx)(F,{onHeroReveal:i,onHorizonSync:E,runwayRef:v,skipIntro:t}),(0,o.jsx)("div",{ref:y,"aria-hidden":"true",style:{opacity:0},className:"pointer-events-none fixed inset-0 z-20 will-change-[opacity]"}),(0,o.jsxs)("header",{className:`pointer-events-none fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-start px-5 transition-opacity duration-800 ease-out sm:h-[76px] sm:px-10 ${l?"opacity-100 delay-[720ms]":"opacity-0"}`,style:t?{transitionDelay:"0ms"}:void 0,children:[(0,o.jsx)("div",{"aria-hidden":"true",className:"pointer-events-none absolute top-0 left-0 h-20 w-52 sm:h-24 sm:w-64",style:{background:"radial-gradient(ellipse 95% 88% at 0% 0%, rgba(4, 2, 6, 0.92) 0%, rgba(4, 2, 6, 0.62) 48%, rgba(4, 2, 6, 0) 100%)"}}),(0,o.jsx)("a",{href:"#top",onClick:e=>{e.preventDefault(),window.scrollTo({top:0,behavior:"smooth"})},className:"pointer-events-auto relative z-10 text-white transition-opacity hover:opacity-85 focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:outline-none",children:(0,o.jsx)(p,{className:"[--wm-scale:1.05] sm:[--wm-scale:1.38]"})})]}),(0,o.jsx)("div",{ref:b,style:{opacity:+!!t,transform:"translate3d(-50%, calc(100dvh - 96px), 0) translateY(-50%)"},className:"pointer-events-none fixed top-0 left-1/2 z-40 transition-opacity duration-300 ease-out will-change-transform",children:(0,o.jsx)(_,{stripRef:C,polarRef:w})}),(0,o.jsxs)("main",{id:"top",className:"relative w-full",children:[(0,o.jsx)("div",{ref:v,className:"relative h-[255dvh] w-full sm:h-[305dvh]",children:(0,o.jsx)("section",{"data-section":"hero",className:`sticky top-0 z-[35] flex h-[100dvh] w-full flex-col items-center justify-center px-5 pt-12 pb-[23dvh] transition-opacity duration-500 ease-out sm:px-8 sm:pt-14 sm:pb-[24vh] ${l?"opacity-100":"pointer-events-none opacity-0"}`,children:(0,o.jsxs)("div",{ref:g,className:"flex w-full max-w-[660px] flex-col items-center text-center will-change-transform",children:[(0,o.jsxs)("h1",{className:"flex w-full flex-col items-center",children:[(0,o.jsx)("span",{style:{fontSize:"clamp(2.05rem, 4.1vw, 3.45rem)"},className:"block font-heading leading-[0.98] font-semibold tracking-[-0.035em] text-white",children:(0,o.jsx)($,{text:"Fashion.",active:l,instant:t,origin:"left",delayMs:120,durationMs:1080})}),(0,o.jsx)(J,{active:l,instant:t,delayMs:240,durationMs:1080,className:"my-1.5 sm:my-2"}),(0,o.jsx)("span",{style:{fontSize:"clamp(2.05rem, 4.1vw, 3.45rem)"},className:"block font-heading leading-[1.02] font-semibold tracking-[-0.035em] text-[#EAE5F5]",children:(0,o.jsx)($,{text:"the Noise.",active:l,instant:t,origin:"left",delayMs:420,durationMs:1140})})]}),(0,o.jsxs)("p",{className:"mt-3.5 max-w-[330px] font-sans text-[14.5px] leading-[1.52] font-normal text-[#DCD5EE] sm:mt-4 sm:max-w-[460px] sm:text-[16px] sm:leading-[1.55]",children:[(0,o.jsx)($,{text:"The best clothes in the world rarely have the loudest ",active:l,instant:t,delayMs:680,durationMs:1120,glyphClassName:"text-[#858AE3]"}),(0,o.jsx)("span",{className:"font-medium text-[#97DFFC]",children:(0,o.jsx)($,{text:"voice",active:l,instant:t,delayMs:1180,durationMs:620,glyphClassName:"text-[#97DFFC]"})}),(0,o.jsx)($,{text:".",active:l,instant:t,delayMs:1480,durationMs:220,glyphClassName:"text-[#858AE3]"})]}),(0,o.jsx)("div",{"data-hero-waitlist":"true",className:`mt-5 w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:mt-6 ${l?"translate-y-0 opacity-100 delay-[720ms]":"translate-y-2 opacity-0"}`,style:t?{transitionDelay:"0ms"}:void 0,children:(0,o.jsx)(G,{idPrefix:"hero-waitlist",inputRef:d,onOpenLegal:s})})]})})}),(0,o.jsxs)("div",{"data-below-fold":"true",className:"relative z-10 mx-auto w-full max-w-[1080px] px-5 pt-20 sm:px-10 sm:pt-28",children:[(0,o.jsxs)("section",{"data-band":"premise",className:"pb-16 sm:pb-24",children:[(0,o.jsxs)("p",{className:"font-mono text-[11px] font-medium tracking-[0.18em] text-[#A2A7F0] uppercase",children:[(0,o.jsx)("span",{className:"text-[#97DFFC]",children:"+"})," ",(0,o.jsx)(V,{text:"PREMISE",tier:"telemetry",instant:t})]}),(0,o.jsxs)("div",{className:"mt-5 grid grid-cols-1 gap-8 md:mt-6 md:grid-cols-12 md:items-end md:gap-12",children:[(0,o.jsx)("div",{className:"md:col-span-7",children:(0,o.jsx)("h2",{style:{fontSize:"clamp(1.92rem, 4.3vw, 3.6rem)"},className:"max-w-[18ch] font-heading leading-[1.03] font-semibold tracking-[-0.036em] text-white",children:(0,o.jsx)(V,{text:"Great independent labels shouldn't have to buy attention to be found.",tier:"headline",instant:t})})}),(0,o.jsxs)("div",{className:"flex flex-col justify-end md:col-span-5",children:[(0,o.jsx)(V,{tier:"prose",instant:t,delayMs:160,children:(0,o.jsx)("p",{className:"font-sans text-[15.5px] leading-[1.68] font-normal text-[#DDD6EF] sm:text-[16px]",children:"Small clothing brands put months into fabric, cut, and finish, only to disappear under paid feeds. T^minus gives independent labels a dedicated home built around scheduled releases, so buyers discover pieces for the garment itself."})}),(0,o.jsxs)("dl",{className:"mt-7 grid grid-cols-2 gap-4 border-t border-[#858AE3]/24 pt-5 font-mono text-[10.5px] tracking-[0.14em] uppercase",children:[(0,o.jsxs)("div",{children:[(0,o.jsx)("dt",{className:"text-[#9EA3EE]",children:"FORMAT"}),(0,o.jsx)("dd",{className:"mt-1 text-white",children:"SCHEDULED DROPS"})]}),(0,o.jsxs)("div",{children:[(0,o.jsx)("dt",{className:"text-[#9EA3EE]",children:"FEED RANKING"}),(0,o.jsx)("dd",{className:"mt-1 text-white",children:"ZERO PAID ADS"})]})]})]})]}),(0,o.jsx)("div",{className:"mt-14 sm:mt-20",children:(0,o.jsx)(X,{instant:t})})]}),(0,o.jsxs)("section",{"data-band":"architecture",className:"pb-16 sm:pb-24",children:[(0,o.jsxs)("div",{className:"mb-8 flex items-center justify-between font-mono text-[11px] font-medium tracking-[0.18em] text-[#A2A7F0] uppercase sm:mb-10",children:[(0,o.jsxs)("span",{children:[(0,o.jsx)("span",{className:"text-[#97DFFC]",children:"+"})," ",(0,o.jsx)(V,{text:"ARCHITECTURE",tier:"telemetry",instant:t})]}),(0,o.jsx)("span",{className:"text-[#A2A7F0]",children:"01 — 04"})]}),(0,o.jsx)("ol",{className:"divide-y divide-[#858AE3]/22 border-y border-[#858AE3]/22",children:K.map((e,a)=>(0,o.jsxs)("li",{className:"group relative py-7 transition-colors duration-200 [@media(hover:hover)]:hover:bg-[#613DC1]/[0.06] sm:px-3 sm:py-9",children:[(0,o.jsx)("span",{"aria-hidden":"true",className:"pointer-events-none absolute top-1/2 left-0 hidden -translate-y-1/2 font-mono text-[11px] text-[#97DFFC] opacity-0 transition-opacity duration-200 [@media(hover:hover)]:group-hover:opacity-100 sm:block",children:"+"}),(0,o.jsxs)("div",{className:"grid grid-cols-1 gap-3 md:grid-cols-12 md:items-baseline md:gap-8",children:[(0,o.jsxs)("div",{className:"flex items-center justify-between md:col-span-1 md:block",children:[(0,o.jsx)("span",{className:"font-mono text-[12.5px] font-medium tracking-[0.16em] text-[#97DFFC] tabular-nums",children:e.index}),(0,o.jsx)("span",{className:"font-mono text-[10px] font-medium tracking-[0.16em] text-[#A2A7F0] uppercase md:hidden",children:e.specTag})]}),(0,o.jsx)("div",{className:"md:col-span-4",children:(0,o.jsx)("h3",{className:"font-heading text-[21px] leading-[1.18] font-semibold tracking-[-0.025em] text-white sm:text-[23px]",children:(0,o.jsx)(V,{text:e.title,tier:"headline",instant:t,delayMs:70*a})})}),(0,o.jsx)("div",{className:"md:col-span-5",children:(0,o.jsx)(V,{tier:"prose",instant:t,delayMs:100+60*a,children:(0,o.jsx)("p",{className:"max-w-[44ch] font-sans text-[15px] leading-[1.64] text-[#D8D1EC]",children:e.body})})}),(0,o.jsx)("div",{className:"hidden text-right md:col-span-2 md:block",children:(0,o.jsx)("span",{className:"font-mono text-[10.5px] font-medium tracking-[0.16em] text-[#A2A7F0] uppercase transition-colors duration-200 [@media(hover:hover)]:group-hover:text-[#97DFFC]",children:e.specTag})})]})]},e.index))})]}),(0,o.jsxs)("section",{"data-band":"closing",className:"pb-12 sm:pb-16",children:[(0,o.jsxs)("div",{className:"grid grid-cols-1 gap-10 pb-14 md:grid-cols-2 md:gap-0 md:divide-x md:divide-[#858AE3]/22 sm:pb-16",children:[(0,o.jsxs)("div",{className:"flex flex-col justify-between md:pr-12 lg:pr-16",children:[(0,o.jsxs)("div",{children:[(0,o.jsxs)("p",{className:"font-mono text-[11px] font-medium tracking-[0.18em] text-[#A2A7F0] uppercase",children:[(0,o.jsx)("span",{className:"text-[#97DFFC]",children:"+"})," ",(0,o.jsx)(V,{text:"FOR SHOPPERS",tier:"telemetry",instant:t})]}),(0,o.jsx)("h3",{className:"mt-3.5 font-heading text-[24px] leading-[1.15] font-semibold tracking-[-0.03em] text-white sm:text-[28px]",children:(0,o.jsx)(V,{text:"Find drops worth waiting for.",tier:"headline",instant:t})}),(0,o.jsx)(V,{tier:"prose",instant:t,delayMs:100,children:(0,o.jsx)("p",{className:"mt-3.5 max-w-[42ch] font-sans text-[15px] leading-[1.66] text-[#D8D1EC]",children:"Discover independent releases on a live clock, check true garment measurements before launch, and get first access without scrolling past ads."})})]}),(0,o.jsxs)("button",{type:"button",onClick:()=>A("SHOPPER"),className:"mt-6 inline-flex w-fit cursor-pointer items-center gap-1.5 font-mono text-[11.5px] font-medium tracking-[0.14em] text-[#97DFFC] uppercase transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:outline-none",children:[(0,o.jsx)("span",{children:"Join as a shopper"}),(0,o.jsx)(u,{className:"size-3.5"})]})]}),(0,o.jsxs)("div",{className:"flex flex-col justify-between border-t border-[#858AE3]/20 pt-9 md:border-t-0 md:pt-0 md:pl-12 lg:pl-16",children:[(0,o.jsxs)("div",{children:[(0,o.jsxs)("p",{className:"font-mono text-[11px] font-medium tracking-[0.18em] text-[#A2A7F0] uppercase",children:[(0,o.jsx)("span",{className:"text-[#97DFFC]",children:"+"})," ",(0,o.jsx)(V,{text:"FOR INDEPENDENT LABELS",tier:"telemetry",instant:t})]}),(0,o.jsx)("h3",{className:"mt-3.5 font-heading text-[24px] leading-[1.15] font-semibold tracking-[-0.03em] text-white sm:text-[28px]",children:(0,o.jsx)(V,{text:"Launch on your own clock.",tier:"headline",instant:t})}),(0,o.jsx)(V,{tier:"prose",instant:t,delayMs:100,children:(0,o.jsx)("p",{className:"mt-3.5 max-w-[42ch] font-sans text-[15px] leading-[1.66] text-[#D8D1EC]",children:"Keep your own identity, story, and pricing. Turn every collection into a scheduled release event and build direct repeat buyers without paying ad platforms."})})]}),(0,o.jsxs)("button",{type:"button",onClick:()=>A("BRAND"),className:"mt-6 inline-flex w-fit cursor-pointer items-center gap-1.5 font-mono text-[11.5px] font-medium tracking-[0.14em] text-[#97DFFC] uppercase transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:outline-none",children:[(0,o.jsx)("span",{children:"Apply as a brand"}),(0,o.jsx)(u,{className:"size-3.5"})]})]})]}),(0,o.jsx)(X,{variant:"arch",instant:t,className:"mb-10 sm:mb-12"}),(0,o.jsxs)("div",{ref:x,className:"grid grid-cols-1 gap-8 border-b border-[#858AE3]/22 pb-12 md:grid-cols-12 md:items-center md:gap-10 sm:pb-14",children:[(0,o.jsxs)("div",{className:"md:col-span-6",children:[(0,o.jsx)("p",{className:"font-mono text-[11px] font-medium tracking-[0.18em] text-[#A2A7F0] uppercase",children:"APP STORE V1.0 \xb7 JANUARY 1, 2027"}),(0,o.jsxs)("h2",{style:{fontSize:"clamp(2.1rem, 4.1vw, 3.25rem)"},className:"mt-3 font-heading leading-[1.04] font-semibold tracking-[-0.035em] text-white",children:[(0,o.jsx)(V,{text:"Be there at ",tier:"headline",instant:t}),(0,o.jsx)("span",{className:"text-[#97DFFC]",children:(0,o.jsx)(V,{text:"T-zero.",tier:"headline",instant:t,delayMs:260})})]}),(0,o.jsx)("p",{className:"mt-3.5 max-w-[38ch] font-sans text-[15px] leading-[1.62] text-[#D8D1EC]",children:"Drop your mobile number for launch-day access and scheduled release alerts."})]}),(0,o.jsx)("div",{"data-closing-waitlist":"true",className:"flex md:col-span-6 md:justify-end",children:(0,o.jsx)(G,{idPrefix:"closing-waitlist",inputRef:f,onOpenLegal:s,requestedRole:c,align:"left"})})]})]}),(0,o.jsxs)("footer",{className:"flex items-center justify-between py-7 font-mono text-[11px] font-medium tracking-[0.1em] text-[#A2A7F0]",children:[(0,o.jsxs)("div",{className:"flex items-center gap-2.5",children:[(0,o.jsx)("button",{type:"button",onClick:()=>s("privacy"),className:"cursor-pointer transition hover:text-white",children:"Privacy"}),(0,o.jsx)("span",{className:"text-[#858AE3]/55",children:"\xb7"}),(0,o.jsx)("button",{type:"button",onClick:()=>s("terms"),className:"cursor-pointer transition hover:text-white",children:"Terms"})]}),(0,o.jsx)("span",{children:"\xa9 2026 T^minus"})]})]})]}),n?(0,o.jsx)("div",{role:"dialog","aria-modal":"true","aria-labelledby":"legal-modal-title",className:"fixed inset-0 z-50 flex items-center justify-center bg-[#040206]/90 px-5",onClick:()=>s(null),children:(0,o.jsxs)("div",{className:"relative w-full max-w-[480px] rounded-[6px] border border-[#858AE3]/30 bg-[#07050D] p-6 text-left sm:p-7",onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)("div",{className:"flex items-start justify-between gap-4",children:[(0,o.jsxs)("div",{children:[(0,o.jsxs)("p",{className:"font-mono text-[10.5px] font-medium tracking-[0.16em] text-[#A2A7F0] uppercase",children:[(0,o.jsx)("span",{className:"text-[#97DFFC]",children:"+"})," LEGAL \xb7"," ","privacy"===n?"PRIVACY":"TERMS"]}),(0,o.jsx)("h2",{id:"legal-modal-title",className:"mt-2 font-heading text-[21px] font-semibold tracking-[-0.025em] text-white",children:"privacy"===n?"Privacy Policy":"SMS & Waitlist Terms"})]}),(0,o.jsx)("button",{type:"button",onClick:()=>s(null),"aria-label":"Close",className:"inline-flex size-8 cursor-pointer items-center justify-center rounded-[4px] border border-[#858AE3]/30 bg-[#040206] text-[#DCD5EE] transition hover:border-[#97DFFC]/75 hover:text-white",children:(0,o.jsx)(h,{className:"size-4"})})]}),(0,o.jsx)("div",{className:"mt-4 space-y-3 border-t border-[#858AE3]/20 pt-4 text-[13.5px] leading-[1.64] text-[#DCD5EE]",children:"privacy"===n?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("p",{children:"T^minus collects your mobile phone number, your selected waitlist role (shopper or brand), and an optional brand handle solely to notify you about the January 1, 2027 App Store v1.0 launch, early drop access, and brand onboarding."}),(0,o.jsx)("p",{children:"We never sell, rent, or broker your phone number to third parties. You can opt out at any time by replying STOP to any message."})]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("p",{children:"By checking the SMS consent box and joining the T^minus waitlist, you agree to receive occasional launch-day and live drop text alerts at the mobile number provided. Consent is not a condition of purchase."}),(0,o.jsx)("p",{children:"Message and data rates may apply. Reply STOP to opt out at any time or HELP for support."})]})})]})}):null]})}},7894:(e,t,a)=>{Promise.resolve().then(a.bind(a,4307))}}]);