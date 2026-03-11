import React from 'react';
import { useFinancialStore } from '../../../store/useFinancialStore';
import { Transaction } from '../../../types';
import { styles } from './styles';

interface Props {
    onEdit: (tx: Transaction) => void;
}

export function TransactionList({ onEdit }: Props) {
    const transactions = useFinancialStore(state => state.filteredTransactions());
    const categories = useFinancialStore(state => state.categories);

    const getCategoryName = (id: string) => categories.find(c => c.id === id)?.name || 'Desconhecida';
    const formatCurrency = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    return (
        <div className={styles.container}>
            {/* Desktop View */}
            <div className={styles.desktopWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.theadRow}>
                            <th className={styles.th}>Data</th>
                            <th className={styles.th}>Descrição</th>
                            <th className={styles.th}>Categoria</th>
                            <th className={styles.th}>Cliente / Fornecedor</th>
                            <th className={`${styles.th} text-right`}>Valor</th>
                            <th className={styles.th}>Status</th>
                            <th className={`${styles.th} text-right`}>Ações</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(tx => (
                            <tr key={tx.id} className={styles.tr}>
                                <td className={styles.tdDate}>
                                    {new Date(tx.date).toLocaleDateString('pt-BR')}
                                </td>
                                <td className={styles.tdDescription}>
                                    {tx.description}
                                    {tx.isRecurring && <span className={styles.recurringBadge}>Recorrente</span>}
                                </td>
                                <td className={styles.tdCategory}>
                                    {getCategoryName(tx.categoryId)}
                                </td>
                                <td className={styles.tdPayee}>
                                    {tx.payeeOrPayer}
                                </td>
                                <td className={styles.tdAmount(tx.type)}>
                                    {tx.type === 'INCOME' ? '+' : '-'}{formatCurrency(tx.amount)}
                                </td>
                                <td className={styles.tdStatus}>
                                    <div className={styles.statusWrapper}>
                                        <span className={styles.statusDot(tx.status)}></span>
                                        <span className={styles.statusText}>
                                            {tx.status === 'PAID' ? 'Pago' : tx.status === 'PENDING' ? 'Pendente' : 'Atrasado'}
                                        </span>
                                    </div>
                                </td>
                                <td className={styles.tdActions}>
                                    <button onClick={() => onEdit(tx)} className={styles.editButton}>
                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {transactions.length === 0 && (
                            <tr>
                                <td colSpan={7} className={styles.emptyRow}>Nenhuma transação encontrada no período.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className={styles.mobileWrapper}>
                {transactions.map(tx => (
                    <div key={tx.id} onClick={() => onEdit(tx)} className={styles.mobileItem}>
                        <div className={styles.mobileHeader}>
                            <div>
                                <h4 className={styles.mobileDescription}>{tx.description}</h4>
                                <p className={styles.mobileSub}>{getCategoryName(tx.categoryId)} • {new Date(tx.date).toLocaleDateString('pt-BR')}</p>
                            </div>
                            <span className={styles.mobileAmount(tx.type)}>
                                {tx.type === 'INCOME' ? '+' : '-'}{formatCurrency(tx.amount)}
                            </span>
                        </div>
                        <div className={styles.mobileFooter}>
                            <span className={styles.mobilePayee}>{tx.payeeOrPayer}</span>
                            <div className="flex items-center gap-2">
                                <span className={styles.mobileStatusDot(tx.status)}></span>
                                <span className={styles.mobileStatusText}>
                                    {tx.status === 'PAID' ? 'Pago' : tx.status === 'PENDING' ? 'Pendente' : 'Atrasado'}
                                </span>
                            </div>
                        </div>
                        {tx.isRecurring && <span className={styles.mobileRecurringBadge}>Recorrente</span>}
                    </div>
                ))}
                {transactions.length === 0 && (
                    <div className={styles.emptyRow}>Nenhuma transação encontrada.</div>
                )}
            </div>
        </div>
    );
}
