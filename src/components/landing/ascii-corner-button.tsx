"use client";

import React from "react";

export type AsciiCornerButtonVariant = "primary" | "dark";

interface AsciiCornerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * - `primary`: High-contrast matte white architectural button with `#040206` ink.
   * - `dark`: Matte `#07050D` obsidian surface with crisp `1px` `#858AE3/30` border.
   */
  variant?: AsciiCornerButtonVariant;
  /** Architectural rounded geometry (`rect` default, optional `pill`). */
  shape?: "rect" | "pill";
}

export function AsciiCornerButton({
  variant = "primary",
  shape = "rect",
  className = "",
  children,
  disabled,
  ...rest
}: AsciiCornerButtonProps) {
  const shapeClass = shape === "pill" ? "rounded-full" : "rounded-[6px]";
  const polarityClass =
    variant === "primary"
      ? "bg-white text-[#040206] border border-white hover:bg-[#97DFFC] hover:border-[#97DFFC]"
      : "bg-[#07050D] text-white border border-[#858AE3]/30 hover:border-[#97DFFC]/70 hover:text-[#97DFFC]";

  return (
    <button
      disabled={disabled}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 font-sans font-semibold tracking-[-0.01em] transition-colors duration-150 active:translate-y-px focus-visible:ring-1 focus-visible:ring-[#97DFFC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#040206] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${shapeClass} ${polarityClass} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
