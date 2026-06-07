<script lang="ts">
	type Brand = 'indigo' | 'mint' | 'sunset';
	type Scheme = 'light' | 'dark';

	let brand = $state<Brand>('indigo');
	let scheme = $state<Scheme>('light');

	const accents: Record<Brand, { accent: string; ink: string }> = {
		indigo: { accent: 'oklch(0.55 0.21 258)', ink: 'white' },
		mint: { accent: 'oklch(0.7 0.13 165)', ink: 'oklch(0.2 0.03 165)' },
		sunset: { accent: 'oklch(0.68 0.19 35)', ink: 'white' }
	};
	const surfaces: Record<
		Scheme,
		{ surface: string; surface2: string; ink: string; muted: string }
	> = {
		light: {
			surface: 'white',
			surface2: 'oklch(0.97 0.01 256)',
			ink: 'oklch(0.27 0.03 256)',
			muted: 'oklch(0.52 0.02 256)'
		},
		dark: {
			surface: 'oklch(0.27 0.03 256)',
			surface2: 'oklch(0.22 0.02 256)',
			ink: 'oklch(0.96 0.01 256)',
			muted: 'oklch(0.7 0.02 256)'
		}
	};

	const styleVars = $derived(
		[
			`--accent:${accents[brand].accent}`,
			`--accent-ink:${accents[brand].ink}`,
			`--surface:${surfaces[scheme].surface}`,
			`--surface-2:${surfaces[scheme].surface2}`,
			`--ink:${surfaces[scheme].ink}`,
			`--muted:${surfaces[scheme].muted}`
		].join(';')
	);
</script>

<svelte:head><title>Design Tokens · Showcase</title></svelte:head>

<section class="mx-auto max-w-3xl px-6 py-12">
	<h1 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
		Design tokens, live
	</h1>
	<p class="mt-2 text-slate-600 dark:text-slate-400">
		The card below references only semantic tokens (<code>--accent</code>, <code>--surface</code>,
		<code>--ink</code>…). Change the brand or scheme and the same markup re-skins — zero component
		edits.
	</p>

	<!-- controls -->
	<div class="mt-6 flex flex-wrap items-center gap-6">
		<div>
			<p
				class="mb-1.5 text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400"
			>
				Brand
			</p>
			<div class="inline-flex rounded-lg border border-slate-200 p-1 dark:border-slate-700">
				{#each ['indigo', 'mint', 'sunset'] as b (b)}
					<button
						onclick={() => (brand = b as Brand)}
						class="rounded-md px-3 py-1.5 text-sm font-medium capitalize transition {brand === b
							? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
							: 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}"
						>{b}</button
					>
				{/each}
			</div>
		</div>
		<div>
			<p
				class="mb-1.5 text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400"
			>
				Scheme
			</p>
			<div class="inline-flex rounded-lg border border-slate-200 p-1 dark:border-slate-700">
				{#each ['light', 'dark'] as s (s)}
					<button
						onclick={() => (scheme = s as Scheme)}
						class="rounded-md px-3 py-1.5 text-sm font-medium capitalize transition {scheme === s
							? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
							: 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}"
						>{s}</button
					>
				{/each}
			</div>
		</div>
	</div>

	<!-- themed preview -->
	<div class="mt-8 rounded-2xl p-8" style="{styleVars};background:var(--surface-2)">
		<div class="mx-auto max-w-sm rounded-2xl p-6 shadow-lg" style="background:var(--surface)">
			<span
				class="inline-block rounded-full px-3 py-1 text-xs font-semibold"
				style="background:var(--accent);color:var(--accent-ink)">Themed</span
			>
			<h3 class="mt-3 text-lg font-semibold" style="color:var(--ink)">Tokens all the way down</h3>
			<p class="mt-1 text-sm" style="color:var(--muted)">
				Surface, ink, muted and accent are semantic. Switch brand or scheme above.
			</p>
			<button
				class="mt-4 w-full rounded-lg px-4 py-2.5 font-medium transition hover:brightness-110"
				style="background:var(--accent);color:var(--accent-ink)">Accent action</button
			>
		</div>
	</div>

	<p class="mt-4 text-center text-xs text-slate-400">
		Same HTML for all 6 combinations — proof that semantic tokens make theming a remap, not a
		rewrite.
	</p>
</section>
