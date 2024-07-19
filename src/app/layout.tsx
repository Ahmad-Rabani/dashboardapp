"use client"
import React,{ createContext, useState } from "react";
import StyledComponentsRegistry from "../../registry";
import Header from "@/common_components/Header/Header";
import Footer from "@/common_components/Footer/Footer";

export const MyContext = createContext<any>(null);
const componentsArray: [] = [];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body style={{ backgroundColor: "#e6e6e6" }}>
        <StyledComponentsRegistry>
          <Header />
          <MyContext.Provider value={componentsArray}>
            {children}
            </MyContext.Provider>
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
