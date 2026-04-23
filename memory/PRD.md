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

## What's been implemented (2026-04 — French translation rollout, iteration 3)
- Expanded `/app/frontend/src/lib/i18n.js` with a full FR/EN dictionary covering: nav, CTAs, hero, Home (7 sections incl. problem / why / explore items / sample / about short / resources preview cards), Book (hero / core idea / gap / gains / sample / testimonials / formats / CTA), Resources (header + 3 cards + CTA), Tools (header + note + CTA), About (bio + CTA), Contact (full form copy), CTA section defaults, footer, testimonials, login, admin.
- Rewrote `Home.jsx`, `Book.jsx`, `Resources.jsx`, `Tools.jsx`, `About.jsx`, `Contact.jsx`, and `CTASection.jsx` to pull every visible string from `useLang().t.*` (no more hardcoded EN on translated pages).
- Quotes page inline EN/FR copy preserved; final CTA on Quotes now uses i18n defaults.
- Verified end-to-end by toggling FR in the live preview — all headlines render in French (LE LIVRE, RESSOURCES, OUTILS, À PROPOS DE L'AUTEUR, CONTACT), along with nav, buttons, form labels, sub-copy, and format/language metadata ("Imprimé · Autres formats à venir").

## What's been implemented (2026-04 — Supabase migration, iteration 2, 24/24 backend tests passing)
- Migrated data layer from MongoDB (motor) → Supabase Postgres (SQLAlchemy async + asyncpg).
- Added `/app/backend/database.py` (async engine w/ `statement_cache_size=0` for transaction pooler), `/app/backend/models.py` (Lead, ContactMessage ORM).
- Alembic initialized at `/app/backend/alembic/` with initial migration (tables + indexes on email/created_at/locale) applied to Supabase.
- `DATABASE_URL` set in `/app/backend/.env` (Transaction Pooler URI, port 6543).
- `server.py` rewritten to use SQLAlchemy async sessions via `Depends(get_db)`. Public + admin endpoints fully functional against Supabase.
- Verified end-to-end: lead create, contact create, admin login (cookie + bearer), admin leads/contacts list, admin stats (locale breakdown).
- Fixed `Tools.jsx` compile error (was importing missing `TOOLS` constant after FR i18n refactor — now uses `TOOLS_EN`/`TOOLS_FR` with `useLang()`).
- Updated Admin dashboard VERSION card label from "MongoDB · Motor" → "Supabase · SQLAlchemy".

## Placeholders the user must provide
- **AMAZON_BOOK_URL** in `/app/frontend/src/lib/constants.js` (currently `https://www.amazon.com/dp/PLACEHOLDER_ASIN`).
- **First-3-chapters PDF** → upload to `/app/frontend/public/assets/who-are-my-clients-first-3-chapters.pdf` *or* update `CHAPTERS_PDF_URL` in constants to a hosted URL.
- **Real testimonials** → `TESTIMONIALS` array in constants.
- **Real phone & email** → `CONTACT` object in constants.

## Prioritized backlog
### P0 (blocking before launch)
- Swap Amazon URL + PDF + contact details + real testimonials.

### P1 (next phase)
- Wire translated strings into `Quotes.jsx` inline `copy` object via `t.quotes.*` keys (currently hardcoded inline for EN/FR — works, but centralizing it would match the rest of the app).
- Email automation: send lead the PDF via Resend/SendGrid instead of direct browser download.
- Admin view: add CSV export of leads.
- Real article + quote content for Resources page (currently "Coming soon").
- Return 201 Created on POST /api/leads and /api/contact for REST correctness (minor).

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
