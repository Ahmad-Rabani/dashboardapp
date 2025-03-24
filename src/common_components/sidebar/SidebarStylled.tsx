import styled from "styled-components";

interface BodyTypes {
  $outside: boolean;
}

export const Body = styled.div<BodyTypes>`
  display: ${(props) => props.$outside ? "none" : "flex"};
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 10px;
  border: none;
  gap: 10px;
  background-color: #f2f2f2;
  height: 100vh;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  z-index: 1;
  overflow: hidden;
`;