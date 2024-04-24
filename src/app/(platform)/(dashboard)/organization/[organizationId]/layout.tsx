import { auth } from '@clerk/nextjs'
import { startCase } from 'lodash'
import { Metadata } from 'next'

import { OrganizationControl } from './_components/organization-control'

export async function generateMetadata(): Promise<Metadata> {
  const { orgSlug } = auth()

  return {
    title: startCase(orgSlug || 'organization'),
  }
}

export default function OrganizationIdLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <OrganizationControl />
      {children}
    </>
  )
}
