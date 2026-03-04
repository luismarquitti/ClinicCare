import React from 'react';
import { useFinancialStore } from '../../store/useFinancialStore';

export function DashboardMetrics() {
    const filteredIncome = useFinancialStore(state => state.filteredIncome());
    const filteredExpense = useFinancialStore(state => state.filteredExpense());
    const filteredBalance = useFinancialStore(state => state.filteredBalance());

    const formatCurrency = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Receitas */}
            <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-success/10 rounded-xl text-success">
                        <span className="material-symbols-outlined">trending_up</span>
                    </div>
                </div>
                <p className="text-sm font-medium text-text-muted mb-1">Receitas Filtradas</p>
                <h3 className="text-3xl font-bold text-text-main dark:text-white">
                    {formatCurrency(filteredIncome)}
                </h3>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-success/5 to-transparent rounded-full blur-xl group-hover:bg-success/10 transition-colors"></div>
            </div>

            {/* Despesas */}
            <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-danger/10 rounded-xl text-danger">
                        <span className="material-symbols-outlined">trending_down</span>
                    </div>
                </div>
                <p className="text-sm font-medium text-text-muted mb-1">Despesas Filtradas</p>
                <h3 className="text-3xl font-bold text-text-main dark:text-white">
                    {formatCurrency(filteredExpense)}
                </h3>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-danger/5 to-transparent rounded-full blur-xl group-hover:bg-danger/10 transition-colors"></div>
            </div>

            {/* Saldo */}
            <div className="bg-primary text-white rounded-xl p-6 shadow-lg shadow-primary/20 relative overflow-hidden group hover:shadow-xl transition-all">
                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="p-3 bg-white/20 rounded-xl text-white backdrop-blur-sm">
                        <span className="material-symbols-outlined">account_balance</span>
                    </div>
                </div>
                <p className="text-sm font-medium text-white/80 mb-1 relative z-10">Saldo no Período</p>
                <h3 className="text-3xl font-bold text-white relative z-10">
                    {formatCurrency(filteredBalance)}
                </h3>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/30 rounded-full -ml-8 -mb-8 blur-xl"></div>
            </div>
        </div>
    );
}
