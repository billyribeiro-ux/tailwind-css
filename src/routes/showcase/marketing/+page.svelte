<script lang="ts">
	import { Lightning, ShieldCheck, ChartLineUp, ArrowRight, Check } from 'phosphor-svelte';

	const features = [
		{
			icon: Lightning,
			title: 'Blazing fast',
			desc: 'Microsecond rebuilds and tiny CSS keep everything instant.'
		},
		{
			icon: ShieldCheck,
			title: 'Secure by default',
			desc: 'Sensible defaults and audited primitives out of the box.'
		},
		{
			icon: ChartLineUp,
			title: 'Insightful',
			desc: 'Understand your product with analytics that explain themselves.'
		}
	];
	const plans = [
		{ name: 'Starter', price: '$0', features: ['1 project', 'Community support'], featured: false },
		{
			name: 'Pro',
			price: '$29',
			features: ['Unlimited projects', 'Priority support', 'Advanced analytics'],
			featured: true
		},
		{
			name: 'Scale',
			price: '$99',
			features: ['Everything in Pro', 'SSO & audit logs', 'SLA'],
			featured: false
		}
	];
</script>

<svelte:head><title>Marketing · Showcase</title></svelte:head>

<div class="bg-white dark:bg-slate-950">
	<!-- hero -->
	<section class="relative overflow-hidden">
		<div
			class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,--alpha(var(--color-brand-500)/15%),transparent)]"
		></div>
		<div class="mx-auto max-w-3xl px-6 py-24 text-center">
			<span
				class="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300"
			>
				● New · v4 ready
			</span>
			<h1
				class="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl dark:text-white"
			>
				Analytics that
				<span class="bg-gradient-to-r from-brand-500 to-fuchsia-500 bg-clip-text text-transparent"
					>explain themselves</span
				>
			</h1>
			<p class="mx-auto mt-5 max-w-prose text-lg text-slate-600 dark:text-slate-300">
				Ship insight, not dashboards. Set up in minutes, understand in seconds.
			</p>
			<div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
				<a
					href="#pricing"
					class="rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-700"
					>Start free</a
				>
				<a
					href="#features"
					class="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
					>See features</a
				>
			</div>
		</div>
	</section>

	<!-- features -->
	<section id="features" class="mx-auto max-w-5xl px-6 py-16">
		<div class="grid gap-6 sm:grid-cols-3">
			{#each features as f (f.title)}
				{@const Icon = f.icon}
				<div
					class="group rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700"
				>
					<div
						class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-500/15 dark:text-brand-400"
					>
						<Icon size={24} weight="duotone" />
					</div>
					<h3 class="font-semibold text-slate-900 dark:text-white">{f.title}</h3>
					<p class="mt-1 text-sm text-slate-600 dark:text-slate-400">{f.desc}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- pricing -->
	<section id="pricing" class="mx-auto max-w-5xl px-6 py-16">
		<h2 class="mb-10 text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
			Simple pricing
		</h2>
		<div class="grid items-start gap-6 sm:grid-cols-3">
			{#each plans as plan (plan.name)}
				<div
					class="rounded-3xl border bg-white p-6 dark:bg-slate-900 {plan.featured
						? 'border-brand-500 shadow-xl ring-2 ring-brand-500'
						: 'border-slate-200 dark:border-slate-700'}"
				>
					{#if plan.featured}
						<span
							class="inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold tracking-wide text-brand-700 uppercase dark:bg-brand-500/20 dark:text-brand-300"
							>Most popular</span
						>
					{/if}
					<h3 class="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{plan.name}</h3>
					<p class="mt-3">
						<span class="text-4xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span
						><span class="text-sm text-slate-400">/mo</span>
					</p>
					<ul class="mt-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
						{#each plan.features as feat (feat)}
							<li class="flex items-center gap-2">
								<Check size={16} weight="bold" class="text-emerald-500" />
								{feat}
							</li>
						{/each}
					</ul>
					<button
						class="mt-6 w-full rounded-xl px-4 py-2.5 font-semibold transition {plan.featured
							? 'bg-brand-600 text-white hover:bg-brand-700'
							: 'border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'}"
					>
						Choose {plan.name}
					</button>
				</div>
			{/each}
		</div>
	</section>

	<!-- CTA -->
	<section class="mx-auto max-w-5xl px-6 pb-24">
		<div
			class="flex flex-col items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-brand-600 to-brand-800 p-10 text-center sm:flex-row sm:text-left"
		>
			<div>
				<h2 class="text-2xl font-bold text-white">Ready to ship faster?</h2>
				<p class="mt-1 text-brand-100">Join thousands of teams building with confidence.</p>
			</div>
			<a
				href="#pricing"
				class="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-brand-700 transition hover:bg-brand-50"
			>
				Get started <ArrowRight size={18} weight="bold" />
			</a>
		</div>
	</section>
</div>
