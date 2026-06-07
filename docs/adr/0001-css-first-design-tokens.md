# 1. CSS-first design tokens (`@theme`)

- **Status:** Accepted
- **Date:** 2026-06

## Context

We need a single source of truth for design decisions (colour, spacing, radius, type) that is usable
at **runtime** for theming (dark mode, multi-brand) and authored in the platform's own language.

## Decision

Define all design tokens in CSS via Tailwind v4's `@theme` directive. Separate **primitive** tokens
(raw values) from **semantic** tokens (intent: `surface`, `ink`, `accent`). Components consume
**semantic** tokens only; they never reference primitives or raw colours.

## Consequences

- Runtime theming (dark mode, per-brand overrides) is a remap of variables under a scope — no JS
  theme config, no rebuild.
- A rebrand changes seed tokens; everything re-derives.
- Discipline required: a lint/review bar to keep primitives out of component code.
- Tradeoff: an extra indirection layer that pays for itself the first time the brand changes.
