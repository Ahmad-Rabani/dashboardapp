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
  width: 50%;
  border: 2px solid black;
  cursor: text;
  background-color: white;
  background-color: ${(props) => props.$HeaderBackgroundColor};
`;

export const HeaderText = styled.h3<Types>`
  text-align: ${(props) => props.$Aligment};
  font-size: ${(props) => props.$TextSize}px;
  color: ${(props) => props.$textColor};
  margin: 0px;
  padding: 20px;
  font-family: sans-serif;
`;

export const SidebarHeading = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;

  img {
    padding: 3px;
    cursor: pointer;
  }

  h3 {
    padding: 3px;
    margin: 0px;
    font-family: sans-serif;
  }
`;

export const StoreBranding = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  row-gap: 8px;

  h3 {
    margin: 0;
    font-size: 16px;
    font-family: serif;
  }

  input {
    padding: 5px 5px 5px 10px;
    font-family: serif;
    font-size: 14px;
    border: 0.5px solid black;
    border-radius: 3px;
  }
`;

export const Alignment = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  row-gap: 4px;
  row-gap: 8px;

  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 400;
  }
`;

export const AllignmentInnerDiv = styled.div`
  display: flex;
  justify-content: center;

  button {
    cursor: pointer;
    width: 80px;
    height: 25px;
  }
`;

export const TextSize = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-top: 10px;
  row-gap: 4px;

  h3 {
    margin: 0;
     font-size: 14px;
     font-weight: 400;
`;

export const TextRangeDiv = styled.div`
  display: flex;
  width: 100%;
  input {
    width: 90%;
    cursor: pointer;
  }
  p {
    font-size: 14px;
    margin: 0;
  }
`;

export const TextAndBackgroundDiv = styled.div`
  display: flex;
  flex-direction: column;
  // jusitfy-content: start;
  // align-items: start !important;
  width: 90%;
  row-gap: 5px;

  div {
    display: flex;
    align-items: center;
    column-gap: 5px;

    h2 {
      font-family: serif;
      font-weight: 400;
      font-size: 14px;
    }
  }
`;

export const TextColor = styled.button<TextColorType>`
  width: 50px;
  height: 30px;
  border-radius: 10px;
  cursor: pointer;
  border: none;

  background-color: ${(props) => props.$TextColor};
`;

export const ColorsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: scroll;
  width: 80px;
  max-height: 300px;
  position: absolute;
  top: 362px;
  left: 8px;
  padding-top: 5px;
  background-color: white;
`;

export const ButtonText = styled.button<ButtonTextType>`
  cursor: pointer;
  padding: 15px;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => props.$allColors};
`;

export const BackgroundColorsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: scroll;
  width: 80px;
  max-height: 300px;
  position: absolute;
  top: 410px;
  left: 8px;
  padding-top: 5px;
  background-color: white;
`;

export const BackgroundColor = styled.button<BackgroundColorButtonType>`
  cursor: pointer;
  padding: 10px;
  width: 50px;
  height: 30px;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => props.$backgroundColor};
`;
