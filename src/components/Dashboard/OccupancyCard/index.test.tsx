import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { OccupancyCard } from './index';
import { useDashboardStore } from '../../../store/useDashboardStore';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

// Mock the store
vi.mock('../../../store/useDashboardStore', () => ({
  useDashboardStore: vi.fn()
}));

describe('OccupancyCard', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  const renderWithRouter = (component: React.ReactNode) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('renders skeleton during loading', () => {
    (useDashboardStore as any).mockReturnValue({
      stats: { occupancy: { totalResidents: 0, occupiedBeds: 0, totalBeds: 0 } },
      loading: true
    });

    const { container } = renderWithRouter(<OccupancyCard />);
    expect(container.firstChild).toHaveClass('animate-pulse');
  });

  it('renders occupancy data correctly', () => {
    (useDashboardStore as any).mockReturnValue({
      stats: { occupancy: { totalResidents: 45, occupiedBeds: 45, totalBeds: 50 } },
      loading: false
    });

    renderWithRouter(<OccupancyCard />);
    expect(screen.getByText('45')).toBeTruthy();
    expect(screen.getByText(/Residentes Ativos/i)).toBeTruthy();
    expect(screen.getByText(/5 Leitos Disponíveis/i)).toBeTruthy();
  });
});
