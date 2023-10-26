"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function IndexPage() {
  const router = useRouter()
  useEffect(() => {
    // location is not defined
    router.replace("/home")
  }, [router])
  return null
}
