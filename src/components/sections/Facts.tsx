import { site } from "@/content/site";

/** Franja de datos verificables de la ficha del cliente (nada inventado). */
export function Facts() {
  const facts = [
    { k: site.yearsLabel, v: "de operación" },
    { k: "A tu medida", v: "material de acuerdo al cliente" },
    { k: "Respuesta rápida", v: "a soporte y cotizaciones" },
    { k: site.hours.label, v: site.hours.range },
  ];
  return (
    <section aria-label="Datos de CABA" className="border-b border-line bg-canvas">
      <dl className="mx-auto grid max-w-[1100px] grid-cols-2 gap-y-8 px-[max(16px,env(safe-area-inset-left))] py-12 md:grid-cols-4">
        {facts.map((f) => (
          <div key={f.k} className="px-2 text-center md:border-l md:border-line md:first:border-l-0">
            <dt className="text-[21px] font-semibold tracking-[-0.02em] text-ink sm:text-[24px]">{f.k}</dt>
            <dd className="mt-1 text-[14px] text-ink-2">{f.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
