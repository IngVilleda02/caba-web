import type { NextConfig } from "next";
import { panelAccessUrl, panelUrl } from "./src/lib/panel";
import { buildCsp, otherHeaders } from "./security.mjs";

/**
 * Dos formas de publicar:
 * - Servidor Node (Vercel o app Node.js de Hostinger): `npm run build` + `npm start`.
 * - Hosting estático (public_html de Hostinger): `npm run build:hostinger` → carpeta `out/` con su .htaccess.
 *   En ese modo /admin y las cabeceras de seguridad viven en .htaccess (ver scripts/build-hostinger.mjs).
 */
const isStatic = process.env.STATIC_EXPORT === "1";
const isDev = process.env.NODE_ENV !== "production";

const securityHeaders = [
  { key: "Content-Security-Policy", value: buildCsp({ dev: isDev, panelUrl: panelUrl() ?? "" }) },
  ...otherHeaders.map(([key, value]) => ({ key, value })),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(isStatic
    ? { output: "export" as const, trailingSlash: true, images: { unoptimized: true } }
    : {
        images: { formats: ["image/avif" as const, "image/webp" as const] },
        /** /admin → acceso al panel con la identidad de CABA. Sin NEXT_PUBLIC_PANEL_URL no existe (404). */
        async redirects() {
          const target = panelAccessUrl();
          return target ? [{ source: "/admin", destination: target, permanent: false }, { source: "/admin/:path*", destination: target, permanent: false }] : [];
        },
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
