# CABA Servicios y Maquinados Industriales — Sitio web

Desarrollado por **MIRAI NEXUS**. Next.js 16 · TypeScript · Tailwind CSS v4.
Dirección visual: estilo Apple (skill *popular-web-designs*, `apple.md`) adaptado a la marca CABA.

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
1. Guarda las fotos en `public/portfolio/` como `.webp` (~1600 px de ancho).
2. En `src/content/projects.ts` copia un bloque, cambia título, cliente, resumen, servicios y fotos (con su ancho y alto).

## Contacto
El formulario arma el mensaje y abre WhatsApp con el número de CABA: no necesita servidor ni correo.
Cuando el cliente tenga correo, se puede agregar envío por correo con Resend como en el sitio de MIRAI NEXUS.

## Logotipo
Redibujado en vector a partir del original: engranes con dientes reales, letras geométricas propias,
azul normalizado `#2F66B3` (original `#3367AD`), negro `#1D1D1F`, gris `#3A3A3C`.
Versiones: `logo-full.svg` (fondo claro), `logo-full-dark.svg` (fondo oscuro), `logo-horizontal*.svg` (barra), `icon.svg`.

## Publicar en Vercel
1. Sube el proyecto a un repositorio de GitHub.
2. En Vercel: *Add New → Project* → importa el repositorio.
3. Variable: `NEXT_PUBLIC_SITE_URL` = la URL final (o la `.vercel.app` mientras no haya dominio).
4. Cuando esté publicado, agrega la URL en `src/content/projects.ts` del sitio de MIRAI NEXUS.

## Pendientes con el cliente
- [ ] Confirmar por escrito que Topre Autoparts autoriza mostrar su nombre y las fotos tomadas en su planta.
- [ ] Correo de contacto (hoy todo llega por WhatsApp).
- [ ] Reto y resultado medible de cada proyecto (la ficha solo dice "eficiente"; no se publicó para no inventar datos).
- [ ] Capacidades del taller: marcas/modelos de torno y CNC, medidas máximas, tolerancias y materiales frecuentes.
- [ ] Más fotos: piezas maquinadas sueltas, taller y equipo.
- [ ] Redes sociales y dominio.
- [ ] Fecha y revisión legal del aviso de privacidad.
- [ ] Aprobación de la línea "Sitio desarrollado por MIRAI NEXUS" en el pie de página.
