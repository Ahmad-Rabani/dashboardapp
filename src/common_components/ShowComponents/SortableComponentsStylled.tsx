import styled from "styled-components";

export const CopyButton = styled.button`
  position: absolute;
  right: 240px;
  top: 8px;
  cursor: pointer;
  background-color: white;
  padding: 5px 7px;
  border-radius: 50%;
  border: none;
  visibility: hidden;
`;
export const DeleteButton = styled.button`
  position: absolute;
  right: 205px;
  top: 8px;
  cursor: pointer;
  background-color: white;
  padding: 5px 7px;
  border-radius: 50%;
  border: none;
  visibility: hidden;
`;

export const DragButton = styled.button`
  position: absolute;
  left: 240px;
  top: 8px;
  cursor: pointer;
  background-color: white;
  padding: 5px 7px;
  border-radius: 50%;
  border: none;
  visibility: hidden;
`;


export const Line = styled.hr`
width: 50%;
margin: 0 auto;
`;

export const AddButton = styled.button`
  position: absolute;
  padding: 0 7px;
  border-radius: 50%;
  cursor: pointer;
  background-color: #0f0f6c;
  border: none;
  bottom: -10px; // Adjust to position the button correctly
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  color: white;
  visibility: hidden;
  font-size: 24px;
  `;
  
  export const Container = styled.div`
    position: relative;
    width: 100%;
    text-align: center;
    margin: 0px;
  
    &:hover ${AddButton} {
      visibility: visible;
    }
  `;

export const MainDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

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

export const ComponentsDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // width: 50%;
`;

export const ImageDiv = styled.div`
  width: 50%;
`;
