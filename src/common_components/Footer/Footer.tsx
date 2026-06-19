"use client";

import React, { useContext, useEffect, useRef } from "react";
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
import { useDashboardContext } from "@/context/DashboardContext";
import { AlignedContent } from "@/styles/AppLayout";

const Footer = () => {
  const [isFooter, setFooter] = React.useState(false);
  const refFooter = useRef<HTMLInputElement>(null);
  const { footer, updateFooter, setIsSidebarOpen } = useDashboardContext();
  const {
    name,
    nameCheckbox,
    address,
    addressCheckbox,
    phoneNumber,
    phoneNumberCheckbox,
    email,
    emailCheckbox,
    backgroundColor,
    textColor,
    linkColor,
  } = footer;

  const [, , , , , , , , isPreview] = useContext(MyContext);

  useEffect(() => {
    if (isPreview) setFooter(false);
  }, [isPreview]);

  useEffect(() => {
    setIsSidebarOpen(isFooter);
  }, [isFooter, setIsSidebarOpen]);

  useEffect(() => {
    if (!isFooter || !refFooter.current) return;

    refFooter.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [isFooter]);

  function handleFooter() {
    if (isPreview) return;
    setFooter(!isFooter);
  }

  function closeBar() {
    setFooter(false);
  }

  return (
    <MainDiv $preview={isPreview}>
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
                onValueChange: (value) => updateFooter({ name: value }),
                onEnabledChange: (value) => updateFooter({ nameCheckbox: value }),
                placeholder: name,
                icon: faStore,
              },
              address: {
                label: "Address",
                value: address,
                enabled: addressCheckbox,
                onValueChange: (value) => updateFooter({ address: value }),
                onEnabledChange: (value) =>
                  updateFooter({ addressCheckbox: value }),
                placeholder: address,
                icon: faLocationDot,
              },
              phone: {
                label: "Phone Number",
                value: phoneNumber,
                enabled: phoneNumberCheckbox,
                onValueChange: (value) => updateFooter({ phoneNumber: value }),
                onEnabledChange: (value) =>
                  updateFooter({ phoneNumberCheckbox: value }),
                placeholder: phoneNumber,
                icon: faPhone,
              },
              email: {
                label: "Email",
                value: email,
                enabled: emailCheckbox,
                onValueChange: (value) => updateFooter({ email: value }),
                onEnabledChange: (value) => updateFooter({ emailCheckbox: value }),
                placeholder: email,
                icon: faEnvelope,
              },
            }}
            backgroundColor={backgroundColor}
            onBackgroundColorChange={(value) =>
              updateFooter({ backgroundColor: value })
            }
            textColor={textColor}
            onTextColorChange={(value) => updateFooter({ textColor: value })}
            linkColor={linkColor}
            onLinkColorChange={(value) => updateFooter({ linkColor: value })}
            onClose={closeBar}
          />
        </Sidebar>
      )}
    </MainDiv>
  );
};

export default Footer;
