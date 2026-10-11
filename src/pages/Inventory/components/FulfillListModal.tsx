import React from 'react';
import { useAppStore } from '../../../store';
import { ShoppingList } from '../../../types';

interface FulfillListModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedList: ShoppingList | null;
}

export function FulfillListModal({ isOpen, onClose, selectedList }: FulfillListModalProps) {
    const { inventory } = useAppStore();

    const handleFulfillList = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here we would ideally loop through fulfill items and call logic
        // For now, let's just mark it closed. (Full implementation can be expanded)
        if (selectedList) {
            alert('Funcionalidade de concluir compra enviará dados ao Firebase e atualizará estoque.');
            onClose();
        }
    };

    if (!isOpen || !selectedList) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-surface-dark w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-text-main dark:text-white">Detalhes da Lista de Compras</h3>
                    <button
                        onClick={onClose}
                        className="text-text-muted hover:text-text-main transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="p-6">
                    <p className="font-bold text-text-main dark:text-white text-lg mb-4">{selectedList.name}</p>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {selectedList.items.map((item, idx) => {
                            const invItem = inventory.find(i => i.id === item.inventoryItemId);
                            return (
                                <div key={idx} className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                    <div className="flex-1">
                                        <p className="font-medium text-text-main dark:text-white">{invItem?.name || 'Item Removido'}</p>
                                        <p className="text-sm text-text-muted">Qtd Solicitada: {item.quantity} {invItem?.unit}</p>
                                    </div>
                                    {selectedList.status !== 'completed' && (
                                        <div className="flex-1 space-y-2">
                                            <input
                                                type="number"
                                                placeholder="Preço Unitário (R$)"
                                                className="w-full px-3 py-2 text-sm bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Fornecedor"
                                                className="w-full px-3 py-2 text-sm bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="pt-6 flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 mt-6">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-text-main dark:text-white rounded-lg transition-colors font-medium border border-gray-200 dark:border-gray-700"
                        >
                            Fechar
                        </button>
                        {selectedList.status !== 'completed' && (
                            <button
                                onClick={handleFulfillList}
                                className="px-4 py-2 bg-success text-white rounded-lg hover:bg-success/90 transition-colors font-medium flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                Concluir Compra
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
