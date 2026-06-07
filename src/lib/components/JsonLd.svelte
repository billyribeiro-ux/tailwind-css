<script lang="ts">
	// Injects a JSON-LD structured-data block into <head> for rich SEO results.
	// The tag name is a variable so no literal script tag appears in source
	// (which would confuse the Svelte/Prettier parsers).
	const TAG = 'script';
	let { data }: { data: unknown } = $props();
	// Escape "<" so the payload can never break out of the script element (XSS-safe),
	// even though the data here is static, app-controlled metadata.
	const json = $derived(JSON.stringify(data).replaceAll('<', '\\u003c'));
	const html = $derived(`<${TAG} type="application/ld+json">${json}</${TAG}>`);
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- payload is app-controlled and <-escaped -->
	{@html html}
</svelte:head>
