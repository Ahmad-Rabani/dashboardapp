"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPalette, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import ColorPicker from "@/components/Sidebar/ColorPicker";
import SidebarSection from "./SidebarSection";

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
    <>
      <div className="flex items-center justify-between border-b border-white/10 px-4 pb-4 pt-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-indigo-500 to-violet-500">
            <FontAwesomeIcon icon={faImage} className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[15px] font-bold text-slate-100">Image</p>
            <p className="truncate text-[11px] text-slate-400">
              Section background
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

      <div className="py-3">
        <SidebarSection id="background" icon={faPalette} title="Background">
          <div className="mb-2 flex items-center gap-2">
            <div
              className="h-6 w-6 shrink-0 rounded-md border border-white/10"
              style={{ backgroundColor }}
            />
            <span className="truncate text-xs text-slate-400">{backgroundColor}</span>
          </div>
          <ColorPicker
            value={backgroundColor}
            onChange={onBackgroundColorChange}
            isMobile
          />
        </SidebarSection>
      </div>
    </>
  );
}
