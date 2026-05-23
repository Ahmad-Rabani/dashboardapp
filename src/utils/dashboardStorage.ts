import { ComponentType } from "../../types";
import {
  DashboardSnapshot,
  DEFAULT_FOOTER_SETTINGS,
  DEFAULT_HEADER_SETTINGS,
  StoredSection,
  extractInnerText,
} from "@/types/dashboard";

const STORAGE_KEY = "dashboardapp-data";

export function toStoredSections(sections: ComponentType[]): StoredSection[] {
  return sections.map((section) => ({
    key: section.key,
    type: section.component ? "text" : "image",
    height: section.height,
    img: section.img,
    imageBackgroundColor: section.imageBackgroundColor,
    editorContent: section.editorContent,
    innerText: section.innerText ?? extractInnerText(section.editorContent),
  }));
}

export function fromStoredSections(stored: StoredSection[]): ComponentType[] {
  return stored.map((section) => {
    if (section.type === "text") {
      return {
        key: section.key,
        component: "Text",
        height: section.height,
        editorContent: section.editorContent,
        innerText:
          section.innerText ?? extractInnerText(section.editorContent),
      } as unknown as ComponentType;
    }

    return {
      key: section.key,
      img: section.img ?? "",
      height: section.height,
      imageBackgroundColor: section.imageBackgroundColor,
    } as unknown as ComponentType;
  });
}

export function loadDashboard(): DashboardSnapshot | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as DashboardSnapshot;
    if (parsed.version !== 1 || !Array.isArray(parsed.sections)) return null;

    return {
      version: 1,
      sections: parsed.sections,
      header: { ...DEFAULT_HEADER_SETTINGS, ...parsed.header },
      footer: { ...DEFAULT_FOOTER_SETTINGS, ...parsed.footer },
    };
  } catch {
    return null;
  }
}

export function saveDashboard(snapshot: DashboardSnapshot): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch (error) {
    console.error("Failed to save dashboard:", error);
  }
}

export function clearDashboardStorage(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function createEmptySnapshot(): DashboardSnapshot {
  return {
    version: 1,
    sections: [],
    header: DEFAULT_HEADER_SETTINGS,
    footer: DEFAULT_FOOTER_SETTINGS,
  };
}
