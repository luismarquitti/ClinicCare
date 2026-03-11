import React from 'react';
import { useFinancialStore } from '../../../store/useFinancialStore';
import { styles } from './styles';

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
        <div className={styles.container}>
            <div className={styles.title}>
                Filtros
            </div>

            <div className={styles.filterGroup}>
                <label htmlFor="filter-type" className={styles.label}>Tipo</label>
                <select
                    id="filter-type"
                    value={filters.type}
                    onChange={e => setFilters({ type: e.target.value as any })}
                    className={styles.select}
                >
                    <option value="ALL">Todos os Tipos</option>
                    <option value="INCOME">Receitas</option>
                    <option value="EXPENSE">Despesas</option>
                </select>
            </div>

            <div className={`${styles.filterGroup} min-w-[150px]`}>
                <label htmlFor="filter-category" className={styles.label}>Categoria</label>
                <select
                    id="filter-category"
                    value={filters.categoryId}
                    onChange={e => setFilters({ categoryId: e.target.value })}
                    className={styles.select}
                >
                    <option value="ALL">Todas as Categorias</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>

            <div className={`${styles.filterGroup} min-w-[150px]`}>
                <label htmlFor="filter-status" className={styles.label}>Status</label>
                <select
                    id="filter-status"
                    value={filters.status}
                    onChange={e => setFilters({ status: e.target.value as any })}
                    className={styles.select}
                >
                    <option value="ALL">Qualquer Status</option>
                    <option value="PAID">Pago / Recebido</option>
                    <option value="PENDING">Pendente</option>
                    <option value="OVERDUE">Atrasado</option>
                </select>
            </div>

            <div className={styles.dateGroupWrapper}>
                <div className={styles.dateGroup}>
                    <label htmlFor="filter-start" className={styles.label}>Início</label>
                    <input
                        id="filter-start"
                        type="date"
                        value={startStr}
                        onChange={e => handleDateChange('start', e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.dateGroup}>
                    <label htmlFor="filter-end" className={styles.label}>Fim</label>
                    <input
                        id="filter-end"
                        type="date"
                        value={endStr}
                        onChange={e => handleDateChange('end', e.target.value)}
                        className={styles.input}
                    />
                </div>
            </div>
        </div>
    );
}
