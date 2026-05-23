"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import StyledComponentsRegistry from "../../registry";
import { ComponentType } from "../../types";
import GlobalStyle from "@/styles/GlobalStyle";
import AppShell from "./AppShell";
import { MyContext } from "@/context/MyContext";
import { ThemeProvider } from "@/context/ThemeContext";
import {
  DashboardProvider,
  useDashboardContext,
} from "@/context/DashboardContext";
import { DashboardHistoryProvider } from "@/context/DashboardHistoryContext";
import { DashboardSnapshot } from "@/types/dashboard";
import { useDashboardHistory } from "@/hooks/useDashboardHistory";
import {
  clearDashboardStorage,
  fromStoredSections,
  loadDashboard,
  saveDashboard,
  toStoredSections,
} from "@/utils/dashboardStorage";

function DashboardPersistence({ children }: { children: React.ReactNode }) {
  const [componentsArray, setComponentsArray] = useState<ComponentType[]>([]);
  const [isNewSection, setNewSection] = useState(false);
  const [editorText, setEditorText] = useState("");
  const [addNewSection, setAddNewSection] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [insertIndex, setInsertIndex] = useState(0);

  const {
    header,
    footer,
    hydrated,
    setHydrated,
    setHeader,
    setFooter,
    resetLayoutSettings,
  } = useDashboardContext();

  const getSnapshot = useCallback((): DashboardSnapshot => {
    return {
      version: 1,
      sections: toStoredSections(componentsArray),
      header,
      footer,
    };
  }, [componentsArray, header, footer]);

  const applySnapshotState = useCallback(
    (snapshot: DashboardSnapshot) => {
      setComponentsArray(fromStoredSections(snapshot.sections));
      setHeader(snapshot.header);
      setFooter(snapshot.footer);
      saveDashboard(snapshot);
    },
    [setFooter, setHeader]
  );

  const {
    canUndo,
    canRedo,
    undo,
    redo,
    clearHistory,
    commitBeforeReplace,
    syncCurrent,
  } = useDashboardHistory(getSnapshot, applySnapshotState, hydrated);

  useEffect(() => {
    const saved = loadDashboard();
    if (saved) {
      setComponentsArray(fromStoredSections(saved.sections));
      setHeader(saved.header);
      setFooter(saved.footer);
    }
    setHydrated(true);
  }, [setFooter, setHeader, setHydrated]);

  useEffect(() => {
    if (!hydrated) return;

    const timeout = window.setTimeout(() => {
      saveDashboard(getSnapshot());
    }, 400);

    return () => window.clearTimeout(timeout);
  }, [componentsArray, header, footer, hydrated, getSnapshot]);

  const resetDashboard = useCallback(() => {
    commitBeforeReplace();
    setComponentsArray([]);
    setNewSection(false);
    setAddNewSection(false);
    setIsPreview(false);
    setInsertIndex(0);
    resetLayoutSettings();
    clearDashboardStorage();
    clearHistory();
  }, [commitBeforeReplace, clearHistory, resetLayoutSettings]);

  const applyDashboardSnapshot = useCallback(
    (snapshot: DashboardSnapshot) => {
      commitBeforeReplace();
      setComponentsArray(fromStoredSections(snapshot.sections));
      setHeader(snapshot.header);
      setFooter(snapshot.footer);
      setNewSection(false);
      setAddNewSection(false);
      setIsPreview(false);
      setInsertIndex(0);
      saveDashboard(snapshot);
      syncCurrent();
    },
    [commitBeforeReplace, setFooter, setHeader, syncCurrent]
  );

  return (
    <DashboardHistoryProvider value={{ canUndo, canRedo, undo, redo }}>
      <MyContext.Provider
        value={[
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
          setInsertIndex,
          resetDashboard,
          applyDashboardSnapshot,
        ]}
      >
        <AppShell>{children}</AppShell>
      </MyContext.Provider>
    </DashboardHistoryProvider>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <GlobalStyle />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          top: 24,
        }}
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: "14px",
            fontSize: "14px",
            fontWeight: "500",
            padding: "14px 20px",
            maxWidth: "420px",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backdropFilter: "blur(8px)",
            background: "transparent",
            boxSizing: "border-box",
          },
          success: {
            style: {
              background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
              border: "1px solid #86efac",
              color: "#15803d",
            },
            iconTheme: {
              primary: "#22c55e",
              secondary: "#f0fdf4",
            },
          },
          error: {
            style: {
              background: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
              border: "1px solid #fca5a5",
              color: "#dc2626",
            },
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fef2f2",
            },
          },
        }}
      />
      <ThemeProvider>
        <DashboardProvider>
          <DashboardPersistence>{children}</DashboardPersistence>
        </DashboardProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
