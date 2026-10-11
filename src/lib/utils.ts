import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility to merge tailwind classes with clsx logic.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Utility to get the status color class based on the current quantity and minimum quantity,
 * or based on a string status.
 */
export function getStatusColor(currentOrStatus: number | string, minQuantity?: number): string {
  if (typeof currentOrStatus === 'number' && typeof minQuantity === 'number') {
    if (currentOrStatus <= 0) return 'bg-danger/10 text-danger border-danger/20';
    if (currentOrStatus <= minQuantity) return 'bg-warning/10 text-warning border-warning/20';
    return 'bg-success/10 text-success border-success/20';
  }

  switch (currentOrStatus as string) {
    case 'operating':
    case 'closed':
    case 'completed':
      return 'bg-success/10 text-success';
    case 'in_repair':
    case 'in_progress':
    case 'pending':
      return 'bg-warning/10 text-warning';
    case 'out_of_service':
      return 'bg-danger/10 text-danger';
    case 'open':
      return 'bg-blue-100 text-blue-700';
    case 'waiting_parts':
      return 'bg-purple-100 text-purple-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}
