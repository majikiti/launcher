import { Child } from "@tauri-apps/api/shell"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

import { isSSR } from "./utils"

export const appWindowAtom = atom(async () =>
  isSSR ? null : (await import("@tauri-apps/api/window")).appWindow,
)

export const maximizedAtom = atom(false)

export type Config = {
  showEditor?: boolean
}

export const configAtom = atomWithStorage<Config>("config", {
  showEditor: true,
})

export type Entry = {
  id: string
  name: string
  desc: string | null
  longDesc: string | null
  exec: string | null
}

export type EntryUpdate = Partial<Entry> & Pick<Entry, "id">

export const entriesAtom = atomWithStorage<Entry[]>("entries", [])

export type Proc = {
  id: string
  child: Child
}

export const runningsAtom = atom<Proc[]>([])
