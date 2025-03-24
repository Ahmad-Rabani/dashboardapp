import styled from "styled-components";

const primaryColor = "#FF6B35";
const hoverColor = "#FF5A1F";
const textColor = "#2D3047";

export const ActionButton = styled.button`
  cursor: pointer;
  background-color: ${primaryColor};
  color: white;
  padding: 8px;
  border-radius: 50%;
  border: none;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover {
    background-color: ${hoverColor};
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 6px;
    position: relative;
    right: auto !important;
    left: auto !important;
    margin: 0 4px;
  }
`;

export const CopyButton = styled(ActionButton)`
  position: absolute;
  right: -40px;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 768px) {
    right: 10px;
    top: 10px;
    transform: none;
  }
`;

export const DeleteButton = styled(ActionButton)`
  position: absolute;
  right: -75px;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 768px) {
    right: 50px;
    top: 10px;
    transform: none;
  }
`;

export const DragButton = styled(ActionButton)`
  position: absolute;
  left: -40px;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 768px) {
    left: 10px;
    top: 10px;
    transform: none;
  }
`;

export const Fdiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;

  &:hover ${ActionButton} {
    visibility: visible;
  }

  @media (max-width: 768px) {
    padding: 0 10px;
    
    ${ActionButton} {
      visibility: visible;
      position: absolute;
      top: 10px;
    }
  }
`;

export const TextEditor = styled.div`
  border: 2px solid #F5F5F5;
  border-radius: 8px;
  width: 100%;
  background-color: white;
  position: relative;
  transition: all 0.3s ease;
  min-height: 100px;

  &:focus-within {
    border-color: ${primaryColor};
    box-shadow: 0 4px 6px rgba(255,107,53,0.1);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    margin: 10px 0;
  }
`;