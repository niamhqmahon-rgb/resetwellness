# Reset Wellness — project guide for Claude

Static, bilingual website for **Reset Wellness**, a membership-based beauty & wellness studio
at Auguststraße 88, 10117 Berlin. Founders: Laura Guegan & Lysa Gouffie.
The design was approved by the client; keep changes faithful to it unless asked otherwise.

## Tech
- Plain HTML, CSS and vanilla JS. No framework, no build step, no package manager.
- Preview: `python3 -m http.server 8000` in the repo root → http://localhost:8000
- Hosting target: any static host (GitHub Pages works from `main`, root folder).

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
- Keep it accessible: real `<a>`/`<button>`, alt text on images, visible focus, ≥ 44px touch targets.

## Brand
- Colours: burgundy `#580a20`, deep red `#6b0b0c`, brown `#362017`, cream `#f7ede0`, blush accent `#ecd3c3`.
  Burgundy leads; brown and cream support it. Buttons: brown pill + cream text on light backgrounds,
  cream pill + brown text on dark backgrounds.
- Fonts: **Hagrid Bold** for headings only, **Glacial Indifference** for all other text.
  Currently loaded via `local()` with fallbacks Bricolage Grotesque / Jost (Google Fonts).
- Look: burgundy glazed-tile texture, frosted-cream glass cards, rounded "sheet" sections, soft scroll reveals.

## Open before launch
- Add licensed web font files to `assets/fonts/` and `url(...)` sources to the `@font-face` rules in `site.css`
  (Hagrid needs a web licence).
- Booking: the owners are setting up **Fresha**. Point the "Book now" buttons (now → contact page) at the Fresha link
  and add Fresha to the privacy policy (section 5, `[BOOKING TOOL]` / `[BUCHUNGSTOOL]`).
  The contact form was removed from the contact page and the privacy policy; its JS in `site.js` is unused.
- Replace placeholders in square brackets: `[PRICE]`, `[TIME]`, `[+49 PHONE]`,
  Impressum details (VAT ID, photo credits), Instagram handle.
- Higher-resolution photos (hero ≥ 2000 px wide) and team photos on the About pages.
- Map on the contact page: embed only after consent (GDPR).
- Legal texts are drafts — need a lawyer's review. Before memberships launch, add a real
  cancellation page and put a "Verträge hier kündigen" / "Cancel contract here" link back in every footer (§ 312k BGB).
  The footer link was removed while memberships are "coming soon".
