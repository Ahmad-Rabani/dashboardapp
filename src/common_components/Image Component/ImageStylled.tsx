import styled from "styled-components";

interface ButtonTextType {
  $allColors: string;
}
interface BackgroundColorButtonType {
  $backgroundColor: string;
  $preview: boolean;
}

/* FIXED: image wrapper lacked min-width:0 → flex blowout on narrow screens */
export const MainDivOfImage = styled.div<BackgroundColorButtonType>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 0;
  padding: clamp(4px, 1vw, 8px) 0;
  border: ${(props) => (props.$preview ? "none" : "1px solid orange")};
  background-color: ${(props) => props.$backgroundColor};
  box-sizing: border-box;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    max-width: 100%;
  }

  > div {
    width: 100%;
    min-width: 0;
    overflow: hidden;
  }
`;

export const ImageOuter = styled.div`
  width: 100%;
  min-width: 0;
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
  background-color: ${(props) => props.$backgroundColor};
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
  background-color: ${(props) => props.$allColors};
  flex-shrink: 0;
`;
