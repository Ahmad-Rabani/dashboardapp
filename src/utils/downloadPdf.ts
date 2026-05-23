const EXPORT_ROOT_ID = "dashboard-export-root";
const RENDER_SCALE = 1.25;
const JPEG_QUALITY = 0.82;
const MAX_IMAGE_WIDTH = 1024;
/** A4 width at ~150 DPI — enough for crisp print without bloating file size */
const MAX_CANVAS_WIDTH = 1240;

export function getExportRootElement(): HTMLElement | null {
  return document.getElementById(EXPORT_ROOT_ID);
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

function prepareCloneForPdfExport(doc: Document) {
  const root = doc.getElementById(EXPORT_ROOT_ID);
  if (!root) return;

  root.style.backgroundColor = "#ffffff";

  Array.from(root.children).forEach((node) => {
    (node as HTMLElement).style.backgroundColor = "#ffffff";
  });

  root.querySelectorAll("header, footer, main").forEach((node) => {
    (node as HTMLElement).style.backgroundColor = "#ffffff";
  });

  root.querySelectorAll("[class]").forEach((node) => {
    const el = node as HTMLElement;
    el.style.boxShadow = "none";
    el.style.outline = "none";
  });

  downscaleImages(doc, root);
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
      prepareCloneForPdfExport(doc);
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
