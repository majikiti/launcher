import SideNav from "./SideNav"
import TitleBar from "./TitleBar"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden rounded-lg border border-stone-700 bg-stone-900 text-neutral-100">
      <TitleBar />
      <div className="flex h-full">
        <SideNav />
        <div className="flex w-full flex-col rounded-tl-lg border-neutral-700 bg-stone-800 shadow-md">
          {children}
        </div>
      </div>
    </div>
  )
}
