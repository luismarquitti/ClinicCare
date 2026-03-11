import React from 'react';
import { Link } from 'react-router-dom';
import { useDashboardStore } from '../../../store/useDashboardStore';
import { styles } from './styles';

export function OccupancyCard() {
  const { stats, loading } = useDashboardStore();
  const { totalResidents, totalBeds } = stats.occupancy;
  const availableBeds = totalBeds - totalResidents;

  if (loading) {
    return (
      <div className={styles.skeleton}>
        <div className={styles.skeletonLabel}></div>
        <div className={styles.skeletonValue}></div>
        <div className={styles.skeletonFooter}></div>
      </div>
    );
  }

  return (
    <Link 
      to="/residents"
      className={styles.container}
    >
      <h3 className={styles.label}>
        Ocupação
      </h3>
      
      <div className={styles.valueWrapper}>
        <span className={styles.value}>
          {totalResidents}
        </span>
        <span className={styles.valueLabel}>
          Residentes Ativos
        </span>
      </div>

      <div className={styles.footer}>
        <span className={styles.footerText}>
          {availableBeds} Leitos Disponíveis
        </span>
        <span className={styles.icon}>
          arrow_forward
        </span>
      </div>
    </Link>
  );
}
