<script lang="ts">
	import { page } from '$app/state';
	import { House, ArrowLeft } from 'phosphor-svelte';
	import { firstLesson } from '$lib/course/navigation';

	const start = firstLesson();
</script>

<svelte:head>
	<title>{page.status} · Tailwind Mastery</title>
</svelte:head>

<section class="mx-auto flex max-w-md flex-col items-center px-6 py-24 text-center">
	<p class="text-7xl font-extrabold tracking-tight text-brand-600 dark:text-brand-400">
		{page.status}
	</p>
	<h1 class="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
		{page.status === 404 ? 'Lesson not found' : 'Something went wrong'}
	</h1>
	<p class="mt-2 text-slate-600 dark:text-slate-400">
		{page.error?.message ?? 'That page took an unexpected detour.'}
	</p>

	<div class="mt-8 flex flex-col gap-3 sm:flex-row">
		<a
			href="/"
			class="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 font-semibold text-white transition hover:bg-brand-700"
		>
			<House size={18} weight="duotone" /> Home
		</a>
		<a
			href={start.path}
			class="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
		>
			<ArrowLeft size={18} weight="bold" /> Start the course
		</a>
	</div>
</section>
