import { ComponentType, EditorStateType } from "../../types";
import { HeaderSettings, FooterSettings, extractInnerText } from "@/types/dashboard";

export interface FindReplaceOptions {
  find: string;
  replace: string;
  caseSensitive?: boolean;
}

export interface FindReplaceSummary {
  matchCount: number;
  sectionsUpdated: number;
  layoutFieldsUpdated: number;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildFindRegex(find: string, caseSensitive: boolean): RegExp {
  return new RegExp(escapeRegExp(find), caseSensitive ? "g" : "gi");
}

export function countOccurrences(
  text: string,
  find: string,
  caseSensitive = false
): number {
  if (!find || !text) return 0;
  return text.match(buildFindRegex(find, caseSensitive))?.length ?? 0;
}

export function replaceInText(
  text: string,
  find: string,
  replace: string,
  caseSensitive = false
): { text: string; count: number } {
  if (!find || !text) return { text, count: 0 };

  const regex = buildFindRegex(find, caseSensitive);
  let count = 0;
  const next = text.replace(regex, () => {
    count += 1;
    return replace;
  });

  return { text: next, count };
}

function replaceInLexicalTree(
  node: unknown,
  find: string,
  replace: string,
  caseSensitive: boolean
): { node: unknown; count: number } {
  if (!node || typeof node !== "object") return { node, count: 0 };

  const record = node as Record<string, unknown>;
  let count = 0;

  if (record.type === "text" && typeof record.text === "string") {
    const result = replaceInText(record.text, find, replace, caseSensitive);
    if (result.count > 0) {
      return {
        node: { ...record, text: result.text },
        count: result.count,
      };
    }
    return { node, count: 0 };
  }

  const next: Record<string, unknown> = { ...record };

  for (const key of Object.keys(next)) {
    const value = next[key];
    if (Array.isArray(value)) {
      let arrayCount = 0;
      next[key] = value.map((item) => {
        const result = replaceInLexicalTree(item, find, replace, caseSensitive);
        arrayCount += result.count;
        return result.node;
      });
      count += arrayCount;
    } else if (value && typeof value === "object") {
      const result = replaceInLexicalTree(value, find, replace, caseSensitive);
      next[key] = result.node;
      count += result.count;
    }
  }

  return { node: next, count };
}

export function replaceInEditorContent(
  content: EditorStateType | undefined,
  find: string,
  replace: string,
  caseSensitive = false
): { content: EditorStateType | undefined; count: number } {
  if (!content || !find) return { content, count: 0 };

  const cloned = JSON.parse(JSON.stringify(content)) as EditorStateType;
  const result = replaceInLexicalTree(cloned, find, replace, caseSensitive);
  return { content: result.node as EditorStateType, count: result.count };
}

const FOOTER_TEXT_FIELDS = [
  "name",
  "address",
  "phoneNumber",
  "email",
] as const satisfies readonly (keyof FooterSettings)[];

function countInLexicalTree(
  node: unknown,
  find: string,
  caseSensitive: boolean
): number {
  if (!node || typeof node !== "object") return 0;

  const record = node as Record<string, unknown>;
  let count = 0;

  if (record.type === "text" && typeof record.text === "string") {
    return countOccurrences(record.text, find, caseSensitive);
  }

  for (const value of Object.values(record)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        count += countInLexicalTree(item, find, caseSensitive);
      }
    } else if (value && typeof value === "object") {
      count += countInLexicalTree(value, find, caseSensitive);
    }
  }

  return count;
}

export function countDashboardMatches(
  components: ComponentType[],
  header: HeaderSettings,
  footer: FooterSettings,
  find: string,
  caseSensitive = false
): number {
  if (!find.trim()) return 0;

  let matchCount = 0;

  for (const section of components) {
    if (!section.component || !section.editorContent) continue;
    matchCount += countInLexicalTree(section.editorContent, find, caseSensitive);
  }

  matchCount += countOccurrences(header.headerText, find, caseSensitive);

  for (const field of FOOTER_TEXT_FIELDS) {
    const value = footer[field];
    if (typeof value === "string") {
      matchCount += countOccurrences(value, find, caseSensitive);
    }
  }

  return matchCount;
}

export function applyFindReplace(
  components: ComponentType[],
  header: HeaderSettings,
  footer: FooterSettings,
  options: FindReplaceOptions
): {
  components: ComponentType[];
  header: HeaderSettings;
  footer: FooterSettings;
  summary: FindReplaceSummary;
} {
  const { find, replace, caseSensitive = false } = options;

  if (!find.trim()) {
    return {
      components,
      header,
      footer,
      summary: { matchCount: 0, sectionsUpdated: 0, layoutFieldsUpdated: 0 },
    };
  }

  let matchCount = 0;
  let sectionsUpdated = 0;
  let layoutFieldsUpdated = 0;

  const nextComponents = components.map((section) => {
    if (!section.component || !section.editorContent) return section;

    const result = replaceInEditorContent(
      section.editorContent,
      find,
      replace,
      caseSensitive
    );

    if (result.count === 0) return section;

    matchCount += result.count;
    sectionsUpdated += 1;

    return {
      ...section,
      editorContent: result.content,
      innerText: extractInnerText(result.content),
    };
  });

  const nextHeader = { ...header };
  const headerResult = replaceInText(
    header.headerText,
    find,
    replace,
    caseSensitive
  );
  if (headerResult.count > 0) {
    nextHeader.headerText = headerResult.text;
    matchCount += headerResult.count;
    layoutFieldsUpdated += 1;
  }

  const nextFooter = { ...footer };
  for (const field of FOOTER_TEXT_FIELDS) {
    const value = footer[field];
    if (typeof value !== "string") continue;

    const result = replaceInText(value, find, replace, caseSensitive);
    if (result.count > 0) {
      nextFooter[field] = result.text;
      matchCount += result.count;
      layoutFieldsUpdated += 1;
    }
  }

  return {
    components: nextComponents,
    header: nextHeader,
    footer: nextFooter,
    summary: { matchCount, sectionsUpdated, layoutFieldsUpdated },
  };
}
