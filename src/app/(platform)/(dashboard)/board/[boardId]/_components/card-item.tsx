'use client'

import { Draggable } from '@hello-pangea/dnd'
import { Card } from '@prisma/client'

type CardItemProps = {
  index: number
  card: Card
}

export function CardItem({ index, card }: CardItemProps) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          className="truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm transition hover:border-black"
        >
          {card.title}
        </div>
      )}
    </Draggable>
  )
}
