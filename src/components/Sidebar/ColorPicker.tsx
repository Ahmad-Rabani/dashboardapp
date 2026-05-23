"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PRESET_COLORS } from "@/constants/presetColors";

export { PRESET_COLORS };

export interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  isMobile?: boolean;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleaned = hex.replace("#", "");
  if (!/^[0-9A-Fa-f]{6}$/.test(cleaned)) return null;
  return {
    r: parseInt(cleaned.slice(0, 2), 16),
    g: parseInt(cleaned.slice(2, 4), 16),
    b: parseInt(cleaned.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b]
    .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0"))
    .join("")}`;
}

function parseColor(value: string): {
  r: number;
  g: number;
  b: number;
  opacity: number;
  hex: string;
} {
  const rgbaMatch = value.match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/
  );
  if (rgbaMatch) {
    const r = Number(rgbaMatch[1]);
    const g = Number(rgbaMatch[2]);
    const b = Number(rgbaMatch[3]);
    const opacity = rgbaMatch[4] !== undefined ? Number(rgbaMatch[4]) : 1;
    return { r, g, b, opacity, hex: rgbToHex(r, g, b) };
  }

  const rgb = hexToRgb(value);
  if (rgb) {
    return { ...rgb, opacity: 1, hex: value.startsWith("#") ? value : `#${value}` };
  }

  return { r: 99, g: 102, b: 241, opacity: 1, hex: "#6366f1" };
}

function formatColor(r: number, g: number, b: number, opacity: number): string {
  if (opacity < 1) {
    return `rgba(${r}, ${g}, ${b}, ${opacity.toFixed(2)})`;
  }
  return rgbToHex(r, g, b);
}

interface GradientStop {
  id: string;
  color: string;
}

function MiniPresetGrid({
  selected,
  onSelect,
  columns = 8,
}: {
  selected: string;
  onSelect: (color: string) => void;
  columns?: number;
}) {
  const colClass =
    columns === 5
      ? "grid-cols-5"
      : columns === 6
        ? "grid-cols-6"
        : "grid-cols-8";

  return (
    <div className="max-h-[220px] overflow-y-auto overscroll-contain pr-1">
      <div className={cn("grid gap-1.5", colClass)}>
        {PRESET_COLORS.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onSelect(color)}
            className={cn(
              "h-7 w-7 rounded-full border border-border transition-transform hover:scale-110",
              selected.toLowerCase() === color.toLowerCase() &&
                "ring-2 ring-indigo-500 ring-offset-2 ring-offset-background"
            )}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
            title={color}
          />
        ))}
      </div>
    </div>
  );
}

