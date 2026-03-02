import React, { useState } from 'react';
import { useAppStore } from '../store';
import { InventoryItem, ShoppingList, PriceHistory } from '../types';

export function Inventory() {
    const { inventory, shoppingLists, priceHistories, addInventoryItem, updateInventoryQuantity } = useAppStore();
    const [activeTab, setActiveTab] = useState<'estoque' | 'compras' | 'historico'>('estoque');

    const medications = inventory.filter(i => i.category === 'medication');
    const supplies = inventory.filter(i => i.category === 'supply');
    const kitchen = inventory.filter(i => i.category === 'kitchen');

    const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);

    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
    const [adjustAmount, setAdjustAmount] = useState<number>(0);

    const [selectedList, setSelectedList] = useState<ShoppingList | null>(null);
    const [isFulfillModalOpen, setIsFulfillModalOpen] = useState(false);

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
            setIsAddModalOpen(false);
            setNewItem({
                name: '',
                category: 'medication',
                quantity: 0,
                minQuantity: 0,
                unit: 'un'
            });
        }
    };

    const handleAdjustStock = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedItem) {
            await updateInventoryQuantity(selectedItem.id, selectedItem.quantity + adjustAmount);
            setIsAdjustModalOpen(false);
            setSelectedItem(null);
            setAdjustAmount(0);
        }
    };

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

    const handleFulfillList = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here we would ideally loop through fulfill items and call logic
        // For now, let's just mark it closed. (Full implementation can be expanded)
        if (selectedList) {
            alert('Funcionalidade de concluir compra enviará dados ao Firebase e atualizará estoque.');
            setIsFulfillModalOpen(false);
        }
    };

    const getStatusColor = (current: number, min: number) => {
        if (current <= 0) return 'bg-danger/10 text-danger border-danger/20';
        if (current <= min) return 'bg-warning/10 text-warning border-warning/20';
        return 'bg-success/10 text-success border-success/20';
    };

    const getStatusText = (current: number, min: number) => {
        if (current <= 0) return 'Sem Estoque';
        if (current <= min) return 'Nível Crítico';
        return 'Adequado';
    };

    return (
        <div className="w-full max-w-[1440px] mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-text-main dark:text-white tracking-tight">Estoque & Compras</h1>
                    <p className="text-text-muted dark:text-gray-400 mt-1">Gerenciamento de inventário e listas de abastecimento</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-medium hover:bg-primary/90 transition-shadow shadow-md hover:shadow-lg active:scale-95"
                >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    Novo Item
                </button>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav aria-label="Tabs" className="flex space-x-8 overflow-x-auto custom-scrollbar">
                    <button
                        onClick={() => setActiveTab('estoque')}
                        className={`py-4 px-1 whitespace-nowrap inline-flex items-center text-sm font-bold border-b-[3px] transition-all ${activeTab === 'estoque' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-main hover:border-gray-300'}`}
                    >
                        <span className="material-symbols-outlined mr-2 text-[20px]">inventory_2</span>
                        Estoque Atual
                    </button>
                    <button
                        onClick={() => setActiveTab('compras')}
                        className={`py-4 px-1 whitespace-nowrap inline-flex items-center text-sm font-bold border-b-[3px] transition-all ${activeTab === 'compras' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-main hover:border-gray-300'}`}
                    >
                        <span className="material-symbols-outlined mr-2 text-[20px]">shopping_cart</span>
                        Listas de Compras
                    </button>
                    <button
                        onClick={() => setActiveTab('historico')}
                        className={`py-4 px-1 whitespace-nowrap inline-flex items-center text-sm font-bold border-b-[3px] transition-all ${activeTab === 'historico' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-main hover:border-gray-300'}`}
                    >
                        <span className="material-symbols-outlined mr-2 text-[20px]">price_change</span>
                        Histórico de Preços
                    </button>
                </nav>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                {activeTab === 'estoque' && (
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
                    </div>
                )}

                {activeTab === 'compras' && (
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
                    </div>
                )}

                {activeTab === 'historico' && (
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
                )}
            </div>

            {/* Adjust Stock Modal */}
            {isAdjustModalOpen && selectedItem && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-surface-dark w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-text-main dark:text-white">Ajustar Estoque</h3>
                            <button
                                onClick={() => setIsAdjustModalOpen(false)}
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
                                    onClick={() => setIsAdjustModalOpen(false)}
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
            )}

            {/* Add Item Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-surface-dark w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-text-main dark:text-white">Adicionar Novo Item</h3>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
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
                                    onClick={() => setIsAddModalOpen(false)}
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
            )}

            {/* Fulfill Purchase Modal Mockup */}
            {isFulfillModalOpen && selectedList && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-surface-dark w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-text-main dark:text-white">Detalhes da Lista de Compras</h3>
                            <button
                                onClick={() => setIsFulfillModalOpen(false)}
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
                                    onClick={() => setIsFulfillModalOpen(false)}
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
            )}
        </div>
    );
}
