"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBorderAll,
  faAnglesLeft,
  faAnglesRight,
  faFont,
  faGear,
  faLayerGroup,
  faPalette,
  faPlus,
  faRotateLeft,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SidebarSection from "./SidebarSection";
import {
  ColorsPanel,
  LayoutPanel,
  SettingsPanel,
  TypographyPanel,
} from "./SectionControls";
import { useColorContext } from "@/context/ColorContext";
import { MyContext } from "@/context/MyContext";
import { cn } from "@/lib/utils";

const COLLAPSED_GROUPS = [
  { id: "sections", icon: faPlus, label: "Add Section" },
  { id: "layout", icon: faBorderAll, label: "Layout" },
  { id: "colors", icon: faPalette, label: "Colors" },
  { id: "typography", icon: faFont, label: "Typography" },
  { id: "settings", icon: faGear, label: "Settings" },
] as const;

type CollapsedGroupId = (typeof COLLAPSED_GROUPS)[number]["id"];

function SidebarHeader({
  collapsed,
  onToggleCollapse,
}: {
  collapsed: boolean;
  onToggleCollapse: () => void;
}) {
  if (collapsed) {
    return (
      <div className="flex items-center justify-between border-b border-white/10 px-2 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-indigo-500 to-violet-500">
          <FontAwesomeIcon icon={faLayerGroup} className="h-4 w-4 text-white" />
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="h-8 w-8 shrink-0 text-slate-400 hover:bg-white/5 hover:text-white"
          aria-label="Expand sidebar"
        >
          <FontAwesomeIcon icon={faAnglesRight} className="h-3.5 w-3.5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between border-b border-white/10 px-4 pb-4 pt-5">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-indigo-500 to-violet-500">
          <FontAwesomeIcon icon={faLayerGroup} className="h-4 w-4 text-white" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[15px] font-bold text-slate-100">
            Page Builder
          </p>
          <p className="truncate text-[11px] text-slate-400">Design your page</p>
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onToggleCollapse}
        className="shrink-0 text-slate-400 hover:bg-white/5 hover:text-white"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <FontAwesomeIcon
          icon={collapsed ? faAnglesRight : faAnglesLeft}
          className="h-4 w-4"
        />
      </Button>
    </div>
  );
}

function SidebarFooter({
  collapsed,
  onReset,
}: {
  collapsed: boolean;
  onReset: () => void;
}) {
  if (collapsed) {
    return (
      <div className="border-t border-white/10 p-3">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onReset}
                className="mx-auto text-slate-400 hover:text-red-400"
              >
                <FontAwesomeIcon icon={faRotateLeft} className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Reset All</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5 border-t border-white/10 p-4">
      <Button
        type="button"
        variant="ghost"
        onClick={onReset}
        className="flex-1 justify-start text-slate-400 hover:bg-white/5 hover:text-red-400"
      >
        <FontAwesomeIcon icon={faRotateLeft} className="mr-2 h-3.5 w-3.5" />
        Reset All
      </Button>
      <Badge
        variant="outline"
        className="shrink-0 border-white/10 text-[10px] text-slate-400"
      >
        v1.0
      </Badge>
    </div>
  );
}

interface SidebarInnerProps {
  collapsed: boolean;
  isMobile?: boolean;
  sectionCount: number;
  onAddSection: () => void;
  onAddSectionType: (type: "text" | "image" | "mixed") => void;
  onReset: () => void;
  activeCollapsedGroup: CollapsedGroupId | null;
  onCollapsedGroupClick: (id: CollapsedGroupId) => void;
  onToggleCollapse?: () => void;
}

