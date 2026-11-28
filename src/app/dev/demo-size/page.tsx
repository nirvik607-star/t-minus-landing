"use client";

import React from "react";
import { SizeAssistDemo } from "@/components/demos/size-assist-demo";

/** The Size Assist demo on the page ground, for screenshots. Not linked from the site. */
export default function DemoSizeDevPage() {
  return (
    <div
      style={{ background: "#2C0735", minHeight: "100dvh" }}
      className="flex items-center justify-center p-4"
    >
      <SizeAssistDemo active />
    </div>
  );
}
