import { render } from 'vitest-browser-svelte';
import { expect, test } from 'vitest';
import Quiz from './Quiz.svelte';

const props = {
	question: 'What is utility-first?',
	options: [
		{ text: 'Composing small classes in markup', correct: true },
		{ text: 'A JavaScript framework', correct: false }
	],
	explanation: 'Tailwind composes small utility classes directly in your markup.'
};

test('renders the question and options', async () => {
	const screen = render(Quiz, props);
	await expect.element(screen.getByText('What is utility-first?')).toBeInTheDocument();
	await expect
		.element(screen.getByRole('button', { name: 'Composing small classes in markup' }))
		.toBeInTheDocument();
});

test('reveals correct feedback after answering', async () => {
	const screen = render(Quiz, props);
	await screen.getByRole('button', { name: 'Composing small classes in markup' }).click();
	await expect.element(screen.getByText(/Correct!/)).toBeInTheDocument();
});
