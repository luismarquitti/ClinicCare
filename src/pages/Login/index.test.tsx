import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest';
import { Login } from './index';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { useAppStore } from '../../store';

// Mock the store
vi.mock('../../store', () => ({
  useAppStore: vi.fn()
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual as any,
    useNavigate: () => mockNavigate,
  };
});

describe('Login Page', () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppStore as any).mockImplementation((selector: (state: any) => any) => {
      const state = {
        login: mockLogin
      };
      return selector(state);
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form correctly', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText(/Acesso Restrito ao Sistema/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail Profissional/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha Segura/i)).toBeInTheDocument();
  });

  it('displays error message when login fails', async () => {
    mockLogin.mockRejectedValue(new Error('Auth failed'));

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/E-mail Profissional/i);
    const passwordInput = screen.getByLabelText(/Senha Segura/i);
    const submitButton = screen.getByRole('button', { name: /Acessar Prontuário/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'wrongpassword');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'wrongpassword');
      expect(screen.getByText(/Falha na autenticação. Verifique seu email e senha./i)).toBeInTheDocument();
    });
  });

  it('navigates to dashboard on successful login', async () => {
    mockLogin.mockResolvedValue(undefined);

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/E-mail Profissional/i);
    const passwordInput = screen.getByLabelText(/Senha Segura/i);
    const submitButton = screen.getByRole('button', { name: /Acessar Prontuário/i });

    await userEvent.type(emailInput, 'admin@example.com');
    await userEvent.type(passwordInput, 'admin123');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('admin@example.com', 'admin123');
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });
});
