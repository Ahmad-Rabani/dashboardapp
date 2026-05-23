"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";

export interface SidebarSectionProps {
  id: string;
  icon: IconDefinition;
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export default function SidebarSection({
  id,
  icon,
  title,
  defaultOpen = true,
  children,
}: SidebarSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-slate-200 py-4 last:border-b-0 dark:border-slate-700">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center gap-3 rounded-lg py-2 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60"
        aria-expanded={open}
        aria-controls={`sidebar-section-${id}`}
      >
        <FontAwesomeIcon
          icon={icon}
          className="h-4 w-4 shrink-0 text-indigo-500"
        />
        <span className="min-w-0 flex-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
          {title}
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={cn(
            "h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div id={`sidebar-section-${id}`} className="space-y-4 pb-1 pt-4">
          {children}
        </div>
      )}
    </div>
  );
}
