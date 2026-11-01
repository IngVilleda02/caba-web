/**
 * CABA — datos de la empresa. Edita aquí teléfonos, dirección, horario y textos globales.
 * Fuente: Ficha del cliente (MIRAI NEXUS).
 */
export const site = {
  name: "CABA Servicios y Maquinados Industriales",
  shortName: "CABA",
  legalName: "Israel Camacho Montes",
  tagline: "Maquinados, estructuras y ensambles para la industria automotriz.",
  description:
    "Maquinados, estructuras y ensambles a la medida para la industria automotriz y de manufactura en San Juan del Río, Querétaro. Respuesta rápida y costos flexibles.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://caba-maquinados.vercel.app").replace(/\/$/, ""),
  locale: "es_MX",
  city: "San Juan del Río, Qro.",
  address: {
    street: "Gladiolas 21",
    neighborhood: "Comevi Banthi",
    postalCode: "76806",
    city: "San Juan del Río",
    region: "Querétaro",
    country: "MX",
  },
  phoneDisplay: "+52 427 123 9550",
  phone: "+524271239550",
  whatsapp: "524271239550",
  whatsappMessage: "Hola CABA, me gustaría solicitar una visita a planta.",
  hours: {
    label: "Lunes a sábado",
    range: "9:00 a.m. – 6:00 p.m.",
    days: [1, 2, 3, 4, 5, 6],
    open: 9,
    close: 18,
    timeZone: "America/Mexico_City",
    schema: "Mo-Sa 09:00-18:00",
  },
  yearsLabel: "Más de 4 años",
  credit: { name: "MIRAI NEXUS", url: "https://www.instagram.com/mirai.nexuss" },
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.address.street}, ${site.address.neighborhood}, ${site.address.postalCode} ${site.address.city}, ${site.address.region}`,
)}`;

export function whatsappHref(message: string = site.whatsappMessage) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const navigation = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Por qué CABA", href: "#por-que" },
  { label: "Contacto", href: "#contacto" },
] as const;
