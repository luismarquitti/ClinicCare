import React, { useState } from 'react';
import { useAppStore } from '../../../store';
import { ShoppingList } from '../../../types';
import toast from 'react-hot-toast';

interface FulfillListModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedList: ShoppingList | null;
}

export function FulfillListModal({ isOpen, onClose, selectedList }: FulfillListModalProps) {
    const { inventory, updateInventoryQuantity, updateShoppingListStatus, addPriceHistory } = useAppStore();
    const [fulfillData, setFulfillData] = useState<Record<string, { price?: number; provider?: string }>>({});

    const handleFulfillList = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedList) return;

        try {
            const promises: Promise<void>[] = [];

            // Update inventory quantities and add price histories
            selectedList.items.forEach(item => {
                const invItem = inventory.find(i => i.id === item.inventoryItemId);
                if (invItem) {
                    promises.push(updateInventoryQuantity(invItem.id, invItem.quantity + item.quantity));

                    const itemData = fulfillData[item.inventoryItemId];
                    if (itemData && itemData.price) {
                        promises.push(addPriceHistory({
                            inventoryItemId: item.inventoryItemId,
                            date: new Date().toISOString(),
                            price: itemData.price,
                            provider: itemData.provider
                        }));
                    }
                }
            });

            // Mark list as completed
            promises.push(updateShoppingListStatus(selectedList.id, 'completed'));

            await Promise.all(promises);

            toast.success('Compra concluída com sucesso!');
            onClose();
            setFulfillData({});
        } catch (error) {
            console.error('Error fulfilling list:', error);
            toast.error('Erro ao concluir compra. Tente novamente.');
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
                                                value={fulfillData[item.inventoryItemId]?.price || ''}
                                                onChange={(e) => setFulfillData(prev => ({
                                                    ...prev,
                                                    [item.inventoryItemId]: {
                                                        ...prev[item.inventoryItemId],
                                                        price: Number(e.target.value)
                                                    }
                                                }))}
                                                className="w-full px-3 py-2 text-sm bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Fornecedor"
                                                value={fulfillData[item.inventoryItemId]?.provider || ''}
                                                onChange={(e) => setFulfillData(prev => ({
                                                    ...prev,
                                                    [item.inventoryItemId]: {
                                                        ...prev[item.inventoryItemId],
                                                        provider: e.target.value
                                                    }
                                                }))}
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
