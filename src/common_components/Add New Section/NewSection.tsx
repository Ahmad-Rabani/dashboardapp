import React from "react";
import {
  InnerDiv,
  MainDiv,
  NewSectionDiv,
  TextAndImageDiv,
  DragButton,
  CopyButton,
  DeleteButton
} from "./NewSectionStylled";
import closeIcon from "../../../img/close.png";
import Image from "next/image";
import textIcon from "../../../img/text.png";
import imageIcon from "../../../img/insert-picture-icon.png";
import copy from "../../../img/copy-link.png";
import deleteIcon from "../../../img/delete.png"
import dragIcon from "../../../img/drag.png"

const NewSection = () => {
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
        <NewSectionDiv>
          <h2>Add a new section</h2>
          <Image width={20} height={20} src={closeIcon} alt="" />
        </NewSectionDiv>

        <TextAndImageDiv>
          <div>
            <Image width={30} height={30} src={textIcon} alt="" />
            <p>Text</p>
          </div>

          <div>
            <Image width={30} height={30} src={imageIcon} alt="" />
            <p>Image</p>
          </div>
        </TextAndImageDiv>
      </InnerDiv>
    </MainDiv>
  );
};

export default NewSection;
