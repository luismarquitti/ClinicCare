import React, { useState, useEffect } from 'react';
import { useFinancialStore } from '../../store/useFinancialStore';
import { DashboardMetrics } from '../../components/financeiro/DashboardMetrics';
import { FilterBar } from '../../components/financeiro/FilterBar';
import { TransactionList } from '../../components/financeiro/TransactionList';
import { TransactionModal } from '../../components/financeiro/TransactionModal';
import { SettingsModal } from '../../components/financeiro/SettingsModal';
import { Transaction } from '../../types';
import { styles } from './styles';

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
        <div className={styles.container}>
            <div className={styles.headerWrapper}>
                <div>
                    <h1 className={styles.title}>Fluxo de Caixa</h1>
                    <p className={styles.subtitle}>Visão consolidada do período</p>
                </div>
                <div className={styles.actionsWrapper}>
                    <button
                        onClick={handleExportCSV}
                        className={styles.textButton}
                    >
                        <span className="material-symbols-outlined text-[16px]">download</span>
                        <span className="hidden sm:inline">Exportar CSV</span>
                    </button>
                    <button
                        onClick={() => setSettingsOpen(true)}
                        className={styles.textButton}
                    >
                        <span className="material-symbols-outlined text-[16px]">tune</span>
                        <span className="hidden sm:inline">Configurar</span>
                    </button>
                    <button
                        onClick={handleOpenNew}
                        className={styles.primaryButton}
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
                className={styles.fab}
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
