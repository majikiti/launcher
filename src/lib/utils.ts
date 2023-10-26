import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const isSSR = typeof window === "undefined"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isJson(str: string) {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

export function sleep(ms: number) {
  return new Promise(res => setTimeout(res, ms))
}
