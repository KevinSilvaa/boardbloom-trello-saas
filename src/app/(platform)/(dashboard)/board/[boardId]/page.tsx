import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'

import { ListContainer } from './_components/list-container'

type BoardPageProps = {
  params: {
    boardId: string
  }
}

export default async function BoardPage({ params }: BoardPageProps) {
  const { orgId } = auth()

  if (!orgId) {
    return redirect('/select-org')
  }

  const lists = await prisma.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: 'asc',
        },
      },
    },
    orderBy: {
      order: 'asc',
    },
  })

  return (
    <div className="h-full overflow-x-auto p-4">
      <ListContainer boardId={params.boardId} lists={lists} />
    </div>
  )
}
