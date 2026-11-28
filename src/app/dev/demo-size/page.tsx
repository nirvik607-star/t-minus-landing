"use client";

import React, { useEffect, useState } from "react";
import { SizeAssistDemo } from "@/components/demos/size-assist-demo";

/**
 * The Size Assist demo on the page ground, for screenshots. Not linked from
 * the site. Add #inactive to the address to see it with `active` off.
 */
export default function DemoSizeDevPage() {
  const [active, setActive] = useState(true);
  useEffect(() => {
    const read = () => setActive(window.location.hash !== "#inactive");
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);
  return (
    <div
      style={{ background: "#2C0735", minHeight: "100dvh" }}
      className="flex items-center justify-center p-4"
    >
      <SizeAssistDemo active={active} />
    </div>
  );
}
