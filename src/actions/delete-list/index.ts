'use server'

import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/prisma'
import { createAuditLog } from '@/utils/create-audit-log'
import { createSafeAction } from '@/utils/create-safe-action'

import { DeleteList } from './schema'
import { InputType, ReturnType } from './types'

export async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { id, boardId } = data

  let list

  try {
    list = await prisma.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    })

    await createAuditLog({
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.DELETE,
    })
  } catch (error) {
    return {
      error: 'Failed to delete.',
    }
  }

  revalidatePath(`/board/${boardId}`)

  return {
    data: list,
  }
}

export const deleteList = createSafeAction(DeleteList, handler)
