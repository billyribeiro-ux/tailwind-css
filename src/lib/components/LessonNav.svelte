<script lang="ts">
	import { ArrowLeft, ArrowRight, CheckCircle, Circle } from 'phosphor-svelte';
	import type { FlatLesson } from '$lib/course/types';
	import { progress } from '$lib/stores/progress.svelte';

	let {
		prev,
		next,
		moduleSlug,
		lessonSlug
	}: {
		prev?: FlatLesson | undefined;
		next?: FlatLesson | undefined;
		moduleSlug: string;
		lessonSlug: string;
	} = $props();

	const done = $derived(progress.isComplete(moduleSlug, lessonSlug));
</script>

<div class="not-prose mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
	<div class="mb-8 flex justify-center">
		<button
			type="button"
			onclick={() => progress.toggle(moduleSlug, lessonSlug)}
			class="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition
				{done
				? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300'
				: 'bg-brand-600 text-white shadow-sm hover:bg-brand-700'}"
		>
			{#if done}
				<CheckCircle size={18} weight="fill" /> Completed
			{:else}
				<Circle size={18} weight="bold" /> Mark as complete
			{/if}
		</button>
	</div>

	<nav class="grid gap-4 sm:grid-cols-2">
		{#if prev}
			<a
				href={prev.path}
				class="group flex flex-col rounded-xl border border-slate-200 p-4 transition hover:border-brand-300 hover:bg-brand-50/50 dark:border-slate-700 dark:hover:border-brand-500/50 dark:hover:bg-slate-800/50"
			>
				<span class="flex items-center gap-1.5 text-xs font-medium text-slate-400">
					<ArrowLeft size={14} weight="bold" /> Previous
				</span>
				<span
					class="mt-1 font-semibold text-slate-800 group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400"
				>
					{prev.lesson.title}
				</span>
			</a>
		{:else}
			<span></span>
		{/if}

		{#if next}
			<a
				href={next.path}
				class="group flex flex-col rounded-xl border border-slate-200 p-4 text-right transition hover:border-brand-300 hover:bg-brand-50/50 sm:items-end dark:border-slate-700 dark:hover:border-brand-500/50 dark:hover:bg-slate-800/50"
			>
				<span class="flex items-center gap-1.5 text-xs font-medium text-slate-400">
					Next <ArrowRight size={14} weight="bold" />
				</span>
				<span
					class="mt-1 font-semibold text-slate-800 group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400"
				>
					{next.lesson.title}
				</span>
			</a>
		{/if}
	</nav>
</div>
