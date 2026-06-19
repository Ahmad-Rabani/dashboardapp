const EXPORT_ROOT_ID = "dashboard-export-root";
const RENDER_SCALE = 2.5;
const JPEG_QUALITY = 0.95;
const MAX_IMAGE_WIDTH = 2048;
/** A4 width at ~300 DPI — high quality print resolution */
const MAX_CANVAS_WIDTH = 2480;

export function getExportRootElement(): HTMLElement | null {
  return document.getElementById(EXPORT_ROOT_ID);
}

function walkElements(root: HTMLElement): HTMLElement[] {
  return [root, ...Array.from(root.querySelectorAll("*"))].filter(
    (node): node is HTMLElement => node instanceof HTMLElement
  );
}

function downscaleCanvas(
  canvas: HTMLCanvasElement,
  maxWidth: number
): HTMLCanvasElement {
  if (canvas.width <= maxWidth) return canvas;

  const ratio = maxWidth / canvas.width;
  const scaled = document.createElement("canvas");
  scaled.width = maxWidth;
  scaled.height = Math.round(canvas.height * ratio);

  const ctx = scaled.getContext("2d");
  if (!ctx) return canvas;

  ctx.drawImage(canvas, 0, 0, scaled.width, scaled.height);
  return scaled;
}

function downscaleImages(doc: Document, root: HTMLElement) {
  root.querySelectorAll("img").forEach((node) => {
    const img = node as HTMLImageElement;
    const width = img.naturalWidth || img.width;
    if (!width || width <= MAX_IMAGE_WIDTH) return;

    const ratio = MAX_IMAGE_WIDTH / width;
    const canvas = doc.createElement("canvas");
    canvas.width = MAX_IMAGE_WIDTH;
    canvas.height = Math.round((img.naturalHeight || img.height) * ratio);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.src = canvas.toDataURL("image/jpeg", JPEG_QUALITY);
    img.removeAttribute("width");
    img.removeAttribute("height");
  });
}

/** html2canvas ignores object-fit — simulate cover with explicit dimensions */
function fixImagesForPdfExport(
  cloneRoot: HTMLElement,
  sourceRoot: HTMLElement
) {
  const sourceImages = sourceRoot.querySelectorAll("img");
  const cloneImages = cloneRoot.querySelectorAll("img");

  cloneImages.forEach((cloneNode, index) => {
    const cloneImg = cloneNode as HTMLImageElement;
    const sourceImg = sourceImages[index] as HTMLImageElement | undefined;
    if (!sourceImg) return;

    const sourceContainer = sourceImg.parentElement;
    if (!sourceContainer) return;

    const rect = sourceContainer.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const naturalWidth = sourceImg.naturalWidth || sourceImg.width;
    const naturalHeight = sourceImg.naturalHeight || sourceImg.height;
    if (!naturalWidth || !naturalHeight) return;

    const container = cloneImg.parentElement;
    if (!container) return;

    container.style.overflow = "hidden";
    container.style.width = `${rect.width}px`;
    container.style.height = `${rect.height}px`;

    const containerRatio = rect.width / rect.height;
    const imageRatio = naturalWidth / naturalHeight;

    cloneImg.style.display = "block";
    cloneImg.style.maxWidth = "none";
    cloneImg.style.objectFit = "none";

    if (imageRatio > containerRatio) {
      const height = rect.height;
      const width = height * imageRatio;
      cloneImg.style.width = `${width}px`;
      cloneImg.style.height = `${height}px`;
      cloneImg.style.marginLeft = `${(rect.width - width) / 2}px`;
      cloneImg.style.marginTop = "0";
    } else {
      const width = rect.width;
      const height = width / imageRatio;
      cloneImg.style.width = `${width}px`;
      cloneImg.style.height = `${height}px`;
      cloneImg.style.marginLeft = "0";
      cloneImg.style.marginTop = `${(rect.height - height) / 2}px`;
    }
  });
}

function extractFirstColor(value: string): string | null {
  const hex = value.match(/#(?:[0-9a-f]{3,8})\b/i);
  if (hex) return hex[0];

  const rgb = value.match(/rgba?\([^)]+\)/i);
  if (rgb) return rgb[0];

  return null;
}

/** html2canvas cannot render background-clip:text gradient fills */
function fixGradientTextForPdfExport(cloneRoot: HTMLElement) {
  const view = cloneRoot.ownerDocument.defaultView;
  if (!view) return;

  cloneRoot.querySelectorAll("*").forEach((node) => {
    const el = node as HTMLElement;
    const computed = view.getComputedStyle(el);
    const usesTextClip =
      computed.backgroundClip === "text" ||
      computed.webkitBackgroundClip === "text";
    const transparentFill =
      computed.webkitTextFillColor === "transparent" ||
      computed.color === "rgba(0, 0, 0, 0)";

    if (!usesTextClip && !transparentFill) return;

    const fallback =
      extractFirstColor(computed.backgroundImage) ??
      extractFirstColor(computed.background) ??
      "#111827";

    el.style.background = "none";
    el.style.backgroundImage = "none";
    el.style.backgroundClip = "unset";
    el.style.webkitBackgroundClip = "unset";
    el.style.webkitTextFillColor = fallback;
    el.style.color = fallback;
  });
}

