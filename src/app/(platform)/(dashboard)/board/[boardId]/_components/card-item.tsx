'use client'

import { Draggable } from '@hello-pangea/dnd'
import { Card } from '@prisma/client'

import { useCardModal } from '@/contexts/card-modal-context'

type CardItemProps = {
  index: number
  card: Card
}

export function CardItem({ index, card }: CardItemProps) {
  const { onOpen } = useCardModal()

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => onOpen(card.id)}
          role="button"
          className="truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm transition hover:border-black"
        >
          {card.title}
        </div>
      )}
    </Draggable>
  )
}
