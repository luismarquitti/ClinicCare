import React from 'react';
import { Link } from 'react-router-dom';
import { useDashboardStore } from '../../store/useDashboardStore';

export function FinancialCard() {
  const { stats, loading } = useDashboardStore();
  const { monthlyIncome, monthlyExpenses, pendingBilling } = stats.financial;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  if (loading) {
    return (
      <div className="p-8 border-2 border-gray-100 dark:border-gray-800 animate-pulse">
        <div className="h-4 w-24 bg-gray-200 dark:bg-surface-dark mb-6"></div>
        <div className="h-12 w-48 bg-gray-200 dark:bg-surface-dark mb-4"></div>
        <div className="h-4 w-32 bg-gray-200 dark:bg-surface-dark"></div>
      </div>
    );
  }

  return (
    <Link 
      to="/financial"
      className="group p-8 border-2 border-gray-200 dark:border-gray-800 hover:border-text-main dark:hover:border-white transition-all duration-300 flex flex-col text-left"
    >
      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-6 group-hover:text-text-main dark:group-hover:text-white transition-colors">
        Financeiro
      </h3>
      
      <div className="mb-2">
        <span className="text-4xl font-black tracking-tighter text-text-main dark:text-white block">
          {formatCurrency(monthlyIncome)}
        </span>
        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1 block">
          Receita Mensal
        </span>
      </div>

      <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2">
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-text-muted">
          <span>Despesas: {formatCurrency(monthlyExpenses)}</span>
          <span className="material-symbols-outlined text-text-muted group-hover:text-text-main dark:group-hover:text-white transition-colors text-[18px]">
            arrow_forward
          </span>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-danger">
          Pendentes: {formatCurrency(pendingBilling)}
        </div>
      </div>
    </Link>
  );
}
