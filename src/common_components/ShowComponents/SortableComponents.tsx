"use client";

import React, { useContext, useState } from "react";
import { notify } from "@/utils/toast";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import ImageComponent from "../Image Component/Page";
import {
  CardWrapper,
  CopyButton,
  DeleteButton,
  DragButton,
  AddButton,
  SectionAddZone,
  ImageDiv,
  ComponentsDiv,
  LeftControls,
  RightControls,
  CardBody,
  CardContent,
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
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
    isPreview,
    ,
    insertIndex,
    setInsertIndex,
  ] = useContext(MyContext);

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

  const handleNewSection = (sectionId: string) => {
    const findTheIndex = componentsArray
      .map((item: ComponentType) => item.key)
      .indexOf(sectionId);

    if (addNewSection && insertIndex === findTheIndex) {
      setAddNewSection(false);
      return;
    }

    setInsertIndex(findTheIndex);
    setAddNewSection(true);
    setNewSection(false);
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
        <CardContent>
          <SortableItemPreview
            passingComponents={passingComponents}
            passingImage={passingImage}
            copyText={copyText}
          />
        </CardContent>

        {!isPreview && (
          <SectionAddZone>
            <AddButton type="button" onClick={() => handleNewSection(id)}>
              +
            </AddButton>
          </SectionAddZone>
        )}
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
