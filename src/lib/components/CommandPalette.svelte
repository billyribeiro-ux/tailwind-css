<script lang="ts">
	import { goto } from '$app/navigation';
	import { commandPalette } from '$lib/stores/ui.svelte';
	import { searchItems, type SearchItem } from '$lib/course/search';
	import { MagnifyingGlass, Wrench, Crown, BookOpen, FileText } from 'phosphor-svelte';

	let query = $state('');
	let active = $state(0);
	let inputEl = $state<HTMLInputElement | null>(null);

	const results = $derived(searchItems(query));

	// Reset + focus whenever the palette opens.
	$effect(() => {
		if (commandPalette.open) {
			query = '';
			active = 0;
			queueMicrotask(() => inputEl?.focus());
		}
	});

	// Keep the active index in range as results change.
	$effect(() => {
		if (active >= results.length) active = Math.max(0, results.length - 1);
	});

	function select(item: SearchItem | undefined): void {
		if (!item) return;
		commandPalette.hide();
		void goto(item.path);
	}

	function onKeydown(e: KeyboardEvent): void {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			active = Math.min(active + 1, results.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			active = Math.max(active - 1, 0);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			select(results[active]);
		} else if (e.key === 'Escape') {
			commandPalette.hide();
		}
	}

	function iconFor(kind: SearchItem['kind']) {
		if (kind === 'project') return Wrench;
		if (kind === 'capstone') return Crown;
		if (kind === 'page') return FileText;
		return BookOpen;
	}
</script>

<!-- Global shortcut: Cmd/Ctrl-K toggles, "/" opens when not typing -->
<svelte:window
	onkeydown={(e) => {
		if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
			e.preventDefault();
			commandPalette.toggle();
		} else if (
			e.key === '/' &&
			!commandPalette.open &&
			!/^(INPUT|TEXTAREA|SELECT)$/.test((e.target as HTMLElement)?.tagName) &&
			!(e.target as HTMLElement)?.isContentEditable
		) {
			e.preventDefault();
			commandPalette.show();
		}
	}}
/>

{#if commandPalette.open}
	<div class="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[12vh] sm:pt-[18vh]">
		<button
			type="button"
			aria-label="Close search"
			class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
			onclick={() => commandPalette.hide()}
		></button>

		<div
			role="dialog"
			aria-modal="true"
			aria-label="Search the course"
			class="relative w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
		>
			<div class="flex items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-700">
				<MagnifyingGlass size={20} class="shrink-0 text-slate-400" />
				<input
					bind:this={inputEl}
					bind:value={query}
					onkeydown={onKeydown}
					type="text"
					placeholder="Search lessons, projects, reference…"
					class="w-full border-0 bg-transparent py-4 text-slate-900 outline-none placeholder:text-slate-400 focus:ring-0 dark:text-white"
				/>
				<kbd
					class="hidden rounded border border-slate-200 px-1.5 py-0.5 text-xs text-slate-400 sm:block dark:border-slate-700"
					>esc</kbd
				>
			</div>

			<ul class="max-h-[50vh] overflow-y-auto p-2">
				{#each results as item, i (item.path)}
					{@const Icon = iconFor(item.kind)}
					<li>
						<button
							type="button"
							onclick={() => select(item)}
							onmousemove={() => (active = i)}
							class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition
								{active === i ? 'bg-brand-50 dark:bg-brand-500/15' : ''}"
						>
							<Icon
								size={18}
								weight="duotone"
								class="shrink-0 {active === i
									? 'text-brand-600 dark:text-brand-400'
									: 'text-slate-400'}"
							/>
							<span class="min-w-0 flex-1">
								<span class="block truncate font-medium text-slate-800 dark:text-slate-100"
									>{item.title}</span
								>
								<span class="block truncate text-xs text-slate-400">{item.subtitle}</span>
							</span>
							{#if item.kind !== 'page' && item.kind !== 'lesson'}
								<span
									class="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 capitalize dark:bg-slate-800 dark:text-slate-400"
									>{item.kind}</span
								>
							{/if}
						</button>
					</li>
				{:else}
					<li class="px-3 py-8 text-center text-sm text-slate-400">No matches for “{query}”.</li>
				{/each}
			</ul>

			<div
				class="flex items-center gap-4 border-t border-slate-200 px-4 py-2 text-xs text-slate-400 dark:border-slate-700"
			>
				<span><kbd class="font-sans">↑↓</kbd> navigate</span>
				<span><kbd class="font-sans">↵</kbd> open</span>
				<span class="ml-auto"><kbd class="font-sans">⌘K</kbd> toggle</span>
			</div>
		</div>
	</div>
{/if}
