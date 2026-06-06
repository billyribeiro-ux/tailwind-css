<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { Waves, GithubLogo, ListBullets, X } from 'phosphor-svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import { progress } from '$lib/stores/progress.svelte';

	let { children } = $props();

	let drawerOpen = $state(false);

	const onLearnPage = $derived(page.url.pathname.startsWith('/learn'));
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex min-h-screen flex-col">
	<header
		class="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80"
	>
		<div class="flex h-16 items-center gap-3 px-4 sm:px-6">
			{#if onLearnPage}
				<button
					type="button"
					onclick={() => (drawerOpen = true)}
					aria-label="Open course menu"
					class="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800"
				>
					<ListBullets size={20} weight="bold" />
				</button>
			{/if}

			<a href="/" class="flex items-center gap-2">
				<span
					class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm"
				>
					<Waves size={20} weight="fill" />
				</span>
				<span class="text-base font-bold tracking-tight text-slate-900 dark:text-white">
					Tailwind <span class="text-brand-600 dark:text-brand-400">Mastery</span>
				</span>
			</a>

			<nav class="ml-6 hidden items-center gap-1 text-sm font-medium md:flex">
				<a
					href="/"
					class="rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
					>Home</a
				>
				<a
					href="/learn/foundations/what-is-tailwind"
					class="rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
					>Curriculum</a
				>
				<a
					href="/projects"
					class="rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
					>Projects</a
				>
			</nav>

			<div class="ml-auto flex items-center gap-1">
				<div class="mr-2 hidden w-32 sm:block">
					<ProgressBar value={progress.count} max={progress.total} label="Progress" />
				</div>
				<a
					href="https://tailwindcss.com/docs"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Tailwind CSS docs"
					class="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
				>
					<GithubLogo size={20} weight="duotone" />
				</a>
				<ThemeToggle />
			</div>
		</div>
	</header>

	{#if onLearnPage}
		<div class="mx-auto flex w-full max-w-screen-2xl flex-1">
			<!-- Desktop sidebar -->
			<aside
				class="sticky top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 overflow-y-auto border-r border-slate-200 lg:block dark:border-slate-800"
			>
				<Sidebar />
			</aside>

			<!-- Mobile drawer -->
			{#if drawerOpen}
				<div class="fixed inset-0 z-50 lg:hidden">
					<button
						type="button"
						aria-label="Close menu"
						onclick={() => (drawerOpen = false)}
						class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
					></button>
					<div
						class="absolute top-0 left-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-white shadow-xl dark:bg-slate-950"
					>
						<div
							class="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800"
						>
							<span class="font-bold text-slate-900 dark:text-white">Course contents</span>
							<button
								type="button"
								onclick={() => (drawerOpen = false)}
								aria-label="Close menu"
								class="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
							>
								<X size={20} weight="bold" />
							</button>
						</div>
						<Sidebar onNavigate={() => (drawerOpen = false)} />
					</div>
				</div>
			{/if}

			<main class="min-w-0 flex-1">
				{@render children()}
			</main>
		</div>
	{:else}
		<main class="flex-1">
			{@render children()}
		</main>
	{/if}

	<footer class="border-t border-slate-200 py-8 dark:border-slate-800">
		<div
			class="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-3 px-6 text-sm text-slate-500 sm:flex-row dark:text-slate-400"
		>
			<p>Tailwind Mastery — from first utility to distinguished engineer.</p>
			<p>Built with Svelte 5, SvelteKit & Tailwind CSS v4.</p>
		</div>
	</footer>
</div>
