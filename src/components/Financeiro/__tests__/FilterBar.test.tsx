import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterBar } from '../FilterBar';
import { useFinancialStore } from '../../../store/useFinancialStore';
import React from 'react';

vi.mock('../../../store/useFinancialStore', () => ({
    useFinancialStore: vi.fn()
}));

describe('FilterBar', () => {
    const setFilters = vi.fn();
    
    beforeEach(() => {
        vi.clearAllMocks();
        (useFinancialStore as any).mockImplementation((selector: any) => selector({
            categories: [],
            filters: { type: 'ALL', categoryId: 'ALL', status: 'ALL', dateRange: null },
            setFilters
        }));
    });

    it('calls setFilters when type changes', () => {
        render(<FilterBar />);
        const typeSelect = screen.getByLabelText('Tipo');
        fireEvent.change(typeSelect, { target: { value: 'EXPENSE' } });
        expect(setFilters).toHaveBeenCalledWith({ type: 'EXPENSE' });
    });

    it('calls setFilters when status changes', () => {
        render(<FilterBar />);
        const statusSelect = screen.getByLabelText('Status');
        fireEvent.change(statusSelect, { target: { value: 'PENDING' } });
        expect(setFilters).toHaveBeenCalledWith({ status: 'PENDING' });
    });
});
