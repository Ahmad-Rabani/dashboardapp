"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
} from "@fortawesome/free-solid-svg-icons";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ColorPicker from "./ColorPicker";
import {
  ColorTarget,
  useColorContext,
} from "@/context/ColorContext";
import { cn } from "@/lib/utils";

export interface SectionControlsProps {
  onAddSectionType: (type: "text" | "image" | "mixed") => void;
}

const COLOR_TARGETS: { key: ColorTarget; label: string }[] = [
  { key: "background", label: "Background" },
  { key: "text", label: "Text" },
  { key: "border", label: "Border" },
  { key: "accent", label: "Accent" },
];

export function ColorsPanel({ isMobile = false }: { isMobile?: boolean }) {
  const { activeSectionId, getSectionColors, updateSectionColor } =
    useColorContext();
  const [activeTarget, setActiveTarget] = React.useState<ColorTarget>("background");

  if (!activeSectionId) {
    return (
      <div className="rounded-lg border border-dashed border-white/10 bg-white/5 px-3 py-6 text-center">
        <p className="text-xs leading-relaxed text-slate-400">
          Select a section to edit its colors
        </p>
      </div>
    );
  }

  const sectionColors = getSectionColors(activeSectionId);

  return (
    <div className="space-y-3">
      <Tabs
        value={activeTarget}
        onValueChange={(v) => setActiveTarget(v as ColorTarget)}
      >
        <TabsList className="grid h-auto w-full grid-cols-2 gap-1 bg-white/5 p-1">
          {COLOR_TARGETS.map(({ key, label }) => (
            <TabsTrigger
              key={key}
              value={key}
              className="text-[10px] data-[state=active]:bg-indigo-500/30 data-[state=active]:text-indigo-200"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <ColorPicker
        value={sectionColors[activeTarget]}
        onChange={(value) =>
          updateSectionColor(activeSectionId, activeTarget, value)
        }
        isMobile={isMobile}
      />
    </div>
  );
}

export function LayoutPanel({
  onAddSectionType,
}: Pick<SectionControlsProps, "onAddSectionType">) {
  const { activeSectionId, getSectionSettings, updateSectionSetting } =
    useColorContext();

  const settings = activeSectionId
    ? getSectionSettings(activeSectionId)
    : { padding: 16 };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-xs text-slate-400">Section Type</Label>
        <Tabs defaultValue="text">
          <TabsList className="grid w-full grid-cols-3 bg-white/5">
            <TabsTrigger
              value="text"
              className="text-xs"
              onClick={() => onAddSectionType("text")}
            >
              Text
            </TabsTrigger>
            <TabsTrigger
              value="image"
              className="text-xs"
              onClick={() => onAddSectionType("image")}
            >
              Image
            </TabsTrigger>
            <TabsTrigger
              value="mixed"
              className="text-xs"
              onClick={() => onAddSectionType("mixed")}
            >
              Mixed
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-slate-400">Spacing</Label>
          <span className="text-xs text-slate-500">
            Padding: {settings.padding}px
          </span>
        </div>
        <Slider
          value={[settings.padding]}
          min={0}
          max={48}
          step={1}
          disabled={!activeSectionId}
          onValueChange={(vals) => {
            if (activeSectionId) {
              updateSectionSetting(activeSectionId, "padding", vals[0] ?? 16);
            }
          }}
          className="[&_.bg-primary]:bg-indigo-500"
        />
      </div>
    </div>
  );
}

export function TypographyPanel() {
  const { activeSectionId, getSectionSettings, updateSectionSetting } =
    useColorContext();

  const settings = activeSectionId
    ? getSectionSettings(activeSectionId)
    : {
        fontSize: 16,
        fontWeight: "400",
        textAlign: "left" as const,
        lineHeight: 1.5,
      };

  const alignButtons = [
    { value: "left" as const, icon: faAlignLeft },
    { value: "center" as const, icon: faAlignCenter },
    { value: "right" as const, icon: faAlignRight },
    { value: "justify" as const, icon: faAlignJustify },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-slate-400">Font Size</Label>
          <span className="text-xs text-slate-500">{settings.fontSize}px</span>
        </div>
        <Slider
          value={[settings.fontSize]}
          min={12}
          max={32}
          step={1}
          disabled={!activeSectionId}
          onValueChange={(vals) => {
            if (activeSectionId) {
              updateSectionSetting(activeSectionId, "fontSize", vals[0] ?? 16);
            }
          }}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs text-slate-400">Font Weight</Label>
        <Select
          value={settings.fontWeight}
          disabled={!activeSectionId}
          onValueChange={(v) => {
            if (activeSectionId) {
              updateSectionSetting(activeSectionId, "fontWeight", v);
            }
          }}
        >
          <SelectTrigger className="border-white/10 bg-white/5 text-sm text-slate-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="300">Light</SelectItem>
            <SelectItem value="400">Regular</SelectItem>
            <SelectItem value="500">Medium</SelectItem>
            <SelectItem value="600">Semibold</SelectItem>
            <SelectItem value="700">Bold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-xs text-slate-400">Text Align</Label>
        <div className="flex gap-1">
          {alignButtons.map(({ value, icon }) => (
            <Button
              key={value}
              type="button"
              variant="outline"
              size="icon"
              disabled={!activeSectionId}
              className={cn(
                "h-8 w-8 border-white/10 bg-white/5 text-slate-400",
                settings.textAlign === value &&
                  "border-indigo-500/50 bg-indigo-500/20 text-indigo-300"
              )}
              onClick={() => {
                if (activeSectionId) {
                  updateSectionSetting(activeSectionId, "textAlign", value);
                }
              }}
            >
              <FontAwesomeIcon icon={icon} className="h-3 w-3" />
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-slate-400">Line Height</Label>
          <span className="text-xs text-slate-500">{settings.lineHeight}</span>
        </div>
        <Slider
          value={[settings.lineHeight * 10]}
          min={10}
          max={25}
          step={1}
          disabled={!activeSectionId}
          onValueChange={(vals) => {
            if (activeSectionId) {
              updateSectionSetting(
                activeSectionId,
                "lineHeight",
                (vals[0] ?? 15) / 10
              );
            }
          }}
        />
      </div>
    </div>
  );
}

export function SettingsPanel() {
  const { activeSectionId, getSectionSettings, updateSectionSetting } =
    useColorContext();

  const settings = activeSectionId
    ? getSectionSettings(activeSectionId)
    : {
        showBorders: true,
        showShadows: false,
        compactMode: false,
      };

  const toggles = [
    {
      key: "showBorders" as const,
      label: "Show borders",
      value: settings.showBorders,
    },
    {
      key: "showShadows" as const,
      label: "Show shadows",
      value: settings.showShadows,
    },
    {
      key: "compactMode" as const,
      label: "Compact mode",
      value: settings.compactMode,
    },
  ];

  return (
    <div className="space-y-3">
      {toggles.map(({ key, label, value }) => (
        <div key={key} className="flex items-center justify-between gap-3">
          <Label className="text-xs text-slate-400">{label}</Label>
          <Switch
            checked={value}
            disabled={!activeSectionId}
            onCheckedChange={(checked) => {
              if (activeSectionId) {
                updateSectionSetting(activeSectionId, key, checked);
              }
            }}
          />
        </div>
      ))}
    </div>
  );
}