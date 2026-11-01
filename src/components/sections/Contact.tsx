import { mapsUrl, site, whatsappHref } from "@/content/site";
import { services } from "@/content/services";
import { WhatsAppIcon } from "@/components/Icons";

/**
 * Contacto. El formulario arma el mensaje y abre WhatsApp (lógica en /public/site.js);
 * no promete envío por correo porque el cliente aún no tiene uno.
 */
export function Contact() {
  const label = "mb-1 block text-[15px] font-semibold text-ink";
  const row = "grid grid-cols-[110px_1fr] gap-4 border-b border-rule py-5";
  return (
    <section id="contacto" className="grid-paper bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-[max(16px,env(safe-area-inset-left))]">
        <div className="grid gap-6 border-b border-ink pb-8 md:grid-cols-12 md:items-end">
          <h2 className="text-[48px] text-ink md:col-span-7 md:text-[64px]">Hablemos de tu proyecto</h2>
          <p className="max-w-[460px] text-[18px] text-ink-2 md:col-span-5 md:justify-self-end">Envíanos tu plano o una foto de lo que necesitas y te cotizamos.</p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="chamfer group flex items-center gap-5 bg-caba-500 p-7 text-white transition-colors hover:bg-caba-600"
            >
              <WhatsAppIcon className="h-10 w-10 shrink-0" />
              <span>
                <span className="block font-display text-[30px] font-semibold leading-none">Escríbenos por WhatsApp</span>
                <span className="mt-1.5 block text-[17px] text-white/85">{site.phoneDisplay}</span>
              </span>
            </a>

            <dl className="mt-6 border-t border-ink">
              <div className={row}>
                <dt className="text-[15px] font-medium text-ink-2">Teléfono</dt>
                <dd><a href={`tel:${site.phone}`} className="text-[18px] font-semibold text-ink hover:text-caba-600">{site.phoneDisplay}</a></dd>
              </div>
              <div className={row}>
                <dt className="text-[15px] font-medium text-ink-2">Horario</dt>
                <dd className="text-[18px] text-ink">
                  <span className="font-semibold">{site.hours.label}</span>, <span className="tabular-nums">{site.hours.range}</span>
                  <span
                    data-open-status
                    data-open={site.hours.open}
                    data-close={site.hours.close}
                    hidden
                    className="ml-2 inline-block px-2 py-0.5 align-middle text-[13px] font-semibold [&.is-closed]:bg-paper-2 [&.is-closed]:text-ink-2 [&.is-open]:bg-cota [&.is-open]:text-ink"
                  />
                </dd>
              </div>
              <div className={row}>
                <dt className="text-[15px] font-medium text-ink-2">Dirección</dt>
                <dd className="text-[18px] text-ink">
                  {site.address.street}, {site.address.neighborhood}, {site.address.postalCode} {site.address.city}, {site.address.region}
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="link-line mt-2 block w-fit text-[16px]">Ver en Google Maps</a>
                </dd>
              </div>
            </dl>
          </div>

          <form data-wa-form={site.whatsapp} noValidate className="border border-ink bg-sheet p-7 sm:p-10 lg:col-span-7" aria-label="Solicitar cotización">
            <h3 className="text-[32px] text-ink">Solicita una cotización</h3>
            <p className="mt-1 text-[16px] text-ink-2">Al enviar se abre WhatsApp con tu mensaje listo.</p>
            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="nombre" className={label}>Nombre</label>
                <input id="nombre" name="nombre" autoComplete="name" className="field" />
              </div>
              <div>
                <label htmlFor="empresa" className={label}>Empresa <span className="font-normal text-ink-3">(opcional)</span></label>
                <input id="empresa" name="empresa" autoComplete="organization" className="field" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="servicio" className={label}>Servicio</label>
                <select id="servicio" name="servicio" defaultValue="" className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 12 12%22><path d=%22M2 4l4 4 4-4%22 fill=%22none%22 stroke=%22%234a5360%22 stroke-width=%221.8%22/></svg>')] bg-[length:12px] bg-[right_14px_center] bg-no-repeat pr-10">
                  <option value="">Selecciona una opción</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="mensaje" className={label}>¿Qué necesitas?</label>
                <textarea id="mensaje" name="mensaje" rows={5} placeholder="Pieza, cantidad, material y fecha requerida." className="field resize-y" />
              </div>
            </div>
            <p data-wa-error role="alert" className="mt-4 min-h-5 text-[15px] font-medium text-[#c4161c]" />
            <button type="submit" className="btn btn-primary mt-2 w-full sm:w-auto">
              <WhatsAppIcon className="h-[18px] w-[18px]" /> Enviar por WhatsApp
            </button>
            <p data-wa-ok hidden className="mt-4 text-[15px] text-ink-2">
              Se abrió WhatsApp con tu mensaje. Si no se abrió, <a href="#" target="_blank" rel="noopener noreferrer" className="link-line">toca aquí</a>.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
