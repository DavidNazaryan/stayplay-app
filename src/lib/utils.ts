import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  return num.toLocaleString()
}

export function formatWeight(weight: number): string {
  return `${weight.toFixed(1)} кг`
}

export function calculateProgress(current: number, target: number): number {
  return Math.min(100, Math.max(0, Math.round((current / target) * 100)))
}

export function calculateWeightProgress(
  current: number,
  target: number,
  start: number
): number {
  if (start === target) return 100
  return Math.min(
    100,
    Math.max(0, Math.round(((start - current) / (start - target)) * 100))
  )
}



