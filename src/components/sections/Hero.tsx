import Image from "next/image";
import { site, whatsappHref } from "@/content/site";
import { WhatsAppIcon } from "@/components/Icons";

/** Módulo de héroe (ref. Apple): titular centrado, dos píldoras y la foto como protagonista. */
export function Hero() {
  return (
    <section id="inicio" className="bg-mist pt-[52px]">
      <div className="mx-auto max-w-[1100px] px-[max(16px,env(safe-area-inset-left))] pb-12 pt-14 text-center md:pt-20">
        <p className="text-[17px] font-semibold tracking-[-0.01em] text-caba-500 sm:text-[19px]">
          Servicios y Maquinados Industriales
        </p>
        <h1 className="mx-auto mt-3 max-w-[900px] text-[40px] font-semibold leading-[1.07] tracking-[-0.035em] text-ink sm:text-[56px] lg:text-[72px]">
          Maquinados, estructuras y ensambles para la industria automotriz.
        </h1>
        <p className="mx-auto mt-5 max-w-[640px] text-[19px] leading-[1.42] text-ink-2 sm:text-[21px]">
          Fabricamos a la medida de tu planta en {site.city}, con respuesta rápida y costos flexibles.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            Cotizar por WhatsApp
          </a>
          <a href="#proyectos" className="btn btn-outline">Ver proyectos</a>
        </div>
      </div>
      <div className="mx-auto max-w-[1180px] px-[max(16px,env(safe-area-inset-left))]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-[var(--radius-tile)] bg-mist-2 sm:aspect-[16/9]">
          <Image
            src="/portfolio/carrito-vista-superior.webp"
            alt="Carrito de soporte con fixtures de soldadura fabricado por CABA"
            fill
            priority
            unoptimized
            sizes="(min-width: 1180px) 1180px, 100vw"
            className="object-cover object-[50%_55%]"
          />
        </div>
      </div>
    </section>
  );
}
