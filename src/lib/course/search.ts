import { curriculum } from './curriculum';
import { lessonPath } from './navigation';

export interface SearchItem {
	title: string;
	subtitle: string;
	path: string;
	kind: 'lesson' | 'project' | 'capstone' | 'page';
	haystack: string;
}

const staticPages: SearchItem[] = [
	{
		title: 'Home',
		subtitle: 'Course overview',
		path: '/',
		kind: 'page',
		haystack: 'home overview start'
	},
	{
		title: 'All projects',
		subtitle: 'Projects & capstones',
		path: '/projects',
		kind: 'page',
		haystack: 'projects capstones build'
	},
	{
		title: 'Showcase',
		subtitle: 'Runnable capstone apps',
		path: '/showcase',
		kind: 'page',
		haystack: 'showcase demo apps runnable'
	},
	{
		title: 'Cheatsheet',
		subtitle: 'Utility reference',
		path: '/reference/cheatsheet',
		kind: 'page',
		haystack: 'cheatsheet reference utilities classes'
	},
	{
		title: 'Glossary',
		subtitle: 'Key terms',
		path: '/reference/glossary',
		kind: 'page',
		haystack: 'glossary terms definitions'
	},
	{
		title: 'Certificate',
		subtitle: 'Your completion certificate',
		path: '/certificate',
		kind: 'page',
		haystack: 'certificate completion award'
	}
];

let cached: SearchItem[] | null = null;

/** Build a flat, searchable index of every lesson plus key pages. */
export function buildSearchIndex(): SearchItem[] {
	if (cached) return cached;
	const lessons: SearchItem[] = [];
	for (const module of curriculum) {
		for (const lesson of module.lessons) {
			lessons.push({
				title: lesson.title,
				subtitle: `${module.index}. ${module.title}`,
				path: lessonPath(module.slug, lesson.slug),
				kind: lesson.kind,
				haystack: `${lesson.title} ${lesson.summary} ${module.title}`.toLowerCase()
			});
		}
	}
	cached = [...lessons, ...staticPages];
	return cached;
}

/** Rank index items against a query (cheap substring + word-prefix scoring). */
export function searchItems(query: string, limit = 20): SearchItem[] {
	const index = buildSearchIndex();
	const q = query.trim().toLowerCase();
	if (!q) return index.filter((i) => i.kind !== 'page').slice(0, limit);
	const terms = q.split(/\s+/);
	const scored: Array<{ item: SearchItem; score: number }> = [];
	for (const item of index) {
		let score = 0;
		const title = item.title.toLowerCase();
		for (const t of terms) {
			if (!item.haystack.includes(t)) {
				score = -1;
				break;
			}
			if (title.startsWith(t)) score += 5;
			else if (title.includes(t)) score += 3;
			else score += 1;
		}
		if (score > 0) scored.push({ item, score });
	}
	scored.sort((a, b) => b.score - a.score);
	return scored.slice(0, limit).map((s) => s.item);
}
