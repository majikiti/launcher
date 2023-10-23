"use client"

import { Menu, X } from "lucide-react"

import { useAppWindow } from "~/lib/hooks"

export default function TitleBar() {
  const appWindow = useAppWindow()

  return (
    <nav
      className="flex justify-between text-neutral-200"
      data-tauri-drag-region>
      <div className="p-2">
        <Menu size={20} />
      </div>
      <div>
        <button
          className="px-3 py-2 hover:bg-red-600 active:bg-red-400"
          onClick={() => appWindow?.close()}>
          <X size={20} />
        </button>
      </div>
    </nav>
  )
}
