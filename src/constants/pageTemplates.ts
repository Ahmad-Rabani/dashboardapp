import {
  DashboardSnapshot,
  DEFAULT_FOOTER_SETTINGS,
  DEFAULT_HEADER_SETTINGS,
  StoredSection,
  createDefaultEditorContent,
} from "@/types/dashboard";
import {
  DEFAULT_IMAGE_SECTION_HEIGHT,
  DEFAULT_TEXT_SECTION_HEIGHT,
} from "@/constants/sectionLayout";
import { DEFAULT_FONT_FAMILY } from "@/constants/fontFamilies";
import { createPlaceholderImage } from "@/utils/placeholderImage";

export interface PageTemplate {
  id: string;
  name: string;
  description: string;
  category: "business" | "personal" | "marketing" | "custom";
  accent: string;
  snapshot: DashboardSnapshot;
}

function textSection(key: string, text: string, height = DEFAULT_TEXT_SECTION_HEIGHT): StoredSection {
  const editorContent = createDefaultEditorContent(text);
  return {
    key,
    type: "text",
    height,
    editorContent,
    innerText: [text],
  };
}

function imageSection(
  key: string,
  placeholder: { title: string; subtitle?: string; from: string; to: string },
  background = "#eef2ff",
  height = DEFAULT_IMAGE_SECTION_HEIGHT
): StoredSection {
  return {
    key,
    type: "image",
    height,
    img: createPlaceholderImage(placeholder),
    imageBackgroundColor: background,
  };
}

export const CUSTOM_BLANK_TEMPLATE: PageTemplate = {
  id: "custom-blank",
  name: "Custom Template",
  description: "Start with a blank page and add your own sections manually.",
  category: "custom",
  accent: "#64748b",
  snapshot: {
    version: 1,
    header: { ...DEFAULT_HEADER_SETTINGS },
    footer: { ...DEFAULT_FOOTER_SETTINGS },
    sections: [],
  },
};

