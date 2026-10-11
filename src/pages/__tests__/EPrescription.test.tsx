import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { EPrescription } from '../EPrescription';
import { useAppStore } from '../../store';

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock the store
vi.mock('../../store', () => ({
  useAppStore: vi.fn(),
}));

const mockNavigate = vi.fn();

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('EPrescription Page', () => {
  const mockAddMedication = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock global alert and console.error
    vi.stubGlobal('alert', vi.fn());
    vi.spyOn(console, 'error').mockImplementation(() => {});

    // Default store mock setup
    (useAppStore as any).mockReturnValue({
      residents: [
        {
          id: 'res-1',
          name: 'John Doe',
          birthDate: '1950-01-01',
        }
      ],
      medications: [
        {
          id: 'med-1',
          residentId: 'res-1',
          name: 'Aspirin',
          dosage: '100mg - Oral (PO)',
          frequency: 'QD - Once Daily',
          startDate: '2023-01-01',
          active: true,
        },
        {
          id: 'med-2',
          residentId: 'res-1',
          name: 'Old Med',
          dosage: '50mg',
          frequency: 'BID',
          startDate: '2022-01-01',
          active: false,
        }
      ],
      addMedication: mockAddMedication,
    });
  });

  const renderWithRouter = (initialRoute = '/eprescription/res-1') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/eprescription/:id" element={<EPrescription />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders "Resident Not Found" if the resident does not exist', () => {
    renderWithRouter('/eprescription/invalid-id');

    expect(screen.getByText('Resident Not Found')).toBeTruthy();

    // Test the back button
    fireEvent.click(screen.getByText('Back to Residents'));
    expect(mockNavigate).toHaveBeenCalledWith('/residents');
  });

  it('renders correctly with resident and active medications', () => {
    renderWithRouter();

    // Check main title
    expect(screen.getByText('Prescription Details')).toBeTruthy();

    // Check resident info
    expect(screen.getByText('John Doe')).toBeTruthy();

    // Check active medications section
    expect(screen.getByText('Active Medications (1)')).toBeTruthy();
    expect(screen.getByText('Aspirin')).toBeTruthy();
    // Inactive med should not be there
    expect(screen.queryByText('Old Med')).toBeNull();
  });

  it('displays "No active medications" if none exist for resident', () => {
    (useAppStore as any).mockReturnValue({
      residents: [{ id: 'res-2', name: 'Jane Doe', birthDate: '1960-01-01' }],
      medications: [],
      addMedication: mockAddMedication,
    });

    renderWithRouter('/eprescription/res-2');

    expect(screen.getByText('Active Medications (0)')).toBeTruthy();
    expect(screen.getByText('No active medications.')).toBeTruthy();
  });

  it('disables the submit button if medication name is empty', () => {
    renderWithRouter();

    const submitButton = screen.getByText('Authorize Prescription');

    // The button should be disabled initially since the name is empty
    expect(submitButton).toBeDisabled();

    // Try to click it anyway
    fireEvent.click(submitButton);
    expect(mockAddMedication).not.toHaveBeenCalled();
  });

  it('successfully submits form with filled data', async () => {
    renderWithRouter();

    // Fill in medication name
    const nameInput = screen.getByPlaceholderText('e.g., Lisinopril, Dipirona, Paracetamol...');
    fireEvent.change(nameInput, { target: { name: 'name', value: 'Lisinopril' } });

    // Change dosage
    const dosageInput = screen.getByPlaceholderText('e.g., 500mg, 10ml...');
    fireEvent.change(dosageInput, { target: { name: 'dosage', value: '20mg' } });

    // Fill in instructions
    const instructionsInput = screen.getByPlaceholderText('e.g., Após as refeições, 8h/8h');
    fireEvent.change(instructionsInput, { target: { name: 'instructions', value: 'After meals' } });

    // Submit form
    const submitButton = screen.getByText('Authorize Prescription');

    // Ensure button isn't disabled once name is entered
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAddMedication).toHaveBeenCalledWith(expect.objectContaining({
        residentId: 'res-1',
        name: 'Lisinopril',
        dosage: '20mg - Oral (PO)',
        frequency: 'QD (Once Daily) - After meals',
        active: true,
      }));
    });

    expect(mockNavigate).toHaveBeenCalledWith('/residents/res-1');
  });

  it('handles addMedication errors correctly', async () => {
    mockAddMedication.mockRejectedValueOnce(new Error('API Error'));

    renderWithRouter();

    // Fill in medication name
    const nameInput = screen.getByPlaceholderText('e.g., Lisinopril, Dipirona, Paracetamol...');
    fireEvent.change(nameInput, { target: { name: 'name', value: 'Lisinopril' } });

    const submitButton = screen.getByText('Authorize Prescription');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error adding prescription:', expect.any(Error));
      expect(toast.error).toHaveBeenCalledWith('Failed to add prescription');
    });

    // Should reset submitting state and not navigate
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(submitButton).not.toBeDisabled();
  });

  it('can cancel using the Cancel button', () => {
    renderWithRouter();

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
