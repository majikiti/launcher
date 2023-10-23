import { icons } from "lucide-react"

export default function SideNavButton({
  icon,
  text,
}: {
  icon: keyof typeof icons
  text: string
}) {
  // eslint-disable-next-line import/namespace
  const Icon = icons[icon]

  return (
    <button className="flex flex-col">
      <Icon />
      <span>{text}</span>
    </button>
  )
}
