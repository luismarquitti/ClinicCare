import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TransactionModal } from '../TransactionModal';
import { useFinancialStore } from '../../../store/useFinancialStore';
import React from 'react';

vi.mock('../../../store/useFinancialStore', () => ({
    useFinancialStore: vi.fn()
}));

describe('TransactionModal', () => {
    const addTransaction = vi.fn();
    const updateTransaction = vi.fn();
    const deleteTransaction = vi.fn();
    const onClose = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useFinancialStore as any).mockImplementation(() => ({
            categories: [{ id: 'cat1', name: 'Work' }],
            accounts: [{ id: 'acc1', name: 'Bank' }],
            addTransaction,
            updateTransaction,
            deleteTransaction
        }));
    });

    it('renders for new transaction', () => {
        render(<TransactionModal onClose={onClose} />);
        expect(screen.getByText('Novo Lançamento')).toBeDefined();
    });

    it('validates and submits new transaction', async () => {
        render(<TransactionModal onClose={onClose} />);

        fireEvent.change(screen.getByLabelText('Valor Total'), { target: { value: '100' } });
        fireEvent.change(screen.getByLabelText('Histórico / Descrição'), { target: { value: 'Test Tx' } });
        fireEvent.change(screen.getByLabelText('Favorecido / Pagador'), { target: { value: 'Tester' } });
        fireEvent.change(screen.getByLabelText('Classificação'), { target: { value: 'cat1' } });
        fireEvent.change(screen.getByLabelText('Fonte Fundo'), { target: { value: 'acc1' } });
        
        fireEvent.click(screen.getAllByText('Consolidar')[0]);

        await waitFor(() => {
            expect(addTransaction).toHaveBeenCalledWith(expect.objectContaining({
                description: 'Test Tx',
                amount: 100,
                payeeOrPayer: 'Tester',
                categoryId: 'cat1',
                accountId: 'acc1'
            }));
        });
        expect(onClose).toHaveBeenCalled();
    });

    it('calls deleteTransaction when delete button is clicked', async () => {
        const mockTx = { id: '1', description: 'Old', amount: 50, date: '2023-10-01', createdAt: '2023-10-01' } as any;
        
        const confirmSpy = vi.spyOn(window, 'confirm');
        confirmSpy.mockImplementation(() => true);

        render(<TransactionModal transaction={mockTx} onClose={onClose} />);

        fireEvent.click(screen.getByText('Destruir Registro'));

        await waitFor(() => {
            expect(deleteTransaction).toHaveBeenCalledWith('1');
        });
        expect(onClose).toHaveBeenCalled();
        
        confirmSpy.mockRestore();
    });
});
