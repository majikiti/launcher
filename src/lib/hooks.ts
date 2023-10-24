import { useAtom, useAtomValue } from "jotai"
import { useEffect } from "react"

import { Config, configAtom, maximizedAtom, windowAtom } from "./atoms"

export function useAppWindow() {
  return useAtomValue(windowAtom)
}

export function useAppWindowListener() {
  const appWindow = useAppWindow()
  const [, setMaximized] = useAtom(maximizedAtom)
  useEffect(() => {
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
