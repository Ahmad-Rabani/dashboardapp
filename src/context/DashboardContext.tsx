"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_FOOTER_SETTINGS,
  DEFAULT_HEADER_SETTINGS,
  FooterSettings,
  HeaderSettings,
} from "@/types/dashboard";

interface DashboardContextValue {
  header: HeaderSettings;
  setHeader: React.Dispatch<React.SetStateAction<HeaderSettings>>;
  updateHeader: (patch: Partial<HeaderSettings>) => void;
  footer: FooterSettings;
  setFooter: React.Dispatch<React.SetStateAction<FooterSettings>>;
  updateFooter: (patch: Partial<FooterSettings>) => void;
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  resetLayoutSettings: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [header, setHeader] = useState<HeaderSettings>(DEFAULT_HEADER_SETTINGS);
  const [footer, setFooter] = useState<FooterSettings>(DEFAULT_FOOTER_SETTINGS);
  const [hydrated, setHydrated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const updateHeader = useCallback((patch: Partial<HeaderSettings>) => {
    setHeader((prev) => ({ ...prev, ...patch }));
  }, []);

  const updateFooter = useCallback((patch: Partial<FooterSettings>) => {
    setFooter((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetLayoutSettings = useCallback(() => {
    setHeader(DEFAULT_HEADER_SETTINGS);
    setFooter(DEFAULT_FOOTER_SETTINGS);
  }, []);

  const value = useMemo(
    () => ({
      header,
      setHeader,
      updateHeader,
      footer,
      setFooter,
      updateFooter,
      hydrated,
      setHydrated,
      resetLayoutSettings,
      isSidebarOpen,
      setIsSidebarOpen,
    }),
    [
      header,
      updateHeader,
      footer,
      updateFooter,
      hydrated,
      resetLayoutSettings,
      isSidebarOpen,
    ]
  );

  return (
    <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
  );
}

export function useDashboardContext(): DashboardContextValue {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboardContext must be used within DashboardProvider");
  }
  return ctx;
}
