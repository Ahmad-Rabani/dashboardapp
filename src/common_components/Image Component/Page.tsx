"use client";

import React, { useContext, useEffect, useRef } from "react";
import { notify } from "@/utils/toast";
import Sidebar from "../sidebar/Sidebar";
import ImageSidebarContent from "../sidebar/ImageSidebarContent";
import { MainDivOfImage, ImageOuter } from "./ImageStylled";
import { MyContext } from "@/context/MyContext";

const ImageComponent = ({
  passTheImage,
  height,
  backgroundColor = "#ececff",
  onBackgroundColorChange,
}: {
  passTheImage: string;
  height?: number;
  backgroundColor?: string;
  onBackgroundColorChange?: (value: string) => void;
}) => {
  const [isBackground, setBackground] = React.useState(false);
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
      onBackgroundColorChange?.(value);
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
