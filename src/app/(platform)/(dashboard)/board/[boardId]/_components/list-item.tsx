'use client'

import { ElementRef, useRef, useState } from 'react'

import { ListWithCards } from '@/@types/card-and-list'
import { cn } from '@/utils/cn'

import { CardForm } from './card-form'
import { CardItem } from './card-item'
import { ListHeader } from './list-header'

type ListItemProps = {
  index: number
  list: ListWithCards
}

export function ListItem({ index, list }: ListItemProps) {
  const textareaRef = useRef<ElementRef<'textarea'>>(null)

  const [isEditing, setIsEditing] = useState(false)

  function enableEditing() {
    setIsEditing(true)
    setTimeout(() => {
      textareaRef.current?.focus()
    })
  }

  function disableEditing() {
    setIsEditing(false)
  }

  return (
    <li className="h-full w-[272px] shrink-0 select-none">
      <div className="w-full rounded-md bg-[#F1F2F4] pb-2 shadow-md">
        <ListHeader onAddCard={enableEditing} list={list} />

        <ol
          className={cn(
            'mx-1 flex flex-col gap-y-2 px-1 py-0.5',
            list.cards.length > 0 && 'mt-2',
          )}
        >
          {list.cards.map((card, index) => (
            <CardItem key={card.id} index={index} card={card} />
          ))}
        </ol>

        <CardForm
          ref={textareaRef}
          listId={list.id}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </li>
  )
}
