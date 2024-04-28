'use server'

import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import { createAuditLog } from '@/utils/create-audit-log'
import { createSafeAction } from '@/utils/create-safe-action'
import { decreaseAvailableCount } from '@/utils/org-limit'
import { checkSubscription } from '@/utils/subscription'

import { DeleteBoard } from './schema'
import { InputType, ReturnType } from './types'

export async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const isPro = await checkSubscription()

  const { id } = data

  let board

  try {
    board = await prisma.board.delete({
      where: {
        id,
        orgId,
      },
    })

    if (!isPro) {
      await decreaseAvailableCount()
    }

    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.DELETE,
    })
  } catch (error) {
    return {
      error: 'Failed to delete.',
    }
  }

  revalidatePath(`/organization/${orgId}`)
  redirect(`/organization/${orgId}`)
}

export const deleteBoard = createSafeAction(DeleteBoard, handler)
