import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { Layout } from './index';
import { cn } from '../../../lib/utils';

// Mock the global firebase app dependency that Navbar components rely on
vi.mock('../../../services/firebase', () => ({
  auth: {},
  db: {}
}));

describe('Layout utils', () => {
    it('cn merges tailwind classes correctly', () => {
        expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
        expect(cn('px-2 py-1', { 'opacity-50': true })).toBe('px-2 py-1 opacity-50');
    });
});

describe('Layout Component', () => {
  it('renders children correctly', () => {
    render(
      <MemoryRouter>
        <Layout>
          <div data-testid="test-child">Child Content</div>
        </Layout>
      </MemoryRouter>
    );
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('renders standard layout elements', () => {
    render(
      <MemoryRouter>
        <Layout>
          <div>Child Content</div>
        </Layout>
      </MemoryRouter>
    );

    // Check that the Navbar renders (it contains the text 'ClinicCare')
    expect(screen.getByText('ClinicCare')).toBeInTheDocument();

    // Check that the footer renders correctly
    expect(screen.getByText(/Transformando a Gestão de Saúde/)).toBeInTheDocument();
  });
});
