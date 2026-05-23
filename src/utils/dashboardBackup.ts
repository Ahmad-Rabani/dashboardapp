import {
  DashboardSnapshot,
  DEFAULT_FOOTER_SETTINGS,
  DEFAULT_HEADER_SETTINGS,
} from "@/types/dashboard";

const BACKUP_VERSION = 1;
const EXPORT_MIME = "application/json";

export function isValidDashboardSnapshot(data: unknown): data is DashboardSnapshot {
  if (!data || typeof data !== "object") return false;

  const snapshot = data as DashboardSnapshot;
  if (snapshot.version !== BACKUP_VERSION) return false;
  if (!Array.isArray(snapshot.sections)) return false;
  if (!snapshot.header || typeof snapshot.header !== "object") return false;
  if (!snapshot.footer || typeof snapshot.footer !== "object") return false;

  return snapshot.sections.every(
    (section) =>
      typeof section.key === "string" &&
      (section.type === "text" || section.type === "image")
  );
}

export function normalizeSnapshot(raw: DashboardSnapshot): DashboardSnapshot {
  return {
    version: BACKUP_VERSION,
    sections: raw.sections,
    header: { ...DEFAULT_HEADER_SETTINGS, ...raw.header },
    footer: { ...DEFAULT_FOOTER_SETTINGS, ...raw.footer },
  };
}

export function buildBackupFilename(): string {
  const date = new Date().toISOString().slice(0, 10);
  return `dashboard-backup-${date}.json`;
}

export function downloadDashboardBackup(snapshot: DashboardSnapshot): void {
  const payload = JSON.stringify(snapshot, null, 2);
  const blob = new Blob([payload], { type: EXPORT_MIME });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = buildBackupFilename();
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function readDashboardBackupFile(
  file: File
): Promise<DashboardSnapshot> {
  const text = await file.text();
  let parsed: unknown;

  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("Invalid JSON file.");
  }

  if (!isValidDashboardSnapshot(parsed)) {
    throw new Error("This file is not a valid dashboard backup.");
  }

  return normalizeSnapshot(parsed);
}
