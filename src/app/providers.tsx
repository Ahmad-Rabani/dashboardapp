"use client";

import React, { useState } from "react";
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
