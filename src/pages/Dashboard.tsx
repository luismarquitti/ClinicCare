import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useDashboardStore } from '../store/useDashboardStore';
import { OccupancyCard } from '../components/dashboard/OccupancyCard';
import { FinancialCard } from '../components/dashboard/FinancialCard';
import { QuickActions } from '../components/dashboard/QuickActions';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Dashboard() {
  const { initializeListeners } = useDashboardStore();

  useEffect(() => {
    const unsub = initializeListeners();
    return () => unsub();
  }, [initializeListeners]);

  return (
    <motion.div 
      className="w-full max-w-[1440px] mx-auto pb-24 md:pb-8 relative min-h-screen p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header className="mb-12" variants={itemVariants}>
        <h1 className="text-5xl font-black text-text-main dark:text-white tracking-tighter uppercase leading-none">
          Painel de Controle
        </h1>
        <div className="flex items-center gap-4 mt-4">
          <span className="h-[2px] w-12 bg-text-main dark:bg-white"></span>
          <p className="text-xs font-black tracking-[0.3em] text-text-muted dark:text-gray-400 uppercase">
            Visão Geral da Instituição
          </p>
        </div>
      </motion.header>

      <div className="space-y-12">
        {/* KPI Section */}
        <motion.section variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <OccupancyCard />
            <FinancialCard />
            
            {/* Placeholder for future Clinical KPI */}
            <div className="p-8 border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center text-center opacity-50">
              <span className="material-symbols-outlined text-text-muted mb-2">analytics</span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Métricas Clínicas em Breve</p>
            </div>
          </div>
        </motion.section>

        {/* Quick Actions Section */}
        <motion.section variants={itemVariants}>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-text-muted mb-6">Ações Rápidas</h2>
          <QuickActions />
        </motion.section>

        {/* Bottom Detailed Section Placeholder */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-gray-100 dark:border-gray-800">
          <div className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-text-muted">Atividade Recente</h2>
            <div className="h-64 border-2 border-gray-50 dark:border-surface-dark flex items-center justify-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted italic">Logs de atividade em breve</span>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-text-muted">Alertas do Sistema</h2>
            <div className="h-64 border-2 border-gray-50 dark:border-surface-dark flex items-center justify-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted italic">Monitor de integridade em breve</span>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
