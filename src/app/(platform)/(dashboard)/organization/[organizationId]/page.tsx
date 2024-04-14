type OrganizationPageParams = {
  params: {
    organizationId: string
  }
}

export default function OrganizationPage({ params }: OrganizationPageParams) {
  console.log(params.organizationId)

  return (
    <div>
      <h1>Organization page</h1>
    </div>
  )
}
