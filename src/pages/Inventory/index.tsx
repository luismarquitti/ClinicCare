import React, { useState } from 'react';
import { AddItemModal } from './components/AddItemModal';
import { StockTab } from './tabs/StockTab';
import { ShoppingListsTab } from './tabs/ShoppingListsTab';
import { PriceHistoryTab } from './tabs/PriceHistoryTab';

export function Inventory() {
    const [activeTab, setActiveTab] = useState<'estoque' | 'compras' | 'historico'>('estoque');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
                {activeTab === 'estoque' && <StockTab />}
                {activeTab === 'compras' && <ShoppingListsTab />}
                {activeTab === 'historico' && <PriceHistoryTab />}
            </div>

            <AddItemModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
        </div>
    );
}
