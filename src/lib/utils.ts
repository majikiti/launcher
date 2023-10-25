import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const isSSR = typeof window === "undefined"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sleep(ms: number) {
  return new Promise(res => setTimeout(res, ms))
}
