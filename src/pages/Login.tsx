import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { Role } from '../types';
import { Activity, Lock, Mail } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('admin');
  const login = useAppStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    if (email && password) {
      login(email, role);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4 font-display">
      <div className="max-w-md w-full bg-white dark:bg-surface-dark rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
        <div className="bg-surface-dark p-8 text-center border-b border-gray-800">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 text-primary">
            <span className="material-symbols-outlined text-[32px]">local_hospital</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Vitalis Care</h1>
          <p className="text-gray-400 mt-2">Acesso ao Sistema</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-main dark:text-gray-300 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-transparent text-text-main dark:text-white"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-main dark:text-gray-300 mb-2">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-transparent text-text-main dark:text-white"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-main dark:text-gray-300 mb-2">Simular Perfil (Mock)</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white dark:bg-surface-dark text-text-main dark:text-white"
            >
              <option value="admin">Administrador</option>
              <option value="saude">Saúde (Médico/Enfermeiro)</option>
              <option value="financeiro">Financeiro</option>
              <option value="manutencao">Manutenção</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5 rounded-lg transition-colors shadow-sm"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
