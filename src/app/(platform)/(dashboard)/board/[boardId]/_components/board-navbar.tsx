import { Board } from '@prisma/client'

import { BoardOptions } from './board-options'
import { BoardTitleForm } from './board-title-form'

type BoardNavbarProps = {
  board: Board
}

export async function BoardNavbar({ board }: BoardNavbarProps) {
  return (
    <div className="fixed top-14 z-[40] flex h-14 w-full items-center gap-x-4 bg-black/50 px-6 text-white">
      <BoardTitleForm board={board} />

      <div className="ml-auto">
        <BoardOptions id={board.id} />
      </div>
    </div>
  )
}
