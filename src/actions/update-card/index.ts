'use server'

import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/prisma'
import { createAuditLog } from '@/utils/create-audit-log'
import { createSafeAction } from '@/utils/create-safe-action'

import { UpdateCard } from './schema'
import { InputType, ReturnType } from './types'

export async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { id, boardId, ...values } = data

  let card

  try {
    card = await prisma.card.update({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: {
        ...values,
      },
    })

    await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPDATE,
    })
  } catch (error) {
    return {
      error: 'Failed to update.',
    }
  }

  revalidatePath(`/board/${boardId}`)

  return {
    data: card,
  }
}

export const updateCard = createSafeAction(UpdateCard, handler)
