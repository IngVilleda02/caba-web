"""
Genera preview/caba-preview.html: copia estática y autocontenida del sitio a partir de
`next build`, para revisarla sin servidor. Uso: python3 scripts/build-preview.py
"""
import base64, re, pathlib

root = pathlib.Path(__file__).resolve().parent.parent
nxt = root / ".next"
html = (nxt / "server/app/index.html").read_text()

css_parts = []
for href in re.findall(r'href="/_next/(static/[^"]+\.css)"', html):
    css_parts.append((nxt / href).read_text())
css = "\n".join(css_parts)

def font_face(m):
    block = m.group(0)
    # Solo el subconjunto latino (Barlow: barlow-latin-400-normal.*.woff2)
    url = re.search(r"url\(([^)]*-latin-\d+-normal[^)]*\.woff2)\)", block)
    if not url:
        return ""
    ref = url.group(1).strip("'\"")
    path = ((nxt / "static/chunks") / ref).resolve() if not ref.startswith("/_next/") else nxt / ref.replace("/_next/", "")
    if not path.exists():
        path = next((nxt / "static").rglob(pathlib.Path(ref).name))
    data = base64.b64encode(path.read_bytes()).decode()
    return re.sub(r"src:[^;}]*", f'src:url(data:font/woff2;base64,{data}) format("woff2")', block)

css = re.sub(r"@font-face\{[^}]*\}", font_face, css)

body = re.search(r"<body[^>]*>(.*)</body>", html, re.S).group(1)
body = re.sub(r"<script\b(?![^>]*application/ld\+json)[^>]*>.*?</script>", "", body, flags=re.S)
body = re.sub(r"<link\b[^>]*>", "", body)
body = re.sub(r'\s(srcset|imagesrcset)="[^"]*"', "", body)

mimes = {".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg"}
cache = {}
def data_uri(path):
    if path not in cache:
        p = root / "public" / path.lstrip("/")
        cache[path] = f"data:{mimes[p.suffix]};base64,{base64.b64encode(p.read_bytes()).decode()}" if p.exists() else path
    return cache[path]

body = re.sub(r'(src|data-src)="(/(?:portfolio|brand)/[^"]+)"', lambda m: f'{m.group(1)}="{data_uri(m.group(2))}"', body)
body = body.replace('href="/aviso-de-privacidad"', 'href="#contacto"').replace('href="/"', 'href="#inicio"')

js = (root / "public/site.js").read_text()
out = f"""<title>CABA Servicios y Maquinados</title>
<meta name="description" content="Vista previa del sitio de CABA Servicios y Maquinados Industriales.">
<style>
{css}
html, body {{ background: #eef1f4; color: #14171c; }}
body {{ overflow-x: clip; }}
</style>
{body}
<script>
{js}
</script>
"""
dest = root / "preview/caba-preview.html"
dest.parent.mkdir(exist_ok=True)
dest.write_text(out)
print(dest, f"{dest.stat().st_size/1024:.0f} KB")
