import "./global.css"

import { Metadata } from "next"
import { Fira_Code, Inter } from "next/font/google"

import { cn } from "~/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
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
      <body className={cn(inter.className, firaCode.className)}>
        {children}
      </body>
    </html>
  )
}
