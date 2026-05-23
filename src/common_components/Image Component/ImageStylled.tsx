import styled from "styled-components";
import { surfaceFillCss } from "@/utils/colorStyle";

interface ButtonTextType {
  $allColors: string;
}
interface BackgroundColorButtonType {
  $backgroundColor: string;
  $preview: boolean;
  $height?: number;
}

/* FIXED: image wrapper lacked min-width:0 → flex blowout on narrow screens */
export const MainDivOfImage = styled.div<BackgroundColorButtonType>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 0;
  height: ${(props) => (props.$height ? `${props.$height}px` : "auto")};
  min-height: ${(props) => (props.$height ? `${props.$height}px` : "120px")};
  margin: 0;
  padding: 0;
  border: ${(props) => (props.$preview ? "none" : "1px solid transparent")};
  ${(props) => surfaceFillCss(props.$backgroundColor)}
  box-sizing: border-box;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    max-width: 100%;
  }

  > div,
  .image-section-hitarea {
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
  }
`;

export const ImagePlaceholder = styled.div<{ $backgroundColor: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 100%;
  min-height: inherit;
  padding: 24px;
  box-sizing: border-box;
  text-align: center;
  ${(props) => surfaceFillCss(props.$backgroundColor)}

  svg {
    width: clamp(48px, 12vw, 72px);
    height: clamp(48px, 12vw, 72px);
    opacity: 0.55;
    color: #64748b;
  }

  p {
    margin: 0;
    font-family: "Inter", system-ui, sans-serif;
    font-size: clamp(14px, 2vw, 16px);
    font-weight: 600;
    color: #334155;
  }

  span {
    font-family: "Inter", system-ui, sans-serif;
    font-size: clamp(12px, 1.5vw, 14px);
    color: #64748b;
  }
`;

export const ImageOuter = styled.div`
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
`;

export const SidebarDiv = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: clamp(5px, 2vw, 10px);
  gap: clamp(4px, 1vw, 5px);
  width: 100%;
  min-width: 0;
  position: relative;

  h2 {
    margin: 0;
    font-size: clamp(13px, 1.5vw, 16px);
    flex: 1;
    min-width: 0;
  }
`;

export const BackgroundColor = styled.button<BackgroundColorButtonType>`
  cursor: pointer;
  padding: clamp(6px, 1.5vw, 10px);
  min-width: clamp(36px, 10vw, 50px);
  min-height: clamp(28px, 6vh, 30px);
  border-radius: 10px;
  border: 1px solid #ccc;
  ${(props) => surfaceFillCss(props.$backgroundColor)}
  flex-shrink: 0;
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
  padding-top: 5px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  z-index: 30;
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
`;
