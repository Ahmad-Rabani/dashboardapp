/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useContext, useEffect } from "react";
import {
  InnerDiv,
  MainDiv,
  NewSectionDiv,
  TextAndImageDiv,
} from "./NewSectionStylled";
import closeIcon from "../../../img/close.png";
import Image from "next/image";
import textIcon from "../../../img/text.png";
import imageIcon from "../../../img/insert-picture-icon.png";
import { MyContext } from "@/app/layout";
import { v4 as uuidv4 } from "uuid";
// import { ComponentsType } from "next/dist/build/webpack/loaders/next-app-loader";
import { ComponentType } from "../../../types";

const NewSection = ({ currentIndex }: { currentIndex: number }) => {
  const [isTextEditor, setTextEditor] = useState(false);
  const [image, setImage] = useState<string>("");

  const [
    componentsArray,
    setComponentsArray,
    isNewSection,
    setNewSection,
    editorText,
    setEditorText,
    addNewSection,
    setAddNewSection,
  ] = useContext(MyContext);

  // Image functionality
  function useDisplayImage() {
    const [result, setResult] = useState("");

    function uploader(e: { target: { files: any[] } }) {
      const imageFile = e.target.files[0];

      const reader = new FileReader();
      reader.addEventListener("load", (e: any) => {
        setResult(e.target.result);
      });
      reader.readAsDataURL(imageFile);
    }
    return { result, uploader };
  }
  const { result, uploader } = useDisplayImage();

  // handling editor
  const handleEditor = () => {
    setComponentsArray((prevComponents: ComponentType) => {
      const newComponent = {
        key: uuidv4(),
        component: "Text",
        index: currentIndex + 1,
      };
      const updatedComponents = [
        ...prevComponents.slice(0, currentIndex + 1) ,
        newComponent,
        ...prevComponents.slice(currentIndex + 1),
      ];
      return updatedComponents;
    });

    setNewSection(false);
    setAddNewSection(false);
  };

  // setting image and push it to an array
  useEffect(() => {
    if (result) {
      setComponentsArray((prevComponents: ComponentType) => {
        const newComponent = { key: uuidv4(), img: result, index: currentIndex + 1 };
        const updatedComponents = [
          ...prevComponents.slice(0, currentIndex + 1),
          newComponent,
          ...prevComponents.slice(currentIndex + 1),
        ];
        return updatedComponents;
      });

      setNewSection(false);
      setAddNewSection(false);
    }
  }, [result, setComponentsArray]);

  // handling image
  function handleImage(e: React.ChangeEvent<HTMLInputElement> | any) {
    setImage(e.target.files[0]);
    uploader(e);
  }

  function handleClose() {
    setNewSection(false);
    setAddNewSection(false);
  }

  return (
    <MainDiv>
      <InnerDiv>
        <NewSectionDiv>
          <h2>Add a new section</h2>
          <Image
            onClick={handleClose}
            width={20}
            height={20}
            src={closeIcon}
            alt=""
          />
        </NewSectionDiv>
        <TextAndImageDiv>
          <div onClick={handleEditor}>
            <Image width={30} height={30} src={textIcon} alt="" />
            Text
          </div>

          <div style={{ position: "relative" }}>
            <label id="file-input">
              <input
                style={{ display: "contents" }}
                id="file-input"
                type="file"
                onChange={handleImage}
              />
              <Image width={30} height={30} src={imageIcon} alt="" />
              Image
            </label>
          </div>
        </TextAndImageDiv>
      </InnerDiv>
    </MainDiv>
  );
};

export default NewSection;
