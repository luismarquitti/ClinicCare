import { create } from 'zustand';
import { db } from '../services/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { DashboardStats } from '../types';

interface DashboardState {
  stats: DashboardStats;
  loading: boolean;
  error: string | null;
  setStats: (stats: DashboardStats) => void;
  initializeListeners: () => () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: {
    occupancy: { totalResidents: 0, occupiedBeds: 0, totalBeds: 0 },
    financial: { monthlyIncome: 0, monthlyExpenses: 0, pendingBilling: 0 },
  },
  loading: true,
  error: null,

  setStats: (stats) => set({ stats, loading: false }),

  initializeListeners: () => {
    set({ loading: true });
    
    // Listen to the pre-calculated summary document
    const unsub = onSnapshot(
      doc(db, 'stats', 'dashboard_summary'),
      (docSnap) => {
        if (docSnap.exists()) {
          set({ stats: docSnap.data() as DashboardStats, loading: false });
        } else {
          set({ error: 'Resumo do dashboard não encontrado.', loading: false });
        }
      },
      (err) => {
        console.error('Error fetching dashboard stats:', err);
        set({ error: err.message, loading: false });
      }
    );

    return unsub;
  },
}));
