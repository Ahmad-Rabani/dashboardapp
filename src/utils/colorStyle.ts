import type { CSSProperties } from "react";
import { css } from "styled-components";

export function isGradient(value: string): boolean {
  return /(?:linear|radial|conic)-gradient\s*\(/i.test(value ?? "");
}

/** Inline style for surfaces (header, footer, image backgrounds) */
export function getSurfaceFillStyle(value: string): CSSProperties {
  if (!value) return {};
  if (isGradient(value)) {
    return { background: value, backgroundColor: "transparent" };
  }
  return { backgroundColor: value };
}

/** Inline style for text / link color swatches and gradient text */
export function getTextFillStyle(value: string): CSSProperties {
  if (!value) return {};
  if (isGradient(value)) {
    return {
      background: value,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      color: "transparent",
    };
  }
  return { color: value };
}

/** styled-components helper for block backgrounds */
export function surfaceFillCss(value: string) {
  if (isGradient(value)) {
    return css`
      background: ${value};
      background-color: transparent;
    `;
  }
  return css`
    background-color: ${value};
  `;
}

/** styled-components helper for text colors (supports gradient text) */
export function textFillCss(value: string) {
  if (isGradient(value)) {
    return css`
      background: ${value};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
    `;
  }
  return css`
    color: ${value};
  `;
}

export interface ParsedGradient {
  type: "linear" | "radial";
  angle: number;
  stops: string[];
}

export function parseGradient(value: string): ParsedGradient | null {
  if (!isGradient(value)) return null;

  const linearMatch = value.match(
    /linear-gradient\(\s*(\d+(?:\.\d+)?)deg\s*,\s*(.+)\s*\)/i
  );
  if (linearMatch) {
    return {
      type: "linear",
      angle: Number(linearMatch[1]),
      stops: splitGradientStops(linearMatch[2]),
    };
  }

  const radialMatch = value.match(
    /radial-gradient\(\s*(?:circle\s*,)?\s*(.+)\s*\)/i
  );
  if (radialMatch) {
    return {
      type: "radial",
      angle: 0,
      stops: splitGradientStops(radialMatch[1]),
    };
  }

  return null;
}

function splitGradientStops(stopsStr: string): string[] {
  const stops: string[] = [];
  let current = "";
  let depth = 0;

  for (const char of stopsStr) {
    if (char === "(") depth += 1;
    if (char === ")") depth -= 1;
    if (char === "," && depth === 0) {
      if (current.trim()) stops.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }

  if (current.trim()) stops.push(current.trim());
  return stops.length > 0 ? stops : ["#6366f1", "#8b5cf6"];
}

export function buildGradientCss(
  type: "linear" | "radial",
  angle: number,
  stops: string[]
): string {
  const colorStops = stops.join(", ");
  if (type === "radial") {
    return `radial-gradient(circle, ${colorStops})`;
  }
  return `linear-gradient(${angle}deg, ${colorStops})`;
}
