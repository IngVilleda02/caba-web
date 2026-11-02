import { site } from "@/content/site";

/** Datos verificables de la ficha del cliente, como el cuadro de datos de un plano. */
export function Facts() {
  const facts = [
    { k: site.yearsLabel, v: "de operación" },
    { k: "A tu medida", v: "con el material que pidas" },
    { k: "Respuesta rápida", v: "en soporte y cotizaciones" },
    { k: "Visita a planta", v: "revisamos en sitio antes de cotizar" },
  ];
  return (
    <section aria-label="Datos de CABA" className="border-y border-ink bg-sheet">
      <dl className="mx-auto grid max-w-[1200px] grid-cols-2 px-[max(16px,env(safe-area-inset-left))] md:grid-cols-4">
        {facts.map((f, i) => (
          <div
            key={f.k}
            className={`py-7 pr-4 ${i % 2 ? "border-l border-rule pl-5" : ""} ${i > 1 ? "border-t border-rule md:border-t-0" : ""} md:border-l md:border-rule md:pl-6 md:first:border-l-0 md:first:pl-0`}
          >
            <dt className="font-display text-[30px] font-semibold leading-none text-ink">{f.k}</dt>
            <dd className="mt-2 text-[15px] text-ink-2">{f.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
