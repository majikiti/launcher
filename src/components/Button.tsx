import { ButtonHTMLAttributes } from "react"

export default function Button({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={
        "flex items-center gap-1 rounded-lg border border-stone-500/50 bg-stone-600 px-4 pb-1 pt-1.5 hover:bg-stone-500 active:bg-stone-500/80 disabled:text-[darkgray] disabled:hover:bg-stone-600"
      }
      {...props}>
      {children}
    </button>
  )
}
