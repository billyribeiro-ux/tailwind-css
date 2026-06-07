<script lang="ts">
	import type { Component } from 'svelte';
	import { goto } from '$app/navigation';
	import { House, CaretRight, Clock, Wrench, PencilSimple } from 'phosphor-svelte';
	import LessonNav from '$lib/components/LessonNav.svelte';
	import { commandPalette } from '$lib/stores/ui.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const editUrl = $derived(
		`https://github.com/billyribeiro-ux/tailwind-css/edit/claude/tailwind-svelte-course-B6gZ9/src/lib/content/${data.flat.module.slug}/${data.flat.lesson.slug}.svx`
	);

	// Keyboard navigation: ←/→ move between lessons (ignored while typing or in the palette).
	function onKeydown(e: KeyboardEvent): void {
		if (commandPalette.open) return;
		const el = e.target as HTMLElement | null;
		if (el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable)) return;
		if (e.metaKey || e.ctrlKey || e.altKey) return;
		if (e.key === 'ArrowLeft' && data.prev) void goto(data.prev.path);
		else if (e.key === 'ArrowRight' && data.next) void goto(data.next.path);
	}

	// Synchronous glob → the matched lesson renders into the prerendered HTML.
	const lessonModules = import.meta.glob('/src/lib/content/**/*.svx', {
		eager: true
	}) as Record<string, { default: Component }>;

	const Content = $derived(
		lessonModules[`/src/lib/content/${data.flat.module.slug}/${data.flat.lesson.slug}.svx`]?.default
	);

	const isProject = $derived(
		data.flat.lesson.kind === 'project' || data.flat.lesson.kind === 'capstone'
	);
</script>

<svelte:head>
	<title>{data.flat.lesson.title} · Tailwind Mastery</title>
	<meta name="description" content={data.flat.lesson.summary} />
</svelte:head>

<svelte:window onkeydown={onKeydown} />

<div class="mx-auto max-w-3xl px-4 py-8 sm:px-8 sm:py-12">
	<!-- Breadcrumb + meta -->
	<nav class="mb-6 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
		<a href="/" class="hover:text-brand-600 dark:hover:text-brand-400"
			><House size={14} weight="bold" /></a
		>
		<CaretRight size={12} />
		<span>Module {data.flat.module.index} · {data.flat.module.title}</span>
	</nav>

	<div class="mb-8 flex flex-wrap items-center gap-3 text-xs font-medium">
		<span
			class="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
		>
			<Clock size={14} weight="bold" /> ~{data.flat.lesson.duration} min
		</span>
		{#if isProject}
			<span
				class="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300"
			>
				<Wrench size={14} weight="bold" />
				{data.flat.lesson.kind === 'capstone' ? 'Capstone' : 'Project'}
			</span>
		{/if}
		<span
			class="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-slate-600 capitalize dark:bg-slate-800 dark:text-slate-300"
		>
			{data.flat.module.difficulty}
		</span>
		<a
			href={editUrl}
			target="_blank"
			rel="noopener noreferrer"
			class="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-slate-500 transition hover:bg-slate-100 hover:text-brand-600 dark:text-slate-400 dark:hover:bg-slate-800"
		>
			<PencilSimple size={14} weight="bold" /> Edit
		</a>
	</div>

	<article class="lesson-prose">
		{#if Content}
			<Content />
		{:else}
			<h1>{data.flat.lesson.title}</h1>
			<p>{data.flat.lesson.summary}</p>
			<div
				class="not-prose rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400"
			>
				This lesson’s content is being authored.
			</div>
		{/if}
	</article>

	<LessonNav
		prev={data.prev}
		next={data.next}
		moduleSlug={data.flat.module.slug}
		lessonSlug={data.flat.lesson.slug}
	/>
</div>
