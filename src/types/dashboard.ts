import { EditorStateType } from "../../types";
import { DEFAULT_FONT_FAMILY } from "@/constants/fontFamilies";

export interface HeaderSettings {
  headerText: string;
  alignment: string;
  textSize: string;
  textColor: string;
  backgroundColor: string;
  fontFamily: string;
}

export interface FooterSettings {
  name: string;
  nameCheckbox: boolean;
  address: string;
  addressCheckbox: boolean;
  phoneNumber: string;
  phoneNumberCheckbox: boolean;
  email: string;
  emailCheckbox: boolean;
  backgroundColor: string;
  textColor: string;
  linkColor: string;
}

export interface StoredSection {
  key: string;
  type: "text" | "image";
  height?: number;
  img?: string;
  imageBackgroundColor?: string;
  editorContent?: EditorStateType;
  innerText?: string[];
}

export interface DashboardSnapshot {
  version: 1;
  sections: StoredSection[];
  header: HeaderSettings;
  footer: FooterSettings;
}

export const DEFAULT_HEADER_SETTINGS: HeaderSettings = {
  headerText: "Header",
  alignment: "center",
  textSize: "25",
  textColor: "#000000",
  backgroundColor: "#ffffff",
  fontFamily: DEFAULT_FONT_FAMILY,
};

export const DEFAULT_FOOTER_SETTINGS: FooterSettings = {
  name: "shop desription",
  nameCheckbox: false,
  address: "Address",
  addressCheckbox: false,
  phoneNumber: "Phone Number",
  phoneNumberCheckbox: false,
  email: "Email",
  emailCheckbox: false,
  backgroundColor: "#ffffff",
  textColor: "#000000",
  linkColor: "#2563eb",
};

export function createDefaultEditorContent(text = ""): EditorStateType {
  return {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "color: black;",
              text,
              type: "text",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  };
}

export function extractInnerText(editorContent?: EditorStateType): string[] {
  if (!editorContent?.root?.children?.[0]?.children) return [""];
  return editorContent.root.children[0].children.map((child) => child.text);
}
