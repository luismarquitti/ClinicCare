import React from 'react';
import { useFinancialStore } from '../../../store/useFinancialStore';
import { styles } from './styles';

export function DashboardMetrics() {
    const filteredIncome = useFinancialStore(state => state.filteredIncome());
    const filteredExpense = useFinancialStore(state => state.filteredExpense());
    const filteredBalance = useFinancialStore(state => state.filteredBalance());

    const formatCurrency = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    return (
        <div className={styles.grid}>
            {/* Receitas */}
            <div className={styles.metricWrapper('normal')}>
                <p className={styles.label(false)}>
                    <span className={styles.dot('success')}></span>
                    Entradas
                </p>
                <h3 className={styles.value}>
                    {formatCurrency(filteredIncome)}
                </h3>
            </div>

            {/* Despesas */}
            <div className={styles.metricWrapper('normal')}>
                <p className={styles.label(false)}>
                    <span className={styles.dot('danger')}></span>
                    Saídas
                </p>
                <h3 className={styles.value}>
                    {formatCurrency(filteredExpense)}
                </h3>
            </div>

            {/* Saldo */}
            <div className={styles.metricWrapper('thick')}>
                <p className={styles.label(true)}>
                    <span className={styles.dot('total')}></span>
                    Saldo Líquido
                </p>
                <h3 className={styles.value}>
                    {formatCurrency(filteredBalance)}
                </h3>
            </div>
        </div>
    );
}
