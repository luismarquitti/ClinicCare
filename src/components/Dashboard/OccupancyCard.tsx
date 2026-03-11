import React from 'react';
import { Link } from 'react-router-dom';
import { useDashboardStore } from '../../store/useDashboardStore';

export function OccupancyCard() {
  const { stats, loading } = useDashboardStore();
  const { totalResidents, totalBeds } = stats.occupancy;
  const availableBeds = totalBeds - totalResidents;

  if (loading) {
    return (
      <div className="p-8 border-2 border-gray-100 dark:border-gray-800 animate-pulse">
        <div className="h-4 w-24 bg-gray-200 dark:bg-surface-dark mb-6"></div>
        <div className="h-12 w-16 bg-gray-200 dark:bg-surface-dark mb-4"></div>
        <div className="h-4 w-32 bg-gray-200 dark:bg-surface-dark"></div>
      </div>
    );
  }

  return (
    <Link 
      to="/residents"
      className="group p-8 border-2 border-gray-200 dark:border-gray-800 hover:border-text-main dark:hover:border-white transition-all duration-300 flex flex-col text-left"
    >
      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-6 group-hover:text-text-main dark:group-hover:text-white transition-colors">
        Ocupação
      </h3>
      
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-6xl font-black tracking-tighter text-text-main dark:text-white">
          {totalResidents}
        </span>
        <span className="text-sm font-bold text-text-muted uppercase tracking-widest">
          Residentes Ativos
        </span>
      </div>

      <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
          {availableBeds} Leitos Disponíveis
        </span>
        <span className="material-symbols-outlined text-text-muted group-hover:text-text-main dark:group-hover:text-white transition-colors">
          arrow_forward
        </span>
      </div>
    </Link>
  );
}
