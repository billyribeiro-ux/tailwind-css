import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
	it('joins class names', () => {
		expect(cn('px-2', 'py-1')).toBe('px-2 py-1');
	});

	it('drops falsy values', () => {
		expect(cn('p-2', false, null, undefined, '')).toBe('p-2');
	});

	it('supports conditional objects', () => {
		expect(cn('btn', { 'btn-active': true, 'btn-disabled': false })).toBe('btn btn-active');
	});

	it('resolves Tailwind conflicts so the last one wins', () => {
		expect(cn('p-2', 'p-4')).toBe('p-4');
		expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
	});
});
