import { browser } from '$app/environment';
import { SvelteSet } from 'svelte/reactivity';
import { totalLessons } from '$lib/course/navigation';

const STORAGE_KEY = 'twcourse:completed';
const META_KEY = 'twcourse:meta';

/** XP awarded per completed lesson. */
const XP_PER_LESSON = 50;

/** A lesson id is `"<moduleSlug>/<lessonSlug>"`. */
function lessonId(moduleSlug: string, lessonSlug: string): string {
	return `${moduleSlug}/${lessonSlug}`;
}

/** Local calendar day as `YYYY-MM-DD`. */
function today(): string {
	return new Date().toISOString().slice(0, 10);
}

function dayDiff(a: string, b: string): number {
	return Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000);
}

interface Meta {
	streak: number;
	lastActive: string | null;
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

function loadMeta(): Meta {
	if (!browser) return { streak: 0, lastActive: null };
	try {
		const raw = localStorage.getItem(META_KEY);
		if (!raw) return { streak: 0, lastActive: null };
		const parsed = JSON.parse(raw) as Partial<Meta>;
		return {
			streak: typeof parsed.streak === 'number' ? parsed.streak : 0,
			lastActive: typeof parsed.lastActive === 'string' ? parsed.lastActive : null
		};
	} catch {
		return { streak: 0, lastActive: null };
	}
}

/**
 * Course progress, persisted to localStorage. Backed by a `SvelteSet` so that
 * `.add()` / `.delete()` are themselves reactive — any component reading
 * `progress.count`, `progress.xp`, etc. re-renders automatically. Also tracks a
 * daily learning streak and XP (gamification taught nowhere, just motivating).
 */
class Progress {
	/** Reactive set of completed lesson ids. */
	private completed = new SvelteSet<string>();
	streak = $state(0);
	lastActive = $state<string | null>(null);

	constructor() {
		loadInto(this.completed);
		const meta = loadMeta();
		this.streak = meta.streak;
		this.lastActive = meta.lastActive;
	}

	private persist(): void {
		if (browser) localStorage.setItem(STORAGE_KEY, JSON.stringify([...this.completed]));
	}

	private persistMeta(): void {
		if (browser)
			localStorage.setItem(
				META_KEY,
				JSON.stringify({ streak: this.streak, lastActive: this.lastActive })
			);
	}

	/** Record activity for streak purposes; called when a lesson is completed. */
	private touchStreak(): void {
		const day = today();
		if (this.lastActive === day) return; // already counted today
		if (this.lastActive && dayDiff(this.lastActive, day) === 1) this.streak += 1;
		else this.streak = 1;
		this.lastActive = day;
		this.persistMeta();
	}

	isComplete(moduleSlug: string, lessonSlug: string): boolean {
		return this.completed.has(lessonId(moduleSlug, lessonSlug));
	}

	toggle(moduleSlug: string, lessonSlug: string): void {
		const id = lessonId(moduleSlug, lessonSlug);
		if (this.completed.has(id)) {
			this.completed.delete(id);
		} else {
			this.completed.add(id);
			this.touchStreak();
		}
		this.persist();
	}

	setComplete(moduleSlug: string, lessonSlug: string, value: boolean): void {
		const id = lessonId(moduleSlug, lessonSlug);
		if (value) {
			this.completed.add(id);
			this.touchStreak();
		} else {
			this.completed.delete(id);
		}
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

	get xp(): number {
		return this.count * XP_PER_LESSON;
	}

	/** A light-hearted level derived from XP (every 500 XP = 1 level). */
	get level(): number {
		return Math.floor(this.xp / 500) + 1;
	}

	get isComplete100(): boolean {
		return this.total > 0 && this.count >= this.total;
	}

	completedInModule(moduleSlug: string): number {
		let n = 0;
		for (const id of this.completed) if (id.startsWith(`${moduleSlug}/`)) n++;
		return n;
	}

	reset(): void {
		this.completed.clear();
		this.streak = 0;
		this.lastActive = null;
		this.persist();
		this.persistMeta();
	}
}

export const progress = new Progress();
