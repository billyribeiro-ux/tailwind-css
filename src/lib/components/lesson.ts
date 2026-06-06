/**
 * Convenience barrel for lesson authoring. Every `.svx` lesson imports the
 * teaching components from here in a single line:
 *
 *   import { CodeBlock, Callout, Quiz, ProjectBrief } from '$lib/components/lesson';
 */
export { default as CodeBlock } from './CodeBlock.svelte';
export { default as Playground } from './Playground.svelte';
export { default as Callout } from './Callout.svelte';
export { default as Quiz } from './Quiz.svelte';
export { default as ProjectBrief } from './ProjectBrief.svelte';
