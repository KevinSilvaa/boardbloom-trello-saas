'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/prisma'
import { createSafeAction } from '@/utils/create-safe-action'

import { UpdateCardOrder } from './schema'
import { InputType, ReturnType } from './types'

export async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { items, boardId } = data

  let updatedCards

  try {
    const transaction = items.map((card) =>
      prisma.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      }),
    )

    updatedCards = await prisma.$transaction(transaction)
  } catch (error) {
    return {
      error: 'Failed to reorder.',
    }
  }

  revalidatePath(`/board/${boardId}`)

  return {
    data: updatedCards,
  }
}

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler)
