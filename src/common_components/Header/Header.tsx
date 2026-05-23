"use client";

import React, { useContext, useEffect, useRef } from "react";
import { MainDiv, HeaderDiv, HeaderText } from "./HeaderStylled";
import Sidebar from "../sidebar/Sidebar";
import HeaderSidebarContent from "../sidebar/HeaderSidebarContent";
import { MyContext } from "@/context/MyContext";
import { useDashboardContext } from "@/context/DashboardContext";
import { AlignedContent } from "@/styles/AppLayout";

const Header = () => {
  const [isHeader, setHeader] = React.useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const { header, updateHeader } = useDashboardContext();
  const {
    headerText,
    alignment,
    textSize,
    textColor,
    backgroundColor,
    fontFamily,
  } = header;

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
              onHeaderTextChange={(value) => updateHeader({ headerText: value })}
              alignment={alignment}
              onAlignmentChange={(value) => updateHeader({ alignment: value })}
              textSize={textSize}
              onTextSizeChange={(value) => updateHeader({ textSize: value })}
              fontFamily={fontFamily}
              onFontFamilyChange={(value) => updateHeader({ fontFamily: value })}
              textColor={textColor}
              onTextColorChange={(value) => updateHeader({ textColor: value })}
              backgroundColor={backgroundColor}
              onBackgroundColorChange={(value) =>
                updateHeader({ backgroundColor: value })
              }
              onClose={closeBar}
            />
          </Sidebar>
        )}
      </AlignedContent>
    </MainDiv>
  );
};

export default Header;
