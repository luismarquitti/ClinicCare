import { describe, it, expect, vi } from 'vitest';
import * as firebaseAuth from 'firebase/auth';

// Mock firebase/auth
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  setPersistence: vi.fn(() => Promise.resolve()),
  browserLocalPersistence: 'browserLocalPersistence'
}));

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({}))
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn()
}));

vi.mock('firebase/storage', () => ({
  getStorage: vi.fn()
}));

describe('Firebase Service - Auth Persistence', () => {
  it('should call setPersistence with browserLocalPersistence', async () => {
    // Trigger module load
    await import('./firebase');
    
    expect(firebaseAuth.setPersistence).toHaveBeenCalledWith(expect.anything(), firebaseAuth.browserLocalPersistence);
  });
});
