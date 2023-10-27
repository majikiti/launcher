"use client"

import { ask } from "@tauri-apps/api/dialog"
import { useRouter, useSearchParams } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"

import Button from "~/components/Button"
import ReturnNav from "~/components/ReturnNav"
import { Card } from "~/lib/atoms"
import { useCards } from "~/lib/hooks"
import { cn } from "~/lib/utils"

type FormInputs = {
  id: string
  pic: string
}

export default function EditCardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [cards, setCards] = useCards()

  const id = searchParams.get("id")
  const card = id ? cards.find(c => c.id === id) : null

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      id: card?.id,
      pic: card?.pic,
    },
  })

  const upsertCard = (card: Card) => {
    setCards([...cards.filter(c => c.id !== card.id), card])
  }

  const onSubmit: SubmitHandler<FormInputs> = data => {
    upsertCard(data)
    router.back()
  }

  const Star = () => <sup className="text-red-500">*</sup>

  const formCls =
    "rounded-md border border-stone-500/50 bg-stone-600 px-2 pb-1.5 pt-2 placeholder:text-[darkgray]"
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <ReturnNav />
      <div>
        <div className="flex items-center">
          <label className="w-32">
            ID
            <Star />
          </label>
          <input
            className={cn(formCls, "w-full")}
            placeholder="org.kobe-kosen.hoge"
            {...register("id", { required: true })}
          />
        </div>
        {errors.id && <p className="ml-28 text-red-500">id is required</p>}
      </div>
      <div>
        <div className="flex items-center">
          <label className="w-32">
            URL/Path
            <Star />
          </label>
          <div className="w-full">
            <input
              className={cn(formCls, "w-full")}
              placeholder="C:\Users\YamaD\Desktop\hoge.png"
              {...register("pic", { required: true })}
            />
          </div>
        </div>
        {errors.pic && <p className="ml-28 text-red-500">pic is required</p>}
      </div>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          onClick={async () => {
            if (!(await ask("ほんとにする？"))) return
            setCards(cards.filter(e => e.id !== id))
            router.back()
          }}>
          Delete
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
