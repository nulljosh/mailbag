"""Halftone the public domain Greek art for the landing: grey, crop to the slot, equalise, Floyd-Steinberg.
Each output is a dot mask (alpha) that landing.css tints with --band-art.

    python3 scripts/halftone.py WORKDIR   # reads WORKDIR/src/<name>.jpg (Wikimedia Commons, 2000 px), writes WORKDIR/art/*.png
"""
import sys
from PIL import Image, ImageOps, ImageFilter
S = sys.argv[1]
# name -> (source, size, focus x, focus y, invert)
JOBS = {
 'sisyphus': ('sisyphus', (1800, 950), .5, .5),
 'iris': ('iris', (1800, 950), .5, .45),
 'pandora-waterhouse': ('pandora1', (900, 600), .5, .35),
 'pandora-rossetti': ('pandora2', (900, 600), .5, .4),
 'prometheus': ('prometheus', (900, 600), .5, .35),
 'card-atlas': ('atlas', (600, 400), .5, .3),
 'card-nike': ('nike', (600, 400), .5, .25),
 'card-argus': ('argus', (600, 400), .5, .4),
}
for out, (src, size, fx, fy) in JOBS.items():
    im = Image.open(f'{S}/src/{src}.jpg').convert('L')
    w, h = size
    r = max(w / im.width, h / im.height)
    im = im.resize((round(im.width * r) + 1, round(im.height * r) + 1), Image.LANCZOS)
    x = round((im.width - w) * fx); y = round((im.height - h) * fy)
    im = im.crop((x, y, x + w, y + h))
    im = ImageOps.autocontrast(im, cutoff=1)
    im = ImageOps.equalize(im).filter(ImageFilter.GaussianBlur(.6))
    bw = im.convert('1')  # Floyd-Steinberg
    a = bw.convert('L')
    la = Image.merge('LA', (Image.new('L', size, 255), a))
    la.save(f'{S}/art/{out}.png', optimize=True)
    print(out, la.size)
