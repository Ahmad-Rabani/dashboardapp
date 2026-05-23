"use client";

import React, { useContext, useEffect, useState } from "react";
import { MainDiv, HeaderDiv, HeaderText } from "./HeaderStylled";
import Sidebar from "../sidebar/Sidebar";
import HeaderSidebarContent from "../sidebar/HeaderSidebarContent";
import { MyContext } from "@/context/MyContext";
import { AlignedContent } from "@/styles/AppLayout";

const Header = () => {
  const [isHeader, setHeader] = useState(false);
  const [headerText, setHeaderText] = useState("Header");
  const [alignment, setAlignment] = useState<string>("center");
  const [textSize, setTextSize] = useState<string>("25");
  const [textColor, setTextColor] = useState<string>("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  const [, , , , , , , , isPreview] = useContext(MyContext);

  useEffect(() => {
    if (isPreview) setHeader(false);
  }, [isPreview]);

  function handleHeader() {
    if (isPreview) return;
    setHeader(!isHeader);
  }

  function closeBar() {
    setHeader(false);
  }

  return (
    <MainDiv>
      <AlignedContent>
        <HeaderDiv
          $preview={isPreview}
          $HeaderBackgroundColor={backgroundColor}
          onClick={handleHeader}
          style={{ cursor: isPreview ? "default" : "pointer" }}
        >
          <HeaderText
            $textColor={textColor}
            $Aligment={alignment}
            $TextSize={textSize}
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
