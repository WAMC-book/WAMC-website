# PRD — Who Are My Clients? (book-first website)

## Original problem statement
Book-first website for **Who Are My Clients?** by Antoine B. Carrière.
Primary CTA: *Buy the book* (external Amazon link).
Secondary CTA: *Get the first 3 chapters* (form → DB → PDF download).
Tone: grounded, reflective, user-focused, non-promotional (ABCarriere writer persona).
Design: clean, mainly white, modern, minimal. Colors: `#00adff`, `#45494c`, `#7f7d80`.
Target: entrepreneurs, early-stage founders, people thinking about starting a business.
User will deploy to GitHub + Vercel (frontend) + Supabase (DB) later.

## Architecture (current — Emergent preview)
- **Frontend**: React 19 + Tailwind + shadcn/ui. Fonts: Archivo Narrow (display) + Libre Franklin (body).
- **Backend**: FastAPI, all routes prefixed `/api`.
- **DB**: MongoDB via Motor (will be swapped for Supabase on deploy).
- **Routing**: client-side via react-router-dom; six pages.

## User personas
- Entrepreneurs who know their offer but not their client.
- Early-stage founders (0–2 years) seeking clarity.
- Aspiring entrepreneurs thinking about starting.
- Thoughtful readers who want reflection, not hype.

## Core requirements (static)
- 6 pages: Home, Book, Resources, Tools, About, Contact.
- Dual CTA repeated across site.
- Book cover visible above the fold (3D mockup).
- Leads form: first name, last name, email, entrepreneur role → saves to DB → triggers PDF download.
- Contact form: name, email, message → saves to DB.
- Tools page lists exactly 8 tools (no additions).

## What's been implemented (2026-02 — iteration 1, 100% tests passing)
- Full 6-page site with user-provided copy verbatim (Home has all 7 specified sections).
- Hero: "Most entrepreneurs know their offer better than they know their clients."
- Book cover: 3D mockup using user-supplied template image.
- Favicon + logo using user-supplied assets.
- `POST /api/leads`, `GET /api/leads`, `POST /api/contact`, `GET /api/contact`, `GET /api/resources` (with category filter).
- Chapter download modal with first_name/last_name/email/role select → `/api/leads` → auto-triggers PDF download.
- Contact form with validation → `/api/contact`.
- Primary CTA buttons link to Amazon (target=_blank) — placeholder ASIN.
- Navbar with 6 links + Buy button, mobile menu.
- Footer with site map + CTA.
- Testimonials (3 placeholder quotes — user to replace with real ones).
- All interactive elements have `data-testid` attributes.

## Placeholders the user must provide
- **AMAZON_BOOK_URL** in `/app/frontend/src/lib/constants.js` (currently `https://www.amazon.com/dp/PLACEHOLDER_ASIN`).
- **First-3-chapters PDF** → upload to `/app/frontend/public/assets/who-are-my-clients-first-3-chapters.pdf` *or* update `CHAPTERS_PDF_URL` in constants to a hosted URL.
- **Real testimonials** → `TESTIMONIALS` array in constants.
- **Real phone & email** → `CONTACT` object in constants.

## Prioritized backlog
### P0 (blocking before launch)
- Swap Amazon URL + PDF + contact details + real testimonials.

### P1 (next phase)
- Supabase migration: swap Motor DB calls for Supabase client; create `leads`, `contact_messages` tables.
- Email automation: send lead the PDF via Resend/SendGrid instead of direct browser download.
- Admin view: small page to export leads as CSV.
- Real article + quote content for Resources page (currently "Coming soon").

### P2 (nice-to-have)
- Newsletter opt-in.
- Blog-style article detail pages.
- Multi-language support (author name suggests possible FR variant).
- SEO meta per page, sitemap.xml.
- Open Graph preview image using book cover.

## Next tasks
1. User replaces placeholders (Amazon URL, PDF, testimonials, contact info).
2. Migrate DB layer to Supabase before Vercel deploy.
3. Add email delivery for chapter downloads.
