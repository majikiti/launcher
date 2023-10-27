import { useConfig } from "~/lib/hooks"

import SideNavItem from "./SideNavItem"

export default function SideNav() {
  const [config] = useConfig()

  return (
    <div className="flex flex-col justify-between gap-1 px-1">
      <div className="flex flex-col gap-1">
        <SideNavItem href="/home" icon="Home" label="Home" />
        <SideNavItem href="/library" icon="Library" label="Library" />
        {config.showEditor && (
          <SideNavItem href="/edit" icon="PenSquare" label="Editor" />
        )}
      </div>
      <div className="mb-1 flex flex-col gap-1">
        <SideNavItem href="/settings" icon="Settings" label="Settings" />
      </div>
    </div>
  )
}
