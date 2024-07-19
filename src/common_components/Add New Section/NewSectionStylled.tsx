import styled from "styled-components";

interface ButtonTextType {
  $allColors: string;
}
interface BackgroundColorButtonType {
  $backgroundColor: string;
}

export const CopyButton = styled.button`
  position: absolute;
  right: -40px;
  cursor: pointer;
  background-color: white;
  padding: 5px 7px;
  border-radius: 50%;
  border: none;
  visibility: hidden;
`;
export const DeleteButton = styled.button`
  position: absolute;
  right: -75px;
  cursor: pointer;
  background-color: white;
  padding: 5px 7px;
  border-radius: 50%;
  border: none;
  visibility: hidden;
`;

export const DragButton = styled.button`
  position: absolute;
  left: -40px;
  cursor: pointer;
  background-color: white;
  padding: 5px 7px;
  border-radius: 50%;
  border: none;
  visibility: hidden;
`;

export const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  &:hover ${CopyButton} {
    visibility: visible;
  }

  &:hover ${DeleteButton} {
    visibility: visible;
  }

  &:hover ${DragButton} {
    visibility: visible;
  }
`;

export const InnerDiv = styled.div<BackgroundColorButtonType>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  border: 2px dotted blue;
  position: relative;
  background-color: ${(props) => props.$backgroundColor};
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
    position: absolute;
    width: 100%;
    height: 100%;
    top: -2px;
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