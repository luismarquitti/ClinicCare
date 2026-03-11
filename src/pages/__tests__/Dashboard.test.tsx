import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { Dashboard } from '../Dashboard';
import React from 'react';

describe('Dashboard Page', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the dashboard title', () => {
    render(<Dashboard />);
    const titleElement = screen.getByText(/Painel de Controle/i);
    expect(titleElement).toBeTruthy();
  });

  it('contains the occupancy and financial sections', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Ocupação/i)).toBeTruthy();
    expect(screen.getByText(/Financeiro/i)).toBeTruthy();
  });
});
