import styled from "styled-components";

const toolbarGroup = `
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: clamp(2px, 1vw, 4px);
  padding: clamp(4px, 1vw, 10px);
  min-width: 0;

  button {
    min-width: clamp(32px, 8vw, 36px);
    min-height: clamp(32px, 8vw, 36px);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: none;
    cursor: pointer;
    flex-shrink: 0;
    padding: clamp(2px, 1vw, 4px);
    border-radius: 4px;

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    img {
      width: clamp(14px, 3.5vw, 20px);
      height: clamp(14px, 3.5vw, 20px);
    }
  }
`;

/* FIXED: toolbar had fixed px button widths and no wrap → fluid wrapping toolbar */
export const ToolbarWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: clamp(2px, 1vw, 5px);
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
`;

export const UndoRedoDiv = styled.div`
  ${toolbarGroup}
`;

export const TextStyle = styled.div`
  ${toolbarGroup}
`;

export const TextAllignment = styled.div`
  ${toolbarGroup}
`;

export const ToolbarDivider = styled.hr`
  margin: 0;
  border: none;
  border-left: 1px solid #ddd;
  height: clamp(20px, 5vw, 28px);
  align-self: center;
  flex-shrink: 0;
`;
