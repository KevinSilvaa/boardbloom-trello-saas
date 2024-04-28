'use server'

import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/prisma'
import { createAuditLog } from '@/utils/create-audit-log'
import { createSafeAction } from '@/utils/create-safe-action'

import { UpdateBoard } from './schema'
import { InputType, ReturnType } from './types'

export async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { title, id } = data

  let board

  try {
    board = await prisma.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
      },
    })

    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.UPDATE,
    })
  } catch (error) {
    return {
      error: 'Failed to update.',
    }
  }

  revalidatePath(`/board/${board.id}`)

  return {
    data: board,
  }
}

export const updateBoard = createSafeAction(UpdateBoard, handler)
