import React, { useState } from 'react';
import { useAppStore } from '../../../store';
import { InventoryItem } from '../../../types';
import { getStatusColor } from '../../../lib/utils';
import { AdjustStockModal } from '../components/AdjustStockModal';

export function StockTab() {
    const { inventory } = useAppStore();
    const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

    const getStatusText = (current: number, min: number) => {
        if (current <= 0) return 'Sem Estoque';
        if (current <= min) return 'Nível Crítico';
        return 'Adequado';
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Buscar item..."
                        className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-background-light dark:bg-background-dark text-text-main dark:text-white outline-none focus:ring-2 focus:ring-primary/20 w-64"
                    />
                    <select className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-background-light dark:bg-background-dark text-text-main dark:text-white outline-none focus:ring-2 focus:ring-primary/20 capitalize">
                        <option value="all">Todas as Categorias</option>
                        <option value="medication">Medicamentos</option>
                        <option value="supply">Insumos/Enfermagem</option>
                        <option value="kitchen">Cozinha/Limpeza</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-surface-light border-y border-gray-200 dark:bg-surface-dark/50 dark:border-gray-700 text-sm font-semibold text-text-muted">
                            <th className="py-3 px-4">Nome do Item</th>
                            <th className="py-3 px-4">Categoria</th>
                            <th className="py-3 px-4 text-center">Qtd Atual</th>
                            <th className="py-3 px-4 text-center">Qtd Mínima</th>
                            <th className="py-3 px-4 text-center">Status</th>
                            <th className="py-3 px-4 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {inventory.map(item => (
                            <tr key={item.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors">
                                <td className="py-3 px-4 font-medium text-text-main dark:text-white">{item.name}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${item.category === 'medication' ? 'bg-blue-100 text-blue-800' : item.category === 'kitchen' ? 'bg-orange-100 text-orange-800' : 'bg-purple-100 text-purple-800'}`}>
                                        {item.category === 'medication' ? 'Medicamento' : item.category === 'kitchen' ? 'Cozinha/Limpeza' : 'Insumo'}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-center font-bold text-text-main dark:text-white">
                                    {item.quantity} <span className="text-xs font-normal text-text-muted">{item.unit}</span>
                                </td>
                                <td className="py-3 px-4 text-center text-text-muted">
                                    {item.minQuantity} {item.unit}
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <span className={`px-2 py-1 border rounded-full text-xs font-bold inline-block text-center w-full max-w-[100px] ${getStatusColor(item.quantity, item.minQuantity)}`}>
                                        {getStatusText(item.quantity, item.minQuantity)}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <button
                                        onClick={() => {
                                            setSelectedItem(item);
                                            setIsAdjustModalOpen(true);
                                        }}
                                        className="px-3 py-1 bg-surface-light dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-text-main dark:text-white rounded-md text-xs font-medium transition-colors border border-gray-200 dark:border-gray-700"
                                    >
                                        Ajustar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {inventory.length === 0 && (
                            <tr>
                                <td colSpan={6} className="py-8 text-center text-text-muted">Nenhum item em estoque.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <AdjustStockModal
                isOpen={isAdjustModalOpen}
                onClose={() => {
                    setIsAdjustModalOpen(false);
                    setSelectedItem(null);
                }}
                selectedItem={selectedItem}
            />
        </div>
    );
}
