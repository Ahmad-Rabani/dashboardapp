"use client"
import React,{ createContext, useState } from "react";
import StyledComponentsRegistry from "../../registry";
import Header from "@/common_components/Header/Header";
import Footer from "@/common_components/Footer/Footer";

export const MyContext = createContext<any>(null);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [index , setIndex] = useState<string>("Bunny");
  const [Hammer , setHammer] = useState<string>("thor");

  return (
    <html>
      <body style={{ backgroundColor: "#e6e6e6" }}>
        <StyledComponentsRegistry>
          <Header />
          <MyContext.Provider value={{settingIndex:[index,setIndex], settingHammer: [Hammer,setHammer]}}>
            {children}
            </MyContext.Provider>
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
