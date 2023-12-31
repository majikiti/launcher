"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

import Button from "~/components/Button"
import ExecButton from "~/components/ExecButton"
import { useConfig, useEntries } from "~/lib/hooks"

import NotFound from "./NotFound"

export default function LibraryEntryPage() {
  const [config] = useConfig()
  const [entries] = useEntries()
  const searchParams = useSearchParams()

  const _id = searchParams.get("id")
  const entry = entries.find(e => e.id === _id)
  if (!entry) return <NotFound />

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <h1 className="text-4xl font-bold">{`"${entry.name}"`}</h1>
          <span className="font-bold text-neutral-400">{`(起動回数:${entry.execCnt})`}</span>
        </div>
        <div className="flex gap-3">
          {config.showEditor && (
            <Link href={`/edit/entry?id=${entry.id}`} passHref>
              <Button>Edit</Button>
            </Link>
          )}
          <ExecButton id={entry.id} />
        </div>
      </div>
      {entry.desc && <p className="text-lg">{entry.desc}</p>}
      {entry.longDesc && (
        <pre className="rounded-md border border-stone-500/50 bg-stone-700 px-2 pb-1.5 pt-2">
          {entry.longDesc}
        </pre>
      )}
    </div>
  )
}
