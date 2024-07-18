import styled from "styled-components";

interface InputCheckBox {
  $checkbox: boolean;
}
interface ButtonTextType {
  $allColors: string;
}
interface BackgroundColorButtonType {
  $backgroundColor: string;
}
interface BackgroundColorButtonType {
  $backgroundColor: string;
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

export const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const FooterDiv = styled.footer<BackgroundColorButtonType>`
  width: 50%;
  border: 2px solid black;
  cursor: text;
  background-color: ${(props) => props.$backgroundColor};

  h3 {
    font-size: 14px;
    padding: 15px;
    margin: 0px;
    font-family: serif;
  }
`;

export const FooterTitle = styled.h3`
  padding: 10px;
  margin: 0px;
`;

export const FooterInputsDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 10px;
  width: 220px;

  div {
    display: flex;
    align-items: center;
    column-gap: 4px;

    h3 {
      font-family: sans-serif;
      font-size: 14px;
      font-weight: 400;
      margin: 0;
    }
  }
`;

export const FooterInputs = styled.input<InputCheckBox>`
  padding: 5px 5px 5px 10px;
  font-family: serif;
  font-size: 14px;
  border: 0.5px solid black;
  border-radius: 3px;
  background-color: ${(props) => props.$checkbox ? "white" : "#f2f2f2"}
`;

export const FooterStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  aligin-items: start;
  width: 90%;
  row-gap: 10px;

  div {
    display: flex;
    align-items: center;
    column-gap: 5px;

    button {
      width: 50px;
      height: 30px;
      border-radius: 10px;
      cursor: pointer;
      border: none;
    }
    h2 {
      font-size: 14px;
    }
  }
`;

export const HeadStyle = styled.h3`
  margin: 0px;
  text-align: start !important;
`;

export const BackgroundColorsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: scroll;
  width: 80px;
  max-height: 300px;
  position: absolute;
  top: 530px;
  left: 10px;
  padding-top: 5px;
  background-color: white;
`;

export const BackgroundColor = styled.button<BackgroundColorButtonType>`
  cursor: pointer;
  padding: 10px;
  width: 50px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid black !important;
  background-color: ${(props) => props.$backgroundColor} !important;
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

export const ColorsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: scroll;
  width: 80px;
  max-height: 300px;
  position: absolute;
  bottom: -80px;
  left: 8px;
  padding-top: 5px;
  background-color: white;
`;

export const TextColor = styled.button<TextColorType>`
  width: 50px;
  height: 30px;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid black !important;

  background-color: ${(props) => props.$TextColor};
`;

export const FooterTextColor = styled.h3<ColorType>`
color: ${(props) => props.$color};
`

export const LinkColorsDiv = styled.div`
display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: scroll;
  width: 80px;
  max-height: 300px;
  position: absolute;
  bottom: -30px;
  left: 8px;
  padding-top: 5px;
  background-color: white;
`

export const LinkColor = styled.button<LinkColorType>`
  width: 50px;
  height: 30px;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid black !important;

  background-color: ${(props) => props.$linkColor};
`;

export const FooterLinksColor = styled.h3<ColorType>`
color: ${(props) => props.$color};
text-decoration: underline;
`;