import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest';
import { ResidentAdmission } from './ResidentAdmission';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockAddResident = vi.fn();
vi.mock('../store', () => ({
  useAppStore: () => ({
    addResident: mockAddResident,
  })
}));

describe('ResidentAdmission Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('navigates to /residents on successful admission', async () => {
    mockAddResident.mockResolvedValueOnce(undefined);

    render(
      <MemoryRouter>
        <ResidentAdmission />
      </MemoryRouter>
    );

    const saveButton = screen.getByText(/Salvar Morador/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockAddResident).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/residents');
    });
  });

  it('handles errors when addResident fails and shows an alert', async () => {
    const testError = new Error('Test failure');
    mockAddResident.mockRejectedValueOnce(testError);

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <ResidentAdmission />
      </MemoryRouter>
    );

    const saveButton = screen.getByText(/Salvar Morador/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockAddResident).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error adding resident:', testError);
      expect(alertSpy).toHaveBeenCalledWith('Erro ao adicionar residente.');
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
    alertSpy.mockRestore();
  });
});
