# 2. Data-driven course content

- **Status:** Accepted
- **Date:** 2026-06

## Context

The course has 70+ lessons across 13 modules. Hand-wiring routes, sidebar entries, prev/next, the
projects index, and the prerender list per lesson would be error-prone and would drift.

## Decision

Make `src/lib/course/curriculum.ts` the **single source of truth** for ordering and metadata. Author
lesson prose as mdsvex `.svx` files under `src/lib/content/<module>/<lesson>.svx`. A dynamic route
resolves the matching component via `import.meta.glob`; navigation, sidebar, search, progress and
prerender `entries()` are all **derived** from the curriculum.

## Consequences

- Adding/reordering a lesson is a one-line curriculum edit plus a content file.
- Everything stays consistent automatically.
- A **content-integrity test** (`content.spec.ts`) fails CI if the curriculum and `.svx` files drift
  apart, turning a whole class of mistake into a red build instead of a broken page.
- Tradeoff: one indirection (glob resolution) over hand-written routes — worth it past ~10 lessons.
