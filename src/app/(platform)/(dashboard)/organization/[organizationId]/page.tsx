import { Suspense } from 'react'

import { Separator } from '@/components/ui/separator'

import { BoardList } from './_components/board-list'
import { Info } from './_components/info'

export default async function OrganizationPage() {
  return (
    <div className="mb-20 w-full">
      <Info />

      <Separator className="my-4" />

      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  )
}
