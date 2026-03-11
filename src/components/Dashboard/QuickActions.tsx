import React from 'react';
import { Link } from 'react-router-dom';

export function QuickActions() {
  const actions = [
    { label: 'Nova Admissão', path: '/residents/new', icon: 'person_add', color: 'bg-text-main dark:bg-white text-white dark:text-text-main' },
    { label: 'Novo Lançamento', path: '/financial', icon: 'add_card', color: 'border-2 border-text-main dark:border-white text-text-main dark:text-white' },
    { label: 'Registrar Evolução', path: '/nursing', icon: 'edit_note', color: 'border-2 border-gray-200 dark:border-gray-800 text-text-muted hover:border-text-main dark:hover:border-white transition-colors' },
    { label: 'Abrir Chamado', path: '/maintenance', icon: 'build', color: 'border-2 border-gray-200 dark:border-gray-800 text-text-muted hover:border-text-main dark:hover:border-white transition-colors' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action) => (
        <Link
          key={action.path}
          to={action.path}
          aria-label={action.label}
          className={`flex items-center gap-4 p-6 transition-all duration-300 active:scale-95 group ${action.color}`}
        >
          <span className="material-symbols-outlined text-[24px]">
            {action.icon}
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            {action.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
