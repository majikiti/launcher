"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"

import Button from "~/components/Button"
import ContainerTitle from "~/components/ContainerTitle"
import EntryBar from "~/components/EntryBar"
import { useCards, useEntries } from "~/lib/hooks"

import JsonForm from "./JsonForm"

export default function EditTopPage() {
  const [entries] = useEntries()
  const [cards] = useCards()

  return (
    <div className="flex flex-col gap-8">
      <ContainerTitle
        title="Editor"
        desc="このタブは設定で非表示にできるよん"
      />
      <section>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2 text-xl font-bold">
            Cards
            <span className="text-base text-neutral-400">
              {`(n=${cards.length})`}
            </span>
          </div>
          <Link href="/edit/card" passHref>
            <Button>Add</Button>
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          {cards.map((c, i) => (
            <Link href={`/edit/card?id=${c.id}`} passHref key={i}>
              <div className="flex items-center justify-between rounded-md border border-stone-500/50 bg-stone-700 px-2 pb-1.5 pt-2 hover:bg-stone-600">
                <div className="flex items-baseline gap-2">
                  <span>{c.id}</span>
                  <span className="text-sm text-[darkgray]">{c.pic}</span>
                </div>
                <ChevronRight size={20} />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2 text-xl font-bold">
            Entry
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
      <JsonForm />
    </div>
  )
}
