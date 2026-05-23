"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface SidebarProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ children, open, onClose }: SidebarProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[1099] bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Header settings"
        className={cn(
          "fixed top-0 right-0 z-[1100] flex h-full max-h-[100dvh] w-[min(300px,85vw)] flex-col sm:w-[min(320px,90vw)]",
          "border-l border-white/10 bg-[hsl(var(--sidebar-bg,222_47%_11%))]",
          "shadow-[-4px_0_24px_rgba(0,0,0,0.15)]",
          "animate-in slide-in-from-right duration-300"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-full flex-col overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </aside>
    </>
  );
}
