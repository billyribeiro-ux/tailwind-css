export interface GlossaryTerm {
	term: string;
	definition: string;
}

/** Key vocabulary used throughout the course, in plain English. */
export const glossary: GlossaryTerm[] = [
	{
		term: 'Utility-first',
		definition:
			'A methodology where UI is composed from small, single-purpose classes in the markup rather than bespoke, named CSS rules.'
	},
	{
		term: 'Utility class',
		definition: 'A class that maps to one small slice of CSS, e.g. `pt-4` → padding-top: 1rem.'
	},
	{
		term: 'Arbitrary value',
		definition:
			'A one-off value in square brackets when the scale lacks it, e.g. `top-[117px]`. Use sparingly; repeated ones should become tokens.'
	},
	{
		term: 'Design token',
		definition:
			'A named design decision (colour, spacing, radius) stored once and referenced everywhere. In v4 these live in `@theme`.'
	},
	{
		term: 'Primitive token',
		definition:
			'A token describing a raw value (`--color-blue-500`). Rarely used directly by components.'
	},
	{
		term: 'Semantic token',
		definition:
			'A token describing purpose (`--color-accent`, `--color-surface`). Components consume these so theming is a remap, not a rewrite.'
	},
	{
		term: '@theme',
		definition:
			'The Tailwind v4 directive that defines theme variables which become both CSS custom properties and utilities.'
	},
	{
		term: '@apply',
		definition:
			'A directive that inlines utilities into a CSS class. Useful for HTML you don’t render; usually beaten by component extraction.'
	},
	{
		term: '@utility',
		definition:
			'The v4 directive for registering your own variant-compatible custom utility in CSS.'
	},
	{
		term: 'Variant',
		definition:
			'A prefix that conditions a utility, e.g. `hover:`, `md:`, `dark:`, `group-hover:`. You can author custom ones with `@custom-variant`.'
	},
	{
		term: 'Breakpoint',
		definition:
			'A min-width threshold (`sm`, `md`, `lg`, `xl`, `2xl`) that activates responsive variants.'
	},
	{
		term: 'Mobile-first',
		definition:
			'Designing the base (unprefixed) styles for small screens, then layering larger-screen overrides with breakpoint prefixes.'
	},
	{
		term: 'group / peer',
		definition:
			'Mechanisms to style an element based on the state of a parent (`group`) or a sibling (`peer`).'
	},
	{
		term: 'Container query',
		definition:
			'A query that responds to an element’s container width (`@container` + `@md:`), not the viewport — enabling truly portable components.'
	},
	{
		term: 'Logical property',
		definition:
			'Direction-aware spacing (`ms`, `me`, `ps`, `pe`, `start`, `end`) that mirrors automatically in right-to-left layouts.'
	},
	{
		term: 'Subgrid',
		definition:
			'A grid feature letting a child grid align to its parent’s tracks — ideal for aligning content across sibling cards.'
	},
	{
		term: 'cn()',
		definition:
			'A helper combining clsx (conditional classes) and tailwind-merge (conflict resolution) so component class overrides win deterministically.'
	},
	{
		term: 'Recipe',
		definition:
			'An opinionated, variant-driven component (Button, Card) built on semantic tokens — the reusable unit of a design system.'
	},
	{
		term: 'Preflight',
		definition:
			'Tailwind’s base reset that normalises browser defaults (including `box-sizing: border-box`).'
	},
	{
		term: 'JIT engine',
		definition:
			'The engine that scans your source and generates only the utilities you actually use, keeping CSS small.'
	},
	{
		term: 'FOUC',
		definition:
			'Flash Of Unstyled (or wrong-themed) Content — avoided for theme by setting the `dark` class before first paint.'
	},
	{
		term: 'prose',
		definition:
			'The typography plugin’s class that styles raw long-form HTML (from markdown/CMS) with readable defaults.'
	}
];
