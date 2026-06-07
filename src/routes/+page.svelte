<script lang="ts">
	import { curriculum } from '$lib/course/curriculum';
	import { firstLesson, totalLessons } from '$lib/course/navigation';
	import { progress } from '$lib/stores/progress.svelte';
	import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '$lib/config';
	import ModuleCard from '$lib/components/ModuleCard.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';

	// Course structured data for rich search results.
	const courseSchema = {
		'@context': 'https://schema.org',
		'@type': 'Course',
		name: SITE_NAME,
		description: SITE_DESCRIPTION,
		url: SITE_URL,
		inLanguage: 'en',
		teaches: 'Tailwind CSS, Svelte 5, SvelteKit, design systems',
		provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
		hasCourseInstance: {
			'@type': 'CourseInstance',
			courseMode: 'online',
			courseWorkload: 'PT25H'
		}
	};
	import {
		ArrowRight,
		GraduationCap,
		Lightning,
		Stack,
		Wrench,
		PlayCircle,
		Sparkle
	} from 'phosphor-svelte';

	const start = firstLesson();
	const projectCount = curriculum.reduce(
		(n, m) => n + m.lessons.filter((l) => l.kind !== 'lesson').length,
		0
	);

	const stats = [
		{ icon: Stack, label: 'Modules', value: `${curriculum.length}` },
		{ icon: GraduationCap, label: 'Lessons', value: `${totalLessons()}` },
		{ icon: Wrench, label: 'Projects', value: `${projectCount}` },
		{ icon: Lightning, label: 'Stack', value: 'Svelte 5 · v4' }
	];
</script>

<svelte:head>
	<title>Tailwind Mastery · From First Utility to Distinguished Engineer</title>
	<meta
		name="description"
		content="A hands-on Tailwind CSS course built with Svelte 5, SvelteKit and Tailwind v4 — from absolute beginner to principal/distinguished engineer, with a project in every module."
	/>
	<meta
		property="og:title"
		content="Tailwind Mastery · From First Utility to Distinguished Engineer"
	/>
	<meta
		property="og:description"
		content="A hands-on Tailwind CSS course — Svelte 5, SvelteKit, Tailwind v4. 65 lessons, 16 projects, a live editor in every lesson."
	/>
</svelte:head>

<JsonLd data={courseSchema} />

<!-- Hero -->
<section class="relative overflow-hidden">
	<div
		class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,--alpha(var(--color-brand-500)/15%),transparent)]"
	></div>
	<div class="mx-auto max-w-screen-xl px-6 pt-20 pb-16 text-center">
		<span
			class="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300"
		>
			<Sparkle size={16} weight="fill" /> Tailwind CSS v4 · Svelte 5 · TypeScript strict
		</span>

		<h1
			class="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl dark:text-white"
		>
			Master Tailwind CSS, from your
			<span class="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
				first utility
			</span>
			to distinguished engineer.
		</h1>

		<p class="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
			A hands-on course that narrates every concept in plain English while teaching the judgement of
			a Level 7+ engineer. Every module ends in a real project — built with Svelte 5, SvelteKit and
			Tailwind v4, with a live editor in every lesson.
		</p>

		<div class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
			<a
				href={start.path}
				class="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
			>
				<PlayCircle size={20} weight="fill" />
				{progress.count > 0 ? 'Continue learning' : 'Start the course'}
				<ArrowRight size={18} weight="bold" />
			</a>
			<a
				href="/projects"
				class="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3.5 text-base font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
			>
				<Wrench size={20} weight="duotone" /> Browse projects
			</a>
		</div>

		{#if progress.count > 0}
			<div class="mx-auto mt-10 max-w-md">
				<ProgressBar value={progress.count} max={progress.total} label="Your progress" />
			</div>
		{/if}
	</div>
</section>

<!-- Stats -->
<section class="mx-auto max-w-screen-xl px-6 pb-16">
	<div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
		{#each stats as stat (stat.label)}
			{@const Icon = stat.icon}
			<div
				class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
			>
				<span
					class="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"
				>
					<Icon size={24} weight="duotone" />
				</span>
				<div>
					<p class="text-xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
					<p class="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<!-- Curriculum -->
<section class="mx-auto max-w-screen-xl px-6 pb-24">
	<div class="mb-10 text-center">
		<h2 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
			The learning path
		</h2>
		<p class="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
			Twelve modules, ordered so each builds on the last. Start at the top, or jump to where you
			want to grow.
		</p>
	</div>

	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each curriculum as module (module.slug)}
			<ModuleCard {module} />
		{/each}
	</div>
</section>
