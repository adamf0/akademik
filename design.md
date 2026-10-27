# DESIGN.md: Akademi Creator Visual System

## Design Read & Liveliness Dials
- Persuade surface (`/`): `ENERGY 3 / RHYTHM 3 / MOTION 2`
- Operate and Read surfaces (`/products`, `/checkout`, `/dashboard`, `/classroom`, `/admin`): `ENERGY 2 / RHYTHM 2 / MOTION 1`

## One-Line Rationale per Major Decision (R-31)
- **Dark warm-espresso ground (`#121110`, `#181614`, `#201d1a`)**: Inherits the official `akademicreator.com` studio-cinema atmosphere where creator video frames and monochrome-to-color portraits command maximum optical contrast.
- **Alabaster & warm stone ink (`#f3efe9`, `#e8e2da`, `#b5aea4`, `#9e968c`)**: Replaces harsh `#ffffff` on `#000000` halation while passing WCAG 2.2 AA (`6.18:1` to `16.47:1` verified via `contrast-check.py`).
- **Single deliberate terracotta-crimson accent (`#a03830` to `#b84334` surface, `#e87161` inline text)**: Preserves the recognizable Akademi Creator brand signature strictly for primary conversion actions, active states, and verified revenue metrics (`5.40:1` to `6.77:1` contrast).
- **Warm sand paper contrast plate (`#e8dcce` surface with `#121110` ink)**: Mirrors the tactile print-editorial member testimonial cards from `akademicreator.com` (`13.98:1` contrast) to break dark-section monotony.
- **Typography pairing (`Barlow Condensed` display + `Plus Jakarta Sans` UI/prose + `Montserrat` brand wordmark)**: Matches `akademicreator.com`'s condensed editorial authority on Persuade headlines while switching to fixed-rem geometric sans with `tabular-nums` on Operate/Read screens so data, prices, and lessons read effortlessly.
- **Asymmetric editorial rhythm (`RHYTHM 3`)**: Alternates an asymmetric split portrait dossier hero, a 7/5 editorial manifesto ledger, a master-detail 9-track curriculum stage, a full-width interactive revenue proof inspector, a 7-mentor studio roster, and a 2-tier investment comparison so no two adjacent sections share a layout template.
- **Motion choreography (`MOTION 2` on `/`, `MOTION 1` in app)**: Uses exponential ease-out (`cubic-bezier(0.22, 1, 0.36, 1)`) for scroll-triggered section entrances and monochrome-to-color portrait focus on the landing page, dropping to `150ms` state-only feedback inside LMS, checkout, and admin flows.
- **Bespoke 1.5px architectural SVG glyphs**: Uses content-specific geometric icons (play frame, open book, voucher ticket, shield lock, check seal, chat thread) paired with text labels and zero decorative emojis.

## Semantic Tokens
- `--bg-canvas`: `#121110`
- `--bg-elevated`: `#181614`
- `--bg-panel`: `#201d1a`
- `--bg-parchment`: `#e8dcce`
- `--ink-primary`: `#f3efe9`
- `--ink-body`: `#e8e2da`
- `--ink-secondary`: `#b5aea4`
- `--ink-muted`: `#9e968c`
- `--ink-on-parchment`: `#121110`
- `--border-hairline`: `rgba(232, 220, 206, 0.14)`
- `--border-interactive`: `#736b63`
- `--accent-crimson`: `#b84334`
- `--accent-crimson-deep`: `#a03830`
- `--accent-inline`: `#e87161`
- `--focus-ring`: `#f08a7b`
