(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[894],{4307:(e,t,a)=>{"use strict";a.d(t,{LandingExperience:()=>el});var o=a(5155),r=a(2115);let l=(...e)=>{let t=new Set;for(let a of e)if("string"==typeof a)for(let e of a.split(/\s+/))e&&t.add(e);return[...t].join(" ")},i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},n=(0,r.createContext)({}),s=(0,r.forwardRef)(({color:e,size:t,width:a,height:o,strokeWidth:s,absoluteStrokeWidth:c,nonScalingStroke:u,className:m="",children:d,iconNode:h=[],icon:p={node:h,aliases:[],size:24},...f},x)=>{let{size:g=24,strokeWidth:v=2,absoluteStrokeWidth:b=!1,nonScalingStroke:w=!1,color:y="currentColor",className:C=""}=(0,r.useContext)(n)??{},E=!!d||(e=>{if(null==e||"object"!=typeof e)return!1;for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t)&&(t.startsWith("aria-")||"role"===t||"title"===t)&&null!=e[t])return!0;return!1})(f),[R,S,A=[]]=function(e,t={}){return function(e,t={}){let a=t.attributeNames??{},o=e=>a[e]??e,r=e.size??e.width??i.width,n=e.size??e.height??i.height,s=e.aliases?.filter(e=>"string"==typeof e&&""!==e.trim()).map(e=>`lucide-${e}`)??[],c=[...e.name?[`lucide-${e.name}`]:[],...s],u=t.className?.split(" ").filter(Boolean)??[],m=!1===t.includeDefaultClasses?l(...u):l("lucide",...c,...u),d=t.strokeWidth??i["stroke-width"];if(t.absoluteStrokeWidth){let a=Number(d)*Number(e.size??e.width??i.width)/Number(t.size??t.width??i.width);Number.isFinite(a)&&(d=a)}return["svg",{...Object.entries(i).reduce((e,[t,a])=>(e[o(t)]=a,e),{}),..."color"in t&&t.color&&{[o("stroke")]:t.color},..."size"in t&&null!=t.size&&{[o("width")]:t.size,[o("height")]:t.size},..."width"in t&&null!=t.width&&{[o("width")]:t.width},..."height"in t&&null!=t.height&&{[o("height")]:t.height},[o("stroke-width")]:d,...m&&{[o("class")]:m},[o("viewBox")]:`0 0 ${r} ${n}`,...!1===t.hasA11yProp?{[o("aria-hidden")]:"true"}:{},..."attributes"in t&&t.attributes},e.node.map(e=>{let[a,r,l]=e,i=t.nonScalingStroke?{[o("vector-effect")]:"non-scaling-stroke",...r}:r;return l?[a,i,l]:[a,i]})]}(e,{...t,attributeNames:{...t.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}(p,{color:e??y,width:a??t??g,height:o??t??g,strokeWidth:s??v,absoluteStrokeWidth:c??b,nonScalingStroke:u??w,className:l(C,m),hasA11yProp:E,attributes:f});return(0,r.createElement)(R,{ref:x,...S},[...A.map(([e,t])=>(0,r.createElement)(e,t)),...Array.isArray(d)?d:[d]])});function c(e,t=[],a=[]){let o,l="string"==typeof e?function(e,t,a=[]){if(null==t)throw Error("[lucide]: iconNode is required when icon name is used");return{name:(e.match(/\d+[xX]\d+|[A-Z]?[a-z]+|[A-Z]|\d+/g)??[]).join("-").toLowerCase(),size:24,node:t,...a.length>0?{aliases:a}:{}}}(e,t,a):e,i=(0,r.forwardRef)(({className:e,...t},a)=>(0,r.createElement)(s,{ref:a,icon:l,className:e,...t}));return l.name&&(i.displayName=(o=(e=>{let t="",a=!1;for(let o of e){if("-"===o||"_"===o||o<=" "){a=t.length>0;continue}0===t.length?t+=o.toLowerCase():t+=a?o.toUpperCase():o,a=!1}return t})(l.name)).charAt(0).toUpperCase()+o.slice(1)),i}let u={name:"arrow-down-right",size:24,node:[["path",{d:"m7 7 10 10",key:"1fmybs"}],["path",{d:"M17 7v10H7",key:"6fjiku"}]]};u.node;let m=c(u),d={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};d.node;let h=c(d);function p({scale:e,className:t=""}){let a={gap:"calc(1px * var(--wm-scale, 1))",...void 0!==e?{"--wm-scale":String(e)}:{}};return(0,o.jsxs)("span",{"aria-label":"T-minus",className:`inline-flex items-baseline leading-none select-none ${t}`,style:a,children:[(0,o.jsx)("span",{"aria-hidden":"true",className:"font-serif font-medium italic",style:{fontSize:"calc(26px * var(--wm-scale, 1))",lineHeight:1},children:"T"}),(0,o.jsx)("span",{"aria-hidden":"true",className:"font-sans font-medium",style:{fontSize:"calc(15px * var(--wm-scale, 1))",lineHeight:1,letterSpacing:"calc(-0.5px * var(--wm-scale, 1))",transform:"translateY(calc(-3px * var(--wm-scale, 1)))",display:"inline-block"},children:"^minus"})]})}let f=Date.parse("2027-01-01T00:00:00-05:00");function x(e){let t=e.trim();if(!t)return null;let a=t.startsWith("+"),o=t.replace(/\D/g,"");return a?o.length<8||o.length>15||o.startsWith("0")?null:`+${o}`:10===o.length?"0"===o[0]||"1"===o[0]?null:`+1${o}`:11===o.length&&o.startsWith("1")?"0"===o[1]||"1"===o[1]?null:`+${o}`:o.length>=11&&o.length<=15&&!o.startsWith("0")?`+${o}`:null}let g=r.useLayoutEffect,v=" .:-^tT",b=`#version 300 es
precision highp float;
out vec2 vUv;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,w=`#version 300 es
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
}`,y=`#version 300 es
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
}`,E=`#version 300 es
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
}`;function R(e,t,a,o){let r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,t,a,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);let l=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,l),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),e.bindFramebuffer(e.FRAMEBUFFER,null),{tex:r,fb:l,w:t,h:a}}function S(e,t){t&&(e.deleteFramebuffer(t.fb),e.deleteTexture(t.tex))}function A(e){return e<0?0:e>1?1:e}function M(e,t,a){let o=A((a-e)/(t-e));return o*o*(3-2*o)}function k(e){return e*Math.PI/180}function P(e){let t=.96+.76*Math.pow(M(0,2.62,e),.92),a=Math.max(0,e-1.7),o=.045*Math.sin(6.5*e+7.5*a*a)*(M(.32,1.82,e)*(1-M(2.68,3.05,e)));if(e<=2.8)return t+o+(e>2.65?.012*Math.sin((e-2.65)*42):0);let r=M(0,1,A((e-2.8)/(4.15-2.8)));return 1.72+-1.6099999999999999*r+o*(1-r)}function T(e){let t=Math.max(0,Math.min(4.4,e))/64,a=0;for(let e=0;e<64;e++)a+=.44*Math.pow(.96/Math.max(.11,P((e+.5)*t)),1.35)*t;return a}function F(e,t,a,o,r,l,i,n){let s=o.x+i*r*l*t.x+n*l*a.x,c=o.y+i*r*l*t.y+n*l*a.y,u=o.z+i*r*l*t.z+n*l*a.z,m=1/Math.max(1e-6,Math.hypot(s,c,u)),d=s*m,h=c*m,p=u*m,f=-(e.x*d+e.y*h+e.z*p);return f<=0?99:Math.hypot(e.x+f*d,e.y+f*h,e.z+f*p)}function N(e,t,a,o,r,l,i,n,s){let c=1,u=-.35;if(F(e,t,a,o,r,l,n,1)>=s)return 0;for(let i=0;i<12;i++){let i=.5*(u+c);F(e,t,a,o,r,l,n,i)<s?c=i:u=i}return(.5-.5*(u+c)*.5)*i}function D({onHeroReveal:e,onHorizonSync:t,runwayRef:a,controlRef:l,skipIntro:i=!1}){let n=(0,r.useRef)(null),s=(0,r.useRef)(null),c=(0,r.useRef)(null),u=(0,r.useRef)(null),m=(0,r.useRef)(e),d=(0,r.useRef)(t),h=(0,r.useRef)(a),p=(0,r.useRef)(l);return(0,r.useEffect)(()=>{m.current=e,d.current=t,h.current=a,p.current=l},[e,t,a,l]),g(()=>{let e=s.current,t=n.current;if(!e||!t)return;let a=!1,o=null;try{let e=new URLSearchParams(window.location.search);a="1"===e.get("skipIntro");let t=e.get("introAt");if(null!==t){let e=Number(t);Number.isFinite(e)&&e>=0&&e<=14&&(o=e)}}catch{}let r=window.matchMedia("(prefers-reduced-motion: reduce)").matches,l=window.matchMedia("(pointer: fine)").matches,x=i||a||r,g=x||null!==o&&o>=9.9;g&&m.current(!0),x&&u.current&&(u.current.style.display="none");let F=t.getContext("2d"),D=function(){let e=[".",":","-","^","t"],t=[],a=918273,o=()=>(a=1664525*a+0x3c6ef35f>>>0)/0x100000000;for(let a=0;a<64;a++){let a=o(),r=o(),l=o(),i=Math.min(1,Math.hypot((a-.5)*1.15,r-.78)/.95);t.push({nx:a,ny:r,glyph:e[Math.floor(o()*e.length)],phase:o()*Math.PI*2,speed:.35+.75*o(),sizeCss:o()>.66?12:10,tint:l>.86?"ice":l>.42?"periwinkle":"accent",crestDist:i})}return t}(),j=e.getContext("webgl2",{alpha:!0,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1});if(!j){u.current&&(u.current.style.display="none"),m.current(!0);return}let[B,_,I,O]=function(e,t){let a=e.createShader(e.VERTEX_SHADER);if(!a)throw Error("Unable to create vertex shader");e.shaderSource(a,b),e.compileShader(a);let o=t.map(t=>{let o=e.createShader(e.FRAGMENT_SHADER);if(!o)throw Error("Unable to create fragment shader");e.shaderSource(o,t),e.compileShader(o);let r=e.createProgram();if(!r)throw Error("Unable to create WebGL2 program");return e.attachShader(r,a),e.attachShader(r,o),e.linkProgram(r),{fs:o,prog:r}}),r=[];for(let{fs:t,prog:l}of o){if(!e.getProgramParameter(l,e.LINK_STATUS)){let o=e.getProgramInfoLog(l)||"",r=e.getShaderInfoLog(t)||"",i=e.getShaderInfoLog(a)||"";throw e.deleteProgram(l),e.deleteShader(t),e.deleteShader(a),Error(`Program link error: ${o} ${r} ${i}`.trim())}e.deleteShader(t);let o={},i=e.getProgramParameter(l,e.ACTIVE_UNIFORMS);for(let t=0;t<i;t++){let a=e.getActiveUniform(l,t);a&&(o[a.name]=e.getUniformLocation(l,a.name))}r.push({prog:l,u:o})}return e.deleteShader(a),r}(j,[w,y,C,E]),L=j.createVertexArray();j.bindVertexArray(L);let U='"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace',z=null,W=0,G=0,H="",$=null,X=!1,V=0,Y=0,q=0,J=0,K=window.innerWidth||1440,Z=window.innerHeight||900,Q=1.25,ee=192,et=86,ea=9,eo=13,er=0,el=0,ei=!1,en=.38,es="full",ec=null,eu=null,em=null,ed=null,eh=0,ep=Math.max(420,1.8*(window.innerHeight||900)),ef=()=>{let e=h.current?.current;if(e){let t=e.getBoundingClientRect();eh=t.top+window.scrollY,ep=Math.max(1,t.height-window.innerHeight)}else eh=0,ep=Math.max(420,2*window.innerHeight)},ex=()=>{for(let e of(j.disable(j.SCISSOR_TEST),j.clearColor(0,0,0,0),[ec,eu,em,ed]))e&&(j.bindFramebuffer(j.FRAMEBUFFER,e.fb),j.viewport(0,0,e.w,e.h),j.clear(j.COLOR_BUFFER_BIT));j.bindFramebuffer(j.FRAMEBUFFER,null)},eg=(e=!1)=>{if((!x||e)&&!(!e&&X&&16>=Math.abs(K-V)&&16>=Math.abs(Z-Y))){var t,a,o,r;let e,l,i,n,s,c,u,m,d,h,p,f,x,g,v;V=K,Y=Z,t=$,a=K,o=Z,e=Math.min(1536,Math.max(640,Math.round(1.2*a))),l=Math.min(960,Math.max(420,Math.round(1.2*o))),(i=document.createElement("canvas")).width=e,i.height=l,r=i.getContext("2d"),r.clearRect(0,0,e,l),r.fillStyle="#000000",r.fillRect(0,0,e,l),n=a<768,s=e/Math.max(1,a)*(n?4.2:7.4)/1,c=e=>`italic 500 ${Math.round(26*e)}px "Newsreader", "New York", Georgia, ui-serif, serif`,u=e=>`500 ${Math.round(15*e)}px "Inter Tight", "Inter", -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif`,d=(m=e=>{let t=1.4*e,a=-.35*e;r.font=c(e);let o=r.measureText("T").width;r.font=u(e);let l=["^","m","i","n","u","s"],i=l.map(e=>r.measureText(e).width),n=i.reduce((e,t)=>e+t,0)+a*(l.length-1);return{tWidth:o,chars:l,charWidths:i,gap:t,tracking:a,totalWidth:o+t+n}})(s),d=m(s=e*(n?.76:.56)*s/Math.max(1,d.totalWidth)),h=.5*l+26*s*.34,p=.5*e-.5*d.totalWidth,f=3*s,x=(e,t,a=!1)=>{r.save(),r.fillStyle=e,r.shadowColor=t>0?e:"transparent",r.shadowBlur=t,r.textAlign="left",r.textBaseline="alphabetic";let o=p;a||(r.font=c(s),r.fillText("T",o,h)),o+=d.tWidth+d.gap,r.font=u(s);for(let e=0;e<d.chars.length;e++){let t=d.chars[e],l="^"===t;if(!a||l){let e=h-f;r.fillText(t,o,e)}o+=d.charWidths[e]+d.tracking}r.restore()},g=Math.max(12,Math.round(3.8*s)),r.globalCompositeOperation="lighter",x("rgb(0, 200, 0)",g),x("rgb(255, 0, 0)",0),x("rgb(0, 0, 255)",0,!0),r.globalCompositeOperation="source-over",v=t??j.createTexture(),j.bindTexture(j.TEXTURE_2D,v),j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,!0),j.texImage2D(j.TEXTURE_2D,0,j.RGBA,j.RGBA,j.UNSIGNED_BYTE,i),j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,!1),j.texParameteri(j.TEXTURE_2D,j.TEXTURE_MIN_FILTER,j.LINEAR),j.texParameteri(j.TEXTURE_2D,j.TEXTURE_MAG_FILTER,j.LINEAR),j.texParameteri(j.TEXTURE_2D,j.TEXTURE_WRAP_S,j.CLAMP_TO_EDGE),j.texParameteri(j.TEXTURE_2D,j.TEXTURE_WRAP_T,j.CLAMP_TO_EDGE),$=v,X=!0}},ev=(a=!1,r=!1)=>{let l=Math.max(1,Math.round(window.innerWidth||1440)),i=Math.max(1,Math.round(window.innerHeight||900));if(!r){let t=e.getBoundingClientRect();l=Math.max(1,Math.round(t.width||l)),i=Math.max(1,Math.round(t.height||i))}let n=l<640,s=l>=640&&l<1024,u=ei?1:l>=1024?1.25:1.5,m=Math.min(Math.max(window.devicePixelRatio||1,1),u),d=Math.max(2,Math.round(l*m)),h=Math.max(2,Math.round(i*m));K=l,Z=i,Q=m,!r&&c.current&&(U=window.getComputedStyle(c.current).fontFamily);let p=Math.max(6,Math.round((n?6:s?6.8:7.5)*m)),f=Math.max(9,Math.round((n?8.8:s?9.6:10.5)*m)),g=Math.max(48,Math.floor(d/p)),b=Math.max(36,Math.floor(h/f)),w=Math.floor((d-g*p)*.5),y=Math.floor((h-b*f)*.5),C=ei?.28:n?.34:.38;if((a||!z||p!==W||f!==G||U!==H)&&(W=p,G=f,H=U,z=function(e,t,a,o,r){let l=document.createElement("canvas");l.width=a*v.length,l.height=2*o;let i=l.getContext("2d");i.fillStyle="#000000",i.fillRect(0,0,l.width,l.height),i.fillStyle="#ffffff",i.textAlign="center",i.textBaseline="middle";let n=Math.max(8,Math.round(.84*o));i.font=`500 ${n}px ${r}`;for(let e=0;e<v.length;e++)i.fillText(v[e],Math.round((e+.5)*a),Math.round(.52*o));let s=Math.max(8,Math.round(.88*o));i.font=`600 ${s}px ${r}`;for(let e=0;e<v.length;e++)i.fillText(v[e],Math.round((e+.5)*a),Math.round(1.52*o));let c=t??e.createTexture();return e.bindTexture(e.TEXTURE_2D,c),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,l),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),c}(j,z,p,f,U)),$)r||!X||x||eg(!1);else if(null!==o&&o>=4&&!x)eg(!0);else{let e;e=j.createTexture(),j.bindTexture(j.TEXTURE_2D,e),j.texImage2D(j.TEXTURE_2D,0,j.RGBA,2,2,0,j.RGBA,j.UNSIGNED_BYTE,new Uint8Array(16)),j.texParameteri(j.TEXTURE_2D,j.TEXTURE_MIN_FILTER,j.NEAREST),j.texParameteri(j.TEXTURE_2D,j.TEXTURE_MAG_FILTER,j.NEAREST),j.texParameteri(j.TEXTURE_2D,j.TEXTURE_WRAP_S,j.CLAMP_TO_EDGE),j.texParameteri(j.TEXTURE_2D,j.TEXTURE_WRAP_T,j.CLAMP_TO_EDGE),$=e}if(d===q&&h===J&&g===ee&&b===et&&p===ea&&f===eo&&C===en&&ec)return;q=d,J=h,ee=g,et=b,ea=p,eo=f,er=w,el=y,en=C,es="full",e.width=q,e.height=J,(t.width!==l||t.height!==i)&&(t.width=l,t.height=i),S(j,ec),S(j,eu),S(j,em),S(j,ed);let E=Math.max(64,Math.round(q*C)),A=Math.max(32,Math.round(.18*q)),M=Math.max(32,Math.round(.18*q));ec=R(j,E,Math.max(64,Math.round(J*C)),j.LINEAR),eu=R(j,ee,et,j.NEAREST),em=R(j,A,M,j.LINEAR),ed=R(j,A,M,j.LINEAR),r||ex()};ev(!0,!0);let eb=!1,ew=(e,t,a)=>{a&&(j.activeTexture(j.TEXTURE0+e),j.bindTexture(j.TEXTURE_2D,t),j.uniform1i(a,e))},ey=(e,t,a)=>{let o=e?e.w:q,r=e?e.h:J;if(j.bindFramebuffer(j.FRAMEBUFFER,e?e.fb:null),j.viewport(0,0,o,r),t<=.001&&a>=.999)j.disable(j.SCISSOR_TEST);else{let e=Math.max(0,Math.floor(t*r)-2),l=Math.min(r,Math.ceil(a*r)+2);j.enable(j.SCISSOR_TEST),j.scissor(0,e,o,Math.max(1,l-e))}},eC=.5,eE=.5,eR=.5,eS=.5,eA=0,eM=0,ek=0,eP=0,eT=e=>{"touch"===e.pointerType||r||(eC=A(e.clientX/Math.max(1,K)),eE=A(1-e.clientY/Math.max(1,Z)),eA=1)},eF=()=>{eA=0};window.addEventListener("pointermove",eT,{passive:!0}),window.addEventListener("pointerleave",eF,{passive:!0});let eN=null!==o?Math.min(9.9,o):9.9*!!x,eD=null!==o?Math.max(0,o-9.9):2*!!x,ej=null!==o?T(o):0,eB=!1,e_=0,eI=0,eO=!1,eL=0,eU=0,ez=performance.now(),eW=0,eG=0,eH=!1,e$=null,eX=.0166,eV=0,eY=-1,eq=0;p.current&&(p.current.current={skipIntro:()=>{o=null,x=!1,eB=!1,eN=9.9,eD=0,g||(g=!0,m.current(!0)),u.current&&(u.current.style.display="none"),eW=0},replayIntro:()=>{!r&&(o=null,x=!1,eN=0,eD=0,ej=0,eI=0,eO=!1,eL=0,eB=window.scrollY>24,e_=0,eU=0,g=!1,m.current(!1),F&&F.clearRect(0,0,K,Z),es="full",ex(),X||eg(!0))},pulseHorizon:e=>{r||("subtle"===e?eI=Math.min(1,Math.max(eI,.72)):(eO=!0,eL=0,eI=1,eW=0))}});let eJ=(e,t=!1)=>{var a,i,n,s,c,h,p;let b=t?.001:Math.max(.001,(e-ez)*.001),w=Math.min(.05,b),y=Math.min(.4,b);ez=e,!t&&(eX=.92*eX+.08*Math.min(b,.12),!ei&&eX>.026?(eV+=y)>.75&&(ei=!0,ev()):eV=Math.max(0,eV-.5*y));let C=Math.min(1,8.5*w);eR+=(eC-eR)*C,eS+=(eE-eS)*C,eM+=(eA-eM)*Math.min(1,5.2*w);let E=l&&!r&&eA>.5?(eC-.5)*2:0,R=l&&!r&&eA>.5?(eE-.5)*2:0,S=Math.min(1,4.2*w);ek+=(E-ek)*S,eP+=(R-eP)*S,eI>.001&&(eI=Math.max(0,eI*Math.exp(-(4.8*w))))<.002&&(eI=0);let L=0,W=0;eO&&(eL+=w,L=M(0,.08,W=A(eL/1.25))*(1-M(.28,1,W)),eL>=1.25&&(eO=!1,eL=0,L=0));let G=A((window.scrollY-eh)/ep),H=Math.min(.18,b);if(eU+=(G-eU)*Math.min(1,14*H),4e-4>Math.abs(G-eU)&&(eU=G),eB&&(e_+=y,(window.scrollY<=24||e_>.9)&&(eB=!1,eU=0)),null!==o)eN=Math.min(9.9,o),eD=Math.max(0,o-9.9);else if(eB)eN=0,eD=0;else if(!t&&eN<9.9){let e=window.scrollY>24?6.5:1;eN=Math.min(9.9,eN+y*e)}else t||(eD=Math.min(10,eD+y));x||X||!(eN>=3.5)||eg(!0);let V=x||eN>=9.9-.001;if(!g&&V&&(g=!0,m.current(!0)),!ec||!eu||!em||!ed||!z)return;let Y=null!==o?o:.001*e,en=K<768,ef=q/Math.max(1,J),eb=Math.tan(k(23)),eT=1-M(4.08,4.24,eN),eF=P(eN),eG=M(.05,2.55,eN)*(1-M(2.68,3.22,eN));null!==o?ej=T(eN):!t&&eT>.002&&(ej+=.44*Math.pow(.96/Math.max(.11,eF),1.35)*w);let eH=M(2.85,3.92,eN)*(1-M(4.08,4.24,eN)),eJ=M(2.85,3.92,eN),eK=A(.58*M(.95,2.55,eN)+.42*M(2.68,3.92,eN)),eZ=M(2.68,3.18,eN)*(1-M(4.1,4.26,eN)),eQ=M(3.65,4.12,eN)*(1-M(4.16,4.42,eN)),e0=M(4.12,4.32,eN)*(1-M(5.22,5.72,eN)),e1=A((eN-4.12)/1.83),e2=M(4.12,4.32,eN)*(1-M(6.2,7.25,eN)),e5=A((eN-4.12)/3.13),e4=M(4.32,4.52,eN)*(1-M(5.26,5.5,eN)),e3=M(5.2,5.4,eN),e8=.04+.96*(1-Math.pow(1-M(0,1,A((eN-5.2)/(6.85-5.2))),1.65)),e6=M(5.25,5.72,eN)*(1-M(6.95,7.45,eN)),e9=A((eN-5.25)/(7.35-5.25)),e7=M(5.32,6.65,eN),te=M(3.65,4.08,eN)*(1+.64*eQ+.35*e0)*(1-M(6.8,8.05,eN)),tt=(a=A((eN-7.45)/2.45))<.5?16*a*a*a*a*a:1-Math.pow(-2*a+2,5)/2,ta=!x&&eN>=9.9-.001?M(0,.08,eD)*(1-M(.16,.54,eD)):0,to=A(eD/.54),tr=x?1:V?M(0,.95,eD):0,tl=eT*(1-M(.16,.72,eJ)),ti=en?.195:.212,tn=en?2.08:1.62,ts=Math.asin(1/tn),tc=Math.atan((-1+2*ti)*eb),tu=en?2.34:2.15,tm=Math.asin(1/tu),td=Math.atan((1-2*(en?.084:.068))*eb),th=Math.max(3.4,Math.min(7.8,1/Math.sin(Math.atan(Math.max(.08,(en?Math.min(.395*K,.195*Z):Math.min(.19*K,.285*Z))/(.5*Z)*eb))))),tp=eU,tf=M(0,.28,tp),tx=A((tp-.28)/.38),tg=M(.66,1,tp),tv=M(.14,.3,tp)*(1-M(.64,.84,tp))*tt,tb=M(.55,.9,tv),tw=0,ty=0,tC=0;if(!r&&tt>.5&&tb>.001&&null===o){let e=Math.max(0,f-Date.now()),t=Math.floor(e/1e3);tC=e>0?999-e%1e3:0,t!==eY&&(eY=t,eq=performance.now()-tC),tC<360&&(ty=tC/360,tw=(tC<40?M(0,40,tC):Math.exp(-((tC-40)/115)))*(1-M(285,360,tC))*tb)}let tE=tt*(1-M(.58,.84,tp))*(l&&!r?1:0),tR=k(2.2)*ek*tE,tS=1.2*eP*tE,tA=26+62*tf+66*tg,tM=tg>.05?tA+tS:Math.min(89.2,tA+tS),tk=th+(.94*th-th)*tx,tP=tg>0?tk+(tu-tk)*tg:tn+(tk-tn)*tf,tT=tg>0?0+(-(td+tm)-0)*tg:(i=ts-tc)+(0-i)*tf,tF=tf*k(12)+tx*k(42)+tg*k(16),tN=((s=(n=7.6+.5999999999999996*M(0,2.65,eN))+(7.85-n)*M(2.75,4.15,eN))+(5.85-s)*M(4.35,7.45,eN))*(en?1.28:1),tD=19+-4*M(0,7.45,eN),tj=(c=k(-22),c+(k(-18)-c)*M(0,7.45,eN)),tB=tD+(tM-tD)*tt,t_=k(tB),tI=tN+(tP-tN)*tt,tO=0+(tT-0)*tt,tL=tj+(0-tj)*tt,tU=0+(tF-0)*tt+tR,tz=Math.sin(t_),tW=Math.cos(t_),tG=Math.sin(tU),tH=Math.cos(tU),t$=(e,t,a)=>({x:e*tH+a*tG,y:t,z:-e*tG+a*tH}),tX=t$(0,tI*tz,tI*tW),tV=t$(0,-tz,-tW),tY=t$(0,tW,-tz),tq=t$(1,0,0),tJ=Math.cos(tO),tK=Math.sin(tO),tZ={x:tJ*tV.x+tK*tY.x,y:tJ*tV.y+tK*tY.y,z:tJ*tV.z+tK*tY.z},tQ={x:-tK*tV.x+tJ*tY.x,y:-tK*tV.y+tJ*tY.y,z:-tK*tV.z+tJ*tY.z},t0=Math.cos(tL),t1=Math.sin(tL),t2={x:t0*tq.x+t1*tQ.x,y:t0*tq.y+t1*tQ.y,z:t0*tq.z+t1*tQ.z},t5={x:-t1*tq.x+t0*tQ.x,y:-t1*tq.y+t0*tQ.y,z:-t1*tq.z+t0*tQ.z},t4=Math.min(.72*tI,en?1.38:1.28),t3=5.2+((h=t4+(Math.min(.66*tI,en?1.22:1.18)-t4)*tg)+(5.6-h)*tv-5.2)*tt,t8=Z*(1-.45*ti),t6=.5*Z,t9=(p=t8+((en?33:31)-t8)*M(0,1,tp))+(t6-p)*tv,t7=1+((en?.58:.64)-1)*M(0,1,tp),ae=Math.max(160,2*(Math.tan(Math.asin(A(1/Math.max(1.05,tI))))/eb*(.5*Z))),at=.5*K,aa=-(.6*Z),ao=.75*Z,ar=36,al=0;if(tp>.62&&tt>.5){let e=N(tX,t2,t5,tZ,ef,eb,Z,0,1.08),t=N(tX,t2,t5,tZ,ef,eb,Z,.85,1.08),a=.5*K*.85,o=Math.max(8,e-t),r=(a*a+o*o)/(2*o);at=.5*K,ao=r,aa=e-r,ar=t,al=e}d.current?.({pinProgress:tp,settleProgress:tt,polarFactor:tv,polarDiameterPx:ae,heroResolved:V,countdownCenterY:t9,countdownScale:t7,domeCenterX:at,domeCenterY:aa,domeRadiusPx:ao,domeEdgeY:ar,viewportW:K,introElapsed:eN,elevDeg:tA,scrollAzimDeg:180*tF/Math.PI,tickPulse:tw,tickProg:ty});let ai=L>.01?24:eM>.02?40:72;(tr>.005||tt>.05)&&e-eW>=ai&&(eW=e,((e,t,a,o,l,i)=>{if(!F||K<=1||Z<=1||o<=.005&&a<=.05)return;if(F.setTransform(1,0,0,1,0,0),F.clearRect(0,0,K,Z),a>.05){let e=Z*(.84+-.75*t),o=Math.max(K,Z)*(.26+-.12*t),r=F.createRadialGradient(.5*K,e,0,.5*K,e,o);r.addColorStop(0,`rgba(78, 20, 140, ${((.04+-.02*t)*a).toFixed(3)})`),r.addColorStop(1,"rgba(4, 2, 6, 0)"),F.fillStyle=r,F.fillRect(0,0,K,Z)}F.textAlign="center",F.textBaseline="middle";let n=`500 10px ${U}`,s=`500 12px ${U}`;if(o>.005){let a=1+-.42000000000000004*t,r=.82+-.74*t;for(let t=0;t<D.length;t++){let c=D[t],u=M(.5*c.crestDist,.5*c.crestDist+.42,o);if(u<=.01)continue;let m=Math.round(c.nx*K),d=Math.round(c.ny*Z),h=.5+.5*Math.sin(e*c.speed+c.phase),p=0;if(l>.01){let e=Math.hypot((c.nx-.5)*1.15,c.ny-r)-1.35*i;p=Math.exp(-(e*e)/.016)*l*.72}let f=A((.14+.28*h+p)*a*u);F.font=12===c.sizeCss||p>.22?s:n,F.fillStyle=p>.18||"ice"===c.tint?"#97DFFC":"periwinkle"===c.tint?"#858AE3":"#613DC1",F.globalAlpha=f,F.fillText(c.glyph,m,d)}}if(!r&&eM>.015&&o>.45){let e=[".",":","-","^","t","T"],t=eR*K,a=(1-eS)*Z,r=Math.max(0,Math.floor((t-92)/20)),l=Math.min(Math.ceil(K/20),Math.ceil((t+92)/20)),i=Math.max(0,Math.floor((a-92)/20)),c=Math.min(Math.ceil(Z/20),Math.ceil((a+92)/20)),u=M(.45,.95,o)*eM;for(let o=i;o<=c;o++){let i=20*o+10,c=i-a;if(!(Math.abs(c)>=92))for(let a=r;a<=l;a++){let o=20*a+10,r=Math.hypot(o-t,c);if(r>=92)continue;let l=Math.pow(1-r/92,1.85),m=Math.min(.28,l*u*.34);if(m<.015)continue;let d=Math.min(e.length-1,Math.floor(l*e.length));F.font=l>.58?s:n,F.fillStyle=r<36?"#97DFFC":r<72?"#858AE3":"#613DC1",F.globalAlpha=m,F.fillText(e[d],Math.round(o),Math.round(i))}}}F.globalAlpha=1})(Y,tp,tt,tr,L,W));let an="full",as=0,ac=1;tt>.99&&tv<.01&&ta<.002&&L<.002&&(tg<.02?(an="bottom",as=0,ac=.48):tg>.98&&(an="top",as=.66,ac=1)),an!==es&&(es=an,"full"!==an&&ex()),j.disable(j.BLEND),ey(ec,as,ac),j.useProgram(B.prog),j.uniform1f(B.u.uTime,Y),j.uniform1f(B.u.uViewAsp,ef),j.uniform1f(B.u.uSceneH,ec.h),j.uniform1f(B.u.uTanHalfFov,eb),j.uniform3f(B.u.uCamPos,tX.x,tX.y,tX.z),j.uniform3f(B.u.uCamRight,t2.x,t2.y,t2.z),j.uniform3f(B.u.uCamUp,t5.x,t5.y,t5.z),j.uniform3f(B.u.uCamFwd,tZ.x,tZ.y,tZ.z),j.uniform1f(B.u.uStarVis,eT),j.uniform1f(B.u.uStarRadius,eF),j.uniform1f(B.u.uStarSwell,eG),j.uniform1f(B.u.uStarSpinPhase,ej),j.uniform1f(B.u.uPinch,eH),j.uniform1f(B.u.uStarShift,eJ),j.uniform1f(B.u.uStarCrack,eK),j.uniform1f(B.u.uImplode,eZ),j.uniform1f(B.u.uEjecta,e2),j.uniform1f(B.u.uEjectaProg,e5),j.uniform1f(B.u.uBhBirth,e3),j.uniform1f(B.u.uBhRadius,e8),j.uniform1f(B.u.uFallback,e6),j.uniform1f(B.u.uFallbackProg,e9),j.uniform1f(B.u.uDiskBirth,e7),j.uniform1f(B.u.uLockPulse,ta),j.uniform1f(B.u.uLockWaveProg,to),j.uniform1f(B.u.uUiRipple,eI),j.uniform1f(B.u.uUiShock,L),j.uniform1f(B.u.uUiShockProg,W),j.uniform1f(B.u.uTickPulse,tw),j.uniform1f(B.u.uTickProg,ty),j.uniform1f(B.u.uSettle,tt),j.uniform1f(B.u.uPin,tg),j.uniform1f(B.u.uPolarFactor,tv),j.uniform1f(B.u.uDiskOuterR,t3),j.uniform1f(B.u.uJetPower,te),j.uniform1f(B.u.uCharge,eQ),j.uniform1f(B.u.uBlastPeak,e0),j.uniform1f(B.u.uBlastProgress,e1),j.uniform2f(B.u.uPointer,eR,eS),j.uniform1f(B.u.uPointerActive,eM),j.drawArrays(j.TRIANGLES,0,3),ey(eu,as,ac),j.useProgram(_.prog),ew(0,ec.tex,_.u.uBg),j.uniform2f(_.u.uBgInv,1/ec.w,1/ec.h),j.uniform2f(_.u.uGridOrigin,er,el),j.uniform2f(_.u.uCellPx,ea,eo),j.uniform2f(_.u.uCanvasPx,q,J),j.uniform2f(_.u.uGrid,ee,et),j.drawArrays(j.TRIANGLES,0,3),j.useProgram(I.prog),ey(em,as,ac),ew(0,ec.tex,I.u.uTex),j.uniform2f(I.u.uDir,1.85/em.w,0),j.uniform1f(I.u.uThreshold,.34),j.drawArrays(j.TRIANGLES,0,3),ey(ed,as,ac),ew(0,em.tex,I.u.uTex),j.uniform2f(I.u.uDir,0,1.85/ed.h),j.uniform1f(I.u.uThreshold,0),j.drawArrays(j.TRIANGLES,0,3),j.disable(j.SCISSOR_TEST),j.bindFramebuffer(j.FRAMEBUFFER,null),j.viewport(0,0,q,J),j.clearColor(0,0,0,0),j.clear(j.COLOR_BUFFER_BIT),ey(null,as,ac),j.useProgram(O.prog),ew(0,eu.tex,O.u.uCell),ew(1,ec.tex,O.u.uBg),ew(2,z,O.u.uAtlas),ew(3,ed.tex,O.u.uBloom),$&&ew(4,$,O.u.uWordmarkMask),j.uniform2i(O.u.uGrid,ee,et),j.uniform2i(O.u.uCellPx,ea,eo),j.uniform2i(O.u.uGridOrigin,er,el),j.uniform2f(O.u.uCanvasPx,q,J),j.uniform1f(O.u.uGlyphCount,v.length),j.uniform1f(O.u.uWordmarkCarve,e4),j.uniform1f(O.u.uBlastPeak,e0),j.uniform1f(O.u.uWarmTint,tl),j.uniform1f(O.u.uSettle,tt);let au=.46+.08000000000000002*tt+.14*eT+.16*e2+.14*e6+.34*e0+.1*ta+.08*eI+.24*L+.18*tw;j.uniform1f(O.u.uGlow,au),j.uniform2f(O.u.uPointer,eR,eS),j.uniform1f(O.u.uPointerActive,eM),j.uniform1f(O.u.uViewAsp,ef),j.drawArrays(j.TRIANGLES,0,3),j.disable(j.SCISSOR_TEST),null===e$&&eT>.5&&(e$=Number(performance.now().toFixed(2))),u.current&&"none"!==u.current.style.display&&(u.current.style.display="none"),window.__TMINUS_BH_TELEMETRY__={fps:Number((1/Math.max(.001,eX)).toFixed(1)),frameMs:Number((1e3*eX).toFixed(2)),degraded:ei,cols:ee,rows:et,cellPxW:ea,cellPxH:eo,dpr:Q,firstStarPaintPerfMs:e$,wordmarkBuilt:X,introElapsed:Number(eN.toFixed(3)),resolveElapsed:Number(eD.toFixed(3)),starRadius:Number(eF.toFixed(3)),starSwell:Number(eG.toFixed(3)),bhRadius:Number(e8.toFixed(3)),fallback:Number(e6.toFixed(3)),heroResolved:V,pinProgress:Number(tp.toFixed(4)),polarFactor:Number(tv.toFixed(4)),polarGate:Number(tb.toFixed(4)),tickPulse:Number(tw.toFixed(4)),tickProg:Number(ty.toFixed(4)),tickElapsedSinceEdgeMs:tC,pulseEdgeWholeSec:eY,lastPulseTriggerPerfMs:Number(eq.toFixed(2)),polarDiameterPx:Math.round(ae),domeApexRimY:Math.round(al),domeEdgeY:Math.round(ar),elevDeg:Number(tB.toFixed(1)),parallaxAzimDeg:Number((180*tR/Math.PI).toFixed(2)),parallaxElevDeg:Number(tS.toFixed(2)),uiRippleAmp:Number(eI.toFixed(3)),uiShockAmp:Number(L.toFixed(3))}},eK=e=>{if(eb||document.hidden){eH=!1;return}eG=window.requestAnimationFrame(eK),eJ(e,!1)},eZ=(e=!1)=>{if(eb||eH||document.hidden)return;eH=!0;let t=performance.now();ez=t,e&&eJ(t,!0),eG=window.requestAnimationFrame(eK)},eQ=()=>{eH&&(eH=!1,window.cancelAnimationFrame(eG))},e0=()=>{document.hidden?eQ():eZ(!1)};document.addEventListener("visibilitychange",e0),eZ(!0);let e1=null,e2=null,e5=0,e4=0,e3=0;if(e5=window.setTimeout(()=>{if(eb)return;ef(),(e1=new ResizeObserver(()=>{eb||(ev(!1,!1),ef())})).observe(e);let t=h.current?.current;t&&(e2=new ResizeObserver(()=>{eb||ef()})).observe(t)},0),!x&&!X){let e=()=>{eb||X||eg(!0)};"function"==typeof window.requestIdleCallback?e4=window.requestIdleCallback(e,{timeout:1400}):e3=window.setTimeout(e,450)}return"u">typeof document&&document.fonts?.ready&&document.fonts.ready.then(()=>{eb||(x||window.setTimeout(()=>{eb||eg(!0)},220),ev(!0,!1),ef())}).catch(()=>{}),()=>{eb=!0,p.current&&(p.current.current=null),window.clearTimeout(e5),window.clearTimeout(e3),e4&&"function"==typeof window.cancelIdleCallback&&window.cancelIdleCallback(e4),eQ(),document.removeEventListener("visibilitychange",e0),window.removeEventListener("pointermove",eT),window.removeEventListener("pointerleave",eF),e1?.disconnect(),e2?.disconnect(),S(j,ec),S(j,eu),S(j,em),S(j,ed),z&&j.deleteTexture(z),$&&j.deleteTexture($),j.deleteVertexArray(L),j.deleteProgram(B.prog),j.deleteProgram(_.prog),j.deleteProgram(I.prog),j.deleteProgram(O.prog)}},[i]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("span",{ref:c,"aria-hidden":"true",className:"pointer-events-none sr-only font-mono",children:"T"}),(0,o.jsx)("canvas",{ref:n,"aria-hidden":"true",className:"pointer-events-none fixed inset-0 z-0 h-full w-full"}),i?null:(0,o.jsx)("div",{ref:u,"data-star-ssr-seed":"true","aria-hidden":"true",className:"pointer-events-none fixed inset-0 z-[25] flex items-center justify-center bg-[#040206] motion-reduce:hidden",children:(0,o.jsx)("div",{className:"h-[34dvh] w-[34dvh] rounded-full sm:h-[42dvh] sm:w-[42dvh]",style:{background:"radial-gradient(circle, #FFF8E8 0%, #F4D8AE 26%, #EBC998 44%, rgba(143, 87, 55, 0.72) 61%, rgba(240, 199, 144, 0.22) 77%, rgba(4, 2, 6, 0) 100%)",filter:"blur(0.8px)"}})}),(0,o.jsx)("canvas",{ref:s,"aria-hidden":"true",className:"pointer-events-none fixed inset-0 z-30 h-full w-full"})]})}function j(e){return String(Math.max(0,Math.floor(e))).padStart(2,"0")}let B=[{deg:0,label:"000\xb0"},{deg:90,label:"090\xb0"},{deg:180,label:"180\xb0"},{deg:270,label:"270\xb0"}],_=Array.from({length:12},(e,t)=>{let a=(30*t-90)*Math.PI/180,o=Math.cos(a),r=Math.sin(a);return{k:t,x1:Number((120+112.5*o).toFixed(2)),y1:Number((120+112.5*r).toFixed(2)),x2:Number((120+116.5*o).toFixed(2)),y2:Number((120+116.5*r).toFixed(2))}});function I({stripRef:e,polarRef:t,bezelControlRef:a}={}){let[l,i]=(0,r.useState)({days:"--",hours:"--",minutes:"--",seconds:"--"}),n=(0,r.useRef)(null),s=(0,r.useRef)(null),c=(0,r.useRef)(null),u=(0,r.useRef)([]),m=(0,r.useRef)({opacity:"",sizePx:-1,rotDeg:"",activeTick:-1,pulseBucket:-1}),d=(0,r.useMemo)(()=>(function(){let e=[];for(let t=0;t<60;t++){let a=t%5==0,o=a?100.5:104.2,r=(6*t-90)*Math.PI/180,l=Math.cos(r),i=Math.sin(r);e.push({idx:t,isMajor:a,x1:Number((120+o*l).toFixed(2)),y1:Number((120+o*i).toFixed(2)),x2:Number((120+108.5*l).toFixed(2)),y2:Number((120+108.5*i).toFixed(2))})}return e})(),[]);(0,r.useEffect)(()=>{let e=0,t=!1,a=()=>{let o,r,l,n,s;if(t)return;let c=Date.now(),u=Math.max(0,f-c),m=Math.floor(u/1e3),d=(l=Math.floor((r=Math.floor(Math.max(0,f-c)/1e3))/86400),n=Math.floor(r%86400/3600),s=Math.floor(r%3600/60),{days:(o=Math.max(0,Math.floor(l)))>=100?String(o):String(o).padStart(2,"0"),hours:j(n),minutes:j(s),seconds:j(r%60)});i(d),window.__TMINUS_COUNTDOWN_SYNC__={lastFlipNowMs:c,lastFlipPerfMs:performance.now(),remMs:u,edgeWholeSec:m,elapsedSinceEdgeMs:u>0?999-u%1e3:0,seconds:d.seconds},e=window.setTimeout(a,u>0?u%1e3+4:1e3)};return a(),()=>{t=!0,window.clearTimeout(e)}},[]),(0,r.useEffect)(()=>{if(a)return a.current={update:({polarFactor:e,polarDiameterPx:t,scrollAzimDeg:a,tickPulse:o})=>{let r=n.current;if(!r)return;let l=m.current;if(e<=.32){"0"!==l.opacity&&(l.opacity="0",r.style.opacity="0");return}let i=Math.min(1,Math.max(0,(e-.32)/.36)),d=(i*i*(3-2*i)).toFixed(3);l.opacity!==d&&(l.opacity=d,r.style.opacity=d);let h=Math.max(152,Math.round(.94*t));Math.abs(l.sizePx-h)>=1&&(l.sizePx=h,r.style.width=`${h}px`,r.style.height=`${h}px`);let p=`rotate(${(-(1.15*a)).toFixed(2)} 120 120)`;s.current&&l.rotDeg!==p&&(l.rotDeg=p,s.current.setAttribute("transform",p));let x=(60-Math.floor(Math.max(0,f-Date.now())/1e3)%60)%60,g=Math.round(12*o);if(l.activeTick!==x||l.pulseBucket!==g){let e=l.activeTick;l.activeTick=x,l.pulseBucket=g;let t=e=>{let t=u.current[e];if(!t)return;if(0===e)return void t.setAttribute("stroke-opacity","0");let a=e%5==0;t.setAttribute("stroke","#858AE3"),t.setAttribute("stroke-opacity",a?"0.48":"0.22"),t.setAttribute("stroke-width",a?"1.15":"0.75")};if(e>=0&&e!==x)for(let a=0;a<=4;a++)t((e-a+60)%60);for(let e of[{offset:0,color:"#97DFFC",op:(.88+.12*o).toFixed(2),wMajor:(1.9+.35*o).toFixed(2),wMinor:(1.5+.35*o).toFixed(2)},{offset:1,color:"#97DFFC",op:(.48+.24*o).toFixed(2),wMajor:"1.45",wMinor:"1.05"},{offset:2,color:"#858AE3",op:(.36+.14*o).toFixed(2),wMajor:"1.25",wMinor:"0.9"},{offset:3,color:"#858AE3",op:"0.28",wMajor:"1.15",wMinor:"0.8"}]){let t=(x-e.offset+60)%60;if(0===t)continue;let a=u.current[t];if(!a)continue;let o=t%5==0;a.setAttribute("stroke",e.color),a.setAttribute("stroke-opacity",e.op),a.setAttribute("stroke-width",o?e.wMajor:e.wMinor)}if(c.current){let e=0===x;c.current.setAttribute("fill",e?"#F7FAFF":"#97DFFC"),c.current.setAttribute("fill-opacity",e?"1":(.78+.22*o).toFixed(2))}}}},()=>{a.current&&(a.current=null)}},[a]);let h=[{value:l.days,label:"D"},{value:l.hours,label:"H"},{value:l.minutes,label:"M"},{value:l.seconds,label:"S"}],p=[{value:l.hours,label:"H"},{value:l.minutes,label:"M"},{value:l.seconds,label:"S"}];return(0,o.jsxs)("div",{role:"timer","aria-live":"off","aria-label":"Countdown to T-minus App Store v1.0 launch on January 1, 2027",className:"relative flex items-center justify-center select-none whitespace-nowrap",children:[(0,o.jsxs)("div",{ref:e,"data-countdown-mode":"strip",className:"flex flex-col items-center gap-1.5 will-change-transform sm:gap-2",children:[(0,o.jsx)("div",{className:"flex items-baseline gap-3.5 whitespace-nowrap font-heading text-[26px] leading-none font-semibold tracking-[-0.03em] text-white tabular-nums sm:gap-7 sm:text-[36px]",children:h.map(e=>(0,o.jsxs)("span",{className:"inline-flex items-baseline gap-1 sm:gap-1.5",children:[(0,o.jsx)("span",{className:"inline-block min-w-[2ch] text-right",children:e.value}),(0,o.jsx)("span",{className:"font-mono text-[11px] font-medium tracking-[0.06em] text-[#9EA3EE] sm:text-[13px]",children:e.label})]},e.label))}),(0,o.jsx)("div",{"data-countdown-label":"true",className:"whitespace-nowrap font-mono text-[9.5px] font-medium tracking-[0.13em] text-[#A2A7F0] uppercase sm:text-[11px] sm:tracking-[0.18em]",children:"APP STORE V1.0 \xb7 JAN 1, 2027"})]}),(0,o.jsx)("div",{ref:n,"data-polar-bezel":"true","aria-hidden":"true",style:{opacity:0,width:"280px",height:"280px"},className:"pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-[opacity,width,height]",children:(0,o.jsxs)("svg",{viewBox:"0 0 240 240",shapeRendering:"geometricPrecision",className:"h-full w-full overflow-visible",children:[(0,o.jsxs)("g",{ref:s,"data-bezel-outer-ring":"true",children:[(0,o.jsx)("circle",{cx:"120",cy:"120",r:"114.5",fill:"none",stroke:"#858AE3",strokeOpacity:"0.24",strokeWidth:"0.6",strokeDasharray:"2.5 3.5"}),_.map(e=>(0,o.jsx)("line",{x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y2,stroke:"#858AE3",strokeOpacity:e.k%3==0?"0.52":"0.24",strokeWidth:e.k%3==0?"0.85":"0.55"},e.k)),B.map(e=>(0,o.jsx)("text",{x:"120",y:"4.2",textAnchor:"middle",fill:"#9EA3EE",fillOpacity:"0.52",fontSize:"4.6",fontFamily:"var(--font-ibm-plex-mono), ui-monospace, monospace",letterSpacing:"0.08em",transform:0===e.deg?void 0:`rotate(${e.deg} 120 120)`,children:e.label},e.deg))]}),(0,o.jsx)("circle",{cx:"120",cy:"120",r:"98.5",fill:"none",stroke:"#858AE3",strokeOpacity:"0.14",strokeWidth:"0.55"}),(0,o.jsx)("g",{"data-bezel-ticks":"60",children:d.map(e=>(0,o.jsx)("line",{ref:t=>{u.current[e.idx]=t},x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y2,stroke:"#858AE3",strokeOpacity:0===e.idx?"0":e.isMajor?"0.48":"0.22",strokeWidth:e.isMajor?"1.15":"0.75",strokeLinecap:"butt"},e.idx))}),(0,o.jsx)("polygon",{ref:c,"data-bezel-meridian":"T-0",points:"120,20.2 116.8,11.8 123.2,11.8",fill:"#97DFFC",fillOpacity:"0.92"}),(0,o.jsx)("text",{x:"120",y:"26.4",textAnchor:"middle",fill:"#97DFFC",fillOpacity:"0.88",fontSize:"4.7",fontWeight:"600",fontFamily:"var(--font-ibm-plex-mono), ui-monospace, monospace",letterSpacing:"0.14em",children:"T-0"})]})}),(0,o.jsxs)("div",{ref:t,"data-countdown-mode":"polar",style:{opacity:0,transform:"translate(-50%, -50%) scale(0.84)"},className:"pointer-events-none absolute top-1/2 left-1/2 flex w-[264px] flex-col items-center text-center will-change-transform sm:w-[410px]",children:[(0,o.jsx)("span",{className:"font-mono text-[9.5px] font-medium tracking-[0.24em] text-[#97DFFC] uppercase sm:text-[11.5px]",children:"LAUNCHING IN"}),(0,o.jsxs)("div",{className:"mt-1.5 flex items-baseline justify-center gap-2 sm:mt-2.5 sm:gap-3",children:[(0,o.jsx)("span",{className:"font-heading text-[78px] leading-[0.86] font-semibold tracking-[-0.045em] text-white tabular-nums sm:text-[128px]",children:l.days}),(0,o.jsx)("span",{className:"font-mono text-[12px] font-medium tracking-[0.16em] text-[#97DFFC] uppercase sm:text-[17px]",children:"DAYS"})]}),(0,o.jsx)("div",{"aria-hidden":"true",className:"my-2.5 h-px w-[72%] bg-gradient-to-r from-transparent via-[#858AE3]/55 to-transparent sm:my-4"}),(0,o.jsx)("div",{className:"flex items-baseline justify-center gap-4 font-heading text-[24px] leading-none font-semibold tracking-[-0.025em] text-white tabular-nums sm:gap-7 sm:text-[40px]",children:p.map(e=>(0,o.jsxs)("span",{className:"inline-flex items-baseline gap-1 sm:gap-1.5",children:[(0,o.jsx)("span",{className:"inline-block min-w-[2ch] text-right",children:e.value}),(0,o.jsx)("span",{className:"font-mono text-[10px] font-medium tracking-[0.08em] text-[#9EA3EE] sm:text-[14px]",children:e.label})]},e.label))}),(0,o.jsx)("div",{className:"mt-2.5 font-mono text-[9px] font-medium tracking-[0.16em] text-[#A2A7F0] uppercase sm:mt-4 sm:text-[11px] sm:tracking-[0.2em]",children:"APP STORE V1.0 \xb7 JAN 1, 2027"})]})]})}let O={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};O.node;let L=c(O),U={name:"calendar",size:24,node:[["path",{d:"M8 2v3",key:"1ioesn"}],["path",{d:"M16 2v3",key:"otl347"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",key:"h1oib"}],["path",{d:"M3 9h18",key:"1pudct"}]]};U.node;let z=c(U),W={name:"share-2",size:24,node:[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]]};W.node;let G=c(W);function H({variant:e="primary",shape:t="rect",className:a="",children:r,disabled:l,...i}){return(0,o.jsx)("button",{disabled:l,className:`inline-flex cursor-pointer items-center justify-center gap-2 font-sans font-semibold tracking-[-0.01em] transition-colors duration-150 active:translate-y-px focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#040206] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${"pill"===t?"rounded-full":"rounded-[6px]"} ${"primary"===e?"bg-white text-[#040206] border border-white [@media(hover:hover)]:hover:bg-[#E8F7FE] [@media(hover:hover)]:hover:border-[#E8F7FE]":"bg-[#07050D] text-white border border-[#858AE3]/35 [@media(hover:hover)]:hover:border-[#97DFFC]/75 [@media(hover:hover)]:hover:text-[#97DFFC]"} ${a}`,...i,children:r})}function $({idPrefix:e="waitlist",inputRef:t,onOpenLegal:a,requestedRole:l,align:i="center",onInteractPulse:n,registrationPulseSeq:s=0}){let[c,u]=(0,r.useState)("SHOPPER"),[m,d]=(0,r.useState)(""),[h,p]=(0,r.useState)(""),[f,g]=(0,r.useState)(!1),[v,b]=(0,r.useState)(null),[w,y]=(0,r.useState)(!1),[C,E]=(0,r.useState)(!1),[R,S]=(0,r.useState)(!1),[A,M]=(0,r.useState)(null),[k,P]=(0,r.useState)(null),[T,F]=(0,r.useState)(null),N=(0,r.useRef)(0),D=()=>{let e=performance.now();e-N.current<180||(N.current=e,n?.("subtle"))};async function j(e){e.preventDefault(),M(null);let t=x(m);if(!t)return void M("Enter a valid mobile number (e.g. (555) 234-5678).");if(!f)return void M("Check the SMS consent box so we can text you on Jan 1.");S(!0);try{let e=await fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:t,role:c,brandHandle:"BRAND"===c&&h.trim()||null,smsConsent:!0,source:v})}),a=await e.json().catch(()=>({}));if(!e.ok)return void M("string"==typeof a?.error?a.error:"Something went wrong. Please try again.");P(c),n?.("shockwave")}catch{M("Network error. Check your connection and try again.")}finally{S(!1)}}async function B(){let e=`${window.location.origin}/landing`;try{navigator.share?(await navigator.share({title:"T^minus",text:"T^minus launches Jan 1, 2027 \xb7 independent clothing drops on a live clock.",url:e}),F("Shared")):navigator.clipboard?.writeText?(await navigator.clipboard.writeText(e),F("Link copied")):F("Copy URL above")}catch{}finally{window.setTimeout(()=>F(null),2600)}}(0,r.useEffect)(()=>{l&&(u(l.role),M(null))},[l]),(0,r.useEffect)(()=>{if(!s)return;E(!0);let e=window.setTimeout(()=>E(!1),900);return()=>window.clearTimeout(e)},[s]),(0,r.useEffect)(()=>{let e=new URLSearchParams(window.location.search),t=e.get("utm_source")||e.get("ref")||e.get("src")||null;t&&b(t.slice(0,64))},[]);let _="left"===i?"items-start text-left":"mx-auto items-center text-center",I=`${e}-phone`,O=`${e}-brand`,U=m.trim().length>0,W=!!x(m),X=w||C;return k?(0,o.jsxs)("div",{role:"status","aria-live":"polite",className:`flex w-full max-w-[452px] flex-col rounded-[6px] border border-[#858AE3]/30 bg-[#07050D] px-6 py-6 ${_}`,children:[(0,o.jsxs)("div",{className:"inline-flex items-center gap-1.5 font-mono text-[10.5px] font-medium tracking-[0.16em] text-[#97DFFC] uppercase",children:[(0,o.jsx)(L,{className:"size-3.5 stroke-[2.2]"}),(0,o.jsx)("span",{children:"BRAND"===k?"+ BRAND SPOT SAVED":"+ ALLOCATION SECURED"})]}),(0,o.jsx)("h3",{className:"mt-2.5 font-heading text-[21px] font-semibold tracking-[-0.025em] text-white",children:"BRAND"===k?"Brand request saved.":"You're in for Jan 1."}),(0,o.jsx)("p",{className:"mt-2 max-w-[360px] text-[13.5px] leading-[1.54] text-[#DCD5EE]",children:"BRAND"===k?"We'll text you before launch to set up your storefront and schedule an early drop.":"Watch your texts on January 1 when App Store v1.0 goes live."}),(0,o.jsxs)("div",{className:"mt-5 flex w-full flex-col gap-2.5 sm:flex-row",children:[(0,o.jsxs)(H,{type:"button",variant:"primary",onClick:function(){let e,t=new Blob([(e=`${window.location.origin}/landing`.replace(/[\r\n]/g,""),`BEGIN:VCALENDAR\r
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
DESCRIPTION:T^minus App Store v1.0 goes live at midnight ET. Independent clothing drops on a live clock. ${e}\r
URL:${e}\r
BEGIN:VALARM\r
ACTION:DISPLAY\r
DESCRIPTION:T^minus launches on the App Store in 15 minutes.\r
TRIGGER:-PT15M\r
END:VALARM\r
END:VEVENT\r
END:VCALENDAR`)],{type:"text/calendar;charset=utf-8"}),a=URL.createObjectURL(t),o=document.createElement("a");o.href=a,o.download="t-minus-launch-jan-1-2027.ics",document.body.appendChild(o),o.click(),o.remove(),URL.revokeObjectURL(a)},className:"h-10 flex-1 px-4 text-[13px]",children:[(0,o.jsx)(z,{className:"size-3.5"}),(0,o.jsx)("span",{children:"Save Jan 1 reminder"})]}),(0,o.jsxs)(H,{type:"button",variant:"dark",onClick:B,className:"h-10 flex-1 px-4 text-[13px]",children:[(0,o.jsx)(G,{className:"size-3.5"}),(0,o.jsx)("span",{children:T??"Send to a friend"})]})]})]}):(0,o.jsxs)("form",{onSubmit:j,noValidate:!0,className:`flex w-full max-w-[452px] flex-col ${_}`,children:[(0,o.jsxs)("div",{role:"radiogroup","aria-label":"Waitlist role",className:"relative mb-2.5 inline-grid grid-cols-2 rounded-[6px] border border-[#858AE3]/30 bg-[#05030A] p-[3px] sm:mb-3",children:[(0,o.jsx)("span",{"aria-hidden":"true",className:`pointer-events-none absolute top-[3px] bottom-[3px] left-[3px] w-[calc(50%-3px)] rounded-[4px] bg-[#613DC1] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${"BRAND"===c?"translate-x-full":"translate-x-0"}`}),[{id:"SHOPPER",label:"I'm shopping"},{id:"BRAND",label:"I run a brand"}].map(e=>{let t=c===e.id;return(0,o.jsx)("button",{type:"button",role:"radio","aria-checked":t,onClick:()=>{u(e.id),M(null),n?.("subtle")},className:`relative z-10 cursor-pointer rounded-[4px] px-3.5 py-1 text-[12px] font-medium tracking-[-0.005em] transition-colors duration-150 ${t?"text-white":"text-[#CFC7E6] hover:text-white"}`,children:e.label},e.id)})]}),(0,o.jsxs)("div",{"data-waitlist-frame":e,"data-corners-lit":X?"true":"false",className:"relative w-full",onFocus:()=>y(!0),onBlur:e=>{e.currentTarget.contains(e.relatedTarget)||y(!1)},children:[["-top-[8px] -left-[4px]","-top-[8px] -right-[4px]","-bottom-[8px] -left-[4px]","-bottom-[8px] -right-[4px]"].map(e=>(0,o.jsx)("span",{"aria-hidden":"true","data-waitlist-corner":"true",className:`pointer-events-none absolute ${e} z-20 font-mono text-[10px] leading-none font-medium transition-all duration-150 select-none ${X?"text-[#97DFFC] opacity-100":"text-[#858AE3]/40 opacity-50"}`,children:"+"},e)),(0,o.jsxs)("div",{className:`flex w-full items-center gap-1.5 rounded-[6px] border bg-[#07050D] p-1.5 transition-all duration-200 ${C?"border-[#97DFFC] ring-1 ring-[#97DFFC]/45":"border-[#858AE3]/30 focus-within:border-[#97DFFC]/80"}`,children:[(0,o.jsx)("label",{htmlFor:I,className:"sr-only",children:"Mobile phone number"}),(0,o.jsx)("input",{ref:t,id:I,name:"tel",type:"tel",inputMode:"tel",autoComplete:"tel",required:!0,placeholder:"+1 (555) 000-0000",value:m,onChange:e=>{d(function(e){let t=e.trimStart();if(t.startsWith("+"))return"+"+t.slice(1).replace(/[^\d\s-]/g,"").slice(0,18);let a=e.replace(/\D/g,"").slice(0,11);if(0===a.length)return"";if(11===a.length&&a.startsWith("1")){let e=a.slice(1);return`+1 (${e.slice(0,3)}) ${e.slice(3,6)}-${e.slice(6)}`}return a.length<=3?`(${a}`:a.length<=6?`(${a.slice(0,3)}) ${a.slice(3)}`:`(${a.slice(0,3)}) ${a.slice(3,6)}-${a.slice(6,10)}`}(e.target.value)),A&&M(null),D()},className:"h-9 w-0 min-w-0 flex-1 bg-transparent px-2.5 text-[14px] text-white placeholder:text-[#B8B0D4]/75 focus:outline-none sm:h-10 sm:px-3 sm:text-[14.5px]"}),U?(0,o.jsxs)("span",{"data-phone-status":W?"ready":"typing","aria-live":"polite",className:`inline-flex shrink-0 items-center gap-1 pr-1 font-mono text-[9.5px] font-medium tracking-[0.12em] uppercase transition-colors duration-150 select-none ${W?"text-[#97DFFC]":"text-[#858AE3]"}`,children:[(0,o.jsx)("span",{"aria-hidden":"true",className:`size-1.5 rounded-full transition-colors duration-150 ${W?"bg-[#97DFFC]":"bg-[#858AE3]"}`}),W?(0,o.jsx)("span",{children:"READY"}):null]}):null,(0,o.jsx)(H,{type:"submit",variant:"primary",disabled:R,className:"h-9 shrink-0 whitespace-nowrap px-3 text-[12px] sm:h-10 sm:px-5 sm:text-[13px]",children:R?"Saving...":"BRAND"===c?"Join as a brand":"Get early access"})]})]}),(0,o.jsx)("div",{className:`grid w-full transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${"BRAND"===c?"mt-2 grid-rows-[1fr] opacity-100":"pointer-events-none mt-0 grid-rows-[0fr] opacity-0"}`,children:(0,o.jsxs)("div",{className:"overflow-hidden",children:[(0,o.jsx)("label",{htmlFor:O,className:"sr-only",children:"Label or shop handle"}),(0,o.jsx)("input",{id:O,name:"organization",type:"text",tabIndex:"BRAND"===c?0:-1,placeholder:"Label or shop handle (optional)",value:h,onChange:e=>{p(e.target.value),D()},maxLength:120,className:"h-9 w-full rounded-[6px] border border-[#858AE3]/30 bg-[#07050D] px-3 text-[13.5px] text-white placeholder:text-[#B8B0D4]/75 transition-colors focus:border-[#97DFFC]/80 focus:outline-none sm:h-10 sm:px-3.5"})]})}),(0,o.jsxs)("label",{className:`mt-2.5 flex cursor-pointer items-center gap-2 text-[11px] leading-[1.35] text-[#D4CCE8]/90 select-none sm:mt-3 ${"left"===i?"justify-start text-left":"justify-center text-center"}`,children:[(0,o.jsxs)("span",{className:"relative inline-flex size-3.5 shrink-0 items-center justify-center",children:[(0,o.jsx)("input",{type:"checkbox",checked:f,onChange:e=>{g(e.target.checked),A&&M(null)},className:"peer sr-only"}),(0,o.jsx)("span",{"aria-hidden":"true",className:"flex size-3.5 items-center justify-center rounded-[3px] border border-[#858AE3]/55 bg-[#07050D] transition-colors duration-150 peer-checked:border-[#97DFFC] peer-checked:bg-[#613DC1] peer-focus-visible:ring-1 peer-focus-visible:ring-[#97DFFC]",children:f?(0,o.jsx)(L,{className:"size-2.5 stroke-[2.8] text-white"}):null})]}),(0,o.jsxs)("span",{children:["Text me launch & drop alerts (STOP to opt out \xb7"," ",(0,o.jsx)("button",{type:"button",onClick:e=>{e.preventDefault(),a("privacy")},className:"cursor-pointer text-white underline decoration-[#858AE3]/55 underline-offset-2 transition hover:text-[#97DFFC]",children:"Privacy"})," ","/"," ",(0,o.jsx)("button",{type:"button",onClick:e=>{e.preventDefault(),a("terms")},className:"cursor-pointer text-white underline decoration-[#858AE3]/55 underline-offset-2 transition hover:text-[#97DFFC]",children:"Terms"}),")"]})]}),A?(0,o.jsx)("p",{role:"alert",className:"mt-2 text-[12px] font-medium text-[#97DFFC]",children:A}):null]})}let X=[".",":","-","^","t","T"],V=[".",":","-","^","t"],Y=new Set(["i","l","I",".",",","'","!",":",";","|","-"]);function q({text:e,active:t,instant:a=!1,origin:l="left",delayMs:i=0,durationMs:n=640,glyphClassName:s="text-[#858AE3]",crestClassName:c="text-[#97DFFC]",className:u=""}){let{chars:m,words:d}=(0,r.useMemo)(()=>{let t=Array.from(e),a=[],o=[];for(let e=0;e<t.length;e++)" "===t[e]?(o.length>0&&(a.push({type:"word",key:`w-${e}`,items:o}),o=[]),a.push({type:"space",key:`s-${e}`})):o.push({ch:t[e],idx:e});return o.length>0&&a.push({type:"word",key:"w-end",items:o}),{chars:t,words:a}},[e]),[h,p]=(0,r.useState)(a),f=(0,r.useRef)([]),x=(0,r.useRef)([]);return((0,r.useEffect)(()=>{let e=null;try{let t=new URLSearchParams(window.location.search).get("revealAt");if(null!==t){let a=Number(t);Number.isFinite(a)&&a>0&&a<1&&(e=a)}}catch{}if(null===e&&a)return void p(!0);let o=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(null===e&&o)return void p(!0);if(!t&&null===e)return void p(!1);let r=Math.max(1,m.length),s=(r-1)*.5,c=Math.max(.5,s),u=Math.min(.42,Math.max(.24,4.6/r)),d=1-u,h=e=>{for(let t=0;t<m.length;t++){let a=m[t];if(" "===a)continue;let o=f.current[t],i=x.current[t];if(!o||!i)continue;let n=(e-("center"===l?Math.abs(t-s)/c:"right"===l?(r-1-t)/Math.max(1,r-1):t/Math.max(1,r-1))*d)/Math.max(.01,u);if(n<=0)o.style.opacity="0",i.style.opacity="0",""!==i.textContent&&(i.textContent="");else if(n>=1)o.style.opacity="1",i.style.opacity="0",""!==i.textContent&&(i.textContent="");else{let e=Y.has(a)?V:X,t=Math.min(e.length-1,Math.floor(n*e.length)),r=e[t],l=n>.8?(n-.8)/.2:0,s=l>0?Math.max(0,1-1.15*l):Math.min(1,.45+.72*n);o.style.opacity=l.toFixed(3),i.style.opacity=s.toFixed(3),i.textContent!==r&&(i.textContent=r);let c=n>=.82?"#F7FAFF":n>=.62?"#97DFFC":n>=.34?"":"#613DC1";i.style.color!==c&&(i.style.color=c)}}};if(null!==e){p(!1);let t=window.requestAnimationFrame(()=>h(e));return()=>window.cancelAnimationFrame(t)}p(!1);let g=0,v=0;h(0);let b=window.setTimeout(()=>{v=performance.now();let e=t=>{let a=Math.min(1,(t-v)/Math.max(200,n));h(a),a<1?g=window.requestAnimationFrame(e):p(!0)};g=window.requestAnimationFrame(e)},i);return()=>{window.clearTimeout(b),window.cancelAnimationFrame(g)}},[t,a,l,i,n,m]),h)?(0,o.jsx)("span",{style:{fontKerning:"none"},className:u,children:e}):(0,o.jsx)("span",{"aria-label":e,style:{fontKerning:"none"},className:u,children:d.map(e=>"space"===e.type?(0,o.jsx)(r.Fragment,{children:" "},e.key):(0,o.jsx)("span",{className:"inline-block whitespace-nowrap",children:e.items.map(({ch:e,idx:t})=>(0,o.jsxs)("span",{"aria-hidden":"true",className:"relative inline-block",children:[(0,o.jsx)("span",{ref:e=>{f.current[t]=e},style:{opacity:0},children:e}),(0,o.jsx)("span",{ref:e=>{x.current[t]=e},style:{opacity:0},className:`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden font-mono text-[0.8em] leading-none font-medium ${s} `})]},t))},e.key))})}function J({text:e,children:t,tier:a="headline",origin:l="left",instant:i=!1,delayMs:n=0,className:s=""}){let c=(0,r.useRef)(null),[u,m]=(0,r.useState)(i),[d,h]=(0,r.useState)(!1);return((0,r.useEffect)(()=>{try{let e=new URLSearchParams(window.location.search);if(null!==e.get("revealAt")){h(!0),m(!0);return}}catch{}if(i||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return void m(!0);let e=c.current;if(!e||"u"<typeof IntersectionObserver)return void m(!0);let t=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){m(!0),t.disconnect();break}},{threshold:.14,rootMargin:"0px 0px -24px 0px"});return t.observe(e),()=>t.disconnect()},[i]),"prose"===a)?(0,o.jsx)("span",{ref:c,style:{transitionDelay:i?"0ms":`${n}ms`},className:`block transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${u?"translate-y-0 opacity-100":"translate-y-2 opacity-0"} ${s}`,children:t??e}):(0,o.jsx)("span",{ref:c,className:s,children:(0,o.jsx)(q,{text:e??"",active:u,instant:!d&&i,origin:l,delayMs:n,durationMs:"telemetry"===a?540:740,glyphClassName:"telemetry"===a?"text-[#858AE3]":"text-[#9EA3EE]",crestClassName:"text-[#97DFFC]"})})}function K({instant:e=!1,variant:t="rule",className:a=""}){let l=(0,r.useRef)(null),i=(0,r.useRef)(null),n=(0,r.useRef)(null),[s,c]=(0,r.useState)(e);return(0,r.useEffect)(()=>{if(e||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return void c(!0);let t=l.current;if(!t||"u"<typeof IntersectionObserver)return void c(!0);let a=new IntersectionObserver(e=>{for(let t of e)if(t.isIntersecting){c(!0),a.disconnect();break}},{threshold:.2});return a.observe(t),()=>a.disconnect()},[e]),(0,r.useEffect)(()=>{let a=l.current,o=i.current;if(!a||!o)return;let r=o.getContext("2d");if(!r)return;let c=window.matchMedia("(prefers-reduced-motion: reduce)").matches,u=e||c,m=0,d=0,h=1.5,p='"IBM Plex Mono", ui-monospace, SFMono-Regular, monospace',f=-10,x=0,g=0,v=+!!u,b=0,w=0,y=!1,C=()=>{let e=a.getBoundingClientRect();m=Math.max(1,Math.round(e.width)),d=Math.max(1,Math.round(e.height)),h=Math.min(Math.max(window.devicePixelRatio||1,1),1.5),o.width=Math.max(1,Math.round(m*h)),o.height=Math.max(1,Math.round(d*h)),n.current&&(p=window.getComputedStyle(n.current).fontFamily)},E=()=>{if(r.setTransform(1,0,0,1,0,0),r.clearRect(0,0,o.width,o.height),!s&&!u||m<=2||d<=2)return;let e=o.width,a=o.height,l=.5*e,i="arch"===t?.78*a:.5*a,n="arch"===t?.46*a:0,c=l*v,g=r.createLinearGradient(l-c,0,l+c,0);if(g.addColorStop(0,"rgba(133, 138, 227, 0.16)"),g.addColorStop(.35,"rgba(133, 138, 227, 0.28)"),g.addColorStop(.5,"rgba(151, 223, 252, 0.45)"),g.addColorStop(.65,"rgba(133, 138, 227, 0.28)"),g.addColorStop(1,"rgba(133, 138, 227, 0.16)"),r.strokeStyle=g,r.lineWidth=Math.max(1,Math.round(.65*h)),r.beginPath(),"arch"===t)for(let e=0;e<=48;e++){let t=e/48*2-1,a=l+t*c,o=i-n*Math.pow(Math.max(0,1-t*t),1.3);0===e?r.moveTo(a,o):r.lineTo(a,o)}else r.moveTo(l-c,Math.round(i)+.5),r.lineTo(l+c,Math.round(i)+.5);r.stroke();let b=Math.max(9,Math.round((m<640?9.5:10.5)*h));r.font=`500 ${b}px ${p}`,r.textAlign="center",r.textBaseline="middle";let w=Math.max(9,Math.round((m<640?9.5:11)*h)),y=m<640?7:11;if(v>.85){let t=.72*Math.min(1,(v-.85)/.15);r.fillStyle="#858AE3",r.globalAlpha=t,r.fillText("+",Math.round(5*h),Math.round(i)),r.fillText("+",e-Math.round(5*h),Math.round(i))}for(let a=-y;a<=y;a++){let o=Math.abs(a)/Math.max(1,y),s=Math.min(1,Math.max(0,(v-.45*o)/.42));if(s<=.02)continue;let c=Math.round(l+a*w),u=c/Math.max(1,e),m=(c-l)/Math.max(1,l),d="arch"===t?Math.round(i-n*Math.pow(Math.max(0,1-m*m),1.3)):Math.round(i),h=0;if(x>.005){let e=Math.abs(u-f);e<.16&&(h=Math.pow(1-e/.16,1.7)*x)}let p=Math.pow(1-o,1.45),g=Math.min(X.length-1,Math.floor(p*(X.length-.6)));s<.99?g=Math.min(X.length-1,Math.floor(s*X.length)):h>.25&&(g=Math.min(X.length-1,g+(h>.6?2:1))),r.fillStyle="#040206",r.globalAlpha=.92,r.fillRect(c-Math.floor(.48*w),d-Math.floor(.55*b),Math.ceil(.96*w),Math.ceil(1.1*b)),r.fillStyle=1>=Math.abs(a)||h>.35||s<.99&&g>=4?"#97DFFC":p>.4?"#9EA3EE":"#613DC1",r.globalAlpha=Math.min(1,(.45+.52*p+.25*h)*Math.min(1,1.4*s)),r.fillText(X[g],c,d)}r.globalAlpha=1},R=()=>{if(y)return;y=!0;let e=performance.now(),t=a=>{let o=Math.min(.05,Math.max(.001,(a-e)*.001));e=a,!u&&s&&v<1&&(0===b&&(b=a),v=Math.min(1,(a-b)/680)),x+=(g-x)*Math.min(1,11*o),.003>Math.abs(g-x)&&(x=g),E(),!u&&s&&v<1||x>.003||g>0?w=window.requestAnimationFrame(t):y=!1};w=window.requestAnimationFrame(t)};C(),(s||u)&&(u?(v=1,E()):R());let S=e=>{if("touch"===e.pointerType||c)return;let t=a.getBoundingClientRect();f=(e.clientX-t.left)/Math.max(1,t.width),g=1,R()},A=()=>{g=0,R()};a.addEventListener("pointermove",S,{passive:!0}),a.addEventListener("pointerleave",A,{passive:!0});let M=new ResizeObserver(()=>{C(),E()});M.observe(a);let k=!1;return document.fonts?.ready.then(()=>{k||(C(),E())}).catch(()=>{}),()=>{k=!0,window.cancelAnimationFrame(w),a.removeEventListener("pointermove",S),a.removeEventListener("pointerleave",A),M.disconnect()}},[s,e,t]),(0,o.jsxs)("div",{ref:l,"aria-hidden":"true",className:`relative w-full select-none ${"arch"===t?"h-9 sm:h-11":"h-5 sm:h-6"} ${a}`,children:[(0,o.jsx)("span",{ref:n,"aria-hidden":"true",className:"pointer-events-none sr-only font-mono",children:"T"}),(0,o.jsx)("canvas",{ref:i,className:"block h-full w-full"})]})}let Z=[".",":","-","^","t","T"],Q=["#858AE3","#97DFFC","#F7FAFF"],ee=["M","I","N","U","S"];function et({active:e,instant:t=!1,delayMs:a=110,durationMs:l=620,className:i=""}){let n=(0,r.useRef)(null),s=(0,r.useRef)(null),c=(0,r.useRef)(null),u=(0,r.useRef)(null);return(0,r.useEffect)(()=>{if(!e&&!t)return;let o=n.current,r=s.current;if(!o||!r)return;let i=r.getContext("2d");if(!i)return;let m=document.createElement("canvas"),d=m.getContext("2d",{willReadFrequently:!0});if(!d)return;let h=document.createElement("canvas"),p=h.getContext("2d");if(!p)return;let f=window.matchMedia("(prefers-reduced-motion: reduce)").matches,x=t||f,g=0,v=0,b=1.5,w='"Inter Tight", "Inter", -apple-system, sans-serif',y='"IBM Plex Mono", ui-monospace, SFMono-Regular, monospace',C=8,E=10,R=[],S=[],A="",M=0,k=1,P=0,T=!1,F=0,N=0,D=+!!x,j=x,B=x,_=!0,I=0,O=!1,L=-9999,U=-9999,z=0,W=0,G=()=>{let e=o.getBoundingClientRect(),t=Math.max(1,Math.round(e.width)),a=Math.max(1,Math.round(e.height)),l=t<340,i=Math.min(Math.max(window.devicePixelRatio||1,1),1.5);g=t,v=a;let n=Math.max(2,Math.round(g*(b=i))),s=Math.max(2,Math.round(v*b));r.width=n,r.height=s,m.width=n,m.height=s,c.current&&(w=window.getComputedStyle(c.current).fontFamily),u.current&&(y=window.getComputedStyle(u.current).fontFamily);let f=Math.max(32,Math.round(1.18*s));d.setTransform(1,0,0,1,0,0),d.clearRect(0,0,n,s),d.font=`700 ${f}px ${w}`,d.textAlign="left",d.textBaseline="alphabetic";let x=d.measureText("MINUS"),P=Math.max(24,Math.round(.9*s/Math.max(1,(x.actualBoundingBoxAscent>0?x.actualBoundingBoxAscent:.72*f)+(x.actualBoundingBoxDescent>=0?x.actualBoundingBoxDescent:.02*f))*f)),T=.064*P;d.font=`700 ${P}px ${w}`;let F=ee.map(e=>d.measureText(e).width).reduce((e,t)=>e+t,0)+T*(ee.length-1);F>.95*n&&(T=.064*(P=Math.max(20,Math.round(.95*n/F*P)))),d.font=A=`700 ${P}px ${w}`;let N=d.measureText("MINUS"),D=Math.round(.5*s+((N.actualBoundingBoxAscent>0?N.actualBoundingBoxAscent:.72*P)-(N.actualBoundingBoxDescent>=0?N.actualBoundingBoxDescent:0))*.5),j=ee.map(e=>d.measureText(e).width),B=j.reduce((e,t)=>e+t,0)+T*(ee.length-1),_=(n-B)*.5;M=_,k=Math.max(1,B),S=[],d.fillStyle="#ffffff";for(let e=0;e<ee.length;e++){let t=ee[e];S.push({ch:t,x:_,y:D}),d.fillText(t,_,D),_+=j[e]+T}C=Math.max(5,Math.round((l?4.6:5.6)*b)),E=Math.max(7,Math.round((l?5.8:6.8)*b)),(()=>{h.width=Math.max(1,Z.length*C),h.height=Math.max(1,Q.length*E),p.setTransform(1,0,0,1,0,0),p.clearRect(0,0,h.width,h.height);let e=Math.max(7,Math.round(.88*E));p.font=`600 ${e}px ${y}`,p.textAlign="center",p.textBaseline="middle";for(let e=0;e<Q.length;e++){p.fillStyle=Q[e];let t=Math.round((e+.52)*E);for(let e=0;e<Z.length;e++){let a=Math.round((e+.5)*C);p.fillText(Z[e],a,t)}}})();let I=d.getImageData(0,0,n,s).data,O=Math.ceil(n/C),L=Math.ceil(s/E),U=[];for(let e=0;e<L;e++){let t=Math.round((e+.5)*E);if(!(t<0)&&!(t>=s))for(let a=0;a<O;a++){let o=Math.round((a+.5)*C);if(o<0||o>=n)continue;let r=I[(t*n+o)*4+3],l=Math.max(0,o-Math.floor(.35*C)),i=Math.min(n-1,o+Math.floor(.35*C)),c=Math.max(0,t-Math.floor(.35*E)),u=Math.min(s-1,t+Math.floor(.35*E));if(36>Math.max(r,I[(t*n+l)*4+3],I[(t*n+i)*4+3],I[(c*n+o)*4+3],I[(u*n+o)*4+3]))continue;let m=Math.min(1,Math.max(0,(o-M)/k)),d=t/Math.max(1,s),h=+(r<200),p=(1-.28*d)*.68+(3*a+5*e&7)/7*.32,f=Math.min(Z.length-1,Math.max(2,Math.floor(p*Z.length)));U.push({px:Math.round(o-.5*C),py:Math.round(t-.5*E),xNorm:m,yNorm:d,baseIdx:f,edgeFactor:h})}}R=U},H=t=>{let a=r.width,o=r.height;if(i.setTransform(1,0,0,1,0,0),i.clearRect(0,0,a,o),!e&&!x||D<=.001&&!x)return;let l=.001*t,n=i.createLinearGradient(0,0,a,o);if(n.addColorStop(0,"rgba(151, 223, 252, 0.32)"),n.addColorStop(.5,"rgba(196, 240, 255, 0.26)"),n.addColorStop(1,"rgba(133, 138, 227, 0.26)"),D<1){let e=M+k*Math.min(1,1.15*D),t=Math.max(0,e-.32*k),r=i.createLinearGradient(t,0,e,0);r.addColorStop(0,"rgba(151, 223, 252, 0.30)"),r.addColorStop(.65,"rgba(151, 223, 252, 0.16)"),r.addColorStop(1,"rgba(151, 223, 252, 0)"),i.fillStyle=r,i.fillRect(0,0,Math.min(a,e+2),o)}else i.fillStyle=n,i.fillRect(0,0,a,o);let s=56*b;for(let e=0;e<R.length;e++){let t=R[e],a=t.baseIdx,o=1,r=.94;if(D<1){let e=.62*t.xNorm,i=(D-e)/.38;if(i<=0)continue;i<1?(a=Math.min(Z.length-1,Math.floor(i*Z.length)),o=i>.72?2:+(i>.36),r=Math.min(1,.42+.65*i)):o=.5+.5*Math.sin(1.15*l-4.4*t.xNorm)>.78?2:1}else{let e=Math.sin(1.05*l-4.2*t.xNorm+1.5*t.yNorm);if(e>.86?(a=Math.min(Z.length-1,t.baseIdx+1),o=2,r=.98):e<-.72?(o=0,r=.86):(o=t.edgeFactor&&e>.25?2:1,r=.94),z>.005){let e=t.px+.5*C,l=t.py+.5*E,i=Math.hypot(e-L,l-U);if(i<s){let e=Math.pow(1-i/s,1.5)*z;e>.16&&(a=Math.min(Z.length-1,a+(e>.55?2:1)),o=2,r=1)}}}i.globalAlpha=r,i.drawImage(h,a*C,o*E,C,E,t.px,t.py,C,E)}if(i.globalAlpha=1,i.globalCompositeOperation="destination-in",i.drawImage(m,0,0),i.globalCompositeOperation="source-over",S.length>0){i.save();let e=D<1?Math.min(.56,.56*Math.max(0,(D-.18)/.82)):.56;if(e>.01){i.font=A,i.textAlign="left",i.textBaseline="alphabetic",i.lineWidth=Math.max(.85,.85*b),i.strokeStyle=`rgba(151, 223, 252, ${e.toFixed(3)})`;for(let e=0;e<S.length;e++){let t=S[e];i.strokeText(t.ch,t.x,t.y)}}i.restore()}},$=performance.now(),X=e=>{if(O||document.hidden||!_){T=!1;return}P=window.requestAnimationFrame(X);let t=Math.min(.05,Math.max(.001,(e-$)*.001));$=e;let a=j&&!B;a&&(0===N&&(N=e),(D=Math.min(1,(e-N)/Math.max(180,l)))>=1&&(B=!0));let o=W>z?14:8;z+=(W-z)*Math.min(1,t*o),.003>Math.abs(W-z)&&(z=W);let r=z>.003||W>0;a||r?H(e):B&&!f&&e-I>=125&&(I=e,H(e))},V=()=>{O||f||T||document.hidden||!_||(T=!0,$=performance.now(),P=window.requestAnimationFrame(X))},Y=()=>{T&&(T=!1,window.cancelAnimationFrame(P))};G(),x?(D=1,j=!0,B=!0,H(performance.now())):e&&(F=window.setTimeout(()=>{j=!0,N=0,V()},a)),!f&&(x||e)?V():(e||x)&&H(performance.now());let q=e=>{if("touch"===e.pointerType||f||!B)return;let t=o.getBoundingClientRect();L=(e.clientX-t.left)*b,U=(e.clientY-t.top)*b,W=1,V()},J=()=>{W=0},K=()=>{document.hidden?Y():_&&(e||x)&&V()};o.addEventListener("pointermove",q,{passive:!0}),o.addEventListener("pointerleave",J,{passive:!0}),document.addEventListener("visibilitychange",K);let et=null;"u">typeof IntersectionObserver&&(et=new IntersectionObserver(t=>{(_=t[0]?.isIntersecting??!0)?(e||x)&&V():Y()},{threshold:.02})).observe(o);let ea=new ResizeObserver(()=>{G(),(B||x||D>0)&&H(performance.now())});return ea.observe(o),document.fonts?.ready.then(()=>{!O&&(G(),(B||x||D>0)&&H(performance.now()))}).catch(()=>{}),()=>{O=!0,window.clearTimeout(F),Y(),o.removeEventListener("pointermove",q),o.removeEventListener("pointerleave",J),document.removeEventListener("visibilitychange",K),et?.disconnect(),ea.disconnect()}},[e,t,a,l]),(0,o.jsxs)("span",{ref:n,"data-minus-wordmark":"vector-micro-ascii",className:`relative mx-auto block h-[48px] w-[264px] max-w-full cursor-default select-none sm:h-[74px] sm:w-[418px] ${i}`,children:[(0,o.jsx)("span",{ref:c,"aria-hidden":"true",className:"pointer-events-none sr-only font-heading font-bold",children:"MINUS"}),(0,o.jsx)("span",{ref:u,"aria-hidden":"true",className:"pointer-events-none sr-only font-mono font-semibold",children:"T"}),(0,o.jsx)("span",{className:"sr-only",children:"Minus"}),(0,o.jsx)("canvas",{ref:s,"aria-hidden":"true",className:"block h-full w-full"})]})}let ea=[{index:"01",title:"Timed drops on a live clock.",body:"Every release opens on a shared countdown built for launch-second demand, so checkout stays steady instead of disappearing into an ad feed.",specTag:"LIVE CLOCK"},{index:"02",title:"Sizing matched to real garment measurements.",body:"Fit guidance built from each piece's actual flat specs and cut, so you pick the right size with confidence before a small run sells through.",specTag:"FLAT SPECS"},{index:"03",title:"Direct loyalty with the labels you wear.",body:"Collect pieces from independent brands to unlock tier status, early drop windows, and free shipping tied directly to that label.",specTag:"BRAND TIERS"},{index:"04",title:"Native drop-to-door tracking.",body:"Follow every order from confirmation to doorstep inside T^minus, without digging through inbox threads or scattered carrier links.",specTag:"ORDER FEED"}],eo=[{id:"hero",label:"HERO"},{id:"polar",label:"POLAR"},{id:"index",label:"INDEX"},{id:"tzero",label:"T-ZERO"}];function er(e,t,a){let o=Math.min(1,Math.max(0,(a-e)/(t-e)));return o*o*(3-2*o)}function el({skipIntro:e=!1}){let[t,a]=(0,r.useState)(e),[l,i]=(0,r.useState)(e),[n,s]=(0,r.useState)(null),[c,u]=(0,r.useState)(null),[d,f]=(0,r.useState)(0),[x,g]=(0,r.useState)(null),v=(0,r.useRef)(null),b=(0,r.useRef)(null),w=(0,r.useRef)(null),y=(0,r.useRef)(null),C=(0,r.useRef)(null),E=(0,r.useRef)(null),R=(0,r.useRef)(null),S=(0,r.useRef)(null),A=(0,r.useRef)(null),M=(0,r.useRef)(null),k=(0,r.useRef)(null),P=(0,r.useRef)(null),T=(0,r.useRef)(null),F=(0,r.useRef)(null),N=(0,r.useRef)([]),j=(0,r.useRef)([]),B=(0,r.useRef)([]),_=(0,r.useRef)({runwayTop:0,runwayScrollable:1600,indexTop:2800,closingTop:3600,docMaxScroll:4e3}),O=(0,r.useRef)({cdOpacity:"",cdTransform:"",stripOpacity:"",stripTransform:"",polarOpacity:"",polarTransform:"",heroOpacity:"",heroTransform:"",heroPointer:"",veilOpacity:"",veilBg:"",hudText:"",scrollCueOpacity:"",vernierActiveIdx:-1});(0,r.useEffect)(()=>{try{let e=new URLSearchParams(window.location.search);"1"===e.get("skipIntro")&&(a(!0),i(!0))}catch{}},[]);let L=(0,r.useCallback)(()=>{let e=window.innerHeight||900,t=window.scrollY,a=R.current,o=E.current,r=C.current,l=a?a.getBoundingClientRect().top+t:0,i=a?Math.max(1,a.getBoundingClientRect().height-e):Math.max(420,2*e),n=o?o.getBoundingClientRect().top+t:l+i+400,s=r?r.getBoundingClientRect().top+t:n+700;_.current={runwayTop:l,runwayScrollable:i,indexTop:n,closingTop:s,docMaxScroll:Math.max(1,document.documentElement.scrollHeight-e)}},[]);(0,r.useEffect)(()=>{let e=window.setTimeout(L,60);return window.addEventListener("resize",L,{passive:!0}),()=>{window.clearTimeout(e),window.removeEventListener("resize",L)}},[L]),(0,r.useEffect)(()=>{let e=document.documentElement.style.backgroundColor,t=document.body.style.backgroundColor;return document.documentElement.style.backgroundColor="#040206",document.body.style.backgroundColor="#040206",()=>{document.documentElement.style.backgroundColor=e,document.body.style.backgroundColor=t}},[]),(0,r.useEffect)(()=>{if(!n)return;let e=e=>{"Escape"===e.key&&s(null)};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[n]);let U=(0,r.useCallback)(e=>{for(let t=0;t<eo.length;t++){let a=t===e,o=N.current[t],r=j.current[t],l=B.current[t];o&&(o.setAttribute("aria-current",a?"true":"false"),o.dataset.active=a?"true":"false"),r&&(r.style.width=a?"20px":"10px",r.style.backgroundColor=a?"#97DFFC":"rgba(133, 138, 227, 0.45)"),l&&(l.style.color=a?"#97DFFC":"rgba(162, 167, 240, 0.65)",l.style.opacity=a?"1":"0.78")}},[]),z=(0,r.useCallback)(e=>{let t=O.current,a=A.current;if(a){let o=er(.66,.98,e.settleProgress).toFixed(3),r=`translate3d(-50%, ${e.countdownCenterY.toFixed(1)}px, 0) translateY(-50%)`;t.cdOpacity!==o&&(t.cdOpacity=o,a.style.opacity=o),t.cdTransform!==r&&(t.cdTransform=r,a.style.transform=r)}let o=M.current;if(o){let a=(1-er(.18,.48,e.polarFactor)).toFixed(3),r=`scale(${e.countdownScale.toFixed(4)})`;t.stripOpacity!==a&&(t.stripOpacity=a,o.style.opacity=a),t.stripTransform!==r&&(t.stripTransform=r,o.style.transform=r)}let r=k.current;if(r){let a=er(.32,.68,e.polarFactor),o=a.toFixed(3);if(t.polarOpacity!==o&&(t.polarOpacity=o,r.style.opacity=o),a>.001){let a=e.viewportW<640,o=Math.min(1,Math.max(.5,Math.min(e.polarDiameterPx*(a?.65:.72)/(a?264:410),e.polarDiameterPx*(a?.62:.68)/(a?172:260)))),l=.88+.12*er(.28,.74,e.polarFactor),i=`translate(-50%, -50%) scale(${(o*l).toFixed(4)})`;t.polarTransform!==i&&(t.polarTransform=i,r.style.transform=i)}}b.current?.update({polarFactor:e.polarFactor,polarDiameterPx:e.polarDiameterPx,scrollAzimDeg:e.scrollAzimDeg,tickPulse:e.tickPulse});let l=S.current;if(l){let a=er(.015,.22,e.pinProgress),o=(1-a).toFixed(3),r=`translate3d(0, ${(-(34*a)).toFixed(1)}px, 0)`,i=e.pinProgress>.14?"none":"auto";t.heroOpacity!==o&&(t.heroOpacity=o,l.style.opacity=o),t.heroTransform!==r&&(t.heroTransform=r,l.style.transform=r),t.heroPointer!==i&&(t.heroPointer=i,l.style.pointerEvents=i)}let i=P.current;if(i){let a=er(.68,.88,e.pinProgress),o=a.toFixed(3);t.veilOpacity!==o&&(t.veilOpacity=o,i.style.opacity=o);let r="none";if(a>.002&&e.domeRadiusPx>10){let t=e.viewportW<640,a=e.domeCenterX.toFixed(0),o=e.domeCenterY.toFixed(0),l=Math.max(24,122-e.domeCenterY),i=Math.min(l-22,e.domeRadiusPx+(t?16:14)).toFixed(0),n=Math.min(l-10,e.domeRadiusPx+(t?28:26)).toFixed(0),s=Math.min(l,e.domeRadiusPx+(t?42:40)).toFixed(0),c=Math.min(74,Math.max(24,e.domeEdgeY+12)).toFixed(0),u=Math.min(118,Math.max(58,e.domeEdgeY+38)).toFixed(0);r=`radial-gradient(circle at ${a}px ${o}px, #040206 0px, #040206 ${i}px, rgba(4, 2, 6, 0.90) ${n}px, rgba(4, 2, 6, 0) ${s}px), linear-gradient(180deg, #040206 0px, #040206 ${c}px, rgba(4, 2, 6, 0) ${u}px)`}t.veilBg!==r&&(t.veilBg=r,i.style.backgroundImage=r)}let n=T.current;if(n){var s,c;let a,o=e.heroResolved?(s=e.pinProgress,a=Math.round(e.elevDeg),s<.2?`${a}\xb0 HORIZON`:s<.72?`${a}\xb0 POLAR`:`${a}\xb0 LEDGER`):(c=e.introElapsed)<2.65?"01 \xb7 SUPERGIANT":c<4.15?"02 \xb7 CORE COLLAPSE":c<5.2?"03 \xb7 SUPERNOVA":"04 \xb7 EVENT HORIZON";t.hudText!==o&&(t.hudText=o,n.textContent=o)}let u=F.current;if(u){let a=(er(.92,1,e.settleProgress)*(1-er(0,.022,e.pinProgress))).toFixed(3);t.scrollCueOpacity!==a&&(t.scrollCueOpacity=a,u.style.opacity=a)}if(e.heroResolved&&e.viewportW>=1024){let a=_.current,o=window.scrollY,r=window.innerHeight||900,l=0;l=e.pinProgress<.2?0:e.pinProgress<.78?1:o+.52*r>=a.closingTop||o>=a.docMaxScroll-80?3:2,t.vernierActiveIdx!==l&&(t.vernierActiveIdx=l,U(l))}},[U]),W=(0,r.useCallback)(e=>{v.current?.pulseHorizon(e)},[]),G=(0,r.useCallback)(()=>{v.current?.skipIntro(),i(!0)},[]),H=(0,r.useCallback)(()=>{a(!1),i(!1),window.scrollTo({top:0,behavior:"smooth"}),v.current?.replayIntro()},[]),X=(0,r.useCallback)(e=>{L();let t=_.current;if("hero"===e)return void window.scrollTo({top:0,behavior:"smooth"});if("polar"===e){let e=Math.round(t.runwayTop+.47*t.runwayScrollable);window.scrollTo({top:e,behavior:"smooth"});return}if("index"===e){let e=Math.max(0,Math.round(t.indexTop-118));window.scrollTo({top:e,behavior:"smooth"});return}C.current?.scrollIntoView({behavior:"smooth",block:"center"})},[L]),V=(0,r.useCallback)(e=>{u(t=>({role:e,seq:(t?.seq??0)+1})),f(e=>e+1),v.current?.pulseHorizon("subtle"),C.current?.scrollIntoView({behavior:"smooth",block:"center"}),window.setTimeout(()=>{y.current?.focus({preventScroll:!0})},340)},[]);return(0,o.jsxs)("div",{className:"relative min-h-[100dvh] w-full overflow-x-clip bg-[#040206] font-sans text-white selection:bg-[#613DC1]/55 selection:text-white",children:[(0,o.jsx)(D,{onHeroReveal:i,onHorizonSync:z,runwayRef:R,controlRef:v,skipIntro:e}),(0,o.jsx)("div",{ref:P,"aria-hidden":"true",style:{opacity:0},className:"pointer-events-none fixed inset-0 z-20 will-change-[opacity]"}),(0,o.jsxs)("header",{className:"pointer-events-none fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between px-4 sm:h-[76px] sm:px-10",children:[(0,o.jsx)("div",{"aria-hidden":"true",className:`pointer-events-none absolute top-0 left-0 h-20 w-44 transition-opacity duration-500 sm:h-24 sm:w-64 ${l?"opacity-100":"opacity-0"}`,style:{background:"radial-gradient(ellipse 95% 88% at 0% 0%, rgba(4, 2, 6, 0.92) 0%, rgba(4, 2, 6, 0.62) 48%, rgba(4, 2, 6, 0) 100%)"}}),(0,o.jsx)("div",{"aria-hidden":"true",className:"pointer-events-none absolute top-0 right-0 h-20 w-48 sm:h-24 sm:w-72",style:{background:"radial-gradient(ellipse 95% 88% at 100% 0%, rgba(4, 2, 6, 0.88) 0%, rgba(4, 2, 6, 0.52) 50%, rgba(4, 2, 6, 0) 100%)"}}),(0,o.jsx)("a",{href:"#top","data-brand-wordmark":"true",onClick:e=>{e.preventDefault(),window.scrollTo({top:0,behavior:"smooth"})},className:`relative z-10 text-white transition-opacity duration-500 ease-out hover:opacity-85 focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:outline-none ${l?"pointer-events-auto opacity-100 delay-[260ms]":"pointer-events-none opacity-0"}`,style:t?{transitionDelay:"0ms"}:void 0,children:(0,o.jsx)(p,{className:"[--wm-scale:1.0] sm:[--wm-scale:1.38]"})}),(0,o.jsxs)("div",{"data-perimeter-hud":"true",className:"relative z-10 flex items-center gap-2 font-mono text-[9px] font-medium tracking-[0.12em] text-[#A2A7F0] uppercase whitespace-nowrap sm:gap-3 sm:text-[10px] sm:tracking-[0.16em]",children:[(0,o.jsxs)("span",{className:"inline-flex items-center gap-1.5",children:[(0,o.jsx)("span",{"aria-hidden":"true",className:"size-1.5 rounded-full bg-[#97DFFC]/85"}),(0,o.jsx)("span",{ref:T,"data-hud-readout":"true",className:"tabular-nums text-[#DCD5EE]",children:l?"26\xb0 HORIZON":"01 \xb7 SUPERGIANT"})]}),l?null:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("span",{"aria-hidden":"true",className:"h-3 w-px bg-[#858AE3]/35"}),(0,o.jsxs)("button",{type:"button","data-skip-intro":"true",onClick:G,className:"pointer-events-auto inline-flex min-h-[28px] cursor-pointer items-center gap-1 rounded-[4px] border border-[#858AE3]/35 bg-[#07050D]/80 px-2 py-1 text-[9.5px] font-medium tracking-[0.14em] text-white transition-colors duration-150 hover:border-[#97DFFC]/80 hover:text-[#97DFFC] focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:outline-none sm:px-2.5 sm:text-[10px]",children:[(0,o.jsx)("span",{children:"SKIP"}),(0,o.jsx)("span",{"aria-hidden":"true",className:"text-[#97DFFC]",children:"→"})]})]})]})]}),(0,o.jsxs)("div",{ref:F,"data-scroll-cue":"true","aria-hidden":"true",style:{opacity:+!!t},className:"pointer-events-none fixed bottom-[calc(20.5dvh+10px)] left-1/2 z-[35] -translate-x-1/2 font-mono text-[9.5px] font-medium tracking-[0.2em] text-[#A2A7F0]/85 uppercase whitespace-nowrap transition-opacity duration-200 will-change-[opacity] sm:bottom-[calc(22dvh+14px)] sm:text-[10px]",children:[(0,o.jsx)("span",{className:"text-[#97DFFC]",children:"↓"})," SCROLL TO ORBIT"]}),(0,o.jsx)("nav",{"aria-label":"Page orbital sections","data-vernier-rail":"true",className:`fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 flex-col items-end transition-opacity duration-500 lg:flex ${l?"pointer-events-auto opacity-100":"pointer-events-none opacity-0"}`,children:(0,o.jsxs)("div",{className:"relative flex flex-col items-end gap-5 py-2 pr-3",children:[(0,o.jsx)("span",{"aria-hidden":"true",className:"pointer-events-none absolute top-0 right-0 bottom-0 w-px bg-[#858AE3]/24"}),eo.map((e,t)=>(0,o.jsxs)("button",{ref:e=>{N.current[t]=e},type:"button","data-vernier-tick":e.id,"data-active":0===t?"true":"false","aria-current":0===t?"true":"false",onClick:()=>X(e.id),className:"group relative flex cursor-pointer items-center gap-2.5 py-0.5 text-right focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:outline-none",children:[(0,o.jsx)("span",{ref:e=>{B.current[t]=e},style:{color:0===t?"#97DFFC":"rgba(162, 167, 240, 0.65)",opacity:0===t?1:.78},className:"font-mono text-[9.5px] font-medium tracking-[0.16em] uppercase transition-colors duration-200 group-hover:text-white",children:e.label}),(0,o.jsx)("span",{ref:e=>{j.current[t]=e},"aria-hidden":"true",style:{width:0===t?"20px":"10px",backgroundColor:0===t?"#97DFFC":"rgba(133, 138, 227, 0.45)"},className:"block h-px transition-all duration-200 group-hover:bg-[#97DFFC]"})]},e.id))]})}),(0,o.jsx)("div",{ref:A,style:{opacity:+!!t,transform:"translate3d(-50%, calc(100dvh - 96px), 0) translateY(-50%)"},className:"pointer-events-none fixed top-0 left-1/2 z-40 will-change-transform",children:(0,o.jsx)(I,{stripRef:M,polarRef:k,bezelControlRef:b})}),(0,o.jsxs)("main",{id:"top",className:"relative w-full",children:[(0,o.jsx)("div",{ref:R,className:"relative h-[255dvh] w-full sm:h-[305dvh]",children:(0,o.jsx)("section",{"data-section":"hero",className:`sticky top-0 z-[35] flex h-[100dvh] w-full flex-col items-center justify-center px-5 pt-16 pb-[23dvh] transition-opacity duration-400 ease-out sm:px-8 sm:pt-[76px] sm:pb-[25vh] ${l?"opacity-100":"pointer-events-none opacity-0"}`,children:(0,o.jsxs)("div",{ref:S,className:"flex w-full max-w-[660px] flex-col items-center text-center will-change-transform",children:[(0,o.jsxs)("h1",{className:"flex w-full flex-col items-center",children:[(0,o.jsx)("span",{style:{fontSize:"clamp(2.05rem, 4.1vw, 3.45rem)"},className:"block font-heading leading-[1.0] font-semibold tracking-[-0.035em] text-white",children:(0,o.jsx)(q,{text:"Fashion.",active:l,instant:t,origin:"left",delayMs:40,durationMs:540})}),(0,o.jsx)(et,{active:l,instant:t,delayMs:110,durationMs:620,className:"my-2 sm:my-2.5"}),(0,o.jsx)("span",{style:{fontSize:"clamp(2.05rem, 4.1vw, 3.45rem)"},className:"block font-heading leading-[1.02] font-semibold tracking-[-0.035em] text-[#EAE5F5]",children:(0,o.jsx)(q,{text:"the Noise.",active:l,instant:t,origin:"left",delayMs:200,durationMs:560})})]}),(0,o.jsxs)("p",{className:`mt-5 max-w-[330px] font-sans text-[14.5px] leading-[1.52] font-normal text-[#DCD5EE] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:mt-6 sm:max-w-[460px] sm:text-[16px] sm:leading-[1.55] ${l?"translate-y-0 opacity-100 delay-[260ms]":"translate-y-2 opacity-0"}`,style:t?{transitionDelay:"0ms"}:void 0,children:["The best clothes in the world rarely have the loudest"," ",(0,o.jsx)("span",{className:"font-medium text-[#97DFFC]",children:"voice"}),"."]}),(0,o.jsx)("div",{"data-hero-waitlist":"true",className:`mt-6 w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:mt-7 ${l?"translate-y-0 opacity-100 delay-[300ms]":"translate-y-2 opacity-0"}`,style:t?{transitionDelay:"0ms"}:void 0,children:(0,o.jsx)($,{idPrefix:"hero-waitlist",inputRef:w,onOpenLegal:s,onInteractPulse:W})})]})})}),(0,o.jsxs)("div",{"data-below-fold":"true",className:"relative z-10 mx-auto w-full max-w-[1080px] px-5 pt-16 sm:px-10 sm:pt-24",children:[(0,o.jsxs)("section",{"data-band":"premise",className:"pb-16 sm:pb-24",children:[(0,o.jsxs)("p",{className:"font-mono text-[11px] font-medium tracking-[0.18em] text-[#A2A7F0] uppercase",children:[(0,o.jsx)("span",{className:"text-[#97DFFC]",children:"+"})," ",(0,o.jsx)(J,{text:"PREMISE",tier:"telemetry",instant:t})]}),(0,o.jsxs)("div",{className:"mt-5 grid grid-cols-1 gap-8 md:mt-6 md:grid-cols-12 md:items-end md:gap-12",children:[(0,o.jsx)("div",{className:"md:col-span-7",children:(0,o.jsx)("h2",{style:{fontSize:"clamp(1.92rem, 4.3vw, 3.6rem)"},className:"max-w-[18ch] font-heading leading-[1.03] font-semibold tracking-[-0.036em] text-white",children:(0,o.jsx)(J,{text:"Great independent labels shouldn't have to buy attention to be found.",tier:"headline",instant:t})})}),(0,o.jsxs)("div",{className:"flex flex-col justify-end md:col-span-5",children:[(0,o.jsx)(J,{tier:"prose",instant:t,delayMs:120,children:(0,o.jsx)("p",{className:"font-sans text-[15.5px] leading-[1.68] font-normal text-[#DDD6EF] sm:text-[16px]",children:"Small clothing brands put months into fabric, cut, and finish, only to disappear under paid feeds. T^minus gives independent labels a dedicated home built around scheduled releases, so buyers discover pieces for the garment itself."})}),(0,o.jsxs)("dl",{className:"mt-7 grid grid-cols-2 gap-4 border-t border-[#858AE3]/24 pt-5 font-mono text-[10.5px] tracking-[0.14em] uppercase",children:[(0,o.jsxs)("div",{children:[(0,o.jsx)("dt",{className:"text-[#9EA3EE]",children:"FORMAT"}),(0,o.jsx)("dd",{className:"mt-1 text-white",children:"SCHEDULED DROPS"})]}),(0,o.jsxs)("div",{children:[(0,o.jsx)("dt",{className:"text-[#9EA3EE]",children:"FEED RANKING"}),(0,o.jsx)("dd",{className:"mt-1 text-white",children:"ZERO PAID ADS"})]})]})]})]}),(0,o.jsx)("div",{className:"mt-14 sm:mt-20",children:(0,o.jsx)(K,{instant:t})})]}),(0,o.jsxs)("section",{ref:E,"data-band":"architecture",className:"pb-16 sm:pb-24",children:[(0,o.jsxs)("div",{className:"mb-8 flex items-center justify-between font-mono text-[11px] font-medium tracking-[0.18em] text-[#A2A7F0] uppercase sm:mb-10",children:[(0,o.jsxs)("span",{children:[(0,o.jsx)("span",{className:"text-[#97DFFC]",children:"+"})," ",(0,o.jsx)(J,{text:"ARCHITECTURE",tier:"telemetry",instant:t})]}),(0,o.jsx)("span",{className:"text-[#A2A7F0]",children:"01 — 04"})]}),(0,o.jsx)("ol",{className:"divide-y divide-[#858AE3]/22 border-y border-[#858AE3]/22",children:ea.map((e,a)=>(0,o.jsxs)("li",{className:"group relative py-7 transition-colors duration-200 [@media(hover:hover)]:hover:bg-[#613DC1]/[0.06] sm:px-3 sm:py-9",children:[(0,o.jsx)("span",{"aria-hidden":"true",className:"pointer-events-none absolute top-1/2 left-0 hidden -translate-y-1/2 font-mono text-[11px] text-[#97DFFC] opacity-0 transition-opacity duration-200 [@media(hover:hover)]:group-hover:opacity-100 sm:block",children:"+"}),(0,o.jsxs)("div",{className:"grid grid-cols-1 gap-3 md:grid-cols-12 md:items-baseline md:gap-8",children:[(0,o.jsxs)("div",{className:"flex items-center justify-between md:col-span-1 md:block",children:[(0,o.jsx)("span",{className:"font-mono text-[12.5px] font-medium tracking-[0.16em] text-[#97DFFC] tabular-nums",children:e.index}),(0,o.jsx)("span",{className:"font-mono text-[10px] font-medium tracking-[0.16em] text-[#A2A7F0] uppercase md:hidden",children:e.specTag})]}),(0,o.jsx)("div",{className:"md:col-span-4",children:(0,o.jsx)("h3",{className:"font-heading text-[21px] leading-[1.18] font-semibold tracking-[-0.025em] text-white sm:text-[23px]",children:(0,o.jsx)(J,{text:e.title,tier:"headline",instant:t,delayMs:60*a})})}),(0,o.jsx)("div",{className:"md:col-span-5",children:(0,o.jsx)(J,{tier:"prose",instant:t,delayMs:80+50*a,children:(0,o.jsx)("p",{className:"max-w-[44ch] font-sans text-[15px] leading-[1.64] text-[#D8D1EC]",children:e.body})})}),(0,o.jsx)("div",{className:"hidden text-right md:col-span-2 md:block",children:(0,o.jsx)("span",{className:"font-mono text-[10.5px] font-medium tracking-[0.16em] text-[#A2A7F0] uppercase transition-colors duration-200 [@media(hover:hover)]:group-hover:text-[#97DFFC]",children:e.specTag})})]})]},e.index))})]}),(0,o.jsxs)("section",{"data-band":"closing",className:"pb-12 sm:pb-16",children:[(0,o.jsxs)("div",{"data-band3-spotlight":x??"none",onMouseLeave:()=>g(null),onBlur:e=>{e.currentTarget.contains(e.relatedTarget)||g(null)},className:"relative border-t border-[#858AE3]/18 pt-8 sm:pt-10",children:[(0,o.jsx)("span",{"aria-hidden":"true","data-spotlight-rail":"true",className:`pointer-events-none absolute top-[-1px] left-0 hidden h-px w-1/2 bg-[#97DFFC] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:block ${"BRAND"===x?"translate-x-full opacity-100":"SHOPPER"===x?"translate-x-0 opacity-100":"translate-x-0 opacity-0"}`}),(0,o.jsxs)("div",{className:"grid grid-cols-1 gap-10 pb-14 md:grid-cols-2 md:gap-0 md:divide-x md:divide-[#858AE3]/22 sm:pb-16",children:[(0,o.jsxs)("div",{"data-spotlight-col":"SHOPPER",onMouseEnter:()=>g("SHOPPER"),onFocus:()=>g("SHOPPER"),className:`flex flex-col justify-between transition-opacity duration-200 md:pr-12 lg:pr-16 ${"BRAND"===x?"md:opacity-[0.82]":"opacity-100"}`,children:[(0,o.jsxs)("div",{children:[(0,o.jsxs)("p",{className:"font-mono text-[11px] font-medium tracking-[0.18em] text-[#A2A7F0] uppercase",children:[(0,o.jsx)("span",{className:"text-[#97DFFC]",children:"+"})," ",(0,o.jsx)(J,{text:"FOR SHOPPERS",tier:"telemetry",instant:t})]}),(0,o.jsx)("h3",{className:"mt-3.5 font-heading text-[24px] leading-[1.15] font-semibold tracking-[-0.03em] text-white sm:text-[28px]",children:(0,o.jsx)(J,{text:"Find drops worth waiting for.",tier:"headline",instant:t})}),(0,o.jsx)(J,{tier:"prose",instant:t,delayMs:80,children:(0,o.jsx)("p",{className:"mt-3.5 max-w-[42ch] font-sans text-[15px] leading-[1.66] text-[#D8D1EC]",children:"Discover independent releases on a live clock, check true garment measurements before launch, and get first access without scrolling past ads."})})]}),(0,o.jsxs)("button",{type:"button",onClick:()=>V("SHOPPER"),className:"mt-6 inline-flex w-fit cursor-pointer items-center gap-1.5 font-mono text-[11.5px] font-medium tracking-[0.14em] text-[#97DFFC] uppercase transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:outline-none",children:[(0,o.jsx)("span",{children:"Join as a shopper"}),(0,o.jsx)(m,{className:"size-3.5"})]})]}),(0,o.jsxs)("div",{"data-spotlight-col":"BRAND",onMouseEnter:()=>g("BRAND"),onFocus:()=>g("BRAND"),className:`flex flex-col justify-between border-t border-[#858AE3]/20 pt-9 transition-opacity duration-200 md:border-t-0 md:pt-0 md:pl-12 lg:pl-16 ${"SHOPPER"===x?"md:opacity-[0.82]":"opacity-100"}`,children:[(0,o.jsxs)("div",{children:[(0,o.jsxs)("p",{className:"font-mono text-[11px] font-medium tracking-[0.18em] text-[#A2A7F0] uppercase",children:[(0,o.jsx)("span",{className:"text-[#97DFFC]",children:"+"})," ",(0,o.jsx)(J,{text:"FOR INDEPENDENT LABELS",tier:"telemetry",instant:t})]}),(0,o.jsx)("h3",{className:"mt-3.5 font-heading text-[24px] leading-[1.15] font-semibold tracking-[-0.03em] text-white sm:text-[28px]",children:(0,o.jsx)(J,{text:"Launch on your own clock.",tier:"headline",instant:t})}),(0,o.jsx)(J,{tier:"prose",instant:t,delayMs:80,children:(0,o.jsx)("p",{className:"mt-3.5 max-w-[42ch] font-sans text-[15px] leading-[1.66] text-[#D8D1EC]",children:"Keep your own identity, story, and pricing. Turn every collection into a scheduled release event and build direct repeat buyers without paying ad platforms."})})]}),(0,o.jsxs)("button",{type:"button",onClick:()=>V("BRAND"),className:"mt-6 inline-flex w-fit cursor-pointer items-center gap-1.5 font-mono text-[11.5px] font-medium tracking-[0.14em] text-[#97DFFC] uppercase transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:outline-none",children:[(0,o.jsx)("span",{children:"Apply as a brand"}),(0,o.jsx)(m,{className:"size-3.5"})]})]})]})]}),(0,o.jsx)(K,{variant:"arch",instant:t,className:"mb-10 sm:mb-12"}),(0,o.jsxs)("div",{ref:C,className:"grid grid-cols-1 gap-8 border-b border-[#858AE3]/22 pb-12 md:grid-cols-12 md:items-center md:gap-10 sm:pb-14",children:[(0,o.jsxs)("div",{className:"md:col-span-6",children:[(0,o.jsx)("p",{className:"font-mono text-[11px] font-medium tracking-[0.18em] text-[#A2A7F0] uppercase",children:"APP STORE V1.0 \xb7 JANUARY 1, 2027"}),(0,o.jsxs)("h2",{style:{fontSize:"clamp(2.1rem, 4.1vw, 3.25rem)"},className:"mt-3 font-heading leading-[1.04] font-semibold tracking-[-0.035em] text-white",children:[(0,o.jsx)(J,{text:"Be there at ",tier:"headline",instant:t}),(0,o.jsx)("span",{className:"text-[#97DFFC]",children:(0,o.jsx)(J,{text:"T-zero.",tier:"headline",instant:t,delayMs:180})})]}),(0,o.jsx)("p",{className:"mt-3.5 max-w-[38ch] font-sans text-[15px] leading-[1.62] text-[#D8D1EC]",children:"Drop your mobile number for launch-day access and scheduled release alerts."})]}),(0,o.jsx)("div",{"data-closing-waitlist":"true",className:"flex md:col-span-6 md:justify-end",children:(0,o.jsx)($,{idPrefix:"closing-waitlist",inputRef:y,onOpenLegal:s,requestedRole:c,align:"left",onInteractPulse:W,registrationPulseSeq:d})})]})]}),(0,o.jsxs)("footer",{className:"flex items-center justify-between py-7 font-mono text-[11px] font-medium tracking-[0.1em] text-[#A2A7F0]",children:[(0,o.jsxs)("div",{className:"flex items-center gap-2.5",children:[(0,o.jsx)("button",{type:"button",onClick:()=>s("privacy"),className:"cursor-pointer transition hover:text-white",children:"Privacy"}),(0,o.jsx)("span",{className:"text-[#858AE3]/55",children:"\xb7"}),(0,o.jsx)("button",{type:"button",onClick:()=>s("terms"),className:"cursor-pointer transition hover:text-white",children:"Terms"}),(0,o.jsx)("span",{className:"text-[#858AE3]/55",children:"\xb7"}),(0,o.jsxs)("button",{type:"button","data-replay-intro":"true",onClick:H,className:"inline-flex cursor-pointer items-center gap-1 tracking-[0.12em] uppercase transition hover:text-[#97DFFC] focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:outline-none",children:[(0,o.jsx)("span",{"aria-hidden":"true",children:"↺"}),(0,o.jsx)("span",{children:"REPLAY"})]})]}),(0,o.jsx)("span",{children:"\xa9 2026 T^minus"})]})]})]}),n?(0,o.jsx)("div",{role:"dialog","aria-modal":"true","aria-labelledby":"legal-modal-title",className:"fixed inset-0 z-50 flex items-center justify-center bg-[#040206]/90 px-5",onClick:()=>s(null),children:(0,o.jsxs)("div",{className:"relative w-full max-w-[480px] rounded-[6px] border border-[#858AE3]/30 bg-[#07050D] p-6 text-left sm:p-7",onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)("div",{className:"flex items-start justify-between gap-4",children:[(0,o.jsxs)("div",{children:[(0,o.jsxs)("p",{className:"font-mono text-[10.5px] font-medium tracking-[0.16em] text-[#A2A7F0] uppercase",children:[(0,o.jsx)("span",{className:"text-[#97DFFC]",children:"+"})," LEGAL \xb7"," ","privacy"===n?"PRIVACY":"TERMS"]}),(0,o.jsx)("h2",{id:"legal-modal-title",className:"mt-2 font-heading text-[21px] font-semibold tracking-[-0.025em] text-white",children:"privacy"===n?"Privacy Policy":"SMS & Waitlist Terms"})]}),(0,o.jsx)("button",{type:"button",onClick:()=>s(null),"aria-label":"Close",className:"inline-flex size-8 cursor-pointer items-center justify-center rounded-[4px] border border-[#858AE3]/30 bg-[#040206] text-[#DCD5EE] transition hover:border-[#97DFFC]/75 hover:text-white",children:(0,o.jsx)(h,{className:"size-4"})})]}),(0,o.jsx)("div",{className:"mt-4 space-y-3 border-t border-[#858AE3]/20 pt-4 text-[13.5px] leading-[1.64] text-[#DCD5EE]",children:"privacy"===n?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("p",{children:"T^minus collects your mobile phone number, your selected waitlist role (shopper or brand), and an optional brand handle solely to notify you about the January 1, 2027 App Store v1.0 launch, early drop access, and brand onboarding."}),(0,o.jsx)("p",{children:"We never sell, rent, or broker your phone number to third parties. You can opt out at any time by replying STOP to any message."})]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("p",{children:"By checking the SMS consent box and joining the T^minus waitlist, you agree to receive occasional launch-day and live drop text alerts at the mobile number provided. Consent is not a condition of purchase."}),(0,o.jsx)("p",{children:"Message and data rates may apply. Reply STOP to opt out at any time or HELP for support."})]})})]})}):null]})}},7894:(e,t,a)=>{Promise.resolve().then(a.bind(a,4307))}}]);