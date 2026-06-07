<script lang="ts">
	import { cheatsheet } from '$lib/reference/cheatsheet';
	import { MagnifyingGlass } from 'phosphor-svelte';

	let filter = $state('');
	const q = $derived(filter.trim().toLowerCase());

	const groups = $derived(
		cheatsheet
			.map((g) => ({
				title: g.title,
				items: q
					? g.items.filter(
							(i) => i.cls.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q)
						)
					: g.items
			}))
			.filter((g) => g.items.length > 0)
	);
</script>

<svelte:head>
	<title>Cheatsheet · Tailwind Mastery</title>
	<meta
		name="description"
		content="A compact, searchable reference of the highest-frequency Tailwind CSS utilities."
	/>
</svelte:head>

<section class="mx-auto max-w-5xl px-6 py-12">
	<div class="mb-8">
		<h1 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
			Utility cheatsheet
		</h1>
		<p class="mt-2 text-slate-600 dark:text-slate-400">
			The utilities you'll reach for daily. Filter to find one fast.
		</p>
		<label class="relative mt-5 block max-w-md">
			<MagnifyingGlass
				size={18}
				class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
			/>
			<input
				bind:value={filter}
				type="search"
				placeholder="Filter utilities…"
				aria-label="Filter utilities"
				class="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-3 pl-10 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-brand-500/30"
			/>
		</label>
	</div>

	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each groups as group (group.title)}
			<div
				class="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
			>
				<h2
					class="mb-3 text-sm font-bold tracking-wide text-brand-600 uppercase dark:text-brand-400"
				>
					{group.title}
				</h2>
				<dl class="space-y-2.5">
					{#each group.items as item (item.cls)}
						<div>
							<dt>
								<code
									class="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800 dark:bg-slate-800 dark:text-slate-200"
									>{item.cls}</code
								>
							</dt>
							<dd class="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.desc}</dd>
						</div>
					{/each}
				</dl>
			</div>
		{:else}
			<p class="text-slate-400">No utilities match “{filter}”.</p>
		{/each}
	</div>
</section>
