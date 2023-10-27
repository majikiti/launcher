import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { useEffect } from "react"

import {
  appWindowAtom,
  cardsAtom,
  Config,
  configAtom,
  entriesAtom,
  Entry,
  maximizedAtom,
  runningsAtom,
} from "./atoms"

export function useAppWindow() {
  return useAtomValue(appWindowAtom)
}

export function useAppWindowListener() {
  const appWindow = useAppWindow()
  const setMaximized = useSetAtom(maximizedAtom)
  useEffect(() => {
    if (!appWindow) return
    appWindow.isMaximized().then(setMaximized)
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

export function useEntries(): [Entry[], (entries: Entry[]) => void] {
  const [entries, setEntries] = useAtom(entriesAtom)
  return [
    entries,
    (entries: Entry[]) =>
      setEntries(entries.sort((a, b) => (a.id > b.id ? 1 : -1))),
  ]
}

export function useRunnings() {
  return useAtom(runningsAtom)
}

export function useCards() {
  return useAtom(cardsAtom)
}
