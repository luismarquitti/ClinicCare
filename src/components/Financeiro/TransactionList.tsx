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
        <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto hidden md:block">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-surface-light/50 dark:bg-surface-dark/50 text-text-muted text-xs uppercase tracking-wider font-semibold">
                            <th className="px-6 py-4 rounded-tl-lg">Data</th>
                            <th className="px-6 py-4">Descrição</th>
                            <th className="px-6 py-4">Categoria</th>
                            <th className="px-6 py-4">Cliente / Fornecedor</th>
                            <th className="px-6 py-4 text-right">Valor</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 rounded-tr-lg text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(tx => (
                            <tr key={tx.id} className="hover:bg-background-light dark:hover:bg-surface-dark/80 transition-colors group">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                                    {new Date(tx.date).toLocaleDateString('pt-BR')}
                                </td>
                                <td className="px-6 py-4 font-medium text-text-main dark:text-white">
                                    {tx.description}
                                    {tx.isRecurring && <span className="ml-2 bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full uppercase">Recorrente</span>}
                                </td>
                                <td className="px-6 py-4 text-sm text-text-muted">
                                    {getCategoryName(tx.categoryId)}
                                </td>
                                <td className="px-6 py-4 text-sm text-text-muted">
                                    {tx.payeeOrPayer}
                                </td>
                                <td className={`px-6 py-4 text-sm text-right font-bold ${tx.type === 'INCOME' ? 'text-success' : 'text-danger'}`}>
                                    {tx.type === 'INCOME' ? '+' : '-'}{formatCurrency(tx.amount)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${tx.status === 'PAID' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                            tx.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`}>
                                        {tx.status === 'PAID' ? 'Pago' : tx.status === 'PENDING' ? 'Pendente' : 'Atrasado'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => onEdit(tx)} className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors flex items-center justify-center ml-auto">
                                        <span className="material-symbols-outlined text-[20px]">edit</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {transactions.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center text-text-muted">Nenhuma transação encontrada com os filtros atuais.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden flex flex-col p-4 gap-4">
                {transactions.map(tx => (
                    <div key={tx.id} onClick={() => onEdit(tx)} className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-700 p-4 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition-all">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-text-main dark:text-white leading-tight">{tx.description}</h4>
                                <p className="text-xs text-text-muted mt-1">{getCategoryName(tx.categoryId)} • {new Date(tx.date).toLocaleDateString('pt-BR')}</p>
                            </div>
                            <span className={`font-bold ${tx.type === 'INCOME' ? 'text-success' : 'text-danger'}`}>
                                {tx.type === 'INCOME' ? '+' : '-'}{formatCurrency(tx.amount)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                            <span className="text-xs text-text-muted truncate max-w-[50%]">{tx.payeeOrPayer}</span>
                            <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full 
                ${tx.status === 'PAID' ? 'bg-green-100 text-green-800' :
                                    tx.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'}`}>
                                {tx.status}
                            </span>
                        </div>
                    </div>
                ))}
                {transactions.length === 0 && (
                    <div className="py-8 text-center text-text-muted">Nenhuma transação encontrada.</div>
                )}
            </div>
        </div>
    );
}
