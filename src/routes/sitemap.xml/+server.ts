import { SITE_URL } from '$lib/config';
import { allLessons } from '$lib/course/navigation';

export const prerender = true;

const staticPaths = [
	'/',
	'/projects',
	'/showcase',
	'/showcase/marketing',
	'/showcase/dashboard',
	'/showcase/components',
	'/showcase/tokens',
	'/reference/cheatsheet',
	'/reference/glossary',
	'/certificate'
];

export function GET() {
	const urls = [...staticPaths, ...allLessons().map((l) => l.path)];
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `\t<url><loc>${SITE_URL}${u}</loc></url>`).join('\n')}
</urlset>`;
	return new Response(body, {
		headers: { 'Content-Type': 'application/xml' }
	});
}
