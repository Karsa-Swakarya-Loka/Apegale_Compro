# AGENTS.md — Website Company Profile Ape Gale Indonesia

You are building the new **apegale.com**: a bilingual (Indonesian default, English) company-profile website for PT Ape Gale Indonesia, an expatriate-permit and manpower-supply company. Design, content and CMS decisions are already made. Your job is to implement them faithfully, not to redesign.

## Read first (in this order)
1. `docs/01-brief.md` — scope, decisions, what is in and out.
2. `design/README.md` — the brand book: colour, type, layout, imagery, copy rules. **Binding.**
3. `design/index.html` → open every `design/components/<Name>/preview.html` and its `README.md`. These are the visual source of truth.
4. `docs/02-sitemap-dan-template.md` — routes, templates, section order, old-URL redirects.
5. `docs/03-cms-payload.md` — Payload collections/globals and fields.
6. `content/seed/*.json` — real content (ID + EN) to seed the CMS.
7. `docs/04-acceptance.md` — definition of done.
8. `docs/00-riset-uiux.md` — background research (context only).

## Stack (fixed)
- **Next.js (App Router, TypeScript)** + **Payload CMS 3** in the same app (`create-payload-app`, blank template). Use current stable versions at install time and pin them in `package.json`.
- Database: **PostgreSQL** (`@payloadcms/db-postgres`). If the client's hosting has no Postgres, switch to `@payloadcms/db-sqlite` — keep the adapter behind one config line.
- Media: local disk uploads via Payload `upload` collection; images rendered with `next/image`.
- Styling: **plain CSS using the provided tokens**. Copy `design/tokens.css` and `design/components.css` into the app (e.g. `src/styles/`) and build React components that output the same `ag-*` class names and markup as the previews. No Tailwind, no UI kit, no CSS-in-JS.
- Fonts: Jost (display) + Source Sans 3 (body) via `next/font/google`, mapped to `--font-display` / `--font-body`. Remove the Google Fonts `@import` from `components.css` once `next/font` is wired.
- Icons: `lucide-react` (stroke 2). WhatsApp glyph: the inline SVG in `design/components/WhatsAppFloat/preview.html`.
- i18n: Payload field localization (`locales: ['id','en']`, `defaultLocale: 'id'`, fallback on). Routes: Indonesian at `/…`, English at `/en/…` (see docs/02).

## Hard rules
- **Use tokens, never raw values.** Every colour, radius, spacing, shadow and font comes from `var(--…)` in `tokens.css`. If a value is missing, add it to `design/tokens.json` + regenerate `tokens.css`; do not hard-code.
- **Never invent content.** Testimonials, prices, statistics, client logos, legal text and news come only from `content/seed/` or the CMS. Placeholders stay visibly marked (`ag-sample`) and the related section hides itself when the CMS has no published entries.
- Official facts (do not change): 20+ years experience · 35+ cities · phone (021) 5092 8670 · WhatsApp 0811 9996 286 (`https://wa.me/628119996286`) · email apegale.admin@apegale.com · address Ascott Sudirman Jakarta, Affirmate Floor 31st Ciputra World II, Jl. Prof. Dr. Satrio Kav. 11, Karet Kuningan, Setiabudi, Jakarta Selatan.
- **Six services only**, in this order: Broad Expatriate Hosting, Expatriate Formalities, Layanan Visa & Paspor (EN: Visa & Passport Services; took the former Manpower Supply slot on 22 Oct 2026, Manpower Supply is not offered), Legalitas Perusahaan (EN: Company Legalities), Airport Escort, HR System & Consulting. Service names stay English in both languages except Legalitas Perusahaan and Layanan Visa & Paspor.
- **Client logos: exactly the 11 from the 2026 company profile** (list in `content/seed/clients.json`). Never add Affirmate's own client list.
- **GARIS** (the company's app) is shown but its Login / Free-trial are inactive: render them as disabled "Segera Hadir / Coming Soon" buttons plus a WhatsApp CTA. Their URLs and an `enabled` flag live in the CMS so they can be switched on later without code.
- Language toggle: the pill in `design/components/LanguageToggle`. Switching keeps the user on the equivalent page in the other locale, without a full reload (client navigation), stores the choice in `localStorage` (`apegale-language`), and updates `<html lang>`.
- Light theme only for the public site (dark tokens exist for later; do not ship a theme switcher).
- Accessibility: WCAG 2.2 AA. Visible focus (`--focus`), 44px touch targets, semantic landmarks, `alt` from CMS (localized), forms with labels and error text.
- Do not use any image from `reference/` in production; those are research screenshots. Production images come from `design/assets/` or the CMS.
- The stock handshake photo with a Shutterstock watermark (company profile p.8) must never be used.

## Working agreement
- Build in this order and keep the app runnable after each step: (1) project + Payload + collections/globals + seed script, (2) layout shell: Header, Footer, WhatsAppFloat, LanguageToggle, (3) Home, (4) Layanan + Detail Layanan + Price list, (5) Tentang Kami, (6) GARIS, (7) Regulasi + News (list/detail), (8) Hubungi Kami + form → email, (9) SEO, redirects, sitemap, (10) QA against `docs/04-acceptance.md`.
- Seed with `pnpm seed` (or `npm run seed`) from `content/seed/*.json`; re-runnable without duplicates (upsert by slug).
- Compare each page visually with the component previews at 1440px and 390px before calling it done.
- When a requirement is unclear, add it to `docs/OPEN-QUESTIONS.md` and continue with the most conservative option; do not invent business facts.
- Commands to keep working: `dev`, `build`, `lint`, `typecheck`, `seed`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
