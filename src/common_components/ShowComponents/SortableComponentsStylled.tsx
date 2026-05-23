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
  width: min(50%, 100%);
  margin: 0 auto;
  border: none;
  border-top: 1px solid #ddd;
`;

export const AddButton = styled.button`
  min-width: clamp(32px, 8vw, 36px);
  min-height: clamp(32px, 8vw, 36px);
  padding: 0 clamp(6px, 1.5vw, 7px);
  border-radius: 50%;
  cursor: pointer;
  background-color: #0f0f6c;
  border: none;
  color: white;
  visibility: hidden;
  font-size: clamp(18px, 4vw, 24px);
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  margin: 0;
  padding-top: clamp(2px, 0.5vw, 4px);

  &:hover ${AddButton} {
    visibility: visible;
  }
`;

/* FIXED: card used column layout with centered action row → row layout with pinned left/right controls on ≥1024px */
export const CardWrapper = styled.div<{ $isDragging?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  min-width: 0;
  opacity: ${({ $isDragging }) => ($isDragging ? 0.4 : 1)};

  /* FIXED: gap/margin/padding between cards → flush sections with hairline divider only */
  margin: 0 !important;
  gap: 0;
  padding: 0 !important;
  border-radius: 0;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }

  /* FIXED: mobile keeps drag left + copy/delete right on one row via grid overlay */
  @media (max-width: 1023px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "left-controls right-controls"
      "body body";
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

/* FIXED: left controls floated into card body → pinned left column, vertically centered on ≥1024px */
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
`;

/* FIXED: copy/delete floated to center → pinned right column, vertically centered on ≥1024px */
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
`;

export const CardBody = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 1023px) {
    grid-area: body;
  }
`;

export const CardContent = styled.div`
  width: 100%;
  min-width: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const ImageDiv = styled.div`
  width: 100%;
  min-width: 0;
  overflow: hidden;
`;
