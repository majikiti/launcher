import { atomWithDefault, atomWithStorage } from "jotai/utils"

export const windowAtom = atomWithDefault(
  async () => (await import("@tauri-apps/api/window")).appWindow,
)

export const maximizedAtom = atomWithDefault<boolean | Promise<boolean>>(
  async get => (await get(windowAtom)).isMaximized(),
)

export type Config = {
  showEditor?: boolean
}

export const configAtom = atomWithStorage<Config>("config", {
  showEditor: true,
})
