# 3. Prerender everything; load heavy deps client-only

- **Status:** Accepted
- **Date:** 2026-06

## Context

The course is static content that benefits from instant loads and SEO. It also embeds the **Monaco**
editor and a **Tailwind browser** compiler, both large and browser-only.

## Decision

Set `prerender = true` site-wide; the dynamic lesson route exports `entries()` so every page is
emitted as static HTML. Import Monaco and `@tailwindcss/browser` **only inside `onMount`** (never
during SSR/prerender), and reserve their layout space to avoid layout shift. A service worker
precaches the build for offline use.

## Consequences

- Real static HTML pages: fast, cacheable, crawlable; deployable to any static host via
  `adapter-auto`.
- Heavy editors never block first paint and never run during prerender.
- Theme is reconciled before paint via an inline `app.html` script to avoid FOUC.
- Tradeoff: interactive widgets hydrate after load — acceptable since lesson prose is the primary
  content and is in the prerendered HTML.
