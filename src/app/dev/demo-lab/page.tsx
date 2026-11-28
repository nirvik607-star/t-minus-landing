"use client";

import { LabDemo } from "@/components/demos/lab-demo";

/** The Lab demo alone on the page ground, for screenshots. Not linked from the site. */
export default function LabDemoDevPage() {
  return (
    <div
      className="flex min-h-[100dvh] items-center justify-center p-4"
      style={{ background: "#2C0735" }}
    >
      <LabDemo active />
    </div>
  );
}
