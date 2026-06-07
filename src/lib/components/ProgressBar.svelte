<script lang="ts">
	let {
		value,
		max = 100,
		label = '',
		class: className = ''
	}: { value: number; max?: number; label?: string; class?: string } = $props();

	const percent = $derived(max === 0 ? 0 : Math.round((value / max) * 100));
</script>

<div class={className}>
	{#if label}
		<div
			class="mb-1 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400"
		>
			<span>{label}</span>
			<span>{percent}%</span>
		</div>
	{/if}
	<div
		class="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
		role="progressbar"
		aria-label={label || 'Progress'}
		aria-valuenow={value}
		aria-valuemin={0}
		aria-valuemax={max}
		aria-valuetext="{percent}%"
	>
		<div
			class="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400 transition-[width] duration-500"
			style="width: {percent}%"
		></div>
	</div>
</div>
