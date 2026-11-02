import Image from "next/image";
import { clients } from "@/content/projects";
import { LineIcon } from "@/components/Icons";

/**
 * Escena de planta: texto sobre azul plano y la foto al lado, sin estirarla.
 * Para cambiarla, reemplaza `photo` (horizontal, ≥1500 px de ancho).
 */
const photo = { src: "/portfolio/cnc-mesa.webp", width: 1536, height: 1024, alt: "Centro de maquinado CNC trabajando una pieza sujeta en chuck" };

export function PlantScene() {
  return (
    <section aria-label="En planta" className="grid-blueprint bg-blueprint text-white">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-[max(16px,env(safe-area-inset-left))] py-16 md:grid-cols-12 md:items-center md:gap-12 md:py-24">
        <div className="md:col-span-5">
          <h2 className="max-w-[620px] text-[48px] md:text-[56px] lg:text-[72px]">Hecho para el ritmo de una línea automotriz.</h2>
          <p className="mt-5 max-w-[520px] text-[18px] text-white/80">
            Atendemos a empresas automotrices y de manufactura en San Juan del Río y la región, con piezas y equipos que llegan listos para trabajar.
          </p>
        </div>
        <div className="chamfer chamfer-lg relative aspect-[3/2] w-full md:col-span-7">
          <Image src={photo.src} alt={photo.alt} fill unoptimized sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

/** Diferenciadores de la ficha del cliente, en columnas separadas por reglas. */
export function Why() {
  const items = [
    { icon: "quality", title: "Servicio de calidad", text: "Cuidamos cada pieza y cada equipo que entregamos." },
    { icon: "speed", title: "Rápido y flexible en costos", text: "Nos adaptamos a tu presupuesto y a los tiempos de tu producción." },
    { icon: "support", title: "Respuesta rápida", text: "Soporte directo cuando lo necesitas, sin intermediarios." },
  ];
  return (
    <section id="por-que" className="grid-paper bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-[max(16px,env(safe-area-inset-left))]">
        <h2 className="border-b border-ink pb-8 text-[48px] text-ink md:text-[64px]">Por qué CABA</h2>
        <div className="grid md:grid-cols-3">
          {items.map((it, i) => (
            <div key={it.title} className={`border-b border-rule py-8 md:border-b-0 md:pr-8 ${i ? "md:border-l md:pl-8" : ""}`}>
              <LineIcon name={it.icon} className="h-9 w-9 text-caba-500" />
              <h3 className="mt-5 text-[30px] text-ink">{it.title}</h3>
              <p className="mt-2 text-[17px] text-ink-2">{it.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 border border-ink bg-sheet p-7 md:p-8">
          <p className="text-[15px] font-medium text-ink-2">Empresas que confían en nosotros</p>
          <ul className="mt-2 flex flex-wrap gap-x-10 gap-y-2">
            {clients.map((c) => (
              <li key={c} className="font-display text-[32px] font-semibold leading-tight text-ink">{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Proceso real en 4 pasos, unido por una línea de cota. */
export function Process() {
  const steps = [
    { t: "Solicita una visita", d: "Llena el formulario y te contactamos por WhatsApp para agendar." },
    { t: "Visitamos tu planta", d: "Vemos la necesidad en sitio, tomamos medidas y fotos." },
    { t: "Recibe tu cotización", d: "Con costo y tiempo de entrega según lo que revisamos." },
    { t: "Fabricamos y entregamos", d: "Maquinado, estructura o ensamble listo para trabajar." },
  ];
  return (
    <section aria-labelledby="proceso-t" className="bg-sheet py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-[max(16px,env(safe-area-inset-left))]">
        <h2 id="proceso-t" className="text-[48px] text-ink md:text-[64px]">Así trabajamos</h2>
        <ol className="relative mt-12 grid gap-10 md:grid-cols-4 md:gap-8">
          <span className="absolute left-0 right-0 top-[19px] hidden h-0.5 bg-ink md:block" aria-hidden />
          {steps.map((s, i) => (
            <li key={s.t} className="relative">
              <span className="chamfer chamfer-sm relative z-10 flex h-10 w-10 items-center justify-center bg-caba-500 font-display text-[22px] font-semibold text-white">
                {i + 1}
              </span>
              <h3 className="mt-5 text-[28px] text-ink">{s.t}</h3>
              <p className="mt-1.5 text-[16px] text-ink-2">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
