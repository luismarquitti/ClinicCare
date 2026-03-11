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
        <div className="flex flex-col md:flex-row flex-wrap gap-6 mb-10 py-6 border-y-2 border-gray-200 dark:border-gray-800 items-start md:items-end">
            <div className="flex items-center gap-2 font-black text-text-main dark:text-white mr-4 tracking-tighter uppercase text-sm">
                Filtros
            </div>

            <div className="flex flex-col flex-1 min-w-[120px]">
                <label htmlFor="filter-type" className="text-xs font-bold tracking-widest text-text-muted uppercase mb-2">Tipo</label>
                <select
                    id="filter-type"
                    value={filters.type}
                    onChange={e => setFilters({ type: e.target.value as any })}
                    className="border-b-2 border-gray-200 dark:border-gray-700 bg-transparent rounded-none px-0 py-2 text-sm font-medium outline-none focus:border-text-main dark:focus:border-white transition-colors appearance-none cursor-pointer"
                >
                    <option value="ALL">Todos os Tipos</option>
                    <option value="INCOME">Receitas</option>
                    <option value="EXPENSE">Despesas</option>
                </select>
            </div>

            <div className="flex flex-col flex-1 min-w-[150px]">
                <label htmlFor="filter-category" className="text-xs font-bold tracking-widest text-text-muted uppercase mb-2">Categoria</label>
                <select
                    id="filter-category"
                    value={filters.categoryId}
                    onChange={e => setFilters({ categoryId: e.target.value })}
                    className="border-b-2 border-gray-200 dark:border-gray-700 bg-transparent rounded-none px-0 py-2 text-sm font-medium outline-none focus:border-text-main dark:focus:border-white transition-colors appearance-none cursor-pointer"
                >
                    <option value="ALL">Todas as Categorias</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>

            <div className="flex flex-col flex-1 min-w-[150px]">
                <label htmlFor="filter-status" className="text-xs font-bold tracking-widest text-text-muted uppercase mb-2">Status</label>
                <select
                    id="filter-status"
                    value={filters.status}
                    onChange={e => setFilters({ status: e.target.value as any })}
                    className="border-b-2 border-gray-200 dark:border-gray-700 bg-transparent rounded-none px-0 py-2 text-sm font-medium outline-none focus:border-text-main dark:focus:border-white transition-colors appearance-none cursor-pointer"
                >
                    <option value="ALL">Qualquer Status</option>
                    <option value="PAID">Pago / Recebido</option>
                    <option value="PENDING">Pendente</option>
                    <option value="OVERDUE">Atrasado</option>
                </select>
            </div>

            <div className="flex gap-4">
                <div className="flex flex-col">
                    <label htmlFor="filter-start" className="text-xs font-bold tracking-widest text-text-muted uppercase mb-2">Início</label>
                    <input
                        id="filter-start"
                        type="date"
                        value={startStr}
                        onChange={e => handleDateChange('start', e.target.value)}
                        className="border-b-2 border-gray-200 dark:border-gray-700 bg-transparent rounded-none px-0 py-2 text-sm font-medium outline-none focus:border-text-main dark:focus:border-white transition-colors cursor-pointer"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="filter-end" className="text-xs font-bold tracking-widest text-text-muted uppercase mb-2">Fim</label>
                    <input
                        id="filter-end"
                        type="date"
                        value={endStr}
                        onChange={e => handleDateChange('end', e.target.value)}
                        className="border-b-2 border-gray-200 dark:border-gray-700 bg-transparent rounded-none px-0 py-2 text-sm font-medium outline-none focus:border-text-main dark:focus:border-white transition-colors cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
}
