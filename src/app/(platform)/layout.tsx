import { ClerkProvider } from '@clerk/nextjs'

import { Toaster } from '@/components/ui/sonner'

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <Toaster />
      {children}
    </ClerkProvider>
  )
}
