/**
 * Monaco editor setup. This module is **client-only**: it references `self` and
 * imports web workers, so it must only ever be loaded inside `onMount` via a
 * dynamic `import()` — never during SSR/prerender.
 *
 * The `?worker` suffix is Vite's way of bundling Monaco's language workers; without
 * this wiring you get "Could not create web worker" errors in the console.
 */
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';

let configured = false;

/** Register workers and the course's light/dark themes exactly once. */
export function setupMonaco(): typeof monaco {
	if (configured) return monaco;

	self.MonacoEnvironment = {
		getWorker(_workerId: string, label: string) {
			switch (label) {
				case 'css':
				case 'scss':
				case 'less':
					return new cssWorker();
				case 'html':
				case 'handlebars':
				case 'razor':
					return new htmlWorker();
				case 'typescript':
				case 'javascript':
					return new tsWorker();
				case 'json':
					return new jsonWorker();
				default:
					return new editorWorker();
			}
		}
	};

	monaco.editor.defineTheme('course-light', {
		base: 'vs',
		inherit: true,
		rules: [],
		colors: {
			'editor.background': '#ffffff',
			'editorGutter.background': '#ffffff'
		}
	});

	monaco.editor.defineTheme('course-dark', {
		base: 'vs-dark',
		inherit: true,
		rules: [],
		colors: {
			'editor.background': '#0f172a', // slate-900
			'editorGutter.background': '#0f172a'
		}
	});

	configured = true;
	return monaco;
}

export type Monaco = typeof monaco;
export { monaco };
