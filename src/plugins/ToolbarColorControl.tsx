"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PRESET_COLORS } from "@/constants/presetColors";

const TOOLBAR_SWATCHES = PRESET_COLORS.slice(0, 40);

type ToolbarColorControlProps = {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (color: string) => void;
  onClear: () => void;
  allowTransparent?: boolean;
};

export default function ToolbarColorControl({
  label,
  icon,
  value,
  onChange,
  onClear,
  allowTransparent = false,
}: ToolbarColorControlProps) {
  const [open, setOpen] = useState(false);
  const displayColor = value || (allowTransparent ? "transparent" : "#000000");

  const handleSelect = (color: string) => {
    onChange(color);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="toolbar-item spaced toolbar-color-trigger"
          aria-label={label}
          title={label}
        >
          <span className="toolbar-color-icon">{icon}</span>
          <span
            className="toolbar-color-swatch"
            style={{
              backgroundColor: displayColor === "transparent" ? undefined : displayColor,
              backgroundImage:
                displayColor === "transparent"
                  ? "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)"
                  : undefined,
              backgroundSize: displayColor === "transparent" ? "6px 6px" : undefined,
            }}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 p-3" sideOffset={6}>
        <p className="mb-2 text-xs font-medium text-foreground">{label}</p>
        <div className="mb-3 max-h-[180px] overflow-y-auto overscroll-contain">
          <div className="grid grid-cols-8 gap-1.5">
            {allowTransparent && (
              <button
                type="button"
                onClick={() => {
                  onClear();
                  setOpen(false);
                }}
                className="h-6 w-6 rounded-full border border-border"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                  backgroundSize: "6px 6px",
                }}
                aria-label="Remove highlight"
                title="None"
              />
            )}
            {TOOLBAR_SWATCHES.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleSelect(color)}
                className={cn(
                  "h-6 w-6 rounded-full border border-border transition-transform hover:scale-110",
                  value.toLowerCase() === color.toLowerCase() &&
                    "ring-2 ring-indigo-500 ring-offset-1"
                )}
                style={{ backgroundColor: color }}
                aria-label={`Select ${color}`}
                title={color}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-border pt-2">
          <label className="flex flex-1 items-center gap-2 text-xs text-muted-foreground">
            Custom
            <input
              type="color"
              value={value.startsWith("#") && value.length >= 7 ? value.slice(0, 7) : "#000000"}
              onChange={(e) => onChange(e.target.value)}
              className="h-7 w-full min-w-0 cursor-pointer rounded border border-border bg-background p-0.5"
            />
          </label>
          {value && (
            <button
              type="button"
              onClick={() => {
                onClear();
                setOpen(false);
              }}
              className="shrink-0 rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              Reset
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
