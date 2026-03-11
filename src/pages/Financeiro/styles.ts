export const styles = {
  container: 'w-full max-w-[1440px] mx-auto pb-24 md:pb-8 relative min-h-screen slide-in',
  headerWrapper: 'flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 pb-6 border-b border-gray-200 dark:border-gray-800',
  title: 'text-4xl font-black text-text-main dark:text-white tracking-tighter uppercase',
  subtitle: 'text-sm font-medium tracking-wide text-text-muted dark:text-gray-400 mt-2 uppercase',
  actionsWrapper: 'flex items-center gap-4',
  textButton: 'flex items-center gap-2 bg-transparent text-text-main dark:text-white px-0 py-2 font-bold tracking-widest text-xs uppercase hover:opacity-70 transition-opacity border-b-2 border-transparent hover:border-text-main dark:hover:border-white',
  primaryButton: 'hidden md:flex items-center gap-2 bg-text-main dark:bg-white text-white dark:text-text-main px-6 py-3 rounded-none font-bold tracking-widest text-xs uppercase hover:opacity-90 transition-opacity active:scale-95',
  fab: 'md:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 z-40 active:scale-95 transition-transform',
};
