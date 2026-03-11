import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SettingsModal } from './index';
import { useFinancialStore } from '../../../store/useFinancialStore';
import React from 'react';

vi.mock('../../../store/useFinancialStore', () => ({
    useFinancialStore: vi.fn()
}));

describe('SettingsModal', () => {
    const addAccount = vi.fn();
    const deleteAccount = vi.fn();
    const addCategory = vi.fn();
    const deleteCategory = vi.fn();
    const onClose = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useFinancialStore as any).mockImplementation(() => ({
            accounts: [{ id: 'acc1', name: 'Bank', type: 'BANK_ACCOUNT' }],
            categories: [{ id: 'cat1', name: 'Work', type: 'INCOME' }],
            addAccount,
            deleteAccount,
            addCategory,
            deleteCategory
        }));
    });

    it('renders and allows adding an account', async () => {
        render(<SettingsModal onClose={onClose} />);
        
        expect(screen.getByText('Contas & Cartões')).toBeDefined();
        
        fireEvent.change(screen.getByPlaceholderText('Ex: Banco do Brasil'), { target: { value: 'New Bank' } });
        fireEvent.click(screen.getByText('Adicionar Recurso'));

        await waitFor(() => {
            expect(addAccount).toHaveBeenCalledWith(expect.objectContaining({
                name: 'New Bank'
            }));
        });
    });

    it('switches tabs and allows adding a category', async () => {
        render(<SettingsModal onClose={onClose} />);
        
        const categoriesTab = screen.getAllByText('Categorias').find(el => el.tagName === 'BUTTON');
        fireEvent.click(categoriesTab!);
        
        expect(screen.getByPlaceholderText('Ex: Medicamentos')).toBeDefined();
        
        fireEvent.change(screen.getByPlaceholderText('Ex: Medicamentos'), { target: { value: 'New Cat' } });
        fireEvent.click(screen.getByText('Salvar Categoria'));

        await waitFor(() => {
            expect(addCategory).toHaveBeenCalledWith(expect.objectContaining({
                name: 'New Cat'
            }));
        });
    });
});
