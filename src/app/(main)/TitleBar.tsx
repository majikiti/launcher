"use client"

import { X } from "lucide-react"

import { useAppWindow } from "~/lib/hooks"

export default function TitleBar() {
  const appWindow = useAppWindow()

  return (
    <nav
      className="flex justify-between text-neutral-200"
      data-tauri-drag-region>
      <div className="flex items-center gap-2">
        <span className="ml-3.5 text-sm font-bold">D4 launcher</span>
      </div>
      <div className="flex">
        <button
          className="px-3 py-2 hover:bg-red-600 active:bg-red-400 active:text-neutral-800"
          onClick={() => appWindow?.close()}>
          <X size={20} />
        </button>
      </div>
    </nav>
  )
}
