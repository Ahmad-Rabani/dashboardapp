"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Z_INDEX } from "@/styles/zIndex";
import { cn } from "@/lib/utils";

export interface SidebarProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  label?: string;
}

const SIDEBAR_PANEL_CLASS =
  "fixed top-0 right-0 flex h-[100dvh] w-[min(380px,94vw)] flex-col overflow-hidden border-l border-slate-200 bg-white shadow-[-4px_0_32px_rgba(0,0,0,0.15)] dark:border-slate-700 dark:bg-slate-900";

const SIDEBAR_INSET = "min(380px, 94vw)";
let sidebarOpenCount = 0;

function setSidebarInset(active: boolean) {
  if (active) {
    sidebarOpenCount += 1;
  } else {
    sidebarOpenCount = Math.max(0, sidebarOpenCount - 1);
  }

  if (sidebarOpenCount > 0) {
    document.documentElement.style.setProperty("--editor-sidebar-inset", SIDEBAR_INSET);
  } else {
    document.documentElement.style.removeProperty("--editor-sidebar-inset");
  }
}

export default function Sidebar({
  children,
  open,
  onClose,
  label = "Settings panel",
}: SidebarProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    setSidebarInset(true);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      setSidebarInset(false);
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <>
      <div
        className="fixed top-0 right-0 h-[100dvh] animate-in fade-in-0 duration-200 bg-black/15"
        style={{ zIndex: Z_INDEX.sidebarBackdrop, width: SIDEBAR_INSET }}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        style={{ zIndex: Z_INDEX.sidebar, backgroundColor: "#ffffff" }}
        className={cn(SIDEBAR_PANEL_CLASS, "animate-in slide-in-from-right duration-300")}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </aside>
    </>,
    document.body
  );
}
