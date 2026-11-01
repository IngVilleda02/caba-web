import Link from "next/link";
import Image from "next/image";
import { navigation, whatsappHref } from "@/content/site";

/**
 * Barra superior translúcida oscura con desenfoque (ref. Apple), 52 px.
 * El comportamiento (menú móvil, estado al hacer scroll) está en /public/site.js.
 */
export function Header({ linkBase = "" }: { linkBase?: string }) {
  return (
    <header
      data-nav
      className="fixed inset-x-0 top-0 z-50 bg-black/80 text-white backdrop-blur-xl backdrop-saturate-150 transition-[background-color] duration-300 [&.is-scrolled]:bg-black/90"
    >
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-black">
        Saltar al contenido
      </a>
      <div className="mx-auto flex h-[52px] max-w-[1100px] items-center justify-between gap-6 px-[max(16px,env(safe-area-inset-left))]">
        <Link href="/" aria-label="CABA — inicio" className="shrink-0">
          <Image src="/brand/logo-horizontal-dark.svg" alt="CABA Servicios y Maquinados Industriales" width={235} height={40} priority unoptimized className="h-9 w-auto sm:h-10" />
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {navigation.map((n) => (
            <a key={n.href} href={`${linkBase}${n.href}`} className="text-[13px] text-white/80 transition-colors hover:text-white">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn btn-primary min-h-8 px-4 text-[13px]">
            Cotizar
          </a>
          <button
            type="button"
            data-menu-toggle
            aria-controls="menu-movil"
            aria-expanded="false"
            aria-label="Abrir menú"
            className="flex h-10 w-10 items-center justify-center rounded-full text-white/90 hover:bg-white/10 md:hidden"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <path d="M3 7h14M3 13h14" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
      <div id="menu-movil" hidden className="h-[calc(100dvh-52px)] bg-black px-6 pt-6 md:hidden">
        <nav aria-label="Móvil" className="flex flex-col">
          {navigation.map((n) => (
            <a key={n.href} href={`${linkBase}${n.href}`} className="border-b border-white/10 py-4 text-[28px] font-semibold tracking-[-0.02em] text-white">
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
