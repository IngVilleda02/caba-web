import { mapsUrl, site, whatsappHref } from "@/content/site";
import { services } from "@/content/services";
import { WhatsAppIcon, Chevron } from "@/components/Icons";

/**
 * Contacto. El formulario arma el mensaje y abre WhatsApp (lógica en /public/site.js);
 * no promete un envío por correo porque el cliente aún no tiene uno.
 */
export function Contact() {
  const field =
    "w-full rounded-[12px] border border-line bg-canvas px-4 py-3.5 text-[17px] text-ink placeholder:text-ink-3 focus:border-caba-500 focus:outline-none focus:ring-4 focus:ring-caba-500/15";
  const label = "mb-1.5 block text-[14px] font-semibold text-ink";
  return (
    <section id="contacto" className="bg-mist py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-[max(16px,env(safe-area-inset-left))]">
        <div className="text-center" data-reveal>
          <h2 className="text-[40px] font-semibold leading-[1.1] text-ink md:text-[56px]">Hablemos de tu proyecto.</h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[19px] text-ink-2 md:text-[21px]">
            Envíanos tu plano o una foto de lo que necesitas y te cotizamos.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1.15fr]">
          <div className="flex flex-col gap-5">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-[var(--radius-tile)] bg-caba-500 p-8 text-white transition-[background-color,transform] duration-200 hover:bg-caba-600 active:scale-[0.99]"
            >
              <span>
                <WhatsAppIcon className="h-8 w-8" />
                <span className="mt-4 block text-[24px] font-semibold leading-[1.15]">Escríbenos por WhatsApp</span>
                <span className="mt-1 block text-[17px] text-white/80">{site.phoneDisplay}</span>
              </span>
              <Chevron className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-[var(--radius-tile)] bg-canvas p-7">
                <p className="text-[14px] font-semibold text-ink-2">Teléfono</p>
                <a href={`tel:${site.phone}`} className="mt-1 block text-[21px] font-semibold text-ink hover:text-caba-600">
                  {site.phoneDisplay}
                </a>
              </div>
              <div className="rounded-[var(--radius-tile)] bg-canvas p-7">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[14px] font-semibold text-ink-2">Horario</p>
                  <span
                    data-open-status
                    data-open={site.hours.open}
                    data-close={site.hours.close}
                    hidden
                    className="rounded-full px-2.5 py-0.5 text-[12px] font-semibold [&.is-closed]:bg-mist [&.is-closed]:text-ink-2 [&.is-open]:bg-caba-50 [&.is-open]:text-caba-600"
                  />
                </div>
                <p className="mt-1 text-[21px] font-semibold text-ink">{site.hours.label}</p>
                <p className="text-[17px] tabular-nums text-ink-2">{site.hours.range}</p>
              </div>
            </div>

            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="group rounded-[var(--radius-tile)] bg-canvas p-7">
              <p className="text-[14px] font-semibold text-ink-2">Dirección</p>
              <p className="mt-1 text-[21px] font-semibold leading-[1.25] text-ink">
                {site.address.street}, {site.address.neighborhood}
              </p>
              <p className="text-[17px] text-ink-2">
                {site.address.postalCode} {site.address.city}, {site.address.region}
              </p>
              <span className="link-more mt-3 inline-flex items-center gap-1 text-[15px]">
                Ver en Google Maps <Chevron />
              </span>
            </a>
          </div>

          <form data-wa-form={site.whatsapp} noValidate className="rounded-[var(--radius-tile)] bg-canvas p-7 sm:p-10" aria-label="Solicitar cotización">
            <h3 className="text-[24px] font-semibold text-ink">Solicita una cotización</h3>
            <p className="mt-1 text-[15px] text-ink-2">Al enviar se abre WhatsApp con tu mensaje listo.</p>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="nombre" className={label}>Nombre</label>
                <input id="nombre" name="nombre" autoComplete="name" className={field} />
              </div>
              <div>
                <label htmlFor="empresa" className={label}>Empresa <span className="font-normal text-ink-3">(opcional)</span></label>
                <input id="empresa" name="empresa" autoComplete="organization" className={field} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="servicio" className={label}>Servicio</label>
                <select id="servicio" name="servicio" defaultValue="" className={`${field} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 12 12%22><path d=%22M2 4l4 4 4-4%22 fill=%22none%22 stroke=%22%236e6e73%22 stroke-width=%221.6%22/></svg>')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10`}>
                  <option value="">Selecciona una opción</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="mensaje" className={label}>¿Qué necesitas?</label>
                <textarea id="mensaje" name="mensaje" rows={5} placeholder="Pieza, cantidad, material y fecha requerida." className={`${field} resize-y`} />
              </div>
            </div>
            <p data-wa-error role="alert" className="mt-4 min-h-5 text-[14px] text-[#d70015]" />
            <button type="submit" className="btn btn-primary mt-2 w-full sm:w-auto">
              <WhatsAppIcon className="h-[18px] w-[18px]" /> Enviar por WhatsApp
            </button>
            <p data-wa-ok hidden className="mt-4 text-[14px] text-ink-2">
              Se abrió WhatsApp con tu mensaje. Si no se abrió, <a href="#" target="_blank" rel="noopener noreferrer" className="text-caba-600 underline">toca aquí</a>.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
