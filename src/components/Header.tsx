import Link from "next/link";
import Image from "next/image";
import { navigation } from "@/content/site";

/** Barra superior sobre papel de plano, con regla inferior. Menú móvil en /public/site.js. */
export function Header({ linkBase = "" }: { linkBase?: string }) {
  return (
    <header data-nav className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper/92 backdrop-blur-md">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:bg-ink focus:px-3 focus:py-2 focus:text-white">
        Saltar al contenido
      </a>
      <div className="mx-auto flex h-16 max-w-[1200px] lg:h-20 items-center justify-between gap-6 px-[max(16px,env(safe-area-inset-left))]">
        <Link href="/" aria-label="CABA, inicio" className="shrink-0">
          <Image src="/brand/logo-horizontal.svg" alt="CABA Servicios y Maquinados Industriales" width={308} height={56} priority unoptimized className="h-10 w-auto lg:h-14" />
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-6 whitespace-nowrap md:flex lg:gap-8">
          {navigation.map((n) => (
            <a key={n.href} href={`${linkBase}${n.href}`} className="text-[15px] font-medium text-ink-2 transition-colors hover:text-ink">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={`${linkBase}#visita`} className="btn btn-primary min-h-10 whitespace-nowrap px-4 text-[15px] sm:px-5">
            <span className="sm:hidden">Visita</span>
            <span className="hidden sm:inline">Solicitar visita</span>
          </a>
          <button
            type="button"
            data-menu-toggle
            aria-controls="menu-movil"
            aria-expanded="false"
            aria-label="Abrir menú"
            className="flex h-10 w-10 items-center justify-center text-ink md:hidden"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M3 7h14M3 13h14" />
            </svg>
          </button>
        </div>
      </div>
      <div id="menu-movil" hidden className="h-[calc(100dvh-64px)] border-t border-rule bg-paper px-6 pt-4 md:hidden">
        <nav aria-label="Móvil" className="flex flex-col">
          {navigation.map((n) => (
            <a key={n.href} href={`${linkBase}${n.href}`} className="border-b border-rule py-4 font-display text-[32px] font-semibold text-ink">
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
