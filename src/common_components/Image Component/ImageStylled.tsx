import styled from "styled-components";

interface ButtonTextType {
  $allColors: string;
}
interface BackgroundColorButtonType {
  $backgroundColor: string;
  $preview: boolean;
}

export const MainDivOfImage = styled.div<BackgroundColorButtonType>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: clamp(15px, 5vw, 20px) 0;
  border: ${(props) => (props.$preview ? "none" : "1px solid orange")};
  background-color: ${(props) => props.$backgroundColor};

  img {
    width: 100%; /* Make image occupy 50% of the screen */
    height: auto; /* Maintain aspect ratio */
    object-fit: contain; /* Ensures the entire image is visible without cropping */
    max-width: 100%; /* Prevents the image from exceeding container width */
  }
`;

export const SidebarDiv = styled.div`
  display: flex;
  align-items: center;
  padding: clamp(5px, 2vw, 10px);
  column-gap: clamp(4px, 1vw, 5px);
`;

export const BackgroundColor = styled.button<BackgroundColorButtonType>`
  cursor: pointer;
  padding: 10px;
  width: clamp(40px, 10vw, 50px);
  height: clamp(25px, 6vh, 30px);
  border-radius: 10px;
  background-color: ${(props) => props.$backgroundColor};
`;

export const BackgroundColorsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  width: clamp(70px, 15vw, 80px);
  max-height: 300px;
  position: absolute;
  top: clamp(50px, 10vh, 60px);
  padding-top: 5px;
  background-color: white;

  @media (max-width: 768px) {
    width: 70px;
    max-height: 200px;
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
`;
