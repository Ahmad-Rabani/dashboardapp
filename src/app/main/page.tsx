"use client";

import React, { Fragment, useContext, useState } from "react";
import { notify } from "@/utils/toast";
import { MainDiv, AddSection, PreviewButton, SortableList } from "./MainStylled";
import eyeIcon from "../../../img/eye.png";
import add from "../../../img/add.png";
import noEdit from "../../../img/delete (1).png";
import Image from "next/image";
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
import {
  AlignedContent,
  CenteredAlignedSlot,
  ContentWrapper,
  EmptyStateWrapper,
} from "@/styles/AppLayout";
import {
  DEFAULT_IMAGE_SECTION_HEIGHT,
  DEFAULT_TEXT_SECTION_HEIGHT,
} from "@/constants/sectionLayout";

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
    insertIndex,
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
  const showEmptyState = isEmpty && !isNewSection && !addNewSection && !isPreview;
  const showPreviewEmpty = isEmpty && isPreview;

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

      {showEmptyState ? (
        <EmptyStateWrapper>
          <EmptyState onAddSection={createNewSection} />
        </EmptyStateWrapper>
      ) : showPreviewEmpty ? (
        <EmptyStateWrapper>
          <EmptyState previewMode />
        </EmptyStateWrapper>
      ) : (
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
                {componentsArray.map((item: ComponentType, idx: number) => (
                  <Fragment key={item.key}>
                    <SortableComponents
                      id={item.key}
                      passingComponents={item.component}
                      passingImage={item.img}
                      copyText={item.innerText}
                    />
                    {!isPreview && addNewSection && insertIndex === idx && (
                      <CenteredAlignedSlot data-aligned-slot>
                        <AlignedContent>
                          <NewSection currentIndex={idx} />
                        </AlignedContent>
                      </CenteredAlignedSlot>
                    )}
                  </Fragment>
                ))}
              </SortableList>
            </SortableContext>

            <DragOverlay dropAnimation={{ duration: 250, easing: "ease" }}>
              {activeItem ? (
                <DragOverlayWrapper>
                  <AlignedContent>
                    <SortableItemPreview
                      passingComponents={activeItem.component}
                      passingImage={activeItem.img}
                      copyText={activeItem.innerText}
                      height={
                        activeItem.height ??
                        (activeItem.component
                          ? DEFAULT_TEXT_SECTION_HEIGHT
                          : DEFAULT_IMAGE_SECTION_HEIGHT)
                      }
                    />
                  </AlignedContent>
                </DragOverlayWrapper>
              ) : null}
            </DragOverlay>
          </DndContext>
        </MainDiv>
      )}

      {!isPreview && isNewSection && (
        <ContentWrapper>
          <NewSection currentIndex={Math.max(componentsArray.length - 1, 0)} />
        </ContentWrapper>
      )}

      {!isPreview && (
        <AddSection onClick={createNewSection} type="button">
          <Image width={15} height={15} src={add} alt="" />
          Add Section
        </AddSection>
      )}
    </>
  );
};

export default MainComponent;
