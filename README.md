# Reset Wellness — website

Static, bilingual (German / English) website for **Reset Wellness**, Auguststraße 88, 10117 Berlin.
Plain HTML, CSS and JavaScript — no build step, no dependencies. Works on any static host
(GitHub Pages, Netlify, Vercel, Cloudflare Pages, a classic web server).

## Structure

```
index.html            Language redirect (German by default, English for English browsers)
de/                   German pages
  index.html          Start
  behandlungen.html   Behandlungen
  mitgliedschaften.html
  ueber-uns.html
  kontakt.html
  datenschutz.html    Datenschutzerklärung
  impressum.html
  agb.html
en/                   English pages (same set: index, treatments, memberships, about,
                      contact, privacy, legal-notice, terms)
assets/css/site.css   Shared styles (colours, buttons, tile backgrounds, responsive rules)
assets/js/site.js     Header on scroll, mobile menu, reveal-on-scroll, back-to-top, contact form
assets/images/        Photos and the tile texture
```

Each page has its English/German twin; the EN/DE switch in the header links between them.
Text lives directly in each HTML file — edit the German and English versions separately.

## Preview locally

Open `index.html` in a browser, or run a tiny server from this folder:

```
python3 -m http.server 8000
```

then visit http://localhost:8000.

## Brand

- Colours: burgundy `#580a20`, deep red `#6b0b0c`, brown `#362017`, cream `#f7ede0`
- Fonts: **Hagrid Bold** for headings, **Glacial Indifference** for everything else

## Before going live

- [ ] **Fonts** — add the licensed web font files (Hagrid needs a web licence) to `assets/fonts/`
      and add `url(...)` sources to the `@font-face` rules at the top of `assets/css/site.css`.
      Until then, visitors without the fonts installed see stand-ins (Bricolage Grotesque / Jost).
- [ ] **Contact form** — currently only shows a thank-you message. Connect it to a form service
      or booking system (see the TODO in `assets/js/site.js`), and update the privacy policy accordingly.
- [ ] **Placeholders** — replace everything in square brackets, e.g. `[HOURS]`, `[PRICE]`,
      `[+49 PHONE]`, `[hello@yourdomain.de]`, the Impressum details (company, owner, VAT ID),
      and the Instagram handle link in the footer.
- [ ] **Photos** — replace `assets/images/*` with high-resolution originals (hero ≥ 2000 px wide)
      and add team photos on the About pages.
- [ ] **Map** — the contact page has a map placeholder; embed a map only after consent (GDPR).
- [ ] **Legal review** — Datenschutz, Impressum and AGB are drafts and need a lawyer's check.
- [ ] **"Verträge hier kündigen"** — currently links to the contact page; German law (§ 312k BGB)
      requires a proper cancellation page/button for memberships sold online.
