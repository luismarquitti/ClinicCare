import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { QuickActions } from './index';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

describe('QuickActions', () => {
  afterEach(() => {
    cleanup();
  });

  const renderWithRouter = (component: React.ReactNode) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('renders all quick action buttons', () => {
    renderWithRouter(<QuickActions />);
    expect(screen.getByText(/Nova Admissão/i)).toBeTruthy();
    expect(screen.getByText(/Novo Lançamento/i)).toBeTruthy();
    expect(screen.getByText(/Registrar Evolução/i)).toBeTruthy();
    expect(screen.getByText(/Abrir Chamado/i)).toBeTruthy();
  });

  it('contains correct links for actions', () => {
    renderWithRouter(<QuickActions />);
    const admissionLink = screen.getByRole('link', { name: /Nova Admissão/i });
    expect(admissionLink.getAttribute('href')).toBe('/residents/new');
    
    const financialLink = screen.getByRole('link', { name: /Novo Lançamento/i });
    expect(financialLink.getAttribute('href')).toBe('/financial');
  });
});
