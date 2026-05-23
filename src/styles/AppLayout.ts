import styled, { css } from "styled-components";

/* Shared width rules — header, main cards, footer, image, and editor all use this */
export const alignedContentWidth = css`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  min-width: 0;

  @media (min-width: 768px) {
    width: 90%;
  }

  @media (min-width: 1024px) {
    width: 75%;
    max-width: 860px;
  }

  @media (min-width: 1280px) {
    width: 70%;
    max-width: 960px;
  }

  @media (min-width: 1440px) {
    width: 65%;
    max-width: 1100px;
  }

  @media (min-width: 1920px) {
    width: 60%;
    max-width: 1280px;
  }
`;

export const alignedHorizontalPadding = css`
  padding-left: 16px;
  padding-right: 16px;

  @media (min-width: 481px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

/** Same column width for header, footer, images, editor, and card blocks */
export const AlignedContent = styled.div`
  ${alignedContentWidth}
  ${alignedHorizontalPadding}
`;

export const AppRoot = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
  background-color: #e6e6e6;
`;

export const MainArea = styled.main`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
`;

export const ContentWrapper = styled(AlignedContent)`
  /* FIXED: vertical padding created gaps between sections → zero top/bottom padding */
  padding-top: 0;
  padding-bottom: 0;
`;

/* ADDED: fills space between header and footer for empty state centering */
export const EmptyStateWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 0;
`;
