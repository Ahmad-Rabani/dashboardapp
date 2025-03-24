import styled from "styled-components";

interface ButtonTextType {
  $allColors: string;
}
interface BackgroundColorButtonType {
  $backgroundColor: string;
  $preview : boolean;
}

export const MainDivOfImage = styled.div<BackgroundColorButtonType>`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
padding: 20px 0px;
border: ${(props) => props.$preview ? "none" : "1px solid orange" };
background-color: ${(props) => props.$backgroundColor}
`

export const SidebarDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  column-gap: 5px;
`;

export const BackgroundColor = styled.button<BackgroundColorButtonType>`
  cursor: pointer;
  padding: 10px;
  width: 50px;
  height: 30px;
  border-radius: 10px;

  background-color: ${(props) => props.$backgroundColor};
`;

export const BackgroundColorsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: scroll;
  width: 80px;
  max-height: 300px;
  position: absolute;
  top: 60px;
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
