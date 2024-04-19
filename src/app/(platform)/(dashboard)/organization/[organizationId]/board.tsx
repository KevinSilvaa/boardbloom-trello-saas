import { deleteBoard } from '@/actions/delete-board'

import { FormDelete } from './form-delete'

type BoardProps = {
  id: string
  title: string
}

export async function Board(board: BoardProps) {
  const deleteBoardWithId = deleteBoard.bind(null, board.id)

  return (
    <form key={board.id} action={deleteBoardWithId}>
      <p>Board title: {board.title}</p>

      <FormDelete />
    </form>
  )
}
