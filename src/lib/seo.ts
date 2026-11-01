import { site } from "@/content/site";
import { services } from "@/content/services";

/** Datos estructurados para Google (negocio local con horario y servicios). */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    logo: `${site.url}/brand/logo-full.svg`,
    image: `${site.url}/portfolio/carrito-vista-superior.webp`,
    telephone: site.phone,
    openingHours: site.hours.schema,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.street}, ${site.address.neighborhood}`,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: "San Juan del Río, Querétaro",
    makesOffer: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.lead } })),
  };
}
