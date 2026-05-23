import styled from "styled-components";

const primaryColor = "#FF6B35";
const hoverColor = "#FF5A1F";

/* FIXED: editor wrapper had fixed max-width + px padding → fluid 100% width container */
export const Fdiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
  position: relative;
  box-sizing: border-box;
  min-width: 0;
`;

/* FIXED: editor lacked overflow/word-break rules for Lexical internals */
export const TextEditor = styled.div`
  border: 2px solid #f5f5f5;
  border-radius: clamp(6px, 1vw, 8px);
  width: 100%;
  max-width: 100%;
  background-color: white;
  position: relative;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  min-height: clamp(80px, 20vw, 100px);
  box-sizing: border-box;
  overflow: hidden;
  min-width: 0;

  &:focus-within {
    border-color: ${primaryColor};
    box-shadow: 0 4px 6px rgba(255, 107, 53, 0.1);
  }

  .editor-container,
  .editor-inner {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    min-width: 0;
  }

  .editor-input,
  [contenteditable="true"] {
    width: 100% !important;
    max-width: 100% !important;
    min-height: clamp(80px, 20vw, 120px);
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
  }
`;

export const PreviewContent = styled.div`
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  padding: clamp(12px, 3vw, 20px);
  background-color: #fdc386;
  font-size: clamp(13px, 1.5vw, 16px);
  overflow-wrap: break-word;
  word-break: break-word;

  p {
    margin: 0 0 0.5em;
  }
`;
