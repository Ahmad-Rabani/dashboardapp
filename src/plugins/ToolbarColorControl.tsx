"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PRESET_COLORS } from "@/constants/presetColors";
import { Z_INDEX } from "@/styles/zIndex";

const TOOLBAR_SWATCHES = PRESET_COLORS.slice(0, 40);

/** Keeps Lexical text selection when interacting with toolbar controls. */
export function preventEditorFocusLoss(event: React.MouseEvent) {
  event.preventDefault();
}

type ToolbarColorControlProps = {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (color: string) => void;
  onClear: () => void;
  allowTransparent?: boolean;
};

function normalizeHex(value: string): string {
  if (!value) return "#000000";
  if (value.startsWith("#")) {
    const hex = value.slice(1);
    if (hex.length === 3) {
      return `#${hex
        .split("")
        .map((char) => char + char)
        .join("")}`;
    }
    if (hex.length >= 6) return `#${hex.slice(0, 6)}`;
  }

  const rgbMatch = value.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgbMatch) {
    const toHex = (channel: string) =>
      Number(channel).toString(16).padStart(2, "0");
    return `#${toHex(rgbMatch[1])}${toHex(rgbMatch[2])}${toHex(rgbMatch[3])}`;
  }

  return "#000000";
}

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
  const pickerValue = normalizeHex(value);

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
          onMouseDown={preventEditorFocusLoss}
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
      <PopoverContent
        align="start"
        className="w-64 p-3"
        sideOffset={6}
        style={{ zIndex: Z_INDEX.modal }}
        onOpenAutoFocus={(event) => event.preventDefault()}
        onCloseAutoFocus={(event) => event.preventDefault()}
        onMouseDown={preventEditorFocusLoss}
      >
        <p className="mb-2 text-xs font-medium text-foreground">{label}</p>
        <div className="mb-3 max-h-[180px] overflow-y-auto overscroll-contain">
          <div className="grid grid-cols-8 gap-1.5">
            {allowTransparent && (
              <button
                type="button"
                onMouseDown={preventEditorFocusLoss}
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
                onMouseDown={preventEditorFocusLoss}
                onClick={() => handleSelect(color)}
                className={cn(
                  "h-6 w-6 rounded-full border border-border transition-transform hover:scale-110",
                  pickerValue.toLowerCase() === color.toLowerCase() &&
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
              value={pickerValue}
              onMouseDown={preventEditorFocusLoss}
              onChange={(e) => onChange(e.target.value)}
              className="h-7 w-full min-w-0 cursor-pointer rounded border border-border bg-background p-0.5"
            />
          </label>
          {value && (
            <button
              type="button"
              onMouseDown={preventEditorFocusLoss}
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
