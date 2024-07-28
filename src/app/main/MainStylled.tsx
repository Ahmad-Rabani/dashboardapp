import styled from "styled-components";

export const CopyButton = styled.button`
  position: absolute;
  right: 240px;
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
  flex-direction: column;
`;

// export const ComponentsDIv = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;

//   &:hover ${CopyButton} {
//     visibility: visible;
//   }

//   &:hover ${DeleteButton} {
//     visibility: visible;
//   }

//   &:hover ${DragButton} {
//     visibility: visible;
//   }
// `;

export const PreviewButton = styled.button`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: none;
  padding: 7px;
  width: 100px;
  right: 70px;
  top: 50px;
  cursor: pointer;
  background-color: #0f0f6c;
  color: white;
  font-size: 14px;
  font-weight: 530;
  column-gap: 6px;
  font-family: revert;
`;

export const AddSection = styled.button`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: none;
  padding: 7px;
  width: 120px;
  right: 60px;
  bottom: 50px;
  cursor: pointer;
  background-color: #0f0f6c;
  color: white;
  font-size: 14px;
  column-gap: 6px;
  font-family: revert;
`;
