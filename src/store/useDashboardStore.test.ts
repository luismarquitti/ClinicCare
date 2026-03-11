import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDashboardStore } from './useDashboardStore';

// Mock firebase/firestore
vi.mock('firebase/firestore', () => ({
  onSnapshot: vi.fn(),
  doc: vi.fn(),
  getFirestore: vi.fn(() => ({})),
  collection: vi.fn(),
}));

// Mock firebase/app
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({})),
}));

// Mock firebase/auth
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  setPersistence: vi.fn(() => Promise.resolve()),
  browserLocalPersistence: {},
}));

// Mock firebase/storage
vi.mock('firebase/storage', () => ({
  getStorage: vi.fn(() => ({})),
}));

describe('useDashboardStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with default stats', () => {
    const state = useDashboardStore.getState();
    expect(state.stats).toEqual({
      occupancy: { totalResidents: 0, occupiedBeds: 0, totalBeds: 0 },
      financial: { monthlyIncome: 0, monthlyExpenses: 0, pendingBilling: 0 },
    });
    expect(state.loading).toBe(true);
  });

  it('updates stats via setStats', () => {
    const mockStats = {
      occupancy: { totalResidents: 10, occupiedBeds: 10, totalBeds: 50 },
      financial: { monthlyIncome: 5000, monthlyExpenses: 2000, pendingBilling: 500 },
    };
    
    useDashboardStore.getState().setStats(mockStats);
    
    const state = useDashboardStore.getState();
    expect(state.stats).toEqual(mockStats);
    expect(state.loading).toBe(false);
  });
});
