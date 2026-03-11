import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { FinancialCard } from './index';
import { useDashboardStore } from '../../../store/useDashboardStore';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

// Mock the store
vi.mock('../../../store/useDashboardStore', () => ({
  useDashboardStore: vi.fn()
}));

describe('FinancialCard', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  const renderWithRouter = (component: React.ReactNode) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('renders skeleton during loading', () => {
    (useDashboardStore as any).mockReturnValue({
      stats: { financial: { monthlyIncome: 0, monthlyExpenses: 0, pendingBilling: 0 } },
      loading: true
    });

    const { container } = renderWithRouter(<FinancialCard />);
    expect(container.firstChild).toHaveClass('animate-pulse');
  });

  it('renders financial data correctly', () => {
    (useDashboardStore as any).mockReturnValue({
      stats: { financial: { monthlyIncome: 50000, monthlyExpenses: 30000, pendingBilling: 5000 } },
      loading: false
    });

    renderWithRouter(<FinancialCard />);
    
    // Using regex with flexiblity for spaces (Intl.NumberFormat often uses non-breaking spaces)
    expect(screen.getByText(/50\.000,00/)).toBeTruthy();
    expect(screen.getByText(/Receita Mensal/i)).toBeTruthy();
    
    // Check for the "Despesas:" label which contains the value too
    expect(screen.getByText(/Despesas:.*30\.000,00/)).toBeTruthy();
    expect(screen.getByText(/Pendentes:.*5\.000,00/)).toBeTruthy();
  });
});
