import "./global.css"

import { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Launcher",
  description: "org.kobe-kosen.kcctfes23.launcher",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className="cursor-default select-none">
      <body className={inter.className}>{children}</body>
    </html>
  )
}