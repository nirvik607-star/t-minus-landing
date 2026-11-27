(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[894],{6046:(e,t,a)=>{"use strict";a.d(t,{LandingExperience:()=>es});var r=a(5155),o=a(2115);let l=(...e)=>{let t=new Set;for(let a of e)if("string"==typeof a)for(let e of a.split(/\s+/))e&&t.add(e);return[...t].join(" ")},i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},n=(0,o.createContext)({}),s=(0,o.forwardRef)(({color:e,size:t,width:a,height:r,strokeWidth:s,absoluteStrokeWidth:c,nonScalingStroke:u,className:m="",children:d,iconNode:h=[],icon:p={node:h,aliases:[],size:24},...f},x)=>{let{size:g=24,strokeWidth:v=2,absoluteStrokeWidth:b=!1,nonScalingStroke:w=!1,color:C="currentColor",className:y=""}=(0,o.useContext)(n)??{},E=!!d||(e=>{if(null==e||"object"!=typeof e)return!1;for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t)&&(t.startsWith("aria-")||"role"===t||"title"===t)&&null!=e[t])return!0;return!1})(f),[R,S,M=[]]=function(e,t={}){return function(e,t={}){let a=t.attributeNames??{},r=e=>a[e]??e,o=e.size??e.width??i.width,n=e.size??e.height??i.height,s=e.aliases?.filter(e=>"string"==typeof e&&""!==e.trim()).map(e=>`lucide-${e}`)??[],c=[...e.name?[`lucide-${e.name}`]:[],...s],u=t.className?.split(" ").filter(Boolean)??[],m=!1===t.includeDefaultClasses?l(...u):l("lucide",...c,...u),d=t.strokeWidth??i["stroke-width"];if(t.absoluteStrokeWidth){let a=Number(d)*Number(e.size??e.width??i.width)/Number(t.size??t.width??i.width);Number.isFinite(a)&&(d=a)}return["svg",{...Object.entries(i).reduce((e,[t,a])=>(e[r(t)]=a,e),{}),..."color"in t&&t.color&&{[r("stroke")]:t.color},..."size"in t&&null!=t.size&&{[r("width")]:t.size,[r("height")]:t.size},..."width"in t&&null!=t.width&&{[r("width")]:t.width},..."height"in t&&null!=t.height&&{[r("height")]:t.height},[r("stroke-width")]:d,...m&&{[r("class")]:m},[r("viewBox")]:`0 0 ${o} ${n}`,...!1===t.hasA11yProp?{[r("aria-hidden")]:"true"}:{},..."attributes"in t&&t.attributes},e.node.map(e=>{let[a,o,l]=e,i=t.nonScalingStroke?{[r("vector-effect")]:"non-scaling-stroke",...o}:o;return l?[a,i,l]:[a,i]})]}(e,{...t,attributeNames:{...t.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}(p,{color:e??C,width:a??t??g,height:r??t??g,strokeWidth:s??v,absoluteStrokeWidth:c??b,nonScalingStroke:u??w,className:l(y,m),hasA11yProp:E,attributes:f});return(0,o.createElement)(R,{ref:x,...S},[...M.map(([e,t])=>(0,o.createElement)(e,t)),...Array.isArray(d)?d:[d]])});function c(e,t=[],a=[]){let r,l="string"==typeof e?function(e,t,a=[]){if(null==t)throw Error("[lucide]: iconNode is required when icon name is used");return{name:(e.match(/\d+[xX]\d+|[A-Z]?[a-z]+|[A-Z]|\d+/g)??[]).join("-").toLowerCase(),size:24,node:t,...a.length>0?{aliases:a}:{}}}(e,t,a):e,i=(0,o.forwardRef)(({className:e,...t},a)=>(0,o.createElement)(s,{ref:a,icon:l,className:e,...t}));return l.name&&(i.displayName=(r=(e=>{let t="",a=!1;for(let r of e){if("-"===r||"_"===r||r<=" "){a=t.length>0;continue}0===t.length?t+=r.toLowerCase():t+=a?r.toUpperCase():r,a=!1}return t})(l.name)).charAt(0).toUpperCase()+r.slice(1)),i}let u={name:"arrow-down-right",size:24,node:[["path",{d:"m7 7 10 10",key:"1fmybs"}],["path",{d:"M17 7v10H7",key:"6fjiku"}]]};u.node;let m=c(u),d={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};d.node;let h=c(d),p=" .:-^tT";function f(e){return e<0?0:e>1?1:e}function x(e,t,a){let r=f((a-e)/(t-e));return r*r*(3-2*r)}let g=function(){let e=[];for(let t=0;t<34;t++){let a=1.5+(t+.5)*10.5,r=(a-180)/180,o=[];for(let e=0;e<48;e++){let t=(e+.5)*7.5,a=(t-180)/180,l=Math.hypot(a,r)/.7,i=0,n="#8F5737";if(l<1){let e=a/.7,t=-r/.7,o=Math.sqrt(Math.max(0,1-l*l)),s=.5+Math.sin(5*e)*Math.cos(5.4*t)*Math.sin(5.2*o)*.32+Math.sin((e+o)*8.4)*Math.cos((t-e)*9)*.18+Math.cos((t+o)*14)*Math.sin((e-.7*t)*12.6)*.1,c=x(.42,.86,s),u=x(.64,.24,s),m=f(o),d=Math.pow(m,.92),h=.4*Math.pow(1-m,3),p=.28+.44*f(.78*d+.42*c)+.34*x(.56,.94,.54*d+.56*c);p*=1-.66*u,p+=.34*h,i=f(Math.pow(f(1.1*p),.92)),n=u>.54&&i<.56?"#8F5737":i>=.76?"#FFF8E8":i>=.48?"#EBC998":m<.38&&h>.11?"#F0C790":"#8F5737"}else if(l<1.38){let e=Math.atan2(-r,a),t=(l-1)*.96,o=t/(.96*.42),s=Math.pow(Math.max(.5+.5*Math.cos(6*e+2*t),.85*(.5+.5*Math.cos(11*e-2.6*t))),2.7);n=(i=f(Math.pow(f(1.15*((Math.exp(-(4.2*o))*(.46+.54*s)*.78+Math.exp(-(1.95*o))*(.1+.16*s)*.52)*(1-x(1.25,2.2,o)))),.92)))>=.24?"#F0C790":"#8F5737"}if(i<.085)continue;let s=Math.min(p.length-1,Math.max(1,Math.floor(i*p.length))),c=p[s];c&&" "!==c&&o.push({x:t.toFixed(2),glyph:c,fill:n})}o.length>0&&e.push({y:a.toFixed(2),cells:o})}return e}();function v(){return(0,r.jsx)("svg",{viewBox:"0 0 360 360","data-star-ssr-ascii":"true","aria-hidden":"true",className:"h-[34dvh] w-[34dvh] select-none sm:h-[42dvh] sm:w-[42dvh]",style:{fontFamily:'var(--font-ibm-plex-mono), "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace'},children:(0,r.jsx)("g",{fontSize:"10.0",fontWeight:"600",textAnchor:"middle",dominantBaseline:"central",textRendering:"geometricPrecision",children:g.map(e=>(0,r.jsx)("text",{y:e.y,children:e.cells.map(e=>(0,r.jsx)("tspan",{x:e.x,fill:e.fill,children:e.glyph},e.x))},e.y))})})}function b({scale:e,className:t=""}){let a={gap:"calc(1px * var(--wm-scale, 1))",...void 0!==e?{"--wm-scale":String(e)}:{}};return(0,r.jsxs)("span",{"aria-label":"T-minus",className:`inline-flex items-baseline leading-none select-none ${t}`,style:a,children:[(0,r.jsx)("span",{"aria-hidden":"true",className:"font-serif font-medium italic",style:{fontSize:"calc(26px * var(--wm-scale, 1))",lineHeight:1},children:"T"}),(0,r.jsx)("span",{"aria-hidden":"true",className:"font-sans font-medium",style:{fontSize:"calc(15px * var(--wm-scale, 1))",lineHeight:1,letterSpacing:"calc(-0.5px * var(--wm-scale, 1))",transform:"translateY(calc(-3px * var(--wm-scale, 1)))",display:"inline-block"},children:"^minus"})]})}let w=Date.parse("2027-01-01T00:00:00-05:00");function C(e){let t=e.trim();if(!t)return null;let a=t.startsWith("+"),r=t.replace(/\D/g,"");return a?r.length<8||r.length>15||r.startsWith("0")?null:`+${r}`:10===r.length?"0"===r[0]||"1"===r[0]?null:`+1${r}`:11===r.length&&r.startsWith("1")?"0"===r[1]||"1"===r[1]?null:`+${r}`:r.length>=11&&r.length<=15&&!r.startsWith("0")?`+${r}`:null}let y=o.useLayoutEffect,E=" .:-^tT",R=`#version 300 es
precision highp float;
out vec2 vUv;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,S=`#version 300 es
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
    float earlyCrisp = (1.0 - smoothstep(0.0, 0.52, uStarSwell)) * (1.0 - uStarShift);
    float hotCells = smoothstep(0.42, 0.86, gran);
    float darkLanes = smoothstep(mix(0.56, 0.65, earlyCrisp), mix(0.15, 0.24, earlyCrisp), gran);

    // Giant asymmetric convective supergiant plumes + surface crust fissures
    float swellAsym = mix(1.0, 0.82 + 0.28 * sin(Nr.x * 2.8 + Nr.y * 2.1 + 0.5), uStarSwell * (1.0 - uStarShift));
    float f1 = abs(sin(Nr.x * 9.2 + Nr.y * 6.0 + uStarSpinPhase * 0.7) + cos(Nr.z * 8.2 - Nr.y * 6.8));
    float f2 = abs(cos(Nr.y * 10.8 - Nr.z * 7.5 - uStarSpinPhase * 0.9) + sin(Nr.x * 9.8 + Nr.z * 6.2));
    float crackMask = (1.0 - smoothstep(0.02, 0.22, min(f1, f2))) * uStarCrack;
    crackMask *= (0.68 + 0.32 * pulseWave);

    float ndotv = clamp(dot(N, -rd), 0.0, 1.0);
    float limbExp = mix(0.92, 1.26, uStarSwell) * (1.0 - uStarShift * 0.36);
    float limbDark = pow(ndotv, limbExp) * swellAsym;
    float rimFlare = pow(1.0 - ndotv, 3.0) * (0.40 + 0.30 * uStarSwell + 0.48 * uStarCrack);

    vec3 surfCol = mix(limbPal, midPal, clamp(limbDark * 0.78 + hotCells * 0.42, 0.0, 1.0));
    surfCol = mix(surfCol, corePal, smoothstep(0.56, 0.94, limbDark * 0.54 + hotCells * 0.56));
    surfCol *= (1.0 - darkLanes * mix(mix(0.54, 0.70, earlyCrisp), 0.64, uStarSwell) * (1.0 - uStarShift * 0.42));

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
}`,M=`#version 300 es
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
}`,A=`#version 300 es
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
}`,k=`#version 300 es
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
  float starSubDuck = 1.0 - uWarmTint * 0.56;
  float diskSubstrate = mix(0.24, 0.34, smoothstep(0.16, 0.78, bgLum))
    * smoothstep(0.022, 0.14, bgLum)
    * (1.0 - bgPureCore)
    * starSubDuck;
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
}`;function P(e,t,a,r){let o=e.createTexture();e.bindTexture(e.TEXTURE_2D,o),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,t,a,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);let l=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,l),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0),e.bindFramebuffer(e.FRAMEBUFFER,null),{tex:o,fb:l,w:t,h:a}}function T(e,t){t&&(e.deleteFramebuffer(t.fb),e.deleteTexture(t.tex))}function F(e){return e<0?0:e>1?1:e}function N(e,t,a){let r=F((a-e)/(t-e));return r*r*(3-2*r)}function D(e){return e*Math.PI/180}function B(e){let t=.96+.76*Math.pow(N(0,2.62,e),.92),a=Math.max(0,e-1.7),r=.045*Math.sin(6.5*e+7.5*a*a)*(N(.32,1.82,e)*(1-N(2.68,3.05,e)));if(e<=2.8)return t+r+(e>2.65?.012*Math.sin((e-2.65)*42):0);let o=N(0,1,F((e-2.8)/(4.15-2.8)));return 1.72+-1.6099999999999999*o+r*(1-o)}function _(e){let t=Math.max(0,Math.min(4.4,e))/64,a=0;for(let e=0;e<64;e++)a+=.44*Math.pow(.96/Math.max(.11,B((e+.5)*t)),1.35)*t;return a}function j(e,t,a,r,o,l,i,n){let s=r.x+i*o*l*t.x+n*l*a.x,c=r.y+i*o*l*t.y+n*l*a.y,u=r.z+i*o*l*t.z+n*l*a.z,m=1/Math.max(1e-6,Math.hypot(s,c,u)),d=s*m,h=c*m,p=u*m,f=-(e.x*d+e.y*h+e.z*p);return f<=0?99:Math.hypot(e.x+f*d,e.y+f*h,e.z+f*p)}function I(e,t,a,r,o,l,i,n,s){let c=1,u=-.35;if(j(e,t,a,r,o,l,n,1)>=s)return 0;for(let i=0;i<12;i++){let i=.5*(u+c);j(e,t,a,r,o,l,n,i)<s?c=i:u=i}return(.5-.5*(u+c)*.5)*i}function O({onHeroReveal:e,onHorizonSync:t,runwayRef:a,controlRef:l,skipIntro:i=!1}){let n=(0,o.useRef)(null),s=(0,o.useRef)(null),c=(0,o.useRef)(null),u=(0,o.useRef)(null),m=(0,o.useRef)(e),d=(0,o.useRef)(t),h=(0,o.useRef)(a),p=(0,o.useRef)(l);return(0,o.useEffect)(()=>{m.current=e,d.current=t,h.current=a,p.current=l},[e,t,a,l]),y(()=>{let e=s.current,t=n.current;if(!e||!t)return;let a=!1,r=null;try{let e=new URLSearchParams(window.location.search);a="1"===e.get("skipIntro");let t=e.get("introAt");if(null!==t){let e=Number(t);Number.isFinite(e)&&e>=0&&e<=14&&(r=e)}}catch{}let o=window.matchMedia("(prefers-reduced-motion: reduce)").matches,l=window.matchMedia("(pointer: fine)").matches,f=i||a||o,x=f||null!==r&&r>=9.9;x&&m.current(!0),f&&u.current&&(u.current.style.display="none");let g=t.getContext("2d"),v=function(){let e=[".",":","-","^","t"],t=[],a=918273,r=()=>(a=1664525*a+0x3c6ef35f>>>0)/0x100000000;for(let a=0;a<64;a++){let a=r(),o=r(),l=r(),i=Math.min(1,Math.hypot((a-.5)*1.15,o-.78)/.95);t.push({nx:a,ny:o,glyph:e[Math.floor(r()*e.length)],phase:r()*Math.PI*2,speed:.35+.75*r(),sizeCss:r()>.66?12:10,tint:l>.86?"ice":l>.42?"periwinkle":"accent",crestDist:i})}return t}(),b=e.getContext("webgl2",{alpha:!0,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1});if(!b){u.current&&(u.current.style.display="none"),m.current(!0);return}let[C,y,j,O]=function(e,t){let a=e.createShader(e.VERTEX_SHADER);if(!a)throw Error("Unable to create vertex shader");e.shaderSource(a,R),e.compileShader(a);let r=t.map(t=>{let r=e.createShader(e.FRAGMENT_SHADER);if(!r)throw Error("Unable to create fragment shader");e.shaderSource(r,t),e.compileShader(r);let o=e.createProgram();if(!o)throw Error("Unable to create WebGL2 program");return e.attachShader(o,a),e.attachShader(o,r),e.linkProgram(o),{fs:r,prog:o}}),o=[];for(let{fs:t,prog:l}of r){if(!e.getProgramParameter(l,e.LINK_STATUS)){let r=e.getProgramInfoLog(l)||"",o=e.getShaderInfoLog(t)||"",i=e.getShaderInfoLog(a)||"";throw e.deleteProgram(l),e.deleteShader(t),e.deleteShader(a),Error(`Program link error: ${r} ${o} ${i}`.trim())}e.deleteShader(t);let r={},i=e.getProgramParameter(l,e.ACTIVE_UNIFORMS);for(let t=0;t<i;t++){let a=e.getActiveUniform(l,t);a&&(r[a.name]=e.getUniformLocation(l,a.name))}o.push({prog:l,u:r})}return e.deleteShader(a),o}(b,[S,M,A,k]),L=b.createVertexArray();b.bindVertexArray(L);let U='"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace',z=null,W=0,G=0,H="",$=null,X=!1,V=0,Y=0,q=0,K=0,J=window.innerWidth||1440,Z=window.innerHeight||900,Q=1.25,ee=192,et=86,ea=9,er=13,eo=0,el=0,ei=!1,en=.38,es="full",ec=null,eu=null,em=null,ed=null,eh=0,ep=Math.max(420,1.8*(window.innerHeight||900)),ef=()=>{let e=h.current?.current;if(e){let t=e.getBoundingClientRect();eh=t.top+window.scrollY,ep=Math.max(1,t.height-window.innerHeight)}else eh=0,ep=Math.max(420,2*window.innerHeight)},ex=()=>{for(let e of(b.disable(b.SCISSOR_TEST),b.clearColor(0,0,0,0),[ec,eu,em,ed]))e&&(b.bindFramebuffer(b.FRAMEBUFFER,e.fb),b.viewport(0,0,e.w,e.h),b.clear(b.COLOR_BUFFER_BIT));b.bindFramebuffer(b.FRAMEBUFFER,null)},eg=(e=!1)=>{if((!f||e)&&!(!e&&X&&16>=Math.abs(J-V)&&16>=Math.abs(Z-Y))){var t,a,r,o;let e,l,i,n,s,c,u,m,d,h,p,f,x,g,v;V=J,Y=Z,t=$,a=J,r=Z,e=Math.min(1536,Math.max(640,Math.round(1.2*a))),l=Math.min(960,Math.max(420,Math.round(1.2*r))),(i=document.createElement("canvas")).width=e,i.height=l,o=i.getContext("2d"),o.clearRect(0,0,e,l),o.fillStyle="#000000",o.fillRect(0,0,e,l),n=a<768,s=e/Math.max(1,a)*(n?4.2:7.4)/1,c=e=>`italic 500 ${Math.round(26*e)}px "Newsreader", "New York", Georgia, ui-serif, serif`,u=e=>`500 ${Math.round(15*e)}px "Inter Tight", "Inter", -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif`,d=(m=e=>{let t=1.4*e,a=-.35*e;o.font=c(e);let r=o.measureText("T").width;o.font=u(e);let l=["^","m","i","n","u","s"],i=l.map(e=>o.measureText(e).width),n=i.reduce((e,t)=>e+t,0)+a*(l.length-1);return{tWidth:r,chars:l,charWidths:i,gap:t,tracking:a,totalWidth:r+t+n}})(s),d=m(s=e*(n?.76:.56)*s/Math.max(1,d.totalWidth)),h=.5*l+26*s*.34,p=.5*e-.5*d.totalWidth,f=3*s,x=(e,t,a=!1)=>{o.save(),o.fillStyle=e,o.shadowColor=t>0?e:"transparent",o.shadowBlur=t,o.textAlign="left",o.textBaseline="alphabetic";let r=p;a||(o.font=c(s),o.fillText("T",r,h)),r+=d.tWidth+d.gap,o.font=u(s);for(let e=0;e<d.chars.length;e++){let t=d.chars[e],l="^"===t;if(!a||l){let e=h-f;o.fillText(t,r,e)}r+=d.charWidths[e]+d.tracking}o.restore()},g=Math.max(12,Math.round(3.8*s)),o.globalCompositeOperation="lighter",x("rgb(0, 200, 0)",g),x("rgb(255, 0, 0)",0),x("rgb(0, 0, 255)",0,!0),o.globalCompositeOperation="source-over",v=t??b.createTexture(),b.bindTexture(b.TEXTURE_2D,v),b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,!0),b.texImage2D(b.TEXTURE_2D,0,b.RGBA,b.RGBA,b.UNSIGNED_BYTE,i),b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,!1),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.LINEAR),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.LINEAR),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.CLAMP_TO_EDGE),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.CLAMP_TO_EDGE),$=v,X=!0}},ev=(a=!1,o=!1)=>{let l=Math.max(1,Math.round(window.innerWidth||1440)),i=Math.max(1,Math.round(window.innerHeight||900));if(!o){let t=e.getBoundingClientRect();l=Math.max(1,Math.round(t.width||l)),i=Math.max(1,Math.round(t.height||i))}let n=l<640,s=l>=640&&l<1024,u=ei?1:l>=1024?1.25:1.5,m=Math.min(Math.max(window.devicePixelRatio||1,1),u),d=Math.max(2,Math.round(l*m)),h=Math.max(2,Math.round(i*m));J=l,Z=i,Q=m,!o&&c.current&&(U=window.getComputedStyle(c.current).fontFamily);let p=Math.max(6,Math.round((n?6:s?6.8:7.5)*m)),x=Math.max(9,Math.round((n?8.8:s?9.6:10.5)*m)),g=Math.max(48,Math.floor(d/p)),v=Math.max(36,Math.floor(h/x)),w=Math.floor((d-g*p)*.5),C=Math.floor((h-v*x)*.5),y=ei?.28:n?.34:.38;if((a||!z||p!==W||x!==G||U!==H)&&(W=p,G=x,H=U,z=function(e,t,a,r,o){let l=document.createElement("canvas");l.width=a*E.length,l.height=2*r;let i=l.getContext("2d");i.fillStyle="#000000",i.fillRect(0,0,l.width,l.height),i.fillStyle="#ffffff",i.textAlign="center",i.textBaseline="middle";let n=Math.max(8,Math.round(.84*r));i.font=`500 ${n}px ${o}`;for(let e=0;e<E.length;e++)i.fillText(E[e],Math.round((e+.5)*a),Math.round(.52*r));let s=Math.max(8,Math.round(.88*r));i.font=`600 ${s}px ${o}`;for(let e=0;e<E.length;e++)i.fillText(E[e],Math.round((e+.5)*a),Math.round(1.52*r));let c=t??e.createTexture();return e.bindTexture(e.TEXTURE_2D,c),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,l),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),c}(b,z,p,x,U)),$)o||!X||f||eg(!1);else if(null!==r&&r>=4&&!f)eg(!0);else{let e;e=b.createTexture(),b.bindTexture(b.TEXTURE_2D,e),b.texImage2D(b.TEXTURE_2D,0,b.RGBA,2,2,0,b.RGBA,b.UNSIGNED_BYTE,new Uint8Array(16)),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.NEAREST),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.NEAREST),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.CLAMP_TO_EDGE),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.CLAMP_TO_EDGE),$=e}if(d===q&&h===K&&g===ee&&v===et&&p===ea&&x===er&&y===en&&ec)return;q=d,K=h,ee=g,et=v,ea=p,er=x,eo=w,el=C,en=y,es="full",e.width=q,e.height=K,(t.width!==l||t.height!==i)&&(t.width=l,t.height=i),T(b,ec),T(b,eu),T(b,em),T(b,ed);let R=Math.max(64,Math.round(q*y)),S=Math.max(32,Math.round(.18*q)),M=Math.max(32,Math.round(.18*q));ec=P(b,R,Math.max(64,Math.round(K*y)),b.LINEAR),eu=P(b,ee,et,b.NEAREST),em=P(b,S,M,b.LINEAR),ed=P(b,S,M,b.LINEAR),o||ex()};ev(!0,!0);let eb=!1,ew=(e,t,a)=>{a&&(b.activeTexture(b.TEXTURE0+e),b.bindTexture(b.TEXTURE_2D,t),b.uniform1i(a,e))},eC=(e,t,a)=>{let r=e?e.w:q,o=e?e.h:K;if(b.bindFramebuffer(b.FRAMEBUFFER,e?e.fb:null),b.viewport(0,0,r,o),t<=.001&&a>=.999)b.disable(b.SCISSOR_TEST);else{let e=Math.max(0,Math.floor(t*o)-2),l=Math.min(o,Math.ceil(a*o)+2);b.enable(b.SCISSOR_TEST),b.scissor(0,e,r,Math.max(1,l-e))}},ey=.5,eE=.5,eR=.5,eS=.5,eM=0,eA=0,ek=0,eP=0,eT=e=>{"touch"===e.pointerType||o||(ey=F(e.clientX/Math.max(1,J)),eE=F(1-e.clientY/Math.max(1,Z)),eM=1)},eF=()=>{eM=0};window.addEventListener("pointermove",eT,{passive:!0}),window.addEventListener("pointerleave",eF,{passive:!0});let eN=null!==r?Math.min(9.9,r):9.9*!!f,eD=null!==r?Math.max(0,r-9.9):2*!!f,eB=null!==r?_(r):0,e_=!1,ej=0,eI=0,eO=!1,eL=0,eU=0,ez=performance.now(),eW=0,eG=0,eH=!1,e$=null,eX=.0166,eV=0,eY=-1,eq=0;p.current&&(p.current.current={skipIntro:()=>{r=null,f=!1,e_=!1,eN=9.9,eD=0,x||(x=!0,m.current(!0)),u.current&&(u.current.style.display="none"),eW=0},replayIntro:()=>{!o&&(r=null,f=!1,eN=0,eD=0,eB=0,eI=0,eO=!1,eL=0,e_=window.scrollY>24,ej=0,eU=0,x=!1,m.current(!1),g&&g.clearRect(0,0,J,Z),es="full",ex(),X||eg(!0))},pulseHorizon:e=>{o||("subtle"===e?eI=Math.min(1,Math.max(eI,.72)):(eO=!0,eL=0,eI=1,eW=0))}});let eK=(e,t=!1)=>{var a,i,n,s,c,h,p,R;let S=t?.001:Math.max(.001,(e-ez)*.001),M=Math.min(.05,S),A=Math.min(.4,S);ez=e,!t&&(eX=.92*eX+.08*Math.min(S,.12),!ei&&eX>.026?(eV+=A)>.75&&(ei=!0,ev()):eV=Math.max(0,eV-.5*A));let k=Math.min(1,8.5*M);eR+=(ey-eR)*k,eS+=(eE-eS)*k,eA+=(eM-eA)*Math.min(1,5.2*M);let P=l&&!o&&eM>.5?(ey-.5)*2:0,T=l&&!o&&eM>.5?(eE-.5)*2:0,L=Math.min(1,4.2*M);ek+=(P-ek)*L,eP+=(T-eP)*L,eI>.001&&(eI=Math.max(0,eI*Math.exp(-(4.8*M))))<.002&&(eI=0);let W=0,G=0;eO&&(eL+=M,W=N(0,.08,G=F(eL/1.25))*(1-N(.28,1,G)),eL>=1.25&&(eO=!1,eL=0,W=0));let H=F((window.scrollY-eh)/ep),V=Math.min(.18,S);if(eU+=(H-eU)*Math.min(1,14*V),4e-4>Math.abs(H-eU)&&(eU=H),e_&&(ej+=A,(window.scrollY<=24||ej>.9)&&(e_=!1,eU=0)),null!==r)eN=Math.min(9.9,r),eD=Math.max(0,r-9.9);else if(e_)eN=0,eD=0;else if(!t&&eN<9.9){let e=window.scrollY>24?6.5:1;eN=Math.min(9.9,eN+A*e)}else t||(eD=Math.min(10,eD+A));f||X||!(eN>=3.5)||eg(!0);let Y=f||eN>=9.9-.001;if(!x&&Y&&(x=!0,m.current(!0)),!ec||!eu||!em||!ed||!z)return;let en=null!==r?r:.001*e,ef=J<768,eb=q/Math.max(1,K),eT=Math.tan(D(23)),eF=1-N(4.08,4.24,eN),eG=B(eN),eH=N(.05,2.55,eN)*(1-N(2.68,3.22,eN));null!==r?eB=_(eN):!t&&eF>.002&&(eB+=.44*Math.pow(.96/Math.max(.11,eG),1.35)*M);let eK=N(2.85,3.92,eN)*(1-N(4.08,4.24,eN)),eJ=N(2.85,3.92,eN),eZ=F(.58*N(.95,2.55,eN)+.42*N(2.68,3.92,eN)),eQ=N(2.68,3.18,eN)*(1-N(4.1,4.26,eN)),e0=N(3.65,4.12,eN)*(1-N(4.16,4.42,eN)),e1=N(4.12,4.32,eN)*(1-N(5.22,5.72,eN)),e2=F((eN-4.12)/1.83),e5=N(4.12,4.32,eN)*(1-N(6.2,7.25,eN)),e4=F((eN-4.12)/3.13),e3=N(4.32,4.52,eN)*(1-N(5.26,5.5,eN)),e8=N(5.2,5.4,eN),e6=.04+.96*(1-Math.pow(1-N(0,1,F((eN-5.2)/(6.85-5.2))),1.65)),e9=N(5.25,5.72,eN)*(1-N(6.95,7.45,eN)),e7=F((eN-5.25)/(7.35-5.25)),te=N(5.32,6.65,eN),tt=N(3.65,4.08,eN)*(1+.64*e0+.35*e1)*(1-N(6.8,8.05,eN)),ta=(a=F((eN-7.45)/2.45))<.5?16*a*a*a*a*a:1-Math.pow(-2*a+2,5)/2,tr=!f&&eN>=9.9-.001?N(0,.08,eD)*(1-N(.16,.54,eD)):0,to=F(eD/.54),tl=f?1:Y?N(0,.95,eD):0,ti=eF*(1-N(.16,.72,eJ)),tn=ef?.195:.212,ts=ef?2.08:1.62,tc=Math.asin(1/ts),tu=Math.atan((-1+2*tn)*eT),tm=ef?2.34:2.15,td=Math.asin(1/tm),th=Math.atan((1-2*(ef?.102:.088))*eT),tp=Math.max(3.4,Math.min(7.8,1/Math.sin(Math.atan(Math.max(.08,(ef?Math.min(.42*J,.21*Z):Math.min(.215*J,.315*Z))/(.5*Z)*eT))))),tf=eU,tx=N(0,.28,tf),tg=F((tf-.28)/.38),tv=N(.66,1,tf),tb=N(.14,.3,tf)*(1-N(.64,.84,tf))*ta,tw=N(.55,.9,tb),tC=0,ty=0,tE=0;if(!o&&ta>.5&&tw>.001&&null===r){let e=Math.max(0,w-Date.now()),t=Math.floor(e/1e3);tE=e>0?999-e%1e3:0,t!==eY&&(eY=t,eq=performance.now()-tE),tE<360&&(ty=tE/360,tC=(tE<40?N(0,40,tE):Math.exp(-((tE-40)/115)))*(1-N(285,360,tE))*tw)}let tR=ta*(1-N(.58,.84,tf))*(l&&!o?1:0),tS=D(2.2)*ek*tR,tM=1.2*eP*tR,tA=26+62*tx+66*tv,tk=tv>.05?tA+tM:Math.min(89.2,tA+tM),tP=tp+(.94*tp-tp)*tg,tT=tv>0?tP+(tm-tP)*tv:ts+(tP-ts)*tx,tF=tv>0?0+(-(th+td)-0)*tv:(i=tc-tu)+(0-i)*tx,tN=tx*D(12)+tg*D(42)+tv*D(16),tD=((s=(n=7.6+.5999999999999996*N(0,2.65,eN))+(7.85-n)*N(2.75,4.15,eN))+(5.85-s)*N(4.35,7.45,eN))*(ef?1.28:1),tB=19+-4*N(0,7.45,eN),t_=(c=D(-22),c+(D(-18)-c)*N(0,7.45,eN)),tj=tB+(tk-tB)*ta,tI=D(tj),tO=tD+(tT-tD)*ta,tL=0+(tF-0)*ta,tU=t_+(0-t_)*ta,tz=0+(tN-0)*ta+tS,tW=Math.sin(tI),tG=Math.cos(tI),tH=Math.sin(tz),t$=Math.cos(tz),tX=(e,t,a)=>({x:e*t$+a*tH,y:t,z:-e*tH+a*t$}),tV=tX(0,tO*tW,tO*tG),tY=tX(0,-tW,-tG),tq=tX(0,tG,-tW),tK=tX(1,0,0),tJ=Math.cos(tL),tZ=Math.sin(tL),tQ={x:tJ*tY.x+tZ*tq.x,y:tJ*tY.y+tZ*tq.y,z:tJ*tY.z+tZ*tq.z},t0={x:-tZ*tY.x+tJ*tq.x,y:-tZ*tY.y+tJ*tq.y,z:-tZ*tY.z+tJ*tq.z},t1=Math.cos(tU),t2=Math.sin(tU),t5={x:t1*tK.x+t2*t0.x,y:t1*tK.y+t2*t0.y,z:t1*tK.z+t2*t0.z},t4={x:-t2*tK.x+t1*t0.x,y:-t2*tK.y+t1*t0.y,z:-t2*tK.z+t1*t0.z},t3=Math.min(.72*tO,ef?1.38:1.28),t8=5.2+((h=t3+(Math.min(.66*tO,ef?1.22:1.18)-t3)*tv)+(5.6-h)*tb-5.2)*ta,t6=Z*(1-.41*tn),t9=.5*Z,t7=(p=t6+((ef?41:39)-t6)*N(0,1,tf))+(t9-p)*tb,ae=1+((ef?.76:.84)-1)*N(0,1,tf),at=Math.max(160,2*(Math.tan(Math.asin(F(1/Math.max(1.05,tO))))/eT*(.5*Z))),aa=.5*J,ar=-(.6*Z),ao=.75*Z,al=36,ai=0;if(tf>.62&&ta>.5){let e=I(tV,t5,t4,tQ,eb,eT,Z,0,1.08),t=I(tV,t5,t4,tQ,eb,eT,Z,.85,1.08),a=.5*J*.85,r=Math.max(8,e-t),o=(a*a+r*r)/(2*r);aa=.5*J,ao=o,ar=e-o,al=t,ai=e}d.current?.({pinProgress:tf,settleProgress:ta,polarFactor:tb,polarDiameterPx:at,heroResolved:Y,countdownCenterY:t7,countdownScale:ae,domeCenterX:aa,domeCenterY:ar,domeRadiusPx:ao,domeEdgeY:al,viewportW:J,introElapsed:eN,elevDeg:tA});let an=W>.01?24:eA>.02?40:72;(tl>.005||ta>.05)&&e-eW>=an&&(eW=e,((e,t,a,r,l,i)=>{if(!g||J<=1||Z<=1||r<=.005&&a<=.05)return;if(g.setTransform(1,0,0,1,0,0),g.clearRect(0,0,J,Z),a>.05){let e=Z*(.84+-.75*t),r=Math.max(J,Z)*(.26+-.12*t),o=g.createRadialGradient(.5*J,e,0,.5*J,e,r);o.addColorStop(0,`rgba(78, 20, 140, ${((.04+-.02*t)*a).toFixed(3)})`),o.addColorStop(1,"rgba(4, 2, 6, 0)"),g.fillStyle=o,g.fillRect(0,0,J,Z)}g.textAlign="center",g.textBaseline="middle";let n=`500 10px ${U}`,s=`500 12px ${U}`;if(r>.005){let a=1+-.42000000000000004*t,o=.82+-.74*t;for(let t=0;t<v.length;t++){let c=v[t],u=N(.5*c.crestDist,.5*c.crestDist+.42,r);if(u<=.01)continue;let m=Math.round(c.nx*J),d=Math.round(c.ny*Z),h=.5+.5*Math.sin(e*c.speed+c.phase),p=0;if(l>.01){let e=Math.hypot((c.nx-.5)*1.15,c.ny-o)-1.35*i;p=Math.exp(-(e*e)/.016)*l*.72}let f=F((.14+.28*h+p)*a*u);g.font=12===c.sizeCss||p>.22?s:n,g.fillStyle=p>.18||"ice"===c.tint?"#97DFFC":"periwinkle"===c.tint?"#858AE3":"#613DC1",g.globalAlpha=f,g.fillText(c.glyph,m,d)}}if(!o&&eA>.015&&r>.45){let e=[".",":","-","^","t","T"],t=eR*J,a=(1-eS)*Z,o=Math.max(0,Math.floor((t-92)/20)),l=Math.min(Math.ceil(J/20),Math.ceil((t+92)/20)),i=Math.max(0,Math.floor((a-92)/20)),c=Math.min(Math.ceil(Z/20),Math.ceil((a+92)/20)),u=N(.45,.95,r)*eA;for(let r=i;r<=c;r++){let i=20*r+10,c=i-a;if(!(Math.abs(c)>=92))for(let a=o;a<=l;a++){let r=20*a+10,o=Math.hypot(r-t,c);if(o>=92)continue;let l=Math.pow(1-o/92,1.85),m=Math.min(.28,l*u*.34);if(m<.015)continue;let d=Math.min(e.length-1,Math.floor(l*e.length));g.font=l>.58?s:n,g.fillStyle=o<36?"#97DFFC":o<72?"#858AE3":"#613DC1",g.globalAlpha=m,g.fillText(e[d],Math.round(r),Math.round(i))}}}g.globalAlpha=1})(en,tf,ta,tl,W,G));let as="full",ac=0,au=1;ta>.99&&tb<.01&&tr<.002&&W<.002&&(tv<.02?(as="bottom",ac=0,au=.48):tv>.98&&(as="top",ac=.62,au=1)),as!==es&&(es=as,"full"!==as&&ex()),b.disable(b.BLEND),eC(ec,ac,au),b.useProgram(C.prog),b.uniform1f(C.u.uTime,en),b.uniform1f(C.u.uViewAsp,eb),b.uniform1f(C.u.uSceneH,ec.h),b.uniform1f(C.u.uTanHalfFov,eT),b.uniform3f(C.u.uCamPos,tV.x,tV.y,tV.z),b.uniform3f(C.u.uCamRight,t5.x,t5.y,t5.z),b.uniform3f(C.u.uCamUp,t4.x,t4.y,t4.z),b.uniform3f(C.u.uCamFwd,tQ.x,tQ.y,tQ.z),b.uniform1f(C.u.uStarVis,eF),b.uniform1f(C.u.uStarRadius,eG),b.uniform1f(C.u.uStarSwell,eH),b.uniform1f(C.u.uStarSpinPhase,eB),b.uniform1f(C.u.uPinch,eK),b.uniform1f(C.u.uStarShift,eJ),b.uniform1f(C.u.uStarCrack,eZ),b.uniform1f(C.u.uImplode,eQ),b.uniform1f(C.u.uEjecta,e5),b.uniform1f(C.u.uEjectaProg,e4),b.uniform1f(C.u.uBhBirth,e8),b.uniform1f(C.u.uBhRadius,e6),b.uniform1f(C.u.uFallback,e9),b.uniform1f(C.u.uFallbackProg,e7),b.uniform1f(C.u.uDiskBirth,te),b.uniform1f(C.u.uLockPulse,tr),b.uniform1f(C.u.uLockWaveProg,to),b.uniform1f(C.u.uUiRipple,eI),b.uniform1f(C.u.uUiShock,W),b.uniform1f(C.u.uUiShockProg,G),b.uniform1f(C.u.uTickPulse,tC),b.uniform1f(C.u.uTickProg,ty),b.uniform1f(C.u.uSettle,ta),b.uniform1f(C.u.uPin,tv),b.uniform1f(C.u.uPolarFactor,tb),b.uniform1f(C.u.uDiskOuterR,t8),b.uniform1f(C.u.uJetPower,tt),b.uniform1f(C.u.uCharge,e0),b.uniform1f(C.u.uBlastPeak,e1),b.uniform1f(C.u.uBlastProgress,e2),b.uniform2f(C.u.uPointer,eR,eS),b.uniform1f(C.u.uPointerActive,eA),b.drawArrays(b.TRIANGLES,0,3),eC(eu,ac,au),b.useProgram(y.prog),ew(0,ec.tex,y.u.uBg),b.uniform2f(y.u.uBgInv,1/ec.w,1/ec.h),b.uniform2f(y.u.uGridOrigin,eo,el),b.uniform2f(y.u.uCellPx,ea,er),b.uniform2f(y.u.uCanvasPx,q,K),b.uniform2f(y.u.uGrid,ee,et),b.drawArrays(b.TRIANGLES,0,3),b.useProgram(j.prog),eC(em,ac,au),ew(0,ec.tex,j.u.uTex),b.uniform2f(j.u.uDir,1.85/em.w,0),b.uniform1f(j.u.uThreshold,.34),b.drawArrays(b.TRIANGLES,0,3),eC(ed,ac,au),ew(0,em.tex,j.u.uTex),b.uniform2f(j.u.uDir,0,1.85/ed.h),b.uniform1f(j.u.uThreshold,0),b.drawArrays(b.TRIANGLES,0,3),b.disable(b.SCISSOR_TEST),b.bindFramebuffer(b.FRAMEBUFFER,null),b.viewport(0,0,q,K),b.clearColor(0,0,0,0),b.clear(b.COLOR_BUFFER_BIT),eC(null,ac,au),b.useProgram(O.prog),ew(0,eu.tex,O.u.uCell),ew(1,ec.tex,O.u.uBg),ew(2,z,O.u.uAtlas),ew(3,ed.tex,O.u.uBloom),$&&ew(4,$,O.u.uWordmarkMask),b.uniform2i(O.u.uGrid,ee,et),b.uniform2i(O.u.uCellPx,ea,er),b.uniform2i(O.u.uGridOrigin,eo,el),b.uniform2f(O.u.uCanvasPx,q,K),b.uniform1f(O.u.uGlyphCount,E.length),b.uniform1f(O.u.uWordmarkCarve,e3),b.uniform1f(O.u.uBlastPeak,e1),b.uniform1f(O.u.uWarmTint,ti),b.uniform1f(O.u.uSettle,ta);let am=N(.15,1.35,eN),ad=(R=.22+.24000000000000002*am)+(.54-R)*ta+eF*(.03+.11000000000000001*am)+.16*e5+.14*e9+.34*e1+.1*tr+.08*eI+.24*W+.18*tC;b.uniform1f(O.u.uGlow,ad),b.uniform2f(O.u.uPointer,eR,eS),b.uniform1f(O.u.uPointerActive,eA),b.uniform1f(O.u.uViewAsp,eb),b.drawArrays(b.TRIANGLES,0,3),b.disable(b.SCISSOR_TEST),null===e$&&eF>.5&&(e$=Number(performance.now().toFixed(2))),u.current&&"none"!==u.current.style.display&&(u.current.style.display="none"),window.__TMINUS_BH_TELEMETRY__={fps:Number((1/Math.max(.001,eX)).toFixed(1)),frameMs:Number((1e3*eX).toFixed(2)),degraded:ei,cols:ee,rows:et,cellPxW:ea,cellPxH:er,dpr:Q,firstStarPaintPerfMs:e$,wordmarkBuilt:X,introElapsed:Number(eN.toFixed(3)),resolveElapsed:Number(eD.toFixed(3)),starRadius:Number(eG.toFixed(3)),starSwell:Number(eH.toFixed(3)),bhRadius:Number(e6.toFixed(3)),fallback:Number(e9.toFixed(3)),heroResolved:Y,pinProgress:Number(tf.toFixed(4)),polarFactor:Number(tb.toFixed(4)),polarGate:Number(tw.toFixed(4)),tickPulse:Number(tC.toFixed(4)),tickProg:Number(ty.toFixed(4)),tickElapsedSinceEdgeMs:tE,pulseEdgeWholeSec:eY,lastPulseTriggerPerfMs:Number(eq.toFixed(2)),polarDiameterPx:Math.round(at),domeApexRimY:Math.round(ai),domeEdgeY:Math.round(al),elevDeg:Number(tj.toFixed(1)),parallaxAzimDeg:Number((180*tS/Math.PI).toFixed(2)),parallaxElevDeg:Number(tM.toFixed(2)),uiRippleAmp:Number(eI.toFixed(3)),uiShockAmp:Number(W.toFixed(3))}},eJ=e=>{if(eb||document.hidden){eH=!1;return}eG=window.requestAnimationFrame(eJ),eK(e,!1)},eZ=(e=!1)=>{if(eb||eH||document.hidden)return;eH=!0;let t=performance.now();ez=t,e&&eK(t,!0),eG=window.requestAnimationFrame(eJ)},eQ=()=>{eH&&(eH=!1,window.cancelAnimationFrame(eG))},e0=()=>{document.hidden?eQ():eZ(!1)};document.addEventListener("visibilitychange",e0),eZ(!0);let e1=null,e2=null,e5=0,e4=0,e3=0;if(e5=window.setTimeout(()=>{if(eb)return;ef(),(e1=new ResizeObserver(()=>{eb||(ev(!1,!1),ef())})).observe(e);let t=h.current?.current;t&&(e2=new ResizeObserver(()=>{eb||ef()})).observe(t)},0),!f&&!X){let e=()=>{eb||X||eg(!0)};"function"==typeof window.requestIdleCallback?e4=window.requestIdleCallback(e,{timeout:1400}):e3=window.setTimeout(e,450)}return"u">typeof document&&document.fonts?.ready&&document.fonts.ready.then(()=>{eb||(f||window.setTimeout(()=>{eb||eg(!0)},220),ev(!0,!1),ef())}).catch(()=>{}),()=>{eb=!0,p.current&&(p.current.current=null),window.clearTimeout(e5),window.clearTimeout(e3),e4&&"function"==typeof window.cancelIdleCallback&&window.cancelIdleCallback(e4),eQ(),document.removeEventListener("visibilitychange",e0),window.removeEventListener("pointermove",eT),window.removeEventListener("pointerleave",eF),e1?.disconnect(),e2?.disconnect(),T(b,ec),T(b,eu),T(b,em),T(b,ed),z&&b.deleteTexture(z),$&&b.deleteTexture($),b.deleteVertexArray(L),b.deleteProgram(C.prog),b.deleteProgram(y.prog),b.deleteProgram(j.prog),b.deleteProgram(O.prog)}},[i]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("span",{ref:c,"aria-hidden":"true",className:"pointer-events-none sr-only font-mono",children:"T"}),(0,r.jsx)("canvas",{ref:n,"aria-hidden":"true",className:"pointer-events-none fixed inset-0 z-0 h-full w-full"}),i?null:(0,r.jsx)("div",{ref:u,"data-star-ssr-seed":"true","aria-hidden":"true",className:"pointer-events-none fixed inset-0 z-[25] flex items-center justify-center bg-[#040206] motion-reduce:hidden",children:(0,r.jsx)(v,{})}),(0,r.jsx)("canvas",{ref:s,"aria-hidden":"true",className:"pointer-events-none fixed inset-0 z-30 h-full w-full"})]})}function L(e){return String(Math.max(0,Math.floor(e))).padStart(2,"0")}function U({stripRef:e,stripSublineRef:t,polarRef:a}={}){let[l,i]=(0,o.useState)({days:"--",hours:"--",minutes:"--",seconds:"--"});(0,o.useEffect)(()=>{let e=0,t=!1,a=()=>{let r,o,l,n,s;if(t)return;let c=Date.now(),u=Math.max(0,w-c),m=Math.floor(u/1e3),d=(l=Math.floor((o=Math.floor(Math.max(0,w-c)/1e3))/86400),n=Math.floor(o%86400/3600),s=Math.floor(o%3600/60),{days:(r=Math.max(0,Math.floor(l)))>=100?String(r):String(r).padStart(2,"0"),hours:L(n),minutes:L(s),seconds:L(o%60)});i(d),window.__TMINUS_COUNTDOWN_SYNC__={lastFlipNowMs:c,lastFlipPerfMs:performance.now(),remMs:u,edgeWholeSec:m,elapsedSinceEdgeMs:u>0?999-u%1e3:0,seconds:d.seconds},e=window.setTimeout(a,u>0?u%1e3+4:1e3)};return a(),()=>{t=!0,window.clearTimeout(e)}},[]);let n=[{value:l.days,label:"DAYS"},{value:l.hours,label:"HRS"},{value:l.minutes,label:"MIN"},{value:l.seconds,label:"SEC"}],s=[{value:l.hours,label:"H"},{value:l.minutes,label:"M"},{value:l.seconds,label:"S"}];return(0,r.jsxs)("div",{role:"timer","aria-live":"off","aria-label":"Countdown to T-minus App Store v1.0 launch on January 1, 2027",className:"relative flex items-center justify-center select-none whitespace-nowrap",children:[(0,r.jsxs)("div",{ref:e,"data-countdown-mode":"strip",className:"relative flex flex-col items-center will-change-transform",children:[(0,r.jsx)("div",{className:"flex items-center whitespace-nowrap",children:n.map((e,t)=>(0,r.jsxs)(o.Fragment,{children:[t>0?(0,r.jsx)("span",{"aria-hidden":"true",className:"h-7 w-px bg-[#858AE3]/26 sm:h-10"}):null,(0,r.jsxs)("span",{className:"flex flex-col items-center px-2.5 sm:px-6",children:[(0,r.jsx)("span",{className:"min-w-[2ch] text-center font-heading text-[32px] leading-[0.94] font-semibold tracking-[-0.035em] text-white tabular-nums sm:text-[44px]",children:e.value}),(0,r.jsx)("span",{className:"mt-1 font-mono text-[9px] leading-none font-medium tracking-[0.16em] text-[#9EA3EE] uppercase sm:mt-1.5 sm:text-[10px]",children:e.label})]})]},e.label))}),(0,r.jsxs)("div",{ref:t,"data-countdown-subline":"true",className:"pointer-events-none absolute top-full left-1/2 flex -translate-x-1/2 flex-col items-center pt-2 will-change-[opacity] sm:pt-2.5",children:[(0,r.jsx)("div",{"aria-hidden":"true",className:"mb-1.5 h-px w-44 bg-gradient-to-r from-transparent via-[#858AE3]/38 to-transparent sm:mb-2 sm:w-72"}),(0,r.jsx)("div",{"data-countdown-label":"true",className:"whitespace-nowrap font-mono text-[9px] leading-none font-medium tracking-[0.14em] text-[#A2A7F0] uppercase sm:text-[10.5px] sm:tracking-[0.2em]",children:"APP STORE V1.0 \xb7 JAN 1, 2027"})]})]}),(0,r.jsxs)("div",{ref:a,"data-countdown-mode":"polar",style:{opacity:0,transform:"translate(-50%, -50%) scale(0.86)"},className:"pointer-events-none absolute top-1/2 left-1/2 flex w-[290px] flex-col items-center text-center will-change-transform sm:w-[460px]",children:[(0,r.jsx)("span",{className:"font-mono text-[11px] font-medium tracking-[0.24em] text-[#97DFFC] uppercase sm:text-[13px]",children:"LAUNCHING IN"}),(0,r.jsxs)("div",{className:"mt-1.5 flex items-baseline justify-center gap-2 sm:mt-2.5 sm:gap-3.5",children:[(0,r.jsx)("span",{className:"font-heading text-[92px] leading-[0.86] font-semibold tracking-[-0.045em] text-white tabular-nums sm:text-[152px]",children:l.days}),(0,r.jsx)("span",{className:"font-mono text-[14px] font-medium tracking-[0.16em] text-[#97DFFC] uppercase sm:text-[19px]",children:"DAYS"})]}),(0,r.jsx)("div",{"aria-hidden":"true",className:"my-3 h-px w-[76%] bg-gradient-to-r from-transparent via-[#858AE3]/55 to-transparent sm:my-4.5"}),(0,r.jsx)("div",{className:"flex items-baseline justify-center gap-4.5 font-heading text-[28px] leading-none font-semibold tracking-[-0.025em] text-white tabular-nums sm:gap-8 sm:text-[46px]",children:s.map(e=>(0,r.jsxs)("span",{className:"inline-flex items-baseline gap-1 sm:gap-1.5",children:[(0,r.jsx)("span",{className:"inline-block min-w-[2ch] text-right",children:e.value}),(0,r.jsx)("span",{className:"font-mono text-[11px] font-medium tracking-[0.08em] text-[#9EA3EE] sm:text-[15px]",children:e.label})]},e.label))}),(0,r.jsx)("div",{className:"mt-3 font-mono text-[10px] font-medium tracking-[0.16em] text-[#A2A7F0] uppercase sm:mt-4.5 sm:text-[12px] sm:tracking-[0.2em]",children:"APP STORE V1.0 \xb7 JAN 1, 2027"})]})]})}let z={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};z.node;let W=c(z),G={name:"calendar",size:24,node:[["path",{d:"M8 2v3",key:"1ioesn"}],["path",{d:"M16 2v3",key:"otl347"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",key:"h1oib"}],["path",{d:"M3 9h18",key:"1pudct"}]]};G.node;let H=c(G),$={name:"share-2",size:24,node:[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]]};$.node;let X=c($);function V({variant:e="primary",shape:t="rect",className:a="",children:o,disabled:l,...i}){return(0,r.jsx)("button",{disabled:l,className:`inline-flex cursor-pointer items-center justify-center gap-2 font-sans font-semibold tracking-[-0.01em] transition-colors duration-150 active:translate-y-px focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#040206] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${"pill"===t?"rounded-full":"rounded-[6px]"} ${"primary"===e?"bg-white text-[#040206] border border-white [@media(hover:hover)]:hover:bg-[#E8F7FE] [@media(hover:hover)]:hover:border-[#E8F7FE]":"bg-[#07050D] text-white border border-[#858AE3]/35 [@media(hover:hover)]:hover:border-[#97DFFC]/75 [@media(hover:hover)]:hover:text-[#97DFFC]"} ${a}`,...i,children:o})}function Y({idPrefix:e="waitlist",inputRef:t,onOpenLegal:a,requestedRole:l,align:i="center",onInteractPulse:n,registrationPulseSeq:s=0}){let[c,u]=(0,o.useState)("SHOPPER"),[m,d]=(0,o.useState)(""),[h,p]=(0,o.useState)(""),[f,x]=(0,o.useState)(!1),[g,v]=(0,o.useState)(null),[b,w]=(0,o.useState)(!1),[y,E]=(0,o.useState)(!1),[R,S]=(0,o.useState)(!1),[M,A]=(0,o.useState)(null),[k,P]=(0,o.useState)(null),[T,F]=(0,o.useState)(null),N=(0,o.useRef)(0),D=()=>{let e=performance.now();e-N.current<180||(N.current=e,n?.("subtle"))};async function B(e){e.preventDefault(),A(null);let t=C(m);if(!t)return void A("Enter a valid mobile number (e.g. (555) 234-5678).");if(!f)return void A("Check the SMS consent box so we can text you on Jan 1.");S(!0);try{let e=await fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:t,role:c,brandHandle:"BRAND"===c&&h.trim()||null,smsConsent:!0,source:g})}),a=await e.json().catch(()=>({}));if(!e.ok)return void A("string"==typeof a?.error?a.error:"Something went wrong. Please try again.");P(c),n?.("shockwave")}catch{A("Network error. Check your connection and try again.")}finally{S(!1)}}async function _(){let e=`${window.location.origin}/landing`;try{navigator.share?(await navigator.share({title:"T^minus",text:"T^minus launches Jan 1, 2027 \xb7 independent clothing drops on a live clock.",url:e}),F("Shared")):navigator.clipboard?.writeText?(await navigator.clipboard.writeText(e),F("Link copied")):F("Copy URL above")}catch{}finally{window.setTimeout(()=>F(null),2600)}}(0,o.useEffect)(()=>{l&&(u(l.role),A(null))},[l]),(0,o.useEffect)(()=>{if(!s)return;E(!0);let e=window.setTimeout(()=>E(!1),900);return()=>window.clearTimeout(e)},[s]),(0,o.useEffect)(()=>{let e=new URLSearchParams(window.location.search),t=e.get("utm_source")||e.get("ref")||e.get("src")||null;t&&v(t.slice(0,64))},[]);let j="left"===i?"items-start text-left":"mx-auto items-center text-center",I=`${e}-phone`,O=`${e}-brand`,L=m.trim().length>0,U=!!C(m),z=b||y;return k?(0,r.jsxs)("div",{role:"status","aria-live":"polite",className:`flex w-full max-w-[452px] flex-col rounded-[6px] border border-[#858AE3]/30 bg-[#07050D] px-6 py-6 ${j}`,children:[(0,r.jsxs)("div",{className:"inline-flex items-center gap-1.5 font-mono text-[10.5px] font-medium tracking-[0.16em] text-[#97DFFC] uppercase",children:[(0,r.jsx)(W,{className:"size-3.5 stroke-[2.2]"}),(0,r.jsx)("span",{children:"BRAND"===k?"+ BRAND SPOT SAVED":"+ ALLOCATION SECURED"})]}),(0,r.jsx)("h3",{className:"mt-2.5 font-heading text-[21px] font-semibold tracking-[-0.025em] text-white",children:"BRAND"===k?"Brand request saved.":"You're in for Jan 1."}),(0,r.jsx)("p",{className:"mt-2 max-w-[360px] text-[13.5px] leading-[1.54] text-[#DCD5EE]",children:"BRAND"===k?"We'll text you before launch to set up your storefront and schedule an early drop.":"Watch your texts on January 1 when App Store v1.0 goes live."}),(0,r.jsxs)("div",{className:"mt-5 flex w-full flex-col gap-2.5 sm:flex-row",children:[(0,r.jsxs)(V,{type:"button",variant:"primary",onClick:function(){let e,t=new Blob([(e=`${window.location.origin}/landing`.replace(/[\r\n]/g,""),`BEGIN:VCALENDAR\r
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
END:VCALENDAR`)],{type:"text/calendar;charset=utf-8"}),a=URL.createObjectURL(t),r=document.createElement("a");r.href=a,r.download="t-minus-launch-jan-1-2027.ics",document.body.appendChild(r),r.click(),r.remove(),URL.revokeObjectURL(a)},className:"h-10 flex-1 px-4 text-[13px]",children:[(0,r.jsx)(H,{className:"size-3.5"}),(0,r.jsx)("span",{children:"Save Jan 1 reminder"})]}),(0,r.jsxs)(V,{type:"button",variant:"dark",onClick:_,className:"h-10 flex-1 px-4 text-[13px]",children:[(0,r.jsx)(X,{className:"size-3.5"}),(0,r.jsx)("span",{children:T??"Send to a friend"})]})]})]}):(0,r.jsxs)("form",{onSubmit:B,noValidate:!0,className:`flex w-full max-w-[452px] flex-col ${j}`,children:[(0,r.jsxs)("div",{role:"radiogroup","aria-label":"Waitlist role",className:"relative mb-2.5 inline-grid grid-cols-2 rounded-[6px] border border-[#858AE3]/30 bg-[#05030A] p-[3px] sm:mb-3",children:[(0,r.jsx)("span",{"aria-hidden":"true",className:`pointer-events-none absolute top-[3px] bottom-[3px] left-[3px] w-[calc(50%-3px)] rounded-[4px] bg-[#613DC1] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${"BRAND"===c?"translate-x-full":"translate-x-0"}`}),[{id:"SHOPPER",label:"I'm shopping"},{id:"BRAND",label:"I run a brand"}].map(e=>{let t=c===e.id;return(0,r.jsx)("button",{type:"button",role:"radio","aria-checked":t,onClick:()=>{u(e.id),A(null),n?.("subtle")},className:`relative z-10 cursor-pointer rounded-[4px] px-3.5 py-1 text-[12px] font-medium tracking-[-0.005em] transition-colors duration-150 ${t?"text-white":"text-[#CFC7E6] hover:text-white"}`,children:e.label},e.id)})]}),(0,r.jsxs)("div",{"data-waitlist-frame":e,"data-corners-lit":z?"true":"false",className:"relative w-full",onFocus:()=>w(!0),onBlur:e=>{e.currentTarget.contains(e.relatedTarget)||w(!1)},children:[["-top-[8px] -left-[4px]","-top-[8px] -right-[4px]","-bottom-[8px] -left-[4px]","-bottom-[8px] -right-[4px]"].map(e=>(0,r.jsx)("span",{"aria-hidden":"true","data-waitlist-corner":"true",className:`pointer-events-none absolute ${e} z-20 font-mono text-[10px] leading-none font-medium transition-all duration-150 select-none ${z?"text-[#97DFFC] opacity-100":"text-[#858AE3]/40 opacity-50"}`,children:"+"},e)),(0,r.jsxs)("div",{className:`flex w-full items-center gap-1.5 rounded-[6px] border bg-[#07050D] p-1.5 transition-all duration-200 ${y?"border-[#97DFFC] ring-1 ring-[#97DFFC]/45":"border-[#858AE3]/30 focus-within:border-[#97DFFC]/80"}`,children:[(0,r.jsx)("label",{htmlFor:I,className:"sr-only",children:"Mobile phone number"}),(0,r.jsx)("input",{ref:t,id:I,name:"tel",type:"tel",inputMode:"tel",autoComplete:"tel",required:!0,placeholder:"+1 (555) 000-0000",value:m,onChange:e=>{d(function(e){let t=e.trimStart();if(t.startsWith("+"))return"+"+t.slice(1).replace(/[^\d\s-]/g,"").slice(0,18);let a=e.replace(/\D/g,"").slice(0,11);if(0===a.length)return"";if(11===a.length&&a.startsWith("1")){let e=a.slice(1);return`+1 (${e.slice(0,3)}) ${e.slice(3,6)}-${e.slice(6)}`}return a.length<=3?`(${a}`:a.length<=6?`(${a.slice(0,3)}) ${a.slice(3)}`:`(${a.slice(0,3)}) ${a.slice(3,6)}-${a.slice(6,10)}`}(e.target.value)),M&&A(null),D()},className:"h-9 w-0 min-w-0 flex-1 bg-transparent px-2.5 text-[14px] text-white placeholder:text-[#B8B0D4]/75 focus:outline-none sm:h-10 sm:px-3 sm:text-[14.5px]"}),L?(0,r.jsxs)("span",{"data-phone-status":U?"ready":"typing","aria-live":"polite",className:`inline-flex shrink-0 items-center gap-1 pr-1 font-mono text-[9.5px] font-medium tracking-[0.12em] uppercase transition-colors duration-150 select-none ${U?"text-[#97DFFC]":"text-[#858AE3]"}`,children:[(0,r.jsx)("span",{"aria-hidden":"true",className:`size-1.5 rounded-full transition-colors duration-150 ${U?"bg-[#97DFFC]":"bg-[#858AE3]"}`}),U?(0,r.jsx)("span",{children:"READY"}):null]}):null,(0,r.jsx)(V,{type:"submit",variant:"primary",disabled:R,className:"h-9 shrink-0 whitespace-nowrap px-3 text-[12px] sm:h-10 sm:px-5 sm:text-[13px]",children:R?"Saving...":"BRAND"===c?"Join as a brand":"Get early access"})]})]}),(0,r.jsx)("div",{className:`grid w-full transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${"BRAND"===c?"mt-2 grid-rows-[1fr] opacity-100":"pointer-events-none mt-0 grid-rows-[0fr] opacity-0"}`,children:(0,r.jsxs)("div",{className:"overflow-hidden",children:[(0,r.jsx)("label",{htmlFor:O,className:"sr-only",children:"Label or shop handle"}),(0,r.jsx)("input",{id:O,name:"organization",type:"text",tabIndex:"BRAND"===c?0:-1,placeholder:"Label or shop handle (optional)",value:h,onChange:e=>{p(e.target.value),D()},maxLength:120,className:"h-9 w-full rounded-[6px] border border-[#858AE3]/30 bg-[#07050D] px-3 text-[13.5px] text-white placeholder:text-[#B8B0D4]/75 transition-colors focus:border-[#97DFFC]/80 focus:outline-none sm:h-10 sm:px-3.5"})]})}),(0,r.jsxs)("label",{className:`mt-2.5 flex cursor-pointer items-center gap-2 text-[11px] leading-[1.35] text-[#D4CCE8]/90 select-none sm:mt-3 ${"left"===i?"justify-start text-left":"justify-center text-center"}`,children:[(0,r.jsxs)("span",{className:"relative inline-flex size-3.5 shrink-0 items-center justify-center",children:[(0,r.jsx)("input",{type:"checkbox",checked:f,onChange:e=>{x(e.target.checked),M&&A(null)},className:"peer sr-only"}),(0,r.jsx)("span",{"aria-hidden":"true",className:"flex size-3.5 items-center justify-center rounded-[3px] border border-[#858AE3]/55 bg-[#07050D] transition-colors duration-150 peer-checked:border-[#97DFFC] peer-checked:bg-[#613DC1] peer-focus-visible:ring-1 peer-focus-visible:ring-[#97DFFC]",children:f?(0,r.jsx)(W,{className:"size-2.5 stroke-[2.8] text-white"}):null})]}),(0,r.jsxs)("span",{children:["Text me launch & drop alerts (STOP to opt out \xb7"," ",(0,r.jsx)("button",{type:"button",onClick:e=>{e.preventDefault(),a("privacy")},className:"cursor-pointer text-white underline decoration-[#858AE3]/55 underline-offset-2 transition hover:text-[#97DFFC]",children:"Privacy"})," ","/"," ",(0,r.jsx)("button",{type:"button",onClick:e=>{e.preventDefault(),a("terms")},className:"cursor-pointer text-white underline decoration-[#858AE3]/55 underline-offset-2 transition hover:text-[#97DFFC]",children:"Terms"}),")"]})]}),M?(0,r.jsx)("p",{role:"alert",className:"mt-2 text-[12px] font-medium text-[#97DFFC]",children:M}):null]})}let q=[".",":","-","^","t","T"],K=[".",":","-","^","t"],J=new Set(["i","l","I",".",",","'","!",":",";","|","-"]);function Z({text:e,active:t,instant:a=!1,replayKey:l=0,origin:i="left",delayMs:n=0,durationMs:s=640,glyphClassName:c="text-[#858AE3]",crestClassName:u="text-[#97DFFC]",className:m=""}){let{chars:d,words:h}=(0,o.useMemo)(()=>{let t=Array.from(e),a=[],r=[];for(let e=0;e<t.length;e++)" "===t[e]?(r.length>0&&(a.push({type:"word",key:`w-${e}`,items:r}),r=[]),a.push({type:"space",key:`s-${e}`})):r.push({ch:t[e],idx:e});return r.length>0&&a.push({type:"word",key:"w-end",items:r}),{chars:t,words:a}},[e]),[p,f]=(0,o.useState)(a&&0===l),x=(0,o.useRef)([]),g=(0,o.useRef)([]);return((0,o.useEffect)(()=>{let e=null;try{let t=new URLSearchParams(window.location.search).get("revealAt");if(null!==t){let a=Number(t);Number.isFinite(a)&&a>0&&a<1&&(e=a)}}catch{}let r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(null===e&&r||null===e&&a&&0===l)return void f(!0);let o=Math.max(1,d.length),c=(o-1)*.5,u=Math.max(.5,c),m=Math.min(.42,Math.max(.24,4.6/o)),h=1-m,p=e=>{for(let t=0;t<d.length;t++){let a=d[t];if(" "===a)continue;let r=x.current[t],l=g.current[t];if(!r||!l)continue;let n=(e-("center"===i?Math.abs(t-c)/u:"right"===i?(o-1-t)/Math.max(1,o-1):t/Math.max(1,o-1))*h)/Math.max(.01,m);if(n<=0)r.style.opacity="0",l.style.opacity="0",""!==l.textContent&&(l.textContent="");else if(n>=1)r.style.opacity="1",l.style.opacity="0",""!==l.textContent&&(l.textContent="");else{let e=J.has(a)?K:q,t=Math.min(e.length-1,Math.floor(n*e.length)),o=e[t],i=n>.8?(n-.8)/.2:0,s=i>0?Math.max(0,1-1.15*i):Math.min(1,.45+.72*n);r.style.opacity=i.toFixed(3),l.style.opacity=s.toFixed(3),l.textContent!==o&&(l.textContent=o);let c=n>=.82?"#F7FAFF":n>=.62?"#97DFFC":n>=.34?"":"#613DC1";l.style.color!==c&&(l.style.color=c)}}};if(!t&&null===e){f(!1);let e=window.requestAnimationFrame(()=>p(0));return()=>window.cancelAnimationFrame(e)}if(null!==e){f(!1);let t=window.requestAnimationFrame(()=>p(e));return()=>window.cancelAnimationFrame(t)}f(!1);let v=0,b=0;v=window.requestAnimationFrame(()=>{p(0)});let w=window.setTimeout(()=>{window.cancelAnimationFrame(v),b=performance.now();let e=t=>{let a=Math.min(1,(t-b)/Math.max(200,s));p(a),a<1?v=window.requestAnimationFrame(e):f(!0)};v=window.requestAnimationFrame(e)},n);return()=>{window.clearTimeout(w),window.cancelAnimationFrame(v)}},[t,a,l,i,n,s,d]),p)?(0,r.jsx)("span",{"data-ascii-reveal":"resolved","data-ascii-run":l,style:{fontKerning:"none"},className:m,children:e}):(0,r.jsx)("span",{"aria-label":e,"data-ascii-reveal":t?"animating":"armed","data-ascii-run":l,style:{fontKerning:"none"},className:m,children:h.map(e=>"space"===e.type?(0,r.jsx)(o.Fragment,{children:" "},e.key):(0,r.jsx)("span",{className:"inline-block whitespace-nowrap",children:e.items.map(({ch:e,idx:t})=>(0,r.jsxs)("span",{"aria-hidden":"true",className:"relative inline-block",children:[(0,r.jsx)("span",{ref:e=>{x.current[t]=e},style:{opacity:0},children:e}),(0,r.jsx)("span",{ref:e=>{g.current[t]=e},style:{opacity:0},className:`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden font-mono text-[0.8em] leading-none font-medium ${c} `})]},t))},e.key))})}function Q({text:e,children:t,tier:a="headline",origin:l="left",instant:i=!1,delayMs:n=0,className:s=""}){let c=(0,o.useRef)(null),[u,m]=(0,o.useState)(i),[d,h]=(0,o.useState)(0),[p,f]=(0,o.useState)(!1),[x,g]=(0,o.useState)(!1),v=(0,o.useRef)(i),b=(0,o.useRef)(!i);(0,o.useEffect)(()=>{try{let e=new URLSearchParams(window.location.search);if(null!==e.get("revealAt")){f(!0),v.current=!0,m(!0);return}}catch{}if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){g(!0),v.current=!0,m(!0);return}let e=c.current;if(!e||"u"<typeof IntersectionObserver){v.current=!0,m(!0);return}let t=e.getBoundingClientRect(),a=window.innerHeight||900;t.bottom<=84||t.top>=a+16?(b.current=!0,v.current=!1,m(!1)):i&&(b.current=!1,v.current=!0,m(!0));let r=new IntersectionObserver(e=>{for(let t of e){let e=t.boundingClientRect,a=window.innerHeight||900;if(t.isIntersecting){let r=e.height>.55*a;(t.intersectionRatio>=.1||r)&&!v.current&&(v.current=!0,b.current&&(b.current=!1,h(e=>e+1)),m(!0))}else{let t=e.bottom<=84,r=e.top>=a+16;(t||r)&&(b.current=!0,v.current&&(v.current=!1,m(!1)))}}},{threshold:[0,.14],rootMargin:"-92px 0px -24px 0px"});return r.observe(e),()=>r.disconnect()},[i]);let w=!p&&(x||i&&0===d);return"prose"===a?(0,r.jsx)("span",{ref:c,"data-scroll-reveal-prose":u?"visible":"armed","data-scroll-reveal-run":d,style:{transitionDelay:w||!u?"0ms":`${n}ms`},className:`block transition-all ease-[cubic-bezier(0.22,1,0.36,1)] ${u?"duration-500 translate-y-0 opacity-100":"duration-0 translate-y-2 opacity-0"} ${s}`,children:t??e}):(0,r.jsx)("span",{ref:c,className:s,children:(0,r.jsx)(Z,{text:e??"",active:u,instant:w,replayKey:d,origin:l,delayMs:n,durationMs:"telemetry"===a?540:740,glyphClassName:"telemetry"===a?"text-[#858AE3]":"text-[#9EA3EE]",crestClassName:"text-[#97DFFC]"})})}function ee({instant:e=!1,variant:t="rule",className:a=""}){let l=(0,o.useRef)(null),i=(0,o.useRef)(null),n=(0,o.useRef)(null),[s,c]=(0,o.useState)(e),[u,m]=(0,o.useState)(0),d=(0,o.useRef)(e),h=(0,o.useRef)(!e),p=(0,o.useRef)(null);return(0,o.useEffect)(()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){d.current=!0,c(!0);return}let t=l.current;if(!t||"u"<typeof IntersectionObserver){d.current=!0,c(!0);return}let a=t.getBoundingClientRect(),r=window.innerHeight||900;a.bottom<=84||a.top>=r+16?(h.current=!0,d.current=!1,c(!1)):e&&(h.current=!1,d.current=!0,c(!0));let o=new IntersectionObserver(e=>{for(let t of e){let e=t.boundingClientRect,a=window.innerHeight||900;if(t.isIntersecting)d.current||(d.current=!0,h.current&&(h.current=!1,m(e=>e+1)),c(!0));else{let t=e.bottom<=84,r=e.top>=a+16;(t||r)&&(h.current=!0,d.current&&(d.current=!1,c(!1)))}}},{threshold:[0,.14],rootMargin:"-92px 0px -24px 0px"});return o.observe(t),()=>o.disconnect()},[e]),(0,o.useEffect)(()=>{let e=l.current,a=i.current;if(!e||!a)return;let r=a.getContext("2d");if(!r)return;let o=window.matchMedia("(prefers-reduced-motion: reduce)").matches,s=0,c=0,u=1.5,m='"IBM Plex Mono", ui-monospace, SFMono-Regular, monospace',d=-10,h=0,f=0,x=!1,g=o,v=+!!o,b=0,w=0,C=!1,y=()=>{let t=e.getBoundingClientRect();s=Math.max(1,Math.round(t.width)),c=Math.max(1,Math.round(t.height)),u=Math.min(Math.max(window.devicePixelRatio||1,1),1.5),a.width=Math.max(1,Math.round(s*u)),a.height=Math.max(1,Math.round(c*u)),n.current&&(m=window.getComputedStyle(n.current).fontFamily)},E=()=>{if(r.setTransform(1,0,0,1,0,0),r.clearRect(0,0,a.width,a.height),!x&&!g||s<=2||c<=2)return;let e=a.width,o=a.height,l=.5*e,i="arch"===t?.78*o:.5*o,n="arch"===t?.46*o:0,p=l*v,f=r.createLinearGradient(l-p,0,l+p,0);if(f.addColorStop(0,"rgba(133, 138, 227, 0.16)"),f.addColorStop(.35,"rgba(133, 138, 227, 0.28)"),f.addColorStop(.5,"rgba(151, 223, 252, 0.45)"),f.addColorStop(.65,"rgba(133, 138, 227, 0.28)"),f.addColorStop(1,"rgba(133, 138, 227, 0.16)"),r.strokeStyle=f,r.lineWidth=Math.max(1,Math.round(.65*u)),r.beginPath(),"arch"===t)for(let e=0;e<=48;e++){let t=e/48*2-1,a=l+t*p,o=i-n*Math.pow(Math.max(0,1-t*t),1.3);0===e?r.moveTo(a,o):r.lineTo(a,o)}else r.moveTo(l-p,Math.round(i)+.5),r.lineTo(l+p,Math.round(i)+.5);r.stroke();let b=Math.max(9,Math.round((s<640?9.5:10.5)*u));r.font=`500 ${b}px ${m}`,r.textAlign="center",r.textBaseline="middle";let w=Math.max(9,Math.round((s<640?9.5:11)*u)),C=s<640?7:11;if(v>.85){let t=.72*Math.min(1,(v-.85)/.15);r.fillStyle="#858AE3",r.globalAlpha=t,r.fillText("+",Math.round(5*u),Math.round(i)),r.fillText("+",e-Math.round(5*u),Math.round(i))}for(let a=-C;a<=C;a++){let o=Math.abs(a)/Math.max(1,C),s=Math.min(1,Math.max(0,(v-.45*o)/.42));if(s<=.02)continue;let c=Math.round(l+a*w),u=c/Math.max(1,e),m=(c-l)/Math.max(1,l),p="arch"===t?Math.round(i-n*Math.pow(Math.max(0,1-m*m),1.3)):Math.round(i),f=0;if(h>.005){let e=Math.abs(u-d);e<.16&&(f=Math.pow(1-e/.16,1.7)*h)}let x=Math.pow(1-o,1.45),g=Math.min(q.length-1,Math.floor(x*(q.length-.6)));s<.99?g=Math.min(q.length-1,Math.floor(s*q.length)):f>.25&&(g=Math.min(q.length-1,g+(f>.6?2:1))),r.fillStyle="#040206",r.globalAlpha=.92,r.fillRect(c-Math.floor(.48*w),p-Math.floor(.55*b),Math.ceil(.96*w),Math.ceil(1.1*b)),r.fillStyle=1>=Math.abs(a)||f>.35||s<.99&&g>=4?"#97DFFC":x>.4?"#9EA3EE":"#613DC1",r.globalAlpha=Math.min(1,(.45+.52*x+.25*f)*Math.min(1,1.4*s)),r.fillText(q[g],c,p)}r.globalAlpha=1},R=()=>{if(C)return;C=!0;let e=performance.now(),t=a=>{let r=Math.min(.05,Math.max(.001,(a-e)*.001));e=a,!g&&x&&v<1&&(0===b&&(b=a),v=Math.min(1,(a-b)/680)),h+=(f-h)*Math.min(1,11*r),.003>Math.abs(f-h)&&(h=f),E(),!g&&x&&v<1||h>.003||f>0?w=window.requestAnimationFrame(t):C=!1};w=window.requestAnimationFrame(t)},S=()=>{C&&(C=!1,window.cancelAnimationFrame(w))};p.current={arm:()=>{o||(x=!1,g=!1,v=0,b=0,f=0,h=0,S(),E())},settle:()=>{x=!0,g=!0,v=1,b=0,S(),E()},play:()=>{if(o){x=!0,g=!0,v=1,E();return}x=!0,g=!1,v=0,b=0,R()}},y(),o&&E();let M=t=>{if("touch"===t.pointerType||o)return;let a=e.getBoundingClientRect();d=(t.clientX-a.left)/Math.max(1,a.width),f=1,R()},A=()=>{f=0,R()};e.addEventListener("pointermove",M,{passive:!0}),e.addEventListener("pointerleave",A,{passive:!0});let k=new ResizeObserver(()=>{y(),E()});k.observe(e);let P=!1;return document.fonts?.ready.then(()=>{P||(y(),E())}).catch(()=>{}),()=>{P=!0,p.current=null,S(),e.removeEventListener("pointermove",M),e.removeEventListener("pointerleave",A),k.disconnect()}},[t]),(0,o.useEffect)(()=>{let t=p.current;t&&(window.matchMedia("(prefers-reduced-motion: reduce)").matches?t.settle():s?e&&0===u?t.settle():t.play():t.arm())},[s,e,u]),(0,r.jsxs)("div",{ref:l,"aria-hidden":"true","data-horizon-rule":s?"visible":"armed","data-horizon-rule-run":u,className:`relative w-full select-none ${"arch"===t?"h-9 sm:h-11":"h-5 sm:h-6"} ${a}`,children:[(0,r.jsx)("span",{ref:n,"aria-hidden":"true",className:"pointer-events-none sr-only font-mono",children:"T"}),(0,r.jsx)("canvas",{ref:i,className:"block h-full w-full"})]})}let et=[".",":","-","^","t","T"],ea=["#858AE3","#97DFFC","#F7FAFF"],er=["M","I","N","U","S"];function eo({active:e,instant:t=!1,replayKey:a=0,delayMs:l=110,durationMs:i=620,className:n=""}){let s=(0,o.useRef)(null),c=(0,o.useRef)(null),u=(0,o.useRef)(null),m=(0,o.useRef)(null),d=(0,o.useRef)(null),[h,p]=(0,o.useState)(e||t);return(0,o.useEffect)(()=>{(e||t)&&!h&&p(!0)},[e,t,h]),(0,o.useEffect)(()=>{if(!h)return;let e=s.current,t=c.current;if(!e||!t)return;let a=t.getContext("2d");if(!a)return;let r=document.createElement("canvas"),o=r.getContext("2d",{willReadFrequently:!0});if(!o)return;let l=document.createElement("canvas"),n=l.getContext("2d");if(!n)return;let p=window.matchMedia("(prefers-reduced-motion: reduce)").matches,f=0,x=0,g=1.5,v='"Inter Tight", "Inter", -apple-system, sans-serif',b='"IBM Plex Mono", ui-monospace, SFMono-Regular, monospace',w=8,C=10,y=[],E=[],R="",S=0,M=1,A=0,k=!1,P=0,T=0,F=!1,N=p,D=+!!p,B=p,_=p,j=!0,I=0,O=!1,L=-9999,U=-9999,z=0,W=0,G=()=>{let a=e.getBoundingClientRect(),i=Math.max(1,Math.round(a.width)),s=Math.max(1,Math.round(a.height)),c=i<340,d=Math.min(Math.max(window.devicePixelRatio||1,1),1.5);f=i,x=s;let h=Math.max(2,Math.round(f*(g=d))),p=Math.max(2,Math.round(x*g));t.width=h,t.height=p,r.width=h,r.height=p,u.current&&(v=window.getComputedStyle(u.current).fontFamily),m.current&&(b=window.getComputedStyle(m.current).fontFamily);let A=Math.max(32,Math.round(1.18*p));o.setTransform(1,0,0,1,0,0),o.clearRect(0,0,h,p),o.font=`700 ${A}px ${v}`,o.textAlign="left",o.textBaseline="alphabetic";let k=o.measureText("MINUS"),P=Math.max(24,Math.round(.9*p/Math.max(1,(k.actualBoundingBoxAscent>0?k.actualBoundingBoxAscent:.72*A)+(k.actualBoundingBoxDescent>=0?k.actualBoundingBoxDescent:.02*A))*A)),T=.064*P;o.font=`700 ${P}px ${v}`;let F=er.map(e=>o.measureText(e).width).reduce((e,t)=>e+t,0)+T*(er.length-1);F>.95*h&&(T=.064*(P=Math.max(20,Math.round(.95*h/F*P)))),o.font=R=`700 ${P}px ${v}`;let N=o.measureText("MINUS"),D=Math.round(.5*p+((N.actualBoundingBoxAscent>0?N.actualBoundingBoxAscent:.72*P)-(N.actualBoundingBoxDescent>=0?N.actualBoundingBoxDescent:0))*.5),B=er.map(e=>o.measureText(e).width),_=B.reduce((e,t)=>e+t,0)+T*(er.length-1),j=(h-_)*.5;S=j,M=Math.max(1,_),E=[],o.fillStyle="#ffffff";for(let e=0;e<er.length;e++){let t=er[e];E.push({ch:t,x:j,y:D}),o.fillText(t,j,D),j+=B[e]+T}w=Math.max(5,Math.round((c?4.6:5.6)*g)),C=Math.max(7,Math.round((c?5.8:6.8)*g)),(()=>{l.width=Math.max(1,et.length*w),l.height=Math.max(1,ea.length*C),n.setTransform(1,0,0,1,0,0),n.clearRect(0,0,l.width,l.height);let e=Math.max(7,Math.round(.88*C));n.font=`600 ${e}px ${b}`,n.textAlign="center",n.textBaseline="middle";for(let e=0;e<ea.length;e++){n.fillStyle=ea[e];let t=Math.round((e+.52)*C);for(let e=0;e<et.length;e++){let a=Math.round((e+.5)*w);n.fillText(et[e],a,t)}}})();let I=o.getImageData(0,0,h,p).data,O=Math.ceil(h/w),L=Math.ceil(p/C),U=[];for(let e=0;e<L;e++){let t=Math.round((e+.5)*C);if(!(t<0)&&!(t>=p))for(let a=0;a<O;a++){let r=Math.round((a+.5)*w);if(r<0||r>=h)continue;let o=I[(t*h+r)*4+3],l=Math.max(0,r-Math.floor(.35*w)),i=Math.min(h-1,r+Math.floor(.35*w)),n=Math.max(0,t-Math.floor(.35*C)),s=Math.min(p-1,t+Math.floor(.35*C));if(36>Math.max(o,I[(t*h+l)*4+3],I[(t*h+i)*4+3],I[(n*h+r)*4+3],I[(s*h+r)*4+3]))continue;let c=Math.min(1,Math.max(0,(r-S)/M)),u=t/Math.max(1,p),m=+(o<200),d=(1-.28*u)*.68+(3*a+5*e&7)/7*.32,f=Math.min(et.length-1,Math.max(2,Math.floor(d*et.length)));U.push({px:Math.round(r-.5*w),py:Math.round(t-.5*C),xNorm:c,yNorm:u,baseIdx:f,edgeFactor:m})}}y=U},H=e=>{let o=t.width,i=t.height;if(a.setTransform(1,0,0,1,0,0),a.clearRect(0,0,o,i),F&&!N||D<=.001&&!N)return;let n=.001*e,s=a.createLinearGradient(0,0,o,i);if(s.addColorStop(0,"rgba(151, 223, 252, 0.32)"),s.addColorStop(.5,"rgba(196, 240, 255, 0.26)"),s.addColorStop(1,"rgba(133, 138, 227, 0.26)"),D<1){let e=S+M*Math.min(1,1.15*D),t=Math.max(0,e-.32*M),r=a.createLinearGradient(t,0,e,0);r.addColorStop(0,"rgba(151, 223, 252, 0.30)"),r.addColorStop(.65,"rgba(151, 223, 252, 0.16)"),r.addColorStop(1,"rgba(151, 223, 252, 0)"),a.fillStyle=r,a.fillRect(0,0,Math.min(o,e+2),i)}else a.fillStyle=s,a.fillRect(0,0,o,i);let c=56*g;for(let e=0;e<y.length;e++){let t=y[e],r=t.baseIdx,o=1,i=.94;if(D<1){let e=.62*t.xNorm,a=(D-e)/.38;if(a<=0)continue;a<1?(r=Math.min(et.length-1,Math.floor(a*et.length)),o=a>.72?2:+(a>.36),i=Math.min(1,.42+.65*a)):o=.5+.5*Math.sin(1.15*n-4.4*t.xNorm)>.78?2:1}else{let e=Math.sin(1.05*n-4.2*t.xNorm+1.5*t.yNorm);if(e>.86?(r=Math.min(et.length-1,t.baseIdx+1),o=2,i=.98):e<-.72?(o=0,i=.86):(o=t.edgeFactor&&e>.25?2:1,i=.94),z>.005){let e=t.px+.5*w,a=t.py+.5*C,l=Math.hypot(e-L,a-U);if(l<c){let e=Math.pow(1-l/c,1.5)*z;e>.16&&(r=Math.min(et.length-1,r+(e>.55?2:1)),o=2,i=1)}}}a.globalAlpha=i,a.drawImage(l,r*w,o*C,w,C,t.px,t.py,w,C)}if(a.globalAlpha=1,a.globalCompositeOperation="destination-in",a.drawImage(r,0,0),a.globalCompositeOperation="source-over",E.length>0){a.save();let e=D<1?Math.min(.56,.56*Math.max(0,(D-.18)/.82)):.56;if(e>.01){a.font=R,a.textAlign="left",a.textBaseline="alphabetic",a.lineWidth=Math.max(.85,.85*g),a.strokeStyle=`rgba(151, 223, 252, ${e.toFixed(3)})`;for(let e=0;e<E.length;e++){let t=E[e];a.strokeText(t.ch,t.x,t.y)}}a.restore()}},$=performance.now(),X=e=>{if(O||document.hidden||!j||F){k=!1;return}A=window.requestAnimationFrame(X);let t=Math.min(.05,Math.max(.001,(e-$)*.001));$=e;let a=B&&!_;a&&(0===T&&(T=e),(D=Math.min(1,(e-T)/Math.max(180,i)))>=1&&(_=!0));let r=W>z?14:8;z+=(W-z)*Math.min(1,t*r),.003>Math.abs(W-z)&&(z=W);let o=z>.003||W>0;a||o?H(e):_&&!p&&e-I>=125&&(I=e,H(e))},V=()=>{O||p||k||document.hidden||!j||F||(k=!0,$=performance.now(),A=window.requestAnimationFrame(X))},Y=()=>{k&&(k=!1,window.cancelAnimationFrame(A))};d.current={arm:()=>{p||(window.clearTimeout(P),F=!0,N=!1,D=0,B=!1,_=!1,T=0,W=0,z=0,Y(),H(performance.now()))},settle:()=>{window.clearTimeout(P),F=!1,N=!0,D=1,B=!0,_=!0,H(performance.now()),p||V()},play:e=>{if(window.clearTimeout(P),p){F=!1,N=!0,D=1,B=!0,_=!0,H(performance.now());return}F=!1,N=!1,D=0,B=!1,_=!1,T=0,H(performance.now()),P=window.setTimeout(()=>{O||F||(B=!0,T=0,V())},Math.max(0,e))}},G();let q=t=>{if("touch"===t.pointerType||p||!_)return;let a=e.getBoundingClientRect();L=(t.clientX-a.left)*g,U=(t.clientY-a.top)*g,W=1,V()},K=()=>{W=0},J=()=>{document.hidden?Y():j&&!F&&V()};e.addEventListener("pointermove",q,{passive:!0}),e.addEventListener("pointerleave",K,{passive:!0}),document.addEventListener("visibilitychange",J);let Z=null;"u">typeof IntersectionObserver&&(Z=new IntersectionObserver(e=>{(j=e[0]?.isIntersecting??!0)?F||V():Y()},{threshold:.02})).observe(e);let Q=new ResizeObserver(()=>{G(),!F&&(_||N||D>0)&&H(performance.now())});return Q.observe(e),document.fonts?.ready.then(()=>{!O&&(G(),!F&&(_||N||D>0)&&H(performance.now()))}).catch(()=>{}),()=>{O=!0,d.current=null,window.clearTimeout(P),Y(),e.removeEventListener("pointermove",q),e.removeEventListener("pointerleave",K),document.removeEventListener("visibilitychange",J),Z?.disconnect(),Q.disconnect()}},[h,i]),(0,o.useEffect)(()=>{if(!h)return;let r=d.current;r&&(window.matchMedia("(prefers-reduced-motion: reduce)").matches?r.settle():e||t&&0===a?t&&0===a?r.settle():r.play(l):r.arm())},[h,e,t,a,l]),(0,r.jsxs)("span",{ref:s,"data-minus-wordmark":"vector-micro-ascii","data-minus-run":a,className:`relative mx-auto block h-[48px] w-[264px] max-w-full cursor-default select-none sm:h-[74px] sm:w-[418px] ${n}`,children:[(0,r.jsx)("span",{ref:u,"aria-hidden":"true",className:"pointer-events-none sr-only font-heading font-bold",children:"MINUS"}),(0,r.jsx)("span",{ref:m,"aria-hidden":"true",className:"pointer-events-none sr-only font-mono font-semibold",children:"T"}),(0,r.jsx)("span",{className:"sr-only",children:"Minus"}),(0,r.jsx)("canvas",{ref:c,"aria-hidden":"true",className:"block h-full w-full"})]})}let el=[{index:"01",title:"Timed drops on a live clock.",body:"Every release opens on a shared countdown built for launch-second demand, so checkout stays steady instead of disappearing into an ad feed.",specTag:"LIVE CLOCK"},{index:"02",title:"Sizing matched to real garment measurements.",body:"Fit guidance built from each piece's actual flat specs and cut, so you pick the right size with confidence before a small run sells through.",specTag:"FLAT SPECS"},{index:"03",title:"Direct loyalty with the labels you wear.",body:"Collect pieces from independent brands to unlock tier status, early drop windows, and free shipping tied directly to that label.",specTag:"BRAND TIERS"},{index:"04",title:"Native drop-to-door tracking.",body:"Follow every order from confirmation to doorstep inside T^minus, without digging through inbox threads or scattered carrier links.",specTag:"ORDER FEED"}],ei=[{id:"hero",label:"HERO"},{id:"polar",label:"POLAR"},{id:"index",label:"INDEX"},{id:"tzero",label:"T-ZERO"}];function en(e,t,a){let r=Math.min(1,Math.max(0,(a-e)/(t-e)));return r*r*(3-2*r)}function es({skipIntro:e=!1}){let[t,a]=(0,o.useState)(e),[l,i]=(0,o.useState)(e),[n,s]=(0,o.useState)(e),[c,u]=(0,o.useState)(0),[d,p]=(0,o.useState)(null),[f,x]=(0,o.useState)(null),[g,v]=(0,o.useState)(0),[w,C]=(0,o.useState)(null),y=(0,o.useRef)(null),E=(0,o.useRef)(!1),R=(0,o.useRef)(null),S=(0,o.useRef)(null),M=(0,o.useRef)(null),A=(0,o.useRef)(null),k=(0,o.useRef)(null),P=(0,o.useRef)(null),T=(0,o.useRef)(null),F=(0,o.useRef)(null),N=(0,o.useRef)(null),D=(0,o.useRef)(null),B=(0,o.useRef)(null),_=(0,o.useRef)(null),j=(0,o.useRef)(null),I=(0,o.useRef)([]),L=(0,o.useRef)([]),z=(0,o.useRef)([]),W=(0,o.useRef)({runwayTop:0,runwayScrollable:1600,indexTop:2800,closingTop:3600,docMaxScroll:4e3}),G=(0,o.useRef)({cdOpacity:"",cdTransform:"",stripOpacity:"",stripTransform:"",stripSublineOpacity:"",polarOpacity:"",polarTransform:"",heroOpacity:"",heroTransform:"",heroPointer:"",veilOpacity:"",veilBg:"",hudText:"",scrollCueOpacity:"",vernierActiveIdx:-1});(0,o.useEffect)(()=>{try{let e=new URLSearchParams(window.location.search);"1"===e.get("skipIntro")&&(a(!0),i(!0),s(!0))}catch{}},[]);let H=(0,o.useCallback)(e=>{i(e),s(e),e||(E.current=!1)},[]),$=(0,o.useCallback)(()=>{let e=window.innerHeight||900,t=window.scrollY,a=k.current,r=A.current,o=M.current,l=a?a.getBoundingClientRect().top+t:0,i=a?Math.max(1,a.getBoundingClientRect().height-e):Math.max(420,2*e),n=r?r.getBoundingClientRect().top+t:l+i+400,s=o?o.getBoundingClientRect().top+t:n+700;W.current={runwayTop:l,runwayScrollable:i,indexTop:n,closingTop:s,docMaxScroll:Math.max(1,document.documentElement.scrollHeight-e)}},[]);(0,o.useEffect)(()=>{let e=window.setTimeout($,60);return window.addEventListener("resize",$,{passive:!0}),()=>{window.clearTimeout(e),window.removeEventListener("resize",$)}},[$]),(0,o.useEffect)(()=>{let e=document.documentElement.style.backgroundColor,t=document.body.style.backgroundColor;return document.documentElement.style.backgroundColor="#040206",document.body.style.backgroundColor="#040206",()=>{document.documentElement.style.backgroundColor=e,document.body.style.backgroundColor=t}},[]),(0,o.useEffect)(()=>{if(!d)return;let e=e=>{"Escape"===e.key&&p(null)};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[d]);let X=(0,o.useCallback)(e=>{for(let t=0;t<ei.length;t++){let a=t===e,r=I.current[t],o=L.current[t],l=z.current[t];r&&(r.setAttribute("aria-current",a?"true":"false"),r.dataset.active=a?"true":"false"),o&&(o.style.width=a?"20px":"10px",o.style.backgroundColor=a?"#97DFFC":"rgba(133, 138, 227, 0.45)"),l&&(l.style.color=a?"#97DFFC":"rgba(162, 167, 240, 0.65)",l.style.opacity=a?"1":"0.78")}},[]),V=(0,o.useCallback)(e=>{let t=G.current,a=T.current;if(a){let r=en(.66,.98,e.settleProgress).toFixed(3),o=`translate3d(-50%, ${e.countdownCenterY.toFixed(1)}px, 0) translateY(-50%)`;t.cdOpacity!==r&&(t.cdOpacity=r,a.style.opacity=r),t.cdTransform!==o&&(t.cdTransform=o,a.style.transform=o)}let r=F.current;if(r){let a=(1-en(.18,.48,e.polarFactor)).toFixed(3),o=`scale(${e.countdownScale.toFixed(4)})`;t.stripOpacity!==a&&(t.stripOpacity=a,r.style.opacity=a),t.stripTransform!==o&&(t.stripTransform=o,r.style.transform=o)}let o=N.current;if(o){let a=(1-en(.72,.88,e.pinProgress)).toFixed(3);t.stripSublineOpacity!==a&&(t.stripSublineOpacity=a,o.style.opacity=a)}let l=D.current;if(l){let a=en(.32,.68,e.polarFactor),r=a.toFixed(3);if(t.polarOpacity!==r&&(t.polarOpacity=r,l.style.opacity=r),a>.001){let a=e.viewportW<640,r=Math.min(1.18,Math.max(.55,Math.min(.85*e.polarDiameterPx/(a?290:460),.82*e.polarDiameterPx/(a?204:306)))),o=.88+.12*en(.28,.74,e.polarFactor),i=`translate(-50%, -50%) scale(${(r*o).toFixed(4)})`;t.polarTransform!==i&&(t.polarTransform=i,l.style.transform=i)}}let i=P.current;if(i){let a=en(.015,.22,e.pinProgress),r=(1-a).toFixed(3),o=`translate3d(0, ${(-(34*a)).toFixed(1)}px, 0)`,l=e.pinProgress>.14?"none":"auto";t.heroOpacity!==r&&(t.heroOpacity=r,i.style.opacity=r),t.heroTransform!==o&&(t.heroTransform=o,i.style.transform=o),t.heroPointer!==l&&(t.heroPointer=l,i.style.pointerEvents=l)}e.heroResolved&&(!E.current&&e.pinProgress>=.24?(E.current=!0,s(!1)):E.current&&e.pinProgress<=.14&&(E.current=!1,u(e=>e+1),s(!0)));let n=B.current;if(n){let a=en(.68,.88,e.pinProgress),r=a.toFixed(3);t.veilOpacity!==r&&(t.veilOpacity=r,n.style.opacity=r);let o="none";if(a>.002&&e.domeRadiusPx>10){let t=e.viewportW<640,a=e.domeCenterX.toFixed(0),r=e.domeCenterY.toFixed(0),l=Math.max(24,140-e.domeCenterY),i=Math.min(l-22,e.domeRadiusPx+(t?16:14)).toFixed(0),n=Math.min(l-10,e.domeRadiusPx+(t?28:26)).toFixed(0),s=Math.min(l,e.domeRadiusPx+(t?42:40)).toFixed(0),c=Math.min(88,Math.max(28,e.domeEdgeY+14)).toFixed(0),u=Math.min(136,Math.max(66,e.domeEdgeY+42)).toFixed(0);o=`radial-gradient(circle at ${a}px ${r}px, #040206 0px, #040206 ${i}px, rgba(4, 2, 6, 0.90) ${n}px, rgba(4, 2, 6, 0) ${s}px), linear-gradient(180deg, #040206 0px, #040206 ${c}px, rgba(4, 2, 6, 0) ${u}px)`}t.veilBg!==o&&(t.veilBg=o,n.style.backgroundImage=o)}let c=_.current;if(c&&e.heroResolved){var m;let a,r=(m=e.pinProgress,a=Math.round(e.elevDeg),m<.2?`${a}\xb0 HORIZON`:m<.72?`${a}\xb0 POLAR`:`${a}\xb0 LEDGER`);t.hudText!==r&&(t.hudText=r,c.textContent=r)}let d=j.current;if(d){let a=(en(.92,1,e.settleProgress)*(1-en(0,.022,e.pinProgress))).toFixed(3);t.scrollCueOpacity!==a&&(t.scrollCueOpacity=a,d.style.opacity=a)}if(e.heroResolved&&e.viewportW>=1024){let a=W.current,r=window.scrollY,o=window.innerHeight||900,l=0;l=e.pinProgress<.2?0:e.pinProgress<.78?1:r+.52*o>=a.closingTop||r>=a.docMaxScroll-80?3:2,t.vernierActiveIdx!==l&&(t.vernierActiveIdx=l,X(l))}},[X]),q=(0,o.useCallback)(e=>{y.current?.pulseHorizon(e)},[]),K=(0,o.useCallback)(()=>{y.current?.skipIntro(),E.current=!1,i(!0),s(!0)},[]),J=(0,o.useCallback)(()=>{E.current=!1,a(!1),i(!1),s(!1),u(0),window.scrollTo({top:0,behavior:"smooth"}),y.current?.replayIntro()},[]),et=(0,o.useCallback)(e=>{$();let t=W.current;if("hero"===e)return void window.scrollTo({top:0,behavior:"smooth"});if("polar"===e){let e=Math.round(t.runwayTop+.47*t.runwayScrollable);window.scrollTo({top:e,behavior:"smooth"});return}if("index"===e){let e=Math.max(0,Math.round(t.indexTop-132));window.scrollTo({top:e,behavior:"smooth"});return}M.current?.scrollIntoView({behavior:"smooth",block:"center"})},[$]),ea=(0,o.useCallback)(e=>{x(t=>({role:e,seq:(t?.seq??0)+1})),v(e=>e+1),y.current?.pulseHorizon("subtle"),M.current?.scrollIntoView({behavior:"smooth",block:"center"}),window.setTimeout(()=>{S.current?.focus({preventScroll:!0})},340)},[]),er=t&&0===c;return(0,r.jsxs)("div",{className:"relative min-h-[100dvh] w-full overflow-x-clip bg-[#040206] font-sans text-white selection:bg-[#613DC1]/55 selection:text-white",children:[(0,r.jsx)(O,{onHeroReveal:H,onHorizonSync:V,runwayRef:k,controlRef:y,skipIntro:e}),(0,r.jsx)("div",{ref:B,"aria-hidden":"true",style:{opacity:0},className:"pointer-events-none fixed inset-0 z-20 will-change-[opacity]"}),(0,r.jsxs)("header",{className:"pointer-events-none fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between px-4 sm:h-[76px] sm:px-10",children:[(0,r.jsx)("div",{"aria-hidden":"true",className:`pointer-events-none absolute top-0 left-0 h-20 w-44 transition-opacity duration-500 sm:h-24 sm:w-64 ${l?"opacity-100":"opacity-0"}`,style:{background:"radial-gradient(ellipse 95% 88% at 0% 0%, rgba(4, 2, 6, 0.92) 0%, rgba(4, 2, 6, 0.62) 48%, rgba(4, 2, 6, 0) 100%)"}}),(0,r.jsx)("div",{"aria-hidden":"true",className:"pointer-events-none absolute top-0 right-0 h-20 w-48 sm:h-24 sm:w-72",style:{background:"radial-gradient(ellipse 95% 88% at 100% 0%, rgba(4, 2, 6, 0.88) 0%, rgba(4, 2, 6, 0.52) 50%, rgba(4, 2, 6, 0) 100%)"}}),(0,r.jsx)("a",{href:"#top","data-brand-wordmark":"true",onClick:e=>{e.preventDefault(),window.scrollTo({top:0,behavior:"smooth"})},className:`relative z-10 text-white transition-opacity duration-500 ease-out hover:opacity-85 focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:outline-none ${l?"pointer-events-auto opacity-100 delay-[260ms]":"pointer-events-none opacity-0"}`,style:t?{transitionDelay:"0ms"}:void 0,children:(0,r.jsx)(b,{className:"[--wm-scale:1.0] sm:[--wm-scale:1.38]"})}),(0,r.jsx)("div",{"data-perimeter-hud":"true",className:"relative z-10 flex items-center gap-2 font-mono text-[9px] font-medium tracking-[0.12em] text-[#A2A7F0] uppercase whitespace-nowrap sm:gap-3 sm:text-[10px] sm:tracking-[0.16em]",children:l?(0,r.jsxs)("span",{className:"inline-flex items-center gap-1.5",children:[(0,r.jsx)("span",{"aria-hidden":"true",className:"size-1.5 rounded-full bg-[#97DFFC]/85"}),(0,r.jsx)("span",{ref:_,"data-hud-readout":"true",className:"tabular-nums text-[#DCD5EE]",children:"26\xb0 HORIZON"})]}):(0,r.jsxs)("button",{type:"button","data-skip-intro":"true",onClick:K,className:"pointer-events-auto inline-flex min-h-[28px] cursor-pointer items-center gap-1 rounded-[5px] border border-[#858AE3]/30 bg-[#040206]/84 px-2 py-1 text-[9.5px] font-medium tracking-[0.14em] text-white shadow-[0_6px_20px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-colors duration-150 hover:border-[#97DFFC]/80 hover:text-[#97DFFC] focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:outline-none sm:px-2.5 sm:text-[10px]",children:[(0,r.jsx)("span",{children:"SKIP"}),(0,r.jsx)("span",{"aria-hidden":"true",className:"text-[#97DFFC]",children:"→"})]})})]}),(0,r.jsxs)("div",{ref:j,"data-scroll-cue":"true","aria-hidden":"true",style:{opacity:+!!t},className:"pointer-events-none fixed bottom-[calc(20.5dvh+10px)] left-1/2 z-[35] -translate-x-1/2 font-mono text-[9.5px] font-medium tracking-[0.2em] text-[#A2A7F0]/85 uppercase whitespace-nowrap transition-opacity duration-200 will-change-[opacity] sm:bottom-[calc(22dvh+14px)] sm:text-[10px]",children:[(0,r.jsx)("span",{className:"text-[#97DFFC]",children:"↓"})," SCROLL TO ORBIT"]}),(0,r.jsx)("nav",{"aria-label":"Page orbital sections","data-vernier-rail":"true",className:`fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 flex-col items-end transition-opacity duration-500 lg:flex ${l?"pointer-events-auto opacity-100":"pointer-events-none opacity-0"}`,children:(0,r.jsxs)("div",{className:"relative flex flex-col items-end gap-5 py-2 pr-3",children:[(0,r.jsx)("span",{"aria-hidden":"true",className:"pointer-events-none absolute top-0 right-0 bottom-0 w-px bg-[#858AE3]/24"}),ei.map((e,t)=>(0,r.jsxs)("button",{ref:e=>{I.current[t]=e},type:"button","data-vernier-tick":e.id,"data-active":0===t?"true":"false","aria-current":0===t?"true":"false",onClick:()=>et(e.id),className:"group relative flex cursor-pointer items-center gap-2.5 py-0.5 text-right focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:outline-none",children:[(0,r.jsx)("span",{ref:e=>{z.current[t]=e},style:{color:0===t?"#97DFFC":"rgba(162, 167, 240, 0.65)",opacity:0===t?1:.78},className:"font-mono text-[9.5px] font-medium tracking-[0.16em] uppercase transition-colors duration-200 group-hover:text-white",children:e.label}),(0,r.jsx)("span",{ref:e=>{L.current[t]=e},"aria-hidden":"true",style:{width:0===t?"20px":"10px",backgroundColor:0===t?"#97DFFC":"rgba(133, 138, 227, 0.45)"},className:"block h-px transition-all duration-200 group-hover:bg-[#97DFFC]"})]},e.id))]})}),(0,r.jsx)("div",{ref:T,style:{opacity:+!!t,transform:"translate3d(-50%, calc(100dvh - 80px), 0) translateY(-50%)"},className:"pointer-events-none fixed top-0 left-1/2 z-40 will-change-transform",children:(0,r.jsx)(U,{stripRef:F,stripSublineRef:N,polarRef:D})}),(0,r.jsxs)("main",{id:"top",className:"relative w-full",children:[(0,r.jsx)("div",{ref:k,className:"relative h-[255dvh] w-full sm:h-[305dvh]",children:(0,r.jsx)("section",{"data-section":"hero",className:`sticky top-0 z-[35] flex h-[100dvh] w-full flex-col items-center justify-center px-5 pt-16 pb-[23dvh] transition-opacity duration-400 ease-out sm:px-8 sm:pt-[76px] sm:pb-[25vh] ${l?"opacity-100":"pointer-events-none opacity-0"}`,children:(0,r.jsxs)("div",{ref:P,className:"flex w-full max-w-[660px] flex-col items-center text-center will-change-transform",children:[(0,r.jsxs)("h1",{className:"flex w-full flex-col items-center",children:[(0,r.jsx)("span",{style:{fontSize:"clamp(2.05rem, 4.1vw, 3.45rem)"},className:"block font-heading leading-[1.0] font-semibold tracking-[-0.035em] text-white",children:(0,r.jsx)(Z,{text:"Fashion.",active:n,instant:er,replayKey:c,origin:"left",delayMs:c>0?0:40,durationMs:540})}),(0,r.jsx)(eo,{active:n,instant:er,replayKey:c,delayMs:c>0?70:110,durationMs:620,className:"my-2 sm:my-2.5"}),(0,r.jsx)("span",{style:{fontSize:"clamp(2.05rem, 4.1vw, 3.45rem)"},className:"block font-heading leading-[1.02] font-semibold tracking-[-0.035em] text-[#EAE5F5]",children:(0,r.jsx)(Z,{text:"the Noise.",active:n,instant:er,replayKey:c,origin:"left",delayMs:c>0?140:200,durationMs:560})})]}),(0,r.jsxs)("p",{className:`mt-5 max-w-[330px] font-sans text-[14.5px] leading-[1.52] font-normal text-[#DCD5EE] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:mt-6 sm:max-w-[460px] sm:text-[16px] sm:leading-[1.55] ${l?"translate-y-0 opacity-100 delay-[260ms]":"translate-y-2 opacity-0"}`,style:t?{transitionDelay:"0ms"}:void 0,children:["The best clothes in the world rarely have the loudest"," ",(0,r.jsx)("span",{className:"font-medium text-[#97DFFC]",children:"voice"}),"."]}),(0,r.jsx)("div",{"data-hero-waitlist":"true",className:`mt-6 w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:mt-7 ${l?"translate-y-0 opacity-100 delay-[300ms]":"translate-y-2 opacity-0"}`,style:t?{transitionDelay:"0ms"}:void 0,children:(0,r.jsx)(Y,{idPrefix:"hero-waitlist",inputRef:R,onOpenLegal:p,onInteractPulse:q})})]})})}),(0,r.jsxs)("div",{"data-below-fold":"true",className:"relative z-10 mx-auto w-full max-w-[1080px] px-5 pt-16 sm:px-10 sm:pt-24",children:[(0,r.jsxs)("section",{"data-band":"premise",className:"pb-16 sm:pb-24",children:[(0,r.jsxs)("p",{className:"font-mono text-[11px] font-medium tracking-[0.18em] text-[#A2A7F0] uppercase",children:[(0,r.jsx)("span",{className:"text-[#97DFFC]",children:"+"})," ",(0,r.jsx)(Q,{text:"PREMISE",tier:"telemetry",instant:t})]}),(0,r.jsxs)("div",{className:"mt-5 grid grid-cols-1 gap-8 md:mt-6 md:grid-cols-12 md:items-end md:gap-12",children:[(0,r.jsx)("div",{className:"md:col-span-7",children:(0,r.jsx)("h2",{style:{fontSize:"clamp(1.92rem, 4.3vw, 3.6rem)"},className:"max-w-[18ch] font-heading leading-[1.03] font-semibold tracking-[-0.036em] text-white",children:(0,r.jsx)(Q,{text:"Great independent labels shouldn't have to buy attention to be found.",tier:"headline",instant:t})})}),(0,r.jsxs)("div",{className:"flex flex-col justify-end md:col-span-5",children:[(0,r.jsx)(Q,{tier:"prose",instant:t,delayMs:120,children:(0,r.jsx)("p",{className:"font-sans text-[15.5px] leading-[1.68] font-normal text-[#DDD6EF] sm:text-[16px]",children:"Small clothing brands put months into fabric, cut, and finish, only to disappear under paid feeds. T^minus gives independent labels a dedicated home built around scheduled releases, so buyers discover pieces for the garment itself."})}),(0,r.jsxs)("dl",{className:"mt-7 grid grid-cols-2 gap-4 border-t border-[#858AE3]/24 pt-5 font-mono text-[10.5px] tracking-[0.14em] uppercase",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("dt",{className:"text-[#9EA3EE]",children:"FORMAT"}),(0,r.jsx)("dd",{className:"mt-1 text-white",children:"SCHEDULED DROPS"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("dt",{className:"text-[#9EA3EE]",children:"FEED RANKING"}),(0,r.jsx)("dd",{className:"mt-1 text-white",children:"ZERO PAID ADS"})]})]})]})]}),(0,r.jsx)("div",{className:"mt-14 sm:mt-20",children:(0,r.jsx)(ee,{instant:t})})]}),(0,r.jsxs)("section",{ref:A,"data-band":"architecture",className:"pb-16 sm:pb-24",children:[(0,r.jsxs)("div",{className:"mb-8 flex items-center justify-between font-mono text-[11px] font-medium tracking-[0.18em] text-[#A2A7F0] uppercase sm:mb-10",children:[(0,r.jsxs)("span",{children:[(0,r.jsx)("span",{className:"text-[#97DFFC]",children:"+"})," ",(0,r.jsx)(Q,{text:"ARCHITECTURE",tier:"telemetry",instant:t})]}),(0,r.jsx)("span",{className:"text-[#A2A7F0]",children:"01 — 04"})]}),(0,r.jsx)("ol",{className:"divide-y divide-[#858AE3]/22 border-y border-[#858AE3]/22",children:el.map((e,a)=>(0,r.jsxs)("li",{className:"group relative py-7 transition-colors duration-200 [@media(hover:hover)]:hover:bg-[#613DC1]/[0.06] sm:px-3 sm:py-9",children:[(0,r.jsx)("span",{"aria-hidden":"true",className:"pointer-events-none absolute top-1/2 left-0 hidden -translate-y-1/2 font-mono text-[11px] text-[#97DFFC] opacity-0 transition-opacity duration-200 [@media(hover:hover)]:group-hover:opacity-100 sm:block",children:"+"}),(0,r.jsxs)("div",{className:"grid grid-cols-1 gap-3 md:grid-cols-12 md:items-baseline md:gap-8",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between md:col-span-1 md:block",children:[(0,r.jsx)("span",{className:"font-mono text-[12.5px] font-medium tracking-[0.16em] text-[#97DFFC] tabular-nums",children:e.index}),(0,r.jsx)("span",{className:"font-mono text-[10px] font-medium tracking-[0.16em] text-[#A2A7F0] uppercase md:hidden",children:e.specTag})]}),(0,r.jsx)("div",{className:"md:col-span-4",children:(0,r.jsx)("h3",{className:"font-heading text-[21px] leading-[1.18] font-semibold tracking-[-0.025em] text-white sm:text-[23px]",children:(0,r.jsx)(Q,{text:e.title,tier:"headline",instant:t,delayMs:60*a})})}),(0,r.jsx)("div",{className:"md:col-span-5",children:(0,r.jsx)(Q,{tier:"prose",instant:t,delayMs:80+50*a,children:(0,r.jsx)("p",{className:"max-w-[44ch] font-sans text-[15px] leading-[1.64] text-[#D8D1EC]",children:e.body})})}),(0,r.jsx)("div",{className:"hidden text-right md:col-span-2 md:block",children:(0,r.jsx)("span",{className:"font-mono text-[10.5px] font-medium tracking-[0.16em] text-[#A2A7F0] uppercase transition-colors duration-200 [@media(hover:hover)]:group-hover:text-[#97DFFC]",children:e.specTag})})]})]},e.index))})]}),(0,r.jsxs)("section",{"data-band":"closing",className:"pb-12 sm:pb-16",children:[(0,r.jsxs)("div",{"data-band3-spotlight":w??"none",onMouseLeave:()=>C(null),onBlur:e=>{e.currentTarget.contains(e.relatedTarget)||C(null)},className:"relative border-t border-[#858AE3]/18 pt-8 sm:pt-10",children:[(0,r.jsx)("span",{"aria-hidden":"true","data-spotlight-rail":"true",className:`pointer-events-none absolute top-[-1px] left-0 hidden h-px w-1/2 bg-[#97DFFC] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:block ${"BRAND"===w?"translate-x-full opacity-100":"SHOPPER"===w?"translate-x-0 opacity-100":"translate-x-0 opacity-0"}`}),(0,r.jsxs)("div",{className:"grid grid-cols-1 gap-10 pb-14 md:grid-cols-2 md:gap-0 md:divide-x md:divide-[#858AE3]/22 sm:pb-16",children:[(0,r.jsxs)("div",{"data-spotlight-col":"SHOPPER",onMouseEnter:()=>C("SHOPPER"),onFocus:()=>C("SHOPPER"),className:`flex flex-col justify-between transition-opacity duration-200 md:pr-12 lg:pr-16 ${"BRAND"===w?"md:opacity-[0.82]":"opacity-100"}`,children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("p",{className:"font-mono text-[11px] font-medium tracking-[0.18em] text-[#A2A7F0] uppercase",children:[(0,r.jsx)("span",{className:"text-[#97DFFC]",children:"+"})," ",(0,r.jsx)(Q,{text:"FOR SHOPPERS",tier:"telemetry",instant:t})]}),(0,r.jsx)("h3",{className:"mt-3.5 font-heading text-[24px] leading-[1.15] font-semibold tracking-[-0.03em] text-white sm:text-[28px]",children:(0,r.jsx)(Q,{text:"Find drops worth waiting for.",tier:"headline",instant:t})}),(0,r.jsx)(Q,{tier:"prose",instant:t,delayMs:80,children:(0,r.jsx)("p",{className:"mt-3.5 max-w-[42ch] font-sans text-[15px] leading-[1.66] text-[#D8D1EC]",children:"Discover independent releases on a live clock, check true garment measurements before launch, and get first access without scrolling past ads."})})]}),(0,r.jsxs)("button",{type:"button",onClick:()=>ea("SHOPPER"),className:"mt-6 inline-flex w-fit cursor-pointer items-center gap-1.5 font-mono text-[11.5px] font-medium tracking-[0.14em] text-[#97DFFC] uppercase transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:outline-none",children:[(0,r.jsx)("span",{children:"Join as a shopper"}),(0,r.jsx)(m,{className:"size-3.5"})]})]}),(0,r.jsxs)("div",{"data-spotlight-col":"BRAND",onMouseEnter:()=>C("BRAND"),onFocus:()=>C("BRAND"),className:`flex flex-col justify-between border-t border-[#858AE3]/20 pt-9 transition-opacity duration-200 md:border-t-0 md:pt-0 md:pl-12 lg:pl-16 ${"SHOPPER"===w?"md:opacity-[0.82]":"opacity-100"}`,children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("p",{className:"font-mono text-[11px] font-medium tracking-[0.18em] text-[#A2A7F0] uppercase",children:[(0,r.jsx)("span",{className:"text-[#97DFFC]",children:"+"})," ",(0,r.jsx)(Q,{text:"FOR INDEPENDENT LABELS",tier:"telemetry",instant:t})]}),(0,r.jsx)("h3",{className:"mt-3.5 font-heading text-[24px] leading-[1.15] font-semibold tracking-[-0.03em] text-white sm:text-[28px]",children:(0,r.jsx)(Q,{text:"Launch on your own clock.",tier:"headline",instant:t})}),(0,r.jsx)(Q,{tier:"prose",instant:t,delayMs:80,children:(0,r.jsx)("p",{className:"mt-3.5 max-w-[42ch] font-sans text-[15px] leading-[1.66] text-[#D8D1EC]",children:"Keep your own identity, story, and pricing. Turn every collection into a scheduled release event and build direct repeat buyers without paying ad platforms."})})]}),(0,r.jsxs)("button",{type:"button",onClick:()=>ea("BRAND"),className:"mt-6 inline-flex w-fit cursor-pointer items-center gap-1.5 font-mono text-[11.5px] font-medium tracking-[0.14em] text-[#97DFFC] uppercase transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:outline-none",children:[(0,r.jsx)("span",{children:"Apply as a brand"}),(0,r.jsx)(m,{className:"size-3.5"})]})]})]})]}),(0,r.jsx)(ee,{variant:"arch",instant:t,className:"mb-10 sm:mb-12"}),(0,r.jsxs)("div",{ref:M,className:"grid grid-cols-1 gap-8 border-b border-[#858AE3]/22 pb-12 md:grid-cols-12 md:items-center md:gap-10 sm:pb-14",children:[(0,r.jsxs)("div",{className:"md:col-span-6",children:[(0,r.jsx)("p",{className:"font-mono text-[11px] font-medium tracking-[0.18em] text-[#A2A7F0] uppercase",children:"APP STORE V1.0 \xb7 JANUARY 1, 2027"}),(0,r.jsxs)("h2",{style:{fontSize:"clamp(2.1rem, 4.1vw, 3.25rem)"},className:"mt-3 font-heading leading-[1.04] font-semibold tracking-[-0.035em] text-white",children:[(0,r.jsx)(Q,{text:"Be there at ",tier:"headline",instant:t}),(0,r.jsx)("span",{className:"text-[#97DFFC]",children:(0,r.jsx)(Q,{text:"T-zero.",tier:"headline",instant:t,delayMs:180})})]}),(0,r.jsx)("p",{className:"mt-3.5 max-w-[38ch] font-sans text-[15px] leading-[1.62] text-[#D8D1EC]",children:"Drop your mobile number for launch-day access and scheduled release alerts."})]}),(0,r.jsx)("div",{"data-closing-waitlist":"true",className:"flex md:col-span-6 md:justify-end",children:(0,r.jsx)(Y,{idPrefix:"closing-waitlist",inputRef:S,onOpenLegal:p,requestedRole:f,align:"left",onInteractPulse:q,registrationPulseSeq:g})})]})]}),(0,r.jsxs)("footer",{className:"flex items-center justify-between py-7 font-mono text-[11px] font-medium tracking-[0.1em] text-[#A2A7F0]",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2.5",children:[(0,r.jsx)("button",{type:"button",onClick:()=>p("privacy"),className:"cursor-pointer transition hover:text-white",children:"Privacy"}),(0,r.jsx)("span",{className:"text-[#858AE3]/55",children:"\xb7"}),(0,r.jsx)("button",{type:"button",onClick:()=>p("terms"),className:"cursor-pointer transition hover:text-white",children:"Terms"}),(0,r.jsx)("span",{className:"text-[#858AE3]/55",children:"\xb7"}),(0,r.jsxs)("button",{type:"button","data-replay-intro":"true",onClick:J,className:"inline-flex cursor-pointer items-center gap-1 tracking-[0.12em] uppercase transition hover:text-[#97DFFC] focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:outline-none",children:[(0,r.jsx)("span",{"aria-hidden":"true",children:"↺"}),(0,r.jsx)("span",{children:"REPLAY"})]})]}),(0,r.jsx)("span",{children:"\xa9 2026 T^minus"})]})]})]}),d?(0,r.jsx)("div",{role:"dialog","aria-modal":"true","aria-labelledby":"legal-modal-title",className:"fixed inset-0 z-50 flex items-center justify-center bg-[#040206]/90 px-5",onClick:()=>p(null),children:(0,r.jsxs)("div",{className:"relative w-full max-w-[480px] rounded-[6px] border border-[#858AE3]/30 bg-[#07050D] p-6 text-left sm:p-7",onClick:e=>e.stopPropagation(),children:[(0,r.jsxs)("div",{className:"flex items-start justify-between gap-4",children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("p",{className:"font-mono text-[10.5px] font-medium tracking-[0.16em] text-[#A2A7F0] uppercase",children:[(0,r.jsx)("span",{className:"text-[#97DFFC]",children:"+"})," LEGAL \xb7"," ","privacy"===d?"PRIVACY":"TERMS"]}),(0,r.jsx)("h2",{id:"legal-modal-title",className:"mt-2 font-heading text-[21px] font-semibold tracking-[-0.025em] text-white",children:"privacy"===d?"Privacy Policy":"SMS & Waitlist Terms"})]}),(0,r.jsx)("button",{type:"button",onClick:()=>p(null),"aria-label":"Close",className:"inline-flex size-8 cursor-pointer items-center justify-center rounded-[4px] border border-[#858AE3]/30 bg-[#040206] text-[#DCD5EE] transition hover:border-[#97DFFC]/75 hover:text-white",children:(0,r.jsx)(h,{className:"size-4"})})]}),(0,r.jsx)("div",{className:"mt-4 space-y-3 border-t border-[#858AE3]/20 pt-4 text-[13.5px] leading-[1.64] text-[#DCD5EE]",children:"privacy"===d?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{children:"T^minus collects your mobile phone number, your selected waitlist role (shopper or brand), and an optional brand handle solely to notify you about the January 1, 2027 App Store v1.0 launch, early drop access, and brand onboarding."}),(0,r.jsx)("p",{children:"We never sell, rent, or broker your phone number to third parties. You can opt out at any time by replying STOP to any message."})]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{children:"By checking the SMS consent box and joining the T^minus waitlist, you agree to receive occasional launch-day and live drop text alerts at the mobile number provided. Consent is not a condition of purchase."}),(0,r.jsx)("p",{children:"Message and data rates may apply. Reply STOP to opt out at any time or HELP for support."})]})})]})}):null]})}},7894:(e,t,a)=>{Promise.resolve().then(a.bind(a,6046))}}]);