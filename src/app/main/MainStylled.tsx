import styled from "styled-components";

export const CopyButton = styled.button`
  position: absolute;
  right: clamp(20px, 10vw, 240px);
  cursor: pointer;
  background-color: white;
  padding: 5px 7px;
  border-radius: 50%;
  border: none;
  visibility: hidden;
`;

export const DeleteButton = styled.button`
  position: absolute;
  right: clamp(15px, 8vw, 205px);
  cursor: pointer;
  background-color: white;
  padding: 5px 7px;
  border-radius: 50%;
  border: none;
  visibility: hidden;
`;

export const DragButton = styled.button`
  position: absolute;
  left: clamp(20px, 10vw, 240px);
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
  width: 100%;
`;

// Uncomment and use this for hover visibility
// export const ComponentsDIv = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;

//   &:hover ${CopyButton}, 
//   &:hover ${DeleteButton}, 
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
  padding: 12px 20px;
  width: clamp(80px, 10vw, 100px);
  right: clamp(20px, 5vw, 70px);
  top: 50px;
  cursor: pointer;
  background: linear-gradient(145deg, #0f0f6c, #191981);
  color: white;
  font-size: 14px;
  font-weight: 530;
  column-gap: 8px;
  font-family: 'Inter', sans-serif;
  z-index: 10;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(15, 15, 108, 0.3);
  transform-origin: center;
  
  &:hover {
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 6px 20px rgba(15, 15, 108, 0.4);
    background: linear-gradient(145deg, #191981, #0f0f6c);
    letter-spacing: 0.5px;
  }

  &:active {
    transform: scale(0.98) translateY(0);
    box-shadow: 0 2px 10px rgba(15, 15, 108, 0.3);
  }

  & > svg {  /* If using an icon */
    transition: transform 0.3s ease;
  }

  &:hover > svg {
    transform: translateX(2px);
  }

  @media (max-width: 600px) {
    top: 20px;
    right: 20px;
    padding: 10px 16px;
    font-size: 13px;
    border-radius: 15px;
  }
`;

export const AddSection = styled.button`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: none;
  padding: 12px 24px;
  width: clamp(100px, 15vw, 120px);
  right: clamp(20px, 5vw, 60px);
  bottom: 50px;
  cursor: pointer;
  background: linear-gradient(145deg, #0f0f6c, #191981);
  color: white;
  font-size: 14px;
  column-gap: 8px;
  font-family: 'Inter', sans-serif;
  z-index: 10;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 4px 15px rgba(15, 15, 108, 0.3);
  transform-origin: center;
  
  &:hover {
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 6px 20px rgba(15, 15, 108, 0.4);
    background: linear-gradient(145deg, #191981, #0f0f6c);
    letter-spacing: 0.3px;
  }

  &:active {
    transform: scale(0.98) translateY(0);
    box-shadow: 0 2px 10px rgba(15, 15, 108, 0.3);
  }

  & > svg {
    transition: transform 0.3s ease;
    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
  }

  &:hover > svg {
    transform: translateY(-1px);
  }

  @media (max-width: 600px) {
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    font-size: 13px;
    border-radius: 15px;
    width: clamp(90px, 15vw, 110px);
  }
`;
