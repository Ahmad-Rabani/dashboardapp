import React, { useContext, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import ImageComponent from "../Image Component/Page";
import { ComponentsDiv } from "./SortableComponentsStylled";
import { PropsType, ComponentType } from "../../../types";
import {
  MainDiv,
  CopyButton,
  DeleteButton,
  DragButton,
  AddButton,
  ImageDiv,
  Line,
  Container,
} from "./SortableComponentsStylled";
import Image from "next/image";
import copy from "../../../img/copy-link.png";
import deleteIcon from "../../../img/delete.png";
import dragIcon from "../../../img/drag.png";
import { MyContext } from "@/app/layout";
import { v4 as uuidv4 } from "uuid";
import LexicalTextEditor from "@/plugins/LexicalTextEditor/page";
import NewSection from "../Add New Section/NewSection";

const SortableComponents = ({
  id,
  passingComponents,
  passingImage,
  copyText,
}: PropsType) => {
  const { attributes, listeners, setNodeRef, transition, transform } =
    useSortable({ id });

  const [isCopy, setCopy] = useState(false);
  const [index, setIndex] = useState<number>(0);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

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

  function deleteSection(id: string) {
    setComponentsArray(
      componentsArray.filter((item: ComponentType) => item.key !== id)
    );
  }

  function handleCopy(id: string) {
    setCopy(true);
    componentsArray.map((item: ComponentType) => {
      if (item.key === id) {
        console.log(item);
        setComponentsArray([
          ...componentsArray,
          {
            key: uuidv4(),
            component: item.component,
            img: item.img,
            innerText: editorText.root.children[0].children.map(
              (item) => item.text
            ),
          },
        ]);
      }
    });
  }

  function handleNewSection(id: string) {
    setAddNewSection(!addNewSection);
    setNewSection(false);

    const findTheIndex = componentsArray
      .map((item: ComponentType) => item.key)
      .indexOf(id);
    setIndex(findTheIndex);
  }

  return (
    <MainDiv style={style} ref={setNodeRef}>
      <ComponentsDiv
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
      >
        <DragButton draggable>
          <Image src={dragIcon} width={15} height={15} alt="" />
        </DragButton>
      </ComponentsDiv>

      <CopyButton onClick={() => handleCopy(id)}>
        <Image src={copy} width={15} height={15} alt="" />
      </CopyButton>

      <DeleteButton onClick={() => deleteSection(id)}>
        <Image src={deleteIcon} width={15} height={15} alt="" />
      </DeleteButton>

      {passingComponents ? (
        <LexicalTextEditor innerText={copyText ? copyText[0] : ""} />
      ) : (
        <ImageDiv>
          <ImageComponent passTheImage={passingImage} />
        </ImageDiv>
      )}


      <Container>
        <Line />
        <AddButton onClick={() => handleNewSection(id)}>
          +
        </AddButton>
      </Container>

      {addNewSection && <NewSection currentIndex={index} />}
    </MainDiv>
  );
};

export default SortableComponents;
