"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import { Download, LayoutTemplate, Redo2, Search, Undo2 } from "lucide-react";
import { notify } from "@/utils/toast";
import { downloadDashboardAsPdf } from "@/utils/downloadPdf";
import { MyContext } from "@/context/MyContext";
import { useDashboardContext } from "@/context/DashboardContext";
import { useDashboardHistoryContext } from "@/context/DashboardHistoryContext";
import WorkspacePanel from "@/components/WorkspacePanel";
import FindReplaceDialog from "@/components/FindReplaceDialog";
import FindReplaceShortcuts from "@/components/FindReplaceShortcuts";
import { FloatingToolbarDock, ToolbarButton } from "./MainStylled";
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
  const { canUndo, canRedo, undo, redo } = useDashboardHistoryContext();
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [findReplaceOpen, setFindReplaceOpen] = useState(false);

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
      <FindReplaceShortcuts onOpen={() => setFindReplaceOpen(true)} />
      <FindReplaceDialog open={findReplaceOpen} onOpenChange={setFindReplaceOpen} />
      <WorkspacePanel open={workspaceOpen} onOpenChange={setWorkspaceOpen} />

      <FloatingToolbarDock data-no-export role="toolbar" aria-label="Page editor actions">
        {!isPreview ? (
          <>
            <div
              style={{
                display: "flex",
                gap: "8px",
                width: "100%",
              }}
            >
              <ToolbarButton
                type="button"
                $variant="ghost"
                onClick={undo}
                disabled={!canUndo}
                aria-label="Undo (Ctrl+Z)"
                title="Undo (Ctrl+Z)"
                style={{ flex: 1 }}
              >
                <Undo2 size={15} aria-hidden />
                Undo
              </ToolbarButton>
              <ToolbarButton
                type="button"
                $variant="ghost"
                onClick={redo}
                disabled={!canRedo}
                aria-label="Redo (Ctrl+Y)"
                title="Redo (Ctrl+Y)"
                style={{ flex: 1 }}
              >
                <Redo2 size={15} aria-hidden />
                Redo
              </ToolbarButton>
            </div>
            <ToolbarButton
              type="button"
              $primary
              onClick={createNewSection}
              aria-label="Add a new section"
            >
              <Image width={15} height={15} src={add} alt="" />
              Add Section
            </ToolbarButton>
            <ToolbarButton
              type="button"
              $variant="ghost"
              onClick={() => setFindReplaceOpen(true)}
              disabled={isEmpty}
              aria-label="Find and replace text (Ctrl+H)"
              title="Find & Replace (Ctrl+H)"
            >
              <Search size={15} aria-hidden />
              Find
            </ToolbarButton>
            <ToolbarButton
              type="button"
              $variant="ghost"
              onClick={() => setWorkspaceOpen(true)}
              aria-label="Open templates and backup"
            >
              <LayoutTemplate size={15} aria-hidden />
              Templates
            </ToolbarButton>
            <ToolbarButton type="button" onClick={handlePreviewButton} aria-label="Preview page">
              <Image width={15} height={15} src={eyeIcon} alt="" />
              Preview
            </ToolbarButton>
          </>
        ) : (
          <>
            <ToolbarButton
              type="button"
              $primary
              onClick={handleDownloadPdf}
              disabled={isEmpty || isDownloadingPdf}
              aria-busy={isDownloadingPdf}
              aria-label="Download page as PDF"
            >
              <Download size={15} aria-hidden />
              {isDownloadingPdf ? "Generating..." : "Download PDF"}
            </ToolbarButton>
            <ToolbarButton type="button" onClick={handlePreviewButton} aria-label="Return to edit mode">
              <Image width={15} height={15} src={noEdit} alt="" />
              Edit Mode
            </ToolbarButton>
          </>
        )}
      </FloatingToolbarDock>
    </>
  );
}
