"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
  faFont,
  faHeading,
  faPalette,
  faSliders,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorPicker from "@/components/Sidebar/ColorPicker";
import SidebarSection from "./SidebarSection";
import { cn } from "@/lib/utils";

export interface HeaderSidebarContentProps {
  headerText: string;
  onHeaderTextChange: (value: string) => void;
  alignment: string;
  onAlignmentChange: (value: "start" | "center" | "end") => void;
  textSize: string;
  onTextSizeChange: (value: string) => void;
  textColor: string;
  onTextColorChange: (value: string) => void;
  backgroundColor: string;
  onBackgroundColorChange: (value: string) => void;
  onClose: () => void;
}

const alignOptions = [
  { value: "start" as const, icon: faAlignLeft, label: "Left" },
  { value: "center" as const, icon: faAlignCenter, label: "Center" },
  { value: "end" as const, icon: faAlignRight, label: "Right" },
];

export default function HeaderSidebarContent({
  headerText,
  onHeaderTextChange,
  alignment,
  onAlignmentChange,
  textSize,
  onTextSizeChange,
  textColor,
  onTextColorChange,
  backgroundColor,
  onBackgroundColorChange,
  onClose,
}: HeaderSidebarContentProps) {
  const textSizeNum = Number(textSize) || 25;

  return (
    <>
      <div className="flex items-center justify-between border-b border-white/10 px-4 pb-4 pt-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-indigo-500 to-violet-500">
            <FontAwesomeIcon icon={faHeading} className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[15px] font-bold text-slate-100">Header</p>
            <p className="truncate text-[11px] text-slate-400">
              Customize your header
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="shrink-0 text-slate-400 hover:bg-white/5 hover:text-white"
          aria-label="Close sidebar"
        >
          <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-hidden py-3">
        <SidebarSection id="branding" icon={faHeading} title="Store Branding">
          <div className="space-y-2">
            <Label htmlFor="header-text" className="text-xs text-slate-400">
              Header text
            </Label>
            <Input
              id="header-text"
              placeholder="Header"
              value={headerText}
              onChange={(e) => onHeaderTextChange(e.target.value)}
              className="border-white/10 bg-white/5 text-sm text-slate-200 placeholder:text-slate-500"
            />
          </div>
        </SidebarSection>

        <SidebarSection id="alignment" icon={faSliders} title="Alignment">
          <div className="flex gap-1">
            {alignOptions.map(({ value, icon, label }) => (
              <Button
                key={value}
                type="button"
                variant="outline"
                size="icon"
                aria-label={label}
                className={cn(
                  "h-9 flex-1 border-white/10 bg-white/5 text-slate-400",
                  alignment === value &&
                    "border-indigo-500/50 bg-indigo-500/20 text-indigo-300"
                )}
                onClick={() => onAlignmentChange(value)}
              >
                <FontAwesomeIcon icon={icon} className="h-3.5 w-3.5" />
              </Button>
            ))}
          </div>
        </SidebarSection>

        <SidebarSection id="typography" icon={faFont} title="Typography">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-slate-400">Text size</Label>
              <span className="text-xs text-slate-500">{textSize}px</span>
            </div>
            <Slider
              value={[textSizeNum]}
              min={0}
              max={50}
              step={1}
              onValueChange={(vals) => onTextSizeChange(String(vals[0] ?? 25))}
              className="[&_.bg-primary]:bg-indigo-500"
            />
          </div>
        </SidebarSection>

        <SidebarSection id="colors" icon={faPalette} title="Colors">
          <Tabs defaultValue="text">
            <TabsList className="grid w-full grid-cols-2 bg-white/5">
              <TabsTrigger value="text" className="text-xs">
                Text Color
              </TabsTrigger>
              <TabsTrigger value="background" className="text-xs">
                Background
              </TabsTrigger>
            </TabsList>
            <TabsContent value="text" className="mt-3">
              <div className="mb-2 flex items-center gap-2">
                <div
                  className="h-6 w-6 shrink-0 rounded-md border border-white/10"
                  style={{ backgroundColor: textColor }}
                />
                <span className="truncate text-xs text-slate-400">{textColor}</span>
              </div>
              <ColorPicker value={textColor} onChange={onTextColorChange} isMobile />
            </TabsContent>
            <TabsContent value="background" className="mt-3">
              <div className="mb-2 flex items-center gap-2">
                <div
                  className="h-6 w-6 shrink-0 rounded-md border border-white/10"
                  style={{ backgroundColor: backgroundColor }}
                />
                <span className="truncate text-xs text-slate-400">
                  {backgroundColor}
                </span>
              </div>
              <ColorPicker
                value={backgroundColor}
                onChange={onBackgroundColorChange}
                isMobile
              />
            </TabsContent>
          </Tabs>
        </SidebarSection>
      </div>
    </>
  );
}
