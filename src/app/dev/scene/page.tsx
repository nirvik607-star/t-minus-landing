"use client";

import React, { useRef } from "react";
import { BlackholeScene } from "@/components/scene/blackhole-scene";

/** Bare scene on the page ground, for renderer work. Not linked from the site. */
export default function SceneDevPage() {
  const runwayRef = useRef<HTMLDivElement | null>(null);
  const closingRef = useRef<HTMLDivElement | null>(null);
  return (
    <div style={{ background: "#2C0735", minHeight: "100dvh" }}>
      <BlackholeScene runwayRef={runwayRef} closingRef={closingRef} />
      <div ref={runwayRef} data-runway style={{ height: "220dvh" }} />
      <div style={{ height: "160dvh" }} />
      <div ref={closingRef} data-section="closing" style={{ height: "100dvh" }} />
    </div>
  );
}
