// Bundled locally (no external CDN) so the live preview works offline.
import tailwindBrowserUrl from '@tailwindcss/browser?url';

// Split so neither the Svelte parser nor ESLint trips over a literal script tag.
const SCRIPT = 'script';

export interface PreviewOptions {
	dark?: boolean;
	/** Extra `@theme`/CSS injected into the iframe (e.g. custom tokens). */
	themeCss?: string;
}

/**
 * Build a full HTML document that compiles Tailwind v4 in-browser via
 * `@tailwindcss/browser`. Used by both the Playground and the Exercise preview.
 */
export function buildPreviewDoc(
	html: string,
	{ dark = false, themeCss = '' }: PreviewOptions = {}
): string {
	return `<!doctype html>
<html class="${dark ? 'dark' : ''}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<${SCRIPT} src="${tailwindBrowserUrl}"></${SCRIPT}>
<style type="text/tailwindcss">@custom-variant dark (&:where(.dark, .dark *));${themeCss}</style>
<style>body{margin:0;padding:1.25rem;font-family:ui-sans-serif,system-ui,sans-serif;}</style>
</head>
<body class="${dark ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-900'}">
${html}
</body>
</html>`;
}
