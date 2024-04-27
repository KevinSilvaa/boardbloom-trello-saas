'use client'

import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { ListWithCards } from '@/@types/card-and-list'
import { updateCardOrder } from '@/actions/update-card-order'
import { updateListOrder } from '@/actions/update-list-order'
import { useAction } from '@/hooks/use-action'

import { ListForm } from './list-form'
import { ListItem } from './list-item'

type ListContainerProps = {
  boardId: string
  lists: ListWithCards[]
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list)

  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export function ListContainer({ boardId, lists }: ListContainerProps) {
  const [orderedLists, setOrderedLists] = useState(lists)

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success('List reordered successfully!')
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success('Card reordered successfully!')
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  function onDragEnd(result: DropResult) {
    const { destination, source, type } = result

    if (!destination) {
      return
    }

    // if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // if user moves a list
    if (type === 'list') {
      const items = reorder(orderedLists, source.index, destination.index).map(
        (item, index) => ({
          ...item,
          order: index,
        }),
      )

      setOrderedLists(items)
      executeUpdateListOrder({ items, boardId })
    }

    // If user moves a card
    if (type === 'card') {
      const newOrderedLists = [...orderedLists]

      // Source and destination list
      const sourceList = newOrderedLists.find(
        (list) => list.id === source.droppableId,
      )

      const destinationList = newOrderedLists.find(
        (list) => list.id === destination.droppableId,
      )

      if (!sourceList || !destinationList) {
        return
      }

      // Check if card exists on the sourceList
      if (!sourceList.cards) {
        sourceList.cards = []
      }

      // Check if card exists on the destinationList
      if (!destinationList.cards) {
        destinationList.cards = []
      }

      // Movind the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index,
        )

        reorderedCards.forEach((card, index) => {
          card.order = index
        })

        sourceList.cards = reorderedCards

        setOrderedLists(newOrderedLists)
        executeUpdateCardOrder({ items: reorderedCards, boardId })

        // User moves the card to another list
      } else {
        const [movedCard] = sourceList.cards.splice(source.index, 1)

        // Assing the new listId to the moved card
        movedCard.listId = destination.droppableId

        // Add card to the destination list
        destinationList.cards.splice(destination.index, 0, movedCard)

        sourceList.cards.forEach((card, index) => {
          card.order = index
        })

        // Update the order for each card in the destination list
        destinationList.cards.forEach((card, index) => {
          card.order = index
        })

        setOrderedLists(newOrderedLists)
        executeUpdateCardOrder({ items: destinationList.cards, boardId })
      }
    }
  }

  useEffect(() => {
    setOrderedLists(lists)
  }, [lists])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex h-full gap-x-3"
          >
            {orderedLists.map((list, index) => (
              <ListItem key={list.id} index={index} list={list} />
            ))}

            {provided.placeholder}

            <ListForm />
            <div className="w-1 flex-shrink-0" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}
