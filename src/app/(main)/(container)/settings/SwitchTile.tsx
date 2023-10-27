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
    <div className="flex justify-between rounded-md border border-stone-600/50 bg-stone-700/50 p-4">
      <label>{title}</label>
      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  )
}
