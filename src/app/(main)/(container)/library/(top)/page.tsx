"use client"

import Link from "next/link"

import ContainerTitle from "~/components/ContainerTitle"
import EntryBar from "~/components/EntryBar"
import { useEntries } from "~/lib/hooks"

export default function LibraryPage() {
  const [entries] = useEntries()

  return (
    <div className="flex flex-col gap-8">
      <ContainerTitle title="Library" />
      <section>
        <div className="flex flex-col gap-2">
          {entries.map((e, i) => (
            <Link href={`/library/entry?id=${e.id}`} passHref key={i}>
              <EntryBar e={e} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
