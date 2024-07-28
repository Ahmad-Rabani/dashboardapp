"use client"
import React,{ createContext, useState, useRef } from "react";
import StyledComponentsRegistry from "../../registry";
import Header from "@/common_components/Header/Header";
import Footer from "@/common_components/Footer/Footer";
import {ComponentType} from "../../types"

export const MyContext = createContext<any>(null);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [componentsArray, setComponentsArray] = useState<ComponentType[]>([]);
  const [isNewSection , setNewSection] = useState(false);
  const [editorText, setEditorText] = useState("");
  const [addNewSection, setAddNewSection] = useState(false);
  const [isPreview,setIsPreview] = useState(false);

  return (
    <html>
      <body style={{ backgroundColor: "#e6e6e6"}}>
        <StyledComponentsRegistry>
          <Header />
          <MyContext.Provider value={[componentsArray,setComponentsArray , isNewSection,setNewSection , editorText,setEditorText , addNewSection, setAddNewSection, isPreview,setIsPreview]}>
            {children}
            </MyContext.Provider>
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