export const PAGE_TEMPLATES: PageTemplate[] = [
  CUSTOM_BLANK_TEMPLATE,
  {
    id: "local-business",
    name: "Local Business",
    description: "Hero image, welcome message, and services for shops, cafes, or salons.",
    category: "business",
    accent: "#4f46e5",
    snapshot: {
      version: 1,
      header: {
        ...DEFAULT_HEADER_SETTINGS,
        headerText: "Your Business Name",
        textSize: "28",
        textColor: "#0f172a",
        backgroundColor: "#ffffff",
        fontFamily: DEFAULT_FONT_FAMILY,
      },
      footer: {
        ...DEFAULT_FOOTER_SETTINGS,
        name: "Mon–Sat 9am–6pm",
        nameCheckbox: true,
        address: "123 Main Street, Your City",
        addressCheckbox: true,
        phoneNumber: "(555) 123-4567",
        phoneNumberCheckbox: true,
        email: "hello@yourbusiness.com",
        emailCheckbox: true,
        backgroundColor: "#0f0f6c",
        textColor: "#ffffff",
        linkColor: "#93c5fd",
      },
      sections: [
        imageSection(
          "biz-hero",
          {
            title: "Your business photo",
            from: "#4f46e5",
            to: "#312e81",
          },
          "#e0e7ff",
          320
        ),
        textSection(
          "biz-welcome",
          "Welcome! Tell visitors what you do, who you serve, and why they should choose you. Keep it friendly and specific to your neighborhood.",
          220
        ),
        textSection(
          "biz-services",
          "Our Services\n\n• Service or product one — short benefit\n• Service or product two — short benefit\n• Service or product three — short benefit\n\nAdd pricing, hours, or a special offer here.",
          260
        ),
      ],
    },
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Showcase your work with a photo, bio, and featured projects.",
    category: "personal",
    accent: "#7c3aed",
    snapshot: {
      version: 1,
      header: {
        ...DEFAULT_HEADER_SETTINGS,
        headerText: "Alex Morgan · Creative",
        textSize: "26",
        textColor: "#1e1b4b",
        backgroundColor: "#faf5ff",
        fontFamily: '"Playfair Display", Georgia, serif',
      },
      footer: {
        ...DEFAULT_FOOTER_SETTINGS,
        name: "",
        nameCheckbox: false,
        address: "",
        addressCheckbox: false,
        phoneNumber: "",
        phoneNumberCheckbox: false,
        email: "contact@youremail.com",
        emailCheckbox: true,
        backgroundColor: "#faf5ff",
        textColor: "#4c1d95",
        linkColor: "#7c3aed",
      },
      sections: [
        imageSection(
          "port-photo",
          {
            title: "Portfolio highlight",
            from: "#7c3aed",
            to: "#4c1d95",
          },
          "#f5f3ff",
          300
        ),
        textSection(
          "port-bio",
          "Hi, I'm Alex — a designer focused on brand identity and digital experiences. I help teams turn ideas into polished, memorable visuals.",
          200
        ),
        textSection(
          "port-work",
          "Selected Work\n\nProject One — One-line outcome or client type.\nProject Two — One-line outcome or client type.\nProject Three — One-line outcome or client type.\n\nReplace with your case studies or link to a full portfolio.",
          240
        ),
      ],
    },
  },
  {
    id: "product-launch",
    name: "Product Launch",
    description: "Announce a new product with highlights, imagery, and a clear call to action.",
    category: "marketing",
    accent: "#059669",
    snapshot: {
      version: 1,
      header: {
        ...DEFAULT_HEADER_SETTINGS,
        headerText: "Introducing Your Product",
        alignment: "center",
        textSize: "30",
        textColor: "#064e3b",
        backgroundColor: "#ecfdf5",
        fontFamily: DEFAULT_FONT_FAMILY,
      },
      footer: {
        ...DEFAULT_FOOTER_SETTINGS,
        name: "Limited launch offer — 20% off this week",
        nameCheckbox: true,
        address: "",
        addressCheckbox: false,
        phoneNumber: "",
        phoneNumberCheckbox: false,
        email: "orders@yourbrand.com",
        emailCheckbox: true,
        backgroundColor: "#064e3b",
        textColor: "#ecfdf5",
        linkColor: "#6ee7b7",
      },
      sections: [
        textSection(
          "launch-hook",
          "The all-new [Product Name] is here. One sentence on the main problem it solves and who it's for.",
          180
        ),
        imageSection(
          "launch-visual",
          {
            title: "Product image",
            from: "#059669",
            to: "#064e3b",
          },
          "#d1fae5",
          300
        ),
        textSection(
          "launch-features",
          "Why customers love it\n\n✓ Key benefit one\n✓ Key benefit two\n✓ Key benefit three\n\nStarting at $XX — Order now or book a demo.",
          250
        ),
      ],
    },
  },
  {
    id: "event-flyer",
    name: "Event & Flyer",
    description: "Date, venue, and details for workshops, meetups, or community events.",
    category: "marketing",
    accent: "#ea580c",
    snapshot: {
      version: 1,
      header: {
        ...DEFAULT_HEADER_SETTINGS,
        headerText: "Community Workshop 2026",
        alignment: "center",
        textSize: "32",
        textColor: "#7c2d12",
        backgroundColor: "#fff7ed",
        fontFamily: DEFAULT_FONT_FAMILY,
      },
      footer: {
        ...DEFAULT_FOOTER_SETTINGS,
        name: "Free admission · RSVP required",
        nameCheckbox: true,
        address: "City Library, Room 204",
        addressCheckbox: true,
        phoneNumber: "",
        phoneNumberCheckbox: false,
        email: "events@organizer.org",
        emailCheckbox: true,
        backgroundColor: "#7c2d12",
        textColor: "#ffedd5",
        linkColor: "#fdba74",
      },
      sections: [
        textSection(
          "event-when",
          "Saturday, June 14 · 2:00 PM – 4:30 PM\n\nJoin us for a hands-on session. Describe the topic, who should attend, and what they'll take away.",
          200
        ),
        imageSection(
          "event-banner",
          {
            title: "Event banner",
            from: "#ea580c",
            to: "#9a3412",
          },
          "#ffedd5",
          280
        ),
        textSection(
          "event-details",
          "What to expect\n\n• Agenda item or speaker\n• Agenda item or activity\n• Q&A and networking\n\nRegister at the link in the footer. Walk-ins welcome if space allows.",
          220
        ),
      ],
    },
  },
];

export const TEMPLATE_CATEGORIES: Record<
  PageTemplate["category"],
  string
> = {
  custom: "Blank",
  business: "Business",
  personal: "Personal",
  marketing: "Marketing",
};
