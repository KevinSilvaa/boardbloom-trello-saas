import { auth } from '@clerk/nextjs'
import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'

import { BoardNavbar } from './_components/board-navbar'

type BoardLayoutProps = {
  children: React.ReactNode
  params: {
    boardId: string
  }
}

export async function generateMetadata({
  params,
}: {
  params: { boardId: string }
}): Promise<Metadata> {
  const { orgId } = auth()

  if (!orgId) {
    return {
      title: 'Board',
    }
  }

  const board = await prisma.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  })

  return {
    title: board?.title || 'Board',
  }
}

export default async function BoardLayout({
  children,
  params,
}: BoardLayoutProps) {
  const { orgId } = auth()

  if (!orgId) {
    return redirect('/select-org')
  }

  const board = await prisma.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  })

  if (!board) {
    return notFound()
  }

  return (
    <div
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
      className="relative h-dvh bg-cover bg-center bg-no-repeat"
    >
      <BoardNavbar board={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative h-full pt-28">{children}</main>
    </div>
  )
}
