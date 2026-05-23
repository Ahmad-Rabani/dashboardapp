import { ComponentType } from "../../types";
import {
  DEFAULT_FOOTER_SETTINGS,
  DEFAULT_HEADER_SETTINGS,
  FooterSettings,
  HeaderSettings,
} from "@/types/dashboard";
import { countDashboardMatches } from "@/utils/findReplace";

export type PlaceholderCategory = "business" | "contact" | "bracket" | "default";

export interface TextPlaceholderFinding {
  id: string;
  findText: string;
  label: string;
  hint?: string;
  matchCount: number;
  category: PlaceholderCategory;
}

export interface ImagePlaceholderFinding {
  id: string;
  sectionKey: string;
  sectionIndex: number;
  label: string;
}

export interface PlaceholderScanResult {
  textPlaceholders: TextPlaceholderFinding[];
  imagePlaceholders: ImagePlaceholderFinding[];
  totalTextMatches: number;
}

interface CatalogEntry {
  findText: string;
  label: string;
  hint?: string;
  category: PlaceholderCategory;
}

/** Known strings shipped with built-in page templates. */
const TEMPLATE_PLACEHOLDER_CATALOG: CatalogEntry[] = [
  {
    findText: "Your Business Name",
    label: "Business name",
    hint: "Acme Coffee Co.",
    category: "business",
  },
  {
    findText: "123 Main Street, Your City",
    label: "Street address",
    hint: "42 Oak Ave, Portland",
    category: "contact",
  },
  {
    findText: "(555) 123-4567",
    label: "Phone number",
    hint: "(503) 555-0199",
    category: "contact",
  },
  {
    findText: "hello@yourbusiness.com",
    label: "Business email",
    hint: "hello@yourbusiness.com",
    category: "contact",
  },
  {
    findText: "Alex Morgan · Creative",
    label: "Your name & title",
    hint: "Jane Doe · Designer",
    category: "business",
  },
  {
    findText: "contact@youremail.com",
    label: "Contact email",
    hint: "you@email.com",
    category: "contact",
  },
  {
    findText: "Introducing Your Product",
    label: "Product headline",
    hint: "Introducing Spark Pro",
    category: "business",
  },
  {
    findText: "[Product Name]",
    label: "Product name",
    hint: "Spark Pro",
    category: "bracket",
  },
  {
    findText: "orders@yourbrand.com",
    label: "Orders email",
    hint: "orders@yourbrand.com",
    category: "contact",
  },
  {
    findText: "Community Workshop 2026",
    label: "Event title",
    hint: "Spring Meetup 2026",
    category: "business",
  },
  {
    findText: "events@organizer.org",
    label: "Organizer email",
    hint: "events@yourorganization.org",
    category: "contact",
  },
  {
    findText: "City Library, Room 204",
    label: "Venue",
    hint: "Community Center, Hall A",
    category: "contact",
  },
  {
    findText: "$XX",
    label: "Price",
    hint: "$29",
    category: "business",
  },
];

const DEFAULT_HEADER_TEXT = DEFAULT_HEADER_SETTINGS.headerText;
const DEFAULT_FOOTER_FIELDS: { field: keyof FooterSettings; label: string; hint: string }[] = [
  { field: "name", label: "Footer tagline", hint: "Mon–Sat 9am–6pm" },
  { field: "address", label: "Footer address", hint: "123 Main St" },
  { field: "phoneNumber", label: "Footer phone", hint: "(555) 123-4567" },
  { field: "email", label: "Footer email", hint: "hello@you.com" },
];

const BRACKET_REGEX = /\[([^\[\]\n]{1,80})\]/g;

function collectLexicalText(node: unknown, parts: string[]): void {
  if (!node || typeof node !== "object") return;

  const record = node as Record<string, unknown>;

  if (record.type === "text" && typeof record.text === "string") {
    parts.push(record.text);
    return;
  }

  for (const value of Object.values(record)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        collectLexicalText(item, parts);
      }
    } else if (value && typeof value === "object") {
      collectLexicalText(value, parts);
    }
  }
}

