import { describe, it, expect } from 'vitest';
import {
	allLessons,
	totalLessons,
	firstLesson,
	findLesson,
	nextLesson,
	previousLesson,
	lessonEntries,
	lessonPath
} from './navigation';

describe('course navigation', () => {
	it('has a non-empty, ordered lesson list', () => {
		expect(totalLessons()).toBeGreaterThan(0);
		expect(allLessons().map((l) => l.order)).toEqual([...Array(totalLessons()).keys()]);
	});

	it('starts at Foundations / What is Tailwind', () => {
		const first = firstLesson();
		expect(first.module.slug).toBe('foundations');
		expect(first.lesson.slug).toBe('what-is-tailwind');
		expect(first.path).toBe('/learn/foundations/what-is-tailwind');
	});

	it('has no previous before the first lesson', () => {
		const first = firstLesson();
		expect(previousLesson(first.module.slug, first.lesson.slug)).toBeUndefined();
	});

	it('has no next after the last lesson', () => {
		const lessons = allLessons();
		const last = lessons[lessons.length - 1]!;
		expect(nextLesson(last.module.slug, last.lesson.slug)).toBeUndefined();
	});

	it('next and previous are inverse of each other', () => {
		const first = firstLesson();
		const second = nextLesson(first.module.slug, first.lesson.slug);
		expect(second).toBeDefined();
		const back = previousLesson(second!.module.slug, second!.lesson.slug);
		expect(back?.path).toBe(first.path);
	});

	it('exposes one prerender entry per lesson', () => {
		expect(lessonEntries()).toHaveLength(totalLessons());
	});

	it('resolves a known lesson and rejects an unknown one', () => {
		expect(findLesson('foundations', 'what-is-tailwind')).toBeDefined();
		expect(findLesson('nope', 'nope')).toBeUndefined();
	});

	it('builds lesson paths consistently', () => {
		expect(lessonPath('layout', 'flexbox')).toBe('/learn/layout/flexbox');
	});
});
