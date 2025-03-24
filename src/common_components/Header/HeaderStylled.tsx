import styled from "styled-components";

interface Types {
  $Aligment: string;
  $TextSize: string;
  $textColor: string;
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

export const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const HeaderDiv = styled.div<HeaderDivType>`
  width: clamp(50%, 100%, 600px);
  border: ${(props) => (props.$preview ? "none" : "2px solid #333")};
  cursor: text;
  background-color: ${(props) => props.$HeaderBackgroundColor};
  margin: 0 auto;
  border-radius: 10px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: #555;
  }
`;

export const HeaderText = styled.h3<Types>`
  text-align: ${(props) => props.$Aligment};
  font-size: clamp(10px, ${(props) => props.$TextSize + "px"}, 50px);
  color: ${(props) => props.$textColor};
  margin: 0;
  padding: 20px;
  font-family: "Segoe UI", sans-serif;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  transition: color 0.3s ease, text-shadow 0.3s ease;
`;

export const SidebarHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  background: linear-gradient(45deg, #ff7e5f, #feb47b);
  border-radius: 10px 10px 0 0;

  img {
    padding: 3px;
    cursor: pointer;
    width: clamp(20px, 5vw, 40px);
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
  }
`;

export const StoreBranding = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  row-gap: 8px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    margin: 0;
    font-size: clamp(14px, 2vw, 16px);
    font-family: "Merriweather", serif;
    color: #333;
  }

  input {
    padding: 8px 12px;
    font-family: "Merriweather", serif;
    font-size: clamp(12px, 2vw, 14px);
    border: 1px solid #ccc;
    border-radius: 5px;
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
  width: 90%;
  row-gap: 8px;

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
  gap: 10px;

  button {
    cursor: pointer;
    width: clamp(60px, 15vw, 80px);
    height: clamp(20px, 5vh, 25px);
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
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
  width: 90%;
  margin-top: 10px;
  row-gap: 8px;

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

  input {
    width: 90%;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  p {
    font-size: clamp(12px, 2vw, 16px);
    margin: 0;
    color: #555;
  }
`;

export const TextAndBackgroundDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  row-gap: 5px;
  position: relative;

  div {
    display: flex;
    align-items: center;
    column-gap: 5px;

    h2 {
      font-family: "Merriweather", serif;
      font-weight: 400;
      font-size: clamp(12px, 2vw, 16px);
      color: #333;
    }
  }
`;

export const TextColor = styled.button<TextColorType>`
  width: clamp(40px, 10vw, 50px);
  height: clamp(25px, 6vh, 30px);
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: ${(props) => props.$TextColor};
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
  width: 80px;
  max-height: 300px;
  position: absolute;
  top: 32px;
  left: -14px;
  padding-top: 5px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 70px;
    max-height: 200px;
  }
`;

export const BackgroundColorsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  width: 80px;
  max-height: 300px;
  position: absolute;
  top: 87px;
  left: -10px;
  padding-top: 5px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 70px;
    max-height: 200px;
  }
`;

export const BackgroundColor = styled.button<BackgroundColorButtonType>`
  cursor: pointer;
  padding: 10px;
  width: clamp(40px, 10vw, 50px);
  height: clamp(25px, 6vh, 30px);
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: ${(props) => props.$backgroundColor};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

export const ButtonText = styled.button<ButtonTextType>`
  cursor: pointer;
  padding: 15px;
  width: clamp(40px, 10vw, 50px);
  height: clamp(40px, 10vw, 50px);
  border-radius: 10px;
  border: none;
  background-color: ${(props) => props.$allColors};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
`;
