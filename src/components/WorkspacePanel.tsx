"use client";

import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faBullhorn,
  faDownload,
  faFileImport,
  faLayerGroup,
  faPenToSquare,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { LayoutTemplate, HardDriveDownload, HardDriveUpload } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { notify } from "@/utils/toast";
import { MyContext } from "@/context/MyContext";
import { useDashboardContext } from "@/context/DashboardContext";
import {
  PAGE_TEMPLATES,
  PageTemplate,
  TEMPLATE_CATEGORIES,
} from "@/constants/pageTemplates";
import {
  downloadDashboardBackup,
  readDashboardBackupFile,
} from "@/utils/dashboardBackup";
import { DashboardSnapshot } from "@/types/dashboard";
import { toStoredSections } from "@/utils/dashboardStorage";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS = {
  custom: faPenToSquare,
  business: faBriefcase,
  personal: faUser,
  marketing: faBullhorn,
} as const;

const SIDEBAR_INSET = "min(380px, 94vw)";

interface WorkspacePanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface PendingAction {
  type: "template" | "import";
  label: string;
  snapshot: DashboardSnapshot;
}

export default function WorkspacePanel({
  open,
  onOpenChange,
}: WorkspacePanelProps) {
  const [
    componentsArray,
    ,
    ,
    setNewSection,
    ,
    ,
    ,
    setAddNewSection,
    ,
    setIsPreview,
    ,
    ,
    ,
    applyDashboardSnapshot,
  ] = useContext(MyContext);
  const { header, footer } = useDashboardContext();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<PendingAction | null>(null);

  useEffect(() => {
    if (!open) return;

    document.documentElement.style.setProperty("--editor-sidebar-inset", SIDEBAR_INSET);
    return () => {
      document.documentElement.style.removeProperty("--editor-sidebar-inset");
    };
  }, [open]);

  const hasContent = componentsArray.length > 0;

  const applySnapshot = useCallback(
    (snapshot: DashboardSnapshot) => {
      applyDashboardSnapshot?.(snapshot);
      setNewSection(false);
      setAddNewSection(false);
      setIsPreview(false);
      onOpenChange(false);
    },
    [
      applyDashboardSnapshot,
      setNewSection,
      setAddNewSection,
      setIsPreview,
      onOpenChange,
    ]
  );

  const requestApply = useCallback(
    (action: PendingAction) => {
      if (hasContent) {
        setPending(action);
        return;
      }
      applySnapshot(action.snapshot);
      if (action.type === "template") {
        notify.templateApplied(action.label);
      } else {
        notify.backupImported();
      }
    },
    [hasContent, applySnapshot]
  );

  const handleTemplateSelect = (template: PageTemplate) => {
    requestApply({
      type: "template",
      label: template.name,
      snapshot: template.snapshot,
    });
  };

  const handleExport = () => {
    const snapshot: DashboardSnapshot = {
      version: 1,
      sections: toStoredSections(componentsArray),
      header,
      footer,
    };
    downloadDashboardBackup(snapshot);
    notify.backupExported();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      const snapshot = await readDashboardBackupFile(file);
      requestApply({
        type: "import",
        label: file.name,
        snapshot,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not read backup file.";
      notify.error(message);
    }
  };

  const confirmReplace = () => {
    if (!pending) return;
    applySnapshot(pending.snapshot);
    if (pending.type === "template") {
      notify.templateApplied(pending.label);
    } else {
      notify.backupImported();
    }
    setPending(null);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="flex w-full flex-col border-l border-slate-200 bg-white p-0 sm:max-w-md"
          data-no-export
        >
          <SheetHeader className="border-b border-slate-100 px-6 py-5 text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md">
                <LayoutTemplate className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <SheetTitle className="text-lg text-slate-900">
                  Workspace
                </SheetTitle>
                <SheetDescription className="text-slate-500">
                  Start from a template or move your work between devices
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <Tabs defaultValue="templates" className="flex min-h-0 flex-1 flex-col">
            <TabsList className="mx-6 mt-4 grid h-auto w-auto grid-cols-2 gap-1 bg-slate-100 p-1">
              <TabsTrigger
                value="templates"
                className="text-xs data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
              >
                <FontAwesomeIcon icon={faLayerGroup} className="mr-1.5 h-3 w-3" />
                Templates
              </TabsTrigger>
              <TabsTrigger
                value="backup"
                className="text-xs data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
              >
                <HardDriveDownload className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                Backup
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="templates"
              className="mt-0 flex-1 overflow-y-auto px-6 pb-6 pt-4 focus-visible:outline-none"
            >
              <p className="mb-4 text-xs leading-relaxed text-slate-500">
                Pick a starter layout for common real-world pages — local
                businesses, portfolios, launches, and events. Replace images and
                text with your own content.
              </p>
              <ul className="space-y-3">
                {PAGE_TEMPLATES.map((template) => (
                  <li key={template.id}>
                    <button
                      type="button"
                      onClick={() => handleTemplateSelect(template)}
                      className={cn(
                        "group w-full rounded-xl border border-slate-200 bg-white p-4 text-left transition-all",
                        "hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-500/10",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                      )}
                    >
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm text-white"
                          style={{ backgroundColor: template.accent }}
                        >
                          <FontAwesomeIcon
                            icon={CATEGORY_ICONS[template.category]}
                            className="h-4 w-4"
                          />
                        </span>
                        <Badge
                          variant="outline"
                          className="shrink-0 border-slate-200 text-[10px] text-slate-600"
                        >
                          {TEMPLATE_CATEGORIES[template.category]}
                        </Badge>
                      </div>
                      <p className="font-semibold text-slate-900 group-hover:text-indigo-800">
                        {template.name}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">
                        {template.description}
                      </p>
                      <p className="mt-2 text-[10px] font-medium text-indigo-600">
                        {template.snapshot.sections.length === 0
                          ? "Blank page · Build from scratch"
                          : `${template.snapshot.sections.length} sections · Use template`}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent
              value="backup"
              className="mt-0 flex-1 overflow-y-auto px-6 pb-6 pt-4 focus-visible:outline-none"
            >
              <p className="mb-4 text-xs leading-relaxed text-slate-500">
                Export a JSON backup before clearing browser data, switching
                computers, or sharing an editable copy with a teammate. Import
                restores header, footer, and all sections.
              </p>

              <div className="space-y-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                  <div className="mb-2 flex items-center gap-2 text-slate-800">
                    <HardDriveDownload className="h-4 w-4 text-indigo-600" aria-hidden />
                    <span className="text-sm font-semibold">Export backup</span>
                  </div>
                  <p className="mb-3 text-xs text-slate-500">
                    Downloads your current page as a{" "}
                    <code className="rounded bg-white px-1 py-0.5 text-[10px]">
                      .json
                    </code>{" "}
                    file you can store anywhere safe.
                  </p>
                  <Button
                    type="button"
                    className="w-full gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
                    onClick={handleExport}
                    disabled={!hasContent}
                  >
                    <FontAwesomeIcon icon={faDownload} />
                    Export current page
                  </Button>
                  {!hasContent && (
                    <p className="mt-2 text-center text-[10px] text-slate-400">
                      Add at least one section to export
                    </p>
                  )}
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                  <div className="mb-2 flex items-center gap-2 text-slate-800">
                    <HardDriveUpload className="h-4 w-4 text-indigo-600" aria-hidden />
                    <span className="text-sm font-semibold">Import backup</span>
                  </div>
                  <p className="mb-3 text-xs text-slate-500">
                    Load a previously exported backup file. Your work is also
                    auto-saved in this browser.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                    onClick={handleImportClick}
                  >
                    <FontAwesomeIcon icon={faFileImport} />
                    Choose backup file
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/json,.json"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>

      <Dialog
        open={Boolean(pending)}
        onOpenChange={(isOpen) => {
          if (!isOpen) setPending(null);
        }}
      >
        <DialogContent className="max-w-[420px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Replace current page?</DialogTitle>
            <DialogDescription>
              You have existing sections. Applying{" "}
              <strong>{pending?.label}</strong> will replace your header, footer,
              and all sections. Export a backup first if you want to keep this
              version.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button type="button" variant="outline" onClick={() => setPending(null)}>
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
              onClick={confirmReplace}
            >
              Replace page
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
