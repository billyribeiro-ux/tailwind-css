<script lang="ts">
	import { onDestroy, onMount, type Snippet } from 'svelte';
	import { theme } from '$lib/stores/theme.svelte';
	import { buildPreviewDoc } from '$lib/monaco/preview';
	import type * as MonacoNS from 'monaco-editor';
	import {
		CheckCircle,
		Circle,
		XCircle,
		ArrowClockwise,
		Eye,
		EyeSlash,
		Sparkle
	} from 'phosphor-svelte';

	export interface Check {
		label: string;
		/** Passes if `querySelector(selector)` matches the user's HTML. */
		selector?: string;
		/** Passes if every substring is present in the raw code. */
		includes?: string | string[];
		/** Passes if none of these substrings are present. */
		missing?: string | string[];
		/** Advanced: custom predicate over the parsed document + raw string. */
		test?: (doc: Document, raw: string) => boolean;
	}

	let {
		title = 'Your turn',
		start = '',
		solution = '',
		checks = [],
		themeCss = '',
		height = 300,
		children
	}: {
		title?: string;
		start?: string;
		solution?: string;
		checks?: Check[];
		themeCss?: string;
		height?: number;
		children?: Snippet;
	} = $props();

	let editorEl: HTMLDivElement;
	let iframe: HTMLIFrameElement;
	let editor: MonacoNS.editor.IStandaloneCodeEditor | null = null;
	let current = $state('');
	let results = $state<boolean[]>([]);
	let checked = $state(false);
	let showSolution = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	const allPass = $derived(checked && results.length === checks.length && results.every(Boolean));

	function render(): void {
		if (iframe) iframe.srcdoc = buildPreviewDoc(current, { dark: theme.isDark, themeCss });
	}
	function scheduleRender(): void {
		clearTimeout(timer);
		timer = setTimeout(render, 250);
	}

	function toArray(v: string | string[] | undefined): string[] {
		return v === undefined ? [] : Array.isArray(v) ? v : [v];
	}

	function evaluate(): void {
		const raw = current;
		const doc = new DOMParser().parseFromString(raw, 'text/html');
		results = checks.map((c) => {
			try {
				if (c.test) return c.test(doc, raw);
				if (c.selector && !doc.querySelector(c.selector)) return false;
				if (toArray(c.includes).some((s) => !raw.includes(s))) return false;
				if (toArray(c.missing).some((s) => raw.includes(s))) return false;
				return true;
			} catch {
				return false;
			}
		});
		checked = true;
	}

	onMount(async () => {
		const { setupMonaco } = await import('$lib/monaco/monaco');
		const monaco = setupMonaco();
		editor = monaco.editor.create(editorEl, {
			value: start,
			language: 'html',
			theme: theme.isDark ? 'course-dark' : 'course-light',
			minimap: { enabled: false },
			fontSize: 13,
			scrollBeyondLastLine: false,
			automaticLayout: true,
			wordWrap: 'on',
			tabSize: 2,
			padding: { top: 12, bottom: 12 }
		});
		editor.onDidChangeModelContent(() => {
			current = editor?.getValue() ?? '';
			checked = false;
			scheduleRender();
		});
		current = editor.getValue();
		render();
	});

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
		editor?.setValue(start);
		current = start;
		checked = false;
		showSolution = false;
		render();
	}

	function toggleSolution(): void {
		showSolution = !showSolution;
		if (showSolution && solution) {
			editor?.setValue(solution);
			current = solution;
			render();
		}
	}
</script>

<div
	class="not-prose my-8 overflow-hidden rounded-2xl border border-brand-200 bg-brand-50/40 dark:border-brand-500/30 dark:bg-brand-500/5"
>
	<div class="flex items-center gap-2 border-b border-brand-200 px-5 py-3 dark:border-brand-500/30">
		<Sparkle size={18} weight="fill" class="text-brand-600 dark:text-brand-400" />
		<h4 class="font-semibold text-slate-900 dark:text-white">{title}</h4>
		<span class="ml-auto text-xs font-medium text-brand-600 dark:text-brand-400">Exercise</span>
	</div>

	{#if children}
		<div class="px-5 py-3 text-sm text-slate-700 dark:text-slate-300">
			{@render children()}
		</div>
	{/if}

	<div class="grid grid-cols-1 lg:grid-cols-2">
		<div
			bind:this={editorEl}
			class="border-y border-brand-200 lg:border-y-0 lg:border-e dark:border-brand-500/30"
			style="height: {height}px"
		></div>
		<iframe
			bind:this={iframe}
			title="Exercise preview"
			class="w-full bg-white dark:bg-slate-900"
			style="height: {height}px"
			sandbox="allow-scripts"
		></iframe>
	</div>

	<!-- checks -->
	<ul class="space-y-1.5 px-5 py-4">
		{#each checks as check, i (check.label)}
			<li class="flex items-center gap-2 text-sm">
				{#if !checked}
					<Circle size={18} class="shrink-0 text-slate-300 dark:text-slate-600" />
					<span class="text-slate-500 dark:text-slate-400">{check.label}</span>
				{:else if results[i]}
					<CheckCircle size={18} weight="fill" class="shrink-0 text-emerald-500" />
					<span class="text-slate-700 dark:text-slate-200">{check.label}</span>
				{:else}
					<XCircle size={18} weight="fill" class="shrink-0 text-red-500" />
					<span class="text-slate-700 dark:text-slate-200">{check.label}</span>
				{/if}
			</li>
		{/each}
	</ul>

	{#if allPass}
		<p
			class="mx-5 mb-4 flex items-center gap-2 rounded-lg bg-emerald-100 px-4 py-2.5 text-sm font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
		>
			<CheckCircle size={18} weight="fill" /> Nicely done — every check passes!
		</p>
	{/if}

	<div
		class="flex flex-wrap items-center gap-2 border-t border-brand-200 px-5 py-3 dark:border-brand-500/30"
	>
		<button
			type="button"
			onclick={evaluate}
			class="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
		>
			<CheckCircle size={16} weight="bold" /> Check my work
		</button>
		<button
			type="button"
			onclick={reset}
			class="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-slate-700/60"
		>
			<ArrowClockwise size={16} weight="bold" /> Reset
		</button>
		{#if solution}
			<button
				type="button"
				onclick={toggleSolution}
				class="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-slate-700/60"
			>
				{#if showSolution}<EyeSlash size={16} weight="bold" /> Hide solution{:else}<Eye
						size={16}
						weight="bold"
					/> Show solution{/if}
			</button>
		{/if}
	</div>
</div>
