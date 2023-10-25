"use client"

import ContainerTitle from "~/components/ContainerTitle"
import { useConfig } from "~/lib/hooks"

import SwitchTile from "./SwitchTile"

export default function SettingsPage() {
  const [config, setConfig] = useConfig()

  return (
    <>
      <ContainerTitle title="Settings" desc="あいうえお" />
      <div className="flex flex-col gap-4">
        <section>
          <h2 className="mb-2 text-xl font-bold">システム設定</h2>
          <div className="flex flex-col gap-2">
            <SwitchTile
              title="Editorタブを表示する"
              value={config.showEditor}
              onChange={() => setConfig({ showEditor: !config.showEditor })}
            />
            <SwitchTile
              title="Editorタブを表示する"
              value={config.showEditor}
              onChange={() => setConfig({ showEditor: !config.showEditor })}
            />
          </div>
        </section>
      </div>
    </>
  )
}
