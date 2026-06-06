<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { theme } from '$lib/stores/theme.svelte';
	import { Copy, Check, Play, X } from 'phosphor-svelte';
	import type * as MonacoNS from 'monaco-editor';
	import Playground from './Playground.svelte';

	let {
		code = '',
		language = 'html',
		filename = '',
		/** When true, show an "Open in Playground" button that makes this example live. */
		playground = false,
		/** Custom @theme CSS forwarded to the playground iframe. */
		themeCss = '',
		maxHeight = 420
	}: {
		code?: string;
		language?: string;
		filename?: string;
		playground?: boolean;
		themeCss?: string;
		maxHeight?: number;
	} = $props();

	let editorEl: HTMLDivElement;
	let editor: MonacoNS.editor.IStandaloneCodeEditor | null = null;
	let copied = $state(false);
	let live = $state(false);

	const trimmed = $derived(code.replace(/\s+$/, ''));

	function computedHeight(): number {
		const lines = trimmed.split('\n').length;
		return Math.min(lines * 20 + 24, maxHeight);
	}

	onMount(async () => {
		const { setupMonaco } = await import('$lib/monaco/monaco');
		const monaco = setupMonaco();
		editor = monaco.editor.create(editorEl, {
			value: trimmed,
			language,
			readOnly: true,
			theme: theme.isDark ? 'course-dark' : 'course-light',
			minimap: { enabled: false },
			fontSize: 13,
			lineNumbers: 'on',
			scrollBeyondLastLine: false,
			automaticLayout: true,
			wordWrap: 'on',
			tabSize: 2,
			renderLineHighlight: 'none',
			padding: { top: 12, bottom: 12 }
		});
	});

	$effect(() => {
		editor?.updateOptions({ theme: theme.isDark ? 'course-dark' : 'course-light' });
	});

	onDestroy(() => editor?.dispose());

	async function copy(): Promise<void> {
		try {
			await navigator.clipboard.writeText(trimmed);
			copied = true;
			setTimeout(() => (copied = false), 1500);
		} catch {
			// Clipboard may be unavailable (e.g. insecure context) — fail quietly.
		}
	}
</script>

<figure class="not-prose my-6">
	<div
		class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900"
	>
		<div
			class="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
		>
			<div class="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
				<span class="flex gap-1.5">
					<span class="h-2.5 w-2.5 rounded-full bg-red-400"></span>
					<span class="h-2.5 w-2.5 rounded-full bg-amber-400"></span>
					<span class="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
				</span>
				<span class="ml-1">{filename || language}</span>
			</div>
			<div class="flex items-center gap-1">
				{#if playground}
					<button
						type="button"
						onclick={() => (live = !live)}
						class="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-brand-600 transition hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-slate-700"
					>
						{#if live}
							<X size={14} weight="bold" /> Close
						{:else}
							<Play size={14} weight="fill" /> Open in Playground
						{/if}
					</button>
				{/if}
				<button
					type="button"
					onclick={copy}
					aria-label="Copy code"
					class="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700"
				>
					{#if copied}
						<Check size={14} weight="bold" class="text-emerald-500" /> Copied
					{:else}
						<Copy size={14} weight="bold" /> Copy
					{/if}
				</button>
			</div>
		</div>

		<div bind:this={editorEl} style="height: {computedHeight()}px" class:hidden={live}></div>

		{#if live}
			<Playground code={trimmed} {themeCss} />
		{/if}
	</div>
</figure>
