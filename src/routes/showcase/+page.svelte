<script lang="ts">
	import { Megaphone, ChartLine, Stack, Swatches, ArrowRight } from 'phosphor-svelte';

	const apps = [
		{
			href: '/showcase/marketing',
			icon: Megaphone,
			title: 'SaaS Marketing Site',
			desc: 'A themeable, animated marketing page built from the course patterns.'
		},
		{
			href: '/showcase/dashboard',
			icon: ChartLine,
			title: 'Admin Dashboard',
			desc: 'A data-dense, accessible dashboard with a filterable table and tabs.'
		},
		{
			href: '/showcase/components',
			icon: Stack,
			title: 'Component Library',
			desc: 'A live gallery of variant-driven, accessible UI primitives.'
		},
		{
			href: '/showcase/tokens',
			icon: Swatches,
			title: 'Design Tokens',
			desc: 'Switch brand and colour scheme live — one markup, many skins.'
		}
	];
</script>

<svelte:head>
	<title>Showcase · Tailwind Mastery</title>
	<meta
		name="description"
		content="Runnable mini-apps demonstrating the four capstones in action."
	/>
</svelte:head>

<section class="mx-auto max-w-5xl px-6 py-12">
	<div class="mb-10 max-w-2xl">
		<h1 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
			Showcase — the capstones, running
		</h1>
		<p class="mt-3 text-slate-600 dark:text-slate-400">
			Not briefs — actual working mini-apps you can poke at, built with everything the course
			teaches.
		</p>
	</div>

	<div class="grid gap-6 sm:grid-cols-2">
		{#each apps as app (app.href)}
			{@const Icon = app.icon}
			<a
				href={app.href}
				class="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:hover:border-brand-500/50"
			>
				<span
					class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"
				>
					<Icon size={26} weight="duotone" />
				</span>
				<h2
					class="text-lg font-bold text-slate-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400"
				>
					{app.title}
				</h2>
				<p class="mt-1 flex-1 text-sm text-slate-600 dark:text-slate-400">{app.desc}</p>
				<span
					class="mt-4 flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400"
				>
					Open app <ArrowRight
						size={15}
						weight="bold"
						class="transition group-hover:translate-x-0.5"
					/>
				</span>
			</a>
		{/each}
	</div>
</section>
