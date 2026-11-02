import Image from "next/image";

/**
 * Héroe «plano de taller»: titular corto y una foto de maquinado CNC.
 * La foto es ilustrativa (libre de derechos); cámbiala por una del taller cuando la haya.
 */
export function Hero() {
  return (
    <section id="inicio" className="grid-paper relative pt-16 lg:pt-20">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-[max(16px,env(safe-area-inset-left))] pb-16 pt-12 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pb-24 lg:pt-20">
        <div className="lg:col-span-6">
          <h1 className="text-[52px] text-ink sm:text-[72px] lg:text-[88px]">
            Maquinados, estructuras y ensambles industriales.
          </h1>
          <p className="mt-6 max-w-[500px] text-pretty text-[19px] leading-[1.5] text-ink-2">
            Visitamos tu planta, revisamos la necesidad y te cotizamos a la medida.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href="#visita" className="btn btn-primary">Solicitar una visita</a>
            <a href="#proyectos" className="link-line text-[17px]">Ver proyectos</a>
          </div>
        </div>

        <figure className="relative lg:col-span-6">
          <div className="chamfer chamfer-lg relative aspect-[5/4] bg-paper-2">
            <Image
              src="/portfolio/cnc-fresado.webp"
              alt="Fresado CNC de una pieza metálica con refrigerante"
              fill
              priority
              unoptimized
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[45%_50%]"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
