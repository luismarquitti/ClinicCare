import { describe, it, expect } from 'vitest';
import { cn } from '../utils';

describe('cn utility function', () => {
  it('should merge basic tailwind classes', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('should conditionally apply classes (clsx behavior)', () => {
    expect(cn('p-2', { 'p-4': true, 'text-red-500': false })).toBe('p-4');
    expect(cn('p-2', true && 'p-4', false && 'text-red-500')).toBe('p-4');
  });

  it('should handle arrays', () => {
    expect(cn(['p-2', 'text-red-500'])).toBe('p-2 text-red-500');
    expect(cn(['p-2', 'p-4'])).toBe('p-4');
  });

  it('should handle falsy values gracefully', () => {
    expect(cn('p-2', null, undefined, false, 0, '')).toBe('p-2');
  });

  it('should handle complex combinations', () => {
    expect(
      cn(
        'p-2',
        ['bg-red-500', 'text-white'],
        { 'p-4': true, 'rounded-md': false },
        undefined,
        'bg-blue-500' // this should override bg-red-500
      )
    ).toBe('text-white p-4 bg-blue-500');
  });
});
