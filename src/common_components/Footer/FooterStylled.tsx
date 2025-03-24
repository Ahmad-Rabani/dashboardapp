import styled from "styled-components";

// Interfaces remain the same
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

// Main container
export const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

// Footer container with modern borders, shadow, and spacing
export const FooterDiv = styled.footer<BackgroundColorButtonType>`
  width: clamp(50%, 100%, 600px);
  border: ${(props) => (props.$preview ? "none" : "2px solid #e0e0e0")};
  cursor: text;
  background-color: ${(props) => props.$backgroundColor};
  // margin: 20px auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: clamp(14px, 2vw, 18px);
    padding: 20px;
    margin: 0;
    font-family: "Inter", sans-serif;
    // color: #333;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Footer title styling
export const FooterTitle = styled.h3`
  padding: 12px 20px;
  margin: 0;
  font-family: "Inter", sans-serif;
  color: #333;
  font-size: 16px;
`;

// Container for footer inputs with refined spacing and font
export const FooterInputsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 15px;
  width: clamp(180px, 20vw, 220px);

  div {
    display: flex;
    align-items: center;
    gap: 8px;

    h3 {
      font-family: "Inter", sans-serif;
      font-size: 14px;
      font-weight: 500;
      margin: 0;
      // color: #555;
    }
  }
`;

// Attractive input field with smooth focus transition
export const FooterInputs = styled.input<InputCheckBox>`
  padding: 10px 12px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: ${(props) => (props.$checkbox ? "white" : "#f9f9f9")};
  transition: all 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
  }
`;

// General footer style container for inputs and buttons
export const FooterStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 90%;
  gap: 12px;

  div {
    display: flex;
    align-items: center;
    gap: 6px;

    button {
      width: 50px;
      height: 35px;
      border-radius: 8px;
      cursor: pointer;
      border: none;
      // background-color: #007bff;
      // color: #fff;
      transition: background-color 0.3s ease;

      // &:hover {
      //   background-color: #0056b3;
      // }
    }

    h2 {
      font-size: 14px;
      font-weight: 500;
      font-family: "Inter", sans-serif;
      color: #333;
    }
  }
`;

// Header style for titles
export const HeadStyle = styled.h3`
  margin: 0;
  text-align: left;
  font-family: "Inter", sans-serif;
  color: #333;
  font-size: 16px;
`;

// Container for background color options with border and rounded corners
export const BackgroundColorsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  width: 80px;
  max-height: 300px;
  position: absolute;
  top: clamp(500px, 50vh, 530px);
  left: 10px;
  padding: 8px 5px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;

  @media (max-width: 768px) {
    width: 70px;
    max-height: 200px;
    top: clamp(400px, 45vh, 450px);
  }
`;

// Individual background color button with a subtle hover scale effect
export const BackgroundColor = styled.button<BackgroundColorButtonType>`
  cursor: pointer;
  padding: 10px;
  width: clamp(40px, 10vw, 50px);
  height: clamp(25px, 6vh, 30px);
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: ${(props) => props.$backgroundColor};
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

// Button to display text with a hover opacity effect
export const ButtonText = styled.button<ButtonTextType>`
  cursor: pointer;
  padding: 15px;
  width: clamp(40px, 10vw, 50px);
  height: clamp(40px, 10vw, 50px);
  border-radius: 8px;
  border: none;
  background-color: ${(props) => props.$allColors};
  color: #fff;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

// Container for text color options with a clean white background and border
export const ColorsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  width: 80px;
  max-height: 300px;
  position: absolute;
  bottom: clamp(-80px, 10vh, -80px);
  left: 8px;
  padding: 8px 5px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;

  @media (max-width: 768px) {
    width: 70px;
    max-height: 200px;
    bottom: clamp(-60px, 8vh, -60px);
  }
`;

// Text color button with a hover scale effect
export const TextColor = styled.button<TextColorType>`
  width: clamp(40px, 10vw, 50px);
  height: clamp(25px, 6vh, 30px);
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: ${(props) => props.$TextColor};
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

// Footer text element displaying the chosen color
export const FooterTextColor = styled.h3<ColorType>`
  color: ${(props) => props.$color};
  font-family: "Inter", sans-serif;
  font-size: 16px;
`;

// Container for link color options with clean styling
export const LinkColorsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  width: 80px;
  max-height: 300px;
  position: absolute;
  bottom: clamp(-30px, 8vh, -30px);
  left: 8px;
  padding: 8px 5px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;

  @media (max-width: 768px) {
    width: 70px;
    max-height: 200px;
    bottom: clamp(-20px, 6vh, -20px);
  }
`;

// Link color button with a hover effect
export const LinkColor = styled.button<LinkColorType>`
  width: clamp(40px, 10vw, 50px);
  height: clamp(25px, 6vh, 30px);
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: ${(props) => props.$linkColor};
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

// Footer link text styled with underline for emphasis
export const FooterLinksColor = styled.h3<ColorType>`
  color: ${(props) => props.$color};
  text-decoration: underline;
  font-family: "Inter", sans-serif;
  font-size: 16px;
`;
