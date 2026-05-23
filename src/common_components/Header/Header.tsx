"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { MainDiv, HeaderDiv, HeaderText } from "./HeaderStylled";
import Sidebar from "../sidebar/Sidebar";
import HeaderSidebarContent from "../sidebar/HeaderSidebarContent";
import { MyContext } from "@/context/MyContext";
import { DEFAULT_FONT_FAMILY } from "@/constants/fontFamilies";
import { AlignedContent } from "@/styles/AppLayout";

const Header = () => {
  const [isHeader, setHeader] = useState(false);
  const [headerText, setHeaderText] = useState("Header");
  const [alignment, setAlignment] = useState<string>("center");
  const [textSize, setTextSize] = useState<string>("25");
  const [textColor, setTextColor] = useState<string>("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [fontFamily, setFontFamily] = useState(DEFAULT_FONT_FAMILY);
  const headerRef = useRef<HTMLDivElement>(null);

  const [, , , , , , , , isPreview] = useContext(MyContext);

  useEffect(() => {
    if (isPreview) setHeader(false);
  }, [isPreview]);

  useEffect(() => {
    if (!isHeader || !headerRef.current) return;

    headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [isHeader]);

  function handleHeader() {
    if (isPreview) return;
    setHeader(!isHeader);
  }

  function closeBar() {
    setHeader(false);
  }

  return (
    <MainDiv $preview={isPreview}>
      <AlignedContent>
        <HeaderDiv
          ref={headerRef}
          $preview={isPreview}
          $HeaderBackgroundColor={backgroundColor}
          onClick={handleHeader}
          style={{ cursor: isPreview ? "default" : "pointer" }}
        >
          <HeaderText
            $textColor={textColor}
            $Aligment={alignment}
            $TextSize={textSize}
            $fontFamily={fontFamily}
          >
            {headerText}
          </HeaderText>
        </HeaderDiv>

        {!isPreview && (
          <Sidebar open={isHeader} onClose={closeBar} label="Header settings">
            <HeaderSidebarContent
              headerText={headerText}
              onHeaderTextChange={setHeaderText}
              alignment={alignment}
              onAlignmentChange={setAlignment}
              textSize={textSize}
              onTextSizeChange={setTextSize}
              fontFamily={fontFamily}
              onFontFamilyChange={setFontFamily}
              textColor={textColor}
              onTextColorChange={setTextColor}
              backgroundColor={backgroundColor}
              onBackgroundColorChange={setBackgroundColor}
              onClose={closeBar}
            />
          </Sidebar>
        )}
      </AlignedContent>
    </MainDiv>
  );
};

export default Header;
