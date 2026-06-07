# Architecture

This document explains how **Tailwind Mastery** is put together and why. For the reasoning behind
specific choices, see the Architecture Decision Records in [`docs/adr/`](./docs/adr).

## Overview

A SvelteKit app that is **data-driven** and **prerendered**. One curriculum data structure drives
the entire experience; lesson prose is authored separately as mdsvex; everything else (navigation,
sidebar, search, progress, prerender list) is derived.

```
curriculum.ts ─┬─► navigation (prev/next, entries, flatten)
               ├─► sidebar + command-palette search index
               ├─► projects index + showcase links
               └─► prerender entries()  ──►  static HTML per lesson

content/**.svx ──► import.meta.glob ──► dynamic lesson route renders the matched component
```

## Layers (the dependency rule)

Dependencies point **downward only** — the same rule the course teaches in Module 10:

1. **Primitive tokens** — raw values (`layout.css` `@theme`).
2. **Semantic tokens** — intent (`surface`, `ink`, `accent`); the contract components consume.
3. **Recipes / components** — `CodeBlock`, `Playground`, `Exercise`, `Quiz`, … (`src/lib/components`).
4. **Application** — routes compose components; they never redefine tokens.

The CSS cascade enforces precedence structurally via `@layer theme, base, components, utilities`
(later layers win regardless of specificity).

## Key directories

| Path                    | Responsibility                                                             |
| ----------------------- | -------------------------------------------------------------------------- |
| `src/lib/course/`       | Curriculum (source of truth), navigation, search, integrity test           |
| `src/lib/content/`      | Lesson prose as `<module>/<lesson>.svx`                                    |
| `src/lib/components/`   | Teaching + shell components                                                |
| `src/lib/reference/`    | Cheatsheet + glossary data                                                 |
| `src/lib/monaco/`       | Client-only Monaco setup + shared live-preview builder                     |
| `src/lib/stores/`       | Theme, progress (XP/streak), command-palette UI state (runes)              |
| `src/service-worker.ts` | Offline PWA caching                                                        |
| `src/routes/`           | Pages: landing, learn, projects, showcase, reference, certificate, sitemap |

## Invariants (enforced, not hoped)

- **Content integrity** — `course/content.spec.ts` fails CI if curriculum and `.svx` files drift.
- **Strict types** — `svelte-check` runs with strict TS; zero errors required.
- **Accessibility** — axe component audit; decorative icons hidden via `IconContext`; visible focus.
- **Quality gate** — CI runs lint + check + test + build on Node 24.16.0 (`.github/workflows/ci.yml`).

## Theming

Semantic tokens are CSS variables; dark mode and any brand are **variable overrides under a scope**
(`.dark`, `[data-brand]`). Theme is applied before first paint by an inline script in `app.html` to
avoid a flash of the wrong theme.

## Adding a lesson

1. Add an entry to the module's `lessons` array in `src/lib/course/curriculum.ts`.
2. Create `src/lib/content/<module>/<lesson>.svx`.
3. `pnpm test` (content-integrity) and `pnpm build` will confirm it's wired correctly.
