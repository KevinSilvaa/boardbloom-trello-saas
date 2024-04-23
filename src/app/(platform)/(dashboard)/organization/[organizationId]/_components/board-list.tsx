import { auth } from '@clerk/nextjs'
import { HelpCircle, User2 } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { FormPopover } from '@/components/form/form-popover'
import { Hint } from '@/components/hint'
import { Skeleton } from '@/components/ui/skeleton'
import { prisma } from '@/lib/prisma'

export async function BoardList() {
  const { orgId } = auth()

  if (!orgId) {
    return redirect('/select-org')
  }

  const boards = await prisma.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center text-lg font-semibold text-neutral-700">
        <User2 className="mr-2 size-6" />
        Your boards
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            className="group relative aspect-video size-full overflow-hidden rounded-sm bg-sky-700 bg-cover bg-center bg-no-repeat p-2"
          >
            <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}

        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="relative flex aspect-video size-full flex-col items-center justify-center gap-y-1 rounded-sm bg-muted transition hover:opacity-75"
          >
            <p className="text-sm">Create new board</p>
            <span className="text-sm">5 remaining</span>

            <Hint
              sideOffset={40}
              description={`Free Workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace.`}
            >
              <HelpCircle className="absolute bottom-2 right-2 size-4" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  )
}

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="space-y-4">
      <div className="flex h-7 items-center">
        <Skeleton className="mr-2 h-full w-6" />
        <Skeleton className="h-full w-[100px]" />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <Skeleton className="aspect-video size-full p-2" />
        <Skeleton className="aspect-video size-full p-2" />
        <Skeleton className="aspect-video size-full p-2" />
        <Skeleton className="aspect-video size-full p-2" />
        <Skeleton className="aspect-video size-full p-2" />
        <Skeleton className="aspect-video size-full p-2" />
        <Skeleton className="aspect-video size-full p-2" />
        <Skeleton className="aspect-video size-full p-2" />
      </div>
    </div>
  )
}
