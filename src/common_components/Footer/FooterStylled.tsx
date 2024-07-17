import styled from "styled-components";

export const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const FooterDiv = styled.footer`
  width: 50%;
  border: 2px solid black;
  cursor: text;
  background-color: white;

  h3 {
    font-size: 14px;
    padding: 20px;
  }
`;

export const FooterInputsDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  div {
    display: flex;
    align-items: center;
    column-gap: 4px;

    h3 {
      font-family: sans-serif;
      font-size: 14px;
      font-weight: 400;
      margin: 0;
    }
  }
`;

export const FooterInputs = styled.input`
  padding: 5px 5px 5px 10px;
  font-family: serif;
  font-size: 14px;
  border: 0.5px solid black;
  border-radius: 3px;
`;

export const FooterStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  row-gap: 10px;

  div {
    display: flex;
    align-items: center;
    column-gap: 5px;

    button {
      height: 25px;
      width: 40px;
      cursor: pointer;
    }
    h2 {
      font-size: 14px;
    }
  }
`;

export const HeadStyle = styled.h3`
  text-align: start !important;
`;
