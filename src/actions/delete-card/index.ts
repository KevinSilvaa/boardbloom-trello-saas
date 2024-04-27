'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { createSafeAction } from '@/lib/create-safe-action'
import { prisma } from '@/lib/prisma'

import { DeleteCard } from './schema'
import { InputType, ReturnType } from './types'

export async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { id } = data

  let card

  try {
    card = await prisma.card.delete({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    })
  } catch (error) {
    return {
      error: 'Failed to delete.',
    }
  }

  revalidatePath(`/organization/${orgId}`)

  return {
    data: card,
  }
}

export const deleteCard = createSafeAction(DeleteCard, handler)
