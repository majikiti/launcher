export default function ContainerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto my-6 flex w-full max-w-5xl flex-col px-4 sm:px-10">
      {children}
    </div>
  )
}
