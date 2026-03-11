import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useDashboardStore } from '../../store/useDashboardStore';
import { OccupancyCard } from '../../components/dashboard/OccupancyCard';
import { FinancialCard } from '../../components/dashboard/FinancialCard';
import { QuickActions } from '../../components/dashboard/QuickActions';
import { styles } from './styles';

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
      className={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header className={styles.header} variants={itemVariants}>
        <h1 className={styles.title}>
          Painel de Controle
        </h1>
        <div className={styles.subtitleWrapper}>
          <span className={styles.subtitleLine}></span>
          <p className={styles.subtitleText}>
            Visão Geral da Instituição
          </p>
        </div>
      </motion.header>

      <div className={styles.section}>
        {/* KPI Section */}
        <motion.section variants={itemVariants}>
          <div className={styles.kpiGrid}>
            <OccupancyCard />
            <FinancialCard />
            
            {/* Placeholder for future Clinical KPI */}
            <div className={styles.placeholderCard}>
              <span className={styles.placeholderIcon}>analytics</span>
              <p className={styles.placeholderText}>Métricas Clínicas em Breve</p>
            </div>
          </div>
        </motion.section>

        {/* Quick Actions Section */}
        <motion.section variants={itemVariants}>
          <h2 className={styles.sectionTitle}>Ações Rápidas</h2>
          <QuickActions />
        </motion.section>

        {/* Bottom Detailed Section Placeholder */}
        <motion.section variants={itemVariants} className={styles.bottomGrid}>
          <div className={styles.widgetWrapper}>
            <h2 className={styles.widgetTitle}>Atividade Recente</h2>
            <div className={styles.widgetContent}>
              <span className={styles.widgetPlaceholder}>Logs de atividade em breve</span>
            </div>
          </div>
          <div className={styles.widgetWrapper}>
            <h2 className={styles.widgetTitle}>Alertas do Sistema</h2>
            <div className={styles.widgetContent}>
              <span className={styles.widgetPlaceholder}>Monitor de integridade em breve</span>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
