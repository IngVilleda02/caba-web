import Image from "next/image";
import { site, whatsappHref } from "@/content/site";
import { WhatsAppIcon } from "@/components/Icons";
import { InlineMedia } from "@/components/InlineMedia";

/**
 * Héroe «plano de taller»: titular con fotos reales dentro del texto (Intertext)
 * y la foto del carrito anotada con cotas, como una lámina de ingeniería.
 */
const cotas = [
  // x, y = punto sobre la pieza (%); lx, ly = posición de la etiqueta (%)
  { x: 34, y: 32, lx: 4, ly: 8, label: "Brazos de sujeción", d: "300ms" },
  { x: 47, y: 72, lx: 4, ly: 58, label: "Bloques maquinados", d: "550ms" },
  { x: 74, y: 63, lx: 62, ly: 92, label: "Mesa elevadora", d: "800ms" },
];

export function Hero() {
  return (
    <section id="inicio" className="grid-paper relative pt-16">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-[max(16px,env(safe-area-inset-left))] pb-16 pt-12 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pb-24 lg:pt-20">
        <div className="lg:col-span-7">
          <p className="text-[17px] font-medium text-caba-600">Taller industrial en {site.city}</p>
          <h1 className="mt-4 text-[52px] text-ink sm:text-[72px] lg:text-[88px]">
            Piezas,{" "}
            <InlineMedia src="/portfolio/maquinado-clamps.webp" alt="Brazos de sujeción con placas maquinadas" />{" "}
            estructuras{" "}
            <InlineMedia src="/portfolio/cortina-estructura.webp" alt="Estructura de mesa con malla" width="1.4em" />{" "}
            y ensambles{" "}
            <InlineMedia src="/portfolio/carrito-vista-superior.webp" alt="Carrito con fixtures ensamblados, vista superior" width="1.5em" />{" "}
            para la industria automotriz.
          </h1>
          <p className="mt-6 max-w-[540px] text-[19px] leading-[1.5] text-ink-2">
            Fabricamos a la medida de tu planta, con respuesta rápida y costos flexibles. Pasa el cursor o toca las fotos para verlas.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              Cotizar por WhatsApp
            </a>
            <a href="#proyectos" className="link-line text-[17px]">Ver proyectos</a>
          </div>
        </div>

        {/* Lámina: foto con cotas */}
        <figure className="relative lg:col-span-5">
          <div className="chamfer chamfer-lg relative aspect-[4/5] bg-paper-2">
            <Image
              src="/portfolio/carrito-frente.webp"
              alt="Carrito de soporte con fixtures de soldadura fabricado por CABA"
              fill
              priority
              unoptimized
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <svg className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              {cotas.map((c) => (
                <g key={c.label} style={{ ["--d" as string]: c.d }}>
                  <path
                    className="cota-line"
                    d={`M${c.x} ${c.y} L${c.lx + 2} ${c.ly}`}
                    stroke="var(--color-cota)"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                    fill="none"
                  />
                </g>
              ))}
            </svg>
            {cotas.map((c) => (
              <span key={c.label} aria-hidden>
                <span
                  className="cota-label absolute hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cota bg-ink sm:block"
                  style={{ left: `${c.x}%`, top: `${c.y}%`, ["--d" as string]: c.d }}
                />
                <span
                  className="cota-label absolute hidden -translate-y-1/2 bg-ink px-2.5 py-1 text-[13px] font-semibold text-white sm:block"
                  style={{ left: `${c.lx}%`, top: `${c.ly}%`, ["--d" as string]: c.d }}
                >
                  {c.label}
                </span>
              </span>
            ))}
          </div>
          <figcaption className="mt-3 flex items-baseline justify-between gap-4 border-t border-rule pt-3 text-[14px] text-ink-2">
            <span>Carrito de soporte industrial</span>
            <span>Topre Autoparts</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
