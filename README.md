# CABA Servicios y Maquinados Industriales — Sitio web

Desarrollado por **MIRAI NEXUS**. Next.js 16 · TypeScript · Tailwind CSS v4.
Dirección visual propia «Plano de taller» (ver abajo).

## Abrir en tu computadora

```bash
npm install
npm run dev      # http://localhost:3000
```

Antes de publicar: `npm run check` (tipos + lint + build).

## Qué editar

| Quiero cambiar… | Archivo |
|---|---|
| Teléfono, WhatsApp, dirección, horario, textos globales | `src/content/site.ts` |
| Servicios (texto, puntos, foto) | `src/content/services.ts` |
| Proyectos del portafolio y clientes | `src/content/projects.ts` + fotos en `public/portfolio/` |
| Colores y tipografía | `src/app/globals.css` (bloque `@theme`) |
| Logotipo | `public/brand/*.svg` (se regenera con `python3 scripts/build-logo.py`) |
| Interacción (menú, filtros, galería, formulario) | `public/site.js` |
| Aviso de privacidad | `src/app/aviso-de-privacidad/page.tsx` |

### Agregar un proyecto
Para un proyecto ilustrativo con fotos libres de derechos agrega `sample: true`: se muestra con la etiqueta «Proyecto de muestra» y sin cliente.
1. Guarda las fotos en `public/portfolio/` como `.webp` (~1600 px de ancho).
2. En `src/content/projects.ts` copia un bloque, cambia título, cliente, resumen, servicios y fotos (con su ancho y alto).

## Solicitud de visita
CABA cotiza después de visitar la planta. El formulario (`Contact.tsx`, ancla `#visita`) pide nombre, empresa,
teléfono, ubicación de la planta, servicio, fecha y horario preferidos y la necesidad. Al enviar, `public/site.js`
arma una plantilla con esos datos y abre WhatsApp con el número del asesor: no necesita servidor ni correo.
Los enlaces "Solicitar visita para…" de cada servicio preseleccionan el servicio en el formulario.

**Panel de cotizaciones (MIRAI Panel):** con la variable `NEXT_PUBLIC_PANEL_URL` (ej. `https://panel.mirainexus.com`):
- `https://<sitio-de-caba>/admin` lleva al acceso del panel con el estilo de CABA (`/acceso/caba`). No hay enlaces visibles a esa dirección.
- Cada solicitud del formulario también se guarda en *Solicitudes* del panel; WhatsApp se abre igual.
- En el panel (*Empresa → Formulario del sitio web*) agrega el dominio del sitio a «Sitios permitidos».
Sin la variable, `/admin` responde 404 y el formulario solo usa WhatsApp. El identificador de la empresa está en `src/lib/panel.ts`.
Cuando el cliente tenga correo, se puede agregar envío por correo con Resend como en el sitio de MIRAI NEXUS.

## Logotipo
Redibujado en vector a partir del original: engranes con dientes reales, letras geométricas propias,
azul normalizado `#2F66B3` (original `#3367AD`), negro `#1D1D1F`, gris `#3A3A3C`.
Versiones: `logo-full.svg` (fondo claro), `logo-full-dark.svg` (fondo oscuro), `logo-horizontal*.svg` (barra), `icon.svg`.

## Publicar en Hostinger (sitio estático, recomendado)
El sitio no necesita servidor: se sube como archivos a `public_html`.
1. Revisa los dominios en `.env.production` (`NEXT_PUBLIC_SITE_URL` y `NEXT_PUBLIC_PANEL_URL`).
2. `npm install` y `npm run build:hostinger` → genera la carpeta `out/` con su `.htaccess`
   (HTTPS, dominio sin www, `/admin` → panel, cabeceras de seguridad, caché y página 404).
3. En Hostinger → Sitios web → el dominio de CABA → Administrador de archivos → `public_html`:
   sube el **contenido** de `out/` (incluido `.htaccess`, que es un archivo oculto).
4. Cuando el sitio esté publicado, la tarjeta del portafolio de MIRAI NEXUS puede dejar de usar la imagen local.

También funciona como app Node.js (Vercel o Hostinger): `npm run build` + `npm start`; ahí `/admin` y las cabeceras
salen de `next.config.ts`.

## Pendientes con el cliente
- [ ] Confirmar por escrito que Topre Autoparts autoriza mostrar su nombre y las fotos tomadas en su planta.
- [ ] Correo de contacto (hoy todo llega por WhatsApp).
- [ ] Reto y resultado medible de cada proyecto (la ficha solo dice "eficiente"; no se publicó para no inventar datos).
- [ ] Capacidades del taller: marcas/modelos de torno y CNC, medidas máximas, tolerancias y materiales frecuentes.
- [ ] Más fotos: piezas maquinadas sueltas, taller y equipo.
- [ ] Nombres de las empresas que autorizaron aparecer en «Empresas que confían en nosotros» (`clients` en `src/content/projects.ts`).
- [ ] Las fotos del inicio (`cnc-fresado.webp`) y de «Hecho para el ritmo…» (`cnc-mesa.webp`) son ilustrativas; cambiarlas por fotos del taller cuando las haya.
- [ ] Redes sociales y dominio.
- [ ] Fecha y revisión legal del aviso de privacidad.
- [ ] Aprobación de la línea "Sitio desarrollado por MIRAI NEXUS" en el pie de página.

## Identidad visual «Plano de taller» (rediseño)
Diseño propio derivado del logotipo y del mundo del cliente (no copia de ninguna marca):
- **Chaflán** de la letra C del logotipo en fotos, botones y marcadores (`.chamfer` en `globals.css`).
- **Amarillo de cota** `#F2B705` (el de los fixtures) para estados y etiquetas.
- **Retícula de plano** en secciones claras y **azul plano** `#0F2A4D` en las oscuras.
- **Barlow Condensed** (títulos) + **Barlow** (texto), ambas autoalojadas.
- Referencias de la skill popular-web-designs mezcladas: BMW (ángulos, contraste), IBM (entradas con línea inferior, un solo azul), HashiCorp (ritmo claro/oscuro).
