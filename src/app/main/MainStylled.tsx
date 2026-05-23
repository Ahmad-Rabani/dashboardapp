import styled from "styled-components";

/* Inner stack for cards — width comes from ContentWrapper, not this div */
export const MainDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  min-width: 0;
  padding-bottom: clamp(72px, 12vw, 96px);
`;

/* FIXED: gap between cards → absolute zero gap with hairline dividers only on cards */
export const SortableList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0 !important;
  margin: 0;
  padding: 0;
  min-width: 0;

  & > * {
    margin: 0 !important;
    padding: 0;
    display: block;
  }
`;

export const PreviewButton = styled.button`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: clamp(12px, 2vw, 20px);
  border: none;
  padding: clamp(8px, 2vw, 12px) clamp(12px, 3vw, 20px);
  min-width: clamp(72px, 18vw, 100px);
  max-width: calc(100vw - clamp(16px, 4vw, 32px));
  right: clamp(12px, 3vw, 24px);
  top: clamp(88px, 18vw, 108px);
  cursor: pointer;
  background: linear-gradient(145deg, #0f0f6c, #191981);
  color: white;
  font-size: clamp(12px, 1.5vw, 14px);
  font-weight: 530;
  column-gap: clamp(4px, 1vw, 8px);
  font-family: "Inter", sans-serif;
  z-index: 1200;
  transition: box-shadow 0.3s ease, background 0.3s ease;
  box-shadow: 0 4px 15px rgba(15, 15, 108, 0.3);
  box-sizing: border-box;
  flex-shrink: 0;

  &:hover {
    box-shadow: 0 6px 20px rgba(15, 15, 108, 0.4);
    background: linear-gradient(145deg, #191981, #0f0f6c);
  }

  img {
    flex-shrink: 0;
  }
`;

export const AddSection = styled.button`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: clamp(12px, 2vw, 20px);
  border: none;
  padding: clamp(8px, 2vw, 12px) clamp(12px, 3vw, 24px);
  min-width: clamp(88px, 22vw, 120px);
  max-width: calc(100vw - clamp(16px, 4vw, 32px));
  right: clamp(12px, 3vw, 24px);
  bottom: clamp(12px, 3vw, 24px);
  cursor: pointer;
  background: linear-gradient(145deg, #0f0f6c, #191981);
  color: white;
  font-size: clamp(12px, 1.5vw, 14px);
  column-gap: clamp(4px, 1vw, 8px);
  font-family: "Inter", sans-serif;
  z-index: 900;
  transition: box-shadow 0.3s ease, background 0.3s ease;
  box-shadow: 0 4px 15px rgba(15, 15, 108, 0.3);
  box-sizing: border-box;
  flex-shrink: 0;

  &:hover {
    box-shadow: 0 6px 20px rgba(15, 15, 108, 0.4);
    background: linear-gradient(145deg, #191981, #0f0f6c);
  }

  img {
    flex-shrink: 0;
  }
`;
