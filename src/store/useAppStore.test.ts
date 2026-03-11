import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from './index';

describe('useAppStore - Auth Persistence', () => {
  beforeEach(() => {
    // Reset the store if needed, though Zustand stores are global
    // For simplicity, we just check initial state or set it
  });

  it('should have initial isLoadingAuth set to true', () => {
    const state = useAppStore.getState();
    expect(state.isLoadingAuth).toBe(true);
  });

  it('should update isLoadingAuth via setAuthLoading action', () => {
    const { setAuthLoading } = useAppStore.getState();
    
    setAuthLoading(false);
    expect(useAppStore.getState().isLoadingAuth).toBe(false);
    
    setAuthLoading(true);
    expect(useAppStore.getState().isLoadingAuth).toBe(true);
  });

  it('should have initial user set to null', () => {
    const state = useAppStore.getState();
    expect(state.user).toBeNull();
  });
});
