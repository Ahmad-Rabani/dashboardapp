"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { ImageIcon, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { notify } from "@/utils/toast";
import { MyContext } from "@/context/MyContext";
import { useDashboardContext } from "@/context/DashboardContext";
import { applyFindReplace } from "@/utils/findReplace";
import {
  scanDashboardPlaceholders,
  scrollToSection,
} from "@/utils/placeholderScan";

interface QuickFillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function isTextInputTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  return Boolean(target.closest('[contenteditable="true"]'));
}

interface QuickFillShortcutsProps {
  onOpen: () => void;
}

export function QuickFillShortcuts({ onOpen }: QuickFillShortcutsProps) {
  const [, , , , , , , , isPreview] = useContext(MyContext);

  useEffect(() => {
    if (isPreview) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey)) return;
      if (!event.shiftKey) return;
      if (event.key.toLowerCase() !== "f") return;
      if (isTextInputTarget(event.target)) return;

      event.preventDefault();
      onOpen();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isPreview, onOpen]);

  return null;
}

export default function QuickFillDialog({
  open,
  onOpenChange,
}: QuickFillDialogProps) {
  const [componentsArray, setComponentsArray] = useContext(MyContext);
  const { header, footer, updateHeader, updateFooter } = useDashboardContext();
  const [replacements, setReplacements] = useState<Record<string, string>>({});

  const scan = useMemo(
    () => scanDashboardPlaceholders(componentsArray, header, footer),
    [componentsArray, header, footer]
  );

  useEffect(() => {
    if (!open) {
      setReplacements({});
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  const pendingFillCount = scan.textPlaceholders.filter((item) => {
    const value = replacements[item.id]?.trim();
    return Boolean(value && value !== item.findText);
  }).length;

  const canApply = pendingFillCount > 0;

  const handleApply = () => {
    if (!canApply) return;

    let nextComponents = componentsArray;
    let nextHeader = header;
    let nextFooter = footer;
    let totalReplaced = 0;
    let fieldsUpdated = 0;

    for (const item of scan.textPlaceholders) {
      const replaceValue = replacements[item.id]?.trim();
      if (!replaceValue || replaceValue === item.findText) continue;

      const result = applyFindReplace(nextComponents, nextHeader, nextFooter, {
        find: item.findText,
        replace: replaceValue,
        caseSensitive: true,
      });

      if (result.summary.matchCount === 0) continue;

      nextComponents = result.components;
      nextHeader = result.header;
      nextFooter = result.footer;
      totalReplaced += result.summary.matchCount;
      fieldsUpdated += 1;
    }

    if (totalReplaced === 0) {
      notify.error("Nothing was updated. Check your entries and try again.");
      return;
    }

    setComponentsArray(nextComponents);
    updateHeader(nextHeader);
    updateFooter(nextFooter);
    notify.quickFillComplete(totalReplaced, fieldsUpdated);
    onOpenChange(false);
  };

  const hasWork =
    scan.textPlaceholders.length > 0 || scan.imagePlaceholders.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[480px] rounded-2xl p-0 gap-0 overflow-hidden"
        data-no-export
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          const firstInput = document.querySelector<HTMLInputElement>(
            "[data-quick-fill-input]"
          );
          firstInput?.focus();
        }}
      >
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-600" aria-hidden />
            Quick Fill
          </DialogTitle>
          <DialogDescription>
            {hasWork
              ? "Template placeholders are still on your page. Enter your real details once — every match updates automatically."
              : "No template placeholders detected. Your page looks customized."}
          </DialogDescription>
        </DialogHeader>

        {hasWork ? (
          <ScrollArea className="max-h-[min(52vh,420px)] px-6">
            <div className="space-y-3 pb-4">
              {scan.textPlaceholders.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-border bg-muted/30 p-3 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Label
                        htmlFor={`quick-fill-${item.id}`}
                        className="text-sm font-medium text-foreground"
                      >
                        {item.label}
                      </Label>
                      <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                        Currently: &ldquo;{item.findText}&rdquo;
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="shrink-0 text-[10px] font-normal"
                    >
                      {item.matchCount}×
                    </Badge>
                  </div>
                  <Input
                    id={`quick-fill-${item.id}`}
                    data-quick-fill-input
                    value={replacements[item.id] ?? ""}
                    onChange={(event) =>
                      setReplacements((prev) => ({
                        ...prev,
                        [item.id]: event.target.value,
                      }))
                    }
                    placeholder={item.hint ?? "Your value"}
                    autoComplete="off"
                  />
                </div>
              ))}

              {scan.imagePlaceholders.length > 0 && (
                <div className="rounded-xl border border-dashed border-amber-300/80 bg-amber-50/60 p-3 space-y-2">
                  <p className="text-xs font-medium text-amber-900">
                    Images still using placeholders
                  </p>
                  <ul className="space-y-1.5">
                    {scan.imagePlaceholders.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs text-amber-900 transition-colors hover:bg-amber-100/80"
                          onClick={() => {
                            onOpenChange(false);
                            window.setTimeout(
                              () => scrollToSection(item.sectionKey),
                              200
                            );
                          }}
                        >
                          <ImageIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                          {item.label} — click to jump there
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </ScrollArea>
        ) : (
          <div className="px-6 pb-4">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-6 text-center">
              <p className="text-sm font-medium text-emerald-900">
                You&apos;re all set
              </p>
              <p className="mt-1 text-xs text-emerald-700/90">
                Use Find &amp; Replace (Ctrl+H) anytime you need a custom bulk
                text change.
              </p>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2 border-t border-border bg-muted/20 px-6 py-4 sm:gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            {hasWork ? "Cancel" : "Close"}
          </Button>
          {hasWork && scan.textPlaceholders.length > 0 && (
            <Button
              type="button"
              className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
              disabled={!canApply}
              onClick={handleApply}
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              Fill {pendingFillCount} field{pendingFillCount === 1 ? "" : "s"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
