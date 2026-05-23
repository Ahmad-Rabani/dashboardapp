"use client";

import React from "react";
import Header from "@/common_components/Header/Header";
import Footer from "@/common_components/Footer/Footer";
import { AppRoot, MainArea } from "@/styles/AppLayout";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AppRoot>
      <Header />
      <MainArea>{children}</MainArea>
      <Footer />
    </AppRoot>
  );
}
