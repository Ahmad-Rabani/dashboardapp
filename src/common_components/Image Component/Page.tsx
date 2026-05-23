"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { notify } from "@/utils/toast";
import Sidebar from "../sidebar/Sidebar";
import ImageSidebarContent from "../sidebar/ImageSidebarContent";
import { MainDivOfImage, ImageOuter, ImagePlaceholder } from "./ImageStylled";
import { MyContext } from "@/context/MyContext";
import { hasDisplayableImage } from "@/utils/placeholderImage";

const ImageComponent = ({
  passTheImage,
  height,
  backgroundColor = "#ececff",
  onBackgroundColorChange,
  onImageChange,
}: {
  passTheImage: string;
  height?: number;
  backgroundColor?: string;
  onBackgroundColorChange?: (value: string) => void;
  onImageChange?: (dataUrl: string) => void;
}) => {
  const [isBackground, setBackground] = React.useState(false);
  const [displaySrc, setDisplaySrc] = useState(passTheImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [, , , , , , , , isPreview] = useContext(MyContext);

  useEffect(() => {
    setDisplaySrc(passTheImage);
  }, [passTheImage]);

  useEffect(() => {
    if (isPreview) setBackground(false);
  }, [isPreview]);

  const hasImage = hasDisplayableImage(displaySrc);

  function sectionMainDiv() {
    if (isPreview) return;

    if (!hasImage) {
      fileInputRef.current?.click();
      return;
    }

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

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      notify.error("Please choose an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const dataUrl = loadEvent.target?.result;
      if (typeof dataUrl !== "string") {
        notify.error();
        return;
      }
      setDisplaySrc(dataUrl);
      onImageChange?.(dataUrl);
      notify.imageUpdated();
    };
    reader.onerror = () => notify.error("Could not read that image.");
    reader.readAsDataURL(file);
  }

  return (
    <ImageOuter>
      <MainDivOfImage
        $backgroundColor={backgroundColor}
        $preview={isPreview}
        $height={height}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          tabIndex={-1}
          aria-hidden
          onChange={handleFileChange}
        />

        <div
          className="image-section-hitarea"
          onClick={sectionMainDiv}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              sectionMainDiv();
            }
          }}
          role={isPreview ? undefined : "button"}
          tabIndex={isPreview ? undefined : 0}
          aria-label={
            isPreview
              ? undefined
              : hasImage
                ? "Open image settings"
                : "Upload an image"
          }
          style={{ cursor: isPreview ? "default" : "pointer" }}
        >
          {hasImage ? (
            <img
              src={displaySrc}
              alt=""
              onError={() => setDisplaySrc("")}
            />
          ) : (
            <ImagePlaceholder $backgroundColor={backgroundColor}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <circle cx="8.5" cy="10.5" r="1.5" fill="currentColor" stroke="none" />
                <path d="M3 16l5-5 4 4 3-3 6 6" strokeLinejoin="round" />
              </svg>
              <p>Add your image</p>
              <span>Click to upload a photo</span>
            </ImagePlaceholder>
          )}
        </div>

        {!isPreview && (
          <Sidebar open={isBackground} onClose={closeBar} label="Image settings">
            <ImageSidebarContent
              backgroundColor={backgroundColor}
              onBackgroundColorChange={handleBackgroundColorChange}
              onImageChange={(dataUrl) => {
                setDisplaySrc(dataUrl);
                onImageChange?.(dataUrl);
              }}
              onRequestUpload={() => fileInputRef.current?.click()}
              onClose={closeBar}
            />
          </Sidebar>
        )}
      </MainDivOfImage>
    </ImageOuter>
  );
};

export default ImageComponent;
