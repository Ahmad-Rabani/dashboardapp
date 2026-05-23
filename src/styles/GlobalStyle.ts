import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* FIXED: missing box model + overflow resets → prevent horizontal scroll and layout blowout */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    width: 100%;
    min-height: 100%;
    font-size: clamp(13px, 1.5vw, 16px);
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
  }

  img,
  video {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* FIXED: text overflow at narrow viewports → fluid typography + word breaking */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: clamp(16px, 3vw, 32px);
    overflow-wrap: break-word;
    word-break: break-word;
  }

  p,
  span,
  li,
  td,
  a,
  label {
    overflow-wrap: break-word;
    word-break: break-word;
  }

  button {
    font: inherit;
  }
`;

export default GlobalStyle;
