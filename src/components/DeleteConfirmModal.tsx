"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface DeleteConfirmModalProps {
  isOpen: boolean;
  sectionName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  sectionName,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  const heading = sectionName
    ? `Delete '${sectionName}'?`
    : "Delete this section?";

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
    >
      <DialogContent
        className="max-w-[480px] animate-modalEntrance rounded-3xl border-0 p-8 shadow-[0_32px_80px_rgba(0,0,0,0.25)] [&>button]:hidden"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          const cancelBtn = document.getElementById("delete-modal-cancel");
          cancelBtn?.focus();
        }}
      >
        <div className="mb-2 flex justify-center">
          <div className="flex h-20 w-20 animate-dangerPulse items-center justify-center rounded-full border-2 border-red-200 bg-red-50">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="text-3xl text-red-500"
            />
          </div>
        </div>

        <DialogHeader className="space-y-3 text-center">
          <DialogTitle className="text-center text-2xl font-extrabold text-gray-900">
            {heading}
          </DialogTitle>
          <DialogDescription className="text-center text-sm leading-relaxed text-gray-500">
            This action is permanent and cannot be undone. All content within
            this section including images and text will be lost forever.
          </DialogDescription>
        </DialogHeader>

        <div className="my-2 flex justify-center">
          <Badge
            variant="outline"
            className="rounded-full border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-semibold text-orange-700"
          >
            ⚠ This cannot be recovered
          </Badge>
        </div>

        <DialogFooter className="mt-4 flex flex-row gap-3 sm:justify-center">
          <Button
            id="delete-modal-cancel"
            type="button"
            variant="outline"
            className="h-12 flex-1 rounded-2xl border-2 text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-100"
            onClick={onCancel}
            autoFocus
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="h-12 flex-1 rounded-2xl border-0 bg-gradient-to-br from-red-500 to-red-600 text-base font-bold text-white shadow-[0_4px_14px_rgba(239,68,68,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:from-red-600 hover:to-red-700 hover:shadow-[0_6px_20px_rgba(239,68,68,0.5)] active:translate-y-0"
            onClick={onConfirm}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Yes, Delete it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
