import { ReactNode, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import {
  Users,
  Activity,
  Pill,
  DollarSign,
  Wrench,
  LogOut,
  LayoutDashboard,
  BookOpen,
  Menu,
  X,
  Package,
  BadgePercent,
  Sun,
  Moon
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, logout, theme, toggleTheme } = useAppStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['admin', 'saude', 'financeiro', 'manutencao'] },
    { to: '/residents', icon: Users, label: 'Residentes', roles: ['admin', 'saude'] },
    { to: '/nursing', icon: Pill, label: 'Enfermagem', roles: ['admin', 'saude'] },
    { to: '/financial', icon: DollarSign, label: 'Financeiro', roles: ['admin', 'financeiro'] },
    { to: '/inventory', icon: Package, label: 'Estoque', roles: ['admin', 'financeiro', 'saude', 'manutencao'] },
    { to: '/maintenance', icon: Wrench, label: 'Manutenção', roles: ['admin', 'manutencao'] },
    { to: '/hr', icon: BadgePercent, label: 'Recursos Humanos', roles: ['admin', 'rh'] },
    { to: '/docs', icon: BookOpen, label: 'Documentação', roles: ['admin', 'saude', 'financeiro', 'manutencao', 'rh'] },
  ];

  const allowedNavItems = navItems.filter(item => user?.role && item.roles.includes(user.role));

  const SidebarContent = () => (
    <>
      <div className="p-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
            <span className="material-symbols-outlined text-[20px]">local_hospital</span>
          </div>
          Vitalis Care
        </h1>
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={24} />
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-[-1rem] mb-4 ml-16">Gestão Inteligente</p>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {allowedNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium",
                isActive
                  ? "bg-primary/20 text-primary"
                  : "hover:bg-gray-800 hover:text-white"
              )
            }
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800 mt-auto">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-sm font-medium text-white">
            {user?.displayName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.displayName}</p>
            <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          Sair
        </button>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 w-full px-3 py-2 mt-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark font-display overflow-hidden">

      {/* Mobile Top Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-surface-dark border-b border-gray-800 z-30 flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
            <span className="material-symbols-outlined text-[20px]">local_hospital</span>
          </div>
          <span className="font-bold text-lg">Vitalis</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="text-gray-300 hover:text-white p-2"
          >
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-gray-300 hover:text-white p-2"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Responsive Container */}
      <aside
        className={cn(
          "fixed md:static inset-y-0 left-0 z-50 w-64 bg-surface-dark text-gray-300 flex flex-col border-r border-gray-800 transform transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pt-16 md:pt-0">
        <div className="p-4 md:p-8 max-w-7xl mx-auto h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
