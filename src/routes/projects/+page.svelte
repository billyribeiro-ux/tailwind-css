<script lang="ts">
	import { curriculum } from '$lib/course/curriculum';
	import { lessonPath } from '$lib/course/navigation';
	import { Wrench, ArrowRight, Crown } from 'phosphor-svelte';

	const projects = curriculum.flatMap((m) =>
		m.lessons.filter((l) => l.kind !== 'lesson').map((l) => ({ module: m, lesson: l }))
	);
</script>

<svelte:head>
	<title>Projects · Tailwind Mastery</title>
	<meta
		name="description"
		content="Every hands-on project and capstone in the Tailwind Mastery course."
	/>
</svelte:head>

<section class="mx-auto max-w-screen-xl px-6 py-16">
	<div class="mb-10 max-w-2xl">
		<h1 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
			Build {projects.length} real projects
		</h1>
		<p class="mt-3 text-slate-600 dark:text-slate-400">
			Every module ends in a project, and the course finishes with four portfolio-grade capstones.
			This is where theory becomes muscle memory.
		</p>
	</div>

	<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
		{#each projects as { module, lesson } (lesson.slug)}
			{@const capstone = lesson.kind === 'capstone'}
			<a
				href={lessonPath(module.slug, lesson.slug)}
				class="group flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-slate-900
					{capstone
					? 'border-accent-300 dark:border-accent-500/40'
					: 'border-slate-200 hover:border-brand-300 dark:border-slate-700 dark:hover:border-brand-500/50'}"
			>
				<div class="mb-4 flex items-center justify-between">
					<span
						class="flex h-11 w-11 items-center justify-center rounded-xl {capstone
							? 'bg-accent-400/15 text-accent-600 dark:text-accent-400'
							: 'bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400'}"
					>
						{#if capstone}
							<Crown size={24} weight="duotone" />
						{:else}
							<Wrench size={24} weight="duotone" />
						{/if}
					</span>
					<span class="text-xs font-medium text-slate-400">Module {module.index}</span>
				</div>
				<h3
					class="text-lg font-bold text-slate-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400"
				>
					{lesson.title.replace(/^(Project|Capstone): /, '')}
				</h3>
				<p class="mt-1 flex-1 text-sm text-slate-600 dark:text-slate-400">{lesson.summary}</p>
				<span
					class="mt-4 flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400"
				>
					Open project
					<ArrowRight size={15} weight="bold" class="transition group-hover:translate-x-0.5" />
				</span>
			</a>
		{/each}
	</div>
</section>
