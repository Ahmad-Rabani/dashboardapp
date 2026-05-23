"use client";

import { useContext, useEffect } from "react";
import { MyContext } from "@/context/MyContext";

function isTextInputTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  return Boolean(target.closest('[contenteditable="true"]'));
}

interface FindReplaceShortcutsProps {
  onOpen: () => void;
}

export default function FindReplaceShortcuts({ onOpen }: FindReplaceShortcutsProps) {
  const [, , , , , , , , isPreview] = useContext(MyContext);

  useEffect(() => {
    if (isPreview) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey)) return;
      if (event.key.toLowerCase() !== "h") return;
      if (isTextInputTarget(event.target)) return;

      event.preventDefault();
      onOpen();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isPreview, onOpen]);

  return null;
}