function SidebarInner({
  collapsed,
  isMobile = false,
  sectionCount,
  onAddSection,
  onAddSectionType,
  onReset,
  activeCollapsedGroup,
  onCollapsedGroupClick,
  onToggleCollapse,
}: SidebarInnerProps) {
  if (collapsed && !isMobile) {
    return (
      <>
        <SidebarHeader collapsed onToggleCollapse={onToggleCollapse!} />
        <ScrollArea className="flex-1 px-2 py-3">
          <TooltipProvider delayDuration={0}>
            <div className="flex flex-col gap-1">
              {COLLAPSED_GROUPS.map(({ id, icon, label }) => (
                <Tooltip key={id}>
                  <TooltipTrigger asChild>
                    <div>
                      <SidebarSection
                        id={id}
                        icon={icon}
                        title={label}
                        collapsed
                        isActive={activeCollapsedGroup === id}
                        onHeaderClick={() => {
                          onCollapsedGroupClick(id);
                          if (id === "sections") onAddSection();
                        }}
                      >
                        {null}
                      </SidebarSection>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">{label}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </ScrollArea>
        <SidebarFooter collapsed onReset={onReset} />
      </>
    );
  }

  return (
    <>
      <SidebarHeader
        collapsed={false}
        onToggleCollapse={onToggleCollapse ?? (() => undefined)}
      />
      <ScrollArea className="flex-1 py-3">
        <SidebarSection
          id="sections"
          icon={faPlus}
          title="Sections"
          badge={sectionCount}
        >
          <Button
            type="button"
            onClick={onAddSection}
            className="w-full border-0 bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-[0_4px_14px_rgba(99,102,241,0.4)] transition-all hover:-translate-y-px hover:brightness-110"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2 h-3.5 w-3.5" />
            Add New Section
          </Button>
        </SidebarSection>

        <SidebarSection id="layout" icon={faBorderAll} title="Layout">
          <LayoutPanel onAddSectionType={onAddSectionType} />
        </SidebarSection>

        <SidebarSection id="colors" icon={faPalette} title="Colors">
          <ColorsPanel isMobile={isMobile} />
        </SidebarSection>

        <SidebarSection id="typography" icon={faFont} title="Typography">
          <TypographyPanel />
        </SidebarSection>

        <SidebarSection id="settings" icon={faGear} title="Settings">
          <SettingsPanel />
        </SidebarSection>
      </ScrollArea>
      <SidebarFooter collapsed={false} onReset={onReset} />
    </>
  );
}

export interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeCollapsedGroup, setActiveCollapsedGroup] =
    useState<CollapsedGroupId | null>(null);

  const { resetAll } = useColorContext();
  const [
    componentsArray,
    ,
    ,
    setNewSection,
    ,
    ,
    ,
    setAddNewSection,
    isPreview,
    ,
    ,
    resetDashboard,
  ] = useContext(MyContext);

  const sectionCount = componentsArray.length;

  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const mqWide = window.matchMedia("(min-width: 1280px)");

    const update = () => {
      setIsDesktop(mqDesktop.matches);
      if (!mqDesktop.matches) {
        setCollapsed(false);
      }
    };

    update();
    mqDesktop.addEventListener("change", update);
    mqWide.addEventListener("change", update);
    return () => {
      mqDesktop.removeEventListener("change", update);
      mqWide.removeEventListener("change", update);
    };
  }, []);

  const handleAddSection = useCallback(() => {
    setNewSection(true);
    setAddNewSection(false);
    if (!isDesktop) setMobileOpen(false);
  }, [setNewSection, setAddNewSection, isDesktop]);

  const handleAddSectionType = useCallback(
    (type: "text" | "image" | "mixed") => {
      setNewSection(true);
      setAddNewSection(false);
      if (!isDesktop) setMobileOpen(false);
    },
    [setNewSection, setAddNewSection, isDesktop]
  );

  const handleReset = useCallback(() => {
    resetAll();
    resetDashboard?.();
  }, [resetAll, resetDashboard]);

  if (isPreview) return null;

  const sidebarWidthClass = collapsed
    ? "w-[68px] xl:w-[72px]"
    : "w-[260px] xl:w-[280px]";

  const sidebarInner = (
    <SidebarInner
      collapsed={collapsed}
      isMobile={!isDesktop}
      sectionCount={sectionCount}
      onAddSection={handleAddSection}
      onAddSectionType={handleAddSectionType}
      onReset={handleReset}
      activeCollapsedGroup={activeCollapsedGroup}
      onCollapsedGroupClick={setActiveCollapsedGroup}
      onToggleCollapse={() => setCollapsed((c) => !c)}
    />
  );

  return (
    <>
      {/* Desktop sidebar */}
      {isDesktop && (
        <aside
          className={cn(
            "sticky top-[var(--header-height,72px)] hidden h-[calc(100vh-var(--header-height,72px))] shrink-0 flex-col overflow-hidden border-r border-border bg-[hsl(var(--sidebar-bg,222_47%_11%))] shadow-[4px_0_24px_rgba(0,0,0,0.08)] transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] lg:flex",
            sidebarWidthClass,
            className
          )}
        >
          {sidebarInner}
        </aside>
      )}

      {/* Mobile FAB + Sheet */}
      {!isDesktop && (
        <>
          <Button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="fixed bottom-6 left-6 z-[998] h-14 w-14 rounded-full border-0 bg-gradient-to-br from-indigo-500 to-violet-500 p-0 text-white shadow-lg lg:hidden"
            aria-label={mobileOpen ? "Close sidebar" : "Open sidebar"}
          >
            <FontAwesomeIcon
              icon={mobileOpen ? faXmark : faBars}
              className="h-5 w-5"
            />
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetContent
              side="left"
              className="flex w-[min(300px,85vw)] flex-col border-r border-white/10 bg-[hsl(var(--sidebar-bg,222_47%_11%))] p-0 text-slate-100 [&>button]:hidden"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Page Builder Sidebar</SheetTitle>
              </SheetHeader>
              <div className="flex h-full flex-col">{sidebarInner}</div>
            </SheetContent>
          </Sheet>
        </>
      )}
    </>
  );
}

export function useSidebarWidth(): number {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 1024) {
        setWidth(0);
      } else if (w < 1280) {
        setWidth(260);
      } else {
        setWidth(280);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return width;
}
