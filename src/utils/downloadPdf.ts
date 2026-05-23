const EXPORT_ROOT_ID = "dashboard-export-root";

export function getExportRootElement(): HTMLElement | null {
  return document.getElementById(EXPORT_ROOT_ID);
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
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
    ignoreElements: (el) => el.hasAttribute("data-no-export"),
    onclone: (doc) => {
      const exportClone = doc.getElementById(EXPORT_ROOT_ID);
      if (exportClone) {
        exportClone.style.backgroundColor = "#ffffff";
      }
    },
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(filename);
}
