'use client'

import { createContext, useContext, useState } from 'react'

type CardModalContextType = {
  id?: string
  isOpen: boolean
  onOpen: (id: string) => void
  onClose: () => void
}

const CardModalContext = createContext({} as CardModalContextType)

export function CardModalContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [openedModalId, setOpenedModalId] = useState<string | undefined>(
    undefined,
  )

  function onOpen(id: string) {
    setIsOpen(true)
    setOpenedModalId(id)
  }

  function onClose() {
    setIsOpen(false)
    setOpenedModalId(undefined)
  }

  return (
    <CardModalContext.Provider
      value={{ id: openedModalId, isOpen, onOpen, onClose }}
    >
      {children}
    </CardModalContext.Provider>
  )
}

export const useCardModal = () => useContext(CardModalContext)
