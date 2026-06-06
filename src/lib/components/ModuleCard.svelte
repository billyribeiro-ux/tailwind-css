<script lang="ts">
	import type { ModuleMeta } from '$lib/course/types';
	import { lessonPath } from '$lib/course/navigation';
	import { progress } from '$lib/stores/progress.svelte';
	import ModuleIcon from './ModuleIcon.svelte';
	import ProgressBar from './ProgressBar.svelte';
	import { ArrowRight } from 'phosphor-svelte';

	let { module }: { module: ModuleMeta } = $props();

	const difficultyStyles: Record<string, string> = {
		beginner: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
		intermediate: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
		advanced: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
		expert: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
		distinguished: 'bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300'
	};

	const first = $derived(module.lessons[0]);
	const completed = $derived(progress.completedInModule(module.slug));
</script>

<a
	href={first ? lessonPath(module.slug, first.slug) : '#'}
	class="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:hover:border-brand-500/50"
>
	<div class="mb-4 flex items-start justify-between">
		<div
			class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"
		>
			<ModuleIcon name={module.icon} size={26} />
		</div>
		<span
			class="rounded-full px-2.5 py-1 text-xs font-medium capitalize {difficultyStyles[
				module.difficulty
			]}"
		>
			{module.difficulty}
		</span>
	</div>

	<p class="text-xs font-semibold tracking-wide text-brand-500 uppercase">
		Module {module.index}
	</p>
	<h3
		class="mt-1 text-lg font-bold text-slate-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400"
	>
		{module.title}
	</h3>
	<p class="mt-1 flex-1 text-sm text-slate-600 dark:text-slate-400">{module.tagline}</p>

	<div class="mt-4">
		<ProgressBar value={completed} max={module.lessons.length} />
		<div class="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
			<span>{module.lessons.length} lessons</span>
			<span class="flex items-center gap-1 font-medium text-brand-600 dark:text-brand-400">
				Start <ArrowRight size={14} weight="bold" class="transition group-hover:translate-x-0.5" />
			</span>
		</div>
	</div>
</a>
