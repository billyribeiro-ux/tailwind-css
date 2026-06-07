import { render } from 'vitest-browser-svelte';
import { expect, test } from 'vitest';
import axe from 'axe-core';
import Quiz from './Quiz.svelte';
import ProjectBrief from './ProjectBrief.svelte';
import ProgressBar from './ProgressBar.svelte';

// Colour-contrast depends on the full Tailwind stylesheet (not loaded in unit
// tests), so we audit structure/ARIA here and rely on token-level contrast for colour.
// `region` is a page-level rule (content must sit in a landmark) — the real app
// shell provides <main>; it's not meaningful for an isolated component.
const axeOptions = {
	rules: { 'color-contrast': { enabled: false }, region: { enabled: false } }
} as const;

async function noViolations() {
	const results = await axe.run(document.body, axeOptions);
	const messages = results.violations.map((v) => `${v.id}: ${v.help}`);
	expect(messages, messages.join('\n')).toEqual([]);
}

test('Quiz has no accessibility violations', async () => {
	render(Quiz, {
		question: 'Is this accessible?',
		options: [
			{ text: 'Yes', correct: true },
			{ text: 'No', correct: false }
		],
		explanation: 'Buttons carry accessible names.'
	});
	await noViolations();
});

test('ProjectBrief has no accessibility violations', async () => {
	render(ProjectBrief, {
		title: 'Build something',
		goal: 'Demonstrate the brief renders accessibly.',
		requirements: ['One', 'Two'],
		stretch: ['Three'],
		time: '30 min'
	});
	await noViolations();
});

test('ProgressBar exposes a valid progressbar role', async () => {
	render(ProgressBar, { value: 4, max: 10, label: 'Progress' });
	await noViolations();
});
