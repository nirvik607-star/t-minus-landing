"use client";

import React from "react";
import { HoldDemo } from "@/components/demos/hold-demo";

/** The Hold and Standby demo on the page ground, for screenshots. Not linked from the site. */
export default function DemoHoldDevPage() {
  return (
    <div
      style={{ background: "#2C0735", minHeight: "100dvh" }}
      className="flex items-center justify-center p-4"
    >
      <HoldDemo active />
    </div>
  );
}
