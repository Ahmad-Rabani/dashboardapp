import styled from "styled-components";

const iconButtonBase = `
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: grab;
  background-color: white;
  padding: 10px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  img {
    width: 16px;
    height: 16px;
    object-fit: contain;
    pointer-events: none;
  }

  &:active {
    cursor: grabbing;
    transform: scale(0.96);
  }

  @media (min-width: 1024px) {
    min-width: 36px;
    min-height: 36px;
    padding: 7px;
    visibility: hidden;
    box-shadow: none;

    img {
      width: 15px;
      height: 15px;
    }
  }

  @media (max-width: 1023px), (hover: none) {
    visibility: visible;
  }
`;

export const CopyButton = styled.button`
  ${iconButtonBase}
  cursor: pointer;
`;

export const DeleteButton = styled.button`
  ${iconButtonBase}
  cursor: pointer;
`;

export const DragButton = styled.button`
  ${iconButtonBase}
`;

export const Line = styled.hr`
  display: none;
`;

export const Container = styled.div`
  display: contents;
`;

/* Card row — compact toolbar on mobile, floating controls on desktop */
export const CardWrapper = styled.div<{ $isDragging?: boolean; $isPreview?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: visible;
  min-width: 0;
  opacity: ${({ $isDragging }) => ($isDragging ? 0.4 : 1)};

  margin: 0 !important;
  gap: 0;
  padding: 0 !important;
  border-radius: 0;
  border-bottom: none;

  @media (min-width: 1024px) {
    display: block;
  }

  @media (min-width: 1024px) and (hover: hover) {
    &:hover ${CopyButton},
    &:hover ${DeleteButton},
    &:hover ${DragButton} {
      visibility: visible;
    }
  }
`;

/* @deprecated alias — use CardWrapper */
export const MainDiv = CardWrapper;

export const DragOverlayWrapper = styled.div`
  width: 100%;
  cursor: grabbing;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
  transform: scale(1.03);
  transform-origin: center top;
  box-sizing: border-box;
  overflow: hidden;
`;

export const SectionControlsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  padding: 4px 8px 0;
  box-sizing: border-box;
  flex-shrink: 0;

  @media (min-width: 1024px) {
    display: contents;
  }
`;

export const DragHandle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  touch-action: none;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: grab;

  ${DragButton} {
    pointer-events: none;
  }

  &:active {
    cursor: grabbing;
  }

  @media (min-width: 1024px) {
    position: absolute;
    left: clamp(4px, 1vw, 16px);
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex-shrink: 0;

  @media (min-width: 1024px) {
    position: absolute;
    right: clamp(4px, 1vw, 16px);
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
    flex-direction: column;
    gap: clamp(4px, 1vw, 8px);
  }
`;

/* @deprecated — use DragHandle */
export const ComponentsDiv = DragHandle;

/* @deprecated — use SectionControlsBar */
export const LeftControls = SectionControlsBar;

/* @deprecated — use ActionButtons */
export const RightControls = ActionButtons;

export const CardBody = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: visible;
  position: relative;
  width: 100%;
`;

export const ResizableSection = styled.div<{ $height: number }>`
  position: relative;
  width: 100%;
  height: ${({ $height }) => `${$height}px`};
  min-height: 80px;
  box-sizing: border-box;
`;

export const CardContent = styled.div<{ $height?: number }>`
  width: 100%;
  min-width: 0;
  height: ${({ $height }) => ($height ? `${$height}px` : "auto")};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0;
  box-sizing: border-box;
`;

export const SectionResizeHandle = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 16px;
  cursor: ns-resize;
  z-index: 7;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;

  &::before {
    content: "";
    width: clamp(48px, 16vw, 72px);
    height: 4px;
    border-radius: 999px;
    background: rgba(15, 15, 108, 0.35);
    transition: background 0.2s ease, transform 0.2s ease;
  }

  &:hover::before,
  &:active::before {
    background: rgba(15, 15, 108, 0.65);
    transform: scaleY(1.25);
  }
`;

export const ImageDiv = styled.div`
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
`;
