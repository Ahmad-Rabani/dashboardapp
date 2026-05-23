import styled, { css } from "styled-components";
import { Z_INDEX } from "@/styles/zIndex";

/* Inner stack for cards — width comes from ContentWrapper, not this div */
export const MainDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  min-width: 0;
  padding-bottom: 0;
`;

/* FIXED: gap between cards → absolute zero gap with hairline dividers only on cards */
export const SortableList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0 !important;
  margin: 0;
  padding: 0;
  min-width: 0;

  & > *:not([data-aligned-slot]) {
    margin: 0 !important;
    padding: 0;
    display: block;
  }

  & > [data-aligned-slot] {
    margin: 0 !important;
    padding: 0;
  }
`;

const toolbarButtonBase = css`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 10px 16px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  font-family: "Inter", sans-serif;
  white-space: nowrap;
  box-sizing: border-box;
  flex-shrink: 0;
  transition:
    box-shadow 0.2s ease,
    background 0.2s ease,
    transform 0.15s ease;

  img,
  svg {
    flex-shrink: 0;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  &:focus-visible {
    outline: 2px solid #6366f1;
    outline-offset: 2px;
  }
`;

/** Fixed dock — all editor actions stay on-screen (safe areas + sidebar inset). */
export const FloatingToolbarDock = styled.div`
  position: fixed;
  z-index: ${Z_INDEX.floatingActions};
  display: flex;
  flex-direction: column-reverse;
  align-items: stretch;
  gap: 8px;
  padding: 10px;
  border-radius: 16px;
  background: var(--toolbar-dock-bg, rgba(255, 255, 255, 0.96));
  border: 1px solid var(--toolbar-dock-border, rgba(15, 15, 108, 0.1));
  box-shadow:
    0 4px 6px rgba(15, 15, 108, 0.06),
    0 12px 40px rgba(15, 15, 108, 0.14);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-sizing: border-box;
  pointer-events: auto;

  right: calc(16px + var(--editor-sidebar-inset, 0px));
  bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  width: min(220px, calc(100vw - 32px - var(--editor-sidebar-inset, 0px)));
  max-height: calc(
    100dvh - var(--header-height, 72px) - env(safe-area-inset-top, 0px) - 24px
  );
  overflow-y: auto;
  overscroll-behavior: contain;

  @media (max-width: 640px) {
    left: max(12px, env(safe-area-inset-left, 0px));
    right: max(12px, env(safe-area-inset-right, 0px));
    bottom: calc(12px + env(safe-area-inset-bottom, 0px));
    width: auto;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    max-height: none;
  }
`;

export const ToolbarButton = styled.button<{ $primary?: boolean; $variant?: "default" | "ghost" }>`
  ${toolbarButtonBase}
  width: 100%;
  color: white;
  background: linear-gradient(145deg, #0f0f6c, #191981);
  box-shadow: 0 2px 10px rgba(15, 15, 108, 0.25);

  &:hover:not(:disabled) {
    box-shadow: 0 4px 16px rgba(15, 15, 108, 0.35);
    background: linear-gradient(145deg, #191981, #0f0f6c);
  }

  ${(props) =>
    props.$primary &&
    css`
      font-weight: 600;
      min-height: 48px;
      padding: 12px 18px;
    `}

  ${(props) =>
    props.$variant === "ghost" &&
    css`
      color: hsl(var(--foreground));
      background: rgba(15, 15, 108, 0.06);
      box-shadow: none;

      &:hover:not(:disabled) {
        background: rgba(15, 15, 108, 0.12);
        box-shadow: none;
      }
    `}

  @media (max-width: 640px) {
    width: auto;
    flex: 1 1 calc(50% - 4px);
    min-width: 140px;
    max-width: 100%;
  }
`;

/* @deprecated — use FloatingToolbarDock + ToolbarButton */
export const PreviewActions = FloatingToolbarDock;
export const PreviewButton = ToolbarButton;
export const DownloadPdfButton = ToolbarButton;
export const AddSection = ToolbarButton;
