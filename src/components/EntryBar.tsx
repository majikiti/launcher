import { ChevronRight } from "lucide-react"

import { Entry } from "~/lib/atoms"

export default function EntryBar({ e }: { e: Entry }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-stone-500/50 bg-stone-700 px-2 pb-1.5 pt-2 hover:bg-stone-600">
      <div className="flex items-baseline gap-2">
        <span>{e.name}</span>
        <span className="text-sm text-[darkgray]">{e.id}</span>
      </div>
      <ChevronRight size={20} />
    </div>
  )
}
