"use client";

import React, { useContext, useRef, useState } from "react";
import { notify } from "@/utils/toast";
import Sidebar from "../sidebar/Sidebar";
import ImageSidebarContent from "../sidebar/ImageSidebarContent";
import { MainDivOfImage, ImageOuter } from "./ImageStylled";
import { MyContext } from "@/context/MyContext";

const ImageComponent = ({ passTheImage }: { passTheImage: string }) => {
  const [backgroundColor, setBackgroundColor] = useState("#ececff");
  const [isBackground, setBackground] = useState(false);
  const imageRef = useRef(null);

  const [, , , , , , , , isPreview] = useContext(MyContext);

  function sectionMainDiv() {
    setBackground(!isBackground);
  }

  function closeBar() {
    setBackground(false);
  }

  function handleBackgroundColorChange(value: string) {
    try {
      setBackgroundColor(value);
      notify.imageUpdated();
    } catch {
      notify.error();
    }
  }

  return (
    <ImageOuter>
      <MainDivOfImage $backgroundColor={backgroundColor} $preview={isPreview}>
        <div onClick={!isPreview ? sectionMainDiv : undefined}>
          <img ref={imageRef} src={passTheImage} alt="" />
        </div>

        {!isPreview && (
          <Sidebar open={isBackground} onClose={closeBar}>
            <ImageSidebarContent
              backgroundColor={backgroundColor}
              onBackgroundColorChange={handleBackgroundColorChange}
              onClose={closeBar}
            />
          </Sidebar>
        )}
      </MainDivOfImage>
    </ImageOuter>
  );
};

export default ImageComponent;
