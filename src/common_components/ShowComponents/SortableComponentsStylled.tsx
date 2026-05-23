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
`;

/* FIXED: absolute px positioning caused overlap/off-screen buttons → flex action row */
export const ActionButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: clamp(4px, 1vw, 12px);
  flex-wrap: nowrap;
  width: 100%;
  min-width: 0;
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

/* FIXED: card had no overflow guard / gap layout → full-width card with hidden overflow */
export const MainDiv = styled.div<{ $isDragging?: boolean }>`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: clamp(4px, 1vw, 6px);
  justify-content: flex-start;
  align-items: stretch;
  position: relative;
  overflow: hidden;
  min-width: 0;
  padding: clamp(4px, 1vw, 8px) 0;
  border-radius: clamp(6px, 1vw, 10px);
  opacity: ${({ $isDragging }) => ($isDragging ? 0.4 : 1)};

  &:hover ${CopyButton},
  &:hover ${DeleteButton},
  &:hover ${DragButton} {
    visibility: visible;
  }
`;

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

/* FIXED: image section used fixed 50% width → fluid 100% with min-width:0 */
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
