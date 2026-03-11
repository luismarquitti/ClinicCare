import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppStore } from '../../../store';
import { styles } from './styles';

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
    <nav className={styles.nav}>
      <div className={styles.leftSection}>
        <Link to="/" className={styles.logoLink}>
          <div className={styles.logoIconWrapper}>
            <span className={styles.logoIcon}>
              health_metrics
            </span>
          </div>
          <span className={styles.logoText}>
            ClinicCare
          </span>
        </Link>

        <div className={styles.desktopMenu}>
          {filteredItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={styles.navLink(location.pathname === item.path)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.rightSection}>
        <button
          onClick={toggleTheme}
          className={styles.themeButton}
        >
          <span className="material-symbols-outlined">
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        {user && (
          <div className={styles.userWrapper}>
            <div className={styles.userDetails}>
              <p className={styles.userName}>
                {user.displayName}
              </p>
              <p className={styles.userRole}>
                {user.role}
              </p>
            </div>
            <div className={styles.userAvatar}>
              <span className={styles.avatarIcon}>person</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
