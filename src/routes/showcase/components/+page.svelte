<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { fade, scale, fly } from 'svelte/transition';
	import { Info, CheckCircle, WarningCircle, X } from 'phosphor-svelte';

	const buttonIntents = {
		primary: 'bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-400',
		secondary:
			'bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-400 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
		danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400'
	} as const;
	const buttonBase =
		'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950';

	const badgeTones = {
		neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
		success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
		warning: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
		danger: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300'
	} as const;

	let modalOpen = $state(false);
	let toast = $state(false);
	let toastTimer: ReturnType<typeof setTimeout> | undefined;
	function showToast() {
		toast = true;
		clearTimeout(toastTimer);
		toastTimer = setTimeout(() => (toast = false), 2500);
	}
</script>

<svelte:head><title>Components · Showcase</title></svelte:head>

<section class="mx-auto max-w-4xl space-y-12 px-6 py-12">
	<header>
		<h1 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
			Component gallery
		</h1>
		<p class="mt-2 text-slate-600 dark:text-slate-400">
			Variant-driven, accessible primitives — composed with <code>cn()</code> and semantic styling.
		</p>
	</header>

	<!-- Buttons -->
	<div>
		<h2 class="mb-3 text-sm font-bold tracking-wide text-brand-600 uppercase dark:text-brand-400">
			Button · intents
		</h2>
		<div class="flex flex-wrap gap-3">
			{#each Object.entries(buttonIntents) as [name, cls] (name)}
				<button class={cn(buttonBase, cls)}>{name}</button>
			{/each}
			<button class={cn(buttonBase, buttonIntents.primary, 'opacity-50')} disabled>disabled</button>
		</div>
	</div>

	<!-- Badges -->
	<div>
		<h2 class="mb-3 text-sm font-bold tracking-wide text-brand-600 uppercase dark:text-brand-400">
			Badge · tones
		</h2>
		<div class="flex flex-wrap gap-2">
			{#each Object.entries(badgeTones) as [name, cls] (name)}
				<span
					class={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', cls)}
					>{name}</span
				>
			{/each}
		</div>
	</div>

	<!-- Alerts -->
	<div>
		<h2 class="mb-3 text-sm font-bold tracking-wide text-brand-600 uppercase dark:text-brand-400">
			Alert · tones
		</h2>
		<div class="space-y-3">
			<div
				role="alert"
				class="flex items-center gap-2 rounded-lg border-l-4 border-sky-300 bg-sky-50 p-4 text-sm text-sky-800 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200"
			>
				<Info size={18} weight="duotone" /> A new version is available.
			</div>
			<div
				role="alert"
				class="flex items-center gap-2 rounded-lg border-l-4 border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200"
			>
				<CheckCircle size={18} weight="duotone" /> Your changes were saved.
			</div>
			<div
				role="alert"
				class="flex items-center gap-2 rounded-lg border-l-4 border-red-300 bg-red-50 p-4 text-sm text-red-800 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-200"
			>
				<WarningCircle size={18} weight="duotone" /> Something needs your attention.
			</div>
		</div>
	</div>

	<!-- Interactive -->
	<div>
		<h2 class="mb-3 text-sm font-bold tracking-wide text-brand-600 uppercase dark:text-brand-400">
			Interactive
		</h2>
		<div class="flex flex-wrap gap-3">
			<button class={cn(buttonBase, buttonIntents.primary)} onclick={() => (modalOpen = true)}
				>Open modal</button
			>
			<button class={cn(buttonBase, buttonIntents.secondary)} onclick={showToast}>Show toast</button
			>
		</div>
	</div>
</section>

{#if modalOpen}
	<button
		type="button"
		aria-label="Close modal"
		transition:fade
		class="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm"
		onclick={() => (modalOpen = false)}
	></button>
	<div
		transition:scale={{ start: 0.95 }}
		role="dialog"
		aria-modal="true"
		class="fixed inset-0 z-50 m-auto h-fit max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900"
	>
		<h3 class="text-lg font-semibold text-slate-900 dark:text-white">Confirm action</h3>
		<p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
			This dialog animates in with scale + fade, traps nothing fancy, and closes on backdrop click.
		</p>
		<div class="mt-5 flex justify-end gap-2">
			<button class={cn(buttonBase, buttonIntents.secondary)} onclick={() => (modalOpen = false)}
				>Cancel</button
			>
			<button class={cn(buttonBase, buttonIntents.primary)} onclick={() => (modalOpen = false)}
				>Confirm</button
			>
		</div>
	</div>
{/if}

{#if toast}
	<div
		transition:fly={{ y: 12 }}
		class="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm text-white shadow-lg"
	>
		<CheckCircle size={18} weight="fill" class="text-emerald-400" /> Saved successfully
		<button
			aria-label="Dismiss"
			onclick={() => (toast = false)}
			class="text-slate-400 hover:text-white"><X size={14} weight="bold" /></button
		>
	</div>
{/if}
