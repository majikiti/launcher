"use client"

import { WebviewWindow } from "@tauri-apps/api/window"
import { useEffect, useState } from "react"

export function useAppWindow() {
  const [state, setState] = useState<WebviewWindow | null>(null)

  async function loadAppWindow() {
    const { appWindow } = await import("@tauri-apps/api/window")
    setState(appWindow)
  }

  useEffect(() => {
    loadAppWindow()
  }, [])

  return state
}
