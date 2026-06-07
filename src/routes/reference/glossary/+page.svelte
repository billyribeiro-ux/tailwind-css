<script lang="ts">
	import { glossary } from '$lib/reference/glossary';
	import { MagnifyingGlass } from 'phosphor-svelte';

	let filter = $state('');
	const q = $derived(filter.trim().toLowerCase());

	const terms = $derived(
		[...glossary]
			.sort((a, b) => a.term.localeCompare(b.term))
			.filter(
				(t) => !q || t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
			)
	);
</script>

<svelte:head>
	<title>Glossary · Tailwind Mastery</title>
	<meta
		name="description"
		content="Plain-English definitions of the key terms used throughout the course."
	/>
</svelte:head>

<section class="mx-auto max-w-3xl px-6 py-12">
	<h1 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
		Glossary
	</h1>
	<p class="mt-2 text-slate-600 dark:text-slate-400">Every key term, in plain English.</p>

	<label class="relative mt-5 block">
		<MagnifyingGlass
			size={18}
			class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
		/>
		<input
			bind:value={filter}
			type="search"
			placeholder="Search terms…"
			aria-label="Search terms"
			class="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-3 pl-10 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-brand-500/30"
		/>
	</label>

	<dl class="mt-8 space-y-5">
		{#each terms as t (t.term)}
			<div class="border-l-2 border-brand-200 pl-4 dark:border-brand-500/40">
				<dt class="font-semibold text-slate-900 dark:text-white">{t.term}</dt>
				<dd class="mt-1 text-sm text-slate-600 dark:text-slate-400">{t.definition}</dd>
			</div>
		{:else}
			<p class="text-slate-400">No terms match “{filter}”.</p>
		{/each}
	</dl>
</section>
