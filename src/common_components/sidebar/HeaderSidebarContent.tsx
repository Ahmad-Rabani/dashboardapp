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
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorPicker from "@/components/Sidebar/ColorPicker";
import ColorFillPreview from "@/components/Sidebar/ColorFillPreview";
import SidebarSection from "./SidebarSection";
import {
  SidebarPanelBody,
  SidebarPanelHeader,
  SidebarShell,
  sidebarFieldClass,
  sidebarLabelClass,
  sidebarMutedClass,
} from "./SidebarLayout";
import { FONT_FAMILIES } from "@/constants/fontFamilies";
import { cn } from "@/lib/utils";

export interface HeaderSidebarContentProps {
  headerText: string;
  onHeaderTextChange: (value: string) => void;
  alignment: string;
  onAlignmentChange: (value: "start" | "center" | "end") => void;
  textSize: string;
  onTextSizeChange: (value: string) => void;
  fontFamily: string;
  onFontFamilyChange: (value: string) => void;
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

export default function HeaderSidebarContent(props: HeaderSidebarContentProps) {
  const {
    headerText,
    onHeaderTextChange,
    alignment,
    onAlignmentChange,
    textSize,
    onTextSizeChange,
    fontFamily,
    onFontFamilyChange,
    textColor,
    onTextColorChange,
    backgroundColor,
    onBackgroundColorChange,
    onClose,
  } = props;

  const textSizeNum = Number(textSize) || 25;

  return (
    <SidebarShell>
      <SidebarPanelHeader
        title="Header"
        subtitle="Customize your header"
        icon={faHeading}
        onClose={onClose}
      />

      <SidebarPanelBody>
        <SidebarSection id="branding" icon={faHeading} title="Store Branding">
          <div className="space-y-2">
            <Label htmlFor="header-text" className={sidebarLabelClass}>
              Header text
            </Label>
            <Input
              id="header-text"
              placeholder="Header"
              value={headerText}
              onChange={(e) => onHeaderTextChange(e.target.value)}
              className={sidebarFieldClass}
            />
          </div>
        </SidebarSection>

        <SidebarSection id="alignment" icon={faSliders} title="Alignment">
          <div className="flex gap-2">
            {alignOptions.map(({ value, icon, label }) => (
              <Button
                key={value}
                type="button"
                variant="outline"
                size="icon"
                aria-label={label}
                className={cn(
                  "h-10 flex-1",
                  alignment === value &&
                    "border-indigo-500 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300"
                )}
                onClick={() => onAlignmentChange(value)}
              >
                <FontAwesomeIcon icon={icon} className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </SidebarSection>

        <SidebarSection id="typography" icon={faFont} title="Typography">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className={sidebarLabelClass}>Font style</Label>
              <div className="grid grid-cols-1 gap-2">
                {FONT_FAMILIES.map((font) => (
                  <button
                    key={font.id}
                    type="button"
                    onClick={() => onFontFamilyChange(font.value)}
                    className={cn(
                      "rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
                      fontFamily === font.value
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300"
                        : "border-border bg-background text-foreground hover:bg-muted"
                    )}
                    style={{ fontFamily: font.value }}
                  >
                    {font.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <Label className={sidebarLabelClass}>Text size</Label>
                <span className={sidebarMutedClass}>{textSize}px</span>
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
          </div>
        </SidebarSection>

        <SidebarSection id="colors" icon={faPalette} title="Colors">
          <Tabs defaultValue="text">
            <TabsList className="grid h-auto w-full grid-cols-2 gap-1 bg-muted p-1">
              <TabsTrigger value="text" className="text-xs">
                Text Color
              </TabsTrigger>
              <TabsTrigger value="background" className="text-xs">
                Background
              </TabsTrigger>
            </TabsList>
            <TabsContent value="text" className="mt-4 space-y-3">
              <div className="flex items-center gap-2">
                <ColorFillPreview value={textColor} variant="text" />
                <span className={cn(sidebarMutedClass, "truncate")}>{textColor}</span>
              </div>
              <ColorPicker value={textColor} onChange={onTextColorChange} isMobile />
            </TabsContent>
            <TabsContent value="background" className="mt-4 space-y-3">
              <div className="flex items-center gap-2">
                <ColorFillPreview value={backgroundColor} />
                <span className={cn(sidebarMutedClass, "truncate")}>
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
      </SidebarPanelBody>
    </SidebarShell>
  );
}
