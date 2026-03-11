import React, { useState } from 'react';
import { useFinancialStore } from '../../store/useFinancialStore';
import { Account, Category } from '../../types';

interface Props {
    onClose: () => void;
}

export function SettingsModal({ onClose }: Props) {
    const { 
        accounts, categories, 
        addAccount, updateAccount, deleteAccount,
        addCategory, updateCategory, deleteCategory 
    } = useFinancialStore();

    const [activeTab, setActiveTab] = useState<'ACCOUNTS' | 'CATEGORIES'>('ACCOUNTS');
    
    // Account Form State
    const [newAccName, setNewAccName] = useState('');
    const [newAccType, setNewAccType] = useState<Account['type']>('BANK_ACCOUNT');
    
    // Category Form State
    const [newCatName, setNewCatName] = useState('');
    const [newCatType, setNewCatType] = useState<Category['type']>('EXPENSE');
    const [newCatColor, setNewCatColor] = useState('#000000');

    const handleAddAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newAccName) return;
        await addAccount({
            name: newAccName,
            type: newAccType,
            initialBalance: 0,
            currentBalance: 0,
            createdAt: new Date().toISOString()
        });
        setNewAccName('');
    };

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCatName) return;
        await addCategory({
            name: newCatName,
            type: newCatType,
            color: newCatColor
        });
        setNewCatName('');
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-0">
            <div className="bg-white dark:bg-background-dark border-4 border-text-main dark:border-white w-full md:w-[700px] h-full md:h-auto md:max-h-[90vh] rounded-none shadow-2xl flex flex-col slide-in">
                <div className="px-8 py-6 border-b-2 border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <h3 className="text-2xl font-black text-text-main dark:text-white tracking-tighter uppercase">
                        Configurações
                    </h3>
                    <button onClick={onClose} className="text-text-main dark:text-white hover:opacity-70 transition-opacity">
                        <span className="material-symbols-outlined text-[28px]">close</span>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b-2 border-gray-200 dark:border-gray-800">
                    <button 
                        onClick={() => setActiveTab('ACCOUNTS')}
                        className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-colors ${activeTab === 'ACCOUNTS' ? 'bg-text-main text-white dark:bg-white dark:text-text-main' : 'text-text-muted hover:bg-gray-50 dark:hover:bg-surface-dark'}`}
                    >
                        Contas & Cartões
                    </button>
                    <button 
                        onClick={() => setActiveTab('CATEGORIES')}
                        className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-colors ${activeTab === 'CATEGORIES' ? 'bg-text-main text-white dark:bg-white dark:text-text-main' : 'text-text-muted hover:bg-gray-50 dark:hover:bg-surface-dark'}`}
                    >
                        Categorias
                    </button>
                </div>

                <div className="overflow-y-auto p-8 custom-scrollbar flex-1 text-left">
                    {activeTab === 'ACCOUNTS' ? (
                        <div className="space-y-10">
                            {/* Form */}
                            <form onSubmit={handleAddAccount} className="bg-gray-50 dark:bg-surface-dark p-6 border-2 border-gray-200 dark:border-gray-800">
                                <h4 className="text-xs font-black tracking-widest uppercase mb-6 text-text-main dark:text-white">Nova Conta / Cartão</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-bold tracking-widest text-text-muted uppercase mb-2">Nome da Instituição</label>
                                        <input 
                                            type="text" 
                                            value={newAccName}
                                            onChange={e => setNewAccName(e.target.value)}
                                            className="w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-700 py-2 text-sm font-bold outline-none focus:border-text-main dark:focus:border-white transition-colors"
                                            placeholder="Ex: Banco do Brasil"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold tracking-widest text-text-muted uppercase mb-2">Tipo</label>
                                        <select 
                                            value={newAccType}
                                            onChange={e => setNewAccType(e.target.value as any)}
                                            className="w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-700 py-2 text-sm font-bold outline-none uppercase appearance-none"
                                        >
                                            <option value="BANK_ACCOUNT">Conta Corrente</option>
                                            <option value="CREDIT_CARD">Cartão de Crédito</option>
                                            <option value="CASH">Dinheiro / Caixa</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="mt-8 w-full bg-text-main dark:bg-white text-white dark:text-text-main py-3 text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-opacity">
                                    Adicionar Recurso
                                </button>
                            </form>

                            {/* List */}
                            <div className="space-y-4">
                                <h4 className="text-xs font-black tracking-widest uppercase text-text-main dark:text-white">Gerenciar Existentes</h4>
                                <div className="divide-y-2 divide-gray-100 dark:divide-gray-800">
                                    {accounts.map(acc => (
                                        <div key={acc.id} className="py-4 flex justify-between items-center group">
                                            <div>
                                                <p className="font-bold text-text-main dark:text-white">{acc.name}</p>
                                                <p className="text-[10px] font-bold tracking-widest text-text-muted uppercase">{acc.type}</p>
                                            </div>
                                            <button 
                                                onClick={() => window.confirm('Excluir esta conta?') && deleteAccount(acc.id)}
                                                className="opacity-0 group-hover:opacity-100 text-danger transition-opacity p-2"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                            </button>
                                        </div>
                                    ))}
                                    {accounts.length === 0 && <p className="py-10 text-center text-xs font-bold tracking-widest text-text-muted uppercase">Nenhuma conta cadastrada.</p>}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-10">
                            {/* Form */}
                            <form onSubmit={handleAddCategory} className="bg-gray-50 dark:bg-surface-dark p-6 border-2 border-gray-200 dark:border-gray-800">
                                <h4 className="text-xs font-black tracking-widest uppercase mb-6 text-text-main dark:text-white">Nova Categoria</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] font-bold tracking-widest text-text-muted uppercase mb-2">Título da Categoria</label>
                                        <input 
                                            type="text" 
                                            value={newCatName}
                                            onChange={e => setNewCatName(e.target.value)}
                                            className="w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-700 py-2 text-sm font-bold outline-none focus:border-text-main dark:focus:border-white transition-colors"
                                            placeholder="Ex: Medicamentos"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold tracking-widest text-text-muted uppercase mb-2">Natureza</label>
                                        <select 
                                            value={newCatType}
                                            onChange={e => setNewCatType(e.target.value as any)}
                                            className="w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-700 py-2 text-sm font-bold outline-none uppercase appearance-none"
                                        >
                                            <option value="EXPENSE">Despesa</option>
                                            <option value="INCOME">Receita</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="mt-8 w-full bg-text-main dark:bg-white text-white dark:text-text-main py-3 text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-opacity">
                                    Salvar Categoria
                                </button>
                            </form>

                            {/* List */}
                            <div className="space-y-4">
                                <h4 className="text-xs font-black tracking-widest uppercase text-text-main dark:text-white">Gerenciar Categorias</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {categories.map(cat => (
                                        <div key={cat.id} className="p-4 border-2 border-gray-100 dark:border-gray-800 flex justify-between items-center group">
                                            <div className="flex items-center gap-3">
                                                <span className={`w-2 h-2 rounded-full ${cat.type === 'INCOME' ? 'bg-success' : 'bg-danger'}`}></span>
                                                <div>
                                                    <p className="text-sm font-bold text-text-main dark:text-white leading-none">{cat.name}</p>
                                                    <p className="text-[9px] font-bold tracking-widest text-text-muted uppercase mt-1">{cat.type === 'INCOME' ? 'Receita' : 'Despesa'}</p>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => window.confirm('Excluir esta categoria?') && deleteCategory(cat.id)}
                                                className="opacity-0 group-hover:opacity-100 text-danger transition-opacity p-1"
                                            >
                                                <span className="material-symbols-outlined text-[16px]">delete</span>
                                            </button>
                                        </div>
                                    ))}
                                    {categories.length === 0 && <p className="col-span-full py-10 text-center text-xs font-bold tracking-widest text-text-muted uppercase">Nenhuma categoria cadastrada.</p>}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="px-8 py-6 border-t-2 border-gray-200 dark:border-gray-800 flex justify-end items-center bg-gray-50 dark:bg-surface-dark mt-auto">
                    <button onClick={onClose} className="px-8 py-3 bg-text-main dark:bg-white text-white dark:text-text-main font-bold tracking-widest text-xs uppercase hover:opacity-90 transition-opacity active:scale-95 rounded-none">
                        Fechar Painel
                    </button>
                </div>
            </div>
        </div>
    );
}
