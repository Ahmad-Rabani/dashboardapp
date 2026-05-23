"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export interface SidebarProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  label?: string;
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

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
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
        aria-label={label}
        className={cn(
          "fixed top-0 right-0 z-[1100] flex h-[100dvh] w-[min(320px,92vw)] flex-col",
          "border-l border-white/10 bg-[hsl(var(--sidebar-bg,222_47%_11%))]",
          "shadow-[-4px_0_24px_rgba(0,0,0,0.2)]",
          "animate-in slide-in-from-right duration-300"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden overscroll-contain">
          {children}
        </div>
      </aside>
    </>,
    document.body
  );
}
