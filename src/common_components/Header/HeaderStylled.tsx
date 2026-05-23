import styled from "styled-components";
import { Z_INDEX } from "@/styles/zIndex";
import { surfaceFillCss, textFillCss } from "@/utils/colorStyle";

interface Types {
  $Aligment: string;
  $TextSize: string;
  $textColor: string;
  $fontFamily: string;
}

interface TextColorType {
  $TextColor: string;
}

interface ButtonTextType {
  $allColors: string;
}

interface HeaderDivType {
  $HeaderBackgroundColor: string;
  $preview: boolean;
}

interface BackgroundColorButtonType {
  $backgroundColor: string;
}

/* FIXED: header was not sticky and could overflow → sticky shell + fluid padding */
export const MainDiv = styled.header<{ $preview?: boolean }>`
  position: sticky;
  top: 0;
  z-index: ${Z_INDEX.header};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  box-sizing: border-box;
  overflow-x: hidden;
  background-color: ${(props) =>
    props.$preview ? "#ffffff" : "hsl(var(--app-shell-bg, 0 0% 90%))"};
  flex-shrink: 0;
  transition: background-color 0.3s ease, padding 0.3s ease;
`;

export const HeaderDiv = styled.div<HeaderDivType>`
  width: 100%;
  border: ${(props) => (props.$preview ? "none" : "2px solid #333")};
  cursor: text;
  ${(props) => surfaceFillCss(props.$HeaderBackgroundColor)}
  margin: 0 auto;
  border-radius: ${(props) => (props.$preview ? "0" : "clamp(6px, 1vw, 10px)")};
  transition: background 0.3s ease, border-color 0.3s ease;
  box-shadow: ${(props) => (props.$preview ? "none" : "0 4px 8px rgba(0, 0, 0, 0.1)")};
  box-sizing: border-box;
  overflow: hidden;
  min-width: 0;

  &:hover {
    border-color: #555;
  }
`;

export const HeaderText = styled.h3<Types>`
  text-align: ${(props) => props.$Aligment};
  font-size: clamp(14px, ${(props) => props.$TextSize}px, 50px);
  ${(props) => textFillCss(props.$textColor)}
  margin: 0;
  padding: clamp(12px, 3vw, 20px);
  font-family: ${(props) => props.$fontFamily};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  transition: color 0.3s ease, background 0.3s ease, text-shadow 0.3s ease;
  overflow-wrap: break-word;
  word-break: break-word;
  width: 100%;
  box-sizing: border-box;
`;

export const SidebarHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: clamp(8px, 2vw, 10px);
  background: linear-gradient(45deg, #ff7e5f, #feb47b);
  border-radius: 10px 10px 0 0;
  flex-wrap: wrap;
  gap: clamp(4px, 1vw, 8px);
  min-width: 0;

  img {
    padding: 3px;
    cursor: pointer;
    width: clamp(20px, 5vw, 40px);
    height: auto;
    flex-shrink: 0;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  h3 {
    padding: 3px;
    margin: 0;
    font-family: "Segoe UI", sans-serif;
    font-size: clamp(12px, 2vw, 16px);
    color: white;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const StoreBranding = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  row-gap: 8px;
  padding: clamp(8px, 2vw, 10px);
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
  min-width: 0;

  h3 {
    margin: 0;
    font-size: clamp(14px, 2vw, 16px);
    font-family: "Merriweather", serif;
    color: #333;
  }

  input {
    width: 100%;
    padding: clamp(6px, 1.5vw, 8px) clamp(8px, 2vw, 12px);
    font-family: "Merriweather", serif;
    font-size: clamp(12px, 2vw, 14px);
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #ff7e5f;
    }
  }
`;

export const Alignment = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 8px;
  min-width: 0;

  h3 {
    margin: 0;
    font-size: clamp(12px, 2vw, 16px);
    font-weight: 400;
    color: #333;
  }
`;

export const AllignmentInnerDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: clamp(6px, 1.5vw, 10px);
  width: 100%;

  button {
    cursor: pointer;
    min-width: clamp(44px, 12vw, 60px);
    min-height: clamp(32px, 8vw, 36px);
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: #f0f0f0;
      transform: scale(1.05);
    }
  }
`;

export const TextSize = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
  row-gap: 8px;
  min-width: 0;

  h3 {
    margin: 0;
    font-size: clamp(12px, 2vw, 16px);
    font-weight: 400;
    color: #333;
  }
`;

export const TextRangeDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: clamp(4px, 1vw, 8px);
  min-width: 0;

  input {
    flex: 1;
    min-width: 0;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  p {
    font-size: clamp(12px, 2vw, 16px);
    margin: 0;
    color: #555;
    flex-shrink: 0;
  }
`;

export const TextAndBackgroundDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 5px;
  position: relative;
  min-width: 0;

  div {
    display: flex;
    align-items: center;
    column-gap: clamp(4px, 1vw, 5px);
    flex-wrap: wrap;
    min-width: 0;
    position: relative;

    h2 {
      font-family: "Merriweather", serif;
      font-weight: 400;
      font-size: clamp(12px, 2vw, 16px);
      color: #333;
      margin: 0;
      flex: 1;
      min-width: 0;
    }
  }
`;

export const TextColor = styled.button<TextColorType>`
  width: clamp(36px, 10vw, 50px);
  height: clamp(28px, 6vh, 30px);
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  ${(props) => surfaceFillCss(props.$TextColor)}
  flex-shrink: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
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
  top: 32px;
  left: 0;
  padding-top: 5px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 30;
`;

export const BackgroundColorsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  width: clamp(64px, 18vw, 80px);
  max-height: min(300px, 40vh);
  position: absolute;
  top: 87px;
  left: 0;
  padding-top: 5px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 30;
`;

export const BackgroundColor = styled.button<BackgroundColorButtonType>`
  cursor: pointer;
  padding: clamp(6px, 1.5vw, 10px);
  width: clamp(36px, 10vw, 50px);
  height: clamp(28px, 6vh, 30px);
  border-radius: 10px;
  border: 1px solid #ccc;
  ${(props) => surfaceFillCss(props.$backgroundColor)}
  flex-shrink: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

export const ButtonText = styled.button<ButtonTextType>`
  cursor: pointer;
  padding: clamp(8px, 2vw, 15px);
  width: clamp(36px, 10vw, 50px);
  height: clamp(36px, 10vw, 50px);
  border-radius: 10px;
  border: none;
  ${(props) => surfaceFillCss(props.$allColors)}
  flex-shrink: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
`;
