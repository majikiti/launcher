import { atom } from "jotai"
import { atomWithDefault, atomWithStorage } from "jotai/utils"

import { isSSR } from "./utils"

export const appWindowAtom = atom(async () =>
  isSSR ? null : (await import("@tauri-apps/api/window")).appWindow,
)

export const maximizedAtom = atomWithDefault<boolean | Promise<boolean>>(
  async get => !!(await get(appWindowAtom))?.isMaximized(),
)

export type Config = {
  showEditor?: boolean
}

export const configAtom = atomWithStorage<Config>("config", {
  showEditor: true,
})

export type Entry = {
  id: string
  name: string
  version?: string
  exec: string | null
}

export type EntryUpdate = Partial<Entry> & Pick<Entry, "id">

export const entriesAtom = atomWithStorage<Entry[]>("entries", [])
