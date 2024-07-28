import styled from "styled-components";

interface ButtonTextType {
  $allColors: string;
}
interface BackgroundColorButtonType {
  $backgroundColor: string;
}

export const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const InnerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  border: 2px dotted blue;
  position: relative;
  background-color: #ececff;
`;

export const NewSectionDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    position: absolute;
    right: 10px;
    cursor: pointer;
  }
`;

export const TextAndImageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 30px;
  cursor: pointer;
  padding: 15px;

  div {
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    border-radius: 10px;
    background-color: white;
    padding: 25px 30px;
    height: 50px;
    width: 70px;
    cursor: pointer;
    position relative;

    input {
      z-index: 2;
    }
   
    label{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    column-gap: 5px;
    width: 100%;
    height: 100%;
    cursor: pointer;
    }

    p {
      margin: 8px;
      font-family: serif;
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

export const SidebarDiv = styled.div`
display: flex;
align-items: center;
padding: 10px;
column-gap: 5px; 
`