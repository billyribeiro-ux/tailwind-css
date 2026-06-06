import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge conditional class lists and resolve Tailwind conflicts.
 *
 * `clsx` flattens conditionals (`{ 'p-4': true }`, arrays, falsy values);
 * `twMerge` ensures the last conflicting utility wins (`cn('p-2', 'p-4')` → `'p-4'`),
 * which is exactly what you want when a component's base classes meet caller overrides.
 *
 * This is the pattern taught in Module 7 and used throughout the course UI.
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
