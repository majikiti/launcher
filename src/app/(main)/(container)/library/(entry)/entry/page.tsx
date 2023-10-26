"use client"

import { Command } from "@tauri-apps/api/shell"
import { Play } from "lucide-react"
import { useSearchParams } from "next/navigation"

import Button from "~/components/Button"
import { useEntries } from "~/lib/hooks"

import NotFound from "./NotFound"

export default function LibraryEntryPage() {
  const [entries] = useEntries()
  const searchParams = useSearchParams()

  const id = searchParams.get("id")
  const entry = entries.find(e => e.id === id)
  if (!entry) return <NotFound />

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold">{entry.name}</h1>
      <div>{entry.exec}</div>
      <div className="flex justify-end gap-3">
        {entry.exec && (
          <Button onClick={() => new Command(entry.exec!)}>
            <Play size={16} />
            Play
          </Button>
        )}
      </div>
    </div>
  )
}
