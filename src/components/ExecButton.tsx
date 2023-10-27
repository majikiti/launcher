"use client"

import { Command } from "@tauri-apps/api/shell"
import { Play, Square } from "lucide-react"
import { useState } from "react"

import { useRunnings } from "~/lib/hooks"

import Button from "./Button"

export default function ExecButton({
  id,
  exec,
}: {
  id: string
  exec: string | null
}) {
  const [runnings, setRunnings] = useRunnings()
  const [runlevel, setRunlevel] = useState(0)

  if (!exec)
    return (
      <Button disabled>
        <Play size={16} />
        Play
      </Button>
    )

  if (runlevel < 2 && runnings.find(r => r.id === id)) setRunlevel(2)

  const dispose = () => {
    setRunnings(runnings.filter(r => r.id !== id))
    setRunlevel(0)
  }

  const onClick = async () => {
    switch (runlevel) {
      case 0:
        try {
          const command = new Command("cmd", ["/c", exec])
          command.on("close", dispose)
          command.stdout.on("data", console.info)
          command.stderr.on("data", console.error)
          setRunlevel(1)
          const child = await command.spawn()
          setRunnings([...runnings, { id, child }])
          setRunlevel(2)
        } catch (e) {
          console.error(e)
          setRunlevel(0)
        }
        break
      case 2:
        setRunlevel(3)
        await runnings.find(r => r.id === id)?.child.kill()
        dispose()
    }
  }

  return (
    <Button onClick={onClick} disabled={!!(runlevel % 1)}>
      {runlevel < 2 ? (
        <>
          <Play size={18} />
          Play
        </>
      ) : (
        <>
          <Square size={18} />
          Stop
        </>
      )}
    </Button>
  )
}
