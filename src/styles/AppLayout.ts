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
  padding-right: var(--editor-sidebar-inset, 0px);
  padding-bottom: calc(
    var(--floating-toolbar-height, 88px) + env(safe-area-inset-bottom, 0px) + 16px
  );
  background-color: hsl(var(--app-shell-bg, 0 0% 90%));
  color: hsl(var(--foreground));
  transition: background-color 0.3s ease, color 0.3s ease, padding-right 0.3s ease;
  box-sizing: border-box;
`;

/** Header, sections, and footer share one vertical rhythm */
export const ExportRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--section-stack-gap, 8px);
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: var(--section-stack-gap, 8px) 0;
`;

export const MainArea = styled.main`
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
`;

export const ContentWrapper = styled(AlignedContent)`
  padding-top: 0;
  padding-bottom: 0;
`;

/** Centers aligned content when parent strips auto margins (e.g. SortableList) */
export const CenteredAlignedSlot = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  min-width: 0;
`;

/* ADDED: fills space between header and footer for empty state centering */
export const EmptyStateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: calc(
    100dvh - var(--header-height, 72px) - 96px -
      var(--floating-toolbar-height, 148px)
  );
`;
