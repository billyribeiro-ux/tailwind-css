<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Info, Lightbulb, Warning, Crown } from 'phosphor-svelte';

	type Variant = 'note' | 'tip' | 'warning' | 'insight';

	let {
		type = 'note',
		title = '',
		children
	}: { type?: Variant; title?: string; children: Snippet } = $props();

	const config: Record<
		Variant,
		{ icon: typeof Info; label: string; box: string; iconColor: string }
	> = {
		note: {
			icon: Info,
			label: 'Note',
			box: 'border-sky-300 bg-sky-50 dark:border-sky-500/40 dark:bg-sky-500/10',
			iconColor: 'text-sky-500'
		},
		tip: {
			icon: Lightbulb,
			label: 'Tip',
			box: 'border-emerald-300 bg-emerald-50 dark:border-emerald-500/40 dark:bg-emerald-500/10',
			iconColor: 'text-emerald-500'
		},
		warning: {
			icon: Warning,
			label: 'Watch out',
			box: 'border-amber-300 bg-amber-50 dark:border-amber-500/40 dark:bg-amber-500/10',
			iconColor: 'text-amber-500'
		},
		insight: {
			icon: Crown,
			label: 'Principal Insight',
			box: 'border-accent-400 bg-accent-400/10 dark:border-accent-500/50 dark:bg-accent-500/10',
			iconColor: 'text-accent-600 dark:text-accent-400'
		}
	};

	const c = $derived(config[type]);
	const Icon = $derived(c.icon);
</script>

<aside class="not-prose my-6 flex gap-3 rounded-xl border-l-4 p-4 {c.box}">
	<div class="mt-0.5 shrink-0 {c.iconColor}">
		<Icon size={22} weight="duotone" />
	</div>
	<div class="min-w-0">
		<p class="mb-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
			{title || c.label}
		</p>
		<div class="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
			{@render children()}
		</div>
	</div>
</aside>
