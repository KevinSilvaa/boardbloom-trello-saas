'use client'

import { ListWithCards } from '@/@types/card-and-list'

import { ListHeader } from './list-header'

type ListItemProps = {
  index: number
  list: ListWithCards
}

export function ListItem({ index, list }: ListItemProps) {
  return (
    <li className="h-full w-[272px] shrink-0 select-none">
      <div className="w-full rounded-md bg-[#F1F2F4] pb-2 shadow-md">
        <ListHeader list={list} />
      </div>
    </li>
  )
}
