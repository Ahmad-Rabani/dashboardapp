"use client";

import React from "react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faCopy,
  faArrowsUpDown,
  faImage,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import CustomToast, { ToastType } from "@/components/CustomToast";

const TOAST_DURATION = 3500;
const MAX_TOASTS = 3;
const DEDUP_MS = 1000;

const activeToastIds: string[] = [];
let lastToastKey = "";
let lastToastTime = 0;

function removeToastId(id: string) {
  const index = activeToastIds.indexOf(id);
  if (index !== -1) {
    activeToastIds.splice(index, 1);
  }
}

function enforceStackLimit() {
  while (activeToastIds.length >= MAX_TOASTS) {
    const oldest = activeToastIds.shift();
    if (oldest) {
      toast.dismiss(oldest);
    }
  }
}

function canShowToast(key: string): boolean {
  const now = Date.now();
  if (key === lastToastKey && now - lastToastTime < DEDUP_MS) {
    return false;
  }
  lastToastKey = key;
  lastToastTime = now;
  return true;
}

function showCustomToast(
  key: string,
  type: ToastType,
  title: string,
  description: string | undefined,
  icon: React.ReactNode,
  accentColor: string
) {
  if (!canShowToast(key)) return;

  enforceStackLimit();

  let toastId = "";

  toastId = toast.custom(
    (t) => (
      <CustomToast
        t={t}
        type={type}
        title={title}
        description={description}
        icon={icon}
        accentColor={accentColor}
        duration={TOAST_DURATION}
      />
    ),
    {
      duration: TOAST_DURATION,
      position: "top-center",
    }
  );

  if (toastId) {
    activeToastIds.push(toastId);
    setTimeout(() => removeToastId(toastId), TOAST_DURATION + 400);
  }
}

export const notify = {
  sectionAdded: () =>
    showCustomToast(
      "sectionAdded",
      "success",
      "Section Added",
      "New section has been added successfully",
      <FontAwesomeIcon icon={faPlus} />,
      "#22c55e"
    ),

  sectionDeleted: () =>
    showCustomToast(
      "sectionDeleted",
      "error",
      "Section Deleted",
      "The section has been permanently removed",
      <FontAwesomeIcon icon={faTrash} />,
      "#ef4444"
    ),

  sectionCopied: () =>
    showCustomToast(
      "sectionCopied",
      "success",
      "Section Copied",
      "Section has been duplicated successfully",
      <FontAwesomeIcon icon={faCopy} />,
      "#3b82f6"
    ),

  sectionReordered: () =>
    showCustomToast(
      "sectionReordered",
      "info",
      "Section Reordered",
      "Your section order has been updated",
      <FontAwesomeIcon icon={faArrowsUpDown} />,
      "#8b5cf6"
    ),

  imageUpdated: () =>
    showCustomToast(
      "imageUpdated",
      "success",
      "Image Updated",
      "Section image has been changed",
      <FontAwesomeIcon icon={faImage} />,
      "#14b8a6"
    ),

  error: (msg?: string) =>
    showCustomToast(
      `error:${msg ?? "default"}`,
      "error",
      "Something went wrong",
      msg ?? "Please try again",
      <FontAwesomeIcon icon={faCircleExclamation} />,
      "#ef4444"
    ),
};
