import React from 'react';
import { useFinancialStore } from '../../store/useFinancialStore';

export function DashboardMetrics() {
    const filteredIncome = useFinancialStore(state => state.filteredIncome());
    const filteredExpense = useFinancialStore(state => state.filteredExpense());
    const filteredBalance = useFinancialStore(state => state.filteredBalance());

    const formatCurrency = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Receitas */}
            <div className="bg-transparent pb-4 border-b-2 border-gray-200 dark:border-gray-800 group relative">
                <p className="text-xs font-bold tracking-widest text-text-muted uppercase mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-success inline-block"></span>
                    Entradas
                </p>
                <h3 className="text-4xl lg:text-5xl font-black text-text-main dark:text-white tracking-tighter">
                    {formatCurrency(filteredIncome)}
                </h3>
            </div>

            {/* Despesas */}
            <div className="bg-transparent pb-4 border-b-2 border-gray-200 dark:border-gray-800 group relative">
                <p className="text-xs font-bold tracking-widest text-text-muted uppercase mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-danger inline-block"></span>
                    Saídas
                </p>
                <h3 className="text-4xl lg:text-5xl font-black text-text-main dark:text-white tracking-tighter">
                    {formatCurrency(filteredExpense)}
                </h3>
            </div>

            {/* Saldo */}
            <div className="bg-transparent pb-4 border-b-4 border-text-main dark:border-white group relative">
                <p className="text-xs font-bold tracking-widest text-text-main dark:text-white uppercase mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-text-main dark:bg-white inline-block"></span>
                    Saldo Líquido
                </p>
                <h3 className="text-4xl lg:text-5xl font-black text-text-main dark:text-white tracking-tighter">
                    {formatCurrency(filteredBalance)}
                </h3>
            </div>
        </div>
    );
}
