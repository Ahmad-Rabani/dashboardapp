"use client";

import React, { useContext, useState } from "react";
import { notify } from "@/utils/toast";
import { MainDiv, AddSection, PreviewButton, SortableList } from "./MainStylled";
import eyeIcon from "../../../img/eye.png";
import add from "../../../img/add.png";
import Image from "next/image";
import noEdit from "../../../img/delete (1).png";
import NewSection from "@/common_components/Add New Section/NewSection";
import EmptyState from "@/components/EmptyState";
import { MyContext } from "@/context/MyContext";
import { ComponentType, DragEvent } from "../../../types";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import SortableComponents, {
  SortableItemPreview,
} from "@/common_components/ShowComponents/SortableComponents";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DragOverlayWrapper } from "@/common_components/ShowComponents/SortableComponentsStylled";
import { ContentWrapper, EmptyStateWrapper } from "@/styles/AppLayout";

const MainComponent = () => {
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
    setIsPreview,
  ] = useContext(MyContext);

  const [activeId, setActiveId] = useState<string | null>(null);

  const createNewSection = () => {
    setNewSection(!isNewSection);
  };

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  const activeItem = componentsArray.find(
    (item: ComponentType) => item.key === activeId
  );

  function handleDragEnd(event: DragEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) {
      return;
    }

    setComponentsArray((prevItems: ComponentType | any) => {
      const activeIndex = prevItems.findIndex(
        (item: ComponentType) => item.key === active.id
      );
      const overIndex = prevItems.findIndex(
        (item: ComponentType) => item.key === over.id
      );
      return arrayMove(prevItems, activeIndex, overIndex);
    });

    // ADDED: toast on successful reorder only when position actually changes
    notify.sectionReordered();
  }

  function handlePreviewButton() {
    setIsPreview(!isPreview);
    setNewSection(false);
    setAddNewSection(false);
  }

  const isEmpty = componentsArray.length === 0;

  return (
    <>
      <PreviewButton onClick={handlePreviewButton}>
        {isPreview ? (
          <Image width={15} height={15} src={noEdit} alt="" />
        ) : (
          <Image width={15} height={15} src={eyeIcon} alt="" />
        )}
        {isPreview ? "Edit Mode" : "Preview"}
      </PreviewButton>

      {/* FIXED: empty state lingered after first section → strict conditional unmount */}
      {isEmpty ? (
        <EmptyStateWrapper>
          <EmptyState onAddSection={createNewSection} />
        </EmptyStateWrapper>
      ) : (
        <ContentWrapper>
          <MainDiv>
            <DndContext
              collisionDetection={closestCorners}
              onDragStart={handleDragStart}
              onDragCancel={handleDragCancel}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={componentsArray.map((item: ComponentType) => item.key)}
                strategy={verticalListSortingStrategy}
              >
                <SortableList>
                  {componentsArray.map((item: ComponentType) => (
                    <SortableComponents
                      key={item.key}
                      id={item.key}
                      passingComponents={item.component}
                      passingImage={item.img}
                      copyText={item.innerText}
                    />
                  ))}
                </SortableList>
              </SortableContext>

              <DragOverlay dropAnimation={{ duration: 250, easing: "ease" }}>
                {activeItem ? (
                  <DragOverlayWrapper>
                    <SortableItemPreview
                      passingComponents={activeItem.component}
                      passingImage={activeItem.img}
                      copyText={activeItem.innerText}
                    />
                  </DragOverlayWrapper>
                ) : null}
              </DragOverlay>
            </DndContext>
          </MainDiv>
        </ContentWrapper>
      )}

      {isNewSection && <NewSection currentIndex={0} />}

      <AddSection onClick={createNewSection}>
        <Image width={15} height={15} src={add} alt="" />
        Add Section
      </AddSection>
    </>
  );
};

export default MainComponent;
