"use client";

import { ClockDemo } from "@/components/demos/clock-demo";
import { DropsHomeDemo } from "@/components/demos/drops-home-demo";

export default function Page() {
  return (
    <div className="flex min-h-[100dvh] flex-wrap items-start justify-center gap-8 bg-ground p-6">
      <DropsHomeDemo active />
      <ClockDemo active />
    </div>
  );
}
