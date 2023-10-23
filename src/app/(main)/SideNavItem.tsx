"use client"

import clsx from "clsx"
import { icons } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ComponentProps } from "react"

export default function SideNavItem({
  href,
  icon,
  label,
}: {
  href: string
  icon: ComponentProps<typeof SideNavButton>["icon"]
  label: string
}) {
  const pathname = usePathname()

  return (
    <Link href={href} passHref>
      <SideNavButton icon={icon} label={label} active={pathname === href} />
    </Link>
  )
}

function SideNavButton({
  icon,
  label,
  active,
}: {
  icon: keyof typeof icons
  label: string
  active: boolean
}) {
  const Icon = icons[icon]

  return (
    <button
      className={clsx(
        "relative flex h-16 w-[4.5rem] flex-col items-center justify-center gap-1 rounded-md",
        active
          ? "bg-stone-700 text-red-400 before:absolute before:left-0 before:h-2/5 before:w-1 before:rounded-full before:bg-red-400 hover:bg-stone-700"
          : "text-stone-400 hover:bg-stone-600/25 active:bg-stone-600/20",
      )}>
      <Icon />
      <span className="text-xs">{label}</span>
    </button>
  )
}
