import { describe, it, expect } from 'vitest';
import { colors, typography, layout, tokens } from '../global';

describe('Global Style Tokens', () => {
  it('should export color tokens', () => {
    expect(colors).toBeDefined();
    expect(colors.primary).toContain('blue-800');
  });

  it('should export typography tokens', () => {
    expect(typography).toBeDefined();
    expect(typography.h1).toContain('font-black');
  });

  it('should export layout tokens', () => {
    expect(layout).toBeDefined();
    expect(layout.container).toContain('max-w-[1440px]');
  });

  it('should export a combined tokens object', () => {
    expect(tokens.colors).toBe(colors);
    expect(tokens.typography).toBe(typography);
    expect(tokens.layout).toBe(layout);
  });
});
