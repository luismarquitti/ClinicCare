import { create } from 'zustand';
import { db } from '../services/firebase';
import { collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Account, Category, Transaction } from '../types';

interface FinancialFilters {
    dateRange: { start: string; end: string } | null;
    type: 'INCOME' | 'EXPENSE' | 'ALL';
    categoryId: string | 'ALL';
    status: 'PAID' | 'PENDING' | 'OVERDUE' | 'ALL';
}

interface FinancialState {
    accounts: Account[];
    categories: Category[];
    transactions: Transaction[];
    filters: FinancialFilters;

    // Computed Properties
    filteredTransactions: () => Transaction[];
    filteredIncome: () => number;
    filteredExpense: () => number;
    filteredBalance: () => number;

    // Listeners
    initializeListeners: () => () => void;

    // Actions
    setFilters: (filters: Partial<FinancialFilters>) => void;

    addAccount: (account: Omit<Account, 'id'>) => Promise<void>;
    updateAccount: (id: string, account: Partial<Account>) => Promise<void>;

    addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
    updateCategory: (id: string, category: Partial<Category>) => Promise<void>;

    addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
    updateTransaction: (id: string, transaction: Partial<Transaction>) => Promise<void>;
    deleteTransaction: (id: string) => Promise<void>;

    deleteAccount: (id: string) => Promise<void>;
    deleteCategory: (id: string) => Promise<void>;
}

export const useFinancialStore = create<FinancialState>((set, get) => ({
    accounts: [],
    categories: [],
    transactions: [],
    filters: {
        dateRange: null,
        type: 'ALL',
        categoryId: 'ALL',
        status: 'ALL'
    },

    filteredTransactions: () => {
        const { transactions, filters } = get();
        return transactions.filter(t => {
            // Apply filters
            if (filters.type !== 'ALL' && t.type !== filters.type) return false;
            if (filters.categoryId !== 'ALL' && t.categoryId !== filters.categoryId) return false;
            if (filters.status !== 'ALL' && t.status !== filters.status) return false;

            if (filters.dateRange) {
                const txDate = new Date(t.date).getTime();
                const start = new Date(filters.dateRange.start).getTime();
                const end = new Date(filters.dateRange.end).getTime();
                if (txDate < start || txDate > end) return false;
            }
            return true;
        });
    },

    filteredIncome: () => {
        return get().filteredTransactions()
            .filter(t => t.type === 'INCOME')
            .reduce((sum, t) => sum + t.amount, 0);
    },

    filteredExpense: () => {
        return get().filteredTransactions()
            .filter(t => t.type === 'EXPENSE')
            .reduce((sum, t) => sum + t.amount, 0);
    },

    filteredBalance: () => {
        const income = get().filteredIncome();
        const expense = get().filteredExpense();
        return income - expense;
    },

    setFilters: (newFilters) => {
        set((state) => ({ filters: { ...state.filters, ...newFilters } }));
    },

    initializeListeners: () => {
        const unsubAccounts = onSnapshot(collection(db, 'accounts'), (snapshot) => {
            set({ accounts: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Account)) });
        });

        const unsubCategories = onSnapshot(collection(db, 'categories'), (snapshot) => {
            set({ categories: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category)) });
        });

        const unsubTransactions = onSnapshot(collection(db, 'transactions'), (snapshot) => {
            set({ transactions: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction)) });
        });

        return () => {
            unsubAccounts();
            unsubCategories();
            unsubTransactions();
        };
    },

    addAccount: async (account) => {
        await addDoc(collection(db, 'accounts'), account);
    },
    updateAccount: async (id, updated) => {
        await updateDoc(doc(db, 'accounts', id), updated);
    },

    addCategory: async (category) => {
        await addDoc(collection(db, 'categories'), category);
    },
    updateCategory: async (id, updated) => {
        await updateDoc(doc(db, 'categories', id), updated);
    },

    addTransaction: async (transaction) => {
        await addDoc(collection(db, 'transactions'), transaction);
    },
    updateTransaction: async (id, updated) => {
        await updateDoc(doc(db, 'transactions', id), updated);
    },
    deleteTransaction: async (id) => {
        await deleteDoc(doc(db, 'transactions', id));
    },
    deleteAccount: async (id) => {
        await deleteDoc(doc(db, 'accounts', id));
    },
    deleteCategory: async (id) => {
        await deleteDoc(doc(db, 'categories', id));
    },
}));
