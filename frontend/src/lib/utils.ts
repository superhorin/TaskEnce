import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTaskDate(dateString?: string): string {
  if (!dateString) return "none";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "invaild date";

  return date.toLocaleDateString('en-JP', {
    year:   'numeric',
    month:  'short',
    day:    'numeric',
    hour:   '2-digit',
    minute: '2-digit',
  });
}
