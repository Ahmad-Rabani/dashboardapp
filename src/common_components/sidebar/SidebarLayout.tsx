"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";

/** Shared horizontal padding for all sidebar inner content */
export const SIDEBAR_PADDING_X = "px-6";

export function SidebarShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-white text-foreground dark:bg-slate-900 dark:text-slate-100">
      {children}
    </div>
  );
}

export interface SidebarPanelHeaderProps {
  title: string;
  subtitle: string;
  icon: IconDefinition;
  onClose: () => void;
}

export function SidebarPanelHeader({
  title,
  subtitle,
  icon,
  onClose,
}: SidebarPanelHeaderProps) {
  return (
    <div
      className={`flex shrink-0 items-center justify-between border-b border-slate-200 bg-white ${SIDEBAR_PADDING_X} pb-5 pt-6 dark:border-slate-700 dark:bg-slate-900`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 pr-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-sm">
          <FontAwesomeIcon icon={icon} className="h-4 w-4 text-white" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-base font-bold text-slate-900 dark:text-white">
            {title}
          </p>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="h-9 w-9 shrink-0 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
        aria-label="Close sidebar"
      >
        <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function SidebarPanelBody({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain ${SIDEBAR_PADDING_X} py-5 pb-24`}
    >
      <div className="w-full space-y-2">{children}</div>
    </div>
  );
}

export const sidebarFieldClass =
  "w-full border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100";

export const sidebarLabelClass =
  "text-sm font-medium text-slate-800 dark:text-slate-200";

export const sidebarMutedClass = "text-xs text-slate-500 dark:text-slate-400";
