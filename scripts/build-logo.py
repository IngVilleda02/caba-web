"""
Genera el logotipo de CABA en SVG (vector) a partir de geometría exacta.
Mejora del original: engranes con dientes reales, letras geométricas propias
sobre retícula, colores normalizados y versiones para fondo claro/oscuro.
Uso: python3 scripts/build-logo.py
"""
import math, os, glob
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.varLib import instancer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "brand")
os.makedirs(OUT, exist_ok=True)

BLUE = "#2F66B3"      # Azul CABA (normalizado desde #3367AD del original)
INK = "#1D1D1F"       # Negro de la banda y del texto
GRAY = "#3A3A3C"      # Gris del lema
WHITE = "#FFFFFF"

def gear(cx, cy, teeth, r_out, r_root, r_hole, tooth_ratio=0.5, rot=0.0):
    """Engrane con dientes trapezoidales y barreno central (evenodd)."""
    pts = []
    step = 2 * math.pi / teeth
    tw = step * tooth_ratio        # ancho del diente en la punta
    bw = step * (tooth_ratio + 0.16)  # ancho en la raíz
    for i in range(teeth):
        a = rot + i * step
        for ang, r in [(a - bw/2, r_root), (a - tw/2, r_out), (a + tw/2, r_out), (a + bw/2, r_root)]:
            pts.append((cx + r * math.cos(ang), cy + r * math.sin(ang)))
    d = "M" + " L".join(f"{x:.2f},{y:.2f}" for x, y in pts) + " Z"
    # barreno circular
    d += (f" M{cx + r_hole:.2f},{cy:.2f} A{r_hole},{r_hole} 0 1 0 {cx - r_hole:.2f},{cy:.2f}"
          f" A{r_hole},{r_hole} 0 1 0 {cx + r_hole:.2f},{cy:.2f} Z")
    return d

# Letras geométricas (altura 100, trazo 22) — estilo industrial cuadrado del original
LETTERS = {
    "C": (88, "M16,0 H88 V22 H24 V78 H88 V100 H16 L0,84 V16 Z"),
    "A": (100, "M0,100 L37,0 H63 L100,100 H76 L50,30 L24,100 Z"),
    "B": (90, "M0,0 H72 L90,16 V38 L80,50 L90,62 V84 L72,100 H0 Z M22,22 V39 H66 V22 Z M22,61 V78 H66 V61 Z"),
}

def word(text, x, y, h, fill, gap=16):
    s = h / 100
    out, cx = [], x
    for ch in text:
        w, d = LETTERS[ch]
        out.append(f'<path fill="{fill}" fill-rule="evenodd" transform="translate({cx:.2f},{y:.2f}) scale({s:.4f})" d="{d}"/>')
        cx += (w + gap) * s
    return "".join(out), cx - gap * s - x

# Lema con Inter Bold convertido a trazos (el SVG no depende de fuentes instaladas)
inter_src = sorted(glob.glob(os.path.join(ROOT, "node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2")))[0]
vf = TTFont(inter_src)
inter = instancer.instantiateVariableFont(vf, {"wght": 700})
gs, cmap, upm = inter.getGlyphSet(), inter.getBestCmap(), inter["head"].unitsPerEm

def text_path(text, x, y_base, size, fill, tracking=0.0):
    s = size / upm
    pen = SVGPathPen(gs)
    cx = 0
    for ch in text:
        g = cmap.get(ord(ch))
        if g is None:
            continue
        tp = TransformPen(pen, (s, 0, 0, -s, x + cx, y_base))
        gs[g].draw(tp)
        cx += gs[g].width * s + tracking * size
    return f'<path fill="{fill}" d="{pen.getCommands()}"/>', cx - tracking * size

def measure(text, size, tracking):
    s = size / upm
    return sum(gs[cmap[ord(c)]].width * s + tracking * size for c in text) - tracking * size

