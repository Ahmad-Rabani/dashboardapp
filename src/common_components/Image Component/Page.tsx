"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { notify } from "@/utils/toast";
import Sidebar from "../sidebar/Sidebar";
import ImageSidebarContent from "../sidebar/ImageSidebarContent";
import { MainDivOfImage, ImageOuter } from "./ImageStylled";
import { MyContext } from "@/context/MyContext";

const ImageComponent = ({
  passTheImage,
  height,
}: {
  passTheImage: string;
  height?: number;
}) => {
  const [backgroundColor, setBackgroundColor] = useState("#ececff");
  const [isBackground, setBackground] = useState(false);
  const imageRef = useRef(null);

  const [, , , , , , , , isPreview] = useContext(MyContext);

  useEffect(() => {
    if (isPreview) setBackground(false);
  }, [isPreview]);

  function sectionMainDiv() {
    if (isPreview) return;
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
      <MainDivOfImage
        $backgroundColor={backgroundColor}
        $preview={isPreview}
        $height={height}
      >
        <div
          onClick={sectionMainDiv}
          style={{ cursor: isPreview ? "default" : "pointer" }}
        >
          <img ref={imageRef} src={passTheImage} alt="" />
        </div>

        {!isPreview && (
          <Sidebar open={isBackground} onClose={closeBar} label="Image settings">
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
