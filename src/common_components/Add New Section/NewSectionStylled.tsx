import styled from "styled-components";

interface ButtonTextType {
  $allColors: string;
}
interface BackgroundColorButtonType {
  $backgroundColor: string;
}

/* FIXED: new section modal used fixed 50% width → fluid full-width card */
export const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: clamp(8px, 2vw, 16px) 0;
`;

export const InnerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: min(640px, 100%);
  border: 2px dotted blue;
  position: relative;
  background-color: #ececff;
  box-sizing: border-box;
  overflow: hidden;
  padding: clamp(8px, 2vw, 16px);
  border-radius: clamp(6px, 1vw, 10px);
`;

export const NewSectionDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  min-width: 0;

  img {
    position: absolute;
    right: clamp(5px, 2vw, 10px);
    top: clamp(5px, 2vw, 10px);
    cursor: pointer;
    width: clamp(16px, 4vw, 20px);
    height: auto;
  }
`;

export const TextAndImageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  gap: clamp(10px, 3vw, 30px);
  cursor: pointer;
  padding: clamp(10px, 2vw, 15px);
  width: 100%;
  box-sizing: border-box;

  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    border-radius: 10px;
    background-color: white;
    padding: clamp(16px, 4vw, 25px) clamp(20px, 5vw, 30px);
    min-height: clamp(44px, 12vw, 50px);
    flex: 1 1 clamp(100px, 30vw, 140px);
    max-width: 100%;
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
    min-width: 0;

    input {
      z-index: 2;
    }

    label {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: clamp(4px, 1vw, 5px);
      width: 100%;
      height: 100%;
      cursor: pointer;
      min-width: 0;
    }

    p {
      margin: clamp(4px, 1vw, 8px) 0 0;
      font-family: serif;
      font-size: clamp(13px, 1.5vw, 16px);
      text-align: center;
      overflow-wrap: break-word;
      word-break: break-word;
    }

    &:hover {
      background-color: #f6f2f2;
    }
  }
`;

export const ImageInput = styled.input`
  z-index: 1;
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
  overflow: auto;
  width: clamp(60px, 18vw, 80px);
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

export const SidebarDiv = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: clamp(8px, 2vw, 10px);
  gap: clamp(4px, 1vw, 5px);
  width: 100%;
  min-width: 0;
`;