export default function ColorPicker({
  value,
  onChange,
  isMobile = false,
}: ColorPickerProps) {
  const parsed = useMemo(() => parseColor(value), [value]);
  const [r, setR] = useState(parsed.r);
  const [g, setG] = useState(parsed.g);
  const [b, setB] = useState(parsed.b);
  const [opacity, setOpacity] = useState(Math.round(parsed.opacity * 100));
  const [hexInput, setHexInput] = useState(parsed.hex);

  const [gradientType, setGradientType] = useState<"linear" | "radial">("linear");
  const [gradientAngle, setGradientAngle] = useState(135);
  const [stops, setStops] = useState<GradientStop[]>([
    { id: "1", color: "#6366f1" },
    { id: "2", color: "#8b5cf6" },
  ]);
  const [activeStopId, setActiveStopId] = useState<string | null>(null);

  useEffect(() => {
    const next = parseColor(value);
    setR(next.r);
    setG(next.g);
    setB(next.b);
    setOpacity(Math.round(next.opacity * 100));
    setHexInput(next.hex);
  }, [value]);

  const currentColor = formatColor(r, g, b, opacity / 100);

  const applyRgb = useCallback(
    (nr: number, ng: number, nb: number, nOpacity = opacity) => {
      setR(nr);
      setG(ng);
      setB(nb);
      setHexInput(rgbToHex(nr, ng, nb));
      onChange(formatColor(nr, ng, nb, nOpacity / 100));
    },
    [onChange, opacity]
  );

  const handleHexChange = (raw: string) => {
    const val = raw.startsWith("#") ? raw : `#${raw}`;
    setHexInput(val);
    const rgb = hexToRgb(val);
    if (rgb) {
      applyRgb(rgb.r, rgb.g, rgb.b);
    }
  };

  const handleOpacityChange = (vals: number[]) => {
    const next = vals[0] ?? 100;
    setOpacity(next);
    onChange(formatColor(r, g, b, next / 100));
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* clipboard unavailable */
    }
  };

  const gradientCss = useMemo(() => {
    const colorStops = stops.map((s) => s.color).join(", ");
    if (gradientType === "radial") {
      return `radial-gradient(circle, ${colorStops})`;
    }
    return `linear-gradient(${gradientAngle}deg, ${colorStops})`;
  }, [gradientType, gradientAngle, stops]);

  const gridCols = isMobile ? 6 : 8;

  return (
    <Tabs defaultValue="presets" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-muted p-1">
        <TabsTrigger value="presets" className="text-xs">
          Presets
        </TabsTrigger>
        <TabsTrigger value="custom" className="text-xs">
          Custom
        </TabsTrigger>
        <TabsTrigger value="gradient" className="text-xs">
          Gradient
        </TabsTrigger>
      </TabsList>

      <TabsContent value="presets" className="mt-3">
        <MiniPresetGrid
          selected={value.startsWith("linear") || value.startsWith("radial") ? "" : value}
          onSelect={onChange}
          columns={gridCols}
        />
      </TabsContent>

      <TabsContent value="custom" className="mt-3 space-y-4">
        <div className="flex items-center gap-2">
          <div
            className="h-8 w-8 shrink-0 rounded-md border border-border"
            style={{ backgroundColor: currentColor }}
          />
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              #
            </span>
            <Input
              value={hexInput.replace("#", "")}
              onChange={(e) => handleHexChange(e.target.value)}
              className="border-input bg-background pl-6 text-sm text-foreground"
              maxLength={6}
            />
          </div>
        </div>

        {(["R", "G", "B"] as const).map((channel, idx) => {
          const channelValue = [r, g, b][idx];
          const gradient =
            channel === "R"
              ? "linear-gradient(to right, #000, #ff0000)"
              : channel === "G"
                ? "linear-gradient(to right, #000, #00ff00)"
                : "linear-gradient(to right, #000, #0000ff)";

          return (
            <div key={channel} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium text-foreground">{channel}</Label>
                <span className="text-xs text-muted-foreground">
                  {channel}: {channelValue}
                </span>
              </div>
              <div
                className="rounded-full p-0.5"
                style={{ background: gradient }}
              >
                <Slider
                  value={[channelValue]}
                  min={0}
                  max={255}
                  step={1}
                  onValueChange={(vals) => {
                    const v = vals[0] ?? 0;
                    if (channel === "R") applyRgb(v, g, b);
                    else if (channel === "G") applyRgb(r, v, b);
                    else applyRgb(r, g, v);
                  }}
                  className="[&_.bg-primary]:bg-white/90 [&_.bg-secondary]:bg-black/20"
                />
              </div>
            </div>
          );
        })}

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-medium text-foreground">Opacity</Label>
            <span className="text-xs text-muted-foreground">Opacity: {opacity}%</span>
          </div>
          <div
            className="rounded-full p-0.5"
            style={{
              backgroundImage:
                "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
              backgroundSize: "8px 8px",
              backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
            }}
          >
            <Slider
              value={[opacity]}
              min={0}
              max={100}
              step={1}
              onValueChange={handleOpacityChange}
              className="[&_.bg-primary]:bg-indigo-500 [&_.bg-secondary]:bg-transparent"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div
            className="h-[60px] w-full rounded-xl border border-border"
            style={{ backgroundColor: currentColor }}
          />
          <div className="flex items-center justify-between gap-2">
            <code className="truncate text-xs text-muted-foreground">{currentColor}</code>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="shrink-0 text-muted-foreground hover:text-foreground"
              onClick={() => copyToClipboard(currentColor)}
            >
              <FontAwesomeIcon icon={faCopy} className="mr-1 h-3 w-3" />
              Copy
            </Button>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="gradient" className="mt-3 space-y-4">
        <Tabs
          value={gradientType}
          onValueChange={(v) => setGradientType(v as "linear" | "radial")}
        >
          <TabsList className="grid w-full grid-cols-2 bg-muted p-1">
            <TabsTrigger value="linear" className="text-xs">
              Linear
            </TabsTrigger>
            <TabsTrigger value="radial" className="text-xs">
              Radial
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-2">
          <Label className="text-xs font-medium text-foreground">Color Stops</Label>
          <div className="flex flex-wrap gap-2">
            {stops.map((stop) => (
              <div key={stop.id} className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setActiveStopId(activeStopId === stop.id ? null : stop.id)
                  }
                  className={cn(
                    "h-9 w-9 rounded-full border-2 transition-transform hover:scale-110",
                    activeStopId === stop.id
                      ? "border-indigo-400"
                      : "border-border"
                  )}
                  style={{ backgroundColor: stop.color }}
                />
                {activeStopId === stop.id && (
                  <div className="absolute left-0 top-11 z-10 w-[200px] rounded-lg border border-border bg-popover p-2 shadow-xl">
                    <MiniPresetGrid
                      selected={stop.color}
                      onSelect={(c) => {
                        setStops((prev) =>
                          prev.map((s) =>
                            s.id === stop.id ? { ...s, color: c } : s
                          )
                        );
                      }}
                      columns={5}
                    />
                  </div>
                )}
              </div>
            ))}
            {stops.length < 4 && (
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="h-9 w-9 rounded-full border-border bg-muted text-foreground"
                onClick={() =>
                  setStops((prev) => [
                    ...prev,
                    { id: String(Date.now()), color: "#ec4899" },
                  ])
                }
              >
                +
              </Button>
            )}
            {stops.length > 2 && (
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="h-9 w-9 rounded-full border-border bg-muted text-foreground"
                onClick={() => setStops((prev) => prev.slice(0, -1))}
              >
                −
              </Button>
            )}
          </div>
        </div>

        {gradientType === "linear" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium text-foreground">Angle</Label>
              <span className="text-xs text-muted-foreground">{gradientAngle}°</span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="relative h-12 w-12 shrink-0 rounded-full border border-border"
                style={{
                  background: `conic-gradient(from 0deg, #6366f1, #8b5cf6, #6366f1)`,
                }}
              >
                <div
                  className="absolute inset-1 rounded-full bg-muted"
                  style={{
                    transform: `rotate(${gradientAngle}deg)`,
                  }}
                >
                  <div className="absolute left-1/2 top-0 h-1/2 w-0.5 -translate-x-1/2 bg-indigo-400" />
                </div>
              </div>
              <Slider
                value={[gradientAngle]}
                min={0}
                max={360}
                step={1}
                onValueChange={(vals) => setGradientAngle(vals[0] ?? 0)}
                className="flex-1"
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div
            className="h-[60px] w-full rounded-xl border border-border"
            style={{ background: gradientCss }}
          />
          <div className="flex items-center justify-between gap-2">
            <Badge
              variant="outline"
              className="max-w-full truncate border-border bg-muted font-mono text-[10px] text-muted-foreground"
            >
              {gradientCss}
            </Badge>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="shrink-0 text-muted-foreground hover:text-foreground"
              onClick={() => {
                onChange(gradientCss);
                copyToClipboard(gradientCss);
              }}
            >
              <FontAwesomeIcon icon={faCopy} className="mr-1 h-3 w-3" />
              Copy
            </Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
