import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFinancialStore } from '../../../store/useFinancialStore';
import { Transaction } from '../../../types';
import { styles } from './styles';

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
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h3 className={styles.title}>
                        {transaction ? 'Editar Lançamento' : 'Novo Lançamento'}
                    </h3>
                    <button onClick={onClose} className={styles.closeButton}>
                        <span className={styles.closeIcon}>close</span>
                    </button>
                </div>

                <div className={styles.content}>
                    <form id="transaction-form" onSubmit={handleSubmit(onSubmit)} className={styles.form}>

                        <div className={styles.grid}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="tx-type" className={styles.label}>Natureza</label>
                                <select id="tx-type" {...register('type')} className={styles.select}>
                                    <option value="EXPENSE">Saída (-)</option>
                                    <option value="INCOME">Entrada (+)</option>
                                </select>
                                {errors.type && <span className={styles.errorText}>{errors.type.message}</span>}
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="tx-amount" className={styles.label}>Valor Total</label>
                                <input id="tx-amount" type="number" step="0.01" {...register('amount', { valueAsNumber: true })} className={styles.amountInput} placeholder="0.00" />
                                {errors.amount && <span className={styles.errorText}>{errors.amount.message}</span>}
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="tx-description" className={styles.label}>Histórico / Descrição</label>
                            <input id="tx-description" type="text" {...register('description')} className={styles.textInput} placeholder="" />
                            {errors.description && <span className={styles.errorText}>{errors.description.message}</span>}
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="tx-payee" className={styles.label}>Favorecido / Pagador</label>
                            <input id="tx-payee" type="text" {...register('payeeOrPayer')} className={styles.textInput} placeholder="" />
                            {errors.payeeOrPayer && <span className={styles.errorText}>{errors.payeeOrPayer.message}</span>}
                        </div>

                        <div className={styles.grid}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="tx-date" className={styles.label}>Competência</label>
                                <input id="tx-date" type="date" {...register('date')} className={styles.dateInput} />
                                {errors.date && <span className={styles.errorText}>{errors.date.message}</span>}
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="tx-status" className={styles.label}>Situação</label>
                                <select id="tx-status" {...register('status')} className={styles.statusSelect}>
                                    <option value="PENDING">PENDENTE</option>
                                    <option value="PAID">PAGO / EFETIVADO</option>
                                    <option value="OVERDUE">EM ATRASO</option>
                                </select>
                                {errors.status && <span className={styles.errorText}>{errors.status.message}</span>}
                            </div>
                        </div>

                        <div className={styles.grid}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="tx-category" className={styles.label}>Classificação</label>
                                <select id="tx-category" {...register('categoryId')} className={styles.categorySelect}>
                                    <option value="">A CLASSIFICAR</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                                {errors.categoryId && <span className={styles.errorText}>{errors.categoryId.message}</span>}
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="tx-account" className={styles.label}>Fonte Fundo</label>
                                <select id="tx-account" {...register('accountId')} className={styles.categorySelect}>
                                    <option value="">CONTA NÃO DEFINIDA</option>
                                    {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                                </select>
                                {errors.accountId && <span className={styles.errorText}>{errors.accountId.message}</span>}
                            </div>
                        </div>

                        <div className={styles.checkboxWrapper}>
                            <input type="checkbox" id="isRecurring" {...register('isRecurring')} className={styles.checkbox} />
                            <label htmlFor="isRecurring" className={styles.checkboxLabel}>Evento Recorrente</label>
                        </div>

                    </form>
                </div>

                <div className={styles.footer}>
                    {transaction ? (
                        <button type="button" onClick={handleDelete} className={styles.deleteButton}>
                            <span className={styles.deleteIcon}>delete</span>
                            Destruir Registro
                        </button>
                    ) : <div></div>}
                    <div className={styles.actionsWrapper}>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>
                            Descartar
                        </button>
                        <button type="submit" form="transaction-form" className={styles.submitButton}>
                            Consolidar
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
