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
  onImageChange?: (dataUrl: string) => void;
  onRequestUpload?: () => void;
  onClose: () => void;
}

export default function ImageSidebarContent({
  backgroundColor,
  onBackgroundColorChange,
  onImageChange,
  onRequestUpload,
  onClose,
}: ImageSidebarContentProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !onImageChange) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const dataUrl = loadEvent.target?.result;
      if (typeof dataUrl === "string") onImageChange(dataUrl);
    };
    reader.readAsDataURL(file);
  };
  return (
    <SidebarShell>
      <SidebarPanelHeader
        title="Image"
        subtitle="Section background"
        icon={faImage}
        onClose={onClose}
      />

      <SidebarPanelBody>
        <SidebarSection id="upload" icon={faImage} title="Photo">
          <div className="space-y-2">
            <button
              type="button"
              onClick={onRequestUpload}
              className="w-full rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2.5 text-sm font-semibold text-indigo-800 transition-colors hover:bg-indigo-100"
            >
              Upload or replace image
            </button>
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              id="sidebar-image-upload"
              onChange={handleFileChange}
            />
            <label
              htmlFor="sidebar-image-upload"
              className="block cursor-pointer text-center text-xs text-slate-500 hover:text-slate-700"
            >
              or choose file from device
            </label>
          </div>
        </SidebarSection>

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
