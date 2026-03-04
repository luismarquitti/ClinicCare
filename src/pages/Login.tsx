import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { Mail, Lock, AlertCircle, Info } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const login = useAppStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      if (email && password) {
        await login(email, password);
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Falha na autenticação. Verifique seu email e senha.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col md:flex-row font-display">
      {/* Left Column: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-12 relative z-10 bg-surface-light dark:bg-surface-dark shadow-[4px_0_24px_rgba(0,0,0,0.05)] md:min-h-screen">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6 text-primary shadow-sm border border-primary/20">
              <span className="material-symbols-outlined text-[40px]">local_hospital</span>
            </div>
            <h1 className="text-3xl font-bold text-text-main dark:text-white mb-2">ClinicCare</h1>
            <p className="text-text-sub dark:text-gray-400">Acesso Restrito ao Sistema</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-[#ffdad6] dark:bg-[#93000a] text-[#410002] dark:text-[#ffdad6] p-4 rounded-xl flex items-center gap-3 text-sm font-medium">
                <AlertCircle className="shrink-0" size={20} />
                <span>{error}</span>
              </div>
            )}

            {/* Email Field - MD3 Filled style */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-11 pr-4 pt-6 pb-2 bg-gray-100 dark:bg-gray-800 border-b-2 border-gray-400 dark:border-gray-600 rounded-t-xl text-text-main dark:text-white focus:outline-none focus:border-primary focus:bg-gray-200 dark:focus:bg-gray-700 transition-colors peer"
                placeholder=" "
                required
              />
              <label 
                htmlFor="email" 
                className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-11 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-primary dark:peer-focus:text-primary cursor-text"
              >
                E-mail Profissional
              </label>
            </div>

            {/* Password Field - MD3 Filled style */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-11 pr-4 pt-6 pb-2 bg-gray-100 dark:bg-gray-800 border-b-2 border-gray-400 dark:border-gray-600 rounded-t-xl text-text-main dark:text-white focus:outline-none focus:border-primary focus:bg-gray-200 dark:focus:bg-gray-700 transition-colors peer"
                placeholder=" "
                required
              />
              <label 
                htmlFor="password" 
                className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-11 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-primary dark:peer-focus:text-primary cursor-text"
              >
                Senha Segura
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3.5 px-4 rounded-full transition-all focus:ring-4 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex justify-center items-center h-12"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Acessar Prontuário'
                )}
              </button>
            </div>
            
            <div className="text-center mt-6">
               <a href="#" className="text-sm font-medium text-primary hover:underline hover:text-primary/80 transition-colors">
                 Esqueceu sua senha?
               </a>
            </div>
          </form>
        </div>
      </div>

      {/* Right Column: Quadro de Avisos / Onboarding (Desktop Only) */}
      <div className="hidden md:flex md:w-1/2 bg-[#d8e2ff] dark:bg-[#001a41] p-12 flex-col justify-center relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        
        <div className="max-w-lg mx-auto relative z-10">
          <div className="bg-white/60 dark:bg-black/20 backdrop-blur-md border border-white/40 dark:border-white/10 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/20 dark:bg-primary/30 rounded-lg text-[#001a41] dark:text-[#d8e2ff]">
                 <Info size={24} />
              </div>
              <h2 className="text-2xl font-semibold text-[#001a41] dark:text-[#d8e2ff]">Quadro de Avisos</h2>
            </div>
            
            <div className="space-y-6">
              <div className="border-l-4 border-secondary pl-4">
                <h3 className="font-semibold text-text-main dark:text-gray-200">Atualização do Sistema (v2.4.0)</h3>
                <p className="text-sm text-text-sub dark:text-gray-400 mt-1">O módulo de faturamento foi atualizado. Para dúvidas, contate o ramal 4455.</p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-text-main dark:text-gray-200">Campanha de Vacinação H1N1</h3>
                <p className="text-sm text-text-sub dark:text-gray-400 mt-1">Colaboradores devem comparecer à sala 102 até o dia 15/03.</p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-300 dark:border-gray-700/50">
                <p className="text-sm text-text-sub dark:text-gray-400 font-medium tracking-wide">
                  Precisa de ajuda com o acesso?
                </p>
                <p className="text-sm text-text-sub dark:text-gray-400 mt-1">
                  Abra um chamado no portal de TI ou ligue para o Suporte 24h (Ramal 1000).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
