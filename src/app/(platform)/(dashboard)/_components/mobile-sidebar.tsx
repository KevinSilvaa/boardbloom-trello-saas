'use client'

import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useMobileSideBar } from '@/contexts/mobile-sidebar-context'

import { Sidebar } from './sidebar'

export function MobileSidebar() {
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  const { isOpen, onOpen, onClose } = useMobileSideBar()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    onClose()
  }, [pathname])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <Button
        onClick={onOpen}
        size="sm"
        variant="ghost"
        className="mr-2 block md:hidden"
      >
        <Menu className="size-4" />
      </Button>

      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-2 pt-10">
          <Sidebar storageKey="bb-sidebar-mobile-state" />
        </SheetContent>
      </Sheet>
    </>
  )
}
