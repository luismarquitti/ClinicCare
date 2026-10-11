import React from 'react';
import { useAppStore } from '../../../store';
import { PriceHistory } from '../../../types';

export function PriceHistoryTab() {
    const { inventory, priceHistories } = useAppStore();

    const getPriceVariation = (historyItem: PriceHistory) => {
        const itemHistories = priceHistories
            .filter(ph => ph.inventoryItemId === historyItem.inventoryItemId)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        const currentIndex = itemHistories.findIndex(ph => ph.id === historyItem.id);
        if (currentIndex <= 0) return null; // No previous price to compare with

        const previousPrice = itemHistories[currentIndex - 1].price;
        const currentPrice = historyItem.price;
        const variation = ((currentPrice - previousPrice) / previousPrice) * 100;

        return variation;
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-text-main dark:text-white">Análise de Variação de Preços</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-surface-light border-y border-gray-200 dark:bg-surface-dark/50 dark:border-gray-700 text-sm font-semibold text-text-muted">
                            <th className="py-3 px-4">Data</th>
                            <th className="py-3 px-4">Item</th>
                            <th className="py-3 px-4 text-right">Preço Pago (Unid)</th>
                            <th className="py-3 px-4">Fornecedor</th>
                            <th className="py-3 px-4 text-center">Variação</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {priceHistories.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(history => {
                            const variation = getPriceVariation(history);
                            const item = inventory.find(i => i.id === history.inventoryItemId);
                            return (
                                <tr key={history.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors">
                                    <td className="py-3 px-4 text-text-muted">{new Date(history.date).toLocaleDateString('pt-BR')}</td>
                                    <td className="py-3 px-4 font-medium text-text-main dark:text-white">{item?.name || 'Item Desconhecido'}</td>
                                    <td className="py-3 px-4 text-right font-medium text-text-main dark:text-white">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(history.price)}
                                    </td>
                                    <td className="py-3 px-4 text-text-muted">{history.provider || '-'}</td>
                                    <td className="py-3 px-4 text-center">
                                        {variation === null ? (
                                            <span className="text-xs text-text-muted">Primeira Compra</span>
                                        ) : (
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${variation > 0 ? 'bg-danger/10 text-danger' : variation < 0 ? 'bg-success/10 text-success' : 'bg-gray-100 text-gray-800'}`}>
                                                {variation > 0 ? <span className="material-symbols-outlined text-[12px]">trending_up</span> : variation < 0 ? <span className="material-symbols-outlined text-[12px]">trending_down</span> : <span className="material-symbols-outlined text-[12px]">flatware</span>}
                                                {Math.abs(variation).toFixed(1)}%
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                        {priceHistories.length === 0 && (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-text-muted">Nenhum histórico de preços registrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
