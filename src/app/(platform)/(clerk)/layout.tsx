export default function ClerkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-dvh items-center justify-center">{children}</div>
  )
}
