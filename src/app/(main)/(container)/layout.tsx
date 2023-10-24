export default function ContainerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-4 my-6 flex h-full flex-col sm:mx-10">{children}</div>
  )
}
