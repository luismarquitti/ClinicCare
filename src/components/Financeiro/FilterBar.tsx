import React from 'react';
import { useFinancialStore } from '../../store/useFinancialStore';

export function FilterBar() {
    const categories = useFinancialStore(state => state.categories);
    const filters = useFinancialStore(state => state.filters);
    const setFilters = useFinancialStore(state => state.setFilters);

    const startStr = filters.dateRange?.start || '';
    const endStr = filters.dateRange?.end || '';

    const handleDateChange = (type: 'start' | 'end', value: string) => {
        let newStart = startStr;
        let newEnd = endStr;

        if (type === 'start') newStart = value;
        else newEnd = value;

        if (!newStart && !newEnd) {
            setFilters({ dateRange: null });
        } else {
            setFilters({ dateRange: { start: newStart || '1970-01-01', end: newEnd || '2100-01-01' } });
        }
    };

    return (
        <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-6 bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-100 dark:border-gray-700 items-center">
            <div className="flex items-center gap-2 font-medium text-text-main dark:text-white mr-2">
                <span className="material-symbols-outlined text-text-muted">filter_list</span>
                Filtros:
            </div>

            <div className="flex flex-col">
                <label className="text-xs text-text-muted mb-1 ml-1">Tipo</label>
                <select
                    value={filters.type}
                    onChange={e => setFilters({ type: e.target.value as any })}
                    className="border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary dark:bg-surface-dark dark:text-white transition-colors"
                >
                    <option value="ALL">Todos os Tipos</option>
                    <option value="INCOME">Receitas</option>
                    <option value="EXPENSE">Despesas</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label className="text-xs text-text-muted mb-1 ml-1">Categoria</label>
                <select
                    value={filters.categoryId}
                    onChange={e => setFilters({ categoryId: e.target.value })}
                    className="border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary dark:bg-surface-dark dark:text-white transition-colors"
                >
                    <option value="ALL">Todas as Categorias</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>

            <div className="flex flex-col">
                <label className="text-xs text-text-muted mb-1 ml-1">Status</label>
                <select
                    value={filters.status}
                    onChange={e => setFilters({ status: e.target.value as any })}
                    className="border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary dark:bg-surface-dark dark:text-white transition-colors"
                >
                    <option value="ALL">Qualquer Status</option>
                    <option value="PAID">Pago / Recebido</option>
                    <option value="PENDING">Pendente</option>
                    <option value="OVERDUE">Atrasado</option>
                </select>
            </div>

            <div className="flex gap-2">
                <div className="flex flex-col">
                    <label className="text-xs text-text-muted mb-1 ml-1">Data Inicial</label>
                    <input
                        type="date"
                        value={startStr}
                        onChange={e => handleDateChange('start', e.target.value)}
                        className="border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary dark:bg-surface-dark dark:text-white transition-colors"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-xs text-text-muted mb-1 ml-1">Data Final</label>
                    <input
                        type="date"
                        value={endStr}
                        onChange={e => handleDateChange('end', e.target.value)}
                        className="border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary dark:bg-surface-dark dark:text-white transition-colors"
                    />
                </div>
            </div>
        </div>
    );
}
