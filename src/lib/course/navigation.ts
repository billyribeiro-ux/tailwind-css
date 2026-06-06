import { curriculum } from './curriculum';
import type { FlatLesson, ModuleMeta } from './types';

/** Build the route for a lesson. */
export function lessonPath(moduleSlug: string, lessonSlug: string): string {
	return `/learn/${moduleSlug}/${lessonSlug}`;
}

/**
 * Flatten the curriculum into an ordered list of lessons. This single ordering
 * powers prev/next, "lesson 12 of 66" counters, and prerender entries.
 */
export function flattenCurriculum(): FlatLesson[] {
	const flat: FlatLesson[] = [];
	let order = 0;
	for (const module of curriculum) {
		for (const lesson of module.lessons) {
			flat.push({
				module,
				lesson,
				path: lessonPath(module.slug, lesson.slug),
				order: order++
			});
		}
	}
	return flat;
}

/** Memoised flat list — the curriculum is static at build time. */
const FLAT = flattenCurriculum();

export function allLessons(): FlatLesson[] {
	return FLAT;
}

export function totalLessons(): number {
	return FLAT.length;
}

export function findModule(moduleSlug: string): ModuleMeta | undefined {
	return curriculum.find((m) => m.slug === moduleSlug);
}

export function findLesson(moduleSlug: string, lessonSlug: string): FlatLesson | undefined {
	return FLAT.find((f) => f.module.slug === moduleSlug && f.lesson.slug === lessonSlug);
}

export function previousLesson(moduleSlug: string, lessonSlug: string): FlatLesson | undefined {
	const current = findLesson(moduleSlug, lessonSlug);
	if (!current || current.order === 0) return undefined;
	return FLAT[current.order - 1];
}

export function nextLesson(moduleSlug: string, lessonSlug: string): FlatLesson | undefined {
	const current = findLesson(moduleSlug, lessonSlug);
	if (!current) return undefined;
	return FLAT[current.order + 1];
}

/** The very first lesson — used by the "Start the course" call to action. */
export function firstLesson(): FlatLesson {
	const first = FLAT[0];
	if (!first) throw new Error('Curriculum is empty');
	return first;
}

/** Every `{ module, lesson }` slug pair, for SvelteKit prerender `entries()`. */
export function lessonEntries(): Array<{ module: string; lesson: string }> {
	return FLAT.map((f) => ({ module: f.module.slug, lesson: f.lesson.slug }));
}
