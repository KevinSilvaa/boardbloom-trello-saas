import { OrganizationControl } from './_components/organization-control'

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
