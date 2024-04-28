'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/prisma'
import { createSafeAction } from '@/utils/create-safe-action'

import { UpdateListOrder } from './schema'
import { InputType, ReturnType } from './types'

export async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { items, boardId } = data

  let lists

  try {
    const transaction = items.map((list) =>
      prisma.list.update({
        where: {
          id: list.id,
          board: {
            orgId,
          },
        },
        data: {
          order: list.order,
        },
      }),
    )

    lists = await prisma.$transaction(transaction)
  } catch (error) {
    return {
      error: 'Failed to reorder.',
    }
  }

  revalidatePath(`/board/${boardId}`)

  return {
    data: lists,
  }
}

export const updateListOrder = createSafeAction(UpdateListOrder, handler)
