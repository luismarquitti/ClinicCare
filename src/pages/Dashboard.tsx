import React from 'react';

export function Dashboard() {
  return (
    <div className="w-full max-w-[1440px] mx-auto pb-24 md:pb-8 relative min-h-screen slide-in p-6">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-text-main dark:text-white tracking-tighter uppercase">
          Painel de Controle
        </h1>
        <p className="text-sm font-medium tracking-wide text-text-muted dark:text-gray-400 mt-2 uppercase">
          Visão Geral da Instituição
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="p-6 border-2 border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold uppercase tracking-tight mb-4">Ocupação</h2>
          <div className="h-32 bg-gray-50 dark:bg-surface-dark flex items-center justify-center">
            <span className="text-text-muted uppercase text-xs font-bold tracking-widest">Métricas em breve</span>
          </div>
        </section>

        <section className="p-6 border-2 border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold uppercase tracking-tight mb-4">Financeiro</h2>
          <div className="h-32 bg-gray-50 dark:bg-surface-dark flex items-center justify-center">
            <span className="text-text-muted uppercase text-xs font-bold tracking-widest">Métricas em breve</span>
          </div>
        </section>
      </div>
    </div>
  );
}
