# Oman Computing Society — Website

The public website for the Oman Computing Society (OCS), a student-led technology
community. It is a single-page, statically rendered marketing site: no backend,
no database, no authentication. Visitors learn what OCS is and join the community
through WhatsApp.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional; sensible defaults are built in
npm run dev
```

The site runs at http://localhost:3000.

| Script              | Purpose                                    |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Development server                         |
| `npm run build`     | Production build (required before release) |
| `npm run start`     | Serve the production build                 |
| `npm run lint`      | ESLint                                     |
| `npm run typecheck` | TypeScript, no emit                        |

## Stack

Next.js 16 (App Router) · React 19 · TypeScript 5 (strict) · Tailwind CSS 4 ·
Motion · Lucide · Geist and Instrument Serif via `next/font`.

## Editing content

No code changes are needed for routine content updates. Everything visitors read
lives in two places.

- `src/config/site.ts` — organisation name, description, mission, and every
  outbound URL.
- `src/data/` — `stats.ts`, `programs.ts`, `events.ts`, `partners.ts`, `about.ts`.

To feature a different event, replace the `featuredEvent` object in
`src/data/events.ts`. The section reads every field generically, including
`status`, so no layout changes are required. Setting `status` to
`registration-open` with a `registrationUrl` reveals a Register button.

## Configuration

URLs come from environment variables with built-in fallbacks, so the site works
out of the box. See `.env.example`.

Channels without a configured URL — LinkedIn, Instagram, and the contact email —
are **omitted from the UI entirely** rather than rendered as dead links. Set
`NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_INSTAGRAM_URL`, or
`NEXT_PUBLIC_CONTACT_EMAIL` and they appear in the footer automatically. Setting
a contact email also switches the partnership call to action from WhatsApp to a
pre-addressed mail link.

Never place secrets in a `NEXT_PUBLIC_` variable; they are shipped to the browser.

## Design system

All design tokens are declared once in the `@theme` block of
`src/app/globals.css`. Components reference token names, never raw hex values.

- **Colour** — a warm near-black canvas (dark, the default) or warm paper
  (light), with three surface tones a few percent apart, off-white or near-black
  type, and a single amber accent used as a precision mark. Red and green are
  reserved for semantic status and are never used as brand colours. The theme
  toggle in the navbar persists to `localStorage` under `ocs-theme`.
- **Type** — Geist Sans throughout, Geist Mono for the technical layer (labels,
  indices, metadata), and one Instrument Serif italic phrase per heading. That
  serif emphasis is the site's typographic signature; use it once per heading.
- **Motion** — four durations and two easings, defined in `src/lib/motion.ts`.
  Animation is transform and opacity only.

## Accessibility

Targets WCAG 2.2 AA. Every text and surface pairing was checked for contrast,
focus is always visible, and the page is fully keyboard operable.

Reduced motion is honoured through `usePrefersReducedMotion`, which reads the
media query as an external store. Under that preference, entrance animations
resolve instantly and counters render their final value. There is also a global
CSS backstop in `globals.css`.

## Structure

```
src/
├── app/          layout, page, metadata, sitemap, robots, icon, OG image
├── components/
│   ├── sections/ the nine page sections
│   ├── ui/       shared primitives
│   └── visual/   decorative grid, glow, and grain layers
├── config/       site.ts
├── data/         page content
├── hooks/        reduced motion, active section, count-up
└── lib/          motion tokens, class utility
```

## Before deploying

Confirm `npm run build` and `npm run lint` both pass, set
`NEXT_PUBLIC_SITE_URL` to the production origin so metadata and the sitemap
resolve correctly, and verify the WhatsApp invitation still accepts new members.
