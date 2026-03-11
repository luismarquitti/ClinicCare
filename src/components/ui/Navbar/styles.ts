export const styles = {
  nav: 'fixed top-0 left-0 right-0 h-20 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b-2 border-gray-200 dark:border-gray-800 z-50 px-6 flex items-center justify-between transition-colors duration-300',
  leftSection: 'flex items-center gap-10',
  logoLink: 'flex items-center gap-2 group',
  logoIconWrapper: 'w-10 h-10 bg-text-main dark:bg-white flex items-center justify-center rounded-none transform group-hover:rotate-90 transition-transform duration-500',
  logoIcon: 'material-symbols-outlined text-white dark:text-text-main text-[24px]',
  logoText: 'text-2xl font-black tracking-tighter uppercase text-text-main dark:text-white',
  desktopMenu: 'hidden lg:flex items-center gap-6',
  navLink: (isActive: boolean) => `text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border-b-2 ${
    isActive
      ? 'text-text-main dark:text-white border-text-main dark:border-white'
      : 'text-text-muted border-transparent hover:text-text-main dark:hover:text-white'
  }`,
  rightSection: 'flex items-center gap-4',
  themeButton: 'w-10 h-10 flex items-center justify-center text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-surface-dark transition-colors',
  userWrapper: 'flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-800',
  userDetails: 'text-right',
  userName: 'text-[10px] font-black uppercase tracking-widest text-text-main dark:text-white leading-none',
  userRole: 'text-[9px] font-bold uppercase tracking-widest text-text-muted mt-1 leading-none',
  userAvatar: 'w-10 h-10 bg-gray-100 dark:bg-surface-dark flex items-center justify-center border-2 border-text-main dark:border-white',
  avatarIcon: 'material-symbols-outlined text-text-main dark:text-white',
};
