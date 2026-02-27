import { ReactNode } from 'react';
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
  BookOpen
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
  const { user, logout } = useAppStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['admin', 'saude', 'financeiro', 'manutencao'] },
    { to: '/residents', icon: Users, label: 'Residentes', roles: ['admin', 'saude'] },
    { to: '/nursing', icon: Pill, label: 'Enfermagem', roles: ['admin', 'saude'] },
    { to: '/financial', icon: DollarSign, label: 'Financeiro', roles: ['admin', 'financeiro'] },
    { to: '/maintenance', icon: Wrench, label: 'Manutenção', roles: ['admin', 'manutencao'] },
    { to: '/docs', icon: BookOpen, label: 'Documentação', roles: ['admin', 'saude', 'financeiro', 'manutencao'] },
  ];

  const allowedNavItems = navItems.filter(item => user?.role && item.roles.includes(user.role));

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark font-display">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-dark text-gray-300 flex flex-col border-r border-gray-800">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
              <span className="material-symbols-outlined text-[20px]">local_hospital</span>
            </div>
            Vitalis Care
          </h1>
          <p className="text-xs text-gray-400 mt-1 ml-10">Gestão Inteligente</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {allowedNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
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

        <div className="p-4 border-t border-gray-800">
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
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
