import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import Button from "~/components/Button"
import { useCards, useEntries } from "~/lib/hooks"
import { isJson } from "~/lib/utils"

export default function JsonForm() {
  const [vanilla, setVanilla] = useState(false)
  const [entries, setEntries] = useEntries()
  const [cards, setCards] = useCards()

  const current = JSON.stringify({ cards, entries }, null, 2)

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
    const { entries, cards } = JSON.parse(data.json)
    setEntries(entries)
    setCards(cards)
    setValue("json", current)
  }

  return (
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
            setValue("json", current)
            setVanilla(true)
          }}
          disabled={vanilla}>
          Reset
        </Button>
        <Button disabled={vanilla}>Save</Button>
      </div>
    </form>
  )
}
