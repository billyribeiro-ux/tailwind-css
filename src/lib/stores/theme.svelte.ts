import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';
const STORAGE_KEY = 'twcourse:theme';

function initial(): Theme {
	if (!browser) return 'light';
	const saved = localStorage.getItem(STORAGE_KEY);
	if (saved === 'light' || saved === 'dark') return saved;
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * App theme. Reactive via a rune so Monaco editors and the live preview can
 * re-theme instantly. The `.dark` class on <html> is what Tailwind's custom
 * `dark` variant keys off (see layout.css).
 */
class ThemeStore {
	value = $state<Theme>('light');

	constructor() {
		if (browser) {
			this.value = initial();
			this.apply();
		}
	}

	private apply(): void {
		if (!browser) return;
		document.documentElement.classList.toggle('dark', this.value === 'dark');
		document.documentElement.style.colorScheme = this.value;
	}

	toggle(): void {
		this.value = this.value === 'dark' ? 'light' : 'dark';
		if (browser) localStorage.setItem(STORAGE_KEY, this.value);
		this.apply();
	}

	get isDark(): boolean {
		return this.value === 'dark';
	}
}

export const theme = new ThemeStore();
