<script lang="ts">
	// A thin top bar showing how far through the current page the reader has scrolled.
	let progress = $state(0);

	function update(): void {
		const doc = document.documentElement;
		const max = doc.scrollHeight - doc.clientHeight;
		progress = max > 0 ? Math.min(100, Math.round((doc.scrollTop / max) * 100)) : 0;
	}
</script>

<svelte:window onscroll={update} onresize={update} />

<div
	class="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-brand-500 to-brand-400"
	style="transform: scaleX({progress / 100})"
	aria-hidden="true"
></div>
