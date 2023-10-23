import "./global.css"

import { Metadata } from "next"
import { Inter } from "next/font/google"

import { cn } from "~/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

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
    <html
      lang="ja"
      className={cn("cursor-default select-none font-sans", inter.variable)}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
