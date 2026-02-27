import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-main antialiased min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-surface-light bg-background-light/95 backdrop-blur dark:bg-background-dark/95 dark:border-surface-dark">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-[28px]">local_hospital</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-text-main dark:text-white">Vitalis Care</h2>
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="flex h-10 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span className="mr-2 material-symbols-outlined text-[20px]">login</span>
            Login
          </button>
        </div>
      </header>

      <main className="flex-grow">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center py-12">
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Portal do Colaborador
                </div>
                <h1 className="text-4xl font-black tracking-tight text-text-main dark:text-white sm:text-5xl lg:text-6xl">
                  Bem-vindo ao <span className="text-primary">Sistema Vitalis</span>
                </h1>
                <p className="max-w-xl text-lg text-text-sub dark:text-gray-300">
                  A plataforma centralizada para gestão de cuidados, equipe médica e administração da nossa clínica. Simplifique sua rotina diária.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => navigate('/login')}
                  className="flex h-12 min-w-[160px] items-center justify-center rounded-full bg-primary px-6 text-base font-semibold text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow-hover"
                >
                  Acessar Sistema
                </button>
                <button className="flex h-12 min-w-[160px] items-center justify-center rounded-full border border-gray-300 bg-white px-6 text-base font-semibold text-text-main shadow-sm transition-all hover:bg-gray-50 hover:border-gray-400 dark:bg-surface-dark dark:border-gray-700 dark:text-white dark:hover:bg-gray-800">
                  Primeiro Acesso
                </button>
              </div>
            </div>
            <div className="relative h-full min-h-[300px] w-full lg:h-[480px]">
              <div 
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl bg-cover bg-center" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDYyu4iw-t_qK-d0vCrXGrBC_ar643CPXnhTR-8VP8NvNJaUATn7uQ9hmllQmk_lqrjivN95MalgSaWGeOwjXJvI5g9SnXJj6DaqFrD1F3ZMYPLHeLnab28K6MPWuWVE-x3YgbtnEPurR5JS6zdKwihi9Z-CAqpiawkFgqgyuKXMKaAF34Po0ydT_BzXyPyO6xL1WiPUcIN-pqU9zF3C4kyj5KDDeVvnVWPX2sUla2L5Rj65QH1T6bm_JVBsln1WyvePZuO2AhY-WQt')" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent mix-blend-multiply"></div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="py-16">
            <div className="mb-10">
              <h2 className="text-3xl font-bold tracking-tight text-text-main dark:text-white">Áreas do Sistema</h2>
              <p className="mt-2 text-text-sub dark:text-gray-400">Acesso rápido aos módulos principais da clínica.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Card 1 */}
              <div className="group relative flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-card transition-all hover:border-primary/50 hover:shadow-hover dark:border-gray-700 dark:bg-surface-dark">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-primary dark:bg-primary/20">
                  <span className="material-symbols-outlined text-[28px]">medical_services</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-main dark:text-white">Equipe de Saúde</h3>
                  <p className="mt-1 text-sm text-text-sub dark:text-gray-400">Gestão de pacientes e consultas médicas.</p>
                </div>
              </div>
              {/* Card 2 */}
              <div className="group relative flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-card transition-all hover:border-primary/50 hover:shadow-hover dark:border-gray-700 dark:bg-surface-dark">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                  <span className="material-symbols-outlined text-[28px]">medication</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-main dark:text-white">Enfermagem</h3>
                  <p className="mt-1 text-sm text-text-sub dark:text-gray-400">Registros, triagem e rotinas de cuidado.</p>
                </div>
              </div>
              {/* Card 3 */}
              <div className="group relative flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-card transition-all hover:border-primary/50 hover:shadow-hover dark:border-gray-700 dark:bg-surface-dark">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                  <span className="material-symbols-outlined text-[28px]">groups</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-main dark:text-white">Administração &amp; RH</h3>
                  <p className="mt-1 text-sm text-text-sub dark:text-gray-400">Gestão de pessoal, escalas e políticas.</p>
                </div>
              </div>
              {/* Card 4 */}
              <div className="group relative flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-card transition-all hover:border-primary/50 hover:shadow-hover dark:border-gray-700 dark:bg-surface-dark">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  <span className="material-symbols-outlined text-[28px]">payments</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-main dark:text-white">Financeiro</h3>
                  <p className="mt-1 text-sm text-text-sub dark:text-gray-400">Controle de fluxo, compras e faturamento.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stepper / Quick Guide */}
          <div className="rounded-2xl bg-surface-light p-8 dark:bg-surface-dark mt-8 mb-16">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="lg:w-1/4">
                <h2 className="text-2xl font-bold text-text-main dark:text-white">Guia de Acesso</h2>
                <p className="text-text-sub dark:text-gray-400 mt-2">Siga os passos para configurar sua conta.</p>
              </div>
              
              <div className="flex-1 lg:ml-12">
                <div className="relative flex items-center justify-between w-full">
                  <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-300 dark:bg-gray-700 lg:w-[95%]"></div>
                  
                  {/* Step 1 */}
                  <div className="relative z-10 flex flex-col items-center gap-3 bg-surface-light px-2 dark:bg-surface-dark">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-md ring-4 ring-surface-light dark:ring-surface-dark">
                      <span className="material-symbols-outlined text-[24px]">person_add</span>
                    </div>
                    <div className="text-center w-32">
                      <p className="text-sm font-bold text-text-main dark:text-white">Solicitar Acesso</p>
                      <p className="text-xs text-text-sub dark:text-gray-400">Passo 1</p>
                    </div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="relative z-10 flex flex-col items-center gap-3 bg-surface-light px-2 dark:bg-surface-dark">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-text-sub border-2 border-gray-300 shadow-sm ring-4 ring-surface-light dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:ring-surface-dark">
                      <span className="material-symbols-outlined text-[24px]">lock_reset</span>
                    </div>
                    <div className="text-center w-32">
                      <p className="text-sm font-medium text-text-main dark:text-gray-300">Configurar Senha</p>
                      <p className="text-xs text-text-sub dark:text-gray-500">Passo 2</p>
                    </div>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="relative z-10 flex flex-col items-center gap-3 bg-surface-light px-2 dark:bg-surface-dark">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-text-sub border-2 border-gray-300 shadow-sm ring-4 ring-surface-light dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:ring-surface-dark">
                      <span className="material-symbols-outlined text-[24px]">dashboard</span>
                    </div>
                    <div className="text-center w-32">
                      <p className="text-sm font-medium text-text-main dark:text-gray-300">Acessar Painel</p>
                      <p className="text-xs text-text-sub dark:text-gray-500">Passo 3</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-background-dark">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-text-main dark:text-white opacity-80">
            <span className="material-symbols-outlined text-[24px]">local_hospital</span>
            <span className="text-lg font-bold">Vitalis Care</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-text-sub dark:text-gray-400">
            <a className="hover:text-primary dark:hover:text-primary transition-colors" href="#">Suporte de TI</a>
            <a className="hover:text-primary dark:hover:text-primary transition-colors" href="#">Políticas Internas</a>
            <a className="hover:text-primary dark:hover:text-primary transition-colors" href="#">Diretrizes de Privacidade</a>
            <button onClick={() => navigate('/docs')} className="hover:text-primary dark:hover:text-primary transition-colors">Manual do Sistema</button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-600">
            © 2024 Vitalis Senior Clinic. Uso interno exclusivo. Acesso restrito a colaboradores autorizados.
          </p>
        </div>
      </footer>
    </div>
  );
}