def gears_group(ox, oy, scale, color):
    big = gear(ox + 0, oy + 0, 18, 92 * scale, 79 * scale, 30 * scale, rot=math.radians(5))
    sm_c = (ox + 141 * scale * math.cos(math.radians(-38)), oy + 141 * scale * math.sin(math.radians(-38)))
    small = gear(sm_c[0], sm_c[1], 11, 50 * scale, 38 * scale, 15 * scale, rot=math.radians(16))
    return f'<path fill="{color}" fill-rule="evenodd" d="{big}"/><path fill="{color}" fill-rule="evenodd" d="{small}"/>'

def full_logo(dark=False):
    """Versión apilada: engranes saliendo de la banda, lema debajo."""
    band_fill = WHITE if dark else INK
    letter_fill = INK if dark else WHITE
    tag_fill = WHITE if dark else GRAY
    W = 640
    band_y, band_h = 168, 92
    parts = [gears_group(268, band_y + 2, 1.0, BLUE)]
    parts.append(f'<rect x="40" y="{band_y}" width="{W-80}" height="{band_h}" fill="{band_fill}"/>')
    letters, lw = word("CABA", 0, 0, 56, letter_fill, gap=18)
    lx = (W - lw) / 2
    letters, _ = word("CABA", lx, band_y + (band_h - 56) / 2, 56, letter_fill, gap=18)
    parts.append(letters)
    l1, l2 = "SERVICIOS Y MAQUINADOS", "INDUSTRIALES"
    size, tr = 30, 0.06
    w1 = measure(l1, size, tr); w2 = measure(l2, size, tr)
    p1, _ = text_path(l1, (W - w1) / 2, band_y + band_h + 46, size, tag_fill, tr)
    p2, _ = text_path(l2, (W - w2) / 2, band_y + band_h + 86, size, tag_fill, tr)
    parts += [p1, p2]
    parts.append(f'<rect x="60" y="{band_y + band_h + 104}" width="{W-120}" height="8" fill="{BLUE}"/>')
    H = band_y + band_h + 120
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" aria-label="CABA Servicios y Maquinados Industriales">{"".join(parts)}</svg>'

def horizontal_logo(dark=False):
    """Versión horizontal para la barra de navegación: engranes + banda CABA + lema."""
    band_fill = WHITE if dark else INK
    letter_fill = INK if dark else WHITE
    tag_fill = "rgba(255,255,255,0.72)" if dark else GRAY
    parts = [gears_group(44, 58, 0.36, BLUE)]
    _, lw = word("CABA", 0, 0, 30, letter_fill, gap=16)
    bx, by, bh = 98, 22, 48
    bw = lw + 36
    parts.append(f'<rect x="{bx}" y="{by}" width="{bw:.1f}" height="{bh}" fill="{band_fill}"/>')
    letters, _ = word("CABA", bx + 18, by + 9, 30, letter_fill, gap=16)
    parts.append(letters)
    tx = bx + bw + 16
    t1, w1 = text_path("SERVICIOS Y MAQUINADOS", tx, 42, 14.5, tag_fill, 0.08)
    t2, w2 = text_path("INDUSTRIALES", tx, 62, 14.5, tag_fill, 0.08)
    W = tx + max(w1, w2) + 4
    parts += [t1, t2]
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} 92" role="img" aria-label="CABA Servicios y Maquinados Industriales">{"".join(parts)}</svg>'

def icon(bg=WHITE):
    g = gears_group(102, 152, 0.82, BLUE)
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" rx="56" fill="{bg}"/>{g}</svg>'

files = {
    "logo-full.svg": full_logo(False),
    "logo-full-dark.svg": full_logo(True),
    "logo-horizontal.svg": horizontal_logo(False),
    "logo-horizontal-dark.svg": horizontal_logo(True),
    "icon.svg": icon(),
}
for name, svg in files.items():
    with open(os.path.join(OUT, name), "w") as fh:
        fh.write(svg)
    print(name, len(svg) // 1024, "KB")