/** Copy resolved visual styles so PDF matches preview (clamp(), gradients, colors) */
function syncComputedStyles(sourceRoot: HTMLElement, cloneRoot: HTMLElement) {
  const sourceNodes = walkElements(sourceRoot);
  const cloneNodes = walkElements(cloneRoot);

  cloneNodes.forEach((cloneEl, index) => {
    const sourceEl = sourceNodes[index];
    if (!sourceEl) return;

    const computed = window.getComputedStyle(sourceEl);

    cloneEl.style.fontSize = computed.fontSize;
    cloneEl.style.lineHeight = computed.lineHeight;
    cloneEl.style.fontFamily = computed.fontFamily;
    cloneEl.style.fontWeight = computed.fontWeight;
    cloneEl.style.textAlign = computed.textAlign;

    if (computed.color && computed.color !== "rgba(0, 0, 0, 0)") {
      cloneEl.style.color = computed.color;
    }

    if (
      computed.backgroundColor &&
      computed.backgroundColor !== "rgba(0, 0, 0, 0)"
    ) {
      cloneEl.style.backgroundColor = computed.backgroundColor;
    }

    if (computed.backgroundImage && computed.backgroundImage !== "none") {
      cloneEl.style.backgroundImage = computed.backgroundImage;
      cloneEl.style.backgroundSize = computed.backgroundSize;
      cloneEl.style.backgroundRepeat = computed.backgroundRepeat;
      cloneEl.style.backgroundPosition = computed.backgroundPosition;
    }
  });
}

function getAlignedContainers(root: HTMLElement): HTMLElement[] {
  const containers: HTMLElement[] = [];
  const seen = new Set<HTMLElement>();

  const add = (el: Element | null | undefined) => {
    if (!(el instanceof HTMLElement) || seen.has(el)) return;
    seen.add(el);
    containers.push(el);
  };

  add(root.querySelector(":scope > header > :first-child"));

  root.querySelectorAll("footer").forEach((footer) => {
    add(footer.parentElement);
  });

  root.querySelectorAll('[class*="ResizableSection"]').forEach((section) => {
    add(section.parentElement);
  });

  return containers;
}

/** Pin aligned columns to their preview positions — html2canvas iframes break %/auto layout */
function syncAlignedLayout(sourceRoot: HTMLElement, cloneRoot: HTMLElement) {
  const rootRect = sourceRoot.getBoundingClientRect();
  const sourceAligned = getAlignedContainers(sourceRoot);
  const cloneAligned = getAlignedContainers(cloneRoot);

  cloneAligned.forEach((cloneEl, index) => {
    const sourceEl = sourceAligned[index];
    if (!sourceEl) return;

    const rect = sourceEl.getBoundingClientRect();
    const parent = cloneEl.parentElement;

    if (parent) {
      parent.style.display = "block";
      parent.style.width = "100%";
    }

    const computed = window.getComputedStyle(sourceEl);

    cloneEl.style.width = `${rect.width}px`;
    cloneEl.style.maxWidth = `${rect.width}px`;
    cloneEl.style.marginLeft = `${rect.left - rootRect.left}px`;
    cloneEl.style.marginRight = `${rootRect.right - rect.right}px`;
    cloneEl.style.paddingLeft = computed.paddingLeft;
    cloneEl.style.paddingRight = computed.paddingRight;
    cloneEl.style.boxSizing = "border-box";
  });

  const sourceFooters = sourceRoot.querySelectorAll("footer");
  const cloneFooters = cloneRoot.querySelectorAll("footer");

  cloneFooters.forEach((cloneNode, index) => {
    const sourceEl = sourceFooters[index] as HTMLElement | undefined;
    const cloneEl = cloneNode as HTMLElement;
    if (!sourceEl) return;

    const rect = sourceEl.getBoundingClientRect();
    cloneEl.style.width = `${rect.width}px`;
    cloneEl.style.maxWidth = `${rect.width}px`;
    cloneEl.style.boxSizing = "border-box";
  });
}

function prepareCloneForPdfExport(doc: Document, sourceRoot: HTMLElement) {
  const root = doc.getElementById(EXPORT_ROOT_ID);
  if (!root) return;

  root.style.backgroundColor = "#ffffff";

  root.querySelectorAll("*").forEach((node) => {
    const el = node as HTMLElement;
    el.style.boxShadow = "none";
    el.style.outline = "none";
  });

  downscaleImages(doc, root);
  syncComputedStyles(sourceRoot, root);
  fixGradientTextForPdfExport(root);
  fixImagesForPdfExport(root, sourceRoot);
  syncAlignedLayout(sourceRoot, root);
}

export async function downloadDashboardAsPdf(
  filename = "dashboard.pdf"
): Promise<void> {
  const element = getExportRootElement();
  if (!element) {
    throw new Error("Export content not found.");
  }

  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  const canvas = await html2canvas(element, {
    scale: RENDER_SCALE,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
    ignoreElements: (el) => el.hasAttribute("data-no-export"),
    onclone: (doc) => {
      prepareCloneForPdfExport(doc, element);
    },
  });

  const exportCanvas = downscaleCanvas(canvas, MAX_CANVAS_WIDTH);
  const imgData = exportCanvas.toDataURL("image/jpeg", JPEG_QUALITY);

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth;
  const imgHeight = (exportCanvas.height * imgWidth) / exportCanvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(
    imgData,
    "JPEG",
    0,
    position,
    imgWidth,
    imgHeight,
    undefined,
    "FAST"
  );
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(
      imgData,
      "JPEG",
      0,
      position,
      imgWidth,
      imgHeight,
      undefined,
      "FAST"
    );
    heightLeft -= pageHeight;
  }

  pdf.save(filename);
}
