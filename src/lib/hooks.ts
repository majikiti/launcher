import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { useEffect } from "react"

import {
  appWindowAtom,
  Config,
  configAtom,
  entriesAtom,
  maximizedAtom,
} from "./atoms"

export function useAppWindow() {
  return useAtomValue(appWindowAtom)
}

export function useAppWindowListener() {
  const appWindow = useAppWindow()
  const setMaximized = useSetAtom(maximizedAtom)
  useEffect(() => {
    if (!appWindow) return
    const unlistens = Promise.all([
      appWindow.onResized(async () => {
        setMaximized(await appWindow.isMaximized())
      }),
    ])
    return () => {
      unlistens.then(a => a.forEach(f => f()))
    }
  }, [appWindow, setMaximized])
}

export function useMaximized() {
  return useAtomValue(maximizedAtom)
}

export function useConfig(): [Config, (partial: Partial<Config>) => void] {
  const [config, setConfig] = useAtom(configAtom)
  return [config, partial => setConfig({ ...config, ...partial })]
}

export function useEntries() {
  return useAtom(entriesAtom)
}
