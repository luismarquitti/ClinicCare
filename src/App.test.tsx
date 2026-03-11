import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';
import { useAppStore } from './store';
import React from 'react';

// Mock the store
vi.mock('./store', () => ({
  useAppStore: vi.fn()
}));

// Mock Firebase Auth
vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn(() => vi.fn()), // This returns unsubscribeAuth
  getAuth: vi.fn(() => ({})),
  setPersistence: vi.fn(() => Promise.resolve()),
  browserLocalPersistence: 'browserLocalPersistence'
}));

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({}))
}));

vi.mock('./services/firebase', () => ({
  auth: {},
  db: {},
  storage: {}
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call initializeListeners on mount', () => {
    // initializeListeners returns a single cleanup function in App.tsx
    const unsubscribeListeners = vi.fn();
    const initializeListeners = vi.fn(() => unsubscribeListeners);
    
    (useAppStore as any).mockReturnValue({
      notifications: [],
      user: null,
      initializeListeners,
      theme: 'light',
      isLoadingAuth: true,
      setAuthLoading: vi.fn(),
      setUser: vi.fn()
    });

    render(<App />);
    
    expect(initializeListeners).toHaveBeenCalled();
  });
});
