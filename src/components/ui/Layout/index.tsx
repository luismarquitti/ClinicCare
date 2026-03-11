import React from 'react';
import { Navbar } from '../Navbar';
import { styles } from './styles';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          ClinicCare © 2026 • Transformando a Gestão de Saúde
        </p>
      </footer>
    </div>
  );
}
