"use client";

import React from "react";
import { faImage, faPalette } from "@fortawesome/free-solid-svg-icons";
import ColorPicker from "@/components/Sidebar/ColorPicker";
import ColorFillPreview from "@/components/Sidebar/ColorFillPreview";
import SidebarSection from "./SidebarSection";
import {
  SidebarPanelBody,
  SidebarPanelHeader,
  SidebarShell,
  sidebarMutedClass,
} from "./SidebarLayout";
import { cn } from "@/lib/utils";

export interface ImageSidebarContentProps {
  backgroundColor: string;
  onBackgroundColorChange: (value: string) => void;
  onClose: () => void;
}

export default function ImageSidebarContent({
  backgroundColor,
  onBackgroundColorChange,
  onClose,
}: ImageSidebarContentProps) {
  return (
    <SidebarShell>
      <SidebarPanelHeader
        title="Image"
        subtitle="Section background"
        icon={faImage}
        onClose={onClose}
      />

      <SidebarPanelBody>
        <SidebarSection id="background" icon={faPalette} title="Background">
          <div className="space-y-3">
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
          </div>
        </SidebarSection>
      </SidebarPanelBody>
    </SidebarShell>
  );
}
