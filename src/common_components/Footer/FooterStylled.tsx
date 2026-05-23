import styled from "styled-components";

interface InputCheckBox {
  $checkbox: boolean;
}
interface ButtonTextType {
  $allColors: string;
}
interface BackgroundColorButtonType {
  $backgroundColor: string;
  $preview: boolean;
}
interface TextColorType {
  $TextColor: string;
}
interface LinkColorType {
  $linkColor: string;
}
interface ColorType {
  $color: string;
}

/* FIXED: footer wrapper had no padding/overflow guard → matches header padding, prevents bleed */
export const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: clamp(8px, 2vw, 20px) 0;
  box-sizing: border-box;
  overflow-x: hidden;
  flex-shrink: 0;
  text-align: center;
  background-color: hsl(var(--app-shell-bg, 0 0% 90%));
  transition: background-color 0.3s ease;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

export const FooterDiv = styled.footer<BackgroundColorButtonType>`
  width: 100%;
  border: ${(props) => (props.$preview ? "none" : "2px solid #e0e0e0")};
  cursor: text;
  background-color: ${(props) => props.$backgroundColor};
  border-radius: clamp(6px, 1vw, 8px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow: hidden;
  min-width: 0;

  h3 {
    font-size: clamp(13px, 2vw, 18px);
    padding: clamp(12px, 3vw, 20px);
    margin: 0;
    font-family: "Inter", sans-serif;
    overflow-wrap: break-word;
    word-break: break-word;
  }
`;

export const FooterTitle = styled.h3`
  padding: clamp(8px, 2vw, 12px) clamp(12px, 3vw, 20px);
  margin: 0;
  font-family: "Inter", sans-serif;
  color: #333;
  font-size: clamp(14px, 2vw, 16px);
  overflow-wrap: break-word;
  word-break: break-word;
`;

export const FooterInputsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 2vw, 12px);
  padding: clamp(10px, 2vw, 15px);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  min-width: 0;

  div {
    display: flex;
    align-items: center;
    gap: clamp(6px, 1.5vw, 8px);
    flex-wrap: wrap;
    min-width: 0;

    h3 {
      font-family: "Inter", sans-serif;
      font-size: clamp(13px, 1.5vw, 14px);
      font-weight: 500;
      margin: 0;
      flex: 1;
      min-width: 0;
    }
  }
`;

export const FooterInputs = styled.input<InputCheckBox>`
  width: 100%;
  padding: clamp(8px, 2vw, 10px) clamp(10px, 2vw, 12px);
  font-family: "Inter", sans-serif;
  font-size: clamp(13px, 1.5vw, 14px);
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: ${(props) => (props.$checkbox ? "white" : "#f9f9f9")};
  box-sizing: border-box;
  transition: all 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
  }
`;

export const FooterStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: clamp(8px, 2vw, 12px);
  padding: clamp(8px, 2vw, 10px);
  box-sizing: border-box;
  min-width: 0;

  div {
    display: flex;
    align-items: center;
    gap: clamp(4px, 1vw, 6px);
    flex-wrap: wrap;
    position: relative;
    width: 100%;
    min-width: 0;

    button {
      min-width: clamp(36px, 10vw, 50px);
      min-height: clamp(28px, 6vh, 35px);
      border-radius: 8px;
      cursor: pointer;
      border: none;
      flex-shrink: 0;
      transition: background-color 0.3s ease;
    }

    h2 {
      font-size: clamp(13px, 1.5vw, 14px);
      font-weight: 500;
      font-family: "Inter", sans-serif;
      color: #333;
      margin: 0;
      flex: 1;
      min-width: 0;
    }
  }
`;

export const HeadStyle = styled.h3`
  margin: 0;
  text-align: left;
  font-family: "Inter", sans-serif;
  color: #333;
  font-size: clamp(14px, 2vw, 16px);
  overflow-wrap: break-word;
  word-break: break-word;
`;

export const BackgroundColorsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  width: clamp(64px, 18vw, 80px);
  max-height: min(300px, 40vh);
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  padding: 8px 5px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  z-index: 30;
`;

export const BackgroundColor = styled.button<BackgroundColorButtonType>`
  cursor: pointer;
  padding: clamp(6px, 1.5vw, 10px);
  width: clamp(36px, 10vw, 50px);
  height: clamp(28px, 6vh, 30px);
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: ${(props) => props.$backgroundColor};
  flex-shrink: 0;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const ButtonText = styled.button<ButtonTextType>`
  cursor: pointer;
  padding: clamp(8px, 2vw, 15px);
  width: clamp(36px, 10vw, 50px);
  height: clamp(36px, 10vw, 50px);
  border-radius: 8px;
  border: none;
  background-color: ${(props) => props.$allColors};
  color: #fff;
  flex-shrink: 0;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const ColorsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  width: clamp(64px, 18vw, 80px);
  max-height: min(300px, 40vh);
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  padding: 8px 5px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  z-index: 30;
`;

export const TextColor = styled.button<TextColorType>`
  width: clamp(36px, 10vw, 50px);
  height: clamp(28px, 6vh, 30px);
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: ${(props) => props.$TextColor};
  flex-shrink: 0;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const FooterTextColor = styled.h3<ColorType>`
  color: ${(props) => props.$color};
  font-family: "Inter", sans-serif;
  font-size: clamp(13px, 1.5vw, 16px);
  padding: clamp(8px, 2vw, 12px) clamp(12px, 3vw, 20px);
  margin: 0;
  overflow-wrap: break-word;
  word-break: break-word;
`;

export const LinkColorsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  width: clamp(64px, 18vw, 80px);
  max-height: min(300px, 40vh);
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  padding: 8px 5px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  z-index: 30;
`;

export const LinkColor = styled.button<LinkColorType>`
  width: clamp(36px, 10vw, 50px);
  height: clamp(28px, 6vh, 30px);
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: ${(props) => props.$linkColor};
  flex-shrink: 0;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const FooterLinksColor = styled.h3<ColorType>`
  color: ${(props) => props.$color};
  text-decoration: underline;
  font-family: "Inter", sans-serif;
  font-size: clamp(13px, 1.5vw, 16px);
  padding: clamp(4px, 1vw, 8px) clamp(12px, 3vw, 20px);
  margin: 0;
  overflow-wrap: break-word;
  word-break: break-word;
`;
