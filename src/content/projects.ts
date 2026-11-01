import type { Service } from "./services";

/**
 * Portafolio. Para agregar un proyecto copia un bloque y cambia los datos.
 * Las fotos van en /public/portfolio (WebP de ~1600 px de ancho).
 * Mostrar el nombre del cliente final solo con su autorización.
 */
export interface Project {
  slug: string;
  title: string;
  client: string;
  industry: string;
  summary: string;
  services: Service["id"][];
  images: { src: string; alt: string; width: number; height: number }[];
}

export const projects: Project[] = [
  {
    slug: "carrito-soporte",
    title: "Carrito de soporte industrial",
    client: "Topre Autoparts",
    industry: "Automotriz",
    summary:
      "Carrito con mesa elevadora y bases maquinadas para trasladar y presentar fixtures de soldadura junto a la línea.",
    services: ["estructuras", "ensambles", "maquinados"],
    images: [
      { src: "/portfolio/carrito-vista-superior.webp", alt: "Vista superior del carrito con dos fixtures montados", width: 1280, height: 960 },
      { src: "/portfolio/carrito-frente.webp", alt: "Vista frontal del carrito con fixtures de soldadura", width: 900, height: 1180 },
    ],
  },
  {
    slug: "cortinas-apertura",
    title: "Cortinas de apertura",
    client: "Topre Autoparts",
    industry: "Automotriz",
    summary:
      "Mesa con cubierta abatible accionada por cilindro, instalada sobre el contenedor de producto en la celda de producción.",
    services: ["estructuras", "ensambles"],
    images: [
      { src: "/portfolio/cortina-instalada.webp", alt: "Cubierta abatible con cilindro instalada en la celda", width: 960, height: 1280 },
      { src: "/portfolio/cortina-celda.webp", alt: "Mesa con cubierta dentro de la celda de soldadura", width: 960, height: 1280 },
      { src: "/portfolio/cortina-estructura.webp", alt: "Estructura de la mesa con malla antes de su instalación", width: 720, height: 1140 },
    ],
  },
  {
    slug: "maquinados-piezas",
    title: "Maquinados de piezas",
    client: "Topre Autoparts",
    industry: "Automotriz",
    summary: "Bases, bloques y placas de sujeción maquinadas para fixtures de soldadura de autopartes.",
    services: ["maquinados"],
    images: [
      { src: "/portfolio/maquinado-fixture.webp", alt: "Fixture con bloques maquinados y cilindro neumático", width: 480, height: 580 },
      { src: "/portfolio/maquinado-clamps.webp", alt: "Brazos de sujeción con placas maquinadas", width: 410, height: 400 },
      { src: "/portfolio/maquinado-ensamble.webp", alt: "Detalle de fixture maquinado montado en su base", width: 320, height: 440 },
    ],
  },
];

export const clients = ["Topre Autoparts"];
