import styled, { keyframes, css } from "styled-components";

interface BodyTypes {
  $outside: boolean;
}

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const Body = styled.div<BodyTypes>`
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 10px;
  width: 300px;
  height: 100vh;
  gap: 10px;
  padding: 20px;
  overflow: hidden;
  z-index: 20;
  border: none;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  /* Gradient background with continuous animation */
  background: linear-gradient(270deg, #ff7e5f, #feb47b, #86a8e7);
  background-size: 600% 600%;
  animation: ${gradientAnimation} 15s ease infinite;

  /* Conditional slide animation: open or close based on $outside */
  animation: 
    ${props => props.$outside 
      ? css`${slideOut} 0.5s ease-out forwards` 
      : css`${slideIn} 0.5s ease-out forwards`},
    ${gradientAnimation} 15s ease infinite;
`;
