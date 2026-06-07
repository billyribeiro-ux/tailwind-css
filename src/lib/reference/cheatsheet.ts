export interface CheatItem {
	cls: string;
	desc: string;
}
export interface CheatGroup {
	title: string;
	items: CheatItem[];
}

/** A compact, searchable reference of the highest-frequency Tailwind utilities. */
export const cheatsheet: CheatGroup[] = [
	{
		title: 'Layout',
		items: [
			{ cls: 'block / inline / inline-block', desc: 'Display mode' },
			{ cls: 'flex / grid / hidden', desc: 'Flex/grid context or remove element' },
			{ cls: 'container', desc: 'Centered, max-width container' },
			{ cls: 'relative / absolute / fixed / sticky', desc: 'Positioning' },
			{ cls: 'inset-0 / top-0 / right-0', desc: 'Offsets for positioned elements' },
			{ cls: 'z-10 … z-50', desc: 'Stacking order' },
			{ cls: 'overflow-auto / -hidden / -scroll', desc: 'Overflow behaviour' }
		]
	},
	{
		title: 'Flexbox & Grid',
		items: [
			{ cls: 'flex-row / flex-col', desc: 'Main-axis direction' },
			{ cls: 'justify-center / -between / -around', desc: 'Main-axis alignment' },
			{ cls: 'items-center / -start / -end', desc: 'Cross-axis alignment' },
			{ cls: 'flex-1 / grow / shrink-0', desc: 'Grow / shrink behaviour' },
			{ cls: 'flex-wrap', desc: 'Allow items to wrap' },
			{ cls: 'grid-cols-3 / col-span-2', desc: 'Grid columns and spans' },
			{ cls: 'gap-4 / gap-x-2 / gap-y-6', desc: 'Spacing between items' }
		]
	},
	{
		title: 'Spacing',
		items: [
			{ cls: 'p-4 / px-6 / pt-2', desc: 'Padding (all / axis / side)' },
			{ cls: 'm-4 / mx-auto / -mt-2', desc: 'Margin, centering, negative' },
			{ cls: 'space-y-4 / space-x-2', desc: 'Space between children' }
		]
	},
	{
		title: 'Sizing',
		items: [
			{ cls: 'w-64 / w-1/2 / w-full / w-screen', desc: 'Width: step, fraction, full, viewport' },
			{ cls: 'h-12 / h-full / min-h-screen', desc: 'Height' },
			{ cls: 'max-w-prose / max-w-xl', desc: 'Constrain maximum width' },
			{ cls: 'aspect-square / aspect-video', desc: 'Aspect ratio' }
		]
	},
	{
		title: 'Typography',
		items: [
			{ cls: 'text-sm … text-5xl', desc: 'Font size' },
			{ cls: 'font-medium / -semibold / -bold', desc: 'Font weight' },
			{ cls: 'leading-relaxed / tracking-tight', desc: 'Line-height / letter-spacing' },
			{ cls: 'text-center / -left / -right', desc: 'Alignment' },
			{ cls: 'truncate / line-clamp-2', desc: 'Ellipsis / clamp lines' },
			{ cls: 'text-slate-600 / text-brand-500', desc: 'Text colour' }
		]
	},
	{
		title: 'Backgrounds & Borders',
		items: [
			{ cls: 'bg-white / bg-brand-600 / bg-blue-600/50', desc: 'Background colour + opacity' },
			{ cls: 'bg-gradient-to-r from-… to-…', desc: 'Gradients' },
			{ cls: 'border / border-2 / border-l-4', desc: 'Borders' },
			{ cls: 'rounded-lg / rounded-full', desc: 'Border radius' },
			{ cls: 'ring-2 ring-brand-500', desc: 'Outline ring (great for focus)' }
		]
	},
	{
		title: 'Effects & Motion',
		items: [
			{ cls: 'shadow-sm … shadow-2xl', desc: 'Elevation' },
			{ cls: 'opacity-50 / blur-sm', desc: 'Opacity / blur' },
			{ cls: 'transition / duration-200 / ease-out', desc: 'Transitions' },
			{ cls: 'scale-105 / rotate-3 / -translate-y-1', desc: 'Transforms' },
			{ cls: 'animate-spin / -pulse / -bounce', desc: 'Built-in animations' }
		]
	},
	{
		title: 'Responsive & State',
		items: [
			{ cls: 'sm: md: lg: xl: 2xl:', desc: 'Min-width breakpoints (mobile-first)' },
			{ cls: 'hover: focus: active: disabled:', desc: 'Interaction states' },
			{ cls: 'focus-visible:ring-2', desc: 'Keyboard-only focus ring' },
			{ cls: 'group / group-hover:', desc: 'React to a parent’s state' },
			{ cls: 'peer / peer-focus:', desc: 'React to a sibling’s state' },
			{ cls: 'dark:', desc: 'Dark-mode variant' },
			{ cls: '@container / @md:', desc: 'Container queries' }
		]
	}
];
