import type { Curriculum } from './types';

/**
 * The complete learning path: 12 modules from "never written a class" to
 * "leads a design-system organisation". Each module ends in a hands-on project;
 * the final module ends in four capstones.
 *
 * Keep this in sync with the mdsvex files under `src/lib/content/<module>/<lesson>.svx`.
 * The folder/file names must match `<module.slug>/<lesson.slug>`.
 */
export const curriculum: Curriculum = [
	{
		slug: 'foundations',
		index: 1,
		title: 'Foundations',
		tagline: 'The utility-first mindset and a real project setup',
		description:
			'Understand what Tailwind actually is, why utility-first won, and get a production-grade SvelteKit + Tailwind v4 project running on your machine.',
		difficulty: 'beginner',
		icon: 'rocket',
		lessons: [
			{
				slug: 'what-is-tailwind',
				title: 'What is Tailwind CSS?',
				summary: 'Utility-first CSS, the problem it solves, and the mental model.',
				duration: 12,
				kind: 'lesson'
			},
			{
				slug: 'project-setup',
				title: 'Setting Up Tailwind v4 with SvelteKit',
				summary: 'Install via the first-party Vite plugin and verify the toolchain.',
				duration: 15,
				kind: 'lesson'
			},
			{
				slug: 'your-first-utilities',
				title: 'Your First Utilities',
				summary: 'Read a class string and translate utilities to CSS in your head.',
				duration: 14,
				kind: 'lesson'
			},
			{
				slug: 'the-workflow',
				title: 'The Tailwind Workflow',
				summary: 'IntelliSense, the fast feedback loop, and how to read the docs.',
				duration: 10,
				kind: 'lesson'
			},
			{
				slug: 'project-profile-card',
				title: 'Project: Profile Card',
				summary: 'Build a polished, responsive profile card from a blank file.',
				duration: 30,
				kind: 'project'
			}
		]
	},
	{
		slug: 'core-utilities',
		index: 2,
		title: 'Core Utilities',
		tagline: 'The vocabulary you will use every single day',
		description:
			'Spacing, sizing, color, typography, borders and shadows — the high-frequency utilities that make up the bulk of real UI work.',
		difficulty: 'beginner',
		icon: 'palette',
		lessons: [
			{
				slug: 'spacing-and-sizing',
				title: 'Spacing & Sizing',
				summary: 'Padding, margin, width, height and the consistent spacing scale.',
				duration: 16,
				kind: 'lesson'
			},
			{
				slug: 'colors-and-backgrounds',
				title: 'Colors & Backgrounds',
				summary: 'The color system, opacity, gradients and background utilities.',
				duration: 15,
				kind: 'lesson'
			},
			{
				slug: 'typography-basics',
				title: 'Typography Basics',
				summary: 'Font size, weight, leading, tracking, alignment and color.',
				duration: 14,
				kind: 'lesson'
			},
			{
				slug: 'borders-radius-shadows',
				title: 'Borders, Radius & Shadows',
				summary: 'Borders, rounded corners, rings and elevation with shadows.',
				duration: 13,
				kind: 'lesson'
			},
			{
				slug: 'project-pricing-card',
				title: 'Project: Pricing Card',
				summary: 'Compose the core utilities into a convincing pricing card.',
				duration: 35,
				kind: 'project'
			}
		]
	},
	{
		slug: 'layout',
		index: 3,
		title: 'Layout',
		tagline: 'Flexbox, Grid and positioning without the guesswork',
		description:
			'Master the layout primitives: the display models, Flexbox, CSS Grid, and positioning — the skills that separate "it works" from "it holds up".',
		difficulty: 'beginner',
		icon: 'layout',
		lessons: [
			{
				slug: 'display-and-box',
				title: 'Display & the Box Model',
				summary: 'block, inline, the box model, and box-sizing in Tailwind.',
				duration: 13,
				kind: 'lesson'
			},
			{
				slug: 'flexbox',
				title: 'Flexbox',
				summary: 'Direction, alignment, wrapping, gap and growing/shrinking.',
				duration: 18,
				kind: 'lesson'
			},
			{
				slug: 'css-grid',
				title: 'CSS Grid',
				summary: 'Columns, rows, spans, gaps and auto-fit responsive grids.',
				duration: 18,
				kind: 'lesson'
			},
			{
				slug: 'positioning-and-zindex',
				title: 'Positioning & Z-Index',
				summary: 'relative, absolute, sticky, fixed, inset and stacking order.',
				duration: 14,
				kind: 'lesson'
			},
			{
				slug: 'project-photo-gallery',
				title: 'Project: Photo Gallery',
				summary: 'A responsive masonry-style gallery using Grid and Flexbox.',
				duration: 35,
				kind: 'project'
			}
		]
	},
	{
		slug: 'responsive-and-state',
		index: 4,
		title: 'Responsive & State',
		tagline: 'Mobile-first design and interactive variants',
		description:
			'Make interfaces adapt to any screen and react to user interaction with breakpoints, state variants, group/peer, and class-based dark mode.',
		difficulty: 'intermediate',
		icon: 'devices',
		lessons: [
			{
				slug: 'mobile-first-breakpoints',
				title: 'Mobile-First Breakpoints',
				summary: 'How responsive prefixes work and why mobile-first wins.',
				duration: 16,
				kind: 'lesson'
			},
			{
				slug: 'state-variants',
				title: 'State Variants',
				summary: 'hover, focus, active, disabled and focus-visible.',
				duration: 14,
				kind: 'lesson'
			},
			{
				slug: 'group-and-peer',
				title: 'Group & Peer',
				summary: 'Style elements based on parent and sibling state.',
				duration: 15,
				kind: 'lesson'
			},
			{
				slug: 'dark-mode',
				title: 'Dark Mode',
				summary: 'Class-based dark mode and designing two themes at once.',
				duration: 16,
				kind: 'lesson'
			},
			{
				slug: 'project-landing-page',
				title: 'Project: Responsive Landing Page',
				summary: 'A mobile-first marketing hero with dark mode and interaction.',
				duration: 45,
				kind: 'project'
			}
		]
	},
	{
		slug: 'typography-and-forms',
		index: 5,
		title: 'Typography & Forms',
		tagline: 'Readable content and accessible inputs',
		description:
			'Style long-form content with the typography plugin and build forms that are beautiful, stateful, and accessible to everyone.',
		difficulty: 'intermediate',
		icon: 'textT',
		lessons: [
			{
				slug: 'typography-plugin',
				title: 'The Typography Plugin',
				summary: 'Style markdown/CMS HTML with prose and its modifiers.',
				duration: 14,
				kind: 'lesson'
			},
			{
				slug: 'styling-forms',
				title: 'Styling Forms',
				summary: 'The forms plugin, inputs, selects, checkboxes and radios.',
				duration: 16,
				kind: 'lesson'
			},
			{
				slug: 'form-states-validation',
				title: 'Form States & Validation',
				summary: 'Invalid, required, focus-within and validation feedback.',
				duration: 15,
				kind: 'lesson'
			},
			{
				slug: 'accessible-forms',
				title: 'Accessible Forms',
				summary: 'Labels, focus, error messaging and inclusive patterns.',
				duration: 15,
				kind: 'lesson'
			},
			{
				slug: 'project-multistep-form',
				title: 'Project: Multi-Step Form',
				summary: 'A multi-step, validated, accessible signup flow.',
				duration: 50,
				kind: 'project'
			}
		]
	},
	{
		slug: 'design-tokens-theming',
		index: 6,
		title: 'Design Tokens & Theming',
		tagline: 'The CSS-first heart of Tailwind v4',
		description:
			'Tailwind v4 makes your theme pure CSS. Master @theme, design tokens as CSS variables, custom scales, and multi-brand theming.',
		difficulty: 'advanced',
		icon: 'swatches',
		lessons: [
			{
				slug: 'theme-directive',
				title: 'The @theme Directive',
				summary: 'How @theme generates both variables and utilities in v4.',
				duration: 15,
				kind: 'lesson'
			},
			{
				slug: 'css-variables-tokens',
				title: 'Design Tokens as CSS Variables',
				summary: 'Model a token system and reference it everywhere.',
				duration: 16,
				kind: 'lesson'
			},
			{
				slug: 'custom-scales-fonts',
				title: 'Custom Scales & Fonts',
				summary: 'Define your own color, spacing, and font scales.',
				duration: 15,
				kind: 'lesson'
			},
			{
				slug: 'multi-brand-theming',
				title: 'Multi-Brand Theming',
				summary: 'Runtime theme switching and per-brand token overrides.',
				duration: 18,
				kind: 'lesson'
			},
			{
				slug: 'project-token-system',
				title: 'Project: Themeable Token System',
				summary: 'Build a small, swappable design-token system live.',
				duration: 50,
				kind: 'project'
			}
		]
	},
	{
		slug: 'components-and-reuse',
		index: 7,
		title: 'Components & Reuse',
		tagline: 'Taming repetition without losing utilities',
		description:
			'The grown-up question: how do you stay DRY with utility classes? Component extraction, @apply done right, and class composition with cn().',
		difficulty: 'advanced',
		icon: 'puzzlePiece',
		lessons: [
			{
				slug: 'extract-svelte-components',
				title: 'Extracting Components',
				summary: 'Reuse through Svelte components instead of copy-paste.',
				duration: 15,
				kind: 'lesson'
			},
			{
				slug: 'apply-and-when-not',
				title: '@apply, and When Not To',
				summary: 'Where @apply helps, where it hurts, and the senior default.',
				duration: 14,
				kind: 'lesson'
			},
			{
				slug: 'clsx-tailwind-merge',
				title: 'Class Composition with cn()',
				summary: 'clsx + tailwind-merge for conflict-free conditional classes.',
				duration: 16,
				kind: 'lesson'
			},
			{
				slug: 'variant-patterns',
				title: 'Variant-Driven Components',
				summary: 'Type-safe size/intent variants for a component API.',
				duration: 17,
				kind: 'lesson'
			},
			{
				slug: 'project-component-library',
				title: 'Project: Component Library',
				summary: 'Buttons, badges, cards and alerts as a typed mini-library.',
				duration: 55,
				kind: 'project'
			}
		]
	},
	{
		slug: 'animation-and-interactivity',
		index: 8,
		title: 'Animation & Interactivity',
		tagline: 'Motion that feels intentional',
		description:
			'Transitions, transforms, keyframe animations, Svelte transitions, and modern scroll-driven animation — used tastefully and accessibly.',
		difficulty: 'advanced',
		icon: 'sparkle',
		lessons: [
			{
				slug: 'transitions-transforms',
				title: 'Transitions & Transforms',
				summary: 'transition, duration, easing, scale, rotate and translate.',
				duration: 15,
				kind: 'lesson'
			},
			{
				slug: 'keyframes-animations',
				title: 'Keyframe Animations',
				summary: 'Built-in animations and custom @keyframes via @theme.',
				duration: 15,
				kind: 'lesson'
			},
			{
				slug: 'svelte-transitions',
				title: 'Svelte Transitions + Tailwind',
				summary: 'Combine Svelte’s transition system with utility styling.',
				duration: 16,
				kind: 'lesson'
			},
			{
				slug: 'scroll-driven-animation',
				title: 'Scroll-Driven Animation',
				summary: 'Modern CSS scroll-driven effects and reduced-motion.',
				duration: 16,
				kind: 'lesson'
			},
			{
				slug: 'project-interactive-ui',
				title: 'Project: Interactive UI Kit',
				summary: 'Accordion, modal, toast and carousel with motion.',
				duration: 60,
				kind: 'project'
			}
		]
	},
	{
		slug: 'advanced-layout',
		index: 9,
		title: 'Advanced Layout & Patterns',
		tagline: 'Layouts that survive contact with real content',
		description:
			'Subgrid, sticky patterns, aspect ratio, container queries, and logical properties for internationalised, resilient layouts.',
		difficulty: 'expert',
		icon: 'squaresFour',
		lessons: [
			{
				slug: 'advanced-grid-subgrid',
				title: 'Advanced Grid & Subgrid',
				summary: 'Named lines, dense packing and subgrid alignment.',
				duration: 18,
				kind: 'lesson'
			},
			{
				slug: 'sticky-and-scroll',
				title: 'Sticky & Scroll Patterns',
				summary: 'Sticky headers, sidebars, and scroll-snap galleries.',
				duration: 15,
				kind: 'lesson'
			},
			{
				slug: 'container-queries',
				title: 'Container Queries',
				summary: 'Components that respond to their container, not the viewport.',
				duration: 17,
				kind: 'lesson'
			},
			{
				slug: 'logical-properties-rtl',
				title: 'Logical Properties & RTL',
				summary: 'Direction-aware spacing for internationalised UIs.',
				duration: 15,
				kind: 'lesson'
			},
			{
				slug: 'project-app-shell',
				title: 'Project: Application Shell',
				summary: 'A responsive app shell with sticky nav and container-aware cards.',
				duration: 60,
				kind: 'project'
			}
		]
	},
	{
		slug: 'architecture-at-scale',
		index: 10,
		title: 'Architecture at Scale',
		tagline: 'Design systems, accessibility and performance',
		description:
			'Lead-level concerns: design-system architecture, token governance, accessibility and contrast, performance, and authoring custom utilities.',
		difficulty: 'expert',
		icon: 'buildings',
		lessons: [
			{
				slug: 'design-system-architecture',
				title: 'Design-System Architecture',
				summary: 'Layered tokens, primitives, recipes and app composition.',
				duration: 18,
				kind: 'lesson'
			},
			{
				slug: 'token-governance',
				title: 'Token Governance',
				summary: 'Naming, semantic tokens, and evolving a system safely.',
				duration: 16,
				kind: 'lesson'
			},
			{
				slug: 'accessibility-contrast',
				title: 'Accessibility & Contrast',
				summary: 'Contrast, focus management and inclusive defaults at scale.',
				duration: 18,
				kind: 'lesson'
			},
			{
				slug: 'performance-bundle',
				title: 'Performance & Bundle Size',
				summary: 'How the engine works and how to keep CSS tiny.',
				duration: 16,
				kind: 'lesson'
			},
			{
				slug: 'custom-utilities-plugins',
				title: 'Custom Utilities & Plugins',
				summary: '@utility, @variant, and when to reach for a plugin.',
				duration: 18,
				kind: 'lesson'
			},
			{
				slug: 'project-design-system',
				title: 'Project: Accessible Design System',
				summary: 'A small, accessible, performant component system.',
				duration: 75,
				kind: 'project'
			}
		]
	},
	{
		slug: 'production-engineering',
		index: 11,
		title: 'Production Engineering',
		tagline: 'Shipping and maintaining UI in the real world',
		description:
			'SSR/prerender styling, critical CSS and performance budgets, UI testing, CI, and living documentation for a system other people depend on.',
		difficulty: 'expert',
		icon: 'gear',
		lessons: [
			{
				slug: 'ssr-prerender-styling',
				title: 'SSR & Prerender Styling',
				summary: 'Avoiding flashes, theming on the server, and hydration.',
				duration: 16,
				kind: 'lesson'
			},
			{
				slug: 'critical-css-performance',
				title: 'Critical CSS & Budgets',
				summary: 'Measuring CSS, performance budgets, and keeping it honest.',
				duration: 16,
				kind: 'lesson'
			},
			{
				slug: 'testing-ui',
				title: 'Testing UI',
				summary: 'Component tests, visual checks and accessibility tests.',
				duration: 17,
				kind: 'lesson'
			},
			{
				slug: 'ci-and-living-docs',
				title: 'CI & Living Documentation',
				summary: 'Lint, format, type-check in CI and document the system.',
				duration: 15,
				kind: 'lesson'
			},
			{
				slug: 'project-production-dashboard',
				title: 'Project: Production Dashboard',
				summary: 'A tested, themed, prerendered dashboard end to end.',
				duration: 90,
				kind: 'project'
			}
		]
	},
	{
		slug: 'distinguished',
		index: 12,
		title: 'Distinguished & Capstones',
		tagline: 'Lead the system, mentor the org, ship the portfolio',
		description:
			'The distinguished tier: author plugins and custom variants, integrate headless UI, reason about tradeoffs, lead a design-system org — then prove it across four capstones.',
		difficulty: 'distinguished',
		icon: 'crown',
		lessons: [
			{
				slug: 'authoring-plugins',
				title: 'Authoring Tailwind Plugins',
				summary: 'Package reusable utilities, components and variants.',
				duration: 20,
				kind: 'lesson'
			},
			{
				slug: 'custom-variants-api',
				title: 'Custom Variants',
				summary: 'Create your own stateful and structural variants.',
				duration: 18,
				kind: 'lesson'
			},
			{
				slug: 'headless-ui-integration',
				title: 'Headless UI Integration',
				summary: 'Style accessible headless primitives with Tailwind.',
				duration: 18,
				kind: 'lesson'
			},
			{
				slug: 'tradeoff-frameworks',
				title: 'Engineering Tradeoffs',
				summary: 'Decision frameworks for utilities vs. components vs. CSS.',
				duration: 18,
				kind: 'lesson'
			},
			{
				slug: 'leading-design-system-org',
				title: 'Leading a Design-System Org',
				summary: 'Adoption, governance, migration and mentoring at scale.',
				duration: 20,
				kind: 'lesson'
			},
			{
				slug: 'capstone-saas-marketing',
				title: 'Capstone: SaaS Marketing Site',
				summary: 'A complete, themeable, animated marketing site.',
				duration: 120,
				kind: 'capstone'
			},
			{
				slug: 'capstone-admin-dashboard',
				title: 'Capstone: Admin Dashboard',
				summary: 'A data-dense, accessible, responsive admin dashboard.',
				duration: 120,
				kind: 'capstone'
			},
			{
				slug: 'capstone-component-library',
				title: 'Capstone: Component Library',
				summary: 'A documented, variant-driven component library.',
				duration: 120,
				kind: 'capstone'
			},
			{
				slug: 'capstone-design-tokens-package',
				title: 'Capstone: Design-Tokens Package',
				summary: 'A versioned, multi-brand design-tokens package.',
				duration: 120,
				kind: 'capstone'
			}
		]
	}
];

export default curriculum;
