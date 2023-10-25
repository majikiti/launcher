import { Loader2 } from "lucide-react"

export default function MainLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader2 size={64} className="mr-6 animate-spin text-neutral-400" />
    </div>
  )
}
