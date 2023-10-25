import { ButtonHTMLAttributes } from "react"

export default function Button({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={
        "flex rounded-lg border border-stone-500/50 bg-stone-600 px-4 pb-1 pt-1.5 hover:bg-stone-500 active:bg-stone-500/80"
      }
      {...props}>
      {children}
    </button>
  )
}
