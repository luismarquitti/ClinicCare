import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TransactionList } from '../TransactionList';
import { useFinancialStore } from '../../../store/useFinancialStore';
import { Transaction } from '../../../types';
import React from 'react';

vi.mock('../../../store/useFinancialStore', () => ({
    useFinancialStore: vi.fn()
}));

describe('TransactionList', () => {
    const mockTransactions: Transaction[] = [
        {
            id: '1',
            date: '2023-10-01',
            description: 'Salary',
            categoryId: 'cat1',
            payeeOrPayer: 'Company',
            amount: 1000,
            type: 'INCOME',
            status: 'PAID',
            accountId: 'acc1',
            isRecurring: false,
            createdAt: '2023-10-01'
        }
    ];

    const onEdit = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useFinancialStore as any).mockImplementation((selector: any) => selector({
            filteredTransactions: () => mockTransactions,
            categories: [{ id: 'cat1', name: 'Work' }]
        }));
    });

    it('renders transactions correctly', () => {
        render(<TransactionList onEdit={onEdit} />);

        // Check for Salary (appears in both desktop table and mobile list)
        expect(screen.getAllByText('Salary')).toHaveLength(2);
        // Check for category name (in mobile it is "Work • 30/09/2023")
        expect(screen.getAllByText(/Work/)).toHaveLength(2);
        // Check for amount
        expect(screen.getAllByText(/1.000,00/)).toHaveLength(2);
        // Check for status
        expect(screen.getAllByText('Pago')).toHaveLength(2);
    });

    it('calls onEdit when mobile item is clicked', () => {
        render(<TransactionList onEdit={onEdit} />);

        // In mobile view, the entire div is clickable. 
        // We find the h4 with 'Salary' which is inside that div.
        const salaryHeading = screen.getAllByText('Salary').find(el => el.tagName === 'H4');
        fireEvent.click(salaryHeading!);

        expect(onEdit).toHaveBeenCalledWith(expect.objectContaining({ id: '1' }));
    });

    it('calls onEdit when desktop edit button is clicked', () => {
        render(<TransactionList onEdit={onEdit} />);

        // Find the button that contains the "edit" icon
        // It's the only button in the desktop row for this transaction
        const editIcon = screen.getAllByText('edit')[0];
        fireEvent.click(editIcon.closest('button')!);

        expect(onEdit).toHaveBeenCalledWith(expect.objectContaining({ id: '1' }));
    });
});
