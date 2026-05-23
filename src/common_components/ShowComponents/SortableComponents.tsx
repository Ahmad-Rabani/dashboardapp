"use client";

import React, { useCallback, useContext, useMemo } from "react";
import { notify } from "@/utils/toast";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import ImageComponent from "../Image Component/Page";
import {
  CardWrapper,
  CopyButton,
  DeleteButton,
  DragButton,
  ImageDiv,
  DragHandle,
  SectionControlsBar,
  ActionButtons,
  CardBody,
  CardContent,
  ResizableSection,
  SectionResizeHandle,
} from "./SortableComponentsStylled";
import Image from "next/image";
import copy from "../../../img/copy-link.png";
import deleteIcon from "../../../img/delete.png";
import dragIcon from "../../../img/drag.png";
import { MyContext } from "@/context/MyContext";
import { v4 as uuidv4 } from "uuid";
import LexicalTextEditor from "@/plugins/LexicalTextEditor/page";
import { PropsType, ComponentType } from "../../../types";
import { EditorStateType } from "../../../types";
import { AlignedContent } from "@/styles/AppLayout";
import { useSectionResize } from "@/hooks/useSectionResize";
import {
  DEFAULT_IMAGE_SECTION_HEIGHT,
  DEFAULT_TEXT_SECTION_HEIGHT,
} from "@/constants/sectionLayout";
import { extractInnerText } from "@/types/dashboard";

type SortableItemPreviewProps = {
  sectionKey: string;
  isTextSection: boolean;
  passingImage: string;
  copyText?: string[];
  editorContent?: EditorStateType;
  imageBackgroundColor?: string;
  height: number;
  onImageBackgroundColorChange: (color: string) => void;
  onImageChange?: (dataUrl: string) => void;
};

export const SortableItemPreview = ({
  sectionKey,
  isTextSection,
  passingImage,
  copyText,
  editorContent,
  imageBackgroundColor,
  height,
  onImageBackgroundColorChange,
  onImageChange,
}: SortableItemPreviewProps) =>
  isTextSection ? (
    <LexicalTextEditor
      sectionKey={sectionKey}
      innerText={copyText ? copyText[0] : ""}
      editorContent={editorContent}
      height={height}
    />
  ) : (
    <ImageDiv>
      <ImageComponent
        passTheImage={passingImage}
        height={height}
        backgroundColor={imageBackgroundColor}
        onBackgroundColorChange={onImageBackgroundColorChange}
        onImageChange={onImageChange}
      />
    </ImageDiv>
  );

const SortableComponents = ({
  id,
  passingComponents,
  passingImage,
  copyText,
}: PropsType) => {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transition, transform, isDragging } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [componentsArray, setComponentsArray, , , , , , , isPreview] =
    useContext(MyContext);

  const sectionData = useMemo(
    () => componentsArray.find((item: ComponentType) => item.key === id),
    [componentsArray, id]
  );

  const sectionHeight =
    sectionData?.height ??
    (passingComponents
      ? DEFAULT_TEXT_SECTION_HEIGHT
      : DEFAULT_IMAGE_SECTION_HEIGHT);

  const updateSectionHeight = useCallback(
    (nextHeight: number) => {
      setComponentsArray((prev: ComponentType[]) =>
        prev.map((item) =>
          item.key === id ? { ...item, height: nextHeight } : item
        )
      );
    },
    [id, setComponentsArray]
  );

  const updateImageBackgroundColor = useCallback(
    (color: string) => {
      setComponentsArray((prev: ComponentType[]) =>
        prev.map((item) =>
          item.key === id ? { ...item, imageBackgroundColor: color } : item
        )
      );
    },
    [id, setComponentsArray]
  );

  const updateSectionImage = useCallback(
    (dataUrl: string) => {
      setComponentsArray((prev: ComponentType[]) =>
        prev.map((item) => (item.key === id ? { ...item, img: dataUrl } : item))
      );
    },
    [id, setComponentsArray]
  );

  const { onResizePointerDown } = useSectionResize({
    height: sectionHeight,
    onHeightChange: updateSectionHeight,
    disabled: isPreview,
  });

  const deleteSection = (sectionId: string) => {
    setComponentsArray(
      componentsArray.filter((item: ComponentType) => item.key !== sectionId)
    );
  };

  const handleDeleteClick = () => {
    try {
      deleteSection(id);
      notify.sectionDeleted();
    } catch {
      notify.error();
    }
  };

  const handleCopy = (sectionId: string) => {
    try {
      const itemToCopy = componentsArray.find(
        (item: ComponentType) => item.key === sectionId
      );

      if (!itemToCopy) {
        notify.error();
        return;
      }

      setComponentsArray([
        ...componentsArray,
        {
          key: uuidv4(),
          component: itemToCopy.component,
          img: itemToCopy.img,
          height: itemToCopy.height,
          editorContent: itemToCopy.editorContent,
          innerText:
            itemToCopy.innerText ?? extractInnerText(itemToCopy.editorContent),
          imageBackgroundColor: itemToCopy.imageBackgroundColor,
        },
      ]);
      notify.sectionCopied();
    } catch {
      notify.error();
    }
  };

  return (
    <CardWrapper style={style} ref={setNodeRef} $isDragging={isDragging} $isPreview={isPreview}>
      {!isPreview && (
        <SectionControlsBar>
          <DragHandle
            ref={setActivatorNodeRef}
            {...attributes}
            {...listeners}
            aria-label="Drag to reorder section"
          >
            <DragButton type="button" tabIndex={-1} aria-hidden>
              <Image src={dragIcon} width={16} height={16} alt="" aria-hidden />
            </DragButton>
          </DragHandle>

          <ActionButtons>
            <CopyButton
              type="button"
              onClick={() => handleCopy(id)}
              aria-label="Copy section"
            >
              <Image src={copy} width={16} height={16} alt="" aria-hidden />
            </CopyButton>

            <DeleteButton
              type="button"
              onClick={handleDeleteClick}
              aria-label="Delete section"
            >
              <Image src={deleteIcon} width={16} height={16} alt="" aria-hidden />
            </DeleteButton>
          </ActionButtons>
        </SectionControlsBar>
      )}

      <CardBody>
        <AlignedContent>
          <ResizableSection $height={sectionHeight}>
            <CardContent $height={sectionHeight}>
              <SortableItemPreview
                sectionKey={id}
                isTextSection={Boolean(passingComponents)}
                passingImage={passingImage}
                copyText={copyText}
                editorContent={sectionData?.editorContent}
                imageBackgroundColor={sectionData?.imageBackgroundColor}
                height={sectionHeight}
                onImageBackgroundColorChange={updateImageBackgroundColor}
                onImageChange={updateSectionImage}
              />
            </CardContent>

            {!isPreview && (
              <SectionResizeHandle
                role="separator"
                aria-orientation="horizontal"
                aria-label="Resize section height"
                onPointerDown={onResizePointerDown}
              />
            )}
          </ResizableSection>
        </AlignedContent>
      </CardBody>
    </CardWrapper>
  );
};

export default SortableComponents;
