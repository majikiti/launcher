import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ReturnNav() {
  const router = useRouter()

  return (
    <button
      className="flex items-center gap-2 py-2 text-neutral-400 hover:underline"
      onClick={router.back}>
      <ChevronLeft />
      <div className="mt-1 text-sm">
        諦めるのは
        <span className="font-bold italic">easy</span>
      </div>
    </button>
  )
}
