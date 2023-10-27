"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"

import Button from "~/components/Button"
import { Entry } from "~/lib/atoms"
import { useEntries } from "~/lib/hooks"

export default function TrendSection() {
  const [entries] = useEntries()

  return (
    <section className="mx-4 flex flex-col gap-3">
      <h2 className="text-xl font-bold">Top</h2>
      <div className="grid auto-cols-max grid-flow-col gap-3">
        {entries
          .sort((a, b) => b.execCnt - a.execCnt)
          .slice(0, 8)
          .map((e, i) => (
            <EntryTile entry={e} key={i} />
          ))}
      </div>
      <div className="flex justify-end">
        <Link href="/library" passHref>
          <Button>More</Button>
        </Link>
      </div>
    </section>
  )
}

function EntryTile({ entry }: { entry: Entry }) {
  return (
    <Link
      href={`/library/entry?id=${entry.id}`}
      className="flex h-16 w-64 items-center justify-between rounded-md border border-stone-500/50 bg-stone-700 px-2 hover:bg-stone-600 active:bg-stone-600/80">
      <div className="font-medium">{entry.name}</div>
      <ChevronRight className="text-neutral-400" size={24} />
    </Link>
  )
}
