/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useState, useRef,useContext,useEffect } from "react";
import {
  InnerDiv,
  MainDiv,
  NewSectionDiv,
  TextAndImageDiv,
  DragButton,
  CopyButton,
  DeleteButton,
  BackgroundColor,
  BackgroundColorsDiv,
  ButtonText,
  SidebarDiv,
} from "./NewSectionStylled";
import closeIcon from "../../../img/close.png";
import Image from "next/image";
import textIcon from "../../../img/text.png";
import imageIcon from "../../../img/insert-picture-icon.png";
import copy from "../../../img/copy-link.png";
import deleteIcon from "../../../img/delete.png";
import dragIcon from "../../../img/drag.png";
import LexicalTextEditor from "@/plugins/LexicalTextEditor/page";
import { MyContext } from "@/app/layout";
import Sidebar from "../sidebar/Sidebar";

const NewSection = () => {
  const [isTextEditor, setTextEditor] = useState(false);
  const [image, setImage] = useState("");
  const imageRef = useRef(null);
  const [isBackground, setBackground] = useState(false);
  const [colors, setColor] = useState([]);
  const [isBackroundButton, setBackgroundButton] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#ececff");

  useEffect(() => {
    let colorArray: any = [
      "#FF6633",
      "#FFB399",
      "#FF33FF",
      "#FFFF99",
      "#00B3E6",
      "#E6B333",
      "#3366E6",
      "#999966",
      "#99FF99",
      "#B34D4D",
      "#80B300",
      "#809900",
      "#E6B3B3",
      "#6680B3",
      "#66991A",
      "#FF99E6",
      "#CCFF1A",
      "#FF1A66",
      "#E6331A",
      "#33FFCC",
      "#66994D",
      "#B366CC",
      "#4D8000",
      "#B33300",
      "#CC80CC",
      "#66664D",
      "#991AFF",
      "#E666FF",
      "#4DB3FF",
      "#1AB399",
      "#E666B3",
      "#33991A",
      "#CC9999",
      "#B3B31A",
      "#00E680",
      "#4D8066",
      "#809980",
      "#E6FF80",
      "#1AFF33",
      "#999933",
      "#FF3380",
      "#CCCC00",
      "#66E64D",
      "#4D80CC",
      "#9900B3",
      "#E64D66",
      "#4DB380",
      "#FF4D4D",
      "#99E6E6",
      "#6666FF",
    ];

    setColor(colorArray);
  }, []);

  function useDisplayImage() {
    const [result, setResult] = useState("");

    function uploader(e: { target: { files: any[]; }; }) {
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
  
  function imageFnc() {}
  
  function handleEditor() {
    setTextEditor(true);
  }

  function selectBackgroundButtonColor() {
    setBackgroundButton(!isBackroundButton);
  }

  function selectBackgroundColor(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) {
    setBackgroundColor(e.target.textContent);
  }

  // const componentsArray: [] = useContext(MyContext);
  
  function sectionMainDiv(e: React.MouseEvent<HTMLElement>) {
    setBackground(!isBackground)
  }

  function deleteSection() {
  // componentsArray.filter((item) => console.log(item))
  }

  return (
    <MainDiv>
      <InnerDiv $backgroundColor={backgroundColor}>
        <DragButton draggable>
          <Image src={dragIcon} width={15} height={15} alt="" />
        </DragButton>

        <CopyButton>
          <Image src={copy} width={15} height={15} alt="" />
        </CopyButton>

        <DeleteButton onClick={deleteSection}>
          <Image src={deleteIcon} width={15} height={15} alt="" />
        </DeleteButton>
        {result &&
        <>
        <div onClick={sectionMainDiv}>
         <img ref={imageRef} src={result} alt="" /> 
         </div>
          {isBackground && <Sidebar>
            <SidebarDiv>
              <BackgroundColor
                onClick={selectBackgroundButtonColor}
                $backgroundColor={backgroundColor}
              ></BackgroundColor>
              {isBackroundButton && (
                <BackgroundColorsDiv>
                  {colors.map((item, i) => (
                    <ButtonText
                      key={i}
                      onClick={selectBackgroundColor}
                      $allColors={item}
                    >
                      <p style={{ display: "none" }}>{item}</p>
                    </ButtonText>
                  ))}
                </BackgroundColorsDiv>
              )}
              <h2>Background</h2>
            </SidebarDiv>
            </Sidebar>}
            </>
         }
        {isTextEditor && <LexicalTextEditor />}

        {(!result && !isTextEditor) &&(
          <>
            <NewSectionDiv>
              <h2>Add a new section</h2>
              <Image width={20} height={20} src={closeIcon} alt="" />
            </NewSectionDiv>
            <TextAndImageDiv>

              <div onClick={handleEditor}>
                <Image width={30} height={30} src={textIcon} alt="" />
                <p>Text</p>
              </div>

              <div onClick={imageFnc} style={{ position: "relative" }}>
                <label id="file-input">
                <input
                style={{display: "contents"}}
                  id="file-input"
                  type="file"
                  onChange={(e:any) => {
                    setImage(e.target.files[0]);
                    uploader(e);
                  }}
                />
                  <Image style={{position: "absolute",top: "14px ",left: "49px"}} width={30} height={30} src={imageIcon} alt="" />
                </label>
                
                <p>Image</p>
              </div>
            </TextAndImageDiv>
          </>
        )}
      </InnerDiv>
    </MainDiv>
  );
};

export default NewSection;
