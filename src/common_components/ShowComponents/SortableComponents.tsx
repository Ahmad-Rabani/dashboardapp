"use client";

import React, { useContext, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import ImageComponent from "../Image Component/Page";
import {
  MainDiv,
  CopyButton,
  DeleteButton,
  DragButton,
  AddButton,
  ImageDiv,
  Line,
  Container,
  ComponentsDiv,
  ActionButtonRow,
  CardContent,
} from "./SortableComponentsStylled";
import Image from "next/image";
import copy from "../../../img/copy-link.png";
import deleteIcon from "../../../img/delete.png";
import dragIcon from "../../../img/drag.png";
import { MyContext } from "@/context/MyContext";
import { v4 as uuidv4 } from "uuid";
import LexicalTextEditor from "@/plugins/LexicalTextEditor/page";
import NewSection from "../Add New Section/NewSection";
import { PropsType, ComponentType } from "../../../types";

type SortableItemPreviewProps = Pick<
  PropsType,
  "passingComponents" | "passingImage" | "copyText"
>;

export const SortableItemPreview = ({
  passingComponents,
  passingImage,
  copyText,
}: SortableItemPreviewProps) =>
  passingComponents ? (
    <LexicalTextEditor innerText={copyText ? copyText[0] : ""} />
  ) : (
    <ImageDiv>
      <ImageComponent passTheImage={passingImage} />
    </ImageDiv>
  );

const SortableComponents = ({
  id,
  passingComponents,
  passingImage,
  copyText,
}: PropsType) => {
  const { attributes, listeners, setNodeRef, transition, transform, isDragging } =
    useSortable({ id });

  const [isCopy, setCopy] = useState(false);
  const [index, setIndex] = useState<number>(0);

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Consume context
  const [
    componentsArray,
    setComponentsArray,
    isNewSection,
    setNewSection,
    editorText,
    setEditorText,
    addNewSection,
    setAddNewSection,
    isPreview,
  ] = useContext(MyContext);

  // Delete section
  const deleteSection = (id: string) => {
    setComponentsArray(
      componentsArray.filter((item: ComponentType) => item.key !== id)
    );
  };

  // Copy section
  const handleCopy = (id: string) => {
    setCopy(true);
    componentsArray.forEach((item: ComponentType) => {
      if (item.key === id) {
        console.log(item);
        setComponentsArray([
          ...componentsArray,
          {
            key: uuidv4(),
            component: item.component,
            img: item.img,
            innerText: editorText.root.children[0].children.map(
              (child: any) => child.text
            ),
          },
        ]);
      }
    });
  };

  // Handle adding a new section
  const handleNewSection = (id: string) => {
    setAddNewSection(!addNewSection);
    setNewSection(false);
    const findTheIndex = componentsArray
      .map((item: ComponentType) => item.key)
      .indexOf(id);
    setIndex(findTheIndex);
  };

  return (
    <MainDiv style={style} ref={setNodeRef} $isDragging={isDragging}>
      {!isPreview && (
        <ActionButtonRow>
          <ComponentsDiv {...attributes} {...listeners}>
            <DragButton type="button" aria-label="Drag section">
              <Image src={dragIcon} width={15} height={15} alt="drag handle" />
            </DragButton>
          </ComponentsDiv>

          <CopyButton type="button" onClick={() => handleCopy(id)} aria-label="Copy section">
            <Image src={copy} width={15} height={15} alt="copy" />
          </CopyButton>

          <DeleteButton type="button" onClick={() => deleteSection(id)} aria-label="Delete section">
            <Image src={deleteIcon} width={15} height={15} alt="delete" />
          </DeleteButton>
        </ActionButtonRow>
      )}

      <CardContent>
        <SortableItemPreview
          passingComponents={passingComponents}
          passingImage={passingImage}
          copyText={copyText}
        />
      </CardContent>

      {!isPreview && (
        <>
          <Container>
            <Line />
            <AddButton type="button" onClick={() => handleNewSection(id)}>
              +
            </AddButton>
          </Container>
        </>
      )}

      {addNewSection && <NewSection currentIndex={index} />}
    </MainDiv>
  );
};

export default SortableComponents;