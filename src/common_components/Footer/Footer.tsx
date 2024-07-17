"use client";

import React, { useState } from "react";
import {
  MainDiv,
  FooterDiv,
  FooterInputsDiv,
  FooterInputs,
  FooterStyle,
  HeadStyle
} from "./FooterStylled";
import Sidebar from "../sidebar/Sidebar";

const Footer = () => {
  const [isFooter, setFooter] = useState(false);

  function handleFooter() {
    setFooter(!isFooter);
  }
  return (
    <MainDiv>
      <FooterDiv onClick={handleFooter}>
        <h3>shop description</h3>
      </FooterDiv>

      {isFooter && (
        <Sidebar>
          <h3>Footer</h3>

          <FooterInputsDiv>
            <div>
              <input type="checkbox" />
              <h3>Name</h3>
            </div>
            <FooterInputs type="text" />
          </FooterInputsDiv>

          <FooterInputsDiv>
            <div>
              <input type="checkbox" /> Address
            </div>
            <FooterInputs type="text" placeholder="Address"/>
          </FooterInputsDiv>

          <FooterInputsDiv>
            <div>
              <input type="checkbox" /> Phone Number
            </div>
            <FooterInputs type="text" placeholder="0123456789"/>
          </FooterInputsDiv>

          <FooterInputsDiv>
            <div>
              <input type="checkbox" /> Email
            </div>
            <FooterInputs type="text" placeholder="shop@gmail.com"/>
          </FooterInputsDiv>

          <hr />

          <FooterStyle>
            <HeadStyle>Style</HeadStyle>
            <div>
              <button></button>
              <h2>Backround</h2>
            </div>

            <div>
              <button></button>
              <h2>Links</h2>
            </div>

            <div>
              <button></button>
              <h2>Text</h2>
            </div>
          </FooterStyle>
        </Sidebar>
      )}
    </MainDiv>
  );
};

export default Footer;
