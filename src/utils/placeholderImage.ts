export interface PlaceholderImageOptions {
  title: string;
  subtitle?: string;
  from: string;
  to: string;
}

/** Inline SVG hero placeholder — works offline and in localStorage backups. */
export function createPlaceholderImage({
  title,
  subtitle = "Click to upload your photo",
  from,
  to,
}: PlaceholderImageOptions): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <g transform="translate(600 255)" fill="none" stroke="#ffffff" stroke-width="4" opacity="0.92">
    <rect x="-90" y="-60" width="180" height="120" rx="14"/>
    <circle cx="-45" cy="-15" r="16" fill="#ffffff" fill-opacity="0.35" stroke="none"/>
    <path d="M-90 45 L-10 -25 L70 45" stroke-linejoin="round"/>
  </g>
  <text x="600" y="400" text-anchor="middle" fill="#ffffff" font-family="system-ui,-apple-system,Segoe UI,sans-serif" font-size="32" font-weight="600">${escapeXml(title)}</text>
  <text x="600" y="445" text-anchor="middle" fill="#ffffff" fill-opacity="0.9" font-family="system-ui,-apple-system,Segoe UI,sans-serif" font-size="20">${escapeXml(subtitle)}</text>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function hasDisplayableImage(src?: string): boolean {
  return Boolean(src?.trim());
}
