import Image from "next/image";
import { clients } from "@/content/projects";
import { LineIcon } from "@/components/Icons";

/** Escena a todo lo ancho con foto de planta (ref. Apple: imagen de borde a borde con texto encima). */
export function PlantScene() {
  return (
    <section aria-label="En planta" className="on-dark relative isolate overflow-hidden bg-night text-white">
      <Image
        src="/portfolio/linea-soldadura.webp"
        alt="Línea de soldadura en una planta automotriz"
        fill
        unoptimized
        sizes="100vw"
        className="-z-10 object-cover object-[50%_40%] opacity-60"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/40 to-black/10" aria-hidden />
      <div className="mx-auto flex min-h-[560px] max-w-[1100px] flex-col justify-end px-[max(16px,env(safe-area-inset-left))] py-16 md:min-h-[640px] md:py-20">
        <h2 className="max-w-[720px] text-[40px] font-semibold leading-[1.08] md:text-[56px]" data-reveal>
          Hecho para el ritmo de una línea automotriz.
        </h2>
        <p className="mt-4 max-w-[560px] text-[19px] text-white/75 md:text-[21px]" data-reveal>
          Atendemos a empresas automotrices y de manufactura en San Juan del Río y la región, con piezas y equipos que llegan listos para trabajar.
        </p>
      </div>
    </section>
  );
}

/** Por qué CABA: los tres diferenciadores de la ficha del cliente. */
export function Why() {
  const items = [
    { icon: "quality", title: "Servicio de calidad", text: "Cuidamos cada pieza y cada equipo que entregamos." },
    { icon: "speed", title: "Rápido y flexible en costos", text: "Nos adaptamos a tu presupuesto y a los tiempos de tu producción." },
    { icon: "support", title: "Respuesta rápida", text: "Soporte directo cuando lo necesitas, sin intermediarios." },
  ];
  return (
    <section id="por-que" className="bg-mist py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-[max(16px,env(safe-area-inset-left))]">
        <h2 className="text-center text-[40px] font-semibold leading-[1.1] text-ink md:text-[56px]" data-reveal>
          Por qué CABA.
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((it) => (
            <div key={it.title} className="rounded-[var(--radius-tile)] bg-canvas p-8" data-reveal>
              <LineIcon name={it.icon} className="h-9 w-9 text-caba-500" />
              <h3 className="mt-5 text-[24px] font-semibold leading-[1.15] text-ink">{it.title}</h3>
              <p className="mt-2 text-[17px] text-ink-2">{it.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="rounded-[var(--radius-tile)] bg-canvas p-8" data-reveal>
            <p className="text-[14px] font-semibold text-ink-2">Taller</p>
            <p className="mt-2 text-[24px] font-semibold leading-[1.2] text-ink">Torno y CNC.</p>
            <p className="mt-2 text-[17px] text-ink-2">Trabajamos con el material que tu proyecto requiere.</p>
          </div>
          <div className="rounded-[var(--radius-tile)] bg-canvas p-8" data-reveal>
            <p className="text-[14px] font-semibold text-ink-2">Confían en nosotros</p>
            <ul className="mt-2 flex flex-wrap gap-x-8 gap-y-2">
              {clients.map((c) => (
                <li key={c} className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink">{c}</li>
              ))}
            </ul>
            <p className="mt-2 text-[17px] text-ink-2">Industria automotriz.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Cómo trabajamos: proceso en 4 pasos. */
export function Process() {
  const steps = [
    { t: "Cuéntanos qué necesitas", d: "Envíanos plano, muestra o fotos por WhatsApp." },
    { t: "Recibe tu cotización", d: "Te respondemos rápido con costo y tiempo de entrega." },
    { t: "Fabricamos", d: "Maquinado, estructura o ensamble con el material acordado." },
    { t: "Entregamos", d: "Listo para trabajar en tu planta." },
  ];
  return (
    <section aria-labelledby="proceso-t" className="bg-canvas py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-[max(16px,env(safe-area-inset-left))]">
        <h2 id="proceso-t" className="text-center text-[40px] font-semibold leading-[1.1] text-ink md:text-[56px]" data-reveal>
          Así trabajamos.
        </h2>
        <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          {steps.map((s, i) => (
            <li key={s.t} className="relative md:pt-10" data-reveal>
              <span className="absolute left-0 right-0 top-[15px] hidden h-px bg-line md:block" aria-hidden />
              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-caba-500 text-[14px] font-semibold text-white md:absolute md:top-0">
                {i + 1}
              </span>
              <h3 className="mt-4 text-[21px] font-semibold leading-[1.2] text-ink md:mt-6">{s.t}</h3>
              <p className="mt-1.5 text-[15px] text-ink-2">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
