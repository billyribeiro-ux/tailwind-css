<script lang="ts">
	import { Sun, Moon } from 'phosphor-svelte';
	import { theme } from '$lib/stores/theme.svelte';
</script>

<button
	type="button"
	onclick={() => theme.toggle()}
	aria-label="Toggle dark mode"
	title="Toggle dark mode"
	class="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
>
	{#if theme.isDark}
		<Sun size={20} weight="duotone" />
	{:else}
		<Moon size={20} weight="duotone" />
	{/if}
</button>
