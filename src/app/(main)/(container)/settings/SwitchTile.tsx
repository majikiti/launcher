import { Switch } from "~/components/ui/switch"

export default function ToggleTile({
  title,
  value,
  onChange,
}: {
  title: string
  value?: boolean
  onChange?: () => void
}) {
  return (
    <div className="flex justify-between rounded-md border border-transparent bg-stone-700/50 p-4 hover:border-stone-600/60 hover:bg-stone-700 active:border-stone-700/60 active:bg-stone-700/40">
      <label>{title}</label>
      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  )
}
