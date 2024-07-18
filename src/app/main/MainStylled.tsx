import styled from "styled-components";

export const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const HeaderDiv = styled.div`
  width: 50%;
  border: 2px solid black;
  cursor: text;
  background-color: white;

  h1 {
    text-align: center;
  }
`;

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
