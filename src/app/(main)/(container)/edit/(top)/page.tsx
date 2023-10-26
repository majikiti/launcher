"use client"

import Link from "next/link"

import Button from "~/components/Button"
import EntryBar from "~/components/EntryBar"
import { useEntries } from "~/lib/hooks"

export default function EditPage() {
  const [entries] = useEntries()

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-baseline gap-2 text-xl font-bold">
          リスト
          <span className="text-base text-neutral-400">
            {`(n=${entries.length})`}
          </span>
        </div>
        <Link href="/edit/entry" passHref>
          <Button>Add</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {entries.map((e, i) => (
          <Link href={`/edit/entry?id=${e.id}`} passHref key={i}>
            <EntryBar e={e} />
          </Link>
        ))}
      </div>
    </section>
  )
}
