<script lang="ts">
	import {
		ChartLineUp,
		Users,
		CurrencyDollar,
		Pulse,
		MagnifyingGlass,
		CaretUpDown
	} from 'phosphor-svelte';

	const stats = [
		{ icon: CurrencyDollar, label: 'Revenue', value: '$48.2k', delta: '+6.4%', up: true },
		{ icon: Users, label: 'Active users', value: '12,480', delta: '+3.1%', up: true },
		{ icon: Pulse, label: 'Churn', value: '1.8%', delta: '+0.3%', up: false },
		{ icon: ChartLineUp, label: 'MRR growth', value: '5.9%', delta: '+1.2%', up: true }
	];

	type Row = { customer: string; status: 'Paid' | 'Overdue' | 'Trial'; amount: number };
	const data: Row[] = [
		{ customer: 'Acme Inc.', status: 'Paid', amount: 1200 },
		{ customer: 'Globex', status: 'Overdue', amount: 840 },
		{ customer: 'Initech', status: 'Paid', amount: 2310 },
		{ customer: 'Umbrella', status: 'Trial', amount: 0 },
		{ customer: 'Soylent', status: 'Paid', amount: 560 },
		{ customer: 'Hooli', status: 'Overdue', amount: 1990 }
	];

	let tab = $state<'overview' | 'customers'>('overview');
	let query = $state('');
	let sortAsc = $state(false);

	const rows = $derived(
		data
			.filter((r) => r.customer.toLowerCase().includes(query.trim().toLowerCase()))
			.sort((a, b) => (sortAsc ? a.amount - b.amount : b.amount - a.amount))
	);

	const tone: Record<Row['status'], string> = {
		Paid: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
		Overdue: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300',
		Trial: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
	};
</script>

<svelte:head><title>Dashboard · Showcase</title></svelte:head>

<div class="@container mx-auto max-w-6xl px-6 py-10">
	<h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Console</h1>

	<!-- tabs -->
	<div
		class="mt-6 inline-flex rounded-lg border border-slate-200 p-1 dark:border-slate-700"
		role="tablist"
	>
		{#each ['overview', 'customers'] as t (t)}
			<button
				role="tab"
				aria-selected={tab === t}
				onclick={() => (tab = t as typeof tab)}
				class="rounded-md px-4 py-1.5 text-sm font-medium capitalize transition {tab === t
					? 'bg-brand-600 text-white'
					: 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}"
			>
				{t}
			</button>
		{/each}
	</div>

	{#if tab === 'overview'}
		<div class="mt-6 grid gap-4 @md:grid-cols-2 @2xl:grid-cols-4">
			{#each stats as s (s.label)}
				{@const Icon = s.icon}
				<div
					class="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
				>
					<div class="flex items-center justify-between">
						<span
							class="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"
						>
							<Icon size={18} weight="duotone" />
						</span>
						<span
							class="text-xs font-medium {s.up
								? 'text-emerald-600 dark:text-emerald-400'
								: 'text-red-600 dark:text-red-400'}">{s.delta}</span
						>
					</div>
					<p class="mt-3 text-2xl font-bold text-slate-900 dark:text-white">{s.value}</p>
					<p class="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
				</div>
			{/each}
		</div>

		<div
			class="mt-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
		>
			<p class="text-sm font-medium text-slate-700 dark:text-slate-200">Revenue (last 12 weeks)</p>
			<div class="mt-4 flex h-40 items-end gap-1.5">
				{#each [40, 55, 48, 62, 70, 58, 75, 82, 78, 90, 86, 96] as h, i (i)}
					<div
						class="flex-1 rounded-t bg-gradient-to-t from-brand-500 to-brand-400 transition-all hover:opacity-80"
						style="height: {h}%"
						title="{h}%"
					></div>
				{/each}
			</div>
		</div>
	{:else}
		<div
			class="mt-6 rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
		>
			<div class="flex items-center gap-2 border-b border-slate-200 p-4 dark:border-slate-700">
				<div class="relative max-w-xs flex-1">
					<MagnifyingGlass
						size={16}
						class="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-slate-400"
					/>
					<input
						bind:value={query}
						placeholder="Search customers…"
						aria-label="Search customers"
						class="w-full rounded-lg border border-slate-300 py-1.5 pr-3 pl-8 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800"
					/>
				</div>
			</div>
			<table class="w-full text-left text-sm">
				<caption class="sr-only">Customers and amounts</caption>
				<thead
					class="bg-slate-50 text-xs text-slate-500 uppercase dark:bg-slate-800/50 dark:text-slate-400"
				>
					<tr>
						<th scope="col" class="px-4 py-3">Customer</th>
						<th scope="col" class="px-4 py-3">Status</th>
						<th scope="col" class="px-4 py-3 text-end">
							<button
								onclick={() => (sortAsc = !sortAsc)}
								class="ml-auto inline-flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200"
							>
								Amount <CaretUpDown size={14} weight="bold" />
							</button>
						</th>
					</tr>
				</thead>
				<tbody
					class="divide-y divide-slate-100 text-slate-700 dark:divide-slate-800 dark:text-slate-200"
				>
					{#each rows as r (r.customer)}
						<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
							<td class="px-4 py-3 font-medium">{r.customer}</td>
							<td class="px-4 py-3"
								><span class="rounded-full px-2 py-0.5 text-xs font-medium {tone[r.status]}"
									>{r.status}</span
								></td
							>
							<td class="px-4 py-3 text-end tabular-nums">${r.amount.toLocaleString()}</td>
						</tr>
					{:else}
						<tr
							><td colspan="3" class="px-4 py-8 text-center text-slate-400"
								>No customers match “{query}”.</td
							></tr
						>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
