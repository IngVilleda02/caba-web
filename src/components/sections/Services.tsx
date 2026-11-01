import Image from "next/image";
import { services } from "@/content/services";
import { whatsappHref } from "@/content/site";
import { LineIcon } from "@/components/Icons";

/** Servicios como hojas de especificación: foto en chaflán, título, alcance y enlace a cotizar. */
export function Services() {
  return (
    <section id="servicios" className="bg-sheet py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-[max(16px,env(safe-area-inset-left))]">
        <div className="grid gap-6 border-b border-ink pb-8 md:grid-cols-12 md:items-end">
          <h2 className="text-[48px] text-ink md:col-span-6 md:text-[64px]">Lo que fabricamos</h2>
          <p className="max-w-[520px] text-[18px] text-ink-2 md:col-span-6 md:justify-self-end">
            Desde una pieza suelta hasta el equipo completo, listo para tu línea.
          </p>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
          {services.map((s) => (
            <article key={s.id} className="flex flex-col">
              <div className="chamfer relative aspect-[4/3] bg-paper-2">
                <Image src={s.image.src} alt={s.image.alt} fill unoptimized sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="mt-6 flex items-center gap-3">
                <LineIcon name={s.id} className="h-8 w-8 text-caba-500" />
                <h3 className="text-[36px] text-ink">{s.title}</h3>
              </div>
              <p className="mt-3 text-[17px] text-ink-2">{s.lead}</p>
              <ul className="mt-5 border-t border-rule">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-3 border-b border-rule py-2.5 text-[16px] text-ink">
                    <span className="h-2 w-2 shrink-0 bg-caba-500" aria-hidden />
                    {it}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappHref(`Hola CABA, me interesa cotizar el servicio de ${s.title.toLowerCase()}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line mt-6 self-start text-[16px]"
              >
                Cotizar {s.title.toLowerCase()}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
