"use client";

import React, { useContext } from "react";
import {
  MainDiv,
  AddSection,
  PreviewButton,
} from "./MainStylled";
import eyeIcon from "../../../img/eye.png";
import add from "../../../img/add.png";
import Image from "next/image";
import noEdit from "../../../img/delete (1).png"
import NewSection from "@/common_components/Add New Section/NewSection";
import { MyContext } from "../layout";
import { ComponentType, DragEvent } from "../../../types";
import { closestCenter, closestCorners, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableComponents from "@/common_components/ShowComponents/SortableComponents";

const MainComponent = () => {
  const [componentsArray,
    setComponentsArray,
    isNewSection,
    setNewSection,
    editorText,
    setEditorText,
    addNewSection,
    setAddNewSection,
    isPreview,
    setIsPreview] =
    useContext(MyContext);

  const createNewSection = () => {
    setNewSection(!isNewSection);
  };

  // Drag End
  function handleDragEnd(event:DragEvent) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setComponentsArray((prevItems:ComponentType | any) => {
        const activeIndex = prevItems.findIndex(
          (item:ComponentType) => item.key === active.id
        );
        const overIndex = prevItems.findIndex((item: ComponentType) => item.key === over.id);
        return arrayMove(prevItems, activeIndex, overIndex);
      });
    }
  }

  function handlePreviewButton() {
    setIsPreview(!isPreview)
    setNewSection(false);
    setAddNewSection(false);
  }

  return (
    <MainDiv>
      <PreviewButton onClick={handlePreviewButton}>
       {isPreview ? <Image width={15} height={15} src={noEdit} alt="" />: <Image width={15} height={15} src={eyeIcon} alt="" />}
       {isPreview ? "Edit Mode" : "Preview" }
      </PreviewButton>

      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <SortableContext items={componentsArray} strategy={closestCenter}>
          {componentsArray.map((item:ComponentType) => (
            <SortableComponents
              key={item.key}
              id={item.key}
              passingComponents={item.component}
              passingImage={item.img}
              copyText={item.innerText}
            />
          ))}
        </SortableContext>
      </DndContext>

      {isNewSection && <NewSection currentIndex={0} />}

      <AddSection onClick={createNewSection}>
        <Image width={15} height={15} src={add} alt="" />
        Add Section
      </AddSection>
    </MainDiv>
  );
};

export default MainComponent;