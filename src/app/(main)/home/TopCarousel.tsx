"use client"

import { Carousel } from "flowbite-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

import ExecButton from "~/components/ExecButton"
import { Entry } from "~/lib/atoms"
import { useCards, useEntries } from "~/lib/hooks"
import { asset } from "~/lib/utils"

export default function TopCarousel() {
  const [entries] = useEntries()
  const [cards] = useCards()

  const items = cards
    .map(c => ({
      e: entries.find(e => e.id === c.id) as Entry,
      pic: c.pic,
    }))
    .filter(({ e }) => e) // e as Entry
    .sort((a, b) => b.e.execCnt - a.e.execCnt)

  if (!items.length) return <div className="pt-2" />

  return (
    <Carousel
      className="h-[70vh] p-2"
      leftControl={<ChevronLeft className="text-white/50" size={24} />}
      rightControl={<ChevronRight className="text-white/50" size={24} />}
      slideInterval={5000}
      pauseOnHover>
      {items.map(({ e, pic }, i) => (
        <article key={i} className="relative h-full w-full">
          <Image
            className="absolute h-full w-full object-cover brightness-75"
            src={asset(pic)}
            alt={e.name}
            fill
          />
          <div className="absolute flex h-full w-full flex-col items-start justify-center gap-3 bg-gradient-to-r from-black via-transparent pl-[8%] lg:gap-4">
            <h2 className="mt-[5%] text-3xl font-bold lg:text-4xl">{e.name}</h2>
            {e.desc && <p>{e.desc}</p>}
            <ExecButton id={e.id} />
          </div>
        </article>
      ))}
    </Carousel>
  )
}
