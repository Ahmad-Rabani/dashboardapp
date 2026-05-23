"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { Search, Replace } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { notify } from "@/utils/toast";
import { MyContext } from "@/context/MyContext";
import { useDashboardContext } from "@/context/DashboardContext";
import {
  applyFindReplace,
  countDashboardMatches,
} from "@/utils/findReplace";

interface FindReplaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FindReplaceDialog({
  open,
  onOpenChange,
}: FindReplaceDialogProps) {
  const [componentsArray, setComponentsArray] = useContext(MyContext);
  const { header, footer, updateHeader, updateFooter } = useDashboardContext();

  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  const matchCount = useMemo(
    () =>
      countDashboardMatches(
        componentsArray,
        header,
        footer,
        findText,
        caseSensitive
      ),
    [componentsArray, header, footer, findText, caseSensitive]
  );

  const canReplace = findText.trim().length > 0 && matchCount > 0;

  const handleReplaceAll = () => {
    if (!canReplace) return;

    const result = applyFindReplace(componentsArray, header, footer, {
      find: findText,
      replace: replaceText,
      caseSensitive,
    });

    if (result.summary.matchCount === 0) {
      notify.error("No matches found for that search term.");
      return;
    }

    setComponentsArray(result.components);
    updateHeader(result.header);
    updateFooter(result.footer);
    notify.findReplaceComplete(result.summary.matchCount);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[440px] rounded-2xl"
        data-no-export
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          const input = document.getElementById("find-replace-find");
          input?.focus();
        }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-indigo-600" aria-hidden />
            Find &amp; Replace
          </DialogTitle>
          <DialogDescription>
            Update placeholder text across every section, the header, and footer
            in one step — ideal after applying a template.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-1">
          <div className="space-y-2">
            <Label htmlFor="find-replace-find" className="text-xs text-muted-foreground">
              Find
            </Label>
            <Input
              id="find-replace-find"
              value={findText}
              onChange={(event) => setFindText(event.target.value)}
              placeholder='e.g. "Your Business Name"'
              autoComplete="off"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="find-replace-replace" className="text-xs text-muted-foreground">
              Replace with
            </Label>
            <Input
              id="find-replace-replace"
              value={replaceText}
              onChange={(event) => setReplaceText(event.target.value)}
              placeholder="Your actual business name"
              autoComplete="off"
              onKeyDown={(event) => {
                if (event.key === "Enter" && canReplace) {
                  event.preventDefault();
                  handleReplaceAll();
                }
              }}
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-3 py-2.5">
            <div className="flex items-center gap-2">
              <Switch
                id="find-replace-case"
                checked={caseSensitive}
                onCheckedChange={setCaseSensitive}
              />
              <Label htmlFor="find-replace-case" className="text-xs font-normal">
                Match case
              </Label>
            </div>
            <p className="text-xs text-muted-foreground">
              {findText.trim()
                ? matchCount === 0
                  ? "No matches"
                  : `${matchCount} match${matchCount === 1 ? "" : "es"}`
                : "Enter text to search"}
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
            disabled={!canReplace}
            onClick={handleReplaceAll}
          >
            <Replace className="h-4 w-4" aria-hidden />
            Replace all
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
