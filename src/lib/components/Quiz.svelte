<script lang="ts">
	import { CheckCircle, XCircle, Circle } from 'phosphor-svelte';

	interface Option {
		text: string;
		correct?: boolean;
	}

	let {
		question,
		options,
		explanation = ''
	}: { question: string; options: Option[]; explanation?: string } = $props();

	let selected = $state<number | null>(null);
	let answered = $state(false);

	function choose(i: number): void {
		if (answered) return;
		selected = i;
		answered = true;
	}

	const isCorrect = $derived(answered && selected !== null && options[selected]?.correct === true);
</script>

<div
	class="not-prose my-6 rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/50"
>
	<p class="mb-4 flex items-start gap-2 font-semibold text-slate-800 dark:text-slate-100">
		<span
			class="mt-0.5 rounded-md bg-brand-100 px-2 py-0.5 text-xs font-bold tracking-wide text-brand-700 uppercase dark:bg-brand-500/20 dark:text-brand-300"
		>
			Quiz
		</span>
		<span>{question}</span>
	</p>

	<ul class="space-y-2">
		{#each options as option, i (i)}
			{@const chosen = selected === i}
			{@const reveal = answered && option.correct}
			<li>
				<button
					type="button"
					onclick={() => choose(i)}
					disabled={answered}
					class="flex w-full items-center gap-3 rounded-lg border px-4 py-2.5 text-left text-sm transition
						{reveal
						? 'border-emerald-400 bg-emerald-50 dark:border-emerald-500/50 dark:bg-emerald-500/10'
						: chosen
							? 'border-red-400 bg-red-50 dark:border-red-500/50 dark:bg-red-500/10'
							: 'border-slate-200 bg-white hover:border-brand-300 dark:border-slate-700 dark:bg-slate-900'}
						{answered ? 'cursor-default' : 'cursor-pointer'}"
				>
					<span class="shrink-0">
						{#if reveal}
							<CheckCircle size={20} weight="fill" class="text-emerald-500" aria-hidden="true" />
						{:else if chosen}
							<XCircle size={20} weight="fill" class="text-red-500" aria-hidden="true" />
						{:else}
							<Circle size={20} class="text-slate-400" aria-hidden="true" />
						{/if}
					</span>
					<span class="text-slate-700 dark:text-slate-200">{option.text}</span>
				</button>
			</li>
		{/each}
	</ul>

	{#if answered}
		<p
			class="mt-4 text-sm font-medium {isCorrect
				? 'text-emerald-600 dark:text-emerald-400'
				: 'text-amber-600 dark:text-amber-400'}"
		>
			{isCorrect ? 'Correct! ' : 'Not quite. '}
			{#if explanation}<span class="font-normal text-slate-600 dark:text-slate-400"
					>{explanation}</span
				>{/if}
		</p>
	{/if}
</div>
