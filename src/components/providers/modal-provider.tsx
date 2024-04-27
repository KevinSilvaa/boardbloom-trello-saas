'use client'

import { useEffect, useState } from 'react'

import { CardModal } from '@/components/modals/card-modal'
import { CardModalContextProvider } from '@/contexts/card-modal-context'

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <CardModalContextProvider>
        <CardModal />
        {children}
      </CardModalContextProvider>
    </>
  )
}
