"use client"

import { ask, open } from "@tauri-apps/api/dialog"
import { useRouter, useSearchParams } from "next/navigation"
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
  desc?: string
  longDesc?: string
  version?: string
}

export default function EditEntryPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [entries, setEntries] = useEntries()

  const id = searchParams.get("id")
  const entry = id ? entries.find(e => e.id === id) : null

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      id: entry?.id,
      name: entry?.name,
      desc: entry?.desc ?? undefined,
      longDesc: entry?.longDesc ?? undefined,
    },
  })
  const [exec, setExec] = useState<string | null>(entry?.exec ?? null)

  const upsertEntry = (entry: Entry) => {
    setEntries([...entries.filter(e => e.id !== entry.id), entry])
  }

  const onSubmit: SubmitHandler<FormInputs> = data => {
    upsertEntry({
      id: data.id,
      name: data.name,
      desc: data.desc || null,
      longDesc: data.longDesc || null,
      exec,
      execCnt: entry?.execCnt ?? 0,
    })
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
            表示名
            <Star />
          </label>
          <div className="w-full">
            <input
              className={cn(formCls, "w-full")}
              placeholder="Hoge Game"
              {...register("name", { required: true })}
            />
          </div>
        </div>
        {errors.name && <p className="ml-28 text-red-500">name is required</p>}
      </div>
      <div>
        <div className="flex items-center">
          <label className="w-32">短い説明</label>
          <input
            className={cn(formCls, "w-full")}
            placeholder="キャッチコピー的な"
            {...register("desc", { setValueAs: v => v ?? null })}
          />
        </div>
      </div>
      <div className="flex">
        <label className="w-32">長い説明</label>
        <textarea
          className={cn(formCls, "h-48 w-full resize-none")}
          placeholder="詳細な説明; 別に無くてもいい"
          {...register("longDesc")}
        />
      </div>
      <div className="flex items-center">
        <label className="w-32">実行ファイル</label>
        <div className="flex w-full gap-3 overflow-hidden">
          <button
            type="button"
            className={formCls}
            onClick={async () => {
              const exec = await open()
              if (!exec) return
              setExec(Array.isArray(exec) ? exec[0] : exec)
            }}>
            Choose File
          </button>
          <div
            className={cn(
              formCls,
              "grow overflow-x-auto",
              exec ?? "text-[darkgray]",
            )}>
            {exec ?? "null"}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          onClick={async () => {
            if (!(await ask("ほんとにする？"))) return
            setEntries(entries.filter(e => e.id !== id))
            router.back()
          }}>
          Delete
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
