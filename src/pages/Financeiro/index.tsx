import React, { useState, useEffect } from 'react';
import { useFinancialStore } from '../../store/useFinancialStore';
import { DashboardMetrics } from '../../components/financeiro/DashboardMetrics';
import { FilterBar } from '../../components/financeiro/FilterBar';
import { TransactionList } from '../../components/financeiro/TransactionList';
import { TransactionModal } from '../../components/financeiro/TransactionModal';
import { SettingsModal } from '../../components/financeiro/SettingsModal';
import { Transaction } from '../../types';

export function Financeiro() {
    const initializeListeners = useFinancialStore(state => state.initializeListeners);
    const transactions = useFinancialStore(state => state.filteredTransactions());
    const categories = useFinancialStore(state => state.categories);
    const [modalOpen, setModalOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [editingTx, setEditingTx] = useState<Transaction | undefined>(undefined);

    useEffect(() => {
        const unsub = initializeListeners();
        return () => unsub();
    }, [initializeListeners]);

    const handleExportCSV = () => {
        const getCategoryName = (id: string) => categories.find(c => c.id === id)?.name || 'Desconhecida';
        
        const headers = ['Data', 'Descricao', 'Categoria', 'Favorecido/Pagador', 'Tipo', 'Valor', 'Status'];
        const rows = transactions.map(tx => [
            new Date(tx.date).toLocaleDateString('pt-BR'),
            tx.description,
            getCategoryName(tx.categoryId),
            tx.payeeOrPayer,
            tx.type === 'INCOME' ? 'Receita' : 'Despesa',
            tx.amount.toFixed(2),
            tx.status
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `financeiro_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 pb-6 border-b border-gray-200 dark:border-gray-800">
                <div>
                    <h1 className="text-4xl font-black text-text-main dark:text-white tracking-tighter uppercase">Fluxo de Caixa</h1>
                    <p className="text-sm font-medium tracking-wide text-text-muted dark:text-gray-400 mt-2 uppercase">Visão consolidada do período</p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleExportCSV}
                        className="flex items-center gap-2 bg-transparent text-text-main dark:text-white px-0 py-2 font-bold tracking-widest text-xs uppercase hover:opacity-70 transition-opacity border-b-2 border-transparent hover:border-text-main dark:hover:border-white"
                    >
                        <span className="material-symbols-outlined text-[16px]">download</span>
                        <span className="hidden sm:inline">Exportar CSV</span>
                    </button>
                    <button
                        onClick={() => setSettingsOpen(true)}
                        className="flex items-center gap-2 bg-transparent text-text-main dark:text-white px-0 py-2 font-bold tracking-widest text-xs uppercase hover:opacity-70 transition-opacity border-b-2 border-transparent hover:border-text-main dark:hover:border-white"
                    >
                        <span className="material-symbols-outlined text-[16px]">tune</span>
                        <span className="hidden sm:inline">Configurar</span>
                    </button>
                    <button
                        onClick={handleOpenNew}
                        className="hidden md:flex items-center gap-2 bg-text-main dark:bg-white text-white dark:text-text-main px-6 py-3 rounded-none font-bold tracking-widest text-xs uppercase hover:opacity-90 transition-opacity active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        Novo Lançamento
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
