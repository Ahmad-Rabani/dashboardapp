"use client";

import { useCallback, useRef } from "react";
import {
  MAX_SECTION_HEIGHT,
  MIN_SECTION_HEIGHT,
} from "@/constants/sectionLayout";

type UseSectionResizeOptions = {
  height: number;
  onHeightChange: (height: number) => void;
  minHeight?: number;
  maxHeight?: number;
  disabled?: boolean;
};

export function useSectionResize({
  height,
  onHeightChange,
  minHeight = MIN_SECTION_HEIGHT,
  maxHeight = MAX_SECTION_HEIGHT,
  disabled = false,
}: UseSectionResizeOptions) {
  const startY = useRef(0);
  const startHeight = useRef(0);

  const onResizePointerDown = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (disabled) return;

      event.preventDefault();
      event.stopPropagation();

      startY.current = event.clientY;
      startHeight.current = height;

      const handlePointerMove = (moveEvent: PointerEvent) => {
        const delta = moveEvent.clientY - startY.current;
        const nextHeight = Math.min(
          maxHeight,
          Math.max(minHeight, startHeight.current + delta)
        );
        onHeightChange(nextHeight);
      };

      const handlePointerUp = () => {
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };

      document.body.style.cursor = "ns-resize";
      document.body.style.userSelect = "none";
      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    },
    [disabled, height, maxHeight, minHeight, onHeightChange]
  );

  return { onResizePointerDown };
}
