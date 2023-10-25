"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { open } from "@tauri-apps/api/dialog"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"

import Button from "~/components/Button"
import ReturnNav from "~/components/ReturnNav"
import { Entry } from "~/lib/atoms"
import { useEntries } from "~/lib/hooks"
import { cn } from "~/lib/utils"

const formSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
})

type FormInputs = z.infer<typeof formSchema>

export default function EditEntryPage() {
  const [file, setFile] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const [entries, setEntries] = useEntries()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  })

  const upsertEntry = (entry: Entry) => {
    setEntries([...entries.filter(e => e.id !== entry.id), entry])
  }

  const onSubmit: SubmitHandler<FormInputs> = data => {
    upsertEntry({
      id: data.id,
      name: data.name,
      exec: file,
    })
  }

  const id = searchParams.get("id")
  if (!id) return <>invalid id</>

  const formCls =
    "rounded-md border border-stone-500/50 bg-stone-600 px-2 pb-1.5 pt-2"
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <ReturnNav />
      <div>
        <div className="flex items-center">
          <label className="w-20">id</label>
          <input
            className={cn(formCls, "w-full")}
            placeholder="org.kobe-kosen.hoge"
            {...register("id")}
          />
        </div>
        {errors.id && <p className="ml-20 text-red-500">id is required</p>}
      </div>
      <div>
        <div className="flex items-center">
          <label className="w-20">name</label>
          <div className="w-full">
            <input
              className={cn(formCls, "w-full")}
              placeholder="Hoge Game"
              {...register("name")}
            />
          </div>
        </div>
        {errors.name && <p className="ml-20 text-red-500">name is required</p>}
      </div>
      <div className="flex items-center">
        <label className="w-20">exec</label>
        <div className="flex w-full gap-2">
          <button
            className={formCls}
            onClick={async () => {
              const exec = await open()
              setFile(Array.isArray(exec) ? exec[0] : exec)
            }}>
            Choose File
          </button>
          <div className={cn(formCls, "grow", file ?? "text-[darkgray]")}>
            {file ?? "null"}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
