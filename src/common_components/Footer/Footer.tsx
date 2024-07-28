"use client";

import React, { useState, useEffect,useRef } from "react";
import {
  MainDiv,
  FooterDiv,
  FooterTitle,
  FooterInputsDiv,
  FooterInputs,
  FooterStyle,
  HeadStyle,
  BackgroundColorsDiv,
  ButtonText,
  BackgroundColor,
  ColorsDiv,
  TextColor,
  LinkColor,
  LinkColorsDiv,
  FooterTextColor,
  FooterLinksColor,
} from "./FooterStylled";
import Sidebar from "../sidebar/Sidebar";

const Footer = () => {
  const [isFooter, setFooter] = useState(false);
  const [name, setName] = useState<string>("shop desription");
  const [nameCheckbox, setNameCheckbox] = useState(false);
  const [address, setAddress] = useState<string>("Address");
  const [addressCheckbox, setAddressCheckbox] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("Phone Number");
  const [phoneNumberCheckbox, setPhoneNumberCheckbox] = useState(false);
  const [email, setEmail] = useState<string>("Email");
  const [emailCheckbox, setEmailCheckbox] = useState(false);
  const [colors, setColor] = useState([]);
  const [isBackroundButton, setBackgroundButton] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [isColor, setIsColor] = useState<boolean>(false);
  const [textColor, setTextColor] = useState<string>("black");
  const [isLinkButton, setLinkButton] = useState<boolean>(false);
  const [linkColor, setLinkColor] = useState<string>("blue");
  const [hideColors, setHideColors] = useState(false);
  const refFooter = useRef();

  useEffect(() => {
    let colorArray: any = [
      "#FF6633",
      "#FFB399",
      "#FF33FF",
      "#FFFF99",
      "#00B3E6",
      "#E6B333",
      "#3366E6",
      "#999966",
      "#99FF99",
      "#B34D4D",
      "#80B300",
      "#809900",
      "#E6B3B3",
      "#6680B3",
      "#66991A",
      "#FF99E6",
      "#CCFF1A",
      "#FF1A66",
      "#E6331A",
      "#33FFCC",
      "#66994D",
      "#B366CC",
      "#4D8000",
      "#B33300",
      "#CC80CC",
      "#66664D",
      "#991AFF",
      "#E666FF",
      "#4DB3FF",
      "#1AB399",
      "#E666B3",
      "#33991A",
      "#CC9999",
      "#B3B31A",
      "#00E680",
      "#4D8066",
      "#809980",
      "#E6FF80",
      "#1AFF33",
      "#999933",
      "#FF3380",
      "#CCCC00",
      "#66E64D",
      "#4D80CC",
      "#9900B3",
      "#E64D66",
      "#4DB380",
      "#FF4D4D",
      "#99E6E6",
      "#6666FF",
    ];

    setColor(colorArray);
  }, []);
  
  function handleFooter() {
    setFooter(!isFooter);
  }

  function handleNameInput(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleNameCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    setNameCheckbox(e.target.checked);
  }

  function handleAddressInput(e: React.ChangeEvent<HTMLInputElement>) {
    setAddress(e.target.value);
  }

  function handleAddressCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    setAddressCheckbox(e.target.checked);
  }

  function handlePhoneNumberCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    setPhoneNumberCheckbox(e.target.checked);
  }

  function hanldePhoneNumberInput(e: React.ChangeEvent<HTMLInputElement>) {
    setPhoneNumber(e.target.value);
  }

  function handleEmailCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    setEmailCheckbox(e.target.checked);
  }

  function hanldeEmailInput(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function selectBackgroundColor(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) {
    setBackgroundColor(e.target.textContent);
  }

  function selectBackgroundButtonColor() {
    setIsColor(false);
    setLinkButton(false);
    setBackgroundButton(!isBackroundButton);
  }

  function selectColor() {
    setBackgroundButton(false);
    setLinkButton(false);
    setIsColor(!isColor);
  }

  function selectedColor(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) {
    setTextColor(e.target.textContent);
  }

  function selectLinkColorButton() {
    setBackgroundButton(false);
    setIsColor(false);
    setLinkButton(!isLinkButton);
  }

  function selectLinkColor(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) {
    setLinkColor(e.target.textContent);
  }

  function colorsDivClicked() {
    setHideColors(true);
  }

  function handleColors() {
    if (hideColors) {
      setBackgroundButton(false);
      setIsColor(false);
      setLinkButton(false);
      setHideColors(false);
    }
  }

  return (
    <MainDiv onClick={handleColors} >
      <FooterDiv $backgroundColor={backgroundColor} onClick={handleFooter} ref={refFooter}>
        <FooterTextColor $color={textColor}>{name}</FooterTextColor>
        {addressCheckbox && (
          <FooterTextColor $color={textColor}>{address}</FooterTextColor>
        )}
        {phoneNumberCheckbox && (
          <FooterLinksColor $color={linkColor}>{phoneNumber}</FooterLinksColor>
        )}
        {emailCheckbox && (
          <FooterLinksColor $color={linkColor}>{email}</FooterLinksColor>
        )}
      </FooterDiv>

      {isFooter && (
        <Sidebar>
          <FooterTitle>Footer</FooterTitle>

          <hr style={{ width: "100%" }} />

          <FooterInputsDiv>
            <div>
              <input onChange={handleNameCheckbox} type="checkbox" />
              <h3>Name</h3>
            </div>
            <FooterInputs
              $checkbox={nameCheckbox}
              onChange={handleNameInput}
              type="text"
              placeholder={name}
              readOnly={!nameCheckbox}
            />
          </FooterInputsDiv>

          <FooterInputsDiv>
            <div>
              <input onChange={handleAddressCheckbox} type="checkbox" /> Address
            </div>
            <FooterInputs
              $checkbox={addressCheckbox}
              onChange={handleAddressInput}
              type="text"
              placeholder={address}
              readOnly={!addressCheckbox}
            />
          </FooterInputsDiv>

          <FooterInputsDiv>
            <div>
              <input onChange={handlePhoneNumberCheckbox} type="checkbox" />{" "}
              Phone Number
            </div>
            <FooterInputs
              $checkbox={phoneNumberCheckbox}
              onChange={hanldePhoneNumberInput}
              type="text"
              placeholder={phoneNumber}
              readOnly={!phoneNumberCheckbox}
            />
          </FooterInputsDiv>

          <FooterInputsDiv>
            <div>
              <input onChange={handleEmailCheckbox} type="checkbox" /> Email
            </div>
            <FooterInputs
              $checkbox={emailCheckbox}
              onChange={hanldeEmailInput}
              type="text"
              placeholder={email}
              readOnly={!emailCheckbox}
            />
          </FooterInputsDiv>

          <hr style={{ width: "100%" }} />

          <FooterStyle onClick={colorsDivClicked}>
            <HeadStyle>Style</HeadStyle>

            <div>
              <BackgroundColor
                onClick={selectBackgroundButtonColor}
                $backgroundColor={backgroundColor}
              ></BackgroundColor>
              {isBackroundButton && (
                <BackgroundColorsDiv>
                  {colors.map((item, i) => (
                    <ButtonText
                      onClick={selectBackgroundColor}
                      key={i}
                      $allColors={item}
                    >
                      <p style={{ display: "none" }}>{item}</p>
                    </ButtonText>
                  ))}
                </BackgroundColorsDiv>
              )}
              <h2>Background</h2>
            </div>

            <div>
              <LinkColor
                onClick={selectLinkColorButton}
                $linkColor={linkColor}
              ></LinkColor>
              {isLinkButton && (
                <LinkColorsDiv>
                  {colors.map((item, i) => (
                    <ButtonText
                      onClick={selectLinkColor}
                      key={i}
                      $allColors={item}
                    >
                      <p style={{ display: "none" }}>{item}</p>
                    </ButtonText>
                  ))}
                </LinkColorsDiv>
              )}
              <h2>Links</h2>
            </div>

            <div>
              <TextColor
                onClick={selectColor}
                $TextColor={textColor}
              ></TextColor>
              {isColor && (
                <ColorsDiv>
                  {colors.map((item, i) => (
                    <ButtonText
                      onClick={selectedColor}
                      key={i}
                      $allColors={item}
                    >
                      <p style={{ display: "none" }}>{item}</p>
                    </ButtonText>
                  ))}
                </ColorsDiv>
              )}
              <h2>Text</h2>
            </div>
          </FooterStyle>
        </Sidebar>
      )}
    </MainDiv>
  );
};

export default Footer;