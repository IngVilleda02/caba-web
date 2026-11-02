import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/content/site";

export const dynamic = "force-static";
export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagen al compartir el enlace (WhatsApp, LinkedIn y el portafolio de MIRAI NEXUS). */
export default async function OG() {
  const logo = await readFile(path.join(process.cwd(), "public/brand/logo-full.svg"));
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;
  const photo = await readFile(path.join(process.cwd(), "src/app/og-photo.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#eef1f4" }}>
        <div style={{ width: 560, flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: 64, gap: 36 }}>
          <img src={logoSrc} alt="" width={380} height={215} />
          <div style={{ fontSize: 40, fontWeight: 700, color: "#1d1d1f", lineHeight: 1.15, letterSpacing: -1 }}>
            Maquinados, estructuras y ensambles.
          </div>
          <div style={{ fontSize: 24, color: "#6e6e73" }}>San Juan del Río, Querétaro</div>
        </div>
        <img src={photoSrc} alt="" width={640} height={630} style={{ objectFit: "cover" }} />
      </div>
    ),
    size,
  );
}
