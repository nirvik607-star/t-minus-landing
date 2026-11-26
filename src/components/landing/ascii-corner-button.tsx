"use client";

import React from "react";

export type AsciiCornerButtonVariant = "primary" | "dark";

interface AsciiCornerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * - `primary`: High-contrast matte white architectural button with `#040206` ink.
   *   Hover highlight is subtle (`#E8F7FE`) and strictly gated behind `@media (hover: hover)`
   *   so touch devices never suffer sticky cyan hover tint.
   * - `dark`: Matte `#07050D` obsidian surface with crisp `1px` `#858AE3/35` border.
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
      ? "bg-white text-[#040206] border border-white [@media(hover:hover)]:hover:bg-[#E8F7FE] [@media(hover:hover)]:hover:border-[#E8F7FE]"
      : "bg-[#07050D] text-white border border-[#858AE3]/35 [@media(hover:hover)]:hover:border-[#97DFFC]/75 [@media(hover:hover)]:hover:text-[#97DFFC]";

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
