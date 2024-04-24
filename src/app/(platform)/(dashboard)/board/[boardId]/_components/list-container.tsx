import { ListWithCards } from '@/@types/card-and-list'

import { ListForm } from './list-form'

type ListContainerProps = {
  boardId: string
  lists: ListWithCards[]
}

export function ListContainer({ boardId, lists }: ListContainerProps) {
  return (
    <ol>
      <ListForm />
      <div className="w-1 flex-shrink-0" />
    </ol>
  )
}
