/**
 * Course domain model.
 *
 * The curriculum is the single source of truth for ordering, titles and metadata.
 * Lesson *prose* lives in `src/lib/content/**` as mdsvex; this file describes the
 * *shape* of the course so navigation, the sidebar, progress and prerendering can
 * all be derived from one place.
 */

export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'distinguished';

export type LessonKind = 'lesson' | 'project' | 'capstone';

export interface LessonMeta {
	/** URL-safe id, unique within its module. */
	slug: string;
	title: string;
	/** One-sentence summary shown in lists and cards. */
	summary: string;
	/** Rough reading/practice time in minutes. */
	duration: number;
	kind: LessonKind;
}

export interface ModuleMeta {
	/** URL-safe id, unique across the course. */
	slug: string;
	/** 1-based position in the learning path. */
	index: number;
	title: string;
	/** Short hook shown under the title. */
	tagline: string;
	description: string;
	difficulty: Difficulty;
	/** Key into the Phosphor icon map (see ModuleIcon.svelte). */
	icon: string;
	lessons: LessonMeta[];
}

export type Curriculum = ModuleMeta[];

/** A lesson plus its module and resolved route — produced by the navigation helpers. */
export interface FlatLesson {
	module: ModuleMeta;
	lesson: LessonMeta;
	/** e.g. `/learn/foundations/what-is-tailwind`. */
	path: string;
	/** 0-based position across the entire flattened course. */
	order: number;
}
