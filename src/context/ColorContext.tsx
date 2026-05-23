"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export interface SectionColorSet {
  background: string;
  text: string;
  border: string;
  accent: string;
}

export interface SectionColors {
  [sectionId: string]: SectionColorSet;
}

export type ColorTarget = keyof SectionColorSet;

export interface SectionSettings {
  padding: number;
  fontSize: number;
  fontWeight: string;
  textAlign: "left" | "center" | "right" | "justify";
  lineHeight: number;
  showBorders: boolean;
  showShadows: boolean;
  compactMode: boolean;
}

export interface SectionSettingsMap {
  [sectionId: string]: SectionSettings;
}

export const DEFAULT_SECTION_COLORS: SectionColorSet = {
  background: "transparent",
  text: "inherit",
  border: "transparent",
  accent: "#6366f1",
};

export const DEFAULT_SECTION_SETTINGS: SectionSettings = {
  padding: 16,
  fontSize: 16,
  fontWeight: "400",
  textAlign: "left",
  lineHeight: 1.5,
  showBorders: true,
  showShadows: false,
  compactMode: false,
};

export interface ColorContextValue {
  colors: SectionColors;
  settings: SectionSettingsMap;
  activeSectionId: string | null;
  setActiveSectionId: (id: string | null) => void;
  updateSectionColor: (
    sectionId: string,
    key: ColorTarget,
    value: string
  ) => void;
  updateSectionSetting: <K extends keyof SectionSettings>(
    sectionId: string,
    key: K,
    value: SectionSettings[K]
  ) => void;
  getSectionColors: (sectionId: string) => SectionColorSet;
  getSectionSettings: (sectionId: string) => SectionSettings;
  resetAll: () => void;
}

const ColorContext = createContext<ColorContextValue | null>(null);

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [colors, setColors] = useState<SectionColors>({});
  const [settings, setSettings] = useState<SectionSettingsMap>({});
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  const getSectionColors = useCallback(
    (sectionId: string): SectionColorSet => ({
      ...DEFAULT_SECTION_COLORS,
      ...colors[sectionId],
    }),
    [colors]
  );

  const getSectionSettings = useCallback(
    (sectionId: string): SectionSettings => ({
      ...DEFAULT_SECTION_SETTINGS,
      ...settings[sectionId],
    }),
    [settings]
  );

  const updateSectionColor = useCallback(
    (sectionId: string, key: ColorTarget, value: string) => {
      setColors((prev) => ({
        ...prev,
        [sectionId]: {
          ...DEFAULT_SECTION_COLORS,
          ...prev[sectionId],
          [key]: value,
        },
      }));
    },
    []
  );

  const updateSectionSetting = useCallback(
    <K extends keyof SectionSettings>(
      sectionId: string,
      key: K,
      value: SectionSettings[K]
    ) => {
      setSettings((prev) => ({
        ...prev,
        [sectionId]: {
          ...DEFAULT_SECTION_SETTINGS,
          ...prev[sectionId],
          [key]: value,
        },
      }));
    },
    []
  );

  const resetAll = useCallback(() => {
    setColors({});
    setSettings({});
    setActiveSectionId(null);
  }, []);

  const value = useMemo(
    () => ({
      colors,
      settings,
      activeSectionId,
      setActiveSectionId,
      updateSectionColor,
      updateSectionSetting,
      getSectionColors,
      getSectionSettings,
      resetAll,
    }),
    [
      colors,
      settings,
      activeSectionId,
      updateSectionColor,
      updateSectionSetting,
      getSectionColors,
      getSectionSettings,
      resetAll,
    ]
  );

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
}

export function useColorContext(): ColorContextValue {
  const ctx = useContext(ColorContext);
  if (!ctx) {
    throw new Error("useColorContext must be used within ColorProvider");
  }
  return ctx;
}
