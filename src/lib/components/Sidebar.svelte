<script lang="ts">
	import { page } from '$app/state';
	import { curriculum } from '$lib/course/curriculum';
	import { lessonPath } from '$lib/course/navigation';
	import { progress } from '$lib/stores/progress.svelte';
	import ModuleIcon from './ModuleIcon.svelte';
	import { CheckCircle, Circle, CaretRight, MagnifyingGlass } from 'phosphor-svelte';

	let { onNavigate }: { onNavigate?: () => void } = $props();

	let filter = $state('');

	const currentPath = $derived(page.url.pathname);
	const q = $derived(filter.trim().toLowerCase());

	// Filter the curriculum down to modules with at least one matching lesson.
	const filtered = $derived(
		curriculum
			.map((module) => ({
				module,
				lessons: q
					? module.lessons.filter(
							(l) =>
								l.title.toLowerCase().includes(q) ||
								l.summary.toLowerCase().includes(q) ||
								module.title.toLowerCase().includes(q)
						)
					: module.lessons
			}))
			.filter((m) => m.lessons.length > 0)
	);

	function isCurrent(moduleSlug: string, lessonSlug: string): boolean {
		return currentPath === lessonPath(moduleSlug, lessonSlug);
	}

	function moduleActive(moduleSlug: string): boolean {
		return currentPath.startsWith(`/learn/${moduleSlug}/`);
	}
</script>

<div class="p-4">
	<label class="relative mb-3 block">
		<MagnifyingGlass
			size={16}
			class="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-slate-400"
		/>
		<input
			bind:value={filter}
			type="search"
			placeholder="Filter lessons…"
			aria-label="Filter lessons"
			class="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pr-3 pl-8 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-brand-500/30"
		/>
	</label>

	<nav class="space-y-1 text-sm" aria-label="Course contents">
		{#each filtered as { module, lessons } (module.slug)}
			{@const done = progress.completedInModule(module.slug)}
			<details open={q !== '' || moduleActive(module.slug)} class="group">
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
						{done}/{module.lessons.length}
					</span>
				</summary>

				<ul class="mt-1 mb-2 space-y-0.5 border-l border-slate-200 pl-3 dark:border-slate-700">
					{#each lessons as lesson (lesson.slug)}
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
		{:else}
			<p class="px-2 py-6 text-center text-xs text-slate-400">No lessons match “{filter}”.</p>
		{/each}
	</nav>
</div>
