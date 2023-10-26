export default function ContainerTitle({
  title,
  desc,
}: {
  title: string
  desc?: React.ReactNode
}) {
  return (
    <div className="mb-4">
      <h1 className="text-4xl font-bold">{title}</h1>
      {desc && <p className="mt-6">{desc}</p>}
    </div>
  )
}
