/**
 * Servicios de CABA. `image` vive en /public/portfolio.
 * `id` se usa en los filtros del portafolio y en el mensaje de WhatsApp.
 */
export interface Service {
  id: "maquinados" | "estructuras" | "ensambles";
  title: string;
  lead: string;
  items: string[];
  image: { src: string; alt: string };
}

export const services: Service[] = [
  {
    id: "maquinados",
    title: "Maquinados",
    lead: "Piezas a la medida para herramental, fixtures y líneas de producción.",
    items: ["Piezas según plano o muestra", "Bases, bloques y placas de sujeción", "Torno y CNC", "Material de acuerdo al cliente"],
    image: { src: "/portfolio/maquinado-fixture.webp", alt: "Fixture con bloques y placas maquinadas en color amarillo" },
  },
  {
    id: "estructuras",
    title: "Estructuras",
    lead: "Mesas, bastidores y soportes fabricados para el espacio de tu celda.",
    items: ["Mesas y bastidores de trabajo", "Soportes y protecciones", "Diseño a la medida del área", "Material de acuerdo al cliente"],
    image: { src: "/portfolio/cortina-estructura.webp", alt: "Estructura de mesa con malla y cubierta abatible" },
  },
  {
    id: "ensambles",
    title: "Ensambles",
    lead: "Ensamble final de equipos listos para operar en planta.",
    items: ["Integración de piezas y componentes", "Mecanismos con cilindros neumáticos", "Carritos y equipos de traslado", "Entrega lista para usar"],
    image: { src: "/portfolio/carrito-frente.webp", alt: "Carrito rojo con fixtures de soldadura ensamblados" },
  },
];
