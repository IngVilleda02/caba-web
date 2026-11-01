import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@fontsource-variable/inter";
import "./globals.css";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Maquinados en San Juan del Río, Qro.`, template: `%s · CABA` },
  description: site.description,
  keywords: [
    "maquinados San Juan del Río",
    "maquinados CNC Querétaro",
    "estructuras industriales",
    "ensambles industriales",
    "fixtures automotriz",
    "taller de maquinados Querétaro",
  ],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: site.locale, url: site.url, siteName: site.name, title: site.name, description: site.description },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#000000", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <body>
        {children}
        {/* Interacción del sitio (menú, filtros, galería, formulario → WhatsApp) */}
        <Script src="/site.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
