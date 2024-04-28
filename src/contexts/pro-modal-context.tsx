'use client'

import { createContext, useContext, useState } from 'react'

type ProModalContextType = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const ProModalContext = createContext({} as ProModalContextType)

export function ProModalContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  function onOpen() {
    setIsOpen(true)
  }

  function onClose() {
    setIsOpen(false)
  }

  return (
    <ProModalContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </ProModalContext.Provider>
  )
}

export const useProModal = () => useContext(ProModalContext)
