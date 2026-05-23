"use client";

import React from "react";
import Header from "@/common_components/Header/Header";
import Footer from "@/common_components/Footer/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import EditorFloatingActions from "@/app/main/EditorFloatingActions";
import { AppRoot, MainArea } from "@/styles/AppLayout";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AppRoot>
      <ThemeToggle data-no-export />
      <EditorFloatingActions />
      <div id="dashboard-export-root">
        <Header />
        <MainArea>{children}</MainArea>
        <Footer />
      </div>
    </AppRoot>
  );
}
