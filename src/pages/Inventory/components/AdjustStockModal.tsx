import React, { useState } from 'react';
import { useAppStore } from '../../../store';
import { InventoryItem } from '../../../types';

interface AdjustStockModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedItem: InventoryItem | null;
}

export function AdjustStockModal({ isOpen, onClose, selectedItem }: AdjustStockModalProps) {
    const { updateInventoryQuantity } = useAppStore();
    const [adjustAmount, setAdjustAmount] = useState<number>(0);

    const handleAdjustStock = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedItem) {
            await updateInventoryQuantity(selectedItem.id, selectedItem.quantity + adjustAmount);
            onClose();
            setAdjustAmount(0);
        }
    };

    if (!isOpen || !selectedItem) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-surface-dark w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-text-main dark:text-white">Ajustar Estoque</h3>
                    <button
                        onClick={onClose}
                        className="text-text-muted hover:text-text-main transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form onSubmit={handleAdjustStock} className="p-6 space-y-4">
                    <div className="bg-surface-light dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-text-muted">ItemSelecionado</p>
                        <p className="font-bold text-text-main dark:text-white text-lg">{selectedItem.name}</p>
                        <div className="flex justify-between mt-2 text-sm">
                            <span>Qtd Atual: <strong>{selectedItem.quantity} {selectedItem.unit}</strong></span>
                            <span>Mínimo: {selectedItem.minQuantity} {selectedItem.unit}</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-main dark:text-white mb-1">
                            Ajuste (+ para entrada, - para saída)
                        </label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="number"
                                required
                                value={adjustAmount || ''}
                                onChange={(e) => setAdjustAmount(Number(e.target.value))}
                                className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-text-main dark:text-white"
                            />
                            <span className="text-text-muted text-sm shrink-0">{selectedItem.unit}</span>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-text-main dark:text-white rounded-lg transition-colors font-medium border border-gray-200 dark:border-gray-700"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                        >
                            Confirmar Ajuste
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
