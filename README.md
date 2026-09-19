# Tricom Consultants

Responsive Bootstrap 5.3.8 website: six main pages and six ISO detail pages. Runtime assets are local; no framework or Node process is needed to serve the generated site.

## Preview and build

Preview: http://127.0.0.1:8095/

Start the local server if needed:

    php -S 127.0.0.1:8095 -t D:\xampp\htdocs\tricom.in

After changing source content or templates:

    node scripts/build.cjs

The builder writes all 12 HTML pages and assets/js/site-config.js. Edit source files rather than generated output.

## Folder structure

- *.html: ready-to-serve pages, including iso-9001.html, iso-14001.html, iso-45001.html, iso-27001.html, iso-22000.html and iso-50001.html.
- assets/css/: shared design and ISO detail styles.
- assets/js/: interactions and generated public configuration.
- assets/images/: office photo and temporary logo.
- assets/vendor/bootstrap/: local Bootstrap runtime.
- src/site.json: contact information and demo settings.
- src/standards.json: single source for certification cards, popups and full detail content.
- src/ui.cjs: shared icons and UI helpers.
- src/partials.cjs: shared header, footer and dialogs.
- src/sections.cjs: reusable homepage and inner-page sections.
- src/detail.cjs: shared ISO detail-page template.
- src/render.cjs: page composition and metadata.
- scripts/build.cjs: dependency-free static builder.
- scripts/check.cjs: reusable local browser verification.

Unused legacy CSS/JS and the temporary review folder have been removed. Browser screenshots and preview logs now go to the system temporary directory.

## Future WordPress conversion

The website remains static for now. Content, layout sections, header/footer and assets are separated so they can be carried into a future WordPress theme. Each certification has its own stable slug and shared detail template. This structure reduces duplicated content during that conversion; it is not an installed WordPress theme.

## Contact and sample content

Dummy contact details and clearly labelled sample testimonials remain enabled with demo=true. No form data is sent or stored in demo mode.

Update src/site.json with official email, phone, city and WhatsApp number, then rebuild. WhatsApp uses international digits including the country code. When demo=false, the enquiry form opens a mailto draft for the visitor to send; automatic email delivery requires a backend integration.

Sample testimonials are omitted when demo=false unless approved entries are supplied in a testimonials array with quote, name, role and initials. Replace illustrative projects and the temporary logo with approved business content before launch.

## Browser verification

    node scripts/check.cjs

The check uses the workspace Playwright installation and Chrome. Optional environment variables: PLAYWRIGHT_MODULE, CHROME_PATH, TRICOM_BASE_URL. It checks all 12 pages, local assets/anchors, responsive layouts, detail navigation, modal links and the enquiry preview flow.

## Deployment

Upload only the generated HTML pages and assets/. Keep src/, scripts/ and this README as development resources. Live hosting has not been changed.

## Assets and content

Bootstrap: https://getbootstrap.com/ (MIT license headers retained).
Office stock photo: https://images.unsplash.com/photo-1497366754035-f200968a6e72
The photo is decorative and is not presented as Tricom premises.
Each ISO detail page links to the official ISO overview used for its general description.
Tricom is presented as a consultancy; certification decisions belong to an independent certification body.

## Awards & Recognition

awards.html uses src/awards.cjs and is linked from the navigation and footer. Demo entries are explicitly labelled samples. To show real entries, set demo=false and supply an awards array in src/site.json with title, category, issuer, year, description and an optional icon (star, people or shield). Without approved entries, live mode displays an empty portfolio message. Rebuild after changes.
"# tricom.in" 
