# Tanga Banana Garden

Marketing, bookings, and contact capture for a working banana, coffee, and spice farm in Tanga, Tanzania. The site is built on Next.js (App Router) with Payload CMS providing the admin, auth, storage, and email workflows.

## What’s inside
- Next.js 15 (App Router) + React 19 + TypeScript
- Payload CMS 3 with the Postgres adapter and Nodemailer email transport
- UI: Tailwind CSS + MUI, Lexical rich text
- Booking modal and public API for farm tour reservations
- Contact form API with email notifications and CRM-style inbox in Payload
- MJML email templates (compiled with `bun`) for booking and contact confirmations
- Tests: Vitest (unit) and Playwright (E2E)

## Core features
- Farm tour bookings: `/api/tours/reservations` creates `tour-reservations` entries and sends guest + internal notifications.
- Contact enquiries: `/api/contact` creates `contact-messages`, replies to the sender, and notifies the team.
- Admin at `/admin`: manage reservations, contact messages, and users (auth-enabled).
- Live preview endpoint at `/next/preview` gated by `PREVIEW_SECRET`.
- Sitemaps at `/pages-sitemap.xml` and `/posts-sitemap.xml` driven by Payload content.

## Project structure (high level)
- `src/app/(frontend)` — public site pages, APIs for contact/preview, and marketing sections.
- `src/app/(payload)` — Payload admin app, collections, fields, and admin components.
- `src/providers` — booking modal, notifications, and shared client providers.
- `src/mjml` — MJML templates compiled for transactional emails.
- `src/utilities` — API helpers, constants, and shared utilities.
- `src/payload.config.ts` — main Payload configuration (collections, db, email, plugins).

## Environment
Copy `.env.example` to `.env` and fill these values:
- `DATABASE_URL` — Postgres connection string (required; the project uses the Postgres adapter).
- `PAYLOAD_SECRET` — secret used to sign JWTs.
- `NEXT_PUBLIC_SERVER_URL` — base URL without trailing slash (used for links and image domains).
- `CRON_SECRET` — bearer token to authorize scheduled jobs.
- `PREVIEW_SECRET` — token required by `/next/preview`.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — SMTP credentials for Nodemailer.
- `BOOKING_NOTIFICATION_EMAIL` — where booking alerts are sent (fallback: `SMTP_TO` or `SMTP_USER`).
- `CONTACT_NOTIFICATION_EMAIL` — where contact alerts are sent (fallback: `SMTP_TO` or `SMTP_USER`).
- Optional: `SMTP_TO`, `VERCEL_PROJECT_PRODUCTION_URL`.

> The included `docker-compose.yml` still points at Mongo from the upstream template; use a Postgres service instead or run against a managed Postgres instance.

## Getting started
- `pnpm install`
- `cp .env.example .env` and update values (use Postgres for `DATABASE_URL`)
- `pnpm dev` → http://localhost:3000 (admin at `/admin`)
- After schema changes run `pnpm generate:types` and, if you add or move admin components, `pnpm generate:importmap`.

## Useful scripts
- `pnpm dev` — start Next + Payload in development.
- `pnpm build` then `pnpm start` — production build and serve.
- `pnpm lint` / `pnpm lint:fix` — lint the codebase.
- `pnpm test:int` — unit/integration tests (Vitest).
- `pnpm test:e2e` — end-to-end tests (Playwright).
- `pnpm mjml:build` — compile MJML email templates (requires `bun`).

## Admin data model
- `users` — auth-enabled collection for admin access.
- `tour-reservations` — public create; authenticated read/update/delete; generates confirmation code and emails.
- `contact-messages` — public create; authenticated read/update/delete; notifies sender and team.
- (Media collection exists in code but is not currently registered in `src/payload.config.ts`; add it to `collections` if uploads are needed.)

## Deployment notes
- Ensure the image domain in `next.config.js` matches `NEXT_PUBLIC_SERVER_URL`.
- Provide a Postgres database in production; the adapter expects a valid `DATABASE_URL`.
- Set SMTP and notification emails before enabling bookings or contact forms in production.
- If you enable additional Payload collections or admin components, regenerate types and the import map.

## Known gaps / TODOs
- Legacy blog routes (`/posts`, sitemaps) remain from the template; re-enable the related collections before using them or remove the routes.
- The bundled docker-compose file uses Mongo; replace with Postgres or update to match your environment.

## Support
Open an issue in this repo or contact the team if you hit setup or deployment problems.***
