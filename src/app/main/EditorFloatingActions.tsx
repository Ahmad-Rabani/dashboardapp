"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import { Download, LayoutTemplate } from "lucide-react";
import { notify } from "@/utils/toast";
import { downloadDashboardAsPdf } from "@/utils/downloadPdf";
import { MyContext } from "@/context/MyContext";
import { useDashboardContext } from "@/context/DashboardContext";
import WorkspacePanel from "@/components/WorkspacePanel";
import {
  AddSection,
  PreviewButton,
  PreviewActions,
  DownloadPdfButton,
} from "./MainStylled";
import eyeIcon from "../../../img/eye.png";
import add from "../../../img/add.png";
import noEdit from "../../../img/delete (1).png";

export default function EditorFloatingActions() {
  const [
    componentsArray,
    ,
    isNewSection,
    setNewSection,
    ,
    ,
    ,
    setAddNewSection,
    isPreview,
    setIsPreview,
  ] = useContext(MyContext);
  const { hydrated } = useDashboardContext();
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);

  if (!hydrated) return null;

  const isEmpty = componentsArray.length === 0;

  const createNewSection = () => {
    setNewSection(!isNewSection);
  };

  function handlePreviewButton() {
    setIsPreview(!isPreview);
    setNewSection(false);
    setAddNewSection(false);
  }

  async function handleDownloadPdf() {
    if (isEmpty || isDownloadingPdf) return;

    setIsDownloadingPdf(true);
    try {
      await downloadDashboardAsPdf("dashboard.pdf");
    } catch {
      notify.error("Could not generate PDF. Please try again.");
    } finally {
      setIsDownloadingPdf(false);
    }
  }

  return (
    <>
      <WorkspacePanel open={workspaceOpen} onOpenChange={setWorkspaceOpen} />

      <PreviewActions data-no-export>
        {!isPreview && (
          <PreviewButton
            type="button"
            onClick={() => setWorkspaceOpen(true)}
            aria-label="Open templates and backup"
          >
            <LayoutTemplate size={15} aria-hidden />
            Templates
          </PreviewButton>
        )}

        <PreviewButton onClick={handlePreviewButton}>
          {isPreview ? (
            <Image width={15} height={15} src={noEdit} alt="" />
          ) : (
            <Image width={15} height={15} src={eyeIcon} alt="" />
          )}
          {isPreview ? "Edit Mode" : "Preview"}
        </PreviewButton>

        {isPreview && (
          <DownloadPdfButton
            type="button"
            onClick={handleDownloadPdf}
            disabled={isEmpty || isDownloadingPdf}
            aria-busy={isDownloadingPdf}
          >
            <Download size={15} aria-hidden />
            {isDownloadingPdf ? "Generating..." : "Download as PDF"}
          </DownloadPdfButton>
        )}
      </PreviewActions>

      {!isPreview && (
        <AddSection onClick={createNewSection} type="button">
          <Image width={15} height={15} src={add} alt="" />
          Add Section
        </AddSection>
      )}
    </>
  );
}
