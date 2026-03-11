/**
 * Global semantic tokens for ClinicCare.
 * These tokens map brand guidelines to reusable Tailwind class strings.
 */

export const colors = {
  primary: 'text-blue-800 dark:text-blue-400',
  secondary: 'text-teal-600 dark:text-teal-400',
  accent: 'text-orange-500 dark:text-orange-400',
  muted: 'text-text-muted dark:text-gray-400',
  danger: 'text-danger',
  success: 'text-success',
  bg: 'bg-background dark:bg-background-dark',
  surface: 'bg-white dark:bg-surface-dark',
};

export const typography = {
  h1: 'text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-none',
  h2: 'text-2xl lg:text-3xl font-black tracking-tighter uppercase',
  h3: 'text-xl font-bold uppercase tracking-tight',
  label: 'text-[10px] font-black uppercase tracking-[0.2em]',
  body: 'text-sm font-medium leading-relaxed',
  caption: 'text-xs font-bold tracking-widest uppercase',
};

export const layout = {
  container: 'w-full max-w-[1440px] mx-auto p-6 md:p-8',
  section: 'space-y-12 py-10',
  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  card: 'p-8 border-2 border-gray-200 dark:border-gray-800 transition-all duration-300',
  border: 'border-gray-200 dark:border-gray-800',
};

export const tokens = {
  colors,
  typography,
  layout,
};
