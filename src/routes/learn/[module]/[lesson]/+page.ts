import { error } from '@sveltejs/kit';
import { findLesson, previousLesson, nextLesson, lessonEntries } from '$lib/course/navigation';
import type { EntryGenerator, PageLoad } from './$types';

// Tell the prerenderer every (module, lesson) pair that exists.
export const entries: EntryGenerator = () => lessonEntries();

export const load: PageLoad = ({ params }) => {
	const flat = findLesson(params.module, params.lesson);
	if (!flat) error(404, 'Lesson not found');

	// Only serializable data crosses the load boundary; the lesson *component*
	// is resolved in +page.svelte via a synchronous glob so it renders into the
	// prerendered HTML without a serialization step.
	return {
		flat,
		prev: previousLesson(params.module, params.lesson),
		next: nextLesson(params.module, params.lesson)
	};
};
