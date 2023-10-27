import { convertFileSrc } from "@tauri-apps/api/tauri"
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

export function asset(s: string) {
  try {
    const url = new URL(s)
    if (url.protocol === "file:") return convertFileSrc(s)
    return s
  } catch {
    return convertFileSrc(s)
  }
}

export function sleep(ms: number) {
  return new Promise(res => setTimeout(res, ms))
}
