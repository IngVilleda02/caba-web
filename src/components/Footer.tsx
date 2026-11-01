import Link from "next/link";
import Image from "next/image";
import { mapsUrl, navigation, site, whatsappHref } from "@/content/site";
import { services } from "@/content/services";

export function Footer({ linkBase = "" }: { linkBase?: string }) {
  const year = new Date().getFullYear();
  const h = "mb-3 text-[12px] font-semibold text-ink";
  const a = "text-[12px] text-ink-2 hover:text-ink hover:underline underline-offset-2";
  return (
    <footer className="bg-mist text-ink-2">
      <div className="mx-auto max-w-[1100px] px-[max(16px,env(safe-area-inset-left))] py-12">
        <div className="grid gap-10 border-b border-line pb-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Image src="/brand/logo-full.svg" alt="CABA Servicios y Maquinados Industriales" width={200} height={113} unoptimized className="h-auto w-[180px]" />
          </div>
          <div>
            <p className={h}>Servicios</p>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.id}><a className={a} href={`${linkBase}#servicios`}>{s.title}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className={h}>Empresa</p>
            <ul className="space-y-2">
              {navigation.map((n) => (
                <li key={n.href}><a className={a} href={`${linkBase}${n.href}`}>{n.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className={h}>Contacto</p>
            <ul className="space-y-2 text-[12px]">
              <li><a className={a} href={whatsappHref()} target="_blank" rel="noopener noreferrer">WhatsApp {site.phoneDisplay}</a></li>
              <li><a className={a} href={`tel:${site.phone}`}>Llamar {site.phoneDisplay}</a></li>
              <li><a className={a} href={mapsUrl} target="_blank" rel="noopener noreferrer">{site.address.street}, {site.address.neighborhood}, {site.address.postalCode} {site.address.city}</a></li>
              <li>{site.hours.label}, {site.hours.range}</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-[12px] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. Todos los derechos reservados.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/aviso-de-privacidad" className={a}>Aviso de privacidad</Link>
            <a href={site.credit.url} target="_blank" rel="noopener noreferrer" className={a}>
              Sitio desarrollado por {site.credit.name}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
