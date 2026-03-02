import { describe, it, expect } from 'vitest';
import { cn } from './Layout';

describe('Layout utils', () => {
    it('cn merges tailwind classes correctly', () => {
        expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
        expect(cn('px-2 py-1', { 'opacity-50': true })).toBe('px-2 py-1 opacity-50');
    });
});
