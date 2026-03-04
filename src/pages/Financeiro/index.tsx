import React, { useState, useEffect } from 'react';
import { useFinancialStore } from '../../store/useFinancialStore';
import { DashboardMetrics } from '../../components/Financeiro/DashboardMetrics';
import { FilterBar } from '../../components/Financeiro/FilterBar';
import { TransactionList } from '../../components/Financeiro/TransactionList';
import { TransactionModal } from '../../components/Financeiro/TransactionModal';
import { SettingsModal } from '../../components/Financeiro/SettingsModal';
import { Transaction } from '../../types';

export function Financeiro() {
    const initializeListeners = useFinancialStore(state => state.initializeListeners);
    const [modalOpen, setModalOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [editingTx, setEditingTx] = useState<Transaction | undefined>(undefined);

    useEffect(() => {
        const unsub = initializeListeners();
        return () => unsub();
    }, [initializeListeners]);

    const handleOpenNew = () => {
        setEditingTx(undefined);
        setModalOpen(true);
    };

    const handleEdit = (tx: Transaction) => {
        setEditingTx(tx);
        setModalOpen(true);
    };

    return (
        <div className="w-full max-w-[1440px] mx-auto pb-24 md:pb-8 relative min-h-screen slide-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-text-main dark:text-white tracking-tight">Painel Financeiro</h1>
                    <p className="text-text-muted dark:text-gray-400 mt-1">Gestão de Fluxo de Caixa e Lançamentos (Visualização Base / Mock Integrado)</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setSettingsOpen(true)}
                        className="flex items-center gap-2 bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-text-main dark:text-white px-4 py-2.5 rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">settings</span>
                        <span className="hidden sm:inline">Configurações</span>
                    </button>
                    <button
                        onClick={handleOpenNew}
                        className="hidden md:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-medium hover:bg-primary/90 transition-shadow shadow-md hover:shadow-lg active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        Nova Transação
                    </button>
                </div>
            </div>

            <DashboardMetrics />

            <FilterBar />

            <TransactionList onEdit={handleEdit} />

            {/* Mobile FAB */}
            <button
                onClick={handleOpenNew}
                className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 z-40 active:scale-95 transition-transform"
            >
                <span className="material-symbols-outlined text-[28px]">add</span>
            </button>

            {modalOpen && (
                <TransactionModal
                    transaction={editingTx}
                    onClose={() => setModalOpen(false)}
                />
            )}

            {settingsOpen && (
                <SettingsModal onClose={() => setSettingsOpen(false)} />
            )}
        </div>
    );
}
