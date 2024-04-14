import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { Plus } from 'lucide-react'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { MobileSidebarContextProvider } from '@/contexts/mobile-sidebar-context'

import { MobileSidebar } from './mobile-sidebar'

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm">
      <MobileSidebarContextProvider>
        <MobileSidebar />
      </MobileSidebarContextProvider>

      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>

        <Button
          size="sm"
          className="hidden h-auto rounded-sm px-2 py-1.5 md:block"
        >
          Create
        </Button>
        <Button size="sm" className="block rounded-sm md:hidden">
          <Plus className="size-4" />
        </Button>
      </div>

      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          afterSelectOrganizationUrl="/organization/:id"
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
          }}
        />

        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  )
}
