'use client'

import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useLocalStorage } from 'usehooks-ts'

import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { NavItem, Organization } from './nav-item'

type SidebarProps = {
  storageKey?: string
}

export function Sidebar({ storageKey = 'bb-sidebar-state' }: SidebarProps) {
  const [expandedAccordions, setExpandedAccordions] = useLocalStorage<
    Record<string, boolean>
  >(storageKey, {})

  const { organization: activeOrganization, isLoaded: isOrganizationLoaded } =
    useOrganization()

  const { userMemberships, isLoaded: isOrganizationUsersListLoaded } =
    useOrganizationList({
      userMemberships: {
        infinite: true,
      },
    })

  const defaultAccordionValue: string[] = Object.keys(
    expandedAccordions,
  ).reduce((acc: string[], key: string) => {
    if (expandedAccordions[key]) {
      acc.push(key)
    }

    return acc
  }, [])

  function onAccordionExpand(id: string) {
    setExpandedAccordions((state) => {
      return {
        ...state,
        [id]: !expandedAccordions[id],
      }
    })
  }

  if (
    !isOrganizationLoaded ||
    !isOrganizationUsersListLoaded ||
    userMemberships.isLoading
  ) {
    return (
      <>
        <Skeleton />
        <p>Loading</p>
      </>
    )
  }

  return (
    <>
      <div className="mb-1 flex items-center text-xs font-medium">
        <span className="pl-4">Workspaces</span>

        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
          asChild
        >
          <Link href="/select-org">
            <Plus className="size-4" />
          </Link>
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            organization={organization as Organization}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expandedAccordions[organization.id]}
            onExpand={onAccordionExpand}
          />
        ))}
      </Accordion>
    </>
  )
}
