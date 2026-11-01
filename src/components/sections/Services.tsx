import Image from "next/image";
import { services } from "@/content/services";
import { whatsappHref } from "@/content/site";
import { Chevron, LineIcon } from "@/components/Icons";

/** Mosaico de servicios (ref. Apple): un mosaico grande + dos medianos, foto protagonista. */
export function Services() {
  const [first, ...rest] = services;
  return (
    <section id="servicios" className="bg-canvas py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-[max(16px,env(safe-area-inset-left))]">
        <div className="mb-12 text-center md:mb-16" data-reveal>
          <h2 className="text-[40px] font-semibold leading-[1.1] text-ink md:text-[56px]">Servicios.</h2>
          <p className="mx-auto mt-4 max-w-[620px] text-[19px] text-ink-2 md:text-[21px]">
            Tres especialidades para resolver lo que tu línea necesita, desde una pieza hasta el equipo completo.
          </p>
        </div>

        <div className="grid gap-5">
          <ServiceTile s={first} large />
          <div className="grid gap-5 md:grid-cols-2">
            {rest.map((s) => (
              <ServiceTile key={s.id} s={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceTile({ s, large = false }: { s: (typeof services)[number]; large?: boolean }) {
  return (
    <article
      data-reveal
      className={`grid overflow-hidden rounded-[var(--radius-tile)] bg-mist ${large ? "md:grid-cols-2" : "grid-rows-[auto_1fr]"}`}
    >
      <div className={`flex flex-col p-8 sm:p-10 ${large ? "justify-center md:p-14" : ""}`}>
        <LineIcon name={s.id} className="h-9 w-9 text-caba-500" />
        <h3 className="mt-5 text-[32px] font-semibold leading-[1.1] text-ink sm:text-[40px]">{s.title}</h3>
        <p className="mt-3 max-w-[440px] text-[17px] text-ink-2 sm:text-[19px]">{s.lead}</p>
        <ul className="mt-6 grid gap-2 text-[15px] text-ink">
          {s.items.map((it) => (
            <li key={it} className="flex items-start gap-2.5">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-caba-500" aria-hidden />
              {it}
            </li>
          ))}
        </ul>
        <a
          href={whatsappHref(`Hola CABA, me interesa cotizar el servicio de ${s.title.toLowerCase()}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="link-more mt-7 inline-flex items-center gap-1"
        >
          Cotizar {s.title.toLowerCase()} <Chevron />
        </a>
      </div>
      <div className={`relative min-h-[300px] ${large ? "md:min-h-[520px]" : "aspect-[4/3]"} overflow-hidden`}>
        <Image src={s.image.src} alt={s.image.alt} fill unoptimized sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </div>
    </article>
  );
}
