import type { NextConfig } from "next";
import { panelAccessUrl, panelUrl } from "./src/lib/panel";

/**
 * Cabeceras de seguridad aplicadas a todas las rutas.
 * Si en el futuro agregas un servicio externo (analítica, chat, mapas),
 * añade su dominio a la directiva CSP correspondiente.
 */
const isDev = process.env.NODE_ENV !== "production";

// Origen del panel de cotizaciones (para enviar las solicitudes del formulario).
const panelOrigin = (() => { try { const u = panelUrl(); return u ? new URL(u).origin : ""; } catch { return ""; } })();

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  // https: permite mostrar la imagen de vista previa de los sitios de clientes en el portafolio.
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self'${panelOrigin ? ` ${panelOrigin}` : ""}`,
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  /** /admin → acceso al panel con la identidad de CABA. Sin NEXT_PUBLIC_PANEL_URL no existe (404). */
  async redirects() {
    const target = panelAccessUrl();
    return target ? [{ source: "/admin", destination: target, permanent: false }, { source: "/admin/:path*", destination: target, permanent: false }] : [];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
