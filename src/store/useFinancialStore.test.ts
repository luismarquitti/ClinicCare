import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useFinancialStore } from './useFinancialStore';
import { Transaction } from '../types';

// Mock firebase
vi.mock('../services/firebase', () => ({
    db: {}
}));
vi.mock('firebase/firestore', () => ({
    collection: vi.fn(),
    onSnapshot: vi.fn(),
    addDoc: vi.fn(),
    updateDoc: vi.fn(),
    doc: vi.fn(),
    deleteDoc: vi.fn(),
}));

describe('useFinancialStore', () => {
    beforeEach(() => {
        useFinancialStore.setState({
            transactions: [],
            filters: { dateRange: null, type: 'ALL', categoryId: 'ALL', status: 'ALL' }
        });
    });

    const mockTransactions: Transaction[] = [
        { id: '1', type: 'INCOME', amount: 1000, date: '2023-10-01', status: 'PAID', categoryId: 'cat1', accountId: 'acc1', description: 'Salary', payeeOrPayer: 'Company', isRecurring: false, createdAt: '2023-10-01' },
        { id: '2', type: 'EXPENSE', amount: 300, date: '2023-10-05', status: 'PAID', categoryId: 'cat2', accountId: 'acc1', description: 'Groceries', payeeOrPayer: 'Market', isRecurring: false, createdAt: '2023-10-05' },
        { id: '3', type: 'EXPENSE', amount: 200, date: '2023-10-10', status: 'PENDING', categoryId: 'cat3', accountId: 'acc1', description: 'Utilities', payeeOrPayer: 'Electric', isRecurring: false, createdAt: '2023-10-10' },
    ];

    it('calculates filtered variables correctly with no filters', () => {
        useFinancialStore.setState({ transactions: mockTransactions });

        const state = useFinancialStore.getState();
        expect(state.filteredTransactions()).toHaveLength(3);
        expect(state.filteredIncome()).toBe(1000);
        expect(state.filteredExpense()).toBe(500);
        expect(state.filteredBalance()).toBe(500);
    });

    it('filters transactions by type', () => {
        useFinancialStore.setState({ transactions: mockTransactions });
        useFinancialStore.getState().setFilters({ type: 'EXPENSE' });

        const state = useFinancialStore.getState();
        expect(state.filteredTransactions()).toHaveLength(2);
        // Income is still calculated from filtered subset!
        expect(state.filteredIncome()).toBe(0);
        expect(state.filteredExpense()).toBe(500);
    });

    it('filters transactions by status', () => {
        useFinancialStore.setState({ transactions: mockTransactions });
        useFinancialStore.getState().setFilters({ status: 'PENDING' });

        const state = useFinancialStore.getState();
        expect(state.filteredTransactions()).toHaveLength(1);
        expect(state.filteredTransactions()[0].id).toBe('3');
    });

    it('filters transactions by dateRange correctly', () => {
        useFinancialStore.setState({ transactions: mockTransactions });
        useFinancialStore.getState().setFilters({
            dateRange: { start: '2023-10-01', end: '2023-10-08' }
        });

        const state = useFinancialStore.getState();
        expect(state.filteredTransactions()).toHaveLength(2); // The 10-01 and 10-05 ones
        expect(state.filteredBalance()).toBe(700); // 1000 - 300
    });
});
