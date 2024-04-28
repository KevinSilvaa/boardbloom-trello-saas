'use client'

import { useEffect, useState } from 'react'

import { CardModal } from '@/components/modals/card-modal'
import { CardModalContextProvider } from '@/contexts/card-modal-context'
import { ProModalContextProvider } from '@/contexts/pro-modal-context'

import { ProModal } from '../modals/pro-modal'

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
        <ProModalContextProvider>
          <ProModal />
          {children}
        </ProModalContextProvider>
      </CardModalContextProvider>
    </>
  )
}
