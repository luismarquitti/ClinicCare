import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock firebase/auth
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  setPersistence: vi.fn(() => Promise.resolve()),
  onAuthStateChanged: vi.fn(),
  browserLocalPersistence: 'browserLocalPersistence'
}));

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({}))
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  collection: vi.fn(),
  onSnapshot: vi.fn(),
  doc: vi.fn()
}));

vi.mock('firebase/storage', () => ({
  getStorage: vi.fn()
}));

vi.mock('firebase/functions', () => ({
  getFunctions: vi.fn()
}));

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
