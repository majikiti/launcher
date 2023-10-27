"use client"

import { ask } from "@tauri-apps/api/dialog"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import Button from "~/components/Button"
import ContainerTitle from "~/components/ContainerTitle"
import { useEntries } from "~/lib/hooks"
import { isJson } from "~/lib/utils"

export default function EditTopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [vanilla, setVanilla] = useState(false)
  const [entries, setEntries] = useEntries()
  const current = JSON.stringify(entries, null, 2)

  type Inputs = { json: string }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()

  useEffect(() => {
    setValue("json", current)
    setVanilla(true)
  }, [current, setValue])

  const onSubmit: SubmitHandler<Inputs> = async data => {
    if (!(await ask("ほんとにする？"))) return
    setEntries(JSON.parse(data.json))
    setValue("json", current)
  }

  return (
    <div className="flex flex-col gap-8">
      <ContainerTitle
        title="Editor"
        desc="このタブは設定で非表示にできるよん"
      />
      {children}
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl font-bold">json</h2>
        <div>
          <textarea
            className="h-64 w-full resize-none overflow-auto whitespace-nowrap rounded-md border border-stone-500/50 bg-stone-700 p-1.5 font-mono text-xs"
            defaultValue={current}
            {...register("json", {
              validate: v => isJson(v),
              onChange: e => setVanilla(e.target.value === current),
            })}
          />
          {errors.json && <p className="text-red-500">invalid json</p>}
        </div>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            onClick={async () => {
              if (vanilla || !(await ask("ほんとにする？"))) return
              setValue("json", current)
              setVanilla(true)
            }}
            disabled={vanilla}>
            Reset
          </Button>
          <Button disabled={vanilla}>Save</Button>
        </div>
      </form>
    </div>
  )
}
