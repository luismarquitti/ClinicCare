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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-0">
            <div className="bg-white dark:bg-background-dark border-4 border-text-main dark:border-white w-full md:w-[600px] h-full md:h-auto md:max-h-[90vh] rounded-none shadow-2xl flex flex-col slide-in">
                <div className="px-8 py-6 border-b-2 border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <h3 className="text-2xl font-black text-text-main dark:text-white tracking-tighter uppercase">
                        {transaction ? 'Editar Lançamento' : 'Novo Lançamento'}
                    </h3>
                    <button onClick={onClose} className="text-text-main dark:text-white hover:opacity-70 transition-opacity">
                        <span className="material-symbols-outlined text-[28px]">close</span>
                    </button>
                </div>

                <div className="overflow-y-auto p-8 custom-scrollbar text-left flex-1">
                    <form id="transaction-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="tx-type" className="block text-xs font-bold tracking-widest text-text-muted uppercase mb-2">Natureza</label>
                                <select id="tx-type" {...register('type')} className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 dark:border-gray-800 focus:border-text-main dark:focus:border-white text-lg font-bold outline-none uppercase transition-colors appearance-none">
                                    <option value="EXPENSE">Saída (-)</option>
                                    <option value="INCOME">Entrada (+)</option>
                                </select>
                                {errors.type && <span className="text-xs text-danger font-bold mt-1 tracking-widest">{errors.type.message}</span>}
                            </div>
                            <div>
                                <label htmlFor="tx-amount" className="block text-xs font-bold tracking-widest text-text-muted uppercase mb-2">Valor Total</label>
                                <input id="tx-amount" type="number" step="0.01" {...register('amount', { valueAsNumber: true })} className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 dark:border-gray-800 focus:border-text-main dark:focus:border-white text-3xl font-black tracking-tighter outline-none transition-colors" placeholder="0.00" />
                                {errors.amount && <span className="text-xs text-danger font-bold mt-1 tracking-widest">{errors.amount.message}</span>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="tx-description" className="block text-xs font-bold tracking-widest text-text-muted uppercase mb-2">Histórico / Descrição</label>
                            <input id="tx-description" type="text" {...register('description')} className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 dark:border-gray-800 focus:border-text-main dark:focus:border-white text-lg font-bold outline-none transition-colors" placeholder="" />
                            {errors.description && <span className="text-xs text-danger font-bold mt-1 tracking-widest">{errors.description.message}</span>}
                        </div>

                        <div>
                            <label htmlFor="tx-payee" className="block text-xs font-bold tracking-widest text-text-muted uppercase mb-2">Favorecido / Pagador</label>
                            <input id="tx-payee" type="text" {...register('payeeOrPayer')} className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 dark:border-gray-800 focus:border-text-main dark:focus:border-white text-lg font-bold outline-none transition-colors" placeholder="" />
                            {errors.payeeOrPayer && <span className="text-xs text-danger font-bold mt-1 tracking-widest">{errors.payeeOrPayer.message}</span>}
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="tx-date" className="block text-xs font-bold tracking-widest text-text-muted uppercase mb-2">Competência</label>
                                <input id="tx-date" type="date" {...register('date')} className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 dark:border-gray-800 focus:border-text-main dark:focus:border-white font-bold outline-none transition-colors appearance-none" />
                                {errors.date && <span className="text-xs text-danger font-bold mt-1 tracking-widest">{errors.date.message}</span>}
                            </div>
                            <div>
                                <label htmlFor="tx-status" className="block text-xs font-bold tracking-widest text-text-muted uppercase mb-2">Situação</label>
                                <select id="tx-status" {...register('status')} className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 dark:border-gray-800 focus:border-text-main dark:focus:border-white font-bold outline-none uppercase transition-colors appearance-none text-sm">
                                    <option value="PENDING">PENDENTE</option>
                                    <option value="PAID">PAGO / EFETIVADO</option>
                                    <option value="OVERDUE">EM ATRASO</option>
                                </select>
                                {errors.status && <span className="text-xs text-danger font-bold mt-1 tracking-widest">{errors.status.message}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="tx-category" className="block text-xs font-bold tracking-widest text-text-muted uppercase mb-2">Classificação</label>
                                <select id="tx-category" {...register('categoryId')} className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 dark:border-gray-800 focus:border-text-main dark:focus:border-white font-bold outline-none transition-colors appearance-none  text-sm uppercase">
                                    <option value="">A CLASSIFICAR</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                                {errors.categoryId && <span className="text-xs text-danger font-bold mt-1 tracking-widest">{errors.categoryId.message}</span>}
                            </div>
                            <div>
                                <label htmlFor="tx-account" className="block text-xs font-bold tracking-widest text-text-muted uppercase mb-2">Fonte Fundo</label>
                                <select id="tx-account" {...register('accountId')} className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 dark:border-gray-800 focus:border-text-main dark:focus:border-white font-bold outline-none transition-colors appearance-none text-sm uppercase">
                                    <option value="">CONTA NÃO DEFINIDA</option>
                                    {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                                </select>
                                {errors.accountId && <span className="text-xs text-danger font-bold mt-1 tracking-widest">{errors.accountId.message}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-4">
                            <input type="checkbox" id="isRecurring" {...register('isRecurring')} className="w-5 h-5 rounded-none border-2 border-text-main dark:border-white text-text-main bg-transparent focus:ring-0 checked:bg-text-main checked:border-text-main appearance-none cursor-pointer" />
                            <label htmlFor="isRecurring" className="text-xs font-bold tracking-widest text-text-main dark:text-white uppercase cursor-pointer select-none">Evento Recorrente</label>
                        </div>

                    </form>
                </div>

                <div className="px-8 py-6 border-t-2 border-gray-200 dark:border-gray-800 flex justify-between items-center bg-transparent mt-auto">
                    {transaction ? (
                        <button type="button" onClick={handleDelete} className="text-xs font-bold tracking-widest text-danger uppercase hover:opacity-70 transition-opacity flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                            Destruir Registro
                        </button>
                    ) : <div></div>}
                    <div className="flex gap-4">
                        <button type="button" onClick={onClose} className="px-6 py-3 bg-transparent text-text-main dark:text-white font-bold tracking-widest text-xs uppercase hover:opacity-70 transition-opacity">
                            Descartar
                        </button>
                        <button type="submit" form="transaction-form" className="px-8 py-3 bg-text-main dark:bg-white text-white dark:text-text-main font-bold tracking-widest text-xs uppercase hover:opacity-90 transition-opacity active:scale-95 rounded-none shadow-none">
                            Consolidar
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
