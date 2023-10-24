import React from "react"

export default function Title({
  title,
  desc,
}: {
  title: string
  desc?: React.ReactNode
}) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold">{title}</h1>
      {desc && <p className="mt-6">{desc}</p>}
    </div>
  )
}
