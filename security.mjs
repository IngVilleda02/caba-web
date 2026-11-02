/**
 * Política de seguridad del sitio, compartida por next.config.ts (servidor Node/Vercel)
 * y por scripts/build-hostinger.mjs (que la escribe en .htaccess para el hosting estático).
 */
export function panelOrigin(panelUrl) {
  try { return panelUrl ? new URL(panelUrl).origin : ""; } catch { return ""; }
}

export function buildCsp({ dev = false, panelUrl = "" } = {}) {
  const origin = panelOrigin(panelUrl);
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    `connect-src 'self'${origin ? ` ${origin}` : ""}`,
    "frame-ancestors 'none'",
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'",
  ].join("; ");
}

export const otherHeaders = [
  ["X-Content-Type-Options", "nosniff"],
  ["X-Frame-Options", "DENY"],
  ["Referrer-Policy", "strict-origin-when-cross-origin"],
  ["Permissions-Policy", "camera=(), microphone=(), geolocation=()"],
  ["Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload"],
];
