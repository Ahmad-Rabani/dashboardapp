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
    <div className="border-b border-white/5 px-1 py-2 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left transition-colors hover:bg-white/5"
        aria-expanded={open}
        aria-controls={`sidebar-section-${id}`}
      >
        <FontAwesomeIcon
          icon={icon}
          className="h-3.5 w-3.5 shrink-0 text-indigo-400"
        />
        <span className="min-w-0 flex-1 truncate text-xs font-semibold uppercase tracking-wide text-slate-300">
          {title}
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={cn(
            "h-3 w-3 shrink-0 text-slate-500 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      <div
        id={`sidebar-section-${id}`}
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
