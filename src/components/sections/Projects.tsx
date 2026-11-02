import Image from "next/image";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { Chevron } from "@/components/Icons";

/**
 * Portafolio sobre azul plano con retícula. Filtros por servicio y galería ampliable
 * (lógica en /public/site.js).
 */
export function Projects() {
  const label = (id: string) => services.find((s) => s.id === id)?.title ?? id;
  return (
    <section id="proyectos" className="on-dark grid-blueprint bg-blueprint py-20 text-white md:py-28">
      <div className="mx-auto max-w-[1200px] px-[max(16px,env(safe-area-inset-left))]">
        <div className="grid gap-6 border-b border-white/25 pb-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <h2 className="text-[48px] md:text-[64px]">Proyectos en planta</h2>
            <p className="mt-4 max-w-[520px] text-[18px] text-white/70">Trabajos fabricados e instalados para la industria automotriz.</p>
          </div>
          <div role="group" aria-label="Filtrar proyectos por servicio" className="flex flex-wrap gap-2 md:col-span-5 md:justify-end">
            {[{ id: "todos", title: "Todos" }, ...services].map((f, i) => (
              <button
                key={f.id}
                type="button"
                data-filter={f.id}
                aria-pressed={i === 0}
                className="chamfer chamfer-sm border border-white/30 px-4 py-2 text-[15px] font-medium text-white/80 transition-colors hover:text-white aria-pressed:border-cota aria-pressed:bg-cota aria-pressed:text-ink"
              >
                {f.title}
              </button>
            ))}
          </div>
        </div>

        <div data-project-grid className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {projects.map((p) => (
            <article key={p.slug} data-project data-title={p.title} data-services={p.services.join(" ")} className="flex flex-col">
              <button
                type="button"
                data-gallery-open
                data-index="0"
                className="chamfer group relative block aspect-[4/5] w-full overflow-hidden bg-blueprint-2 text-left"
                aria-label={`Ver galería de ${p.title} (${p.images.length} fotos)`}
              >
                <Image
                  src={p.images[0].src}
                  alt={p.images[0].alt}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute bottom-0 right-0 bg-ink px-3 py-1.5 text-[13px] font-semibold text-white transition-colors duration-150 group-hover:bg-cota group-hover:text-ink group-focus-visible:bg-cota group-focus-visible:text-ink">{p.images.length} fotos</span>
              </button>

              <div className="mt-3 flex gap-2">
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
                    className="relative h-14 w-14 overflow-hidden outline outline-1 outline-white/20 transition hover:outline-cota"
                  >
                    <Image src={img.src} alt="" fill unoptimized sizes="56px" className="object-cover" />
                  </button>
                ))}
              </div>

              <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-caba-300">
                {p.sample ? (
                  <span className="bg-cota px-2 py-0.5 text-[13px] font-semibold text-ink">Proyecto de muestra</span>
                ) : (
                  <span>{p.client}</span>
                )}
                <span>{p.industry}</span>
              </p>
              <h3 className="mt-1 text-[34px]">{p.title}</h3>
              <p className="mt-2 text-[16px] text-white/70">{p.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Servicios del proyecto">
                {p.services.map((s) => (
                  <li key={s} className="border border-white/25 px-2.5 py-0.5 text-[13px] text-white/80">{label(s)}</li>
                ))}
              </ul>
              <button type="button" data-gallery-open data-index="0" className="link-line mt-5 self-start text-[16px]">
                Ver galería
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* Galería ampliada */}
      <div data-lightbox hidden role="dialog" aria-modal="true" aria-label="Galería de proyecto" className="lightbox fixed inset-0 z-[60] flex flex-col bg-ink/95 px-4 pb-6 pt-4">
        <div className="flex items-center justify-between text-white/70">
          <span data-lightbox-count className="text-[14px] tabular-nums" />
          <button data-lightbox-close type="button" aria-label="Cerrar galería" className="flex h-11 w-11 items-center justify-center bg-white/10 text-white hover:bg-white/20">
            <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M2 2l10 10M12 2 2 12" /></svg>
          </button>
        </div>
        <div className="relative flex min-h-0 flex-1 items-center justify-center py-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="lb-img chamfer max-h-full max-w-full object-contain" />
          <button data-lightbox-prev type="button" aria-label="Foto anterior" className="absolute left-0 flex h-11 w-11 items-center justify-center bg-white/10 text-white hover:bg-white/20 sm:left-4">
            <Chevron dir="left" className="h-4 w-4" />
          </button>
          <button data-lightbox-next type="button" aria-label="Foto siguiente" className="absolute right-0 flex h-11 w-11 items-center justify-center bg-white/10 text-white hover:bg-white/20 sm:right-4">
            <Chevron className="h-4 w-4" />
          </button>
        </div>
        <p data-lightbox-caption className="mx-auto max-w-[720px] text-center text-[15px] text-white/70" />
      </div>
    </section>
  );
}
