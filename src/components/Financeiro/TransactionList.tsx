import React from 'react';
import { useFinancialStore } from '../../store/useFinancialStore';
import { Transaction } from '../../types';

interface Props {
    onEdit: (tx: Transaction) => void;
}

export function TransactionList({ onEdit }: Props) {
    const transactions = useFinancialStore(state => state.filteredTransactions());
    const categories = useFinancialStore(state => state.categories);

    const getCategoryName = (id: string) => categories.find(c => c.id === id)?.name || 'Desconhecida';
    const formatCurrency = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    return (
        <div className="mb-10 w-full overflow-hidden">
            {/* Desktop View */}
            <div className="overflow-x-auto hidden md:block">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b-2 border-text-main dark:border-white text-text-main dark:text-white">
                            <th className="px-2 py-4 text-xs font-bold tracking-widest uppercase">Data</th>
                            <th className="px-2 py-4 text-xs font-bold tracking-widest uppercase">Descrição</th>
                            <th className="px-2 py-4 text-xs font-bold tracking-widest uppercase">Categoria</th>
                            <th className="px-2 py-4 text-xs font-bold tracking-widest uppercase">Cliente / Fornecedor</th>
                            <th className="px-2 py-4 text-xs font-bold tracking-widest uppercase text-right">Valor</th>
                            <th className="px-2 py-4 text-xs font-bold tracking-widest uppercase">Status</th>
                            <th className="px-2 py-4 text-xs font-bold tracking-widest uppercase text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(tx => (
                            <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-surface-dark transition-colors group">
                                <td className="px-2 py-5 whitespace-nowrap text-sm font-medium text-text-muted">
                                    {new Date(tx.date).toLocaleDateString('pt-BR')}
                                </td>
                                <td className="px-2 py-5 font-bold text-text-main dark:text-white">
                                    {tx.description}
                                    {tx.isRecurring && <span className="ml-3 border border-text-main dark:border-white text-text-main dark:text-white text-[9px] font-bold tracking-widest px-1.5 py-0.5 uppercase">Recorrente</span>}
                                </td>
                                <td className="px-2 py-5 text-sm font-medium text-text-muted">
                                    {getCategoryName(tx.categoryId)}
                                </td>
                                <td className="px-2 py-5 text-sm font-medium text-text-muted">
                                    {tx.payeeOrPayer}
                                </td>
                                <td className={`px-2 py-5 text-base text-right font-black tracking-tight ${tx.type === 'INCOME' ? 'text-text-main dark:text-white' : 'text-text-muted'}`}>
                                    {tx.type === 'INCOME' ? '+' : '-'}{formatCurrency(tx.amount)}
                                </td>
                                <td className="px-2 py-5 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${tx.status === 'PAID' ? 'bg-success' : tx.status === 'PENDING' ? 'bg-warning' : 'bg-danger'}`}></span>
                                        <span className="text-xs font-bold tracking-widest uppercase text-text-main dark:text-white">
                                            {tx.status === 'PAID' ? 'Pago' : tx.status === 'PENDING' ? 'Pendente' : 'Atrasado'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-2 py-5 whitespace-nowrap text-right text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => onEdit(tx)} className="text-text-main dark:text-white hover:opacity-70 transition-opacity flex items-center justify-center ml-auto">
                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {transactions.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-2 py-10 text-center text-sm font-bold tracking-widest uppercase text-text-muted border-b border-gray-200 dark:border-gray-800">Nenhuma transação encontrada no período.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden flex flex-col gap-0 border-t-2 border-text-main dark:border-white">
                {transactions.map(tx => (
                    <div key={tx.id} onClick={() => onEdit(tx)} className="py-5 border-b border-gray-200 dark:border-gray-800 cursor-pointer active:bg-gray-50 dark:active:bg-surface-dark transition-colors">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h4 className="font-bold text-text-main dark:text-white leading-tight">{tx.description}</h4>
                                <p className="text-xs font-bold tracking-widest uppercase text-text-muted mt-1">{getCategoryName(tx.categoryId)} • {new Date(tx.date).toLocaleDateString('pt-BR')}</p>
                            </div>
                            <span className={`font-black tracking-tight ${tx.type === 'INCOME' ? 'text-text-main dark:text-white' : 'text-text-muted'}`}>
                                {tx.type === 'INCOME' ? '+' : '-'}{formatCurrency(tx.amount)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center mt-3 pt-3">
                            <span className="text-xs font-medium text-text-muted truncate max-w-[50%]">{tx.payeeOrPayer}</span>
                            <div className="flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${tx.status === 'PAID' ? 'bg-success' : tx.status === 'PENDING' ? 'bg-warning' : 'bg-danger'}`}></span>
                                <span className="text-[10px] font-bold tracking-widest uppercase text-text-main dark:text-white">
                                    {tx.status === 'PAID' ? 'Pago' : tx.status === 'PENDING' ? 'Pendente' : 'Atrasado'}
                                </span>
                            </div>
                        </div>
                        {tx.isRecurring && <span className="mt-3 block w-max border border-text-main dark:border-white text-text-main dark:text-white text-[9px] font-bold tracking-widest px-1.5 py-0.5 uppercase">Recorrente</span>}
                    </div>
                ))}
                {transactions.length === 0 && (
                    <div className="py-10 text-center text-sm font-bold tracking-widest uppercase text-text-muted border-b border-gray-200 dark:border-gray-800">Nenhuma transação encontrada.</div>
                )}
            </div>
        </div>
    );
}