function collectAllTextParts(
  components: ComponentType[],
  header: HeaderSettings,
  footer: FooterSettings
): string[] {
  const parts: string[] = [header.headerText];

  for (const field of DEFAULT_FOOTER_FIELDS) {
    const value = footer[field.field];
    if (typeof value === "string") parts.push(value);
  }

  for (const section of components) {
    if (section.editorContent) {
      collectLexicalText(section.editorContent, parts);
    }
  }

  return parts;
}

function extractBracketPlaceholders(textParts: string[]): CatalogEntry[] {
  const seen = new Set<string>();
  const entries: CatalogEntry[] = [];

  for (const text of textParts) {
    BRACKET_REGEX.lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = BRACKET_REGEX.exec(text)) !== null) {
      const findText = match[0];
      if (seen.has(findText)) continue;
      seen.add(findText);

      const inner = match[1].trim();
      entries.push({
        findText,
        label: inner,
        hint: `Your ${inner.toLowerCase()}`,
        category: "bracket",
      });
    }
  }

  return entries;
}

export function isPlaceholderImage(src?: string): boolean {
  return Boolean(
    src?.startsWith("data:image/svg+xml") &&
      src.includes("Click to upload your photo")
  );
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

export function scanDashboardPlaceholders(
  components: ComponentType[],
  header: HeaderSettings,
  footer: FooterSettings
): PlaceholderScanResult {
  const catalog: CatalogEntry[] = [...TEMPLATE_PLACEHOLDER_CATALOG];
  const textParts = collectAllTextParts(components, header, footer);

  catalog.push(...extractBracketPlaceholders(textParts));

  if (header.headerText === DEFAULT_HEADER_TEXT) {
    catalog.push({
      findText: DEFAULT_HEADER_TEXT,
      label: "Page title",
      hint: "My Business",
      category: "default",
    });
  }

  for (const { field, label, hint } of DEFAULT_FOOTER_FIELDS) {
    const value = footer[field];
    const defaultValue = DEFAULT_FOOTER_SETTINGS[field];
    if (typeof value === "string" && value === defaultValue) {
      catalog.push({
        findText: value,
        label,
        hint,
        category: "default",
      });
    }
  }

  const seenFindText = new Set<string>();
  const textPlaceholders: TextPlaceholderFinding[] = [];

  for (const entry of catalog) {
    if (seenFindText.has(entry.findText)) continue;

    const matchCount = countDashboardMatches(
      components,
      header,
      footer,
      entry.findText,
      true
    );

    if (matchCount === 0) continue;

    seenFindText.add(entry.findText);
    textPlaceholders.push({
      id: slugify(entry.findText) || `placeholder-${textPlaceholders.length}`,
      findText: entry.findText,
      label: entry.label,
      hint: entry.hint,
      matchCount,
      category: entry.category,
    });
  }

  const categoryOrder: PlaceholderCategory[] = [
    "business",
    "contact",
    "bracket",
    "default",
  ];

  textPlaceholders.sort((a, b) => {
    const categoryDiff =
      categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
    if (categoryDiff !== 0) return categoryDiff;
    return b.matchCount - a.matchCount;
  });

  const imagePlaceholders: ImagePlaceholderFinding[] = [];

  components.forEach((section, index) => {
    if (section.component || !isPlaceholderImage(section.img)) return;

    imagePlaceholders.push({
      id: `image-${section.key}`,
      sectionKey: section.key,
      sectionIndex: index + 1,
      label: `Section ${index + 1} image`,
    });
  });

  const totalTextMatches = textPlaceholders.reduce(
    (sum, item) => sum + item.matchCount,
    0
  );

  return { textPlaceholders, imagePlaceholders, totalTextMatches };
}

export function scrollToSection(sectionKey: string): void {
  const element = document.querySelector(`[data-section-key="${sectionKey}"]`);
  element?.scrollIntoView({ behavior: "smooth", block: "center" });
}
