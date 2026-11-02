import type { NextConfig } from "next";
import { buildCsp, otherHeaders } from "./security.mjs";

/** Cabeceras de seguridad aplicadas a todas las rutas (Vercel o cualquier servidor Node). */
const isDev = process.env.NODE_ENV !== "production";

const securityHeaders = [
  { key: "Content-Security-Policy", value: buildCsp({ dev: isDev }) },
  ...otherHeaders.map(([key, value]) => ({ key, value })),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
