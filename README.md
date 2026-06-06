# Tailwind Mastery

An interactive course that teaches **Tailwind CSS from absolute beginner to distinguished
engineer**, delivered as navigable HTML pages with next/previous controls. The app is itself
built with the stack it teaches around, so the course is its own best example.

- **12 modules · 65 lessons · 16 hands-on projects** (a project in every module + four capstones)
- Plain-English narration with **"Principal Insight"** callouts that teach Level 7+ judgement
- **Monaco editor** in every code block (copy-paste friendly) with an **"Open in Playground"**
  toggle that compiles Tailwind v4 live in a sandboxed preview
- Light/dark theming, persisted progress, and a fully responsive shell

## Stack

| Concern      | Choice                                              |
| ------------ | --------------------------------------------------- |
| Framework    | Svelte 5 (runes) + SvelteKit 2                      |
| Styling      | Tailwind CSS v4 via `@tailwindcss/vite` (CSS-first) |
| Icons        | `phosphor-svelte`                                   |
| Editor       | `monaco-editor` (client-only, Vite worker imports)  |
| Live preview | `@tailwindcss/browser` (compiles v4 in the iframe)  |
| Content      | mdsvex (`.svx`)                                     |
| Language     | TypeScript (strict)                                 |
| Tooling      | ESLint, Prettier (+ tailwind plugin), Vitest        |
| Adapter      | `@sveltejs/adapter-auto`                            |

## Requirements

- **Node 24.16.0** (see `.nvmrc` / `.node-version`)
- **pnpm 10+** (`packageManager` is pinned)

## Getting started

```sh
nvm use            # selects Node 24.16.0
pnpm install
pnpm dev           # http://localhost:5173
```

## Scripts

| Script         | What it does                              |
| -------------- | ----------------------------------------- |
| `pnpm dev`     | Start the dev server                      |
| `pnpm build`   | Prerender the whole course to static HTML |
| `pnpm preview` | Preview the production build              |
| `pnpm check`   | `svelte-check` under strict TypeScript    |
| `pnpm lint`    | Prettier + ESLint                         |
| `pnpm format`  | Apply Prettier                            |
| `pnpm test`    | Run the unit tests                        |

## How it's organised

```
src/
├── lib/
│   ├── course/        # curriculum data model + navigation (single source of truth)
│   ├── content/       # every lesson as an mdsvex .svx file: <module>/<lesson>.svx
│   ├── components/    # CodeBlock, Playground, Callout, Quiz, ProjectBrief, Sidebar, …
│   ├── monaco/        # client-only Monaco setup
│   ├── stores/        # theme + progress (Svelte 5 runes, persisted)
│   └── utils/         # cn() class composition
└── routes/
    ├── +page.svelte                       # landing / learning path
    ├── projects/+page.svelte              # all projects & capstones
    └── learn/[module]/[lesson]/           # dynamic lesson route (prerendered)
```

The curriculum in `src/lib/course/curriculum.ts` drives everything: the sidebar, prev/next,
progress, the projects index, and the list of pages to prerender. To add or reorder lessons,
edit the curriculum and add the matching `.svx` file under `src/lib/content/`.
