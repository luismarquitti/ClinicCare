import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useFinancialStore } from './useFinancialStore';
import { Transaction } from '../types';

// Mock firebase
vi.mock('../services/firebase', () => ({
    db: {}
}));
vi.mock('firebase/firestore', () => ({
    collection: vi.fn(),
    onSnapshot: vi.fn(() => vi.fn()),
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

    it('adds a transaction', async () => {
        const { addDoc, collection } = await import('firebase/firestore');
        const newTx = { amount: 50, type: 'EXPENSE' as const, description: 'Snack' } as any;
        await useFinancialStore.getState().addTransaction(newTx);
        expect(addDoc).toHaveBeenCalled();
        expect(collection).toHaveBeenCalledWith(expect.anything(), 'transactions');
    });

    it('updates a transaction', async () => {
        const { updateDoc, doc } = await import('firebase/firestore');
        await useFinancialStore.getState().updateTransaction('1', { amount: 1500 });
        expect(updateDoc).toHaveBeenCalled();
        expect(doc).toHaveBeenCalledWith(expect.anything(), 'transactions', '1');
    });

    it('deletes a transaction', async () => {
        const { deleteDoc, doc } = await import('firebase/firestore');
        await useFinancialStore.getState().deleteTransaction('1');
        expect(deleteDoc).toHaveBeenCalled();
        expect(doc).toHaveBeenCalledWith(expect.anything(), 'transactions', '1');
    });

    it('adds an account', async () => {
        const { addDoc, collection } = await import('firebase/firestore');
        const newAcc = { name: 'New Bank', type: 'BANK_ACCOUNT' } as any;
        await useFinancialStore.getState().addAccount(newAcc);
        expect(addDoc).toHaveBeenCalled();
        expect(collection).toHaveBeenCalledWith(expect.anything(), 'accounts');
    });

    it('updates an account', async () => {
        const { updateDoc, doc } = await import('firebase/firestore');
        await useFinancialStore.getState().updateAccount('acc1', { name: 'Updated Bank' });
        expect(updateDoc).toHaveBeenCalled();
        expect(doc).toHaveBeenCalledWith(expect.anything(), 'accounts', 'acc1');
    });

    it('deletes an account', async () => {
        const { deleteDoc, doc } = await import('firebase/firestore');
        await useFinancialStore.getState().deleteAccount('acc1');
        expect(deleteDoc).toHaveBeenCalled();
        expect(doc).toHaveBeenCalledWith(expect.anything(), 'accounts', 'acc1');
    });

    it('adds a category', async () => {
        const { addDoc, collection } = await import('firebase/firestore');
        const newCat = { name: 'New Cat', type: 'INCOME' } as any;
        await useFinancialStore.getState().addCategory(newCat);
        expect(addDoc).toHaveBeenCalled();
        expect(collection).toHaveBeenCalledWith(expect.anything(), 'categories');
    });

    it('updates a category', async () => {
        const { updateDoc, doc } = await import('firebase/firestore');
        await useFinancialStore.getState().updateCategory('cat1', { name: 'Updated Cat' });
        expect(updateDoc).toHaveBeenCalled();
        expect(doc).toHaveBeenCalledWith(expect.anything(), 'categories', 'cat1');
    });

    it('deletes a category', async () => {
        const { deleteDoc, doc } = await import('firebase/firestore');
        await useFinancialStore.getState().deleteCategory('cat1');
        expect(deleteDoc).toHaveBeenCalled();
        expect(doc).toHaveBeenCalledWith(expect.anything(), 'categories', 'cat1');
    });

    it('initializes listeners', async () => {
        const { onSnapshot, collection } = await import('firebase/firestore');
        const unsubscribe = useFinancialStore.getState().initializeListeners();
        expect(onSnapshot).toHaveBeenCalledTimes(3);
        expect(collection).toHaveBeenCalledWith(expect.anything(), 'accounts');
        expect(collection).toHaveBeenCalledWith(expect.anything(), 'categories');
        expect(collection).toHaveBeenCalledWith(expect.anything(), 'transactions');
        unsubscribe();
    });
});
