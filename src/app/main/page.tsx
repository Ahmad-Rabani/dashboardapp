"use client";

import React, { Fragment, useContext, useState } from "react";
import { notify } from "@/utils/toast";
import { MainDiv, SortableList } from "./MainStylled";
import NewSection from "@/common_components/Add New Section/NewSection";
import EmptyState from "@/components/EmptyState";
import { MyContext } from "@/context/MyContext";
import { useDashboardContext } from "@/context/DashboardContext";
import { ComponentType, DragEvent } from "../../../types";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useDashboardDndSensors } from "@/hooks/useDashboardDndSensors";
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
    ,
    ,
    addNewSection,
    ,
    isPreview,
    ,
    insertIndex,
  ] = useContext(MyContext);
  const { hydrated } = useDashboardContext();

  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useDashboardDndSensors();

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

    notify.sectionReordered();
  }

  const isEmpty = componentsArray.length === 0;
  const showEmptyState =
    hydrated && isEmpty && !isNewSection && !addNewSection && !isPreview;
  const showPreviewEmpty = hydrated && isEmpty && isPreview;

  if (!hydrated) {
    return null;
  }

  return (
    <>
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
            sensors={sensors}
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
                      sectionKey={activeItem.key}
                      isTextSection={Boolean(activeItem.component)}
                      passingImage={activeItem.img}
                      copyText={activeItem.innerText}
                      editorContent={activeItem.editorContent}
                      imageBackgroundColor={activeItem.imageBackgroundColor}
                      height={
                        activeItem.height ??
                        (activeItem.component
                          ? DEFAULT_TEXT_SECTION_HEIGHT
                          : DEFAULT_IMAGE_SECTION_HEIGHT)
                      }
                      onImageBackgroundColorChange={() => {}}
                      onImageChange={() => {}}
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
    </>
  );
};

export default MainComponent;
