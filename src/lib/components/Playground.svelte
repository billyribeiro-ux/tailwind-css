<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { theme } from '$lib/stores/theme.svelte';
	import { ArrowClockwise } from 'phosphor-svelte';
	import type * as MonacoNS from 'monaco-editor';
	import { buildPreviewDoc } from '$lib/monaco/preview';

	let {
		code = '',
		themeCss = '',
		height = 340
	}: { code?: string; themeCss?: string; height?: number } = $props();

	let editorEl: HTMLDivElement;
	let iframe: HTMLIFrameElement;
	let editor: MonacoNS.editor.IStandaloneCodeEditor | null = null;
	let current = $state('');
	let timer: ReturnType<typeof setTimeout> | undefined;

	function render(): void {
		if (iframe) iframe.srcdoc = buildPreviewDoc(current, { dark: theme.isDark, themeCss });
	}

	function scheduleRender(): void {
		clearTimeout(timer);
		timer = setTimeout(render, 250);
	}

	onMount(async () => {
		const { setupMonaco } = await import('$lib/monaco/monaco');
		const monaco = setupMonaco();
		editor = monaco.editor.create(editorEl, {
			value: code,
			language: 'html',
			theme: theme.isDark ? 'course-dark' : 'course-light',
			minimap: { enabled: false },
			fontSize: 13,
			lineNumbers: 'on',
			scrollBeyondLastLine: false,
			automaticLayout: true,
			wordWrap: 'on',
			tabSize: 2,
			padding: { top: 12, bottom: 12 }
		});
		editor.onDidChangeModelContent(() => {
			current = editor?.getValue() ?? '';
			scheduleRender();
		});
		current = editor.getValue();
		render();
	});

	// Re-theme the editor and re-render the preview whenever the global theme flips.
	$effect(() => {
		const dark = theme.isDark;
		editor?.updateOptions({ theme: dark ? 'course-dark' : 'course-light' });
		render();
	});

	onDestroy(() => {
		clearTimeout(timer);
		editor?.dispose();
	});

	function reset(): void {
		editor?.setValue(code);
		current = code;
		render();
	}
</script>

<div
	class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900"
>
	<div
		class="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
	>
		<span class="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
			<span class="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
			Live Playground · edit the HTML
		</span>
		<button
			type="button"
			onclick={reset}
			class="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700"
		>
			<ArrowClockwise size={14} weight="bold" />
			Reset
		</button>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2">
		<div
			bind:this={editorEl}
			class="border-b border-slate-200 lg:border-r lg:border-b-0 dark:border-slate-700"
			style="height: {height}px"
		></div>
		<iframe
			bind:this={iframe}
			title="Live preview"
			class="w-full bg-white dark:bg-slate-900"
			style="height: {height}px"
			sandbox="allow-scripts"
		></iframe>
	</div>
</div>
