"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import {
  MainDiv,
  FooterDiv,
  FooterTextColor,
  FooterLinksColor,
} from "./FooterStylled";
import Sidebar from "../sidebar/Sidebar";
import FooterSidebarContent from "../sidebar/FooterSidebarContent";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "@/context/MyContext";
import { AlignedContent } from "@/styles/AppLayout";

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
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState<string>("#000000");
  const [linkColor, setLinkColor] = useState<string>("#2563eb");
  const refFooter = useRef<HTMLInputElement>(null);

  const [, , , , , , , , isPreview] = useContext(MyContext);

  useEffect(() => {
    if (isPreview) setFooter(false);
  }, [isPreview]);

  function handleFooter() {
    if (isPreview) return;
    setFooter(!isFooter);
  }

  function closeBar() {
    setFooter(false);
  }

  return (
    <MainDiv>
      <AlignedContent>
        <FooterDiv
          $backgroundColor={backgroundColor}
          $preview={isPreview}
          onClick={handleFooter}
          ref={refFooter}
          style={{ cursor: isPreview ? "default" : "pointer" }}
        >
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
      </AlignedContent>

      {!isPreview && (
        <Sidebar open={isFooter} onClose={closeBar} label="Footer settings">
          <FooterSidebarContent
            fields={{
              name: {
                label: "Name",
                value: name,
                enabled: nameCheckbox,
                onValueChange: setName,
                onEnabledChange: setNameCheckbox,
                placeholder: name,
                icon: faStore,
              },
              address: {
                label: "Address",
                value: address,
                enabled: addressCheckbox,
                onValueChange: setAddress,
                onEnabledChange: setAddressCheckbox,
                placeholder: address,
                icon: faLocationDot,
              },
              phone: {
                label: "Phone Number",
                value: phoneNumber,
                enabled: phoneNumberCheckbox,
                onValueChange: setPhoneNumber,
                onEnabledChange: setPhoneNumberCheckbox,
                placeholder: phoneNumber,
                icon: faPhone,
              },
              email: {
                label: "Email",
                value: email,
                enabled: emailCheckbox,
                onValueChange: setEmail,
                onEnabledChange: setEmailCheckbox,
                placeholder: email,
                icon: faEnvelope,
              },
            }}
            backgroundColor={backgroundColor}
            onBackgroundColorChange={setBackgroundColor}
            textColor={textColor}
            onTextColorChange={setTextColor}
            linkColor={linkColor}
            onLinkColorChange={setLinkColor}
            onClose={closeBar}
          />
        </Sidebar>
      )}
    </MainDiv>
  );
};

export default Footer;
