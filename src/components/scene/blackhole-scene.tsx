"use client";

import React, { useEffect, useRef } from "react";
import { FS_GLYPH, FS_SCENE, VS_FULLSCREEN } from "@/lib/scene/shaders";
import { buildGlyphAtlas } from "@/lib/scene/glyph-atlas";
import {
  INTRO_RETURNING_SECONDS,
  INTRO_SECONDS,
  clamp01,
  direct,
  type SceneValues,
} from "@/lib/scene/director";
import { LAUNCH_TARGET_MS } from "@/lib/waitlist";

export interface SceneFrame extends SceneValues {
  w: number;
  h: number;
  /** True once the intro has finished (or was skipped). */
  settled: boolean;
  pin: number;
  exitPx: number;
  closing: number;
}

/** Values the page feeds the scene each frame without re-rendering. */
export interface SceneInputs {
  /** CSS px from the top of the viewport; the field stays clear above it. 0 = off. */
  fadeLine: number;
  /** 0..1 through the features section. */
  turn?: number;
  /** 0..1 urgency reported by the demo on screen. */
  energy?: number;
  /** Wide screens: the ring that frames the pinned demo, in CSS px. */
  stage?: { cx: number; cy: number; r: number; guardX: number } | null;
}

export interface SceneControl {
  skipIntro: () => void;
  replayIntro: () => void;
  /** A brightening that travels out through the disk. */
  pulse: (strength?: number) => void;
}

interface BlackholeSceneProps {
  /** The sticky runway wrapper: its scroll range drives the camera. */
  runwayRef: React.RefObject<HTMLElement | null>;
  /** The closing section: the horizon returns as it arrives. */
  closingRef: React.RefObject<HTMLElement | null>;
  controlRef?: React.MutableRefObject<SceneControl | null>;
  inputsRef?: React.MutableRefObject<SceneInputs>;
  /** Called every rendered frame so the page can place DOM against the scene. */
  onFrame?: (frame: SceneFrame) => void;
  /** Called once if WebGL2 is unavailable. */
  onUnavailable?: () => void;
}

const SEEN_KEY = "tminus-intro-seen";

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh);
    gl.deleteShader(sh);
    throw new Error(`Shader compile failed: ${log}`);
  }
  return sh;
}

function link(gl: WebGL2RenderingContext, fsSrc: string) {
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VS_FULLSCREEN));
  gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, fsSrc));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    throw new Error(`Program link failed: ${gl.getProgramInfoLog(prog)}`);
  }
  const cache = new Map<string, WebGLUniformLocation | null>();
  const u = (name: string) => {
    if (!cache.has(name)) cache.set(name, gl.getUniformLocation(prog, name));
    return cache.get(name)!;
  };
  return { prog, u };
}

