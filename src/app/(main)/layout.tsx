"use client"

import { useAppWindowListener, useMaximized } from "~/lib/hooks"
import { cn } from "~/lib/utils"

import SideNav from "./SideNav"
import TitleBar from "./TitleBar"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const maximized = useMaximized()
  useAppWindowListener()

  return (
    <div
      className={cn(
        "flex h-screen flex-col overflow-hidden bg-stone-900 text-neutral-100",
        maximized || "rounded-lg border border-stone-700",
      )}>
      <TitleBar />
      <div className="flex h-full overflow-hidden">
        <SideNav />
        <div className="flex h-full w-full flex-col overflow-auto rounded-tl-lg border-neutral-700 bg-stone-800 shadow-md">
          {children}
        </div>
      </div>
    </div>
  )
}
