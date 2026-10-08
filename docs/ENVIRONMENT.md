# Environment — Margin / Form

This document records the workspace environment used to build and run the
demonstration. It is honest about what is configured and what is not.

---

## Operating system

Linux sandbox. The project was built and verified in a sandboxed Linux
environment. No macOS- or Windows-specific tooling is assumed.

---

## Runtime and package manager

- **Runtime:** Bun.
- **Package manager:** Bun (`bun install`, `bun run dev`, `bun run lint`).
- **Node compatibility:** The project targets Node 18+ for compatibility with
  Next.js 16. In this workspace, Bun is the actual runtime; Node is not
  invoked directly.

---

## Framework versions

- **Next.js:** 16.1.x (App Router, Turbopack dev server).
- **React:** 19.
- **TypeScript:** 5 (strict mode).
- **Tailwind CSS:** v4 (CSS-based configuration).
- **shadcn/ui:** New York style primitives, installed under
  `src/components/ui/`.
- **Prisma:** installed (`src/lib/db.ts`) but not used to source content.

---

## Dev server

```bash
bun run dev
```

Serves the site at `http://localhost:3000`. The dev script pipes output to
`dev.log` via `tee` for debugging. Turbopack is used by default in
Next.js 16.

---

## What is intentionally not run

- **`bun run build`** — intentionally not used in this workspace per
  environment rules. The dev server is the only supported run target here.
  A production build has not been run, so production-bundle sizes,
  production Lighthouse scores, and production-only metadata are not
  available. Documenting a Lighthouse score without running a production
  build would be fabrication.
- **`bun run start`** — depends on `bun run build`, so also not used.

---

## Tooling available in this workspace

- **Browser automation:** the `agent-browser` skill is available for
  headless page inspection and interaction. Used during development to
  verify routes render.
- **Image generation:** an image-generation capability is available but was
  **not used**. All visuals in the final build are CSS or SVG. See
  `docs/ASSET_LICENSES.md`.
- **Web search / web reader:** available, used for reference during
  development where needed.

---

## Tooling not available in this workspace

- **Playwright / axe:** not installed. Automated E2E and accessibility scans
  are a documented limitation. Manual keyboard review is the recommended
  substitute. The site includes a "Skip to content" link, visible focus
  styles, labelled form inputs, and reduced-motion-aware animations.
- **Lighthouse:** not run (no production build).
- **Vercel CLI / Vercel account:** not configured. No deployment tooling is
  set up.
- **Whop account / Whop credentials:** not configured. `PAYMENTS_MODE`
  defaults to `demo`. The hosted-mode handoff has not been exercised against
  a real Whop account. See `docs/WHOP_INTEGRATION.md`.
- **Kit / ESP account:** not configured. Newsletter and contact forms
  simulate submission. See `docs/FEATURE_INVENTORY.md`.
- **Email delivery (transactional):** not configured.
- **Database:** Prisma is installed but no database is provisioned or
  migrated. `src/lib/db.ts` is present as an extension point.

---

## Environment variables

The only environment variable the site reads at runtime is `PAYMENTS_MODE`
(default `demo`). When set to `hosted`, the site also reads the seven
`WHOP_CHECKOUT_*` variables listed in `docs/WHOP_INTEGRATION.md`. None of
these are configured in this workspace; the site runs in demo mode.

There are no other required environment variables. The site does not read
any analytics provider keys, ESP keys, or CMS tokens.

---

## Deployment

No deployment tooling is configured. The project is Vercel-ready (standard
Next.js App Router) but no Vercel account is connected and no deployment URL
has been verified. The `metadataBase` in `src/app/layout.tsx` and the `base`
in `src/app/sitemap.ts` are both set to the placeholder
`https://marginform.example`; both must be updated before any real
deployment. The `robots.ts` disallows all indexing by default for the
demonstration; update it before deploying a real instance.

---

## Reproducing the workspace

To reproduce the environment:

1. Use a Linux sandbox with Bun installed.
2. Clone the repository.
3. `bun install`.
4. `bun run dev` and open `http://localhost:3000`.
5. `bun run lint` to verify the codebase.

To activate hosted checkout (requires your own Whop account):

1. Set `PAYMENTS_MODE=hosted`.
2. Set the seven `WHOP_CHECKOUT_*` variables with real Whop hosted-checkout
   URLs.
3. Restart the dev server.

See `docs/WHOP_INTEGRATION.md` for the full activation guide.
