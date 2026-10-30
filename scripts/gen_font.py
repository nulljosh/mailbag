"""Mailbag Sans and Mailbag Display: both cut from Inter 4 (Rasmus Andersson, SIL Open Font License 1.1, no reserved
name), renamed. Inter is drawn in the spirit of San Francisco, and its optical sizes split the same way SF does:
Sans is the text cut (optical size 14, like SF Pro Text) in four static weights, with its curly quote marks redrawn as
envelope flaps, so every quote on the page wears the mark. Display is the display cut (optical size 32, like SF Pro
Display) for headlines and numbers: variable in weight for the web, one Bold static for the apps.
Condensed Antonio caps were the display face until 2026-10-30; Joshua wanted SF, not a poster face.

Same method as Mailbag Sans, coda's Quip Sans and turing's Samantha Sans: pinned release, renamed, OFL shipped beside the fonts,
original copyright kept in the name table, fixed timestamps so every build is the same bytes.

    python3 scripts/gen_font.py            # writes fonts/MailbagSans-{Regular,Medium,Semibold,Bold}.{ttf,woff2},
                                           # fonts/MailbagDisplay.{woff2,ttf} and OFL.txt
    python3 scripts/gen_font.py --check    # named Mailbag, OFL present, original copyright kept
Needs fonttools and brotli (uv run --with fonttools --with brotli).
"""
import io
import os
import sys
import urllib.request

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.cu2quPen import Cu2QuPen
from fontTools.pens.recordingPen import DecomposingRecordingPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(HERE, "fonts")
SOURCE = "https://cdn.jsdelivr.net/npm/@fontsource-variable/inter@5.2.8/"
VARIABLE = "files/inter-latin-opsz-normal.woff2"   # axes: opsz 14-32, wght 100-900
WEIGHTS = {"Regular": 400, "Medium": 500, "Semibold": 600, "Bold": 700}


def fetch(path):
    """Bytes of one file from the pinned Inter release."""
    with urllib.request.urlopen(SOURCE + path, timeout=60) as r:
        return r.read()


QUOTES = {"quoteright": 1, "quotedblright": 2, "quoteleft": 1, "quotedblleft": 2}


def flap(pen, x0, y0, w, h):
    """One envelope flap: a rounded wedge pointing down, the V where a letter's flap meets its body."""
    r = 0.14 * w
    pen.moveTo((x0, y0 + h))
    pen.lineTo((x0 + w, y0 + h))
    pen.lineTo((x0 + w / 2 + r / 2, y0 + r))
    pen.curveTo((x0 + w / 2 + r / 4, y0 + r / 4), (x0 + w / 2 - r / 4, y0 + r / 4), (x0 + w / 2 - r / 2, y0 + r))
    pen.closePath()


def redraw_quotes(font):
    """Replace the four curly quotes with flaps inside each original's box, so spacing never moves."""
    glyphs = font.getGlyphSet()
    glyf, hmtx, cmap = font["glyf"], font["hmtx"], font.getBestCmap()
    names = {cmap[0x2019]: 1, cmap[0x201D]: 2, cmap[0x2018]: 1, cmap[0x201C]: 2}
    # Inter builds comma and the low quotes from these glyphs; flatten them first so only the real quotes change
    flat = {}
    for g in glyf.keys():
        if glyf[g].isComposite() and any(c.glyphName in names for c in glyf[g].components):
            rec = DecomposingRecordingPen(glyphs)
            glyphs[g].draw(rec)
            tt = TTGlyphPen(None)
            rec.replay(tt)
            flat[g] = tt.glyph()
    glyf.glyphs.update(flat)
    for g in flat:
        glyf[g].recalcBounds(glyf)
    glyphs = font.getGlyphSet()
    for name, count in names.items():
        bp = BoundsPen(glyphs)
        glyphs[name].draw(bp)
        x0, y0, x1, y1 = bp.bounds
        gap = 0.12 * (x1 - x0) if count == 2 else 0
        w = (x1 - x0 - gap) / count
        tt = TTGlyphPen(None)
        pen = Cu2QuPen(tt, max_err=1.0)
        if name in (cmap[0x2019], cmap[0x201D]):   # closing marks are the opening flaps turned 180 degrees
            pen = TransformPen(pen, (-1, 0, 0, -1, x0 + x1, y0 + y1))
        for i in range(count):
            flap(pen, x0 + i * (w + gap), y0, w, y1 - y0)
        glyf[name] = tt.glyph()
        glyf[name].recalcBounds(glyf)
        hmtx[name] = (hmtx[name][0], glyf[name].xMin)


