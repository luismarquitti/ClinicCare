import React, { useState } from 'react';
import { useAppStore } from '../../../store';
import { ShoppingList } from '../../../types';
import { FulfillListModal } from '../components/FulfillListModal';

export function ShoppingListsTab() {
    const { shoppingLists } = useAppStore();
    const [selectedList, setSelectedList] = useState<ShoppingList | null>(null);
    const [isFulfillModalOpen, setIsFulfillModalOpen] = useState(false);
    const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-text-main dark:text-white">Listas de Compras e Abastecimento</h2>
                <button
                    onClick={() => setIsCreateListModalOpen(true)}
                    className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                >
                    + Nova Lista
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-surface-light border-y border-gray-200 dark:bg-surface-dark/50 dark:border-gray-700 text-sm font-semibold text-text-muted">
                            <th className="py-3 px-4">Nome da Lista</th>
                            <th className="py-3 px-4">Data de Criação</th>
                            <th className="py-3 px-4 text-center">Qtd Itens</th>
                            <th className="py-3 px-4 text-center">Status</th>
                            <th className="py-3 px-4 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {shoppingLists.map(list => (
                            <tr key={list.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors">
                                <td className="py-3 px-4 font-medium text-text-main dark:text-white">{list.name}</td>
                                <td className="py-3 px-4 text-text-muted">{new Date(list.dateCreated).toLocaleDateString('pt-BR')}</td>
                                <td className="py-3 px-4 text-center font-bold text-text-main dark:text-white">{list.items.length}</td>
                                <td className="py-3 px-4 text-center">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${list.status === 'completed' ? 'bg-success/10 text-success' : list.status === 'pending' ? 'bg-warning/10 text-warning' : 'bg-gray-100 text-gray-800'}`}>
                                        {list.status === 'completed' ? 'Concluída' : list.status === 'pending' ? 'Pendente' : 'Rascunho'}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <button
                                        onClick={() => {
                                            setSelectedList(list);
                                            setIsFulfillModalOpen(true);
                                        }}
                                        className="text-text-muted hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                                        title="Visualizar / Concluir"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {shoppingLists.length === 0 && (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-text-muted">Nenhuma lista em aberto.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <FulfillListModal
                isOpen={isFulfillModalOpen}
                onClose={() => {
                    setIsFulfillModalOpen(false);
                    setSelectedList(null);
                }}
                selectedList={selectedList}
            />
        </div>
    );
}
