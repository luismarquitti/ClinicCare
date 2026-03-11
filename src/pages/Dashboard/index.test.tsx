import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { Dashboard } from './index';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

// Mock the store
vi.mock('../../store/useDashboardStore', () => ({
  useDashboardStore: vi.fn(() => ({
    initializeListeners: vi.fn(() => vi.fn()),
    stats: {
      occupancy: { totalResidents: 0, occupiedBeds: 0, totalBeds: 0 },
      financial: { monthlyIncome: 0, monthlyExpenses: 0, pendingBilling: 0 },
    },
    loading: false
  }))
}));

describe('Dashboard Page', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the dashboard title', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    const titleElement = screen.getByText(/Painel de Controle/i);
    expect(titleElement).toBeTruthy();
  });

  it('contains the occupancy and financial sections', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    // These sections now contain components that render these strings
    expect(screen.getByText(/Ocupação/i)).toBeTruthy();
    expect(screen.getByText(/Financeiro/i)).toBeTruthy();
  });
});
