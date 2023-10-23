import SideNavItem from "./SideNavItem"

export default function SideNav() {
  return (
    <div className="flex flex-col justify-between gap-1 px-1">
      <div className="flex flex-col gap-1">
        <SideNavItem href="/" icon="Home" label="Home" />
      </div>
      <div className="mb-1 flex flex-col gap-1">
        <SideNavItem href="/settings" icon="Settings" label="Settings" />
      </div>
    </div>
  )
}
