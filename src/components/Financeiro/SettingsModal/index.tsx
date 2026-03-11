import React, { useState } from 'react';
import { useFinancialStore } from '../../../store/useFinancialStore';
import { Account, Category } from '../../../types';
import { styles } from './styles';

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
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h3 className={styles.title}>
                        Configurações
                    </h3>
                    <button onClick={onClose} className={styles.closeButton}>
                        <span className={styles.closeIcon}>close</span>
                    </button>
                </div>

                {/* Tabs */}
                <div className={styles.tabsWrapper}>
                    <button 
                        onClick={() => setActiveTab('ACCOUNTS')}
                        className={styles.tab(activeTab === 'ACCOUNTS')}
                    >
                        Contas & Cartões
                    </button>
                    <button 
                        onClick={() => setActiveTab('CATEGORIES')}
                        className={styles.tab(activeTab === 'CATEGORIES')}
                    >
                        Categorias
                    </button>
                </div>

                <div className={styles.content}>
                    {activeTab === 'ACCOUNTS' ? (
                        <div className={styles.section}>
                            {/* Form */}
                            <form onSubmit={handleAddAccount} className={styles.form}>
                                <h4 className={styles.formTitle}>Nova Conta / Cartão</h4>
                                <div className={styles.grid}>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Nome da Instituição</label>
                                        <input 
                                            type="text" 
                                            value={newAccName}
                                            onChange={e => setNewAccName(e.target.value)}
                                            className={styles.input}
                                            placeholder="Ex: Banco do Brasil"
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Tipo</label>
                                        <select 
                                            value={newAccType}
                                            onChange={e => setNewAccType(e.target.value as any)}
                                            className={styles.select}
                                        >
                                            <option value="BANK_ACCOUNT">Conta Corrente</option>
                                            <option value="CREDIT_CARD">Cartão de Crédito</option>
                                            <option value="CASH">Dinheiro / Caixa</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className={styles.submitButton}>
                                    Adicionar Recurso
                                </button>
                            </form>

                            {/* List */}
                            <div className={styles.listWrapper}>
                                <h4 className={styles.listTitle}>Gerenciar Existentes</h4>
                                <div className="divide-y-2 divide-gray-100 dark:divide-gray-800">
                                    {accounts.map(acc => (
                                        <div key={acc.id} className={styles.listItem}>
                                            <div>
                                                <p className={styles.itemPrimary}>{acc.name}</p>
                                                <p className={styles.itemSecondary}>{acc.type}</p>
                                            </div>
                                            <button 
                                                onClick={() => window.confirm('Excluir esta conta?') && deleteAccount(acc.id)}
                                                className={styles.deleteButton}
                                            >
                                                <span className={styles.deleteIcon}>delete</span>
                                            </button>
                                        </div>
                                    ))}
                                    {accounts.length === 0 && <p className={styles.emptyText}>Nenhuma conta cadastrada.</p>}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.section}>
                            {/* Form */}
                            <form onSubmit={handleAddCategory} className={styles.form}>
                                <h4 className={styles.formTitle}>Nova Categoria</h4>
                                <div className={styles.grid3}>
                                    <div className="md:col-span-2">
                                        <label className={styles.label}>Título da Categoria</label>
                                        <input 
                                            type="text" 
                                            value={newCatName}
                                            onChange={e => setNewCatName(e.target.value)}
                                            className={styles.input}
                                            placeholder="Ex: Medicamentos"
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Natureza</label>
                                        <select 
                                            value={newCatType}
                                            onChange={e => setNewCatType(e.target.value as any)}
                                            className={styles.select}
                                        >
                                            <option value="EXPENSE">Despesa</option>
                                            <option value="INCOME">Receita</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className={styles.submitButton}>
                                    Salvar Categoria
                                </button>
                            </form>

                            {/* List */}
                            <div className={styles.listWrapper}>
                                <h4 className={styles.listTitle}>Gerenciar Categorias</h4>
                                <div className={styles.categoryGrid}>
                                    {categories.map(cat => (
                                        <div key={cat.id} className={styles.categoryCard}>
                                            <div className={styles.categoryInfo}>
                                                <span className={styles.categoryDot(cat.type)}></span>
                                                <div>
                                                    <p className={styles.categoryName}>{cat.name}</p>
                                                    <p className={styles.categoryType}>{cat.type === 'INCOME' ? 'Receita' : 'Despesa'}</p>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => window.confirm('Excluir esta categoria?') && deleteCategory(cat.id)}
                                                className={styles.deleteButton}
                                            >
                                                <span className={styles.deleteIcon}>delete</span>
                                            </button>
                                        </div>
                                    ))}
                                    {categories.length === 0 && <p className={styles.emptyText}>Nenhuma categoria cadastrada.</p>}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.footer}>
                    <button onClick={onClose} className={styles.footerButton}>
                        Fechar Painel
                    </button>
                </div>
            </div>
        </div>
    );
}
