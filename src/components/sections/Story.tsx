import Image from "next/image";
import { clients } from "@/content/projects";
import { LineIcon } from "@/components/Icons";

/** Escena de planta a todo lo ancho, con velo azul plano. */
export function PlantScene() {
  return (
    <section aria-label="En planta" className="relative isolate overflow-hidden bg-blueprint text-white">
      <Image src="/portfolio/linea-soldadura.webp" alt="Línea de soldadura en una planta automotriz" fill unoptimized sizes="100vw" className="-z-10 object-cover object-[50%_40%] opacity-55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blueprint via-blueprint/75 to-blueprint/10" aria-hidden />
      <div className="mx-auto flex min-h-[520px] max-w-[1200px] flex-col justify-center px-[max(16px,env(safe-area-inset-left))] py-16 md:min-h-[600px]">
        <h2 className="max-w-[620px] text-[48px] md:text-[72px]">Hecho para el ritmo de una línea automotriz.</h2>
        <p className="mt-5 max-w-[520px] text-[18px] text-white/80">
          Atendemos a empresas automotrices y de manufactura en San Juan del Río y la región, con piezas y equipos que llegan listos para trabajar.
        </p>
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
        <div className="mt-6 grid border border-ink bg-sheet md:grid-cols-2">
          <div className="p-7 md:p-8">
            <p className="text-[15px] font-medium text-ink-2">Taller</p>
            <p className="mt-1 font-display text-[32px] font-semibold leading-tight text-ink">Torno y CNC</p>
            <p className="mt-1 text-[16px] text-ink-2">Trabajamos con el material que tu proyecto requiere.</p>
          </div>
          <div className="border-t border-ink p-7 md:border-l md:border-t-0 md:p-8">
            <p className="text-[15px] font-medium text-ink-2">Confían en nosotros</p>
            <ul className="mt-1 flex flex-wrap gap-x-8">
              {clients.map((c) => (
                <li key={c} className="font-display text-[32px] font-semibold leading-tight text-ink">{c}</li>
              ))}
            </ul>
            <p className="mt-1 text-[16px] text-ink-2">Industria automotriz</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Proceso real en 4 pasos, unido por una línea de cota. */
export function Process() {
  const steps = [
    { t: "Cuéntanos qué necesitas", d: "Envíanos plano, muestra o fotos por WhatsApp." },
    { t: "Recibe tu cotización", d: "Te respondemos rápido con costo y tiempo de entrega." },
    { t: "Fabricamos", d: "Maquinado, estructura o ensamble con el material acordado." },
    { t: "Entregamos", d: "Listo para trabajar en tu planta." },
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
