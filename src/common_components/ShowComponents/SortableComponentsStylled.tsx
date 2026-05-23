import styled from "styled-components";

const iconButtonBase = `
  min-width: clamp(32px, 8vw, 36px);
  min-height: clamp(32px, 8vw, 36px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  background-color: white;
  padding: clamp(4px, 1vw, 7px);
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  visibility: hidden;

  img {
    width: clamp(12px, 3vw, 15px);
    height: clamp(12px, 3vw, 15px);
    object-fit: contain;
  }

  /* FIXED: buttons shrank on large screens → fixed 36px min on desktop */
  @media (min-width: 1024px) {
    min-width: 36px;
    min-height: 36px;
  }
`;

export const CopyButton = styled.button`
  ${iconButtonBase}
`;

export const DeleteButton = styled.button`
  ${iconButtonBase}
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

/* Card row — controls float outside the aligned content column on desktop */
export const CardWrapper = styled.div<{ $isDragging?: boolean; $isPreview?: boolean }>`
  display: flex;
  flex-direction: row;
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

  @media (max-width: 1023px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "left-controls right-controls"
      "body body";
  }

  @media (min-width: 1024px) {
    display: block;
  }

  &:hover ${CopyButton},
  &:hover ${DeleteButton},
  &:hover ${DragButton} {
    visibility: visible;
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

/* FIXED: drag handle wrapper — keeps DnD listeners on a tappable flex child */
export const ComponentsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const LeftControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  flex-shrink: 0;

  @media (max-width: 1023px) {
    grid-area: left-controls;
    flex-direction: row;
    justify-content: flex-start;
    padding: 8px 12px 0;
  }

  @media (min-width: 1024px) {
    position: absolute;
    left: clamp(4px, 1vw, 16px);
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
    padding: 0;
  }
`;

export const RightControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(4px, 1vw, 8px);
  padding: 8px;
  flex-shrink: 0;

  @media (max-width: 1023px) {
    grid-area: right-controls;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0 12px 8px;
  }

  @media (min-width: 1024px) {
    position: absolute;
    right: clamp(4px, 1vw, 16px);
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
    padding: 0;
  }
`;

export const CardBody = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: visible;
  position: relative;
  width: 100%;

  @media (max-width: 1023px) {
    grid-area: body;
  }
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
  height: 10px;
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
