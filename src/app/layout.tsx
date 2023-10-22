import { Inter } from "next/font/google"
import "./global.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Launcher",
  description: "org.kobe-kosen.kcctfes23.launcher",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
