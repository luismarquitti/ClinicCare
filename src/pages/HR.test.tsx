import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HR } from './HR';
import { toast } from 'react-hot-toast';
import React from 'react';

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Setup a mock for inviteEmployee that we can change in tests
const mockInviteEmployee = vi.fn();

// Mock useAppStore
vi.mock('../store', () => ({
  useAppStore: vi.fn(() => ({
    employees: [],
    inviteEmployee: mockInviteEmployee,
    updateEmployeeRole: vi.fn(),
    toggleEmployeeAccountStatus: vi.fn(),
    user: null,
  })),
}));

describe('HR Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows error toast when inviteEmployee fails', async () => {
    // Setup mock to reject
    const errorMessage = 'Network error';
    mockInviteEmployee.mockRejectedValueOnce(new Error(errorMessage));

    render(<HR />);

    // Click "Convidar Colaborador" to open modal
    const inviteButton = screen.getByRole('button', { name: /Convidar Colaborador/i });
    fireEvent.click(inviteButton);

    // Fill the form
    const emailInput = screen.getByPlaceholderText('ana.souza@empresa.com');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Find select by placeholder option
    const roleSelect = screen.getByText('Selecione o acesso...').closest('select') as HTMLSelectElement;
    fireEvent.change(roleSelect, { target: { value: 'clinico' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /Enviar Convite/i });
    fireEvent.click(submitButton);

    // Wait for the async action to complete and check if toast.error was called
    await waitFor(() => {
      expect(mockInviteEmployee).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'test@example.com',
          systemRole: 'clinico',
        })
      );
      expect(toast.error).toHaveBeenCalledWith('Erro ao enviar convite: ' + errorMessage);
    });
  });

  it('shows success toast when inviteEmployee succeeds', async () => {
    // Setup mock to resolve
    mockInviteEmployee.mockResolvedValueOnce(undefined);

    render(<HR />);

    // Click "Convidar Colaborador" to open modal
    const inviteButton = screen.getByRole('button', { name: /Convidar Colaborador/i });
    fireEvent.click(inviteButton);

    // Fill the form
    const emailInput = screen.getByPlaceholderText('ana.souza@empresa.com');
    fireEvent.change(emailInput, { target: { value: 'success@example.com' } });

    // Find select by placeholder option
    const roleSelect = screen.getByText('Selecione o acesso...').closest('select') as HTMLSelectElement;
    fireEvent.change(roleSelect, { target: { value: 'admin' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /Enviar Convite/i });
    fireEvent.click(submitButton);

    // Wait for the async action to complete and check if toast.success was called
    await waitFor(() => {
      expect(mockInviteEmployee).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'success@example.com',
          systemRole: 'admin',
        })
      );
      expect(toast.success).toHaveBeenCalledWith('Convite enviado com sucesso!');
    });
  });
});
