import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DashboardMetrics } from './index';
import { useFinancialStore } from '../../../store/useFinancialStore';
import React from 'react';

// Mock the store
vi.mock('../../../store/useFinancialStore', () => ({
    useFinancialStore: vi.fn()
}));

describe('DashboardMetrics', () => {
    it('renders metrics correctly', () => {
        (useFinancialStore as any).mockImplementation((selector: any) => selector({
            filteredIncome: () => 1000,
            filteredExpense: () => 400,
            filteredBalance: () => 600,
        }));

        render(<DashboardMetrics />);

        expect(screen.getByText('Entradas')).toBeDefined();
        expect(screen.getByText(/1.000,00/)).toBeDefined();
        expect(screen.getByText('Saídas')).toBeDefined();
        expect(screen.getByText(/400,00/)).toBeDefined();
        expect(screen.getByText('Saldo Líquido')).toBeDefined();
        expect(screen.getByText(/600,00/)).toBeDefined();
    });
});
