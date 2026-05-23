"use client";

import React, { useCallback, useContext, useMemo, useState } from "react";
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
  ComponentsDiv,
  LeftControls,
  RightControls,
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
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import { PropsType, ComponentType } from "../../../types";
import { AlignedContent } from "@/styles/AppLayout";
import { useSectionResize } from "@/hooks/useSectionResize";
import {
  DEFAULT_IMAGE_SECTION_HEIGHT,
  DEFAULT_TEXT_SECTION_HEIGHT,
} from "@/constants/sectionLayout";

type SortableItemPreviewProps = Pick<
  PropsType,
  "passingComponents" | "passingImage" | "copyText"
> & {
  height: number;
};

export const SortableItemPreview = ({
  passingComponents,
  passingImage,
  copyText,
  height,
}: SortableItemPreviewProps) =>
  passingComponents ? (
    <LexicalTextEditor innerText={copyText ? copyText[0] : ""} height={height} />
  ) : (
    <ImageDiv>
      <ImageComponent passTheImage={passingImage} height={height} />
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [
    componentsArray,
    setComponentsArray,
    ,
    ,
    editorText,
    ,
    ,
    ,
    isPreview,
  ] = useContext(MyContext);

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
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    try {
      deleteSection(id);
      notify.sectionDeleted();
    } catch {
      notify.error();
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
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

      setCopy(true);
      setComponentsArray([
        ...componentsArray,
        {
          key: uuidv4(),
          component: itemToCopy.component,
          img: itemToCopy.img,
          height: itemToCopy.height,
          innerText: editorText.root.children[0].children.map(
            (child: any) => child.text
          ),
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
        <LeftControls>
          <ComponentsDiv {...attributes} {...listeners}>
            <DragButton type="button" aria-label="Drag section">
              <Image src={dragIcon} width={15} height={15} alt="drag handle" />
            </DragButton>
          </ComponentsDiv>
        </LeftControls>
      )}

      <CardBody>
        <AlignedContent>
          <ResizableSection $height={sectionHeight}>
            <CardContent $height={sectionHeight}>
              <SortableItemPreview
                passingComponents={passingComponents}
                passingImage={passingImage}
                copyText={copyText}
                height={sectionHeight}
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

      {!isPreview && (
        <RightControls>
          <CopyButton
            type="button"
            onClick={() => handleCopy(id)}
            aria-label="Copy section"
          >
            <Image src={copy} width={15} height={15} alt="copy" />
          </CopyButton>

          <DeleteButton
            type="button"
            onClick={handleDeleteClick}
            aria-label="Delete section"
          >
            <Image src={deleteIcon} width={15} height={15} alt="delete" />
          </DeleteButton>
        </RightControls>
      )}

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </CardWrapper>
  );
};

export default SortableComponents;
