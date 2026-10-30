# Mailbag brand kit and design system

Mailbag sorts your inbox in one button. The mark is a mail case: an envelope with a handle. The flap is the same V as the quote marks in Mailbag Sans.

## The mark
One bold flat white glyph on an accent gradient tile. No text, no outline, no emblem.

- `../Mailbag.icon` is the source of truth (Icon Composer). Light and dark fills are set in it.
- `../icon.svg` is the flat copy for READMEs (shown at 80 px). `icon-1024.png` is the App Store icon, no alpha.
- `mark.svg` is the glyph alone in `currentColor` for your own background.
- Clear space equal to the width of the glyph's thickest stroke. Smallest size 16 px.

## The mascot
`mascot.svg` is the mail case awake: the icon's bag with two eyes on the flap, a smile and two stubby legs, flat in the two icon blues on a pale disc. Show it at 112 px (hero or call to action) or 28 px (nav), never with a ring, shadow or animation. It is the same object as the icon, never a bird (a blue bird reads as Twitter).

## Colour
clrs.cc blue on near white in light, clrs.cc navy in dark. One accent, flat surfaces, no gradients except the icon tile, no shadows.

| Role | Light | Dark |
|---|---|---|
| Accent (actions, links, glyph band) | `#0074D9` (clrs.cc blue) | `#66b5f7` |
| Icon tile | `#0074D9` to `#004C8F` | same |
| Buttons, white label | `#0074D9` | same |
| Blue band (full bleed sections) | `#006ac6` | `#004C8F` |
| Band text, secondary | `#e6f2fd` | `#d4e8fa` |
| Halftone art on the band | `#a8d4f8` | `#5da6e6` |
| Background | `#fdfdfd` | `#001f3f` (clrs.cc navy) |
| Surface | `#f2f4f8` | `#072a4d` |
| Line | `#dcdfe6` | `#17406b` |
| Text | `#1a1a1a` | `#f2f2f5` |
| Secondary text | `#5a5f6e` | `#a3b8cf` |

Filed, waiting and failed dots keep the shared greens, ambers and reds. The accent is for actions, links and the icon. Never pink (retired 2026-10-20), brown, beige, purple or teal.

## Type
Two faces, both shipped in `fonts/` with their licences.

- **Mailbag Sans**, the body face: Inter's text cut (optical size 14, SF Pro Text in spirit) under the SIL Open Font License, renamed and pinned by `scripts/gen_font.py`, with the curly quotes redrawn as envelope flaps (comma and low quotes are flattened first, so only the real quotes change). Four weights, 400 to 700. The fallback is the system stack. Scale 64/64, 34/40, 20/28, 17/24, 13/16.
- **Mailbag Display**, headlines and big numbers only: Inter's display cut (optical size 32, SF Pro Display in spirit, OFL). Sentence case, bold, tight tracking the way Apple sets SF: hero 12vw at 700 and -.045em, section heads 5.6vw at 700 and -.035em, card heads 28 at 600. Buttons, labels and chips are Mailbag Sans in sentence case, no tracking. The apps use the one Bold static for the big count and the title. Condensed Antonio caps were dropped on 2026-10-30.

## The landing
Dressed after the Hermes landing (same clrs.cc blue): a navy page in a 4 px blue frame down both edges, giant thin condensed caps, small square buttons (2 px radius, 40 px), and full-bleed blue bands with film grain.

- **Halftone art.** Public domain Greek art, dithered to dot masks (`landing/art/*.png`, Floyd-Steinberg on a grey equalised crop) and tinted with the band-art colour. Each image appears once: Titian's Sisyphus behind the live inbox, Guerin's Morpheus and Iris over the band head, Waterhouse and Rossetti for Pandora, Fueger's Prometheus, then the Winged Victory, the Farnese Atlas and Velazquez's Mercury and Argus on the three cards. Sources are in the HTML comment above `<main>`. Why these: Sisyphus never reached inbox zero, Iris carried the post, Pandora's box is a box you shut.
- **The live inbox** sits in a card on the stage in front of the art. It is the real triage UI; its markup keeps the old variable names (`--border`, `--muted`, `--panel`, `--on-accent`), which `tokens.css` aliases.
- **The footer** is the big one: a Press the button headline, brand and link columns, then a 40 vw engraved band of ten glyphs (rainbow of seven arcs, letter, out-tray, stamp, Doric column, sack, amphora, postmark, Pandora's box, wing) drawn in canvas as thin rules that thicken inside each glyph and again on the shadow edge. A narrow screen keeps the first eight. `landing/footer-band.js`.
- **Shape.** Panels and inbox card 4 px radius, chips and buttons 2 px, icon 22.5 percent.

## Space and shape (app)
- Space on the 8 point grid: 4, 8, 12, 16, 24, 32, 48, 64, 96. Side margin 20. Reading column 680. Page width 1120.
- Radii: cards 28, grouped lists 20, controls fully round in the app, icon 22 percent.
- Controls in the app are 48 points tall capsules, one height in a row. Focus is a 3 to 4 point ring at 30 percent accent.
- Motion is 0.2 s ease and honours reduced motion.

`tokens.css` here is the single source: `./deploy.sh` copies it, `mark.svg`, `icon.svg` and the fonts into `landing/` and deploys the Worker. The apps keep their own accent in the asset catalog (the same blue).
