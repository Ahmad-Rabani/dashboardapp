import styled from "styled-components";

const primaryColor = "#FF6B35";
const hoverColor = "#FF5A1F";

/* FIXED: editor wrapper had fixed max-width + px padding → fluid 100% width container */
export const Fdiv = styled.div<{ $height?: number }>`
  display: flex;
  justify-content: center;
  width: 100%;
  height: ${(props) => (props.$height ? "100%" : "auto")};
  max-width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
`;

export const TextEditor = styled.div<{ $height?: number }>`
  border: none;
  border-radius: 0;
  width: 100%;
  max-width: 100%;
  height: ${(props) => (props.$height ? "100%" : "auto")};
  background-color: white;
  position: relative;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  min-height: ${(props) =>
    props.$height ? "0" : "clamp(80px, 20vw, 100px)"};
  box-sizing: border-box;
  overflow: hidden;
  min-width: 0;
  margin: 0;
  display: flex;
  flex-direction: column;

  &:focus-within {
    border-color: ${primaryColor};
    box-shadow: 0 4px 6px rgba(255, 107, 53, 0.1);
  }

  .editor-container {
    width: 100%;
    max-width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    min-width: 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }

  .editor-inner {
    width: 100%;
    max-width: 100%;
    flex: 1;
    min-height: 0;
    box-sizing: border-box;
    overflow-y: auto;
    min-width: 0;
  }

  .editor-input,
  [contenteditable="true"] {
    width: 100% !important;
    max-width: 100% !important;
    min-height: ${(props) =>
      props.$height ? "100%" : "clamp(80px, 20vw, 120px)"} !important;
    height: ${(props) => (props.$height ? "100%" : "auto")};
    overflow-wrap: break-word !important;
    word-break: break-word !important;
    white-space: pre-wrap !important;
    box-sizing: border-box !important;
    font-size: clamp(13px, 1.5vw, 16px);
    line-height: 1.5;
    padding: clamp(8px, 2vw, 12px);
    outline: none;
    border: none;
    resize: none;
  }

  .editor-placeholder {
    font-size: clamp(13px, 1.5vw, 16px);
    overflow-wrap: break-word;
    word-break: break-word;
    padding: clamp(8px, 2vw, 12px);
  }

  .toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: clamp(2px, 1vw, 5px);
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    min-width: 0;
  }

  .toolbar-item,
  .toolbar button {
    min-width: clamp(32px, 8vw, 36px);
    min-height: clamp(32px, 8vw, 36px);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border-radius: 4px;
    transition: background-color 0.15s ease;

    &.active {
      background-color: #eef2ff;
      color: #4338ca;
    }
  }
`;

export const PreviewContent = styled.div<{ $height?: number }>`
  width: 100%;
  height: ${(props) => (props.$height ? "100%" : "auto")};
  box-sizing: border-box;
  overflow-y: auto;
  padding: clamp(12px, 3vw, 20px);
  background-color: white;
  font-size: clamp(13px, 1.5vw, 16px);
  overflow-wrap: break-word;
  word-break: break-word;
  margin: 0;

  p {
    margin: 0 0 0.5em;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
