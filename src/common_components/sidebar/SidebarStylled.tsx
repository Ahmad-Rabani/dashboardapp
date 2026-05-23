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

/* FIXED: fixed 300px sidebar overflowed mobile → fluid width capped at viewport */
export const Body = styled.div<BodyTypes>`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: clamp(0px, 2vw, 10px);
  width: min(300px, calc(100vw - clamp(8px, 2vw, 16px)));
  max-width: 100%;
  height: 100vh;
  height: 100dvh;
  gap: clamp(6px, 1.5vw, 10px);
  padding: clamp(12px, 3vw, 20px);
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1100;
  border: none;
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background: linear-gradient(270deg, #ff7e5f, #feb47b, #86a8e7);
  background-size: 600% 600%;
  animation: ${gradientAnimation} 15s ease infinite;

  animation: ${(props) =>
      props.$outside
        ? css`${slideOut} 0.5s ease-out forwards`
        : css`${slideIn} 0.5s ease-out forwards`},
    ${gradientAnimation} 15s ease infinite;
`;
