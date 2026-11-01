import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return { name: site.name, short_name: site.shortName, start_url: "/", display: "standalone", background_color: "#ffffff", theme_color: "#000000", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] };
}
