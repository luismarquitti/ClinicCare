export const styles = {
  grid: 'grid grid-cols-1 md:grid-cols-3 gap-8 mb-12',
  metricWrapper: (borderType: 'normal' | 'thick' = 'normal') => `bg-transparent pb-4 group relative ${
    borderType === 'thick' 
      ? 'border-b-4 border-text-main dark:border-white' 
      : 'border-b-2 border-gray-200 dark:border-gray-800'
  }`,
  label: (isTotal: boolean = false) => `text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-2 ${
    isTotal ? 'text-text-main dark:text-white' : 'text-text-muted'
  }`,
  dot: (type: 'success' | 'danger' | 'total') => `w-2 h-2 rounded-full inline-block ${
    type === 'success' ? 'bg-success' : type === 'danger' ? 'bg-danger' : 'bg-text-main dark:bg-white'
  }`,
  value: 'text-4xl lg:text-5xl font-black text-text-main dark:text-white tracking-tighter',
};
