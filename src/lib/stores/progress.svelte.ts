import { browser } from '$app/environment';
import { SvelteSet } from 'svelte/reactivity';
import { totalLessons } from '$lib/course/navigation';

const STORAGE_KEY = 'twcourse:completed';

/** A lesson id is `"<moduleSlug>/<lessonSlug>"`. */
function lessonId(moduleSlug: string, lessonSlug: string): string {
	return `${moduleSlug}/${lessonSlug}`;
}

function loadInto(set: SvelteSet<string>): void {
	if (!browser) return;
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return;
		const parsed: unknown = JSON.parse(raw);
		if (Array.isArray(parsed)) {
			for (const v of parsed) if (typeof v === 'string') set.add(v);
		}
	} catch {
		// Ignore corrupt storage.
	}
}

/**
 * Course progress, persisted to localStorage. Backed by a `SvelteSet` so that
 * `.add()` / `.delete()` are themselves reactive — any component reading
 * `progress.count` or `progress.isComplete(...)` re-renders automatically.
 */
class Progress {
	/** Reactive set of completed lesson ids. */
	private completed = new SvelteSet<string>();

	constructor() {
		loadInto(this.completed);
	}

	private persist(): void {
		if (browser) localStorage.setItem(STORAGE_KEY, JSON.stringify([...this.completed]));
	}

	isComplete(moduleSlug: string, lessonSlug: string): boolean {
		return this.completed.has(lessonId(moduleSlug, lessonSlug));
	}

	toggle(moduleSlug: string, lessonSlug: string): void {
		const id = lessonId(moduleSlug, lessonSlug);
		if (this.completed.has(id)) this.completed.delete(id);
		else this.completed.add(id);
		this.persist();
	}

	setComplete(moduleSlug: string, lessonSlug: string, value: boolean): void {
		const id = lessonId(moduleSlug, lessonSlug);
		if (value) this.completed.add(id);
		else this.completed.delete(id);
		this.persist();
	}

	/** Count of completed lessons. */
	get count(): number {
		return this.completed.size;
	}

	get total(): number {
		return totalLessons();
	}

	get percent(): number {
		const total = this.total;
		return total === 0 ? 0 : Math.round((this.count / total) * 100);
	}

	completedInModule(moduleSlug: string): number {
		let n = 0;
		for (const id of this.completed) if (id.startsWith(`${moduleSlug}/`)) n++;
		return n;
	}

	reset(): void {
		this.completed.clear();
		this.persist();
	}
}

export const progress = new Progress();
