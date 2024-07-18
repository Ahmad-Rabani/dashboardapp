import React, { useState, useRef } from "react";
import {
  InnerDiv,
  MainDiv,
  NewSectionDiv,
  TextAndImageDiv,
  DragButton,
  CopyButton,
  DeleteButton,
} from "./NewSectionStylled";
import closeIcon from "../../../img/close.png";
import Image from "next/image";
import textIcon from "../../../img/text.png";
import imageIcon from "../../../img/insert-picture-icon.png";
import copy from "../../../img/copy-link.png";
import deleteIcon from "../../../img/delete.png";
import dragIcon from "../../../img/drag.png";
import LexicalTextEditor from "@/plugins/LexicalTextEditor/page";

const NewSection = () => {
  const [isTextEditor, setTextEditor] = useState(false);
  const [image, setImage] = useState("");
  const imageRef = useRef(null);

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

  return (
    <MainDiv>
      <InnerDiv>
        <DragButton draggable>
          <Image src={dragIcon} width={15} height={15} alt="" />
        </DragButton>

        <CopyButton>
          <Image src={copy} width={15} height={15} alt="" />
        </CopyButton>

        <DeleteButton>
          <Image src={deleteIcon} width={15} height={15} alt="" />
        </DeleteButton>
        {result && <img ref={imageRef} src={result} alt="" />}
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
                  <Image width={30} height={30} src={imageIcon} alt="" />
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
