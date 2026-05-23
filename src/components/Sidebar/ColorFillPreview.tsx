"use client";

import React from "react";
import { getSurfaceFillStyle, getTextFillStyle, isGradient } from "@/utils/colorStyle";
import { cn } from "@/lib/utils";

export interface ColorFillPreviewProps {
  value: string;
  variant?: "surface" | "text";
  className?: string;
}

/** Preview swatch that supports solid colors and CSS gradients */
export default function ColorFillPreview({
  value,
  variant = "surface",
  className,
}: ColorFillPreviewProps) {
  const style =
    variant === "text" ? getTextFillStyle(value) : getSurfaceFillStyle(value);

  if (variant === "text" && isGradient(value)) {
    return (
      <div
        className={cn(
          "h-7 w-7 shrink-0 rounded-md border border-slate-200 dark:border-slate-600",
          className
        )}
        style={getSurfaceFillStyle(value)}
        aria-hidden
      />
    );
  }

  return (
    <div
      className={cn(
        "h-7 w-7 shrink-0 rounded-md border border-slate-200 dark:border-slate-600",
        className
      )}
      style={style}
      aria-hidden
    />
  );
}
