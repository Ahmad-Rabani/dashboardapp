"use client";

import React, { createContext, useContext } from "react";

export interface DashboardHistoryContextValue {
  canUndo: boolean;
  canRedo: boolean;
  undo: () => boolean;
  redo: () => boolean;
}

const DashboardHistoryContext =
  createContext<DashboardHistoryContextValue | null>(null);

export function DashboardHistoryProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: DashboardHistoryContextValue;
}) {
  return (
    <DashboardHistoryContext.Provider value={value}>
      {children}
    </DashboardHistoryContext.Provider>
  );
}

export function useDashboardHistoryContext(): DashboardHistoryContextValue {
  const ctx = useContext(DashboardHistoryContext);
  if (!ctx) {
    throw new Error(
      "useDashboardHistoryContext must be used within DashboardHistoryProvider"
    );
  }
  return ctx;
}