export function BlackholeScene({
  runwayRef,
  closingRef,
  controlRef,
  inputsRef,
  onFrame,
  onUnavailable,
}: BlackholeSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const onFrameRef = useRef(onFrame);
  onFrameRef.current = onFrame;
  const onUnavailableRef = useRef(onUnavailable);
  onUnavailableRef.current = onUnavailable;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const qs = new URLSearchParams(window.location.search);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const pinnedIntro = qs.has("introAt") ? Number(qs.get("introAt")) : null;
    const frozen = qs.get("still") === "1";
    const frozenTime = Number(qs.get("time") ?? "12.3");
    const forceSettled = qs.get("skipIntro") === "1" || qs.has("shot");

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });
    if (!gl) {
      onUnavailableRef.current?.();
      return;
    }

    let disposed = false;
    let raf = 0;
    let scene: ReturnType<typeof link>;
    let glyph: ReturnType<typeof link>;
    try {
      scene = link(gl, FS_SCENE);
      glyph = link(gl, FS_GLYPH);
    } catch (err) {
      console.error(err);
      onUnavailableRef.current?.();
      return;
    }

    const vao = gl.createVertexArray();
    const sceneTex = gl.createTexture()!;
    const atlasTex = gl.createTexture()!;
    const fbo = gl.createFramebuffer()!;

    // ---- layout state ----
    let w = 0;
    let h = 0;
    let dpr = 1;
    let cellDev = 16;
    let cols = 1;
    let rows = 1;
    let originXDev = 0;
    let originYDev = 0;
    let glyphCount = 7;
    let rampCount = 6;
    let signalIndex = 8;
    let atlasReady = false;
    let fontFamily = "ui-monospace, monospace";

    const layout = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      // Phones get their full density: the glyph pass is cheap and small type needs it.
      dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), w < 700 ? 3 : 2);
      const W = Math.round(w * dpr);
      const H = Math.round(h * dpr);
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
      }
      const cellCss = w < 700 ? 6 : Math.min(10, Math.max(7, Math.round(w / 175)));
      const nextCell = Math.max(6, Math.round(cellCss * dpr));
      const cellChanged = nextCell !== cellDev;
      cellDev = nextCell;
      // A cell boundary sits on the vertical centre line; rows hang from the top.
      originXDev = ((W / 2) % cellDev) - cellDev;
      cols = Math.ceil((W - originXDev) / cellDev);
      rows = Math.ceil(H / cellDev);
      originYDev = H - rows * cellDev;

      gl.bindTexture(gl.TEXTURE_2D, sceneTex);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA8,
        cols,
        rows,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null
      );
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        gl.LINEAR_MIPMAP_LINEAR
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        sceneTex,
        0
      );
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      if (cellChanged || !atlasReady) buildAtlas();
      measureAnchors();
    };

    const buildAtlas = () => {
      const atlas = buildGlyphAtlas(cellDev, cellDev, fontFamily);
      glyphCount = atlas.order.length;
      rampCount = atlas.ramp;
      signalIndex = atlas.signal;
      gl.bindTexture(gl.TEXTURE_2D, atlasTex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        atlas.canvas
      );
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      atlasReady = true;
    };

    // ---- scroll anchors (measured off-frame, never during render) ----
    const anchors = { runwayTop: 0, runwayTravel: 1, closingTop: 1e9, docMax: 1e9 };
    const measureAnchors = () => {
      const sy = window.scrollY;
      const run = runwayRef.current;
      if (run) {
        const r = run.getBoundingClientRect();
        anchors.runwayTop = r.top + sy;
        anchors.runwayTravel = Math.max(1, r.height - h);
      }
      const closing = closingRef.current;
      anchors.closingTop = closing
        ? closing.getBoundingClientRect().top + sy
        : 1e9;
      anchors.docMax = closing
        ? Math.max(1, document.documentElement.scrollHeight - h)
        : 1e9;
    };

    // ---- pointer (fine pointers only) ----
    const pointer = { tx: 0, ty: 0, x: 0, y: 0 };
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      pointer.tx = (e.clientX / Math.max(1, w)) * 2 - 1;
      pointer.ty = (e.clientY / Math.max(1, h)) * 2 - 1;
    };

    // ---- intro clock ----
    let introClock = INTRO_SECONDS;
    let introRate = 1;
    let settledNotified = false;
    const startIntro = (fromStart: boolean) => {
      let seen = false;
      try {
        seen = window.sessionStorage.getItem(SEEN_KEY) === "1";
      } catch {
        seen = false;
      }
      if (reducedMotion || forceSettled || window.scrollY > 8) {
        introClock = INTRO_SECONDS;
      } else if (seen && !fromStart) {
        introClock = INTRO_SECONDS - INTRO_RETURNING_SECONDS;
      } else {
        introClock = 0;
      }
      introRate = 1;
      settledNotified = false;
    };
    const hurryIntro = () => {
      if (introClock < INTRO_SECONDS) introRate = 7;
    };

    // ---- pulses ----
    let pulseStart = -10;
    let pulseStrength = 0;

    if (controlRef) {
      controlRef.current = {
        skipIntro: hurryIntro,
        replayIntro: () => {
          introClock = 0;
          introRate = 1;
          settledNotified = false;
        },
        pulse: (strength = 0.5) => {
          pulseStart = performance.now() / 1000;
          pulseStrength = strength;
        },
      };
    }

    // ---- frame ----
    let last = performance.now();
    let sceneTime = frozen ? frozenTime : 0;
    let slowFrames = 0;
    let energySmooth = 0;
    let samples = 4;
    let ema = 16;

    const frame = (now: number) => {
      if (disposed) return;
      raf = window.requestAnimationFrame(frame);
      const dt = Math.min(0.1, Math.max(0, (now - last) / 1000));
      last = now;
      if (!atlasReady) return;

      if (!frozen && !reducedMotion) sceneTime += dt;
      if (pinnedIntro !== null && Number.isFinite(pinnedIntro)) {
        introClock = pinnedIntro;
      } else if (introClock < INTRO_SECONDS) {
        introClock = Math.min(INTRO_SECONDS, introClock + dt * introRate);
      }

      energySmooth += ((inputsRef?.current.energy ?? 0) - energySmooth) * Math.min(1, dt * 2.2);
      pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 3.2);
      pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 3.2);

      const sy = window.scrollY;
      const pin = clamp01((sy - anchors.runwayTop) / anchors.runwayTravel);
      const exitPx = Math.max(
        0,
        sy - (anchors.runwayTop + anchors.runwayTravel)
      );
      // The pull-out runs as the closing section scrolls into place.
      const closingSpan = h * 0.85;
      const closing = clamp01((sy - (anchors.docMax - closingSpan)) / closingSpan);
      const secondsLeft = Math.floor(
        Math.max(0, LAUNCH_TARGET_MS - Date.now()) / 1000
      );

      const v = direct({
        w,
        h,
        time: sceneTime,
        intro: introClock,
        pin,
        exitPx,
        closing,
        px: finePointer && !reducedMotion ? pointer.x : 0,
        py: finePointer && !reducedMotion ? pointer.y : 0,
        secondsLeft,
        turn: inputsRef?.current.turn,
        clearY: inputsRef?.current.fadeLine,
        energy: energySmooth,
        stage: inputsRef?.current.stage,
      });

      const settled = introClock >= INTRO_SECONDS;
      // Once the hero has arrived the intro counts as seen, even if the tab closes right then.
      if ((settled || v.heroReveal > 0.99) && !settledNotified) {
        settledNotified = true;
        try {
          window.sessionStorage.setItem(SEEN_KEY, "1");
        } catch {
          // storage unavailable: the intro simply plays again next time
        }
      }

      onFrameRef.current?.({ ...v, w, h, settled, pin, exitPx, closing });

      const W = canvas.width;
      const H = canvas.height;
      if (v.alpha <= 0.002) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, W, H);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        return;
      }

      const pulseAge = now / 1000 - pulseStart;
      const pulse =
        pulseAge >= 0 && pulseAge < 1.2
          ? pulseStrength * (1 - pulseAge / 1.2)
          : 0;
      const pulseR = v.diskIn + (v.diskOut - v.diskIn) * (pulseAge / 1.0);

      // ---- pass 1: light per cell ----
      gl.bindVertexArray(vao);
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.viewport(0, 0, cols, rows);
      gl.useProgram(scene.prog);
      const cellCss = cellDev / dpr;
      gl.uniform2f(scene.u("uCellPx"), cellCss, cellCss);
      gl.uniform2f(scene.u("uOriginPx"), originXDev / dpr, originYDev / dpr);
      gl.uniform2f(scene.u("uHolePx"), v.holeX, h - v.holeY);
      gl.uniform1f(scene.u("uFocalPx"), v.focalPx);
      gl.uniform3fv(scene.u("uCamPos"), v.camPos);
      gl.uniform3fv(scene.u("uCamRight"), v.camRight);
      gl.uniform3fv(scene.u("uCamUp"), v.camUp);
      gl.uniform3fv(scene.u("uCamFwd"), v.camFwd);
      gl.uniform1f(scene.u("uTime"), sceneTime);
      gl.uniform1f(scene.u("uMass"), v.mass);
      gl.uniform1f(scene.u("uDisk"), v.disk);
      gl.uniform1f(scene.u("uDiskIn"), v.diskIn);
      gl.uniform1f(scene.u("uDiskOut"), v.diskOut);
      gl.uniform1f(scene.u("uSpin"), v.spin);
      gl.uniform1f(scene.u("uExposure"), v.exposure);
      gl.uniform1f(scene.u("uStar"), v.star);
      gl.uniform1f(scene.u("uStarR"), v.starR);
      gl.uniform1f(scene.u("uStarGain"), v.starGain);
      gl.uniform1f(scene.u("uStarPx"), v.starPx);
      gl.uniform1f(scene.u("uFlood"), v.flood);
      gl.uniform1f(scene.u("uFloodR"), v.floodR);
      gl.uniform1f(scene.u("uDrainR"), v.drainR);
      gl.uniform1f(scene.u("uHand"), v.hand);
      gl.uniform1f(scene.u("uHandAngle"), v.handAngle);
      gl.uniform1f(scene.u("uPulse"), pulse);
      gl.uniform1f(scene.u("uPulseR"), pulseR);
      gl.uniform1i(scene.u("uSamples"), samples);
      // The ring is thinner than a cell at any size; widen it to about 1.4 cells so it survives.
      gl.uniform1f(scene.u("uRingK"), Math.max(8, v.shadowR / (1.4 * cellCss)));
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // ---- pass 2: glyphs ----
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, W, H);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(glyph.prog);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, sceneTex);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.uniform1i(glyph.u("uScene"), 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, atlasTex);
      gl.uniform1i(glyph.u("uAtlas"), 1);
      gl.uniform2f(glyph.u("uCellDev"), cellDev, cellDev);
      gl.uniform2f(glyph.u("uOriginDev"), originXDev, originYDev);
      gl.uniform2f(glyph.u("uGrid"), cols, rows);
      gl.uniform1f(glyph.u("uGlyphs"), glyphCount);
      gl.uniform1f(glyph.u("uRamp"), rampCount);
      gl.uniform2f(glyph.u("uHoleDev"), v.holeX * dpr, (h - v.holeY) * dpr);
      gl.uniform1f(glyph.u("uShadowDev"), v.shadowR * dpr);
      gl.uniform1f(glyph.u("uVoid"), v.voidAlpha);
      gl.uniform1f(glyph.u("uTime"), sceneTime);
      gl.uniform1f(
        glyph.u("uShimmer"),
        frozen || reducedMotion ? 0 : v.shimmer
      );
      gl.uniform1f(glyph.u("uStars"), v.stars);
      gl.uniform1f(glyph.u("uAlpha"), v.alpha);
      gl.uniform1f(glyph.u("uCut"), v.cut);
      gl.uniform1f(glyph.u("uFadeXDev"), v.fadeX > 0 ? v.fadeX * dpr : W * 4);
      gl.uniform1f(glyph.u("uDpr"), dpr);
      const fadeLine = inputsRef?.current.fadeLine ?? 0;
      const guard = fadeLine > 0 ? v.fadeGuard : 0;
      // Guard off: push the line far above the canvas.
      gl.uniform1f(
        glyph.u("uFadeLineDev"),
        guard > 0.001 ? (h - fadeLine) * dpr + (1 - guard) * H : H * 4
      );
      gl.uniform1f(glyph.u("uFadeSoftDev"), 72 * dpr);
      gl.uniform1f(glyph.u("uGlow"), v.glow);
      gl.uniform1f(glyph.u("uWell"), v.well);
      gl.uniform1f(glyph.u("uWellDev"), v.wellPx * dpr);
      gl.uniform1f(glyph.u("uSignal"), signalIndex);
      gl.uniform1f(glyph.u("uPolar"), v.polar);
      gl.uniform1f(glyph.u("uFront"), v.front);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      canvas.dataset.sceneReady = "true";

      // Governor: fewer rays per cell if the device can't hold the frame.
      ema += (dt * 1000 - ema) * 0.08;
      if (ema > 24) slowFrames += 1;
      else slowFrames = Math.max(0, slowFrames - 2);
      if (slowFrames > 45 && samples > 1 && !frozen) {
        samples = samples === 4 ? 2 : 1;
        slowFrames = 0;
      }
    };

    // ---- events ----
    const onResize = () => layout();
    const onVisibility = () => {
      window.cancelAnimationFrame(raf);
      if (!document.hidden) {
        last = performance.now();
        raf = window.requestAnimationFrame(frame);
      }
    };
    const onLoadSettle = () => measureAnchors();
    const onIntent = () => hurryIntro();

    const boot = async () => {
      const cssFamily = getComputedStyle(document.documentElement)
        .getPropertyValue("--font-ibm-plex-mono")
        .trim();
      if (cssFamily) fontFamily = `${cssFamily}, ui-monospace, monospace`;
      try {
        // Every weight the ramp draws a T in.
        await Promise.all(
          [400, 500, 600, 700].map((wt) => document.fonts.load(`${wt} 20px ${fontFamily}`))
        );
      } catch {
        // fall back to whatever monospace is available
      }
      if (disposed) return;
      layout();
      startIntro(false);
      last = performance.now();
      raf = window.requestAnimationFrame(frame);
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("load", onLoadSettle);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("wheel", onIntent, { passive: true });
    window.addEventListener("touchstart", onIntent, { passive: true });
    window.addEventListener("keydown", onIntent);
    // Section positions move when the page's height does (fonts, layout switches).
    const remeasure = new ResizeObserver(() => measureAnchors());
    remeasure.observe(document.body);
    void boot();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(raf);
      remeasure.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onLoadSettle);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("wheel", onIntent);
      window.removeEventListener("touchstart", onIntent);
      window.removeEventListener("keydown", onIntent);
      if (controlRef) controlRef.current = null;
      gl.deleteTexture(sceneTex);
      gl.deleteTexture(atlasTex);
      gl.deleteFramebuffer(fbo);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(scene.prog);
      gl.deleteProgram(glyph.prog);
    };
  }, [runwayRef, closingRef, controlRef, inputsRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2] h-full w-full"
    />
  );
}
