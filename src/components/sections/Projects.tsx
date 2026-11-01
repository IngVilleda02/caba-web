import Image from "next/image";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { Chevron } from "@/components/Icons";

/**
 * Portafolio en vitrina oscura (ref. Apple). Filtros por servicio y galería ampliable.
 * La interacción (filtros y galería) está en /public/site.js.
 */
export function Projects() {
  const label = (id: string) => services.find((s) => s.id === id)?.title ?? id;
  return (
    <section id="proyectos" className="on-dark bg-night py-20 text-white md:py-28">
      <div className="mx-auto max-w-[1100px] px-[max(16px,env(safe-area-inset-left))]">
        <div className="mb-10 text-center" data-reveal>
          <h2 className="text-[40px] font-semibold leading-[1.1] md:text-[56px]">Proyectos.</h2>
          <p className="mx-auto mt-4 max-w-[620px] text-[19px] text-white/60 md:text-[21px]">
            Trabajos fabricados e instalados en planta para la industria automotriz.
          </p>
        </div>

        <div role="group" aria-label="Filtrar proyectos por servicio" className="mb-10 flex flex-wrap justify-center gap-2">
          {[{ id: "todos", title: "Todos" }, ...services].map((f, i) => (
            <button
              key={f.id}
              type="button"
              data-filter={f.id}
              aria-pressed={i === 0}
              className="rounded-full border border-white/15 px-4 py-2 text-[14px] text-white/75 transition-colors hover:text-white aria-pressed:border-white aria-pressed:bg-white aria-pressed:text-black"
            >
              {f.title}
            </button>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.slug}
              data-project
              data-title={p.title}
              data-services={p.services.join(" ")}
              data-reveal
              className="flex flex-col overflow-hidden rounded-[var(--radius-tile)] bg-night-2"
            >
              <button
                type="button"
                data-gallery-open
                data-index="0"
                className="group relative aspect-[4/5] overflow-hidden text-left"
                aria-label={`Ver galería de ${p.title} (${p.images.length} fotos)`}
              >
                <Image
                  src={p.images[0].src}
                  alt={p.images[0].alt}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
                />
                <span className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1.5 text-[12px] text-white backdrop-blur-md">
                  {p.images.length} fotos
                </span>
              </button>

              {/* Miniaturas: abren la galería en esa foto */}
              <div className="flex gap-2 px-5 pt-4">
                {p.images.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    data-gallery-open
                    data-index={i}
                    data-gallery-item
                    data-src={img.src}
                    data-alt={img.alt}
                    aria-label={`Abrir foto ${i + 1}: ${img.alt}`}
                    className="relative h-12 w-12 overflow-hidden rounded-[10px] ring-1 ring-white/10 transition hover:ring-white/40"
                  >
                    <Image src={img.src} alt="" fill unoptimized sizes="48px" className="object-cover" />
                  </button>
                ))}
              </div>

              <div className="flex flex-1 flex-col p-6 pt-5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-caba-300">
                  {p.industry} · {p.client}
                </p>
                <h3 className="mt-2 text-[24px] font-semibold leading-[1.15]">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.5] text-white/65">{p.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Servicios del proyecto">
                  {p.services.map((s) => (
                    <li key={s} className="rounded-full bg-white/[0.08] px-3 py-1 text-[12px] text-white/80">
                      {label(s)}
                    </li>
                  ))}
                </ul>
                <button type="button" data-gallery-open data-index="0" className="link-more mt-auto inline-flex items-center gap-1 self-start pt-6 text-[15px]">
                  Ver galería <Chevron />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Galería ampliada */}
      <div
        data-lightbox
        hidden
        role="dialog"
        aria-modal="true"
        aria-label="Galería de proyecto"
        className="lightbox fixed inset-0 z-[60] flex flex-col bg-black/95 px-4 pb-6 pt-4 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between text-white/70">
          <span data-lightbox-count className="text-[13px] tabular-nums" />
          <button data-lightbox-close type="button" aria-label="Cerrar galería" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M2 2l10 10M12 2 2 12" /></svg>
          </button>
        </div>
        <div className="relative flex min-h-0 flex-1 items-center justify-center py-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="max-h-full max-w-full rounded-[var(--radius-media)] object-contain" />
          <button data-lightbox-prev type="button" aria-label="Foto anterior" className="absolute left-0 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-4">
            <Chevron dir="left" className="h-4 w-4" />
          </button>
          <button data-lightbox-next type="button" aria-label="Foto siguiente" className="absolute right-0 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-4">
            <Chevron className="h-4 w-4" />
          </button>
        </div>
        <p data-lightbox-caption className="mx-auto max-w-[720px] text-center text-[14px] text-white/70" />
      </div>
    </section>
  );
}
