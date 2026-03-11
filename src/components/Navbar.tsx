import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppStore } from '../store';

export function Navbar() {
  const { user, theme, toggleTheme } = useAppStore();
  const location = useLocation();

  const navItems = [
    { label: 'Painel', path: '/dashboard', icon: 'dashboard', roles: ['all'] },
    { label: 'Residentes', path: '/residents', icon: 'group', roles: ['admin', 'saude'] },
    { label: 'Enfermagem', path: '/nursing', icon: 'medical_services', roles: ['admin', 'saude'] },
    { label: 'Financeiro', path: '/financial', icon: 'payments', roles: ['admin', 'financeiro'] },
    { label: 'Estoque', path: '/inventory', icon: 'inventory_2', roles: ['admin', 'financeiro', 'saude', 'manutencao'] },
    { label: 'Manutenção', path: '/maintenance', icon: 'build', roles: ['admin', 'manutencao'] },
    { label: 'RH', path: '/hr', icon: 'badge', roles: ['admin', 'rh'] },
  ];

  const filteredItems = navItems.filter(item => 
    item.roles.includes('all') || (user && item.roles.includes(user.role))
  );

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b-2 border-gray-200 dark:border-gray-800 z-50 px-6 flex items-center justify-between transition-colors duration-300">
      <div className="flex items-center gap-10">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-text-main dark:bg-white flex items-center justify-center rounded-none transform group-hover:rotate-90 transition-transform duration-500">
            <span className="material-symbols-outlined text-white dark:text-text-main text-[24px]">
              health_metrics
            </span>
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase text-text-main dark:text-white">
            ClinicCare
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {filteredItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border-b-2 ${
                location.pathname === item.path
                  ? 'text-text-main dark:text-white border-text-main dark:border-white'
                  : 'text-text-muted border-transparent hover:text-text-main dark:hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-surface-dark transition-colors"
        >
          <span className="material-symbols-outlined">
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        {user && (
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-800">
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-text-main dark:text-white leading-none">
                {user.displayName}
              </p>
              <p className="text-[9px] font-bold uppercase tracking-widest text-text-muted mt-1 leading-none">
                {user.role}
              </p>
            </div>
            <div className="w-10 h-10 bg-gray-100 dark:bg-surface-dark flex items-center justify-center border-2 border-text-main dark:border-white">
              <span className="material-symbols-outlined text-text-main dark:text-white">person</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
