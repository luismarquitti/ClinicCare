import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { useAppStore } from './store';
import { onAuthStateChanged } from 'firebase/auth';

// Mock the store
vi.mock('./store', () => ({
  useAppStore: vi.fn()
}));

// Mock Firebase Auth
vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn(() => vi.fn()),
  getAuth: vi.fn(() => ({})),
  setPersistence: vi.fn(() => Promise.resolve()),
  browserLocalPersistence: 'browserLocalPersistence'
}));

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({}))
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn()
}));

vi.mock('./services/firebase', () => ({
  auth: {},
  db: {},
  storage: {}
}));

// Mock children components to avoid rendering complexity
vi.mock('./pages/Landing', () => ({ Landing: () => <div data-testid="landing">Landing</div> }));
vi.mock('./pages/Login', () => ({ Login: () => <div data-testid="login">Login</div> }));

describe('App Component - Auth Persistence', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    (useAppStore as any).mockImplementation((selector?: (state: any) => any) => {
      const state = {
        notifications: [],
        user: null,
        initializeListeners: vi.fn(() => vi.fn()),
        theme: 'light',
        isLoadingAuth: true,
        setAuthLoading: vi.fn(),
        setUser: vi.fn()
      };
      return selector ? selector(state) : state;
    });
  });

  it('should call onAuthStateChanged on mount', () => {
    render(<App />);
    expect(onAuthStateChanged).toHaveBeenCalled();
  });

  it('should show loading bar when isLoadingAuth is true', () => {
    // isLoadingAuth is true by default in our mock
    render(<App />);
    const loadingBar = document.querySelector('.animate-progress');
    expect(loadingBar).not.toBeNull();
  });

  it('should not show loading bar when isLoadingAuth is false', () => {
    (useAppStore as any).mockImplementation((selector?: (state: any) => any) => {
      const state = {
        notifications: [],
        user: null,
        initializeListeners: vi.fn(() => vi.fn()),
        theme: 'light',
        isLoadingAuth: false,
        setAuthLoading: vi.fn(),
        setUser: vi.fn()
      };
      return selector ? selector(state) : state;
    });

    render(<App />);
    const loadingBar = document.querySelector('.animate-progress');
    expect(loadingBar).toBeNull();
  });
});
