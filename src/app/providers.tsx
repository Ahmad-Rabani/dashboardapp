"use client";

import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import StyledComponentsRegistry from "../../registry";
import { ComponentType } from "../../types";
import GlobalStyle from "@/styles/GlobalStyle";
import AppShell from "./AppShell";
import { MyContext } from "@/context/MyContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [componentsArray, setComponentsArray] = useState<ComponentType[]>([]);
  const [isNewSection, setNewSection] = useState(false);
  const [editorText, setEditorText] = useState("");
  const [addNewSection, setAddNewSection] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  return (
    <StyledComponentsRegistry>
      <GlobalStyle />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "10px",
            fontSize: "14px",
            padding: "12px 16px",
            maxWidth: "360px",
          },
          success: {
            iconTheme: { primary: "#22c55e", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "#fff" },
          },
        }}
      />
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
        ]}
      >
        <AppShell>{children}</AppShell>
      </MyContext.Provider>
    </StyledComponentsRegistry>
  );
}
