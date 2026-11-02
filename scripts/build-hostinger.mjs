/**
 * Genera la versión estática para Hostinger (public_html): carpeta `out/` + `.htaccess`.
 * Uso: npm run build:hostinger   (toma NEXT_PUBLIC_SITE_URL y NEXT_PUBLIC_PANEL_URL de .env.production)
 */
import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { buildCsp, otherHeaders } from "../security.mjs";

for (const f of [".env.production.local", ".env.production"]) {
  if (!existsSync(f)) continue;
  for (const line of readFileSync(f, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2];
  }
}

const panel = (process.env.NEXT_PUBLIC_PANEL_URL ?? "").trim().replace(/\/+$/, "");
const PANEL_SLUG = readFileSync("src/lib/panel.ts", "utf8").match(/PANEL_SLUG = "([^"]+)"/)[1];

execSync("npx next build", { stdio: "inherit", env: { ...process.env, STATIC_EXPORT: "1" } });

const esc = (v) => v.replace(/"/g, '\\"');
const htaccess = `# ── Generado por scripts/build-hostinger.mjs. No lo edites a mano: cambia .env.production y vuelve a generar.
Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  # Siempre HTTPS
  RewriteCond %{HTTPS} off
  RewriteCond %{HTTP:X-Forwarded-Proto} !https
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  # Dominio sin "www"
  RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]
  RewriteRule ^ https://%1%{REQUEST_URI} [L,R=301]
${panel ? `  # Acceso administrativo: /admin → panel de cotizaciones con el estilo del sitio
  RewriteRule ^admin(/.*)?$ ${panel}/acceso/${PANEL_SLUG} [L,R=302]
` : "  # /admin desactivado: falta NEXT_PUBLIC_PANEL_URL\n"}</IfModule>

<IfModule mod_headers.c>
  Header always set Content-Security-Policy "${esc(buildCsp({ panelUrl: panel }))}"
${otherHeaders.map(([k, v]) => `  Header always set ${k} "${esc(v)}"`).join("\n")}
  # Archivos con huella (no cambian): caché de un año. Páginas HTML: siempre frescas.
  <FilesMatch "\\.(js|css|woff2?)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.(webp|avif|png|jpe?g|svg|ico)$">
    Header set Cache-Control "public, max-age=2592000"
  </FilesMatch>
  <FilesMatch "\\.html$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml text/plain application/manifest+json
</IfModule>
AddType application/manifest+json .webmanifest
# La imagen para compartir se genera sin extensión: se declara como PNG.
<Files "opengraph-image">
  ForceType image/png
</Files>
`;
writeFileSync("out/.htaccess", htaccess);
console.log(`\nListo: out/ (+ .htaccess). /admin → ${panel ? `${panel}/acceso/${PANEL_SLUG}` : "desactivado"}`);
