<script lang="ts">
	import { Target, ListChecks, RocketLaunch } from 'phosphor-svelte';

	let {
		title,
		goal,
		requirements = [],
		stretch = [],
		time = ''
	}: {
		title: string;
		goal: string;
		requirements?: string[];
		stretch?: string[];
		time?: string;
	} = $props();
</script>

<div
	class="not-prose my-8 overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white shadow-sm dark:border-brand-500/30 dark:from-brand-500/10 dark:to-slate-900"
>
	<div class="border-b border-brand-200 px-6 py-4 dark:border-brand-500/30">
		<div class="flex items-center justify-between gap-3">
			<h3 class="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
				<RocketLaunch
					size={22}
					weight="duotone"
					class="text-brand-600 dark:text-brand-400"
					aria-hidden="true"
				/>
				{title}
			</h3>
			{#if time}
				<span
					class="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-500/20 dark:text-brand-300"
				>
					~{time}
				</span>
			{/if}
		</div>
	</div>

	<div class="space-y-5 px-6 py-5">
		<div class="flex gap-3">
			<Target
				size={20}
				weight="duotone"
				class="mt-0.5 shrink-0 text-brand-500"
				aria-hidden="true"
			/>
			<div>
				<p class="text-sm font-semibold text-slate-800 dark:text-slate-100">The goal</p>
				<p class="text-sm text-slate-600 dark:text-slate-300">{goal}</p>
			</div>
		</div>

		{#if requirements.length}
			<div class="flex gap-3">
				<ListChecks
					size={20}
					weight="duotone"
					class="mt-0.5 shrink-0 text-brand-500"
					aria-hidden="true"
				/>
				<div class="min-w-0">
					<p class="mb-1 text-sm font-semibold text-slate-800 dark:text-slate-100">Requirements</p>
					<ul class="space-y-1 text-sm text-slate-600 dark:text-slate-300">
						{#each requirements as req (req)}
							<li class="flex gap-2">
								<span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
								<span>{req}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		{/if}

		{#if stretch.length}
			<div class="flex gap-3">
				<RocketLaunch
					size={20}
					weight="duotone"
					class="mt-0.5 shrink-0 text-accent-500"
					aria-hidden="true"
				/>
				<div class="min-w-0">
					<p class="mb-1 text-sm font-semibold text-slate-800 dark:text-slate-100">Stretch goals</p>
					<ul class="space-y-1 text-sm text-slate-600 dark:text-slate-300">
						{#each stretch as item (item)}
							<li class="flex gap-2">
								<span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400"></span>
								<span>{item}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		{/if}
	</div>
</div>
