import React, { useState } from 'react';
import { useAppStore } from '../../../store';
import { InventoryItem } from '../../../types';

interface AddItemModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddItemModal({ isOpen, onClose }: AddItemModalProps) {
    const { addInventoryItem } = useAppStore();
    const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
        name: '',
        category: 'medication',
        quantity: 0,
        minQuantity: 0,
        unit: 'un'
    });

    const handleAddItem = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newItem.name && newItem.unit) {
            await addInventoryItem(newItem as Omit<InventoryItem, 'id'>);
            onClose();
            setNewItem({
                name: '',
                category: 'medication',
                quantity: 0,
                minQuantity: 0,
                unit: 'un'
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-surface-dark w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-text-main dark:text-white">Adicionar Novo Item</h3>
                    <button
                        onClick={onClose}
                        className="text-text-muted hover:text-text-main transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form onSubmit={handleAddItem} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text-main dark:text-white mb-1">Nome do Item</label>
                        <input
                            type="text"
                            required
                            placeholder="Ex: Paracetamol 500mg"
                            value={newItem.name}
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                            className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-text-main dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-main dark:text-white mb-1">Categoria</label>
                        <select
                            value={newItem.category}
                            onChange={(e) => setNewItem({ ...newItem, category: e.target.value as InventoryItem['category'] })}
                            className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-text-main dark:text-white capitalize"
                        >
                            <option value="medication">Medicamentos</option>
                            <option value="supply">Insumos/Enfermagem</option>
                            <option value="kitchen">Cozinha/Limpeza</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-text-main dark:text-white mb-1">Estoque Inicial</label>
                            <input
                                type="number"
                                required
                                min="0"
                                value={newItem.quantity === 0 ? '' : newItem.quantity}
                                onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                                className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-text-main dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-main dark:text-white mb-1">Estoque Mínimo</label>
                            <input
                                type="number"
                                required
                                min="0"
                                value={newItem.minQuantity === 0 ? '' : newItem.minQuantity}
                                onChange={(e) => setNewItem({ ...newItem, minQuantity: Number(e.target.value) })}
                                className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-text-main dark:text-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-main dark:text-white mb-1">Unidade de Medida</label>
                        <input
                            type="text"
                            required
                            placeholder="Ex: cx, un, frasco, kg"
                            value={newItem.unit}
                            onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                            className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-text-main dark:text-white"
                        />
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
                            Salvar Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
