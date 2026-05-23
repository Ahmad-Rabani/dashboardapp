"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface SidebarSectionProps {
  id: string;
  icon: IconDefinition;
  title: string;
  badge?: number | string;
  defaultOpen?: boolean;
  collapsed?: boolean;
  isActive?: boolean;
  onHeaderClick?: () => void;
  children: React.ReactNode;
}

export default function SidebarSection({
  id,
  icon,
  title,
  badge,
  defaultOpen = true,
  collapsed = false,
  isActive = false,
  onHeaderClick,
  children,
}: SidebarSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  if (collapsed) {
    return (
      <button
        type="button"
        id={`sidebar-section-${id}`}
        onClick={onHeaderClick}
        className={cn(
          "relative flex w-full items-center justify-center rounded-lg p-2.5 transition-colors",
          "text-slate-400 hover:bg-white/5 hover:text-white",
          isActive && "text-indigo-400"
        )}
        aria-label={title}
      >
        {isActive && (
          <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r bg-indigo-500" />
        )}
        <FontAwesomeIcon icon={icon} className="h-4 w-4" />
      </button>
    );
  }

  return (
    <div
      id={`sidebar-section-${id}`}
      className="border-b border-white/5 px-3 py-2 last:border-b-0"
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left transition-colors hover:bg-white/5"
        aria-expanded={open}
        aria-controls={`sidebar-section-content-${id}`}
      >
        <FontAwesomeIcon
          icon={icon}
          className="h-3.5 w-3.5 shrink-0 text-indigo-400"
        />
        <span className="min-w-0 flex-1 truncate text-xs font-semibold uppercase tracking-wide text-slate-300">
          {title}
        </span>
        {badge !== undefined && (
          <Badge
            variant="secondary"
            className="h-5 min-w-[20px] shrink-0 border-0 bg-indigo-500/20 px-1.5 text-[10px] text-indigo-300"
          >
            {badge}
          </Badge>
        )}
        <FontAwesomeIcon
          icon={faChevronDown}
          className={cn(
            "h-3 w-3 shrink-0 text-slate-500 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      <div
        id={`sidebar-section-content-${id}`}
        className={cn(
          "grid transition-all duration-200 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-3 px-2 pb-3 pt-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
