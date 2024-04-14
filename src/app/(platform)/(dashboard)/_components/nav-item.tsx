'use client'

import { Activity, CreditCard, Layout, Settings } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

export type Organization = {
  id: string
  slug: string
  imageUrl: string
  name: string
}

type NavItemProps = {
  organization: Organization
  isActive: boolean
  isExpanded: boolean
  onExpand: (id: string) => void
}

export function NavItem({
  organization,
  isActive,
  isExpanded,
  onExpand,
}: NavItemProps) {
  const router = useRouter()
  const pathname = usePathname()

  const workspaceRoutes = [
    {
      label: 'Boards',
      icon: <Layout className="mr-2 size-4" />,
      href: `/organization/${organization.id}`,
    },
    {
      label: 'Activity',
      icon: <Activity className="mr-2 size-4" />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: 'Settings',
      icon: <Settings className="mr-2 size-4" />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: 'Billing',
      icon: <CreditCard className="mr-2 size-4" />,
      href: `/organization/${organization.id}/billing`,
    },
  ]

  function handleWorkspaceRouteClick(href: string) {
    router.push(href)
  }

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          'flex items-center gap-x-2 rounded-md p-1.5 text-start text-neutral-700 no-underline transition hover:bg-neutral-500/10 hover:no-underline',
          isActive && !isExpanded && 'bg-sky-500/10 text-sky-700',
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="relative size-7">
            <Image
              src={organization.imageUrl}
              alt="Organization"
              fill
              className="rounded-sm object-cover"
            />
          </div>

          <span className="text-sm font-medium">{organization.name}</span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="pt-1 text-neutral-700">
        {workspaceRoutes.map((route) => (
          <Button
            key={route.href}
            size="sm"
            variant="ghost"
            onClick={() => handleWorkspaceRouteClick(route.href)}
            className={cn(
              'mb-1 w-full justify-normal pl-10 font-normal',
              pathname === route.href && 'bg-sky-500/10 text-sky-700',
            )}
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  )
}
