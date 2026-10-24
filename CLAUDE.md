# Reset Wellness — project guide for Claude

Static, bilingual website for **Reset Wellness**, a membership-based beauty & wellness studio
at Auguststraße 88, 10117 Berlin. Founders: Laura Guegan & Lysa Gouffie.
The design was approved by the client; keep changes faithful to it unless asked otherwise.

## Tech
- Plain HTML, CSS and vanilla JS. No framework, no build step, no package manager.
- Preview: `python3 -m http.server 8000` in the repo root → http://localhost:8000
- Hosting: Hostinger (static files; upload the repo root or deploy via Git from `main`).
  GitHub Pages on the working branch is used as a preview.

## Structure
- `index.html` — language redirect (German default; English for English browsers).
- `de/` and `en/` — one HTML file per page, in matching pairs:

  | Page | German | English |
  |---|---|---|
  | Home | `de/index.html` | `en/index.html` |
  | Treatments | `de/behandlungen.html` | `en/treatments.html` |
  | Memberships | `de/mitgliedschaften.html` | `en/memberships.html` |
  | About | `de/ueber-uns.html` | `en/about.html` |
  | Contact | `de/kontakt.html` | `en/contact.html` |
  | Privacy | `de/datenschutz.html` | `en/privacy.html` |
  | Legal notice | `de/impressum.html` | `en/legal-notice.html` |
  | Terms | `de/agb.html` | `en/terms.html` |

- `assets/css/site.css` — shared styles: buttons, tile backgrounds, scroll-reveal, responsive rules.
- `assets/js/site.js` — header on scroll + progress bar, mobile menu, reveal on scroll, back-to-top, contact form.
- `assets/images/` — hero, studio sign, foam monogram, tile texture.
- `assets/fonts/` — self-hosted fallback fonts + licences. `assets/js/lang.js` — language redirect for `/`.
- `.htaccess` — Hostinger settings: force HTTPS, hide dot files and `.md`, security headers incl. a
  Content-Security-Policy. No inline `<script>` and no third-party scripts/styles/fonts; the only allowed
  frame is Google Maps. If you add an external service (e.g. Fresha widget), extend the CSP for it.

## Booking
- Online booking is **Fresha**: `https://l.fresha.com/3jvcshkwm` (plain link, `target="_blank" rel="noopener"`).
  All "Book now" / "Book an appointment" / "Book a skin consultation" / "Termin buchen" / "Jetzt buchen" /
  "Hautberatung buchen" buttons and "Book online" / "Online buchen" on the contact page use it.
  "Enquire" / "Anfragen" buttons (memberships, microneedling packages) still go to the contact page.
  Fresha is described in the privacy policy, section 5. If a Fresha *widget* is ever embedded, extend the CSP.

## Rules when editing
- **Every content change goes into both languages.** Edit the German and the English twin together,
  and keep their structure identical. German copy uses informal "du".
- **No dashes in visible text** (no —, –, or hyphenated words), in either language: use commas, full stops,
  "to"/"bis" for ranges, or rewrite. Client request.
- The header (nav) and footer are repeated in every page — change them in all 16 files.
- The EN/DE switch links each page to its twin, and each page has `hreflang` alternates; keep them correct
  when renaming or adding pages.
- Most styling is inline (exported from the design tool). Shared/hover/responsive rules live in `site.css`;
  the phone layout relies on attribute selectors there (e.g. `[style*="max-width: 1200px"]`), so check
  `site.css` before changing those inline values.
- Keep Impressum, Datenschutz and AGB linked from the footer of every page (German legal requirement).
- Every page has a meta description and Open Graph / Twitter tags (link previews in WhatsApp, Instagram etc.)
  right after `<title>`: absolute `og:url` and `og:image` (`assets/images/share.jpg`, 1200×630). Add them to new pages
  and update the description when a page's content changes. Descriptions follow the no dashes rule too.
- Keep it accessible: real `<a>`/`<button>`, alt text on images, visible focus, ≥ 44px touch targets.

## Brand
- Colours: burgundy `#580a20`, deep red `#6b0b0c`, brown `#362017`, cream `#f7ede0`, blush accent `#ecd3c3`.
  Burgundy leads; brown and cream support it. Buttons: brown pill + cream text on light backgrounds,
  cream pill + brown text on dark backgrounds.
- Fonts: **Hagrid Bold** for headings only, **Glacial Indifference** for all other text.
  Currently loaded via `local()` with fallbacks Bricolage Grotesque / Jost, **self-hosted** in `assets/fonts/`
  (OFL). Never link Google Fonts or other font CDNs: it sends visitor IPs to Google (GDPR).
- Look: burgundy glazed-tile texture, frosted-cream glass cards, rounded "sheet" sections, soft scroll reveals.

## Open before launch
- Add licensed web font files to `assets/fonts/` and `url(...)` sources to the `@font-face` rules in `site.css`
  (Hagrid needs a web licence).
- Contact form was removed from the contact page and the privacy policy; its JS in `site.js` is unused.
- Replace remaining placeholders in square brackets: VAT ID, photo credits, Instagram handle,
  "last updated" dates (set on launch day).
- Hosting: **Hostinger** (named in the privacy policy, section 2). The owners need to accept Hostinger's
  data processing agreement (Art. 28 GDPR). Register court: Amtsgericht Charlottenburg (confirmed).
- Higher-resolution photos (hero ≥ 2000 px wide) and team photos on the About pages.
- Map on the contact page: embed only after consent (GDPR).
- Legal texts are drafts — need a lawyer's review. Before memberships launch, add a real
  cancellation page and put a "Verträge hier kündigen" / "Cancel contract here" link back in every footer (§ 312k BGB).
  The footer link was removed while memberships are "coming soon".
