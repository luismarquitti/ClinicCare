import React from 'react';
import { Link } from 'react-router-dom';
import { styles } from './styles';

export function QuickActions() {
  const actions = [
    { label: 'Nova Admissão', path: '/residents/new', icon: 'person_add', color: 'bg-text-main dark:bg-white text-white dark:text-text-main' },
    { label: 'Novo Lançamento', path: '/financial', icon: 'add_card', color: 'border-2 border-text-main dark:border-white text-text-main dark:text-white' },
    { label: 'Registrar Evolução', path: '/nursing', icon: 'edit_note', color: 'border-2 border-gray-200 dark:border-gray-800 text-text-muted hover:border-text-main dark:hover:border-white transition-colors' },
    { label: 'Abrir Chamado', path: '/maintenance', icon: 'build', color: 'border-2 border-gray-200 dark:border-gray-800 text-text-muted hover:border-text-main dark:hover:border-white transition-colors' },
  ];

  return (
    <div className={styles.grid}>
      {actions.map((action) => (
        <Link
          key={action.path}
          to={action.path}
          aria-label={action.label}
          className={styles.actionLink(action.color)}
        >
          <span className={styles.icon}>
            {action.icon}
          </span>
          <span className={styles.label}>
            {action.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
