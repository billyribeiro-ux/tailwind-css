import { describe, it, expect } from 'vitest';
import { allLessons } from './navigation';

// Every authored lesson file, discovered at build time.
const files = import.meta.glob('/src/lib/content/**/*.svx');

/**
 * Integrity ratchet: the curriculum (single source of truth) and the authored
 * `.svx` content must stay in perfect sync. If someone adds a lesson to the
 * curriculum without writing it (or writes a file not wired into the curriculum),
 * this fails the build instead of shipping a broken/orphaned page.
 */
describe('curriculum ↔ content integrity', () => {
	const expected = allLessons().map(
		(l) => `/src/lib/content/${l.module.slug}/${l.lesson.slug}.svx`
	);
	const actual = Object.keys(files);

	it('every curriculum lesson has a matching .svx file', () => {
		const missing = expected.filter((p) => !actual.includes(p));
		expect(missing, `Missing content files:\n${missing.join('\n')}`).toEqual([]);
	});

	it('every .svx file is wired into the curriculum', () => {
		const orphaned = actual.filter((p) => !expected.includes(p));
		expect(orphaned, `Orphaned content files:\n${orphaned.join('\n')}`).toEqual([]);
	});

	it('has no duplicate lesson routes', () => {
		const paths = allLessons().map((l) => l.path);
		expect(new Set(paths).size).toBe(paths.length);
	});
});
