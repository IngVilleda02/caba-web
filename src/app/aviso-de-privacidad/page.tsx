import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Aviso de privacidad", alternates: { canonical: "/aviso-de-privacidad" } };

/** ⚠️ Borrador: revisar con asesor legal antes de publicar y completar la fecha. */
export default function Privacy() {
  const h2 = "mt-10 text-[30px] text-ink";
  const a = site.address;
  return (
    <>
      <Header linkBase="/" />
      <main id="contenido" className="bg-sheet pb-24 pt-[120px]">
        <div className="mx-auto max-w-[720px] px-[max(16px,env(safe-area-inset-left))] text-[17px] text-ink-2">
          <h1 className="text-[40px] font-semibold text-ink">Aviso de privacidad</h1>
          <p className="mt-2 text-[14px]">Última actualización: [fecha]</p>
          <h2 className={h2}>Responsable</h2>
          <p className="mt-2">
            {site.legalName}, con nombre comercial {site.name}, con domicilio en {a.street}, {a.neighborhood}, C.P. {a.postalCode}, {a.city}, {a.region}, es responsable del tratamiento de tus datos personales.
          </p>
          <h2 className={h2}>Datos que recabamos</h2>
          <p className="mt-2">Nombre, empresa, teléfono y la información de tu proyecto que nos compartas por WhatsApp, teléfono o en persona.</p>
          <h2 className={h2}>Finalidades</h2>
          <p className="mt-2">Atender tu solicitud, elaborar cotizaciones y dar seguimiento a los trabajos contratados.</p>
          <h2 className={h2}>Derechos ARCO</h2>
          <p className="mt-2">
            Puedes solicitar el acceso, rectificación, cancelación u oposición al tratamiento de tus datos comunicándote al {site.phoneDisplay} o en el domicilio indicado.
          </p>
          <h2 className={h2}>Cambios</h2>
          <p className="mt-2">Cualquier modificación a este aviso se publicará en esta página.</p>
          <Link href="/" className="link-line mt-12 inline-block">← Volver al inicio</Link>
        </div>
      </main>
      <Footer linkBase="/" />
    </>
  );
}
