"use client"

import { open } from "@tauri-apps/api/dialog"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import Button from "~/components/Button"
import ReturnNav from "~/components/ReturnNav"
import { Entry } from "~/lib/atoms"
import { useEntries } from "~/lib/hooks"
import { cn } from "~/lib/utils"

type FormInputs = {
  id: string
  name: string
}

export default function EditEntryPage() {
  const [file, setFile] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const [entries, setEntries] = useEntries()

  const id = searchParams.get("id")
  const defaultValues = id ? entries.find(e => e.id === id) : undefined

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ defaultValues })

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

  const formCls =
    "rounded-md border border-stone-500/50 bg-stone-600 px-2 pb-1.5 pt-2"
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <ReturnNav />
      <div>
        <div className="flex items-center">
          <label className="w-20">name</label>
          <div className="w-full">
            <input
              className={cn(formCls, "w-full")}
              placeholder="Hoge Game"
              {...register("name", { required: true })}
            />
          </div>
        </div>
        {errors.name && <p className="ml-20 text-red-500">name is required</p>}
      </div>
      <div>
        <div className="flex items-center">
          <label className="w-20">id</label>
          <input
            className={cn(formCls, "w-full")}
            placeholder="org.kobe-kosen.hoge"
            {...register("id", { required: true })}
          />
        </div>
        {errors.id && <p className="ml-20 text-red-500">id is required</p>}
      </div>
      <div className="flex items-center">
        <label className="w-20">exec</label>
        <div className="flex w-full gap-3">
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
