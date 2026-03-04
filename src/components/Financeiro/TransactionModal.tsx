import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFinancialStore } from '../../store/useFinancialStore';
import { Transaction } from '../../types';

const transactionSchema = z.object({
    description: z.string().min(3, 'Descrição muito curta'),
    amount: z.number().min(0.01, 'Valor deve ser maior que zero'),
    type: z.enum(['INCOME', 'EXPENSE']),
    categoryId: z.string().min(1, 'Selecione uma categoria'),
    accountId: z.string().min(1, 'Selecione uma conta'),
    status: z.enum(['PAID', 'PENDING', 'OVERDUE']),
    date: z.string().min(1, 'Data é obrigatória'),
    payeeOrPayer: z.string().min(2, 'Informe o cliente/fornecedor'),
    isRecurring: z.boolean(),
});

type TransactionForm = z.infer<typeof transactionSchema>;

interface Props {
    transaction?: Transaction;
    onClose: () => void;
}

export function TransactionModal({ transaction, onClose }: Props) {
    const { categories, accounts, addTransaction, updateTransaction, deleteTransaction } = useFinancialStore();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<TransactionForm>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            date: new Date().toISOString().split('T')[0],
            type: 'EXPENSE',
            status: 'PENDING',
            amount: 0,
            isRecurring: false
        }
    });

    useEffect(() => {
        if (transaction) {
            reset({
                ...transaction,
                date: new Date(transaction.date).toISOString().split('T')[0]
            });
        }
    }, [transaction, reset]);

    const onSubmit = async (data: TransactionForm) => {
        try {
            const payload = {
                ...data,
                createdAt: transaction?.createdAt || new Date().toISOString()
            };

            if (transaction) {
                await updateTransaction(transaction.id, payload);
            } else {
                await addTransaction(payload as Omit<Transaction, 'id'>);
            }
            onClose();
        } catch (err) {
            console.error(err);
            alert('Erro ao salvar transação.');
        }
    };

    const handleDelete = async () => {
        if (transaction && window.confirm('Deseja realmente excluir esta transação?')) {
            await deleteTransaction(transaction.id);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-surface-dark w-full max-w-lg rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-surface-light/50 dark:bg-surface-dark/50">
                    <h3 className="text-lg font-bold text-text-main dark:text-white">
                        {transaction ? 'Editar Transação' : 'Nova Transação'}
                    </h3>
                    <button onClick={onClose} className="text-text-muted hover:text-text-main transition-colors p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                <div className="overflow-y-auto p-6 custom-scrollbar text-left">
                    <form id="transaction-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-main dark:text-white mb-1 ml-1">Tipo</label>
                                <select {...register('type')} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none">
                                    <option value="EXPENSE">Despesa</option>
                                    <option value="INCOME">Receita</option>
                                </select>
                                {errors.type && <span className="text-xs text-danger mt-1">{errors.type.message}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-main dark:text-white mb-1 ml-1">Valor</label>
                                <input type="number" step="0.01" {...register('amount', { valueAsNumber: true })} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="0.00" />
                                {errors.amount && <span className="text-xs text-danger mt-1">{errors.amount.message}</span>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-main dark:text-white mb-1 ml-1">Descrição</label>
                            <input type="text" {...register('description')} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="Ex: Conta de Luz, Honorários" />
                            {errors.description && <span className="text-xs text-danger mt-1">{errors.description.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-main dark:text-white mb-1 ml-1">Cliente / Fornecedor</label>
                            <input type="text" {...register('payeeOrPayer')} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="Ex: Enel, Residente João" />
                            {errors.payeeOrPayer && <span className="text-xs text-danger mt-1">{errors.payeeOrPayer.message}</span>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-main dark:text-white mb-1 ml-1">Data</label>
                                <input type="date" {...register('date')} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                {errors.date && <span className="text-xs text-danger mt-1">{errors.date.message}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-main dark:text-white mb-1 ml-1">Status</label>
                                <select {...register('status')} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none">
                                    <option value="PENDING">Pendente</option>
                                    <option value="PAID">Pago / Recebido</option>
                                    <option value="OVERDUE">Atrasado</option>
                                </select>
                                {errors.status && <span className="text-xs text-danger mt-1">{errors.status.message}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-main dark:text-white mb-1 ml-1">Categoria</label>
                                <select {...register('categoryId')} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none">
                                    <option value="">Selecione...</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                                {errors.categoryId && <span className="text-xs text-danger mt-1">{errors.categoryId.message}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-main dark:text-white mb-1 ml-1">Conta</label>
                                <select {...register('accountId')} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none">
                                    <option value="">Selecione...</option>
                                    {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                                </select>
                                {errors.accountId && <span className="text-xs text-danger mt-1">{errors.accountId.message}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mt-4 px-2">
                            <input type="checkbox" id="isRecurring" {...register('isRecurring')} className="w-4 h-4 rounded text-primary focus:ring-primary" />
                            <label htmlFor="isRecurring" className="text-sm font-medium text-text-main dark:text-white cursor-pointer select-none">Repetir transação (Recorrente)</label>
                        </div>

                    </form>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between bg-surface-light dark:bg-surface-dark mt-auto">
                    {transaction ? (
                        <button type="button" onClick={handleDelete} className="px-5 py-2.5 bg-danger/10 text-danger rounded-lg hover:bg-danger/20 transition-colors font-medium relative group">
                            Excluir
                            <span className="material-symbols-outlined text-[18px] opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 top-1/2 -translate-y-1/2 -translate-x-full group-hover:translate-x-0">delete</span>
                        </button>
                    ) : <div></div>}
                    <div className="flex gap-3">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-text-main dark:text-white rounded-lg transition-colors font-medium border border-gray-200 dark:border-gray-700">
                            Cancelar
                        </button>
                        <button type="submit" form="transaction-form" className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-sm active:scale-95">
                            Salvar Confirmações
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
