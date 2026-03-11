import React from 'react';
import { Link } from 'react-router-dom';
import { useDashboardStore } from '../../../store/useDashboardStore';
import { styles } from './styles';

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
      <div className={styles.skeleton}>
        <div className={styles.skeletonLabel}></div>
        <div className={styles.skeletonValue}></div>
        <div className={styles.skeletonFooter}></div>
      </div>
    );
  }

  return (
    <Link 
      to="/financial"
      className={styles.container}
    >
      <h3 className={styles.label}>
        Financeiro
      </h3>
      
      <div className={styles.valueWrapper}>
        <span className={styles.value}>
          {formatCurrency(monthlyIncome)}
        </span>
        <span className={styles.valueLabel}>
          Receita Mensal
        </span>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerRow}>
          <span>Despesas: {formatCurrency(monthlyExpenses)}</span>
          <span className={styles.icon}>
            arrow_forward
          </span>
        </div>
        <div className={styles.pendingText}>
          Pendentes: {formatCurrency(pendingBilling)}
        </div>
      </div>
    </Link>
  );
}
