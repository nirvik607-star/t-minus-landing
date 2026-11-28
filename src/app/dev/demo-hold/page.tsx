"use client";

import React, { useEffect, useState } from "react";
import { HoldDemo } from "@/components/demos/hold-demo";

/**
 * The Hold and Standby demo on the page ground, for screenshots. Not linked
 * from the site. Add #inactive to the address to see it with `active` off.
 */
export default function DemoHoldDevPage() {
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
      <HoldDemo active={active} />
    </div>
  );
}