def rename(font, family, style):
    """Give the outlines the Mailbag name; copyright (0), license (13, 14) and the variable axis names (256 up) stay."""
    ps = family.replace(" ", "")
    names = {1: family, 2: style, 3: f"{ps}-{style}", 4: f"{family} {style}", 5: "Version 1.000",
             6: f"{ps}-{style}", 16: family, 17: style}
    table = font["name"]
    table.names = [n for n in table.names if n.nameID in (0, 13, 14) or n.nameID >= 256]
    for nid, text in names.items():
        table.setName(text, nid, 3, 1, 0x409)
        table.setName(text, nid, 1, 0, 0)
    font["head"].created = font["head"].modified = 3_700_000_000
    font["OS/2"].achVendID = "MLBG"


def check():
    """Self-check of the shipped files."""
    assert os.path.exists(os.path.join(OUT, "OFL.txt")), "the OFL must ship with the fonts"
    for style in WEIGHTS:
        for ext in ("ttf", "woff2"):
            f = TTFont(os.path.join(OUT, f"MailbagSans-{style}.{ext}"))
            assert f["name"].getDebugName(1) == "Mailbag Sans", "family name"
            assert f["name"].getDebugName(6) == f"MailbagSans-{style}", "postscript name"
            assert f["name"].getDebugName(0), "the original copyright must stay in the name table"
            cmap, hmtx, glyf = f.getBestCmap(), f["hmtx"], f["glyf"]
            for cp, n in ((0x2019, 1), (0x201D, 2), (0x2018, 1), (0x201C, 2)):
                g = glyf[cmap[cp]]
                assert g.numberOfContours == n, f"U+{cp:04X} is not the flap"
                assert 0 <= g.xMin and g.xMax <= hmtx[cmap[cp]][0], f"U+{cp:04X} spills out of its advance"
    for ext in ("ttf", "woff2"):
        f = TTFont(os.path.join(OUT, f"MailbagDisplay.{ext}"))
        assert f["name"].getDebugName(1) == "Mailbag Display", "display family name"
        assert f["name"].getDebugName(0), "the original copyright must stay in the name table"
    assert "fvar" in TTFont(os.path.join(OUT, "MailbagDisplay.woff2")), "the web display cut keeps its weight axis"
    print(f"font ok: Mailbag Sans and Mailbag Display (Inter text and display cuts, OFL), {len(WEIGHTS)} weights, quotes are envelope flaps")


def main():
    if "--check" in sys.argv:
        return check()
    os.makedirs(OUT, exist_ok=True)
    with open(os.path.join(OUT, "OFL.txt"), "wb") as f:
        f.write(fetch("LICENSE"))
    source = fetch(VARIABLE)
    cut = lambda axes: instancer.instantiateVariableFont(TTFont(io.BytesIO(source)), axes)
    for style, weight in WEIGHTS.items():
        font = cut({"opsz": 14, "wght": weight})
        redraw_quotes(font)
        rename(font, "Mailbag Sans", style)
        for ext, flavor in (("ttf", None), ("woff2", "woff2")):
            font.flavor = flavor
            font.save(os.path.join(OUT, f"MailbagSans-{style}.{ext}"), reorderTables=False)
        print(f"MailbagSans-{style}: Inter opsz 14, wght {weight}")
    # the web keeps the weight axis; the apps get one Bold static, which is all they use
    for ext, axes, flavor, style in (("woff2", {"opsz": 32}, "woff2", "Regular"),
                                     ("ttf", {"opsz": 32, "wght": 700}, None, "Bold")):
        font = cut(axes)
        rename(font, "Mailbag Display", style)
        font.flavor = flavor
        font.save(os.path.join(OUT, f"MailbagDisplay.{ext}"), reorderTables=False)
    print("MailbagDisplay: Inter opsz 32")


if __name__ == "__main__":
    main()
