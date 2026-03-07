export function formatPrice(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateStr));
}

export function clampNumber(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}
