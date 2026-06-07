<script lang="ts">
	import { browser } from '$app/environment';
	import { progress } from '$lib/stores/progress.svelte';
	import { SealCheck, Lightning, Flame, Printer } from 'phosphor-svelte';

	let name = $state(browser ? (localStorage.getItem('twcourse:name') ?? '') : '');
	$effect(() => {
		if (browser) localStorage.setItem('twcourse:name', name);
	});

	const done = $derived(progress.isComplete100);
	const dateStr = new Date().toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<svelte:head>
	<title>Certificate · Tailwind Mastery</title>
</svelte:head>

<section class="mx-auto max-w-3xl px-6 py-12 print:py-0">
	<div class="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4 print:hidden">
		<div class="rounded-xl border border-slate-200 p-4 text-center dark:border-slate-700">
			<p class="text-2xl font-bold text-slate-900 dark:text-white">{progress.percent}%</p>
			<p class="text-xs text-slate-500 dark:text-slate-400">Complete</p>
		</div>
		<div class="rounded-xl border border-slate-200 p-4 text-center dark:border-slate-700">
			<p class="text-2xl font-bold text-slate-900 dark:text-white">
				{progress.count}/{progress.total}
			</p>
			<p class="text-xs text-slate-500 dark:text-slate-400">Lessons</p>
		</div>
		<div class="rounded-xl border border-slate-200 p-4 text-center dark:border-slate-700">
			<p
				class="flex items-center justify-center gap-1 text-2xl font-bold text-brand-600 dark:text-brand-400"
			>
				<Lightning size={20} weight="fill" />{progress.xp}
			</p>
			<p class="text-xs text-slate-500 dark:text-slate-400">XP · Lv {progress.level}</p>
		</div>
		<div class="rounded-xl border border-slate-200 p-4 text-center dark:border-slate-700">
			<p
				class="flex items-center justify-center gap-1 text-2xl font-bold text-amber-600 dark:text-amber-400"
			>
				<Flame size={20} weight="fill" />{progress.streak}
			</p>
			<p class="text-xs text-slate-500 dark:text-slate-400">Day streak</p>
		</div>
	</div>

	<div class="mb-6 print:hidden">
		<label class="block text-sm font-medium text-slate-700 dark:text-slate-300">
			Your name (for the certificate)
			<input
				bind:value={name}
				type="text"
				placeholder="Ada Lovelace"
				class="mt-1 block w-full max-w-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-brand-500/30"
			/>
		</label>
	</div>

	<!-- The certificate -->
	<div
		class="relative overflow-hidden rounded-3xl border-4 border-double border-brand-300 bg-gradient-to-br from-brand-50 to-white p-10 text-center shadow-xl dark:border-brand-500/40 dark:from-brand-500/10 dark:to-slate-900"
	>
		<div
			class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg"
		>
			<SealCheck size={36} weight="fill" />
		</div>
		<p class="text-xs font-semibold tracking-[0.3em] text-brand-600 uppercase dark:text-brand-400">
			Certificate of {done ? 'Completion' : 'Progress'}
		</p>
		<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
			{name || 'Your Name'}
		</h1>
		<p class="mx-auto mt-4 max-w-md text-slate-600 dark:text-slate-300">
			{#if done}
				has completed all {progress.total} lessons of <strong>Tailwind Mastery</strong>,
				demonstrating command of Tailwind CSS from fundamentals to distinguished-engineer practice.
			{:else}
				has completed <strong>{progress.count} of {progress.total}</strong> lessons of
				<strong>Tailwind Mastery</strong> — {progress.percent}% of the journey to distinguished
				engineer.
			{/if}
		</p>
		<div
			class="mt-8 flex items-center justify-center gap-8 text-sm text-slate-500 dark:text-slate-400"
		>
			<div>
				<p class="font-semibold text-slate-700 dark:text-slate-200">{dateStr}</p>
				<p class="text-xs">Date</p>
			</div>
			<div>
				<p class="font-semibold text-slate-700 dark:text-slate-200">Tailwind Mastery</p>
				<p class="text-xs">Svelte 5 · Tailwind v4</p>
			</div>
		</div>
	</div>

	<div class="mt-6 flex justify-center print:hidden">
		<button
			type="button"
			onclick={() => window.print()}
			class="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 font-semibold text-white transition hover:bg-brand-700"
		>
			<Printer size={18} weight="duotone" /> Print / Save as PDF
		</button>
	</div>
</section>
