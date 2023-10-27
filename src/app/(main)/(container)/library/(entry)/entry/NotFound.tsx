import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { sleep } from "~/lib/utils"

export default function NotFound() {
  const router = useRouter()
  useEffect(() => {
    sleep(2500).then(router.back)
  }, [router])

  return (
    <>
      <h1 className="text-4xl font-bold">404 Not Found</h1>
    </>
  )
}
