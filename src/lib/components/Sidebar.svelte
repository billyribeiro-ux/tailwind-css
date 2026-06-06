<script lang="ts">
	import { page } from '$app/state';
	import { curriculum } from '$lib/course/curriculum';
	import { lessonPath } from '$lib/course/navigation';
	import { progress } from '$lib/stores/progress.svelte';
	import ModuleIcon from './ModuleIcon.svelte';
	import { CheckCircle, Circle, CaretRight } from 'phosphor-svelte';

	let { onNavigate }: { onNavigate?: () => void } = $props();

	const currentPath = $derived(page.url.pathname);

	function isCurrent(moduleSlug: string, lessonSlug: string): boolean {
		return currentPath === lessonPath(moduleSlug, lessonSlug);
	}

	function moduleActive(moduleSlug: string): boolean {
		return currentPath.startsWith(`/learn/${moduleSlug}/`);
	}
</script>

<nav class="space-y-1 p-4 text-sm" aria-label="Course contents">
	{#each curriculum as module (module.slug)}
		{@const total = module.lessons.length}
		{@const done = progress.completedInModule(module.slug)}
		<details open={moduleActive(module.slug)} class="group">
			<summary
				class="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 font-medium text-slate-700 transition select-none hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
			>
				<CaretRight
					size={14}
					weight="bold"
					class="shrink-0 text-slate-400 transition-transform group-open:rotate-90"
				/>
				<ModuleIcon
					name={module.icon}
					size={18}
					class="shrink-0 text-brand-500 dark:text-brand-400"
				/>
				<span class="flex-1 truncate">{module.index}. {module.title}</span>
				<span class="shrink-0 text-[10px] font-normal text-slate-400 tabular-nums">
					{done}/{total}
				</span>
			</summary>

			<ul class="mt-1 mb-2 space-y-0.5 border-l border-slate-200 pl-3 dark:border-slate-700">
				{#each module.lessons as lesson (lesson.slug)}
					{@const active = isCurrent(module.slug, lesson.slug)}
					{@const complete = progress.isComplete(module.slug, lesson.slug)}
					<li>
						<a
							href={lessonPath(module.slug, lesson.slug)}
							onclick={onNavigate}
							aria-current={active ? 'page' : undefined}
							class="flex items-center gap-2 rounded-md px-2 py-1.5 transition
								{active
								? 'bg-brand-50 font-medium text-brand-700 dark:bg-brand-500/15 dark:text-brand-300'
								: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'}"
						>
							{#if complete}
								<CheckCircle size={15} weight="fill" class="shrink-0 text-emerald-500" />
							{:else}
								<Circle size={15} class="shrink-0 text-slate-300 dark:text-slate-600" />
							{/if}
							<span class="truncate">{lesson.title}</span>
						</a>
					</li>
				{/each}
			</ul>
		</details>
	{/each}
</nav>
