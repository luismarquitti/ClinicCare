import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Navbar } from './Navbar';

/**
 * Utility to merge tailwind classes with clsx logic.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background dark:bg-background-dark text-text-main dark:text-white flex flex-col font-sans transition-colors duration-300">
      <Navbar />
      <main className="flex-1 w-full pt-20">
        {children}
      </main>
      <footer className="py-10 border-t border-gray-200 dark:border-gray-800 text-center">
        <p className="text-xs font-bold tracking-widest text-text-muted uppercase">
          ClinicCare © 2026 • Transformando a Gestão de Saúde
        </p>
      </footer>
    </div>
  );
}
