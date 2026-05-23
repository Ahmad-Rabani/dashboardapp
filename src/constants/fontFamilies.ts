export interface FontFamilyOption {
  id: string;
  label: string;
  value: string;
}

export const FONT_FAMILIES: FontFamilyOption[] = [
  { id: "segoe", label: "Segoe UI", value: '"Segoe UI", system-ui, sans-serif' },
  { id: "inter", label: "Inter", value: '"Inter", system-ui, sans-serif' },
  { id: "roboto", label: "Roboto", value: '"Roboto", system-ui, sans-serif' },
  { id: "montserrat", label: "Montserrat", value: '"Montserrat", system-ui, sans-serif' },
  { id: "merriweather", label: "Merriweather", value: '"Merriweather", Georgia, serif' },
  { id: "playfair", label: "Playfair Display", value: '"Playfair Display", Georgia, serif' },
  { id: "georgia", label: "Georgia", value: "Georgia, 'Times New Roman', serif" },
  { id: "mono", label: "Courier New", value: '"Courier New", Courier, monospace' },
];

export const DEFAULT_FONT_FAMILY = FONT_FAMILIES[0].value;
