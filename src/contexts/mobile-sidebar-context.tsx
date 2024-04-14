'use client'

import { createContext, useContext, useState } from 'react'

type MobileSidebarContextType = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const MobileSidebarContext = createContext({} as MobileSidebarContextType)

export function MobileSidebarContextProvider({
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
    <MobileSidebarContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </MobileSidebarContext.Provider>
  )
}

export const useMobileSideBar = () => useContext(MobileSidebarContext)
