import { prisma } from '@/lib/prisma'

import { Board } from './board'
import { Form } from './form'

type OrganizationPageParams = {
  params: {
    organizationId: string
  }
}

export default async function OrganizationPage({
  params,
}: OrganizationPageParams) {
  const boards = await prisma.board.findMany()
  console.log(params.organizationId)

  return (
    <div>
      <Form />

      <div className="space-y-2">
        {boards.map((board) => (
          <Board key={board.id} id={board.id} title={board.title} />
        ))}
      </div>
    </div>
  )
}
